"use client";

import { animated, useTransition } from "@react-spring/web";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  SEED_APPLICATIONS,
  SEED_REGISTRATIONS,
  STATUSES,
  dashboardContent,
  type Application,
  type Status,
} from "@/data/content/dashboard-data";

/**
 * The recruiter dashboard — the product working, not a picture of it.
 *
 * COMPOSITION. This is built to the job search's rules, deliberately, because
 * the two are the only full product surfaces on the page and they were reading
 * as two different products. `job-search.tsx` already said so in its own table
 * comment — "the same shell the recruiter dashboard uses, so the two product
 * shots on this page read as one product" — but only the table had ever been
 * made to match. Now the whole instrument does:
 *
 *   - No browser chrome. The demo grounds itself rather than pretending to be
 *     a screenshot of a window. (The chrome DID say something true here — a
 *     recruiter really is looking at app.aplify.co.uk, where a candidate is on
 *     the client's own site — but one page carrying two framings for two
 *     product surfaces cost more than that distinction was worth.)
 *   - The controls are a white card STRADDLING the panel's top edge, the same
 *     device and the same `lg:`-only bleed, so the filters read as the head of
 *     the instrument rather than as one more row inside it.
 *   - The panel is a LIGHT aurora ground with `.screen` on it: Aurora's
 *     11-24px UI scale, white pill fields, white tiles. (Both demos were the
 *     deep bg-08 until 2026-08-28 — Stephen: the blue was "too obnoxious"
 *     against the shipped product, which is white tiles on a tinted
 *     near-white ground. The job search moved with it, same day.)
 *   - Tabs are an ink-pill group on a quiet track — Aurora's own sidebar
 *     recipe — count on the right, job search's own "18 jobs found" row.
 *
 * WHAT WENT. The three summary tiles are gone (Stephen's call). They were the
 * only part of this surface not present in the shipped product, and a figure
 * invented for a demo is the exact shape of thing §6.1 exists to stop.
 *
 * THE SLIDE-OVERS are the product's real gesture, and they are CONTAINED —
 * absolutely positioned inside this panel, not fixed to the viewport. A demo
 * embedded mid-page must not seize the whole screen to show a detail record.
 * Containment also fixes a real defect in the previous build: the detail view
 * REPLACED the list, which collapsed the section by 415px and yanked every
 * section below it up under the reader's cursor. Overlaying costs no height.
 *
 * Three layers stack, exactly as the product stacks them: the application, then
 * the candidate (whose notes span their applications, not just this one), then
 * that candidate's timeline. Each lower layer peeks out by a sliver so the
 * depth is legible.
 *
 * §6.7 — READ THIS BEFORE MOVING THE DISCLOSURE AGAIN. The rule has two
 * clauses: every demo carries a caption saying what is illustrative, AND any
 * form that looks submittable states plainly that nothing is sent, stored or
 * read. They are discharged in different places here.
 *
 *   Clause 2 is covered, inside the notes panel, beside the textarea it is
 *   about — `dashboardContent.notes.disclosure`. That field looks submittable
 *   and its Add button works, so the line is mandatory and must not be moved
 *   away from the field.
 *
 *   Clause 1 is NOT currently rendered. `dashboardContent.caption` was shown at
 *   the foot of this panel and Stephen removed it on 2026-08-24, under the same
 *   call that dropped the section captions on 21 Aug: a line sitting under a
 *   section is not what this page does. The string is still in
 *   `dashboard-data.ts` and is deliberately unused, pending a home that is
 *   inside the demo and doing work there rather than captioning it.
 */

const content = dashboardContent;

const CATEGORIES = [...new Set(SEED_APPLICATIONS.map((a) => a.category))].sort();
const ROLES = [...new Set(SEED_APPLICATIONS.map((a) => a.role))].sort();
const SOURCES = [...new Set(SEED_APPLICATIONS.map((a) => a.source))].sort();
const JOBS = [...new Set(SEED_APPLICATIONS.map((a) => a.job))].sort();

/**
 * Status → chip state. Six statuses onto six of the seven available dots, all
 * distinguishable under deuteranopia because the underlying palette was solved
 * for that: submitted is the quiet slate, the two working states run
 * teal → violet, and the three terminal ones are green / amber / red.
 */
const STATUS_STATE: Record<Status, string> = {
  Submitted: "slate",
  Reviewed: "teal",
  Shortlisted: "violet",
  Accepted: "success",
  Rejected: "attention",
  Withdrawn: "warn",
};

const StatusChip = ({ status }: { status: Status }) => (
  <span className="chip" data-state={STATUS_STATE[status]}>
    {status}
  </span>
);

/* --- Glyphs ---------------------------------------------------------------
   Drawn to job-search's stroke weight (1.7 at 24px) so the two demos share a
   hand as well as a palette. */

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
    <circle cx="11" cy="11" r="6.2" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M15.6 15.6L20 20"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
    <path
      d="M7 10l5 5 5-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FilterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
    <path
      d="M4 6h16M7 12h10M10 18h4"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
    <path
      d="M12 4v10m0 0l-3.8-3.8M12 14l3.8-3.8M4.5 17.5v1A1.5 1.5 0 006 20h12a1.5 1.5 0 001.5-1.5v-1"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M12 7.6V12l3 1.8"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
    <circle cx="12" cy="8.5" r="3.6" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M4.8 20a7.2 7.2 0 0114.4 0"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const NoteIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
    <path
      d="M5 4.8h14v9.4L14.2 19H5z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M19 14.2h-4.8V19"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

/* --- Controls -------------------------------------------------------------
   Job search's `RowSelect`, verbatim in spirit: a white pill on the card, the
   "All …" option doing the labelling so no separate label competes with it.
   The accessible name comes from `aria-label`, never from a wrapping <label> —
   a wrapper folds the option text into the name and it comes out as the whole
   list rather than "Status". */

const RowSelect = ({
  value,
  onChange,
  allLabel,
  options,
  label,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  allLabel: string;
  options: readonly string[];
  label: string;
  className?: string;
}) => (
  <span className={`relative flex items-center ${className ?? ""}`}>
    <select
      aria-label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-12 w-full appearance-none rounded-pill bg-surface-chip pl-5 pr-11 text-ui-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid"
    >
      <option value="">{allLabel}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <ChevronIcon className="pointer-events-none absolute right-4 h-4 w-4 text-ink-label" />
  </span>
);

/** A date bound. Native control, white pill — the calendar affordance is the
 *  browser's, which is what a recruiter actually gets. */
const DateField = ({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
}) => (
  <input
    type="date"
    aria-label={label}
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className="h-12 w-full rounded-pill bg-surface-chip px-5 text-ui-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid"
  />
);

/* --- Table primitives -----------------------------------------------------
   Job search's exact recipe. The head is ONE continuous pill band; rows are
   white bands separated by AIR. `border-spacing-y-3` supplies both the 12px
   under the head and the 12px between rows, so there is not a hairline
   anywhere in the table. */

/* The head stays a SOLID white pill band. It is the one part of the table that
   is not data, and letting the ground through it would put the busiest part of
   the gradient behind the smallest, quietest type on the surface. */
const HEAD_CELL =
  "bg-surface-raised py-2.5 text-left text-ui-sm font-normal text-ink-label";

/* The rows are WHITE TILES on the light ground — Aurora's own layering (tinted
   ground beneath, white tiles above, the product's --aurora-surface-tile), with
   the border-spacing air letting the ground breathe between them. This replaced
   the deep build's `row-glass` on 2026-08-28 with the ground change: a white
   tint on a light ground is invisible, and the shipped product's rows are
   white.

   The white row also lifts the old one-legal-ink constraint: the deep ground
   admitted only full white, so a row's hierarchy ran on size and weight alone.
   On white, body and label inks are legal again — the email under a candidate's
   name steps down in colour as well as size, as it does in the product.

   Status chips take their normal light classification colours here —
   `.row-glass .chip` no longer applies, and nothing replaces it. */
const CELL = "h-16 bg-surface-raised align-middle text-ui-base text-ink";

const TableShell = ({
  minWidth,
  caption,
  children,
}: {
  minWidth: string;
  caption: string;
  children: ReactNode;
}) => (
  <div className="overflow-x-auto">
    <table
      className="w-full border-separate border-spacing-x-0 border-spacing-y-3"
      style={{ minWidth }}
    >
      <caption className="sr-only">{caption}</caption>
      {children}
    </table>
  </div>
);

/* --- Slide-over shell ------------------------------------------------------ */

interface PanelProps {
  title: string;
  subtitle?: ReactNode;
  onClose: () => void;
  children: ReactNode;
}

/**
 * One layer of the stack. Scrolls its own body, and `data-lenis-prevent` is
 * REQUIRED rather than optional: Lenis drives the page and captures wheel
 * events globally, so a nested scroll area silently does nothing on a wheel —
 * it would scroll by drag and by keyboard and look broken to a mouse. This is
 * the same trap the job map hit.
 */
const Panel = ({ title, subtitle, onClose, children }: PanelProps) => (
  /* `w-full min-w-0` is load-bearing: this is a flex ITEM, so without a width
     it sizes to its content. The timeline panel has short lines and was
     collapsing to about 40% of the layer, letting the panel underneath show
     through beside it and reading as two panels side by side. */
  <div className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-panel bg-surface-raised shadow-lift">
    <header className="flex flex-none items-start justify-between gap-4 border-b border-hairline px-5 py-4">
      <div className="min-w-0">
        <h4 className="truncate text-ui-lg font-medium tracking-tight text-ink-heading">
          {title}
        </h4>
        {subtitle ? <div className="mt-1">{subtitle}</div> : null}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label={content.detail.closeLabel}
        className="grid h-8 w-8 flex-none place-items-center rounded-pill bg-surface-chip text-ink-body transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid"
      >
        <CloseIcon />
      </button>
    </header>
    <div
      data-lenis-prevent
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5"
    >
      {children}
    </div>
  </div>
);

/** A labelled row inside a panel section: label left, value right. */
const Row = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="flex items-baseline justify-between gap-4 py-1.5">
    <dt className="flex-none text-ui-sm text-ink-label">{label}</dt>
    <dd className="min-w-0 text-right text-ui-sm text-ink">{value}</dd>
  </div>
);

const SectionHeading = ({ children }: { children: ReactNode }) => (
  <h5 className="text-ui-2xs font-medium uppercase tracking-eyebrow text-ink-label">
    {children}
  </h5>
);

/* --- The demo -------------------------------------------------------------- */

export interface DashboardDemoProps {
  className?: string;
}

interface Note {
  body: string;
  by: string;
  when: string;
}

type LayerKind = "application" | "candidate" | "timeline";

export const DashboardDemo = ({ className }: DashboardDemoProps) => {
  const [tab, setTab] = useState<"applications" | "registrations">(
    "applications",
  );

  /* Filters, in the product's own order. */
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [job, setJob] = useState("");
  const [category, setCategory] = useState("");
  const [role, setRole] = useState("");
  const [source, setSource] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [expanded, setExpanded] = useState(false);

  const [applications, setApplications] =
    useState<Application[]>(SEED_APPLICATIONS);
  /* The open record, and an EXPLICIT stack of layers over it. This replaced a
     pair of booleans once the notes icon in the table had to open the candidate
     panel in its own right: with booleans, "notes open" implied "application
     open underneath", which is not what that icon means. A list says what is
     actually on screen and in what order, and popping it is one operation. */
  const [openId, setOpenId] = useState<string | null>(null);
  const [layers, setLayers] = useState<LayerKind[]>([]);
  const [notes, setNotes] = useState<Record<string, Note[]>>({});
  const [draft, setDraft] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const countId = useId();

  const filtered = useMemo(
    () =>
      applications.filter((a) => {
        if (query && !a.name.toLowerCase().includes(query.trim().toLowerCase()))
          return false;
        if (status && a.status !== status) return false;
        if (job && a.job !== job) return false;
        if (category && a.category !== category) return false;
        if (role && a.role !== role) return false;
        if (source && a.source !== source) return false;
        if (from && a.appliedIso < from) return false;
        if (to && a.appliedIso > to) return false;
        return true;
      }),
    [applications, query, status, job, category, role, source, from, to],
  );

  const open = applications.find((a) => a.id === openId) ?? null;

  /* Close every layer when the record behind them goes away — deleting the
     open application would otherwise leave two panels describing nothing. */
  useEffect(() => {
    if (openId && !open) {
      setOpenId(null);
      setLayers([]);
    }
  }, [openId, open]);

  const pop = () =>
    setLayers((current) => {
      const next = current.slice(0, -1);
      if (next.length === 0) setOpenId(null);
      return next;
    });

  const push = (kind: LayerKind) =>
    setLayers((current) =>
      current.includes(kind) ? current : [...current, kind],
    );

  /* ESC peels one layer at a time, which is what a stack should do. Focus
     returns to whatever opened the first layer. */
  const triggerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!openId) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") pop();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  useEffect(() => {
    if (openId) return;
    const t = triggerRef.current;
    if (t && typeof t.focus === "function") t.focus();
    triggerRef.current = null;
  }, [openId]);

  /** Open a record with ONE named layer showing. The table has two ways in
   *  now: the row itself opens the application, the notes icon opens the
   *  candidate — and the notes icon is not a shortcut through the application
   *  panel, it is its own destination. */
  const openAt = (
    id: string,
    kind: LayerKind,
    trigger: HTMLElement | null,
  ) => {
    triggerRef.current = trigger;
    setOpenId(id);
    setLayers([kind]);
    setDraft("");
    setConfirmingDelete(false);
  };

  const changeStatus = (id: string, next: Status) => {
    setApplications((current) =>
      current.map((application) => {
        if (application.id !== id || application.status === next) {
          return application;
        }
        return {
          ...application,
          status: next,
          timeline: [
            {
              kind: "status" as const,
              label: `${application.status} → ${next}`,
              by: content.detail.changedBy,
              when: content.detail.changedWhen,
            },
            ...application.timeline,
          ],
        };
      }),
    );
  };

  /* Deleting works, on this page's copy of the data only. A red button that
     does nothing teaches the reader the wrong thing about a control the
     product genuinely has — and anonymising on delete is a real answer to a
     real question a care provider will ask. The caption carries the rest. */
  const deleteApplication = (id: string) => {
    setApplications((current) => current.filter((a) => a.id !== id));
    setOpenId(null);
    setLayers([]);
    setConfirmingDelete(false);
  };

  const addNote = (id: string) => {
    const body = draft.trim();
    if (!body) return;
    setNotes((current) => ({
      ...current,
      [id]: [
        { body, by: content.notes.author, when: content.notes.when },
        ...(current[id] ?? []),
      ],
    }));
    setDraft("");
  };

  /** A genuine file, from the rows the filters left visible. */
  const exportCsv = () => {
    const header = [
      "Application",
      "Candidate",
      "Email",
      "Job",
      "Category",
      "Role",
      "Status",
      "Source",
      "Applied",
    ];
    const rows = filtered.map((a) =>
      [
        a.id,
        a.name,
        a.email,
        a.job,
        a.category,
        a.role,
        a.status,
        a.source,
        a.applied,
      ]
        .map((field) => `"${field.replaceAll('"', '""')}"`)
        .join(","),
    );
    const blob = new Blob([[header.join(","), ...rows].join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "aplify-applications-sample.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setQuery("");
    setStatus("");
    setJob("");
    setCategory("");
    setRole("");
    setSource("");
    setFrom("");
    setTo("");
  };

  const anyFilter = Boolean(
    query || status || job || category || role || source || from || to,
  );

  /* The open stack, bottom-first. */
  const stack = open
    ? layers.map((kind) => ({ key: `${kind}-${open.id}`, kind }))
    : [];

  /* Spring-driven, per AGENTS.md rule 1 — a slide-over is revealing motion, so
     it is a spring, not a `transition-*`. Friction is high: the panel arrives
     and settles, matching `Reveal`'s signature rather than inventing a second. */
  const layerTransitions = useTransition(stack, {
    keys: (layer) => layer.key,
    from: { x: 104, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 104, opacity: 0 },
    config: { tension: 260, friction: 34 },
  });

  const scrim = useTransition(Boolean(open), {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 220, friction: 30 },
  });

  const tabs = [
    ["applications", content.tabs.applications, applications.length],
    ["registrations", content.tabs.registrations, SEED_REGISTRATIONS.length],
  ] as const;

  const showing =
    tab === "applications"
      ? filtered.length === 1
        ? content.filters.countOne
        : content.filters.count.replace("{n}", String(filtered.length))
      : content.filters.registrationCount.replace(
          "{n}",
          String(SEED_REGISTRATIONS.length),
        );

  return (
    <div className={className}>
      {/* THE CONTROLS — lifted out so they STRADDLE the panel below, the same
          device the job search uses. The overlap is what makes the filters read
          as the head of the instrument rather than a row inside it.

          `lg:` only. Stacked on a phone this is six fields tall, and a tall
          column straddling a panel edge reads as a mistake rather than a
          device — which is exactly the note job-search.tsx leaves. */}
      <div className="relative z-10 mx-auto w-full px-0 sm:px-6 lg:px-10">
        <form
          onSubmit={(event) => event.preventDefault()}
          className="screen rounded-panel bg-surface-raised p-3 shadow-lift"
        >
          <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
            <span className="relative flex flex-[1.4] items-center">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={content.filters.searchPlaceholder}
                aria-label={content.filters.searchLabel}
                className="h-12 w-full rounded-pill bg-surface-chip pl-12 pr-5 text-ui-sm text-ink placeholder:text-ink-label focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid"
              />
              <span className="pointer-events-none absolute left-5 text-ink-label">
                <SearchIcon />
              </span>
            </span>

            <RowSelect
              value={status}
              onChange={setStatus}
              allLabel={content.filters.allStatuses}
              options={STATUSES}
              label={content.filters.allStatuses}
              className="flex-1"
            />

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex h-12 flex-none items-center justify-center gap-2 rounded-pill bg-surface-chip px-5 text-ui-sm font-medium text-ink-accent transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid"
            >
              <FilterIcon className="h-4 w-4" />
              {expanded ? content.filters.fewer : content.filters.more}
              <ChevronIcon
                className={`h-4 w-4 transition-transform duration-[var(--duration-fast)] ease-entrance ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>

            <button
              type="button"
              onClick={exportCsv}
              title={content.filters.exportHint}
              /* `btn-primary`, not `bg-accent`. The bright sky #0ea5e9 measures
                 2.54:1 under white — the product spec keeps a DEEPENED pair
                 (#0879b8 → #5044d6) precisely because the bright one fails for
                 white text, and this button had been reaching for the wrong
                 one. The deepened gradient is 4.73:1 at its light end. */
              className="btn btn-primary h-12 flex-none rounded-pill px-6 text-ui-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid"
            >
              {content.filters.export}
              <DownloadIcon />
            </button>
          </div>

          {expanded ? (
            <div className="mt-3 border-t border-hairline pt-3">
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-6">
                <RowSelect
                  value={job}
                  onChange={setJob}
                  allLabel={content.filters.allJobs}
                  options={JOBS}
                  label={content.filters.allJobs}
                />
                <RowSelect
                  value={category}
                  onChange={setCategory}
                  allLabel={content.filters.allCategories}
                  options={CATEGORIES}
                  label={content.filters.allCategories}
                />
                <RowSelect
                  value={role}
                  onChange={setRole}
                  allLabel={content.filters.allRoles}
                  options={ROLES}
                  label={content.filters.allRoles}
                />
                <RowSelect
                  value={source}
                  onChange={setSource}
                  allLabel={content.filters.allSources}
                  options={SOURCES}
                  label={content.filters.allSources}
                />
                <DateField
                  value={from}
                  onChange={setFrom}
                  label={content.filters.dateFrom}
                />
                <DateField
                  value={to}
                  onChange={setTo}
                  label={content.filters.dateTo}
                />
              </div>
            </div>
          ) : null}
        </form>
      </div>

      {/* THE PANEL — rides UP under the controls card so the card straddles its
          edge, and clips the slide-overs to itself.

          LIGHT GROUND, 2026-08-28, Stephen's call: the deep bg-08 wash read as
          "too obnoxious" against the shipped product, which is white tiles on
          Aurora's tinted near-white ground (--helion-bg #f0f2f7). Harbour
          (bg-04) keeps the aurora hues at light strength. It is a VIVID ground:
          body ink measures 4.34:1 at its darkest point (modelled, not read from
          the DOM), so anything sitting DIRECTLY on the panel takes full ink
          (10.08:1 worst) — body and label inks are legal only on the white
          surfaces above it. */}
      <div
        /* The min-height is the SLIDE-OVERS' floor, not decoration: they are
           contained in this panel, so a search filtered to one row used to
           shrink the panel to ~300px and the record opened nearly unreadable.
           44rem leaves the overlay ~570px on desktop after the top-24/bottom-10
           insets, and only binds when filtering shrinks the table. */
        className="screen grain bg-04 relative min-h-[44rem] overflow-hidden rounded-panel px-5 pb-7 pt-12 sm:px-7 lg:-mt-9 lg:px-10 lg:pb-10 lg:pt-20"
      >
        <div className="flex flex-col gap-6">
          {/* Tabs left, count right — job search's own row. */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Dashboard views"
              className="inline-flex gap-1 rounded-pill bg-ink/5 p-1"
            >
              {tabs.map(([value, label, count]) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={tab === value}
                  onClick={() => {
                    setTab(value);
                    setOpenId(null);
                  }}
                  className={`inline-flex items-center gap-2 rounded-pill px-4 py-2 text-ui-sm font-medium transition-colors duration-[var(--duration-fast)] ease-entrance ${
                    tab === value
                      ? "bg-ink text-ink-on-dark"
                      : "text-ink hover:bg-ink/10"
                  }`}
                >
                  {label}
                  {/* Full ink / full white per state, nothing faded: the
                      inactive label sits on the vivid ground where body ink is
                      4.34:1, and the active pill is Aurora's own sidebar
                      recipe — ink pill, white label (the product's
                      --helion-nav-pill). */}
                  <span
                    className={
                      tab === value ? "text-ink-on-dark" : "text-ink"
                    }
                  >
                    {count}
                  </span>
                </button>
              ))}
            </div>

            {/* Directly on the vivid ground, so full ink — --ink-label
               measures 2.92:1 at Harbour's darkest point and --ink-body 4.34,
               both under AA for small text. */}
            <p
              id={countId}
              aria-live="polite"
              className="text-ui-sm text-ink"
            >
              {showing}
            </p>
          </div>

          {tab === "applications" ? (
            filtered.length === 0 ? (
              <div className="tile flex flex-col items-center gap-3 px-6 py-12 text-center">
                <p className="text-ui-base text-ink-label">
                  {content.filters.empty}
                </p>
                {anyFilter ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="btn btn-secondary px-4 py-2 text-ui-sm"
                  >
                    {content.filters.clear}
                  </button>
                ) : null}
              </div>
            ) : (
              <TableShell
                minWidth="58rem"
                caption="Sample applications matching the current filters"
              >
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className={`${HEAD_CELL} rounded-l-pill pl-5 pr-4`}
                    >
                      Application
                    </th>
                    <th scope="col" className={`${HEAD_CELL} px-4`}>
                      Candidate
                    </th>
                    <th scope="col" className={`${HEAD_CELL} px-4`}>
                      Job
                    </th>
                    <th scope="col" className={`${HEAD_CELL} px-4`}>
                      Status
                    </th>
                    <th scope="col" className={`${HEAD_CELL} px-4`}>
                      Source
                    </th>
                    <th scope="col" className={`${HEAD_CELL} px-4`}>
                      Applied
                    </th>
                    <th
                      scope="col"
                      className={`${HEAD_CELL} rounded-r-pill pl-4 pr-5 text-right`}
                    >
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((application) => {
                    const noteCount = (notes[application.id] ?? []).length;
                    return (
                      /* THE WHOLE ROW OPENS THE RECORD. The mouse target is the
                         row; the button in the first cell is the same action
                         for a keyboard, because a `tr` cannot take focus and
                         `onClick` on a non-interactive element is invisible to
                         one. Both call the same handler — this is one control
                         with two ways in, not two controls. */
                      <tr
                        key={application.id}
                        onClick={(event) =>
                          openAt(
                            application.id,
                            "application",
                            event.currentTarget.querySelector("button"),
                          )
                        }
                        className="group cursor-pointer transition-shadow duration-[var(--duration-fast)] ease-entrance hover:shadow-tile"
                      >
                        <th
                          scope="row"
                          className={`${CELL} rounded-l-sm py-3 pl-5 pr-4 text-left font-normal`}
                        >
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              openAt(
                                application.id,
                                "application",
                                event.currentTarget,
                              );
                            }}
                            className="text-left text-ui-sm font-medium transition-opacity duration-[var(--duration-fast)] ease-entrance group-hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid"
                          >
                            {application.id}
                          </button>
                        </th>
                        <td className={`${CELL} px-4`}>
                          <p className="text-ui-sm font-medium">
                            {application.name}
                          </p>
                          {/* Steps down in size AND colour now the row is
                              white — 13px medium ink to 11px regular body. */}
                          <p className="text-ui-2xs text-ink-body">
                            {application.email}
                          </p>
                        </td>
                        <td className={`${CELL} px-4`}>
                          <p className="text-ui-sm">
                            {application.jobTitle} ({application.jobRef})
                          </p>
                        </td>
                        <td className={`${CELL} px-4`}>
                          <StatusChip status={application.status} />
                        </td>
                        <td className={`${CELL} px-4 text-ui-sm`}>
                          {application.source}
                        </td>
                        <td
                          className={`${CELL} whitespace-nowrap px-4 text-ui-sm`}
                        >
                          {application.applied}
                        </td>
                        {/* Notes is its OWN way in, not a shortcut through the
                            application panel — the product puts it in the table
                            because a recruiter reading a list wants the note,
                            not the record around it. */}
                        <td
                          className={`${CELL} rounded-r-sm pl-4 pr-5 text-right`}
                        >
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              openAt(
                                application.id,
                                "candidate",
                                event.currentTarget,
                              );
                            }}
                            aria-label={
                              noteCount > 0
                                ? `${content.notes.heading} for ${application.name} (${noteCount})`
                                : `${content.notes.add} for ${application.name}`
                            }
                            className={`relative inline-grid h-9 w-9 place-items-center rounded-pill transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid ${
                              noteCount > 0
                                ? "bg-accent-mid text-ink-on-dark"
                                : "bg-surface-chip text-ink"
                            }`}
                          >
                            <NoteIcon />
                            {noteCount > 0 ? (
                              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-pill bg-ink px-1 text-[0.625rem] font-medium leading-none text-ink-on-dark">
                                {noteCount}
                              </span>
                            ) : null}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </TableShell>
            )
          ) : (
            <TableShell
              minWidth="46rem"
              caption="Sample event registrations"
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    className={`${HEAD_CELL} rounded-l-pill pl-5 pr-4`}
                  >
                    Registrant
                  </th>
                  <th scope="col" className={`${HEAD_CELL} px-4`}>
                    Event
                  </th>
                  <th scope="col" className={`${HEAD_CELL} px-4`}>
                    Event date
                  </th>
                  <th scope="col" className={`${HEAD_CELL} px-4`}>
                    Registered
                  </th>
                  <th
                    scope="col"
                    className={`${HEAD_CELL} rounded-r-pill pl-4 pr-5`}
                  >
                    Attended
                  </th>
                </tr>
              </thead>
              <tbody>
                {SEED_REGISTRATIONS.map((registration) => (
                  <tr key={registration.id}>
                    <th
                      scope="row"
                      className={`${CELL} rounded-l-sm py-3 pl-5 pr-4 text-left font-normal`}
                    >
                      <p className="text-ui-sm font-medium">
                        {registration.name}
                      </p>
                      <p className="text-ui-2xs text-ink-body">
                        {registration.email}
                      </p>
                    </th>
                    <td className={`${CELL} px-4`}>
                      <span className="chip" data-tint="info">
                        {registration.event}
                      </span>
                    </td>
                    <td className={`${CELL} whitespace-nowrap px-4 text-ui-sm`}>
                      {registration.eventDate}
                    </td>
                    <td className={`${CELL} whitespace-nowrap px-4 text-ui-sm`}>
                      {registration.registered}
                    </td>
                    <td className={`${CELL} rounded-r-sm pl-4 pr-5`}>
                      {registration.attended ? (
                        <span className="chip" data-state="success">
                          Yes
                        </span>
                      ) : (
                        <span className="text-ui-sm">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableShell>
          )}

        </div>

        {/* --- THE STACK ------------------------------------------------- */}

        {scrim((style, isOpen) =>
          isOpen ? (
            <animated.button
              type="button"
              aria-label={content.detail.closeLabel}
              tabIndex={-1}
              onClick={pop}
              style={style}
              className="absolute inset-0 z-20 cursor-default bg-ink/35 backdrop-blur-[2px]"
            />
          ) : null,
        )}

        {layerTransitions((style, layer, _t, index) => {
          if (!open) return null;
          const depth = stack.length - 1 - index;
          return (
            <animated.div
              style={{
                opacity: style.opacity,
                transform: style.x.to(
                  (x) => `translate3d(${x + depth * -1.75}%, 0, 0)`,
                ),
                zIndex: 30 + index,
              }}
              /* Inset to the panel's own padding, not pinned to its edges.
                 `inset-y-0` ran these up BEHIND the filter card, which
                 straddles this panel's top edge — that is what "crashing into
                 the filters" was.

                 One value covers both filter states, which is not obvious and
                 is worth not re-deriving: the overlap is always 36px. The card
                 is in normal flow ABOVE the panel and the panel is pulled up
                 under it by a fixed `-mt-9`, so expanding the filters grows the
                 card downward and pushes the whole panel down with it. The card
                 never reaches further in. Measured, expanded and collapsed:
                 form bottom sits 36px inside the panel in both.

                 `top-24` is 96px, so 60px of air below the card — a touch below
                 the panel's own content top (`pt-20`), which reads as deliberate
                 rather than as the panel happening to start there. */
              className="absolute right-5 top-12 bottom-7 z-30 flex w-full max-w-[32rem] sm:right-7 lg:right-10 lg:bottom-10 lg:top-24"
            >
              {layer.kind === "application" ? (
                <ApplicationPanel
                  application={open}
                  notesCount={(notes[open.id] ?? []).length}
                  confirming={confirmingDelete}
                  onConfirmToggle={setConfirmingDelete}
                  onDelete={() => deleteApplication(open.id)}
                  onStatusChange={(next) => changeStatus(open.id, next)}
                  onOpenCandidate={() => push("candidate")}
                  onClose={pop}
                />
              ) : layer.kind === "candidate" ? (
                <CandidatePanel
                  application={open}
                  notes={notes[open.id] ?? []}
                  draft={draft}
                  onDraft={setDraft}
                  onAdd={() => addNote(open.id)}
                  onOpenTimeline={() => push("timeline")}
                  onClose={pop}
                />
              ) : (
                <TimelinePanel application={open} onClose={pop} />
              )}
            </animated.div>
          );
        })}
      </div>
    </div>
  );
};

/* --- The application ------------------------------------------------------- */

const ApplicationPanel = ({
  application,
  notesCount,
  confirming,
  onConfirmToggle,
  onDelete,
  onStatusChange,
  onOpenCandidate,
  onClose,
}: {
  application: Application;
  notesCount: number;
  confirming: boolean;
  onConfirmToggle: (v: boolean) => void;
  onDelete: () => void;
  onStatusChange: (next: Status) => void;
  onOpenCandidate: () => void;
  onClose: () => void;
}) => (
  <Panel
    title={application.id}
    subtitle={
      <p className="truncate text-ui-sm text-ink-label">
        {content.detail.sourceLabel} {application.sourcePath}
      </p>
    }
    onClose={onClose}
  >
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3">
        <SectionHeading>{content.detail.statusHeading}</SectionHeading>
        <div className="flex flex-wrap items-center gap-3 rounded-card bg-surface p-3">
          <StatusChip status={application.status} />
          <RowSelect
            value={application.status}
            onChange={(next) => onStatusChange(next as Status)}
            allLabel={content.detail.updateStatus}
            options={STATUSES}
            label={content.detail.updateStatus}
            className="min-w-[10rem] flex-1"
          />
        </div>
      </section>

      <section>
        <SectionHeading>{content.detail.candidateHeading}</SectionHeading>
        <dl className="mt-2 divide-y divide-hairline">
          <Row label={content.detail.nameLabel} value={application.name} />
          <Row
            label={content.detail.emailLabel}
            value={
              <a
                href={`mailto:${application.email}`}
                className="break-all text-ink-accent underline underline-offset-2"
              >
                {application.email}
              </a>
            }
          />
          <Row
            label={content.detail.telephoneLabel}
            value={application.telephone}
          />
          <Row
            label={content.detail.postcodeLabel}
            value={application.postcode}
          />
        </dl>
        <button
          type="button"
          onClick={onOpenCandidate}
          className="btn btn-secondary mt-3 px-4 py-2 text-ui-sm"
        >
          <PersonIcon />
          {content.detail.viewCandidate}
          {notesCount > 0 ? (
            <span className="chip" data-tint="sky">
              {notesCount}
            </span>
          ) : null}
        </button>
      </section>

      <section>
        <SectionHeading>{content.detail.jobHeading}</SectionHeading>
        <dl className="mt-2 divide-y divide-hairline">
          <Row label={content.detail.titleLabel} value={application.jobTitle} />
          <Row label={content.detail.refLabel} value={application.jobRef} />
          <Row
            label={content.detail.locationLabel}
            value={application.jobLocation}
          />
          <Row label={content.detail.salaryLabel} value={application.salary} />
        </dl>
      </section>

      <section>
        <SectionHeading>{content.detail.additionalHeading}</SectionHeading>
        <dl className="mt-2 divide-y divide-hairline">
          {application.additional.map((entry) => (
            <Row
              key={entry.question}
              label={entry.question}
              value={entry.answer}
            />
          ))}
        </dl>
      </section>

      <section>
        <SectionHeading>{content.detail.appliedHeading}</SectionHeading>
        <dl className="mt-2 divide-y divide-hairline">
          <Row
            label={content.detail.termsLabel}
            value={application.termsAgreed}
          />
          <Row
            label={content.detail.consentLabel}
            value={application.contactConsent}
          />
        </dl>
      </section>

      {/* The product's own control. It is here because "we anonymise on
          delete" is an answer a care provider will want to see, not read. */}
      <section className="rounded-card bg-surface p-4">
        <SectionHeading>{content.detail.dangerHeading}</SectionHeading>
        <p className="mt-2 text-ui-sm leading-relaxed text-ink-body">
          {content.detail.dangerBody}
        </p>
        {confirming ? (
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center rounded-pill bg-danger px-4 py-2 text-ui-sm font-medium text-ink-on-dark transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-90"
            >
              {content.detail.deleteConfirm}
            </button>
            <button
              type="button"
              onClick={() => onConfirmToggle(false)}
              className="btn btn-secondary px-4 py-2 text-ui-sm"
            >
              {content.detail.deleteCancel}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onConfirmToggle(true)}
            className="mt-3 inline-flex items-center rounded-pill bg-danger px-4 py-2 text-ui-sm font-medium text-ink-on-dark transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-90"
          >
            {content.detail.delete}
          </button>
        )}
      </section>
    </div>
  </Panel>
);

/* --- The candidate --------------------------------------------------------- */

const CandidatePanel = ({
  application,
  notes,
  draft,
  onDraft,
  onAdd,
  onOpenTimeline,
  onClose,
}: {
  application: Application;
  notes: Note[];
  draft: string;
  onDraft: (v: string) => void;
  onAdd: () => void;
  onOpenTimeline: () => void;
  onClose: () => void;
}) => (
  <Panel
    title={application.name}
    subtitle={
      <p className="truncate text-ui-sm text-ink-label">{application.email}</p>
    }
    onClose={onClose}
  >
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={onOpenTimeline}
        className="btn btn-secondary self-start px-4 py-2 text-ui-sm"
      >
        <ClockIcon />
        {content.detail.viewTimeline}
      </button>

      <section>
        <SectionHeading>{content.notes.heading}</SectionHeading>
        <textarea
          value={draft}
          onChange={(event) =>
            onDraft(event.target.value.slice(0, content.notes.limit))
          }
          placeholder={content.notes.placeholder}
          aria-label={content.notes.placeholder}
          rows={4}
          /* A textarea is a paragraph, not a pill — 18px radius, per the
             product spec's field recipe. */
          className="mt-2 w-full resize-y rounded-[18px] bg-surface p-4 text-ui-sm text-ink placeholder:text-ink-label focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid"
        />
        <p className="mt-2 text-ui-xs leading-relaxed text-ink-label">
          {content.notes.disclosure}
        </p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-ui-xs text-ink-label">
            {draft.length} / {content.notes.limit}
          </p>
          <button
            type="button"
            onClick={onAdd}
            disabled={!draft.trim()}
            className="btn btn-primary px-4 py-2 text-ui-sm disabled:opacity-40"
          >
            <NoteIcon />
            {content.notes.add}
          </button>
        </div>

        {notes.length === 0 ? (
          <p className="mt-4 text-ui-sm italic text-ink-label">
            {content.notes.empty}
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-2">
            {notes.map((note, index) => (
              <li
                key={`${note.when}-${index}`}
                className="rounded-card bg-surface p-3"
              >
                <p className="text-ui-sm leading-relaxed text-ink">
                  {note.body}
                </p>
                <p className="mt-1.5 text-ui-xs text-ink-label">
                  {note.by} · {note.when}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  </Panel>
);

/* --- The timeline ---------------------------------------------------------- */

const TimelinePanel = ({
  application,
  onClose,
}: {
  application: Application;
  onClose: () => void;
}) => (
  <Panel
    title={application.name}
    subtitle={
      <p className="text-ui-sm text-ink-label">
        {content.detail.timelineHeading}
      </p>
    }
    onClose={onClose}
  >
    {/* The rail marks the most recent entry in the accent — which, after a
        status change, is the one the reader just caused. */}
    <ol>
      {application.timeline.map((entry, index) => (
        <li
          key={`${entry.label}-${entry.when}-${index}`}
          className="flex gap-4 pb-4 last:pb-0"
        >
          <span className="flex flex-none flex-col items-center" aria-hidden>
            <span
              className={`mt-1.5 h-2 w-2 rounded-pill ${
                index === 0 ? "bg-accent-mid" : "bg-track"
              }`}
            />
            {index < application.timeline.length - 1 ? (
              <span className="w-px flex-1 bg-hairline" />
            ) : null}
          </span>
          <div className="flex flex-1 flex-col gap-1">
            <span
              className={`text-ui-sm ${
                entry.kind === "note"
                  ? "italic text-ink-body"
                  : "font-medium text-ink"
              }`}
            >
              {entry.label}
            </span>
            <span className="text-ui-xs text-ink-label">
              {entry.by} · {entry.when}
            </span>
          </div>
        </li>
      ))}
    </ol>
  </Panel>
);

"use client";

import { useId, useMemo, useState, type CSSProperties, type ReactNode } from "react";

import {
  SEED_APPLICATIONS,
  SEED_REGISTRATIONS,
  STATUSES,
  dashboardContent,
  type Application,
  type Status,
} from "@/data/content/dashboard-data";

/**
 * The recruiter dashboard, in the Aurora product register.
 *
 * This is the INNER UI only, and it expects to be mounted inside a `.screen`
 * container (a browser frame — `ScreenCard`'s children slot). `.screen` is what
 * flips the type scale down to Aurora's 11–24px and re-points `--surface` at
 * the tinted admin ground, which is the whole reason a shot reads as software
 * rather than as more page.
 *
 * Every piece of state and every handler is carried over unchanged from the
 * previous build: tab, two filters, the live applications array, the open
 * record, the status change that writes its own timeline entry, and a CSV
 * export that produces a genuine file from whatever the filters left visible.
 *
 * The presentation follows the suite rule — surfaces dip into tint, controls
 * and fields are white pills sitting on them. Rows are white bands separated by
 * AIR rather than hairlines, the table head is one continuous white pill band,
 * status carries a dot chip and category carries a silent tint chip. A dot
 * means state; a classification never gets one.
 */

const CATEGORIES = [...new Set(SEED_APPLICATIONS.map((a) => a.category))];

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

/**
 * `onTint` swaps the chip's neutral wash for a white pill. The wash and the
 * tinted ground are within a point of each other in lightness, so each chip
 * ground vanishes on the other's surface — white on tint, wash on white.
 */
const StatusChip = ({ status, onTint }: { status: Status; onTint?: boolean }) => (
  <span
    className={`chip ${onTint ? "bg-surface-raised shadow-sm" : ""}`}
    data-state={STATUS_STATE[status]}
  >
    {status}
  </span>
);

/* --- Icons ---------------------------------------------------------------- */

const InboxIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
    <path
      d="M3.5 13.5h4l1.2 2.2h6.6l1.2-2.2h4M4.6 5.6l-1.1 7.9v3.4A1.5 1.5 0 005 18.4h14a1.5 1.5 0 001.5-1.5v-3.4l-1.1-7.9A1.5 1.5 0 0017.9 4.3H6.1a1.5 1.5 0 00-1.5 1.3z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
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

const BackIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
    <path
      d="M20 12H5m0 0l5.5-5.5M5 12l5.5 5.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* --- Controls -------------------------------------------------------------- */

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (next: string) => void;
  children: ReactNode;
}

/**
 * A white pill select on a tinted surface. `useId` gives an explicit
 * `for`/`id` pair rather than relying on wrapping: a wrapping label folds the
 * option text into the control's accessible name, so the name comes out as the
 * whole list rather than "Status".
 */
const SelectField = ({ label, value, onChange, children }: SelectFieldProps) => {
  const id = useId();

  return (
    <span className="inline-flex items-center gap-2">
      <label htmlFor={id} className="text-ui-xs text-ink-label">
        {label}
      </label>
      <span className="relative inline-flex items-center">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="field w-auto appearance-none rounded-pill py-2 pl-4 pr-9 text-ui-sm font-medium shadow-sm"
        >
          {children}
        </select>
        <ChevronIcon className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-ink-label" />
      </span>
    </span>
  );
};

/* --- Table primitives ------------------------------------------------------
   The head is ONE continuous pill band; rows are white bands separated by air.
   `border-spacing-y-3` supplies both the 12px under the head and the 12px
   between rows, so there is not a hairline anywhere in the table. */

const HEAD_CELL = "bg-surface-raised py-2.5 text-left text-ui-sm font-normal text-ink-label";
const CELL = "h-16 bg-surface-raised align-middle text-ui-base";

const TableShell = ({ minWidth, children }: { minWidth: string; children: ReactNode }) => (
  <div className="overflow-x-auto">
    <table
      className="w-full border-separate border-spacing-x-0 border-spacing-y-3"
      style={{ minWidth }}
    >
      {children}
    </table>
  </div>
);

/* --- The demo -------------------------------------------------------------- */

export interface DashboardDemoProps {
  className?: string;
}

export const DashboardDemo = ({ className }: DashboardDemoProps) => {
  const content = dashboardContent;

  const [tab, setTab] = useState<"applications" | "registrations">("applications");
  const [status, setStatus] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [applications, setApplications] = useState<Application[]>(SEED_APPLICATIONS);
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      applications.filter(
        (application) =>
          (!status || application.status === status) &&
          (!category || application.category === category),
      ),
    [applications, status, category],
  );

  const open = applications.find((application) => application.id === openId) ?? null;

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

  /** A genuine file, from the rows the filters left visible. */
  const exportCsv = () => {
    const header = ["ID", "Name", "Email", "Job", "Category", "Status", "Source", "Applied"];
    const rows = filtered.map((a) =>
      [a.id, a.name, a.email, a.job, a.category, a.status, a.source, a.applied]
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

  /* Derived, not stored — the summary strip reads the same array the table
     does, which is why changing a status in the detail view moves it. */
  const total = applications.length;
  const actioned = applications.filter((a) => a.status !== "Submitted").length;
  const accepted = applications.filter((a) => a.status === "Accepted").length;
  const actionedPct = total === 0 ? 0 : Math.round((actioned / total) * 100);

  const tabs = [
    ["applications", content.tabs.applications, applications.length],
    ["registrations", content.tabs.registrations, SEED_REGISTRATIONS.length],
  ] as const;

  return (
    <div className={`bg-surface p-4 sm:p-6 ${className ?? ""}`}>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="icon-chip h-9 w-9">
            <InboxIcon />
          </span>
          <h3 className="text-ui-lg font-medium tracking-tight text-ink-heading">
            {tab === "applications" ? content.tabs.applications : content.tabs.registrations}
          </h3>
        </div>

        <div
          role="tablist"
          aria-label="Dashboard tabs"
          className="inline-flex w-fit rounded-pill bg-track p-1"
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
                  ? "bg-surface-raised text-ink shadow-sm"
                  : "text-ink-label hover:text-ink"
              }`}
            >
              {label}
              <span className="text-ui-2xs text-ink-label">{count}</span>
            </button>
          ))}
        </div>
      </header>

      {tab === "applications" && open ? (
        <CandidateDetail
          application={open}
          onBack={() => setOpenId(null)}
          onStatusChange={(next) => changeStatus(open.id, next)}
        />
      ) : tab === "applications" ? (
        <div className="mt-5">
          {/* The summary strip. Wash + inset is law: white insets, because
              these hold figures rather than fields. */}
          <div className="wash rounded-card">
            <div className="grid gap-3 sm:grid-cols-3">
              <SummaryTile label={content.tabs.applications} value={total} />
              <SummaryTile label="Actioned" value={actionedPct} unit="%" fill={actionedPct} />
              <SummaryTile label="Accepted" value={accepted} />
            </div>
          </div>

          {/* Filters + export. */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <SelectField label="Status" value={status} onChange={setStatus}>
                <option value="">{content.filters.allStatuses}</option>
                {STATUSES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </SelectField>
              <SelectField label="Category" value={category} onChange={setCategory}>
                <option value="">{content.filters.allCategories}</option>
                {CATEGORIES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </SelectField>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-ui-xs text-ink-label sm:inline">
                {content.filters.exportHint}
              </span>
              <button
                type="button"
                onClick={exportCsv}
                className="btn btn-primary px-4 py-2 text-ui-sm"
              >
                {content.filters.export}
                <DownloadIcon />
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="tile mt-5 px-5 py-12 text-center">
              <p className="text-ui-base text-ink-label">{content.filters.empty}</p>
            </div>
          ) : (
            <TableShell minWidth="46rem">
              <thead>
                <tr>
                  <th scope="col" className={`${HEAD_CELL} rounded-l-pill pl-5 pr-4`}>
                    Candidate
                  </th>
                  <th scope="col" className={`${HEAD_CELL} px-4`}>
                    Job
                  </th>
                  <th scope="col" className={`${HEAD_CELL} px-4`}>
                    Source
                  </th>
                  <th scope="col" className={`${HEAD_CELL} px-4`}>
                    Applied
                  </th>
                  <th scope="col" className={`${HEAD_CELL} rounded-r-pill pl-4 pr-5`}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((application) => (
                  <tr
                    key={application.id}
                    onClick={() => setOpenId(application.id)}
                    className="group cursor-pointer transition-shadow duration-[var(--duration-fast)] ease-entrance hover:shadow-sm"
                  >
                    <td className={`${CELL} rounded-l-sm py-3 pl-5 pr-4`}>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setOpenId(application.id);
                        }}
                        className="text-left text-ui-base font-medium text-ink transition-colors duration-[var(--duration-fast)] ease-entrance group-hover:text-ink-accent"
                      >
                        {application.name}
                      </button>
                      <p className="text-ui-xs text-ink-label">{application.email}</p>
                    </td>
                    <td className={`${CELL} px-4`}>
                      <p className="text-ui-sm text-ink">{application.job}</p>
                      <p className="mt-1.5">
                        <span className="chip" data-tint="sky">
                          {application.category}
                        </span>
                      </p>
                    </td>
                    <td className={`${CELL} px-4 text-ui-sm text-ink-body`}>
                      {application.source}
                    </td>
                    <td className={`${CELL} whitespace-nowrap px-4 text-ui-sm text-ink-label`}>
                      {application.applied}
                    </td>
                    <td className={`${CELL} rounded-r-sm pl-4 pr-5`}>
                      <StatusChip status={application.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableShell>
          )}
        </div>
      ) : (
        <div className="mt-5">
          <TableShell minWidth="42rem">
            <thead>
              <tr>
                <th scope="col" className={`${HEAD_CELL} rounded-l-pill pl-5 pr-4`}>
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
                <th scope="col" className={`${HEAD_CELL} rounded-r-pill pl-4 pr-5`}>
                  Attended
                </th>
              </tr>
            </thead>
            <tbody>
              {SEED_REGISTRATIONS.map((registration) => (
                <tr key={registration.id}>
                  <td className={`${CELL} rounded-l-sm py-3 pl-5 pr-4`}>
                    <p className="text-ui-base font-medium text-ink">{registration.name}</p>
                    <p className="text-ui-xs text-ink-label">{registration.email}</p>
                  </td>
                  <td className={`${CELL} px-4`}>
                    <span className="chip" data-tint="info">
                      {registration.event}
                    </span>
                  </td>
                  <td className={`${CELL} whitespace-nowrap px-4 text-ui-sm text-ink-body`}>
                    {registration.eventDate}
                  </td>
                  <td className={`${CELL} whitespace-nowrap px-4 text-ui-sm text-ink-label`}>
                    {registration.registered}
                  </td>
                  <td className={`${CELL} rounded-r-sm pl-4 pr-5`}>
                    {registration.attended ? (
                      <span className="chip" data-state="success">
                        Yes
                      </span>
                    ) : (
                      <span className="text-ui-sm text-ink-label">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </div>
      )}
    </div>
  );
};

interface SummaryTileProps {
  label: string;
  value: number;
  /** Steps down and mutes, so the number carries and the unit does not. */
  unit?: string;
  /** 0–100. Renders the thin tally under the figure. */
  fill?: number;
}

const SummaryTile = ({ label, value, unit, fill }: SummaryTileProps) => (
  <div className="inset-tile p-4">
    <p className="text-ui-2xs font-medium uppercase tracking-eyebrow text-ink-label">{label}</p>
    <p className="figure mt-2 text-ui-xl">
      {value}
      {unit ? <span className="figure-unit">{unit}</span> : null}
    </p>
    {fill === undefined ? null : (
      <div
        className="tally mt-3 h-6"
        style={{ "--fill": `${fill}%` } as CSSProperties}
        aria-hidden
      />
    )}
  </div>
);

interface CandidateDetailProps {
  application: Application;
  onBack: () => void;
  onStatusChange: (next: Status) => void;
}

/**
 * Per-candidate view, in place of the list: detail, a status control, and the
 * timeline that writes itself when the status changes. The rail marks the most
 * recent entry in the accent — which is the one the reader just caused.
 */
const CandidateDetail = ({ application, onBack, onStatusChange }: CandidateDetailProps) => {
  const content = dashboardContent;

  return (
    <div className="tile mt-5 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h4 className="text-ui-xl font-medium tracking-tight text-ink-heading">
            {application.name}
          </h4>
          <p className="mt-1 text-ui-sm text-ink-label">
            {application.email} · {application.id}
          </p>
          <p className="mt-3 text-ui-base text-ink">{application.job}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="chip" data-tint="sky">
              {application.category}
            </span>
            <span className="text-ui-xs text-ink-label">
              Source: {application.source} · Applied {application.applied}
            </span>
          </div>
        </div>

        <button type="button" onClick={onBack} className="btn btn-secondary px-4 py-2 text-ui-sm">
          <BackIcon />
          {content.detail.backLabel}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-card bg-surface p-3">
        <span className="pl-2 text-ui-xs text-ink-label">{content.detail.statusLabel}</span>
        <StatusChip status={application.status} onTint />
        <SelectField
          label="Change to"
          value={application.status}
          onChange={(next) => onStatusChange(next as Status)}
        >
          {STATUSES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </SelectField>
      </div>

      <div className="mt-6">
        <h5 className="text-ui-2xs font-medium uppercase tracking-eyebrow text-ink-label">
          {content.detail.timelineHeading}
        </h5>
        <ol className="mt-4">
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
              <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <span
                  className={`text-ui-base ${
                    entry.kind === "note" ? "italic text-ink-body" : "font-medium text-ink"
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
      </div>
    </div>
  );
};

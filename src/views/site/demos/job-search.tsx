"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Reveal } from "@/components/ui/reveal";
import { jobSearchContent } from "@/data/content/job-search";
import {
  FAMILIES,
  JOBS,
  LOCATIONS,
  REGIONS,
  SAMPLE_ORIGIN,
  jobKey,
  milesBetween,
  type Job,
} from "@/data/content/job-data";

import { EasyApplyDemo } from "./easy-apply";
import { JobMap } from "./job-map";

export type ApplyRoute = "easy" | "link";
export type ViewName = (typeof jobSearchContent.views)[number];

/* --- Glyphs --------------------------------------------------------------- */

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <circle cx="11" cy="11" r="6.2" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M15.6 15.6L20 20"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="M14 5h5v5M19 5l-7.5 7.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 14.5V18a1.5 1.5 0 01-1.5 1.5h-10A1.5 1.5 0 015 18V8a1.5 1.5 0 011.5-1.5H10"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
    <path
      d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
    <path
      d="M5 12h13m-5.5-5.5L18.5 12 12.5 17.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Job search & Easy Apply — the inner UI only. It expects to be dropped into a
 * `.screen` (a `ScreenCard` frame), which is why every size here is from the
 * product register: a demonstration whose type is marketing-sized stops reading
 * as software.
 *
 * The mechanic is unchanged from the original build. One filtered set feeds all
 * three views; the route switch rewrites every card's action at once; and the
 * Easy Apply flow runs *in place of* the views rather than in an overlay,
 * because an overlay implies somewhere else and "no redirect" is the claim.
 *
 * What Aurora changes is only the surface: the demo grounds itself in the
 * tinted page grey so its white tiles and white pill controls have something to
 * sit on (a `.screen` is white by default, and white on white has no depth);
 * the filter bar dips into the wash with its controls as white pills on a glass
 * inset; and the list view is a real table with the head as one continuous
 * pill band, its rows separated by air rather than rules.
 */
export interface JobSearchDemoProps {
  className?: string;
}

export const JobSearchDemo = ({ className }: JobSearchDemoProps) => {
  const [route, setRoute] = useState<ApplyRoute>("easy");
  const [view, setView] = useState<ViewName>("Grid");
  const [keyword, setKeyword] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [family, setFamily] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [applying, setApplying] = useState<Job | null>(null);
  /* Search is a real action, not decoration: filtering is live, so pressing it
     moves focus to the count — which is an aria-live region, so the result is
     announced rather than only re-rendered. */
  const resultsRef = useRef<HTMLParagraphElement>(null);

  /**
   * One filtered set, and the origin that sorts it.
   *
   * `origin` is whichever town the location field names — typed or filled by
   * "use my location". When it resolves, the set sorts by real distance from
   * it and every card gains a mileage, which is how a candidate who only knows
   * the town they can reach actually searches. When it does not, the order is
   * the feed's own.
   */
  const origin = useMemo(
    () =>
      place.trim()
        ? (LOCATIONS.find(
            (l) => l.label.toLowerCase() === place.trim().toLowerCase(),
          ) ?? null)
        : null,
    [place],
  );

  const jobs = useMemo(() => {
    const term = keyword.trim().toLowerCase();
    const matched = JOBS.filter(
      (job) =>
        (!family || job.family === family) &&
        (!region || job.region === region) &&
        (!term ||
          `${job.title} ${job.location} ${job.summary}`
            .toLowerCase()
            .includes(term)),
    );
    if (!origin) return matched;
    return [...matched].sort(
      (a, b) => milesBetween(origin, a) - milesBetween(origin, b),
    );
  }, [keyword, family, region, origin]);

  const content = jobSearchContent;

  if (applying) {
    return (
      <EasyApplyDemo
        job={applying}
        onClose={() => setApplying(null)}
        className={className}
      />
    );
  }

  return (
    <div className={`flex flex-col gap-6 ${className ?? ""}`}>
      {/* THE DEPLOYMENT SETTING — its own object, above and apart.

          This is NOT product UI. §2: the apply route is set per client, not per
          candidate, and no candidate ever meets this choice. It used to sit
          inside the search panel styled like the filters beside it, which said
          the two were the same class of thing and implied a candidate would see
          a switch offering them Easy Apply or a redirect. They would not.

          So it keeps the brand's ground — it is still part of this page — but
          it is a separate object with its own label, sitting above the boundary
          that the filters draw. The order a reader takes it in is: headline,
          intro, this setting, then the search it governs. */}
      {/* THE DEPLOYMENT SETTING — a track on the page, not a box on it.

          It is still not product UI (§2: set per client, not per candidate),
          and the section standfirst already says so in words, which is where
          that belongs. What it does not need is its own gradient card: a
          heading, a caption and a filled box turned a two-state control into a
          block, and made the setting look heavier than the search it governs.

          The track is translucent, so the page ground reads through it — the
          control sits ON the page rather than in a container of its own. */}
      <div
        role="radiogroup"
        aria-label={content.routeSwitch.label}
        data-sig="route-switch"
        className="mx-auto flex w-full max-w-3xl gap-1.5 rounded-pill bg-ink/5 p-1.5"
      >
        {(
          [
            [
              "easy",
              content.routeSwitch.easyApply,
              content.routeSwitch.easyApplyNote,
            ],
            [
              "link",
              content.routeSwitch.linkOut,
              content.routeSwitch.linkOutNote,
            ],
          ] as const
        ).map(([value, label, note]) => {
          const on = route === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setRoute(value)}
              className={`flex-1 rounded-pill px-5 py-3 text-center transition-colors duration-[var(--duration-fast)] ease-entrance ${
                on ? "bg-surface-raised shadow-sm" : "hover:bg-ink/5"
              }`}
            >
              <span
                className={`block text-ui-lg font-medium tracking-tight ${
                  on ? "text-ink" : "text-ink-body"
                }`}
              >
                {label}
              </span>
              {/* The note needs different ink on each side. On the white
                  active pill `--ink-label` measures 5.39:1; on the track's
                  own grey it drops to 4.31, which is under the 4.5 this size
                  needs. `--ink-body` clears it at 7.05. */}
              <span
                className={`mt-0.5 block text-ui-xs ${
                  on ? "text-ink-label" : "text-ink-body"
                }`}
              >
                {note}
              </span>
            </button>
          );
        })}
      </div>

      {/* Link-out cost — §2's honesty, shown the moment the switch raises
            it. It belongs to the SETTING, not to the search, because it
            explains what the setting costs. */}
      {route === "link" ? (
        <Reveal variant="fade">
          {/* On the PAGE ground now, not the gradient — so it takes page
                inks. It carried `--ink-on-dark` and a white/10 fill, which
                over grey is near-white text on a surface you cannot see. */}
          <aside
            aria-label={content.linkOutPanel.heading}
            className="mx-auto flex max-w-3xl items-start gap-4 rounded-card bg-surface-raised p-5 shadow-sm"
          >
            <span className="icon-chip h-10 w-10" aria-hidden>
              <ExternalIcon />
            </span>
            <div className="min-w-0">
              <h3 className="text-ui-lg font-medium tracking-tight text-ink-heading">
                {content.linkOutPanel.heading}
              </h3>
              <p className="mt-2 text-ui-base leading-relaxed text-ink-body">
                {content.linkOutPanel.body}
              </p>
              <p className="mt-2 text-ui-base leading-relaxed text-ink-label">
                {content.linkOutPanel.cost}
              </p>
            </div>
          </aside>
        </Reveal>
      ) : null}

      {/* THE SEARCH — lifted out so it STRADDLES the results panel below.

          The overlap is doing real work. It draws the boundary between the
          setting above and the product below, and it makes the search read as
          the HEAD of the instrument rather than as one more row inside it. A
          reader takes it in order: what this is, what governs it, then the
          search, then what the search returned.

          The bleed is `lg:` only. Stacked on a phone the row is five fields
          tall, and a tall column straddling a panel edge reads as a mistake
          rather than as a device. */}
      <div
        data-sig="search-wrap"
        className="relative z-10 mx-auto mt-8 w-full px-0 sm:px-6 lg:px-10"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            resultsRef.current?.focus();
          }}
          /* A card, not a bare row. It has to read as one object crossing the
             panel edge, and a row of loose pills straddling a boundary reads
             as pills that happen to overlap something. */
          data-sig="search"
          className="flex flex-col gap-2.5 rounded-panel bg-surface-raised p-3 shadow-lift lg:flex-row lg:items-center"
        >
          <input
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder={content.filters.keywordPlaceholder}
            aria-label={content.filters.keyword}
            className="h-14 flex-[1.4] rounded-pill bg-surface-chip px-6 text-ui-base text-ink placeholder:text-ink-label focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid"
          />

          <div className="relative flex-1">
            <input
              type="search"
              list="job-search-places"
              value={place}
              onChange={(event) => setPlace(event.target.value)}
              placeholder={content.filters.locationPlaceholder}
              aria-label={content.filters.location}
              className="h-14 w-full rounded-pill bg-surface-chip pl-6 pr-16 text-ui-base text-ink placeholder:text-ink-label focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid"
            />
            <datalist id="job-search-places">
              {LOCATIONS.map((l) => (
                <option key={l.label} value={l.label} />
              ))}
            </datalist>
            <button
              type="button"
              onClick={() => setPlace(SAMPLE_ORIGIN.label)}
              title={`${content.filters.useMyLocation} (${content.filters.sampleLocationNote})`}
              aria-label={`${content.filters.useMyLocation} — ${content.filters.sampleLocationNote}`}
              className="absolute right-1.5 top-1.5 grid h-11 w-11 place-items-center rounded-full bg-accent text-ink-on-dark transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-90"
            >
              <PinIcon />
            </button>
          </div>

          <RowSelect
            value={family}
            onChange={setFamily}
            allLabel={content.filters.allFamilies}
            options={FAMILIES}
            label="Job family"
          />
          <RowSelect
            value={region}
            onChange={setRegion}
            allLabel={content.filters.allRegions}
            options={REGIONS}
            label="Region"
          />

          {/* `btn-primary`, not `bg-accent`. Measured at 2.54:1 — the bright
              sky #0ea5e9 under --ink-on-dark, which is exactly the failure the
              deepened pair exists to prevent (APLIFY-PRODUCT-UI-SPEC.md: "the
              bright pair fails contrast for white — that's why two exist, not
              for variety"). The deepened gradient is 4.73:1 at its light end.
              Caught while auditing the dashboard, which had copied this. */}
          <button
            type="submit"
            className="btn btn-primary h-14 rounded-pill px-8 text-ui-base"
          >
            {content.filters.search}
          </button>
        </form>
      </div>

      {/* THE RESULTS — only what a candidate would actually see. */}
      <div /* Rides UP under the search card so the card straddles its edge. The
           card is ~72px tall, so half of it is the overlap; the panel's top
           padding carries the rest so nothing lands under the fields.

           LIGHT GROUND, 2026-08-28, matching the dashboard (Stephen's call —
           the deep blue read as "too obnoxious" against the shipped product).
           Harbour is VIVID: full ink only for anything directly on it (10.08:1
           at its darkest point, body ink 4.34 fails); body/label inks live on
           the white surfaces above.

           The min-height stops the panel collapsing under a narrow search: one
           result used to shrink the whole instrument (and the section below
           jumped up under the reader's cursor). 44rem matches the dashboard's
           floor so the two demos hold the same ground when filtered. */
        data-sig="results"
        className="screen grain bg-04 min-h-[44rem] rounded-panel px-5 pb-7 pt-12 sm:px-7 lg:-mt-9 lg:px-10 lg:pb-10 lg:pt-20"
      >
        <div className="flex flex-col gap-6">
          {/* Views left, count right — the row that says what you are looking
              at and how much of it there is. */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Result views"
              className="inline-flex gap-1 rounded-pill bg-ink/5 p-1"
            >
              {content.views.map((name) => {
                const on = view === name;
                return (
                  <button
                    key={name}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setView(name)}
                    /* Ink pill active, full ink inactive — the dashboard's tab
                       recipe (Aurora's own sidebar pill), and full ink because
                       the track sits on the vivid ground. */
                    className={`rounded-pill px-5 py-2 text-ui-sm font-medium transition-colors duration-[var(--duration-fast)] ease-entrance ${
                      on
                        ? "bg-ink text-ink-on-dark"
                        : "text-ink hover:bg-ink/10"
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>

            <p
              ref={resultsRef}
              tabIndex={-1}
              aria-live="polite"
              className="text-ui-lg font-medium text-ink focus:outline-none"
            >
              {content.filters.found.replace("{n}", String(jobs.length))}
            </p>
          </div>

          <JobViews
            jobs={jobs}
            view={view}
            route={route}
            origin={origin}
            onApply={(job) => setApplying(job)}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * A select at FIELD scale for the search row — a white pill on the gradient,
 * the same height as the inputs beside it. `FilterSelect` below is the small
 * inline version and is kept for anywhere that still wants a compact control.
 */
const RowSelect = ({
  value,
  onChange,
  allLabel,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  allLabel: string;
  options: string[];
  label: string;
}) => (
  <select
    aria-label={label}
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className="h-14 flex-1 rounded-pill bg-surface-chip px-6 text-ui-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid"
  >
    <option value="">{allLabel}</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

/* --- Controls -------------------------------------------------------------- */

/**
 * One cell of a segmented control. The selected cell is a white pill lifted off
 * a tinted track — the same figure as every other control in the system, so a
 * tab strip and a radio group do not need to look like two different ideas.
 */
const Segment = ({
  role,
  active,
  onClick,
  children,
}: {
  role: "radio" | "tab";
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    role={role}
    {...(role === "radio"
      ? { "aria-checked": active }
      : { "aria-selected": active })}
    onClick={onClick}
    className={`rounded-pill px-4 py-2 text-ui-sm font-medium transition-colors
                duration-[var(--duration-fast)] ease-entrance ${
                  active
                    ? "bg-surface-raised text-ink shadow-sm"
                    : "text-ink-label hover:text-ink"
                }`}
  >
    {children}
  </button>
);

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  allLabel: string;
  options: string[];
}

const FilterSelect = ({
  label,
  value,
  onChange,
  allLabel,
  options,
}: FilterSelectProps) => (
  <label className="inline-flex items-center gap-2 rounded-pill bg-surface-raised py-1.5 pl-4 pr-2 shadow-sm">
    <span className="text-ui-xs text-ink-label">{label}</span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="bg-transparent text-ui-sm font-medium text-ink"
    >
      <option value="">{allLabel}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
);

/* --- The three views ------------------------------------------------------- */

interface JobViewsProps {
  /** Set when the location field resolves; adds a mileage to every card. */
  origin: { label: string; lat: number; lon: number } | null;
  jobs: Job[];
  view: ViewName;
  route: ApplyRoute;
  onApply: (job: Job) => void;
}

/**
 * The three views of one filtered set. Each renders the same `jobs` array —
 * that identity is the demo's point — and every action comes from the route,
 * so flipping the switch rewrites all of them at once.
 */
const JobViews = ({ jobs, view, route, origin, onApply }: JobViewsProps) => {
  if (jobs.length === 0) {
    return (
      <div className="tile flex flex-col items-center gap-3 px-6 py-12 text-center">
        <span className="icon-chip" aria-hidden>
          <SearchIcon />
        </span>
        <p className="max-w-sm text-ui-base text-ink-label">
          {jobSearchContent.filters.empty}
        </p>
      </div>
    );
  }

  if (view === "Grid") {
    return (
      <GridView jobs={jobs} route={route} origin={origin} onApply={onApply} />
    );
  }

  if (view === "List") {
    return (
      <ListView jobs={jobs} route={route} origin={origin} onApply={onApply} />
    );
  }

  return (
    <MapView jobs={jobs} route={route} origin={origin} onApply={onApply} />
  );
};

interface ViewProps {
  jobs: Job[];
  origin: { label: string; lat: number; lon: number } | null;
  route: ApplyRoute;
  onApply: (job: Job) => void;
}

/** Nine to a page — a 3x3 grid, and the reason the sample set is eighteen. */
export const PER_PAGE = 9;

/**
 * Cards on the ground as white tiles — the system's default figure.
 *
 * Paginated rather than scrolled. Eighteen cards in one column is a list you
 * give up on; nine is a grid you read. The page resets whenever the filtered
 * set changes, because leaving someone on page 2 of a set that now has one
 * result shows them an empty grid and no reason for it.
 */
const GridView = ({ jobs, route, origin, onApply }: ViewProps) => {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(jobs.length / PER_PAGE));
  const current = Math.min(page, pages - 1);

  useEffect(() => {
    setPage(0);
  }, [jobs]);

  const shown = jobs.slice(current * PER_PAGE, current * PER_PAGE + PER_PAGE);

  return (
    <div className="flex flex-col gap-5">
      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((job, i) => (
          <Reveal
            key={jobKey(job)}
            tag="li"
            variant="up"
            delay={Math.min(i, 8) * 45}
            className="h-full"
          >
            <article
              data-sig="job-card"
              className="tile flex h-full flex-col p-5"
            >
              <h4 className="text-ui-lg font-medium tracking-tight text-ink-heading">
                {job.title}
              </h4>
              <p className="mt-1 text-ui-sm text-ink-label">
                {job.location} · {job.region}
                {origin ? (
                  <>
                    {" · "}
                    <span className="text-ink-body">
                      {milesBetween(origin, job) < 1
                        ? "under a mile"
                        : `${Math.round(milesBetween(origin, job))} miles`}
                    </span>
                  </>
                ) : null}
              </p>
              <p className="mt-4 text-ui-base font-medium text-ink">
                {job.salary}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <JobTags job={job} />
              </div>
              {/* A line of the advert. A card without one is a search result,
                  not a job. */}
              <p className="mt-4 text-ui-sm leading-relaxed text-ink-body">
                {job.summary}
              </p>
              <div className="mt-auto pt-6">
                <ApplyAction job={job} route={route} onApply={onApply} />
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      {pages > 1 ? (
        <nav
          aria-label={jobSearchContent.pagination.label}
          className="flex items-center justify-between gap-3"
        >
          {/* Directly on the vivid ground, so full ink — label ink is 2.92:1
              at Harbour's darkest point and body ink 4.34, both under AA. The
              buttons beside it carry their own grounds and are fine as they
              are. */}
          <p className="text-ui-sm text-ink" aria-live="polite">
            {jobSearchContent.pagination.showing
              .replace("{from}", String(current * PER_PAGE + 1))
              .replace(
                "{to}",
                String(Math.min((current + 1) * PER_PAGE, jobs.length)),
              )
              .replace("{total}", String(jobs.length))}
          </p>
          <div className="flex items-center gap-2">
            <PageButton
              onClick={() => setPage(current - 1)}
              disabled={current === 0}
            >
              {jobSearchContent.pagination.previous}
            </PageButton>
            {Array.from({ length: pages }, (_, i) => (
              <PageButton
                key={i}
                onClick={() => setPage(i)}
                active={i === current}
                aria-current={i === current ? "page" : undefined}
              >
                {String(i + 1)}
              </PageButton>
            ))}
            <PageButton
              onClick={() => setPage(current + 1)}
              disabled={current === pages - 1}
            >
              {jobSearchContent.pagination.next}
            </PageButton>
          </div>
        </nav>
      ) : null}
    </div>
  );
};

const PageButton = ({
  children,
  onClick,
  disabled,
  active,
  ...rest
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    /* Each pill carries its OWN ground and its own ink, so what is behind it
       is irrelevant — which is the point, because this whole demo is about to
       move onto a deep gradient. `text-on-brand` was here and is not a bound
       token: Tailwind fell back to inherited colour and painted ink on an ink
       pill, 1:1, so the active page number was invisible. Both classes below
       resolve (`--color-ink-on-dark`, `--color-ink-body`). */
    className={`rounded-pill px-3 py-1.5 text-ui-sm transition-colors duration-[var(--duration-fast)] ease-entrance disabled:opacity-40 ${
      active
        ? "bg-ink text-ink-on-dark"
        : "bg-surface-raised text-ink-body hover:text-ink"
    }`}
    {...rest}
  >
    {children}
  </button>
);

/** Tall white row bands. `border-spacing-y-3` is what separates them: air, not
 *  hairlines, and the same 12px gap sits under the head. */
const CELL = "h-16 bg-surface-raised align-middle";

/**
 * The list, as the table it actually is — the same shell the recruiter
 * dashboard uses, so the two product shots on this page read as one product.
 */
const ListView = ({ jobs, route, onApply }: ViewProps) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[46rem] border-separate border-spacing-x-0 border-spacing-y-3">
      <caption className="sr-only">
        Sample roles matching the current filters
      </caption>
      {/* No visible head. Every row already labels itself — a title, a place,
          a contract and a salary need no column names to be read, and the band
          of headings was one more horizontal rule in a view whose whole point
          is that its rows are separated by air.

          It survives for screen readers. The `<caption>` above names the table
          and each row's first cell is its own row header, so the structure is
          still announced; only the drawn version goes. */}
      <tbody>
        {jobs.map((job) => (
          <tr key={jobKey(job)}>
            <th
              scope="row"
              className={`${CELL} rounded-l-sm py-3 pl-5 pr-4 text-left font-normal`}
            >
              <p className="text-ui-base font-medium text-ink">{job.title}</p>
              <p className="mt-1.5">
                <span className="chip" data-tint="sky">
                  {job.family}
                </span>
              </p>
            </th>
            <td className={`${CELL} px-4 text-ui-sm text-ink-label`}>
              {job.location} · {job.region}
            </td>
            <td className={`${CELL} px-4`}>
              <span className="chip">{job.contract}</span>
            </td>
            <td
              className={`${CELL} whitespace-nowrap px-4 text-ui-sm font-medium text-ink`}
            >
              {job.salary}
            </td>
            <td className={`${CELL} rounded-r-sm pl-4 pr-5 text-right`}>
              <ApplyAction job={job} route={route} onApply={onApply} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const MapView = ({ jobs, route, origin, onApply }: ViewProps) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const cards = useRef(new Map<string, HTMLLIElement | null>());

  /* PIN -> CARD. Selecting a pin brings its card into the list rather than
     leaving the reader to find it. `block: "nearest"` so the list moves the
     least it can — scrolling a card that is already visible into the centre
     reads as the page jumping for no reason. */
  useEffect(() => {
    if (!selectedKey) return;
    cards.current
      .get(selectedKey)
      ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedKey]);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 lg:grid-cols-[22rem_minmax(0,1fr)]">
        {/* The list is the index and the map is the picture, and each drives
            the other: a pin brings its card here, a card takes the map there.
            Either one alone is half a search. */}
        {/* `data-lenis-prevent` is required, not optional. Lenis drives the
            page and captures wheel events globally, so a nested scroll area
            silently does nothing on a wheel — the list scrolled by drag and by
            keyboard and looked broken to a mouse. This hands the wheel back
            while the pointer is over it. */}
        <ul
          data-lenis-prevent
          /* `-m-2 p-2` widens the PAINT box without moving the content: the
             scroll container clips at its padding edge, so the selected
             card's 2px ring (and the hover shadow) was being shaved off at
             the top and sides. Padding keeps the ring inside the clip;
             the negative margin gives the padding back so the cards stay
             aligned with the grid. */
          className="-m-2 flex max-h-[26rem] flex-col gap-3 overflow-y-auto overscroll-contain p-2 sm:max-h-[34rem]"
        >
          {jobs.map((job) => {
            const key = jobKey(job);
            const on = key === selectedKey;
            return (
              <li
                key={key}
                ref={(el) => {
                  cards.current.set(key, el);
                }}
              >
                {/* CARD -> PIN. The whole card is the target, not a small
                    control on it: the card IS the reference to the place. */}
                <button
                  type="button"
                  onClick={() => setSelectedKey(key)}
                  aria-pressed={on}
                  data-sig="job-card"
                  className={`tile w-full p-4 text-left transition-shadow duration-[var(--duration-fast)] ease-entrance ${
                    on ? "ring-2 ring-accent" : "hover:shadow-tile"
                  }`}
                >
                  <h4 className="text-ui-base font-medium tracking-tight text-ink-heading">
                    {job.title}
                  </h4>
                  <p className="mt-1 text-ui-xs text-ink-label">
                    {job.location} · {job.region}
                    {origin
                      ? ` · ${
                          milesBetween(origin, job) < 1
                            ? "under a mile"
                            : `${Math.round(milesBetween(origin, job))} miles`
                        }`
                      : ""}
                  </p>
                  <p className="mt-2 text-ui-sm font-medium text-ink">
                    {job.salary}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <JobTags job={job} />
                  </div>
                </button>

                {/* The action appears on the selected card only. Eighteen
                    buttons in a scrolling column is a list of buttons; one is
                    a decision. */}
                {on ? (
                  <div className="mt-2">
                    <ApplyAction job={job} route={route} onApply={onApply} />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>

        <JobMap
          jobs={jobs}
          selectedKey={selectedKey}
          onSelect={(key) => setSelectedKey(key)}
        />
      </div>
    </div>
  );
};

/**
 * Family and contract are CLASSIFICATION, not state — so the family carries the
 * quiet sky tint and the contract stays neutral, and neither takes a status dot.
 */
/**
 * Category and hours, as two pills.
 *
 * The hours used to be a bare `.chip`, whose default fill is #eef0f5 — on a
 * white card that is a 1.4 ΔE difference and reads as grey text, not as a pill
 * beside a coloured one. It gets the chip wash and a clock, so the pair scans
 * as what it is: what the job is, and when you would do it.
 */
const JobTags = ({ job }: { job: Job }) => (
  <>
    <span className="chip" data-tint="sky">
      {job.family}
    </span>
    <span className="chip bg-surface-chip">
      <ClockIcon />
      {job.contract}
    </span>
  </>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
    <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M12 7.8V12l2.8 1.8"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * The action the route switch rewrites — the demo's central mechanic. `link`
 * renders the *Find out more* hand-off, deliberately inert: it goes nowhere
 * here because there is no ATS behind a demonstration, which the link-out panel
 * says in as many words.
 */
const ApplyAction = ({
  job,
  route,
  onApply,
}: {
  job: Job;
  route: ApplyRoute;
  onApply: (job: Job) => void;
}) => {
  if (route === "link") {
    return (
      <span
        className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-pill
                   border border-hairline px-4 py-2 text-ui-sm font-medium text-ink-label"
        title="In the product this opens the job's page in your ATS"
      >
        {jobSearchContent.card.linkOut}
        <span aria-hidden>↗</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onApply(job)}
      className="btn btn-primary px-4 py-2 text-ui-sm"
    >
      {jobSearchContent.card.easyApply}
      <ArrowIcon />
    </button>
  );
};

"use client";

import { useEffect, useMemo, useState } from "react";

import { Reveal } from "@/components/ui/reveal";
import { jobSearchContent } from "@/data/content/job-search";
import {
  FAMILIES,
  JOBS,
  REGIONS,
  jobKey,
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
  const [family, setFamily] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [applying, setApplying] = useState<Job | null>(null);

  const jobs = useMemo(
    () =>
      JOBS.filter(
        (job) =>
          (!family || job.family === family) &&
          (!region || job.region === region),
      ),
    [family, region],
  );

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
    <div
      className={`flex flex-col gap-5 bg-surface p-4 sm:p-6 ${className ?? ""}`}
    >
      {/* Route switch — the demo's own control strip. */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="radiogroup"
          aria-label={content.routeSwitch.label}
          className="inline-flex w-fit flex-none rounded-pill bg-surface-chip p-1"
        >
          {(
            [
              ["easy", content.routeSwitch.easyApply],
              ["link", content.routeSwitch.linkOut],
            ] as const
          ).map(([value, label]) => (
            <Segment
              key={value}
              role="radio"
              active={route === value}
              onClick={() => setRoute(value)}
            >
              {label}
            </Segment>
          ))}
        </div>
        <p className="max-w-md text-ui-sm leading-relaxed text-ink-label">
          {content.routeSwitch.explainer}
        </p>
      </div>

      {/* Link-out explainer — shown only on that route, so the honest cost
          lands exactly when the switch raises it. */}
      {route === "link" ? (
        <Reveal variant="fade">
          <aside
            aria-label={content.linkOutPanel.heading}
            className="wash rounded-card"
          >
            <div className="inset-tile flex items-start gap-4 p-5">
              <span className="icon-chip h-10 w-10" aria-hidden>
                <ExternalIcon />
              </span>
              <div className="min-w-0">
                <h3 className="text-ui-lg font-medium tracking-tight text-ink-heading">
                  {content.linkOutPanel.heading}
                </h3>
                <p className="mt-2 max-w-3xl text-ui-base leading-relaxed text-ink-body">
                  {content.linkOutPanel.body}
                </p>
                <p className="mt-2 max-w-3xl text-ui-base leading-relaxed text-ink-label">
                  {content.linkOutPanel.cost}
                </p>
              </div>
            </div>
          </aside>
        </Reveal>
      ) : null}

      {/* Filters + view tabs. The panel dips into the wash; every control on
          it is a white pill — the suite's own rule, and the reason a filter
          bar reads as a filter bar without a single border. */}
      <div className="wash rounded-card">
        <div className="inset-glass flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <FilterSelect
              label="Job family"
              value={family}
              onChange={setFamily}
              allLabel={content.filters.allFamilies}
              options={FAMILIES}
            />
            <FilterSelect
              label="Region"
              value={region}
              onChange={setRegion}
              allLabel={content.filters.allRegions}
              options={REGIONS}
            />
            <p className="px-1 text-ui-xs text-ink-label" aria-live="polite">
              {jobs.length} of {JOBS.length} roles
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Result views"
            className="inline-flex w-fit flex-none rounded-pill bg-surface-chip p-1"
          >
            {content.views.map((name) => (
              <Segment
                key={name}
                role="tab"
                active={view === name}
                onClick={() => setView(name)}
              >
                {name}
              </Segment>
            ))}
          </div>
        </div>
      </div>

      <JobViews
        jobs={jobs}
        view={view}
        route={route}
        onApply={(job) => setApplying(job)}
      />
    </div>
  );
};

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
const JobViews = ({ jobs, view, route, onApply }: JobViewsProps) => {
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
    return <GridView jobs={jobs} route={route} onApply={onApply} />;
  }

  if (view === "List") {
    return <ListView jobs={jobs} route={route} onApply={onApply} />;
  }

  return <MapView jobs={jobs} route={route} onApply={onApply} />;
};

interface ViewProps {
  jobs: Job[];
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
const GridView = ({ jobs, route, onApply }: ViewProps) => {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(jobs.length / PER_PAGE));
  const current = Math.min(page, pages - 1);

  useEffect(() => {
    setPage(0);
  }, [jobs]);

  const shown = jobs.slice(current * PER_PAGE, current * PER_PAGE + PER_PAGE);

  return (
    <div className="flex flex-col gap-5">
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((job, i) => (
          <Reveal
            key={jobKey(job)}
            tag="li"
            variant="up"
            delay={Math.min(i, 8) * 45}
            className="h-full"
          >
            <article className="tile flex h-full flex-col p-5">
              <h4 className="text-ui-lg font-medium tracking-tight text-ink-heading">
                {job.title}
              </h4>
              <p className="mt-1 text-ui-sm text-ink-label">
                {job.location} · {job.region}
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
          <p className="text-ui-sm text-ink-label" aria-live="polite">
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

/** The table head is ONE continuous white pill band — normal case, quiet. */
const HEAD_CELL =
  "bg-surface-raised py-2.5 text-left text-ui-sm font-normal text-ink-label";
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
      <thead>
        <tr>
          <th scope="col" className={`${HEAD_CELL} rounded-l-pill pl-5 pr-4`}>
            Role
          </th>
          <th scope="col" className={`${HEAD_CELL} px-4`}>
            Location
          </th>
          <th scope="col" className={`${HEAD_CELL} px-4`}>
            Contract
          </th>
          <th scope="col" className={`${HEAD_CELL} px-4`}>
            Salary
          </th>
          <th scope="col" className={`${HEAD_CELL} rounded-r-pill pl-4 pr-5`}>
            <span className="sr-only">Apply</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={jobKey(job)}>
            <td className={`${CELL} rounded-l-sm py-3 pl-5 pr-4`}>
              <p className="text-ui-base font-medium text-ink">{job.title}</p>
              <p className="mt-1.5">
                <span className="chip" data-tint="sky">
                  {job.family}
                </span>
              </p>
            </td>
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

const MapView = ({ jobs, route, onApply }: ViewProps) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const selected = jobs.find((job) => jobKey(job) === selectedKey) ?? null;

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <JobMap
        jobs={jobs}
        selectedKey={selectedKey}
        onSelect={(key) => setSelectedKey(key)}
      />

      <div className="flex flex-col gap-3">
        {selected ? (
          <Reveal key={jobKey(selected)} variant="fade">
            <article className="tile p-5">
              <h4 className="text-ui-lg font-medium tracking-tight text-ink-heading">
                {selected.title}
              </h4>
              <p className="mt-1 text-ui-sm text-ink-label">
                {selected.location} · {selected.region}
              </p>
              <p className="mt-3 text-ui-base font-medium text-ink">
                {selected.salary}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <JobTags job={selected} />
              </div>
              <div className="mt-5">
                <ApplyAction job={selected} route={route} onApply={onApply} />
              </div>
            </article>
          </Reveal>
        ) : (
          <p className="rounded-sm border border-dashed border-hairline p-5 text-ui-sm leading-relaxed text-ink-label">
            Select a pin to see the role — the set on the map is the same one
            the grid and list show.
          </p>
        )}
        <p className="text-ui-xs leading-relaxed text-ink-label">
          {jobSearchContent.captions.map}
        </p>
      </div>
    </div>
  );
};

/**
 * Family and contract are CLASSIFICATION, not state — so the family carries the
 * quiet sky tint and the contract stays neutral, and neither takes a status dot.
 */
const JobTags = ({ job }: { job: Job }) => (
  <>
    <span className="chip" data-tint="sky">
      {job.family}
    </span>
    <span className="chip">{job.contract}</span>
  </>
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

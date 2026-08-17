"use client";

import { useMemo, useState } from "react";

import { Inview } from "@/components/animation/springs/in-view";
import { ProductShot } from "@/components/ui/product-shot";
import { SectionHead } from "@/components/ui/section-head";
import { jobSearchContent } from "@/data/content/job-search";
import { FAMILIES, JOBS, REGIONS, jobKey, type Job } from "@/data/content/job-data";

import { EasyApplyFlow } from "./easy-apply";
import { JobViews } from "./job-views";

export type ApplyRoute = "easy" | "link";
export type ViewName = (typeof jobSearchContent.views)[number];

/**
 * Job search & Easy Apply — handover §8.8, and §11's "if V2 keeps one
 * interactive thing, keep this one". One filtered set feeds all three views;
 * the route switch rewrites every card's button; the Easy Apply flow runs in
 * place of the views — in the flow, never in an overlay, because "no
 * redirect" is the entire claim.
 */
export const JobSearch = () => {
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

  return (
    <section
      id="job-search"
      aria-labelledby="job-search-heading"
      className="border-t border-hairline px-6 py-28 sm:px-10 lg:py-36"
    >
      <SectionHead
        eyebrow={content.eyebrow}
        lines={["Try the search your", "candidates would get"]}
        id="job-search-heading"
        standfirst={content.standfirst}
        volume="piece"
      />

      {/* The demo runs inside browser chrome on the client's own domain. That
          framing is the argument as much as the demo is — and it is what keeps
          a light UI from reading as a white slab dropped on a dark page. */}
      <Inview
        tag="div"
        mode="once"
        from={{ opacity: 0, filter: "blur(10px)" }}
        to={{ opacity: 1, filter: "blur(0px)" }}
        config={{ tension: 170, friction: 30 }}
        className="mt-16"
      >
        <ProductShot frame="browser" url="yourcompany.co.uk/careers">
        <div className="p-5 sm:p-8">
        {applying ? (
          <EasyApplyFlow job={applying} onClose={() => setApplying(null)} />
        ) : (
          <>
            {/* Route switch — the demo's own control strip. */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div
                role="radiogroup"
                aria-label={content.routeSwitch.label}
                className="inline-flex w-fit rounded-pill bg-surface-raised p-1"
              >
                {(
                  [
                    ["easy", content.routeSwitch.easyApply],
                    ["link", content.routeSwitch.linkOut],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={route === value}
                    onClick={() => setRoute(value)}
                    className={`rounded-pill px-5 py-2.5 text-caption font-medium uppercase tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-brand-light ${
                      route === value
                        ? "bg-ink text-canvas"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="max-w-md text-body text-ink-soft">
                {content.routeSwitch.explainer}
              </p>
            </div>

            {/* Link-out explainer — §8.8's honest-cost copy, shown only on
                that route so it lands exactly when the switch raises it. */}
            {route === "link" ? (
              <aside
                aria-label={content.linkOutPanel.heading}
                className="mt-6 rounded-card bg-surface-raised p-6 sm:p-8"
              >
                <h3 className="text-lg font-medium tracking-tight">
                  {content.linkOutPanel.heading}
                </h3>
                <p className="mt-3 max-w-3xl text-body leading-relaxed">
                  {content.linkOutPanel.body}
                </p>
                <p className="mt-3 max-w-3xl text-body leading-relaxed text-ink-soft">
                  {content.linkOutPanel.cost}
                </p>
              </aside>
            ) : null}

            {/* Filters + view tabs. */}
            <div className="mt-6 flex flex-col gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
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
              </div>

              <div
                role="tablist"
                aria-label="Result views"
                className="inline-flex w-fit rounded-pill bg-surface-raised p-1"
              >
                {content.views.map((name) => (
                  <button
                    key={name}
                    type="button"
                    role="tab"
                    aria-selected={view === name}
                    onClick={() => setView(name)}
                    className={`rounded-pill px-4 py-2 text-caption font-medium uppercase tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-brand-light ${
                      view === name
                        ? "bg-ink text-canvas"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <JobViews
              jobs={jobs}
              view={view}
              route={route}
              onApply={(job) => setApplying(job)}
            />
          </>
        )}
        </div>
        </ProductShot>
      </Inview>

      <p className="mt-5 text-caption text-ink-soft">{content.captions.demo}</p>
    </section>
  );
};

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
  <label className="inline-flex items-center gap-2 rounded-pill bg-surface-raised px-4 py-2 text-body">
    <span className="text-ink-soft">{label}</span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="bg-transparent font-medium outline-none"
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

export { jobKey };

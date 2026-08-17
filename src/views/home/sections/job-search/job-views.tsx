"use client";

import { useState } from "react";

import { jobSearchContent } from "@/data/content/job-search";
import { jobKey, type Job } from "@/data/content/job-data";

import type { ApplyRoute, ViewName } from "./index";
import { JobMap } from "./job-map";

export interface JobViewsProps {
  jobs: Job[];
  view: ViewName;
  route: ApplyRoute;
  onApply: (job: Job) => void;
}

/**
 * The three views of one filtered set. Each renders the same `jobs` array —
 * that identity is the demo's point — and every card's action comes from the
 * route, so flipping the switch rewrites all of them at once.
 */
export const JobViews = ({ jobs, view, route, onApply }: JobViewsProps) => {
  if (jobs.length === 0) {
    return (
      <p className="mt-10 pb-4 text-center text-body text-ink-soft">
        {jobSearchContent.filters.empty}
      </p>
    );
  }

  if (view === "Grid") {
    return (
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <li
            key={jobKey(job)}
            className="flex flex-col rounded-card bg-surface-raised p-6"
          >
            <h4 className="text-lg font-medium tracking-tight">{job.title}</h4>
            <p className="mt-1 text-body text-ink-soft">
              {job.location} · {job.region}
            </p>
            <p className="mt-4 text-body font-medium">{job.salary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Chip>{job.family}</Chip>
              <Chip>{job.contract}</Chip>
            </div>
            <div className="mt-6 border-t border-hairline pt-4">
              <ApplyButton job={job} route={route} onApply={onApply} />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (view === "List") {
    return (
      <ul className="mt-6 rounded-card bg-surface-raised px-5 sm:px-6">
        {jobs.map((job) => (
          <li
            key={jobKey(job)}
            className="flex flex-col gap-3 border-t border-hairline py-4 first:border-t-0
                       sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 sm:flex sm:flex-1 sm:items-baseline sm:gap-6">
              <h4 className="text-base font-medium tracking-tight sm:w-64 sm:shrink-0">
                {job.title}
              </h4>
              <p className="text-body text-ink-soft">
                {job.location} · {job.region} · {job.contract}
              </p>
            </div>
            <div className="flex items-center gap-5">
              <p className="text-body font-medium whitespace-nowrap">{job.salary}</p>
              <ApplyButton job={job} route={route} onApply={onApply} />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return <MapView jobs={jobs} route={route} onApply={onApply} />;
};

const MapView = ({
  jobs,
  route,
  onApply,
}: {
  jobs: Job[];
  route: ApplyRoute;
  onApply: (job: Job) => void;
}) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const selected = jobs.find((job) => jobKey(job) === selectedKey) ?? null;

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <JobMap
        jobs={jobs}
        selectedKey={selectedKey}
        onSelect={(key) => setSelectedKey(key)}
      />
      <div className="flex flex-col gap-4">
        {selected ? (
          <div className="rounded-card bg-surface-raised p-6">
            <h4 className="text-lg font-medium tracking-tight">
              {selected.title}
            </h4>
            <p className="mt-1 text-body text-ink-soft">
              {selected.location} · {selected.region}
            </p>
            <p className="mt-3 text-body font-medium">{selected.salary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Chip>{selected.family}</Chip>
              <Chip>{selected.contract}</Chip>
            </div>
            <div className="mt-5 border-t border-hairline pt-4">
              <ApplyButton job={selected} route={route} onApply={onApply} />
            </div>
          </div>
        ) : (
          <p className="rounded-card border border-dashed border-hairline-strong p-6 text-body text-ink-soft">
            Select a pin to see the role — the set on the map is the same one
            the grid and list show.
          </p>
        )}
        <p className="text-caption text-ink-soft">{jobSearchContent.captions.map}</p>
      </div>
    </div>
  );
};

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-pill bg-surface px-3 py-1 text-caption">
    {children}
  </span>
);

/**
 * The button the route switch rewrites — §8.8's central mechanic. `link`
 * renders the *Find out more* hand-off; it goes nowhere here because there is
 * no ATS behind a demo, which the link-out panel says in as many words.
 */
const ApplyButton = ({
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
                   border border-hairline px-4 py-2 text-caption font-medium uppercase
                   tracking-wide text-ink-soft"
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
      className="inline-flex items-center gap-1.5 rounded-pill bg-ink px-4 py-2
                 text-caption font-medium uppercase tracking-wide text-canvas
                 outline-none hover:bg-brand focus-visible:ring-2
                 focus-visible:ring-brand-light"
    >
      {jobSearchContent.card.easyApply}
      <span aria-hidden>→</span>
    </button>
  );
};

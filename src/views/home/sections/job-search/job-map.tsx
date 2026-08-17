"use client";

import { MAP_H, MAP_W, UK_PATH, project } from "@/data/content/uk-map-data";
import { jobKey, type Job } from "@/data/content/job-data";

export interface JobMapProps {
  jobs: Job[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
}

/**
 * The map view — the SVG outline on a raised white card: land in the ghost
 * grey, pins in ink, the selected pin in the brand blue. Every pin is a real
 * coordinate (§6.6); everything else about the roles is invented, and the
 * section caption says so.
 */
export const JobMap = ({ jobs, selectedKey, onSelect }: JobMapProps) => (
  <div className="rounded-card bg-surface-raised p-4 sm:p-6">
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      role="group"
      aria-label="Map of sample roles across the UK"
      className="mx-auto h-[26rem] w-auto max-w-full sm:h-[30rem]"
    >
      <path
        d={UK_PATH}
        className="fill-surface stroke-ghost"
        strokeWidth={2}
      />
      {jobs.map((job) => {
        const { x, y } = project(job.lat, job.lon);
        const key = jobKey(job);
        const isSelected = key === selectedKey;
        return (
          <g key={key}>
            {isSelected ? (
              <circle
                cx={x}
                cy={y}
                r={44}
                className="pointer-events-none fill-brand/20"
              />
            ) : null}
            <circle
              cx={x}
              cy={y}
              r={isSelected ? 26 : 18}
              tabIndex={0}
              role="button"
              aria-label={`${job.title}, ${job.location}`}
              aria-pressed={isSelected}
              onClick={() => onSelect(key)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(key);
                }
              }}
              className={`cursor-pointer outline-none focus-visible:stroke-brand-light focus-visible:stroke-[6] ${
                isSelected ? "fill-brand" : "fill-ink hover:fill-brand"
              }`}
            />
          </g>
        );
      })}
    </svg>
  </div>
);

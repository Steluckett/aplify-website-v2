"use client";

import { MAP_H, MAP_W, UK_PATH, project } from "@/data/content/uk-map-data";
import { jobKey, type Job } from "@/data/content/job-data";

export interface JobMapProps {
  jobs: Job[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
}

/**
 * The map view, in Aurora.
 *
 * The outline sits on a white tile: land in the neutral chip grey, its coast in
 * the track grey, pins in a muted ink and the selected pin in the accent — the
 * one place on this screen where colour appears, because the selection is the
 * only state the map carries. Every pin is a real coordinate; everything else
 * about the roles is invented, which the caption beside the map says.
 *
 * Focus is left to the global `:focus-visible` ring rather than a stroke of its
 * own — a second focus treatment inside a product shot reads as a second
 * system.
 */
export const JobMap = ({ jobs, selectedKey, onSelect }: JobMapProps) => (
  <div className="tile flex items-center justify-center p-4 sm:p-5">
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      role="group"
      aria-label="Map of sample roles across the UK"
      className="h-[20rem] w-auto max-w-full sm:h-[24rem]"
    >
      {/* Land in the track grey — the chip grey is too close to white to read
          a silhouette on a white tile. */}
      <path d={UK_PATH} className="fill-track" />

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
                r={46}
                className="pointer-events-none fill-accent-mid/15"
              />
            ) : null}
            <circle
              cx={x}
              cy={y}
              r={isSelected ? 24 : 17}
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
              className={`cursor-pointer transition-colors duration-[var(--duration-fast)] ease-entrance ${
                isSelected ? "fill-accent-mid" : "fill-ink/55 hover:fill-accent-mid"
              }`}
            />
          </g>
        );
      })}
    </svg>
  </div>
);

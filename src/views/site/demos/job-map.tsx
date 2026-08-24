"use client";

import { animated, to, useSpring } from "@react-spring/web";

import { jobKey, type Job } from "@/data/content/job-data";
import { MAP_H, MAP_W, UK_PATH, project } from "@/data/content/uk-map-data";

export interface JobMapProps {
  jobs: Job[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
}

/**
 * How far the map closes in on a selected pin.
 *
 * Bounded on purpose. The live product runs Mapbox and can zoom to street
 * level because there is something down there; this is a plain UK outline, and
 * past a point it stops being a country and becomes a grey shape. 2.5x is
 * enough to say "the map went to this job" — which is the whole meaning of the
 * gesture — without pretending to detail that does not exist.
 */
const ZOOM = 2.5;

/**
 * The map view — the SVG outline on a raised card, pins in ink, the selected
 * pin in the accent. Every pin is a real coordinate (§6.6); everything else
 * about the roles is invented, and the section caption says so.
 *
 * The viewBox is spring-driven rather than set outright, so selecting a pin
 * MOVES the map instead of cutting to it. Cutting reads as a different image;
 * travelling reads as the same map, closer — which is the difference between
 * the reader following it and the reader losing their place.
 */
export const JobMap = ({ jobs, selectedKey, onSelect }: JobMapProps) => {
  const selected = jobs.find((job) => jobKey(job) === selectedKey) ?? null;

  /* Framed on the pin, then pushed back inside the map's own bounds, so a
     pin near a coast cannot drag the frame off into empty space. */
  const target = (() => {
    if (!selected) return { x: 0, y: 0, w: MAP_W, h: MAP_H };
    const { x, y } = project(selected.lat, selected.lon);
    const w = MAP_W / ZOOM;
    const h = MAP_H / ZOOM;
    return {
      x: Math.min(Math.max(x - w / 2, 0), MAP_W - w),
      y: Math.min(Math.max(y - h / 2, 0), MAP_H - h),
      w,
      h,
    };
  })();

  const frame = useSpring({
    ...target,
    config: { tension: 210, friction: 34 },
  });

  return (
    <div className="tile relative overflow-hidden p-4 sm:p-6">
      <animated.svg
        viewBox={to(
          [frame.x, frame.y, frame.w, frame.h],
          (x, y, w, h) => `${x} ${y} ${w} ${h}`,
        )}
        role="group"
        aria-label="Map of sample roles across the UK"
        className="mx-auto h-[26rem] w-auto max-w-full sm:h-[32rem]"
      >
        <path d={UK_PATH} className="fill-surface stroke-track" strokeWidth={2} />
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
                  r={40}
                  className="pointer-events-none fill-accent/20"
                />
              ) : null}
              {/* Pins keep a constant SCREEN size as the frame closes in: the
                  viewBox shrinks by ZOOM, so a fixed radius would appear to
                  grow by the same factor and swallow the coast under it. */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 26 / ZOOM : 18 / ZOOM}
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
                className={`cursor-pointer outline-none focus-visible:stroke-accent focus-visible:stroke-[4] ${
                  isSelected ? "fill-accent" : "fill-ink/45 hover:fill-accent"
                }`}
              />
            </g>
          );
        })}
      </animated.svg>
    </div>
  );
};

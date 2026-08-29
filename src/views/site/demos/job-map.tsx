"use client";

import { animated, to, useSpring } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

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

/** Air around the outline when the whole country is in frame. */
const REST_PADDING = 1.06;

/**
 * The map view — the UK outline on a raised card, pins in ink, the selected
 * pin in the accent. Every pin is a real coordinate (§6.6); everything else
 * about the roles is invented, and the section caption says so.
 *
 * THE VIEWBOX IS BUILT TO THE CONTAINER'S SHAPE, not to the country's. The UK
 * is portrait and this card is landscape, so a viewBox of the outline's own
 * proportions left a tall sliver of map stranded in a wide white box. A real
 * map does not do that: it fills its viewport and lets sea take the rest. So
 * the frame is measured from the element, and the world is cropped to match
 * it — at rest, the whole country plus whatever water the shape requires; at
 * zoom, the pin centred in the same proportions.
 *
 * It is spring-driven rather than set outright, so selecting a pin MOVES the
 * map instead of cutting to it. Cutting reads as a different image;
 * travelling reads as the same map, closer.
 */
export const JobMap = ({ jobs, selectedKey, onSelect }: JobMapProps) => {
  const box = useRef<HTMLDivElement>(null);
  const [aspect, setAspect] = useState(MAP_W / MAP_H);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) setAspect(width / height);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const selected = jobs.find((job) => jobKey(job) === selectedKey) ?? null;

  const target = (() => {
    /* Height leads and width follows the container, so the outline is never
       cut off top or bottom — the dimension the UK actually needs. */
    const h = selected ? MAP_H / ZOOM : MAP_H * REST_PADDING;
    const w = h * aspect;
    if (!selected) {
      return { x: MAP_W / 2 - w / 2, y: MAP_H / 2 - h / 2, w, h };
    }
    const { x, y } = project(selected.lat, selected.lon);
    /* Clamped inside the world, so a pin near a coast cannot drag the frame
       off into empty space. */
    return {
      x: Math.min(Math.max(x - w / 2, -w * 0.25), MAP_W - w * 0.75),
      y: Math.min(Math.max(y - h / 2, 0), Math.max(0, MAP_H - h)),
      w,
      h,
    };
  })();

  const frame = useSpring({
    ...target,
    config: { tension: 210, friction: 34 },
  });

  /* Pins hold a constant SCREEN size as the frame closes in: the viewBox
     shrinks by ZOOM, so a fixed radius would appear to grow by the same factor
     and swallow the coastline under it. */
  const r = selected ? 1 / ZOOM : 1;

  return (
    /* A TINT, not a white tile.
     *
     * The map was `.tile`, the same solid white as the job cards beside it, so
     * the two read as the same kind of object — a card containing a picture,
     * next to cards containing jobs. A map is not a card: the ground becomes
     * the sea, the land floats on it, and the panel belongs to the ground
     * rather than sitting on it.
     *
     * On the deep ground that was a white glass (white/10). On the light
     * ground it inverts, 2026-08-28: the sea RECESSES with an ink tint — the
     * same ink/5 the tab tracks carry — and the land is solid white, because
     * a translucent white land over a light ground was nearly invisible
     * (Stephen: "the map is a little light against the bg"). */
    <div
      ref={box}
      className="relative h-[26rem] overflow-hidden rounded-card bg-ink/5 p-2 sm:h-[34rem]"
    >
      <animated.svg
        viewBox={to(
          [frame.x, frame.y, frame.w, frame.h],
          (x, y, w, h) => `${x} ${y} ${w} ${h}`,
        )}
        preserveAspectRatio="xMidYMid slice"
        role="group"
        aria-label="Map of sample roles across the UK"
        className="h-full w-full"
      >
        {/* Land is solid white on the recessed sea — the light-map recipe
            every map product uses — with a whisper of ink stroke so the
            coastline holds where sea and land run close in value. */}
        <path
          d={UK_PATH}
          className="fill-white stroke-ink/15"
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
                  r={44 * r}
                  className="pointer-events-none fill-accent/20"
                />
              ) : null}
              <circle
                cx={x}
                cy={y}
                r={(isSelected ? 26 : 18) * r}
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
                /* Pins sit ON the land, so they are measured against the land
                   composite rather than the panel. `--ink` at 45% cleared 3:1
                   on the old white tile and does not on this lighter,
                   bluer surface. */
                className={`cursor-pointer outline-none focus-visible:stroke-accent focus-visible:stroke-[4] ${
                  isSelected ? "fill-accent" : "fill-ink/75 hover:fill-accent"
                }`}
              />
            </g>
          );
        })}
      </animated.svg>
    </div>
  );
};

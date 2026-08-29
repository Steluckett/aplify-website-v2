"use client";

import { animated, useSprings } from "@react-spring/web";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { SectionIntro } from "@/components/ui/section-intro";
import { howItWorks } from "@/data/content/site";

/**
 * Six stages, as a carousel — rebuilt 2026-08-29 from the 3×2 grid (the old
 * composition is recorded as LAYOUT-INVENTORY §1.6 if it is ever wanted
 * back). Stephen's brief: the band already says everything the end-to-end
 * story needs, so make it FEEL like a journey rather than read like one —
 * stages down the left, each clickable, cards animating through on the
 * right, and the band taking as much of the screen as the headline allows.
 * Mechanics guided by a reference component (21st.dev feature-carousel);
 * rebuilt on `@react-spring/web` per rule 1 — no `motion/react`, no icon
 * packs.
 *
 * THE COMPOSITION. A white mega-panel on the tinted band (the FeatureBento
 * pattern — the panel is white, so the band must stay tinted). Inside it:
 *
 *   - THE RAIL, left: the six stages as pills on a vertical wheel. The
 *     active stage holds the centre and the list slides through it,
 *     fading with distance, masked at the panel's edges. Active pill takes
 *     the accent gradient (deepened pair — white text needs it); inactive
 *     pills are quiet hairline ghosts. On small screens the wheel becomes a
 *     plain wrapped row — a wheel needs height it does not have there.
 *
 *   - THE CARDS, right: one per stage, each on its own deep blob ground —
 *     the deep CARD-ground set exists for exactly this. Prev and next peek
 *     from the wings, tilted and dimmed, the reference's own gesture. All
 *     six grounds clear white comfortably (5.79–8.22 at their worst
 *     points, from the /backgrounds measurements); body ink is white/90,
 *     the deep-cell standard, and chips take their glass fill by cascade.
 *
 * AUTOPLAY walks the stages every 6s — it is a sequence, so watching it
 * run IS the pitch — pausing while the pointer is over the panel and
 * stopping for good the moment the reader takes control. An autoplay that
 * fights the reader's click reads as broken.
 */

const STAGE_GROUNDS = [
  "bg-07",
  "bg-08",
  "bg-12",
  "bg-11",
  "bg-14",
  "bg-13",
] as const;

const AUTO_MS = 6000;
/* The wheel's pitch. Generous on purpose (the rail has the room, and big
   pills read as the section's furniture rather than its controls) — at this
   pitch the wheel's far items run off the panel's edge and fade out through
   the masks, which is the point: a wheel you can see all of is a list. */
const ITEM_H = 96;

const COUNT = howItWorks.stages.length;

/** Shortest signed distance from the active index, so the wheel wraps. */
const wrapped = (index: number, active: number): number => {
  let d = index - active;
  if (d > COUNT / 2) d -= COUNT;
  if (d < -COUNT / 2) d += COUNT;
  return d;
};

export const HowItWorks = () => {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [taken, setTaken] = useState(false); // reader took control
  const baseId = useId();

  const select = useCallback((index: number) => {
    setTaken(true);
    setActive(index);
  }, []);

  /* Autoplay until hovered or taken over. */
  useEffect(() => {
    if (hovered || taken) return;
    const id = window.setInterval(
      () => setActive((current) => (current + 1) % COUNT),
      AUTO_MS,
    );
    return () => window.clearInterval(id);
  }, [hovered, taken]);

  /* The rail wheel — one spring per pill. */
  const rail = useSprings(
    COUNT,
    howItWorks.stages.map((_, index) => {
      const d = wrapped(index, active);
      return {
        y: d * ITEM_H,
        opacity: 1 - Math.abs(d) * 0.24,
        config: { tension: 170, friction: 26 },
      };
    }),
  );

  /* The card stack — active centred, neighbours peeking from the wings. */
  const cards = useSprings(
    COUNT,
    howItWorks.stages.map((_, index) => {
      const d = wrapped(index, active);
      const status =
        d === 0 ? "active" : d === -1 ? "prev" : d === 1 ? "next" : "hidden";
      return {
        x: status === "prev" ? -14 : status === "next" ? 14 : 0,
        scale: status === "active" ? 1 : status === "hidden" ? 0.7 : 0.86,
        rotate: status === "prev" ? -3 : status === "next" ? 3 : 0,
        opacity: status === "active" ? 1 : status === "hidden" ? 0 : 0.35,
        config: { tension: 240, friction: 26 },
      };
    }),
  );

  /* Track z-order and interactivity outside the springs — springs animate,
     these switch. */
  const zFor = (index: number) => {
    const d = wrapped(index, active);
    return d === 0 ? 20 : Math.abs(d) === 1 ? 10 : 0;
  };

  const railBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* Left/right (and up/down) walk the stages when the rail has focus —
     a tablist is expected to arrow. */
  const onRailKey = (event: React.KeyboardEvent) => {
    const delta =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? 1
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? -1
          : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + COUNT) % COUNT;
    select(next);
    railBtnRefs.current[next]?.focus();
  };

  return (
    <section id="how-it-works" className="py-26">
      <div className="shell">
        <SectionIntro
          eyebrow={howItWorks.eyebrow}
          lines={howItWorks.lines}
          linesSm={howItWorks.linesSm}
          standfirst={howItWorks.standfirst}
        />

        {/* The panel reaches for the viewport (Stephen: "almost full screen
            height... with the headline") with a floor so a short window
            cannot crush the cards. */}
        <div
          className="band-white mt-16 overflow-hidden rounded-panel shadow-group lg:min-h-[max(38rem,calc(100dvh-27rem))]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="flex h-full flex-col lg:min-h-[inherit] lg:flex-row">
            {/* THE RAIL. */}
            <div
              role="tablist"
              aria-label={howItWorks.eyebrow}
              aria-orientation="vertical"
              onKeyDown={onRailKey}
              className="relative z-10 flex flex-wrap justify-center gap-2 p-6 lg:block lg:w-[38%] lg:self-stretch lg:overflow-hidden lg:p-0"
            >
              {/* Fade the wheel into the panel at its edges — desktop only,
                  where the wheel exists. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden h-32 bg-gradient-to-b from-white via-white/70 to-transparent lg:block"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden h-32 bg-gradient-to-t from-white via-white/70 to-transparent lg:block"
              />

              {/* Desktop wheel: absolute items take their static position
                  from the container's alignment, so centring both axes here
                  centres every pill — the springs only add the y offset. */}
              <div className="relative hidden h-full min-h-[inherit] items-center justify-center lg:flex">
                {rail.map((style, index) => {
                  const stage = howItWorks.stages[index];
                  const on = index === active;
                  return (
                    <animated.div
                      key={stage.n}
                      style={{
                        y: style.y,
                        opacity: style.opacity,
                        height: ITEM_H,
                      }}
                      className="absolute flex items-center"
                    >
                      <button
                        ref={(el) => {
                          railBtnRefs.current[index] = el;
                        }}
                        type="button"
                        role="tab"
                        id={`${baseId}-tab-${index}`}
                        aria-selected={on}
                        aria-controls={`${baseId}-card-${index}`}
                        tabIndex={on ? 0 : -1}
                        onClick={() => select(index)}
                        className={`flex items-center gap-5 rounded-pill px-10 py-5 text-h4 font-medium tracking-tight transition-colors duration-[var(--duration-fast)] ease-entrance focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid ${
                          on
                            ? "btn-primary"
                            : "border border-hairline text-ink-body hover:text-ink hover:shadow-sm"
                        }`}
                      >
                        <span
                          className={`figure text-ui-base ${
                            on ? "text-white/70" : "text-ink-label"
                          }`}
                        >
                          {stage.n}
                        </span>
                        {stage.title}
                      </button>
                    </animated.div>
                  );
                })}
              </div>

              {/* Small screens: a plain wrapped row — the wheel needs height
                  it does not have here. */}
              {howItWorks.stages.map((stage, index) => {
                const on = index === active;
                return (
                  <button
                    key={stage.n}
                    type="button"
                    onClick={() => select(index)}
                    aria-pressed={on}
                    className={`rounded-pill px-4 py-2.5 text-ui-sm font-medium transition-colors duration-[var(--duration-fast)] ease-entrance focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid lg:hidden ${
                      on
                        ? "btn-primary"
                        : "border border-hairline text-ink-body"
                    }`}
                  >
                    {stage.title}
                  </button>
                );
              })}
            </div>

            {/* THE CARDS. The ACTIVE card sits in normal flow and SIZES the
                frame — an absolute stack in a fixed-ratio frame overflowed on
                phones the moment a stage's copy outgrew the ratio (Manage
                did, once it gained the ATS option line). The 4/5 proportion
                survives as a preferred ratio on desktop: `aspect-ratio` lets
                content push past it, so no stage can ever be clipped.
                Neighbours stretch to the frame and clip their tails — they
                are decorative peeks, aria-hidden, and a spilt chip at 35%
                opacity read as a glitch. */}
            <div className="relative flex flex-1 items-center justify-center px-6 pb-10 pt-2 lg:p-12">
              <div className="relative w-full max-w-[26rem] sm:max-w-[28rem] lg:max-w-[32rem] xl:max-w-[36rem]">
                {cards.map((style, index) => {
                  const stage = howItWorks.stages[index];
                  const on = index === active;
                  return (
                    <animated.div
                      key={stage.n}
                      id={`${baseId}-card-${index}`}
                      role="tabpanel"
                      aria-labelledby={`${baseId}-tab-${index}`}
                      aria-hidden={!on}
                      style={{
                        x: style.x.to((v) => `${v}%`),
                        scale: style.scale,
                        rotate: style.rotate,
                        opacity: style.opacity,
                        zIndex: zFor(index),
                        pointerEvents: on ? "auto" : "none",
                      }}
                      className={`grain ${STAGE_GROUNDS[index]} flex origin-center flex-col rounded-panel p-8 lg:p-10 ${
                        on
                          ? /* Square, the band vocabulary's own card shape
                               (thirds are square, copy top-aligned, air
                               beneath) — and wide enough to fill the right
                               area against the enlarged rail. Still only a
                               preferred ratio: content can push past it. */
                            "relative lg:aspect-square"
                          : "absolute inset-0 overflow-hidden"
                      }`}
                    >
                      <p className="figure text-h2 text-white/25">{stage.n}</p>
                      <h3 className="display card-title mt-auto pt-6 text-h3 text-white">
                        {stage.title}
                      </h3>
                      <p className="mt-2 text-body font-medium text-white/90">
                        {stage.sub}
                      </p>
                      <p className="mt-5 text-body leading-[1.6] text-white/90">
                        {stage.body}
                      </p>
                      <ul className="flex flex-wrap gap-2 pt-7">
                        {stage.points.map((point) => (
                          <li key={point} className="chip">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </animated.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

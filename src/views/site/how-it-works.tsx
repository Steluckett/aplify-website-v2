"use client";

import { animated, useSprings } from "@react-spring/web";
import { useCallback, useId, useRef, useState } from "react";

import { StackedLines } from "@/components/ui/stacked-lines";
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
 * UNFRAMED, 2026-08-30 (Stephen: "more powerful if it wasn't framed...
 * like Apple do it — the layout was fine!"). The white mega-panel and the
 * tinted band are gone: the band itself is WHITE, the intro is punched to
 * display size, and the wheel + card stack sit directly on the ground. The
 * stack hugs the viewport's right edge so the faded next card BLEEDS off
 * the page — the invitation to move. `#dashboard` below is white too; a
 * hairline and extra margin do the separating. (A full horizontal-strip
 * variant was built the same day and parked — see
 * obsidian/frontend/how-it-works-strip-variant.md.)
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
 * NO AUTOPLAY — Stephen's call (2026-08-30): the reader lands on 01,
 * because 01 is where the process starts, and the wheel moves only when
 * they move it.
 */

const STAGE_GROUNDS = [
  "bg-07",
  "bg-08",
  "bg-12",
  "bg-11",
  "bg-14",
  "bg-13",
] as const;

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
  const baseId = useId();

  const select = useCallback((index: number) => {
    setActive(index);
  }, []);

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

  /* The card stack — a SYMMETRIC fan: the active card centred, two faded
     stages stepping back on each side, each depth a step fainter than the
     last, everything inside the page (Stephen, 2026-08-30: the asymmetric
     bleed-right version switched shape past step 4, so the even 2-a-side
     spread became the rule and the tints came down a step). The sixth
     card — directly opposite on the wheel — sits hidden behind the
     spread. */
  const FAN: Record<number, { x: number; scale: number; rotate: number; opacity: number }> = {
    [-2]: { x: -23, scale: 0.8, rotate: -5, opacity: 0.14 },
    [-1]: { x: -14, scale: 0.9, rotate: -2.5, opacity: 0.3 },
    0: { x: 0, scale: 1, rotate: 0, opacity: 1 },
    1: { x: 14, scale: 0.9, rotate: 2.5, opacity: 0.3 },
    2: { x: 23, scale: 0.8, rotate: 5, opacity: 0.14 },
  };
  const cards = useSprings(
    COUNT,
    howItWorks.stages.map((_, index) => {
      const d = wrapped(index, active);
      const f = FAN[d] ?? { x: 0, scale: 0.7, rotate: 0, opacity: 0 };
      return { ...f, config: { tension: 240, friction: 26 } };
    }),
  );

  /* Track z-order and interactivity outside the springs — springs animate,
     these switch. The fan stacks downward with depth on both sides. */
  const zFor = (index: number) => {
    const d = Math.abs(wrapped(index, active));
    return d === 0 ? 30 : d === 1 ? 20 : d === 2 ? 10 : 0;
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
    <section id="how-it-works" className="band-white py-26">
      <div className="shell">
        {/* Punched up — display headline, h4 standfirst (Stephen). */}
        <div className="text-center">
          <p className="eyebrow justify-center">{howItWorks.eyebrow}</p>
          <StackedLines
            tag="h2"
            lines={[...howItWorks.lines]}
            className="display lines-tight mt-6 hidden text-center text-display text-ink-heading sm:block"
            lineClassName="justify-center"
          />
          <StackedLines
            tag="h2"
            lines={[...howItWorks.linesSm]}
            className="display lines-tight mt-6 text-center text-h1 text-ink-heading sm:hidden"
            lineClassName="justify-center"
          />
          <p className="mx-auto mt-8 max-w-[52rem] text-lead leading-[1.55] text-ink-body lg:text-h4">
            {howItWorks.standfirst}
          </p>
        </div>

        {/* The composition reaches for the viewport with a floor so a
            short window cannot crush the cards — unframed: no panel, just
            the wheel and the stack on the band. */}
        <div className="mt-16 lg:min-h-[max(38rem,calc(100dvh-27rem))]">
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
            <div className="relative flex flex-1 items-center justify-center px-6 pb-10 pt-2 lg:py-12 lg:pl-12 lg:pr-0">
              {/* Centred: the whole fan lives inside the column now — no
                  page-edge bleed. */}
              <div className="relative w-full max-w-[26rem] sm:max-w-[28rem] lg:max-w-[32rem] xl:max-w-[36rem]">
                {cards.map((style, index) => {
                  const stage = howItWorks.stages[index];
                  const on = index === active;
                  /* The depth-2 cards need a WIDE column to stay on the
                     page (measured: at lg widths they clip the viewport
                     edge), so the five-card fan is xl-and-up; below that
                     the stack keeps just the immediate neighbours. */
                  const deepFan = Math.abs(wrapped(index, active)) >= 2;
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
                      } ${deepFan ? "max-xl:hidden" : ""}`}
                    >
                      <p className="figure text-h2 text-white/25">{stage.n}</p>
                      <h3 className="display card-title mt-auto pt-6 text-h3 text-white lg:text-h1">
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

        {/* The hand-off: this band and `#dashboard` below are both white
            now, so a hairline and air do the separating. */}
        <div className="mt-24 border-t border-hairline" />
      </div>
    </section>
  );
};

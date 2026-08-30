"use client";

import {
  animated,
  to as springTo,
  useSpring,
} from "@react-spring/web";
import { useRef } from "react";

import { SectionIntro } from "@/components/ui/section-intro";
import { cost } from "@/data/content/site";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useWindowWidth } from "@/hooks/use-window-size";

/**
 * BAND 3 — what it costs. The page's scroll set piece.
 *
 * Graduated from a four-option decision page on 2026-08-30 (Stephen's
 * direction throughout). The section pins for ~3.8 screens of scroll and the
 * reader performs the argument themselves:
 *
 *   1. They arrive on the intro with eleven spend pills laid out around it —
 *      four framing the copy from the corners OUTSIDE its measure, seven in
 *      a scattered overlapping row between the standfirst and the card's
 *      peek. Every pill readable at a glance; a green tick pops on each,
 *      one after another — paid for, receipted.
 *   2. Their scroll drags the pills one at a time into the application card
 *      peeking over the foot of the screen.
 *   3. The card rises as the intro bows out just ahead of it — a
 *      VIEWPORT-HEIGHT safety, not a flourish: on a short window the risen
 *      card and the headline would otherwise share pixels.
 *   4. The turn: the card stays white and takes a danger outline and a red
 *      cross. Then the spends bloom back out as faded ghosts, every one
 *      readable on a general screen — the finale is the reader's pause.
 *
 * Built on `use-scroll-progress` (the hook kept for exactly this pin — the
 * vendored trigger cannot fire on a top-top → bottom-bottom pin), smoothed
 * through a spring so the scrub stays springy (rule 1). Under
 * prefers-reduced-motion the hook reports 1 and the reader lands on the
 * finished state, which is the one that carries the argument.
 *
 * The moving pills are aria-hidden theatre; the real content is the sr-only
 * list and the card's own headings, so a screen reader gets the argument
 * without the choreography.
 *
 * The band sits on the TINTED ground between two white bands — the sticky
 * screen inherits the page ground, and the card is the band's white.
 */

/* Where the pills rest at the top of the scene. x in vw, y in vh, from
   screen centre. Four corner pills sit outside the intro's 46rem measure;
   the rest pack the free band between standfirst and peek. "The careers
   site" grazes closest to the copy — the scroll-to-free-it invitation. */
const DESKTOP_SPOTS = [
  { x: -38, y: -24 },
  { x: 38, y: -26 },
  { x: -28, y: 1 },
  { x: 28, y: 0 },
  { x: -6, y: -4 },
  { x: 14, y: 4 },
  { x: -40, y: -12 },
  { x: 40, y: -14 },
  { x: -19, y: 8 },
  { x: 20, y: 9 },
  { x: 1, y: 12 },
];

/* Small screens: a tidy two-column stack below the standfirst — a scatter
   needs a width phones do not have. Taken one at a time all the same. */
const STACK_SPOTS = cost.spends.map((_, i) =>
  i === 10
    ? { x: 0, y: 19 }
    : { x: i % 2 === 0 ? -21 : 21, y: -6 + Math.floor(i / 2) * 5.2 },
);

/* Where the ghosts settle at the finale — a SCATTER, not an orbit. Every
   spot fully clears the card's footprint (52rem wide, ~30rem tall) via the
   `max()` terms, so nothing can bleed underneath on a general screen; on
   narrow screens the outermost drift off the edges instead, which is
   accepted — there they are a visual indicator, not a reading list. `dx/dy`
   is each ghost's outward bloom direction. */
const GHOST_SPOTS = [
  { left: "calc(50% - 31vw)", top: "calc(50% - max(27vh, 21rem))", dx: -5, dy: -6 },
  { left: "calc(50% - 10vw)", top: "calc(50% - max(23vh, 19rem))", dx: -2, dy: -6 },
  { left: "calc(50% + 13vw)", top: "calc(50% - max(26vh, 20.5rem))", dx: 3, dy: -6 },
  { left: "calc(50% + 33vw)", top: "calc(50% - max(22vh, 19rem))", dx: 6, dy: -5 },
  { left: "calc(50% - max(40vw, 36rem))", top: "calc(50% - 7vh)", dx: -8, dy: -1 },
  { left: "calc(50% - max(37vw, 34rem))", top: "calc(50% + 11vh)", dx: -8, dy: 2 },
  { left: "calc(50% + max(38vw, 34.5rem))", top: "calc(50% - 9vh)", dx: 8, dy: -1 },
  { left: "calc(50% + max(41vw, 36rem))", top: "calc(50% + 8vh)", dx: 8, dy: 2 },
  { left: "calc(50% - 23vw)", top: "calc(50% + max(24vh, 19.5rem))", dx: -4, dy: 6 },
  { left: "calc(50% + 3vw)", top: "calc(50% + max(26vh, 20.5rem))", dx: 1, dy: 7 },
  { left: "calc(50% + 25vw)", top: "calc(50% + max(23vh, 19rem))", dx: 5, dy: 6 },
];

const Tick = ({ faded }: { faded?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" className={faded ? "h-3.5 w-3.5" : "h-4 w-4"}>
    <path
      d="M6.5 12.5l4 4L18 8"
      stroke={faded ? "var(--ink-label)" : "var(--ink)"}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Cost = () => {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(ref);
  const width = useWindowWidth();
  const spots = width < 1024 ? STACK_SPOTS : DESKTOP_SPOTS;
  const { p } = useSpring({
    p: progress,
    config: { tension: 170, friction: 30 },
  });

  return (
    <section id="cost">
      {/* The argument, for readers the choreography cannot reach. */}
      <ul className="sr-only">
        {cost.spends.map((spend) => (
          <li key={spend}>{spend} — paid.</li>
        ))}
      </ul>

      <div ref={ref} className="relative h-[380vh]">
        <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden">
          {/* The intro holds through the pill choreography, then bows out
              (0.64–0.78) just ahead of the card's rise (0.62–0.84). */}
          <animated.div
            style={{
              opacity: p.to([0.64, 0.78], [1, 0], "clamp"),
              transform: p.to(
                [0.64, 0.78],
                ["translate3d(0,0vh,0)", "translate3d(0,-6vh,0)"],
                "clamp",
              ),
            }}
            className="absolute inset-x-0 top-[8vh] z-10"
          >
            <div className="shell">
              <SectionIntro
                eyebrow={cost.eyebrow}
                lines={[...cost.lines]}
                linesSm={[...cost.linesSm]}
                standfirst={cost.standfirst}
              />
            </div>
          </animated.div>

          {/* The spends. Grey tick seats from the first frame; the green
              pops one pill at a time; then the reader's scroll drags each
              into the card. */}
          {cost.spends.map((label, i) => {
            const spot = spots[i];
            const s = 0.08 + i * 0.055;
            const e = s + 0.14;
            const t = 0.012 + i * 0.014;
            return (
              <animated.div
                key={label}
                aria-hidden
                style={{
                  opacity: p.to([s, e - 0.025, e], [1, 1, 0], "clamp"),
                  transform: springTo(
                    [
                      p.to([s, e], [spot.x, 0], "clamp"),
                      p.to([s, e], [spot.y, 30], "clamp"),
                      p.to([s, e], [1, 0.4], "clamp"),
                    ],
                    (x, y, sc) =>
                      `translate3d(${x}vw, ${y}vh, 0) scale(${sc})`,
                  ),
                }}
                className="absolute z-20"
              >
                <span className="flex items-center gap-3.5 whitespace-nowrap rounded-pill bg-surface-raised py-3.5 pl-6 pr-4 text-ui-base font-medium text-ink shadow-lift lg:py-4 lg:pl-7 lg:pr-5 lg:text-ui-lg">
                  {label}
                  <span className="relative grid h-7 w-7 place-items-center">
                    <span className="absolute inset-0 grid place-items-center rounded-pill bg-surface-chip opacity-70">
                      <Tick faded />
                    </span>
                    <animated.span
                      style={{
                        transform: p.to(
                          [t, t + 0.03, t + 0.05],
                          ["scale(0)", "scale(1.3)", "scale(1)"],
                          "clamp",
                        ),
                      }}
                      className="absolute inset-0 grid place-items-center rounded-pill"
                    >
                      <span
                        className="grid h-full w-full place-items-center rounded-pill"
                        style={{ background: "var(--success)" }}
                      >
                        <Tick />
                      </span>
                    </animated.span>
                  </span>
                </span>
              </animated.div>
            );
          })}

          {/* THE GHOSTS. As the card turns, the spends bloom back out of it
              as faded outline pills — everything that went in, shown again
              as spent, readable for the reader's pause. */}
          {cost.spends.map((label, i) => {
            const spot = GHOST_SPOTS[i];
            const g = 0.85 + (i % 4) * 0.012;
            return (
              <animated.div
                key={`ghost-${label}`}
                aria-hidden
                style={{
                  left: spot.left,
                  top: spot.top,
                  opacity: p.to([g, g + 0.1], [0, 0.55], "clamp"),
                  transform: springTo(
                    [
                      p.to([g, g + 0.12], [spot.dx * -1, 0], "clamp"),
                      p.to([g, g + 0.12], [spot.dy * -1, 0], "clamp"),
                      p.to([g, g + 0.12], [0.55, 0.92], "clamp"),
                    ],
                    (x, y, sc) =>
                      `translate3d(calc(-50% + ${x}vw), calc(-50% + ${y}vh), 0) scale(${sc})`,
                  ),
                }}
                className="absolute z-[25]"
              >
                <span className="flex items-center gap-3 whitespace-nowrap rounded-pill border border-hairline bg-white/40 px-6 py-3.5 text-ui-base font-medium text-ink-label">
                  {label}
                  <span className="grid h-6 w-6 place-items-center rounded-pill bg-surface-chip opacity-70">
                    <Tick faded />
                  </span>
                </span>
              </animated.div>
            );
          })}

          {/* The application: a white panel throughout. It peeks over the
              foot of the screen with its title centred in the visible strip,
              rises once the spend is in, then TURNS — danger outline, red
              cross, the statement. Both faces share one centred layout in a
              fixed-height frame, so the padding holds equal all round. */}
          <animated.div
            style={{
              transform: p.to(
                [0.62, 0.84],
                ["translate3d(0,50vh,0)", "translate3d(0,2vh,0)"],
                "clamp",
              ),
            }}
            className="relative z-30 w-full max-w-[52rem] px-5 sm:px-8 lg:px-0"
          >
            <div className="relative min-h-[26rem] overflow-hidden rounded-panel bg-surface-raised shadow-group lg:min-h-[30rem]">
              <animated.div
                aria-hidden
                style={{ opacity: p.to([0.86, 0.94], [0, 1], "clamp") }}
                className="pointer-events-none absolute inset-0 rounded-panel border-2 border-danger/60"
              />

              {/* Light face. */}
              <animated.div
                style={{ opacity: p.to([0.85, 0.91], [1, 0], "clamp") }}
                className="absolute inset-0 flex flex-col items-center justify-center px-10 py-8 text-center lg:px-16"
              >
                <animated.div
                  style={{
                    transform: p.to(
                      [0.56, 0.84],
                      ["translate3d(0,-6rem,0)", "translate3d(0,0rem,0)"],
                      "clamp",
                    ),
                  }}
                >
                  <p className="eyebrow justify-center">{cost.card.eyebrow}</p>
                  <h3 className="display lines-tight mt-5 text-h1 text-ink-heading">
                    {cost.card.title}
                  </h3>
                </animated.div>
              </animated.div>

              {/* Abandoned face — white stays white; the outline and the
                  cross carry the state. */}
              <animated.div
                style={{ opacity: p.to([0.86, 0.94], [0, 1], "clamp") }}
                className="absolute inset-0 flex flex-col items-center justify-center px-10 py-8 text-center lg:px-16"
              >
                <animated.span
                  aria-hidden
                  style={{
                    transform: p.to(
                      [0.88, 0.93, 0.96],
                      ["scale(0)", "scale(1.25)", "scale(1)"],
                      "clamp",
                    ),
                  }}
                  className="grid h-16 w-16 place-items-center rounded-pill border-2 border-danger/60"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                    <path
                      d="M7 7l10 10M17 7L7 17"
                      stroke="var(--danger)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </animated.span>
                <p className="mt-6 text-ui-base font-medium uppercase tracking-eyebrow text-danger">
                  {cost.card.lossLabel}
                </p>
                <h3 className="display card-title mt-5 text-h2">
                  {cost.card.lossTitle}
                </h3>
                <p className="mx-auto mt-6 max-w-[36rem] text-lead leading-[1.6] text-ink-body">
                  {cost.card.lossBody}
                </p>
              </animated.div>
            </div>
          </animated.div>
        </div>
      </div>
    </section>
  );
};

---
tags: [frontend, pattern, parked]
---

# How-it-works: the horizontal strip variant (parked 2026-08-30)

Built to Stephen's 'like Apple' brief, then parked the same day when the
brief turned out to mean unframing the WHEEL, not replacing it. He liked
this too — 'I like that - lets keep it for the future.' Fully working:
white band, display intro, six deep-ground cards in one full-bleed strip
starting at the shell's left edge and bleeding off-screen right, pills +
arrow pair, DOM-measured step and end-clamp (subtract the container's
own padding twice), no autoplay.

```tsx
"use client";

import { animated, useSpring } from "@react-spring/web";
import { useCallback, useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/ui/reveal";
import { StackedLines } from "@/components/ui/stacked-lines";
import { howItWorks } from "@/data/content/site";

/**
 * Six stages, as an UNFRAMED strip — reworked 2026-08-30 (Stephen: "so much
 * more powerful if it wasn't framed... a little bit like Apple do it").
 * The panel, the vertical wheel and the tinted ground are gone:
 *
 *   - The band is WHITE, and the next band (`#dashboard`) is white too —
 *     the page flows straight on, with a hairline and extra margin doing
 *     the separating (his suggestion, taken).
 *   - The intro is PUNCHED UP: display-size headline, h4-size standfirst.
 *   - The six stage cards sit in one horizontal STRIP on the bare
 *     background, starting at the shell's left edge and BLEEDING off the
 *     right of the screen — the bleed is the invitation to move.
 *   - Navigation is the stage pills plus a pair of arrows (the Apple
 *     gesture); clicking any card also brings it to the front. The strip's
 *     travel is clamped so it can never over-scroll past its own end.
 *
 * The strip's step is MEASURED from the DOM (card width + gap) rather than
 * hardcoded, so the card width can change per breakpoint without the maths
 * caring. Springs move everything (rule 1).
 *
 * NO autoplay (2026-08-30 stands): the reader lands on 01 and drives.
 */

const GAP = 32;

export const HowItWorks = () => {
  const [active, setActive] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLElement>(null);
  const [metrics, setMetrics] = useState({ step: 448, maxShift: 9999 });
  const count = howItWorks.stages.length;

  /* Measure the real step and the maximum useful travel — the strip must
     stop when its last card reaches the right edge, not scroll into void. */
  useEffect(() => {
    const measure = () => {
      const card = firstCardRef.current;
      const strip = stripRef.current;
      if (!card || !strip) return;
      const step = card.getBoundingClientRect().width + GAP;
      const total = step * count - GAP;
      /* The container's left padding is the shell offset; subtract it twice
         so the last card lands with matching air on the right rather than
         kissing (or overshooting) the viewport edge. */
      const padLeft = parseFloat(getComputedStyle(strip).paddingLeft) || 0;
      const visible = strip.clientWidth - padLeft * 2;
      setMetrics({ step, maxShift: Math.max(0, total - visible) });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [count]);

  const shift = Math.min(active * metrics.step, metrics.maxShift);
  const strip = useSpring({
    x: -shift,
    config: { tension: 170, friction: 28 },
  });

  const select = useCallback(
    (i: number) => setActive(Math.max(0, Math.min(count - 1, i))),
    [count],
  );

  return (
    <section id="how-it-works" className="band-white py-26">
      {/* The intro, punched up — this is the band's whole frame now. */}
      <div className="shell text-center">
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

      {/* Stage pills + arrows, on the bare ground. */}
      <div className="shell mt-14 flex flex-wrap items-center justify-center gap-2 lg:justify-between">
        <div
          role="tablist"
          aria-label={howItWorks.eyebrow}
          className="flex flex-wrap justify-center gap-2"
        >
          {howItWorks.stages.map((stage, i) => {
            const on = i === active;
            return (
              <button
                key={stage.n}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => select(i)}
                className={`flex items-center gap-3 rounded-pill px-5 py-3 text-ui-base font-medium transition-colors duration-[var(--duration-fast)] ease-entrance focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid ${
                  on
                    ? "btn-primary"
                    : "border border-hairline text-ink-body hover:text-ink hover:shadow-sm"
                }`}
              >
                <span
                  className={`figure text-ui-sm ${
                    on ? "text-white/70" : "text-ink-label"
                  }`}
                >
                  {stage.n}
                </span>
                {stage.title}
              </button>
            );
          })}
        </div>
        <div className="hidden gap-2 lg:flex">
          {[-1, 1].map((dir) => {
            const disabled =
              dir === -1 ? active === 0 : shift >= metrics.maxShift;
            return (
              <button
                key={dir}
                type="button"
                aria-label={dir === -1 ? "Previous stage" : "Next stage"}
                disabled={disabled}
                onClick={() => select(active + dir)}
                className="grid h-12 w-12 place-items-center rounded-pill bg-surface-chip text-ink transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-80 disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`h-5 w-5 ${dir === -1 ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  <path
                    d="M5 12h13m-5.5-5.5L18.5 12 12.5 17.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      {/* The strip: starts at the shell's left edge, bleeds off the right.
          Full-bleed container; the padding mirrors the shell's own left
          offset so card one lines up with everything else. */}
      <div
        ref={stripRef}
        className="mt-12 overflow-hidden"
        style={{ paddingLeft: "max(2.5vw, calc((100vw - 1440px) / 2))" }}
      >
        <animated.div
          style={{
            transform: strip.x.to((v) => `translate3d(${v}px,0,0)`),
          }}
          className="flex w-max items-stretch"
        >
          {howItWorks.stages.map((stage, i) => (
            <Reveal
              key={stage.n}
              variant="up"
              delay={i * 90}
              className="mr-8 flex"
            >
              <article
                ref={i === 0 ? firstCardRef : undefined}
                onClick={() => select(i)}
                className={`grain ${STAGE_GROUNDS[i]} flex w-[21rem] cursor-pointer flex-col rounded-panel p-8 sm:w-[24rem] lg:w-[26rem] lg:p-10`}
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
              </article>
            </Reveal>
          ))}
        </animated.div>
      </div>

      {/* The hand-off: this band and the next are both white now, so a
          hairline and air do the separating (Stephen's call). */}
      <div className="shell mt-24">
        <div className="border-t border-hairline" />
      </div>
    </section>
  );
};

/* Six stages, six of the deep card grounds — worst-point white ink 5.79–8.22
   from the /backgrounds measurements; body at /90 is the deep-cell
   standard, chips take the glass fill by cascade. */
const STAGE_GROUNDS = [
  "bg-07",
  "bg-08",
  "bg-12",
  "bg-11",
  "bg-14",
  "bg-13",
] as const;
```

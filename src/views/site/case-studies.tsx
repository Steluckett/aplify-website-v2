"use client";

import { animated, useSpring, useTransition } from "@react-spring/web";
import { useState } from "react";

import { SectionIntro } from "@/components/ui/section-intro";
import { caseQuote, caseStudies } from "@/data/content/site";

/**
 * BAND 10 — `#proof`, the case studies. Graduated from a three-option
 * decision page on 2026-08-30 (Stephen picked "the bento", then had the
 * stat cell rebuilt as a band carousel).
 *
 * THE COMPOSITION. A logo device switches between three case studies. The
 * stat cell is a CONTINUOUS BAND: the three client gradients are stacked
 * inside its frame and switching client SCROLLS the band to the right
 * colour — travelling through the colours between, the way a real band
 * would — while the stat text rides independently in the band's direction.
 * The write-up and quote keep a plain element transition. Hues are ours
 * (bg-13's deep magenta, the deepened blue pair, deep amber), assigned to
 * rhyme with each client's own brand.
 *
 * THE ROW IS PINNED above the tallest case per breakpoint — without the
 * floor, each switch resized the row (the cases' copy heights differ, and
 * exit-before-enter passes through an empty column), which read as a jump.
 *
 * All three §5 quotes live HERE and nowhere else (Stephen, 2026-08-30).
 * The band must stay white: the quote card is `wash-soft`.
 */

/* Presentation per case, keyed to the content module's order: the deep
   band gradient. White ink clears all three (the light stops are 190,24,93 /
   8,121,183 / 180,83,9 — all deeper than the 4.5 line). */
const DEEPS = [
  "linear-gradient(135deg, rgb(190 24 93), rgb(120 15 60))",
  "linear-gradient(135deg, rgb(8 121 183), rgb(13 31 77))",
  "linear-gradient(135deg, rgb(180 83 9), rgb(100 45 8))",
];

/* The stacked Brandon lockup needs a taller slot than the wide marks, or
   its strap becomes illegible. */
const LOGO_CLASSES = ["h-11 lg:h-12", "h-6 lg:h-7", "h-7 lg:h-8"];

export const CaseStudies = () => {
  const [sel, setSel] = useState({ i: 0, dir: 1 });
  const active = sel.i;
  const cases = caseStudies.cases;
  const setActive = (i: number) =>
    setSel((s) => ({ i, dir: i >= s.i ? 1 : -1 }));

  const band = useSpring({
    y: -(active * 100) / cases.length,
    config: { tension: 160, friction: 28 },
  });
  const statT = useTransition(active, {
    from: { opacity: 0, transform: `translate3d(0,${sel.dir * 26}px,0)` },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 0, transform: `translate3d(0,${sel.dir * -26}px,0)` },
    exitBeforeEnter: true,
    config: { tension: 220, friction: 26 },
  });
  const bodyT = useTransition(active, {
    from: { opacity: 0, transform: "translate3d(0,18px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-12px,0)" },
    exitBeforeEnter: true,
    config: { tension: 220, friction: 27 },
  });

  return (
    <section id="proof" className="band-white py-26">
      <div className="shell">
        <SectionIntro
          eyebrow={caseStudies.eyebrow}
          lines={[...caseStudies.lines]}
          linesSm={[...caseStudies.linesSm]}
          standfirst={caseStudies.standfirst}
        />

        {/* The switcher: three real logos, the active one in full colour on
            a lifted tile. */}
        <div className="mt-14">
          <div
            role="tablist"
            aria-label="Case studies"
            className="mx-auto flex w-fit flex-wrap items-stretch justify-center gap-2 rounded-panel bg-surface-raised p-2.5 shadow-group"
          >
            {cases.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(i)}
                  className={`flex items-center justify-center rounded-card px-5 py-3 transition-all duration-[var(--duration-base)] ease-entrance focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid lg:px-6 ${
                    on ? "bg-surface-chip" : "opacity-50 hover:opacity-90"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.logo}
                    alt={c.name}
                    className={`${LOGO_CLASSES[i]} w-auto`}
                    style={{ aspectRatio: c.logoRatio }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* The band and its rider. */}
          <div className="relative min-h-[28rem] overflow-hidden rounded-panel">
            <animated.div
              aria-hidden
              style={{
                height: `${cases.length * 100}%`,
                transform: band.y.to((v) => `translate3d(0,${v}%,0)`),
              }}
              className="absolute inset-x-0 top-0"
            >
              {cases.map((c, i) => (
                <div
                  key={c.id}
                  className="grain w-full"
                  style={{
                    height: `${100 / cases.length}%`,
                    background: DEEPS[i],
                  }}
                />
              ))}
            </animated.div>
            <div className="relative flex h-full min-h-[28rem] flex-col items-center justify-center p-10 text-center">
              {statT((style, i) => {
                const c = cases[i];
                return (
                  <animated.div style={style}>
                    <p className="figure text-[clamp(4rem,9vw,8rem)] leading-none text-white">
                      {c.hero}
                    </p>
                    <p className="mx-auto mt-5 max-w-[24rem] text-h4 text-white/90">
                      {c.heroLabel}
                    </p>
                    <p className="mt-8 text-ui-sm font-medium uppercase tracking-eyebrow text-white/90">
                      {c.dropLine}
                    </p>
                  </animated.div>
                );
              })}
            </div>
          </div>

          {/* The story. The floors pin the row above the tallest case per
              breakpoint — measured 760px at 1440-wide shells, taller where
              the column narrows. */}
          <div className="min-h-[28rem] lg:min-h-[60rem] xl:min-h-[51rem]">
            {bodyT((style, i) => {
              const c = cases[i];
              const q = caseQuote(c.quoteName);
              return (
                <animated.div
                  style={style}
                  className="flex h-full flex-col gap-10"
                >
                  <div className="card-quiet flex-1 rounded-panel p-8 lg:p-10">
                    <div className="space-y-5">
                      {c.body.map((para) => (
                        <p
                          key={para.slice(0, 24)}
                          className="text-body leading-[1.7] text-ink"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                  <figure className="wash-soft flex flex-col rounded-panel p-8 lg:p-10">
                    <blockquote className="text-lead leading-[1.5] text-ink-heading">
                      “{q.quote}”
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline pt-6">
                      <span
                        className="icon-chip h-10 w-10 text-ui-sm font-medium"
                        aria-hidden
                      >
                        {q.org.slice(0, 1)}
                      </span>
                      <span>
                        <span className="block text-ui-base font-medium text-ink">
                          {q.name}
                        </span>
                        <span className="block text-ui-sm text-ink-label">
                          {q.org}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </animated.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

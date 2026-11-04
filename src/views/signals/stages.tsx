"use client";

import { Reveal } from "@/components/ui/reveal";
import { sigStages } from "@/data/content/signals";

import { DemoPill, SigHeading } from "./primitives";

/**
 * The reference's industries deck: the heading holds still on the left while
 * cards on the right pin one after another and the next slides up over the
 * last, each laid at a slight tilt (they measure +2°, −1°, 0°). Built with
 * `position: sticky` — the pin is layout, not animation, so the browser does
 * it on the compositor and it needs no scroll loop at all. Under `md` the
 * cards outgrow the viewport, so there they simply stack as a list.
 *
 * Six stages, so the reference's palette cycles: white, black, lilac, lime.
 * The stage that "needs you" (Manage) lands on lime, the highlight.
 */
const TILTS = [2, -1, 0, 1.5, -1.5, 0.5];
const GROUNDS = [
  "bg-sig-white text-sig-black",
  "sig-dark",
  "bg-sig-lilac text-sig-black",
  "bg-sig-creme-300 text-sig-black",
  "bg-sig-lime text-sig-black",
  "sig-dark",
];

export const SigStages = () => (
  <section id="how-it-works" className="sig-section">
    <div className="sig-wrap grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.5fr] lg:gap-16">
      <div className="self-start lg:sticky lg:top-32">
        <SigHeading lines={sigStages.linesSm} size="text-sig-5xl xl:text-sig-6xl" />
        <Reveal variant="up" delay={160}>
          <p className="mt-6 max-w-[23rem] text-sig-base">{sigStages.standfirst}</p>
          <div className="mt-8">
            <DemoPill label="Book a demo" tone="lilac" />
          </div>
        </Reveal>
      </div>

      <ol className="flex flex-col">
        {sigStages.stages.map((stage, i) => (
          <li
            key={stage.n}
            className="mb-5 last:mb-0 md:sticky md:mb-[22vh]"
            style={{ top: `calc(7rem + ${i * 1.25}rem)` }}
          >
            <article
              className={`${GROUNDS[i]} grid min-h-[30rem] grid-cols-1 gap-6 overflow-hidden rounded-sig-card p-3 shadow-[var(--raw-sig-shadow-card)] md:grid-cols-2`}
              style={{ transform: `rotate(${TILTS[i]}deg)` }}
            >
              <div className="flex flex-col justify-between rounded-sig-tile bg-current/[0.06] p-6 lg:p-8">
                <p className="sig-display text-sig-10xl leading-none opacity-90 md:text-sig-12xl">{stage.n}</p>
                <ul className="mt-10 space-y-2.5">
                  {stage.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-sig-base">
                      <span aria-hidden className="h-1.5 w-1.5 flex-none rounded-full bg-current" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-center p-4 lg:p-8">
                <h3 className="sig-display text-sig-5xl">{stage.title}</h3>
                <p className="mt-2 text-sig-lg font-medium tracking-sig-tight">{stage.sub}</p>
                <p className="mt-6 max-w-[20rem] text-sig-base">{stage.body}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

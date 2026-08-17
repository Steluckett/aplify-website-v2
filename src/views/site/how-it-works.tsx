"use client";

import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { howItWorks } from "@/data/content/site";

/**
 * Six stages.
 *
 * This is the page's most text-heavy idea, so it is the one that most needed
 * a shape rather than a wall. Each stage is a card: a large thin numeral, a
 * title, one sentence, then its specifics as chips. Reading the six numerals
 * down the grid gives you the whole process in about a second, which is what
 * most visitors will actually do.
 *
 * A 3×2 grid, never auto-fit: at mid widths auto-fit runs four-up and widows
 * the last two.
 */
export const HowItWorks = () => (
  <section id="how-it-works" className="py-24 lg:py-32">
    <div className="shell">
      <SectionIntro
        eyebrow={howItWorks.eyebrow}
        lines={howItWorks.lines}
        linesSm={howItWorks.linesSm}
        standfirst={howItWorks.standfirst}
      />

      <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {howItWorks.stages.map((stage, i) => (
          <Reveal key={stage.n} variant="up" delay={(i % 3) * 80}>
            <article className="tile flex h-full flex-col rounded-panel p-8 lg:p-10">
              <p className="figure text-h2 text-ink/25">{stage.n}</p>
              <h3 className="display mt-8 text-h3">{stage.title}</h3>
              <p className="mt-2 text-body font-medium text-ink-accent">{stage.sub}</p>
              <p className="mt-4 text-body leading-[1.6] text-ink-body">{stage.body}</p>

              <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                {stage.points.map((point) => (
                  <li key={point} className="chip">
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

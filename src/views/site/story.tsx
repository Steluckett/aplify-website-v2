"use client";

import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { payoff, story } from "@/data/content/site";

/**
 * The problem, shown rather than described.
 *
 * A messy feed is a hard thing to argue in prose — it is a table, so it is
 * shown as one. Raw values sit on the left in a quiet monospaced register;
 * the cleaned value sits beside each in the page's own type. The two columns
 * are the whole argument, and nobody has to read a paragraph to get it.
 */
export const Story = () => (
  <section id="problem" className="band-white py-24 lg:py-32">
    <div className="shell">
      <SectionIntro
        eyebrow={story.eyebrow}
        lines={story.lines}
        standfirst={story.standfirst}
      />

      <Reveal variant="rise" className="mt-16">
        <div className="wash rounded-panel">
          <div className="inset-tile overflow-hidden">
            {/* Column heads say which side is which — without them the table
                reads as two unrelated lists. */}
            <div className="grid grid-cols-1 gap-2 border-b border-hairline px-6 py-5 sm:grid-cols-2 sm:px-8">
              <p className="eyebrow">Straight from the ATS</p>
              <p className="eyebrow">Published by Aplify</p>
            </div>

            <ul className="divide-y divide-hairline">
              {story.rows.map((row) => (
                <li
                  key={row.raw}
                  className="grid grid-cols-1 gap-6 px-6 py-6 sm:grid-cols-2 sm:px-8"
                >
                  <div className="space-y-2">
                    <p className="text-ui-base text-ink-label line-through decoration-ink-label/40">
                      {row.raw}
                    </p>
                    <div className="flex flex-wrap gap-2 text-ui-xs text-ink-label">
                      <span>{row.rawRegion}</span>
                      <span aria-hidden>·</span>
                      <span>{row.rawSalary}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-ui-base font-medium text-ink">{row.clean}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="chip" data-tint="sky">
                        {row.region}
                      </span>
                      <span className="chip">{row.salary}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal variant="fade" delay={120}>
        <p className="mx-auto mt-6 max-w-[52rem] text-center text-xs text-ink-label">
          {story.footnote}
        </p>
      </Reveal>
    </div>
  </section>
);

/**
 * The payoff. Deliberately spare — a heading, a line, and the guarantees as
 * chips rather than a bulleted list, because five short absolutes read faster
 * as marks than as sentences.
 */
export const Payoff = () => (
  <section id="payoff" className="py-24 lg:py-32">
    <div className="shell">
      <SectionIntro
        eyebrow={payoff.eyebrow}
        lines={payoff.lines}
        linesSm={payoff.linesSm}
        standfirst={payoff.standfirst}
      >
        <div className="flex flex-wrap justify-center gap-2">
          {payoff.chips.map((chip) => (
            <span key={chip} className="chip">
              {chip}
            </span>
          ))}
        </div>
      </SectionIntro>
    </div>
  </section>
);

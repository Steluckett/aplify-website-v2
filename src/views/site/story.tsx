"use client";

import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { story } from "@/data/content/site";

/**
 * The problem, shown rather than described.
 *
 * A messy feed is a hard thing to argue in prose — it is a table, so it is
 * shown as one. Raw values sit on the left in a quiet monospaced register;
 * the cleaned value sits beside each in the page's own type. The two columns
 * are the whole argument, and nobody has to read a paragraph to get it.
 */
/*
 * `relative` on the section is load bearing. The map band's artwork bleeds
 * up under this one, and only a POSITIONED element paints its background
 * above an earlier sibling's in-flow content. Drop it and the bleed
 * inverts: the image sits on top of the white instead of under it.
 */
export const Story = () => (
  <section id="data" className="py-26">
    <div className="shell">
      <SectionIntro
        eyebrow={story.eyebrow}
        lines={story.lines}
        standfirst={story.standfirst}
      />

      <Reveal variant="rise" className="mt-16">
        <div className="wash wash-lg rounded-panel">
          <div className="inset-tile overflow-hidden">
            {/* Column heads say which side is which — without them the table
                reads as two unrelated lists. */}
            <div className="grid grid-cols-1 gap-10 border-b border-hairline px-8 py-6 sm:grid-cols-2 sm:px-10">
              <p className="eyebrow">Straight from the ATS</p>
              <p className="eyebrow">Published by Aplify</p>
            </div>

            <ul className="divide-y divide-hairline">
              {story.rows.map((row) => (
                <li
                  key={row.raw}
                  className="grid grid-cols-1 gap-10 px-8 py-8 sm:grid-cols-2 sm:px-10"
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
                    <p className="text-ui-base font-medium text-ink">
                      {row.clean}
                    </p>
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
    </div>
  </section>
);

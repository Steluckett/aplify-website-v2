"use client";

import { useRef } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { StackedLines } from "@/components/ui/stacked-lines";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { howItWorksContent } from "@/data/content/platform";
import { STAGES } from "@/data/content/stage-data";

/**
 * Set piece 2 — the six stages (§8.6) as a pinned progression.
 *
 * Six accordion rows put every stage on screen at once and made the section a
 * wall: eighteen facts and six paragraphs, all at the same weight. Here the
 * section pins and the reader travels *through* the stages, one at a time,
 * with a rail showing where they are. Same content, a fraction of the
 * perceived density — and the sequence, which is the actual argument, is now
 * something you feel rather than read.
 *
 * Below `lg` the pin is dropped for a plain vertical stepper: pinning a
 * horizontal track on a phone is the single most common way this pattern
 * turns into a scroll-jail.
 */
export const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef, { padStart: 0.06, padEnd: 0.1 });

  // Which stage is "current" — the rail and the active card read from this.
  const exact = progress * (STAGES.length - 1);
  const active = Math.round(exact);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="border-t border-hairline"
    >
      {/* ---------- Desktop: pinned progression ---------- */}
      <div className="hidden lg:block" style={{ height: `${STAGES.length * 60}svh` }}>
        <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden px-10">
          <div className="flex items-end justify-between gap-10">
            <div>
              <Eyebrow>{howItWorksContent.eyebrow}</Eyebrow>
              <StackedLines
                tag="h2"
                id="how-it-works-heading"
                lines={["Six stages, from raw feed", "to finished application"]}
                className="display mt-5 text-h2"
              />
            </div>

            {/* The rail: six ticks, the current one lit and wide. */}
            <ol aria-hidden className="flex shrink-0 items-center gap-2">
              {STAGES.map((stage, index) => (
                <li
                  key={stage.num}
                  className="h-0.5 rounded-pill transition-all duration-500"
                  style={{
                    width: index === active ? "3rem" : "1.25rem",
                    background:
                      index === active
                        ? "var(--brand-light)"
                        : index < active
                          ? "var(--ink-soft)"
                          : "var(--hairline-strong)",
                  }}
                />
              ))}
            </ol>
          </div>

          {/* The track. One stage occupies the frame; the rest sit to the
              right, translated in as progress advances. */}
          <div className="relative mt-16 h-[22rem]">
            {STAGES.map((stage, index) => {
              const offset = index - exact;
              const near = Math.abs(offset) < 1.6;
              return (
                <article
                  key={stage.num}
                  aria-hidden={index !== active}
                  className="absolute inset-0 grid grid-cols-[7rem_minmax(0,1fr)_20rem] items-start gap-12"
                  style={{
                    transform: `translateX(${offset * 42}%)`,
                    opacity: near ? Math.max(0, 1 - Math.abs(offset) * 1.15) : 0,
                    filter: `blur(${Math.min(10, Math.abs(offset) * 7)}px)`,
                    pointerEvents: index === active ? "auto" : "none",
                    transition: "none",
                  }}
                >
                  <span className="display text-[4.5rem] leading-none text-ink-soft/50">
                    {stage.num}
                  </span>

                  <div>
                    <h3 className="display text-[2.75rem]">{stage.name}</h3>
                    <p className="mt-3 text-h3 leading-snug text-ink">
                      {stage.headline}
                    </p>
                    <p className="mt-5 max-w-[32rem] text-body leading-relaxed text-ink-muted">
                      {stage.detail}
                    </p>
                  </div>

                  <ul className="pt-3">
                    {stage.points.map((point) => (
                      <li
                        key={point}
                        className="border-t border-hairline py-3 text-body leading-snug text-ink-muted"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------- Mobile: vertical stepper, no pin ---------- */}
      <div className="px-6 py-24 lg:hidden">
        <Eyebrow>{howItWorksContent.eyebrow}</Eyebrow>
        <StackedLines
          tag="h2"
          lines={["Six stages,", "raw feed to", "finished application"]}
          className="display mt-5 text-[2.5rem]"
        />

        <ol className="mt-12">
          {STAGES.map((stage) => (
            <li
              key={stage.num}
              className="relative border-l border-hairline py-7 pl-8"
            >
              <span
                aria-hidden
                className="absolute top-9 -left-[3px] size-1.5 rounded-pill bg-brand-light"
              />
              <span className="text-caption text-ink-soft">{stage.num}</span>
              <h3 className="display mt-1 text-[1.75rem]">{stage.name}</h3>
              <p className="mt-1.5 text-body text-ink">{stage.headline}</p>
              <p className="mt-3 text-body leading-relaxed text-ink-muted">
                {stage.detail}
              </p>
              <ul className="mt-4">
                {stage.points.map((point) => (
                  <li
                    key={point}
                    className="border-t border-hairline py-2.5 text-body leading-snug text-ink-muted"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

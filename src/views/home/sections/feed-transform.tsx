"use client";

import { useRef } from "react";

import { Inview } from "@/components/animation/springs/in-view";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StackedLines } from "@/components/ui/stacked-lines";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import {
  feedColumns,
  feedRows,
  problemContent,
  solutionContent,
  type FeedCell,
} from "@/data/content/spine";

/**
 * Set piece 1 — the message spine's problem and solution, fused.
 *
 * V1 and the first V2 pass both rendered these as two static tables stacked
 * vertically, leaving the reader to diff them by eye. Here it is **one**
 * table that transforms in place as you scroll: the duplicated location
 * collapses, the three spellings of one region converge, the salaries
 * normalise. The product's central claim, shown happening rather than
 * described twice.
 *
 * The section is pinned for its own height, so the transform has room to run
 * without the reader racing past it. Rows resolve in sequence — a stagger
 * across `progress` — so it reads as a pass over the feed, not a toggle.
 *
 * Reduced motion and no-JS both land on the *cleaned* state, which is the
 * state that carries the argument; the raw values remain in the DOM for the
 * caption to reference.
 */
export const FeedTransform = () => {
  const sectionRef = useRef<HTMLElement>(null);
  // Ends a little before the runway does, so the cleaned state is held on
  // screen for a beat rather than resolving exactly as the pin releases.
  const progress = useScrollProgress(sectionRef, { padEnd: 0.08 });

  return (
    <section
      ref={sectionRef}
      id="problem"
      aria-labelledby="problem-heading"
      className="relative"
    >
      {/* The scroll runway. Its height is what the pin scrubs against. */}
      <div className="h-[205svh]">
        <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden px-6 sm:px-10">
          {/* The two headings cross-fade as the table resolves: the problem
              states itself, the solution answers it, in the same place. */}
          <div className="relative h-[13rem] sm:h-[12.5rem]">
            <HeadBlock
              eyebrow={problemContent.eyebrow}
              lines={problemContent.headlineLines}
              standfirst={problemContent.standfirst}
              id="problem-heading"
              opacity={1 - clamp(progress / 0.4)}
            />
            <HeadBlock
              eyebrow={solutionContent.eyebrow}
              lines={solutionContent.headlineLines}
              standfirst={solutionContent.standfirst}
              id="solution-heading"
              opacity={clamp((progress - 0.45) / 0.35)}
            />
          </div>

          <FeedTable progress={progress} />

          <p className="mt-6 max-w-[46rem] text-caption leading-relaxed text-ink-soft">
            {solutionContent.caption}
          </p>
        </div>
      </div>
    </section>
  );
};

const clamp = (n: number) => Math.min(1, Math.max(0, n));

const HeadBlock = ({
  eyebrow,
  lines,
  standfirst,
  id,
  opacity,
}: {
  eyebrow: string;
  lines: string[];
  standfirst: string;
  id: string;
  opacity: number;
}) => (
  <div
    className="absolute inset-x-0 top-0"
    style={{ opacity, pointerEvents: opacity < 0.5 ? "none" : "auto" }}
    aria-hidden={opacity < 0.5}
  >
    <Eyebrow>{eyebrow}</Eyebrow>
    <StackedLines
      tag="h2"
      id={id}
      lines={lines}
      className="display mt-4 text-h2"
    />
    <p className="mt-4 max-w-[30rem] text-body leading-relaxed text-ink-muted">
      {standfirst}
    </p>
  </div>
);

/**
 * The table. Each cell holds both values stacked in one grid area and
 * cross-fades between them at its own point in the sweep, so the fix travels
 * down the rows rather than flipping at once.
 */
const FeedTable = ({ progress }: { progress: number }) => (
  <div className="mt-8 overflow-hidden rounded-card-lg border border-hairline bg-surface">
    {/* Label swaps with the content it describes. */}
    <div className="flex items-center justify-between border-b border-hairline px-5 py-4 sm:px-8">
      <div className="relative h-4 flex-1">
        <span
          className="eyebrow absolute inset-0"
          style={{ opacity: 1 - clamp(progress / 0.4) }}
        >
          {problemContent.rawLabel}
        </span>
        <span
          className="eyebrow absolute inset-0 text-brand-light"
          style={{ opacity: clamp((progress - 0.45) / 0.35) }}
        >
          {solutionContent.cleanLabel}
        </span>
      </div>
      {/* Progress rail — tells the reader the section is doing something and
          how far through it is. */}
      <span
        aria-hidden
        className="ml-4 hidden h-px w-24 overflow-hidden rounded-pill bg-hairline-strong sm:block"
      >
        <span
          className="block h-full bg-brand-light"
          style={{ width: `${clamp(progress) * 100}%` }}
        />
      </span>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-hairline">
            {feedColumns.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-5 py-3 text-caption font-normal tracking-[0.14em] text-ink-soft uppercase sm:px-8"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {feedRows.map((row, index) => {
            // Each row resolves a beat after the one above it.
            const rowStart = 0.18 + index * 0.16;
            const local = clamp((progress - rowStart) / 0.22);
            return (
              <tr key={index} className="border-b border-hairline last:border-b-0">
                <Cell cell={row.title} t={local} />
                <Cell cell={row.region} t={local} />
                <Cell cell={row.salary} t={local} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

/**
 * One cell, both states stacked. The raw value blurs out as the clean value
 * resolves; an unchanged cell just renders once and never moves, which is
 * itself informative — it shows the product isn't rewriting what was already
 * right (§6.10).
 */
const Cell = ({ cell, t }: { cell: FeedCell; t: number }) => {
  if (!cell.fixed) {
    return (
      <td className="px-5 py-5 text-body whitespace-nowrap sm:px-8">
        {cell.clean}
      </td>
    );
  }

  return (
    <td className="px-5 py-5 text-body whitespace-nowrap sm:px-8">
      <span className="grid">
        <span
          style={{
            gridArea: "1 / 1",
            opacity: 1 - t,
            filter: `blur(${t * 5}px)`,
          }}
          className="text-ink-muted line-through decoration-transparent"
        >
          {cell.raw}
        </span>
        <span
          style={{
            gridArea: "1 / 1",
            opacity: t,
            filter: `blur(${(1 - t) * 5}px)`,
          }}
          className="text-ink"
        >
          {cell.clean}
        </span>
      </span>
    </td>
  );
};

/**
 * The payoff — closes the spine on the light-free ground with the display
 * words and the supporting labels. Kept out of the pinned runway above so the
 * reader lands on it as a release after the transform.
 */
export const Payoff = ({
  words,
  headline,
  eyebrow,
  standfirst,
  labels,
}: {
  words: string[];
  headline: string;
  eyebrow: string;
  standfirst: string;
  labels: string[];
}) => (
  <section
    id="payoff"
    aria-labelledby="payoff-heading"
    className="px-6 py-28 sm:px-10 lg:py-36"
  >
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 id="payoff-heading" className="sr-only">
      {headline}
    </h2>

    <Inview
      tag="div"
      mode="once"
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      config={{ tension: 180, friction: 30 }}
      aria-hidden
      className="display mt-8 text-piece"
    >
      <span className="flex items-baseline justify-between gap-[0.4em]">
        <span className="whitespace-nowrap text-ink-soft/40">{words[0]}</span>
        <span className="whitespace-nowrap text-ink-soft/40">{words[1]}</span>
      </span>
      <span className="flex items-baseline justify-between gap-[0.4em]">
        <span className="whitespace-nowrap text-ink">{words[2]}</span>
        <span className="whitespace-nowrap text-ink-soft/40">{words[3]}</span>
      </span>
    </Inview>

    <div className="mt-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <Inview
        tag="p"
        mode="once"
        from={{ opacity: 0, filter: "blur(6px)" }}
        to={{ opacity: 1, filter: "blur(0px)" }}
        config={{ tension: 190, friction: 30 }}
        className="max-w-[34rem] text-base leading-relaxed text-ink-muted"
      >
        {standfirst}
      </Inview>

      <Inview
        tag="ul"
        mode="once"
        from={{ opacity: 0, filter: "blur(6px)" }}
        to={{ opacity: 1, filter: "blur(0px)" }}
        delayIn={120}
        config={{ tension: 190, friction: 30 }}
        className="flex max-w-[30rem] flex-wrap gap-2"
      >
        {labels.map((label) => (
          <li
            key={label}
            className="inline-flex items-center rounded-pill border border-hairline
                       px-4 py-2 text-caption font-medium tracking-[0.08em] uppercase text-ink-muted"
          >
            {label}
          </li>
        ))}
      </Inview>
    </div>
  </section>
);

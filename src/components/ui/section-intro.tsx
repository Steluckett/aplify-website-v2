"use client";

import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { StackedLines } from "@/components/ui/stacked-lines";
import type { Tags } from "@/types/springs";

export interface SectionIntroProps {
  eyebrow?: string;
  /** Explicit line breaks for the heading — one entry per rendered line. */
  lines: string[];
  /**
   * Narrower line breaks. `StackedLines` sets each line `nowrap` so the breaks
   * are the author's rather than the browser's, which means a two-line desktop
   * heading has to be re-broken for a phone instead of overflowing.
   */
  linesSm?: string[];
  /** Trailing words that take the gradient tip. Headings only, never data. */
  standfirst?: ReactNode;
  align?: "center" | "left";
  tag?: Tags;
  className?: string;
  children?: ReactNode;
}

/**
 * The section opener: eyebrow, display heading, standfirst.
 *
 * SIGNALS STEER (branch design/signals-steer): LEFT-aligned by default and
 * TWO-TONE — a multi-line heading sets its closing line in the accent
 * (`grad-tip`), after marketingsignals.com, whose every section opens that way.
 * `align="center"` still exists for the closing ask.
 *
 * The heading reveals line by line; the eyebrow leads it and the standfirst
 * follows, so the group arrives as one gesture reading top to bottom.
 */
export const SectionIntro = ({
  eyebrow,
  lines,
  linesSm,
  standfirst,
  align = "left",
  tag = "h2",
  className,
  children,
}: SectionIntroProps) => {
  const centred = align === "center";
  const headingClass = `display lines-tight text-h1 ${centred ? "text-center" : ""}`;
  // TextEngine's container is flex, so `text-align` alone cannot align it —
  // the justify has to land on that container, which is what StackedLines
  // forwards its `lineClassName` to.
  const lineClass = centred ? "justify-center" : "";
  // The closing line takes the accent — only when there is more than one,
  // or a single-line heading would set entirely in violet.
  const tone = (n: number) =>
    n > 1 ? Array.from({ length: n }, (_, i) => (i === n - 1 ? "grad-tip" : "")) : undefined;

  return (
    <div
      className={`${centred ? "mx-auto max-w-[60rem] text-center" : "max-w-[64rem]"} ${className ?? ""}`}
    >
      {eyebrow ? (
        <Reveal variant="fade">
          <p className={`eyebrow ${centred ? "justify-center" : ""}`}>{eyebrow}</p>
        </Reveal>
      ) : null}

      {/* TextEngine's container is flex, so text-align alone cannot centre it —
          the tag needs justify-center too. */}
      <StackedLines
        tag={tag}
        lines={lines}
        className={`${headingClass} mt-5 ${linesSm ? "hidden sm:block" : ""}`}
        lineClassName={lineClass}
        lineClassNames={tone(lines.length)}
        stagger={110}
        duration={1000}
      />
      {linesSm ? (
        <StackedLines
          tag={tag}
          lines={linesSm}
          className={`${headingClass} mt-5 sm:hidden`}
          lineClassName={lineClass}
          lineClassNames={tone(linesSm.length)}
          stagger={110}
          duration={1000}
        />
      ) : null}

      {standfirst ? (
        <Reveal variant="up" delay={220}>
          <p
            className={`mt-6 max-w-[var(--measure-lead)] text-lead leading-[1.5] text-ink-body ${centred ? "mx-auto" : ""}`}
          >
            {standfirst}
          </p>
        </Reveal>
      ) : null}

      {children ? (
        <Reveal variant="up" delay={320}>
          <div className={`mt-8 ${centred ? "flex justify-center" : ""}`}>{children}</div>
        </Reveal>
      ) : null}
    </div>
  );
};

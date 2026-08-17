"use client";

import TextEngine from "spring-text-engine";
import { easings } from "@react-spring/web";

import { Inview } from "@/components/animation/springs/in-view";
import { Eyebrow } from "@/components/ui/eyebrow";

export interface SectionHeaderProps {
  /** §10.1 — two or three words, the quietest thing on screen. */
  eyebrow: string;
  /** §10.2 — sentence case, states a position or a promise, never a category. */
  headline: string;
  /** The aria/anchor id the headline carries. */
  headlineId: string;
  /** §10.3 — one or two sentences, ~34rem measure. Optional but usual. */
  standfirst?: string;
  /** Set on dark (ink card / black band) sections. */
  tone?: "light" | "dark";
  className?: string;
}

/**
 * The copy ladder every section opens with (handover §10): eyebrow →
 * headline → standfirst. Consistency here is what holds the long page
 * together, so sections use this rather than composing their own.
 *
 * Type-weight convention (§10): body copy is full-strength; only the eyebrow
 * is muted. The standfirst is deliberately NOT grey — V1 started grey and it
 * read as tentative.
 */
export const SectionHeader = ({
  eyebrow,
  headline,
  headlineId,
  standfirst,
  tone = "light",
  className,
}: SectionHeaderProps) => (
  <div className={className}>
    <Inview
      tag="div"
      mode="once"
      from={{ opacity: 0, transform: "translateY(12px)" }}
      to={{ opacity: 1, transform: "translateY(0px)" }}
    >
      <Eyebrow
        tone={tone === "dark" ? "light" : "dark"}
        className="tracking-[0.14em] uppercase"
      >
        {eyebrow}
      </Eyebrow>
    </Inview>

    <TextEngine
      tag="h2"
      id={headlineId}
      mode="once"
      overflow
      lineIn={{ y: "0%", opacity: 1 }}
      lineOut={{ y: "100%", opacity: 0 }}
      lineStagger={120}
      lineConfig={{ duration: 900, easing: easings.easeOutCubic }}
      delayIn={120}
      className="mt-5 max-w-[22ch] text-4xl font-semibold tracking-tight
                 sm:text-5xl lg:text-[length:var(--text-headline)]
                 max-xl:lg:text-[length:var(--text-headline-fluid)]"
    >
      {headline}
    </TextEngine>

    {standfirst ? (
      <Inview
        tag="p"
        mode="once"
        from={{ opacity: 0, transform: "translateY(12px)" }}
        to={{ opacity: 1, transform: "translateY(0px)" }}
        delayIn={200}
        className="mt-6 max-w-[34rem] text-lead leading-lead tracking-lead"
      >
        {standfirst}
      </Inview>
    ) : null}
  </div>
);

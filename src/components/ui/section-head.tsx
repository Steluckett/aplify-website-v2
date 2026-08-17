"use client";

import type { ReactNode } from "react";

import { Inview } from "@/components/animation/springs/in-view";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StackedLines } from "@/components/ui/stacked-lines";

export type Volume = "piece" | "section" | "quiet";

export interface SectionHeadProps {
  eyebrow: string;
  /** Each entry is its own clipped line — explicit breaks, never greedy wrap. */
  lines: string[];
  id: string;
  standfirst?: string;
  /**
   * How loud this section is allowed to be. The page has four set pieces and
   * three demos; everything else is deliberately `quiet` so the loud things
   * have somewhere to be loud against (the fix for ten sections shouting at
   * the same volume).
   */
  volume?: Volume;
  /** Optional trailing content on the same row as the head, right-aligned. */
  aside?: ReactNode;
  className?: string;
}

const HEADLINE: Record<Volume, string> = {
  piece: "display text-piece",
  section: "display text-h2",
  quiet: "font-sans text-h3 font-medium tracking-tight",
};

const STANDFIRST: Record<Volume, string> = {
  piece: "mt-7 max-w-[34rem] text-lg leading-relaxed text-ink-muted",
  section: "mt-5 max-w-[32rem] text-base leading-relaxed text-ink-muted",
  quiet: "mt-3 max-w-[30rem] text-body leading-relaxed text-ink-muted",
};

/**
 * The copy ladder from handover §10 — eyebrow → headline → standfirst — but
 * rendered at three genuinely different volumes. §10 is house style, not a
 * §6 non-negotiable: the *ladder* holds the page together, rendering every
 * rung identically is what made it flat.
 */
export const SectionHead = ({
  eyebrow,
  lines,
  id,
  standfirst,
  volume = "section",
  aside,
  className,
}: SectionHeadProps) => (
  <div
    className={`flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between ${className ?? ""}`}
  >
    <div className="max-w-[46rem]">
      <Inview
        tag="div"
        mode="once"
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ tension: 200, friction: 30 }}
      >
        <Eyebrow>{eyebrow}</Eyebrow>
      </Inview>

      <StackedLines
        tag="h2"
        id={id}
        lines={lines}
        stagger={volume === "piece" ? 130 : 100}
        className={`mt-5 ${HEADLINE[volume]}`}
      />

      {standfirst ? (
        <Inview
          tag="p"
          mode="once"
          from={{ opacity: 0, filter: "blur(6px)" }}
          to={{ opacity: 1, filter: "blur(0px)" }}
          delayIn={180}
          config={{ tension: 190, friction: 30 }}
          className={STANDFIRST[volume]}
        >
          {standfirst}
        </Inview>
      ) : null}
    </div>

    {aside ? <div className="shrink-0">{aside}</div> : null}
  </div>
);

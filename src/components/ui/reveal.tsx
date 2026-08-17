"use client";

import type { ReactNode } from "react";

import { Inview } from "@/components/animation/springs/in-view";
import type { Tags } from "@/types/springs";

/**
 * The page's entrance animation, as three presets rather than free parameters.
 *
 * Motion here is soft and slightly overdamped — things arrive and settle, they
 * never bounce. That restraint is the whole difference between "animated" and
 * "considered": a spring with visible overshoot reads as a template, and the
 * same spring at high friction reads as glass. Every section uses these three
 * so the page has ONE motion signature rather than a dozen improvised ones.
 *
 * `mode="once"` throughout: content that re-animates every time it re-enters
 * the viewport is exhausting on a long page, and it makes scrolling back up
 * feel broken.
 */
export type RevealVariant = "up" | "fade" | "rise";

const VARIANTS: Record<RevealVariant, { from: Record<string, unknown>; to: Record<string, unknown> }> = {
  /** Standard: a short lift with the fade. For copy, cards, list items. */
  up: {
    from: { opacity: 0, transform: "translate3d(0, 28px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
  },
  /** Opacity only — for things whose position is already meaningful. */
  fade: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  /** A longer, slower lift with a touch of scale. Reserved for the big
   *  surfaces — a product frame or a full-width panel — where a short travel
   *  reads as a twitch against the size of the thing moving. */
  rise: {
    from: { opacity: 0, transform: "translate3d(0, 56px, 0) scale(0.985)" },
    to: { opacity: 1, transform: "translate3d(0, 0px, 0) scale(1)" },
  },
};

/** Gentle and settled. Friction is high on purpose — no overshoot. */
const CONFIG: Record<RevealVariant, Record<string, number>> = {
  up: { tension: 150, friction: 28, mass: 1 },
  fade: { tension: 120, friction: 26, mass: 1 },
  rise: { tension: 110, friction: 30, mass: 1.1 },
};

export interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  /** ms before this element starts. Use to stagger siblings. */
  delay?: number;
  className?: string;
  tag?: Tags;
}

export const Reveal = ({
  children,
  variant = "up",
  delay = 0,
  className,
  tag = "div",
}: RevealProps) => (
  <Inview
    tag={tag}
    mode="once"
    className={className}
    from={VARIANTS[variant].from}
    to={VARIANTS[variant].to}
    config={CONFIG[variant]}
    delayIn={delay}
  >
    {children}
  </Inview>
);

/**
 * Staggers a list of children through `Reveal` without every call site doing
 * its own index arithmetic. `step` is the gap between siblings in ms — 70 is
 * fast enough to read as one gesture rather than a queue.
 */
export const RevealGroup = ({
  children,
  variant = "up",
  step = 70,
  baseDelay = 0,
  className,
  itemClassName,
}: {
  children: ReactNode[];
  variant?: RevealVariant;
  step?: number;
  baseDelay?: number;
  className?: string;
  itemClassName?: string;
}) => (
  <div className={className}>
    {children.map((child, i) => (
      <Reveal
        key={i}
        variant={variant}
        delay={baseDelay + i * step}
        className={itemClassName}
      >
        {child}
      </Reveal>
    ))}
  </div>
);

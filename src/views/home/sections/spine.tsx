"use client";

import { payoffContent } from "@/data/content/spine";

import { FeedTransform, Payoff } from "./feed-transform";

/**
 * The message spine — handover §8 sections 2–4, run as one continuous
 * uninterrupted stretch before any product detail (§13 keeps this).
 *
 * Problem and solution are fused into a single scroll-driven transform; the
 * payoff lands after it as the release.
 */
export const Spine = () => (
  <>
    <FeedTransform />
    <Payoff
      eyebrow={payoffContent.eyebrow}
      headline={payoffContent.headline}
      words={payoffContent.displayWords}
      standfirst={payoffContent.standfirst}
      labels={payoffContent.labels}
    />
  </>
);

"use client";

import { type RefObject, useEffect, useState } from "react";

/**
 * 0–1 progress of an element travelling through the viewport, for scrubbed
 * effects that are NOT pinned (the statement's word fill). `start` and `end`
 * are the viewport fractions at which the element's top starts and its
 * bottom finishes: the defaults run from "top at 90% down" to "bottom at 55%
 * down", which is the reference's fill window.
 *
 * Coalesced to one rAF per scroll burst; reduced motion reports 1.
 */
export const useViewportProgress = (
  ref: RefObject<HTMLElement | null>,
  start = 0.9,
  end = 0.55,
): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    let frame: number | null = null;
    const measure = () => {
      frame = null;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const from = start * vh;
      const span = from - end * vh + r.height;
      setProgress(Math.min(1, Math.max(0, (from - r.top) / span)));
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [ref, start, end]);

  return progress;
};

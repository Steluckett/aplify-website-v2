"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export interface ScrollProgressOptions {
  /**
   * Extra travel, as a fraction of the element's height, before progress
   * starts and after it ends. 0 means progress is 0 the instant the element's
   * top reaches the viewport top and 1 when its bottom reaches the bottom.
   */
  padStart?: number;
  padEnd?: number;
}

/**
 * Normalised 0–1 progress of an element through the viewport, for pinned
 * scroll set pieces.
 *
 * Deliberately not built on the vendored `ProgressTrigger`: that runs off the
 * shared render loop and its `onChange` never fired for a `top top` →
 * `bottom bottom` pin here, and `src/hooks/animation/` is protected from
 * modification (AGENTS.md rule 2).
 *
 * This is not a second forever-loop either — nothing is scheduled until a
 * scroll or resize event arrives, and each burst is coalesced into one rAF.
 * Lenis drives the page with `window.scrollTo`, which emits native scroll
 * events, so it works with smooth scrolling rather than around it.
 *
 * Under `prefers-reduced-motion` the element reports **1** immediately: every
 * set piece using this is authored so its finished state is the one that
 * carries the argument.
 */
export const useScrollProgress = (
  ref: RefObject<HTMLElement | null>,
  { padStart = 0, padEnd = 0 }: ScrollProgressOptions = {},
): number => {
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setProgress(1);
      return;
    }

    const measure = () => {
      frame.current = null;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      // Distance the element travels between "top at viewport top" and
      // "bottom at viewport bottom".
      const travel = rect.height - viewport;
      if (travel <= 0) {
        setProgress(rect.top <= 0 ? 1 : 0);
        return;
      }

      const raw = -rect.top / travel;
      const padded = (raw - padStart) / Math.max(0.0001, 1 - padStart - padEnd);
      setProgress(Math.min(1, Math.max(0, padded)));
    };

    const schedule = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [ref, padStart, padEnd]);

  return progress;
};

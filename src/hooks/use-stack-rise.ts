"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface StackRiseOptions {
  /** Where each card pins, in px from the viewport top. */
  restTops: number[];
  /** Distance over which an arriving card eases from "rising" to "pinned". */
  revealPx?: number;
}

export interface StackRise {
  /** 0–1 per card: how fully it has arrived at its pin. */
  risen: number[];
  /** Continuous count of how many later cards are stacked over each card. */
  buried: number[];
}

/**
 * Per-card arrival and burial for a sticky card stack.
 *
 * Why this exists rather than a `SpringTrigger` per card. A trigger reads its
 * own element's rect, and a `position: sticky` element's rect FREEZES the
 * moment it pins — so the card that most needs to keep animating is the one
 * whose measurements stop moving. The way out is the one the reference uses:
 * a card's burial is not read from itself at all, it is read from the cards
 * ABOVE it, which are still travelling. That is cross-card state, and no
 * per-element trigger can express it.
 *
 * So this hook measures, and springs animate. It is input, not motion —
 * nothing here writes a style. It hands `risen`/`buried` to the component,
 * which drives react-spring with them (AGENTS.md rule 1).
 *
 * Same shape as `use-scroll-progress`: nothing is scheduled until a scroll or
 * resize arrives, each burst is coalesced into a single rAF, and Lenis drives
 * the page with `window.scrollTo` so native scroll events still fire.
 *
 * Under `prefers-reduced-motion` every card reports fully risen and nothing
 * buried — the flat, finished stack, which is the state that carries the
 * content.
 */
export const useStackRise = (
  refs: React.RefObject<HTMLElement | null>[],
  { restTops, revealPx = 480 }: StackRiseOptions,
): StackRise => {
  const count = refs.length;
  const [state, setState] = useState<StackRise>(() => ({
    risen: new Array(count).fill(0),
    buried: new Array(count).fill(0),
  }));
  const frame = useRef<number | null>(null);

  const measure = useCallback(() => {
    frame.current = null;
    const risen = new Array(count).fill(0);

    for (let i = 0; i < count; i++) {
      const el = refs[i]?.current;
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      const rest = restTops[i] ?? 0;
      // 0 while the card is still `revealPx` below its pin, 1 once it arrives.
      const r = (rest + revealPx - top) / revealPx;
      risen[i] = r < 0 ? 0 : r > 1 ? 1 : r;
    }

    // Walk back to front so the running total is "everything above me".
    const buried = new Array(count).fill(0);
    let suffix = 0;
    for (let i = count - 1; i >= 0; i--) {
      buried[i] = suffix;
      suffix += risen[i];
    }

    setState((prev) => {
      const same =
        prev.risen.every((v, i) => Math.abs(v - risen[i]) < 0.001) &&
        prev.buried.every((v, i) => Math.abs(v - buried[i]) < 0.001);
      return same ? prev : { risen, buried };
    });
  }, [count, refs, restTops, revealPx]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState({
        risen: new Array(count).fill(1),
        buried: new Array(count).fill(0),
      });
      return;
    }

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
  }, [count, measure]);

  return state;
};

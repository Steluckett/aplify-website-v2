"use client";

import { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

import { useViewportProgress } from "./use-viewport-progress";

interface Cut {
  key: string;
  title: string;
  body: string;
}

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
/** Piecewise-linear map of `x` through [x0..x1] → [y0..y1], clamped. */
const ramp = (x: number, x0: number, x1: number, y0: number, y1: number) =>
  y0 + (y1 - y0) * clamp((x - x0) / (x1 - x0), 0, 1);

/**
 * The friction band's list — the eight places candidates go, set at display
 * size, read by scrolling (option A, Stephen's pick, 2026-11-04).
 *
 * Driven by the reader's scroll, spring-smoothed: the upcoming reasons wait
 * faint; the current one comes to full ink with its sentence beside it; as
 * the reader moves on, a lime bar draws through it and the sentence goes.
 * By the end the whole list is struck. The strike is visual — a place they
 * were lost — and claims nothing about any single fix.
 *
 * Under `lg` every sentence stays visible beneath its line (a phone has no
 * column beside it); under reduced motion the list is simply static and
 * fully readable.
 */
export const FrictionList = ({ cuts }: { cuts: readonly Cut[] }) => {
  const ref = useRef<HTMLOListElement>(null);
  const progress = useViewportProgress(ref, 0.72, 0.28);
  const { p } = useSpring({
    p: progress,
    config: { tension: 110, friction: 26 },
  });
  const n = cuts.length;

  const [mode, setMode] = useState<"wide" | "narrow" | "still">("wide");
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 64rem)");
    const pick = () =>
      setMode(reduce.matches ? "still" : wide.matches ? "wide" : "narrow");
    pick();
    wide.addEventListener("change", pick);
    return () => wide.removeEventListener("change", pick);
  }, []);

  return (
    <ol ref={ref} className="border-t border-sig-hair">
      {cuts.map((cut, i) => {
        // x < 0: still to come · 0..1: the current one · > 1: passed.
        const x = (v: number) => v * n - i;
        const titleOpacity = p.to((v) =>
          mode === "still" ? 1 : ramp(x(v), -0.35, 0, 0.18, 1),
        );
        const bodyOpacity = p.to((v) => {
          if (mode !== "wide") return 1;
          const t = x(v);
          return t < 0.5 ? ramp(t, -0.15, 0.1, 0, 1) : ramp(t, 0.85, 1.1, 1, 0);
        });
        const strike = p.to((v) =>
          mode === "still" ? 0 : ramp(x(v), 0.6, 1.05, 0, 1),
        );
        return (
          <li
            key={cut.key}
            className="grid grid-cols-1 gap-3 border-b border-sig-hair py-5 lg:grid-cols-12 lg:items-center lg:gap-5 lg:py-6"
          >
            <animated.h3
              style={{ opacity: titleOpacity }}
              className="sig-display text-sig-5xl lg:col-span-7 lg:text-sig-7xl"
            >
              <span className="relative inline-block">
                {cut.title}
                <animated.span
                  aria-hidden
                  className="absolute inset-x-[-0.04em] top-[54%] h-[0.11em] origin-left rounded-full bg-sig-lime"
                  style={{ transform: strike.to((s) => `scaleX(${s})`) }}
                />
              </span>
            </animated.h3>
            <animated.p
              style={{ opacity: bodyOpacity }}
              className="max-w-[26rem] text-sig-base lg:col-span-4 lg:col-start-9"
            >
              {cut.body}
            </animated.p>
          </li>
        );
      })}
    </ol>
  );
};

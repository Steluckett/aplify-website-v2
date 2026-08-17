"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSpring, animated } from "@react-spring/web";

import { proofContent } from "@/data/content/closing";

/**
 * Set piece 3 — the proof (§8.14).
 *
 * The only hard number on the site (§5), given a full screen with nothing
 * else on it. The figure counts **down** from 85 to 30: the number falling is
 * the product working, which is a stronger way to make the point than showing
 * two figures side by side.
 *
 * The field behind it is a deterministic dot lattice, not a second WebGL
 * context — the hero already costs a three.js chunk and a vertex buffer, and
 * spending that again for a background would be indefensible. Static SVG,
 * no loop, thinning outward so the numeral sits in a pool of its own.
 *
 * Reduced motion gets the finished state: the comparison survives without the
 * count, which is the point of the section.
 */
export const Proof = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const finished = seen || reduced;

  const { value } = useSpring({
    value: finished ? proofContent.after : proofContent.before,
    immediate: reduced,
    config: { duration: 2400, easing: (t: number) => 1 - Math.pow(1 - t, 3) },
  });

  return (
    <section
      ref={sectionRef}
      id="proof"
      aria-labelledby="proof-heading"
      className="relative isolate flex min-h-svh flex-col items-center justify-center
                 overflow-hidden border-t border-hairline px-6 py-32 text-center sm:px-10"
    >
      <DotField />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--glow-product)" }}
      />

      <p className="eyebrow">{proofContent.eyebrow}</p>

      <h2 id="proof-heading" className="sr-only">
        Application drop-off rate: {proofContent.before}% before Easy Apply,
        {proofContent.after}% after.
      </h2>

      <div aria-hidden className="mt-8 flex items-start justify-center">
        <animated.span className="display text-[26vw] leading-[0.8] tabular-nums sm:text-[18vw]">
          {value.to((v) => Math.round(v))}
        </animated.span>
        <span className="display mt-[2vw] text-[8vw] text-ink-soft sm:text-[5vw]">
          %
        </span>
      </div>

      <div
        aria-hidden
        className="mt-10 flex flex-col items-center gap-3 text-body sm:flex-row sm:gap-8"
      >
        <span
          className="text-ink-soft transition-opacity duration-1000"
          style={{ opacity: finished ? 0.45 : 1 }}
        >
          <s>{proofContent.before}%</s> {proofContent.beforeLabel}
        </span>
        <span aria-hidden className="hidden h-px w-12 bg-hairline-strong sm:block" />
        <span className="text-brand-light">
          {proofContent.after}% {proofContent.afterLabel}
        </span>
      </div>

      <Image
        src={proofContent.logoSrc}
        alt={proofContent.client}
        width={280}
        height={80}
        className="mt-16 h-8 w-auto opacity-70"
      />
    </section>
  );
};

/**
 * Deterministic dot lattice — no `Math.random`, so server and client agree and
 * the field never re-shuffles between renders. Density falls off from the
 * centre so the numeral has clear air around it.
 */
/** Four decimals — plenty for an SVG at this scale, and hydration-stable. */
const round = (n: number) => Math.round(n * 10000) / 10000;

const DotField = () => {
  const dots: { x: number; y: number; r: number; o: number }[] = [];
  const COLS = 46;
  const ROWS = 26;

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      // Cheap deterministic jitter — a hashed sine, same trick the hero's
      // particle build uses.
      const seed = row * COLS + col;
      const jx = (Math.sin(seed * 127.1) * 43758.5453) % 1;
      const jy = (Math.sin(seed * 311.7) * 43758.5453) % 1;

      // Rounded hard: Math.sin differs in the last ULP between Node and V8 in
      // the browser, which is enough to trip React's hydration diff on every
      // circle. Fixed precision makes server and client byte-identical.
      const x = round(((col + 0.5) / COLS) * 100 + jx * 0.8);
      const y = round(((row + 0.5) / ROWS) * 100 + jy * 1.2);

      // Radial falloff from centre.
      const dx = (x - 50) / 50;
      const dy = (y - 50) / 50;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 0.42) continue; // hole in the middle, for the numeral
      const o = round(Math.min(0.5, Math.max(0, (d - 0.42) * 0.6)));
      if (o < 0.02) continue;

      dots.push({ x, y, r: round(0.09 + (1 - d) * 0.05), o });
    }
  }

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 -z-10 size-full"
    >
      {dots.map((dot, i) => (
        <circle
          key={i}
          cx={dot.x}
          cy={dot.y}
          r={dot.r}
          fill="var(--brand-light)"
          opacity={dot.o}
        />
      ))}
    </svg>
  );
};

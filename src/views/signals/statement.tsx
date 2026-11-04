"use client";

import { useRef } from "react";
import { animated, useInView, useSpring, useSprings } from "@react-spring/web";

import { sigOrigin, sigStats } from "@/data/content/signals";

import { SigLabel } from "./primitives";
import { useViewportProgress } from "./use-viewport-progress";

/**
 * The reference's "who we are" beat: a 75px statement, first line indented by
 * one sixth, whose words fill from 20% to full ink as the reader scrolls past.
 * The fill is the reader's own scroll, smoothed through a spring.
 */
export const SigStatement = () => {
  const ref = useRef<HTMLHeadingElement>(null);
  const progress = useViewportProgress(ref);
  const { p } = useSpring({ p: progress, config: { tension: 120, friction: 26 } });

  const plain = sigOrigin.plain.split(" ");
  const accent = sigOrigin.accent.split(" ");
  const total = plain.length + accent.length;
  const word = (w: string, i: number) => (
    <animated.span
      key={`${w}-${i}`}
      aria-hidden
      style={{ opacity: p.to((v) => 0.2 + 0.8 * Math.min(1, Math.max(0, v * total - i))) }}
    >
      {w}{" "}
    </animated.span>
  );

  return (
    <section id="why" className="sig-section pt-24 lg:pt-32">
      <div className="sig-wrap">
        <SigLabel>{sigOrigin.label}</SigLabel>
        <h2
          ref={ref}
          aria-label={`${sigOrigin.plain} ${sigOrigin.accent}`}
          className="sig-display mt-10 text-sig-5xl indent-[calc((100%+1.25rem)/6)] md:text-sig-7xl lg:mt-16 lg:text-sig-9xl 2xl:text-sig-10xl"
        >
          {plain.map((w, i) => word(w, i))}
          <span className="sig-tone">{accent.map((w, i) => word(w, plain.length + i))}</span>
        </h2>
      </div>
    </section>
  );
};

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/** One rolling digit column: the reference's odometer. */
const Odometer = ({ value, suffix, run }: { value: number; suffix: string; run: boolean }) => {
  const digits = String(value).split("").map(Number);
  const [springs] = useSprings(
    digits.length,
    (i) => ({
      y: run ? -digits[i] : 0,
      delay: 120 * i,
      config: { tension: 70, friction: 20 },
    }),
    [run],
  );
  return (
    <span aria-hidden className="flex items-start">
      {springs.map((s, i) => (
        <span key={i} className="relative inline-block h-[1em] overflow-hidden">
          <animated.span
            className="flex flex-col"
            style={{ transform: s.y.to((v) => `translate3d(0,${v}em,0)`) }}
          >
            {DIGITS.map((d) => (
              <span key={d} className="block h-[1em] leading-none">
                {d}
              </span>
            ))}
          </animated.span>
        </span>
      ))}
      {suffix ? <span className="leading-none">{suffix}</span> : null}
    </span>
  );
};

/** Four figures, ruled apart by full-height black hairlines. */
export const SigStats = () => {
  const [ref, inView] = useInView({ once: true, amount: 0.4 });
  return (
    <section aria-label="Aplify in numbers" className="sig-section">
      <div className="sig-wrap">
        <ul ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {sigStats.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col items-center justify-center border-b border-sig-black py-10 text-center last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-r lg:border-b-0 lg:py-2 lg:last:border-r-0"
            >
              <span className="sr-only">{`${stat.value}${stat.suffix}`}</span>
              <span className="sig-display text-sig-10xl leading-none lg:text-sig-12xl 2xl:text-sig-13xl">
                <Odometer value={stat.value} suffix={stat.suffix} run={inView} />
              </span>
              <span className="mt-4 max-w-[15rem] text-sig-base">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

"use client";

import Image from "next/image";
import { animated } from "@react-spring/web";

import { Reveal } from "@/components/ui/reveal";
import { sigSteps } from "@/data/content/signals";

import { ArrowSide, SigHeading, SigLabel } from "./primitives";
import { useTrack } from "./use-track";

/**
 * The reference's services slider, carrying the four candidate steps — a
 * real sequence, so the "(01)" numbering is information rather than garnish.
 *
 * Each slide is a full-width card with the next one peeking at the right:
 * a label rule along the top, the step's 75px title at the foot, the copy in
 * the middle column and the product shot bleeding off the right edge. Under
 * the cards, segmented progress bars and the two pills, exactly as theirs.
 *
 * Grounds cycle through the reference's card palette — black, lilac, lime,
 * creme — and each takes the ink that reads on it.
 */
const GROUNDS = [
  { card: "sig-dark", chip: "bg-sig-creme-100/10 text-sig-creme-100" },
  { card: "bg-sig-lilac text-sig-black", chip: "bg-sig-black/10" },
  { card: "bg-sig-lime text-sig-black", chip: "bg-sig-black/10" },
  { card: "bg-sig-creme-300 text-sig-black", chip: "bg-sig-black/10" },
] as const;

export const SigSteps = () => {
  const { steps } = sigSteps;
  const { trackRef, index, go, next, prev, x } = useTrack(steps.length);

  return (
    <section id="candidates" aria-roledescription="carousel" className="sig-section overflow-hidden">
      <div className="sig-wrap">
        <SigLabel aside={`(${steps[index].n})`}>{sigSteps.label}</SigLabel>
        <div className="mt-8 mb-10 lg:mt-12 lg:mb-14">
          <SigHeading lines={sigSteps.lines} size="text-sig-5xl md:text-sig-7xl lg:text-sig-8xl" />
        </div>

        <Reveal variant="rise">
          <animated.ul
            ref={trackRef}
            className="flex gap-5"
            style={{ transform: x.to((v) => `translate3d(${v}px,0,0)`) }}
          >
            {steps.map((step, i) => {
              const g = GROUNDS[i % GROUNDS.length];
              return (
                <li
                  key={step.n}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${steps.length}`}
                  aria-hidden={i !== index}
                  className={`${g.card} relative grid min-h-[38rem] flex-[0_0_calc(100%-3rem)] grid-cols-1 content-start gap-y-6 overflow-hidden rounded-sig-card p-6 md:flex-[0_0_calc(100%-6rem)] lg:min-h-[44rem] lg:grid-cols-[1.2fr_0.8fr_1fr] lg:grid-rows-[auto_1fr_auto] lg:content-stretch lg:gap-x-10 lg:p-10`}
                >
                  <p className="text-sig-base font-medium lg:col-span-2">({step.n})</p>

                  <div className="max-w-[22rem] lg:col-start-2 lg:row-start-2 lg:self-center">
                    <p className="text-sig-base">{step.body}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {step.points.map((pt) => (
                        <li key={pt} className={`${g.chip} rounded-full px-3 py-1.5 text-sig-xs`}>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <h3 className="sig-display text-sig-5xl lg:col-span-2 lg:col-start-1 lg:row-start-3 lg:self-end lg:text-sig-9xl">
                    {step.title}
                  </h3>

                  <div className="relative h-[18rem] lg:col-start-3 lg:row-span-3 lg:row-start-1 lg:-mr-10 lg:-mb-10 lg:h-auto">
                    <Image
                      src={step.shot.src}
                      alt={step.shot.alt}
                      fill
                      sizes="(max-width: 1024px) 90vw, 32vw"
                      className="object-contain object-bottom lg:object-right-bottom"
                    />
                  </div>
                </li>
              );
            })}
          </animated.ul>
        </Reveal>

        <div className="mt-6 grid grid-cols-4 gap-2 md:mr-24" aria-hidden>
          {steps.map((step, i) => (
            <span key={step.n} className="h-[3px] overflow-hidden rounded-full bg-sig-black/15">
              <span
                className={`block h-full bg-sig-black transition-[width] duration-[var(--duration-slow)] ease-entrance ${i <= index ? "w-full" : "w-0"}`}
              />
            </span>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2.5">
          <button type="button" onClick={prev} disabled={index === 0} className="sig-pill sig-pill-ghost disabled:opacity-40">
            <ArrowSide dir="left" />
            Previous
          </button>
          <button
            type="button"
            onClick={next}
            disabled={index === steps.length - 1}
            className="sig-pill sig-pill-lilac disabled:opacity-40"
          >
            Next
            <ArrowSide dir="right" />
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {`Step ${index + 1} of ${steps.length}: ${steps[index].title}`}
        </p>
        {/* Keyboard users can jump straight to a step. */}
        <div className="sr-only">
          {steps.map((s, i) => (
            <button key={s.n} type="button" onClick={() => go(i)}>
              {`Show step ${s.n}: ${s.title}`}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

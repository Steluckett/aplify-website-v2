"use client";

import Image from "next/image";
import { animated } from "@react-spring/web";

import { Reveal } from "@/components/ui/reveal";
import { sigSteps } from "@/data/content/signals";

import { ArrowSide } from "./primitives";
import { useTrack } from "./use-track";

/**
 * The reference's services slider, carrying the four candidate steps — a
 * real sequence, so the "(01)" numbering is information rather than garnish.
 *
 * Built to theirs: each slide is a full-bleed photograph under a black tint,
 * rounded 20px, with the next slide peeking at the right. Inside the card a
 * label rule runs along the top (title left, number right), the step's 75px
 * title sits at the foot, the copy holds the middle of the right half, and
 * the segmented progress bars run along the bottom edge with the current
 * segment in lime. Previous / Next pills sit centred beneath.
 *
 * The photographs are decorative (empty alt) — the title and copy carry the
 * step. PLACEHOLDER STOCK.
 */
export const SigSteps = () => {
  const { steps, photos, label } = sigSteps;
  const { trackRef, index, go, next, prev, x } = useTrack(steps.length);

  return (
    <section
      id="candidates"
      aria-roledescription="carousel"
      aria-label={label}
      className="sig-section overflow-hidden"
    >
      <div className="sig-wrap">
        <Reveal variant="rise">
          <animated.ul
            ref={trackRef}
            className="flex gap-5"
            style={{ transform: x.to((v) => `translate3d(${v}px,0,0)`) }}
          >
            {steps.map((step, i) => (
              <li
                key={step.n}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${steps.length}`}
                aria-hidden={i !== index}
                className="relative isolate flex min-h-[40rem] flex-[0_0_calc(100%-3rem)] flex-col overflow-hidden rounded-sig-panel text-sig-white md:flex-[0_0_calc(100%-6rem)] lg:h-[46rem]"
              >
                <Image
                  src={photos[i % photos.length]}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 90vw, 92vw"
                  className="-z-20 object-cover"
                  priority={i === 0}
                />
                {/* The tint: an even veil, deepened toward the foot so the
                    title always sits on dark. */}
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-sig-veil"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-sig-black/70 to-transparent"
                />

                <div className="flex flex-1 flex-col p-6 lg:px-10 lg:pt-8 lg:pb-10">
                  <p className="flex items-center justify-between border-b border-sig-white/30 pb-3.5 text-sig-base font-medium">
                    <span>{label}</span>
                    <span>({step.n})</span>
                  </p>

                  <div className="grid flex-1 grid-cols-1 content-end gap-8 pt-10 lg:grid-cols-12 lg:content-stretch lg:gap-5">
                    <div className="max-w-[20rem] lg:col-span-4 lg:col-start-8 lg:row-start-1 lg:self-center">
                      <p className="text-sig-base">{step.body}</p>
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {step.points.map((pt) => (
                          <li
                            key={pt}
                            className="rounded-full bg-sig-white/15 px-3 py-1.5 text-sig-xs backdrop-blur-sm"
                          >
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <h3 className="sig-display text-sig-5xl text-sig-white lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:self-end lg:text-sig-9xl">
                      {step.title}
                    </h3>
                  </div>

                  <div className="mt-8 grid grid-cols-4 gap-2" aria-hidden>
                    {steps.map((s, j) => (
                      <span
                        key={s.n}
                        className={`h-[3px] rounded-full ${j === i ? "bg-sig-lime" : "bg-sig-white/30"}`}
                      />
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </animated.ul>
        </Reveal>

        <div className="mt-8 flex justify-center gap-2.5">
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            className="sig-pill sig-pill-ghost disabled:opacity-40"
          >
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

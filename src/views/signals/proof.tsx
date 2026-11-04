"use client";

import Image from "next/image";
import { animated } from "@react-spring/web";

import { Reveal } from "@/components/ui/reveal";
import { sigProof } from "@/data/content/signals";

import { ArrowSide, SigHeading, SigLabel } from "./primitives";
import { useTrack } from "./use-track";

/**
 * The reference's "featured work" panel: a black rounded panel inset in the
 * page (radius 20, padding 100/50), a label rule, a 62px two-tone heading in
 * creme and lilac, then a slide track of case cards with the next one cut by
 * the panel edge. Each card leads with its figure in lime — the reference's
 * highlight colour on black. The customers' own words are on the quote wall.
 */
export const SigProof = () => {
  const { cases } = sigProof;
  const { trackRef, index, next, prev, x } = useTrack(cases.length);

  return (
    <section id="proof" className="sig-section">
      <div className="sig-wrap">
        <div className="sig-dark sig-panel overflow-hidden">
          <SigLabel>{sigProof.label}</SigLabel>
          <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-[1fr_auto] lg:items-end">
            <SigHeading
              lines={sigProof.lines}
              size="text-sig-5xl lg:text-sig-7xl"
            />
            <Reveal variant="up" delay={160}>
              <p className="max-w-[26rem] text-sig-base text-sig-label">
                {sigProof.standfirst}
              </p>
            </Reveal>
          </div>

          <Reveal variant="up" delay={200} className="mt-12 lg:mt-16">
            <animated.ul
              ref={trackRef}
              className="flex gap-5"
              style={{ transform: x.to((v) => `translate3d(${v}px,0,0)`) }}
            >
              {cases.map((c, i) => {
                return (
                  <li
                    key={c.id}
                    aria-hidden={i !== index && i !== index + 1}
                    className="flex min-h-[26rem] flex-[0_0_88%] flex-col rounded-sig-tile bg-sig-black-200 p-6 sm:flex-[0_0_31rem] lg:p-8"
                  >
                    <span className="inline-flex h-10 w-fit items-center rounded-full bg-sig-white px-4">
                      <Image
                        src={c.logo}
                        alt={c.name}
                        width={Math.round(22 * c.logoRatio)}
                        height={22}
                        className="h-[1.375rem] w-auto"
                      />
                    </span>
                    <p className="sig-display mt-auto pt-12 text-sig-10xl text-sig-lime">
                      {c.hero}
                    </p>
                    <p className="mt-3 text-sig-2xl leading-sig-12 font-medium tracking-sig-tighter lg:text-sig-3xl">
                      {c.heroLabel}
                    </p>
                    <p className="mt-3 text-sig-base text-sig-label">
                      {c.dropLine}
                    </p>
                  </li>
                );
              })}
            </animated.ul>
          </Reveal>

          <div className="mt-10 flex justify-center gap-2.5">
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
              disabled={index === cases.length - 1}
              className="sig-pill sig-pill-lilac disabled:opacity-40"
            >
              Next
              <ArrowSide dir="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

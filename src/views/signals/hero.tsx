"use client";

import Image from "next/image";
import { animated, easings, useSpring } from "@react-spring/web";

import { SpringTrigger } from "@/components/animation/springs/spring-trigger";
import { Reveal } from "@/components/ui/reveal";
import { sigHero } from "@/data/content/signals";

import { DemoPill, LinkPill, SigHeading } from "./primitives";

/** One set's travel: 7 cards × (15rem card + 1.25rem gap). */
const LOOP_MS = 48000;

/**
 * The hero, after the reference's: a full-viewport black band rounded at its
 * foot, a 120px two-tone headline (creme, then lilac), a 30px two-tone
 * intro, two pills, and a strip of tilted photographs rising out of the foot.
 *
 * The strip is the reference's construction exactly — a row on a ~7°
 * incline that drifts left forever (≈40px/s, measured) and lifts as the
 * reader scrolls. The incline is a rotation of the whole row rather than a
 * stagger of each card, which is what lets the loop wrap without a seam.
 * The drift is a looping linear spring; reduced motion stops it.
 */
export const SigHero = () => {
  const drift = useSpring({
    from: { x: 0 },
    to: { x: -50 },
    loop: true,
    config: { duration: LOOP_MS, easing: easings.linear },
  });
  const cards = [...sigHero.cards, ...sigHero.cards];

  return (
    <section id="home" className="sig-section">
      {/* Theirs: a full-viewport black band whose FOOT is rounded (30px), so
          the creme page shows in the corners as the reader scrolls on. */}
      <div className="sig-dark relative isolate min-h-svh overflow-hidden rounded-b-sig-band">
        <div className="sig-wrap pt-32 lg:pt-40">
          <SigHeading
            tag="h1"
            lines={sigHero.lines}
            linesSm={sigHero.linesSm}
            toneLinesSm={2}
            size="text-sig-4xl sm:text-sig-5xl md:text-sig-hero"
          />
          <Reveal variant="up" delay={250}>
            <p className="mt-6 text-sig-2xl leading-sig-12 font-medium tracking-sig-tighter text-pretty lg:mt-8 lg:text-sig-3xl">
              {sigHero.intro.plain}{" "}
              <span className="text-sig-accent">{sigHero.intro.accent}</span>
            </p>
          </Reveal>
          <Reveal variant="up" delay={360}>
            <div className="mt-8 flex flex-wrap gap-2.5 lg:mt-10">
              <DemoPill label={sigHero.cta.label} tone="creme" />
              <LinkPill
                label={sigHero.secondary.label}
                href={sigHero.secondary.href}
              />
            </div>
          </Reveal>
        </div>

        <SpringTrigger
          tag="div"
          mode="scrub"
          start="top top"
          end="bottom top"
          from={{ y: "0%" }}
          to={{ y: "-30%" }}
          className="relative mt-16 h-[22rem] md:h-[28rem] lg:mt-20 lg:h-[30rem]"
        >
          <div className="absolute top-16 left-[-10%] w-[120%] -rotate-[7deg] md:top-24">
            <animated.ul
              className="flex w-max gap-5"
              style={{ transform: drift.x.to((v) => `translate3d(${v}%,0,0)`) }}
            >
              {cards.map((card, i) => (
                <li
                  key={`${card.src}-${i}`}
                  aria-hidden={i >= sigHero.cards.length}
                  className="relative h-[17rem] w-[12.5rem] flex-none overflow-hidden rounded-sig-field bg-sig-black-200 md:h-[20rem] md:w-[15rem]"
                >
                  <Image
                    src={card.src}
                    alt={i >= sigHero.cards.length ? "" : card.alt}
                    fill
                    sizes="15rem"
                    className="object-cover object-top"
                  />
                </li>
              ))}
            </animated.ul>
          </div>
        </SpringTrigger>
      </div>
    </section>
  );
};

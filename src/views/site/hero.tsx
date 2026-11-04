"use client";

import Image from "next/image";
import Link from "next/link";

import { SpringTrigger } from "@/components/animation/springs/spring-trigger";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";
import { StackedLines } from "@/components/ui/stacked-lines";
import { hero } from "@/data/content/site";

/**
 * The hero — SIGNALS STEER (branch design/signals-steer).
 *
 * After marketingsignals.com: a night ground, a huge left-set two-tone
 * headline (cream, then lavender), two pills, and a fan of tilted cards rising
 * out of the foot of the band. The fan is the page's one memorable gesture —
 * everything else on the page stays quiet so it can be.
 *
 * The fan's cards are the product's own surfaces, not photography: the claim
 * is about the apply flow, so the apply flow is what fills the screen.
 *
 * Motion: the headline reveals once; the fan scrubs upward and opens out as
 * the reader starts to scroll, so the cards arrive with the reader's own
 * gesture rather than on a timer.
 */
const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-[1em] w-[1em]" aria-hidden>
    <path
      d="M7 17 17 7M9 7h8v8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Hero = () => (
  <section id="home" className="on-night relative isolate overflow-hidden">
    <div className="shell pt-[10rem] sm:pt-[12rem]">
      <StackedLines
        tag="h1"
        lines={hero.lines}
        className="display lines-tight hidden text-display sm:block"
        lineClassNames={["", "grad-tip"]}
        stagger={130}
        duration={1100}
      />
      <StackedLines
        tag="h1"
        lines={hero.linesSm}
        className="display lines-tight text-display sm:hidden"
        lineClassNames={["", "", "", "grad-tip", "grad-tip"]}
        stagger={130}
        duration={1100}
      />

      <Reveal variant="up" delay={260}>
        <p className="mt-8 max-w-[40rem] text-lead leading-[1.45] font-medium tracking-[-0.02em] text-ink-body">
          {hero.standfirst}
        </p>
      </Reveal>

      <Reveal variant="up" delay={380}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <CtaButton label={hero.cta.label} tone="light" />
          <Link href={hero.secondary.href} className="btn btn-outline">
            {hero.secondary.label}
            <ArrowUpRight />
          </Link>
        </div>
      </Reveal>
    </div>

    {/* The fan. A row of tilted cards whose centre line bows downward, cut
        by the foot of the band. Scrubbed: it rises and opens as the page
        starts to move. */}
    <SpringTrigger
      tag="div"
      mode="scrub"
      start="top top"
      end="bottom top"
      from={{ y: "0%" }}
      to={{ y: "-14%" }}
      className="relative mt-20 h-[22rem] sm:mt-24 sm:h-[30rem] lg:h-[34rem]"
    >
      <ul className="absolute top-0 left-1/2 flex -translate-x-1/2 items-start gap-4 sm:gap-6">
        {hero.fan.map((card, i) => {
          const fromCentre = Math.abs(i - (hero.fan.length - 1) / 2);
          return (
            <li
              key={card.src}
              className="relative w-[13rem] flex-none overflow-hidden rounded-card bg-surface-night-raised shadow-lift sm:w-[18rem] lg:w-[21rem]"
              style={{
                aspectRatio: "3 / 4",
                transform: `rotate(${card.tilt}deg) translateY(${fromCentre * 2.25}rem)`,
              }}
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="(max-width: 640px) 13rem, 21rem"
                className="object-cover object-top"
                priority={i === 2}
              />
            </li>
          );
        })}
      </ul>
    </SpringTrigger>
  </section>
);

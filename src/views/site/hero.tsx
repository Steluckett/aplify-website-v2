"use client";

import { CtaButton } from "@/components/ui/cta-button";

import { Reveal } from "@/components/ui/reveal";
import { ScreenCard } from "@/components/ui/screen-card";
import { SpringTrigger } from "@/components/animation/springs/spring-trigger";
import { StackedLines } from "@/components/ui/stacked-lines";
import { hero } from "@/data/content/site";

/**
 * The hero.
 *
 * The product shot IS the hero. Copy takes the first screen — headline, one
 * line of standfirst, one large pill — and the shot begins below the CTA with
 * real air between them, then runs off the bottom of the viewport. Bleeding it
 * out of the initial view is deliberate: a shot sized to fit above the fold has
 * to be small, and a small product shot argues against itself. Scrolling
 * through it is the reward for arriving.
 *
 * It parallaxes gently against the page on the way down, which is the only
 * motion left here now the footage has gone.
 */
export const Hero = () => (
  <section
    id="home"
    className="relative isolate overflow-hidden pb-24 lg:pb-32"
  >
    {/* The glow behind the nav and the headline. The reference pools violet
        here; ours is blue, because blue is the brand's and the violet end of
        the sweep is already carrying the buttons. Two stacked radials rather
        than one — a single ellipse reads as a visible disc. */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[90vh]"
      style={{
        background:
          "radial-gradient(58% 52% at 50% 2%, rgb(60 120 235 / 0.22), transparent 66%), radial-gradient(90% 60% at 50% 0%, rgb(14 165 233 / 0.13), transparent 70%)",
      }}
    />

    <div className="shell pt-[14rem] text-center sm:pt-[16rem]">
      <StackedLines
        tag="h1"
        lines={hero.lines}
        className="display lines-tight hidden text-center text-display sm:block"
        lineClassName="justify-center"
        lineClassNames={["", "grad-tip"]}
        stagger={130}
        duration={1100}
      />
      <StackedLines
        tag="h1"
        lines={hero.linesSm}
        className="display lines-tight text-center text-display sm:hidden"
        lineClassName="justify-center"
        lineClassNames={["", "", "", "grad-tip"]}
        stagger={130}
        duration={1100}
      />

      <Reveal variant="up" delay={260}>
        {/* NOT `--measure-lead`, and measured rather than assumed. The section
            standfirsts widened to 46rem on 2026-08-24 to lift their line lengths
            off 43 characters; this one is a deliberate exception, because at
            every width from 38rem to 46rem it sets to exactly THREE LINES — so
            widening it buys no height at all, and at 46rem the last line is
            "ATS." alone, 7% of the widest. 40rem lands it at 44%. Where width
            cannot change the line count, the only thing left to optimise is the
            rag. Re-measure before keeping this exception if the copy changes. */}
        <p className="mx-auto mt-8 max-w-[40rem] text-lead leading-[1.6] text-ink-body">
          {hero.standfirst}
        </p>
      </Reveal>

      <Reveal variant="up" delay={380}>
        <div className="mt-10 flex justify-center">
          <CtaButton label={hero.cta.label} size="lg" />
        </div>
      </Reveal>
    </div>

    {/* Full shell width, and it runs past the fold on purpose. */}
    <SpringTrigger
      tag="div"
      mode="scrub"
      start="top bottom"
      end="bottom top"
      from={{ y: "0%" }}
      to={{ y: "-5%" }}
      className="shell mt-[7rem] sm:mt-[9rem]"
    >
      <ScreenCard
        ground="wash"
        pad="generous"
        chrome={false}
        src={hero.shot.src}
        alt={hero.shot.alt}
        /* The artwork's own 1662x1200, so nothing is cropped. */
        ratio="1662 / 1200"
      />
    </SpringTrigger>
  </section>
);

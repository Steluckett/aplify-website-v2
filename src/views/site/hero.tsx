"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { Reveal } from "@/components/ui/reveal";
import { ScreenCard } from "@/components/ui/screen-card";
import { SpringTrigger } from "@/components/animation/springs/spring-trigger";
import { StackedLines } from "@/components/ui/stacked-lines";
import { hero } from "@/data/content/site";

/**
 * The hero.
 *
 * Composition is the reference's: a tinted near-white ground, the headline
 * centred and large, one filled pill, and imagery entering from the bottom of
 * the frame rather than sitting in a box. The footage runs full-bleed along
 * the foot and the product shot sits over its middle, so the grass reads at
 * the left and right edges and the page's own white carries the centre — the
 * negative space is the composition, not what is left over.
 *
 * Two parallax rates on scroll: the footage lags and the shot leads, which is
 * what gives the band depth rather than the whole hero sliding as one plane.
 */
export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // The footage is decorative. Under reduced-motion it holds on its poster
  // frame — a looping 4K plate is motion whether or not React started it.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (reduced.matches) el.pause();
      else void el.play().catch(() => {});
    };
    apply();
    reduced.addEventListener("change", apply);
    return () => reduced.removeEventListener("change", apply);
  }, []);

  return (
    <section id="home" className="relative isolate overflow-hidden pt-[10rem] sm:pt-[12rem]">
      {/* The hero's own tint, over the page ground. Wider and softer than the
          section washes so it reads as light in the room rather than a shape. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh]"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 0%, rgb(91 78 224 / 0.13), transparent 62%), radial-gradient(50% 50% at 12% 8%, rgb(14 165 233 / 0.12), transparent 60%)",
        }}
      />

      <div className="mx-auto w-full max-w-[76rem] px-6 text-center">
        <StackedLines
          tag="h1"
          lines={hero.lines}
          className="display hidden text-center text-display sm:block"
          lineClassName="justify-center"
          stagger={130}
          duration={1100}
        />
        <StackedLines
          tag="h1"
          lines={hero.linesSm}
          className="display text-center text-display sm:hidden"
          lineClassName="justify-center"
          stagger={130}
          duration={1100}
        />

        <Reveal variant="up" delay={260}>
          <p className="mx-auto mt-7 max-w-[38rem] text-lead leading-[1.6] text-ink-body">
            {hero.standfirst}
          </p>
        </Reveal>

        <Reveal variant="up" delay={380}>
          <div className="mt-9 flex justify-center">
            <Link href={hero.cta.href} className="btn btn-primary">
              {hero.cta.label}
            </Link>
          </div>
        </Reveal>
      </div>

      {/* --- The footage band ------------------------------------------------
          Full-bleed along the foot of the hero, faded into the ground at its
          top edge so it emerges rather than starting. */}
      <div className="relative mt-12 sm:mt-14">
        <SpringTrigger
          tag="div"
          mode="scrub"
          start="top bottom"
          end="bottom top"
          from={{ y: "0%" }}
          to={{ y: "12%" }}
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          innerClassName="h-full w-full"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src="/assets/hero/hills.mp4"
            poster="/assets/hero/hills-poster.jpg"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-hidden
          />
          {/* The fade is what stops the footage reading as a pasted-in band. */}
          <div
            className="absolute inset-x-0 top-0 h-[38%]"
            style={{
              background:
                "linear-gradient(to bottom, var(--canvas) 0%, rgb(240 242 247 / 0.6) 45%, transparent 100%)",
            }}
          />
        </SpringTrigger>

        {/* The shot leads the footage, so the two planes separate on scroll. */}
        <SpringTrigger
          tag="div"
          mode="scrub"
          start="top bottom"
          end="bottom top"
          from={{ y: "0%" }}
          to={{ y: "-6%" }}
          className="mx-auto w-full max-w-[68rem] px-6 pt-[6rem] pb-[3rem] sm:pt-[8rem] sm:pb-[4rem]"
        >
          <ScreenCard
            ground="wash"
            url={hero.shot.url}
            placeholder={hero.shot.placeholder}
            ratio="16 / 9"
          />
        </SpringTrigger>
      </div>
    </section>
  );
};

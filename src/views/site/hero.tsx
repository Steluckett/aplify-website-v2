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
 * The composition is a fixed split rather than a stack: the copy takes
 * whatever height is left, and the footage band takes a SHARE OF THE VIEWPORT
 * (55svh). That is the whole reason the grass is on screen at load on a large
 * desktop and on a laptop with a short window alike — a band sized in rem
 * drops below the fold the moment the window is short, which is exactly what
 * went wrong on the first pass.
 *
 * The shot is pulled up over the copy and runs off the bottom of the section,
 * clipped. The reference cuts its product off at the hero's foot, and that
 * crop is what makes the page read as continuing rather than ending.
 *
 * Two parallax rates: the footage lags, the shot leads. One plane moving is a
 * slide; two moving at different rates is depth.
 */
export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // The footage is decorative. Under reduced-motion it holds on its poster
  // frame — a looping plate is motion whether or not React started it.
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
    <section
      id="home"
      className="relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      {/* The glow behind the nav and the headline. The reference pools violet
          here; ours is blue, because blue is the brand's and the violet end of
          the sweep is already carrying the buttons. Two stacked radials rather
          than one — a single ellipse reads as a visible disc. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[85vh]"
        style={{
          background:
            "radial-gradient(58% 52% at 50% 2%, rgb(60 120 235 / 0.22), transparent 66%), radial-gradient(90% 60% at 50% 0%, rgb(14 165 233 / 0.13), transparent 70%)",
        }}
      />

      <div className="shell flex flex-1 flex-col justify-center pt-[7.5rem] pb-[3.5rem] text-center sm:pt-[8rem]">
        <StackedLines
          tag="h1"
          lines={hero.lines}
          className="display hidden text-center text-display sm:block"
          lineClassName="justify-center"
          lineClassNames={["", "grad-tip"]}
          stagger={130}
          duration={1100}
        />
        <StackedLines
          tag="h1"
          lines={hero.linesSm}
          className="display text-center text-display sm:hidden"
          lineClassName="justify-center"
          lineClassNames={["", "", "grad-tip"]}
          stagger={130}
          duration={1100}
        />

        <Reveal variant="up" delay={260}>
          <p className="mx-auto mt-6 max-w-[40rem] text-lead leading-[1.6] text-ink-body">
            {hero.standfirst}
          </p>
        </Reveal>

        <Reveal variant="up" delay={380}>
          <div className="mt-8 flex justify-center">
            <Link href={hero.cta.href} className="btn btn-primary">
              {hero.cta.label}
            </Link>
          </div>
        </Reveal>
      </div>

      {/* --- The footage band ----------------------------------------------- */}
      <div className="relative h-[55svh] min-h-[19rem]">
        <SpringTrigger
          tag="div"
          mode="scrub"
          start="top bottom"
          end="bottom top"
          from={{ y: "0%" }}
          to={{ y: "14%" }}
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          innerClassName="h-full w-full"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            style={{ objectPosition: "center 78%" }}
            src="/assets/hero/hills.mp4"
            poster="/assets/hero/hills-poster.jpg"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-hidden
          />
          {/* Short fade: the band is short, and a long one would eat the grass
              we just fought to keep above the fold. */}
          <div
            className="absolute inset-x-0 top-0 h-[14%]"
            style={{
              background:
                "linear-gradient(to bottom, var(--canvas) 0%, rgb(232 235 242 / 0.55) 50%, transparent 100%)",
            }}
          />
        </SpringTrigger>

        {/* The shot: narrower than the shell so grass reads down both sides,
            lifted over the copy, and running off the foot of the section. */}
        <SpringTrigger
          tag="div"
          mode="scrub"
          start="top bottom"
          end="bottom top"
          from={{ y: "0%" }}
          to={{ y: "-8%" }}
          className="absolute inset-x-0 -top-[2rem] sm:-top-[3rem]"
        >
          <div className="mx-auto w-[min(58vw,820px)]">
            <ScreenCard
              ground="wash"
              url={hero.shot.url}
              placeholder={hero.shot.placeholder}
              ratio="16 / 9"
            />
          </div>
        </SpringTrigger>
      </div>
    </section>
  );
};

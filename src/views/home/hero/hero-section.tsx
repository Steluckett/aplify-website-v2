"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { SpringTrigger } from "@/components/animation/springs/spring-trigger";
import { Handle } from "@/components/animation/springs/handle";
import { CarouselDots } from "@/components/ui/carousel-dots";
import { StackedLines } from "@/components/ui/stacked-lines";
import { useCarousel } from "@/hooks/use-carousel";
import { useLoader } from "@/hooks/use-loader";
import {
  DEFAULT_HERO_SCENE_CONFIG,
  type HeroSceneConfig,
} from "@/lib/scene/hero-scene.config";
import { anchorScroll } from "@/utils/anchor-scroll";
import { heroContent } from "@/data/content/hero";

import { SiteHeader } from "../site-header";

/** `ssr: false` keeps `three` out of the server bundle and in its own chunk. */
const ParticleScene = dynamic(() => import("./particle-scene"), { ssr: false });

/** Same treatment for the tuning panel — a build-time tool, not payload. */
const SceneControls = dynamic(
  () => import("./scene-controls").then((module) => module.SceneControls),
  { ssr: false },
);

/**
 * Hero — full-bleed black, the particle head lit from within a deep-blue
 * pool, and the display headline set in Instrument Serif.
 *
 * The serif is the point: on a page of otherwise neutral UI type it is the
 * one thing that could not have come out of a template, and it does its
 * loudest work here at 9vw. The head rides a slow downward scrub so the
 * frame keeps moving under the type without anything sliding into view.
 */
export const HeroSection = () => {
  const ready = useLoader((s) => s.ready);
  const { brand, navLeft, cta, titleLines, taglineLines, context } = heroContent;

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex h-svh min-h-[40rem] flex-col overflow-hidden bg-black"
    >
      <SpringTrigger
        tag="div"
        mode="scrub"
        from={{ y: "0%" }}
        to={{ y: "10%" }}
        className="absolute inset-0 -z-10"
        innerClassName="absolute inset-x-0 -top-[12%] h-[124%] w-full"
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "var(--hero-glow)" }}
        />
        <HeroScene ready={ready} />
      </SpringTrigger>

      {/* Legibility scrim — on a phone the sub-head and standfirst sit
          directly over the lit subject rather than beside it. Bottom-weighted
          so the head itself stays clean above it. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[62%] sm:hidden"
        style={{
          background:
            "linear-gradient(to top, rgb(0 0 0 / 0.92) 0%, rgb(0 0 0 / 0.75) 38%, transparent 100%)",
        }}
      />

      <SiteHeader brand={brand} navLeft={navLeft} cta={cta} />

      {/* Display headline. */}
      <div className="relative z-10 px-6 pt-6 sm:px-10 sm:pt-4">
        <StackedLines
          tag="h1"
          id="hero-title"
          lines={titleLines}
          enabled={ready}
          stagger={150}
          duration={1200}
          className="display text-[13vw] sm:text-hero"
        />
      </div>

      {/* Bottom row: sub-head + context left, glass cards right. */}
      <div className="relative z-10 mt-auto flex flex-col items-start gap-8 px-6 pb-10 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:pb-12">
        <div className="max-w-md">
          <StackedLines
            tag="p"
            lines={taglineLines}
            enabled={ready}
            baseDelay={400}
            stagger={110}
            duration={900}
            className="text-[1.75rem] font-medium uppercase leading-[0.98] tracking-tight text-ink sm:text-[2.1rem]"
          />
          <Inview
            tag="p"
            mode="once"
            enabled={ready}
            from={{ opacity: 0, filter: "blur(6px)" }}
            to={{ opacity: 1, filter: "blur(0px)" }}
            delayIn={640}
            config={{ tension: 190, friction: 30 }}
            className="mt-5 max-w-sm text-body leading-relaxed text-ink-muted"
          >
            {context}
          </Inview>
        </div>

        <div className="flex w-full items-end gap-4 sm:w-auto">
          <CapabilitySlider ready={ready} />
          <DemoTeaserCard ready={ready} />
        </div>
      </div>
    </section>
  );
};

/** The WebGL subject, faded in once its first frame exists. */
const HeroScene = ({ ready }: { ready: boolean }) => {
  const [config, setConfig] = useState<HeroSceneConfig>(
    DEFAULT_HERO_SCENE_CONFIG,
  );
  const [tuning, setTuning] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  // Asked for by hand, never on by default: append `?tune` to the URL.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTuning(params.has("tune"));
  }, []);

  return (
    <>
      <Spring
        tag="div"
        className="absolute inset-0"
        from={{ opacity: 0 }}
        to={{ opacity: ready && sceneReady ? 1 : 0 }}
        config={{ duration: 900 }}
      >
        <ParticleScene
          src={heroContent.scene.src}
          config={config}
          onReady={() => setSceneReady(true)}
          className="absolute inset-0 transform-gpu backface-hidden will-change-transform"
        />
      </Spring>

      {tuning && <SceneControls config={config} onChange={setConfig} />}
    </>
  );
};

/** The approved capability strip (§4), one card at a time. */
const CapabilitySlider = ({ ready }: { ready: boolean }) => {
  const { capabilities } = heroContent;
  const { index, go } = useCarousel(capabilities.length, {
    autoPlay: true,
    interval: 3800,
    enabled: ready,
  });
  const item = capabilities[index];

  return (
    <Inview
      tag="div"
      mode="once"
      enabled={ready}
      from={{ opacity: 0, filter: "blur(8px)" }}
      to={{ opacity: 1, filter: "blur(0px)" }}
      delayIn={720}
      config={{ tension: 190, friction: 30 }}
      className="hidden w-64 flex-col gap-3 md:flex"
    >
      <Handle
        tag="div"
        from={{ opacity: 0, filter: "blur(6px)" }}
        to={{ opacity: 1, filter: "blur(0px)" }}
        config={{ tension: 210, friction: 26 }}
      >
        <article
          key={item.label}
          className="rounded-card border border-hairline-strong bg-white/[0.06] p-4 backdrop-blur-md"
        >
          <span className="eyebrow block">{item.label}</span>
          <span className="mt-2 block text-body leading-snug text-ink">
            {item.blurb}
          </span>
          <Link
            href={item.href}
            onClick={anchorScroll(item.href)}
            className="mt-3 inline-block text-caption text-brand-light underline underline-offset-4 outline-none hover:text-ink focus-visible:text-ink"
          >
            See it below →
          </Link>
        </article>
      </Handle>
      <CarouselDots
        count={capabilities.length}
        active={index}
        onSelect={go}
        tone="light"
        label="Capability"
      />
    </Inview>
  );
};

/** Static glass card pointing at the working demos further down the page. */
const DemoTeaserCard = ({ ready }: { ready: boolean }) => {
  const { teaser } = heroContent;

  return (
    <Inview
      tag="article"
      mode="once"
      enabled={ready}
      from={{ opacity: 0, filter: "blur(8px)" }}
      to={{ opacity: 1, filter: "blur(0px)" }}
      delayIn={840}
      config={{ tension: 190, friction: 30 }}
      className="flex w-full max-w-xs flex-col gap-2 rounded-card border border-hairline-strong bg-white/[0.06] p-4 backdrop-blur-md sm:w-60"
    >
      <span className="display text-[1.5rem] leading-none">{teaser.title}</span>
      <span className="text-caption leading-snug text-ink-muted">
        {teaser.blurb}
      </span>
      <Link
        href={teaser.href}
        onClick={anchorScroll(teaser.href)}
        className="mt-1 text-caption text-brand-light underline underline-offset-4 outline-none hover:text-ink focus-visible:text-ink"
      >
        Try them →
      </Link>
    </Inview>
  );
};

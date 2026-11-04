"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { animated, useSpring } from "@react-spring/web";

import { Reveal } from "@/components/ui/reveal";
import { brandKit } from "@/data/content/brand-kit";
import { cost, demos, google, integrations, story } from "@/data/content/site";
import { AiRewriteDemo } from "@/views/site/demos/ai-rewrite";
import { BrandKitDemo } from "@/views/site/demos/brand-kit";
import { DashboardDemo } from "@/views/site/demos/dashboard";

import { BandHead } from "./panels";
import { DemoPill, SigHeading, SigLabel } from "./primitives";
import { useViewportProgress } from "./use-viewport-progress";

/**
 * The original page's remaining bands, carried into the SIGNALS option in the
 * reference's language. Approved copy only, straight from `site.ts`.
 */

/** A live product demo in the page's frame: the insights header, then the
 *  demo re-skinned through `.sig-product` on a creme-200 panel. */
const DemoBand = ({
  id,
  label,
  lines,
  linesSm,
  standfirst,
  children,
}: {
  id: string;
  label: string;
  lines: readonly string[];
  linesSm?: readonly string[];
  standfirst: string;
  children: ReactNode;
}) => (
  <section id={id} className="sig-section">
    <div className="sig-wrap">
      <BandHead
        label={label}
        lines={lines}
        linesSm={linesSm}
        standfirst={standfirst}
      />
      <Reveal variant="rise" className="mt-12 lg:mt-16">
        <div className="sig-product sig-immersive">{children}</div>
      </Reveal>
    </div>
  </section>
);

export const SigBrand = () => (
  <DemoBand
    id="brand"
    label={brandKit.eyebrow}
    lines={brandKit.lines}
    linesSm={brandKit.linesSm}
    standfirst={brandKit.standfirst}
  >
    <BrandKitDemo />
  </DemoBand>
);

export const SigAi = () => (
  <DemoBand
    id="ai-enrichment"
    label={demos.aiEnrichment.eyebrow}
    lines={demos.aiEnrichment.lines}
    linesSm={demos.aiEnrichment.linesSm}
    standfirst={demos.aiEnrichment.standfirst}
  >
    <AiRewriteDemo />
  </DemoBand>
);

export const SigDashboard = () => (
  <DemoBand
    id="dashboard"
    label={demos.dashboard.eyebrow}
    lines={demos.dashboard.lines}
    linesSm={demos.dashboard.linesSm}
    standfirst={demos.dashboard.standfirst}
  >
    <DashboardDemo />
  </DemoBand>
);

/**
 * What it costs — typography-led, as the reference's statement is. Every
 * spend that bought the candidate fills in, one after another, as the reader
 * scrolls; then the line it was all for lands in a black card.
 */
export const SigCost = () => {
  const ref = useRef<HTMLParagraphElement>(null);
  const progress = useViewportProgress(ref, 0.9, 0.5);
  const { p } = useSpring({
    p: progress,
    config: { tension: 120, friction: 26 },
  });
  const n = cost.spends.length;

  return (
    <section id="cost" className="sig-section">
      <div className="sig-wrap">
        <SigLabel>{cost.eyebrow}</SigLabel>
        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-5">
          <div className="lg:col-span-7">
            <SigHeading
              lines={cost.lines}
              linesSm={cost.linesSm}
              size="text-sig-5xl lg:text-sig-7xl xl:text-sig-10xl"
            />
          </div>
          <div className="sig-baseline text-sig-5xl lg:col-span-4 lg:col-start-9 lg:self-end lg:text-sig-7xl xl:text-sig-10xl">
            <Reveal variant="up" delay={160}>
              <p className="text-sig-base">{cost.standfirst}</p>
            </Reveal>
          </div>
        </div>

        <p
          ref={ref}
          className="sig-display mt-14 text-sig-4xl lg:mt-20 lg:text-sig-7xl xl:text-sig-8xl"
        >
          {cost.spends.map((spend, i) => (
            <animated.span
              key={spend}
              style={{
                opacity: p.to(
                  (v) => 0.18 + 0.82 * Math.min(1, Math.max(0, v * n - i)),
                ),
              }}
            >
              {spend}
              {i < n - 1 ? <span className="text-sig-accent"> + </span> : null}
            </animated.span>
          ))}
        </p>

        <Reveal variant="rise" className="mt-14 lg:mt-20">
          <div className="sig-dark sig-accent-lime grid grid-cols-1 gap-6 rounded-sig-panel p-8 lg:grid-cols-12 lg:gap-5 lg:p-12">
            <p className="text-sig-base font-medium text-sig-accent lg:col-span-12">
              = {cost.card.lossLabel}
            </p>
            <h3 className="sig-display text-sig-5xl lg:col-span-7 lg:text-sig-8xl">
              {cost.card.lossTitle}
            </h3>
            <p className="max-w-[26rem] text-sig-base text-sig-label lg:col-span-4 lg:col-start-9 lg:self-end">
              {cost.card.lossBody}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/** Better data — the feed as it arrives against the feed as it is published,
 *  row by row, on the page's card palette. */
export const SigData = () => (
  <section id="data" className="sig-section">
    <div className="sig-wrap">
      <BandHead
        label={story.eyebrow}
        lines={story.lines}
        linesSm={story.linesSm}
        standfirst={story.standfirst}
      />
      <div className="mt-12 grid grid-cols-1 gap-3 lg:mt-16">
        <div className="hidden grid-cols-2 gap-3 px-1 text-sig-sm text-sig-label md:grid">
          <span>Straight from the ATS</span>
          <span>Published by Aplify</span>
        </div>
        {story.rows.map((row, i) => (
          <Reveal key={row.raw} variant="up" delay={i * 90}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-sig-tile bg-sig-creme-200 p-6">
                <p className="text-sig-xl leading-sig-12 font-medium tracking-sig-tight text-sig-label">
                  {row.raw}
                </p>
                <p className="mt-3 text-sig-sm text-sig-label">
                  {row.rawRegion} &nbsp;·&nbsp; {row.rawSalary}
                </p>
              </div>
              <div className="rounded-sig-tile bg-sig-white p-6">
                <p className="text-sig-xl leading-sig-12 font-medium tracking-sig-tight">
                  {row.clean}
                </p>
                <p className="mt-3 flex flex-wrap gap-2 text-sig-sm">
                  <span className="rounded-full bg-sig-blue-tint px-3 py-1">
                    {row.region}
                  </span>
                  <span className="rounded-full bg-sig-lime px-3 py-1">
                    {row.salary}
                  </span>
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/** Google for Jobs — the argument on the left, and the one job read two ways
 *  on the right: as a person sees it, and as Google does. */
export const SigGoogle = () => (
  <section id="google" className="sig-section">
    <div className="sig-wrap grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-5">
      <div className="lg:col-span-5">
        <SigLabel>{google.eyebrow}</SigLabel>
        <div className="mt-10">
          <SigHeading
            lines={google.linesSm}
            linesSm={google.linesSm}
            size="text-sig-5xl xl:text-sig-6xl"
          />
        </div>
        <Reveal variant="up" delay={160}>
          <p className="mt-6 text-sig-base">{google.standfirst}</p>
          <ul className="mt-10 border-t border-sig-hair">
            {google.points.map((pt) => (
              <li key={pt.title} className="border-b border-sig-hair py-5">
                <h3 className="text-sig-lg font-medium tracking-sig-tight">
                  {pt.title}
                </h3>
                <p className="mt-2 text-sig-base">{pt.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal
        variant="rise"
        className="flex flex-col gap-3 lg:col-span-6 lg:col-start-7 lg:self-center"
      >
        <div className="rounded-sig-panel bg-sig-white p-7 lg:p-9">
          <p className="text-sig-sm text-sig-label">{google.humanLabel}</p>
          <p className="sig-display mt-6 text-sig-4xl">{google.job.title}</p>
          <p className="mt-2 text-sig-base">
            {google.job.org} &nbsp;·&nbsp; {google.job.location}
          </p>
          <p className="mt-5 flex flex-wrap gap-2 text-sig-sm">
            <span className="rounded-full bg-sig-lime px-3 py-1">
              {google.job.salary}
            </span>
            <span className="rounded-full bg-sig-blue-tint px-3 py-1">
              {google.job.contract}
            </span>
          </p>
          <p className="mt-5 text-sig-sm text-sig-label">
            {google.job.posted} &nbsp;·&nbsp; {google.job.closes}
          </p>
        </div>
        <div className="sig-dark sig-accent-lime rounded-sig-panel p-7 lg:p-9">
          <p className="text-sig-sm text-sig-label">{google.machineLabel}</p>
          <pre className="mt-5 overflow-x-auto text-sig-sm leading-[1.7] whitespace-pre-wrap">
            {google.schema.map((line) => {
              const [key, ...rest] = line.split(":");
              return (
                <span key={line} className="block">
                  <span className="text-sig-accent">{key}:</span>
                  {rest.join(":")}
                </span>
              );
            })}
          </pre>
        </div>
      </Reveal>
    </div>
  </section>
);

/** Integrations — the reference's ruled logo grid, holding what Aplify plugs
 *  into instead of logos (only Eploy may be named, and in text). */
export const SigIntegrations = () => (
  <section id="integrations" className="sig-section">
    <div className="sig-wrap">
      <SigHeading
        lines={integrations.lines}
        linesSm={integrations.linesSm}
        size="text-sig-5xl lg:text-sig-8xl xl:text-sig-10xl"
        center
      />
      <Reveal variant="up" delay={160}>
        <p className="mx-auto mt-6 max-w-[40rem] text-center text-sig-base">
          {integrations.standfirst}
        </p>
      </Reveal>
      <ul className="mt-14 grid grid-cols-1 border-t border-l border-sig-hair sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
        {integrations.items.map((item) => (
          <li
            key={item}
            className={`flex min-h-[11rem] items-end border-r border-b border-sig-hair p-6 text-sig-xl leading-sig-12 font-medium tracking-sig-tighter lg:p-8 ${
              item.includes("Eploy") ? "bg-sig-lime" : ""
            }`}
          >
            {item}
          </li>
        ))}
        <li className="flex min-h-[11rem] flex-col justify-between gap-6 border-r border-b border-sig-hair p-6 lg:p-8">
          <p className="text-sig-base">{integrations.lead}</p>
          <DemoPill label="Book a demo" tone="blue" />
        </li>
      </ul>
    </div>
  </section>
);

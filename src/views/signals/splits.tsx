"use client";

import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { sigFriction, sigSplit } from "@/data/content/signals";

import { SigAccordion } from "./accordion";
import { DemoPill, LinkPill, SigHeading } from "./primitives";

/**
 * The reference's pair of split rows. First: picture left, a 55px two-tone
 * heading right, a paragraph, a two-column checklist with purple dots and
 * two pills. Second, mirrored: heading and an accordion left, picture right.
 */
export const SigSplit = () => (
  <section id="where-it-sits" className="sig-section">
    <div className="sig-wrap grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <Reveal variant="rise">
        <div className="relative aspect-[1662/918] overflow-hidden rounded-sig-panel bg-sig-creme-200">
          <Image
            src={sigSplit.shot.src}
            alt={sigSplit.shot.alt}
            fill
            sizes="(max-width: 1024px) 95vw, 48vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      <div className="max-w-[36rem]">
        <SigHeading lines={sigSplit.lines} linesSm={sigSplit.linesSm} size="text-sig-5xl xl:text-sig-6xl" />
        <Reveal variant="up" delay={160}>
          <p className="mt-6 text-sig-base">{sigSplit.standfirst}</p>
          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {sigSplit.points.map((pt) => (
              <li key={pt} className="flex items-start gap-3 text-sig-base">
                <span aria-hidden className="mt-[0.3em] flex h-3.5 w-3.5 flex-none items-center justify-center rounded-full bg-sig-purple/25">
                  <span className="h-1.5 w-1.5 rounded-full bg-sig-purple" />
                </span>
                {pt}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-2.5">
            <DemoPill label="Book a demo" tone="lilac" />
            <LinkPill label={sigSplit.secondary.label} href={sigSplit.secondary.href} />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export const SigFriction = () => (
  <section id="friction" className="sig-section">
    <div className="sig-wrap grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div className="max-w-[36rem]">
        <SigHeading lines={sigFriction.linesSm} size="text-sig-5xl 2xl:text-sig-6xl" />
        <Reveal variant="up" delay={160}>
          <p className="mt-6 mb-10 text-sig-base">{sigFriction.standfirst}</p>
          <SigAccordion items={sigFriction.cuts.map((c) => ({ title: c.title, body: c.body }))} firstOpen />
        </Reveal>
      </div>

      <Reveal variant="rise">
        <div className="relative aspect-[5/4] overflow-hidden rounded-sig-panel bg-sig-creme-200">
          <Image
            src={sigFriction.shot.src}
            alt={sigFriction.shot.alt}
            fill
            sizes="(max-width: 1024px) 95vw, 48vw"
            className="object-contain p-6 lg:p-10"
          />
        </div>
      </Reveal>
    </div>
  </section>
);

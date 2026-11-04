"use client";

import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { sigFriction, sigSplit } from "@/data/content/signals";

import { SigAccordion } from "./accordion";
import { DemoPill, LinkPill } from "./primitives";

/**
 * The reference's "Built Around Search" section, to its grid:
 *
 *   a centred 55px two-tone h2 across columns 3–10, repeating the hero intro
 *   row one   — a SQUARE photo in columns 1–6; columns 8–12 hold a 55px
 *               two-tone h3, the copy, a two-column checklist with purple
 *               dots and two pills
 *   row two   — mirrored: columns 1–5 hold the h3 and an accordion ruled in
 *               creme-400; a 16:9 photo fills columns 7–12
 *
 * Rows are 50px apart (70 at lg), the heading 40px above them (50 at lg).
 * The h3s set as running two-tone text, not stacked lines, exactly as theirs.
 */
const Accent = ({ plain, accent }: { plain: string; accent: string }) => (
  <>
    {plain} <span className="text-sig-accent">{accent}</span>
  </>
);

export const SigSplit = () => (
  <section id="where-it-sits" className="sig-section">
    <div className="sig-wrap">
      <Reveal variant="up">
        <h2 className="sig-display mx-auto mb-10 max-w-[56rem] text-center text-sig-5xl text-balance md:text-sig-6xl lg:mb-12.5">
          <Accent {...sigSplit.heading} />
        </h2>
      </Reveal>

      <div className="flex flex-col gap-12.5 lg:gap-17.5">
        <div className="grid grid-cols-1 gap-7.5 lg:grid-cols-12 lg:items-center lg:gap-5">
          <Reveal
            variant="rise"
            className="lg:col-span-6 lg:col-start-1 lg:row-start-1"
          >
            <div className="relative aspect-square overflow-hidden rounded-sig-panel bg-sig-black">
              <Image
                src={sigSplit.photo.src}
                alt={sigSplit.photo.alt}
                fill
                sizes="(max-width: 1024px) 95vw, 48vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal
            variant="up"
            className="lg:col-span-5 lg:col-start-8 lg:row-start-1"
          >
            <h3 className="sig-display text-sig-4xl lg:text-sig-6xl">
              <Accent plain={sigSplit.plain} accent={sigSplit.accent} />
            </h3>
            <p className="mt-7.5 mb-5 text-sig-base text-pretty">
              {sigSplit.standfirst}
            </p>
            <ul className="grid grid-cols-1 gap-y-3.75 text-sig-base md:grid-cols-2 md:gap-x-5">
              {sigSplit.points.map((pt) => (
                <li key={pt} className="flex items-start gap-[7px]">
                  <span
                    aria-hidden
                    className="mt-[0.2em] flex h-4 w-4 flex-none items-center justify-center rounded-full bg-sig-purple/20"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-sig-purple" />
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-2.5">
              <DemoPill label="Book a demo" tone="lilac" />
              <LinkPill
                label={sigSplit.secondary.label}
                href={sigSplit.secondary.href}
              />
            </div>
          </Reveal>
        </div>

        <div
          id="friction"
          className="grid grid-cols-1 gap-7.5 lg:grid-cols-12 lg:items-center lg:gap-5"
        >
          <Reveal
            variant="rise"
            className="lg:col-span-6 lg:col-start-7 lg:row-start-1"
          >
            <div className="relative aspect-video overflow-hidden rounded-sig-panel bg-sig-black">
              <Image
                src={sigFriction.photo.src}
                alt={sigFriction.photo.alt}
                fill
                sizes="(max-width: 1024px) 95vw, 48vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal
            variant="up"
            className="lg:col-span-5 lg:col-start-1 lg:row-start-1"
          >
            <h3 className="sig-display text-sig-4xl lg:text-sig-6xl">
              <Accent plain={sigFriction.plain} accent={sigFriction.accent} />
            </h3>
            <div className="mt-7.5">
              <SigAccordion
                items={sigFriction.cuts.map((c) => ({
                  title: c.title,
                  body: c.body,
                }))}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

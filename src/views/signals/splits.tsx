"use client";

import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { sigFriction, sigSplit } from "@/data/content/signals";

import { FrictionList } from "./friction-list";
import { DemoPill, LinkPill } from "./primitives";

/**
 * The reference's "Built Around Search" section, to its grid:
 *
 *   a centred two-tone h2 on two lines, repeating the hero intro — set a
 *   clear step ABOVE the row headings, as theirs is (70 against 55)
 *   row one   — a SQUARE photo in columns 1–6; columns 8–12 hold a 55px
 *               two-tone h3, the copy, a two-column checklist with royal-blue
 *               dots and two pills
 *   row two   — the friction line is the page's sharpest sentence, so it is
 *               lifted out of the half-column to run the full width at
 *               statement size; beneath it, the eight reasons as a scrolled,
 *               struck-through display list (`FrictionList`) — no photo
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
        <h2 className="sig-display mx-auto mb-14 text-center text-sig-5xl md:text-sig-8xl lg:mb-20 xl:text-sig-10xl 2xl:text-sig-12xl">
          {sigSplit.heading.plain}
          <span className="block text-sig-accent">
            {sigSplit.heading.accent}
          </span>
        </h2>
      </Reveal>

      <div className="flex flex-col gap-20 lg:gap-32">
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
                    className="mt-[0.2em] flex h-4 w-4 flex-none items-center justify-center rounded-full bg-sig-blue/20"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-sig-blue" />
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-2.5">
              <DemoPill label="Book a demo" tone="blue" />
              <LinkPill
                label={sigSplit.secondary.label}
                href={sigSplit.secondary.href}
              />
            </div>
          </Reveal>
        </div>

        <div id="friction">
          <Reveal variant="up">
            <h3 className="sig-display max-w-[78rem] text-sig-5xl md:text-sig-8xl xl:text-sig-10xl 2xl:text-sig-12xl">
              <Accent plain={sigFriction.plain} accent={sigFriction.accent} />
            </h3>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="mt-8 max-w-[36rem] text-sig-lg lg:mt-10">
              {sigFriction.standfirst}
            </p>
          </Reveal>
          <div className="mt-12 lg:mt-16">
            <FrictionList cuts={sigFriction.cuts} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

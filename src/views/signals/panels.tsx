"use client";

import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { demos } from "@/data/content/site";
import { sigFaq, sigImplementation, sigQuotes, sigSecurity } from "@/data/content/signals";
import { JobSearchDemo } from "@/views/site/demos/job-search";

import { SigAccordion } from "./accordion";
import { DemoPill, LinkPill, SigHeading, SigLabel } from "./primitives";

/** Label rule, then a heading on the left and its standfirst on the right —
 *  the reference's insights header, reused wherever a band opens. */
const BandHead = ({
  label,
  lines,
  linesSm,
  standfirst,
}: {
  label: string;
  lines: readonly string[];
  linesSm?: readonly string[];
  standfirst?: string;
}) => (
  <>
    <SigLabel>{label}</SigLabel>
    <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-[1fr_auto] lg:items-end">
      <SigHeading lines={lines} linesSm={linesSm} size="text-sig-5xl lg:text-sig-7xl" />
      {standfirst ? (
        <Reveal variant="up" delay={160}>
          <p className="max-w-[26rem] text-sig-base">{standfirst}</p>
        </Reveal>
      ) : null}
    </div>
  </>
);

/** The live job search — the one band the reference has no twin for, so it
 *  borrows the insights header and sits the real product in a creme panel. */
export const SigDemo = () => (
  <section id="job-search" className="sig-section">
    <div className="sig-wrap">
      <BandHead
        label={demos.jobSearch.eyebrow}
        lines={demos.jobSearch.lines}
        linesSm={demos.jobSearch.linesSm}
        standfirst={demos.jobSearch.standfirst}
      />
      <Reveal variant="rise" className="mt-12 lg:mt-16">
        <div className="rounded-sig-panel bg-sig-creme-200 p-3 lg:p-6">
          <JobSearchDemo />
        </div>
      </Reveal>
    </div>
  </section>
);

/** The reference's "what makes us different" panel: black, 5px inset, a
 *  picture filling the left and the argument on the right in two columns. */
export const SigImplementation = () => (
  <section id="implementation" className="sig-section">
    <div className="sig-wrap">
      <div className="sig-dark sig-accent-lime grid grid-cols-1 gap-8 rounded-sig-panel p-[5px] lg:grid-cols-[1fr_1.15fr]">
        <div className="relative min-h-[22rem] overflow-hidden rounded-sig-tile bg-sig-creme-200">
          <Image
            src={sigImplementation.shot.src}
            alt={sigImplementation.shot.alt}
            fill
            sizes="(max-width: 1024px) 95vw, 45vw"
            className="object-cover object-left-top"
          />
        </div>
        <div className="flex flex-col justify-center p-6 lg:py-16 lg:pr-12">
          <SigLabel>{sigImplementation.label}</SigLabel>
          <div className="mt-10">
            <SigHeading lines={sigImplementation.lines} size="text-sig-4xl lg:text-sig-5xl" />
          </div>
          <Reveal variant="up" delay={160}>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-sig-base font-medium">{sigImplementation.statement.title}</h3>
                <p className="mt-2 text-sig-base text-sig-label">{sigImplementation.statement.body}</p>
              </div>
              <div>
                <h3 className="text-sig-base font-medium">{sigImplementation.setup.title}</h3>
                <p className="mt-2 text-sig-base text-sig-label">{sigImplementation.engineLine}</p>
              </div>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {sigImplementation.statement.chips.map((chip) => (
                <li key={chip} className="rounded-full bg-sig-creme-100/10 px-3 py-1.5 text-sig-xs">
                  {chip}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-2.5">
              <DemoPill label="Book a demo" tone="creme" />
              <LinkPill label="Questions IT asks" href="#faq" />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

const QUOTE_GROUNDS = [
  { card: "bg-sig-lime text-sig-black", offset: "lg:mt-0" },
  { card: "bg-sig-lilac text-sig-black", offset: "lg:mt-28" },
  { card: "sig-dark", offset: "lg:mt-56" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("");

/** The reference's testimonial wall: a centred heading, then quote cards in
 *  its colours, stepped down the page so the wall reads as scattered. */
export const SigQuotes = () => (
  <section id="quotes" className="sig-section pt-10">
    <div className="sig-wrap">
      <SigHeading lines={sigQuotes.lines} linesSm={sigQuotes.linesSm} size="text-sig-5xl lg:text-sig-8xl" center />
      <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-20 lg:gap-10">
        {sigQuotes.quotes.map((q, i) => {
          const g = QUOTE_GROUNDS[i % QUOTE_GROUNDS.length];
          const logo = sigQuotes.logos[q.org];
          return (
            <li key={q.name} className={g.offset}>
              <Reveal variant="up" delay={i * 120}>
                <figure className={`${g.card} flex flex-col rounded-sig-tile p-6 lg:p-7`}>
                  <figcaption className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-current/10 text-sig-sm font-semibold"
                    >
                      {initials(q.name)}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sig-base font-medium tracking-sig-tight">{q.name}</span>
                      <span className="block text-sig-sm opacity-75">{q.org}</span>
                    </span>
                    {logo ? (
                      <span className="flex h-8 items-center rounded-full bg-sig-white px-3">
                        <Image
                          src={logo.src}
                          alt=""
                          width={Math.round(16 * logo.ratio)}
                          height={16}
                          className="h-4 w-auto"
                        />
                      </span>
                    ) : null}
                  </figcaption>
                  <blockquote className="mt-10 text-sig-xl leading-sig-133 font-medium tracking-sig-tighter">
                    &ldquo;{q.quote}&rdquo;
                  </blockquote>
                </figure>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

/** The reference's insights layout — one large card and a ruled list — for
 *  the security argument. */
export const SigSecurity = () => (
  <section id="security" className="sig-section">
    <div className="sig-wrap">
      <BandHead label={sigSecurity.label} lines={sigSecurity.lines} linesSm={sigSecurity.linesSm} />
      <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <Reveal variant="rise">
          <div className="sig-dark flex min-h-[28rem] flex-col justify-end rounded-sig-panel p-8 lg:min-h-[34rem] lg:p-10">
            <p className="text-sig-2xl leading-sig-12 font-medium tracking-sig-tighter lg:text-sig-3xl">
              {sigSecurity.standfirst}
            </p>
            <div className="mt-8">
              <DemoPill label="Book a demo" tone="creme" />
            </div>
          </div>
        </Reveal>
        <ul className="border-t border-sig-hair">
          {sigSecurity.points.map((pt, i) => (
            <li key={pt.title} className="border-b border-sig-hair py-7">
              <Reveal variant="up" delay={i * 90}>
                <h3 className="text-sig-xl leading-sig-12 font-medium tracking-sig-tighter">{pt.title}</h3>
                <p className="mt-3 max-w-[30rem] text-sig-base">{pt.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

/** The reference's FAQ: a creme-200 panel, heading left, accordion right. */
export const SigFaq = () => (
  <section id="faq" className="sig-section">
    <div className="sig-wrap">
      <div className="sig-panel grid grid-cols-1 gap-10 bg-sig-creme-200 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <SigHeading lines={sigFaq.lines} size="text-sig-5xl lg:text-sig-7xl" />
          <Reveal variant="up" delay={160} className="mt-8">
            <DemoPill label="Book a demo" tone="lilac" />
          </Reveal>
        </div>
        <SigAccordion items={sigFaq.items.map((it) => ({ title: it.q, body: it.a }))} />
      </div>
    </div>
  </section>
);

"use client";

import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { sigClose } from "@/data/content/signals";

import { DemoPill, LinkPill, SigHeading } from "./primitives";

/**
 * The reference's footer, to its construction: ONE black band whose TOP is
 * rounded (30px) so it lifts off the creme page, padded 40px with a 55px
 * foot. Inside it the ask is its own card — black-200, rounded 20, on a
 * 12-column grid: photographs in columns 1–5, a 75px two-tone heading, the
 * copy and the pills in 6–12. Under that the blurb, the link columns and the
 * legal line, over the mark set vast and barely-there in black-200,
 * three-quarters of the width and cut by the foot of the page.
 */
export const SigClose = () => {
  const { footer } = sigClose;
  return (
    <footer
      id="contact"
      className="sig-dark relative isolate overflow-hidden rounded-t-sig-band px-5 pt-10 pb-[3.4375rem] md:px-10"
    >
      <div
        aria-hidden
        className="sig-watermark absolute right-0 bottom-0 -z-10 aspect-square w-3/4 translate-y-[30%]"
      />

      <section
        id="demo"
        aria-label="Book a demo"
        className="mb-15 grid grid-cols-1 overflow-hidden rounded-sig-panel bg-sig-black-200 lg:mb-25 lg:grid-cols-12 lg:items-center lg:gap-5"
      >
        <ul className="grid h-[60vh] grid-cols-2 gap-1 lg:col-span-5 lg:col-start-1 lg:h-auto lg:self-stretch">
          {sigClose.tiles.map((tile) => (
            <li key={tile.src} className="relative overflow-hidden">
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
        <div className="p-7.5 md:p-10 lg:col-span-7 lg:col-start-6 lg:px-15 lg:py-25 2xl:px-25">
          <SigHeading
            lines={sigClose.lines}
            linesSm={sigClose.linesSm}
            size="text-sig-5xl md:text-sig-7xl lg:text-sig-9xl"
          />
          <Reveal variant="up" delay={160}>
            <p className="mt-7.5 max-w-[44.75rem] text-sig-base text-sig-label">
              {sigClose.standfirst}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <DemoPill label={sigClose.cta.label} tone="creme" />
              <LinkPill label="See it working" href="#job-search" />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-5">
        <div className="lg:col-span-4">
          <p className="max-w-[24rem] text-sig-2xl leading-sig-12 font-medium tracking-sig-tighter lg:text-sig-3xl">
            <span className="text-sig-accent">Aplify</span>{" "}
            {footer.blurb.charAt(0).toLowerCase() + footer.blurb.slice(1)}
          </p>
          <a
            href={`mailto:${footer.email}`}
            className="mt-8 inline-flex h-10 items-center rounded-full bg-sig-black-200 px-4 text-sig-sm transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-sig-lilac hover:text-sig-black"
          >
            {footer.email}
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
          {sigClose.columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-sig-sm text-sig-label">{col.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sig-base font-medium transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-sig-lilac"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="mt-24 flex flex-wrap items-center justify-between gap-4 text-sig-xs text-sig-label">
        <p>© {new Date().getFullYear()} Aplify. All rights reserved.</p>
        <p>Built in the UK</p>
      </div>
    </footer>
  );
};

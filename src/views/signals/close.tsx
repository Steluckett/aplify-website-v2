"use client";

import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { sigClose } from "@/data/content/signals";

import { DemoPill, SigHeading } from "./primitives";

/**
 * The reference's close: a black band that runs into the footer. A 2×2 grid
 * of tiles on the left (theirs are the team; ours are the product), the ask
 * on the right in a 70px two-tone, then the footer on the same black — a
 * 30px blurb, the links in columns, and the mark as a vast faint watermark
 * cut by the page's foot.
 */
export const SigClose = () => {
  const { footer } = sigClose;
  return (
    <div className="sig-dark relative isolate overflow-hidden">
      <section id="demo" className="sig-wrap grid grid-cols-1 gap-12 pt-5 pb-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:pb-28">
        <Reveal variant="rise">
          <ul className="grid grid-cols-2 gap-3">
            {sigClose.tiles.map((tile) => (
              <li key={tile.src} className="relative aspect-[4/5] overflow-hidden rounded-sig-tile bg-sig-black-200">
                <Image src={tile.src} alt={tile.alt} fill sizes="(max-width: 1024px) 45vw, 22vw" className="object-cover object-top" />
              </li>
            ))}
          </ul>
        </Reveal>
        <div>
          <SigHeading lines={sigClose.lines} linesSm={sigClose.linesSm} size="text-sig-5xl lg:text-sig-8xl" />
          <Reveal variant="up" delay={160}>
            <p className="mt-6 max-w-[30rem] text-sig-base text-sig-label">{sigClose.standfirst}</p>
            <div className="mt-8">
              <DemoPill label={sigClose.cta.label} tone="creme" />
            </div>
          </Reveal>
        </div>
      </section>

      <footer id="contact" className="sig-wrap relative pt-16 pb-10">
        <Image
          src="/aplify-mark-light.svg"
          alt=""
          aria-hidden
          width={600}
          height={600}
          className="pointer-events-none absolute right-0 bottom-[-12rem] -z-10 w-[40rem] max-w-[80vw] opacity-[0.04]"
        />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1.5fr]">
          <div>
            <p className="max-w-[24rem] text-sig-2xl leading-sig-12 font-medium tracking-sig-tighter lg:text-sig-3xl">
              <span className="text-sig-accent">Aplify</span> {footer.blurb.charAt(0).toLowerCase() + footer.blurb.slice(1)}
            </p>
            <a
              href={`mailto:${footer.email}`}
              className="mt-8 inline-flex h-10 items-center rounded-full bg-sig-black-200 px-4 text-sig-sm transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-sig-lilac hover:text-sig-black"
            >
              {footer.email}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
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
    </div>
  );
};

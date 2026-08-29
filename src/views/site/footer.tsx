"use client";

import Image from "next/image";
import Link from "next/link";

import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { footer } from "@/data/content/site";

/**
 * Closing CTA and footer.
 *
 * The footer is the reference's best idea and the one worth copying most
 * exactly: it is not a strip at the bottom of the page, it is a CARD — inset
 * from the page edges, rounded on all four corners, with the spectrum wash
 * pooling at its foot. The page therefore ends on a considered surface rather
 * than running out of content, which is most of why the reference feels
 * finished.
 */
export const SiteFooter = () => (
  <>
    <section id="demo" className="py-26">
      <div className="shell">
        <SectionIntro
          lines={[...footer.cta.lines]}
          linesSm={[...footer.cta.linesSm]}
          standfirst={footer.cta.standfirst}
        >
          <CtaButton label={footer.cta.primary.label} />
        </SectionIntro>
      </div>
    </section>

    <footer id="contact" className="pb-5 sm:pb-6">
      <Reveal variant="fade">
        <div className="shell relative overflow-hidden rounded-panel bg-white shadow-group">
          {/* The wash pools at the FOOT of the card, not across it — the page's
              last surface glows from below, the way the ground's own washes do. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
            style={{
              background:
                "linear-gradient(to top, rgb(91 78 224 / 0.14), rgb(14 165 233 / 0.08) 45%, transparent 100%)",
            }}
          />

          <div className="relative grid grid-cols-1 gap-12 p-8 sm:p-12 lg:grid-cols-[1.1fr_1.4fr]">
            <div>
              <Image
                src="/aplify-dark.svg"
                alt="Aplify"
                width={317}
                height={103}
                className="h-7 w-auto"
              />
              <p className="mt-6 max-w-[26rem] text-body leading-[1.6] text-ink-body">
                {footer.blurb}
              </p>
              <a
                href={`mailto:${footer.email}`}
                className="mt-6 inline-flex text-body font-medium text-ink-accent hover:underline"
              >
                {footer.email}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {footer.columns.map((col) => (
                <nav key={col.heading} aria-label={col.heading}>
                  <h2 className="text-sm font-medium text-ink">
                    {col.heading}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-body text-ink-body transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-ink"
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

          <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-hairline px-8 py-6 sm:px-12">
            <p className="text-xs text-ink-label">
              © {new Date().getFullYear()} Aplify. All rights reserved.
            </p>
            <p className="text-xs text-ink-label">Built in the UK</p>
          </div>
        </div>
      </Reveal>
    </footer>
  </>
);

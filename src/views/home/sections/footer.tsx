"use client";

import Image from "next/image";
import Link from "next/link";

import { Inview } from "@/components/animation/springs/in-view";
import { PillButton } from "@/components/ui/pill-button";
import { StackedLines } from "@/components/ui/stacked-lines";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useContactModal } from "@/hooks/use-contact-modal";
import { anchorScroll } from "@/utils/anchor-scroll";
import { ctaContent, footerContent } from "@/data/content/closing";
import { fullNav } from "@/data/content/hero";

/**
 * The conversion, then the footer (§8.16–17).
 *
 * The CTA is the last loud thing on the page — display face, full width — and
 * everything below it drops to the quietest register on the site. One offer,
 * one button, and it opens the same dialog every other CTA does.
 */
export const SiteFooter = () => {
  const openContact = useContactModal((s) => s.open);

  return (
    <footer id="contact" className="border-t border-hairline">
      {/* CTA */}
      <div
        id="demo"
        className="relative isolate overflow-hidden px-6 py-32 sm:px-10 lg:py-40"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "var(--glow-product)" }}
        />
        <Eyebrow>{ctaContent.eyebrow}</Eyebrow>
        <StackedLines
          tag="p"
          lines={["See it against", "your own feed"]}
          className="display mt-5 text-piece"
        />
        <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-ink-muted">
          {ctaContent.standfirst}
        </p>
        <Inview
          tag="div"
          mode="once"
          from={{ opacity: 0, filter: "blur(6px)" }}
          to={{ opacity: 1, filter: "blur(0px)" }}
          delayIn={150}
          config={{ tension: 190, friction: 30 }}
          className="mt-10"
        >
          <PillButton onClick={openContact}>{ctaContent.submitLabel}</PillButton>
        </Inview>
      </div>

      {/* Brand + nav columns */}
      <div className="grid gap-12 border-t border-hairline px-6 py-16 sm:px-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="max-w-xs">
          <Image
            src="/aplify-light.svg"
            alt="Aplify"
            width={317}
            height={103}
            className="h-7 w-auto"
          />
          <p className="mt-5 text-body leading-relaxed text-ink-muted">
            The recruitment experience candidates actually finish — on your own
            career site or campaign landing page.
          </p>
          <address className="mt-6 not-italic">
            <Link
              href={`mailto:${footerContent.contactEmail}`}
              className="text-body text-ink underline underline-offset-4 outline-none hover:text-brand-light focus-visible:text-brand-light"
            >
              {footerContent.contactEmail}
            </Link>
          </address>

          <p className="eyebrow mt-8 block">{footerContent.gdprLabel}</p>
          <p className="mt-2 text-caption leading-relaxed text-ink-soft">
            {footerContent.gdprNote}
          </p>
        </div>

        {[fullNav.slice(0, 4), fullNav.slice(4)].map((column, columnIndex) => (
          <nav
            key={columnIndex}
            aria-label={columnIndex === 0 ? "Product" : "Platform"}
          >
            <span className="eyebrow block">
              {columnIndex === 0 ? "Product" : "Platform"}
            </span>
            <ul className="mt-5 space-y-4">
              {column.map((entry) => (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    onClick={anchorScroll(entry.href)}
                    className="group block outline-none"
                  >
                    <span className="block text-body text-ink transition-colors group-hover:text-brand-light group-focus-visible:text-brand-light">
                      {entry.label}
                    </span>
                    <span className="mt-0.5 block text-caption text-ink-soft">
                      {entry.explainer}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col gap-4 border-t border-hairline px-6 py-8 text-caption text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p>{footerContent.copyright}</p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-fit cursor-pointer outline-none hover:text-ink focus-visible:text-ink"
        >
          {ctaContent.readAgainLabel} ↑
        </button>
      </div>
    </footer>
  );
};

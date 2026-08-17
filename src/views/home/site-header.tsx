"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

import { Spring } from "@/components/animation/springs/spring";
import { Hover } from "@/components/animation/springs/hover";
import { PillButton } from "@/components/ui/pill-button";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";
import { useContactModal } from "@/hooks/use-contact-modal";
import { anchorScroll } from "@/utils/anchor-scroll";
import { fullNav, type NavLink } from "@/data/content/hero";

export interface SiteHeaderProps {
  brand: string;
  navLeft: NavLink[];
  cta: string;
}

/**
 * Hero header, per the Baseline reference: quick links left, the wordmark
 * centred, the CTA + burger right. The burger opens a full-screen black menu
 * carrying the complete seven-item navigation (handover §8) — every entry
 * with its one-line explainer visible without hovering.
 */
export const SiteHeader = ({ brand, navLeft, cta }: SiteHeaderProps) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const stop = useScroll((s) => s.stop);
  const start = useScroll((s) => s.start);
  const openContact = useContactModal((s) => s.open);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) stop();
    else start();
    return () => start();
  }, [open, stop, start]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="flex items-center justify-between gap-4 px-6 pt-6 text-xs sm:px-10 sm:pt-8">
      <nav aria-label="Primary" className="hidden flex-1 gap-8 lg:flex">
        {navLeft.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={anchorScroll(link.href)}
            className="whitespace-nowrap uppercase leading-tight tracking-wide opacity-90 outline-none hover:opacity-100 focus-visible:underline"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/"
        aria-label={`${brand} home`}
        className="flex items-center outline-none focus-visible:opacity-70 lg:flex-1 lg:justify-center"
      >
        <Image
          src="/aplify-light.svg"
          alt={brand}
          width={317}
          height={103}
          priority
          className="h-[1.5rem] w-auto"
        />
      </Link>

      <div className="flex flex-1 items-center justify-end gap-4 sm:gap-5">
        <button
          type="button"
          onClick={openContact}
          className="hidden cursor-pointer uppercase tracking-wide underline-offset-4 outline-none hover:underline focus-visible:underline sm:inline"
        >
          {cta}
        </button>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="grid size-10 cursor-pointer place-items-center rounded-pill border border-hairline-strong bg-white/[0.06] outline-none backdrop-blur transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-brand-light"
        >
          <span className="flex flex-col gap-[5px]">
            <span className="block h-px w-4 bg-ink" />
            <span className="block h-px w-4 bg-ink" />
          </span>
        </button>
      </div>

      {mounted &&
        createPortal(
          <MenuOverlay
            open={open}
            brand={brand}
            cta={cta}
            onClose={() => setOpen(false)}
          />,
          document.body,
        )}
    </header>
  );
};

const MenuOverlay = ({
  open,
  brand,
  cta,
  onClose,
}: {
  open: boolean;
  brand: string;
  cta: string;
  onClose: () => void;
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const openContact = useContactModal((s) => s.open);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[70] flex flex-col ${open ? "" : "pointer-events-none"}`}
    >
      <Spring
        tag="div"
        enabled={open}
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ tension: 260, friction: 30 }}
        className="absolute inset-0 bg-canvas"
        onClick={onClose}
      />

      <Spring
        tag="div"
        enabled={open}
        from={{ opacity: 0, y: -24 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 220, friction: 28 }}
        // Outer padding mirrors <main>'s p-2/sm:p-3 inset; the inner padding
        // mirrors the hero header's px/pt — together they put the close button
        // exactly where the burger sits, so the icon swap is seamless.
        className="relative flex h-full flex-col text-ink"
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 pt-6 pb-6 sm:px-10 sm:pt-8 sm:pb-8">
          <div className="flex items-center justify-between">
            <Image
              src="/aplify-light.svg"
              alt={brand}
              width={317}
              height={103}
              className="h-[1.5rem] w-auto"
            />
            <button
              ref={closeRef}
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="grid size-10 cursor-pointer place-items-center rounded-pill border border-hairline-strong bg-white/[0.06] outline-none transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              <Hover
                tag="span"
                trigger={closeRef}
                from={{ rotate: 0 }}
                to={{ rotate: 90 }}
                config={{ tension: 300, friction: 18 }}
                className="grid place-items-center"
              >
                <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </Hover>
            </button>
          </div>

          <nav
            aria-label="Menu"
            className="flex flex-1 flex-col justify-center gap-3 py-8"
          >
            {fullNav.map((entry, i) => (
              <Spring
                key={entry.href}
                tag="div"
                enabled={open}
                from={{ opacity: 0, filter: "blur(6px)" }}
                to={{ opacity: 1, filter: "blur(0px)" }}
                delayIn={100 + i * 60}
                config={{ tension: 200, friction: 26 }}
              >
                <Link
                  href={entry.href}
                  onClick={anchorScroll(entry.href, onClose)}
                  className="group block w-fit outline-none"
                >
                  <span className="display block text-[2.25rem] transition-colors group-hover:text-brand-light group-focus-visible:text-brand-light sm:text-[3.25rem]">
                    {entry.label}
                  </span>
                  <span className="mt-1 block text-caption text-ink-soft">
                    {entry.explainer}
                  </span>
                </Link>
              </Spring>
            ))}
          </nav>

          <div className="flex flex-col gap-6 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
            <PillButton
              variant="primary"
              onClick={() => {
                onClose();
                openContact();
              }}
            >
              {cta}
            </PillButton>
            <Link
              href="mailto:hello@aplify.co.uk"
              className="text-caption text-ink-muted outline-none hover:text-ink focus-visible:text-ink"
            >
              hello@aplify.co.uk
            </Link>
          </div>
        </div>
      </Spring>
    </div>
  );
};

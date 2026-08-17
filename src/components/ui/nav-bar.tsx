"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Spring } from "@/components/animation/springs/spring";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavBarProps {
  items: NavItem[];
  ctaLabel: string;
  ctaHref: string;
}

/**
 * The floating glass nav.
 *
 * Structurally the reference's: one rounded bar inset from the page edges,
 * wordmark at the left behind a hairline, links centred, a single filled pill
 * at the right. Two things make it ours — the wordmark, and the fact that the
 * pill carries the spectrum sweep rather than a flat violet.
 *
 * It is GLASS rather than solid white because it crosses the hero video: a
 * solid bar reads as a lid laid over the imagery, and a transparent one loses
 * the links against the grass.
 */
export const NavBar = ({ items, ctaLabel, ctaHref }: NavBarProps) => {
  const [open, setOpen] = useState(false);

  // A menu that survives a resize into desktop leaves the page scroll-locked
  // with no visible way to release it.
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("resize", close);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <nav
        aria-label="Primary"
        className="glass pointer-events-auto mx-auto flex h-16 w-full max-w-[76rem] items-center gap-2 rounded-pill pr-2 pl-5 shadow-[0_1px_2px_rgba(16,19,26,0.04),0_10px_28px_rgba(16,19,26,0.07)] sm:pl-6"
      >
        <Link href="#home" className="flex flex-none items-center" aria-label="Aplify — home">
          <Image
            src="/aplify-dark.svg"
            alt="Aplify"
            width={317}
            height={103}
            priority
            className="h-[1.375rem] w-auto"
          />
        </Link>

        {/* The hairline is the reference's device: it separates identity from
            navigation so the wordmark does not read as the first link. */}
        <span className="ml-4 hidden h-7 w-px flex-none bg-hairline lg:block" aria-hidden />

        <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-pill px-3 py-2 text-sm text-ink-body transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-black/[0.04] hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-1 items-center justify-end gap-2 lg:flex-none">
          <Link href={ctaHref} className="btn btn-primary hidden sm:inline-flex">
            {ctaLabel}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-menu"
            className="flex h-12 w-12 items-center justify-center rounded-pill bg-surface-chip text-ink lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 8h16M4 16h16"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open ? (
        <Spring
          from={{ opacity: 0, transform: "translate3d(0,-8px,0)" }}
          to={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          config={{ tension: 200, friction: 26 }}
          className="pointer-events-auto mx-auto mt-3 w-full max-w-[76rem] lg:hidden"
        >
          <div id="nav-menu" className="glass rounded-card p-3">
            <ul className="flex flex-col">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-sm px-4 py-3 text-body text-ink-body hover:bg-black/[0.04] hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-2 w-full"
            >
              {ctaLabel}
            </Link>
          </div>
        </Spring>
      ) : null}
    </header>
  );
};

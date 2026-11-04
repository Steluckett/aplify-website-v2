"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { animated, useSpring } from "@react-spring/web";

import { Spring } from "@/components/animation/springs/spring";
import { CtaButton } from "@/components/ui/cta-button";
import { useContactModal } from "@/hooks/use-contact-modal";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavBarProps {
  items: NavItem[];
  ctaLabel: string;
}

/**
 * The floating glass nav.
 *
 * Structurally the reference's: one rounded bar inset from the page edges,
 * wordmark at the left, links centred, a single filled pill at the right.
 * No border and no internal divider — the bar is defined by its blur and its
 * shadow alone, so it reads as a pane of glass rather than a boxed toolbar.
 *
 * It is GLASS rather than solid white because it crosses the hero video: a
 * solid bar reads as a lid laid over the imagery, and a transparent one loses
 * the links against the grass.
 */
export const NavBar = ({ items, ctaLabel }: NavBarProps) => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  /* Signals steer: over the night hero the bar has no glass and inverts —
     light wordmark, cream links, cream pill. */
  const [onHero, setOnHero] = useState(true);
  const openBookDemo = useContactModal((s) => s.open);

  /* HIDE ON SCROLL DOWN, RETURN ON SCROLL UP (Stephen, 2026-08-30): the page
     now carries pinned set pieces, and a permanent bar spends viewport
     height the choreography needs. Direction is read from native scroll
     events (Lenis emits them — same contract `use-scroll-progress` relies
     on), coalesced into one rAF per burst, with a small deadband so a
     trembling trackpad cannot flicker the bar. Near the top it is always
     shown; while the mobile menu is open it never hides under the reader. */
  useEffect(() => {
    let last = window.scrollY;
    let frame: number | null = null;
    const measure = () => {
      frame = null;
      const y = window.scrollY;
      const hero = document.getElementById("home");
      setOnHero(y < (hero ? hero.offsetHeight - 96 : 0));
      const delta = y - last;
      if (Math.abs(delta) > 4) {
        if (y < 120) setHidden(false);
        else setHidden(delta > 0);
        last = y;
      }
    };
    const schedule = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const bar = useSpring({
    y: hidden && !open ? -130 : 0,
    config: { tension: 210, friction: 26 },
  });

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
    <animated.header
      style={{ transform: bar.y.to((v) => `translate3d(0,${v}%,0)`) }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-4 sm:pt-5"
    >
      <nav
        aria-label="Primary"
        className={`shell pointer-events-auto flex h-[4.5rem] items-center gap-2 rounded-pill pr-3 pl-6 transition-[background-color,box-shadow] duration-[var(--duration-base)] ease-entrance sm:pl-8 ${
          onHero && !open
            ? "bg-transparent"
            : "glass shadow-[0_1px_2px_rgba(16,19,26,0.04),0_10px_28px_rgba(16,19,26,0.07)]"
        }`}
      >
        <Link href="#home" className="flex flex-none items-center" aria-label="Aplify — home">
          <Image
            src={onHero && !open ? "/aplify-light.svg" : "/aplify-dark.svg"}
            alt="Aplify"
            width={317}
            height={103}
            priority
            className="h-[1.5rem] w-auto"
          />
        </Link>

        <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`rounded-pill px-3 py-2 text-sm font-medium transition-colors duration-[var(--duration-fast)] ease-entrance ${
                  onHero
                    ? "text-ink-on-dark/80 hover:bg-white/[0.08] hover:text-ink-on-dark"
                    : "text-ink-body hover:bg-black/[0.04] hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-1 items-center justify-end gap-2 lg:flex-none">
          <CtaButton
            label={ctaLabel}
            tone={onHero && !open ? "light" : "dark"}
            className="hidden sm:inline-flex"
          />

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
          className="shell pointer-events-auto mt-3 lg:hidden"
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
            {/* A real button, like the desktop CTA — it opens the book-a-demo
                dialog, and the drawer gets out of its way first. */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openBookDemo();
              }}
              className="btn btn-primary mt-2 w-full"
            >
              {ctaLabel}
            </button>
          </div>
        </Spring>
      ) : null}
    </animated.header>
  );
};

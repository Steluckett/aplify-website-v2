"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { animated, useSpring, useSprings } from "@react-spring/web";

import { sigNav } from "@/data/content/signals";

import { DemoPill } from "./primitives";

/**
 * The reference's nav: a wordmark and a two-line menu button, nothing else,
 * set in `mix-blend-difference` so one light mark reads on the black hero and
 * the creme page alike. The links live in a full-screen black menu that
 * springs down over the page, its links arriving one after another.
 */
export const SigNav = () => {
  const [open, setOpen] = useState(false);

  const sheet = useSpring({
    clip: open ? 0 : 100,
    config: { tension: 220, friction: 32 },
  });
  // Staggered by delay rather than `useTrail`: a trail chains each spring
  // to the one before, and reversing that chain re-entrantly overflowed the
  // stack here.
  const [trail] = useSprings(
    sigNav.items.length + 1,
    (i) => ({
      y: open ? 0 : 40,
      opacity: open ? 1 : 0,
      delay: open ? 120 + i * 45 : 0,
      config: { tension: 260, friction: 30 },
    }),
    [open],
  );

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] mix-blend-difference">
        <nav aria-label="Primary" className="sig-wrap flex h-20 items-center justify-between lg:h-24">
          <Link href="#home" className="pointer-events-auto" aria-label="Aplify, home">
            <Image src="/aplify-light.svg" alt="Aplify" width={317} height={103} priority className="h-6 w-auto" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="sig-menu"
            className="pointer-events-auto flex h-11 w-11 flex-col items-end justify-center gap-[7px] text-sig-creme-100"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span
              className={`block h-px w-6 bg-current transition-transform duration-[var(--duration-base)] ease-entrance ${open ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-current transition-transform duration-[var(--duration-base)] ease-entrance ${open ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </button>
        </nav>
      </header>

      <animated.div
        id="sig-menu"
        aria-hidden={!open}
        className="sig-dark fixed inset-0 z-[55] overflow-y-auto"
        style={{
          clipPath: sheet.clip.to((v) => `inset(0 0 ${v}% 0)`),
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="sig-wrap flex min-h-full flex-col justify-end pt-32 pb-12">
          <ul className="flex flex-col gap-2">
            {sigNav.items.map((item, i) => (
              <animated.li
                key={item.href}
                style={{ opacity: trail[i].opacity, transform: trail[i].y.to((v) => `translate3d(0,${v}px,0)`) }}
              >
                <Link
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="sig-display text-sig-5xl transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-sig-lilac lg:text-sig-8xl"
                >
                  {item.label}
                </Link>
              </animated.li>
            ))}
          </ul>
          <animated.div
            style={{
              opacity: trail[sigNav.items.length].opacity,
              transform: trail[sigNav.items.length].y.to((v) => `translate3d(0,${v}px,0)`),
            }}
            className="mt-12"
          >
            <DemoPill label={sigNav.ctaLabel} tone="creme" />
          </animated.div>
        </div>
      </animated.div>
    </>
  );
};

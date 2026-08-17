"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";

import { Hover } from "@/components/animation/springs/hover";
import { anchorScroll } from "@/utils/anchor-scroll";

type Variant = "primary" | "outline" | "brand";

export interface PillButtonProps {
  children: ReactNode;
  /** Renders an anchor when set; otherwise a button. */
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  withArrow?: boolean;
  ariaLabel?: string;
  className?: string;
}

/**
 * On a near-black page the primary action is a white pill — the brightest
 * non-screen element on the site, which is what makes it unmissable without
 * shouting. `brand` exists for the rare moment blue should carry the action.
 */
const VARIANTS: Record<Variant, string> = {
  primary: "bg-paper text-paper-ink hover:bg-brand-light hover:text-white",
  outline: "border border-hairline-strong text-ink hover:border-ink",
  brand: "bg-brand text-white hover:bg-brand-light",
};

export const PillButton = ({
  children,
  href,
  onClick,
  variant = "primary",
  withArrow = true,
  ariaLabel,
  className,
}: PillButtonProps) => {
  const ref = useRef<HTMLElement>(null);
  const base = `group inline-flex cursor-pointer items-center gap-2 rounded-pill px-7 py-3.5 text-caption font-medium uppercase tracking-[0.12em] outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${VARIANTS[variant]} ${className ?? ""}`;

  const inner = (
    <>
      {children}
      {withArrow && (
        <Hover
          tag="span"
          trigger={ref}
          from={{ x: 0 }}
          to={{ x: 5 }}
          config={{ tension: 320, friction: 20 }}
          className="inline-flex"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Hover>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        onClick={anchorScroll(href, onClick)}
        className={base}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={base}
    >
      {inner}
    </button>
  );
};

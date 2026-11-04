"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { StackedLines } from "@/components/ui/stacked-lines";
import { useContactModal } from "@/hooks/use-contact-modal";
import type { Tags } from "@/types/springs";

/**
 * The SIGNALS option's shared parts. Every section builds from these, so the
 * page has one heading treatment, one label and one pill — the reference's.
 */

export const ArrowUpRight = ({ className = "h-3 w-3" }: { className?: string }) => (
  <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden>
    <path d="M3 9 9 3M4 3h5v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowSide = ({ dir, className = "h-3 w-3" }: { dir: "left" | "right"; className?: string }) => (
  <svg viewBox="0 0 12 12" fill="none" className={`${className} ${dir === "left" ? "rotate-180" : ""}`} aria-hidden>
    <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PlusIcon = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5" aria-hidden>
    <path d="M2 6h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    {open ? null : <path d="M6 2v8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />}
  </svg>
);

/** The section label with its hairline. `aside` sits at the right end. */
export const SigLabel = ({ children, aside }: { children: ReactNode; aside?: ReactNode }) => (
  <Reveal variant="fade">
    <p className="sig-label">
      <span>{children}</span>
      {aside ? <span>{aside}</span> : null}
    </p>
  </Reveal>
);

export interface SigHeadingProps {
  lines: readonly string[];
  linesSm?: readonly string[];
  /** Tailwind size classes, e.g. "text-sig-5xl lg:text-sig-8xl". */
  size: string;
  tag?: Tags;
  /** How many closing lines take the accent. Default: the last one. */
  toneLines?: number;
  center?: boolean;
  className?: string;
}

/**
 * The two-tone heading: ink lines, then the closing line in the accent
 * (purple on creme, lilac or lime on black). A single-line heading stays ink.
 */
export const SigHeading = ({
  lines,
  linesSm,
  size,
  tag = "h2",
  toneLines = 1,
  center = false,
  className = "",
}: SigHeadingProps) => {
  const tones = (n: number) =>
    Array.from({ length: n }, (_, i) => (n > 1 && i >= n - toneLines ? "sig-tone" : ""));
  const base = `sig-lines ${size} ${center ? "text-center" : ""} ${className}`;
  const line = center ? "justify-center" : "";
  return (
    <>
      <StackedLines
        tag={tag}
        lines={[...lines]}
        className={`${base} ${linesSm ? "hidden md:block" : ""}`}
        lineClassName={line}
        lineClassNames={tones(lines.length)}
        stagger={90}
        duration={1000}
      />
      {linesSm ? (
        <StackedLines
          tag={tag}
          lines={[...linesSm]}
          className={`${base} md:hidden`}
          lineClassName={line}
          lineClassNames={tones(linesSm.length)}
          stagger={90}
          duration={1000}
        />
      ) : null}
    </>
  );
};

type PillTone = "creme" | "lilac" | "black" | "ghost";

/** A pill that opens the book-a-demo dialog. */
export const DemoPill = ({ label, tone = "lilac" }: { label: string; tone?: PillTone }) => {
  const open = useContactModal((s) => s.open);
  return (
    <button type="button" onClick={open} className={`sig-pill sig-pill-${tone}`}>
      {label}
      <ArrowUpRight />
    </button>
  );
};

/** A pill that navigates. */
export const LinkPill = ({ label, href, tone = "ghost" }: { label: string; href: string; tone?: PillTone }) => (
  <Link href={href} className={`sig-pill sig-pill-${tone}`}>
    {label}
    <ArrowUpRight />
  </Link>
);

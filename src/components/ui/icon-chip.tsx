import type { ReactNode } from "react";

/**
 * The page's icon set, and the chip that holds it.
 *
 * MOVED HERE 2026-08-25 from `platform.tsx`, where it was defined for the
 * feature bento and orphaned when that band was cut. It was still sitting in
 * that file with zero call sites. Rather than delete a usable set, it lives
 * here and the friction band's eight new marks join it.
 *
 * `fill="none"` on the svg is LOAD BEARING: without it any closed path in the
 * set fills solid black. The line-only icons look fine either way, which is
 * exactly how that goes unnoticed.
 *
 * Drawing rules, so a ninth icon matches the eight: a 24x24 box, strokes at
 * 1.6 (1.8 where a shape needs to hold its own against a heavier neighbour),
 * round caps and joins, `currentColor` throughout, and no fills. Keep them
 * SCHEMATIC — these sit at 20px inside a 44px chip, where any detail smaller
 * than about 2px turns to mud.
 */
export const ICONS: Record<string, ReactNode> = {
  /* ---- the original set, drawn for the feature bento ---- */
  cursor: (
    <path
      d="M6 3l12 8-5 1.2L10.6 17 6 3z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  search: (
    <>
      <circle
        cx="11"
        cy="11"
        r="6"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M15.5 15.5L20 20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
  chart: (
    <path
      d="M5 19V11M12 19V5M19 19v-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  ),
  /* Several feeds converging into one. */
  sources: (
    <>
      <path
        d="M4 6h5a4 4 0 014 4v4a4 4 0 004 4h3M4 12h5M4 18h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20" cy="18" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  /* The mirror of `feed` — the same tray, the arrow leaving it. */
  export: (
    <>
      <path
        d="M12 12V3m0 0L8.6 6.4M12 3l3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 15v2.5A2.5 2.5 0 006.5 20h11a2.5 2.5 0 002.5-2.5V15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
  /* Rewrite, with the guardrail implied: a nib, not a wand. */
  rewrite: (
    <>
      <path
        d="M4 20l1-4L15.5 5.5a2.1 2.1 0 013 3L8 19l-4 1z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M14 7l3 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
  /* Something arriving and being caught. */
  feed: (
    <>
      <path
        d="M12 3v9m0 0l3.4-3.4M12 12L8.6 8.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 15v2.5A2.5 2.5 0 006.5 20h11a2.5 2.5 0 002.5-2.5V15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),

  /* ---- the friction band. One mark per cut, drawn as the THING THAT GOES
         WRONG rather than as the feature it maps to, because this band is
         about loss and a tidy feature icon would undercut the copy. ---- */

  /* Three results where one job should be: the duplicate-listing problem. */
  duplicates: (
    <>
      <rect
        x="3"
        y="4"
        width="13"
        height="4"
        rx="1.4"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <rect
        x="3"
        y="10"
        width="13"
        height="4"
        rx="1.4"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <rect
        x="3"
        y="16"
        width="13"
        height="4"
        rx="1.4"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M19.5 6.5v11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="2 2.6"
      />
    </>
  ),
  /* A page that is all bullet points and no argument. */
  bullets: (
    <>
      <rect
        x="4"
        y="3"
        width="16"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" />
      <circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="8" cy="16" r="1" fill="currentColor" stroke="none" />
      <path
        d="M11 8h6M11 12h6M11 16h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
  /* Leaving the box you were in. Deliberately the same gesture as `export`
     turned sideways — one is a feed leaving on purpose, this is a person
     leaving by accident. */
  redirect: (
    <>
      <path
        d="M13 4H6a2 2 0 00-2 2v12a2 2 0 002 2h7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M16 8l4 4-4 4M20 12h-9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  /* The wall in front of the job. A padlock, not a key: a key implies you get
     in, and the point of this cut is that people do not. */
  lock: (
    <>
      <rect
        x="4"
        y="10"
        width="16"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M8 10V7.5a4 4 0 018 0V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  /* A form that keeps going past the bottom of the box. */
  longForm: (
    <>
      <path
        d="M5 3h14a1 1 0 011 1v13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4 4v16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 7h8M8 11h8M8 15h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 19h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="1 3"
      />
    </>
  ),
  /* A handset. The home bar is what makes it read as a phone rather than a
     rounded rectangle at this size. */
  handset: (
    <>
      <rect
        x="7"
        y="2.5"
        width="10"
        height="19"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M10.5 18.5h3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
  /* A road that stops. Not a cross — a cross reads as an error message, and
     this cut is about arriving somewhere with nowhere further to go. */
  deadEnd: (
    <>
      <path
        d="M12 21V9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4.5 9h15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7 5.5l2.5 3.5M17 5.5l-2.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
  /* A bell with nothing coming out of it. */
  silence: (
    <>
      <path
        d="M6.5 16.5V11a5.5 5.5 0 0111 0v5.5M4.5 16.5h15M10 20h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M4 4l16 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
};

export interface IconChipProps {
  /** A key of `ICONS`. An unknown name renders an empty chip, not a crash. */
  name: string;
  /** Tailwind sizing for the chip itself. Defaults to `.icon-chip`'s 44px. */
  className?: string;
}

/**
 * An icon in the page's chip.
 *
 * `.icon-chip` carries its own inset hairline, so the chip is legible on any
 * surface without a contextual rule — see the note on it in `globals.css`,
 * where a contextual fix made five other chips disappear.
 *
 * Always `aria-hidden`. Every icon on this page sits beside the words it
 * illustrates, so announcing it would only repeat them.
 */
export const IconChip = ({ name, className }: IconChipProps) => (
  <span className={`icon-chip ${className ?? ""}`} aria-hidden>
    {/* fill="none" is load bearing — see the note on ICONS above. */}
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      {ICONS[name]}
    </svg>
  </span>
);

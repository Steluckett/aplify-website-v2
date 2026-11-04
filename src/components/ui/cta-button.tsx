"use client";

import { useContactModal } from "@/hooks/use-contact-modal";

/**
 * The site's main action, with the MagicUI interactive-hover-button treatment
 * (Stephen's pick, 2026-08-28): a small circle sits BESIDE the label at rest,
 * grows on hover until it floods the button, and the label returns with an
 * arrow.
 *
 * BUILT TO THE COMPONENT'S CURRENT SOURCE, not the older snippet that was
 * first supplied — the two differ in the exact ways that decide whether it
 * feels refined:
 *
 *   - The dot grows by TRANSFORM ONLY (`scale-[100.8]` on an 8px circle,
 *     clipped by the pill). The first build animated left/top/width/height,
 *     which the browser cannot composite, and the jank read as cheap.
 *   - The dot is visible at rest, inline in a flex row before the label —
 *     the grow has an origin the eye already knows about.
 *   - The arriving label+arrow slides in from the right and settles DEAD
 *     CENTRE. The reference parks it at -translate-x-5 (20px left of
 *     centre), which on our button paddings read as crashing into the left
 *     edge — Stephen's call: "should always be perfectly centred".
 *
 * Timing is `--duration-hover` (500ms — see the token's note on why the
 * reference's nominal 300ms reads faster than it sounds), the house curve,
 * `motion-reduce` turns the travel off. CSS transitions are the
 * design system's hover-state carve-out from the spring rule.
 *
 * THE COLOURWAY IS DECIDED (Stephen, 2026-08-28, from three options on the
 * styleguide): rest is untouched `.btn-primary`; a white dot floods the
 * button white and the label returns in the deep blue ink with the arrow.
 * The end state is the rest state inverted. The dot IS the flood, so its
 * colour states the destination. Measured: ink-accent #0670a9 on white is
 * 5.42:1. (The rejected options: flooding to ink navy, and the reference's
 * own white-rest/violet-flood, which changed the rest state.)
 *
 * The arriving layer is `aria-hidden` and the dot is decorative: a screen
 * reader hears the label once.
 *
 * SINCE 2026-08-28 THIS IS A REAL `<button>`, NOT A LINK. Every instance
 * summons the full-screen book-a-demo experience through `useContactModal`
 * (mounted as `<BookDemoOverlay>` in the site view), and an action that
 * opens a dialog is a button per rule 10 — the old `href="#contact"` said
 * "this navigates", which it no longer does.
 */
export interface CtaButtonProps {
  label: string;
  /** `lg` is the hero's one action — `.btn-lg`, 20px. */
  size?: "base" | "lg";
  /** `light` is the cream pill for night grounds (`.btn-light`). */
  tone?: "dark" | "light";
  /** Overrides the default action (opening the book-a-demo dialog) — the
      dialog's own closing button wears this treatment too, and it must not
      reopen the thing it closes. */
  onClick?: () => void;
  className?: string;
}

const MOVE =
  "transition-all duration-[var(--duration-hover)] ease-entrance motion-reduce:transition-none";

const ArrowIcon = () => (
  /* The house arrow — job search's stroke (1.8, round caps), sized in em so
     it keeps its proportion on the hero's larger type. */
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-[1.2em] w-[1.2em]"
    aria-hidden
  >
    <path
      d="M5 12h13m-5.5-5.5L18.5 12 12.5 17.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CtaButton = ({
  label,
  size = "base",
  tone = "dark",
  onClick,
  className,
}: CtaButtonProps) => {
  const open = useContactModal((s) => s.open);
  return (
    <button
      type="button"
      onClick={onClick ?? open}
      className={`btn ${tone === "light" ? "btn-light" : "btn-primary"} group relative overflow-hidden ${
        size === "lg" ? "btn-lg" : ""
      } ${className ?? ""}`}
    >
      {/* Rest row: the dot, then the label. The label paints above the dot,
          so while the flood grows the leaving label crosses it, exactly as
          the reference does. */}
      <span className="relative flex items-center justify-center gap-2">
        <span
          aria-hidden
          className={`h-2 w-2 rounded-pill bg-[var(--cta-flood)] ${MOVE} group-hover:scale-[100.8]`}
        />
        <span
          className={`relative inline-block ${MOVE} group-hover:translate-x-12 group-hover:opacity-0`}
        >
          {label}
        </span>
      </span>

      {/* The arriving label and arrow, on the flood. */}
      <span
        aria-hidden
        className={`absolute inset-0 z-10 flex translate-x-12 items-center justify-center gap-2 opacity-0 text-[var(--cta-arrive)] ${MOVE} group-hover:translate-x-0 group-hover:opacity-100`}
      >
        {label}
        <ArrowIcon />
      </span>
    </button>
  );
};

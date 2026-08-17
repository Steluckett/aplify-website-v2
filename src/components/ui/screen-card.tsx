"use client";

import type { CSSProperties, ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";

export interface ScreenCardProps {
  /** Address-bar text. Says whose site this is running on. */
  url?: string;
  /** Aspect ratio of the screen area, e.g. "16 / 10". */
  ratio?: string;
  /** Live UI. Omit to render the designed placeholder instead. */
  children?: ReactNode;
  /** Placeholder caption — what will eventually sit here. */
  placeholder?: string;
  /** The card behind the frame. `wash` is the spectrum; the pastels are for
   *  points of difference in a grid; `none` drops the card entirely. */
  ground?: "wash" | "soft" | "sky" | "violet" | "mint" | "amber" | "none";
  className?: string;
}

const GROUND_CLASS: Record<NonNullable<ScreenCardProps["ground"]>, string> = {
  wash: "wash",
  soft: "wash-soft",
  sky: "pastel-sky",
  violet: "pastel-violet",
  mint: "pastel-mint",
  amber: "pastel-amber",
  none: "",
};

/**
 * A product screen, framed and set into a card.
 *
 * This is the page's most repeated composition and the reason nothing on it
 * reads as unconsidered: a screen never sits directly on the page. It sits in
 * a frame, and the frame sits inset inside a card whose ground says which idea
 * the shot belongs to. Two surfaces inside one card is the layering that reads
 * as quality — a wash on its own is decoration.
 *
 * The inset is 12px, from `.wash`'s own padding: the ground is a FRAME around
 * the screen, not a field of padding.
 */
export const ScreenCard = ({
  url,
  ratio = "16 / 10",
  children,
  placeholder = "Product shot",
  ground = "wash",
  className,
}: ScreenCardProps) => {
  const groundClass = GROUND_CLASS[ground];
  // The pastel grounds have no padding of their own — `.wash` supplies it.
  const needsPadding = ground !== "wash" && ground !== "none";

  return (
    <Reveal variant="rise" className={className}>
      <div
        className={`${groundClass} rounded-panel ${needsPadding ? "p-3" : ""}`}
      >
        <div className="frame">
          {url ? (
            <div className="frame-bar">
              <div className="frame-dots" aria-hidden>
                <span />
                <span />
                <span />
              </div>
              <p className="frame-url">{url}</p>
              {/* Balances the dots so the address pill sits truly centred. */}
              <div className="w-[33px] flex-none" aria-hidden />
            </div>
          ) : null}

          <div
            className="screen relative w-full overflow-hidden bg-white"
            style={{ aspectRatio: children ? undefined : ratio } as CSSProperties}
          >
            {children ?? (
              <div className="placeholder absolute inset-0">
                <span className="icon-chip" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M3 15l4.5-4a2 2 0 012.7 0L15 15m-1.5-1.5l2-1.8a2 2 0 012.7 0L21 14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <p className="text-ui-sm font-medium text-ink">{placeholder}</p>
                <p className="text-ui-xs text-ink-label">Image to follow</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

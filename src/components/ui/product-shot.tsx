"use client";

import Image from "next/image";
import type { ReactNode } from "react";

export type ProductShotFrame = "browser" | "phone";

export interface ProductShotProps {
  frame: ProductShotFrame;
  /** Finished mockup. Omit to render the art-directed placeholder instead. */
  src?: string;
  alt?: string;
  /** Fake address shown in the browser chrome — sells "this is your own site". */
  url?: string;
  /** Slot letter from the image brief (A–E), shown on the placeholder. */
  slot?: string;
  /** What the finished mockup should show, shown on the placeholder. */
  subject?: string;
  /** Live content rendered inside the frame instead of an image (the demos). */
  children?: ReactNode;
  /** Ambient light behind the frame. Off for shots already sitting on glow. */
  glow?: boolean;
  className?: string;
}

/**
 * A product screen, framed and lit.
 *
 * This is the load-bearing component of the art direction: the page is
 * near-black end to end, and the only bright things on it are these — which
 * is what stops a light demo UI reading as a flat white rectangle dropped
 * onto a dark page. Chrome plus a glow behind makes the same pixels read as a
 * lit screen instead.
 *
 * Three modes:
 * - `children` — a live demo rendered inside the frame (job search, dashboard).
 * - `src` — a finished mockup.
 * - neither — a labelled placeholder carrying the slot letter and subject, so
 *   the layout is correct now and the real asset drops in by adding `src`.
 */
export const ProductShot = ({
  frame,
  src,
  alt,
  url = "yourcompany.co.uk/careers",
  slot,
  subject,
  children,
  glow = true,
  className,
}: ProductShotProps) => {
  const isPhone = frame === "phone";

  return (
    <div className={`relative ${className ?? ""}`}>
      {glow ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-[12%] -inset-y-[14%] -z-10"
          style={{ background: "var(--glow-product)" }}
        />
      ) : null}

      <div
        className={`relative overflow-hidden border border-hairline-strong bg-surface
                    shadow-2xl shadow-black/60 ${
                      isPhone
                        ? "mx-auto w-full max-w-[19rem] rounded-[2.25rem] p-2"
                        : "rounded-card-lg"
                    }`}
      >
        {isPhone ? (
          // Phone: a slim bezel and a status notch. No carrier junk — the
          // point is the app, not the hardware.
          <>
            <span
              aria-hidden
              className="absolute top-[0.9rem] left-1/2 z-10 h-[0.3rem] w-[4.5rem]
                         -translate-x-1/2 rounded-pill bg-black/70"
            />
            <div className="screen overflow-hidden rounded-[1.75rem] bg-canvas text-ink">
              <ShotBody
                src={src}
                alt={alt}
                slot={slot}
                subject={subject}
                ratio="aspect-[9/19.5]"
              >
                {children}
              </ShotBody>
            </div>
          </>
        ) : (
          <>
            {/* Browser chrome. The address is part of the argument: it is the
                client's own domain, not an ATS subdomain. */}
            <div className="flex items-center gap-3 border-b border-hairline bg-surface-raised px-4 py-3">
              <span aria-hidden className="flex gap-1.5">
                {["#3f3f46", "#3f3f46", "#3f3f46"].map((c, i) => (
                  <span
                    key={i}
                    className="size-2.5 rounded-pill"
                    style={{ background: c }}
                  />
                ))}
              </span>
              <span
                aria-hidden
                className="flex-1 truncate rounded-pill bg-canvas px-3 py-1
                           text-center text-caption text-ink-soft"
              >
                {url}
              </span>
              <span aria-hidden className="w-10" />
            </div>
            <div className="screen bg-canvas text-ink">
              <ShotBody
                src={src}
                alt={alt}
                slot={slot}
                subject={subject}
                ratio="aspect-[16/10]"
              >
                {children}
              </ShotBody>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ShotBody = ({
  src,
  alt,
  slot,
  subject,
  ratio,
  children,
}: {
  src?: string;
  alt?: string;
  slot?: string;
  subject?: string;
  ratio: string;
  children?: ReactNode;
}) => {
  if (children) return <>{children}</>;

  if (src) {
    return (
      <div className={`relative w-full ${ratio}`}>
        <Image src={src} alt={alt ?? ""} fill className="object-cover" />
      </div>
    );
  }

  // Placeholder. Deliberately designed rather than a grey box: it reads as an
  // intentional reservation, and it carries the brief for the asset that
  // belongs here.
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-3 ${ratio}`}
      style={{
        backgroundImage:
          "linear-gradient(var(--paper-hairline) 1px, transparent 1px), linear-gradient(90deg, var(--paper-hairline) 1px, transparent 1px)",
        backgroundSize: "2rem 2rem",
      }}
    >
      {slot ? (
        <span className="grid size-10 place-items-center rounded-pill bg-paper-ink text-sm font-medium text-paper">
          {slot}
        </span>
      ) : null}
      {subject ? (
        <span className="max-w-[22ch] px-6 text-center text-caption leading-relaxed text-ink-soft">
          {subject}
        </span>
      ) : null}
    </div>
  );
};

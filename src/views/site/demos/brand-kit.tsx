"use client";

import { useMemo, useState, type CSSProperties } from "react";

import {
  BRAND_STOPS,
  brandKit,
  type BrandStop,
  type MarkKind,
} from "@/data/content/brand-kit";

/**
 * The brand kit — one slider, and the product restyling itself under it.
 *
 * WHAT IT IS ARGUING. §3 names employer brand consistency as a concern of the
 * primary buyer and the page never answered it. A screenshot cannot: "it can
 * look like your site" is exactly the claim a reader discounts until they move
 * something themselves. §11 — demonstrable, not described.
 *
 * ONE CONTROL. An earlier cut had four brand cards to pick between. Choosing
 * from a list is a menu; dragging a slider is a transformation, and the claim
 * is about transformation. It also lets the corner journey be the headline:
 * square at Northbank, fully rounded at Halden, monotonic all the way.
 *
 * HOW IT WORKS, AND WHY THAT MATTERS. Everything is CSS custom properties on
 * ONE wrapper. Nothing below reads a stop directly; everything reads
 * `var(--b-…)`. That is not a convenience, it is the claim: the plugin themes a
 * scope by swapping variables and leaves the markup alone.
 *
 * BE PRECISE ABOUT "LAYOUT DOES NOT MOVE". The ARRANGEMENT is fixed — same
 * elements, same order, same grid, same width at every slider position. Heights
 * are not, and should not be: type scale and spacing are themselves
 * configurable, so the card breathes as the type grows. A card that grows
 * because its type grew has not changed layout. Do not let this drift into
 * "nothing changes size"; the standfirst says structure, not pixels.
 *
 * THE FIDELITY TRICK. The page AROUND the block is schematic — a logo bar, a
 * heading, a line of copy. The Aplify block is fully drawn. Nobody is told
 * which part is ours, because on a real site you should not be able to tell,
 * and a label would contradict the claim.
 *
 * §6.5 — the employers are invented. See the note in `brand-kit.ts`.
 */

/* --- Oklab interpolation ---------------------------------------------------
   sRGB is the wrong space to cross a hue in: blue → terracotta through sRGB
   sags into a dead grey at the midpoint, and the midpoint is a resting
   position on a slider. Oklab keeps perceived lightness steady across the
   blend, which is what stops the middle of the journey looking like a mistake.
   Local rather than a shared util because nothing else needs it yet. */

const srgbToLinear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

const linearToSrgb = (c: number) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

const hexToOklab = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16);
  const r = srgbToLinear(((n >> 16) & 255) / 255);
  const g = srgbToLinear(((n >> 8) & 255) / 255);
  const b = srgbToLinear((n & 255) / 255);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
};

const oklabToRgb = ([L, A, B]: [number, number, number]) => {
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  const to255 = (v: number) =>
    Math.max(0, Math.min(255, Math.round(linearToSrgb(v) * 255)));
  return `rgb(${to255(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s)}, ${to255(
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
  )}, ${to255(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)})`;
};

const mixHex = (a: string, b: string, u: number) => {
  const x = hexToOklab(a);
  const y = hexToOklab(b);
  return oklabToRgb([
    x[0] + (y[0] - x[0]) * u,
    x[1] + (y[1] - x[1]) * u,
    x[2] + (y[2] - x[2]) * u,
  ]);
};

const lerp = (a: number, b: number, u: number) => a + (b - a) * u;

/** The two stops either side of `t`, and how far between them it sits. */
const segmentAt = (t: number) => {
  let k = 0;
  while (k < BRAND_STOPS.length - 2 && t > BRAND_STOPS[k + 1].at) k += 1;
  const from = BRAND_STOPS[k];
  const to = BRAND_STOPS[k + 1];
  const span = to.at - from.at;
  const u = span <= 0 ? 0 : Math.min(1, Math.max(0, (t - from.at) / span));
  return { from, to, u };
};

/* --- Marks -----------------------------------------------------------------
   A logo is a real configurable — it appears in the apply flow and the
   dashboard — so it has to change with everything else. All four are built
   from `currentColor` so they take the brand ink for free. */

const Mark = ({ kind }: { kind: MarkKind }) => {
  const common = { viewBox: "0 0 24 24", className: "h-full w-full" } as const;
  if (kind === "bars")
    return (
      <svg {...common} fill="currentColor" aria-hidden>
        <rect x="3" y="4" width="4.4" height="16" rx="0.6" />
        <rect x="9.8" y="4" width="4.4" height="10.5" rx="0.6" />
        <rect x="16.6" y="4" width="4.4" height="16" rx="0.6" />
      </svg>
    );
  if (kind === "leaf")
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M20 4C11 4 5 8.6 5 15a5 5 0 005 5c6.4 0 10-6 10-16z" />
        <path d="M16 8L7.5 19" strokeLinecap="round" />
      </svg>
    );
  if (kind === "arch")
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2.1" aria-hidden>
        <path d="M4 20V12a8 8 0 0116 0v8" strokeLinecap="round" />
        <path d="M10 20v-7.5h4V20" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg {...common} fill="currentColor" aria-hidden>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="3.4" fill="var(--b-accent-ink)" />
    </svg>
  );
};

/* --- The demo -------------------------------------------------------------- */

export interface BrandKitDemoProps {
  className?: string;
}

export const BrandKitDemo = ({ className }: BrandKitDemoProps) => {
  /** 0–1000 rather than 0–1: a range input steps in integers. */
  const [pos, setPos] = useState(0);
  const t = pos / 1000;

  const { from, to, u } = useMemo(() => segmentAt(t), [t]);

  /** Font and shadow cannot be blended, so they take the nearer stop. */
  const nearer: BrandStop = u < 0.5 ? from : to;
  const radius = lerp(from.radius, to.radius, u);

  const vars = {
    "--b-ground": mixHex(from.ground, to.ground, u),
    "--b-surface": mixHex(from.surface, to.surface, u),
    "--b-surface-muted": mixHex(from.surfaceMuted, to.surfaceMuted, u),
    "--b-ink": mixHex(from.ink, to.ink, u),
    "--b-ink-soft": mixHex(from.inkSoft, to.inkSoft, u),
    "--b-accent": mixHex(from.accent, to.accent, u),
    "--b-accent-ink": mixHex(from.accentInk, to.accentInk, u),
    "--b-font": nearer.font,
    "--b-shadow": nearer.shadow,
    "--b-scale": String(lerp(from.scale, to.scale, u)),
    "--b-tracking": `${lerp(from.tracking, to.tracking, u)}em`,
    "--b-gap": String(lerp(from.gap, to.gap, u)),
    /* Inner radii derive from the outer one and bottom out at zero — the
       product spec's rule that an outer radius exceeds its inner, written as
       arithmetic so the slider cannot break it. */
    "--b-r": `${radius}px`,
    "--b-r-in": `${Math.max(0, radius - 8)}px`,
    "--b-r-sm": `${Math.max(0, radius * 0.34)}px`,
  } as CSSProperties;

  return (
    <div className={className} style={vars}>
      {/* --- THE CONTROL. One slider, centred, and deliberately unlabelled
              beyond the two employers at its ends: naming what it changes
              would make a list of it, and the point is that it changes
              everything at once. --- */}
      <div className="mx-auto w-full max-w-[42rem]">
        {/* Styled with arbitrary variants rather than a class in globals.css,
            on purpose: a range input needs four vendor pseudo-elements and
            they would be four more rules in a file that every other section
            also reads. The filled portion is an inline gradient because it has
            to know `pos`, and the thumb takes the brand accent so the control
            itself travels with the thing it is changing. */}
        <input
          type="range"
          min={0}
          max={1000}
          step={1}
          value={pos}
          aria-label={brandKit.slider.label}
          aria-valuetext={nearer.name}
          onChange={(event) => setPos(Number(event.target.value))}
          style={{
            background: `linear-gradient(to right, var(--b-accent) ${t * 100}%, var(--color-track, #e2e6ee) ${t * 100}%)`,
          }}
          className="h-4 w-full cursor-grab appearance-none rounded-pill focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid focus-visible:ring-offset-4 active:cursor-grabbing [&::-moz-range-thumb]:h-11 [&::-moz-range-thumb]:w-11 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-pill [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[var(--b-accent)] [&::-moz-range-thumb]:shadow-lift [&::-webkit-slider-thumb]:h-11 [&::-webkit-slider-thumb]:w-11 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-pill [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[var(--b-accent)] [&::-webkit-slider-thumb]:shadow-lift"
        />
        <div className="mt-4 flex items-center justify-between gap-6">
          <span className="text-ui-sm text-ink-label">
            {brandKit.slider.from}
          </span>
          <span className="text-ui-sm text-ink-label">
            {brandKit.slider.to}
          </span>
        </div>

        {/* §6.7, and it has to live here rather than under the section: the
            example below bleeds out of the band, so anything after it would be
            dragged over it. */}
        <p className="mt-6 text-center text-fine leading-relaxed text-ink-label">
          {brandKit.disclosure}
        </p>
      </div>

      {/* --- THE EXAMPLE. Centred under the control, and it runs off the foot
              of the section — see `brand.tsx` for the bleed. --- */}
      <div
        className="mx-auto mt-14 w-full max-w-[62rem] overflow-hidden rounded-panel shadow-lift"
        style={{ borderRadius: "var(--b-r)" }}
      >
        <div
          className="flex h-full flex-col p-6 sm:p-10"
          style={{
            background: "var(--b-ground)",
            color: "var(--b-ink)",
            fontFamily: "var(--b-font)",
            letterSpacing: "var(--b-tracking)",
          }}
        >
          {/* The employer's own page furniture — schematic on purpose. */}
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              {/* Two marks stacked and cross-faded: a hard swap mid-drag reads
                  as a glitch, and the lockup is the one place the reader is
                  looking while they move the control. */}
              <span
                className="relative grid h-10 w-10 flex-none place-items-center p-2.5"
                style={{
                  background: "var(--b-accent)",
                  color: "var(--b-accent-ink)",
                  borderRadius: "var(--b-r-in)",
                }}
              >
                <span
                  className="absolute inset-0 grid place-items-center p-2.5"
                  style={{ opacity: 1 - u }}
                >
                  <Mark kind={from.mark} />
                </span>
                <span
                  className="absolute inset-0 grid place-items-center p-2.5"
                  style={{ opacity: u }}
                >
                  <Mark kind={to.mark} />
                </span>
              </span>
              <span
                className="relative block"
                style={{ fontSize: "calc(1rem * var(--b-scale))" }}
              >
                <span className="font-medium" style={{ opacity: 1 - u }}>
                  {from.name}
                </span>
                <span
                  className="absolute left-0 top-0 whitespace-nowrap font-medium"
                  style={{ opacity: u }}
                >
                  {to.name}
                </span>
              </span>
            </div>
            <nav className="hidden items-center gap-6 sm:flex">
              {brandKit.page.nav.map((item, index) => (
                <span
                  key={item}
                  style={{
                    color:
                      index === brandKit.page.nav.length - 1
                        ? "var(--b-accent)"
                        : "var(--b-ink-soft)",
                    fontSize: "calc(0.8125rem * var(--b-scale))",
                  }}
                >
                  {item}
                </span>
              ))}
            </nav>
          </div>

          <div style={{ marginTop: "calc(2.25rem * var(--b-gap))" }}>
            <h4
              className="font-medium leading-tight"
              style={{ fontSize: "calc(2.25rem * var(--b-scale))" }}
            >
              {brandKit.page.heading}
            </h4>
            <p
              className="mt-2"
              style={{
                color: "var(--b-ink-soft)",
                fontSize: "calc(0.875rem * var(--b-scale))",
              }}
            >
              {brandKit.page.meta}
            </p>
            <p
              className="mt-4 max-w-[36rem] leading-relaxed"
              style={{
                color: "var(--b-ink-soft)",
                fontSize: "calc(0.9375rem * var(--b-scale))",
              }}
            >
              {brandKit.page.intro}
            </p>
          </div>

          {/* --- THE APLIFY BLOCK. Fully drawn, deliberately unlabelled. --- */}
          <div
            className="flex flex-col"
            style={{
              marginTop: "calc(2rem * var(--b-gap))",
              background: "var(--b-surface)",
              borderRadius: "var(--b-r)",
              boxShadow: "var(--b-shadow)",
              padding: "calc(1.75rem * var(--b-gap))",
              gap: "calc(1.1rem * var(--b-gap))",
            }}
          >
            <p
              className="font-medium"
              style={{ fontSize: "calc(1.25rem * var(--b-scale))" }}
            >
              {brandKit.block.heading}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label={brandKit.block.nameLabel}
                placeholder={brandKit.block.namePlaceholder}
              />
              <Field
                label={brandKit.block.emailLabel}
                placeholder={brandKit.block.emailPlaceholder}
                type="email"
              />
            </div>

            {/* The CV row carries the muted fill, an inner radius and a
                secondary button in one object — the fastest way to see a brand
                land on more than a colour. */}
            <div>
              <span
                className="block"
                style={{
                  color: "var(--b-ink-soft)",
                  fontSize: "calc(0.75rem * var(--b-scale))",
                }}
              >
                {brandKit.block.cvLabel}
              </span>
              <div
                className="mt-1.5 flex flex-wrap items-center justify-between gap-3"
                style={{
                  background: "var(--b-surface-muted)",
                  borderRadius: "var(--b-r-in)",
                  padding: "calc(0.8rem * var(--b-gap))",
                }}
              >
                <span
                  style={{
                    color: "var(--b-ink-soft)",
                    fontSize: "calc(0.8125rem * var(--b-scale))",
                  }}
                >
                  {brandKit.block.cvHint}
                </span>
                <span
                  className="font-medium"
                  style={{
                    background: "var(--b-surface)",
                    color: "var(--b-ink)",
                    borderRadius: "var(--b-r-sm)",
                    padding: "0.5em 1.1em",
                    fontSize: "calc(0.8125rem * var(--b-scale))",
                    boxShadow: "var(--b-shadow)",
                  }}
                >
                  {brandKit.block.cvButton}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-0.5 grid h-4 w-4 flex-none place-items-center"
                style={{
                  background: "var(--b-accent)",
                  color: "var(--b-accent-ink)",
                  borderRadius: "var(--b-r-sm)",
                }}
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
                  <path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                className="leading-relaxed"
                style={{
                  color: "var(--b-ink-soft)",
                  fontSize: "calc(0.8125rem * var(--b-scale))",
                }}
              >
                {brandKit.block.consent.replace("{brand}", nearer.name)}
              </span>
            </div>

            <span
              className="self-start font-medium"
              style={{
                background: "var(--b-accent)",
                color: "var(--b-accent-ink)",
                borderRadius: "var(--b-r-in)",
                padding: "0.9em 1.8em",
                fontSize: "calc(0.9375rem * var(--b-scale))",
              }}
            >
              {brandKit.block.submit}
            </span>
          </div>

          {/* The employer's page footer, schematic like the header — and it
              earns its place twice. A careers page has one, so the example
              reads as a page rather than a card; and it gives the BLEED
              something expendable to cut through. Without it the crop landed
              across the submit button, which reads as an accident rather than
              a decision. */}
          <div
            className="flex flex-wrap items-center justify-between gap-4"
            style={{
              marginTop: "calc(2.25rem * var(--b-gap))",
              paddingTop: "calc(1.5rem * var(--b-gap))",
              borderTop: "1px solid var(--b-surface-muted)",
            }}
          >
            <div className="flex flex-wrap items-center gap-5">
              {brandKit.page.footer.map((item) => (
                <span
                  key={item}
                  style={{
                    color: "var(--b-ink-soft)",
                    fontSize: "calc(0.8125rem * var(--b-scale))",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
            <span
              style={{
                color: "var(--b-ink-soft)",
                fontSize: "calc(0.75rem * var(--b-scale))",
              }}
            >
              {brandKit.page.legal.replace("{brand}", nearer.name)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * One field. Inert by design — the whole block is a rendering, and §6.7's
 * "nothing is sent, stored or read" is easiest to honour by there being
 * nothing to submit.
 */
const Field = ({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) => (
  <label className="block">
    <span
      className="block"
      style={{
        color: "var(--b-ink-soft)",
        fontSize: "calc(0.75rem * var(--b-scale))",
      }}
    >
      {label}
    </span>
    <input
      type={type}
      placeholder={placeholder}
      readOnly
      tabIndex={-1}
      /* The placeholder needs saying out loud. Left alone the UA derives it
         from `color` at 50% alpha, which fails wherever the ink is near its
         ground — and no contrast sweep that walks text nodes will catch it,
         because a placeholder is not one. `opacity-100` is for Firefox, which
         dims it again on top. It cannot be inline: `::placeholder` is a
         pseudo-element. */
      className="mt-1.5 w-full border-0 outline-none [&::placeholder]:text-[var(--b-ink-soft)] [&::placeholder]:opacity-100"
      style={{
        background: "var(--b-surface-muted)",
        color: "var(--b-ink)",
        borderRadius: "var(--b-r-in)",
        padding: "calc(0.75rem * var(--b-gap)) 1rem",
        fontSize: "calc(0.875rem * var(--b-scale))",
        fontFamily: "var(--b-font)",
      }}
    />
  </label>
);

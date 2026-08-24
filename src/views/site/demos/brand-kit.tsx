"use client";

import { useState, type CSSProperties } from "react";

import {
  BRAND_PRESETS,
  brandKit,
  type BrandPreset,
} from "@/data/content/brand-kit";

/**
 * The brand kit — the one demo where the reader restyles the product.
 *
 * WHAT IT IS ARGUING. §3 names employer brand consistency as a concern of the
 * primary buyer, and the page never answered it. A screenshot cannot: "it can
 * look like your site" is exactly the sort of claim a reader discounts until
 * they move something themselves. So this follows §11 — demonstrable, not
 * described — and the demonstration is the section restyling itself.
 *
 * HOW IT WORKS, AND WHY THAT MATTERS. Every brand is a set of CSS custom
 * properties applied to ONE wrapper. Nothing below reads a preset directly;
 * everything reads `var(--b-…)`. That is not a convenience, it is the claim:
 * the plugin themes a scope by swapping variables, and the markup underneath
 * is untouched.
 *
 * BE PRECISE ABOUT "LAYOUT DOES NOT MOVE", because it is a claim and it is
 * only true in the sense that matters. The ARRANGEMENT is fixed: same elements,
 * same order, same grid, same widths — measured, the preview is 889px wide on
 * every preset. Heights are NOT identical, and should not be: type scale and
 * spacing are both configurable, so Halden's tighter scale renders 15px shorter
 * than Northbank's. A card that grows because its type grew has not changed
 * layout. Do not let this drift into "nothing changes size"; that would be
 * false, and the standfirst is worded to say structure, not pixels.
 *
 * THE FIDELITY TRICK. The page AROUND the block is deliberately schematic —
 * a logo bar, a heading, two grey bars for body copy. The Aplify block is
 * fully drawn. Nobody has to be told which part is ours; the difference in
 * detail says it. Labelling it would have undercut the whole point, which is
 * that on a real site you should not be able to tell.
 *
 * WHAT THE CONTROLS DO NOT SAY. Stephen's steer: give the impression of brand
 * control without itemising it. So there is no "Border radius: 14px" readout
 * and no checklist of what a preset touches. Presets change colour, type,
 * type scale, corners, shadow, spacing and logo at once, and the only exposed
 * dial is the one that is fun to move.
 *
 * §6.5 — the four employers are invented. See the note in `brand-kit.ts`.
 */

/* --- Marks -----------------------------------------------------------------
   One per brand, drawn rather than imported: a logo is a configurable in the
   real plugin (apply flow AND dashboard), so it has to change with the rest.
   All four are built from `currentColor` so they take the brand ink for free. */

const Mark = ({ kind }: { kind: BrandPreset["mark"] }) => {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-full w-full",
    "aria-hidden": true as const,
  };
  if (kind === "bars")
    return (
      <svg {...common} fill="currentColor">
        <rect x="3" y="4" width="4.4" height="16" rx="0.6" />
        <rect x="9.8" y="4" width="4.4" height="10.5" rx="0.6" />
        <rect x="16.6" y="4" width="4.4" height="16" rx="0.6" />
      </svg>
    );
  if (kind === "leaf")
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 4C11 4 5 8.6 5 15a5 5 0 005 5c6.4 0 10-6 10-16z" />
        <path d="M16 8L7.5 19" strokeLinecap="round" />
      </svg>
    );
  if (kind === "arch")
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2.1">
        <path d="M4 20V12a8 8 0 0116 0v8" strokeLinecap="square" />
        <path d="M10 20v-7.5h4V20" strokeLinecap="square" />
      </svg>
    );
  return (
    <svg {...common} fill="currentColor">
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="3.4" fill="var(--b-surface)" />
    </svg>
  );
};

/* --- The demo -------------------------------------------------------------- */

export interface BrandKitDemoProps {
  className?: string;
}

export const BrandKitDemo = ({ className }: BrandKitDemoProps) => {
  const [brand, setBrand] = useState<BrandPreset>(BRAND_PRESETS[0]);
  const [radius, setRadius] = useState<number>(
    Number(BRAND_PRESETS[0].vars.radius),
  );

  const choose = (next: BrandPreset) => {
    setBrand(next);
    /* The slider follows the preset rather than persisting across it — a
       corner setting carried over from another brand is not that brand. */
    setRadius(Number(next.vars.radius));
  };

  /* Inner radii derive from the outer one, never exceed it, and bottom out at
     zero rather than going negative — the product spec's rule that an outer
     radius always exceeds its inner, expressed as arithmetic so the slider
     cannot break it. */
  const vars = {
    "--b-ground": brand.vars.ground,
    "--b-surface": brand.vars.surface,
    "--b-surface-muted": brand.vars.surfaceMuted,
    "--b-ink": brand.vars.ink,
    "--b-ink-soft": brand.vars.inkSoft,
    "--b-accent": brand.vars.accent,
    "--b-accent-ink": brand.vars.accentInk,
    "--b-line": brand.vars.line,
    "--b-font": brand.vars.font,
    "--b-scale": brand.vars.scale,
    "--b-tracking": brand.vars.tracking,
    "--b-shadow": brand.vars.shadow,
    "--b-gap": brand.vars.gap,
    "--b-r": `${radius}px`,
    "--b-r-in": `${Math.max(0, radius - 4)}px`,
    "--b-r-sm": `${Math.max(0, Math.round(radius * 0.4))}px`,
  } as CSSProperties;

  return (
    <div className={className}>
      <div className="grid gap-8 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-10">
        {/* --- CONTROLS. Ours, not the brand's — they are the page's
                furniture, so they keep the page's design system and stay put
                while everything to their right changes. --- */}
        <div className="flex flex-col gap-4">
          <p className="text-ui-lg font-medium tracking-tight text-ink-heading">
            {brandKit.invitation}
          </p>

          <div
            role="radiogroup"
            aria-label="Sample brand"
            className="flex flex-col gap-2.5"
          >
            {BRAND_PRESETS.map((preset) => {
              const on = preset.id === brand.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => choose(preset)}
                  className={`flex items-center gap-4 rounded-card p-3 text-left transition-shadow duration-[var(--duration-fast)] ease-entrance focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid ${
                    on
                      ? "bg-surface-raised shadow-tile ring-2 ring-accent"
                      : "bg-surface-raised shadow-sm hover:shadow-tile"
                  }`}
                >
                  {/* The mark, on the brand's own ground — a swatch you can
                      read as a logo rather than a colour chip. */}
                  <span
                    className="grid h-11 w-11 flex-none place-items-center rounded-sm p-2.5"
                    style={{
                      background: preset.vars.ground,
                      color: preset.vars.accent,
                      borderRadius: `${Math.min(Number(preset.vars.radius), 14)}px`,
                      ["--b-surface" as string]: preset.vars.ground,
                    }}
                  >
                    <Mark kind={preset.mark} />
                  </span>
                  <span className="min-w-0">
                    <span
                      className="block truncate text-ui-base font-medium text-ink"
                      style={{ fontFamily: preset.vars.font }}
                    >
                      {preset.name}
                    </span>
                    <span className="mt-0.5 block truncate text-ui-xs text-ink-label">
                      {preset.note}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* The one exposed dial. No numeric readout, on purpose. */}
          <div className="mt-2 rounded-card bg-surface-raised p-4 shadow-sm">
            <label
              htmlFor="brand-radius"
              className="flex items-baseline justify-between gap-3"
            >
              <span className="text-ui-sm font-medium text-ink">
                {brandKit.radiusLabel}
              </span>
              <span className="text-ui-xs text-ink-label">
                {brandKit.radiusHint}
              </span>
            </label>
            <input
              id="brand-radius"
              type="range"
              min={0}
              max={28}
              step={1}
              value={radius}
              onChange={(event) => setRadius(Number(event.target.value))}
              style={{ accentColor: brand.vars.accent }}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-pill bg-track focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-pill [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[var(--b-accent)] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-pill [&::-webkit-slider-thumb]:bg-[var(--b-accent)] [&::-webkit-slider-thumb]:shadow-sm"
            />
          </div>

          <p className="text-ui-xs leading-relaxed text-ink-label">
            {brandKit.disclosure}
          </p>
        </div>

        {/* --- THE PREVIEW. Everything past this point reads var(--b-*) and
                nothing reads the preset, which is what makes the layout
                immovable by construction. --- */}
        <div
          style={vars}
          className="overflow-hidden rounded-panel shadow-lift transition-[background-color,color] duration-[var(--duration-slow)] ease-entrance"
        >
          <div
            className="flex h-full flex-col p-5 sm:p-8"
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
                <span
                  className="grid h-9 w-9 flex-none place-items-center p-2"
                  style={{
                    background: "var(--b-accent)",
                    color: "var(--b-accent-ink)",
                    borderRadius: "var(--b-r-in)",
                  }}
                >
                  <Mark kind={brand.mark} />
                </span>
                <span
                  className="font-medium"
                  style={{ fontSize: "calc(1rem * var(--b-scale))" }}
                >
                  {brand.name}
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

            <div
              className="mt-8"
              style={{ marginTop: "calc(2rem * var(--b-gap))" }}
            >
              <h4
                className="font-medium leading-tight"
                style={{ fontSize: "calc(2rem * var(--b-scale))" }}
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
                className="mt-4 max-w-[34rem] leading-relaxed"
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
              className="mt-7 flex flex-col"
              style={{
                marginTop: "calc(1.75rem * var(--b-gap))",
                background: "var(--b-surface)",
                borderRadius: "var(--b-r)",
                boxShadow: "var(--b-shadow)",
                padding: "calc(1.5rem * var(--b-gap))",
                gap: "calc(1rem * var(--b-gap))",
              }}
            >
              <p
                className="font-medium"
                style={{ fontSize: "calc(1.125rem * var(--b-scale))" }}
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

              {/* The CV row carries the muted fill, the inner radius and the
                  secondary button in one object — the fastest way to see a
                  brand land on more than a colour. */}
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
                    padding: "calc(0.75rem * var(--b-gap))",
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
                      padding: "0.5em 1em",
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
                  {brandKit.block.consent.replace("{brand}", brand.name)}
                </span>
              </div>

              <span
                className="self-start font-medium"
                style={{
                  background: "var(--b-accent)",
                  color: "var(--b-accent-ink)",
                  borderRadius: "var(--b-r-in)",
                  padding: "0.85em 1.6em",
                  fontSize: "calc(0.9375rem * var(--b-scale))",
                }}
              >
                {brandKit.block.submit}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * One field. Inert by design — the whole block is a rendering, and §6.7's
 * "nothing is sent, stored or read" is easiest to honour by there being
 * nothing to submit. The disclosure beside the controls says so.
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
      /* The placeholder needs saying out loud. Left alone, the UA derives it
         from `color` at 50% alpha, which measured 3.06–4.25:1 across the four
         presets — every one of them a fail, and invisible to any audit that
         only walks text nodes. `opacity-100` is for Firefox, which dims it
         again on top. It cannot be an inline style: `::placeholder` is a
         pseudo-element. */
      className="mt-1.5 w-full border-0 outline-none [&::placeholder]:text-[var(--b-ink-soft)] [&::placeholder]:opacity-100"
      style={{
        background: "var(--b-surface-muted)",
        color: "var(--b-ink)",
        borderRadius: "var(--b-r-in)",
        padding: "calc(0.7rem * var(--b-gap)) 0.9rem",
        fontSize: "calc(0.875rem * var(--b-scale))",
        fontFamily: "var(--b-font)",
      }}
    />
  </label>
);

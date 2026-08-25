"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";

import { BRAND_STOPS, brandKit, type BrandStop } from "@/data/content/brand-kit";

/**
 * The brand kit — a bento, with a phone doing the arguing.
 *
 * WHAT IT IS ARGUING. §3 names employer brand consistency as a concern of the
 * primary buyer and the page never answered it. A screenshot cannot: "it can
 * look like your site" is exactly the claim a reader discounts until they move
 * something themselves. §11 — demonstrable, not described.
 *
 * TWO COLOURS PER BRAND, because one is not how brands work. `main` is the
 * loud one — the search button and the location pin. `highlight` is its
 * complement and carries the job title. Each pill takes a TINT of one of them
 * (92% toward white) with that same colour at full strength for its wording, so
 * the pair appears four times across the screen and reads as a kit rather than
 * a stripe.
 *
 * 92%, measured: at 88% the worst pill ink came out at 4.65:1 and at 11px that
 * is too close to the line. 92% puts the worst of the eight at 4.92:1.
 *
 * WHAT THE SLIDER TOUCHES, and deliberately nothing else: those two colours
 * wherever they land, every corner radius, and the typeface. The grey screen,
 * the body greys, the salary, the View button and every piece of running text
 * all HOLD STILL.
 *
 * That restraint is doing the work. A demo where everything changes proves
 * nothing, because a reader cannot separate what is themeable from what is
 * merely different. Freezing the greys is what makes the themed parts legible
 * as a SET — you can see the boundary of the brand kit because you can see
 * where it stops.
 *
 * HOW IT WORKS. Every themed value is a CSS custom property on one wrapper.
 * Nothing below reads a stop directly; everything reads `var(--b-…)`. That is
 * the claim rather than a convenience: the plugin themes a scope by swapping
 * variables and leaves the markup alone.
 *
 * ONE RADIUS DRIVES EVERY CORNER. CSS clamps a border-radius to half the box,
 * so a single 0→34px value is a square field and a square card at one end, and
 * a true pill on a 48px field and a 34px corner on a tall card at the other,
 * with no per-element maths. Do not "fix" this by giving each element its own
 * radius — the shared value is why the whole screen rounds as one gesture.
 *
 * THE PHONE IS CROPPED ON PURPOSE. Its bottom two thirds run out of the card,
 * which is what makes the second job card read as "there is more of this" and
 * stops the mockup looking like a small complete thing floating in a big box.
 *
 * §6.5 — the four employers are invented and now appear ONLY in
 * `aria-valuetext`. Nothing on screen names them.
 */

/* --- Oklab interpolation ---------------------------------------------------
   sRGB is the wrong space to cross a hue in: blue → terracotta through sRGB
   sags into a dead grey at the midpoint, and on a slider the midpoint is a
   resting position somebody will look at. Oklab holds perceived lightness
   across the blend. Local rather than shared because nothing else needs it. */

const srgbToLinear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

const linearToSrgb = (c: number) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

/**
 * Accepts `#rrggbb` OR `rgb(r, g, b)`, and that is not politeness — it is a
 * bug fix. `mix()` RETURNS an `rgb()` string, so any derived colour fed back in
 * (the pill tints are mixes of an already-mixed brand colour) arrived in a form
 * the old hex-only parser could not read. It did not throw: `parseInt` gave
 * `NaN`, and `NaN >> 16` coerces to 0, so every tint was silently computed from
 * BLACK. Both pills came out the same dead grey at every slider position and
 * nothing anywhere reported an error.
 */
const parseColour = (c: string): [number, number, number] => {
  if (c.startsWith("#")) {
    const n = parseInt(c.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const m = c.match(/-?\d+(\.\d+)?/g);
  if (!m || m.length < 3) throw new Error(`brand-kit: unparseable colour ${c}`);
  return [Number(m[0]), Number(m[1]), Number(m[2])];
};

const toOklab = (input: string): [number, number, number] => {
  const [R, G, B] = parseColour(input);
  const r = srgbToLinear(R / 255);
  const g = srgbToLinear(G / 255);
  const b = srgbToLinear(B / 255);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
};

const fromOklab = ([L, A, B]: [number, number, number]) => {
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  const c = (v: number) =>
    Math.max(0, Math.min(255, Math.round(linearToSrgb(v) * 255)));
  return `rgb(${c(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s)}, ${c(
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
  )}, ${c(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)})`;
};

const mix = (a: string, b: string, u: number) => {
  const x = toOklab(a);
  const y = toOklab(b);
  return fromOklab([
    x[0] + (y[0] - x[0]) * u,
    x[1] + (y[1] - x[1]) * u,
    x[2] + (y[2] - x[2]) * u,
  ]);
};

/** `rgb(r g b / a)` from any colour `parseColour` understands. */
const withAlpha = (colour: string, a: number) => {
  const [r, g, b] = parseColour(colour);
  return `rgb(${r} ${g} ${b} / ${a})`;
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

/* --- Fixed screen values --------------------------------------------------
   These are the phone's own furniture and they do NOT theme. Named here so it
   is obvious at a glance which half of the screen is frozen. The search panel
   is a step darker than the screen behind it: on the reference both were near
   white, so the white fields had nothing to lift off and the radius change was
   invisible on them. */
const SCREEN = "#eef0f4";
const PANEL = "#e2e6ee";
const CARD = "#ffffff";
const INK = "#101318";
const INK_SOFT = "#656b72";
/** The View button stays neutral — it is a secondary action, and leaving it
    grey is what lets the two brand colours read as deliberate rather than as
    "everything is coloured now". */
const NEUTRAL_PILL = "#eef0f5";

/* --- The demo -------------------------------------------------------------- */

export interface BrandKitDemoProps {
  className?: string;
}

export const BrandKitDemo = ({ className }: BrandKitDemoProps) => {
  /** 0–1000 rather than 0–1: a range input steps in integers. */
  const [pos, setPos] = useState(0);
  const t = pos / 1000;
  const { from, to, u } = useMemo(() => segmentAt(t), [t]);

  /** A typeface cannot be blended, so it snaps at the halfway point. */
  const nearer: BrandStop = u < 0.5 ? from : to;
  const main = mix(from.main, to.main, u);
  const highlight = mix(from.highlight, to.highlight, u);
  const radius = lerp(from.radius, to.radius, u);

  /* THE SECTION GROUND IS THEMED TOO, and this is the part that makes the
     point land: it says the page a candidate arrives on is yours as well, not
     just the widget sitting on it. It is abstract enough to carry that without
     pretending to be anyone's actual page.

     Built from the brand's own two colours rather than picked from the numbered
     grounds, for one practical reason: a slider needs to INTERPOLATE. Four
     fixed backgrounds would have to cross-fade as two stacked layers, and every
     resting position between stops would be a blend of two unrelated gradients.
     Derived, it moves continuously and every position is coherent by
     construction. The recipe is `.bg-07`'s — three radial blobs over a deep
     base — so it belongs to the same family as the page's other grounds. */
  const ground = [
    `radial-gradient(66% 62% at 6% 4%, ${withAlpha(main, 0.62)}, transparent 62%)`,
    `radial-gradient(58% 58% at 96% 12%, ${withAlpha(highlight, 0.55)}, transparent 62%)`,
    `radial-gradient(64% 60% at 48% 104%, ${withAlpha(mix(main, highlight, 0.5), 0.45)}, transparent 62%)`,
    mix(main, "#0a0f1c", 0.52),
  ].join(", ");

  const vars = {
    "--b-main": main,
    "--b-highlight": highlight,
    "--b-main-ink": mix(from.mainInk, to.mainInk, u),
    /* Both tints are DERIVED, not authored: each colour taken 92% of the way to
       white in Oklab. Authoring a tint per stop invites one that drifts off its
       own colour, and deriving it means a new stop cannot get it wrong. */
    "--b-tint-main": mix(main, "#ffffff", 0.92),
    "--b-tint-highlight": mix(highlight, "#ffffff", 0.92),
    "--b-font": nearer.font,
    "--b-r": `${radius}px`,
  } as CSSProperties;

  return (
    <div className={className}>
      {/* SLIMMED 2026-08-25. This was a two-column bento: the phone on the
          left, three cards down the right asserting the apply flow, the
          dashboard and mobile-first.

          The cards went because they were CLAIMS standing next to a
          DEMONSTRATION, which undercuts the demonstration — the whole reason
          this band exists (§11) is that the reader uses the product rather
          than reading about it. The apply flow and the dashboard are named in
          the standfirst instead, and "built for the phone first" is better
          proved by the demo simply BEING a phone than by a card saying so.

          THE CARDS WERE ALSO STRUCTURAL, which is the part to be careful
          about. The phone is `lg:absolute`, so it contributes no height at
          all, and the column's height used to come from those three cards —
          the brand card's bottom edge is what crops the phone. Delete them
          naively and the card collapses to its own padding and the crop
          disappears with it.

          The height now comes from an ASPECT RATIO, which is what ADR-0027
          requires for anything sized against fixed artwork: a ratio cannot
          drift, because both sides scale from the same width. Do NOT replace
          this with a rem or px height. */}
      <div className="mx-auto max-w-[64rem]">
        <div
          style={{ ...vars, background: ground }}
          className="grain relative overflow-hidden rounded-panel border border-white/15 px-6 pt-6 sm:px-10 sm:pt-12 lg:aspect-[16/10]"
        >
          {/* The device. Same translucent white edge as the card holding it,
              so the two read as one object rather than a picture in a box.

              `lg:absolute` is load bearing and is not a positioning
              preference: in flow the row grows to fit the phone, the card ends
              up taller than its contents, and nothing is ever cropped. Out of
              flow, the card keeps the height its ratio gives it and
              `overflow-hidden` cuts whatever the phone does not fit into.

              Four job tiles exist for the same reason — with three, the list
              ended just above the cut and read as STOPPING rather than running
              on past the edge.

              Below `lg` it stays IN flow: absolute would collapse the card to
              nothing, and there only the first tile renders anyway, so the
              phone is short by design. A tall mockup on a phone is a scroll
              tax.

              `overflow-hidden` on the phone is not decoration either. The last
              job tile's 12px bottom margin was collapsing out through this
              element and landing on the card, which is why the card once sat
              13px lower than the phone on mobile and looked like a stray gap.
              A block formatting context keeps it where it belongs. */}
          <div className="mx-auto w-full max-w-[30rem] overflow-hidden rounded-t-[3rem] border border-b-0 border-white/25 bg-white/10 p-3.5 pb-0 backdrop-blur-sm lg:absolute lg:left-1/2 lg:top-14 lg:-translate-x-1/2">
            <div
              className="rounded-t-[2.25rem] px-4 pt-4 sm:pt-5"
              style={{ background: SCREEN, fontFamily: "var(--b-font)" }}
            >
              <SearchPanel />
              <CountRow />
              {brandKit.phone.jobs.map((job, index) => (
                <JobCard key={job.title} job={job} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* THE CONTROL, bare. It used to sit inside a white card under a
            heading and a paragraph; with the cards gone there is nothing left
            to explain it, and nothing needs to be — a slider under a phone
            that changes as you drag it is self-describing.

            Still NO VISIBLE LABEL (Stephen, 2026-08-24). `aria-label` and
            `aria-valuetext` stay: they are the only route a screen reader has
            to this control and they cost the design nothing.

            Styled with arbitrary variants rather than a class in globals,
            because a range input needs four vendor pseudo-elements and those
            would be four more rules in a file every other section also reads.
            The filled portion is an inline gradient because it has to know
            `pos`, and the thumb takes the brand's own accent, so the control
            travels with the thing it changes. */}
        <input
          type="range"
          min={0}
          max={1000}
          step={1}
          value={pos}
          aria-label={brandKit.sliderLabel}
          aria-valuetext={nearer.name}
          onChange={(event) => setPos(Number(event.target.value))}
          style={{
            ...vars,
            background: `linear-gradient(to right, var(--b-main) ${t * 100}%, var(--color-track, #e2e6ee) ${t * 100}%)`,
          }}
          className="mx-auto mt-12 block h-3.5 w-full max-w-[34rem] cursor-grab appearance-none rounded-pill focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid focus-visible:ring-offset-4 active:cursor-grabbing [&::-moz-range-thumb]:h-9 [&::-moz-range-thumb]:w-9 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-pill [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[var(--b-main)] [&::-moz-range-thumb]:shadow-lift [&::-webkit-slider-thumb]:h-9 [&::-webkit-slider-thumb]:w-9 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-pill [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[var(--b-main)] [&::-webkit-slider-thumb]:shadow-lift"
        />
      </div>
    </div>
  );
};

/* --- Phone internals -------------------------------------------------------
   Every themed value here is `var(--b-…)`; every frozen one is a constant from
   the block above. Nothing in between. */

const SearchPanel = () => (
  <div
    className="p-3"
    style={{ background: PANEL, borderRadius: "var(--b-r)" }}
  >
    <div
      className="flex h-12 items-center px-5 text-ui-base"
      style={{ background: CARD, color: INK_SOFT, borderRadius: "var(--b-r)" }}
    >
      {brandKit.phone.keywordPlaceholder}
    </div>
    <div
      className="mt-2.5 flex h-12 items-center gap-2.5 px-5 text-ui-base"
      style={{ background: CARD, color: INK, borderRadius: "var(--b-r)" }}
    >
      {/* The pin takes the accent. It is the only glyph on the screen carrying
          brand colour on the reference, and leaving it blue while the rest of
          the screen turned terracotta read as a bug rather than a constant. */}
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 flex-none"
        fill="none"
        style={{ color: "var(--b-main)" }}
        aria-hidden
      >
        <path
          d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      </svg>
      {brandKit.phone.location}
    </div>
    <div
      className="mt-2.5 flex h-12 items-center justify-center text-ui-base font-medium"
      style={{
        /* Solid, not the reference's gradient: that gradient was Aplify's own
           brand. A client sets ONE primary, and a flat fill also shows the
           corner change more plainly than a gradient does. */
        background: "var(--b-main)",
        color: "var(--b-main-ink)",
        borderRadius: "var(--b-r)",
      }}
    >
      {brandKit.phone.search}
    </div>
  </div>
);

const CountRow = () => (
  <div className="flex items-end justify-between px-1 py-4">
    <span className="text-ui-base" style={{ color: INK_SOFT }}>
      {brandKit.phone.sortedBy}
    </span>
    <span className="flex items-baseline gap-1">
      {/* Weight 200 at size, per the product spec: a big number in semibold
          reads as a heading, at 200 it reads as a quantity. */}
      <span
        className="text-[2rem] leading-none font-extralight"
        style={{ color: INK }}
      >
        {brandKit.phone.count}
      </span>
      <span className="text-ui-sm" style={{ color: INK_SOFT }}>
        {brandKit.phone.countUnit}
      </span>
    </span>
  </div>
);

const JobCard = ({
  job,
  index,
}: {
  job: (typeof brandKit.phone.jobs)[number];
  index: number;
}) => (
  <div
    /* Everything past the first tile is hidden below `sm`. The point of the
       mockup on a phone is that you can see the control and the thing it
       controls at once; three tiles pushes the slider off the screen. */
    className={`mb-3 p-4 ${index > 0 ? "hidden sm:block" : ""}`}
    style={{ background: CARD, borderRadius: "var(--b-r)" }}
  >
    <p
      className="text-ui-lg font-medium tracking-tight"
      style={{ color: "var(--b-highlight)" }}
    >
      {job.title}
    </p>
    <p className="mt-1 text-ui-sm" style={{ color: INK_SOFT }}>
      {job.place} · {job.distance}
    </p>
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span
        className="px-3 py-1.5 text-ui-2xs font-medium"
        style={{
          background: "var(--b-tint-main)",
          color: "var(--b-main)",
          borderRadius: "var(--b-r)",
        }}
      >
        {job.category}
      </span>
      <span
        className="px-3 py-1.5 text-ui-2xs font-medium"
        style={{
          background: "var(--b-tint-highlight)",
          color: "var(--b-highlight)",
          borderRadius: "var(--b-r)",
        }}
      >
        {job.contract}
      </span>
    </div>
    <div className="mt-4 flex items-center justify-between">
      <span className="text-ui-lg" style={{ color: INK }}>
        {job.salary}
      </span>
      <span
        className="px-5 py-2 text-ui-sm font-medium"
        style={{
          background: NEUTRAL_PILL,
          color: INK,
          borderRadius: "var(--b-r)",
        }}
      >
        {brandKit.phone.view}
      </span>
    </div>
  </div>
);

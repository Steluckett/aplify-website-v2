/**
 * Brand kit demo — the sample brands, and the copy around them.
 *
 * WHY THIS IS CONTENT AND NOT A DESIGN TOKEN. Every value below is a made-up
 * client's brand, not this site's design language, so it lives here rather than
 * in `globals.css` (AGENTS rule 4: tokens for styles, props for content). They
 * reach the DOM as inline custom properties on one wrapper, which is also how
 * the real plugin works — one scope, many variables, no layout involvement.
 *
 * §6.5 — ALL FOUR ORGANISATIONS ARE INVENTED. None is a client, none is real,
 * and none may ever be swapped for a real name: §5's inventory allows exactly
 * one logo on this site (Brandon Trust, beside the one statistic) and nothing
 * here is that. Northbank is reused deliberately — it is already the invented
 * employer in the step-03 registration artwork, so the page keeps one world.
 *
 * The four are chosen to span the range rather than to be pretty together:
 * a square institutional light, a warm rounded light, a serif, and a dark.
 * If a preset is ever edited, re-measure it — `Contrast` in the demo covers
 * ink-on-ground, ink-on-surface, soft-on-surface and accent-ink-on-accent.
 */

export interface BrandVars {
  /** The page behind everything. */
  ground: string;
  /** The card the content sits on. */
  surface: string;
  /** A quieter fill inside the card — fields, inert bars. */
  surfaceMuted: string;
  ink: string;
  inkSoft: string;
  accent: string;
  /** Text that sits ON the accent. */
  accentInk: string;
  line: string;
  font: string;
  /** Multiplier on the block's type scale. Font size is configurable too. */
  scale: string;
  tracking: string;
  /** Card radius in px. The slider overrides this; inner radii derive from it. */
  radius: string;
  shadow: string;
  /** Multiplier on internal spacing. */
  gap: string;
}

export interface BrandPreset {
  id: string;
  name: string;
  /** Sits under the name on the control. Character, not explanation. */
  note: string;
  /** Which mark to draw. Handled in the component. */
  mark: "bars" | "leaf" | "arch" | "dot";
  /** Shown as a row of dots on the control. */
  swatches: string[];
  vars: BrandVars;
}

export const BRAND_PRESETS: BrandPreset[] = [
  {
    id: "northbank",
    name: "Northbank Health",
    note: "Square, institutional, quiet",
    mark: "bars",
    swatches: ["#005eb8", "#10243a", "#eef3f8"],
    vars: {
      ground: "#eef3f8",
      surface: "#ffffff",
      surfaceMuted: "#e7eef6",
      ink: "#10243a",
      inkSoft: "#4a5b6e",
      accent: "#005eb8",
      accentInk: "#ffffff",
      line: "#d5e1ed",
      font: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
      scale: "1",
      tracking: "-0.006em",
      radius: "6",
      shadow: "0 1px 2px rgb(16 36 58 / 0.06), 0 8px 24px rgb(16 36 58 / 0.07)",
      gap: "1",
    },
  },
  {
    id: "meridian",
    name: "Meridian Care",
    note: "Warm, rounded, human",
    mark: "dot",
    swatches: ["#b4551f", "#3a2418", "#fdf6f0"],
    vars: {
      ground: "#fdf6f0",
      surface: "#ffffff",
      surfaceMuted: "#f7ece2",
      ink: "#3a2418",
      inkSoft: "#7a6151",
      accent: "#b4551f",
      accentInk: "#ffffff",
      line: "#eeddce",
      font: 'ui-rounded, "SF Pro Rounded", "Hiragino Maru Gothic ProN", system-ui, sans-serif',
      scale: "1.04",
      tracking: "-0.004em",
      radius: "22",
      shadow: "0 2px 4px rgb(58 36 24 / 0.05), 0 14px 34px rgb(58 36 24 / 0.09)",
      gap: "1.08",
    },
  },
  {
    id: "ashgrove",
    name: "Ashgrove Trust",
    note: "Serif, plain, unhurried",
    mark: "leaf",
    swatches: ["#2f6b45", "#14261a", "#f2f6f1"],
    vars: {
      ground: "#f2f6f1",
      surface: "#ffffff",
      surfaceMuted: "#e9f0e8",
      ink: "#14261a",
      inkSoft: "#4c5f52",
      accent: "#2f6b45",
      accentInk: "#ffffff",
      line: "#d8e4d7",
      font: 'ui-serif, Georgia, "Times New Roman", serif',
      scale: "1.02",
      tracking: "0",
      radius: "3",
      shadow: "0 1px 1px rgb(20 38 26 / 0.05), 0 6px 16px rgb(20 38 26 / 0.06)",
      gap: "1",
    },
  },
  {
    id: "halden",
    name: "Halden Group",
    note: "Dark, tight, modern",
    mark: "arch",
    swatches: ["#7ee787", "#f0f3f6", "#141a21"],
    vars: {
      ground: "#141a21",
      surface: "#1c242e",
      surfaceMuted: "#252f3b",
      ink: "#f0f3f6",
      inkSoft: "#b3bfcd",
      accent: "#7ee787",
      accentInk: "#0b1210",
      line: "#2f3a47",
      font: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      scale: "0.98",
      tracking: "-0.012em",
      radius: "2",
      shadow: "0 1px 2px rgb(0 0 0 / 0.4), 0 16px 40px rgb(0 0 0 / 0.45)",
      gap: "0.96",
    },
  },
];

export const brandKit = {
  eyebrow: "Your brand, not ours",
  lines: ["Part of your page,", "not stuck on it"],
  linesSm: ["Part of", "your page,", "not stuck on it"],
  /**
   * §6.2 — "career site or campaign landing page", never the first alone.
   * The configurable list is Stephen's, confirmed 2026-08-24, and is wider
   * than V2_HANDOVER §1 currently records (that says only "colours, imagery
   * and fonts"). If the handover is ever the arbiter again, widen it there
   * before widening it here.
   */
  standfirst:
    "Search, apply and event registration render inside your own career site or campaign landing page, wearing your colours, type, corners, shadows, spacing and logo. Only the layout stays fixed — which is what keeps it working on every screen.",
  /** Sits with the controls. An instruction, not a caption. */
  invitation: "Pick a brand.",
  radiusLabel: "Corners",
  radiusHint: "Square to round",
  /** The schematic page around the block, so it reads as somebody's site. */
  page: {
    nav: ["About", "Our teams", "Benefits", "Vacancies"],
    heading: "Registered Nurse",
    meta: "Bristol · Full time · £28,500 – £34,000",
    intro:
      "Join a 20-bed unit supporting adults with complex mental health needs. Applications take about two minutes.",
  },
  /** The Aplify block itself — the apply step, not another job tile. */
  block: {
    heading: "Apply for this role",
    nameLabel: "Full name",
    namePlaceholder: "Your name",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    cvLabel: "CV",
    cvHint: "PDF or Word, up to 10MB",
    cvButton: "Choose file",
    /** {brand} is substituted with the selected employer's name. */
    consent: "I agree to {brand} holding my details for this application.",
    submit: "Submit application",
  },
  /**
   * §6.7, and the same rule the notes field follows: the line sits with the
   * thing it is about rather than under the section. These are invented
   * employers and the form does nothing — both worth saying once, here.
   */
  disclosure:
    "Four invented employers, and a form that does nothing — nothing you type is sent, stored or read.",
};

/**
 * Brand kit demo — the stops the slider travels through, and the copy.
 *
 * WHY STOPS RATHER THAN PRESETS. The control is one slider running Northbank →
 * Halden, so what matters is the JOURNEY, not four things to choose between.
 * Each stop is a fully designed brand at a point on that journey; everything in
 * between is interpolated. Two stops alone would have put a mush of blue and
 * graphite at the midpoint — four means every resting position is a brand
 * somebody could plausibly have.
 *
 * `radius` MUST stay monotonic. The slider's headline is square → fully
 * rounded, and a stop that dipped would read as the control being broken.
 *
 * WHY EVERY GROUND IS LIGHT — a constraint, not an oversight. A continuous
 * slider cannot travel from a light theme to a dark one and stay readable: if
 * the ground goes light→dark while the ink goes dark→light, the two must cross,
 * and at the crossing the contrast is 1:1. No easing and no colour space avoids
 * it; it is arithmetic. So the journey stays on light grounds and takes its
 * drama from hue, corners, type and shadow instead. A dark theme is still
 * perfectly possible in the product — it just cannot be a POINT ON THIS SLIDER.
 * It would need a discrete switch, like any dark mode.
 *
 * §6.5 — ALL FOUR ORGANISATIONS ARE INVENTED. None is a client and none may
 * ever be swapped for a real name: §5's inventory allows exactly one logo on
 * this site (Brandon Trust, beside the one statistic) and none of these is it.
 * Northbank is reused deliberately — it is already the invented employer in the
 * step-03 registration artwork, so the page keeps one world.
 *
 * If a stop is edited, RE-MEASURE. The demo interpolates, so the endpoints
 * being safe proves nothing about t = 0.5; the sweep has to walk the range.
 */

export type MarkKind = "bars" | "leaf" | "arch" | "dot";

export interface BrandStop {
  /** Position on the slider, 0–1. Must ascend. */
  at: number;
  name: string;
  mark: MarkKind;

  /* Interpolated continuously, in Oklab. */
  ground: string;
  surface: string;
  surfaceMuted: string;
  accent: string;
  accentInk: string;
  ink: string;
  inkSoft: string;
  /** Card radius in px. Monotonic across stops — see the note above. */
  radius: number;
  /** Multiplier on the block's type scale. Font size is configurable too. */
  scale: number;
  /** em. */
  tracking: number;
  /** Multiplier on internal spacing. */
  gap: number;

  /* Snapped to the nearer stop — neither can be interpolated. */
  font: string;
  shadow: string;
}

export const BRAND_STOPS: BrandStop[] = [
  {
    at: 0,
    name: "Northbank Health",
    mark: "bars",
    ground: "#eef3f8",
    surface: "#ffffff",
    surfaceMuted: "#e4ecf5",
    accent: "#005eb8",
    accentInk: "#ffffff",
    ink: "#10243a",
    inkSoft: "#4a5b6e",
    radius: 0,
    scale: 1,
    tracking: -0.006,
    gap: 1,
    font: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    shadow: "0 1px 2px rgb(16 36 58 / 0.07), 0 8px 22px rgb(16 36 58 / 0.07)",
  },
  {
    at: 0.34,
    name: "Meridian Care",
    mark: "dot",
    ground: "#fdf6f0",
    surface: "#ffffff",
    surfaceMuted: "#f6e9dd",
    accent: "#a8501d",
    accentInk: "#ffffff",
    ink: "#3a2418",
    inkSoft: "#6f5747",
    radius: 12,
    scale: 1.04,
    tracking: -0.004,
    gap: 1.06,
    font: 'ui-rounded, "SF Pro Rounded", "Hiragino Maru Gothic ProN", system-ui, sans-serif',
    shadow: "0 2px 4px rgb(58 36 24 / 0.05), 0 16px 36px rgb(58 36 24 / 0.09)",
  },
  {
    at: 0.67,
    name: "Ashgrove Trust",
    mark: "leaf",
    ground: "#f2f6f1",
    surface: "#ffffff",
    surfaceMuted: "#e6efe5",
    accent: "#2f6b45",
    accentInk: "#ffffff",
    ink: "#14261a",
    inkSoft: "#48594c",
    radius: 22,
    scale: 1.02,
    tracking: 0,
    gap: 1.02,
    font: 'ui-serif, Georgia, "Times New Roman", serif',
    shadow: "0 1px 1px rgb(20 38 26 / 0.05), 0 8px 20px rgb(20 38 26 / 0.07)",
  },
  {
    at: 1,
    name: "Halden Group",
    mark: "arch",
    ground: "#edeff2",
    surface: "#ffffff",
    surfaceMuted: "#e2e5ea",
    accent: "#1b2026",
    accentInk: "#f2f5f8",
    ink: "#12161b",
    inkSoft: "#515965",
    radius: 34,
    scale: 0.98,
    tracking: -0.014,
    gap: 0.96,
    font: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    shadow: "0 1px 2px rgb(9 12 16 / 0.06), 0 22px 48px rgb(9 12 16 / 0.13)",
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
   * and fonts"). Widen the handover before treating this as sourced.
   */
  standfirst:
    "Search, apply and event registration render inside your own career site or campaign landing page, wearing your colours, type, corners, shadows, spacing and logo. Only the layout stays fixed — which is what keeps it working on every screen.",
  slider: {
    /** The control's accessible name. Nothing on screen labels it. */
    label: "Brand style",
    from: "Northbank Health",
    to: "Halden Group",
  },
  /** The schematic page around the block, so it reads as somebody's site. */
  page: {
    nav: ["About", "Our teams", "Benefits", "Vacancies"],
    heading: "Registered Nurse",
    meta: "Bristol · Full time · £28,500 – £34,000",
    intro:
      "Join a 20-bed unit supporting adults with complex mental health needs. Applications take about two minutes.",
    /** The footer the bleed cuts through. See the note in the demo. */
    footer: ["Privacy", "Accessibility", "Cookies", "Contact"],
    /** {brand} is substituted with the employer nearest the slider. */
    legal: "© 2026 {brand}",
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
    /** {brand} is substituted with the employer nearest the slider. */
    consent: "I agree to {brand} holding my details for this application.",
    submit: "Submit application",
  },
  /**
   * §6.7, and the same rule the notes field follows: the line sits with the
   * thing it is about rather than under the section.
   */
  disclosure:
    "Invented employers, and a form that does nothing — nothing you type is sent, stored or read.",
};

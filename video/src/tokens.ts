import { loadFont } from "@remotion/google-fonts/SchibstedGrotesk";

/**
 * The SIGNALS page's tokens, for film. Same face, same tracking, same five
 * colours — the film is the page moving, not a template wearing its colours.
 * Source of truth: src/app/signals.css in the site.
 */
export const { fontFamily } = loadFont("normal", {
  weights: ["500", "700"],
  subsets: ["latin"],
});

export const C = {
  black: "#0e0a10",
  creme: "#f3f0e8",
  creme200: "#e9e6de",
  blue: "#2563c9",
  tint: "#b4c9f5",
  lime: "#dbfe87",
  hair: "rgba(14, 10, 16, 0.16)",
  dim: "rgba(243, 240, 232, 0.72)",
};

export const W = 1920;
export const H = 1080;
export const FPS = 30;

/** Fluid type: sizes are fractions of the frame width, so a 16:9 master and
 *  any re-cut keep the same proportions. 1 unit = 1% of width. */
export const vw = (n: number) => (W * n) / 100;

export const TRACK = "-0.04em";
export const GUTTER = vw(5.2);

/** The page's spring: settled, no visible overshoot. */
export const SETTLE = { damping: 200, stiffness: 90, mass: 0.9 };
/** A touch of life for things that land. */
export const LAND = { damping: 18, stiffness: 140, mass: 0.8 };

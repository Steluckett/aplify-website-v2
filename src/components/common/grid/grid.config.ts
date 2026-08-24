// 📖 Docs: obsidian/frontend/components/common.md

/**
 * UNMOUNTED ON THIS PROJECT — do not re-mount without reading ADR-0028.
 *
 * `AdaptiveGrid` was removed from `app/layout.tsx`, and the matching `vw`
 * media-query ladder was removed from `globals.css`. The pattern below keeps a
 * REM-BASED layout proportional by scaling the root font-size; this project's
 * shell is `min(95vw, 1440px)` in px, so the root never moved the layout — it
 * only shrank the type inside a column that stayed put. Combined with a per-
 * band base width it produced a sawtooth: 16px at 1440, 12.17px at 1460.
 *
 * Mounting this again re-breaks the type scale at every breakpoint, and
 * overrides the reader's own browser font-size (WCAG 1.4.4). The files are
 * kept because they are starter infrastructure, not because they are wired up.
 *
 * Adaptive scaling grid configuration.
 *
 * The grid keeps a rem-based design proportional across viewports by scaling
 * the root (`<html>`) font-size. Each breakpoint maps a viewport `maxWidth` to
 * the design `baseWidth` it was laid out at — at `baseWidth` the root
 * font-size equals `FONT_BASE` and rem values match the design 1:1.
 *
 * - Scaling DOWN (viewport at or below `GRID_BASE_WIDTH`) is driven by the
 *   `vw` media queries in `src/app/globals.css`.
 * - Scaling UP (viewport above `GRID_BASE_WIDTH`) is driven at runtime by the
 *   `AdaptiveGrid` component / `useAdaptiveGrid` hook.
 *
 * Changing these values means updating the `html` media queries in
 * `globals.css` to match — the formula is:
 *   font-size: FONT_BASE * 100 / baseWidth  (vw)
 */

/** Root font-size (px) the design is measured against. */
export const FONT_BASE = 16;

export interface GridBreakpoint {
  /** Media-query `max-width` threshold (px). */
  maxWidth: number;
  /** Design base width (px) the range was laid out at. */
  baseWidth: number;
}

/** Breakpoints, largest first. */
export const GRID_BREAKPOINTS: readonly GridBreakpoint[] = [
  { maxWidth: 1920, baseWidth: 1920 },
  { maxWidth: 1440, baseWidth: 1440 },
  { maxWidth: 1024, baseWidth: 1024 },
  { maxWidth: 640, baseWidth: 360 },
];

/** Largest breakpoint width — above it the root font-size scales up. */
export const GRID_BASE_WIDTH = Math.max(
  ...GRID_BREAKPOINTS.map((bp) => bp.maxWidth),
);

import type { CSSProperties } from "react";

export interface BrandMarkProps {
  className?: string;
  style?: CSSProperties;
  title?: string;
}

/**
 * Aplify mark — the wordmark's "i", reduced to its two axis-aligned
 * rectangles. The stem follows `currentColor` so it reads on both the black
 * blocks and light surfaces; the square dot is always the brand cyan — the
 * one place outside the particle head the signal colour appears.
 */
export const BrandMark = ({ className, style, title }: BrandMarkProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    style={style}
    role="img"
    aria-label={title}
  >
    <rect x="8.5" y="2" width="7" height="5" fill="var(--signal)" />
    <rect x="8.5" y="10" width="7" height="12" fill="currentColor" />
  </svg>
);

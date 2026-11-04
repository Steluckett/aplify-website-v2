import type { CSSProperties, ReactNode } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { SETTLE, TRACK, fontFamily } from "./tokens";

/** The display face, set as the page sets it: 700, -0.04em, tight leading. */
export const display = (size: number, color: string): CSSProperties => ({
  fontFamily,
  fontWeight: 700,
  fontSize: size,
  letterSpacing: TRACK,
  lineHeight: 0.98,
  color,
  margin: 0,
});

/**
 * One line, revealed the way the page reveals headings: it rises out of its
 * own clip box on a spring, words trailing a beat apart, each easing from a
 * slight blur and widened tracking into the set face — the "fluid" part.
 */
export const RiseLine = ({
  text,
  delay = 0,
  size,
  color,
  stagger = 3,
}: {
  text: string;
  delay?: number;
  size: number;
  color: string;
  stagger?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  return (
    <div style={{ ...display(size, color), display: "flex", flexWrap: "nowrap", gap: "0.24em", overflow: "hidden", paddingBottom: "0.14em", marginBottom: "-0.16em" }}>
      {words.map((w, i) => {
        const p = spring({ frame: frame - delay - i * stagger, fps, config: SETTLE });
        return (
          <span
            key={`${w}-${i}`}
            style={{
              display: "inline-block",
              transform: `translateY(${(1 - p) * 105}%)`,
              letterSpacing: `calc(${TRACK} + ${(1 - p) * 0.06}em)`,
              filter: `blur(${(1 - p) * 6}px)`,
              whiteSpace: "nowrap",
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

/** Words that fill from faint to full ink across a frame window. */
export const FillWords = ({
  parts,
  from,
  to,
  size,
  color,
  accent,
  sep,
}: {
  parts: string[];
  from: number;
  to: number;
  size: number;
  color: string;
  accent: string;
  sep?: string;
}) => {
  const frame = useCurrentFrame();
  const n = parts.length;
  const prog = interpolate(frame, [from, to], [0, n], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <p style={{ ...display(size, color), lineHeight: 1.04 }}>
      {parts.map((part, i) => {
        const o = 0.16 + 0.84 * Math.min(1, Math.max(0, prog - i));
        return (
          <span key={part} style={{ opacity: o }}>
            {part}
            {sep && i < n - 1 ? <span style={{ color: accent }}>{sep}</span> : " "}
          </span>
        );
      })}
    </p>
  );
};

/** A slow, continuous drift so no frame is ever still — the page's calm. */
export const Drift = ({ children, from = 1, to = 1.04, frames }: { children: ReactNode; from?: number; to?: number; frames: number }) => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [0, frames], [from, to], { extrapolateRight: "clamp" });
  return <div style={{ position: "absolute", inset: 0, transform: `scale(${s})`, transformOrigin: "30% 60%" }}>{children}</div>;
};

/** Fades/rises a block in on the settled spring. */
export const Rise = ({ children, delay = 0, y = 40, style }: { children: ReactNode; delay?: number; y?: number; style?: CSSProperties }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: SETTLE });
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * y}px)`, ...style }}>{children}</div>;
};

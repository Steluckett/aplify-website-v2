import { ImageResponse } from "next/og";

import { heroContent } from "@/data/content/hero";
import { ACCENT, CANVAS, FOREGROUND, MUTED, brandFonts, markDataUri } from "@/lib/brand";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "The recruitment experience candidates actually finish.";

/**
 * Share card, built from the site's own parts: the mark, the headline exactly
 * as the hero sets it, the lead copy, and the accent ramp as a rule along the
 * bottom. Nothing here is invented copy — the strings come from the same
 * content module the page renders.
 *
 * The mark uses the celled cut: at this size the construction is the point.
 */
export default async function OpenGraphImage() {
  const [mark, fonts] = await Promise.all([markDataUri(), brandFonts()]);
  const headline = heroContent.titleLines.map((line) => line.toUpperCase());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: CANVAS,
          padding: "64px 72px",
        }}
      >
        <img src={mark} width={84} height={84} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          {headline.map((line) => (
            <div
              key={line}
              style={{
                fontFamily: "Onest",
                fontWeight: 500,
                fontSize: 76,
                lineHeight: 1.04,
                color: FOREGROUND,
                letterSpacing: "-0.01em",
              }}
            >
              {line}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontFamily: "Onest",
              fontSize: 22,
              color: MUTED,
            }}
          >
            {heroContent.context}
          </div>
          <div
            style={{
              height: 3,
              width: "100%",
              background: `linear-gradient(90deg, ${ACCENT.start} 0%, ${ACCENT.middle} 45%, ${ACCENT.end} 100%)`,
            }}
          />
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}

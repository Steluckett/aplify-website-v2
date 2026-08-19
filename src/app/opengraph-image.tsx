import { ImageResponse } from "next/og";

import { hero } from "@/data/content/site";
import { ACCENT, SHARE, brandFonts, markDataUri } from "@/lib/brand";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "The recruitment experience candidates actually finish.";

/**
 * Share card — the image Slack, LinkedIn, WhatsApp and a Google result show
 * when the link is pasted. Never seen on the site itself.
 *
 * Built from the site's own parts: the mark, the headline exactly as the hero
 * sets it, the standfirst, and the accent ramp as a rule along the foot.
 * Nothing here is invented copy — every string comes from the same content
 * module the page renders, which is the point of importing `site.ts` rather
 * than restating anything. The card previously drew from `content/hero.ts`,
 * the dead build's copy, and so read "MORE CANDIDATES. LESS FRICTION." against
 * a live hero of "More candidates, less friction". Two sources meant two
 * headlines; one source cannot drift.
 *
 * The ground is the page's own, not the black of the dark-luxury build. A card
 * is a promise about what the reader is about to land on, and landing
 * somewhere that looks like a different company is the one thing it must not
 * do. Contrast measured on this ground: heading 16.55:1, body 7.09:1.
 */
export default async function OpenGraphImage() {
  const [mark, fonts] = await Promise.all([
    markDataUri(false, "dark"),
    brandFonts(),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: SHARE.ground,
          padding: "64px 72px",
        }}
      >
        <img src={mark} width={132} height={44} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          {hero.lines.map((line) => (
            <div
              key={line}
              style={{
                fontFamily: "Inter Display",
                fontSize: 84,
                lineHeight: 1.06,
                /* The page's display tracking. */
                letterSpacing: "-0.035em",
                color: SHARE.heading,
              }}
            >
              {line}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontFamily: "Inter Text",
              fontSize: 24,
              lineHeight: 1.5,
              maxWidth: 900,
              color: SHARE.body,
            }}
          >
            {hero.standfirst}
          </div>
          <div
            style={{
              height: 4,
              width: "100%",
              background: `linear-gradient(90deg, ${ACCENT.start} 0%, ${ACCENT.end} 100%)`,
            }}
          />
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}

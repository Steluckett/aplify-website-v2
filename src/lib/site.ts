/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper. Update the placeholder values per project.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "Aplify",
  /**
   * The page's own promise, in one sentence — the hero's claim as the visitor
   * reads it. Recut 2026-08-29 to echo the rewritten hero (truth #24), on
   * Stephen's call that the two must match; the deck's Metadata block records
   * the superseded traffic/completion line. The share card
   * (`app/opengraph-image.tsx`) paints the same hero copy from
   * `content/site.ts`, so the description and the card make one claim. A
   * description that says something the page does not is the fastest way to
   * a high bounce rate.
   */
  description:
    "You got candidates to Apply. Don't lose them there. Aplify puts search, application and event registration on your own career site, so candidates never get handed off to an ATS.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. **Set `NEXT_PUBLIC_SITE_URL` per environment** — the
   * localhost fallback would otherwise ship canonical tags pointing at a
   * machine no crawler can reach.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * Optional share-image override. Left undefined so `app/opengraph-image.tsx`
   * generates the card — setting a path here would replace it.
   */
  ogImage: undefined as string | undefined,
  /**
   * Left unset until the account exists. A guessed handle does not degrade to
   * "no handle" — it tags whoever *does* own it on every share of this site,
   * so `twitter:site` is simply omitted instead.
   */
  twitterHandle: undefined as string | undefined,
  author: "Aplify",
  /** Browser theme-color (address bar / PWA). Matches `--background`. */
  themeColor: "#000000",
} as const;

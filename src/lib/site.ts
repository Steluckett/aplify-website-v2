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
   * The page's own promise, in one sentence — the headline and the lead copy
   * of the hero, joined. It is deliberately the same claim the visitor reads
   * first and the same one `app/opengraph-image.tsx` paints on the share card:
   * a description that says something the page does not is the fastest way to
   * a high bounce rate.
   */
  description:
    "The recruitment experience candidates actually finish. Aplify powers search, application and event registration directly on your own career site or campaign landing page, so candidates never get handed off to an ATS.",
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

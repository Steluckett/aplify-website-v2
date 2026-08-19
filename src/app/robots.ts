import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

/**
 * Generates `/robots.txt`.
 *
 * Crawling is OFF unless this is a Vercel production deployment. Preview
 * deployments already carry an `X-Robots-Tag: noindex` header from Vercel,
 * but that only covers the platform's own URLs — this makes the intent
 * explicit and survives the site being hosted anywhere else.
 *
 * While the rebuild is in progress the production flag is not enough on its
 * own: set `ALLOW_INDEXING=true` in the Vercel project when the site is
 * genuinely ready to be found. Until then every environment is disallowed.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";
  const indexingAllowed = isProduction && process.env.ALLOW_INDEXING === "true";

  if (!indexingAllowed) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}

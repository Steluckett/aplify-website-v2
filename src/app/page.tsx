import type { Metadata } from "next";

import { heroContent } from "@/data/content/hero";
import { siteConfig } from "@/lib/site";
import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import { HomeView } from "@/views/home";

/**
 * The home route's own title, built from the headline the hero actually sets —
 * the same source `app/opengraph-image.tsx` paints the share card from, so a
 * copy change carries through both instead of leaving one stale. The layout's
 * metadata covers everything else.
 */
/** The approved position (§4), verbatim — the hero renders a display recut of
 *  it, but metadata carries the sentence as written. */
const headline = "The recruitment experience candidates actually finish";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — ${headline}`,
});

export default function Home() {
  return <HomeView />;
}

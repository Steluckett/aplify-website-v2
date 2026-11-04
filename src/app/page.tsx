import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";
import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import { SignalsView } from "@/views/signals";

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
  /* Hyphen separator, Stephen's call 2026-08-28: a site-name separator is not
   * exempt from the no-em-dash rule (ADR-0032). */
  title: `${siteConfig.name} - ${headline}`,
});

export default function Home() {
  return <SignalsView />;
}

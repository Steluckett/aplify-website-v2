import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";
import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import { SiteView } from "@/views/site";

/** The Aurora page, kept beside the SIGNALS option on `design/signals-steer`
 *  so the two can be compared. Not for indexing. */
export const metadata: Metadata = {
  ...buildMetadata({ title: `${siteConfig.name} - Classic` }),
  robots: { index: false, follow: false },
};

export default function Classic() {
  return <SiteView />;
}

import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

/**
 * Generated rather than static: the shipped `manifest.json` listed six
 * `android-icon-*.png` files from the starter, and `browserconfig.xml` pointed
 * at `ms-icon-*.png` that never existed in this repo at all. Deriving it from
 * `siteConfig` keeps the name and colours in one place and the icon list
 * honest.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.themeColor,
    theme_color: siteConfig.themeColor,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

/**
 * @fileoverview Standardised metadata + viewport generators for pages.
 *
 * `generateMetadata` builds a Next.js `Metadata` object — basic meta tags,
 * OpenGraph, Twitter cards, canonical URL, icons, robots. `metadataBase` is
 * always set (from `siteConfig`) so relative URLs (OG image, canonical)
 * resolve to absolute — required by social scrapers.
 *
 * `generateViewport` builds the `Viewport` export. `themeColor` lives here, not
 * in `Metadata` — Next deprecated it on the metadata object.
 */

import { Metadata, Viewport } from "next";

import { siteConfig } from "@/lib/site";

interface MetadataProps {
  title?: string;
  description?: string;
  /** Canonical path (e.g. `/about`) or absolute URL for this page. */
  url?: string;
  /** Open Graph / Twitter image — path under `public/` or absolute URL. */
  ogImage?: string;
  twitterHandle?: string;
  author?: string;
  siteName?: string;
}

export function generateMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  url = "/",
  ogImage = siteConfig.ogImage,
  twitterHandle = siteConfig.twitterHandle,
  author = siteConfig.author,
  siteName = siteConfig.name,
}: MetadataProps = {}): Metadata {
  return {
    // Resolves every relative URL below to an absolute one.
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    authors: [{ name: author }],
    creator: author,
    publisher: author,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      // Omitted on purpose when there is no override: `app/opengraph-image.tsx`
      // generates the card and Next emits the tags for it, at the right size.
      // An explicit `images` here would replace that, not add to it.
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // Omitted rather than guessed: an `@handle` nobody owns here credits a
      // stranger on every share (see `siteConfig.twitterHandle`).
      ...(twitterHandle ? { site: twitterHandle, creator: twitterHandle } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    // No `icons` block: `app/icon.svg` and `app/apple-icon.tsx` are the source,
    // and an explicit entry here would override them rather than supplement.
    manifest: "/manifest.webmanifest",
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateViewport(): Viewport {
  return {
    themeColor: siteConfig.themeColor,
    width: "device-width",
    initialScale: 1,
  };
}

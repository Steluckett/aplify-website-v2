import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import {
  generateMetadata,
  generateViewport,
} from "@/utils/seo/generate-page-metadata";
import { getSiteStructuredData } from "@/utils/seo/structured-data";

import { LazyCookie } from "@/components/common/Cookie";
import { AdaptiveGrid } from "@/components/common/grid";
import { Loader } from "@/components/common/loader";
import { ReducedMotion } from "@/components/common/reduced-motion";
import { ScrollLayout } from "@/layouts/scroll-layout";

import "@/app/globals.css";

/** Body and UI face, self-hosted as a variable font; the static cuts
 *  alongside it exist for the Satori-rendered share images, which cannot read
 *  a variable axis. */
const onest = localFont({
  src: [{ path: "./fonts/Onest-Variable.ttf", weight: "100 900", style: "normal" }],
  variable: "--font-onest",
  display: "swap",
});

/** Display face — headlines and set pieces only, never body copy. A
 *  high-contrast serif against Onest's neutrality is what stops the page
 *  reading as a default. */
const instrument = localFont({
  src: [
    { path: "./fonts/InstrumentSerif-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = generateMetadata();
export const viewport: Viewport = generateViewport();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${onest.variable} ${instrument.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteStructuredData()),
          }}
        />
        <ScrollLayout>
          <AdaptiveGrid />
          <ReducedMotion />
          <LazyCookie />
          {children}
        </ScrollLayout>
        <Loader brand="Aplify" />
      </body>
    </html>
  );
}

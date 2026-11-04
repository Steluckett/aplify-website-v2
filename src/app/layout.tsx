import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import localFont from "next/font/local";

import {
  generateMetadata,
  generateViewport,
} from "@/utils/seo/generate-page-metadata";
import { getSiteStructuredData } from "@/utils/seo/structured-data";

import { LazyCookie } from "@/components/common/Cookie";
import { ReducedMotion } from "@/components/common/reduced-motion";
import { ScrollLayout } from "@/layouts/scroll-layout";

import "@/app/globals.css";

/** The one face, shared with the dashboard — the same self-hosted files the
 *  product ships, so a screenshot of the app and the page around it are set in
 *  the same type. One file carries weights 100–900 AND the optical-size axis,
 *  which is what makes large headings take Inter's Display cuts automatically;
 *  there is no separate display family to ask for. */
const inter = localFont({
  src: [
    { path: "./fonts/inter-var.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/inter-var-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-inter",
  display: "swap",
});

/** The SIGNALS option's face (`src/app/signals.css`). The reference sets in
 *  Noi Grotesk, a commercial face; Hanken Grotesk is the closest open
 *  neo-grotesk. Only the `.signals` root reads this variable. */
const grotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-grotesk",
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
    /* The font variable goes on <html>, not <body>: globals.css resolves
       --raw-font-sans at :root, and a custom property declared on <body>
       is not in scope there. */
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="ground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteStructuredData()),
          }}
        />
        <ScrollLayout>
          <ReducedMotion />
          <LazyCookie />
          {children}
        </ScrollLayout>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import { StyleguideView } from "@/views/styleguide";

export const metadata: Metadata = {
  title: "Aurora styleguide — Aplify",
  description: "The design system's components, rendered with the real tokens.",
  robots: { index: false, follow: false },
};

export default function StyleguidePage() {
  return <StyleguideView />;
}

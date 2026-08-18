import type { Metadata } from "next";

import { BackgroundsView } from "@/views/backgrounds";

export const metadata: Metadata = {
  title: "Blob grounds — Aplify",
  description: "Numbered background reference for the site.",
  robots: { index: false, follow: false },
};

export default function BackgroundsPage() {
  return <BackgroundsView />;
}

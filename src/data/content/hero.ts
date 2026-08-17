/**
 * Hero + chrome content, shaped for the Baseline reference composition.
 *
 * Display headline and sub-head are the client's own picks (2026-08-08):
 * MORE CANDIDATES. LESS FRICTION. as the giant display, KEEP CANDIDATES
 * CLOSE bottom-left, with the §4 standfirst beneath as context. The approved
 * position sentence stays verbatim in the page metadata. The floating cards
 * carry the approved capability strip (§4) — the content rules (§6.1) keep
 * every number off this frame.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface CapabilitySlide {
  label: string;
  blurb: string;
  href: string;
}

export const heroContent = {
  brand: "Aplify",
  navLeft: [
    { label: "Platform", href: "#platform" },
    { label: "How it works", href: "#how-it-works" },
  ] satisfies NavLink[],
  cta: "Book a demo",
  titleLines: ["More Candidates.", "Less Friction."],
  taglineLines: ["Keep Candidates", "Close"],
  context:
    "Search, application and event registration on your own career site or campaign landing page — candidates never get handed off to an ATS.",
  capabilities: [
    {
      label: "Feed cleaning",
      blurb: "Salaries, titles and UK regions normalised",
      href: "#platform",
    },
    {
      label: "AI enrichment",
      blurb: "Adverts rewritten to your tone of voice",
      href: "#ai-enrichment",
    },
    {
      label: "Easy Apply",
      blurb: "Applications finished on the page",
      href: "#job-search",
    },
    {
      label: "Easy Events",
      blurb: "The same flow for hiring events",
      href: "#candidates",
    },
  ] satisfies CapabilitySlide[],
  teaser: {
    title: "Working demos",
    blurb: "Search, apply and triage — live on this page",
    href: "#job-search",
  },
  scene: {
    src: "/assets/hero/vertices.json",
  },
};

/**
 * The full seven-item navigation (handover §8) — every entry carries its
 * one-line explainer, visible without hovering, in the menu overlay and the
 * footer. Order matches the page order exactly (the V1 nav/page disagreement
 * was flagged as a bug to fix), and the "How it works" explainer says six
 * stages because the section has six (V1 said four — the other flagged bug).
 */
export interface NavEntry {
  index: string;
  label: string;
  href: string;
  explainer: string;
}

export const fullNav: NavEntry[] = [
  {
    index: "01",
    label: "Platform",
    href: "#platform",
    explainer: "Ingest from any ATS, normalise it, publish it live",
  },
  {
    index: "02",
    label: "How it works",
    href: "#how-it-works",
    explainer: "From your feed to a live application in six stages",
  },
  {
    index: "03",
    label: "Job search & Easy Apply",
    href: "#job-search",
    explainer: "Grid, list and map — apply without leaving the page",
  },
  {
    index: "04",
    label: "AI enrichment",
    href: "#ai-enrichment",
    explainer: "Adverts rewritten in your tone of voice, in batches",
  },
  {
    index: "05",
    label: "Recruiter dashboard",
    href: "#dashboard",
    explainer: "Applications, registrations and status in one place",
  },
  {
    index: "06",
    label: "Security",
    href: "#security",
    explainer: "Field-level encryption, EEA hosting, role-based access",
  },
  {
    index: "07",
    label: "Integrations",
    href: "#integrations",
    explainer: "WordPress plugin, jobs API, native ATS integration",
  },
];

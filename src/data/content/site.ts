/**
 * Copy for the Aurora rebuild.
 *
 * Re-cut from V2_HANDOVER §8 to suit the reference's rhythm: its sections are
 * short and centred, and the handover's are long and left-ranged. The argument
 * is unchanged — the sentences are shorter and the lists have become things
 * you look at rather than read.
 */

export const nav = {
  items: [
    { label: "Platform", href: "#platform" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Job search", href: "#job-search" },
    { label: "Dashboard", href: "#dashboard" },
    { label: "Security", href: "#security" },
  ],
  ctaLabel: "Book a demo",
  ctaHref: "#demo",
};

export const hero = {
  /** Explicit line breaks — the heading engine sets each line `nowrap`. */
  lines: ["More candidates,", "less friction"],
  linesSm: ["More", "candidates,", "less friction"],
  standfirst:
    "Search, application and event registration on your own career site — candidates never get handed off to an ATS.",
  cta: { label: "Book a demo", href: "#demo" },
  secondary: { label: "See it working", href: "#job-search" },
  shot: {
    url: "yourcompany.co.uk/careers",
    placeholder: "Job search on a client's career site",
  },
};

export const featureBento = {
  eyebrow: "The platform",
  lines: ["One platform,", "two audiences"],
  linesSm: ["One platform,", "two", "audiences"],
  standfirst:
    "One side never touches a candidate. The other is everything a candidate ever sees. Both run off the same cleaned data.",
  /** The lead card — big, with a product shot inset into it. */
  lead: {
    title: "Feeds cleaned on every import",
    body: "Salaries normalised, titles tidied, regions standardised, descriptions rewritten to your tone of voice. No spreadsheets, no manual passes.",
    shot: { url: "app.aplify.co.uk/feeds", placeholder: "Feed import and mapping" },
  },
  /** The stacked column beside it. */
  items: [
    {
      title: "Apply without leaving",
      body: "On-page and anonymous, with no account to create and no ATS redirect.",
      icon: "cursor",
    },
    {
      title: "Search that finds things",
      body: "Keyword, region, salary and contract — plus postcode search and an interactive map.",
      icon: "search",
    },
    {
      title: "Measured by channel",
      body: "Source tracking on every submission, so paid social, job boards and QR codes compare like for like.",
      icon: "chart",
    },
  ],
} as const;

export const capabilities = {
  eyebrow: "For your candidates",
  lines: ["Four steps,", "no dead ends"],
  standfirst:
    "The whole candidate journey happens on your own site, in your own brand.",
  steps: [
    {
      n: "01",
      title: "Find the right job",
      body: "Keyword, region, salary and contract, plus postcode search and a map.",
      ground: "sky" as const,
    },
    {
      n: "02",
      title: "Apply without leaving",
      body: "On-page and anonymous, with pre-qualification before the form.",
      ground: "violet" as const,
    },
    {
      n: "03",
      title: "Register for events",
      body: "Hiring events get the same low-friction flow, on their own tab.",
      ground: "mint" as const,
    },
    {
      n: "04",
      title: "Kept informed",
      body: "Branded status emails at every stage, in your own voice.",
      ground: "amber" as const,
    },
  ],
};

export const footer = {
  cta: {
    lines: ["Fewer drop-offs,", "starting with your next feed"],
    linesSm: ["Fewer", "drop-offs"],
    standfirst:
      "See your own jobs cleaned, published and applied to — on a demo built from your real feed.",
    primary: { label: "Book a demo", href: "#demo" },
  },
  columns: [
    {
      heading: "Platform",
      links: [
        { label: "Job search", href: "#job-search" },
        { label: "Easy Apply", href: "#job-search" },
        { label: "AI enrichment", href: "#ai-enrichment" },
        { label: "Recruiter dashboard", href: "#dashboard" },
      ],
    },
    {
      heading: "How it works",
      links: [
        { label: "Ingest", href: "#how-it-works" },
        { label: "Clean & enrich", href: "#how-it-works" },
        { label: "Present", href: "#how-it-works" },
        { label: "Syndicate", href: "#how-it-works" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "Security & GDPR", href: "#security" },
        { label: "Integrations", href: "#integrations" },
        { label: "Roadmap", href: "#roadmap" },
        { label: "Contact", href: "#demo" },
      ],
    },
  ],
  blurb:
    "Aplify turns a messy ATS feed into a candidate experience people actually finish.",
  email: "hello@aplify.co.uk",
};

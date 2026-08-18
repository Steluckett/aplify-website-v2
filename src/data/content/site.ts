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
    src: "/assets/hero/company-home-screen-hero.png",
    /* Describes what the artwork SHOWS. It carries the hero's argument
       visually, so it is content rather than decoration and needs real
       alt text. */
    alt: "The Aplify dashboard home screen: a jobs and applications summary, a live-now panel, and setup cards.",
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
    icon: "feed",
    title: "Feeds cleaned on every import",
    body: "Salaries normalised, titles tidied, regions standardised, descriptions rewritten to your tone of voice. No spreadsheets, no manual passes.",
    shot: {
      src: "/assets/platform/feed-import.png",
      alt: "Aplify's feed mapping screen: a progress strip reading feed added, structure analysed, mappings reviewed and imports, above a table mapping source fields such as job_id and location_postcode onto Aplify's own fields.",
    },
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
    "The whole candidate journey happens on your own site, in your own brand — and every step of it is a place people usually drop out.",
  /** Rendered as alternating copy/image rows, so each step gets a shot. */
  steps: [
    {
      n: "01",
      title: "Find the right job",
      body: "Full-text search across every live role, narrowed by region, salary band and contract type. Candidates who only know the town they can get to use postcode search with a radius, or the map — which is often the only filter that matters when the job is shift work.",
      points: ["Keyword and salary filtering", "Postcode search with radius", "Interactive map"],
      shot: { url: "yourcompany.co.uk/careers", placeholder: "Search and filters" },
    },
    {
      n: "02",
      title: "Apply without leaving",
      body: "The application form is on the page, not behind a redirect. Pre-qualification runs first, so anyone who cannot be offered the role finds out in two questions rather than after twenty minutes of typing — and each company chooses which fields it actually needs.",
      points: ["No ATS redirect", "No account to create", "Pre-qualification first"],
      shot: { url: "yourcompany.co.uk/careers/apply", placeholder: "Easy Apply form" },
    },
    {
      n: "03",
      title: "Register for events",
      body: "Open days and assessment centres get the same low-friction flow on their own tab, with places tracked and attendance recorded against the candidate afterwards — so an event stops being a spreadsheet that lives on somebody's desktop.",
      points: ["Own tab, same flow", "Places tracked", "Attendance recorded"],
      shot: { url: "yourcompany.co.uk/careers/events", placeholder: "Event registration" },
    },
    {
      n: "04",
      title: "Kept informed",
      body: "Every status change sends a branded email in your own voice, so a candidate is never left guessing whether anyone read their application. Silence is the single most common reason people say they would not apply to an employer twice.",
      points: ["Branded templates", "Every status change", "Your tone of voice"],
      shot: { url: "app.aplify.co.uk/emails", placeholder: "Candidate status email" },
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

/* --------------------------------------------------------------------------
   The story: what arrives, what we do to it, what it becomes.
   -------------------------------------------------------------------------- */

export const story = {
  eyebrow: "The problem",
  lines: ["Your feed arrives", "fragmented"],
  standfirst:
    "Publish it straight to a career site and you either lose candidates or clean it by hand — every time a job changes.",
  /** One region, three spellings. One city, twice in a single field. */
  rows: [
    {
      raw: "NURSE — Bristol, Bristol, BS1",
      clean: "Nurse — Bristol, BS1",
      rawRegion: "SOUTH WEST",
      region: "South West",
      rawSalary: "24000-26000",
      salary: "£24,000–£26,000",
    },
    {
      raw: "Support Worker (Days)",
      clean: "Support Worker (Days)",
      rawRegion: "Southwest",
      region: "South West",
      rawSalary: "£24k-£26k",
      salary: "£24,000–£26,000",
    },
    {
      raw: "HCA - weston super mare",
      clean: "Healthcare Assistant — Weston-super-Mare",
      rawRegion: "S.W.",
      region: "South West",
      rawSalary: "Up to £26,000 DOE",
      salary: "Up to £26,000",
    },
  ],
  footnote:
    "Illustrative feed data — one region, three spellings; one city, listed twice in a single field. The same three roles, cleaned on import.",
};

export const payoff = {
  eyebrow: "The payoff",
  lines: ["One application,", "zero redirects"],
  linesSm: ["One", "application,", "zero redirects"],
  standfirst:
    "Candidates search, filter and apply without ever leaving your career site — no redirect, no account, no half-finished forms abandoned somewhere else.",
  chips: [
    "On-page",
    "No ATS redirect",
    "No account",
    "Anonymous apply",
    "Field-level PII encryption",
  ],
};

export const howItWorks = {
  eyebrow: "How it works",
  lines: ["Six stages, raw feed", "to finished application"],
  linesSm: ["Six stages,", "raw feed to", "application"],
  standfirst:
    "Everything between an ATS export and a candidate pressing send.",
  stages: [
    {
      n: "01",
      title: "Ingest",
      sub: "Pull jobs straight from your ATS",
      body: "XML, JSON or CSV from any number of sources, on a schedule or on demand. Field mapping is configuration, not development.",
      points: ["Multi-format import", "Configurable mapping", "Authenticated feeds"],
    },
    {
      n: "02",
      title: "Clean & enrich",
      sub: "Fix what the feed got wrong",
      body: "Salaries normalised, duplicated text stripped from titles, messy regions mapped to a consistent set — then AI rewrites each description to your tone of voice.",
      points: ["Salary and region normalisation", "AI rewriting to your EVP", "Job family classification"],
    },
    {
      n: "03",
      title: "Present",
      sub: "Publish it on your own site",
      body: "Full-text search, geo search with a configurable radius, an interactive map and detail pages — embedded on your career site.",
      points: ["Keyword and salary filtering", "Postcode and map search", "One campaign to a national board"],
    },
    {
      n: "04",
      title: "Convert",
      sub: "Let candidates finish without leaving",
      body: "Applications and event registrations happen on the page. Each company controls which fields appear, with pre-qualification gating anyone ineligible before the full form.",
      points: ["On-page Easy Apply", "Customisable fields", "Pre-qualification screening"],
    },
    {
      n: "05",
      title: "Manage",
      sub: "Action and report on everything",
      body: "Recruiters triage through a full status workflow, with source tracking on every submission so paid social, job boards and QR codes compare by channel.",
      points: ["Submitted to accepted", "Source tracking", "Branded candidate emails"],
    },
    {
      n: "06",
      title: "Syndicate",
      sub: "Send the clean feed back out",
      body: "Once a feed is clean it is an asset. Aplify tailors it per destination and publishes it as an API-key-protected XML feed.",
      points: ["Custom outbound mapping", "XML protected by API key", "Errors stripped before they leave"],
    },
  ],
};

export const demos = {
  jobSearch: {
    eyebrow: "Job search",
    lines: ["The search your", "candidates would get"],
    linesSm: ["The search", "your", "candidates get"],
    standfirst:
      "Three views of one filtered set — grid, list and map — running the way it would run on your career site.",
    shot: { url: "yourcompany.co.uk/careers", placeholder: "Job search — grid, list and map" },
  },
  aiEnrichment: {
    eyebrow: "AI enrichment",
    lines: ["Written for candidates,", "not for the file"],
    linesSm: ["Written for", "candidates,", "not the file"],
    standfirst:
      "ATS descriptions were written to satisfy a process. Aplify rewrites every one to your tone of voice on import.",
    shot: { url: "app.aplify.co.uk/jobs", placeholder: "Description rewrite — before and after" },
  },
  dashboard: {
    eyebrow: "For your recruiters",
    lines: ["One place to", "action all of it"],
    linesSm: ["One place", "to action", "all of it"],
    standfirst:
      "Applications and registrations arrive in the same dashboard and move through a status workflow your team controls.",
    shot: { url: "app.aplify.co.uk/applications", placeholder: "Recruiter dashboard — applications" },
  },
};

export const security = {
  eyebrow: "Security & GDPR",
  lines: ["Built for data", "you cannot lose"],
  linesSm: ["Built for", "data you", "cannot lose"],
  standfirst:
    "Candidate data is the most sensitive thing a recruiter holds. It is treated that way at every layer.",
  points: [
    {
      title: "Field-level PII encryption",
      body: "Personal fields are encrypted individually, not just at rest on the disk.",
      ground: "sky" as const,
    },
    {
      title: "Scoped to the company",
      body: "Every query is scoped by company; an out-of-scope record does not resolve.",
      ground: "violet" as const,
    },
    {
      title: "Anonymous by default",
      body: "Candidates apply without creating an account, so there is no credential to lose.",
      ground: "mint" as const,
    },
    {
      title: "Retention you control",
      body: "Retention windows and deletion are configured per company, not assumed.",
      ground: "amber" as const,
    },
  ],
};

export const integrations = {
  eyebrow: "Integrations",
  lines: ["Works with the", "ATS you already have"],
  linesSm: ["Works with", "your ATS"],
  standfirst:
    "Aplify sits between your ATS and your candidates. It does not replace anything you already run.",
  items: [
    "Any ATS exporting XML, JSON or CSV",
    "Native integration where an API exists",
    "Outbound XML feeds to job boards",
    "Calendar and event registration",
    "Branded transactional email",
    "Source tracking for paid channels",
  ],
};

export const roadmap = {
  eyebrow: "Roadmap",
  lines: ["What is coming next"],
  standfirst: "Shipped continuously, informed by the recruiters using it.",
  items: [
    { when: "Now", what: "Feed ingestion, enrichment, search, Easy Apply, events, syndication" },
    { when: "Next", what: "Deeper native ATS integrations and richer channel reporting" },
    { when: "Later", what: "Candidate matching and talent-pool re-engagement" },
  ],
};

export const proof = {
  eyebrow: "Application drop-off rate",
  before: { value: "85%", label: "Before Easy Apply" },
  after: { value: "30%", label: "After Easy Apply" },
  figure: "30",
  unit: "%",
  client: "Brandon Trust",
};

export const testimonials = {
  eyebrow: "In their words",
  lines: ["What changed for", "the teams using it"],
  linesSm: ["What changed", "for their", "teams"],
  quotes: [
    {
      quote:
        "We stopped losing people at the handover. The application finishes where the candidate started, and that alone changed our numbers.",
      name: "Resourcing Lead",
      org: "Brandon Trust",
    },
    {
      quote:
        "Our feed used to need a manual clean every week. Now it arrives tidy and the adverts read like we wrote them, because they do.",
      name: "Talent Acquisition Manager",
      org: "Cygnet",
    },
    {
      quote:
        "Being able to compare paid social against job boards by actual applications, not clicks, is the part our finance team cares about.",
      name: "Head of Recruitment",
      org: "HC-One",
    },
  ],
};

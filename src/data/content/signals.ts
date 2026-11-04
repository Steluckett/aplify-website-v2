/**
 * Content for the SIGNALS option (branch `design/signals-steer`) — a second,
 * fully reimagined homepage built on marketingsignals.com's section patterns.
 *
 * NO NEW CLAIMS LIVE HERE. Every factual line is either imported from
 * `site.ts` or quoted from it verbatim; V2_HANDOVER §5 binds this page
 * exactly as it binds the Aurora one. What this module adds is STRUCTURE —
 * which approved copy fills which reference pattern — plus a handful of
 * labels and questions that assert nothing.
 *
 * Where a figure appears (the stats row), each one is traced to its source
 * in the comment beside it.
 */
import {
  capabilities,
  caseStudies,
  footer,
  friction,
  google,
  hero,
  howItWorks,
  implementation,
  integrations,
  origin,
  security,
  siteMap,
  testimonials,
} from "@/data/content/site";

export const sigNav = {
  items: [
    { label: "Why they leave", href: "#friction" },
    { label: "Easy Apply", href: "#candidates" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Proof", href: "#proof" },
    { label: "Security", href: "#security" },
    { label: "Questions", href: "#faq" },
  ],
  ctaLabel: "Book a demo",
};

/**
 * The hero, written to the reference's lengths: a two-line headline of about
 * 40 characters (theirs: "Performance-Driven / Digital Marketing Agency")
 * and a two-tone intro of about 40 (theirs: "Built Around Search. Measured
 * On Revenue."). Title case, as theirs.
 *
 * "Completion-first" is the page's own argument (ADR-0031: the page argues
 * completion-first) set as a category descriptor. The intro restates two
 * shipped facts — no account to create, no ATS redirect — from
 * `capabilities.steps[1].points`. The approved §4 position stays in the page
 * metadata, verbatim.
 */
export const sigHero = {
  lines: ["Completion-First", "Recruitment Technology"],
  linesSm: ["Completion-First", "Recruitment", "Technology"],
  intro: { plain: "No Account. No Redirect.", accent: "Just Apply." },
  cta: hero.cta,
  secondary: hero.secondary,
  /** The drifting strip — the reference fills it with photography of its
   *  clients' worlds, so ours shows the people Aplify's customers hire.
   *  PLACEHOLDER STOCK (Unsplash, see public/assets/stock/README.md). */
  cards: [
    { src: "/assets/stock/strip-nurse.jpg", alt: "A care worker smiling with an older resident." },
    { src: "/assets/stock/strip-barista.jpg", alt: "A barista at work behind a coffee machine." },
    { src: "/assets/stock/strip-caregiver.jpg", alt: "A caregiver helping two older people with a colouring activity." },
    { src: "/assets/stock/strip-phone.jpg", alt: "A woman at a cafe table looking at her phone." },
    { src: "/assets/stock/strip-talk.jpg", alt: "Two colleagues talking in an office." },
    { src: "/assets/stock/strip-bar.jpg", alt: "Staff working behind a busy cafe counter." },
    { src: "/assets/stock/strip-walker.jpg", alt: "A caregiver helping an older woman with a walking frame." },
  ],
};

/** The scroll-fill statement. `origin.standfirst`'s first two sentences,
 *  verbatim; the second sentence takes the accent. */
export const sigOrigin = {
  label: origin.eyebrow,
  plain: "Aplify wasn’t built by software people trying to understand recruitment.",
  accent: "It was built by recruitment people who got tired of the software.",
};

/** Four figures. Each traces to `site.ts`:
 *  30% and 85% — caseStudies.cases[0].dropLine (the §5 statistic).
 *  55% — caseStudies.cases[0].hero / heroLabel.
 *  0 — security.points[2] and capabilities.steps[1].points ("No account to create").
 *  2 — implementation.setup.title ("Two settings to go live"). */
export const sigStats = [
  { value: 30, suffix: "%", label: "Application drop-off at Brandon Trust, down from 85%" },
  { value: 55, suffix: "%", label: "More applications submitted at Brandon Trust" },
  { value: 0, suffix: "", label: "Accounts a candidate has to create" },
  { value: 2, suffix: "", label: "Settings between WordPress and live" },
];

/** The services-style slider. Each step gets a tinted photograph behind it,
 *  as the reference's slides do. PLACEHOLDER STOCK. Decorative: the step's
 *  title and copy carry the meaning. */
export const sigSteps = {
  label: capabilities.lines.join(" "),
  steps: capabilities.steps,
  photos: [
    "/assets/stock/step-search.jpg",
    "/assets/stock/step-apply.jpg",
    "/assets/stock/step-events.jpg",
    "/assets/stock/step-informed.jpg",
  ],
};

/**
 * The reference's "Built Around Search" section: a centred two-tone heading
 * that repeats the hero intro (theirs repeats "Built Around Search. Measured
 * On Revenue."), then two split rows. PLACEHOLDER STOCK in both rows.
 */
export const sigSplit = {
  heading: sigHero.intro,
  plain: siteMap.lines[0],
  accent: siteMap.lines[1],
  standfirst: siteMap.standfirst,
  photo: { src: "/assets/stock/split-care.jpg", alt: "A care worker sharing a joke with an older resident." },
  points: integrations.items.slice(0, 6),
  secondary: { label: "How it works", href: "#how-it-works" },
};

export const sigFriction = {
  plain: `${friction.lines[0]} ${friction.lines[1]}`,
  accent: friction.lines[2],
  standfirst: friction.standfirst,
  cuts: friction.cuts,
  photo: { src: "/assets/stock/split-team.jpg", alt: "A recruitment team working around a long table with laptops." },
};

/* Phone breaks below are re-breaks of the same approved words, sized so no
   line is wider than a 360px screen at the phone display size. */
export const sigProof = {
  label: caseStudies.eyebrow,
  lines: caseStudies.lines,
  linesSm: ["Same", "problems.", "Different", "postcodes."],
  standfirst: caseStudies.standfirst,
  cases: caseStudies.cases,
};

export const sigStages = {
  lines: howItWorks.lines,
  linesSm: howItWorks.linesSm,
  linesXs: ["Six stages.", "Only one", "of them", "needs you."],
  standfirst: howItWorks.standfirst,
  stages: howItWorks.stages,
};

export const sigImplementation = {
  label: implementation.eyebrow,
  lines: implementation.lines,
  linesSm: implementation.linesSm,
  statement: implementation.statement,
  engineLine: implementation.routes.engineLine,
  setup: implementation.setup,
  shot: {
    src: "/assets/platform/feed-import.png",
    alt: "The feed import screen, mapping source fields onto Aplify’s own.",
  },
};

export const sigQuotes = {
  lines: testimonials.lines,
  linesSm: testimonials.linesSm,
  quotes: testimonials.quotes,
  /** The wall interleaves the three case results with the three quotes,
   *  giving the pin six cards to scroll past, as the reference's does. */
  results: caseStudies.cases,
  logos: {
    "Brandon Trust": { src: "/assets/case-studies/brandon-word.png", ratio: 642 / 137 },
    "Cygnet Group": { src: "/assets/case-studies/cygnet.svg", ratio: 220 / 88 },
    "HC-One": { src: "/assets/case-studies/hc-one-mark.svg", ratio: 165 / 59 },
  } as Record<string, { src: string; ratio: number }>,
};

export const sigSecurity = {
  label: security.eyebrow,
  lines: security.lines,
  linesSm: security.linesSm,
  standfirst: security.standfirst,
  points: security.points,
};

/** Questions a buyer asks; every ANSWER is approved copy from `site.ts`. */
export const sigFaq = {
  lines: ["Questions worth", "asking first"],
  linesSm: ["Questions", "worth", "asking first"],
  items: [
    { q: "Do we have to replace our ATS?", a: integrations.standfirst },
    { q: "Which ATS does Aplify work with?", a: integrations.lead },
    { q: "Do candidates need an account to apply?", a: security.points[2].body },
    { q: "Where does candidate data live?", a: implementation.statement.body },
    { q: "What does setup involve on WordPress?", a: `${implementation.setup.body} ${implementation.setup.footNote}` },
    { q: "Will our jobs show up on Google?", a: google.standfirst },
  ],
};

export const sigClose = {
  lines: footer.cta.lines,
  linesSm: footer.cta.linesSm,
  standfirst: footer.cta.standfirst,
  cta: footer.cta.primary,
  /** PLACEHOLDER STOCK — the reference's close shows its team. */
  tiles: [
    { src: "/assets/stock/tile-laugh.jpg", alt: "A care worker laughing with an older woman." },
    { src: "/assets/stock/tile-handshake.jpg", alt: "Two people shaking hands." },
    { src: "/assets/stock/quote-office.jpg", alt: "A team meeting around a table." },
    { src: "/assets/stock/tile-portrait.jpg", alt: "Two women smiling together." },
  ],
  footer,
  /** The footer's columns, re-pointed at this page's own anchors. */
  columns: [
    {
      heading: "The problem",
      links: [
        { label: "Why they leave", href: "#friction" },
        { label: "Why we built it", href: "#why" },
        { label: "Where it sits", href: "#where-it-sits" },
        { label: "What it costs", href: "#cost" },
        { label: "Better data", href: "#data" },
      ],
    },
    {
      heading: "The product",
      links: [
        { label: "Easy Apply", href: "#candidates" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Job search", href: "#job-search" },
        { label: "AI enrichment", href: "#ai-enrichment" },
        { label: "Google for Jobs", href: "#google" },
        { label: "Recruiter dashboard", href: "#dashboard" },
        { label: "Integrations", href: "#integrations" },
        { label: "Implementation", href: "#implementation" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "Proof", href: "#proof" },
        { label: "Security & GDPR", href: "#security" },
        { label: "Questions", href: "#faq" },
        { label: "Contact", href: "#demo" },
      ],
    },
  ],
};

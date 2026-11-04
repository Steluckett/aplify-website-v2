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

export const sigHero = {
  lines: hero.lines,
  linesSm: hero.linesSm,
  standfirst: hero.standfirst,
  cta: hero.cta,
  secondary: hero.secondary,
  /** The drifting strip of product surfaces. Repeated to fill the loop. */
  cards: [
    { src: "/assets/steps/search-mobile.png", alt: "Job search on a phone, with two job cards showing salary and category." },
    { src: "/assets/steps/job-description.png", alt: "The Easy Apply flow: pre-qualification questions above a short details form." },
    { src: "/assets/hero/company-home-screen-hero.png", alt: "The Aplify dashboard home screen with a jobs and applications summary." },
    { src: "/assets/steps/application-received.png", alt: "The confirmation screen after applying, reading Application received." },
    { src: "/assets/steps/event-registration.png", alt: "Registration for a careers open day, with a You’re registered confirmation." },
    { src: "/assets/platform/feed-import.png", alt: "The feed import screen, mapping source fields onto Aplify’s own." },
    { src: "/assets/friction/not-frustrated.png", alt: "Aplify’s apply flow on a phone, with a short pre-qualification step." },
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

export const sigSteps = {
  label: capabilities.eyebrow,
  lines: capabilities.lines,
  steps: capabilities.steps,
};

export const sigSplit = {
  lines: siteMap.lines,
  linesSm: siteMap.linesSm,
  standfirst: siteMap.standfirst,
  shot: siteMap.shot,
  points: integrations.items.slice(0, 6),
  secondary: { label: "How it works", href: "#how-it-works" },
};

export const sigFriction = {
  lines: friction.lines,
  linesSm: friction.linesSm,
  standfirst: friction.standfirst,
  cuts: friction.cuts,
  shot: {
    src: "/assets/friction/not-frustrated.png",
    alt: "Aplify’s apply flow on a phone: a short pre-qualification step asking about right to work, experience and shifts, above a confirmation that the application has been sent.",
  },
};

export const sigProof = {
  label: caseStudies.eyebrow,
  lines: caseStudies.lines,
  standfirst: caseStudies.standfirst,
  cases: caseStudies.cases,
};

export const sigStages = {
  lines: howItWorks.lines,
  linesSm: howItWorks.linesSm,
  standfirst: howItWorks.standfirst,
  stages: howItWorks.stages,
};

export const sigImplementation = {
  label: implementation.eyebrow,
  lines: implementation.lines,
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
  tiles: [
    { src: "/assets/steps/search-mobile.png", alt: "Job search on a phone." },
    { src: "/assets/steps/application-received.png", alt: "The Application received confirmation." },
    { src: "/assets/steps/job-description.png", alt: "The Easy Apply form." },
    { src: "/assets/hero/company-home-screen-hero.png", alt: "The recruiter dashboard home screen." },
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
      ],
    },
    {
      heading: "The product",
      links: [
        { label: "Easy Apply", href: "#candidates" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Job search", href: "#job-search" },
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

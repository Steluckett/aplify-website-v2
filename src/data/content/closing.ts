/**
 * Sections 11–17 (handover §8): security, integrations, roadmap, proof,
 * testimonials, closing CTA, footer. All quoted strings are approved copy.
 * §5 is the complete proof inventory — one statistic, three quotes, one named
 * integration — and nothing here goes beyond it.
 */

export const securityContent = {
  eyebrow: "Security & GDPR",
  headline: "Candidate data, encrypted field by field",
  standfirst:
    "Not just HTTPS, and not just encryption at the database level. Each piece of personal information is encrypted individually — and recruiters can still search it, because the index is secure rather than plain text.",
  columns: [
    {
      title: "How it's protected",
      facts: [
        "Encrypted in transit and at rest",
        "Field-level encryption on every PII field",
        "Searchable while encrypted, via secure exact-match indexing",
        "Hosted within the EEA",
        "Role-based access with unique user accounts",
        "Documented key rotation, monitoring and patching",
      ],
    },
    {
      title: "What candidates control",
      facts: [
        "Self-service export and deletion through a public form",
        "Every request confirmed by a signed email link",
        "Confirmation links expire after 48 hours",
        "Retention window enforced automatically in the background",
        "Marketing consent timestamped at the point of capture",
        "Aggregate reporting survives anonymisation intact",
      ],
    },
  ],
};

export const integrationsContent = {
  eyebrow: "Integrations",
  headline: "Two ways to put it on your site",
  standfirst:
    "Embed the whole experience on an existing WordPress career site without writing code, or build your own front end against the API. Both run off the same cleaned data.",
  halves: [
    {
      title: "Install it and the pages build themselves",
      note: "WordPress plugin",
      facts: [
        "Apply flow, dashboard pages, search, map, job detail, events and GDPR forms — built on install",
        "Colours, imagery and fonts set inside the plugin",
        "Shortcodes remain available for bespoke pages",
      ],
    },
    {
      title: "Or build your own front end",
      note: "Jobs API & Applications API",
      facts: [
        "Jobs API — search, filter, categories, locations, regions, roles",
        "Applications API — submit, read form structure, update status, export",
        "Keys scoped per integration, with granular permissions",
      ],
    },
  ],
};

export const roadmapContent = {
  eyebrow: "Roadmap",
  headline: "Being built next",
  standfirst:
    "Not yet available — listed so you know where the platform is going before you commit to it.",
  items: [
    {
      title: "Feed-level reporting",
      copy: "Reporting per feed and across multiple feeds, so customers running several can compare performance in one view rather than a feed at a time.",
    },
    {
      title: "Google for Jobs",
      copy: "Structured job data (JSON-LD) so vacancies surface in Google's dedicated jobs search alongside the rest of the career site.",
    },
  ],
};

export const proofContent = {
  eyebrow: "Application drop-off rate",
  before: 85,
  after: 30,
  beforeLabel: "Before Easy Apply",
  afterLabel: "After Easy Apply",
  client: "Brandon Trust",
  logoSrc: "/brandon_white.png",
};

export interface Testimonial {
  quote: string;
  name: string;
  company: string;
  /** Recorded voiceover, played on demand — no ambient sound, no gate. */
  audioSrc: string;
}

export const testimonialsContent = {
  eyebrow: "In their words",
  headline: "The people behind the numbers",
  standfirst:
    "Recruitment leaders using Aplify on their own career site or campaign landing page, in their own words.",
  playLabel: "Play the recording",
  pauseLabel: "Pause",
  items: [
    {
      quote:
        "Aplify has helped us significantly reduce application drop-out by making the whole process quicker and more accessible. More candidates are now completing their applications, giving our recruitment team a stronger pool of people to engage with.",
      name: "Louise Mitchell",
      company: "Brandon Trust",
      audioSrc: "/testimonial_voiceovers/brandon-trust-voice-quote.mp3",
    },
    {
      quote:
        "The Aplify dashboard is incredibly straightforward to use. Our recruitment team can quickly review and manage applications without unnecessary complexity, helping everyone work more efficiently and keep candidates moving through the process.",
      name: "Ben Hopwell",
      company: "Cygnet Group",
      audioSrc: "/testimonial_voiceovers/cygnet-voice-quote-.mp3",
    },
    {
      quote:
        "Aplify makes applying for a role feel quick, simple and intuitive. Candidates can complete their application without navigating a long or complicated process, creating a much more positive experience from the very first interaction.",
      name: "Sammi Yates",
      company: "HC-One",
      audioSrc: "/testimonial_voiceovers/hc-one-voice-quote.mp3",
    },
  ] satisfies Testimonial[],
};

export const ctaContent = {
  eyebrow: "Book a demo",
  headline: "See it against your own feed",
  standfirst:
    "We'll walk you through Aplify using your actual job data rather than a sandbox — so you can see what your feed looks like cleaned, and what your candidates would get.",
  fields: {
    name: "Name",
    email: "Work email",
    company: "Company",
    ats: "Current ATS",
    atsHint: "Whatever you run today — this shapes the conversation, not your eligibility",
  },
  submitLabel: "Request a demo",
  readAgainLabel: "Read it again",
  /** Deliberately isolated: the form composes an email until a real endpoint
   *  is nominated (handover §12 / §14). */
  mailto: "hello@aplify.co.uk",
  note: "Submitting opens an email to us with these details — nothing else is sent or stored.",
};

export const footerContent = {
  contactLabel: "Talk to us",
  contactEmail: "hello@aplify.co.uk",
  gdprLabel: "Candidate data request",
  gdprNote:
    "Candidates can request export or deletion of their data — every request is confirmed by a signed email link.",
  copyright: "© 2026 Aplify. All rights reserved.",
};

/**
 * The book-a-demo experience — every string in the full-screen enquiry flow.
 *
 * THE CONCEIT, and why the copy sounds like this: the form practises what the
 * site preaches. Aplify's whole argument is "every form field needs to earn
 * its place" and "if applying feels like admin, don't be surprised when
 * people stop halfway" — so the enquiry form is one question a screen, mostly
 * buttons and sliders, no password, and it says so. The confirmation line
 * deliberately mirrors Easy Apply's own "That's the whole application".
 *
 * Claims audit: "using your own jobs" restates the footer CTA copy (sourced).
 * ⚠️ "within one working day" is a NEW service promise — Stephen must confirm
 * it is true before launch. ⚠️ The confirmation's not-wired-yet footnote was
 * REMOVED on Stephen's call (2026-08-28) while submission is still unwired —
 * so until the API route lands, a live submission goes nowhere and says
 * nothing. Wire before launch, or at least before promoting the page.
 */
export const bookDemo = {
  ariaLabel: "Book a demo",
  close: "Close",

  progress: {
    /** {n} and {total} are replaced at render. */
    step: "Step {n} of {total}",
    done: "Done",
  },

  intro: {
    eyebrow: "Book a demo",
    lines: ["This is the bit where", "most forms lose you"],
    linesSm: ["This is the bit", "where most", "forms lose you"],
    standfirst:
      "So we kept ours short. Five quick questions, most of them are buttons, and there isn't a password in sight. Every field in here had to earn its place, which is rather the point of us.",
    start: "Right, let's go",
  },

  name: {
    question: ["Who are we", "talking to?"],
    placeholder: "Your name",
    error: "We'll need a name to put on the demo.",
  },

  reach: {
    question: ["Where should the", "demo land?"],
    emailLabel: "Work email",
    emailPlaceholder: "you@example.com",
    emailError: "That email doesn't look quite right.",
    orgLabel: "Organisation",
    orgPlaceholder: "Your organisation",
    orgError: "Which organisation is this for?",
  },

  volume: {
    question: ["How much hiring", "are we talking?"],
    hint: "Roughly. Nobody's checking.",
    sliderLabel: "Hires per year",
    bands: [
      "Under 50 a year",
      "50 to 250 a year",
      "250 to 1,000 a year",
      "1,000 to 5,000 a year",
      "More than 5,000 a year",
    ],
  },

  team: {
    question: ["And who does the", "recruiting?"],
    hint: "People working on applications day to day.",
    sliderLabel: "Recruitment team size",
    bands: ["Just me", "2 to 5 of us", "6 to 15", "16 to 50", "More than 50"],
  },

  agenda: {
    question: ["What should we make", "sure you see?"],
    hint: "Pick as many as you like, or none, and we'll show you the lot.",
    topics: [
      "Easy Apply",
      "The job search",
      "The recruiter dashboard",
      "The AI rewrite",
      "Integrations and your ATS",
      "The brand kit",
    ],
    atsLabel: "What are you running today? (optional)",
    atsPlaceholder: "Your current ATS, if there is one",
    submit: "Book my demo",
  },

  nav: {
    back: "Back",
    next: "Continue",
  },

  done: {
    lines: ["Boom!", "You're done"],
    lead: "Imagine if every application felt like that.",
    /** {name} is replaced with the first name they gave. */
    body: "Thanks {name}, we'll be in touch within one working day to book a demo using your own jobs.",
    closeLabel: "Back to the site",
  },
} as const;

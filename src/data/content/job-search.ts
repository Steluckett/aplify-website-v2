/**
 * Job search & Easy Apply — handover §8.8. Every quoted sentence is approved
 * copy. The sample person is invented and lives on a reserved `example.*`
 * domain (§6.5); the caption obligations of §6.7 are carried by `captions`.
 */

export const jobSearchContent = {
  eyebrow: "Job search",
  headline: "Try the search your candidates would get",
  standfirst:
    "Three views of one filtered set — grid, list and map — running live on this page, the way it would run on your career site or campaign landing page.",

  routeSwitch: {
    label: "Apply route",
    explainer:
      "Set per client, not per candidate. Switch it to see what changes on every card below — in all three views.",
    easyApply: "Easy Apply",
    linkOut: "Link to your ATS",
  },

  views: ["Grid", "List", "Map"] as const,

  /** Nine to a page. `{from}`/`{to}`/`{total}` are filled at render. */
  pagination: {
    label: "Job search pages",
    showing: "Showing {from}–{to} of {total} roles",
    previous: "Previous",
    next: "Next",
  },

  filters: {
    allFamilies: "All families",
    allRegions: "All regions",
    empty: "No roles match those filters — clear one and the set refills.",
  },

  card: {
    easyApply: "Easy Apply",
    linkOut: "Find out more",
  },

  linkOutPanel: {
    heading: "Hands off to your ATS",
    body: "With this route the search, the map, the clean job data and the campaign pages are all still Aplify — but the apply button sends the candidate to the job's page in your ATS, where they apply through the form you already run. Nothing changes about your existing process.",
    cost: "It costs you candidates. A redirect, and often an account to create, is exactly the friction Easy Apply removes — so this is the middle ground: your workflow untouched, at a measurable price at the last step.",
  },

  prequal: {
    stepLabel: "Step 1 of 2 — pre-qualification",
    explainer:
      "Pre-qualification runs before the form, so nobody fills one in for a role they can't be offered. Each company writes its own questions.",
    yes: "Yes",
    no: "No",
    continueLabel: "Continue",
    backLabel: "Back to search",
  },

  gate: {
    heading: "This role needs a different answer",
    body: "Rather than take you through a full application that would be turned down, the flow stops here. In the product this is where a candidate is pointed at roles they do qualify for.",
    backLabel: "Back to search",
  },

  form: {
    stepLabel: "Step 2 of 2 — your details",
    explainer:
      "No account, no password, no returning to an email to finish. Companies choose which fields appear here and in what order.",
    fields: {
      name: "Full name",
      email: "Email address",
      phone: "Phone (optional)",
      cv: "CV upload",
      cvHint: "PDF or Word — multi-file upload is supported in the product",
    },
    sample: {
      name: "Alex Morgan",
      email: "alex.morgan@example.co.uk",
      phone: "07700 900123",
      cv: "alex-morgan-cv.pdf",
    },
    submitLabel: "Submit application",
    note: "A demonstration form — nothing you see here is sent, stored or read.",
  },

  confirmation: {
    heading: "That's the whole application",
    body: "Two steps, no redirect, no account — and the candidate never left the page they arrived on. That is the difference the drop-off figures further down this page are measuring.",
    fork: "In the product, this role would now appear in the recruiter dashboard for triage — or, where native ATS integration is in place, straight in the ATS your team already works in. Nothing was submitted here.",
    backLabel: "Back to search",
  },

  captions: {
    demo: "A working demonstration on sample roles — every employer, vacancy and salary is invented; the geography is real.",
    map: "Locations are the genuine coordinates of each city. No roads, no tiles — the map shows where roles sit relative to each other.",
  },
};

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

  /**
   * The demo's main control, promoted out of the demo panel and onto the page
   * above it. The explainer that used to sit beside it has folded into the
   * section standfirst, so the two buttons can be the whole of it — each with
   * a line saying what it does, because "Easy Apply" and "Link to your ATS"
   * name the routes without saying what either costs.
   */
  routeSwitch: {
    label: "Apply route",
    /* Says plainly that this is a deployment setting, not a candidate control.
       §2: the configuration is set per client, not per candidate — and a
       switch sitting inside the search UI implies a candidate would meet it. */
    eyebrow: "Demo control",
    caption:
      "A client chooses this once, when Aplify is set up. No candidate ever sees it — but everything below changes with it.",
    easyApply: "Easy Apply",
    easyApplyNote: "They finish on the page they started on",
    linkOut: "Link to your ATS",
    linkOutNote: "They leave, and your workflow is untouched",
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
    keyword: "Keyword",
    keywordPlaceholder: "Job title or keyword",
    location: "Location",
    locationPlaceholder: "Town or city",
    useMyLocation: "Use my location",
    /** Shown once the sample origin is applied, so nothing is implied. */
    sampleLocationNote: "sample location",
    clear: "Clear",
    search: "Search",
    found: "{n} jobs found",
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

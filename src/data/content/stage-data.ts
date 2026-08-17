/**
 * The six stages of the platform, from the foundation doc §3 (with detail drawn from §4).
 *
 * Kept as data rather than markup so the stepper, and anything later that needs the same
 * sequence, read one source. `detail` is deliberately concrete — the value of this section is
 * that a recruiter recognises their own problems in it, which generalities can't do.
 */

export interface Stage {
  /** Two-digit label. The sequence is real, so numbering earns its place here. */
  num: string;
  /** Short name — what the stage is called. */
  name: string;
  /** The claim, in the candidate's or recruiter's terms. */
  headline: string;
  detail: string;
  /** Three specifics. Short enough to scan, concrete enough to be checked. */
  points: string[];
}

export const STAGES: Stage[] = [
  {
    num: "01",
    name: "Ingest",
    headline: "Pull jobs straight from your ATS",
    detail:
      "Feeds arrive in XML, JSON or CSV from any number of sources, on a schedule or on demand. An admin UI maps each source's fields to Aplify's own, so a new feed is configuration rather than development.",
    points: [
      "Multi-format import, any number of sources",
      "Configurable field mapping, no code changes",
      "Authenticated feeds and on-demand re-imports",
    ],
  },
  {
    num: "02",
    name: "Clean & enrich",
    headline: "Fix what the feed got wrong",
    detail:
      "Salaries are normalised, duplicated text is stripped from job titles, and messy ATS regions map to a consistent set. Then AI rewrites each description to your tone of voice and sorts every role into a job family — recruiter overrides survive future imports.",
    points: [
      "Salary, title and UK region normalisation",
      "AI rewriting to your EVP and tone of voice",
      "Job family classification, with manual override",
    ],
  },
  {
    num: "03",
    name: "Present",
    headline: "Publish it on your own site",
    detail:
      "Clean jobs and events surface through full-text search, geo search with a configurable radius, an interactive map and detail pages — embedded on your career site or campaign landing page. The same platform scopes down to one role or up to a national job board.",
    points: [
      "Keyword, category, region and salary filtering",
      "Postcode search and interactive map view",
      "Scopes from one campaign to a national board",
    ],
  },
  {
    num: "04",
    name: "Convert",
    headline: "Let candidates finish without leaving",
    detail:
      "Applications and event registrations happen on the page: no ATS redirect, no account to create. Each company controls which fields appear and in what order, with pre-qualification gating anyone ineligible before the full form.",
    points: [
      "On-page Easy Apply, anonymous submission",
      "Fully customisable fields and file uploads",
      "Pre-qualification screening and rate limiting",
    ],
  },
  {
    num: "05",
    name: "Manage",
    headline: "Action and report on everything",
    detail:
      "Recruiters triage applications and registrations through a full status workflow, with source tracking on every submission so paid social, job boards and QR codes can be compared by channel and date. Candidates get branded status emails at every stage.",
    points: [
      "Status workflow from submitted to accepted",
      "Source tracking, so ROI is measurable by channel",
      "Branded candidate emails you write yourself",
    ],
  },
  {
    num: "06",
    name: "Syndicate",
    headline: "Send the clean feed back out",
    detail:
      "Once a feed is clean it is an asset in its own right. Aplify tailors it field-by-field to whatever a destination expects and publishes it as an API-key-protected XML feed — so the errors never reach an external channel at all.",
    points: [
      "Custom outbound mapping per destination",
      "XML syndication protected by API key",
      "Errors stripped before they ever leave",
    ],
  },
];

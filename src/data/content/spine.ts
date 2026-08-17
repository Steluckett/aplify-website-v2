/**
 * The message spine — handover §8 sections 2–4, run as one continuous
 * uninterrupted stretch before any product detail. All headline/standfirst
 * strings are approved copy and quoted verbatim.
 *
 * The rows are shaped as **paired cells** — what the ATS sent, and what
 * Aplify publishes — because the section renders them as one table that
 * transforms in place rather than two tables to compare by eye. That makes
 * §6.10's traceability structural: every clean value has its raw value in the
 * same object, so nothing can appear in the "after" that wasn't in the
 * "before". The approved illustrative pair (§8.2) is preserved: a duplicated
 * location (`Nurse — Bristol, Bristol, BS1`) and three spellings of one
 * region (`SOUTH WEST / Southwest / S.W.`). Geography is real (§6.6).
 */

export interface FeedCell {
  raw: string;
  clean: string;
  /** True when the two differ — the view marks these as the fixes. */
  fixed?: boolean;
}

export interface FeedRow {
  title: FeedCell;
  region: FeedCell;
  salary: FeedCell;
}

export const feedColumns = ["Job title", "Region", "Salary"];

export const feedRows: FeedRow[] = [
  {
    title: {
      raw: "NURSE — Bristol, Bristol, BS1",
      clean: "Nurse — Bristol, BS1",
      fixed: true,
    },
    region: { raw: "SOUTH WEST", clean: "South West", fixed: true },
    salary: { raw: "24000-26000", clean: "£24,000–£26,000", fixed: true },
  },
  {
    title: {
      raw: "Support Worker (Days)",
      clean: "Support Worker (Days)",
    },
    region: { raw: "Southwest", clean: "South West", fixed: true },
    salary: { raw: "£24k-£26k", clean: "£24,000–£26,000", fixed: true },
  },
  {
    title: {
      raw: "HCA - weston super mare",
      clean: "Healthcare Assistant — Weston-super-Mare",
      fixed: true,
    },
    region: { raw: "S.W.", clean: "South West", fixed: true },
    salary: { raw: "Up to £26,000 DOE", clean: "Up to £26,000", fixed: true },
  },
];

export const problemContent = {
  eyebrow: "The problem",
  headlineLines: ["Your feed arrives", "fragmented"],
  standfirst:
    "Publish that straight to a career site or campaign landing page and you either lose candidates or clean it by hand — every time a job changes.",
  rawLabel: "Straight from the ATS",
};

export const solutionContent = {
  eyebrow: "The solution",
  headlineLines: ["Feed cleaned,", "ready for candidates"],
  standfirst:
    "Salaries normalised, titles tidied, regions standardised, descriptions rewritten to your tone of voice — on every import, without anyone touching a spreadsheet.",
  cleanLabel: "Published by Aplify",
  /** Sits under the table while it transforms. */
  scrollCue: "Keep scrolling",
  caption:
    "Illustrative feed data — one region, three spellings; one city, listed twice in a single field. The same three roles, cleaned on import.",
};

export const payoffContent = {
  eyebrow: "The payoff",
  headline: "One application, finished on your own site",
  /** Display cut — one word per cell so it can never wrap (see spine view). */
  displayWords: ["One", "application", "zero", "redirects"],
  standfirst:
    "Candidates search, filter, and apply without ever leaving your career site or campaign landing page — no redirect, no account, no half-finished forms abandoned somewhere else.",
  labels: [
    "On-page",
    "No ATS redirect",
    "No account",
    "Anonymous apply",
    "Field-level PII encryption",
  ],
};

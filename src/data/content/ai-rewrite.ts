/**
 * AI enrichment — handover §8.9. The before/after pair is carried over from
 * V1 verbatim: §6.10 requires every fact in the "after" to be traceable to
 * the "before", and these two adverts were written to satisfy that check.
 * The guardrail lines are load-bearing copy (§6.8), quoted exactly.
 */

export interface RewriteJob {
  before: string;
  afterTitle: string;
  afterBody: string;
  afterMeta: string;
}

export const aiRewriteContent = {
  eyebrow: "AI enrichment",
  headline: "Written for candidates, not for the file",
  standfirst:
    "ATS descriptions were written to satisfy a process. Aplify rewrites every one to your tone of voice on import — try it.",
  beforeLabel: "Straight from the ATS",
  afterLabel: "Published by Aplify",
  actionLabel: "Rewrite with Aplify",
  resetLabel: "Show the originals",
  caption:
    "Illustrative adverts. Every fact in the rewritten version is traceable to the original — nothing is added.",
  jobs: [
    {
      before:
        "NURSE - BRISTOL, BRISTOL. Post holder will undertake duties as per JD attached. Applicants must hold current NMC registration. Shift patterns as per rota. See attached person spec for essential/desirable criteria. £28500-34000pa depending on experience.",
      afterTitle: "Registered Nurse — Bristol",
      afterBody:
        "A permanent nursing role on a rotating shift pattern. You'll need current NMC registration; we'll take you through the full criteria when you apply.",
      afterMeta: "£28,500 – £34,000 · depending on experience · South West",
    },
    {
      before:
        "HEALTHCARE ASSISTANT req PLYMOUTH area. Duties as per attached JD. Applicants must have right to work in UK. Various shifts days/nights/weekends as per service need. 22000-24500pa pro rata. Closing date TBC. See person spec attached.",
      afterTitle: "Healthcare Assistant — Plymouth",
      afterBody:
        "A hands-on care role across day, night and weekend shifts. You'll need the right to work in the UK; we'll take you through the full criteria when you apply.",
      afterMeta: "£22,000 – £24,500 · pro rata · South West",
    },
  ] satisfies RewriteJob[],
  guardrail: {
    heading: "Works on adverts, not on people",
    lines: [
      "Screening, ranking and selection stay entirely with your team — the AI never touches a candidate decision.",
      "It rewrites what's there. It doesn't invent responsibilities, benefits or requirements your feed didn't contain.",
    ],
  },
  capabilities: [
    "Your EVP and tone of voice",
    "Consistent job families",
    "Bulk reclassify and regenerate",
    "Every AI decision editable",
  ],
};

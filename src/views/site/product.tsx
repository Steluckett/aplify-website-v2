"use client";

import { SectionIntro } from "@/components/ui/section-intro";
import { demos } from "@/data/content/site";

import { AiRewriteDemo } from "./demos/ai-rewrite";
import { DashboardDemo } from "./demos/dashboard";
import { JobSearchDemo } from "./demos/job-search";

/**
 * The three product sections.
 *
 * These are the page's argument, so they are the real thing rather than
 * pictures of it: search, filter, apply, rewrite and triage all work here.
 * A screenshot of software asks to be believed; software asks to be used.
 *
 * NONE of the three sits in browser chrome any more. The job search lost its
 * frame first (see the note on `JobSearchSection` below), and the dashboard
 * followed on 2026-08-24, because a page carrying two framings for two product
 * surfaces read as two products. The AI rewrite never had one — it is a
 * before-and-after comparison, not a screen, so it carries the wash-and-inset
 * composition directly.
 *
 * What each demo does instead is ground ITSELF: the job search and the
 * dashboard both sit on the deep blob ground with their controls on a white
 * card straddling the panel's top edge, and their tiles and pill fields read
 * against that rather than against a fake window.
 *
 * `.screen` is what drops everything inside to Aurora's UI scale, and it is
 * still what stops a live demo reading as more marketing page — it is now set
 * on the demo's own panel rather than inherited from a frame.
 */
export const JobSearchSection = () => (
  <section id="job-search" className="py-26">
    <div className="shell">
      <SectionIntro
        eyebrow={demos.jobSearch.eyebrow}
        lines={[...demos.jobSearch.lines]}
        linesSm={[...demos.jobSearch.linesSm]}
        standfirst={demos.jobSearch.standfirst}
      />
      {/* No frame. The demo used to sit inside browser chrome on a wash,
            which said "this is a page on somebody's site" — true, and it also
            made the search read as a screenshot of a website rather than as
            the thing itself. On its own deep ground it is just the product,
            working, in the middle of the page. */}
      <div className="mt-16">
        <JobSearchDemo />
      </div>
    </div>
  </section>
);

export const AiEnrichmentSection = () => (
  <section id="ai-enrichment" className="band-white py-26">
    <div className="shell">
      <SectionIntro
        eyebrow={demos.aiEnrichment.eyebrow}
        lines={[...demos.aiEnrichment.lines]}
        linesSm={[...demos.aiEnrichment.linesSm]}
        standfirst={demos.aiEnrichment.standfirst}
      />
      <AiRewriteDemo className="mt-16" />
    </div>
  </section>
);

export const DashboardSection = () => (
  <section id="dashboard" className="py-26">
    <div className="shell">
      <SectionIntro
        eyebrow={demos.dashboard.eyebrow}
        lines={[...demos.dashboard.lines]}
        linesSm={[...demos.dashboard.linesSm]}
        standfirst={demos.dashboard.standfirst}
      />
      {/* No frame, for the same reason the job search has none — and the
          demo now renders its own §6.7 caption at the foot of its panel,
          which is the disclosure this surface had been missing entirely. */}
      <div className="mt-16">
        <DashboardDemo />
      </div>
    </div>
  </section>
);

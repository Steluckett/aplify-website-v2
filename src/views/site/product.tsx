"use client";

import { ScreenCard } from "@/components/ui/screen-card";
import { SectionIntro } from "@/components/ui/section-intro";
import { jobSearchContent } from "@/data/content/job-search";
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
 * Two of the three sit inside browser chrome, because they are screens a
 * client's visitor or recruiter would actually be looking at, and the frame
 * is what says whose site it is. The AI rewrite is not a screen — it is a
 * before-and-after comparison — so it carries the wash-and-inset composition
 * directly instead of pretending to be a browser window.
 *
 * `.screen` inside the frame drops everything to Aurora's UI scale, which is
 * what stops a live demo reading as more marketing page.
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
        {/* The roles are invented and the page must say so — a demo that
              looks this much like the product is exactly the one that needs
              its sample data disclosed. */}
        <p className="mx-auto mt-6 max-w-[52rem] text-center text-xs text-ink-label">
          {jobSearchContent.captions.demo}
        </p>
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
      <div className="mt-16">
        <ScreenCard ground="wash" pad="generous" url={demos.dashboard.shot.url}>
          <DashboardDemo />
        </ScreenCard>
      </div>
    </div>
  </section>
);

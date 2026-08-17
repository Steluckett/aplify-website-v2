"use client";

import { ScreenCard } from "@/components/ui/screen-card";
import { SectionIntro } from "@/components/ui/section-intro";
import { demos } from "@/data/content/site";

type Demo = (typeof demos)[keyof typeof demos];

/**
 * The three product sections.
 *
 * Identical composition each time — centred intro, then one large framed
 * screen — because they are the same kind of claim three times, and varying
 * the layout would imply a difference that is not there. What varies is the
 * band: they alternate white and ground so the run of three does not read as
 * one long section.
 *
 * Each currently holds a designed placeholder. The live demos from the
 * previous build (job search with grid/list/map, Easy Apply, the AI rewrite
 * and the recruiter triage table) drop into these frames in place of the
 * placeholder — the frame, the wash and the register are already correct, so
 * wiring them in is a swap rather than a rebuild.
 */
const DemoSection = ({
  id,
  demo,
  band,
  ground,
}: {
  id: string;
  demo: Demo;
  band: boolean;
  ground: "wash" | "soft";
}) => (
  <section id={id} className={`${band ? "band-white" : ""} py-24 lg:py-32`}>
    <div className="shell">
      <SectionIntro
        eyebrow={demo.eyebrow}
        lines={[...demo.lines]}
        linesSm={[...demo.linesSm]}
        standfirst={demo.standfirst}
      />
      <div className="mt-16">
        <ScreenCard
          ground={ground}
          url={demo.shot.url}
          placeholder={demo.shot.placeholder}
          ratio="16 / 9"
        />
      </div>
    </div>
  </section>
);

export const Demos = () => (
  <>
    <DemoSection id="job-search" demo={demos.jobSearch} band ground="wash" />
    <DemoSection
      id="ai-enrichment"
      demo={demos.aiEnrichment}
      band={false}
      ground="soft"
    />
    <DemoSection id="dashboard" demo={demos.dashboard} band ground="wash" />
  </>
);

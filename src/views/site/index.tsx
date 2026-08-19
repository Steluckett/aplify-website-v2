import { NavBar } from "@/components/ui/nav-bar";
import { nav } from "@/data/content/site";

import { DropOffBand, MapBand } from "./bands";
import { SiteFooter } from "./footer";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { Capabilities, FeatureBento } from "./platform";
import {
  AiEnrichmentSection,
  DashboardSection,
  JobSearchSection,
} from "./product";
import { Payoff, Story } from "./story";
import { Integrations, Proof, Roadmap, Security, Testimonials } from "./trust";

/**
 * The Aurora rebuild.
 *
 * Ordered as two problems, each followed by the thing that answers it. The page
 * previously told the clean-data claim three separate times — in the bento, in
 * the six-stage pipeline and again in the AI enrichment section — and told the
 * apply claim twice, which is what made it read as though the halves of the
 * product were bleeding into each other. Each claim is now made once, in one
 * place, and the sections between them are the evidence for it.
 *
 * The shape:
 *
 *   position → map → problem 1 → the platform that fixes it → proof of the fix
 *            → problem 2 → the layer that fixes it → proof of the fix
 *            → where the work lands → objections → ask
 *
 * The six-stage pipeline sits at the join deliberately. It is the one section
 * that spans both halves — ingest, clean and syndicate are upstream, present
 * and convert are what a candidate sees, manage is what a recruiter does — so
 * it works as the bridge out of the platform act and into the candidate one,
 * where anywhere else it would be the thing crossing the boundary.
 *
 * Bands alternate between the tinted ground and full-bleed white so the scroll
 * has rhythm. The alternation is a property of the ORDER, not of any section,
 * so moving a section means re-checking its `band-white` — the classes below
 * were reassigned wholesale when this order changed.
 */
export const SiteView = () => (
  <>
    <NavBar items={nav.items} ctaLabel={nav.ctaLabel} ctaHref={nav.ctaHref} />
    <main className="relative w-full overflow-x-clip">
      <Hero />

      {/* What this is, before any of it is argued. */}
      <MapBand />

      {/* Problem one, and the platform that answers it. */}
      <Story />
      <FeatureBento />
      <AiEnrichmentSection />

      {/* The bridge: the whole pipeline, ending on what a candidate sees. */}
      <HowItWorks />

      {/* Problem two, and the layer that answers it. */}
      <DropOffBand />
      <Payoff />
      <Capabilities />
      <JobSearchSection />

      {/* The only hard number the site has, immediately after the claim it
          proves rather than nine sections later, behind the objections. */}
      <Proof />

      {/* Where the work lands, then the objections in §9's order. */}
      <DashboardSection />
      <Integrations />
      <Security />
      <Roadmap />
      <Testimonials />
      <SiteFooter />
    </main>
  </>
);

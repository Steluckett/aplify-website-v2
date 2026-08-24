import { NavBar } from "@/components/ui/nav-bar";
import { nav } from "@/data/content/site";

import { DropOffBand, MapBand } from "./bands";
import { BrandSection } from "./brand";
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
 * BANDS ARE NOT FREE TO ALTERNATE. The rhythm of tinted against full-bleed
 * white is the softer goal; four sections have a hard requirement, because
 * their card surfaces are only separable on white:
 *
 *   #roadmap     `card-quiet` (#eef0f5) — ΔE 0.35 on the tinted ground.
 *                Mathematically invisible. Not "subtle": invisible.
 *   #security    the pastel four — ΔE 4.3–11.8 on tint, 7.7–10.4 on white.
 *   #testimonials a 10%-alpha gradient, which needs white underneath it.
 *
 * And #platform must stay TINTED for the opposite reason: it renders its own
 * white mega-panel, which has nothing to lift off if the section is white too.
 *
 * #candidates is no longer on that list. Its cards were `card-quiet` when the
 * steps were rows; the stack made them white with a lift, so they now read on
 * either ground. It is still on white, but by choice rather than by
 * constraint — it could move if a reorder needed the slot.
 *
 * This is a documented invariant, not a preference. `globals.css` lightened the
 * page ground specifically because "the pastel cards no longer depend on this
 * separation: they live on the white bands" — the ground and the cards were
 * solved as a pair. Reordering the page in the previous commit broke it, and
 * the tell was exactly what you would expect: the cards looked washed out and
 * the ground read as heavy grey, when the ground is in fact L* 95.1.
 *
 * So: satisfy the constraints above FIRST, then alternate whatever is
 * left. Doing it the other way round is what went wrong. Pairs are acceptable
 * where the constraints force them — the tail runs WW··WW· and the original
 * page ran a white pair too.
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

      {/* The objection the demo above raises and cannot answer: they have just
          used it in OUR blue. §3 names employer brand consistency as a concern
          of the primary buyer, and the page had no reply. See `brand.tsx`. */}
      <BrandSection />

      {/* The only hard number the site has, immediately after the claim it
          proves rather than nine sections later, behind the objections. */}
      <Proof />
      <Testimonials />

      {/* Where the work lands, then the objections in §9's order. */}
      <DashboardSection />
      <Integrations />
      <Security />
      <Roadmap />
      <SiteFooter />
    </main>
  </>
);

import { NavBar } from "@/components/ui/nav-bar";
import { nav } from "@/data/content/site";

import { MapBand } from "./bands";
import { BrandSection } from "./brand";
import { SiteFooter } from "./footer";
import { GoogleSection } from "./google";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { Capabilities } from "./platform";
import { Cost, Friction, Origin } from "./problem";
import {
  AiEnrichmentSection,
  DashboardSection,
  JobSearchSection,
} from "./product";
import { Story } from "./story";
import { Integrations, Proof, Security } from "./trust";

/**
 * The Aurora rebuild, restructured on 2026-08-25 to the Brand Playbook v3 and
 * the Homepage Strategy Rationale v2.
 *
 * WHAT CHANGED, AND WHY IT IS NOT A PREFERENCE.
 *
 * The page used to open on the feed problem and reach Easy Apply nine bands
 * later. That is the RECRUITMENT OPERATIONS buyer's concern leading a page
 * whose primary audience, per V2_HANDOVER §3, is the talent acquisition lead —
 * whose question is "will more people finish?" §7's primary claim is
 * completion, and the page was making a reader wait six bands to hear about
 * it.
 *
 * So the argument now runs completion-first, and job data became the thing
 * that makes Easy Apply perform better rather than the opening act. The
 * strategy doc is blunt about this: "do not present Feed Intelligence as the
 * hero. It is a foundational capability."
 *
 * THIS SUPERSEDES V2_HANDOVER §4's ORDERING, on Stephen's explicit call
 * ("we are going in a new direction - dont let previous handovers interfere").
 * §4 runs feed → clean → finish → proof and says steps 1-3 "should never be
 * separated". They now are, by the whole convert act. §5 and §6 are untouched
 * and still bind absolutely.
 *
 * The five acts:
 *
 *   RECOGNITION  their week, before we mention ourselves at all
 *   THE ANSWER   what Aplify is, then the payoff, then proof of the payoff
 *   ATTRACT      what decides who arrives and what they make of you
 *   IMPROVE      where the work lands
 *   RISK         the objections, in §9's order, then the ask
 *
 * BANDS ARE NOT FREE TO ALTERNATE. The tinted/white rhythm is the softer goal;
 * three sections have a hard requirement, because their card surfaces are only
 * separable on white:
 *
 *   #security     the pastel four — ΔE 4.3–11.8 on tint, 7.7–10.4 on white.
 *   #proof        two `wash-soft` quote cards, a 10%-alpha gradient.
 *   #dashboard    the third quote card, same reason. NEW constraint as of
 *                 2026-08-25 — this band was tinted until Ben's quote moved
 *                 into it, and the quote is what pins it to white.
 *
 * `#platform`'s old "must stay tinted" requirement died with the bento it was
 * protecting. `#candidates` reads on either ground since its cards became
 * white-with-a-lift, so it is on white by choice rather than constraint.
 *
 * Satisfy those three FIRST, then alternate whatever is left. Doing it the
 * other way round is what broke the page once already, and the tell was
 * exactly what you would expect: the cards looked washed out and the ground
 * read as heavy grey, when the ground is in fact L* 95.1.
 */
export const SiteView = () => (
  <>
    <NavBar items={nav.items} ctaLabel={nav.ctaLabel} ctaHref={nav.ctaHref} />
    <main className="relative w-full overflow-x-clip">
      <Hero />

      {/* ACT ONE — recognition. Three bands before Aplify is named, because
          the addendum's first rule is that the biggest mistake a SaaS site
          makes is introducing itself too quickly. */}
      <Friction />
      <Cost />
      <Origin />

      {/* ACT TWO — the answer.

          `MapBand` bleeds its artwork into whatever follows it, so that band
          must be `relative` or the picture paints OVER the next section
          instead of being cut by it. That receiver is `#candidates` now. It
          has moved twice: `#problem` originally, then `#payoff`, now here.
          Check it after any reorder of this act.

          THERE WAS A `#payoff` BAND BETWEEN THESE TWO AND IT WAS DELETED on
          2026-08-25. It asserted "no redirect, no account, search and apply
          happen on your page" — and `#candidates` immediately below
          DEMONSTRATES all of it: step 01 is the search, step 02 is "the form
          is on the page, not behind a redirect" with chips reading No ATS
          redirect and No account to create, step 03 is registration. Its two
          remaining chips, anonymous apply and field-level encryption, are both
          made properly in `#security`.

          So the page was saying "no redirect, no account" three times over:
          as a problem in `#friction`, as a claim in `#payoff`, then as a step
          here. The claim was the one with no evidence attached, so it went.
          Stephen's call, and he was right — an accordion built for that band
          made the repetition worse rather than better, because it mirrored
          `#friction` deliberately. */}
      <MapBand />
      <Capabilities />
      <JobSearchSection />

      {/* The objection the demo above raises and cannot answer: they have just
          used it in OUR blue. §3 names employer brand consistency as a concern
          of the primary buyer. See `brand.tsx`. */}
      <BrandSection />

      {/* The only hard number the site has, immediately after the claim it
          proves, with the two quotes that prove the same thing. */}
      <Proof />

      {/* ACT THREE — what decides who arrives. Deliberately AFTER the payoff:
          Easy Apply converts the people who get there, and this is what
          decides whether they get there at all. */}
      <Story />
      <AiEnrichmentSection />
      <GoogleSection />
      <HowItWorks />

      {/* ACT FOUR — where the work lands. */}
      <DashboardSection />

      {/* ACT FIVE — the objections in §9's order, then the ask. The roadmap
          band was removed entirely on 2026-08-25 (Stephen's call). Google for
          Jobs came off it and shipped as its own band above; feed-level
          reporting came off the site altogether. */}
      <Integrations />
      <Security />
      <SiteFooter />
    </main>
  </>
);

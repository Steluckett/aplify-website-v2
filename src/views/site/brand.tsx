import { SectionIntro } from "@/components/ui/section-intro";
import { brandKit } from "@/data/content/brand-kit";

import { BrandKitDemo } from "./demos/brand-kit";

/**
 * The brand kit band.
 *
 * PLACEMENT IS ARGUED, NOT CHOSEN. It sits between `#job-search` and `#proof`
 * because that is where the objection actually lands: the reader has just used
 * the search and the apply flow in Aplify's own blue, and the next thought is
 * "yes, but it will look like them, not like us." §3 names employer brand
 * consistency as a concern of the PRIMARY buyer — the talent acquisition lead
 * the hero speaks to — and until now the page answered the other two concerns
 * in that sentence and ignored this one.
 *
 * The cost is one beat of delay before the 85%→30% payoff, which was worth it:
 * arriving at the number having already dealt with the objection is stronger
 * than arriving at it with the objection still open.
 *
 * BAND ORDER. ADR-0027 constrains this. `#proof` below is `band-white` with its
 * own deep card, and `#job-search` above closes on a deep panel, so this band
 * stays on the page ground and keeps its own colour INSIDE the preview rather
 * than painting the whole band. Three heavy blocks in a row would have flattened
 * all three. It also happens to be truer: a careers page is a light page with a
 * brand on it, not a brand-coloured slab.
 *
 * FULL HEIGHT, on `lg:` only. `min-h` rather than `h`, because the preview grows
 * with its own content and a hard height would either clip a brand or strand it
 * in space. On a phone it is simply as tall as it needs to be — a forced
 * viewport height there is a scroll trap, not an immersion.
 */
export const BrandSection = () => (
  <section
    id="brand"
    className="flex flex-col justify-center py-26 lg:min-h-svh"
  >
    <div className="shell">
      <SectionIntro
        eyebrow={brandKit.eyebrow}
        lines={[...brandKit.lines]}
        linesSm={[...brandKit.linesSm]}
        standfirst={brandKit.standfirst}
      />
      <BrandKitDemo className="mt-16" />
    </div>
  </section>
);

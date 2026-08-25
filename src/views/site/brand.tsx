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
 * A BENTO, not a full-bleed set piece. An earlier cut ran a wide example off
 * the foot of the band and let `#proof` crop it. That bleed is gone with the
 * layout that needed it: the phone is now cropped by its OWN card, so the band
 * has no reason to break the page's section rhythm. If you are reading a stale
 * note about `-mb` here, or wondering why `#proof` is `relative`, this is why —
 * nothing depends on either any more.
 *
 * The one card on the left spans two of three columns and holds the phone; the
 * three down the right are the control, the apply flow and the dashboard. That
 * split is the argument in miniature: one surface shown, two more asserted, and
 * the same brand kit behind all three.
 */
export const BrandSection = () => (
  <section id="brand" className="py-26">
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

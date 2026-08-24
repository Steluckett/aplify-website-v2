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
 * THE BLEED. The example runs on past the foot of this band and is cut by the
 * white of `#proof` below. Mechanically it is the same trick `MapBand` uses:
 * this section drops its bottom padding, the demo carries a negative bottom
 * margin so the next section starts before the picture ends, and `#proof` is
 * `relative` so its white background paints OVER the overflow. That last part
 * is the whole thing — in normal painting order a later sibling's background
 * goes down before an earlier sibling's in-flow content, so without the
 * positioning the example would sit on top of the white instead of under it.
 *
 * FULL HEIGHT on `lg:` only, and `min-h` rather than `h`: the example grows
 * with its own type scale, so a hard height would either clip a brand or
 * strand it. On a phone it is as tall as it needs to be — a forced viewport
 * height there is a scroll trap, not immersion.
 */
export const BrandSection = () => (
  /* NO `overflow-hidden` here, ever. It would clip the exact overflow the
     bleed depends on, and the failure looks like the negative margin simply
     not working. */
  <section
    id="brand"
    className="flex flex-col justify-center pt-26 pb-0 lg:min-h-svh"
  >
    <div className="shell">
      <SectionIntro
        eyebrow={brandKit.eyebrow}
        lines={[...brandKit.lines]}
        linesSm={[...brandKit.linesSm]}
        standfirst={brandKit.standfirst}
      />
      {/* The negative margin is what bleeds. Nothing may follow the demo in
          this section — a sibling after it gets dragged up over the example,
          which is why the §6.7 disclosure lives INSIDE the demo, under the
          slider, rather than here. */}
      <BrandKitDemo className="mt-14 -mb-16 lg:-mb-24" />
    </div>
  </section>
);

import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { dropOff, siteMap } from "@/data/content/site";

/**
 * Two statement bands. Both exist because the page was arguing without having
 * stated what it was arguing about.
 */

/**
 * The map, second on the page.
 *
 * §7 calls the structural claim "the sentence that makes the product legible in
 * one read" and asks for a prominent position for it. It had been a standfirst
 * inside the fourth section. A reader who has not yet been told that Aplify has
 * two halves reads the next six sections as one muddled thing — which is
 * exactly how the page was reading.
 *
 * The artwork carries the claim on its own: the mapping table on the left is
 * the half that never meets anybody, the phone on the right is the half that is
 * all anybody meets, and the person between them is why the sentence matters.
 * It arrives already framed — its own rounded card, its own white edge — so it
 * sits directly on the band with no `ScreenCard` around it. A browser bar here
 * would be a second frame arguing with the one already drawn.
 *
 * THE BLEED. The artwork runs on past the foot of its own band and is cut by
 * the white of the section below. Mechanically: this section drops its bottom
 * padding, the image carries a negative bottom margin so the next section
 * starts before the picture ends, and `#problem` is `relative` so that its
 * white background paints OVER the overflow. That last part is the whole
 * trick — in normal painting order a later sibling's background goes down
 * before an earlier sibling's in-flow content, so without the positioning the
 * image would sit on top of the white instead of under it.
 *
 * No caption. §6.7 requires one on every DEMO; this is a still image, and a
 * disclosure line under it would only interrupt the bleed it is not needed for.
 */
export const MapBand = () => (
  <section id="where-it-sits" className="pt-26 pb-0">
    <div className="shell">
      <SectionIntro
        eyebrow={siteMap.eyebrow}
        lines={[...siteMap.lines]}
        linesSm={[...siteMap.linesSm]}
        standfirst={siteMap.standfirst}
      />

      <Reveal variant="up">
        <Image
          src={siteMap.shot.src}
          alt={siteMap.shot.alt}
          width={siteMap.shot.w}
          height={siteMap.shot.h}
          sizes="(max-width: 1024px) 95vw, 1233px"
          className="mt-16 -mb-10 h-auto w-full lg:-mb-16"
          priority={false}
        />
      </Reveal>
    </div>
  </section>
);

/**
 * The second problem.
 *
 * The page named the feed problem and then answered a drop-off problem it had
 * never stated, so Easy Apply arrived as the answer to an unasked question.
 * This band asks it. It carries no statistic on purpose — see the note on
 * `dropOff` in the content module.
 */
export const DropOffBand = () => (
  <section id="drop-off" className="band-white py-26">
    <div className="shell">
      <SectionIntro
        eyebrow={dropOff.eyebrow}
        lines={[...dropOff.lines]}
        linesSm={[...dropOff.linesSm]}
        standfirst={dropOff.standfirst}
      />
    </div>
  </section>
);

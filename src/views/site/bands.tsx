import { SectionIntro } from "@/components/ui/section-intro";
import { dropOff, siteMap } from "@/data/content/site";

/**
 * Two statement bands — no demo, no cards, nothing to look at but the sentence.
 *
 * Both exist because the page was arguing without having stated what it was
 * arguing about. They are deliberately the shortest sections on the site: a
 * band that says one thing and stops is what gives the sections around it room
 * to say something bigger.
 */

/**
 * The map, second on the page.
 *
 * §7 calls the structural claim "the sentence that makes the product legible in
 * one read" and asks for a prominent position for it. It had been a standfirst
 * inside the fourth section. A reader who has not yet been told that Aplify has
 * two halves reads the next six sections as one muddled thing — which is
 * exactly how the page was reading.
 */
export const MapBand = () => (
  <section id="where-it-sits" className="py-26">
    <div className="shell">
      <SectionIntro
        eyebrow={siteMap.eyebrow}
        lines={[...siteMap.lines]}
        linesSm={[...siteMap.linesSm]}
        standfirst={siteMap.standfirst}
      />
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

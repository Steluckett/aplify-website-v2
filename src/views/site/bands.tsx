import { Reveal } from "@/components/ui/reveal";
import { ScreenCard } from "@/components/ui/screen-card";
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
 * WHY THE COMPOSITION IS WIDE AND SHORT. The hero closes on an 842px-tall
 * product shot and this band starts 468px later. A second tall composition here
 * reads as more of the same and stalls the top of the page, so the two panels
 * are set at 16/10 in a half-width column each: the whole thing is a band, not
 * a showcase. It should register as orientation and be over quickly.
 *
 * WHY THE SHARED RECORD SITS UNDERNEATH rather than between the panels. The
 * sentence says both halves "run off the same cleaned data" — that is a
 * foundation, not a join, and a strip beneath both panels is what a foundation
 * looks like. A spine between them would have said "these two are connected",
 * which is a weaker and slightly different claim.
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

      <div className="mt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {siteMap.halves.map((half, i) => (
            <Reveal key={half.label} variant="up" delay={i * 90}>
              <div>
                <p className="eyebrow">{half.label}</p>
                <ScreenCard
                  className="mt-5"
                  ground="wash"
                  ratio="16 / 10"
                  url={half.url}
                  placeholder={half.placeholder}
                />
                <p className="mt-5 text-body leading-[1.6] text-ink-body">
                  {half.caption}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* The foundation. A hairline the full width of both panels, with the
            record sitting ON it — so the two halves above are reading down
            into one thing rather than across at each other. */}
        <Reveal variant="up" delay={180}>
          <div className="mt-14 border-t border-border pt-10 text-center">
            {/* `.eyebrow` is inline-flex — it carries the accent dot as a
                ::before, so it sizes to its content and `text-center` on the
                element itself does nothing. The centring has to come from the
                parent, the same trap `TextEngine` has with its flex container
                (AGENTS.md rule 3). */}
            <p className="eyebrow">{siteMap.shared.label}</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {siteMap.shared.fields.map((field) => (
                <span key={field} className="chip bg-surface-raised">
                  {field}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <p className="mx-auto mt-10 max-w-[52rem] text-center text-xs text-ink-label">
          {siteMap.caption}
        </p>
      </div>
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

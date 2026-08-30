"use client";

import Image from "next/image";

import { IconChip } from "@/components/ui/icon-chip";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { friction, origin } from "@/data/content/site";

/**
 * Act one: the three bands that state the reader's problem before Aplify is
 * mentioned at all.
 *
 * The addendum's first rule is that a SaaS site's biggest mistake is
 * introducing itself too quickly, so the page now spends three bands on the
 * reader's week before it spends one on ours. These replace a single
 * `DropOffBand`, which stated the problem in one line and showed nothing.
 */

/* -------------------------------------------------------------------------
   Band 2 — why they leave
   ------------------------------------------------------------------------- */

/**
 * A picture panel. It carries NOTHING BUT THE PICTURE.
 *
 * Stephen, 2026-08-25: "The picture cards can just carry pictures - the other
 * cards tell the written story." An earlier build had two cells carrying a
 * heading, a paragraph AND a picture while the six around them carried two of
 * the three, and that unevenness is most of what made the bento read as messy.
 * Every cell now does exactly one job.
 *
 * TWO MODES, because the two pieces of artwork are different kinds of thing
 * and forcing one treatment on both would damage one of them:
 *
 *   plain: true    a straight photograph. No gradient — the picture IS the
 *                  panel, sized at its own ratio so nothing is cropped.
 *   plain: false   a transparent PNG over a blob ground, centred and
 *                  CONTAINED, because it arrives already composed and with
 *                  its own shadow.
 *
 * Both take `w`/`h` from the data rather than a ratio written here. That is
 * ADR-0027's rule and it earned its keep: the placeholder this replaced was
 * 5/2, and the photograph is 2244x1034, so a rounded ratio would have clipped
 * 87px off it.
 */
const ShotPanel = ({
  shot,
  className,
}: {
  shot: {
    src: string;
    alt: string;
    w: number;
    h: number;
    mode: "float" | "crop";
    ready: boolean;
    bg: string;
    /** Where the artwork's CONTENT centre sits relative to its canvas centre,
     *  as a share of that dimension. Positive is right / down. See the
     *  measured alpha boxes in `site.ts`. */
    contentOffsetXPct?: number;
    contentOffsetYPct?: number;
  };
  className?: string;
}) => (
  <div
    className={`grain bg-${shot.bg} relative overflow-hidden rounded-panel ${className ?? ""}`}
  >
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.w}
      height={shot.h}
      sizes={
        shot.mode === "float"
          ? "(max-width: 1024px) 92vw, 1200px"
          : "(max-width: 1024px) 100vw, 1000px"
      }
      /* CENTRE THE CONTENT, NOT THE CANVAS.
         Both pieces of artwork on this band are off-centre inside their own
         files — one horizontally, one vertically — so centring the file
         centres its empty margin too. The offsets are measured off each
         file's alpha channel and recorded in `site.ts`; folding them into the
         centring translate cancels them out.
         `float` artwork is centred on both axes; `crop` artwork only
         horizontally, because its vertical position comes from the negative
         `bottom` below. */
      style={{
        transform:
          shot.mode === "float"
            ? `translate(-${50 + (shot.contentOffsetXPct ?? 0)}%, -${50 + (shot.contentOffsetYPct ?? 0)}%)`
            : `translateX(-${50 + (shot.contentOffsetXPct ?? 0)}%)`,
      }}
      className={
        shot.mode === "float"
          ? /* FLOATS IN THE MIDDLE with air all round. The panel is sized so
               there is room for that air; see the ratios on the call sites. */
            "absolute left-1/2 top-1/2 w-[94%] max-w-none lg:w-[88%]"
          : /* PINNED BELOW THE PANEL'S FOOT so the artwork is cut by the
               bottom edge. `bottom` resolves against the panel's own height,
               so the cut stays the same share of the panel at every width —
               a width-and-top-offset version of this produced a 109px cut at
               1512 and a 54px GAP at 1257, because the panel's height comes
               from the card stack while its width scales. */
            "absolute bottom-[-13%] left-1/2 w-[106%] max-w-none"
      }
    />
  </div>
);

/**
 * A written cut. Heading, one paragraph, nothing else.
 *
 * THE HEADING IS `text-h3`, NOT `text-h4`. Stephen: "look at workables font
 * sizes in their boxes for their headings in the bento - much more
 * impactful." The reference runs card headings at roughly twice its body
 * size; ours were 24 over 18, which is 1.3 and reads as a bolded paragraph
 * rather than a title. 32 over 18 is 1.8, and `text-h3` is the ladder's
 * documented "card titles" step, so this reaches for an existing rung rather
 * than inventing a size.
 *
 * `card-quiet`, not `tile`: the band is `band-white` and a white card on a
 * white band has nothing to lift off.
 */
const Cut = ({
  cut,
  className,
}: {
  cut: (typeof friction.cuts)[number];
  className?: string;
}) => {
  const tint = "tint" in cut ? cut.tint : undefined;
  return (
    <article
      className={`${tint ? `pastel-${tint}` : "card-quiet"} flex h-full flex-col rounded-panel p-8 lg:p-10 ${className ?? ""}`}
    >
      {/* `.card-title` (600) and full-strength body ink.
          Stephen: "what font size do workable use in their cards? It's bigger
          than ours - i like theirs."

          Measured, the SIZES ARE IDENTICAL — 32px over 18px on both sites, at
          the same 1.1 and 1.6 leading. What makes the reference read bigger is
          three other things:

            weight     700 against our 550
            tracking   normal against our -0.035em
            body ink   rgb(15,22,30) against our rgb(74,81,92)

          So growing the type would have been the wrong fix. Weight and body
          ink move; TRACKING DOES NOT. -0.035em is the brand's and runs through
          every heading on the site.

          The weight lives in `.card-title` in globals, not here. It was
          `font-bold` on this band alone at first and Stephen caught it
          instantly — "feels heavier than everywhere else" — so it is now one
          definition shared by all seven card headings. 600 rather than the
          reference's 700 because Inter at -0.035em reads denser than Proxima
          at normal tracking. Contrast moved the safe way: body is 16.32:1 on
          `card-quiet`, 16.86:1 on the amber card. */}
      <h3 className="display card-title text-h3">{cut.title}</h3>
      <p className="mt-5 text-body leading-[1.6] text-ink">{cut.body}</p>

      {/* The mark, bottom right, pushed there by `mt-auto`.
          Stephen's call: "add an icon in to each text card bottom right - we
          wont feel the dead space as much then." The square card shape leaves
          air under the copy on purpose (the reference does the same), and this
          gives that air a reason to exist rather than reading as a card that
          ran out of things to say.

          NOT AN ARROW, which is what the reference uses. Its cards are links;
          ours are not, and an arrow pointing nowhere is a promise the page
          does not keep. Each mark is the specific thing that goes wrong in
          that cut instead. */}
      <div className="mt-auto flex justify-end pt-8">
        <IconChip name={cut.icon} />
      </div>
    </article>
  );
};

/**
 * The eight cuts.
 *
 * THIS IS THE THIRD BUILD OF THIS BAND, and the first two are worth recording
 * because the mistake was the same both times: reaching for a grid shape
 * instead of designing a composition.
 *
 *   Build 1 — a four-column bento with unequal cells, a two-row picture cell,
 *             big faded numerals and a full-width closer. "Messy."
 *   Build 2 — strict thirds and mirrored pairs, numerals gone. Tidier, but
 *             two pictures were slammed side by side in a row of their own,
 *             every card was a 1.83 letterbox, and it had no scroll journey.
 *             "It's not DESIGNED it's plonked without thought."
 *
 * Build 3 is drawn against the reference MEASURED rather than eyeballed
 * (workable.com, container 1202px, three 374px columns, 40px gap):
 *
 *   thirds            374 x 340 and 374 x 380   ratio 1.10 and 0.98
 *   halves            581 x 220                 ratio 2.64
 *   the big picture   788 x 606, 2 cols x 2 rows, ratio 1.30
 *
 * TWO THINGS THAT CHANGED THE WHOLE BAND.
 *
 * 1. THEIR CARDS ARE SQUARE BECAUSE THE ROW HEIGHT IS SET, not because the
 *    copy fills it — the grid literally declares `grid-template-rows: 380px`
 *    and the copy sits top-aligned with air beneath. That is why `SQUARE`
 *    below is a `min-h` and not more words. Stephen asked whether the body
 *    copy should grow to buy height; measuring says no. Their body is SMALL
 *    against a large heading, and inflating ours would fight the type ladder,
 *    where 24px is already `lead`'s job.
 *
 * 2. THE BIG PICTURE IS NEVER IN A PICTURE-ONLY ROW. It sits beside two
 *    stacked cards, so the eye reads down the text while the picture holds the
 *    other side. Build 2's two-pictures-in-a-row is the thing that killed the
 *    flow.
 *
 * ONE CARD SHAPE, SQUARE. The reference has two — square thirds and letterbox
 * halves — and this band used both until the last three cuts became a row of
 * three. Do not let a third drift back towards a letterbox: that is build 2,
 * and it is what made the band read as strips.
 *
 * The composition, on a twelve-column field at 40px (our own spec's
 * card gap, which build 2 also got wrong at 32):
 *
 *     ┌──────────────── the scene ────────────────┐   anchor picture, 12
 *     │ search   │ advert   │ redirect            │   thirds, square
 *     │ account  │                                │   4 + 8, the picture
 *     │ form     │      the sign-up wall          │   spanning both cards
 *     │ handset  │ dead end │ the silence         │   thirds, square
 *
 * Three rows of cards with one picture row above them and one picture set
 * INTO them. The band opens on a scene and closes on a complete row, which is
 * what stopped "The silence" reading as an afterthought — it was a full-width
 * orphan in build 1 and half of a closing pair in build 3.
 *
 * The pictures carry no captions, so ADJACENCY is the only thing labelling
 * them: the wall sits beside `account` and `form`. Reorder those two and the
 * picture stops making sense.
 *
 * NO NUMERALS. They implied a ranking these eight do not have, and they were
 * also the page's worst contrast at 1.73:1. Removing them fixed an
 * accessibility finding as a side effect of fixing a design one.
 *
 * Build 4 closed the band on a third row of three, and the third picture went
 * with it — "dont see the need for the last image". Build 5 replaced both
 * remaining placeholders with the real artwork.
 */

/**
 * Every card in this band is the square-ish shape.
 *
 * A FLOOR, NOT A FIXED HEIGHT, so copy can still grow past it. The reference
 * gets its square cards from an explicit `grid-template-rows: 380px` with the
 * copy top-aligned and air beneath; `min-h` does the same thing without
 * risking a clip if a line ever wraps differently.
 *
 * The reference also has a SECOND shape — letterbox halves at 2.64 — and this
 * band briefly used it. It went when the last three cuts became a row of
 * three. Bring it back if a halves row ever has a real reason to exist; do not
 * bring it back to add variety.
 */
const SQUARE = "lg:min-h-[25rem]";

export const Friction = () => {
  const { cuts, shots } = friction;
  const [search, advert, redirect, account, form, handset, deadEnd, silence] =
    cuts;

  return (
    <section id="friction" className="band-white py-26">
      <div className="shell">
        <SectionIntro
          eyebrow={friction.eyebrow}
          lines={[...friction.lines]}
          linesSm={[...friction.linesSm]}
          standfirst={friction.standfirst}
        />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* The scene, before eight cards of analysis. */}
          <Reveal variant="rise" className="lg:col-span-12">
            {/* SHALLOWER THAN THE PHOTOGRAPH IT REPLACED, which ran at its
                own 2.17. A single floating card needs less depth than a
                photograph did, and 12/5 puts 157px of ground above and below
                it at 1512 — enough to read as floating rather than as fitted.
                Squarer than about 2/1 and the card starts to look lost.

                THE PANEL GETS SHALLOWER AS THE SCREEN NARROWS, which is the
                opposite of the usual instinct. The artwork is a 3.73 letterbox
                card: on a narrow screen it can only get so wide, so a deep
                panel just banks empty ground above and below it. At 375 a 4/3
                panel left 97px of air over a 71px-tall card. 16/10 keeps the
                air proportionate.

                ⚠️ ITS SMALL PRINT DOES NOT SURVIVE A PHONE. At 375 the card
                renders about 330px wide, so "Step 14 of 150" reads at roughly
                19px but the field list under the bar is ~6px. The headline
                number is the point and it lands; the rest is texture there.
                If that is not good enough, the fix is a separate, taller crop
                of the card for small screens, not more scaling here. */}
            <ShotPanel
              shot={shots.frustrated}
              className="aspect-[16/10] sm:aspect-[2/1] lg:aspect-[12/5]"
            />
          </Reveal>

          {/* Thirds. */}
          {[search, advert, redirect].map((cut, i) => (
            <Reveal
              key={cut.key}
              variant="up"
              delay={i * 70}
              className="lg:col-span-4"
            >
              <Cut cut={cut} className={SQUARE} />
            </Reveal>
          ))}

          {/* The signature row: two stacked cards, one picture beside them.
              The picture takes its height from the STACK — grid items stretch,
              so it needs no ratio of its own at `lg` and cannot disagree with
              the column beside it. Below `lg` it has nothing to stretch
              against, so it falls back to a ratio. */}
          <Reveal variant="up" className="lg:col-span-4">
            {/* The stacked pair takes the SQUARE shape, not a third one.
                Measured, the reference's stacked cards are 374x291 and
                374x275 — ratios 1.29 and 1.36, which sit with its thirds
                (1.10) rather than with its halves (2.64). Letting these two go
                short is what left the picture beside them at 1.84 against the
                reference's 1.30: the picture's height comes from this stack,
                so a short stack is a flat picture. */}
            <div className="grid h-full gap-10">
              <Cut cut={account} className={SQUARE} />
              <Cut cut={form} className={SQUARE} />
            </div>
          </Reveal>
          <Reveal variant="up" delay={90} className="lg:col-span-8">
            {/* SQUARE below `lg`, not 4/3. The artwork is 1.08 and this panel
                takes its height from the card stack only at `lg` and up; below
                that it needs a ratio of its own, and a landscape one is too
                short for a square picture — measured at 375, a 4/3 panel
                clipped 30px off the TOP of the confirmation card while still
                cutting the phone at the foot. Square leaves the whole
                confirmation visible and keeps the bottom crop. */}
            <ShotPanel
              shot={shots.notFrustrated}
              className="aspect-square h-full lg:aspect-auto"
            />
          </Reveal>

          {/* Thirds again, closing the band on a full row rather than on a
              card-and-picture pair.

              There were two rows here: a letterbox pair (handset, dead end)
              and a closing pair of "The silence" beside a third picture.
              Stephen cut the picture, 2026-08-25 — "just put the last three
              cards in a row of 3" — and he is right on both counts. Three
              pictures in a band this size starts putting one next to every
              idea, which is how a bento turns back into a list, and closing on
              a complete row lands better than closing on a pair.

              It also means the band now has ONE card shape rather than two.
              That was not the plan — the reference runs square thirds and
              letterbox halves — but with eight cuts split 3 / 2 / 3 there is
              no honest place for a halves row, and inventing one to show off
              the second shape would be decoration. If a ninth and tenth cut
              ever appear, the letterbox row is the right home for them. */}
          {[handset, deadEnd, silence].map((cut, i) => (
            <Reveal
              key={cut.key}
              variant="up"
              delay={i * 70}
              className="lg:col-span-4"
            >
              <Cut cut={cut} className={SQUARE} />
            </Reveal>
          ))}

        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------
   Band 4 — why we built it
   ------------------------------------------------------------------------- */

/**
 * The hinge. Three bands of their pain, then the line that says it was ours
 * first, then the answer.
 *
 * GROUND 03, BLUSH, AND THE CHOICE IS ARGUED. It is the only warm ground in
 * the set of fifteen, and its own reference note says it is "useful to break a
 * run of cool sections". Nothing had ever broken one. The human moment on the
 * page gets the one warm surface on the page, and it arrives at the exact
 * point the argument turns from their problem to our answer.
 *
 * It has to be a LIGHT ground: Blush measures 1.07 against white, so white ink
 * on it is invisible, and 14.36 / 6.15 for heading and body ink. Dark ink
 * only. Do not "brighten" this to a deep ground without re-measuring — and
 * note the proof band is deliberately the page's only dark surface anyway.
 *
 * Nothing else lives in this band. The restraint is the design: after eight
 * cuts and an itemised bill, a band that is one sentence lands harder than
 * anything with cards in it would.
 */
/* NO BOX, 2026-08-30. Two treatments died here in one day: the Blush panel
   on a white mat ("plonked" — page tint → white band → box is three nested
   grounds), then a negative-margin interstitial that dissolved the band
   rhythm into one long grey run. The diagnosis both times was the BOX, not
   the white. So: a pure statement band — the One Sentence directly on the
   white, with Blush kept as an EDGELESS ATMOSPHERE behind the words (the
   house's own radial-blob language, minus the container). The hues are
   bg-03's own at half strength; ink contrast is untouched at these alphas.
   A scroll-animated ground shift was considered and rejected: the contrast
   system is measured against static grounds, and a moving ground passes
   ΔE-fragile surfaces through unverified intermediate states. */
export const Origin = () => (
  <section id="origin" className="band-white relative overflow-hidden py-32 lg:py-40">
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(46% 52% at 38% 42%, rgb(245 158 11 / 0.09), transparent 70%), radial-gradient(40% 48% at 66% 60%, rgb(236 72 153 / 0.07), transparent 70%)",
      }}
    />
    <div className="shell relative">
      <SectionIntro
        eyebrow={origin.eyebrow}
        lines={[...origin.lines]}
        linesSm={[...origin.linesSm]}
        standfirst={origin.standfirst}
      />
    </div>
  </section>
);

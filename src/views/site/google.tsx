"use client";

import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { google } from "@/data/content/site";

/**
 * Google for Jobs.
 *
 * NEW 2026-08-25. This is a status change as much as a new band: V2_HANDOVER
 * §1 had Google for Jobs under "Roadmap — not yet available", and Stephen
 * confirmed it is live and working with JSON-LD on every published job. §1 has
 * been amended and dated. A stale note calling this forthcoming predates that.
 *
 * THE COMPOSITION IS THE CLAIM. One cleaned record, two outputs: the job as a
 * person reads it, and the structured data a machine reads. Setting them side
 * by side says "the same clean data serves both" without a sentence having to
 * assert it, and it pays off the band above — clean data is what makes this
 * possible at all.
 *
 * WHY IT SHOWS OUR OUTPUT AND NOT GOOGLE'S PAGE. §6.4 forbids rendering
 * another company's product. A mocked-up Google results page would break that
 * and would also be the weaker idea: a picture of somebody else's search
 * results proves nothing about what we emit.
 *
 * ON THE JARGON RULE. Showing JSON-LD is evidence, not us talking in jargon —
 * the same move band 11 makes with raw ATS values in a monospaced register.
 * Two things keep it on the right side of that line and both are load bearing:
 * the labels either side are deliberately plain ("What a person reads" / "What
 * Google reads") and the block is kept to eight lines. A Head of Talent needs
 * to see THAT it exists and that it is automatic, not to read it. If this ever
 * grows to thirty lines it has become a different, worse section.
 *
 * `google.schema` is traceable field-for-field to `google.job`, the same
 * discipline §6.10 imposes on the AI rewrite. Edit one side, edit the other.
 *
 * THE COPY MUST NEVER PROMISE A RANKING. It says the job "carries the
 * structured data Google reads". Nobody controls Google's index, and a
 * placement promise is the one claim on this page a technical buyer could
 * falsify in a minute.
 */
export const GoogleSection = () => (
  <section id="google" className="py-26">
    <div className="shell">
      <SectionIntro
        eyebrow={google.eyebrow}
        lines={[...google.lines]}
        linesSm={[...google.linesSm]}
        standfirst={google.standfirst}
      />

      <div className="mt-16 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2">
        {/* The human half. White, and the dominant one of the pair by
            weight — the job is set at card scale while the schema beside it
            sits in fine monospace. If these ever read as equals, the section
            has become a technical section, which it is not. */}
        <Reveal variant="up">
          <article className="tile flex h-full flex-col rounded-panel p-8 lg:p-10">
            <p className="eyebrow">{google.humanLabel}</p>

            <h3 className="display card-title mt-8 text-h3">{google.job.title}</h3>
            <p className="mt-3 text-body font-medium text-ink-accent">
              {google.job.org}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              <li className="chip" data-tint="sky">
                {google.job.location}
              </li>
              <li className="chip">{google.job.salary}</li>
              <li className="chip">{google.job.contract}</li>
            </ul>

            <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 border-t border-hairline pt-6 text-ui-sm text-ink-label">
              <span>{google.job.posted}</span>
              <span>{google.job.closes}</span>
            </div>
          </article>
        </Reveal>

        {/* The machine half, on Forest. A deep ground is the honest setting
            for code and it makes the pair read as two different kinds of
            thing at a glance, which is the whole idea. Forest measures 5.19
            against white at its lightest pixel, which is the LOWEST ceiling
            of the three deep grounds used on this page — so it is the one
            with no room for faded ink.

            MEASURED, by modelling the gradient rather than asking the DOM
            (`getComputedStyle` cannot see a gradient, and reports the base,
            which is the flattering end):

              white at /80   3.97   FAILS AA for small text
              white at /90   4.59   passes
              white at 1.0   5.26   passes

            The eyebrow is 12px and the footnote is small, so both need the
            4.5 bar and neither can sit at /80. The eyebrow and the code are
            full white; the footnote is /90. Do not fade any of these to match
            the proof band, which can afford /80 only because Midnight
            measures 10.52. */}
        <Reveal variant="up" delay={90}>
          <article className="grain bg-09 flex h-full flex-col rounded-panel p-8 lg:p-10">
            <p className="eyebrow !text-white">{google.machineLabel}</p>

            {/* The mb guarantees air above the foot's divider — `mt-auto` on
                the foot collapses to zero once the code fills the card, which
                left the last line of JSON nearly touching the rule. */}
            <pre className="mb-8 mt-8 overflow-x-auto text-ui-sm leading-[1.9] text-ink-on-dark">
              <code>
                {google.schema.map((line) => (
                  <span key={line} className="block whitespace-pre">
                    {line}
                  </span>
                ))}
              </code>
            </pre>

            <p className="mt-auto border-t border-white/15 pt-6 text-ui-sm text-ink-on-dark/90">
              Written on publish, from the record on the left.
            </p>
          </article>
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* `.tile` (white), NOT `.card-quiet`. This band sits on the TINTED
            page ground, where card-quiet is #eef0f5 against #eff1f6 — ΔE 0.35,
            which is not "subtle", it is mathematically invisible. Caught in
            review: these three rendered as floating text with no card at all.
            card-quiet is only correct inside a white panel or on a white band,
            which is why the friction bento up the page can use it and this
            cannot. */}
        {google.points.map((point, i) => (
          <Reveal key={point.title} variant="up" delay={i * 80}>
            <article className="tile h-full rounded-panel p-8">
              <h3 className="display card-title text-h4">{point.title}</h3>
              <p className="mt-5 text-body leading-[1.6] text-ink-body">
                {point.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

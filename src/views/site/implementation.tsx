"use client";

import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { implementation } from "@/data/content/site";

/**
 * BAND — `#implementation`, "the receipts". Graduated from
 * /implementation-options on 2026-09-01; Stephen picked the bento over the
 * two-doorway cards and the engine diagram (both parked in that page's git
 * history if ever wanted back).
 *
 * THE ARGUMENT. The band answers "how does this get on our site?" before it
 * becomes a silent objection, framed engine-first: the plugin is a thin
 * client of the same API a bespoke build would use, so WordPress and
 * anything-else are one product with two doorways. It sits in act five
 * between #integrations (does it fit our ATS?) and #security (will IT
 * approve?), because that is exactly the question between those two.
 *
 * THE BENTO leads with the statement cell an IT reviewer cares about most —
 * no candidate data in the CMS — because it is the band's strongest true
 * sentence. The setup cell SHOWS the whole WordPress install as a rendered
 * two-field settings screen rather than claiming easiness; the API cell
 * shows four real endpoint paths as evidence, explicitly addressed "for
 * your developers" so the buyer knows that cell is not asking to be parsed
 * (the same whose-voice trick as the Google band's JSON). Claims provenance
 * lives on the content module in site.ts.
 *
 * GROUNDS. Statement bg-13 (deep magenta), setup bg-04 (vivid light — full
 * ink only), API bg-08 (deep blue); the routes cell is the one quiet white
 * card. Band is white; #security after it is white too, so a hairline and
 * margin do the separating, the how-it-works → dashboard pattern.
 */

/** The decorative two-field settings screen — the whole WordPress setup. */
const SettingsMini = () => (
  <div aria-hidden className="screen rounded-card bg-surface-raised p-5 shadow-lift">
    <div className="space-y-3">
      {implementation.setup.fields.map((f) => (
        <div key={f.label}>
          <p className="text-ui-2xs font-medium uppercase tracking-eyebrow text-ink-label">
            {f.label}
          </p>
          <div className="mt-1 rounded-card border border-hairline bg-white px-3 py-2 text-ui-sm text-ink">
            {f.value}
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between pt-1">
        <span className="text-ui-2xs text-ink-label">
          {implementation.setup.footNote}
        </span>
        <span className="rounded-pill bg-accent px-3 py-1.5 text-ui-2xs font-medium text-white">
          {implementation.setup.cta}
        </span>
      </div>
    </div>
  </div>
);

export const Implementation = () => (
  <section id="implementation" className="band-white py-26">
    <div className="shell">
      <SectionIntro
        eyebrow={implementation.eyebrow}
        lines={[...implementation.lines]}
        linesSm={[...implementation.linesSm]}
        standfirst={implementation.standfirst}
      />

      <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* The statement cell: the fact IT teams care about most. */}
        <Reveal variant="rise" className="lg:col-span-7">
          <div className="grain bg-13 flex h-full flex-col rounded-panel p-8 lg:p-10">
            <p className="eyebrow !text-white/80">
              {implementation.statement.eyebrow}
            </p>
            <h3 className="display mt-5 text-h2 text-white">
              {implementation.statement.title}
            </h3>
            <p className="mt-5 max-w-[34rem] text-body leading-[1.7] text-white/90">
              {implementation.statement.body}
            </p>
            <div className="mt-auto flex flex-wrap gap-2 pt-8">
              {implementation.statement.chips.map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* The setup cell: the whole WordPress install, shown not claimed. */}
        <Reveal variant="rise" delay={100} className="lg:col-span-5">
          <div className="grain bg-04 flex h-full flex-col rounded-panel p-8">
            <h3 className="display text-h3 text-ink-heading">
              {implementation.setup.title}
            </h3>
            <p className="mt-3 text-body leading-[1.6] text-ink">
              {implementation.setup.body}
            </p>
            <div className="mt-6">
              <SettingsMini />
            </div>
          </div>
        </Reveal>

        {/* The routes cell. */}
        <Reveal variant="up" delay={80} className="lg:col-span-5">
          <div className="card-quiet flex h-full flex-col rounded-panel p-8">
            <h3 className="display text-h3 text-ink-heading">
              {implementation.routes.title}
            </h3>
            <ul className="mt-5 space-y-4">
              {implementation.routes.items.map((r) => (
                <li key={r.title} className="border-l-2 border-accent pl-4">
                  <p className="text-ui-base font-medium text-ink">{r.title}</p>
                  <p className="mt-1 text-ui-sm leading-[1.6] text-ink-body">
                    {r.body}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-6 text-ui-sm leading-[1.6] text-ink-label">
              {implementation.routes.engineLine}
            </p>
          </div>
        </Reveal>

        {/* The API cell: the receipts, literally — and addressed, so the
            buyer knows this cell is not asking to be parsed. */}
        <Reveal variant="up" delay={160} className="lg:col-span-7">
          <div className="grain bg-08 flex h-full flex-col rounded-panel p-8">
            <h3 className="display text-h3 text-white">
              {implementation.api.title}
            </h3>
            <p className="mt-3 max-w-[32rem] text-body leading-[1.6] text-white/90">
              {implementation.api.body}
            </p>
            <div className="mt-6">
              <p className="mb-3 text-ui-2xs font-medium uppercase tracking-eyebrow text-white/60">
                {implementation.api.devLabel}
              </p>
              <ul className="space-y-2">
                {implementation.api.endpoints.map((e) => (
                  <li
                    key={e.path}
                    className="flex items-baseline gap-3 rounded-card bg-white/10 px-4 py-2.5"
                  >
                    <span className="w-11 shrink-0 text-ui-2xs font-semibold tracking-wide text-white/60">
                      {e.method}
                    </span>
                    <span className="min-w-0 break-all text-ui-sm text-white">
                      {e.path}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      {/* White band into white #security below — the hairline does the
          separating, the how-it-works → dashboard pattern. */}
      <div className="mt-24 border-t border-hairline" />
    </div>
  </section>
);

"use client";

import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { integrations, proof, proofQuotes, security } from "@/data/content/site";

/** Security — the pastel four, on white so the tints separate. */
export const Security = () => (
  <section id="security" className="band-white py-26">
    <div className="shell">
      <SectionIntro
        eyebrow={security.eyebrow}
        lines={security.lines}
        linesSm={security.linesSm}
        standfirst={security.standfirst}
      />
      <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4">
        {security.points.map((point, i) => (
          <Reveal key={point.title} variant="up" delay={i * 80}>
            <article
              className={`pastel-${point.ground} h-full rounded-panel p-8 lg:p-10`}
            >
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

/**
 * Integrations. A list, but set as a two-column rule-separated table rather
 * than bullets — the same information, with somewhere for the eye to rest.
 */
export const Integrations = () => (
  <section id="integrations" className="py-26">
    <div className="shell">
      <SectionIntro
        eyebrow={integrations.eyebrow}
        lines={integrations.lines}
        linesSm={integrations.linesSm}
        standfirst={integrations.standfirst}
      />
      <Reveal variant="up" className="mt-10">
        <p className="mx-auto max-w-[46rem] text-center text-body leading-[1.6] text-ink-body">
          {integrations.lead}
        </p>
      </Reveal>

      <Reveal variant="rise" className="mt-12">
        <ul className="tile grid grid-cols-1 gap-x-12 rounded-panel px-8 py-4 sm:grid-cols-2 lg:px-12">
          {integrations.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-5 border-b border-hairline py-6 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
            >
              <span className="icon-chip h-8 w-8" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-body text-ink-body">{item}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

/**
 * The proof, and the two quotes that prove the same thing.
 *
 * ONE FIGURE, on the page's only dark surface — ground 10, Midnight, and there
 * is exactly one of it. Do not add a second Midnight band; its whole force is
 * that nothing else on the page looks like it.
 *
 * Every faded white here is 80%, never 45%. Midnight is not flat: where its
 * three fields stack it lightens to #3650ab, and the 45% white that measured
 * 4.49:1 on the old solid navy measures 2.78:1 there. A blob ground breaks any
 * opacity that was tuned against a flat colour.
 *
 * THE QUOTES MOVED HERE ON 2026-08-25, and which two is not arbitrary. §5 is
 * explicit that the three are not interchangeable: Louise proves completion,
 * Sammi proves the candidate experience, Ben proves the dashboard is usable.
 * The page used to run all three as one grid under an "In their words"
 * heading, which is the weakest possible use of them — a wall of praise reads
 * as a wall of praise whichever quotes are in it, and Ben was sitting nine
 * bands away from the dashboard he is describing.
 *
 * Louise and Sammi are both about the act that has just finished arguing, so
 * they sit under the number that measures it. Ben is in `product.tsx`, beside
 * the dashboard. They are picked BY NAME in `site.ts`, so reordering the
 * approved array cannot silently swap them.
 *
 * The quote cards are `wash-soft`, a 10%-alpha gradient, which is why this
 * section has to stay `band-white`. On the tinted ground they wash out.
 */
export const Proof = () => (
  <section id="proof" className="band-white py-26">
    <div className="shell">
      <Reveal variant="rise">
        <div className="grain bg-10 rounded-panel px-8 py-20 text-center lg:py-28">
          <p className="eyebrow justify-center !text-white/80">
            {proof.eyebrow}
          </p>
          <p className="figure mt-8 text-[clamp(5rem,14vw,11rem)] text-white">
            {proof.figure}
            <span className="figure-unit !text-white/80">{proof.unit}</span>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-body">
            <span className="text-white/80 line-through">
              {proof.before.value} {proof.before.label}
            </span>
            <span aria-hidden className="h-px w-10 bg-white/25" />
            <span className="text-white">
              {proof.after.value} {proof.after.label}
            </span>
          </div>
          <p className="mt-10 text-xs text-white/80">{proof.client}</p>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {proofQuotes.map((q, i) => (
          <Reveal key={q.org} variant="up" delay={i * 90}>
            <figure className="wash-soft flex h-full flex-col rounded-panel p-8 lg:p-10">
              <blockquote className="text-lead leading-[1.5] text-ink-heading">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 border-t border-hairline pt-6">
                <span
                  className="icon-chip h-10 w-10 text-ui-sm font-medium"
                  aria-hidden
                >
                  {q.org.slice(0, 1)}
                </span>
                <span>
                  <span className="block text-ui-base font-medium text-ink">
                    {q.name}
                  </span>
                  <span className="block text-ui-sm text-ink-label">
                    {q.org}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

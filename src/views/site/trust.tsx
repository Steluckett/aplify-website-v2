"use client";

import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { integrations, security } from "@/data/content/site";

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

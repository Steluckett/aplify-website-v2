"use client";

import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { integrations, proof, roadmap, security, testimonials } from "@/data/content/site";

/** Security — the pastel four, on white so the tints separate. */
const Security = () => (
  <section id="security" className="band-white py-24 lg:py-32">
    <div className="shell">
      <SectionIntro
        eyebrow={security.eyebrow}
        lines={security.lines}
        linesSm={security.linesSm}
        standfirst={security.standfirst}
      />
      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {security.points.map((point, i) => (
          <Reveal key={point.title} variant="up" delay={i * 80}>
            <article className={`pastel-${point.ground} h-full rounded-panel p-8 lg:p-10`}>
              <h3 className="display text-h4">{point.title}</h3>
              <p className="mt-3 text-body leading-[1.6] text-ink-body">{point.body}</p>
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
const Integrations = () => (
  <section id="integrations" className="py-24 lg:py-32">
    <div className="shell">
      <SectionIntro
        eyebrow={integrations.eyebrow}
        lines={integrations.lines}
        linesSm={integrations.linesSm}
        standfirst={integrations.standfirst}
      />
      <Reveal variant="rise" className="mt-16">
        <ul className="tile grid grid-cols-1 gap-x-12 rounded-panel px-8 py-4 sm:grid-cols-2 lg:px-12">
          {integrations.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-4 border-b border-hairline py-5 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
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

/** Roadmap — three rows, quiet on purpose. It is a promise, not a feature. */
const Roadmap = () => (
  <section id="roadmap" className="band-white py-24 lg:py-32">
    <div className="shell">
      <SectionIntro
        eyebrow={roadmap.eyebrow}
        lines={roadmap.lines}
        standfirst={roadmap.standfirst}
      />
      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {roadmap.items.map((item, i) => (
          <Reveal key={item.when} variant="up" delay={i * 80}>
            <article className="h-full rounded-panel bg-surface-chip p-8">
              <p className="eyebrow">{item.when}</p>
              <p className="mt-4 text-body leading-[1.6] text-ink-body">{item.what}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/**
 * The proof. One figure, given the whole width and the page's only navy
 * surface — this is the dark moment, and there is exactly one.
 */
const Proof = () => (
  <section id="proof" className="py-24 lg:py-32">
    <div className="shell">
      <Reveal variant="rise">
        <div className="dark-moment px-8 py-20 text-center lg:py-28">
          <p className="eyebrow justify-center !text-white/55">{proof.eyebrow}</p>
          <p className="figure mt-8 text-[clamp(5rem,14vw,11rem)] text-white">
            {proof.figure}
            <span className="figure-unit !text-white/50">{proof.unit}</span>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-body">
            <span className="text-white/45 line-through">
              {proof.before.value} {proof.before.label}
            </span>
            <span aria-hidden className="h-px w-10 bg-white/25" />
            <span className="text-white">
              {proof.after.value} {proof.after.label}
            </span>
          </div>
          <p className="mt-10 text-xs text-white/45">{proof.client}</p>
        </div>
      </Reveal>
    </div>
  </section>
);

/**
 * Testimonials, inheriting the card language exactly — the quote set in the
 * display register at card scale, attribution quiet beneath a rule.
 */
const Testimonials = () => (
  <section id="testimonials" className="band-white py-24 lg:py-32">
    <div className="shell">
      <SectionIntro
        eyebrow={testimonials.eyebrow}
        lines={testimonials.lines}
        linesSm={testimonials.linesSm}
      />
      <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {testimonials.quotes.map((q, i) => (
          <Reveal key={q.org} variant="up" delay={i * 90}>
            <figure className="wash-soft flex h-full flex-col rounded-panel p-8 lg:p-10">
              <blockquote className="display text-h4 leading-[1.35] text-ink-heading">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 border-t border-hairline pt-6">
                <span className="icon-chip h-10 w-10 text-ui-sm font-medium" aria-hidden>
                  {q.org.slice(0, 1)}
                </span>
                <span>
                  <span className="block text-ui-base font-medium text-ink">{q.name}</span>
                  <span className="block text-ui-sm text-ink-label">{q.org}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const Trust = () => (
  <>
    <Security />
    <Integrations />
    <Roadmap />
    <Proof />
    <Testimonials />
  </>
);

"use client";

import { Inview } from "@/components/animation/springs/in-view";
import { SectionHead } from "@/components/ui/section-head";
import {
  integrationsContent,
  roadmapContent,
  securityContent,
} from "@/data/content/closing";

/**
 * Security & GDPR (§8.11) — a selling section, not a compliance footnote, but
 * rendered **quiet**: hairline fact columns rather than cards, so it reads as
 * substance without competing with the set pieces either side.
 */
export const Security = () => (
  <section
    id="security"
    aria-labelledby="security-heading"
    className="border-t border-hairline px-6 py-28 sm:px-10 lg:py-32"
  >
    <SectionHead
      eyebrow={securityContent.eyebrow}
      lines={["Candidate data,", "encrypted field by field"]}
      id="security-heading"
      standfirst={securityContent.standfirst}
    />

    <div className="mt-16 grid gap-x-16 gap-y-12 lg:grid-cols-2">
      {securityContent.columns.map((column, index) => (
        <Inview
          key={column.title}
          tag="div"
          mode="once"
          from={{ opacity: 0, filter: "blur(6px)" }}
          to={{ opacity: 1, filter: "blur(0px)" }}
          delayIn={index * 110}
          config={{ tension: 190, friction: 30 }}
        >
          <h3 className="text-h3 font-medium tracking-tight">{column.title}</h3>
          <ul className="mt-6">
            {column.facts.map((fact) => (
              <li
                key={fact}
                className="border-t border-hairline py-3.5 text-body leading-snug text-ink-muted"
              >
                {fact}
              </li>
            ))}
          </ul>
        </Inview>
      ))}
    </div>
  </section>
);

/**
 * Integrations (§8.12) — the WordPress plugin and the APIs. Quiet volume, and
 * the last thing before the roadmap and the proof.
 */
export const Integrations = () => (
  <section
    id="integrations"
    aria-labelledby="integrations-heading"
    className="border-t border-hairline px-6 py-28 sm:px-10 lg:py-32"
  >
    <SectionHead
      eyebrow={integrationsContent.eyebrow}
      lines={["Two ways to", "put it on your site"]}
      id="integrations-heading"
      standfirst={integrationsContent.standfirst}
    />

    <div className="mt-16 grid gap-x-16 gap-y-12 lg:grid-cols-2">
      {integrationsContent.halves.map((half, index) => (
        <Inview
          key={half.title}
          tag="article"
          mode="once"
          from={{ opacity: 0, filter: "blur(6px)" }}
          to={{ opacity: 1, filter: "blur(0px)" }}
          delayIn={index * 110}
          config={{ tension: 190, friction: 30 }}
        >
          <p className="eyebrow">{half.note}</p>
          <h3 className="mt-3 text-h3 font-medium tracking-tight">
            {half.title}
          </h3>
          <ul className="mt-6">
            {half.facts.map((fact) => (
              <li
                key={fact}
                className="border-t border-hairline py-3.5 text-body leading-snug text-ink-muted"
              >
                {fact}
              </li>
            ))}
          </ul>
        </Inview>
      ))}
    </div>
  </section>
);

/**
 * Roadmap (§8.13) — exactly the two items, and nothing else (§6.9). The
 * quietest thing on the page, which is the honest weight for "not yet built".
 */
export const Roadmap = () => (
  <section
    id="roadmap"
    aria-labelledby="roadmap-heading"
    className="border-t border-hairline px-6 py-24 sm:px-10"
  >
    <SectionHead
      eyebrow={roadmapContent.eyebrow}
      lines={["Being built next"]}
      id="roadmap-heading"
      standfirst={roadmapContent.standfirst}
      volume="quiet"
    />

    <div className="mt-12 grid gap-x-16 gap-y-8 sm:grid-cols-2">
      {roadmapContent.items.map((item, index) => (
        <Inview
          key={item.title}
          tag="article"
          mode="once"
          from={{ opacity: 0, filter: "blur(6px)" }}
          to={{ opacity: 1, filter: "blur(0px)" }}
          delayIn={index * 110}
          config={{ tension: 190, friction: 30 }}
          className="border-t border-dashed border-hairline-strong pt-5"
        >
          <p className="eyebrow">Not yet available</p>
          <h3 className="mt-3 text-h3 font-medium tracking-tight">
            {item.title}
          </h3>
          <p className="mt-2 text-body leading-relaxed text-ink-muted">
            {item.copy}
          </p>
        </Inview>
      ))}
    </div>
  </section>
);

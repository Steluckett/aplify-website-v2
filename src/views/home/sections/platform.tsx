"use client";

import { Inview } from "@/components/animation/springs/in-view";
import { ProductShot } from "@/components/ui/product-shot";
import { SectionHead } from "@/components/ui/section-head";
import { candidatesContent, platformContent } from "@/data/content/platform";

/**
 * "Where it sits" (§8.5) — the structural claim, and the first product shot
 * on the page.
 *
 * Quiet volume: the two halves are hairline lists, not cards competing with
 * the set pieces either side. What carries the section visually is slot A —
 * the search running on a client's own career site — because the claim being
 * made is *whose* site the candidate is on.
 */
export const Platform = () => (
  <section
    id="platform"
    aria-labelledby="platform-heading"
    className="border-t border-hairline px-6 py-28 sm:px-10 lg:py-36"
  >
    <SectionHead
      eyebrow={platformContent.eyebrow}
      lines={["Between your ATS", "and your candidates"]}
      id="platform-heading"
      standfirst={platformContent.standfirst}
    />

    <Inview
      tag="div"
      mode="once"
      from={{ opacity: 0, filter: "blur(10px)" }}
      to={{ opacity: 1, filter: "blur(0px)" }}
      config={{ tension: 170, friction: 30 }}
      className="mt-16"
    >
      <ProductShot
        frame="browser"
        slot="A"
        subject="Job search running on a client's own career site — grid view, filters open"
        url="yourcompany.co.uk/careers"
        className="mx-auto max-w-4xl"
      />
    </Inview>

    <div className="mt-20 grid gap-x-16 gap-y-12 lg:grid-cols-2">
      {platformContent.halves.map((half, index) => (
        <Inview
          key={half.id}
          tag="div"
          mode="once"
          from={{ opacity: 0, filter: "blur(6px)" }}
          to={{ opacity: 1, filter: "blur(0px)" }}
          delayIn={index * 110}
          config={{ tension: 190, friction: 30 }}
        >
          <p className="eyebrow">{half.label}</p>
          <h3 className="display mt-3 text-[2rem]">{half.title}</h3>
          <p className="mt-2 text-body text-ink-soft">{half.note}</p>

          <ul className="mt-8">
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

    {/* §8.7 compressed: the four candidate-facing capabilities as names only.
        Their fact lists duplicated the half above and are demonstrated live by
        the job-search section below, so the page states them once and moves. */}
    <Inview
      tag="div"
      mode="once"
      from={{ opacity: 0, filter: "blur(6px)" }}
      to={{ opacity: 1, filter: "blur(0px)" }}
      config={{ tension: 190, friction: 30 }}
      className="mt-24 border-t border-hairline pt-10"
    >
      <p className="eyebrow">{candidatesContent.eyebrow}</p>
      <ul className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {candidatesContent.strip.map((item, index) => (
          <li key={item.title}>
            <span className="text-caption text-ink-soft">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h4 className="mt-2 text-h3 font-medium tracking-tight">
              {item.title}
            </h4>
            <p className="mt-1.5 text-body leading-snug text-ink-muted">
              {item.blurb}
            </p>
          </li>
        ))}
      </ul>
    </Inview>
  </section>
);

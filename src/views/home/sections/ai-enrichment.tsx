"use client";

import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

import { Inview } from "@/components/animation/springs/in-view";
import { ProductShot } from "@/components/ui/product-shot";
import { SectionHead } from "@/components/ui/section-head";
import { aiRewriteContent, type RewriteJob } from "@/data/content/ai-rewrite";

/**
 * AI enrichment (§8.9) — a black inset block, and a working demo: the reader
 * triggers the rewrite and watches both adverts recompose. The guardrail
 * block sits directly under it, before anyone has to ask (§9.4).
 *
 * §6.10 holds for the content: every fact in each "after" is checkable
 * against its "before", and the caption says so.
 */
export const AiEnrichment = () => {
  const [rewritten, setRewritten] = useState(false);

  return (
    <section
      id="ai-enrichment"
      aria-labelledby="ai-enrichment-heading"
      className="border-t border-hairline px-6 py-28 sm:px-10 lg:py-36"
    >
      <SectionHead
        eyebrow={aiRewriteContent.eyebrow}
        lines={["Written for candidates,", "not for the file"]}
        id="ai-enrichment-heading"
        standfirst={aiRewriteContent.standfirst}
        volume="piece"
      />

      <Inview
        tag="div"
        mode="once"
        from={{ opacity: 0, filter: "blur(8px)" }}
        to={{ opacity: 1, filter: "blur(0px)" }}
        config={{ tension: 180, friction: 30 }}
        className="mt-16"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {aiRewriteContent.jobs.map((job, index) => (
            <RewriteCard
              key={job.afterTitle}
              job={job}
              rewritten={rewritten}
              delay={index * 350}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <button
            type="button"
            onClick={() => setRewritten((value) => !value)}
            className={`inline-flex items-center gap-2 rounded-pill px-7 py-3.5
                       text-body font-medium uppercase tracking-wide outline-none
                       focus-visible:ring-2 focus-visible:ring-brand-light ${
                         rewritten
                           ? "border border-hairline-strong text-ink hover:border-ink"
                           : "bg-paper text-paper-ink hover:bg-brand-light hover:text-white"
                       }`}
          >
            {rewritten
              ? aiRewriteContent.resetLabel
              : aiRewriteContent.actionLabel}
            <span aria-hidden>→</span>
          </button>
          <p className="max-w-md text-caption leading-relaxed text-ink-soft">
            {aiRewriteContent.caption}
          </p>
        </div>
      </Inview>

      {/* The guardrail — load-bearing copy (§6.8), heading weight on purpose. */}
      <Inview
        tag="aside"
        mode="once"
        aria-labelledby="ai-guardrail-heading"
        from={{ opacity: 0, filter: "blur(6px)" }}
        to={{ opacity: 1, filter: "blur(0px)" }}
        delayIn={200}
        config={{ tension: 190, friction: 26 }}
        className="mt-20 border-t border-hairline pt-12"
      >
        <h3
          id="ai-guardrail-heading"
          className="display text-[2.5rem]"
        >
          {aiRewriteContent.guardrail.heading}
        </h3>
        <div className="mt-6 grid max-w-5xl gap-6 lg:grid-cols-2 lg:gap-14">
          {aiRewriteContent.guardrail.lines.map((line) => (
            <p key={line} className="text-body leading-relaxed text-ink-muted">
              {line}
            </p>
          ))}
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {aiRewriteContent.capabilities.map((capability) => (
            <li
              key={capability}
              className="inline-flex items-center rounded-pill border
                         border-hairline px-4 py-2 text-caption font-medium text-ink-muted
                         uppercase tracking-wide"
            >
              {capability}
            </li>
          ))}
        </ul>
      </Inview>
    </section>
  );
};

interface RewriteCardProps {
  job: RewriteJob;
  rewritten: boolean;
  /** ms this card trails the first, so the rewrite reads as a batch. */
  delay: number;
}

/**
 * One advert, two states stacked in the same grid cell. The rewrite resolves
 * out of a blur — composed, not swapped — and the original returns the same
 * way. Both states stay in the DOM so the taller one sizes the card and
 * nothing jumps.
 */
const RewriteCard = ({ job, rewritten, delay }: RewriteCardProps) => {
  const beforeStyles = useSpring({
    opacity: rewritten ? 0 : 1,
    filter: rewritten ? "blur(8px)" : "blur(0px)",
    delay,
    config: { tension: 120, friction: 26 },
  });
  const afterStyles = useSpring({
    opacity: rewritten ? 1 : 0,
    filter: rewritten ? "blur(0px)" : "blur(8px)",
    delay: delay + 150,
    config: { tension: 120, friction: 26 },
  });

  return (
    <div className="grid rounded-card border border-hairline bg-surface">
      <animated.figure
        style={{
          ...beforeStyles,
          pointerEvents: rewritten ? "none" : "auto",
          gridArea: "1 / 1",
        }}
        aria-hidden={rewritten}
        className="flex flex-col p-6 sm:p-8"
      >
        <figcaption className="eyebrow">
          {aiRewriteContent.beforeLabel}
        </figcaption>
        <p className="mt-5 text-body leading-[1.7] text-ink-muted">
          {job.before}
        </p>
      </animated.figure>

      <animated.figure
        style={{
          ...afterStyles,
          pointerEvents: rewritten ? "auto" : "none",
          gridArea: "1 / 1",
        }}
        aria-hidden={!rewritten}
        className="flex flex-col p-6 sm:p-8"
      >
        <figcaption className="text-caption font-medium uppercase tracking-[0.22em] text-brand-light">
          {aiRewriteContent.afterLabel}
        </figcaption>
        <h4 className="display mt-5 text-[1.6rem]">
          {job.afterTitle}
        </h4>
        <p className="mt-3 text-body leading-relaxed text-ink-muted">
          {job.afterBody}
        </p>
        <p className="mt-4 text-body text-ink-soft">{job.afterMeta}</p>
      </animated.figure>
    </div>
  );
};

"use client";

import { useState } from "react";
import { animated, useSpring } from "@react-spring/web";

import { aiRewriteContent, type RewriteJob } from "@/data/content/ai-rewrite";

/**
 * AI enrichment, in the Aurora register.
 *
 * The INNER UI only — no section, no heading, no eyebrow. The caller supplies
 * the intro and the band; this is the thing the reader actually operates.
 *
 * The state machine is carried over unchanged from the previous build: one
 * boolean, two cards, both states stacked in the same grid cell so the taller
 * one sizes the card and nothing jumps when it flips. The rewrite resolves out
 * of a blur — composed, not swapped — and the second card trails the first so
 * the pair reads as one batch rather than two toggles.
 *
 * The composition is Aurora's own: the spectrum wash grounds the region, and
 * its content sits in a glass inset because the control row holds white pills
 * (a white inset would swallow them). The `data-ai` icon chip appears on the
 * rewritten output and nowhere else — it is the system's one mark for "a model
 * wrote this", and spending it on decoration would spend the signal.
 */

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
    <path
      d="M4 12h15m0 0l-5.5-5.5M19 12l-5.5 5.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** The raw feed: a document, untouched. */
const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
    <path
      d="M14 3H7.5A1.5 1.5 0 006 4.5v15A1.5 1.5 0 007.5 21h9a1.5 1.5 0 001.5-1.5V7l-4-4z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M14 3v4h4M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

/** The AI mark. Only ever inside an `.icon-chip[data-ai]`. */
const SparkIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
    <path
      d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"
      fill="currentColor"
    />
    <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" fill="currentColor" />
  </svg>
);

export interface AiRewriteDemoProps {
  className?: string;
}

export const AiRewriteDemo = ({ className }: AiRewriteDemoProps) => {
  const [rewritten, setRewritten] = useState(false);

  return (
    <div className={className}>
      {/* Wash + inset is law. Glass, not white — the control row is pills. */}
      <div className="wash wash-lg rounded-panel">
        <div className="inset-glass p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-2">
            {aiRewriteContent.jobs.map((job, index) => (
              <RewriteCard
                key={job.afterTitle}
                job={job}
                rewritten={rewritten}
                delay={index * 350}
              />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
            <button
              type="button"
              onClick={() => setRewritten((value) => !value)}
              className={`btn ${rewritten ? "btn-secondary" : "btn-primary"} px-5 py-2.5 text-ui-sm`}
            >
              {rewritten ? aiRewriteContent.resetLabel : aiRewriteContent.actionLabel}
              <ArrowIcon />
            </button>
            <p className="max-w-[34rem] flex-1 text-ui-xs leading-[1.6] text-ink-label">
              {aiRewriteContent.caption}
            </p>
          </div>

          <ul className="mt-4 flex flex-wrap gap-2">
            {aiRewriteContent.capabilities.map((capability) => (
              <li key={capability}>
                <span className="chip">{capability}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

interface RewriteCardProps {
  job: RewriteJob;
  rewritten: boolean;
  /** ms this card trails the first, so the rewrite reads as a batch. */
  delay: number;
}

/**
 * One advert, two states stacked in the same grid cell. Both stay in the DOM
 * so the taller one sizes the card; the hidden one is inert to pointers and
 * to assistive tech.
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

  /** "£28,500 – £34,000 · depending on experience · South West" — the region
   *  is the last part and takes the classification tint; the rest stay
   *  neutral, because a tint on every one of them would mean nothing. */
  const metaParts = job.afterMeta.split(" · ").filter(Boolean);

  return (
    <div className="tile grid">
      <animated.figure
        style={{
          ...beforeStyles,
          pointerEvents: rewritten ? "none" : "auto",
          gridArea: "1 / 1",
        }}
        aria-hidden={rewritten}
        className="flex flex-col p-5"
      >
        <figcaption className="flex items-center gap-3">
          <span className="icon-chip h-9 w-9">
            <DocumentIcon />
          </span>
          <span className="text-ui-2xs font-medium uppercase tracking-eyebrow text-ink-label">
            {aiRewriteContent.beforeLabel}
          </span>
        </figcaption>
        <p className="mt-4 text-ui-sm leading-[1.7] text-ink-label">{job.before}</p>
      </animated.figure>

      <animated.figure
        style={{
          ...afterStyles,
          pointerEvents: rewritten ? "auto" : "none",
          gridArea: "1 / 1",
        }}
        aria-hidden={!rewritten}
        className="flex flex-col p-5"
      >
        <figcaption className="flex items-center gap-3">
          <span className="icon-chip h-9 w-9" data-ai>
            <SparkIcon />
          </span>
          <span className="text-ui-2xs font-medium uppercase tracking-eyebrow text-ink-accent">
            {aiRewriteContent.afterLabel}
          </span>
        </figcaption>
        <h4 className="mt-4 text-ui-lg font-medium tracking-tight text-ink-heading">
          {job.afterTitle}
        </h4>
        <p className="mt-2 text-ui-base leading-[1.6] text-ink-body">{job.afterBody}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {metaParts.map((part, index) => (
            <li key={part}>
              <span
                className="chip"
                {...(index === metaParts.length - 1 && metaParts.length > 1
                  ? { "data-tint": "sky" }
                  : {})}
              >
                {part}
              </span>
            </li>
          ))}
        </ul>
      </animated.figure>
    </div>
  );
};

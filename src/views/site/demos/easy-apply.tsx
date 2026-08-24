"use client";

import { useId, useState, type CSSProperties } from "react";

import { Reveal } from "@/components/ui/reveal";
import { jobSearchContent } from "@/data/content/job-search";
import {
  FAMILY_PREQUAL,
  RIGHT_TO_WORK,
  type Job,
} from "@/data/content/job-data";

export interface EasyApplyDemoProps {
  job: Job;
  onClose: () => void;
  className?: string;
}

type Step = "prequal" | "gate" | "form" | "done";

/* --- Glyphs ---------------------------------------------------------------
   All decorative: every one of them sits beside text that already says the
   thing, so they are aria-hidden and carry no label. */

const DocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
    <path
      d="M14 3H7a1.5 1.5 0 00-1.5 1.5v15A1.5 1.5 0 007 21h10a1.5 1.5 0 001.5-1.5V7.5L14 3z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M13.8 3.2v4.4h4.4" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path
      d="M5 12.5l4.6 4.5L19 7.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M12 7.5v5.2"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
    <circle cx="12" cy="16.3" r="1.05" fill="currentColor" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
    <path
      d="M5 12h13m-5.5-5.5L18.5 12 12.5 17.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Easy Apply, end to end, in the place the job views occupied — never in an
 * overlay, because an overlay implies somewhere else and "no redirect" is the
 * entire claim. Pre-qualification → gate → short form → confirmation.
 *
 * The Aurora reading of it: the role sits on a white tile at the top so the
 * candidate never loses what they are applying for; each step's questions and
 * fields sit on a washed panel with a glass inset, because everything on them
 * is a white pill and a white inset would swallow them; progress is the thin
 * tally, never a fat bar.
 */
export const EasyApplyDemo = ({
  job,
  onClose,
  className,
}: EasyApplyDemoProps) => {
  const content = jobSearchContent;
  const questions = [RIGHT_TO_WORK, FAMILY_PREQUAL[job.family]].filter(Boolean);

  const [step, setStep] = useState<Step>("prequal");
  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  const allAnswered = questions.every(
    (_, index) => answers[index] !== undefined,
  );
  const allYes = questions.every((_, index) => answers[index] === true);

  const fieldId = useId();

  return (
    /* IMMERSIVE, not centred-and-narrow.
     *
     * The flow used to sit on a light grey floor in a max-w-2xl column, which
     * put the most important moment on the page — a candidate actually
     * applying — in the smallest space in the section. It now takes the same
     * deep ground the search does, so moving from the results into the form
     * feels like the same instrument rather than a different screen, and the
     * form itself is a wide white card on it: a sheet you fill in, with room
     * around it.
     *
     * The internals below are unchanged and still solved against white, which
     * is why the card is white rather than the flow being re-inked.
     */
    <div
      className={`screen grain bg-08 rounded-panel p-5 sm:p-7 lg:p-10 ${className ?? ""}`}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 rounded-panel bg-surface-raised p-6 shadow-lift sm:p-8 lg:p-10">
        {/* The role being applied for, and the way back. */}
        <div className="tile flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5">
          <div className="min-w-0">
            <h4 className="text-ui-xl font-medium tracking-tight text-ink-heading">
              {job.title}
            </h4>
            <p className="mt-1 text-ui-sm text-ink-label">
              {job.location} · {job.region} · {job.contract} · {job.salary}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary px-4 py-2 text-ui-sm"
          >
            <span aria-hidden>←</span>
            {content.prequal.backLabel}
          </button>
        </div>

        {step === "prequal" ? (
          <Reveal variant="fade">
            <div className="w-full py-2">
              <StepHeader label={content.prequal.stepLabel} fill="50%" />
              <p className="mt-4 text-ui-base leading-relaxed text-ink-body">
                {content.prequal.explainer}
              </p>

              <fieldset className="wash mt-6 rounded-card">
                <legend className="sr-only">Pre-qualification questions</legend>
                <div className="inset-glass flex flex-col gap-4 p-4 sm:p-5">
                  {questions.map((question, index) => (
                    <div
                      key={question}
                      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <p className="text-ui-base font-medium text-ink">
                        {question}
                      </p>
                      <div className="flex flex-none gap-2">
                        {[true, false].map((value) => {
                          const active = answers[index] === value;
                          return (
                            <button
                              key={String(value)}
                              type="button"
                              aria-pressed={active}
                              onClick={() =>
                                setAnswers((current) => ({
                                  ...current,
                                  [index]: value,
                                }))
                              }
                              className={`btn px-5 py-2 text-ui-sm ${
                                active ? "btn-primary" : "btn-secondary"
                              }`}
                            >
                              {value ? content.prequal.yes : content.prequal.no}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>

              <button
                type="button"
                disabled={!allAnswered}
                onClick={() => setStep(allYes ? "form" : "gate")}
                className="btn btn-primary mt-6 px-6 py-3 text-ui-base disabled:cursor-not-allowed
                         disabled:opacity-40 disabled:hover:[transform:none]"
              >
                {content.prequal.continueLabel}
                <ArrowIcon />
              </button>
            </div>
          </Reveal>
        ) : null}

        {step === "gate" ? (
          <Reveal variant="fade">
            <div className="mx-auto w-full max-w-2xl py-6 text-center">
              <p className="flex justify-center">
                <span
                  className="icon-chip h-12 w-12 bg-surface-raised shadow-sm"
                  aria-hidden
                >
                  <AlertIcon />
                </span>
              </p>
              <h5 className="mt-5 text-ui-xl font-medium tracking-tight text-ink-heading">
                {content.gate.heading}
              </h5>
              <p className="mt-3 text-ui-base leading-relaxed text-ink-body">
                {content.gate.body}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary mt-6 px-6 py-3 text-ui-base"
              >
                {content.gate.backLabel}
              </button>
            </div>
          </Reveal>
        ) : null}

        {step === "form" ? (
          <Reveal variant="fade">
            <form
              className="w-full py-2"
              onSubmit={(event) => {
                event.preventDefault();
                setStep("done");
              }}
            >
              <StepHeader label={content.form.stepLabel} fill="100%" />
              <p className="mt-4 text-ui-base leading-relaxed text-ink-body">
                {content.form.explainer}
              </p>

              <div className="wash mt-6 rounded-card">
                <div className="inset-glass flex flex-col gap-4 p-4 sm:p-5">
                  <DemoField
                    id={`${fieldId}-name`}
                    label={content.form.fields.name}
                    defaultValue={content.form.sample.name}
                  />
                  <DemoField
                    id={`${fieldId}-email`}
                    label={content.form.fields.email}
                    defaultValue={content.form.sample.email}
                    type="email"
                  />
                  <DemoField
                    id={`${fieldId}-phone`}
                    label={content.form.fields.phone}
                    defaultValue={content.form.sample.phone}
                  />

                  <div>
                    <p className="mb-2 text-ui-xs font-medium text-ink-label">
                      {content.form.fields.cv}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 rounded-pill bg-surface-raised px-3 py-2 shadow-sm">
                      <span className="icon-chip h-8 w-8" aria-hidden>
                        <DocIcon />
                      </span>
                      <span className="text-ui-sm font-medium text-ink">
                        {content.form.sample.cv}
                      </span>
                      <span className="ml-auto pr-2 text-ui-xs text-ink-label">
                        {content.form.fields.cvHint}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-6 px-6 py-3 text-ui-base"
              >
                {content.form.submitLabel}
                <ArrowIcon />
              </button>
              <p className="mt-3 text-ui-xs text-ink-label">
                {content.form.note}
              </p>
            </form>
          </Reveal>
        ) : null}

        {step === "done" ? (
          <Reveal variant="fade">
            <div className="mx-auto w-full max-w-2xl py-6 text-center">
              <p className="flex justify-center">
                <span
                  className="icon-chip h-12 w-12 bg-surface-raised shadow-sm"
                  aria-hidden
                >
                  <CheckIcon />
                </span>
              </p>
              <h5 className="mt-5 text-ui-xl font-medium tracking-tight text-ink-heading">
                {content.confirmation.heading}
              </h5>
              <p className="mt-3 text-ui-base leading-relaxed text-ink-body">
                {content.confirmation.body}
              </p>

              <div className="wash mt-6 rounded-card">
                <div className="inset-tile p-5 text-left">
                  <p className="text-ui-base leading-relaxed text-ink-body">
                    {content.confirmation.fork}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="btn btn-primary mt-6 px-6 py-3 text-ui-base"
              >
                {content.confirmation.backLabel}
              </button>
            </div>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
};

/**
 * A step's name and its progress. The tally is the system's progress mark —
 * thin bars, spectrum fill — and it is deliberately short here: it reports
 * where you are, it is not the thing being looked at.
 */
const StepHeader = ({ label, fill }: { label: string; fill: string }) => (
  <div className="flex flex-wrap items-center gap-4">
    <p className="eyebrow">{label}</p>
    <span
      className="tally h-2 w-24 flex-none rounded-pill"
      style={{ "--fill": fill } as CSSProperties}
      aria-hidden
    />
  </div>
);

interface DemoFieldProps {
  id: string;
  label: string;
  defaultValue: string;
  type?: string;
}

/** `autoComplete="off"` throughout, as in the original: a demonstration form
 *  should not be offering to fill itself from the reader's own address book. */
const DemoField = ({
  id,
  label,
  defaultValue,
  type = "text",
}: DemoFieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="mb-2 block text-ui-xs font-medium text-ink-label"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      defaultValue={defaultValue}
      autoComplete="off"
      className="field"
    />
  </div>
);

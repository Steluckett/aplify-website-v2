"use client";

import { useState } from "react";

import { jobSearchContent } from "@/data/content/job-search";
import {
  FAMILY_PREQUAL,
  RIGHT_TO_WORK,
  type Job,
} from "@/data/content/job-data";

export interface EasyApplyFlowProps {
  job: Job;
  onClose: () => void;
}

type Step = "prequal" | "gate" | "form" | "done";

/**
 * Easy Apply, end to end, in the place the job views occupied — never in an
 * overlay, because an overlay implies somewhere else and "no redirect" is the
 * entire claim (§11). Pre-qualification → gate → short form → confirmation,
 * with §8.8's copy at each step and the §2 destination fork named at the end.
 */
export const EasyApplyFlow = ({ job, onClose }: EasyApplyFlowProps) => {
  const content = jobSearchContent;
  const questions = [RIGHT_TO_WORK, FAMILY_PREQUAL[job.family]].filter(Boolean);

  const [step, setStep] = useState<Step>("prequal");
  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  const allAnswered = questions.every((_, index) => answers[index] !== undefined);
  const allYes = questions.every((_, index) => answers[index] === true);

  return (
    <div>
      {/* The role being applied for, and the way back. */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <h4 className="text-xl font-medium tracking-tight sm:text-2xl">
            {job.title}
          </h4>
          <p className="mt-1 text-body text-ink-soft">
            {job.location} · {job.region} · {job.contract} · {job.salary}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-pill bg-surface-raised px-4 py-2 text-caption font-medium
                     uppercase tracking-wide outline-none hover:bg-hairline
                     focus-visible:ring-2 focus-visible:ring-brand-light"
        >
          ← {content.prequal.backLabel}
        </button>
      </div>

      {step === "prequal" ? (
        <div className="mx-auto max-w-xl py-8">
          <p className="text-caption font-medium uppercase tracking-[0.22em] text-ink-soft">
            {content.prequal.stepLabel}
          </p>
          <p className="mt-3 text-body leading-relaxed">{content.prequal.explainer}</p>

          <fieldset className="mt-8 flex flex-col gap-6">
            <legend className="sr-only">Pre-qualification questions</legend>
            {questions.map((question, index) => (
              <div key={question}>
                <p className="text-base font-medium">{question}</p>
                <div className="mt-3 flex gap-2">
                  {[true, false].map((value) => {
                    const active = answers[index] === value;
                    return (
                      <button
                        key={String(value)}
                        type="button"
                        aria-pressed={active}
                        onClick={() =>
                          setAnswers((current) => ({ ...current, [index]: value }))
                        }
                        className={`rounded-pill px-6 py-2.5 text-caption font-medium
                                   uppercase tracking-wide outline-none
                                   focus-visible:ring-2 focus-visible:ring-brand-light ${
                                     active
                                       ? "bg-ink text-canvas"
                                       : "bg-surface-raised hover:bg-hairline"
                                   }`}
                      >
                        {value ? content.prequal.yes : content.prequal.no}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </fieldset>

          <button
            type="button"
            disabled={!allAnswered}
            onClick={() => setStep(allYes ? "form" : "gate")}
            className="mt-10 rounded-pill bg-ink px-7 py-3.5 text-body font-medium
                       uppercase tracking-wide text-canvas outline-none
                       hover:bg-brand focus-visible:ring-2
                       focus-visible:ring-brand-light disabled:cursor-not-allowed
                       disabled:opacity-40"
          >
            {content.prequal.continueLabel} →
          </button>
        </div>
      ) : null}

      {step === "gate" ? (
        <div className="mx-auto max-w-xl py-10 text-center">
          <h5 className="text-2xl font-medium tracking-tight sm:text-3xl">
            {content.gate.heading}
          </h5>
          <p className="mt-4 text-body leading-relaxed">{content.gate.body}</p>
          <button
            type="button"
            onClick={onClose}
            className="mt-8 rounded-pill bg-surface-raised px-7 py-3.5 text-body
                       font-medium uppercase tracking-wide outline-none
                       hover:bg-hairline focus-visible:ring-2
                       focus-visible:ring-brand-light"
          >
            {content.gate.backLabel}
          </button>
        </div>
      ) : null}

      {step === "form" ? (
        <form
          className="mx-auto max-w-xl py-8"
          onSubmit={(event) => {
            event.preventDefault();
            setStep("done");
          }}
        >
          <p className="text-caption font-medium uppercase tracking-[0.22em] text-ink-soft">
            {content.form.stepLabel}
          </p>
          <p className="mt-3 text-body leading-relaxed">{content.form.explainer}</p>

          <div className="mt-8 flex flex-col gap-5">
            <DemoField
              label={content.form.fields.name}
              defaultValue={content.form.sample.name}
            />
            <DemoField
              label={content.form.fields.email}
              defaultValue={content.form.sample.email}
              type="email"
            />
            <DemoField
              label={content.form.fields.phone}
              defaultValue={content.form.sample.phone}
            />
            <div>
              <span className="text-body font-medium">{content.form.fields.cv}</span>
              <div
                className="mt-2 flex flex-wrap items-center justify-between gap-2
                           rounded-card border border-dashed border-hairline-strong
                           bg-surface-raised px-4 py-3.5 text-body"
              >
                <span className="font-medium">{content.form.sample.cv}</span>
                <span className="text-caption text-ink-soft">
                  {content.form.fields.cvHint}
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-10 rounded-pill bg-ink px-7 py-3.5 text-body font-medium
                       uppercase tracking-wide text-canvas outline-none
                       hover:bg-brand focus-visible:ring-2
                       focus-visible:ring-brand-light"
          >
            {content.form.submitLabel} →
          </button>
          <p className="mt-4 text-caption text-ink-soft">{content.form.note}</p>
        </form>
      ) : null}

      {step === "done" ? (
        <div className="mx-auto max-w-xl py-10 text-center">
          <p
            aria-hidden
            className="mx-auto grid size-12 place-items-center rounded-pill
                       bg-brand text-xl text-canvas"
          >
            ✓
          </p>
          <h5 className="mt-6 text-2xl font-medium tracking-tight sm:text-3xl">
            {content.confirmation.heading}
          </h5>
          <p className="mt-4 text-body leading-relaxed">{content.confirmation.body}</p>
          <p className="mt-4 rounded-card bg-surface-raised p-5 text-left text-body leading-relaxed">
            {content.confirmation.fork}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-8 rounded-pill bg-ink px-7 py-3.5 text-body font-medium
                       uppercase tracking-wide text-canvas outline-none
                       hover:bg-brand focus-visible:ring-2
                       focus-visible:ring-brand-light"
          >
            {content.confirmation.backLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
};

const DemoField = ({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue: string;
  type?: string;
}) => (
  <label className="block">
    <span className="text-body font-medium">{label}</span>
    <input
      type={type}
      defaultValue={defaultValue}
      autoComplete="off"
      className="mt-2 w-full rounded-card border border-hairline bg-surface-raised
                 px-4 py-3.5 text-body outline-none focus-visible:border-brand"
    />
  </label>
);

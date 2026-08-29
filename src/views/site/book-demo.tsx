"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Spring } from "@/components/animation/springs/spring";
import { StackedLines } from "@/components/ui/stacked-lines";
import { bookDemo } from "@/data/content/book-demo";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";
import { useContactModal } from "@/hooks/use-contact-modal";

/**
 * The book-a-demo experience — a full-screen stepped enquiry flow, summoned
 * by every "Book a demo" button through `useContactModal` (the zustand store
 * built for exactly this and orphaned when the dark build was deleted).
 *
 * THE FORM PRACTISES WHAT THE SITE PREACHES. One question a screen, chunky
 * pill fields, sliders and chips instead of typing wherever the answer is a
 * range, no password, and a confirmation that mirrors Easy Apply's "That's
 * the whole application". If this form ever grows a field that hasn't earned
 * its place, it stops being an argument and starts being a contradiction.
 *
 * Motion is spring-based throughout (rule 1): the step content remounts
 * under a keyed `<Spring>`, and each question headline replays through
 * `StackedLines`. The overlay ground is 01, the soft light aurora, where
 * body ink is legal (5.69:1 worst point, modelled).
 *
 * SUBMISSION IS NOT WIRED YET — decision 2026-08-28, UI first. `submit()`
 * only advances to the confirmation, which carries an honest footnote saying
 * so (`bookDemo.done.unwired`). When the API route lands (rule 9:
 * server-side `app/api/**`, zod-validated, `{ data } / { error }`), replace
 * the body of `submit()` and delete that footnote.
 */

const TOTAL_STEPS = 5;

const EMAIL_RE = /^\S+@\S+\.\S+$/;

type Step = "intro" | "name" | "reach" | "volume" | "team" | "agenda" | "done";

const ORDER: Step[] = [
  "intro",
  "name",
  "reach",
  "volume",
  "team",
  "agenda",
  "done",
];

/** Progress fill per step. Endowed on purpose: step 1 already shows a sliver
    (n over TOTAL+1), because an empty bar under "Step 1 of 5" says you have
    achieved nothing by starting, and it only reads full once you truly are. */
const fillFor = (step: Step): string => {
  const n = ORDER.indexOf(step);
  if (step === "intro") return "0%";
  if (step === "done") return "100%";
  return `${Math.round((n / (TOTAL_STEPS + 1)) * 100)}%`;
};

const FIELD =
  "h-16 w-full rounded-pill bg-surface-raised px-7 text-lead text-ink shadow-sm placeholder:text-ink-label placeholder:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid";

/* The brand kit's thumb recipe, re-inked to the accent — one slider hand
   across the site. The track's fill is painted by an inline background so it
   follows the thumb. */
const SLIDER =
  "block h-3.5 w-full cursor-grab appearance-none rounded-pill focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid focus-visible:ring-offset-4 active:cursor-grabbing [&::-moz-range-thumb]:h-9 [&::-moz-range-thumb]:w-9 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-pill [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-accent-mid [&::-moz-range-thumb]:shadow-lift [&::-webkit-slider-thumb]:h-9 [&::-webkit-slider-thumb]:w-9 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-pill [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-accent-mid [&::-webkit-slider-thumb]:shadow-lift";

/**
 * A banded slider: the thumb snaps between labelled bands and the label IS
 * the readout, at display size. Bands rather than a number because nobody
 * knows their exact figure, and a slider you can be wrong about stops being
 * effortless (Stephen's pick, 2026-08-28).
 */
const BandSlider = ({
  value,
  onChange,
  bands,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  bands: readonly string[];
  label: string;
}) => {
  const pct = (value / (bands.length - 1)) * 100;
  return (
    <div>
      <p
        aria-live="polite"
        className="display min-h-[1.2em] text-h3 leading-display text-ink-heading sm:text-h2"
      >
        {bands[value]}
      </p>
      <input
        type="range"
        min={0}
        max={bands.length - 1}
        step={1}
        value={value}
        aria-label={label}
        aria-valuetext={bands[value]}
        onChange={(event) => onChange(Number(event.target.value))}
        className={`${SLIDER} mt-8`}
        style={{
          backgroundImage: "var(--accent-grad-x)",
          backgroundSize: `${pct}% 100%`,
          backgroundRepeat: "no-repeat",
          backgroundColor: "var(--track)",
        }}
      />
    </div>
  );
};

export interface Enquiry {
  name: string;
  email: string;
  organisation: string;
  hiresBand: number;
  teamBand: number;
  topics: string[];
  ats: string;
}

export const BookDemoOverlay = () => {
  const { isOpen, close } = useContactModal();
  const [step, setStep] = useState<Step>("intro");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [hiresBand, setHiresBand] = useState(1);
  const [teamBand, setTeamBand] = useState(1);
  const [topics, setTopics] = useState<string[]>([]);
  const [ats, setAts] = useState("");
  const [error, setError] = useState<string | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const errorId = useId();

  const content = bookDemo;
  const stepIndex = ORDER.indexOf(step);

  const go = useCallback((next: Step) => {
    setError(null);
    setStep(next);
  }, []);

  /* Not wired yet — see the file comment. The answers object is assembled so
     the eventual API call is a one-line change. */
  const submit = () => {
    const enquiry: Enquiry = {
      name,
      email,
      organisation,
      hiresBand,
      teamBand,
      topics,
      ats,
    };
    void enquiry;
    go("done");
  };

  const stopScroll = useScroll((s) => s.stop);
  const startScroll = useScroll((s) => s.start);

  /* The overlay stays MOUNTED while closed (it returns null), so without
     this a reopen resumed wherever the last visit ended — including the
     confirmation screen. Answers are kept deliberately; the journey
     restarts. */
  useEffect(() => {
    if (isOpen) {
      setStep("intro");
      setError(null);
    }
  }, [isOpen]);

  /* Scroll lock + Lenis halt while open — the cookie modal's own pattern,
     so the page cannot creep under the overlay. */
  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflow = "hidden";
    stopScroll();
    return () => {
      document.documentElement.style.overflow = "";
      startScroll();
    };
  }, [isOpen, stopScroll, startScroll]);

  /* Esc closes; Tab stays inside — a dialog that leaks focus to the page
     behind it is not a dialog. */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const root = overlayRef.current;
      if (!root) return;
      const focusables = [
        ...root.querySelectorAll<HTMLElement>(
          'button, input, [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => !el.hasAttribute("disabled"));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  /* Each step leads with its own field. */
  useEffect(() => {
    if (!isOpen) return;
    const id = window.setTimeout(() => {
      overlayRef.current
        ?.querySelector<HTMLElement>("[data-autofocus]")
        ?.focus();
    }, 60);
    return () => window.clearTimeout(id);
  }, [isOpen, step]);

  if (!isOpen) return null;

  const firstName = name.trim().split(/\s+/)[0] || name.trim();

  const advance = () => {
    if (step === "name") {
      if (!name.trim()) return setError(content.name.error);
      return go("reach");
    }
    if (step === "reach") {
      if (!EMAIL_RE.test(email.trim()))
        return setError(content.reach.emailError);
      if (!organisation.trim()) return setError(content.reach.orgError);
      return go("volume");
    }
    if (step === "volume") return go("team");
    if (step === "team") return go("agenda");
    if (step === "agenda") return submit();
  };

  /* From the first question, Back returns to the intro rather than dying. */
  const back = () => {
    if (stepIndex > 0) go(ORDER[stepIndex - 1]);
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={content.ariaLabel}
      data-lenis-prevent
      className="grain bg-01 fixed inset-0 z-[60] overflow-y-auto overscroll-contain"
    >
      <div className="shell flex min-h-full flex-col py-6 sm:py-8">
        {/* Chrome: progress on the left, the way out on the right. */}
        <div className="flex items-center justify-between gap-6">
          <div className="w-full max-w-[16rem]">
            <div
              className="tally"
              style={{ "--fill": fillFor(step) } as React.CSSProperties}
            />
            <p className="mt-2 text-sm text-ink-body" aria-live="polite">
              {step === "intro" || step === "done"
                ? step === "done"
                  ? content.progress.done
                  : " "
                : content.progress.step
                    .replace("{n}", String(stepIndex))
                    .replace("{total}", String(TOTAL_STEPS))}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={content.close}
            className="grid h-12 w-12 flex-none place-items-center rounded-pill bg-surface-raised text-ink shadow-sm transition-transform duration-[var(--duration-fast)] ease-entrance hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* The step. Keyed remount = the spring replays, and StackedLines
            replays with it, so every question arrives rather than swaps. */}
        <div className="flex flex-1 items-center py-12">
          <Spring
            key={step}
            from={{ opacity: 0, transform: "translate3d(0,28px,0)" }}
            to={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            config={{ tension: 190, friction: 26 }}
            className="mx-auto w-full max-w-[44rem]"
          >
            {step === "intro" ? (
              <div className="text-center">
                <p className="eyebrow">{content.intro.eyebrow}</p>
                {/* `justify-center` on every line — TextEngine's container is
                    flex, so `text-center` alone cannot centre it (rule 3). */}
                <StackedLines
                  tag="h2"
                  lines={[...content.intro.lines]}
                  className="display lines-tight mt-6 hidden text-center text-h1 text-ink-heading sm:block"
                  lineClassName="justify-center"
                  lineClassNames={["", "grad-tip"]}
                />
                <StackedLines
                  tag="h2"
                  lines={[...content.intro.linesSm]}
                  className="display lines-tight mt-6 text-center text-h2 text-ink-heading sm:hidden"
                  lineClassName="justify-center"
                  lineClassNames={["", "", "grad-tip"]}
                />
                <p className="mx-auto mt-7 max-w-[34rem] text-lead leading-[1.6] text-ink-body">
                  {content.intro.standfirst}
                </p>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => go("name")}
                  className="btn btn-primary btn-lg mt-10"
                >
                  {content.intro.start}
                </button>
              </div>
            ) : step === "done" ? (
              <div className="text-center">
                <StackedLines
                  tag="h2"
                  lines={[...content.done.lines]}
                  className="display lines-tight text-center text-h1 text-ink-heading"
                  lineClassName="justify-center"
                  lineClassNames={["", "grad-tip"]}
                />
                <p className="mx-auto mt-7 max-w-[34rem] text-lead leading-[1.6] text-ink-body">
                  {content.done.body.replace("{name}", firstName)}
                </p>
                {/* ⚠️ Honest until the API route exists — see file comment. */}
                <p className="mx-auto mt-6 max-w-[34rem] text-sm leading-relaxed text-ink-label">
                  {content.done.unwired}
                </p>
                <button
                  type="button"
                  data-autofocus
                  onClick={close}
                  className="btn btn-primary mt-10"
                >
                  {content.done.closeLabel}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  advance();
                }}
                noValidate
              >
                <StackedLines
                  tag="h2"
                  lines={[...content[step].question]}
                  className="display lines-tight text-h2 text-ink-heading sm:text-h1"
                />

                {step === "name" ? (
                  <div className="mt-10">
                    <input
                      type="text"
                      value={name}
                      data-autofocus
                      autoComplete="name"
                      onChange={(event) => setName(event.target.value)}
                      placeholder={content.name.placeholder}
                      aria-label={content.name.placeholder}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? errorId : undefined}
                      className={FIELD}
                    />
                  </div>
                ) : null}

                {step === "reach" ? (
                  <div className="mt-10 flex flex-col gap-4">
                    <input
                      type="email"
                      value={email}
                      data-autofocus
                      autoComplete="email"
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={content.reach.emailPlaceholder}
                      aria-label={content.reach.emailLabel}
                      aria-invalid={error === content.reach.emailError}
                      aria-describedby={error ? errorId : undefined}
                      className={FIELD}
                    />
                    <input
                      type="text"
                      value={organisation}
                      autoComplete="organization"
                      onChange={(event) => setOrganisation(event.target.value)}
                      placeholder={content.reach.orgPlaceholder}
                      aria-label={content.reach.orgLabel}
                      aria-invalid={error === content.reach.orgError}
                      className={FIELD}
                    />
                  </div>
                ) : null}

                {step === "volume" ? (
                  <div className="mt-10">
                    <p className="text-body text-ink-body">
                      {content.volume.hint}
                    </p>
                    <div className="mt-8">
                      <BandSlider
                        value={hiresBand}
                        onChange={setHiresBand}
                        bands={content.volume.bands}
                        label={content.volume.sliderLabel}
                      />
                    </div>
                  </div>
                ) : null}

                {step === "team" ? (
                  <div className="mt-10">
                    <p className="text-body text-ink-body">
                      {content.team.hint}
                    </p>
                    <div className="mt-8">
                      <BandSlider
                        value={teamBand}
                        onChange={setTeamBand}
                        bands={content.team.bands}
                        label={content.team.sliderLabel}
                      />
                    </div>
                  </div>
                ) : null}

                {step === "agenda" ? (
                  <div className="mt-10">
                    <p className="text-body text-ink-body">
                      {content.agenda.hint}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {content.agenda.topics.map((topic) => {
                        const on = topics.includes(topic);
                        return (
                          <button
                            key={topic}
                            type="button"
                            aria-pressed={on}
                            onClick={() =>
                              setTopics((current) =>
                                on
                                  ? current.filter((t) => t !== topic)
                                  : [...current, topic],
                              )
                            }
                            className={`rounded-pill px-6 py-3.5 text-body font-medium transition-colors duration-[var(--duration-fast)] ease-entrance focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid ${
                              on
                                ? "btn-primary"
                                : "bg-surface-raised text-ink shadow-sm hover:shadow-tile"
                            }`}
                          >
                            {topic}
                          </button>
                        );
                      })}
                    </div>
                    <label
                      className="mt-8 block text-sm text-ink-body"
                      htmlFor="bd-ats"
                    >
                      {content.agenda.atsLabel}
                    </label>
                    {/* Free text on purpose — §6.3: Eploy is the only
                        third-party product NAMED anywhere. A dropdown of ATS
                        vendors would name a dozen. */}
                    <input
                      id="bd-ats"
                      type="text"
                      value={ats}
                      onChange={(event) => setAts(event.target.value)}
                      placeholder={content.agenda.atsPlaceholder}
                      className={`${FIELD} mt-2`}
                    />
                  </div>
                ) : null}

                {error ? (
                  <p
                    id={errorId}
                    role="alert"
                    className="mt-4 text-body font-medium text-danger"
                  >
                    {error}
                  </p>
                ) : null}

                <div className="mt-10 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={back}
                    className="btn btn-secondary"
                  >
                    {content.nav.back}
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {step === "agenda"
                      ? content.agenda.submit
                      : content.nav.next}
                  </button>
                </div>
              </form>
            )}
          </Spring>
        </div>
      </div>
    </div>
  );
};

"use client";

import {
  animated,
  easings,
  to as springTo,
  useSpring,
  useTransition,
} from "@react-spring/web";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { Spring } from "@/components/animation/springs/spring";
import { CtaButton } from "@/components/ui/cta-button";
import { StackedLines } from "@/components/ui/stacked-lines";
import { bookDemo } from "@/data/content/book-demo";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";
import { useContactModal } from "@/hooks/use-contact-modal";

/**
 * The book-a-demo experience — a full-screen stepped enquiry flow, summoned
 * by every "Book a demo" button through `useContactModal`. See ADR-0033 for
 * the shape and the launch flags.
 *
 * THE FORM PRACTISES WHAT THE SITE PREACHES: one question a screen, chunky
 * pill fields, sliders and chips instead of typing, no password, and a
 * confirmation that celebrates rather than confirms.
 *
 * MOTION IS THE POINT OF THIS FILE (Stephen, 2026-08-28: "the form should
 * flow"), and all of it is spring-driven per rule 1 — `useTransition` and
 * `useSpring` directly, the same way the dashboard's slide-overs do it:
 *
 *   - The overlay itself FADES up rather than banging on: a transition on
 *     `isOpen` with a soft leave, so closing dissolves too.
 *   - Steps flow OUT then IN (`exitBeforeEnter`): the old screen slides up
 *     and fades, then the new one arrives from below.
 *   - Within a step, elements CASCADE: headline first, then the controls,
 *     then the buttons, each on its own `delayIn`.
 *   - Focused fields wear a pulsing conic GLOW (`--accent-glow`, the blob
 *     grounds' own hue family) instead of the default blue ring — the pulse
 *     is a looped spring, not a CSS keyframe.
 *   - The confirmation draws its tick: halo, then a popped disc, then the
 *     stroke itself, each a sprung stage.
 *
 * SUBMISSION IS STILL NOT WIRED. The honest footnote was removed on
 * Stephen's call — see the content module's warning: wire the API route
 * before this page is promoted.
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

/* No focus ring — the glow wrapper is the focus treatment. */
const FIELD =
  "h-16 w-full rounded-pill bg-surface-raised px-7 text-lead text-ink shadow-sm placeholder:text-ink-label placeholder:opacity-100 focus:outline-none";

/* The brand kit's thumb recipe, re-inked to the accent — one slider hand
   across the site. The track's fill is painted by an inline background so it
   follows the thumb. */
const SLIDER =
  "block h-3.5 w-full cursor-grab appearance-none rounded-pill focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid focus-visible:ring-offset-4 active:cursor-grabbing [&::-moz-range-thumb]:h-9 [&::-moz-range-thumb]:w-9 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-pill [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-accent-mid [&::-moz-range-thumb]:shadow-lift [&::-webkit-slider-thumb]:h-9 [&::-webkit-slider-thumb]:w-9 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-pill [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-accent-mid [&::-webkit-slider-thumb]:shadow-lift";

/** One element of a step's cascade — enters from below after `delay` ms. */
const FlowIn = ({
  delay,
  className,
  children,
}: {
  delay: number;
  className?: string;
  children: ReactNode;
}) => (
  <Spring
    delayIn={delay}
    from={{ opacity: 0, transform: "translate3d(0,14px,0)" }}
    to={{ opacity: 1, transform: "translate3d(0,0,0)" }}
    config={{ tension: 210, friction: 26 }}
    className={className}
  >
    {children}
  </Spring>
);

/**
 * The focus treatment: a blurred conic gradient halo behind the field,
 * fading in on focus and breathing while it holds — a glow, nothing else.
 * There was a hairline gradient ring at the field's edge too; it went on
 * Stephen's call (2026-08-28) — the halo alone is softer, and softness is
 * the brief. The pulse is a looped, paused spring. `onFocus`/`onBlur` are
 * React's focusin/focusout, so the wrapper hears its child input.
 */
const GlowField = ({ children }: { children: ReactNode }) => {
  const [focused, setFocused] = useState(false);
  const fade = useSpring({
    opacity: focused ? 1 : 0,
    config: { tension: 150, friction: 24 },
  });
  /* Peaks well under half strength — Stephen's call (2026-08-28): the glow
     should be felt more than seen. The breathing range stays narrow so the
     pulse reads as life, not as blinking. */
  const pulse = useSpring({
    loop: true,
    pause: !focused,
    from: { p: 0.26 },
    to: [{ p: 0.42 }, { p: 0.26 }],
    config: { duration: 1400, easing: easings.easeInOutSine },
  });
  return (
    <div
      className="relative"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <animated.div
        aria-hidden
        className="pointer-events-none absolute -inset-1.5 rounded-pill blur-lg"
        style={{
          background: "var(--accent-glow)",
          opacity: springTo([fade.opacity, pulse.p], (o, p) => o * p),
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

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

/**
 * The confirmation's tick, drawn in three sprung stages: the soft halo
 * arrives, the disc pops with an overshoot, then the stroke draws itself.
 * State colour, legitimately — this is the one success moment on the site.
 */
const SuccessTick = () => {
  const halo = useSpring({
    from: { s: 0.4, o: 0 },
    to: { s: 1, o: 1 },
    config: { tension: 160, friction: 26 },
    delay: 120,
  });
  const disc = useSpring({
    from: { s: 0.2, o: 0 },
    to: { s: 1, o: 1 },
    config: { tension: 340, friction: 15 },
    delay: 320,
  });
  const TICK = 60;
  const draw = useSpring({
    from: { off: TICK },
    to: { off: 0 },
    config: { tension: 190, friction: 26 },
    delay: 560,
  });
  return (
    <svg viewBox="0 0 120 120" className="mx-auto h-24 w-24 sm:h-28 sm:w-28" aria-hidden>
      {/* `var(--success)` inline rather than a `fill-success` utility: the
          token is new, and a dev server that has not re-scanned emits no rule
          for it — the class then falls back to SVG's initial black fill, the
          unbound-token trap in a new coat. The var resolves at runtime
          regardless of the scanner. */}
      <animated.circle
        cx="60"
        cy="60"
        r="57"
        style={{
          fill: "var(--success)",
          transformOrigin: "60px 60px",
          opacity: halo.o.to((o) => o * 0.16),
          transform: halo.s.to((s) => `scale(${s})`),
        }}
      />
      <animated.circle
        cx="60"
        cy="60"
        r="34"
        style={{
          fill: "var(--success)",
          transformOrigin: "60px 60px",
          opacity: disc.o,
          transform: disc.s.to((s) => `scale(${s})`),
        }}
      />
      <animated.path
        d="M46 61.5l9.5 9.5L74 51"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={TICK}
        style={{ strokeDashoffset: draw.off }}
      />
    </svg>
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

  /* The overlay stays MOUNTED while closed, so without this a reopen resumed
     wherever the last visit ended — including the confirmation screen.
     Answers are kept deliberately; the journey restarts. */
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

  /* Each step leads with its own field. The delay waits out the previous
     step's exit (exitBeforeEnter) so the target exists before we reach for
     it. */
  useEffect(() => {
    if (!isOpen) return;
    const id = window.setTimeout(() => {
      overlayRef.current
        ?.querySelector<HTMLElement>("[data-autofocus]")
        ?.focus({ preventScroll: true });
    }, 480);
    return () => window.clearTimeout(id);
  }, [isOpen, step]);

  /* The container dissolves in and out rather than banging on. */
  const overlayT = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 170, friction: 26 },
  });

  /* Steps flow out, THEN in. */
  const stepT = useTransition(step, {
    from: { opacity: 0, transform: "translate3d(0,26px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-18px,0)" },
    exitBeforeEnter: true,
    config: { tension: 220, friction: 27 },
  });

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

  const renderStep = (s: Step) => {
    if (s === "intro") {
      return (
        <div className="text-center">
          <FlowIn delay={80}>
            <p className="eyebrow justify-center">{content.intro.eyebrow}</p>
          </FlowIn>
          {/* `justify-center` on every line — TextEngine's container is flex,
              so `text-center` alone cannot centre it (rule 3). */}
          <StackedLines
            tag="h2"
            lines={[...content.intro.lines]}
            baseDelay={180}
            className="display lines-tight mt-6 hidden text-center text-h1 text-ink-heading sm:block"
            lineClassName="justify-center"
            lineClassNames={["", "grad-tip"]}
          />
          <StackedLines
            tag="h2"
            lines={[...content.intro.linesSm]}
            baseDelay={180}
            className="display lines-tight mt-6 text-center text-h2 text-ink-heading sm:hidden"
            lineClassName="justify-center"
            lineClassNames={["", "", "grad-tip"]}
          />
          <FlowIn delay={420}>
            <p className="mx-auto mt-7 max-w-[34rem] text-lead leading-[1.6] text-ink-body">
              {content.intro.standfirst}
            </p>
          </FlowIn>
          <FlowIn delay={560}>
            <button
              type="button"
              data-autofocus
              onClick={() => go("name")}
              className="btn btn-primary btn-lg mt-10"
            >
              {content.intro.start}
            </button>
          </FlowIn>
        </div>
      );
    }

    if (s === "done") {
      return (
        <div className="text-center">
          <SuccessTick />
          <StackedLines
            tag="h2"
            lines={[...content.done.lines]}
            baseDelay={260}
            className="display lines-tight mt-6 text-center text-h1 text-ink-heading"
            lineClassName="justify-center"
            lineClassNames={["", "grad-tip"]}
          />
          <FlowIn delay={540}>
            <p className="mx-auto mt-7 max-w-[34rem] text-lead leading-[1.6] text-ink-heading">
              {content.done.lead}
            </p>
          </FlowIn>
          <FlowIn delay={660}>
            <p className="mx-auto mt-4 max-w-[34rem] text-lead leading-[1.6] text-ink-body">
              {content.done.body.replace("{name}", firstName)}
            </p>
          </FlowIn>
          <FlowIn delay={800} className="mt-10 flex justify-center">
            {/* The site's own CTA treatment closes the loop — the last thing
                they press feels like the first thing they pressed. */}
            <CtaButton label={content.done.closeLabel} onClick={close} />
          </FlowIn>
        </div>
      );
    }

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          advance();
        }}
        noValidate
      >
        <StackedLines
          tag="h2"
          lines={[...content[s].question]}
          baseDelay={120}
          className="display lines-tight text-h2 text-ink-heading sm:text-h1"
        />

        <FlowIn delay={340}>
          {s === "name" ? (
            <div className="mt-10">
              <GlowField>
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
              </GlowField>
            </div>
          ) : s === "reach" ? (
            <div className="mt-10 flex flex-col gap-4">
              <GlowField>
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
              </GlowField>
              <GlowField>
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
              </GlowField>
            </div>
          ) : s === "volume" ? (
            <div className="mt-10">
              <p className="text-body text-ink-body">{content.volume.hint}</p>
              <div className="mt-8">
                <BandSlider
                  value={hiresBand}
                  onChange={setHiresBand}
                  bands={content.volume.bands}
                  label={content.volume.sliderLabel}
                />
              </div>
            </div>
          ) : s === "team" ? (
            <div className="mt-10">
              <p className="text-body text-ink-body">{content.team.hint}</p>
              <div className="mt-8">
                <BandSlider
                  value={teamBand}
                  onChange={setTeamBand}
                  bands={content.team.bands}
                  label={content.team.sliderLabel}
                />
              </div>
            </div>
          ) : (
            <div className="mt-10">
              <p className="text-body text-ink-body">{content.agenda.hint}</p>
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
              {/* Free text on purpose — §6.3: Eploy is the only third-party
                  product NAMED anywhere. A dropdown of ATS vendors would name
                  a dozen. */}
              <GlowField>
                <input
                  id="bd-ats"
                  type="text"
                  value={ats}
                  onChange={(event) => setAts(event.target.value)}
                  placeholder={content.agenda.atsPlaceholder}
                  className={`${FIELD} mt-2`}
                />
              </GlowField>
            </div>
          )}
        </FlowIn>

        {error ? (
          <p
            id={errorId}
            role="alert"
            className="mt-4 text-body font-medium text-danger"
          >
            {error}
          </p>
        ) : null}

        <FlowIn delay={480}>
          <div className="mt-10 flex items-center gap-3">
            <button type="button" onClick={back} className="btn btn-secondary">
              {content.nav.back}
            </button>
            <button type="submit" className="btn btn-primary">
              {s === "agenda" ? content.agenda.submit : content.nav.next}
            </button>
          </div>
        </FlowIn>
      </form>
    );
  };

  return overlayT((overlayStyle, open) =>
    open ? (
      <animated.div
        role="dialog"
        aria-modal="true"
        aria-label={content.ariaLabel}
        data-lenis-prevent
        style={overlayStyle}
        className="grain bg-01 fixed inset-0 z-[60] overflow-y-auto overscroll-contain"
      >
        {/* `min-h-dvh`, not `min-h-full`: a percentage min-height cannot
            resolve against a parent that only has a min-height itself, and
            the centring silently top-aligned. Viewport units need no parent. */}
        <div
          ref={overlayRef}
          className="shell relative flex min-h-dvh items-center py-24"
        >
          {/* Chrome, floated over the top so it does not push the step down:
              progress and its label on one line, the way out on the right.
              The tally is shortened to 24px here — the overlay's chrome must
              whisper — which the utility can do because utilities out-cascade
              the component layer. */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-6 pt-5 sm:pt-6">
            <div className="flex items-center gap-4">
              <div
                className="tally h-6 w-36 sm:w-44"
                style={{ "--fill": fillFor(step) } as React.CSSProperties}
              />
              <p className="text-sm text-ink-body" aria-live="polite">
                {step === "intro"
                  ? ""
                  : step === "done"
                    ? content.progress.done
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
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                aria-hidden
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* The step, centred in the FULL viewport — the chrome floats above
              rather than eating into the centring, which is what had the
              content sitting low. */}
          {stepT((stepStyle, s) => (
            <animated.div
              style={stepStyle}
              className="mx-auto w-full max-w-[44rem]"
            >
              {renderStep(s)}
            </animated.div>
          ))}
        </div>
      </animated.div>
    ) : null,
  );
};

"use client";

import { animated, to, useSprings } from "@react-spring/web";
import Image from "next/image";
import { createRef, useEffect, useState } from "react";

import { Reveal } from "@/components/ui/reveal";
import { ScreenCard } from "@/components/ui/screen-card";
import { SectionIntro } from "@/components/ui/section-intro";
import { capabilities, featureBento } from "@/data/content/site";
import { useStackRise } from "@/hooks/use-stack-rise";

/* The stack's feel, in one place so it can be tuned against the real thing
   rather than guessed. Carried over from the reference and then adjusted for
   these cards, which are far wider and shorter than the ones it was cut for. */
const PEEK_PX = 34; /* how much of each earlier card shows above the next */
const GAP_VH = 46; /* scroll length between cards — the pacing */
const REVEAL_PX = 480; /* distance an arriving card takes to reach its pin */
const PERSPECTIVE = 1500;
const ARRIVE_TILT = 15; /* deg an incoming card is inclined as it rises */
const BURIED_TILT = 3; /* deg a buried card reclines per card on top */
const SCALE_STEP = 0.035;
const DIM_STEP = 0.02;
const LIFT_PX = 4;
const BASE_VH = 5; /* never pin higher than this fraction of the viewport */
/* The floating nav measures 65px tall sitting 18px down. */
const NAV_CLEARANCE = 96;
/* Breathing room below a pinned card before the stack is judged to fit. */
const FOOT_ROOM = 24;

const ICONS: Record<string, React.ReactNode> = {
  cursor: (
    <path
      d="M6 3l12 8-5 1.2L10.6 17 6 3z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  search: (
    <>
      <circle
        cx="11"
        cy="11"
        r="6"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M15.5 15.5L20 20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
  chart: (
    <path
      d="M5 19V11M12 19V5M19 19v-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  ),
  /* Sources: several feeds converging into one. */
  sources: (
    <>
      <path
        d="M4 6h5a4 4 0 014 4v4a4 4 0 004 4h3M4 12h5M4 18h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20" cy="18" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  /* Export: the mirror of `feed` — the same tray, the arrow leaving it. */
  export: (
    <>
      <path
        d="M12 12V3m0 0L8.6 6.4M12 3l3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 15v2.5A2.5 2.5 0 006.5 20h11a2.5 2.5 0 002.5-2.5V15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
  /* Rewrite, with the guardrail implied: a nib, not a wand. */
  rewrite: (
    <>
      <path
        d="M4 20l1-4L15.5 5.5a2.1 2.1 0 013 3L8 19l-4 1z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M14 7l3 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
  /* Import: something arriving and being caught. */
  feed: (
    <>
      <path
        d="M12 3v9m0 0l3.4-3.4M12 12L8.6 8.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 15v2.5A2.5 2.5 0 006.5 20h11a2.5 2.5 0 002.5-2.5V15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
};

const Icon = ({ name }: { name: string }) => (
  <span className="icon-chip" aria-hidden>
    {/* fill="none" is load bearing: without it any CLOSED path in the set
        fills solid black. The line-only icons looked fine and hid it. */}
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      {ICONS[name]}
    </svg>
  </span>
);

/**
 * The bento, inside a white mega-panel.
 *
 * The reference's move, and the reason its cards have any weight: the panel is
 * white, so the cards inside it must go GREY rather than white or they vanish
 * into their own container. The lead card keeps a wash — it is the one with
 * the screen in it, and the grid should say which idea is load bearing rather
 * than treating four things as equals.
 */
export const FeatureBento = () => (
  <section id="platform" className="py-26">
    <div className="shell">
      <Reveal variant="fade">
        <div className="band-white rounded-panel px-6 py-16 shadow-group sm:px-12 lg:px-16 lg:py-20">
          <SectionIntro
            eyebrow={featureBento.eyebrow}
            lines={[...featureBento.lines]}
            linesSm={[...featureBento.linesSm]}
            standfirst={featureBento.standfirst}
          />

          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left column mirrors the right: the shot gets its own card on a
                deep ground, and the copy sits UNDER it as a quiet card of the
                same family. The picture card is then surrounded by grey ones
                rather than swallowing the copy, which is the reference's
                arrangement. */}
            <div className="grid content-start gap-10">
              <Reveal variant="rise">
                <div className="grain bg-09 rounded-panel p-8 lg:p-10">
                  <ScreenCard
                    ground="none"
                    chrome={false}
                    src={featureBento.lead.shot.src}
                    alt={featureBento.lead.shot.alt}
                    /* The artwork's own 1662x1307, so nothing is cropped. */
                    ratio="1662 / 1307"
                  />
                </div>
              </Reveal>

              <Reveal variant="up" delay={90}>
                <article className="card-quiet rounded-panel p-8 lg:p-10">
                  <div className="flex items-start gap-6">
                    <Icon name={featureBento.lead.icon} />
                    <div>
                      <h3 className="display text-h4">
                        {featureBento.lead.title}
                      </h3>
                      <p className="mt-4 text-body leading-[1.6] text-ink-body">
                        {featureBento.lead.body}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 gap-10">
              {featureBento.items.map((item, i) => (
                <Reveal key={item.title} variant="up" delay={i * 90}>
                  <article className="flex h-full flex-col justify-center card-quiet rounded-panel p-8 lg:p-10">
                    <div className="flex items-start gap-6">
                      <Icon name={item.icon} />
                      <div>
                        <h3 className="display text-h4">{item.title}</h3>
                        <p className="mt-4 text-body leading-[1.6] text-ink-body">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/**
 * One step. The card itself is EXACTLY as it was before the stack — same
 * panel, same alternating copy/shot grid, same bleeding shots. The stacking
 * happens entirely outside it, so this stays the single description of what a
 * step looks like.
 */
const StepCard = ({
  step,
  shotFirst,
}: {
  step: (typeof capabilities.steps)[number];
  shotFirst: boolean;
}) => (
  <article className="card-quiet relative overflow-hidden rounded-panel p-5 sm:p-8 lg:p-10">
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
      {/* The copy block is capped at its measure and CENTRED in
              its half, rather than sitting flush against the panel
              edge. Left-ranged text in a column wider than its measure
              pushes all the slack to one side, so the copy hugged the
              outer edge and opened a gap against the shot. Capping the
              grid item itself — not the paragraph — keeps numeral,
              heading, body and chips on one left edge and centres the
              whole block. The text stays ragged-right; only the block
              moves. */}
      <div
        className={`mx-auto w-full max-w-[34rem] ${
          shotFirst ? "lg:order-2" : ""
        }`}
      >
        <p className="figure text-h2 text-ink/25">{step.n}</p>
        <h3 className="display mt-6 text-h3">{step.title}</h3>
        <p className="mt-5 text-body leading-[1.6] text-ink-body">
          {step.body}
        </p>
        <ul className="mt-7 flex flex-wrap gap-2">
          {step.points.map((point) => (
            <li key={point} className="chip bg-surface-raised">
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Each shot gets its own DEEP blob ground. These rows sit
              inside grey panels, where a pale ground has nothing to
              push against. All four are image-only surfaces, so no
              text ever lands on the gradient.

              The ground is sized by ASPECT RATIO, never by a rem
              height. Two reasons. All four boxes then share a height
              at every width automatically, because they share a grid
              column. And the root font-size on this site is fluid
              (globals.css — it is set in `vw` across four bands), so
              a rem height drifts against an image's fixed aspect
              ratio as the viewport moves: the old `h-[30rem]` clipped
              step 04 by 12px at 1728 and by 41px at 1512. A ratio
              cannot drift, because both sides scale together.

              The image is absolutely positioned either way, so it
              never feeds back into the box's height:
              - `bleed`  anchored near the top, running off the foot
                         of the ground and cut by the row. Sized by
                         width; the overflow is the point.
              - `center` shown whole and centred, capped on BOTH axes
                         so any artwork ratio fits by construction.
                         The taller cap binds for a squarish shot, the
                         wider cap for a letterbox one. */}
      <div
        className={`grain bg-${step.bg} relative aspect-[5/4] rounded-panel ${
          shotFirst ? "lg:order-1" : ""
        }`}
      >
        <Image
          src={step.shot.src}
          alt={step.shot.alt}
          width={step.shot.w}
          height={step.shot.h}
          sizes="(max-width: 1024px) 80vw, 660px"
          style={
            step.shot.fit === "center"
              ? {
                  maxWidth: `${step.shot.widthPct}%`,
                  maxHeight: `${step.shot.heightPct}%`,
                  /* Centre on the artwork's CONTENT, not on its
                         canvas. `nudgeXPct` is measured: the alpha
                         bounding box of step 03's PNG sits 2.26% left
                         of its own canvas centre (24px of margin on
                         the left against 95px on the right), so
                         centring the file centres the empty space with
                         it. Delete the value — not the mechanism —
                         once the artwork is re-exported centred. */
                  transform: `translate(calc(-50% + ${
                    step.shot.nudgeXPct ?? 0
                  }%), -50%)`,
                }
              : { width: `${step.shot.widthPct}%` }
          }
          className={`absolute left-1/2 drop-shadow-[0_24px_60px_rgba(16,19,26,0.28)] ${
            step.shot.fit === "center"
              ? "top-1/2 h-auto w-auto"
              : "top-10 -translate-x-1/2"
          }`}
        />
      </div>
    </div>
  </article>
);

/**
 * The four steps, as a scroll-pinned card stack.
 *
 * Each card pins under the one before it and the next slides up over it,
 * building a pile whose earlier cards peek above the top. Three things move
 * with the scroll: an arriving card is inclined in 3D and eases flat as it
 * reaches its pin, and every buried card reclines, shrinks, lifts and dims a
 * step per card stacked on top of it.
 *
 * WHY THE MEASUREMENT IS SEPARATE FROM THE MOTION. A `position: sticky`
 * element's rect freezes the moment it pins, so a card cannot read its own
 * burial — the numbers it would need have stopped moving. Burial is read from
 * the cards ABOVE it, which are still travelling, and that is cross-card state
 * no per-element trigger can express. `useStackRise` does the reading;
 * react-spring does the moving.
 *
 * The pin heights are computed rather than fixed: the pile is centred so the
 * middle card sits in the middle of the viewport, with a floor so it never
 * pins under the floating nav.
 */
export const Capabilities = () => {
  const steps = capabilities.steps;
  const count = steps.length;

  /* `useState` rather than `useRef().current` — the array has to be stable
     across renders, and reading `.current` during render is exactly what the
     react-hooks/refs rule forbids. A lazy initialiser gives the same
     create-once behaviour without touching a ref while rendering. */
  const [refs] = useState(() =>
    Array.from({ length: count }, () => createRef<HTMLDivElement>()),
  );

  const [restTops, setRestTops] = useState<number[]>(() =>
    new Array(count).fill(NAV_CLEARANCE),
  );
  /* A stack only works if a pinned card FITS. Measured rather than assumed
     from a breakpoint: at 390x844 the card is 799px tall, so pinned under the
     nav its foot lands at 895 and the chips are cut off the bottom of the
     screen. Where it does not fit, the section falls back to the plain
     stacked rows it had before — which is not a degraded version of this, it
     is the layout that suits a small screen anyway. */
  const [stacked, setStacked] = useState(false);

  /* Pin positions depend on the card's laid-out height, so they are measured
     rather than assumed — and re-measured on resize, since the card's height
     is driven by an aspect ratio and the fluid root font size. */
  useEffect(() => {
    const layout = () => {
      const card = refs[0]?.current;
      if (!card) return;
      const vh = window.innerHeight;
      const cardH = card.offsetHeight;
      const centred = (vh - cardH) / 2 - ((count - 1) / 2) * PEEK_PX;
      const floor = Math.max(NAV_CLEARANCE, (BASE_VH / 100) * vh);
      const base = Math.max(centred, floor);
      setRestTops(
        Array.from({ length: count }, (_, i) => Math.round(base + i * PEEK_PX)),
      );
      setStacked(base + (count - 1) * PEEK_PX + cardH + FOOT_ROOM <= vh);
    };
    layout();
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, [count, refs]);

  const { risen, buried } = useStackRise(refs, {
    restTops,
    revealPx: REVEAL_PX,
  });

  const springs = useSprings(
    count,
    steps.map((_, i) => ({
      rx: ARRIVE_TILT * (1 - risen[i]) - BURIED_TILT * buried[i],
      ty: -buried[i] * LIFT_PX,
      sc: 1 - SCALE_STEP * buried[i],
      br: 1 - DIM_STEP * buried[i],
      /* Stiff and well damped: this tracks the scroll, so any slack reads as
         the stack lagging behind the wheel rather than as easing. */
      config: { tension: 420, friction: 42 },
    })),
  );

  return (
    <section id="candidates" className="band-white py-26">
      <div className="shell">
        <SectionIntro
          eyebrow={capabilities.eyebrow}
          lines={capabilities.lines}
          standfirst={capabilities.standfirst}
        />

        <div className={stacked ? "mt-16" : "mt-16 space-y-10"}>
          {steps.map((step, i) => (
            <div
              key={step.n}
              ref={refs[i]}
              className={stacked ? "sticky" : undefined}
              style={
                stacked
                  ? {
                      top: restTops[i],
                      /* Later cards paint over earlier ones. */
                      zIndex: 10 + i,
                      marginBottom: i === count - 1 ? 0 : `${GAP_VH}vh`,
                      /* The 3D has to live on the pinned parent: a rotateX
                         with no perspective above it is a flat squash. */
                      perspective: `${PERSPECTIVE}px`,
                    }
                  : undefined
              }
            >
              {stacked ? (
                <animated.div
                  style={{
                    transform: to(
                      [springs[i].ty, springs[i].rx, springs[i].sc],
                      (ty, rx, sc) =>
                        `translateY(${ty}px) rotateX(${rx}deg) scale(${sc})`,
                    ),
                    filter: springs[i].br.to((b) => `brightness(${b})`),
                    /* Hinged at the top edge, so an arriving card tips up from
                       its own leading edge rather than pivoting about its
                       middle. */
                    transformOrigin: "50% 0",
                    willChange: "transform, filter",
                  }}
                >
                  <StepCard step={step} shotFirst={i % 2 === 1} />
                </animated.div>
              ) : (
                <Reveal variant="up">
                  <StepCard step={step} shotFirst={i % 2 === 1} />
                </Reveal>
              )}
            </div>
          ))}

          {/* Scroll room after the last card, so it can rise fully and rest on
              top of the pile instead of being shoved off by the next band. */}
          {stacked && <div aria-hidden className="h-[60vh]" />}
        </div>
      </div>
    </section>
  );
};

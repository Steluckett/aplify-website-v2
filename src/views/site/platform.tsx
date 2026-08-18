"use client";

import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { ScreenCard } from "@/components/ui/screen-card";
import { SectionIntro } from "@/components/ui/section-intro";
import { capabilities, featureBento } from "@/data/content/site";

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
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M15.5 15.5L20 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
const FeatureBento = () => (
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
                      <h3 className="display text-h4">{featureBento.lead.title}</h3>
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
 * The four steps, as alternating copy/shot rows.
 *
 * Each step is a panel holding two things: the copy on one side and a real
 * product shot on the other, with the sides swapping every row. The swap is
 * what stops four rows of identical structure reading as a list — the eye
 * tracks back and forth instead of straight down, and each step gets its own
 * beat.
 *
 * It also buys four more places to show the product, which is worth more than
 * the page length it costs: a claim beside a screenshot of the thing doing it
 * is a different kind of claim.
 *
 * The panel is the quiet grey; the shot inside it sits on the wash. Two
 * surfaces inside one panel, which is the layering the whole page runs on.
 */
const Capabilities = () => (
  <section id="candidates" className="band-white py-26">
    <div className="shell">
      <SectionIntro
        eyebrow={capabilities.eyebrow}
        lines={capabilities.lines}
        standfirst={capabilities.standfirst}
      />

      <div className="mt-16 space-y-10">
        {capabilities.steps.map((step, i) => {
          const shotFirst = i % 2 === 1;
          return (
            <Reveal key={step.n} variant="up">
              {/* overflow-hidden so a loose shot can run off its gradient
                  card without landing on the next step. It bleeds past the
                  colour and is cut by the row instead. */}
              <article className="card-quiet relative overflow-hidden rounded-panel p-5 sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
                  <div className={shotFirst ? "lg:order-2" : ""}>
                    <p className="figure text-h2 text-ink/25">{step.n}</p>
                    <h3 className="display mt-6 text-h3">{step.title}</h3>
                    <p className="mt-5 max-w-[34rem] text-body leading-[1.6] text-ink-body">
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
                      push against. All four are image-only surfaces — the
                      frame and placeholder carry their own fills, so no text
                      ever lands on the gradient.

                      A `loose` shot has no browser frame and is anchored to
                      the card's foot, running past it. The card therefore has
                      a fixed height and the image is taken out of flow, since
                      an in-flow image would simply make the card taller
                      instead of bleeding out of it. */}
                  <div
                    className={`grain bg-${step.bg} relative rounded-panel ${
                      "loose" in step.shot && step.shot.loose
                        ? "h-[26rem] sm:h-[30rem]"
                        : "p-6 sm:p-8"
                    } ${shotFirst ? "lg:order-1" : ""}`}
                  >
                    {"src" in step.shot && step.shot.src ? (
                      <Image
                        src={step.shot.src}
                        alt={step.shot.alt}
                        width={step.shot.w}
                        height={step.shot.h}
                        sizes="(max-width: 1024px) 80vw, 520px"
                        style={{ width: `${step.shot.widthPct}%` }}
                        className={`absolute left-1/2 -translate-x-1/2 drop-shadow-[0_24px_60px_rgba(16,19,26,0.28)] ${
                          "fit" in step.shot && step.shot.fit === "center"
                            ? "top-1/2 -translate-y-1/2"
                            : "top-10"
                        }`}
                      />
                    ) : (
                      <ScreenCard
                        ground="none"
                        url={step.shot.url}
                        placeholder={step.shot.placeholder}
                        ratio="4 / 3"
                      />
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export const Platform = () => (
  <>
    <FeatureBento />
    <Capabilities />
  </>
);

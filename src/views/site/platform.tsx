"use client";

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
};

const Icon = ({ name }: { name: string }) => (
  <span className="icon-chip" aria-hidden>
    <svg viewBox="0 0 24 24" className="h-5 w-5">
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
            <Reveal variant="rise">
              <article
                className="card-vivid flex h-full flex-col rounded-panel p-8 lg:p-10"
                data-hue="brand"
              >
                <h3 className="display text-h3">{featureBento.lead.title}</h3>
                <p className="mt-6 max-w-[34rem] text-body leading-[1.6] text-ink-body">
                  {featureBento.lead.body}
                </p>
                <div className="mt-10">
                  <ScreenCard
                    ground="none"
                    chrome={false}
                    src={featureBento.lead.shot.src}
                    alt={featureBento.lead.shot.alt}
                    /* The artwork's own 1662x1307, so nothing is cropped. */
                    ratio="1662 / 1307"
                  />
                </div>
              </article>
            </Reveal>

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
              <article className="card-quiet rounded-panel p-5 sm:p-8 lg:p-10">
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

                  <ScreenCard
                    ground="wash"
                    pad="generous"
                    url={step.shot.url}
                    placeholder={step.shot.placeholder}
                    ratio="4 / 3"
                    className={shotFirst ? "lg:order-1" : ""}
                  />
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

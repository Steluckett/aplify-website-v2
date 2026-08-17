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
  <section id="platform" className="py-24 lg:py-32">
    <div className="shell">
      <Reveal variant="fade">
        <div className="band-white rounded-panel px-6 py-16 shadow-group sm:px-12 lg:px-16 lg:py-20">
          <SectionIntro
            eyebrow={featureBento.eyebrow}
            lines={[...featureBento.lines]}
            linesSm={[...featureBento.linesSm]}
            standfirst={featureBento.standfirst}
          />

          <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal variant="rise">
              <article className="wash-soft flex h-full flex-col rounded-panel p-8 lg:p-10">
                <h3 className="display text-h3">{featureBento.lead.title}</h3>
                <p className="mt-4 max-w-[34rem] text-body leading-[1.6] text-ink-body">
                  {featureBento.lead.body}
                </p>
                <div className="mt-10">
                  <ScreenCard
                    ground="none"
                    url={featureBento.lead.shot.url}
                    placeholder={featureBento.lead.shot.placeholder}
                    ratio="16 / 10"
                  />
                </div>
              </article>
            </Reveal>

            <div className="grid grid-cols-1 gap-5">
              {featureBento.items.map((item, i) => (
                <Reveal key={item.title} variant="up" delay={i * 90}>
                  <article className="flex h-full flex-col justify-center rounded-panel bg-surface-chip p-8 lg:p-10">
                    <div className="flex items-start gap-5">
                      <Icon name={item.icon} />
                      <div>
                        <h3 className="display text-h4">{item.title}</h3>
                        <p className="mt-3 text-body leading-[1.6] text-ink-body">
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
 * The four-step row, on a full-bleed white band.
 *
 * The band is the point. A pastel card measures within a point of the tinted
 * page ground in lightness, so on the ground these four read as flat rectangles
 * of nothing; on white they separate cleanly and the tints do the job they were
 * chosen for — four steps as four distinct moments rather than a list.
 */
const Capabilities = () => (
  <section id="candidates" className="band-white py-24 lg:py-32">
    <div className="shell">
      <SectionIntro
        eyebrow={capabilities.eyebrow}
        lines={capabilities.lines}
        standfirst={capabilities.standfirst}
      />

      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {capabilities.steps.map((step, i) => (
          <Reveal key={step.n} variant="up" delay={i * 80}>
            <article
              className={`pastel-${step.ground} flex h-full flex-col rounded-panel p-8 lg:p-10`}
            >
              <p className="figure text-h1 text-ink/30">{step.n}</p>
              <h3 className="display mt-8 text-h4">{step.title}</h3>
              <p className="mt-3 text-body leading-[1.6] text-ink-body">{step.body}</p>
            </article>
          </Reveal>
        ))}
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

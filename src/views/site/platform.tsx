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
 * The bento.
 *
 * The reference's asymmetry: one tall card carrying a product shot beside a
 * column of shorter ones. It matters that the tall card is the one with the
 * screen in it — the grid is not decorative, it is saying which idea is load
 * bearing. The lead card takes a soft wash and the column stays white, so the
 * eye is told where to start.
 */
const FeatureBento = () => (
  <section id="platform" className="px-6 py-24 lg:py-32">
    <div className="mx-auto w-full max-w-[76rem]">
      <SectionIntro
        eyebrow={featureBento.eyebrow}
        lines={[...featureBento.lines]}
        linesSm={[...featureBento.linesSm]}
        standfirst={featureBento.standfirst}
      />

      <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Lead card — cards within cards: a washed panel, holding copy and a
            framed screen that is itself a card. Nothing sits directly on
            anything. */}
        <Reveal variant="rise">
          <article className="wash-soft flex h-full flex-col rounded-panel p-8">
            <h3 className="display text-h3">{featureBento.lead.title}</h3>
            <p className="mt-4 max-w-[34rem] text-body leading-[1.6] text-ink-body">
              {featureBento.lead.body}
            </p>
            <div className="mt-8">
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
              <article className="tile flex h-full flex-col justify-center rounded-panel p-8">
                <div className="flex items-start gap-4">
                  <Icon name={item.icon} />
                  <div>
                    <h3 className="display text-h4">{item.title}</h3>
                    <p className="mt-2 text-body leading-[1.6] text-ink-body">
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
  </section>
);

/**
 * The four-step row.
 *
 * Pastel grounds are doing real work here: four steps that all look the same
 * read as a list, and four that each carry their own tint read as four
 * distinct moments. The numeral is set large and thin — the figure treatment
 * from the dashboard, borrowed because it is already the system's way of
 * saying "this is a quantity, look at it".
 */
const Capabilities = () => (
  <section id="candidates" className="px-6 py-24 lg:py-32">
    <div className="mx-auto w-full max-w-[76rem]">
      <SectionIntro
        eyebrow={capabilities.eyebrow}
        lines={capabilities.lines}
        standfirst={capabilities.standfirst}
      />

      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {capabilities.steps.map((step, i) => (
          <Reveal key={step.n} variant="up" delay={i * 80}>
            <article
              className={`pastel-${step.ground} flex h-full flex-col rounded-panel p-7`}
            >
              <p className="figure text-h1 text-ink/35">{step.n}</p>
              <h3 className="display mt-6 text-h4">{step.title}</h3>
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

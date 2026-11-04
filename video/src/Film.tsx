import { springTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

import { Answer, Close, Cost, Friction, Hero, Proof, Steps } from "./scenes";

/**
 * The cut. Scene lengths in frames at 30fps; every transition is spring
 * timed on the page's settled spring, so scene changes move the way the
 * site moves — a push, a rise, a wipe — never a hard cut or a cross-dissolve
 * for its own sake.
 */
export const SCENES = {
  hero: 165,
  cost: 240,
  friction: 165,
  answer: 150,
  steps: 225,
  proof: 210,
  close: 195,
};

const T = springTiming({ config: { damping: 200 }, durationInFrames: 24 });
export const TRANSITION_FRAMES = 24;
export const TRANSITIONS = 6;

export const FILM_FRAMES =
  Object.values(SCENES).reduce((a, b) => a + b, 0) - TRANSITIONS * TRANSITION_FRAMES;

export const Film = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={SCENES.hero}>
      <Hero frames={SCENES.hero} />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={T} />

    <TransitionSeries.Sequence durationInFrames={SCENES.cost}>
      <Cost frames={SCENES.cost} />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={T} />

    <TransitionSeries.Sequence durationInFrames={SCENES.friction}>
      <Friction frames={SCENES.friction} />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={T} />

    <TransitionSeries.Sequence durationInFrames={SCENES.answer}>
      <Answer />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={T} />

    <TransitionSeries.Sequence durationInFrames={SCENES.steps}>
      <Steps />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={T} />

    <TransitionSeries.Sequence durationInFrames={SCENES.proof}>
      <Proof />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={T} />

    <TransitionSeries.Sequence durationInFrames={SCENES.close}>
      <Close frames={SCENES.close} />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);

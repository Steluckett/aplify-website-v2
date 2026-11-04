import { Composition } from "remotion";

import { FILM_FRAMES, Film } from "./Film";
import { FPS, H, W } from "./tokens";

export const Root = () => (
  <Composition id="AplifyFilm" component={Film} durationInFrames={FILM_FRAMES} fps={FPS} width={W} height={H} />
);

# Aplify film

A 40-second, 16:9 kinetic-type film explaining Aplify, built from the SIGNALS
homepage option (branch `design/signals-steer`): same face (Schibsted Grotesk
700, −0.04em), same palette (near-black, creme, royal blue, blue tint, lime),
same spring motion, and only approved copy from `src/data/content/`.

Its own package, excluded from the site's tsconfig and ESLint.

```bash
npm install
npm run studio     # preview and scrub in the browser
npm run render     # writes out/aplify-film.mp4 (1920×1080, 30fps, H.264)
```

- `src/tokens.ts` — the page's tokens; type sizes are fractions of the frame width
- `src/type.tsx` — `RiseLine` (spring line reveal: words rise, un-blur and
  tighten into the set tracking), `FillWords`, `Drift`, `Rise`
- `src/scenes.tsx` — the seven scenes
- `src/Film.tsx` — the cut: scene lengths and the spring-timed transitions

`out/` is git-ignored.

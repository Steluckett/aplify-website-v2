---
tags: [frontend, stable]
updated: 2026-08-04
---

# Catalog — Utilities

Pure helper functions in `src/utils/` (no side effects, unless noted).

## `is-bot.ts`

`isBot(): Promise<boolean>` — **server-only**. Reads the `user-agent` header,
returns `true` for crawlers/audit tools. Used to skip heavy animation for bots.
See [[seo-metadata]].

## `scroll-to.ts`

`scrollTo(id?, immediate?)` — programmatic scroll to an element id (string) or a
numeric position. Integrates with the Lenis [[smooth-scroll|scroll store]];
temporarily disables scroll state during the animation. Has `//if lenis` guards so
the Lenis dependency can be stripped if smooth scroll is removed.

## `math.ts`

| Function | Purpose |
|----------|---------|
| `transformRange(value, min, max, newMin, newMax)` | remap a value between ranges (clamped) |
| `lerp(start, end, t)` | linear interpolation |
| `debounce(...)` | debounce helper (used by `useWindowSize`) |

## `lvh.ts`

CSS-string builders for viewport-height units with fallbacks
(`vh` → `lvh` → `calc(var(--vh) …)`): `heightLvh`, `minHeightLvh`, `marginTopLvh`,
`marginBottomLvh`. Solves mobile-browser viewport-height inconsistencies.

## `lib/scene/device.ts`

Device tiering for WebGL scenes — the §2 module [[optimize-3d-scene]] asks for,
so DPR clamps, point budgets and frame budgets are named constants in one place
rather than literals in render code (hard rule #4).

| Export | Purpose |
|--------|---------|
| `getSceneTier()` | Resolves `mobile` / `tablet` / `desktop` from viewport width + `pointer: coarse`. Carries `maxPixelRatio`, `pointStride`, `frameBudgetMs`, `pointSizeScale`, `allowBloom`. |
| `prefersReducedMotion()` | Scene holds still when the visitor asks for less motion |
| `hasFinePointer()` | Gate for the cursor listener — never attached on touch (§11) |

The tier owns what the *device* can afford. What the *design* asks for lives in
`hero-scene.config.ts` (below), so a tuned look stays portable across tiers.

> [!note] `pointSizeScale` can go **down**
> A strided tier draws fewer points, which is usually an argument for growing
> each one. Mobile does the opposite (0.68) — a phone is held at arm's length
> and the authored size reads as blobs there. See [[decisions-log]] ADR-0026
> before "restoring" it.

## `lib/scene/hero-scene.config.ts`

Authored settings for the hero scene — particle size, bloom, model placement,
camera, parallax, and the three things the cloud does on its own — plus
`HERO_SCENE_LIMITS`, the range each one is tunable within. Every field is cheap
to apply (a uniform, a transform or a pass parameter), which is what lets the
on-screen panel drive it live without rebuilding the 87k-point geometry.

| Group | What it drives |
|---|---|
| `scatter` | Cursor repulsion — points inside `radius` flee the pointer, at full strength on it and nothing at the edge. Unchanged in kind since it was written; only `force` and `radius` came down. |
| `drift` | The idle wander. Every point travels along the surface forever, so the cloud is never completely still. Small: `amount` is in world units and ~460 px land on each one. |
| `depth` | The view-space depth fade. `start` is where the ramp begins across the subject's depth, `strength` how much is taken off at the very back. |

All three are vertex-shader uniforms (optimize-3d-scene §9), so none of them
costs a JS loop over the cloud. Their reasoning — and what the drift costs — is
[[decisions-log]] ADR-0025.

Edit by hand, or add **`?tune`** to the URL on any build — including development,
where the panel no longer opens by itself — then adjust it and press **Copy** to
get JSON to paste back here.

> [!warning] `pointStride`, never a slice
> The hero's vertex buffer is **spatially sorted by X**, so truncating its tail
> deletes one whole side of the model. Down-sampling must take every Nth point.

## `lib/scene/temporal-filter.ts`

The hero scene's two temporal filters, as composer passes. Both exist to stop
the point cloud flickering, and neither touches the artwork — a still frame
comes out bit-identical to the authored one. See [[decisions-log]] ADR-0022 and
ADR-0023 for the measurements.

> [!warning] The idle drift means there are no still frames
> ADR-0022's other half — "a frame that moves nothing is not drawn" — cannot
> apply while `drift` is on, because every point is moving. The blend below
> still runs and is fed the drift's own screen speed, so the wander is the most
> heavily smoothed thing in the frame. Set `drift.amount` to 0 and still frames
> go back to being byte-identical. ADR-0025.

| Export | Purpose |
|---|---|
| `createTemporalFilter({ bloomPass, glowWeight })` | Returns `passes` (add after the bloom pass, in order), `setFrameMix`, `setGlowEnabled`, `invalidate`, `dispose`. |

Two filters, because the frame has two flickers with very different tolerances:

- **The points** flicker because alpha-blended sprites also write depth, so a
  transparent sprite edge occludes a lit point behind it. Fixed by mixing in a
  slice of the previous *frame*, weighted by how far the subject moved —
  `particle-scene.tsx` computes that and calls `setFrameMix`. Real movement
  mixes in nothing, so nothing ever smears.
- **The glow** flickers because `UnrealBloomPass` extracts its bright areas at
  roughly a sixth of the drawing buffer per axis and therefore point-samples
  2px dots. It needs far heavier averaging than a sharp image would survive, so
  it gets its own — on bloom's own small buffer, using the identity
  `bloomed = clean + glow` to pull the glow back out of the frame.

> [!warning] It reads `bloomPass.renderTargetsHorizontal[0]`
> That is `three`'s internal buffer holding the finished glow, and the whole
> trick depends on it. It is read through a guard: if an upgrade renames it the
> correction switches itself off, and the scene renders exactly as it did
> before this file existed — flicker included, nothing broken.

## `animation/coords.ts`

Element-coordinate helpers — `getElementCoords`, `getScrollCoordsFromElement` —
used internally by the scroll/animation system. Marked `@ts-nocheck`. `#do-not-modify`

## `seo/generate-page-metadata.ts`

`generateMetadata(props?)` — shared page-`Metadata` builder. `generateViewport()`
— the `Viewport` export (carries `themeColor`). See [[seo-metadata]].

## `seo/structured-data.ts`

`getSiteStructuredData()` — builds the `Organization` + `WebSite` JSON-LD graph
rendered by the root layout. See [[seo-metadata]].

## Adding a util

Keep utilities **pure** and side-effect-free (server-only ones like `isBot` are the
exception — note it clearly). Group by domain under `utils/<domain>/`.

## Related

[[hooks]] · [[seo-metadata]] · [[smooth-scroll]]

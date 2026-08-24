---
tags: [meta, changelog]
updated: 2026-08-24
---

# Changelog

Chronological log of notable changes to the project. Newest first.
This is a human-curated log — not a mirror of `git log`.

## 2026-08-24

- **The adaptive scaling grid is gone; the root font-size is the reader's.** The
  `vw` media-query ladder in `globals.css` and the `AdaptiveGrid` mount in
  `app/layout.tsx` are removed in favour of `html { font-size: 100% }`. See
  [[decisions-log]] **ADR-0028**, which supersedes ADR-0008.

  The ladder divided 16px by each band's design base width, which put 16px at the
  TOP of every band and a cliff at the bottom of the next. Measured: **16.00px at
  1440 and 12.17px at 1460** — a quarter of the type size lost across twenty pixels
  of window width, with the same cliff at 1024 and a worse one at 640 (28.44px,
  178% of intended, making the page 52,257px tall). A maximised MacBook Pro 14"
  sits at 1512 and was rendering the whole site at **79%**.

  It never did what it was for. That pattern keeps a *rem-based* layout
  proportional; this one is not — `--raw-shell` is `min(95vw, 1440px)` in px.
  Forcing the root to 16px at a 1460 viewport left the shell at 1387px, unmoved.
  It was only ever shrinking type inside a column that stayed put. And setting the
  root from the viewport discards a reader's own browser font-size (WCAG 1.4.4).

  Everything sized in `rem` now lands on its literal token value: hero 96px, section
  heads 56, body 18, and `.screen` at Aurora's 14px with 13px table heads — which is
  what [[design-system]] and `APLIFY-PRODUCT-UI-SPEC.md` always said it was. The
  product register had been quietly drifting off its own spec at every width.

  Verified on 3100 at 375 / 640 / 768 / 1024 / 1280 / 1512 / 1920 / 2400: 16px at
  all of them, no horizontal overflow anywhere, no inline override above 1920.

  `src/components/common/grid/*` and `use-adaptive-grid.ts` are kept but unmounted;
  `grid.config.ts` carries a warning against re-mounting them.

---

## 2026-08-04

- **The hover scatter is gentler and tighter** — force 0.36 → **0.2**, area
  0.49 → **0.34**. The effect itself is untouched: still a radial repulsion with
  the same falloff, the same turbulence, the same easing. At the old settings
  the pointer inflated a quarter of the head into a blur; at these it disturbs
  the surface it passes over and the silhouette holds.

  Two replacements were built and rejected on the way here, both reverted, and
  both worth not re-attempting — see [[decisions-log]] ADR-0025.

- **The far side of the subject fades out** — a new **Depth fade** group. The
  band is measured from the camera, not along the model's own Z, and is anchored
  to the subject's bounding sphere, so it is always the points furthest from the
  lens that thin out however parallax has turned the head. Two knobs: `start`
  (where the ramp begins across the subject's depth) and `strength` (how much is
  left at the very back), shipped at 0.35 / 0.85. A point the fade takes to
  nothing is discarded rather than drawn, so it stops writing depth and
  occluding what is behind it. ADR-0025.

- **The cloud never fully stops** — a new **Idle drift** group. Every point
  wanders along the surface it sits on, forever, with its own phase and rate
  from the jitter attribute the geometry already carried; the two tangents take
  almost all of it and the normal a tenth, which is what keeps a drifting point
  *on* the form. Deliberately tiny — 0.003 world units is about 1–2 px once the
  model scale and projection are applied.

  This is the one change that costs something. ADR-0022's "a frame that moves
  nothing is not drawn" cannot apply when every point is moving: measured on the
  production build with the pointer parked and parallax settled, four frames
  0.9s apart are all different with the drift on, and all four **byte-identical**
  with `drift.amount` at 0. The blend half of ADR-0022 still runs and now sees
  the drift's own screen speed, so the wander sits at the heaviest smoothing the
  filter offers. Reasoning in ADR-0025.

- **Mobile points are half the size** — `pointSizeScale` 1.35 → **0.68** on the
  mobile tier, reversing the "strided tiers grow their points" rule that shipped
  with `device.ts`. A phone is held at arm's length, and a 6.2px dot there is a
  blob rather than a particle. The cloud is visibly sparser as a result; if it
  ever reads too thin the lever is `pointStride`, not the size. See
  [[decisions-log]] ADR-0026 and [[utils]].

- **The CTA chevrons stop running after the pointer leaves** — one arrow could
  be left ping-ponging forever, and a later hover could leave another refusing
  to move. Two causes, both in react-spring's declarative form: a pending
  `delay` is only dropped when the incoming props carry `cancel`, so leaving the
  button 100ms in let the 180ms chevron's *hover* update land afterwards, loop
  and all, with nothing left to stop it; and `loop: { reverse: true }` swaps
  `from`/`to` in place, so after a few cycles a chevron's ends are the wrong way
  round and the next hover can retarget it to where it already is. The cascade
  is now started and stopped through the spring ref — `stop(true)` for the
  cancel, explicit `from`/`to` on the way in — and verified over six
  hover-and-leave-at-100ms rounds: all five settle at 0 and stay there.

- **The project is wired up with its own metadata** — `siteConfig` carried the
  starter's `New Project` placeholders, which every SEO surface reads from:
  title, description, `manifest.webmanifest`, JSON-LD, `robots.txt`, the
  sitemap. It is now **Evolve**, described in the page's own words (the same
  headline and lead the share card is painted from), and the home route carries
  a title of its own built from that content rather than inheriting the bare
  site name. `package.json` is renamed off the starter too. Two notes:
  `twitter:site` is now **omitted** rather than guessed — a placeholder
  `@handle` does not degrade to "no handle", it credits whoever owns it on every
  share — and `NEXT_PUBLIC_SITE_URL` is still the one value that must be set per
  environment, or canonical tags ship pointing at localhost. See [[seo-metadata]].

- **The hero poster is gone** — the reference render that faded out from under
  the canvas is removed, along with `HeroContent.image` and the 4.3 MB
  `portrait.png`. The preloader already waits on the scene's first frame, so the
  poster was fading against an identical image — while being the LCP (4.3 MB of
  it) and occluding the rule grid, the consequence logged and left alone on
  2026-08-03. Given up with it: the no-WebGL fallback (the preloader's 6s
  failsafe now opens a section with no subject) and the subject in prerendered
  HTML for non-JS crawlers. See [[decisions-log]] ADR-0024.

- **Scene tuned** — in `DEFAULT_HERO_SCENE_CONFIG`: particle size 2.9 → **4.6**,
  parallax ease 0.02 → **0.04**, bloom strength 1.65 → **1.23** and bloom radius
  0 → **0.4**. Bigger points read as a denser, more solid form, and the glow
  trades intensity for spread. The quicker ease also shortens the sub-pixel tail
  the frame filter has to smooth (ADR-0022).

- **The tuning panel no longer opens by itself in development** — it is
  `?tune`-only now, on every build. The rig is dialled in, and the panel was
  sitting over the artwork on every page load. Nothing about the panel itself
  changed; see [[utils]].

- **The glow stopped pulsing while the subject is dragged** — the second half of
  the flicker, and the louder one: bloom multiplied the frame's local brightness
  jitter by 5× over the same scene with bloom off, because its bright pass runs
  at a sixth of the drawing buffer per axis and point-samples 2px dots. Raising
  that resolution fixes the sampling but *is* the artwork — the coarse pass is
  what smears the glow into the haze covering 96% of the frame. So the glow is
  averaged over time instead, on bloom's own 360×215 buffer, and pulled back
  into the frame through the blend pass that was already running: no new
  full-screen pass, **+0.32 ms**, and both drag speeds now sit at the
  bloom-switched-off floor. New module `src/lib/scene/temporal-filter.ts`, which
  also absorbed the frame blend from the day before. See [[decisions-log]]
  ADR-0023 and [[utils]].

## 2026-08-03

- **The particle twinkle is gone** — the cloud used to shimmer in place. Cause:
  alpha-blended sprites that also write depth, so a transparent sprite edge
  occludes a lit point behind it and a *sub-pixel* move flips the pixel
  (measured: a 0.3 px move flipped 1.08% of lit pixels by >60 levels) — and the
  asymptotic parallax ease keeps the subject drifting sub-pixel long after the
  pointer stops. Fixed without touching the artwork: a frame that moves nothing
  is **not drawn at all**, and a barely-moving frame is blended with the
  previous one (`SavePass` + `BlendShader` in the composer), weighted by how far
  the subject actually travelled — so real movement stays crisp. Still frames
  are now bit-identical, and the parallax tail flickers 5× less.
  See [[decisions-log]] ADR-0022.

- **The rule grid moved behind the subject** — the lines used to cross the
  head; now the point cloud stands in front of them. `HeroGrid` simply moves
  ahead of `HeroVisual` in `HeroSection` (nothing here sets `z-index`, so paint
  order is DOM order), but that alone would have hidden the grid completely,
  because the canvas was opaque.
  - **The canvas is now transparent** — `alpha: true`, clearing to
    `--background` at alpha 0, with the section painting that same colour
    underneath. Every pixel the cloud does not cover is therefore identical to
    before. This walks back one line of §7's advice (`alpha: false` for an
    opaque canvas); occlusion of DOM content behind the canvas is the one thing
    that flag makes impossible, so it is a deliberate, narrow exception.
  - **Trap: do not set `premultipliedAlpha: false`.** The first attempt did, on
    the theory that the composer emits straight RGBA, and the head lost its
    entire ambient glow — the background went flat black. Points render with
    `NormalBlending` into a transparent target, which multiplies rgb by alpha as
    it blends, so the buffer is *already* premultiplied and three's default
    (`true`) is correct. With the wrong flag the browser un-premultiplies a
    second time and the bloom halo, whose alpha is near zero, vanishes.
    Premultiplied compositing is also what keeps the halo looking additive over
    the page: `result = rgb + page × (1 − a)`.
  - **Known consequence, not yet addressed:** the poster lives inside
    `HeroVisual`, whose scale spring creates a stacking context, so the poster
    now sits above the grid too. In the normal path this is invisible — the
    preloader waits for the scene's first frame, so the poster has already
    faded before the entrance plays — but if WebGL is missing or the context is
    lost, the poster stays and the grid is hidden behind it. Fixing it means
    hoisting the poster out of the fade/scale springs into its own layer ahead
    of the grid, which changes how the poster itself animates; left alone
    pending a decision.
- **Headline animates per letter, lead copy per line** — both were previously a
  masked whole-line slide (`HeroReveal`). They now run through
  `spring-text-engine` (hard rule #1: text animation is never hand-built), on
  one shared shape: up from below, out of a blur, out of nothing —
  `translateY(0.42em)` → `0`, `blur(10px)` → `0`, opacity `0` → `1`, all in
  `hero-motion.ts`.
  - **Headline** — `letterStaggerIn: 22ms` along a line, `150ms` extra per line
    below the first, `1150ms` against the design's deep decelerating curve. The
    long duration is what makes it read as smooth rather than snappy: most of
    the travel happens in the first third and the tail settles for a long time.
  - **Lead** — the unit is the wrapped line (`lineStaggerIn: 130ms`,
    `1000ms`), so the paragraph reads as it arrives instead of dissolving into
    characters. Its beat is still `HERO_DELAY.stats`, unchanged.
  - **`overflow` is deliberately off**, which is what lets the headline keep
    `leading-none` and its pixel-matched placement. Hard rule #3 forbids
    pairing them *because* the engine's overflow clips to the line-height box
    and shaves the `g` in "Engineering" and the `y` in "You." — dropping the
    mask removes the reason for the rule here; blur and opacity carry the
    reveal without one. `REVEAL_OFFSET` and `LINE_BLEED`, which existed only to
    survive that clip, are gone. `HeroReveal` itself stays — the stats and
    scroll cue still use it.
  - **Trap: `TextEngine` writes `position: relative` inline**, which beats a
    `position` utility class. The lead's absolute placement therefore has to
    stay on a wrapping `<p>` with the engine as an inner `<span>`; with the
    placement on the engine itself the paragraph offset from its flow position
    rather than the section and landed at the top of the screen (bottom gap
    775px instead of 40px). Same reason `HeroHeadline` wraps rather than
    styling the engine directly.
  - **`filter` is the one property here that can't be composited** — the
    browser re-blurs every glyph each frame. Kept small, lands on 0 quickly,
    and only ever runs during the entrance.
  - Verified: desktop 1440×800 unchanged (opening block 40/138, closing block
    40/40, lead 40/40, lead width 233); tablet 1024×768 holds the same anchors;
    320×568 and 430×932 keep their margins with no letter off-screen and no
    horizontal scroll. Frame-accurate capture of the motion itself isn't
    possible in this environment (JS starts seconds after navigation) — what is
    confirmed is that the engine splits the text and that each letter carries
    an animated `filter` that settles to `blur(0px)`.
- **Hero fills the viewport** — the section moved from a fixed `50rem` (the
  Figma frame height) to `h-dvh`. Because a stretched frame can't scale every
  offset the same way, elements now follow one of three vertical anchoring
  rules, documented on `HeroSection`:
  - **Top-anchored** in rem — nav, scroll cue, CTA, opening headline.
  - **Bottom-anchored** in rem — closing headline and lead copy. Both sat ~40px
    off the bottom of the 800px frame, the same 2.5rem as the side margin, so
    that turned out to be the design's intent rather than a coincidence.
  - **Proportional** in % of height — the horizontal rule (74.875%), its
    crosshairs and the stat labels, so the decorative grid keeps its shape.
    Crosshairs now centre on their intersection (`-translate-y-1/2`) and share
    the rule's constant, so they stay welded to it at any height.
  - **Canvas sizes in `lvh`, content in `dvh`** (§13) — a collapsing mobile URL
    bar must not re-allocate the framebuffer, but page content still has to sit
    inside the *visible* viewport.
  - Verified at 1440×800 that this is pixel-identical to the previous fixed
    layout (rule at 599px, both text blocks 40px off the bottom), and at
    1440×1024 that the anchors hold and both crosshairs stay on the rule.
- **Brand assets wired; the starter's icons removed** — the shipped favicon,
  app icons and share image were the Textura starter's marble statue, i.e.
  someone else's branding. Replaced with the project's own mark via Next's file
  conventions: `app/icon.svg` (the small-size cut), `app/apple-icon.tsx`, and
  `app/opengraph-image.tsx` — a 1200×630 card built from the mark plus the
  hero's real headline and lead copy, rendered with the site's own faces.
  `twitter-image` re-exports it.
  - **The hardcoded `icons` block had to go.** `generateMetadata` listed
    `/favicon.ico`, `/favicon-16x16.png` and `/apple-icon-180x180.png`
    explicitly, and an explicit `icons` entry in Next *replaces* the file
    conventions rather than supplementing them — leaving it would have emitted
    links to files that no longer exist. Same for `openGraph.images`, which now
    only appears when a caller passes an override.
  - `manifest.json` and `browserconfig.xml` were deleted and the manifest is
    generated from `siteConfig` instead: the static one listed six
    `android-icon-*.png` files, and `browserconfig.xml` pointed at
    `ms-icon-*.png` that **never existed in this repo at all**.
  - Verified on the production build: no reference to any deleted asset
    survives in the HTML, and `/opengraph-image` and `/apple-icon` return real
    PNGs at 1200×630 and 180×180.
  - Still outstanding: `siteConfig.name`/`description`/`twitterHandle` remain
    the starter's "New Project" placeholders, so `<title>` and the JSON-LD
    organisation name are not yet real. That needs the brand name.
- **Headlines back to 92px** — `--raw-text-display` 6.375rem → 5.75rem, with
  the fluid branch following to `clamp(42px, 6.3889vw, 82px)` so the two still
  meet at 1280 without a step.
- **Scene optimisation pass, following `optimize-3d-scene` end to end** —
  baseline and verification both taken on `yarn build && yarn start` with a
  fresh server, counted quantities only (§0; absolute fps out of this
  environment is meaningless and was not quoted).
  - **§6 pixel ratio** — the largest win by far. Mobile drawing buffer
    740,610 → **237,327 px** (3.12×), desktop 4,608,000 → **2,592,000 px**
    (1.78×). Point counts unchanged. See [[decisions-log]] ADR-0021.
  - **§7 fill** — bloom's ~14 full-screen passes per frame now run at half the
    buffer in each axis: **5,519,848 fragments/frame measured** against ≈22.1M
    before, a blur needing no full resolution. The pass is also skipped
    outright when its strength rounds to nothing, and `alpha`/`stencil` are off
    with `powerPreference: "high-performance"` now requested on desktop only.
  - **§13 iOS** — the resize observer is attached only on a fine pointer. Touch
    browsers fire resize every time the URL bar collapses, and handling it
    re-allocates the framebuffer mid-scroll, which reads as a whole-scene
    flash. The canvas wrapper is also promoted to its own compositor layer.
  - **§2** — added `isEnergySaver()` and `sceneShouldFreeze()`, so a phone in a
    constrained state settles on a still frame the way reduced motion already
    did. **§9** — `frustumCulled = false` on the points, whose positions the
    vertex shader displaces, so a stale bounding sphere cannot cull them.
    **§5** — the frame budget carries an ε, because the ticker skips while
    `time - last <= budget` and a bare `1000/30` lands at ~26fps.
  - **Verified, not assumed:** the §4 gate proved itself by accident — the
    baseline read 0 draw calls until the measurement forced `document.hidden`
    false, which is exactly the loop refusing to run in a hidden tab.
  - **Measured and deliberately not acted on:** `JSON.parse` of the 1.9 MB
    vertex buffer plus geometry build blocks the main thread for **9.7 ms** on
    this desktop — over §3's 8 ms bar, but it lands under the preloader, which
    is where §3 wants it. A binary buffer would save the parse but almost
    nothing on the wire: gzip already takes the JSON to 560 KB against 522 KB
    for an Int16 `.bin`. Worth doing for phone decode time, not urgent.
- **Loading cover added, gating the entrance** — `HeroStage` owns a loading
  stage and `HeroPreloader` draws it in the section's own language: a hairline
  track filled with the CTA's accent ramp under a mono counter, spring-driven
  (`scaleX` for the fill, opacity + translate for the lift) so hard rule #1
  holds and `<ReducedMotion>` covers it for free.
  - **The gate is the point.** The hero already had a designed entrance
    timeline; dropped in front of it, a cover would have meant that timeline
    plays out unseen. Every animated leaf now holds at its `from` until the
    cover lifts via `enabled={started}`, so the sequence is unchanged — it just
    begins later. The scramble waits on the same signal.
  - Progress is counted from real milestones (fonts ready, scene first frame)
    rather than a timer, with a 6s failsafe so a missing signal — no WebGL, a
    failed fetch — can never hold the page hostage.
  - Ships in the SSR HTML so there is no pre-hydration flash, with a `noscript`
    rule that hides it outright: without scripting it could never lift.
- **Menu toggle morphs to a close cross** — the three bars are centred and held
  apart by `transform` rather than by `top`, so opening is one animatable
  property: the outer two collapse onto the middle line and cross at ±45° while
  the middle fades. Uses a token-timed `transition-[transform,opacity]`, which
  is the discrete-state-change exception to hard rule #1 (ADR-0014) — the same
  treatment the nav links already use — not a reveal that would owe a spring.
- **Mobile header split to the frame edges; menu made legible** — the toggle
  moved to the left, flush with the text column, and the CTA holds the right
  frame margin. Both offsets are `1rem`, the same token the section pads with,
  so they track the text at every width rather than drifting against it.
  - **The open menu was unreadable, and the blur was not the cause.** Each
    headline line rides a spring that writes a `transform`, which promotes it
    into the positioned paint layer; coming later in the DOM it covered the
    menu outright. Fixed with `z-20` on the nav — the backdrop was already
    doing its job underneath. Deepened to `blur-xl` over an 80% ground while
    there.
- **Mobile header, headline offset, one-line metrics, lead wrap** — CTA and
  menu toggle are both a flat 48px below 768 and their offsets moved to px:
  the rem height drifts with the adaptive grid and resolved to 37px at a 700px
  viewport, under the 44px tap floor. Headline dropped 30px. Metrics collapse
  to one row each (the `<br>` is switched off and a space takes its place),
  which also surfaced a bug — the tablet `max-width` was still applying below
  768 and squeezing them to 30px, so they wrapped to four lines. `lead`
  gained an optional `leadBreakBefore`, giving "production-ready" its own line
  on mobile without touching the desktop wrap.
- **Parallax pointer is clamped to [-1, 1]** — the listener is on `window`, so
  a pointer outside the canvas drove yaw far past its configured maximum and
  could swing the subject clean out of frame.
- **Tablet: subject scaled up, captions enlarged, headlines to 102px** — the
  tablet framing goes to `scale 1.24` and drops to `modelY -0.62`, so the extra
  size is spent downward into the cropped shoulders rather than upward into the
  headline; the crown keeps air above it. Caption band left the 11px floor for
  `clamp(12px, 1.05vw, 14px)`, and the display scale went up another 10px in
  both branches.
  - **Scaling the subject moved a caption onto it.** `45B+` hangs off the 75%
    rule, which is clear of the bust on desktop but lands on the lit surface
    once it is enlarged. `HeroStat` gained an optional `xTablet`, so that one
    label uses the 87.5% rule below 1280 and the desktop composition is
    untouched.
- **Scroll cue is desktop-only; headlines raised to 92px** — the cue now
  hides below 1280 as well as below 768: at tablet widths it landed on top of
  the headline. The display scale went up 10px across *both* branches
  (`5.75rem`, and the fluid clamp to `clamp(42px, 6.3889vw, 82px)`). Raising
  only the tablet branch was rejected on purpose: it would have put 1279 ten
  pixels above 1280 — exactly the breakpoint step the brief forbids. The two
  branches still meet at 1280 (81.7px vs 81.8px).
- **Hero adapted to tablet and mobile; desktop untouched by construction** —
  every responsive rule is a `max-xl:` / `max-md:` override, so the ≥1280
  declarations are literally the ones that were pixel-matched to Figma.
  Verified at 1440 after the work: headline 40/138, closing headline 40/40,
  nav 40/37, metrics 1270/217 · 1090/418 · 190/567, type 82/16/12px — all
  identical to the pre-adaptation baseline.
  - **Below 768 the section becomes a flex column.** The headline collapses
    into one left-aligned block, the metrics leave absolute positioning for
    the normal flow, the lead copy is pushed down with `mt-auto`. DOM order is
    unchanged — `order-*` does the rearranging, so the entrance timeline and
    the markup both stay as they were.
  - **Placement had to leave inline styles.** The metrics carried
    `left`/`top`/`width` inline, which no media query can override; they now
    travel as `--stat-x/-y/-w` custom properties consumed by utilities.
  - **Scene framing is per tier** (`SceneFraming` in `device.ts`). Portrait is
    narrow, so the head — not the bust — becomes the subject: the camera pulls
    back for air above the skull and the model drops below centre, clear of the
    headline. Desktop's entry is `null`, i.e. the authored config verbatim.
  - **Tap targets and the type floor are authored in px**, not rem: the
    adaptive grid scales the root font-size, so 2.75rem would collapse to 39px
    at 320 and miss the 44px floor, and the 0.75rem captions would fall to
    10.7px against an 11px requirement.
  - **Mobile perf** — quarter-density point buffer (stride 4), bloom off, DPR
    hard-capped at 2 on every tier, and the render loop now stops on an
    `IntersectionObserver` when the section leaves the viewport, on tab hide,
    and never starts at all under reduced motion, which gets one static frame.
  - **Context loss now restores the poster** via an `onLost` callback, so a
    dropped GPU context can no longer leave a black block.
- **Headlines raised to 82px** — `--raw-text-display` now 5.125rem, +12 over
  Figma's 70 across two passes. The masks held without adjustment because
  `LINE_BLEED` is authored in `em`: the clip room and the descender it has to
  clear both scale with the font, so `translateY(105%)` still covers the taller
  box. Both anchors were unaffected by design:
  `text-box: trim-both cap alphabetic` means the top-anchored headline grows
  from its cap-height line (still 40/138) and the bottom-anchored one grows
  upward from its baseline (still 40 off the bottom and the right edge).
- **Nav aligned to the headline** — a deliberate deviation from Figma, which
  centred the row on x=270 of the frame. It now starts at the same 2.5rem left
  margin as the headline and the lead copy, so all three share one edge.
- **Tuning panel scrolls properly** — it is now a flex column capped at
  `calc(100dvh - 7.5rem)` with the body as the scroll area. The fix that
  matters is `min-h-0` on that body: without it a flex child refuses to shrink,
  so it grew past the panel and clipped the last group instead of scrolling.
- **Scene retuned** — particle size 2.9, bloom strength 1.65 at radius 0,
  model scaled 1.33 and dropped to −0.37, parallax pitch restored at a lazier
  0.02 ease, colours nudged (`#2e69ff` / `#f5244e`) with the fill taken to pure
  black.
- **Scene settings extracted, plus bloom and a cursor-scatter effect** — every
  authored value moved out of the render code into
  `src/lib/scene/hero-scene.config.ts` (particle size, bloom, model placement,
  camera, scatter, parallax) with a `HERO_SCENE_LIMITS` range per field. A
  development-only panel (`views/home/hero/scene-controls.tsx`) drives them live
  and copies any group — or the whole config — as JSON to paste back.
  - **Bloom** runs through `EffectComposer` + `UnrealBloomPass`. Per
    [[optimize-3d-scene]] §6 the pixel-ratio clamp is applied to the **composer
    as well as the renderer** — clamping only the renderer throws the saving
    away — and the cheapest tier skips the composer entirely (`allowBloom`).
  - **Hover scatter** displaces particles in the **vertex shader** from a cursor
    uniform (§9), not a per-frame JS loop over 87k points. The cursor is
    converted into the group's local space each frame because the parallax
    rotation moves that space underneath it. Force, area, turbulence and easing
    are all tunable; the effect eases back to rest when the pointer leaves.
  - Device tiers now carry `pointSizeScale` and `allowBloom` instead of an
    absolute `pointSize` — the tier says what the hardware can afford, the
    config says what the design wants, so a tuned look stays portable.
  - The panel and `three` each sit in their own dynamically-imported chunk
    (8 KB / 540 KB); the prerendered HTML references neither, and `/` stays `○`.
  - **Lighting moved from the CPU into the vertex shader.** Shading used to be
    baked into a colour attribute at build time, which made re-colouring the
    rig an 87k-point rebuild — unusable behind a colour picker. The geometry
    now carries the approximated **normal** (which never changes) and the key /
    rim / fill colours are uniforms, so the panel's colour controls cost a
    uniform write. `buildHeroCloud` no longer takes a palette.
  - **Colour controls** (key / rim / fill) with a swatch and a hex field. Their
    **Copy CSS** emits `--raw-color-scene-*` declarations rather than JSON,
    because colours belong in `globals.css` as tokens (hard rule #4) — the
    config's hexes only mirror them so the panel has something live to drive.
  - **Model rotation** (X/Y/Z, authored in degrees) joined the panel. Parallax
    had been *assigning* `rotation.x/y` every frame, which would have wiped a
    dialled-in angle on the next tick — it now adds its swing as an **offset**
    on top of the resting orientation.
  - Copy falls back to a selection copy when `navigator.clipboard` is missing
    (plain http on a LAN address — how you'd check the scene on a phone) and
    now reports **Failed** instead of looking like a no-op.
- **Hero subject is now a live WebGL point cloud** — the flat reference render
  was replaced by 86,977 particles driven from `public/assets/hero/vertices.json`,
  lit to match the original: a blue key from front-left, a red rim from
  back-right, the two lobes overlapping into the magenta on the right shoulder.
  Colours come from new `--scene-*` tokens, read once at mount via
  `getComputedStyle` (a shader cannot resolve a CSS variable). Cursor parallax
  turns the bust ±0.26 rad, low-passed per frame. New: `three` dependency,
  `src/lib/scene/device.ts`, `views/home/hero/particle-scene.tsx` +
  `hero-visual.tsx`. See [[decisions-log]] ADR-0020, [[tech-stack]], [[utils]].
  - **The buffer is spatially sorted by X**, so down-sampling for a lower tier
    had to be a *stride*, not a slice — truncating the tail would have deleted
    one entire side of the model. This is the [[optimize-3d-scene]] §7 trap,
    hit for real.
  - Source data is Blender-space **Z-up with the face toward −Y**; mapped to
    three's Y-up as `(x, z, −y)`, confirmed against the vertex bounds (shoulders
    span 1.85 on X, head only 0.76) before writing any render code.
  - The source carries **no normals**, so shading uses a radial direction from
    the centroid with the vertical component damped — and a **half-lambert** key
    (`dot * 0.5 + 0.5`), because a hard `max(0, dot)` left most of the cloud
    near black.
  - Two bugs worth recording: an extra `tan(fov/2)` in the point-attenuation
    maths produced `gl_PointSize ≈ 1370px` (one screen-filling blob) — the
    correct scale is three's own `drawingBufferHeight * 0.5`, and solving for it
    lets `pointSize` stay authored in CSS px. And a custom `ShaderMaterial` gets
    **no automatic output conversion**: without `#include <colorspace_fragment>`
    the linear working-space colours are written straight out as sRGB and read
    muddy.
  - Perceived density, not light level, was what made the first pass look dim —
    87k points at 1.5px cover only ~25% of the subject's area. Point size went
    to 2.4px rather than raising intensity further.
- **Home hero built from Figma `Hero 6`** (node `1163:293`) — the first real
  section in this project, so the home view is no longer empty. A 1440×800
  composition rebuilt at **90rem × 50rem**: every Figma coordinate is the px
  value ÷ 16, so the adaptive grid ([[components/common]]) scales the whole
  layout proportionally and every offset is exact at the 1440 design base.
  Verified against the Figma frame in the browser — headings at 40/138 and
  right-40/639, CTA at 1196/16 (204×54), stat labels at 1270/217, 1090/418,
  190/567, and all eight crosshairs on their intersections, each matching to the
  pixel. New: `views/home/` (view + `hero/` section, five Server Components),
  `data/mocks/home.ts`, `types/hero.ts`, `public/assets/hero/`.
  - The rule grid turned out to be **eighths** — Figma's nine verticals land on
    180px steps across 1440, so they are authored as `12.5%` multiples and stay
    on the grid at any width rather than being pinned to rem offsets.
  - The **CTA is one gradient, not three.** In Figma the button is a single
    gradient rectangle masked by its own artwork, so frame, label and chevrons
    all read the *same* ramp across the full 204px — confirmed by sampling the
    rendered PNG (the label's blue at x=25 is the ramp's value at 12.25%, not a
    fresh gradient). Reproduced by sharing `--gradient-accent` three ways:
    a masked pseudo-element for the frame, `background-clip: text` on the anchor
    box for the label, and an SVG gradient still expressed in the button's own
    0→204 user space for the chevrons. The chevrons' white→grey fills in the
    unmasked export are dead — the mask overrides them.
  - Text sits on Figma's **cap-height** box (`text-box: trim-both cap
    alphabetic`), which is what makes the vertical offsets land exactly.
  - Hero image swapped to the **2880×1600 original** (the 1440×800 export was
    the source, so `next/image` had nothing to serve a 2× display and upscaled).
- **Brand typography + dark-only theme** — **Inter Tight** (400/500) and **Space
  Mono** (400) now load via `next/font/local` from `src/app/fonts/`, replacing
  Onest from `next/font/google`; `--background`/`--foreground` no longer flip
  with `prefers-color-scheme`. See [[decisions-log]] ADR-0019 and
  [[design-system]].
- **Views may be folders** — a page's own sections co-locate in
  `views/<page>/<section>/`, resolving the gap between "feature components go
  next to the feature" and "one view file per route". `views/home.tsx` →
  `views/home/index.tsx`; the route's import is unchanged. See
  [[decisions-log]] ADR-0018 and [[folder-structure]].
- **New tokens** — `--raw-color-black`, `--raw-color-neutral-600`,
  `--raw-color-white-alpha-15/20/40`, the `--raw-color-sky-300/-sky-400/-blue-500`
  accent ramp, the `--raw-text-*` / `--raw-leading-*` / `--raw-tracking-*` scale,
  and `--raw-size-hairline` (1px, deliberately not a rem — hairlines must not
  scale with the grid); Tier 2 `--foreground-muted`, `--rule`, `--rule-strong`,
  `--marker`, `--accent-start/-middle/-end`, `--gradient-accent`, `--hairline`.
  `@layer components` gained its first entry, `.gradient-frame`.
- **Build & lint verified clean** — `yarn lint`, `tsc --noEmit`, and `yarn build`
  all pass with 0 errors and 0 warnings; `/` prerenders static.

## 2026-07-25

- **Released into the public domain (Unlicense)** — the starter now ships a root
  `LICENSE.md` carrying the [Unlicense](https://unlicense.org) and declares
  `"license": "Unlicense"` in `package.json`. Anyone may copy, modify, sell, or
  redistribute it with **no attribution requirement and no copyright retained** —
  the intent being that projects built from this starter can absorb it wholesale
  without carrying a notice. Briefly authored as MIT in the same session and
  changed before any release; the MIT attribution clause was the specific thing
  being dropped, so a recognized no-attribution licence was chosen over an
  edited MIT text. `"private": true` is unchanged, so npm publishing stays
  blocked regardless — the licence governs redistribution of the source, not
  registry availability.

## 2026-07-24

- **`optimize-3d-scene` hardened from its first field run** — the skill was run
  on a real raw-WebGL scene (no three.js, no scroll) and eight gaps came back,
  ranked by the time each cost. Fixed in `SKILL.md` and `references/patterns.md`:
  **§0** now ships a `getContext` hook so a non-three.js scene has counted
  equivalents of `renderer.info` (`draws` / `verts` / `links[]` timestamps /
  captured `attrs`) — previously §0 was unexecutable there — plus the
  *measurement environment* rules that invalidate everything if missed
  (production build only: dev's eager chunks fake a §1 failure and Strict Mode's
  double-mount fakes 2 listeners and a halved fps; kill the stale server;
  `waitUntil: "load"`, since `networkidle0` never fires against `next start`;
  SwiftShader is not a GPU, so only counted quantities transfer). **§3** now
  states that **§1 breaks it** — `dynamic(ssr: false)` pushes compilation past
  hydration, measured at 5.0 s against a loader lifting at 2.36 s — and gains a
  fifth stall cause (CPU decode/parse → **Worker**, 3.9 s measured) and the
  `as="fetch"` preload credentials trap (only `use-credentials` + `include`
  dedupes; the others silently download twice). **§5** admits `1000/30` measures
  ~26 fps given the ticker's `<=` throttle. **§7** requires a decile ordering
  check before truncating a baked point buffer (one was spatially sorted —
  truncating would have deleted half the subject). **§13** splits canvas `lvh`
  from content `dvh`. **§1**'s poster is rejustified — crawler screenshots and
  the no-WebGL fallback, not layout stability — with two crops and the
  `headers()` → static-prerender (`○`→`ƒ`) trade-off named. Unchanged on
  purpose: the cheapest-first order, the canonical-file table, and "port, don't
  invent". ADR: [[decisions-log]] ADR-0017.
- **`optimize-3d-scene` skill registered in the vault** — the new skill at
  `.claude/skills/optimize-3d-scene/` is now a first-class part of the workflow
  set, documented in [[optimize-3d-scene]] and linked from the
  [[README|Map of Content]] and [[ai-agent-guide]].
  **Routing rule (AGENTS.md hard rule #11):**
  a performance / jank / pre-ship request on a project that renders a three.js
  or WebGL scene must invoke the skill and follow its fourteen-step order — no
  improvised fix list. The vault note also maps the skill's canonical patterns
  onto primitives the starter *already* ships, so nothing gets duplicated:
  `subscribeToTicker` (`src/lib/animation/ticker.ts`, ADR-0009) is the one
  app-wide rAF loop the skill's §4/§5 ask for, `isBot()` (`src/utils/is-bot.ts`,
  ADR-0010) is the §1 bot path, the Lenis scroll store is the §9/§10 scroll
  source, `useDynamicInView` is the §4 visibility gate, and `lvh.ts` covers §13
  sizing. Only device tiering (§2) has no local equivalent. The starter itself
  carries **no `three` dependency** ([[tech-stack]] unchanged) — this applies to
  projects built from it. ADR: [[decisions-log]] ADR-0016.
- **Fixed a broken path inside the skill** — its closing "write it down" step
  pointed at `obsidian/Meta/changelog.md` / `decisions-log.md` (capital `M`, and
  an `open-questions.md` that does not exist here), so an agent following it
  would have written to a non-existent folder. Rewritten against this vault's
  actual `obsidian/meta/` layout.
- **`ai-agent-guide` gained a Skills section** — how skills are registered
  (drop in `.claude/skills/<name>/`, add a `workflows/` note, link from the MoC
  and the skills table, log in the changelog), so the next skill follows the
  same path.

## 2026-07-17

- **README — one-prompt quick start** — added a copy-paste **⚡ Start in one
  prompt** block at the top of the README: a single prompt that has Claude Code
  (or Cursor) clone the starter, detach it from this repo's git history, read the
  vault first, and run the default install. The manual [Getting started](../../README.md#getting-started)
  path stays below for anyone who prefers it.
- **Fixed: `cp .env.example .env` broke `/api/contact`** — surfaced by writing
  that step into the quick-start prompt. Copying the example leaves
  `CONTACT_ENDPOINT=` (blank), which reaches zod as `""`, and `""` is not
  `undefined` — so `z.url().optional()` rejected it. The route returned **HTTP
  400 `{"path":"CONTACT_ENDPOINT","message":"Invalid URL"}`**, misreporting a
  *server misconfiguration* as the caller's bad input. `src/env.ts` now routes
  optional URLs through an `optionalUrl()` helper that preprocesses `""` →
  `undefined`. Verified end-to-end: a valid POST now returns 200, and genuinely
  invalid payloads still return 400. Any new **optional** variable must use the
  same helper — see [[environment-variables]].
- **README — corrected clone URL & Node requirement** — step 1 pointed at
  `github.com/textura/next16-claude-starter` (wrong org — the repo is
  `textura-agency/…`), so the documented clone would 404. Also added the Node
  floor (**22.13+**; 20.19+ works, 24 LTS recommended) — below it `yarn install`
  fails outright on `eslint-visitor-keys` — and the missing
  `cp .env.example .env` step.
- **TextEngine alignment & clipping rules documented** — two failure modes that
  bite every TextEngine block, now written into [[text-engine]] (new *Alignment &
  line-height* section), [[text-engine-reference]], and AGENTS.md hard rule #3.
  **(1)** The container renders `display: flex; flex-wrap: wrap`, so words are
  flex items and `text-align` cannot position them — a lone `text-center`
  silently does nothing. Always pair `text-*` with `justify-*` on the tag
  (`justify-between` is a trap: it spreads *words*, not lines). **(2)** `overflow`
  sets `overflow: hidden` on `inline-block` wrap layers whose height comes from
  `line-height`, so tight leading shaves descenders and accented caps — keep
  leading ≥ 1.1 via the new `leading-display` token, never `leading-none` with
  `overflow`, and watch for `text-5xl`+ which ship `line-height: 1`. Both fixes
  are **classes on the `TextEngine` tag** — no wrapper component, no helper to
  import. Verified against the `spring-text-engine@0.1.5` dist source.
- **Strict three-tier token naming convention** — tokens now follow a fixed,
  portable grammar so names are predictable across every project built from this
  starter: `--raw-<category>-<name>` primitives → `--<role>` semantic →
  `--<tw-namespace>-<role>: var(--<role>)` bindings in `@theme inline`. Only
  Tier 1 holds literals; Tier 2 names purpose and is the themeable layer.
  `globals.css` restructured accordingly — **no brand palette invented**, the
  convention is the deliverable. Two deviations from the reference article,
  verified by compiling a probe against `tailwindcss` v4.3.3: primitives are
  `--raw-*` and stay out of `@theme` (a `--color-*` entry would generate
  utilities and let markup skip the semantic tier), and **`--duration-*` is not a
  Tailwind v4 namespace** — `duration-fast` compiles to nothing, so durations
  stay Tier 2 and are used as `duration-[var(--duration-fast)]`. See
  [[decisions-log]] ADR-0015 and [[design-system]].
- **Narrow CSS-transition exception** — hard rule #1 no longer bans CSS
  transitions outright. CSS `transition-*` is allowed for simple discrete state
  changes only (hover/focus colour, opacity, border, small nudges), requiring
  token-backed timing (`duration-[var(--duration-fast)] ease-entrance`),
  `transition-*` only (`@keyframes` still banned), and utilities only. Everything
  scroll-driven, revealing, staggered, or layout-affecting stays spring-based.
  A hover colour fade no longer needs a client component wrapping `<Hover>`. See
  [[decisions-log]] ADR-0014, [[animation-system]], [[design-system]].
- **New tokens** — `--raw-color-white` / `--raw-color-neutral-100/900/950`,
  `--raw-duration-fast/normal`, `--duration-fast/normal`, `--leading-display`
  (1.1 — the TextEngine clip floor), `--ease-entrance`.
- **Build & lint verified clean** — `yarn lint` and `yarn build` both pass with 0
  errors and 0 warnings; no lint fixes were needed. Note: `yarn install` **fails
  on Node 20.17** (`eslint-visitor-keys` requires `^20.19 || ^22.13 || >=24`) —
  use Node ≥ 20.19; this repo was verified on 24.16.

## 2026-06-07

- **Fixed `<Inview>` standalone reveal + spring resize gating** — `<Inview>`
  never animated unless an external `trigger` ref was passed. The JSX `ref`
  callback wrote `inViewRef.current = node`, but that tuple slot is a *callback
  ref* (`setNode`), so the element was never observed and the `node` stayed
  `null`. Now calls `setInViewNode(node)`. This was also a build-breaking type
  error. Additionally, `<Inview>`, `<Spring>`, and `<Hover>` tracked `width` as a
  hook dependency but never passed it to `isMobileDisabled` — fixed by passing the
  tracked `width`, restoring resize re-evaluation and clearing the
  `react-hooks/exhaustive-deps` warnings. `yarn build` and `yarn lint` are now
  clean. See [[decisions-log]] ADR-0013 and [[components/animation-springs]].

## 2026-06-05

- **Home view emptied** — removed the animation showcase (`src/views/home-showcase.tsx`
  deleted) and reduced `HomeView` to an empty `<main>`. The home view is now the
  blank starting point for new work. Documented the convention — *if the project
  is empty and no other instructions are provided, start developing in the home
  view on route `/`* — in [[ai-agent-guide]] and [[new-page]].

## 2026-05-23

- **README — setup + Vercel deploy steps added** — *Getting started* expanded
  into a four-step flow (clone the template → delete bundled `.git` →
  initialise your own GitHub repo → install & run), with a macOS hint for
  revealing the hidden `.git` folder (`⇧ + ⌘ + .`). Added a *🚀 Deploy to
  Vercel* section covering the CLI flow (`vercel` / `vercel --prod`) and the
  dashboard import path, plus an `env pull` pointer to
  [[environment-variables]].
- **README rewritten to lead with the AI workflow** — root `README.md`
  reorganised so the AI usage guide is the first section: how the three
  `.claude/settings.json` hooks (`SessionStart`, `UserPromptSubmit`, `Stop`)
  enforce the vault workflow automatically, how to write a good request
  against this convention layer, and a cost-expectations note recommending
  **Claude Max (5×)** as the minimum plan (the vault-fan-out + hook
  re-injection on every turn is token-intensive by design). Technical
  *Getting started* and the existing AI-agents entry-point pointer stay
  below.

## 2026-05-22

- **Styling-placement convention added** — to stop `globals.css` accumulating
  hundreds of component-specific classes, styling now follows a strict
  placement order: one-offs are Tailwind utilities, repeated patterns become
  **React components** (not `@layer components` classes), and `@layer
  components` is reserved strictly for pseudo-elements and third-party
  overrides. `globals.css` stays bounded — `@import`, tokens, base resets only.
  No CSS Modules. Codified in [[decisions-log]] ADR-0012; [[design-system]]
  (new *Where a style goes* section) and [[component-conventions]] updated.
- **Semantic-HTML / SEO-markup convention added** — new [[html-semantics]]
  rulebook: landmarks, one `<h1>` + heading outline, native elements over
  `div`s, forms/images/ARIA, JSON-LD over microdata, a `data-*` convention, and
  passing a semantic `tag` to animation components. Codified as AGENTS.md hard
  rule #10; cross-linked from [[component-conventions]] and [[new-page]]. Fixed
  the demo (`home-showcase.tsx`) to a single `<h1>` to follow it.
- **API layer added** — a convention for reaching external services.
  `app/api/<resource>/route.ts` Route Handlers own their logic and read secret
  env vars directly (safe — route files never reach the browser). New: `zod`
  dependency; `src/env.ts` (validated env, public/server split); `src/lib/api/`
  (`handle` wrapper + `ApiError` + `{ data }`/`{ error }` envelope);
  `src/lib/api-client.ts` (typed same-origin fetch); example
  `app/api/contact/route.ts`. Codified as AGENTS.md hard rule #9. See
  [[decisions-log]] ADR-0011 and [[api-architecture]].

## 2026-05-21

- **Asset convention added** — site content assets (images, videos) now live
  under `public/assets/<section>/`, one folder per section; meta/PWA/SEO assets
  stay at the `public/` root. Documented in [[folder-structure]],
  [[component-conventions]], and the [[new-page]] playbook; `public/assets/`
  created with a `.gitkeep`.
- **SEO & performance hardening** — a broad pass on the starter. **SEO:** new
  `src/lib/site.ts` config (single source of truth, fed by `NEXT_PUBLIC_SITE_URL`);
  `metadataBase` is now always set (relative OG/canonical URLs resolve);
  `themeColor` moved to a `viewport` export; added `app/robots.ts`,
  `app/sitemap.ts`, and an `Organization`+`WebSite` JSON-LD helper; OG image
  dimensions corrected to match the asset; dead `keywords`/`other` tags dropped.
  **Performance:** populated `next.config.ts` (`removeConsole` in prod,
  AVIF/WebP, `next/image` breakpoints aligned to the grid, `poweredByHeader:
  false`); fixed a `requestAnimationFrame` leak in `ScrollLayout` (Lenis loop
  never cancelled on unmount); `HomeView` is now a Server Component with the
  animation demo split into the `HomeShowcase` client leaf; added
  `<ReducedMotion>` (honours `prefers-reduced-motion` via react-spring's global
  `skipAnimation`); removed a per-frame `console.log` from the demo; added
  `app/loading.tsx` / `error.tsx` / `not-found.tsx`. See [[decisions-log]]
  ADR-0010, [[seo-metadata]], and [[environment-variables]].
- **Animation engine — lint pass** — cleared all 13 pre-existing ESLint problems
  in the engine (2 errors + 11 warnings), an authorized engine edit (ADR-0009).
  `isMobileDisabled` now takes an optional `viewportWidth` argument, so the
  `active` memos in `<Spring>` / `<Hover>` / `<Inview>` / the trigger hooks
  depend on it genuinely. Added missing `disableOnMobile` effect deps; fixed a
  `trigger.current`-in-cleanup hazard in `<Hover>`; ref-stabilised `<Handle>`'s
  transition effects. **API change:** `useProgressTrigger` now returns `progress`
  as a `RefObject<number>` (read `.current`) instead of a render-time ref read —
  no consumer was affected (`<ProgressTrigger>` discards the return).
- **Animation engine — performance refactor** — fixed load issues that scaled
  with the number of animated components. Added `src/lib/animation/ticker.ts`, a
  single reference-counted `requestAnimationFrame` loop; `useLoop` (and all loop
  hooks) now subscribe to it instead of each starting its own rAF. `useWindowWidth`
  / `Height` / `Size` now share one debounced `resize` listener via a
  `useSyncExternalStore` store (the `debounceDelay` param was dropped — unused).
  `useDynamicInView` rewritten without the per-render `Proxy`/observer churn.
  Fixed a stale-closure bug in `useLoop`. `mode="forward"` scroll listeners made
  `passive`. This was an **authorized edit to `#do-not-modify` engine files** —
  hard rule #2 amended. See [[decisions-log]] ADR-0009 and [[animation-system]].
- **`spring-text-engine` updated** — bumped `^0.1.3` → `^0.1.5` (latest). The
  public API, types, and dependencies are unchanged between these versions
  (verified) — an internal-only patch bump, no code changes required.
- **Adaptive scaling grid added** — a root-font-size scaling system landed in
  `src/components/common/grid/` (`<AdaptiveGrid>` + `useAdaptiveGrid` hook +
  `grid.config.ts`), with `vw` media queries in `globals.css` for scale-down.
  It was dropped into `common/` as a `styled-components` system; ported to the
  project stack — config-driven TS + CSS-only Tailwind, no `styled-components`.
  The unused dropped files (`colors.ts`, `fonts.ts`, `utils.ts`, `index.ts`,
  the `styled-components` `grid.tsx`) were removed. Mounted via `<AdaptiveGrid>`
  in the root layout. See [[components/common]] and [[decisions-log]] ADR-0008.
- **Vault created** — `obsidian/` Obsidian vault initialised as the project's
  second brain. Architecture, frontend, and workflow docs populated. See [[decisions-log]] ADR-0001.
- **Root README rewritten** — replaced `create-next-app` boilerplate with a real
  project README that points into this vault.
- **`generic-layout-prompt.md` moved** — relocated from repo root to
  `obsidian/workflows/` as [[generic-layout-prompt]].
- **Navigation convention resolved** — standard `next/link` confirmed; the unbuilt
  `<AnimLink>` / `useAnimRouter()` convention dropped. See [[decisions-log]] ADR-0005.
- **Docs consolidated into the vault** — `project-specs.md` deleted (decomposed into
  vault notes + new [[environment-variables]]); `text-engine-docs.md` moved in as
  [[text-engine-reference]]. `AGENTS.md` rewritten as a thin shim; `.cursorrules`
  repointed to `@AGENTS.md`. The vault is now the single source of truth.
  See [[decisions-log]] ADR-0006.
- **Vault renamed & restructured** — vault folder `getlayers.io/` → `obsidian/`;
  number prefixes dropped from section folders (`00-meta` → `meta`, etc.). Project
  name standardised to **`next16-claude-starter`** across docs and `package.json`.
- **Components linked to docs** — every file in `src/components/` now carries a
  `// 📖 Docs:` pointer comment to its catalog note, so agents can jump from code
  to docs and back.
- **Vault workflow automated** — added `.claude/settings.json` with `SessionStart`,
  `UserPromptSubmit`, and `Stop` hooks that make agents read the vault first,
  follow the relevant guide, and update docs after every change — with no manual
  reminder. See [[decisions-log]] ADR-0007 and [[ai-agent-guide]].
- **Cookie component replaced** — the `react-cookie-consent`-based `cookie.tsx`
  was replaced by an in-house `Cookie/` component (banner + category preferences
  modal + Zustand store). `react-cookie-consent` removed from dependencies. The
  component shipped using `styled-components` + an external design system; it was
  ported to the project stack — Tailwind v4 tokens and `@react-spring/web` motion.
  Mounted via `<LazyCookie>`. See [[components/common]].
- **Fixed TextEngine spring type mismatch** — the `mode="once"` heading in
  `views/home.tsx` mixed `lineIn={{ y: 0 }}` (number) with `lineOut={{ y: "100%" }}`
  (string), throwing *"Cannot animate between _AnimatedString and _AnimatedValue"*.
  Changed to `y: "0%"`. The buggy pattern in [[text-engine]] / [[text-engine-reference]]
  examples was corrected and a type-matching gotcha note added.

## Project baseline (git history)

| Commit | Description |
|--------|-------------|
| `94b0870` | feat: update starter |
| `5280ef2` | fix: linter errors & build |
| `b2b84e6` | initial — `next16-claude-starter` scaffold |

> [!note]
> The starter shipped with: Next.js 16.2, React 19.2, Tailwind v4, `@react-spring/web`,
> `spring-text-engine`, Lenis, and Zustand. See [[tech-stack]] for the current state.

## 2026-08-19

- **Deleted the dark-luxury build.** `src/views/home/` (27 files, ~4,970 lines)
  and the five content modules only it imported — `hero.ts`, `closing.ts`,
  `platform.ts`, `spine.ts`, `stage-data.ts`. Unblocked by repointing the share
  card at `site.ts`. Thirteen modules and the `three` dependency are now
  orphaned but left in place pending a decision.
- **Share card rebuilt.** Inter via static instances cut from `inter-var.woff2`
  with `fontTools.varLib.instancer` (Satori cannot read a variable `woff2`);
  the page's own ground and accent ramp; copy from `site.ts` so it cannot drift
  from the hero. `apple-icon` unchanged.
- **Candidate-journey grounds sized by aspect ratio**, not a rem height — see
  ADR-0027. Step 03's artwork landed.
- **Restored "or campaign landing page"** in five places (V2_HANDOVER §6.2).
- **Vault reconciled** to the real route map: `/` renders `SiteView` from
  `src/views/site/`. Notes had described the starter's empty `views/home.tsx`
  since before the Aurora rebuild.
- **Glass chip variant for deep grounds.** `--raw-surface-glass-dark` /
  `--surface-chip-on-dark`, applied automatically to any `.chip` inside
  `.bg-07`–`.bg-15`. Added because the AI enrichment demo moved onto a deep
  ground, where the white chip pill competed with the white button beside it.
- **AI enrichment sits on `bg-15`** instead of the pale wash.
- **Candidate journey is a scroll-pinned card stack.** `use-stack-rise` (new)
  measures per-card arrival and burial; react-spring applies it. Cards, copy
  and shots are unchanged — only the arrangement. Falls back to plain stacked
  rows wherever a pinned card would not fit the viewport, which is every phone.

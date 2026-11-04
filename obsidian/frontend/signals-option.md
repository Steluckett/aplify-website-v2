---
tags: [frontend, design]
updated: 2026-11-04
---

# The SIGNALS option (branch `design/signals-steer`)

A second, fully reimagined homepage built on marketingsignals.com's section
patterns, measured off their live build. On this branch it renders at `/`;
the Aurora page is kept at `/classic` (noindex) for comparison. See
[[decisions-log#ADR-0035 — A second homepage option built on marketingsignals.com's patterns|ADR-0035]].

## Where it lives

```
src/app/signals.css            Tokens, scoped to .signals (three tiers)
src/data/content/signals.ts    Which approved copy fills which pattern
src/views/signals/             The page, one file per pattern
src/app/classic/page.tsx       The Aurora page, for comparison
```

## What was measured

- **Type** — their Tailwind ladder rem for rem: hero 82px (lg) / 120px (xl),
  section heads 70, panel heads 62, split heads 55, statement 75, card titles
  46, hero sub and card statements 30, quotes 23, body 16 / 1.33. Weight 600,
  tracking −0.04em everywhere at display size.
- **Face** — they set Noi Grotesk (commercial, not licensed here). Schibsted
  Grotesk via `next/font/google` is the measured stand-in: same two-storey g
  and straight-legged R, and within 1% of Noi's set width at 600 / −0.04em.
  Hanken Grotesk (the first pick) ran 6% narrow, which is why the tracking
  read wrong. Display type runs at WEIGHT 700: Schibsted's 600 strokes
  thinner than Noi's 600 and read as weaker; 700 matches the stroke and sets
  within ~4% of Noi's width. Licensing Noi itself is the remaining upgrade.
  `.screen` keeps Inter.
- **Colour** — NOT theirs any more (Stephen, 2026-11-04): their purple and
  lilac are dropped. Near-black `#0e0a10` is our dark, creme 100–500 the
  ground, and colour comes from two hues only: Aplify royal blue `#2563c9`
  (accent text on creme 4.97:1, white on it 5.67:1, the primary pill) and
  their lime `#dbfe87`, plus one pale royal tint `#b4c9f5` for card grounds
  and accents on black (11.8:1).
- **Geometry** — full-bleed, 40px gutter (20 on phones), max 1920; section
  padding 96 / 128 / 160 / 192 by breakpoint (half again on theirs — at their
  values the page read crammed); the hero band is full-viewport
  with its FOOT rounded 30px, and the footer band has its TOP rounded 30px;
  panels radius 20, padding 100/50. Pills 42px with a 1px creme-300 edge.
- **Photography** — tinted full-bleed photos in the slider, square and 16:9
  photos in the split section, a photo strip in the hero, a 2×2 in the
  footer card. Placeholder Unsplash stock in `public/assets/stock/` (sources
  in its README); replace before launch.
- **Motion** — theirs is GSAP + ScrollTrigger, Lenis and Swiper. Ours is the
  same effects in springs: a looping linear spring for the hero strip, a
  scroll-scrubbed `SpringTrigger` lift, a spring-smoothed word fill, rolling
  odometer digits, spring slide tracks (`use-track.ts`) for both carousels,
  spring-height accordions, and `position: sticky` for the stacked deck.

## Pattern map

| Reference | Aplify content |
| --- | --- |
| Hero + tilted strip | completion headline, product shots |
| "Who we are" word fill | why we built it |
| Odometer stats | four sourced figures (see `sigStats`) |
| Services slider | the four candidate steps |
| "Built Around Search" (centred h2 + two 12-col split rows) | where it sits / why they leave |
| Featured-work panel | proof (three case studies) |
| Industries deck | six stages |
| (no twin) | live job search demo |
| "What makes us different" | implementation |
| Testimonial wall, heading pinned with `sticky` | three quotes + three case results |
| Insights | security |
| FAQ panel | buyer questions, answered in approved copy |
| Statement-style word fill + black card | what it costs |
| Insights header + creme panel (×4) | job search, brand, AI rewrite and dashboard demos |
| Raw vs clean rows on the card palette | better data |
| Split: argument + two cards (person / Google) | Google for Jobs |
| Ruled "brands" grid | integrations (Eploy in lime, text only) |
| Close + footer | the ask |

Every band of the Aurora page now has a home here, in its original order.

## The demos, re-skinned

The live demos are Aurora components and are NOT forked. Wrapped in
`.sig-product`, their tier-2 roles are re-pointed at this page's palette in
`signals.css`: creme surfaces, white tiles ruled in creme-300, near-black
ink, royal blue for every accent, focus ring and primary button, this
page's face and radii, no shadows, Aurora's light grounds flattened to
creme-200 and its deep grounds to near-black, and no tracked capitals.
The brand demo's preview keeps its own colours by design (it shows a
client's brand). Change a demo's look here, never in the demo.

**Immersive, not boxed.** The job search, Easy Apply, dashboard and brand
demos carry `data-sig` hooks on their containers (`route-switch`,
`search-wrap`, `search`, `results`, `job-card`, `apply-stage`,
`apply-card`, `apply-head`, `brand-wrap`, `brand-stage`). The hooks are
inert on /classic. Under `.sig-immersive` the panels, insets, shadows and
the controls-straddle-the-panel overlap are removed, so each demo sits on
the paper at the full wrap width: white pill fields ruled in creme-300 and
a black Search button, lime job cards with black ink and black buttons,
Easy Apply as one white card with a lime job header, and the brand stage
flat in its own derived base colour (`--b-stage`) instead of blobs. All
functionality is unchanged.

Later passes (2026-11-04) extended the hooks and the language:
- **Job cards** (`job-card`, `job-table`): rounded 20px outline boxes, even
  hairline, real padding, 40px titles, family on lime / hours on blue tint,
  in grid, list and map. Easy Apply (`apply-btn`) is the page's 42px pill
  with the ↗ (the demo's → turned a quarter back).
- **Search and filter bars** (`search`, `search-wrap`): transparent 56px
  pills, black 1px edge, bold text, a search glass and heavy chevrons as
  SVG data URIs; shared with the dashboard.
- **Apply route**: lifted out of the demo into two text toggles under the
  standfirst (`JobSearchDemo` takes optional `route` / `onRouteChange` /
  `hideRouteSwitch`). The link-out note (`link-note`) is a blue-tint card.
- **Easy Apply flow** (`apply-*`): no white card; outline job box, outline
  question boxes with chunky Yes/No, 56px fields two to a row, a lime
  confirmation and an outline gate, both with display headings.
- **Dashboard** (`dash-table`, `dash-panel`, `dash-tabs`): outline rows,
  bold names and IDs, a creme hover fill, status pills on the page palette
  (Accepted lime; Submitted / Reviewed / Shortlisted blue tint; Rejected /
  Withdrawn creme) keeping their state dots; slide-overs as creme sheets
  with a black edge and display titles.
- **Standfirst baseline**: `.sig-baseline` lifts a paragraph beside a
  display heading onto the heading's baseline (`--raw-sig-baseline-lift`,
  measured — it was 18px low).

## Rules it keeps

- No new claims: every fact comes from `site.ts` (V2_HANDOVER §5).
- Display leading is 1.1 under the text engine, pulled to ≈0.92 with
  `.sig-lines` negative margin — never the reference's raw 0.92.
- No autoplay on either carousel.

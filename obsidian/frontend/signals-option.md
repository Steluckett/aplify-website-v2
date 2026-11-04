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
- **Face** — they set Noi Grotesk (commercial). Hanken Grotesk via
  `next/font/google` is the closest open neo-grotesk. `.screen` keeps Inter.
- **Colour** — black `#0e0a10`, creme 100–500, purple `#745cf6` (display
  only, 4.01:1), purple ink `#5f46ee` for small text (5.13:1), lilac
  `#afafff`, lime `#dbfe87`.
- **Geometry** — full-bleed, 40px gutter (20 on phones), max 1920; 80px
  between sections; dark panels radius 20, padding 100/50; cards radius 30;
  tiles 15.
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
| Split ×2 | where it sits / why they leave |
| Featured-work panel | proof (three case studies) |
| Industries deck | six stages |
| (no twin) | live job search demo |
| "What makes us different" | implementation |
| Testimonial wall | the three approved quotes |
| Insights | security |
| FAQ panel | buyer questions, answered in approved copy |
| Close + footer | the ask |

## Rules it keeps

- No new claims: every fact comes from `site.ts` (V2_HANDOVER §5).
- Display leading is 1.1 under the text engine, pulled to ≈0.92 with
  `.sig-lines` negative margin — never the reference's raw 0.92.
- No autoplay on either carousel.

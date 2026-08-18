# Aplify website V2 — project notes

Paste this into a new chat to pick the work up cold.

---

## What this is

The customer-facing one-scroll site for Aplify, a recruitment/job-feed SaaS.
Rebuilt from scratch against the **MeetSync reference** Stephen supplied
(behance.net/gallery/235730031), in the **Aurora** design system — the same
skin the Helion admin dashboard ships. Both were drawn from that same
reference, which is why the site and the product look like siblings rather
than a translation.

**Not deployed to a production domain, not on GitHub.** Local git only.

## Run it

```bash
npm run dev -- -p 3100     # or the "aplify-v2" preview target
npm run build && npm run start -- -p 3200   # "aplify-v2-prod"
```

- `/` — the site
- `/styleguide` — every Aurora recipe, rendered from the real tokens
- `/backgrounds` — the 15 numbered blob grounds, with measured contrast

## Where things live

| | |
|---|---|
| Token layer | `src/app/globals.css` — read the header comment first |
| Page sections | `src/views/site/` |
| Live demos | `src/views/site/demos/` |
| Copy | `src/data/content/site.ts` |
| Images | `public/assets/{hero,platform,steps}/` |
| Product spec for other projects | `APLIFY-PRODUCT-UI-SPEC.md` |
| Source of truth for claims | `V2_HANDOVER.md` |
| Old dark build (dead) | `src/views/home/` — safe to delete |

## The hard rule — factual claims

**`V2_HANDOVER.md` §5 is the complete inventory of what may be presented as
fact.** Nothing outside it. I got this wrong twice and both reached the point
of nearly going public:

- I **invented three testimonials** and attributed them to Brandon Trust,
  Cygnet and HC-One with made-up job titles. The real ones are named, cleared,
  and have recorded voiceovers in `public/testimonial_voiceovers/`.
- I **invented a roadmap**, including "deeper native ATS integrations" — which
  inverts a deliberate positioning decision, because native ATS integration is
  **shipped, not roadmap**. The real roadmap is exactly two items.

If you are writing copy for this site, check §5 first. One statistic
(85% → 30% drop-off, Brandon Trust), three quotes, one named third-party
product (Eploy, text only, never the logo).

## Design system, in brief

Full detail in `APLIFY-PRODUCT-UI-SPEC.md`. The load-bearing parts:

- **Inter only.** Marketing scale 96/56/40/32/24/24/18/16/14/12 (hero down to
  eyebrow); product scale inside `.screen` is 11–24px. Sizes came from
  measuring workable.com; letter-spacing (−0.035em) and weight 550 are ours.
- **Two registers.** `:root` is marketing, `.screen` is the product. When
  something feels cramped it is usually still carrying dashboard values.
- **Spacing:** 104 between sections · 64 intro→content · 40 between cards ·
  32 card padding · 24 heading→copy · 16 tightly-bound lines.
- **Depth is tonal**, three steps: ground `#eff1f6` < translucent group <
  white tile. Shadow is secondary.
- **Accent** is the sky→violet sweep. Two versions exist for a reason: the
  bright pair is decorative, the deepened pair (`#0879b8 → #5044d6`) is the
  only one that carries white text at AA.
- **Blob grounds** `.bg-01`–`.bg-15` plus `.grain`. See `/backgrounds` — the
  band tells you what ink can sit on it, and three of them cannot take body
  copy at all.

## Accessibility

Public site, so **AA is held everywhere**, including four places where the
dashboard takes a deliberate exception. Every colour decision in this repo was
measured, not eyeballed. Three traps that actually bit:

1. **A faded white on a gradient is not safe** because it was safe on a solid
   colour. Check the gradient's lightest point.
2. **Contrast on a gradient must be checked per stop.** An average passes
   things that fail visibly at one end.
3. **`getComputedStyle` reports only a surface's base colour**, so every
   gradient on this page reads as white or transparent to an automated check.

## Current state

Built and working: nav, hero, problem table, payoff, platform bento, six
stages, job search + Easy Apply + AI rewrite + recruiter dashboard (all four
demos live and interactive), security, integrations, roadmap, proof,
testimonials, footer.

**Artwork in:** hero, platform feed-import, candidate steps 01, 02, 04.
**Still placeholder:** candidate step 03 (register for events).

## Outstanding

- **Step 03 artwork.** Portrait bleeds like 01/02, landscape centres like 04.
- **OG share image** still renders in Onest — Satori cannot read a variable
  `woff2`, so it needs a static Inter cut.
- **`src/views/home/` is dead** and full of token names that no longer exist.
  Safe to delete; kept only as a fallback.
- **iCloud is syncing this repo** (it lives under `~/Desktop`). It writes
  conflict copies like `routes.d 2.ts` into `.next` that break the typecheck.
  `tsconfig.json` excludes `* ?.ts` as a guard, but the real fix is moving the
  repo somewhere unsynced.

## Gotchas that cost real time

- **Replacing an image needs a dev server restart.** Next's optimiser caches
  variants in memory; deleting `.next/cache/images` under a running server does
  nothing. The tell is aspect ratio, not appearance.
- **Port 3100 is dev, 3200 is the production build.** Dev has served stale CSS
  and stale images more than once. When something looks wrong, 3200 is the
  tiebreaker.
- **`TextEngine`'s container is flex**, so `text-center` on the heading does
  nothing — `justify-center` has to go on the engine's own container via
  `StackedLines`' `lineClassName`.
- **Never `line-height` below 1.1 on animated headings.** The reveal clips to
  the line box and shaves descenders. Tighten with the `.lines-tight` negative
  margin instead.
- **A dead Tailwind class fails silently.** `text-background` survived a token
  rewrite and rendered a button with invisible text.

## How Stephen works

Step by step, confirmation before big moves. Show options rendered rather than
described. Honest pushback over agreement — several of the best decisions here
came from disagreeing and explaining why. Measure rather than eyeball, and say
plainly what you could not verify.

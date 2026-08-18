# Images

Anything in `public/` is served from the site root, so a file at
`public/assets/hero/hero.png` is fetched as `/assets/hero/hero.png`.
Drop files straight in here — no build step, no import, no renaming needed.

## Slots currently reserved

Each of these renders a designed placeholder until a real file arrives. To
fill one, drop the image in and add `src="/assets/…"` to that `ScreenCard`.

| Slot | Folder | Ratio | Where it appears |
|---|---|---|---|
| Hero | `hero/` | 16:9 | The big shot below the hero CTA |
| Feed import | `platform/` | 16:10 | Lead card of the "One platform" bento |
| 01 Search and filters | `steps/` | 4:3 | "Find the right job" row |
| 02 Easy Apply form | `steps/` | 4:3 | "Apply without leaving" row |
| 03 Event registration | `steps/` | 4:3 | "Register for events" row |
| 04 Status email | `steps/` | 4:3 | "Kept informed" row |

Job search, AI enrichment and the recruiter dashboard need no images — those
sections run the real interactive demos.

## What to export

- **Format** — PNG for UI screenshots (sharp edges, flat colour). JPG only for
  photography. WebP is fine and smaller if your tool exports it.
- **Size** — export at **2× the display size** so it stays sharp on a retina
  screen, then stop. The hero displays about 1300px wide, so 2600px is
  plenty; anything larger is weight for no visible gain.
- **Weight** — aim under 400KB each. If a PNG comes out heavier than that it
  is usually a photograph that wants to be a JPG.
- **Naming** — lowercase, hyphens, no spaces: `easy-apply-form.png`. Spaces
  work but have to be URL-encoded everywhere they are referenced.

## One caution

This project currently lives on an iCloud-synced Desktop. iCloud writes
conflict copies named `filename 2.png` when it loses a race. If you see
doubled files in here, that is what happened — delete the duplicate and keep
the original.

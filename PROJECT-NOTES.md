# Aplify site v2 — project notes

Written so a fresh chat can pick this up without re-deriving anything. Read
this, then `AGENTS.md`, then `APLIFY-PRODUCT-UI-SPEC.md` if you are drawing
product surfaces.

---

## What this is

The customer-facing one-scroll page for Aplify, a recruitment/job-feed SaaS.
Rebuilt from scratch during August 2026 against two references at once:

1. **A MeetSync AI Behance concept** Stephen supplied — the composition,
   rhythm and card language.
2. **Aurora**, the shipped design system of Aplify's own admin dashboard
   (`~/Development/Aplify`, `app/assets/stylesheets/helion_aurora.css`).

The key fact that makes the two compatible: **Aurora was itself drawn from
that same MeetSync reference.** The dashboard README says so. So the site and
the product are siblings, not a translation.

**Workable** (workable.com) is the third reference, used only for type sizes
and spacing rhythm, measured off their live homepage.

---

## Where things live

```
src/app/globals.css          The whole design system. Three token tiers.
src/views/site/              The page, section by section
src/views/site/demos/        The four live interactive demos
src/views/backgrounds/       /backgrounds — the 15 numbered blob grounds
src/views/styleguide/        /styleguide — component reference
src/data/content/site.ts     All page copy
public/assets/               Images: hero/, platform/, steps/
APLIFY-PRODUCT-UI-SPEC.md    Handoff sheet for other projects
V2_HANDOVER.md               The source of truth for CLAIMS. See below.
```

The old dark-luxury build is still in `src/views/home/` — dead, unrendered,
kept only because it type-checks. Safe to delete.

---

## Non-negotiables

**1. Every factual claim comes from `V2_HANDOVER.md` §5.** It says: *"Nothing
outside this list may be presented as fact. There is no second stat, no fourth
quote, no other named integration."*

The approved inventory is:
- **One statistic** — Brandon Trust, application drop-off 85% → 30%.
- **Three quotes** — Louise Mitchell (Brandon Trust), Ben Hopwell (Cygnet
  Group), Sammi Yates (HC-One). Verbatim, all cleared, recordings in
  `public/testimonial_voiceovers/`.
- **One named third-party product** — Eploy. Text only, never the logo.
- **Two roadmap items, only these two** — feed-level reporting, Google for
  Jobs. Native ATS integration is SHIPPED, not roadmap.

I got this wrong once: I wrote three plausible testimonials myself and put
them under those real company names, and invented a roadmap. Both were caught
before deploying. **Do not paraphrase, extend or invent in this area.**

**2. Two registers.** `:root` is the marketing register (big type, generous
spacing). `.screen` is the product register — Aurora's 11–24px UI scale,
22/16/12 radii. Anything inside a device frame is `.screen`. When something
feels cramped it is usually carrying dashboard values outside `.screen`.

**3. Contrast is measured, never eyeballed.** WCAG AA on all text — the site
is public, unlike the dashboard, which takes two informed exceptions.

**4. Motion is spring-based** (`@react-spring/web` via
`src/components/animation/springs/`). No CSS keyframes. `TextEngine` never
uses `mode="manual"`, and its clipped-line reveal means display leading can
never go below 1.1 — tightness comes from tracking and the `.lines-tight`
negative margin instead.

---

## The design system in one page

- **Type** — Inter only. Workable's ladder: hero 96px (our one deliberate
  step past them), section heads 56, card titles 32, h4 24, lead 24, body 18,
  small 16, fine 14, eyebrow 12. Weight 550 for display, tracking −0.035em.
- **Ground** `#eff1f6`. Depth is tonal: ground < translucent group <
  white tile. `.card-quiet` (#eef0f5) for cards inside white panels.
- **Accent** sky `#0ea5e9` → violet `#5b4ee0`. Deepened pair
  `#0879b8 → #5044d6` wherever white text sits on it.
- **Spacing** — 104 between sections, 64 intro-to-content, 40 between cards,
  32 card padding, 24 heading-to-copy, 16 tightly-bound lines.
- **Shell** `min(95vw, 1440px)`.
- **Backgrounds** — 15 numbered blob grounds at `/backgrounds`, with measured
  contrast per band. In use: 09 platform card, 12/11/13/14 the four candidate
  rows, 10 the stats section.

---

## Traps already hit — do not rediscover these

- **iCloud is syncing this repo** (it lives under `~/Desktop`). It writes
  conflict copies named `file 2.ts` into `.next`, which fail the typecheck
  pointing at files nobody wrote. `tsconfig.json` excludes `* ?.ts`. The real
  fix is moving the repo off the Desktop.
- **The dev server caches images in memory.** Replacing a file in `public/`
  is not enough — restart the server or you will keep seeing the old one.
  Clearing `.next/cache/images` alone does not do it.
- **Verify on the right port.** 3100 is dev, 3200 is a production build
  (`aplify-v2-prod` in `.claude/launch.json`). Stephen watches 3100. Say which
  port a claim was verified on.
- **`npm run build` kills a running dev server.** Both write to `.next`, so a
  production build clobbers the dev server's chunks and 3100 starts serving a
  truncated CSS bundle — the page keeps its DOM and its section IDs, so it
  looks alive, but every element computes to zero height. It does not
  self-heal; touching a file will not bring it back. Restart the dev server.
  Either stop 3100 before building, or verify on 3200 only.
- **A collapsed page is a build problem, not a layout problem.** The tell is
  `document.querySelector('main').getBoundingClientRect().height === 0` while
  `innerText` still has content. Check that before debugging any CSS.
- **A `rem` height cannot hold a fixed aspect ratio.** The root font-size is
  fluid (`globals.css`, set in `vw` across four bands), so `1rem` is 14.4px at
  1728 and 12.6px at 1512, while the shell caps at 1440. Size image grounds
  with `aspect-[…]`. See ADR-0027.
- **Centre artwork on its content, not its canvas.** `event-registration.png`
  has 24px of margin on the left and 95px on the right, so centring the file
  left it visibly left-hung. Measure the alpha bounding box before trusting
  that a shot is off-centre because of CSS.
- **The browser pane's screenshots fail** on some scroll positions, returning
  blank while the DOM is provably fine. Measure with `getComputedStyle` /
  `getBoundingClientRect` rather than trusting a capture.
- **`getComputedStyle` cannot see gradients.** It reports a blob ground's base
  colour, so a contrast audit built on it is blind to exactly the surfaces
  this page leans on.
- **Opacity tuned on a solid colour breaks on a gradient.** `white/45`
  measured 4.49:1 on flat navy and 2.78:1 on Midnight.
- **Dead Tailwind class names fail silently.** `text-background` survived a
  token rewrite as an invisible button label.
- **Drop images in `public/assets/…`, not `public/` root.** The page only
  reads from the subfolders; a file in root does nothing, quietly.

---

## State as of this handover

**Done:** the full page — hero, problem, payoff, platform bento, four-step
candidate journey, six stages, job search / AI rewrite / dashboard (all four
demos live and interactive, reskinned into Aurora), security, integrations,
roadmap, proof, testimonials, footer. Plus `/styleguide` and `/backgrounds`.

**Outstanding:**
- The OG share card renders in Onest because Satori cannot read a variable
  `woff2`. Needs a static Inter instance — there is no static Inter in
  `src/app/fonts/` yet, only `inter-var.woff2`. It also still draws its
  headline from `src/data/content/hero.ts` (the dead build's copy, reading
  "MORE CANDIDATES. LESS FRICTION.") rather than from `site.ts`, so the card
  is off-message before the font is even considered.
- `src/views/home/` can be deleted — but `opengraph-image.tsx` imports
  `content/hero.ts`, so repoint that at `site.ts` first or the delete breaks
  the build. Deleting also orphans `closing.ts`, `platform.ts`, `spine.ts`
  and `stage-data.ts`.
- The cookie banner and preferences modal link to `/privacy-policy`, which
  404s. Needs the page, a real external URL, or the link removing.
- `jamie.okafor@email.com` appears in the step 03 and step 04 artwork.
  `email.com` is a live domain; content rule §6.5 requires invented people on
  reserved `example.*` domains. Needs re-exporting from source.
- `event-registration.png` is off-centre inside its own canvas and is
  currently corrected by `nudgeXPct: 2.26` in `site.ts`. Re-export it with
  even margins and delete the value.
- Indexing is disabled everywhere. Set `ALLOW_INDEXING=true` in Vercel when
  the site is genuinely ready to be found.

**How Stephen works:** step by step, confirmation before big moves. Show
options rather than describing them. Honest pushback over agreement. Verify
rather than assume, and say plainly what could not be verified.

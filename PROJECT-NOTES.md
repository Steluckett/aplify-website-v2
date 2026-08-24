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

The old dark-luxury build has been deleted. Notes elsewhere describing dark
tokens, Instrument Serif or `ProductShot` are describing that build, not this
one. Thirteen modules it left orphaned — the carousel, scroll-progress,
product-shot and section furniture, plus `src/lib/scene/*` and the `three`
dependency — are kept ON PURPOSE for the job-search and dashboard work; see
"Deliberately retained" below.

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

- **Generated images** (`opengraph-image`, `twitter-image`, `apple-icon`) run
  through Satori, which **cannot read a variable `woff2`** — the browser's
  `inter-var.woff2` is invisible to it. They use static instances cut from that
  same file with `fontTools.varLib.instancer`: `Inter-Display-550.ttf`
  (wght 550 / opsz 32) and `Inter-Text-400.ttf` (wght 400 / opsz 14). Re-cut
  them if the type ramp changes. The share card takes its copy from `site.ts`,
  never from a second string.
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
  steps, 10 the stats section, 15 the AI rewrite panel. Unused: 01–06 (light),
  07, 08. A `.chip` inside any of 07–15 automatically takes the glass fill —
  see the four-case table in `design-system.md`.

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
- **`border-<name>` with an unbound colour paints INK, not nothing.** Tailwind
  v4 falls back to `currentColor`, so a border whose colour token was never
  bound in `@theme` renders as a near-black hairline on a light card. The
  hairline colour here is `--hairline` (`--raw-color-border` `#e6e9f0`) and it
  has **no** `--color-*` binding, so `border-border` and `border-hairline` both
  silently produce ink. Check `getComputedStyle(el).borderColor` against
  `.color` — if they match, the token never resolved.
- **Drop images in `public/assets/…`, not `public/` root.** The page only
  reads from the subfolders; a file in root does nothing, quietly.

---

## State as of this handover

**Done:** the full page — hero, problem, payoff, platform bento, four-step
candidate journey, six stages, job search / AI rewrite / dashboard (all four
demos live and interactive, reskinned into Aurora), security, integrations,
roadmap, proof, testimonials, footer. Plus `/styleguide` and `/backgrounds`.

**Deliberately retained — do not "clean up":**

`src/views/home/` was deleted on 2026-08-19, which orphaned thirteen modules.
They are kept **on purpose**, pending work on the job-search demo and the
recruiter dashboard, because several are the obvious parts to reach for:

| Kept | |
|---|---|
| `components/ui/carousel-dots`, `hooks/use-carousel` | paging a demo |
| `components/ui/product-shot` | framed product screenshots |
| `components/ui/section-head`, `components/ui/pill-button` | section furniture |
| `hooks/use-scroll-progress` | scroll-driven set pieces (the vendored `ProgressTrigger` does not fire for a `top top`→`bottom bottom` pin — see the changelog) |
| `hooks/use-contact-modal` | the demo CTA |
| `src/lib/scene/*` + `three` ^0.185.1 | the particle hero. Least likely of the group to serve either surface, but Stephen's call and it stays until he says otherwise. |
| `components/animation/springs/handle` | inside the `#do-not-modify` folder — needs sign-off regardless (AGENTS.md rule 2) |

`three` currently has **zero importers**. That is expected, not a bug to fix.

**Starting points for that work:** the demos already live in
`src/views/site/demos/` — `job-search.tsx`, `job-map.tsx`, `easy-apply.tsx`,
`dashboard.tsx`, `ai-rewrite.tsx` — with their data in
`src/data/content/job-search.ts`, `job-data.ts`, `uk-map-data.ts`,
`dashboard-data.ts` and `ai-rewrite.ts`. Draw product surfaces against
`APLIFY-PRODUCT-UI-SPEC.md`.
- The cookie banner and preferences modal link to `/privacy-policy`, which
  404s. Needs the page, a real external URL, or the link removing.
- `jamie.okafor@email.com` appears in the step 03 and step 04 artwork.
  `email.com` is a live domain; content rule §6.5 requires invented people on
  reserved `example.*` domains. Needs re-exporting from source.
- `event-registration.png` is off-centre inside its own canvas and is
  currently corrected by `nudgeXPct: 2.26` in `site.ts`. Re-export it with
  even margins and delete the value.
- Indexing is disabled everywhere. Set `ALLOW_INDEXING=true` in Vercel when
  the site is genuinely ready to be found — but note the flag only wires up
  HALF of it. `robots.ts` reads it correctly; `generate-page-metadata.ts`
  hardcodes `robots: { index: true, follow: true }` and never consults it, so
  every page ships `<meta name="robots" content="index, follow">` while
  `/robots.txt` says `Disallow: /`. The two contradict each other. Deliberately
  left as-is while the site is in development (Stephen's call, 2026-08-21);
  wire the meta to the same flag before launch.

## Deploying

No git remote is configured on this repo, so there is nothing to `git push`
and Vercel is NOT deploying from a git integration. The folder is linked
directly (`.vercel/project.json` → `ste-lucketts-projects/aplify-website-v2`)
and deploys are CLI uploads of the WORKING DIRECTORY:

```
npx --yes vercel --prod --yes
```

Two consequences. A deployment is not tied to a commit, so there is no SHA to
trace a build back to; check the tree is clean first. And with no remote,
every commit lives only on this machine — there is no off-machine backup.

**Deployment Protection does not cover the production alias.** The hashed
per-deployment URLs (`…-lqgw4xsi0-…`) redirect to SSO, but
`https://aplify-website-v2.vercel.app` returns 200 with the real page to
anyone. An earlier note claimed the URL needed a login; measured on
2026-08-21, it does not. `robots.txt` keeps it out of search, but it is
public, not private.

**How Stephen works:** step by step, confirmation before big moves. Show
options rather than describing them. Honest pushback over agreement. Verify
rather than assume, and say plainly what could not be verified.

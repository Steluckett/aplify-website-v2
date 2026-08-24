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
- **The root font-size is 16px at every width, as of 2026-08-24.** It used to
  be set in `vw` across four bands — the starter's "adaptive scaling grid" —
  which made `1rem` 14.4px at 1728 and 12.6px at 1512. That was a SAWTOOTH, not
  a ramp: each band hit 16px at the top of its range and fell off a cliff at
  the next breakpoint. Measured, 16.00px at 1440 and **12.17px at 1460**, with
  the same cliff at 1024 and a worse one at 640 (28.44px). A maximised MacBook
  Pro 14" is 1512, so the whole site rendered at 79%.

  It also never did its job here. That pattern keeps a REM-BASED layout
  proportional; this layout is not, because `--raw-shell` is
  `min(95vw, 1440px)` in px — forcing the root to 16px at 1460 left the shell
  at 1387px, unmoved. Removed in ADR-0028, which supersedes ADR-0008.
  `html { font-size: 100% }` now inherits the reader's own browser setting,
  which is also what WCAG 1.4.4 wants. `src/components/common/grid/*` and
  `use-adaptive-grid.ts` are kept but UNMOUNTED — re-mounting either re-breaks
  the type scale at every breakpoint.

  **If a note anywhere says `1rem` varies with the viewport, it predates this.**

- **A `rem` height still cannot hold a fixed aspect ratio.** ADR-0027 stands on
  its own even now the root is fixed: a `rem` height and an image's ratio are
  independent of each other, and the shell caps at 1440 so width and height
  stop scaling together above it. Size image grounds with `aspect-[…]`.
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

- **Measure composited colour on a canvas, not by parsing the string.** Alpha
  utilities compile to `oklab(... / 0.8)`, which a naive RGB parser reads as
  garbage — it will report a passing colour as failing and vice versa. Paint
  the background then the ink onto a 1x1 canvas and read the pixel back; that
  resolves `oklab`, alpha and blending in one step:
  `x.fillStyle=bg; x.fillRect(0,0,1,1); x.fillStyle=ink; x.fillRect(0,0,1,1);`
- **A chip sits on its nearest SURFACE, not its furthest ancestor.** The
  deep-ground chip rule keys on `.bg-07`–`.bg-15`, which caught chips on white
  cards nested inside a deep panel and painted white ink on a #eef0f5 pill at
  1.05:1. `.tile`, `.card-quiet` and `.inset-tile` now reset it. Any new light
  surface that can hold a chip needs adding to that list.
- **`bg-accent` cannot carry white text.** The bright pair (sky `#0ea5e9`)
  measures **2.54:1** under `--ink-on-dark`. There are two accent pairs for
  exactly this reason and the product spec says so — *"the bright pair fails
  contrast for white, that's why two exist, not for variety"* — but the job
  search's Search button reached for the bright one and shipped that way. Use
  `.btn-primary`, whose `--accent-grad-solid` is the deepened pair: 4.73:1 at
  `#0879b8`, 6.69:1 at `#5044d6`. Check a gradient PER STOP; an average passes
  things that fail visibly at one end.
- **An audit that only reads leaf elements misses every button.** A button
  containing text plus an `<svg>` has element children, so a sweep guarded by
  `if (el.children.length) return` skips it — which is how the 2.54:1 button
  survived a clean-looking pass. Walk elements that OWN a non-empty text node
  instead: `[...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim())`.
  And skip `sr-only` by testing `clipPath !== 'none'`, or it reports a 1x1
  clipped caption as a contrast failure.
- **`::placeholder` is not a text node, and it fails on its own.** Unstyled, the
  UA derives it from the input's `color` at 50% alpha, so it fails wherever the
  ink is anywhere near its ground — measured at 3.06–4.25:1 across all four
  brand-kit presets. No contrast sweep that walks text nodes will see it, because
  a placeholder is not one. Read it with
  `getComputedStyle(el, '::placeholder').color`, and set it explicitly (plus
  `opacity-100`, or Firefox dims it again).
- **Dead Tailwind class names fail silently.** `text-background` survived a
  token rewrite as an invisible button label.
- **`border-<name>` with an unbound colour paints INK, not nothing.** Tailwind
  v4 falls back to `currentColor`, so a border whose colour token was never
  bound in `@theme` renders as a near-black hairline on a light card. The
  bound colour class paints ink. `border-hairline` DOES work
  (`--color-hairline` is bound); `border-border` does not, because there is no
  such token. The bound colour utilities are exactly: accent, accent-end,
  accent-mid, canvas, hairline, ink, ink-accent, ink-body, ink-heading,
  ink-label, ink-on-dark, surface, surface-chip, surface-dark, surface-raised,
  track. Anything else silently inherits. The check: compare
  `getComputedStyle(el).borderColor` (or `.color`) against `.color` /
  `.backgroundColor` — if they match, the token never resolved. Seen three
  times now: `text-background`, `border-border`, `text-on-brand`.
- **Drop images in `public/assets/…`, not `public/` root.** The page only
  reads from the subfolders; a file in root does nothing, quietly.

---

## State as of this handover

**Done:** the full page, restructured on 2026-08-21 into TWO PROBLEMS, each
followed by the thing that answers it and then the proof it worked:

```
hero → where it sits → THE FEED PROBLEM → the platform → AI rewrite
     → six stages → THE DROP-OFF PROBLEM → the payoff → four steps
     → job search → BRAND KIT → 85%→30% → testimonials → dashboard
     → integrations → security → roadmap → book a demo
```

The page used to tell the clean-data claim three times and the apply claim
twice, which is what made the halves of the product read as bleeding into
each other. Each claim is made once now, and the sections between them are
its evidence. Two bands are new: **where it sits** (§7's structural claim,
promoted out of a standfirst) and **the drop-off** (the second problem, which
the page had never actually stated). See ADR-0027 and the note at the top of
`src/views/site/index.tsx` — the band order is CONSTRAINED, not free.

Also done that day: the candidate journey became a scroll-pinned card stack;
the share card was rebuilt (Inter, the page's own ground, copy from
`site.ts`); `src/views/home/` was deleted; the repo was created and wired to
Vercel; and the job search was rebuilt end to end.

**The job search is the most recently worked surface.** It is no longer a
screenshot in browser chrome — it is the product working, on `bg-08`:

- The apply-route switch is a **deployment setting**, not product UI (§2: set
  per client, not per candidate). It sits ABOVE the panel on a translucent
  track, deliberately not styled like the filters, because a candidate never
  meets that choice.
- The search row is a white card **straddling the panel's top edge**, ~45%
  below it. That overlap draws the boundary between the setting and the
  product. `lg:` only — stacked on a phone it reads as a mistake.
- Filters: keyword, location with a "near me" icon inside the field, family,
  region, and a real Search submit. Distances are GENUINE (the coordinates
  always were), so Manchester returns Liverpool 31, Sheffield 33, Leeds 36.
- 18 sample roles, nine to a page, each with a two-sentence summary.
- The map is **glass**, not a card, and links both ways: a pin scrolls its
  card into the list and highlights it; a card takes the map to its pin, at a
  bounded 2.5x. Its viewBox is built to the CONTAINER's shape, not the
  country's, or the UK strands a portrait sliver in a landscape box.
- The apply form takes the full panel width on the deep ground.

**Captions:** the lines that sat UNDER sections are gone (Stephen's call,
2026-08-21). What stays is what lives inside a demo and does work there — the
Easy Apply form's "nothing is sent, stored or read" (§6.7 names that case,
and that form asks for a CV) and the AI rewrite's traceability line (§6.10).
**Known gap:** `dashboard-data.ts` has a caption that is never rendered, so
the dashboard demo carries no illustrative disclosure at all. Render it
INSIDE the demo when that surface is next worked.

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
**The brand kit band is new (2026-08-24, ADR-0030).** `#brand`, between the job
search and the proof. Four invented employers as CSS-variable sets on one
wrapper, plus a corner slider; picking one restyles colour, type, type scale,
corners, shadow, spacing and logo while the arrangement holds. It exists because
§3 names employer brand consistency as a concern of the PRIMARY buyer and the
page had no answer to it.

Two things not to undo. The Aplify block is deliberately unlabelled — the page
around it is schematic and the block is fully drawn, which says which is which
without a caption, and a label would contradict the claim. And "layout is fixed"
means ARRANGEMENT: widths are identical across presets (measured, 1096px every
time), heights are not, because type scale and spacing are configurable too.

**The configurable list is wider than the handover records.** V2_HANDOVER §1 says
only "colours, imagery and fonts"; `APLIFY-PRODUCT-UI-SPEC.md` hedges to "some of
that client's brand". Stephen confirmed the full list on 2026-08-24 — colours,
type, font sizes, corners, shadows, gaps, images and the logo, in the apply flow
AND the dashboard; layout alone is fixed. **Widen the handover before treating
that copy as sourced.**

**Outstanding**

- **The recruiter dashboard was rebuilt on 2026-08-24** (ADR-0029) against the
  job search's rules and screenshots of the shipped product. Both demos are now
  unframed. The §6.7 caption renders. The detail view is a CONTAINED slide-over
  stack — application → candidate → timeline — so opening a record is a 0px
  height change where it used to collapse the section by 415px. The three
  summary tiles are gone: they were the only part of that surface not in the
  product.

  It did NOT end up using `use-carousel` / `product-shot` / `section-head`, so
  those three remain orphaned along with `pill-button`, `arrow-button` and
  `eyebrow`. **`bg-brand`, `bg-brand-light`, `bg-paper` and `text-paper-ink`
  inside them are still UNBOUND** and will paint ink the moment they are used —
  note that `paper` and `paper-ink` are unbound too, which an earlier version of
  this note missed, so `pill-button`'s primary variant is ink-on-ink and
  invisible rather than merely off-brand. Bind all four before reuse.
  `--danger` was bound properly this way (tier 2 role → tier 3 `--color-danger`)
  and is the worked example to copy.
- The **nav still names features** (Platform, How it works, Job search,
  Dashboard, Security) while the page now argues as two problems, and the two
  new bands have no nav entry. A task chip exists for this.
- `obsidian/frontend/design-system.md`'s "Current theme state" section
  documents the DELETED dark-luxury build. It carries a warning callout but
  has not been rewritten. ADR-0019 (dark-only by brand) needs SUPERSEDING, not
  editing. A task chip exists for this.
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

```
repo    https://github.com/Steluckett/aplify-website-v2   (public)
live    https://aplify-website-v2.vercel.app
```

Vercel deploys from the repo. **Push to `main` and it ships** — no CLI step,
and every build traces back to a commit SHA. `npx --yes vercel --prod --yes`
still works from this folder for a one-off, but it uploads the working
directory rather than a commit, so prefer pushing.

Nothing pushes automatically after a commit. `git push` IS the deploy.

The order that works, and the reason for it:

```
1. stop the dev server on 3100        # a build while it runs breaks it
2. npx tsc --noEmit && npm run lint
3. npm run build
4. start 3200, verify there
5. git push origin main               # Vercel builds from the commit, ~50s
6. verify the live URL actually has the change
7. restart 3100
```

Step 6 is not ceremony — `curl` the live page and grep for a string you just
added. A green Vercel build says the build succeeded, not that the change is
on the page.

Nothing pushes automatically after a commit. `git push` is the deploy.

**Deployment Protection does not cover the production alias.** The hashed
per-deployment URLs (`…-lqgw4xsi0-…`) redirect to SSO, but
`https://aplify-website-v2.vercel.app` returns 200 with the real page to
anyone. An earlier note claimed the URL needed a login; measured on
2026-08-21, it does not. `robots.txt` keeps it out of search, but it is
public, not private.

**How Stephen works:** step by step, confirmation before big moves. Show
options rather than describing them. Honest pushback over agreement. Verify
rather than assume, and say plainly what could not be verified.

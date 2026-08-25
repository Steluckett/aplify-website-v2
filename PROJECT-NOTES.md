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
  this page leans on — AND THE BASE IS THE FLATTERING END. On a deep ground the
  worst case for white ink is the LIGHTEST pixel, where the blobs peak, not the
  base where none reach. A canvas audit reading `backgroundColor` reported the
  dashboard's count row at 7.00:1; sampling the real gradient geometry put the
  same ink at 4.15:1. Three faded whites (`text-ink-on-dark/80`) had been
  failing on `bg-08` since they were written, and were only caught on
  2026-08-24 by modelling the gradient rather than asking the DOM.

  To do it properly: each blob's alpha falls linearly from its own value at the
  centre to zero at 62% of the ray, and the ellipse radii are the `W% H%` in
  the declaration. Sample a grid over the element, composite in source order,
  take the extremes. `/backgrounds` publishes figures measured that way.
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

**RESTRUCTURED AND REWRITTEN 2026-08-25** to the Brand Playbook v3, the Homepage
Strategy Rationale v2 and the "What Makes People Stop Scrolling" addendum. Those
three client documents are now **the source of truth for Aplify's language**.
See ADR-0031 and ADR-0032, and `COPY-DECK-V3.md` for every string.

**The argument is inverted from what the notes above describe.** The page used
to open on the feed problem and reach Easy Apply nine bands later. That is the
recruitment-OPERATIONS buyer's concern leading a page whose primary audience
(§3) is the talent acquisition lead, whose question is "will more people
finish?" Completion now leads; job data is what makes Easy Apply perform better
rather than the opening act. **This supersedes V2_HANDOVER §4's ordering**, on
Stephen's explicit call: *"we are going in a new direction - dont let previous
handovers interfere in any way with this."*

Eighteen bands, five acts:

```
RECOGNITION  hero → why they leave → what it costs → why we built it
THE ANSWER   where it sits → four steps → job search
             → brand kit → 85%→30% + two quotes
ATTRACT      better data → AI rewrite → Google for Jobs → six stages
IMPROVE      dashboard + the third quote
RISK         integrations → security → book a demo
```

**Seventeen bands, not eighteen. `#payoff` was deleted on 2026-08-25** because
it repeated the page: it CLAIMED "no redirect, no account, search and apply on
your page", and `#candidates` right below it DEMONSTRATES exactly that, with the
same two chips. `#friction` had already named the same things as problems. The
claim was the only one of the three with no evidence attached.

**The map band's bleed receiver is `#candidates` now.** `MapBand` bleeds past its
own foot and whatever follows it must carry `relative` AND a painted background,
or the artwork sits on top of the next band instead of being cut by it. That job
has moved twice: `#problem` → `#payoff` → `#candidates`. Check it after any
reorder of act two.

**Four bands are new.** `#friction` (eight cuts, a weighted bento, two cells on
deep grounds with **placeholder artwork** — flip `ready: true` in `site.ts` when
the files land), `#cost` (the spend itemised like a statement), `#origin` (the
playbook's One Sentence alone on Blush) and `#google`.

**Three bands are gone.** The platform bento, the testimonials wall, the roadmap.
The bento's four claims were checked line by line against the six stages and the
AI guardrail before it went; nothing was lost. **`LAYOUT-INVENTORY.md` records
every layout and every piece of functionality on the page**, written before any
of this was cut, so anything removed can be brought back.

**Two writing rules now bind, both Stephen's, both superseding the handover.**

1. **No em dashes in prose.** They read as machine-written. This overturns
   V2_HANDOVER §10's *"em dashes are used freely and are part of the voice"*.
   En dashes stay in numeric ranges; the em dashes in `story.rows` stay because
   that is sample data imitating an ATS export. Check with
   `grep -c '—' src/data/content/*.ts`.
2. **"Career site or campaign landing page" is relaxed**, thirteen uses down to
   three. Campaign landing pages are still separately sold, so do not trim the
   remaining three.

**Two handover facts were wrong and are now amended, both dated in V2_HANDOVER.**

- **Google for Jobs has SHIPPED.** §1 listed it under "Roadmap — not yet
  available". Confirmed live 2026-08-25 with JSON-LD on every published job.
  This is the second capability filed as forthcoming when it had shipped, after
  native ATS integration; both errors went the damaging direction.
- **The themeable list is wider than "colours, imagery and fonts."** Now
  recorded in full in §1, with Stephen's "layout alone is fixed" qualifier.

**Three bands must sit on white**, and one of them is a new constraint:
`#security` (its pastels), `#proof` (two `wash-soft` quote cards) and
**`#dashboard`**, which was tinted until Ben's quote moved into it. `#platform`'s
old must-stay-tinted rule died with the bento.

**The brand kit lost its three cards** and is 197px shorter. They were claims
standing next to a demonstration. **They were also structural** — the phone is
`lg:absolute`, so their height was what cropped it — so the crop now comes from
an aspect ratio, per ADR-0027. Everything else in ADR-0030 still stands: one
slider, no visible label, four stops interpolated in Oklab, every ground light
because a slider cannot cross from light to dark without passing through 1:1.

**The three quotes are split**, each beside what §5 says it proves. Louise and
Sammi under the figure, Ben beside the dashboard. Picked BY NAME in `site.ts`,
so reordering the approved array cannot silently swap them.

**Verified on 3100** at 1512 and at 375: eighteen bands, none collapsed, no
horizontal overflow, `tsc` and `lint` clean. Contrast measured by MODELLING the
gradients, not by reading the DOM. Two traps caught in review and fixed:

- The three cards under `#google` were `card-quiet` on tint — ΔE 0.35, so they
  rendered as floating text with no card at all.
- **White at /80 measures 3.97 on bg-09 (Forest)** and fails AA for small text.
  Forest has the lowest white ceiling of the deep grounds in use — 5.26 at full
  white, against bg-07's 6.53. Body ink on the deep friction cells moved /80 →
  /90 for the same reason: /80 cleared 4.5 by **0.02** on bg-08.

**Known and deliberately NOT patched:** the big faded numerals measure
**1.73–1.75** against their cards, in `#friction`, `#how-it-works` and
`#candidates` alike. It is a house-wide treatment that predates this work.
Changing it in one band only would be worse than leaving it. Needs a decision.

**Captions — STANDING DECISION, 2026-08-24: do not add them.** Stephen's words:
*"from now on leave this type of thing out — i dont want it."* That covers
illustrative disclosures generally. This is a deliberate divergence from
V2_HANDOVER §6.7, recorded so a future session does not "fix" it back.

What that does NOT change: §6.5 still binds, so sample people stay invented, on
reserved `example.*` domains and Ofcom's 07700 900xxx range. Three in-demo lines
survive because they sit with forms that look submittable — Easy Apply's
"nothing is sent, stored or read", the dashboard's notes disclosure, and the AI
rewrite's traceability line. Ask before adding any more.

**Deliberately retained — do not "clean up":**

`src/views/home/` was deleted on 2026-08-19, which orphaned thirteen modules.
They are kept **on purpose**. See `LAYOUT-INVENTORY.md` Part 3 for the full list
and, crucially, for the warning that `bg-brand`, `bg-brand-light`, `bg-paper`
and `text-paper-ink` inside them are **unbound tokens** that paint ink rather
than nothing. Bind all four before reuse. `three` has zero importers and that is
expected.

**Outstanding**

**Artwork waiting on Stephen**

- **A new right-hand image for `#friction`.** The current one,
  `not-frustrated.png`, is a placeholder in the sense that it is going to be
  replaced. Three things to carry into the new file:
  - **It contains `jamie.okafor@email.com`.** `email.com` is a live domain and
    §6.5 requires reserved `example.*`. Same breach as the step 03 and step 04
    artwork.
  - **It is off-centre in its own canvas** — left margin 184px, right 13px — so
    it carries a measured `contentOffsetXPct: 4.6`. Export with even margins
    and delete the value. The ZERO bottom margin is correct and should stay;
    the panel is meant to cut the phone off at its foot.
  - **It says "Northbank Group"** where the rest of the site says "Northbank
    Health". Halden is the one that is a Group.
- **A small-screen crop of `application-progress.png`.** At 375 the card renders
  about 330px wide, so "Step 14 of 150" reads at roughly 19px but the field list
  under the progress bar is ~6px and illegible. The fix is a separate, taller
  crop for phones — a squarer composition with fewer elements — not more
  scaling of the existing file. It also carries a measured
  `contentOffsetYPct: -6.4` because its canvas was cut around the drop shadow
  rather than the card; even margins would remove the need.
- `obsidian/frontend/design-system.md`'s "Current theme state" still documents
  the DELETED dark-luxury build. ADR-0019 needs SUPERSEDING, not editing.
- The cookie banner links to `/privacy-policy`, which 404s.
- `jamie.okafor@email.com` is baked into the step 03 and step 04 artwork.
  `email.com` is a live domain; §6.5 requires reserved `example.*`. Those steps
  survive the reorder, so this does not go away. Needs re-exporting.
- `event-registration.png` is off-centre in its own canvas, corrected by
  `nudgeXPct: 2.26` in `site.ts`. Re-export centred and delete the value.
- Indexing: `ALLOW_INDEXING` only wires `robots.ts`. `generate-page-metadata.ts`
  hardcodes `index, follow`, so the two contradict each other. Left as-is during
  development (Stephen's call, 2026-08-21); wire the meta before launch.
- The faded-numeral contrast decision above.

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

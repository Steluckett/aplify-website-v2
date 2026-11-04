---
tags: [meta, decision]
updated: 2026-09-01
---

# Decisions Log (ADRs)

Architecture Decision Records. Each entry captures a choice, its context, and its
consequences. Use [[templates/adr-note]] for new entries. Newest first.

---

## ADR-0035 — Branch `design/signals-steer`: an exploratory restyle after marketingsignals.com

- **Date:** 2026-11-04
- **Status:** Exploratory (branch only — `main` is untouched)

**Context.** Stephen asked for a branch that keeps the live Aurora page
intact on `main` while taking a heavy steer from marketingsignals.com for
design, layout and type: a violet-black night hero, warm paper ground,
huge tight grotesk headings set two-tone (closing line in lavender/violet),
pill buttons, a fan of tilted cards out of the hero's foot, lime and
lavender card grounds, and a night footer.

**Decision.** Restyle through the token tiers rather than rewriting bands.
Hanken Grotesk (Google, via `next/font`) replaces Inter for the marketing
register — the reference's Noi Grotesk is commercial; `.screen` keeps Inter
and Aurora's cool neutrals so the product reads as the product. Ground
`#f2efe8`, night `#100c15`, violet text `#4f3fd6` (6.07:1 on paper),
lavender `#b5adff` on night (9.57:1). The fifteen blob grounds are
flattened into that palette, each keeping its light/dark role so every
measured ink still clears AA. `SectionIntro` defaults to left-aligned and
two-tone. The hero is rebuilt (night, left-set, fan of product shots);
the nav inverts over it. Content claims are unchanged — only the phone
headline's line breaks moved.

**Consequences.** If this direction is adopted it should land as its own
pass on the vault (design-system.md still describes Aurora). `/backgrounds`
now renders the flattened grounds, not the blobs. The OG/share images still
use the Inter static cuts.

---

## ADR-0034 — The implementation band is engine-first, and its claims are code-verified

- **Date:** 2026-09-01
- **Status:** Accepted

**Context.** Job search ships through the WordPress plugin today; bespoke
builds can use the API. Stephen asked whether WordPress-only delivery is a
blocker, and whether to wait for a lead before disclosing it. A packaged
non-WordPress delivery is being explored but has not shipped.

**Decision.** Disclose now, framed engine-first: the plugin is a thin
client of the same API a bespoke build would use (verified by reading
aplify-integration 3.1.0 — no candidate data stored in WordPress, key
server-side, two-setting install, real endpoint paths), so the band
presents WordPress and anything-else as two doorways into one engine. The
unshipped packaged delivery is deliberately absent from the page: the API
is the honest non-WordPress answer today, and §6 discipline forbids
marketing what has not shipped. Techy artefacts (endpoint paths) are
allowed as EVIDENCE when explicitly addressed to the reader's developers;
the buyer-facing prose stays in outcome language.

**Consequences.** The band's copy carries a provenance comment on its
content module naming what was verified and when; if the plugin's
architecture changes (data stored locally, key handling, setup steps), the
band must be re-verified, not just restyled. When packaged non-WordPress
delivery ships, the copy upgrade is one line. Plugin hardening flags from
the same code read (CDN-loaded Alpine without SRI, plaintext key in
wp_options, uncached search round-trips, a stray console.log) live with
the plugin project, not this site.

---

## ADR-0033 — Book a demo is a full-screen experience, and the form practises what the site preaches

- **Status:** Accepted
- **Date:** 2026-08-28

**Context.** Every "Book a demo" button pointed at `#contact`, which is the
footer card — there was no way to actually enquire beyond the mailto. Stephen
asked for a full-screen stepped form, "less like a form and more like an
experience", sliders where the answer is a range, minimal information per
step, and playbook tone.

**Decision.** A full-screen overlay (`src/views/site/book-demo.tsx`, copy in
`src/data/content/book-demo.ts`), summoned by every CTA through
`use-contact-modal` — the zustand store orphaned when the dark build was
deleted, kept for exactly this. `CtaButton` became a real `<button>` (rule
10: an action that opens a dialog is not a link).

**The organising idea: the form IS the argument.** The site's case is "every
form field needs to earn its place" — so the enquiry form is one question a
screen, mostly buttons, no password, an opener that says so ("This is the bit
where most forms lose you"), and a confirmation that mirrors Easy Apply's
"That's the whole application". If this form ever grows a field that has not
earned its place, it contradicts the page it sits on.

**The shape** (all four qualifiers Stephen's picks):

- name → work email + organisation → hires/year → team size → agenda chips
  + optional ATS, then the confirmation. Tally progress, ENDOWED (step one
  shows a sliver, never an empty bar), spring-keyed step transitions,
  focus-trapped, Esc closes, Enter advances.
- **Sliders are BANDED, not numeric** — the thumb snaps between labelled
  bands ("50 to 250 a year") and the band label is the readout at display
  size. Nobody knows their exact figure; a slider you can be wrong about
  stops being effortless.
- **The ATS question is FREE TEXT** — §6.3 makes Eploy the only third-party
  product named anywhere, and a vendor dropdown would name a dozen.
- Ground is 01, the soft light aurora, where body ink is legal (5.69:1
  worst point). The danger ink used for validation errors clears 4.5 at the
  form column's actual position but is borderline at the ground's violet
  corner — keep errors with their fields.

**Consequences.**

- **Submission is deliberately NOT wired** (UI first, Stephen's call). The
  confirmation carried an honest footnote pointing at hello@aplify.co.uk —
  **removed the same day on Stephen's call**, which sharpens the launch flag:
  until the API route lands (rule 9: server-side, zod,
  `{ data } / { error }`), a live submission goes nowhere and says nothing.
  Wire before the page is promoted.
- ⚠️ **"We'll come back to you within one working day" is an unconfirmed
  service promise.** Confirm or change before launch.
- The overlay stays mounted while closed, so reopening RESETS to the intro
  (it once resumed on the confirmation screen); answers are kept.
- `nav.ctaHref` and the CTA `href`s in the content module are no longer
  read.
- The reopening path, both sliders, validation, Esc and scroll restore are
  verified on 3100 at desktop and 375.

**Polish pass, same day** (Stephen: "the form should flow"): the overlay
dissolves in and out instead of banging on; steps flow OUT then IN
(`useTransition` with `exitBeforeEnter`); elements cascade within a step
(headline, controls, buttons, each on its own delay). Focused fields wear a
pulsing conic glow — `--accent-glow`, the accent family only (sky → blue →
violet; a wider magenta/amber sweep was tried and pulled), peaking around a
third strength with no edge ring, the pulse a looped spring, never a CSS
keyframe. The confirmation became a celebration: a tick drawn in three
sprung stages (halo, popped disc, self-drawing stroke, in the semantic
`--success` green), "Boom! You're done", and the closing button wears the
site's own CTA hover treatment (`CtaButton` gained an `onClick` override so
the button that closes the dialog cannot reopen it). The chrome floats over
the top with a 24px tally so the step centres in the true viewport — and the
centring bug this exposed is worth keeping: `min-h-full` cannot resolve
against a parent with only a min-height, so it silently top-aligns;
`min-h-dvh` needs no parent.

---

## ADR-0031 — The page argues completion-first, and the Brand Playbook is the source of truth for language

- **Status:** Accepted — supersedes V2_HANDOVER §4's argument order and §10's em-dash rule
- **Date:** 2026-08-25

**Context.** Three client documents arrived: *The Aplify Brand Playbook v3*, an
*Homepage Strategy & Rationale v2*, and an addendum, *What Makes People Stop
Scrolling*. Together they set the voice (commercially smart, recruitment-native,
warm, honest enough to challenge bad habits), twenty pre-written "recruitment
truths", and a structural argument.

The strategy doc conflicts head-on with V2_HANDOVER §4. §4 runs feed broken →
we clean it → candidates finish → 85%→30% → your team keeps working, and says
steps 1-3 *"should never be separated"*. The strategy doc says the opposite:
friction and completion first, Easy Apply as the payoff, and Feed Intelligence
explicitly demoted — *"do not present Feed Intelligence as the hero."*

**The conflict was already latent in the handover.** §3 names the talent
acquisition lead as the PRIMARY audience, whose question is *"will more people
finish?"*, and §7's primary claim is completion. Feed hygiene is the SECONDARY
buyer's concern. So the page was opening on the secondary buyer's problem and
making the primary buyer wait six bands for their own. §4's ordering and
§3/§7's audience analysis had disagreed all along; the strategy doc resolves it
the other way.

**Decision.** Restructure to five acts and rewrite every string to the playbook.

- **RECOGNITION** — three bands before Aplify is named at all, because the
  addendum's first rule is that a SaaS site's biggest mistake is introducing
  itself too quickly.
- **THE ANSWER** — what Aplify is, the payoff, the demo, then the proof.
- **ATTRACT** — what decides who arrives and what they make of you.
- **IMPROVE** — where the work lands.
- **RISK** — the objections in §9's order, then the ask.

**§5 and §6 are untouched and still bind absolutely.** One statistic, three
quotes, nothing invented. The direction changed; the facts did not.

**Four bands are new.**

- `#friction` — eight cuts. A weighted bento rather than eight equal cards,
  because "death by a thousand cuts" is an idea about ACCUMULATION and a grid
  of equals makes each cut feel separate and survivable. It began as six, all
  post-Apply; Stephen caught that the journey starts before the form, so *the
  search* and *the advert* became 01 and 02. That earns something structural:
  the ATTRACT act now answers a cut the reader already recognised.
- `#cost` — the spend itemised like a statement. **No figures, and that is not
  an oversight:** §6.1 permits none and §5's only number is Brandon Trust's.
- `#origin` — the playbook's One Sentence alone on ground 03, Blush, the only
  warm ground in the set and one whose own reference note says it is *"useful
  to break a run of cool sections"*. Nothing had ever broken one.
- `#google` — see below.

**Three bands are cut.** The platform bento (every claim already made by the six
stages or the AI guardrail — checked line by line before it went; the panel
composition is recorded in `LAYOUT-INVENTORY.md` §1.5). The testimonials wall.
The roadmap, entirely.

**The three quotes split up.** §5 is explicit that they are not
interchangeable — Louise proves completion, Sammi proves the candidate
experience, Ben proves the dashboard is usable — and the page was running all
three as one grid with Ben nine bands from the dashboard he describes. Each now
sits with what it proves, picked BY NAME so reordering the approved array
cannot silently swap them.

**Consequences.**

- **Google for Jobs is shipped, and the handover was wrong.** §1 had it under
  *"Roadmap — not yet available"*. Stephen confirmed it live with JSON-LD on
  every published job; §1 is amended and dated, with the superseded wording
  preserved. This is the SECOND capability filed as forthcoming when it had
  shipped (native ATS integration was the first, §6.9) — both errors went the
  damaging direction, and §6.9 now records the pattern.
- **The band shows our own output**, not Google's page: §6.4 forbids depicting
  another company's product, and a mock of somebody else's results proves
  nothing about what we emit. The copy says the job *carries the structured
  data Google reads* and must never drift into a ranking promise, which is the
  one claim on that page a technical buyer could falsify in a minute.
- **`#dashboard` gained a hard white requirement**, which it did not have
  before: Ben's quote card is `wash-soft`, a 10%-alpha gradient. Three bands
  now pin to white — `#proof`, `#dashboard`, `#security` — and `#platform`'s
  old must-stay-tinted requirement died with the bento. The alternation runs
  clean with one tint pair, at `#google`/`#how-it-works`.
- **Two contrast traps, both invisible to `getComputedStyle`.** The three cards
  under `#google` were `card-quiet` on tint (ΔE 0.35) and rendered as floating
  text with no card. And white at /80 measures **3.97 on bg-09 (Forest)**,
  failing AA for small text — Forest has the lowest white ceiling of the deep
  grounds in use (5.26 at full white against bg-07's 6.53). Body ink on the deep
  friction cells moved /80 → /90 for the same reason: /80 cleared 4.5 by 0.02
  on bg-08. All figures from MODELLING the gradients, never from the DOM.
- **A pre-existing failure surfaced and was deliberately not patched.** The
  large faded numerals measure 1.73–1.75 against their cards, in `#friction`,
  `#how-it-works` and `#candidates` alike. It is a house-wide treatment that
  predates this work and changing it in one band only would be worse than
  leaving it. Flagged for a decision.

---

## ADR-0032 — No em dashes in prose, and "career site or campaign landing page" is relaxed

- **Status:** Accepted — supersedes V2_HANDOVER §10's em-dash line and relaxes §6.2
- **Date:** 2026-08-25

**Context.** Two of Stephen's calls while reviewing the v3 copy deck.

**Decision one: no em dashes in prose.** *"never use double length dashes - they
give us away as AI - single dash is fine."* Single hyphen, comma or full stop
instead.

This **directly contradicts V2_HANDOVER §10**, which reads *"Em dashes are used
freely and are part of the voice."* That line is superseded. The scope is
PROSE only, confirmed explicitly:

- En dashes survive in numeric ranges (£24,000–£26,000) — typographic, not a tic.
- The em dashes inside `story.rows` survive, because that is sample data
  imitating a real ATS export on both sides of the table, not our voice.
- Code comments and vault documents are unaffected; this is a rule about
  user-facing copy.
- **A site-name separator is NOT exempt** (ruled 2026-08-28): the `<title>`'s
  `Aplify — The recruitment…` became `Aplify - The recruitment…`, a hyphen.

**Decision two: §6.2 is relaxed.** The rule required *"career site or campaign
landing page"* every time, never the first alone, and `site.ts` carried it in
thirteen places. Stephen: *"we need to reduce the need to mention careers site
or landing page - that should be obvious - we are going to be problem solving
here and it is less about where it lives but why it should be used."*

It now appears three times, where deployment is genuinely the point. **Campaign
landing pages are still a separately-sold use case** and the recruitment-ops
buyer owns that budget, so the remaining three are not candidates for trimming.

**Consequences.** Two §5-approved strings had punctuation changed and no words
moved: the AI guardrail's connecting sentence and the Eploy line. Both are
flagged inline where they live. The quoted phrases §6.8 protects verbatim —
*"Works on adverts, not on people"* and the *"It rewrites what's there"*
sentence — are untouched.

**How to check.** `grep -c '—' src/data/content/*.ts`. The only legitimate hits
are inside `story.rows`.

---

## ADR-0030 — The brand kit band, and theming as a demonstration rather than a claim

- **Status:** Accepted — **amended the same day**, see *Revision* below
- **Date:** 2026-08-24

> [!note] Revision 2, 2026-08-24 — a bento, and a phone
> The schematic careers page is gone. The band is now a BENTO matching
> `FeatureBento`'s columns (`1.15fr / 0.85fr`, `gap-10`, `text-h4` headings):
> a phone mockup on `bg-07` — the one deep ground the system still had unused —
> beside three cards. The phone is cropped by its own card, so the section-level
> bleed went with the layout that needed it and `#proof` lost its `relative`.
>
> **The themed set is now deliberately small**: two brand colours, every corner
> radius, and the typeface. The grey screen, the body greys, the salary and the
> View button hold still. A demo where everything changes proves nothing,
> because a reader cannot separate what is themeable from what is merely
> different — freezing the greys is what makes the themed parts legible as a set.
>
> **Two colours per brand, not one.** `main` carries the search button and the
> pin; `highlight` carries the job title; each pill takes a 92% tint of one of
> them with that colour at full strength for its wording. 92% is measured — at
> 88% the worst pill ink was 4.65:1 at 11px, too close to the line; 92% puts the
> worst of the eight at 4.92:1.
>
> Two bugs worth recording. The three right-hand cards were `card-quiet`, copied
> from the other bento — but that bento sits inside a WHITE panel and this band
> is on the tinted ground, where card-quiet measured **one unit per channel,
> 1.009:1**. Invisible, exactly as ADR-0027 warns. And `mix()` returns an
> `rgb()` string, so feeding a derived colour back in hit a hex-only parser that
> produced `NaN` — and `NaN >> 16` coerces to **0**, so every pill tint was
> silently computed from BLACK and both pills came out the same dead grey with
> no error anywhere. The parser now takes both forms.
>
> Verified: 21 slider positions, 378 checks, zero contrast failures, phone 448px
> wide at every position.

> [!note] Revision, 2026-08-24 — one slider, not four cards
> The decision below stands in full: the band, its placement, and theming shown
> rather than described. Only the MECHANIC changed, and the reason is worth
> keeping. Four brand cards is a menu; one slider is a transformation, and the
> claim is about transformation. It also lets the corner journey be the
> headline — square at Northbank, fully rounded at Halden, monotonic all the way.
>
> Three things follow that were not obvious:
>
> **Every ground had to stay light.** A continuous slider cannot travel from a
> light theme to a dark one and stay readable. If the ground goes light→dark
> while the ink goes dark→light, the two must cross, and at the crossing the
> contrast is 1:1. No easing and no colour space avoids it — it is arithmetic,
> not a tuning problem. Halden was a dark theme in the first cut and is now a
> graphite-on-pale one. A dark theme remains perfectly possible in the product;
> it simply cannot be a POINT ON A SLIDER, only a discrete switch.
>
> **Interpolation is in Oklab, not sRGB.** Crossing blue → terracotta through
> sRGB sags into a dead grey at the midpoint, and on a slider the midpoint is a
> resting position somebody will look at.
>
> **Four stops, not two.** Two endpoints would have put a mush of blue and
> graphite in the middle. Four means every resting position is a brand somebody
> could plausibly have.
>
> Verified across **21 slider positions, 474 checks, zero contrast failures** —
> and the example measures 992px wide at every one of them, which is the
> "layout is fixed" claim as a measurement. The example now bleeds under
> `#proof` using `MapBand`'s trick, which is why `#proof` gained `relative`.

**Context.** §3 names three concerns of the primary buyer — the talent acquisition
lead the hero speaks to — and the page answered two of them. The third, *employer
brand consistency*, had no section at all. The product is themeable down to
colours, type, type scale, corners, shadows, spacing, imagery and logo (in the
apply flow **and** the dashboard); only layout is fixed. That is a large USP the
site never made.

It is also a claim a reader discounts. "It can look like your site" is unfalsifiable
prose, which is exactly the case §11 legislates for: *the page lets the reader use
the product rather than look at pictures of it.*

**Decision.** A new band, `#brand`, between `#job-search` and `#proof`.

- **Placement is argued.** The objection lands hardest immediately after the reader
  has used the search and apply flow *in Aplify's own blue* and thinks "yes, but it
  will look like them." The cost is one beat before the 85%→30% payoff; arriving at
  that number with the objection already dealt with is worth more than the beat.
- **The demonstration is the mechanism.** Four invented employers, each a set of CSS
  custom properties on ONE wrapper. Nothing in the demo reads a preset directly;
  everything reads `var(--b-…)`. That is the plugin's own model — theme a scope by
  swapping variables, leave the markup alone — so the demo is not a picture of
  theming, it is theming.
- **One exposed dial.** A corner slider, no numeric readout, no checklist of what a
  preset touches. Stephen's steer: convey brand control without itemising it.
- **The fidelity trick.** The employer's page around the block is schematic; the
  Aplify block is fully drawn. Nobody is told which part is ours, because on a real
  site you should not be able to tell — a label would contradict the claim.

**Band order.** ADR-0027 still binds. `#proof` below is `band-white` with a deep card
and `#job-search` above closes on a deep panel, so this band stays on the page ground
and keeps its colour INSIDE the preview rather than painting the whole band. Three
heavy blocks in a row would have flattened all three. It is also truer: a careers page
is a light page wearing a brand, not a brand-coloured slab.

**Consequences.**

- Verified on 3100 across all four presets: **zero contrast failures**, 18 checks each,
  canvas-composited.
- The preview measures **1096px wide on every preset** — the "layout is fixed" claim as
  a measurement rather than an assertion.
- **Be precise about that claim.** Widths and arrangement are identical; HEIGHTS are
  not, and should not be, because type scale and spacing are themselves configurable.
  Halden renders 15px shorter than Northbank. The standfirst says *layout*, meaning
  structure, and must not drift into "nothing changes size", which would be false.

**A trap worth the whole exercise.** The field placeholders failed in all four presets
(3.06–4.25:1). Left alone the UA derives `::placeholder` from the input's `color` at
50% alpha, so it fails wherever the ink is close to its ground — and it is invisible to
any audit that only walks text nodes, because a placeholder is not one. It is now set
explicitly to `--b-ink-soft` with `opacity-100` for Firefox.

**§6 compliance.** All four employers are invented and Northbank is reused from the
step-03 artwork so the page keeps one world; the §5 inventory allows exactly one logo
on this site and none of these is it. §6.2's "career site **or campaign landing page**"
is in the standfirst. §6.7's disclosure sits with the controls, naming both the invented
employers and the inert form.

**One thing the handover does not yet cover.** V2_HANDOVER §1 records only *"colours,
imagery and fonts are set inside the plugin"*, and `APLIFY-PRODUCT-UI-SPEC.md` hedges to
*"inherits some of that client's brand"*. The wider list is Stephen's, confirmed
2026-08-24. **Widen the handover before treating this section's copy as sourced.**

---

## ADR-0029 — Both product demos are unframed, and the dashboard is rebuilt to the job search's rules

- **Status:** Accepted
- **Date:** 2026-08-24

**Context.** The page carries two full product surfaces — the job search and the
recruiter dashboard — and they were reading as two different products. The job
search had already been rebuilt (2026-08-21): frame removed, deep ground, controls
on a white card straddling the panel's top edge, white tiles, glass groupings. The
dashboard was still a `ScreenCard` browser window on a wash, and had not been
touched since 18 Aug. Its own table comment in `job-search.tsx` had said what the
intent was all along — *"the same shell the recruiter dashboard uses, so the two
product shots on this page read as one product"* — but only the table ever matched.

Three defects also stood in it:

1. **No §6.7 disclosure.** `dashboard-data.ts` had carried a `caption` since the
   surface was built and nothing ever rendered it. The one demo on the page
   handling anything resembling candidate data said nothing about being illustrative.
2. **A 415px collapse.** Opening a record REPLACED the list, so the section went
   1527px → 1112px and every section below jumped up under the reader's cursor.
3. **Summary tiles that are not in the product.** Three figures — total, actioned %,
   accepted — existed only here. A figure invented for a demo is the exact shape of
   thing §6.1 exists to stop, even when it is derived from sample data.

**Decision.** Rebuild the dashboard against the job search's rules and against
screenshots of the shipped product.

- **No browser chrome, on either demo.** The block comment in `product.tsx` claiming
  "two of the three sit inside browser chrome" was already stale — the job-search
  rebuild had superseded it and the file contradicted itself eighteen lines apart.
  The chrome *did* say something true on the dashboard (a recruiter really is at
  app.aplify.co.uk, where a candidate is on the client's own site) but one page
  carrying two framings for two product surfaces cost more than that was worth.
- **The controls straddle the panel edge**, `lg:` only, same device and same bleed.
- **Two-tier filters** matching the product: search + status + a More/Fewer toggle
  + export, then jobs / categories / roles / sources / date-from / date-to.
- **Slide-overs, CONTAINED.** The product's real gesture — application → candidate
  → that candidate's timeline — absolutely positioned inside the demo's own panel
  rather than fixed to the viewport. A demo embedded mid-page must not seize the
  screen to show a detail record, and overlaying rather than replacing costs no
  height, which is what removes the 415px collapse.
- **The summary tiles go.** The caption renders.

**Consequences.** Measured on 3100 at 1512: opening a record is a **0px** height
change, against 415px before. Zero AA failures across both demos (159 text nodes,
canvas-composited, gradients tested per stop).

**Two things this audit caught that were already live.**

- The **Search button on the job search failed AA at 2.54:1** — `bg-accent`, the
  bright sky `#0ea5e9`, under `--ink-on-dark`. This is precisely the failure the
  deepened pair exists to prevent; `APLIFY-PRODUCT-UI-SPEC.md` says so in as many
  words: *"the bright pair fails contrast for white — that's why two exist, not for
  variety."* Both buttons now take `.btn-primary`'s deepened gradient, which measures
  **4.73:1** at `#0879b8` and **6.69:1** at `#5044d6`. Found only because the
  dashboard copied the class and the copy got audited.
- The **inactive tab's count badge measured 4.31:1** on the track. It now inherits
  its parent's ink and measures 5.49:1.

**A new bound token.** `--danger` (tier 2) → `--color-danger` (tier 3), for the one
destructive control. Writing `bg-danger` before binding it would have painted
`currentColor` — the trap PROJECT-NOTES has now recorded four times.

**The Delete Application control is included and works**, on this page's copy of the
data. A red button that does nothing teaches the reader the wrong thing about a
control the product genuinely has, and "we anonymise on delete" is a real answer to
a question a care provider will ask. It is two-step, and the caption carries the rest.

---

## ADR-0028 — The root font-size belongs to the reader; the scaling grid is removed

- **Status:** Accepted — **supersedes [[#ADR-0008 — Adaptive scaling grid via root font-size|ADR-0008]]**
- **Date:** 2026-08-24

**Context.** ADR-0008 set `html { font-size }` from the viewport: a `vw` media-query
ladder scaling down, `AdaptiveGrid` scaling up above 1920. Each band divided 16px by
the design base width of its range (`16 * 100 / baseWidth`). Two things were wrong
with it, and both were measured on the running site rather than reasoned about.

**1. The premise does not hold in this project.** The pattern keeps a *rem-based*
layout proportional by scaling the root. This layout is not rem-based: `--raw-shell`
is `min(95vw, 1440px)`, in px. Setting the root to 16px at a 1460px viewport left the
shell at **1387px, unmoved**. The ladder never scaled the layout — it only shrank the
type inside a column that stayed exactly where it was.

**2. It was a sawtooth, not a ramp.** Because each band divides by the base width at
the TOP of its range, every band climbed to 16px and then fell off a cliff at the next
breakpoint, where the next band divides by a larger number. Measured root sizes:

| Viewport | Root | vs 16px |
|---|---|---|
| 360 | 16.00px | 100% |
| **640** | **28.44px** | **178%** |
| 660 | 10.31px | 64% |
| 1024 | 16.00px | 100% |
| 1040 | 11.56px | 72% |
| 1440 | 16.00px | 100% |
| **1460** | **12.17px** | **76%** |
| 1512 | 12.60px | 79% |

Three cliffs — at 640, 1024 and 1440 — each changing every glyph on the page by a
quarter across twenty pixels of window width. A maximised MacBook Pro 14" sits at
1512, so the entire site rendered at **79%** on the commonest machine our buyers use.
At 640px the page was 52,257px tall against a true 24,249px.

This is also the root cause ADR-0027 identified but worked around rather than fixed.

**3. It overrode the reader.** Setting `html { font-size }` in `vw` or `px` at all
discards a reader's own browser font-size preference — WCAG 1.4.4 (Resize Text). On a
public site selling to care providers and the NHS supply chain, that is not a detail.

**Decision.** Delete the scaling grid.
- `globals.css` — the ladder and the four media queries are replaced by
  `html { font-size: 100% }`, which inherits the reader's browser default (16px for
  almost everyone, correctly larger for those who have changed it).
- `app/layout.tsx` — `<AdaptiveGrid />` is unmounted.
- `src/components/common/grid/*` and `src/hooks/use-adaptive-grid.ts` are **kept but
  unmounted**, as starter infrastructure. `grid.config.ts` carries a warning against
  re-mounting; doing so re-breaks the type scale at every breakpoint.
- Width is handled where it already was: Tailwind breakpoints and the `vw` shell.

**Consequences.** Every `rem` now lands on its literal token value at every viewport —
hero 96px, section heads 56, body 18 — and `.screen` sits at Aurora's 14px base with
13px table heads, which is what [[design-system]] and `APLIFY-PRODUCT-UI-SPEC.md`
have always documented. The product register no longer drifts against the spec.

Verified on port 3100 at 375 / 640 / 768 / 1024 / 1280 / 1512 / 1920 / 2400: root is
16px at all of them, no page-level horizontal overflow at any, and no inline override
above 1920. The WCAG side is verified by mechanism (`100%` inherits) rather than by
testing a browser with a changed default font size.

**Two honest consequences.** The page is now taller on narrow viewports (24,792px vs
18,980px at 768) — that is the content's real size, not a regression. And above 1920
the type no longer grows: a 1440px shell of 16px-rooted type now sits centred on a
large monitor, which is the conventional behaviour for a capped-shell marketing site
and what the `min(95vw, 1440px)` cap always implied.

**ADR-0027 still stands.** Sizing image grounds by `aspect-[…]` rather than a `rem`
height remains correct — a ratio cannot drift against fixed artwork — even though the
specific drift that prompted it is now gone.

---

## ADR-0027 — Image grounds are sized by aspect ratio, never by a rem height

- **Status:** Accepted
- **Date:** 2026-08-19

**Context.** The four candidate-journey shot grounds in `src/views/site/platform.tsx`
were sized `h-[26rem] sm:h-[30rem]`. Step 04's artwork was being clipped 12px top
and bottom at a 1728px viewport and 41px at 1512px — against the intent recorded
in its own data comment, that a confirmation is a complete moment and cropping it
undercuts the point.

The cause is ADR-0008's adaptive scaling grid. Because the root font-size is set
in `vw` across four bands, `1rem` is 14.4px at 1728 and 12.6px at 1512. A `rem`
height therefore moves with the viewport while an image's aspect ratio does not,
and the shell caps at `min(95vw, 1440px)`, so the box's width and height stop
scaling together above the cap. Any fixed `rem` height will drift against fixed
artwork; the only question is at which widths it happens to look right.

**Decision.** Size an image ground with `aspect-[…]`, not a height. A ratio cannot
drift, because both sides scale from the same width. Grounds that share a grid
column then share a height at every viewport automatically, with no per-step
tuning and no magic numbers to re-check per band.

Shots that must be shown whole are capped on **both** axes (`maxWidth` +
`maxHeight` percentages, `w-auto h-auto`), so whichever axis binds first, any
artwork ratio fits by construction. Shots that deliberately bleed keep a
width-only size and run off the foot of the ground.

**Consequences.** Row height is now a property of the ratio rather than of the
tallest artwork, so new artwork drops in without a layout pass. The ratio itself
is constrained by the *widest* artwork in the set — at 5/4, step 03's 1.87:1
event shot fills 68% of the ground's height, and anything squarer leaves it
looking lost. Ratio changes are therefore a set-wide decision, not a per-row one.

Where artwork is off-centre inside its own canvas, correct it with a measured
`nudgeXPct` in the content data rather than by hand-tuning the size — centring
the file otherwise centres its empty margin too. See [[design-system]] and
ADR-0008.

---

## ADR-0026 — Mobile draws *smaller* points, not bigger ones

- **Status:** Accepted — reverses the `pointSizeScale` rationale of ADR-0021
- **Date:** 2026-08-04

**Context.** `device.ts` shipped with the rule "a strided tier draws fewer
points, so each one grows a little to keep the cloud reading as solid" —
mobile at `pointStride: 4` therefore got `pointSizeScale: 1.35`, taking the
authored 4.6px point to 6.2px. The reasoning holds for *coverage* and fails for
*legibility*: a phone is held at arm's length, not desk distance, so a 6.2px dot
at 0.85 DPR is a blob. The cloud read as poured paint rather than as points, and
the form the points describe was the thing being lost.

**Decision.** Halve it — `pointSizeScale: 0.68` on the mobile tier. Nothing else
about the tier changes; `pointStride`, DPR clamp, frame budget and the
bloom-off rule all stand.

**Consequences.** The subject reads as particles again on a phone, and fill
drops with the point area — the cheapest possible saving on the tier that needs
it most (optimize-3d-scene §7). The cloud is visibly **sparser**: stride 4 at
0.68× is the thinnest the silhouette survives, and it was checked at 390×844.
If it ever reads too thin on a real device the lever is `pointStride` — 4 → 3
restores a third of the points at a third more cost — **not** the point size,
which is the thing that was wrong.

---

## ADR-0025 — The far side fades, the cloud never fully stops, and the hover stays a repulsion

- **Status:** Accepted — narrows ADR-0022
- **Date:** 2026-08-04

**Context.** Three changes to what the hero cloud *does* were asked for
together — a different hover, a depth fade, and motion at rest. They are one
decision because they share a cost: each is per-frame work on 87k points, and
the third spends something ADR-0022 had bought.

**Decision.** Everything new lives in the vertex shader, driven by uniforms
(optimize-3d-scene §9). Nothing touches the geometry, so all of it stays
live-tunable from the `?tune` panel.

1. **The hover stays a repulsion** — the one item that ended up as a *tuning*
   rather than a change: force 0.36 → 0.2 and radius 0.49 → 0.34, with the
   falloff, turbulence and easing exactly as written. Two replacements were
   built and both reverted; see below.
2. **The far side fades, in view space.** A depth band is derived per frame from
   the subject's own bounding sphere and the camera distance, and a point's
   alpha falls off across it.
3. **Every point drifts, forever.** A slow wander along the surface — two
   tangents carry it, the normal takes a tenth — with a per-point phase and rate
   from the existing `aRandom` attribute.

**Two hover replacements, built and reverted.** Both worked; neither was the
effect wanted, and the notes are here so they are not re-attempted blind.

- **A magnet** — the same falloff with the direction reversed, so points lean
  *toward* the pointer. It needs a cap on how far a point may travel toward the
  cursor or it is not a magnet but a crater: everything close enough lands on
  the same spot, and at 0.85 of a point's own distance it swallowed the
  subject's ear. Capped at 0.45 it held its structure and read well. Rejected
  as the wrong gesture for the piece.
- **A vortex** — travel *around* the pointer rather than into it, with the
  radius measured across the screen (the perpendicular component of the offset
  from the view axis) rather than through the scene, since the radius a visitor
  sees is a circle on the glass. Swirl and push were two knobs describing one
  direction vector, which between them covered orbit, magnet and repulsion. It
  needed the camera axis in the model's space as a uniform — a *direction*, so
  the inverse group rotation alone, never `worldToLocal`, which would translate
  it by the model's position and aim it somewhere else entirely.

What survived from all of it is one line: the repulsion now measures from
`displaced` rather than `position`, so it pushes from where the drift has
actually left a point rather than from where it was authored.

Both are in git history; neither is worth keeping as dead configuration. The
knob that was actually wanted was the pair already on the panel — the effect was
never wrong, it was twice too strong and half again too wide.

**Why the depth band is the bounding *sphere*.** The brief was "no matter how
you rotate the model, only the farthest points disappear". A sphere is the one
measure of the subject a rotation cannot change, so `start` and `strength` mean
the same thing at every angle and the band stays anchored in front of the lens.
The alternative — fitting the band to the actual depth extent each frame — makes
the fade *breathe* as the subject turns, which is the opposite of what was
asked. The price is that the band is wider than a bust is deep, so the authored
`strength` never fully resolves at the back; that is what the panel's two
sliders are for, and the shipped 0.35 / 0.85 was dialled against the render.

**What the drift costs.** ADR-0022 stopped the cloud flickering two ways: a
frame that moves nothing is not drawn, and a barely-moving frame is blended with
the last one. **The first half no longer applies while the drift is on** — there
is no such thing as a still frame when every point is moving. Measured on the
production build with the pointer parked and the parallax fully settled: with
drift on, four frames sampled 0.9s apart are all different; with `drift.amount`
at 0, all four are **byte-identical**, so the guarantee is intact and the drift
is the only thing that broke it.

That is accepted rather than worked around, because the second half of ADR-0022
covers this case *better* than the skip did: the blend weight is a function of
how far the subject moved, the drift moves it about a pixel a second, so the
frame mix sits near its floor (22% new) and the wander is the most heavily
smoothed thing on screen. The drift's own screen speed is folded into that
motion measure, so it reaches the blend rather than being invisible to it.

The amplitude is the guard rail: 0.003 world units lands at roughly 1–2 px once
the model scale and the ~460 px-per-world-unit projection are applied. Doubling
it starts to soften the silhouette, which is why it is authored small and left
in the panel rather than pushed.

Reduced motion and the energy-saver tier are unaffected — `sceneShouldFreeze()`
already parks the loop, and the drift uniform is forced to 0 there, so a frozen
scene is a still and not a wander caught mid-stride.

---

## ADR-0024 — The hero has no poster; the preloader is the cover

- **Status:** Accepted — reverses Decision 2 of ADR-0020
- **Date:** 2026-08-04

**Context.** The reference render sat under the canvas and faded out once the
scene drew its first frame. ADR-0020 gave it three jobs: the cover while the
scene builds, the LCP image, and the no-WebGL fallback. Only the first was ever
really needed, and it had already been taken over by something else — the
preloader counts the scene's first frame as one of its two milestones, so by the
time the cover lifts the canvas is already drawn and the poster underneath it is
fading against an identical image.

It was not free. `portrait.png` is **4.3 MB**, fetched with `priority` on every
first visit, and being the largest element on screen it *was* the LCP — a
4.3 MB LCP. It also sat inside `HeroVisual`'s scale spring, which creates a
stacking context, so it covered the rule grid until it finished fading (logged
as a known consequence on 2026-08-03 and never addressed).

**Decision.** Remove it: the `<Image>` and its fade spring, the `image` field on
`HeroContent`, its mock entry, and the asset itself.

**Consequences.** The LCP is now the headline — text, already in the prerendered
HTML — and 4.3 MB leaves the first visit. The grid is no longer occluded.

Two things are genuinely given up, both accepted:

- **No no-WebGL fallback.** If `WebGLRenderer` throws or the vertex buffer fails
  to load, `onReady` never fires, the preloader's **6s failsafe** lifts the cover
  anyway, and the visitor gets the section — headline, metrics, copy, grid —
  with no subject in it. Previously they got the render. `onLost` is likewise no
  longer wired to anything in `HeroVisual`; a lost context now leaves the canvas
  blank rather than restoring an image.
- **A non-JS crawler sees no subject.** ADR-0020's §1 argument was that the
  poster is what a bot gets instead of the scene. The half that matters still
  holds — the scene is a `dynamic(ssr: false)` leaf, so no bot downloads or runs
  `three`, and `/` stays statically prerendered (`○`) — but the prerendered HTML
  now carries only text. Social previews are unaffected: `opengraph-image.tsx`
  generates its own card and never referenced this asset.

The asset is deleted but tracked in git, so restoring the poster is a revert,
not a re-export.

---

## ADR-0023 — The glow is averaged over time on bloom's own buffer, not the frame's

- **Status:** Accepted
- **Date:** 2026-08-04

**Context.** ADR-0022 steadied the *points*. Dragging the subject round with the
cursor still made the **glow** pulse, in patches, across whole regions of the
frame — the most visible flicker left, and the one the frame blend deliberately
does not touch (it mixes in nothing once the subject is properly moving, so that
nothing smears).

Bloom is not a passenger here, it is the amplifier. Measured as local brightness
jitter — how far a 32×32 block departs from the trend of its own neighbouring
frames, during a steady 4.4px/frame drag:

| | jitter | p99 | blocks pulsing >20 |
|---|---|---|---|
| Scene with bloom | 7.87 | 152 | 6.99% |
| **Same scene, bloom off** | 1.57 | 5.9 | **0%** |

`UnrealBloomPass` extracts its bright areas at `BLOOM_RESOLUTION_SCALE` of the
*CSS* size, and halves that again internally: on a 1440×860 viewport at DPR 1.5
the bright pass is **360×215 against a 2160×1290 buffer** — a sixth per axis. At
that ratio it point-samples a cloud of 2px dots. Dots drop in and out of the
bright pass as they move, each one becomes a *blurred blob*, and the glow boils.

**Two fixes were measured and rejected.** Raising the bloom resolution works
(3.5× less jitter at half the buffer, 7.6× at 1:1) — but it is not a fill
question, it is the artwork: the coarse bright pass is what smears the glow into
the haze behind the subject. Measured, that haze covers **96%** of the frame at
the authored resolution and **71%** at a quarter of the buffer. Raising it lifts
the atmosphere off the composition, and neither `radius` nor `strength` brings it
back. Dropping the luminosity threshold to 0 also works (9× less jitter) and is
just as much a change to the look.

**Decision.** Smooth the glow *over time*, separately from everything else, and
leave every authored value alone. Bloom composites additively, so the glow it
added is recoverable:

```
bloomed = clean + glow
wanted  = clean + smoothedGlow = bloomed - (glow - smoothedGlow)
```

`src/lib/scene/temporal-filter.ts` averages the glow with an exponential filter
at weight **0.15** and applies that correction. Two details make it cheap enough
to be uncontroversial:

- The averaging runs on **bloom's own buffer** (360×215), not the frame's.
- The correction folds into the frame-blend pass from ADR-0022, which was
  already running full-screen. No new full-screen pass exists.

A weight that low is only tolerable because of *what* is being smoothed: the
glow lags a few frames, which shows up solely while the subject is moving fast —
precisely when nobody can see it. The subject itself is not in the filter at all
and stays exactly as crisp as it was.

**Consequences.** Local brightness jitter while dragging the subject:

| Drag speed | jitter | p99 | blocks pulsing >20 |
|---|---|---|---|
| 4.4 px/frame | 7.87 → **1.04** | 152 → **17.6** | 6.99% → **0.79%** |
| 8 px/frame | 8.76 → **1.24** | 179 → **22.3** | 7.50% → **1.23%** |

Both land at the level of the same scene with bloom switched off entirely — the
glow has stopped adding flicker of its own. The still frame is unchanged, and
measurably so: drift after 40 heavily-averaged frames on a still subject is
**0**. Cost of the glow filter alone, GPU-synced: **+0.32 ms**; the first
version of this, which separated the glow with three extra full-screen passes,
cost +4.4 ms for a worse result.

The one liability is that it reads `bloomPass.renderTargetsHorizontal[0]` —
`three`'s internal buffer for the composited glow. It is read through a guard,
so if an upgrade renames it the correction switches itself off and the scene
renders exactly as it did before. `BLOOM_RESOLUTION_SCALE` also now carries a
warning: it is an artwork value, not a performance dial.

---

## ADR-0022 — The cloud stops flickering by not drawing still frames, and by blending slow ones

- **Status:** Accepted
- **Date:** 2026-08-03

**Context.** The point cloud twinkled. The cause is structural, not a bug: 87k
alpha-blended sprites also **write depth**, so a sprite's near-transparent edge
occludes a fully lit point behind it. A sub-pixel move flips which one owns the
pixel, and the pixel jumps from "bright point" to "almost nothing". Measured on
the desktop tier, a **0.3 px** move flipped **1.08%** of the lit pixels by more
than 60 luminance levels.

Two things then guarantee that sub-pixel motion is always happening. The
parallax ease (`0.02`) is asymptotic — it never arrives, so it keeps the subject
drifting below a pixel for *tens of seconds* after the pointer stops. And every
one of those frames was drawn.

The obvious fixes were measured and rejected, in this order:

| Tried | Flicker | Why not |
|---|---|---|
| `depthWrite: false` | 4.6× better | The head goes translucent — the far side shows through the face. |
| Static back-to-front sort, no depth write | 11× better | Accumulated alpha never reaches opaque; same see-through face. |
| Cull back-facing points by `aNormal` | 6× better | The normals are *approximated* (radial from the centroid) — it erased the nose, lips and eye sockets. |
| Alpha-cutoff the sprite edge | 1.5× | The jump just moves to the cutoff radius. Shrinks the dots for nothing. |
| Depth pre-pass + depth bias | 4× better | Works, but more fragments blend → brighter → bloom blows the face out. It is a re-lit scene, not the authored one. |
| Supersample (DPR 3) | 2× better | 4× the fill for half the problem. |

Every one of them buys stability by **changing the artwork**. The flicker lives
in the occlusion model, and the occlusion model is what makes the subject read
as solid.

**Decision.** Leave the artwork — colour, occlusion, point size, bloom —
completely alone, and attack the *motion* instead. Both halves live in
`particle-scene.tsx`:

1. **A still frame is not drawn.** Each frame measures how far the subject
   actually travelled since the last **drawn** frame (rotation × subject radius
   + scatter displacement, converted to CSS px by the camera). Under
   `IDLE_MOTION_PX` (0.05) it returns without rendering. Measuring against the
   last drawn frame, not the last computed one, is what keeps a slow creep from
   being discarded a thousand times over and silently drifting out of frame.
2. **A barely-moving frame is blended with the last one.** `SavePass` +
   `ShaderPass(BlendShader)` — two full-screen quads at the end of the composer —
   mix the previous frame back in, weighted by that same motion figure:
   heaviest for sub-pixel drift, gone entirely above `TEMPORAL_FULL_MOTION_PX`
   (1.5 px). Real movement stays crisp; only the drift that carries the twinkle
   is averaged out.

`renderOnce` — resize, a panel edit, the prewarm frame — always renders with no
history, and the saved frame is invalidated on resize and on context loss.

**Consequences.** Share of lit pixels changing between consecutive frames,
desktop tier, by per-frame subject motion:

| Motion / frame | Δ>25 before → after | Δ>60 before → after |
|---|---|---|
| 0.18 px (the parallax tail) | 2.16% → **0.41%** | 1.08% → **0.17%** |
| 0.53 px | 7.24% → **3.11%** | 2.61% → **0.66%** |
| 1.76 px (real movement) | 12.9% → 12.9% | 6.4% → 6.4% (deliberately untouched) |
| Still | drawn every frame | **not drawn at all** |

A still scene is now bit-identical frame to frame, so it cannot flicker: 616
animation frames with the pointer at rest produced **zero** renders, and motion
restarts it immediately. The blend converges on exactly the authored image —
measured drift after 12 heavily-blended frames on a still subject: **0**.

The costs, both accepted: two extra full-screen passes per drawn frame (against
bloom's ~13, and only on frames that are drawn at all), and one extra
half-float render target. §7's "bypass the composer when bloom contributes
nothing" is narrowed to "disable the bloom pass" — the composer itself always
runs now, because the temporal pair lives in it.

---

## ADR-0021 — Pixel ratio is clamped below 1 on mobile, and below device on desktop

- **Status:** Accepted
- **Date:** 2026-08-03

**Context.** The scene ran at the tier's DPR cap — 1.5 mobile, 2 desktop — which
is what the device reports, not what the content needs. Fill scales with the
square of that number, and measurement on a production build showed the phone
was rasterising 740,610 drawing-buffer pixels for a cloud of soft, round,
alpha-faded sprites that carry no high-frequency detail at all.

**Decision.** Adopt the `optimize-3d-scene` §6 table: **mobile 0.85**, tablet
1.25, desktop 1.5. The skill sanctions going below 1.0 specifically for
soft-edged sprites and warns against it only for hard-edged geometry — warp
streaks, thin lines, shader text — none of which this scene has. Separately, the
bloom chain now runs at **half** the drawing buffer in each axis: it is a blur,
and its ~14 full-screen passes per frame were the largest single fill item.

**Consequences.** Measured on `yarn build && yarn start`, counted quantities
only (§0 — absolute fps out of this environment is meaningless):

| | before | after |
|---|---|---|
| Mobile drawing buffer (390×844) | 740,610 px | **237,327 px** (3.12×) |
| Desktop drawing buffer (1440×800) | 4,608,000 px | **2,592,000 px** (1.78×) |
| Bloom fragments / frame, desktop | ≈22.1M (derived) | **5,519,848 px** (measured) |
| Points drawn / frame | 21,745 mobile · 86,977 desktop | unchanged |

The trade-off is real and deliberate: **the desktop canvas is no longer rendered
at full retina density.** On a soft point cloud that is not visible at arm's
length — verified by eye at 1440×800 — but it is a genuine reduction in sampling
and is reversible in one line (`MAX_PIXEL_RATIO`). Detail was not touched: the
point count per tier is identical before and after, per §7's "cut fill, not
detail".

---

## ADR-0020 — The hero scene is raw `three` on the shared ticker, postered not bot-gated

- **Status:** Accepted — **Decision 2 reversed by ADR-0024**
- **Date:** 2026-08-03

**Context.** The hero subject became a live point cloud (86,977 vertices). Two
choices had no precedent in this repo, and both cut against an obvious default.

**Decision 1 — `three` directly, no `@react-three/fiber`.** R3F is the
React-idiomatic option, but it runs `useFrame` on its own
`requestAnimationFrame`. This project has exactly one app-wide loop by decision
(ADR-0009), and [[optimize-3d-scene]] §4/§5 hang the visibility gate and the
per-tier frame budget off it. A second loop would put the scene outside both.
The scene therefore builds its geometry imperatively in an effect and renders
from `subscribeToTicker`, which also gives §5's budget for free — the tier's
`frameBudgetMs` is simply what `getFramerate` returns.

**Decision 2 — an SSR poster instead of `isBot()`.** §1 says never ship the
scene to a bot, and the starter has `isBot()` ready. But `isBot()` calls
`headers()`, which would turn `/` from a statically prerendered route (`○`) into
a server-rendered one (`ƒ`) — a permanent cost on every visit for every visitor,
to fix a class of client that mostly does not execute JS anyway.

Instead the reference render ships in the prerendered HTML as the poster, and
the scene is a `dynamic(..., { ssr: false })` leaf that mounts over it and lifts
it once it has drawn. Verified on the production build: the prerendered HTML
carries the poster with its full `srcset`, contains **no `<canvas>`**, and never
references the 516 KB `three` chunk. `/` stays `○`.

**Consequences.** A non-JS crawler sees the poster and nothing else — §1's real
goal — while the page keeps static prerendering and the poster doubles as the
LCP image and the no-WebGL fallback (if `WebGLRenderer` throws or the fetch
fails, `onReady` never fires and the poster simply stays). The gap this leaves
is **Lighthouse and other headless-Chrome auditors, which do execute JS and will
download and run the scene** — if that shows up in an audit, `isBot()` is still
the lever, and the `○`→`ƒ` cost is then a deliberate trade, not an accident.

---

## ADR-0019 — Brand typography is local; the site is dark by brand, not by OS

- **Status:** Accepted
- **Date:** 2026-08-03

**Context.** The starter shipped **Onest** via `next/font/google` and a
light/dark pair driven by `prefers-color-scheme`. The first real design (Figma
`Hero 6`) is set in **Inter Tight** and **Space Mono** — neither is the Google
face — and is authored on black, with white copy over a full-bleed image. Under
the old setup a visitor whose OS is in light mode would have got a white
`--background` behind a composition that only works on black.

**Decision.**

- Fonts load through **`next/font/local`** from `src/app/fonts/` (the licensed
  `.ttf` files ship with the repo), bound as `--font-inter-tight` → `--font-sans`
  and `--font-space-mono` → `--font-mono`. Self-hosting also removes the
  third-party request Google Fonts would add.
- `--background` / `--foreground` resolve to the **same dark roles in both
  schemes**. The `prefers-color-scheme` override is gone, not inverted: this is a
  single-theme brand site, and a token that silently flips under the visitor's OS
  is a bug here, not a feature.

**Consequences.** Re-theming still happens at Tier 2, so ADR-0015 is intact — a
future light mode means overriding those roles again, deliberately. Swapping the
brand face is a two-line change in `layout.tsx` plus the two `@theme` bindings.

---

## ADR-0018 — Feature sections co-locate under `views/<page>/`

- **Status:** Accepted
- **Date:** 2026-08-03

**Context.** [[component-conventions]] says a feature-specific component belongs
"next to the feature, **not** in `components/`", but `views/` was documented as
*one file per route* — so there was nowhere for a page's own sections to live. A
hero built from five parts either bloats a single view file past the ~150-line
limit or leaks into `components/`, which is reserved for reusable primitives and
shared infrastructure.

**Decision.** A view may be a **folder**: `views/<page>/index.tsx` is the view,
and its sections live beside it in `views/<page>/<section>/`. The route still
imports only `@/views/<page>` ([[routing]], ADR-0003) — the module specifier is
unchanged, so nothing about route → view delegation moves.

`components/ui/` and `components/common/` keep their meaning: a piece earns a
place there once a *second* page needs it. Until then it stays with its feature.

**Consequences.** `src/views/home.tsx` became `src/views/home/index.tsx`.
Section content stays out of the components: copy lives in
`src/data/mocks/<page>.ts` and reaches the section as props, with shared shapes
in `src/types/`.

---

## ADR-0017 — A skill states its preconditions and its own internal conflicts

- **Status:** Accepted
- **Date:** 2026-07-24

**Context.** `optimize-3d-scene` (ADR-0016) was run for the first time on a real
scene outside this repo — a raw WebGL project, no three.js, no scroll. The fix
order held up; what cost hours was everything the skill left implicit. Ranked by
time burned:

1. **§0 could not be executed at all.** `renderer.info.render` /
   `.programs.length` exist only on `THREE.WebGLRenderer`, yet the skill's own
   title says "three.js / WebGL". The agent had to invent instrumentation before
   it could take a baseline.
2. **The measurement environment was never stated**, and all three failure modes
   fired: dev-mode numbers are invalid (eager chunk serving faked a §1 failure;
   Strict Mode's double-mount faked 2 listeners and a halved frame rate), a
   stale `next start` on the port served 500s that read as a code bug, and
   `waitUntil: "networkidle0"` never fires against `next start`.
3. **§1 actively breaks §3.** `dynamic(ssr: false)` means the scene cannot
   compile until after hydration; on Regular 3G + 4× CPU programs linked at
   5.0 s against a loader that lifted at 2.36 s. Two correct steps, silently
   contradicting each other.
4. **§3's stall list was GPU-only** — all four causes shader/texture/target —
   but the worst stall measured was a 3.9 s main-thread CPU decode. Workers
   appeared nowhere in the skill.

Plus four smaller ones: the `as="fetch"` preload credentials trap (only
`use-credentials` + `include` dedupes; the other pairings silently
double-download), §5's `1000/30` actually measuring ~26 fps because of how the
ticker throttles, §7's "cut the sparse end" having no lever on a *baked* point
buffer, and §13's `lvh` being read as applying to the layout when it is for the
canvas only.

**Decision.** Fold all of it back into the skill, and adopt two rules for how
this and every future skill is written:

- **A step states its preconditions.** §0 now ships a `getContext` hook that
  gives a raw WebGL scene the counted equivalents of `renderer.info`
  (`draws` / `verts` / `links[]` timestamps / captured `attrs`), and a
  *measurement environment* block: production build, kill the old server first,
  `waitUntil: "load"`, and — because SwiftShader is not a GPU — only counted
  quantities transfer, never absolute fps.
- **A step names where it fights another step.** §3 now carries the §1 conflict
  explicitly, with the measurement that exposes it (link timestamps vs handoff
  time) and the fix (preload the data from the HTML; gate the loader on
  scene-ready, not on a duration).

Also added: §3 gains a fifth stall cause (CPU decode → Worker, with
transfer-in-both-directions) and the preload-credentials warning; §5 states the
~26 fps reality; §7 requires a decile ordering check before truncating a baked
buffer; §13 splits canvas `lvh` from content `dvh`; §1's poster is rejustified
(crawler screenshots and the no-WebGL fallback — *not* layout stability) with
two crops for tighter-axis framing and the `headers()` → `○`→`ƒ` prerender
trade-off named.

**Consequences.** The skill now works on a scene with no three.js in it, and its
first section can be executed instead of merely read. The cost is a longer §0 —
an agent must build instrumentation and a production build before touching
anything — which is the correct tax: every number the skill asks for later is
worthless without it. Deliberately kept unchanged, because the field run
confirmed them: the cheapest-first ordering, the canonical-file table, and
"don't invent new shapes; port these" — the `device.ts` port dropped in clean
and is most of why that run went as fast as it did.

---

## ADR-0016 — Skills are registered in the vault, not just dropped in `.claude/`

- **Status:** Accepted
- **Date:** 2026-07-24

**Context.** The first Claude Code skill for this starter —
`optimize-3d-scene` — arrived as a folder under `.claude/skills/`. A skill there
is discoverable to Claude Code *at runtime*, but it is invisible to the vault:
nothing in `obsidian/` said it existed, when to reach for it, or how it relates
to the hard rules. That contradicts ADR-0006 (the vault is the single source of
truth) and leaves the invocation decision to model judgement — exactly the kind
of thing this project pins down in writing. A performance request on a
scene-carrying project would otherwise get whatever fix order the agent invented
that day, when the skill exists precisely because the order matters (audit →
bot path → tiering → prewarm → visibility gate → budgets → fill).

**Decision.** A skill is only "installed" once it is registered:

1. The skill lives at `.claude/skills/<name>/`.
2. A vault note under `workflows/` documents what it does, its trigger
   conditions, and how it maps onto this project's primitives.
3. It is linked from [[README]]'s Map of Content and from the skills table in
   [[ai-agent-guide]].
4. If invocation should be non-optional, the routing rule goes into AGENTS.md's
   hard rules — the shim every agent reads first.
5. It is logged in [[changelog]].

For `optimize-3d-scene` this became **hard rule #11**: a performance / jank /
pre-ship request **and** a three.js or WebGL scene in the project → invoke the
skill and follow its order. The vault note [[optimize-3d-scene]] additionally
maps the skill's canonical patterns (which reference an external workspace) onto
what the starter already ships — the shared ticker (ADR-0009) for its one-rAF
rule, `isBot()` (ADR-0010) for its bot path, the Lenis store for scroll, the
in-view hooks for its render gate — so following the skill does not produce a
second copy of infrastructure that exists.

**Consequences.** Skill invocation becomes a documented rule rather than a guess,
and the routing survives model, tool and session changes because it lives in
AGENTS.md and the vault, not only in the skill's own `description`. The cost is
one extra note plus two index edits per skill — the same tax every component and
hook already pays. The starter still ships **no `three` dependency**
([[tech-stack]] unchanged); rule #11 is dormant until a project adds one. A
wrong vault path inside the skill (`obsidian/Meta/…`, plus an `open-questions.md`
this vault does not have) was corrected as part of registering it — registration
is also the moment a skill gets checked against reality.

---

## ADR-0015 — Strict three-tier design-token naming convention

- **Status:** Accepted
- **Date:** 2026-07-17

**Context.** ADR-0004 made tokens the styling currency but never said what a token
should be *called*. The starter shipped two tokens (`--background`,
`--foreground`) and no grammar, so every project built from it would invent its
own — defeating the point of a shared starter, since an agent moving between
projects could not predict a token name without reading `globals.css`. Reference
taken from [Mavik Labs — *Design Tokens in Tailwind v4*](https://www.maviklabs.com/blog/design-tokens-tailwind-v4-2026/)
(three tiers: primitive → semantic → component).

**Decision.** Adopt the three-tier model with an explicit grammar, documented in
[[design-system]] and codified as AGENTS.md hard rule #4:

| Tier | Grammar | Lives in |
|------|---------|----------|
| Primitive | `--raw-<category>-<name>[-<shade>]` | `:root` |
| Semantic | `--<role>[-<variant>][-<state>]` | `:root` |
| Component | `--<tw-namespace>-<component>[-<property>]` | `@theme inline` |

- Only Tier 1 holds literals; Tier 2 names purpose, never appearance; Tier 2 is
  the themeable layer (dark mode overrides there). No tier may be skipped.
- Every `@theme inline` entry is exactly `--<namespace>-<role>: var(--<role>)`.
  `inline` is load-bearing — it inlines the `var()` into each utility so Tier 2
  overrides cascade; binding a literal freezes the value and breaks theming.
- Tier 3 stays rare by design (ADR-0012 prefers a React component).

**Two deliberate deviations from the reference article**, both verified against
`tailwindcss` v4.3.3 by compiling a probe stylesheet:
1. The article names primitives `--color-blue-500`. We prefix them `--raw-*` and
   keep them out of `@theme` — under Tailwind v4 a `--color-*` entry *generates
   utilities*, so naming primitives that way would emit a `bg-blue-500` for every
   raw value and let markup bypass the semantic tier.
2. The article lists `--duration-fast` / `--duration-normal` next to `--ease-*`.
   **There is no `--duration-*` namespace in Tailwind v4** — the probe confirmed
   `duration-fast` compiles to nothing and the variable is not even emitted from
   `@theme inline`. Durations therefore stay Tier 2 only, consumed as
   `duration-[var(--duration-fast)]`. (`--ease-*` *is* a real namespace and is used.)

Retrofit is **minimal and unopinionated**: the existing background/foreground
tokens were restructured into the tiers, and the primitives/durations/`--ease-entrance`
/`--leading-display` they imply were added. **No brand palette was invented** —
the convention is the deliverable; projects add `--raw-color-brand-*` themselves.

**Consequences.** Token names are now predictable across every project from this
starter. This **amends ADR-0004**, which said only that new values go in
`globals.css` first — they must now also follow the tier grammar. `globals.css`
grew a documented tier structure but stays bounded (ADR-0012). Existing markup is
unaffected: `bg-background` / `text-foreground` still resolve, since the Tier 2
names and `@theme` bindings kept their public names.

---

## ADR-0014 — Narrow CSS-transition exception for trivial state changes

- **Status:** Accepted
- **Date:** 2026-07-17

**Context.** ADR-0002 banned CSS transitions outright to force every motion
through the spring layer. In practice the ban's cost lands hardest where its
benefit is lowest: a nav link fading its colour on hover had to become a client
component wrapping `<Hover>` with a spring config, to animate one property that
no user will ever interrupt or perceive as physical. The rule pushed teams toward
either boilerplate or quiet rule-breaking.

**Decision.** Keep hard rule #1 for all real motion; carve out one narrow,
condition-bound exception. CSS `transition-*` is allowed **only** for simple,
discrete state changes — `hover:` / `focus-visible:` / `active:` colour, opacity,
border-colour, underline, and small decorative nudges — subject to three
conditions, all required:

1. **Token-backed timing** — `duration-[var(--duration-fast)] ease-entrance`; raw
   ms/cubic-bezier values remain banned by hard rule #4.
2. **`transition-*` only** — `@keyframes` stay banned outright. Anything long
   enough to need keyframes is long enough to deserve a spring.
3. **Utilities only** — the transition lives in `className`, never in a CSS file
   (ADR-0012).

Everything scroll-driven, revealing, layout-affecting, staggered, orchestrated,
or interruptible remains spring-based; text remains [[text-engine]]. Anything
past the allowed list is `<Hover>`.

**Consequences.** A hover colour change no longer needs a client component — the
common case gets cheaper and the spring layer keeps the cases it is actually good
at. This **amends ADR-0002**, whose "CSS transitions are banned" is now "CSS
keyframes are banned; transitions are limited to the list above". The exception is
deliberately narrow and enumerated rather than a judgement call ("simple
animations") so it cannot erode into general CSS animation. `--raw-duration-*` /
`--duration-*` / `--ease-entrance` tokens exist to serve it (ADR-0015).
[[animation-system]], [[design-system]], and [[ai-agent-guide]] updated to match.

---

## ADR-0013 — `<Inview>` self-observe fix; spring components honour resize

- **Status:** Accepted
- **Date:** 2026-06-07

**Context.** `<Inview>` only animated when an external `trigger` ref was passed.
Without one it never revealed. Root cause: `useDynamicInView` returns its target
attachment as a **callback ref** (`setNode`) in the first tuple slot, but
`in-view.tsx` destructured it as `inViewRef` and wrote `inViewRef.current = node`
in the JSX `ref` callback — assigning `.current` to a function instead of calling
it. `setNode` never ran, the observed `node` stayed `null`, and with no `trigger`
the observer had nothing to watch (`trigger?.current ?? node` → `null`). With a
`trigger` it worked only because `trigger.current` bypassed the dead `node` path.
TypeScript flagged this at build time (`Property 'current' does not exist on type
'TargetRefCallback'`), so the build was already failing.

Separately, `<Inview>`, `<Spring>`, and `<Hover>` tracked `width`
(`useWindowWidth()`) as a `useMemo`/`useEffect` dependency to re-evaluate mobile
gating on resize, but never passed it to `isMobileDisabled()` — so the value was
genuinely unused (ESLint `react-hooks/exhaustive-deps` warning) **and** resize
re-evaluation silently did nothing; the check always read `window.innerWidth` at
call time.

**Decision.** This is the second authorized edit to the `#do-not-modify` engine
(after ADR-0009). Two corrections:
1. In `in-view.tsx`, call the callback ref — `setInViewNode(node)` — instead of
   assigning `.current`, so the component observes itself when no `trigger` is
   given.
2. Pass the React-tracked `width` into every `isMobileDisabled(value, width)`
   call across `in-view.tsx`, `spring.tsx`, and `hover.tsx`. This is the
   documented second parameter of `isMobileDisabled` and makes the `width`
   dependency meaningful, fixing resize re-evaluation and clearing the lint
   warnings.

**Consequences.** `<Inview>` now works standalone (the common case). `yarn build`
and `yarn lint` are both clean (0 errors, 0 warnings). The springs folder remains
`#do-not-modify` by default — these were explicitly signed-off bug fixes.

---

## ADR-0012 — Styling lives in utilities and components, not `globals.css`

- **Status:** Accepted
- **Date:** 2026-05-22

**Context.** ADR-0004 made design tokens the styling currency and ruled that
"new values must be added to `globals.css` first." Combined with the
design-system guidance to *"extract repeated multi-class patterns to
`@layer components`"*, the path of least resistance for any repeated visual
pattern became a named class in `globals.css`. On an animation-heavy,
multi-section marketing site that grows the file without bound — a single
global stylesheet accumulating hundreds of component-specific classes that are
never deleted when their component is. The fix is a placement rule, not a
file-splitting trick: splitting `globals.css` into many files only spreads the
same bloat.

**Decision.** Styling follows a strict placement order; `globals.css` stays
bounded by design.

- One-off styling → **Tailwind utilities** in `className`. Nothing enters CSS.
- A repeated pattern with markup/structure/props → a **React component**
  (`components/ui/`), *not* a CSS class. This is the default answer to "this
  looks repeated" — e.g. an eyebrow label with a `::before` dot is an
  `<Eyebrow>` component, not a `.label-eyebrow` class.
- A repeated pure-utility combo with no structure → a Tailwind v4 `@utility`.
- `@layer components` is reserved **strictly** for what utilities and
  components genuinely cannot express: pseudo-elements (`::before`/`::after`),
  third-party DOM overrides (`!important` on library markup), complex
  descendant/state selectors.
- `globals.css` only ever holds: `@import`, tokens (`:root` + `@theme`), base
  element resets (`@layer base`), and the narrow `@layer components`
  exceptions above. If it grows past that, something was misplaced.
- CSS Modules were considered and **rejected** — a second styling mechanism
  for the rare bespoke-CSS case is not worth the extra mental model when
  motion is spring-based (no keyframes — ADR-0002) and utilities + components
  cover everything else.

**Consequences.** `globals.css` stays a few-hundred-line file indefinitely.
"Repeated thing" pressure now pushes toward React components — which the
project wants anyway. This **amends ADR-0004**: design *tokens* still go in
`globals.css` first, but component-specific *classes* no longer do.
[[design-system]] and [[component-conventions]] updated to match.

---

## ADR-0011 — API layer: `app/api` route handlers, secrets server-side

- **Status:** Accepted
- **Date:** 2026-05-22

**Context.** The starter had no API layer. It needs a convention for reaching
external services that keeps secret keys off the client and gives endpoints a
consistent shape.

**Decision.** External calls go through Next.js Route Handlers —
`src/app/api/<resource>/route.ts`:
- **The handler owns the work** — business logic, multiple upstream calls,
  filtering, and reading secret env vars all live in `route.ts`. No mandatory
  passthrough service layer; extract shared code only when genuinely reused.
- Secrets are safe in handlers because `route.ts` is never bundled to the
  browser. Secret env vars are **unprefixed**; `NEXT_PUBLIC_` only for
  browser-safe values.
- Every endpoint: validates input with `zod`, returns the `{ data }` /
  `{ error }` envelope via the shared `handle()` wrapper (`src/lib/api/`), runs
  on the Node runtime (not Edge).
- `src/env.ts` validates env with zod — `publicEnv` vs `getServerEnv()`.
- Client Components fetch via `apiFetch` (`src/lib/api-client.ts`), same-origin
  only. Render-time data is read in Server Components.
- Added `zod`. The example endpoint is `app/api/contact/route.ts`.
- Codified as **AGENTS.md hard rule #9**.

**Consequences.** A clear, secret-safe API convention (full note:
[[api-architecture]]). Server Actions were considered for mutations but
deferred — for now everything goes through `app/api`. The choice can be
revisited if forms need progressive enhancement. First server dependency
(`zod`) and first server-only env var (`CONTACT_ENDPOINT`) now exist.

---

## ADR-0010 — SEO & performance hardening

- **Status:** Accepted
- **Date:** 2026-05-21

**Context.** A review found gaps that would hurt a production marketing site:
`metadataBase` defaulted to `null` (relative OG/canonical URLs never resolved to
absolute — broken social previews); `themeColor` sat on the deprecated metadata
field; there was no `robots.txt`, `sitemap.xml`, or structured data; the
`next.config.ts` was empty; `ScrollLayout` leaked a `requestAnimationFrame`
loop; the home view was a top-level `"use client"` (violating hard rule #6);
and the animation-heavy starter ignored `prefers-reduced-motion`.

**Decision.**
- **Site config.** `src/lib/site.ts` (`siteConfig`) is the single source of
  truth for SEO, fed by `NEXT_PUBLIC_SITE_URL` (fallback `http://localhost:3000`).
- **Metadata.** `metadataBase` is always set; `themeColor` moved to a
  `generateViewport()` / `viewport` export; dead `keywords` / `other` tags
  dropped; OG dimensions corrected to match the asset.
- **Crawlability.** Added `app/robots.ts`, `app/sitemap.ts`, and a JSON-LD
  `Organization`+`WebSite` helper rendered once in the root layout.
- **App Router files.** Added `loading.tsx` (enables streaming), `error.tsx`,
  `not-found.tsx`.
- **Rendering.** `HomeView` is a Server Component; client-only animation moved
  to the `HomeShowcase` leaf — models hard rule #6 instead of breaking it.
- **Reduced motion.** `<ReducedMotion>` calls react-spring's `useReducedMotion`,
  toggling the global `skipAnimation` — one app-root mount covers every spring
  and `spring-text-engine`. Chosen over per-component handling for its reach.
- **Build config.** `next.config.ts` now sets `removeConsole` (prod),
  AVIF/WebP, `next/image` breakpoints aligned to the adaptive-grid widths, and
  `poweredByHeader: false`. React Compiler is left as a documented opt-in (needs
  `babel-plugin-react-compiler`).
- Fixed the `ScrollLayout` Lenis rAF leak (cancel on unmount).

**Consequences.** Social/SEO metadata is correct in production once
`NEXT_PUBLIC_SITE_URL` is set. The first project env var now exists (see
[[environment-variables]]). `isBot()` stays available but is discouraged — it
opts routes out of static rendering; reduced-motion is the preferred lever (see
[[seo-metadata]]). React Compiler remains opt-in pending a dependency install.

---

## ADR-0009 — Shared animation ticker; authorized engine performance refactor

- **Status:** Accepted
- **Date:** 2026-05-21

**Context.** A performance review of the animation engine found load issues that
scale with the number of animated components on a page:
- `useLoop` started a **private `requestAnimationFrame` loop per hook instance** —
  N scroll-driven components meant N rAF loops, none of which ever stopped.
- `useWindowWidth` attached a **separate debounced `resize` listener per call** —
  one per spring component.
- `useDynamicInView` re-created its `IntersectionObserver` **on every render**
  (effect keyed on an unstable `options` object), and a dead `Proxy` branch
  created observers that were never disconnected.
- `useLoop`'s mount-only effect captured a **stale `onRender`**, so prop changes
  after mount were ignored.
All of this lives under `src/hooks/animation/` and `src/components/animation/springs/`
— `#do-not-modify` (ADR-0002).

**Decision.** With explicit user sign-off, apply a one-time performance refactor
to the protected engine, and introduce a shared, unprotected loop primitive:
- New `src/lib/animation/ticker.ts` — a single app-wide, reference-counted rAF
  loop (`subscribeToTicker`). It starts on the first subscriber, stops on the
  last, and throttles each subscriber independently. **Not** `#do-not-modify` —
  it is the supported extension point.
- `useLoop` now subscribes to the ticker and reads `onRender` / `framerate`
  through refs (fixes the stale-closure bug). Public signature unchanged.
- `useDynamicInView` rewritten without the `Proxy`: one observer, re-created only
  when the observed element or options actually change; exposes a callback ref.
- `use-window-size.ts` (not protected) now serves all three hooks from one
  debounced `resize` listener via `useSyncExternalStore`. The unused
  `debounceDelay` parameter was dropped.
- `mode="forward"` `scroll` listeners in `<Spring>` / `<Inview>` made `passive`.
- Hard rule #2 amended: the engine stays protected by default; changes require
  explicit sign-off.

**Consequences.** A page with N animated components now runs **one** rAF loop and
**one** resize listener instead of N of each, with no observer churn. Public
hook/component APIs are unchanged except `useWindowWidth`/`Height`/`Size`, which
no longer take a `debounceDelay` argument (no caller passed one). This **amends
ADR-0002's** do-not-modify scope.

A follow-up pass then cleared all 13 pre-existing ESLint problems in the engine
(also authorized): `isMobileDisabled` gained an optional `viewportWidth`
argument, missing `disableOnMobile` effect deps were added, a
`trigger.current`-in-cleanup hazard in `<Hover>` was fixed, `<Handle>`'s
transition effects were ref-stabilised, and `useProgressTrigger` now returns
`progress` as a `RefObject<number>` (no consumer affected).

---

## ADR-0008 — Adaptive scaling grid via root font-size

- **Status:** **Superseded by [[#ADR-0028 — The root font-size belongs to the reader; the scaling grid is removed|ADR-0028]]** (2026-08-24)
- **Date:** 2026-05-21

> [!warning] Superseded — do not re-implement
> The grid was removed. Its premise (a rem-based layout kept proportional by the
> root font-size) is false here, because the shell is `min(95vw, 1440px)` in px,
> and the per-band base widths made the ladder a sawtooth: 16px at 1440, 12.17px
> at 1460. It also overrode the reader's own browser font-size. See ADR-0028.

**Context.** An adaptive scaling system was dropped into `src/components/common/`
to keep a rem-based design proportional across viewports. It shipped as a
`styled-components` implementation (`createGlobalStyle`, a `css` `media` helper,
`rm`/`em` helpers, plus `colors.ts` / `fonts.ts` / `utils.ts`). `styled-components`
is not a project dependency, and global CSS belongs in `globals.css` per ADR-0004.

**Decision.** Keep only the scaling behaviour; rebuild it to the project stack.
- **Scale down** (viewport ≤ largest breakpoint) — `vw`-based `html { font-size }`
  media queries in `globals.css`, inside `@layer base`.
- **Scale up** (viewport > largest breakpoint) — a `<AdaptiveGrid>` client
  component (`useAdaptiveGrid` hook) sets an inline `html` font-size at runtime,
  reusing the existing `useResizeLoop` render loop.
- Breakpoints live in `grid.config.ts` as typed config; the `globals.css` media
  queries mirror them and must be kept in sync (formula in both files).
- The dropped `styled-components` files were deleted, not committed.

**Consequences.** A rem-based layout now scales as one unit on every viewport.
`styled-components` stays out of the dependency tree. The breakpoint set is
duplicated across `grid.config.ts` and `globals.css` by design — the CSS-only
config rule (ADR-0004) forbids generating the media queries from JS.

---

## ADR-0007 — Automate the vault workflow with Claude Code hooks

- **Status:** Accepted
- **Date:** 2026-05-21

**Context.** The "read the vault first, follow the relevant guide, update the docs
after every change" workflow depended on the user reminding the agent each time.
Documentation drifts the moment it relies on memory.

**Decision.** Encode the workflow as Claude Code hooks in `.claude/settings.json`
(committed, team-wide):
- `SessionStart` — injects a pointer to read the vault first.
- `UserPromptSubmit` — on every request, reminds the agent to consult the relevant
  guide and to update docs for any change made.
- `Stop` — at the end of every turn, blocks **once** to confirm the vault was
  updated. A `${TMPDIR}` marker keyed by session id guarantees it blocks at most
  once per turn (no infinite loop).

**Consequences.** The documentation workflow is enforced without user prompting.
`.claude/settings.json` is now a tracked project file. Hooks are reviewable and
disableable via `/hooks`. New hooks take effect on the next session start (or after
opening `/hooks`). See [[ai-agent-guide]].

---

## ADR-0006 — The vault is the single source of truth

- **Status:** Accepted
- **Date:** 2026-05-21

**Context.** ADR-0001 left dense spec files (`project-specs.md`, `text-engine-docs.md`)
at the repo root alongside the vault, creating duplication — the same conventions
existed both as terse specs and as expanded vault notes, which would drift.

**Decision.** The vault is the **only** documentation source.
- `project-specs.md` — deleted; its content was already decomposed into the
  `architecture/` and `frontend/` notes (and `environment-variables.md`).
- `text-engine-docs.md` — moved into the vault as [[text-engine-reference]].
- `generic-layout-prompt.md` — moved into the vault (see ADR via [[changelog]]).
- Root keeps only thin shims: `AGENTS.md` carries the breaking-change warning and
  hard rules and points into the vault; `CLAUDE.md` and `.cursorrules` both
  `@`-import `AGENTS.md`.

**Consequences.** No documentation duplication. Agents bootstrap from `AGENTS.md`
and read vault notes on demand. This **amends ADR-0001** — root files no longer
hold canonical spec content.

---

## ADR-0005 — Use standard `next/link` for navigation

- **Status:** Accepted
- **Date:** 2026-05-21

**Context.** Two conflicting conventions existed: `project-specs.md` specified
standard `next/link` / `useRouter`, while `generic-layout-prompt.md` specified
custom `<AnimLink>` / `useAnimRouter()` wrappers. The custom wrappers were never
built.

**Decision.** Use standard Next.js navigation — `<Link>` from `next/link` and
`useRouter` from `next/navigation`. The `AnimLink` / `useAnimRouter` convention is
dropped. See [[routing]].

**Consequences.** `generic-layout-prompt.md` §5 updated to match. No animated-route-
transition layer exists; if one is needed later, revisit with a new ADR.

---

## ADR-0001 — Adopt an Obsidian vault as the project brain

- **Status:** Accepted — amended by ADR-0006
- **Date:** 2026-05-21

**Context.** Project knowledge was scattered across root markdown files
(`project-specs.md`, `text-engine-docs.md`, `AGENTS.md`). New contributors and AI
agents had no structured map of the system.

**Decision.** Introduce `obsidian/` as an Obsidian vault — a linked, navigable
second brain. Root spec files remain as machine-read sources; the vault expands on
them. See [[ai-agent-guide]].

**Consequences.** Docs must now be maintained alongside code. The vault is the
canonical place to *understand* the project; root files stay canonical for *tooling*.

---

## ADR-0002 — All motion is spring-based (`@react-spring/web`)

- **Status:** Accepted (inherited from starter) — amended by ADR-0014
- **Date:** Project baseline

**Context.** Marketing sites need rich, interruptible, physically natural motion.
CSS transitions and keyframes are rigid; competing libraries add weight.

**Decision.** Use `@react-spring/web` for every animation. A custom component layer
(`src/components/animation/springs/`) wraps it. CSS keyframes and `framer-motion`
are **banned**. CSS transitions were banned outright here; **ADR-0014 narrows that
to allow `transition-*` for trivial hover/focus state changes only.**

**Consequences.** All animation goes through the [[animation-system]]. The springs
folder is `#do-not-modify`. Text animation is delegated to [[text-engine]].

---

## ADR-0003 — Routes delegate to Views

- **Status:** Accepted (inherited from starter)
- **Date:** Project baseline

**Context.** Mixing routing concerns with page UI makes `app/` files heavy and hard
to test.

**Decision.** `app/**/page.tsx` files only import and render a component from
`src/views/`. All layout/UI logic lives in the view. See [[routing]].

**Consequences.** Every route is a 3-line file. Views are the real page components.

---

## ADR-0004 — Tailwind v4 with CSS-based config

- **Status:** Accepted (inherited from starter) — amended by ADR-0012 and ADR-0015
- **Date:** Project baseline

**Context.** Tailwind v4 removes `tailwind.config.js` in favour of CSS-native config.

**Decision.** All theme tokens live in `globals.css` under `:root` and `@theme inline`.
No JS config file. Raw values in class names are banned. See [[design-system]].

**Consequences.** Design tokens are the only styling currency. New values must be
added to `globals.css` first — and, per ADR-0015, must follow the three-tier
naming convention.

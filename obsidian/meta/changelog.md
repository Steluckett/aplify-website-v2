---
tags: [meta, changelog]
updated: 2026-09-01
---

# Changelog

Chronological log of notable changes to the project. Newest first.
This is a human-curated log — not a mirror of `git log`.

## 2026-11-04

- **SIGNALS option: the missing bands are back, and the demos match.** What
  it costs, brand, better data, AI enrichment, Google for Jobs, dashboard
  and integrations rebuilt in the reference's language, in the Aurora page's
  order. The live demos are re-skinned through a scoped `.sig-product`
  token override rather than forked.

- **SIGNALS option palette: purple out.** Two hues only — Aplify royal blue
  `#2563c9` and lime — on near-black and creme, with a pale royal tint
  `#b4c9f5` where lilac was. Primary pill is royal blue with white text.

- **SIGNALS option, closer pass.** Hero headline and intro rewritten to the
  reference's lengths ("Completion-First / Recruitment Technology", "No
  Account. No Redirect. Just Apply."); face switched to Schibsted Grotesk,
  measured within 1% of Noi Grotesk's width; hero band rounded at its foot
  and footer band at its top (30px); the slider rebuilt on tinted photos;
  the ATS section rebuilt as the reference's "Built Around Search" layout;
  the testimonial wall pinned, with the case results joining the quotes.
  Placeholder Unsplash stock in `public/assets/stock/`.

- **A second homepage option, on branch `design/signals-steer`.** Fully
  reimagined on marketingsignals.com's section patterns: a black hero with a
  120px two-tone headline and a drifting tilted strip of product shots, a
  scroll-filled statement, odometer stats, a services-style slider for the
  four steps, mirrored splits, a black proof panel with a case carousel, a
  sticky stacked deck for the six stages, the live job search, a dark
  implementation panel, a testimonial wall, a security insights layout, an
  FAQ panel and a black close and footer. Hanken Grotesk, the reference's
  creme / black / purple / lilac / lime palette and type ladder, all motion in
  springs. Aurora stays at `/classic`. See [[signals-option]].

## 2026-09-01

- **A new `#implementation` band: "the receipts"** — the page finally answers
  "how does this get on our site?" before it becomes a silent objection.
  Graduated from a three-option decision page (two-doorway cards, an engine
  diagram, a bento — Stephen picked the bento after a dialect pass for the
  don't-be-too-techy rule). Engine-first framing: the WordPress plugin is a
  thin client of the same API a bespoke build would use, so the two routes
  are one product with two doorways. The bento leads with "No candidate
  data lives in your CMS." (bg-13), shows the whole WordPress setup as a
  rendered two-field settings screen (bg-04), lists the two routes, and
  prints four REAL endpoint paths on bg-08 explicitly captioned "This bit
  is for your developers" — the Google band's whose-voice trick. Every
  factual claim was verified against the plugin's code (aplify-integration
  3.1.0, read 2026-09-01); provenance is documented on the content module.
  Sits between `#integrations` and `#security` — exactly the question
  between those two — with a hairline handoff into the white security band.
  See [[decisions-log#ADR-0034 — The implementation band is engine-first, and its claims are code-verified|ADR-0034]].

## 2026-08-30

- **`#proof` became three switchable case studies** — Brandon Trust, Cygnet
  Group and HC-One, selected by clicking their real logos — replacing the
  single Midnight stat monolith. Chosen from a three-option decision page
  (gallery / bento / monolith split; Stephen picked the bento, then had the
  stat cell rebuilt as a CONTINUOUS BAND: the three client-hued gradients
  stacked in one frame, switching client scrolls the band through the
  colours between while the stat text rides its direction). The row is
  pinned above the tallest case per breakpoint (measured: 960/816/768 at
  1080/1280/1512) or every switch resized it. Headline: *"Same problems.
  Different postcodes."*

  **All three §5 quotes now live here and nowhere else** (Stephen: "they
  live here now") — Ben Hopwell left `#dashboard`, releasing that band's
  must-be-white constraint (it stays white by choice). **A second Brandon
  figure is authorised**: "55% more applications submitted", Stephen's, now
  a dated amendment in V2_HANDOVER §5. Cygnet and HC-One run PLACEHOLDER
  write-ups built only from existing site claims, word heroes instead of
  numbers, until Stephen supplies real material. Their logos were supplied
  the same day; HC-One's SVG was recoloured from its white-on-dark variant
  (orange disc, dark script — worth a fidelity check against the real
  mark). Midnight (bg-10) no longer appears on the page: the "only dark
  surface" rule is moot until something else wants one.

- **The six-stages carousel lost its frame, kept its wheel** (Stephen: "more
  powerful if it wasn't framed... like Apple do it — the layout was
  fine!"). The white mega-panel and the tinted band are gone: the band is
  WHITE and the wheel + shuffling card stack sit directly on the ground
  (a display-size intro was tried and pulled — section headlines stay
  uniform, so the band keeps the standard SectionIntro; the CARD titles
  take h1 on desktop instead). The stack then grew a FAN,
  iterated same-day to SYMMETRIC (Stephen: the bleed-right version
  changed shape past step 4, so the even spread became the rule): the
  active card centred with two faded stages a side (±14/±23%, tilting
  2.5/5deg, fading .3/.14 — "tint them down a step"), everything inside
  the page, the sixth card hidden behind the spread. The depth-2 pair
  needs column width the lg breakpoint doesn't have (measured clipping),
  so the five-card fan is `max-xl:hidden`-gated — xl and up; below that
  the stack keeps just the immediate neighbours. `#dashboard` after
  it is also white; a hairline and extra margin do the separating. The
  tint pair at google/how-it-works is dissolved. A full horizontal-STRIP
  variant was built first on a misread of the brief, liked, and PARKED for
  the future: [[../frontend/how-it-works-strip-variant]].

- **`#origin` lost its box.** Two treatments died in one day (the Blush
  panel on a white mat read as plonked; a negative-margin interstitial
  dissolved the band rhythm into one grey run). Now a pure statement band:
  the One Sentence directly on white with Blush kept as an EDGELESS
  ATMOSPHERE behind the words. A scroll-animated ground shift was
  considered and rejected — contrast is measured against static grounds.

- **`#cost` was rebuilt as the page's scroll set piece.** Stephen: the band
  "just feels unconsidered... it has to really land". Four working options
  were built on a temporary decision page (`/cost-options`, since deleted) —
  a choreographed ledger, a journey-that-stops path, an on-entrance
  convergence, and a scroll-driven pin — and D won after seven rounds of
  iteration.

  As shipped: the section pins for ~3.8 screens. The reader arrives on the
  intro with ELEVEN spend pills laid out around it — four framing the copy
  from the corners outside its 46rem measure, seven in a scattered
  overlapping row, all readable at a glance, each popping a green tick over
  a grey placeholder seat. Their own scroll drags the pills one at a time
  into the application card peeking over the screen's foot (title centred
  in the visible strip). The card rises as the intro bows out just ahead of
  it — a viewport-height safety, verified at 650px tall. The turn stays
  white: a danger outline draws on, a red cross pops, and the copy becomes
  a standalone statement ("So much goes into getting a candidate to
  Apply..."). Then the spends bloom back out as faded ghosts, scattered
  (not orbiting), every one clear of the card via `max()` exclusion — the
  finale is the reader's pause. Small screens stack the pills two-up below
  the standfirst instead.

  Mechanics: `use-scroll-progress` (the hook kept for exactly this pin),
  smoothed through a spring; reduced motion lands on the finished state; the
  choreography is aria-hidden with an sr-only spend list carrying the
  content. §6.1 holds — no figures anywhere. **The ledger and its three
  follow-on cards are retired**, recoverable at commit `97c6d4e`; the
  eleven spend labels include Stephen's additions (the EVP, the SEO, the
  creative agency) alongside the band's own vocabulary and the dashboard
  band's named sources.

- **The nav hides on scroll down and returns on scroll up** (Stephen's
  call, with the set piece landing): a permanent bar spends viewport height
  the choreography needs. Sprung translate, rAF-coalesced direction reads
  with a 4px deadband, always shown near the top, never hidden while the
  mobile menu is open.

- **The six-stages carousel lost its autoplay** (Stephen's call): the reader
  lands on 01 because 01 is where the process starts, and the wheel moves
  only when they move it. It shipped with a 6s autoplay for a day; walking a
  reader away from the start of a sequence undercut the sequence. Hover
  pause and take-over logic went with it.

## 2026-08-29

- **The six stages became a carousel.** Stephen wanted a section showing the
  end-to-end setup story and suspected the page already said it — correct:
  Collect through Syndicate IS that story, so `#how-it-works` was rebuilt in
  place rather than a band added (a new one would have remade `#payoff`'s
  repetition mistake). Same anchor, same copy, same tinted band; the old 3×2
  grid is recorded as LAYOUT-INVENTORY §1.6.

  The composition, guided by a 21st.dev reference (feature-carousel) and
  rebuilt on `@react-spring/web` per rule 1: a white mega-panel reaching for
  viewport height; the stages on a vertical WHEEL down the left — pills at
  heading size, each centred in the rail, the active one holding the centre
  in the accent gradient while the list slides through and DISSOLVES into
  masks at the panel's edges (96px pitch, deliberately taller than the panel:
  a wheel you can see all of is a list); and one SQUARE card per stage on the
  right — the band vocabulary's own card shape — each on its own deep blob
  ground (six stages, six of the deep card-ground set, worst-point white
  5.79–8.22 from the /backgrounds figures), neighbours peeking tilted and
  dimmed from the wings.

  Autoplay walks the sequence every 6s — watching it run is the pitch —
  pauses under the pointer and stops for good when the reader clicks. Arrow
  keys walk the rail (it is a real tablist). On phones the wheel becomes a
  wrapped pill row.

  **One trap caught in review:** the reference's fixed-ratio card frame
  CLIPPED the longer stages on phones. The active card now sits in normal
  flow and sizes the frame, with the square as a preferred ratio content can
  push past — no stage can be cut off, whatever its copy grows to.

- **Stage 05 gained the ATS option** (Stephen's ask): "Or, with native ATS
  integration, applications land straight in the system your team already
  uses and this stage never changes hands." The dashboard band's claim,
  shortened; stated as fact because the integration is shipped (§6.9).

- **The hero was rewritten to name candidates** (Stephen: it "needs to
  reference recruitment or candidates"). Now *"You got candidates to Apply.
  Don't lose them there."*, adapted from playbook truth #24, over a new
  standfirst that names the exact loss point and closes on the playbook's
  own "this is the point candidates quietly disappear". The old
  traffic/completion pair had to borrow context from its standfirst before
  it read as recruitment at all. Re-measured: desktop two lines at 1710 and
  the 1024 clamp, mobile recut to four explicit lines (three wrapped), the
  standfirst still sets to exactly three lines in the 40rem box so the
  documented measure exception holds, and the share card repainted itself
  from the same source. The meta description was recut to echo the new
  hero, superseding the deck Metadata block's traffic/completion line.

- **The six-stages headline gained its "Only"** — *"Six stages. Only one of
  them needs you."* (Stephen's line). Sets clean at both breakpoints.

## 2026-08-28

- **The copy deck's Metadata block is applied — the last unshipped piece of
  the v3 deck.** `src/lib/site.ts` had carried the pre-rewrite description
  ("The recruitment experience candidates actually finish. Aplify powers
  search…") since the 2026-08-25 rewrite, so every search result and shared
  link was showing the old positioning. It now carries the deck's completion
  line: *"You don't have a traffic problem, you have a completion problem…"*.

  **The title separator is a hyphen, and that is a ruling, not a drift.**
  Stephen ruled on 2026-08-28 that a site-name separator is NOT exempt from
  ADR-0032's no-em-dash rule, so `page.tsx` now sets
  `Aplify - The recruitment experience candidates actually finish`. Recorded
  in [[decisions-log]] ADR-0032's scope list.

  **One clarification found on the way:** the OG share card image paints the
  HERO's lines and standfirst from `content/site.ts`, not `siteConfig.
  description`, so the image had already updated with the rewrite. What was
  stale was the meta/`og:description` text beside it; the two now make the
  same claim. Verified served on 3100: `<title>`, `description` and
  `og:description` all carry the new strings. `tsc` and `lint` clean.

- **Both product demos moved off the deep blue onto Harbour (bg-04).**
  Stephen, against a screenshot of the shipped product: the bg-08 wash was
  "too obnoxious", and the product is white tiles on Aurora's tinted
  near-white ground (`--helion-bg #f0f2f7`). The dashboard went first, the
  job search and Easy Apply followed the same day so the two demos stay one
  instrument (ADR-0029's whole point).

  What travelled with the wash, because Harbour is a VIVID ground (body ink
  4.34:1 at its darkest point, modelled): everything sitting directly on the
  panel takes full ink (10.08:1); the dashboard's `row-glass` rows became
  white tiles with ink text, which also restored the name/email colour
  hierarchy the deep ground had flattened; status and event chips reverted to
  their light classification colours by cascade; the tab groups became
  Aurora's own sidebar recipe (ink pill on an ink/5 track); and three white
  focus rings became accent, since a white ring on a light ground is
  invisible.

  **The map inverted rather than washed out.** White glass sea + translucent
  land was nearly invisible on a light ground, so the sea now RECESSES
  (`bg-ink/5`, the tab tracks' own tint) and the land is solid white with an
  ink/15 coastline — the standard light-map relationship. And the map-view
  card list stopped shaving the selected card's ring: a scroll container
  clips at its padding edge, so the list carries `p-2 -m-2` to widen the
  paint box without moving the cards.

- **Both demo panels carry a 44rem floor.** A search filtered to one result
  used to collapse the panel to ~300px — and the dashboard's slide-overs are
  CONTAINED in that panel, so the record opened nearly unreadable. The floor
  leaves the overlay ~570px on desktop and only binds when filtering shrinks
  the content. Easy Apply shares it so entering the flow and reaching the
  short confirmation step cannot bounce the section height.

- **The main CTAs carry the MagicUI dot-grow hover treatment** — Stephen
  supplied the reference and the current registry source was pulled rather
  than trusting the older snippet he'd been given, because the two differ in
  exactly the ways that decide refinement: the dot is INLINE beside the label
  (visible at rest, so the grow has an origin), and it grows by TRANSFORM
  ONLY (`scale(100.8)`), which composites smoothly where the first build's
  left/top/width/height animation janked. Colourway decided from three
  options on the styleguide: rest is untouched `.btn-primary`, a white dot
  floods the button white, the label returns dead-centre in the deep blue
  ink with the arrow (the reference parks it 20px left of centre, which read
  as crashing into the edge). New token `--duration-hover: 500ms` — the
  reference's nominal 300ms runs on a lazy default ease, and on our hard
  entrance curve 300 read "far too fast" (Stephen).

- **A full-screen book-a-demo experience replaced the `#contact` anchor** on
  every Book a demo button. See **ADR-0033** — stepped flow, banded sliders,
  UI-only submission for now, and two launch flags: the "one working day"
  promise needs confirming, and **the form must be wired before promotion**
  (the honest unwired footnote was later removed on Stephen's call, so a live
  submission currently goes nowhere silently).

- **The form learned to flow** (polish pass, recorded in ADR-0033): sprung
  overlay dissolve, exit-then-enter step transitions, cascading elements,
  the pulsing `--accent-glow` focus treatment (accent hues only, no edge
  ring), and a confirmation that celebrates — three-stage tick in the new
  semantic `--success` green, "Boom! You're done", the close button in the
  site's own CTA treatment.

- **A polluted `.next` was diagnosed and cleared on the 29th**: a production
  `BUILD_ID` sat in the dev server's cache dir (the documented
  build-while-dev-runs trap), which had the server serving STALE CSS across
  restarts — token edits landed on disk but never in the browser, and newly
  added utilities (`fill-success`) never generated. The tell worth keeping:
  disk newer than the served chunk after a touch and a hard reload means the
  cache, not the watcher. Fix: stop the server, `rm -rf .next`, restart.

## 2026-08-25

- **The page is restructured and rewritten to the Brand Playbook v3.** Three
  client documents arrived — the playbook, a homepage strategy rationale and an
  addendum on what makes people stop scrolling — and they are now the source of
  truth for Aplify's language. [[decisions-log]] **ADR-0031**.

  **The argument is inverted.** The page used to open on the feed problem, which
  is the recruitment-operations buyer's concern, and reached Easy Apply nine
  bands later. §3 names the talent acquisition lead as the PRIMARY audience and
  their question is "will more people finish?" So completion leads, Easy Apply
  is the payoff, and job data became what makes Easy Apply perform better rather
  than the opening act. **This supersedes V2_HANDOVER §4's ordering**, on
  Stephen's explicit call.

  Eighteen bands in five acts: recognition, the answer, attract, improve, risk.

- **Four new bands.** `#friction`, `#cost` (the spend itemised like a statement, everything
  marked paid and the application marked abandoned), `#origin` (the playbook's
  One Sentence alone on Blush) and `#google`.

- **`#friction` took three builds, and the third one was MEASURED.** Build 1
  was a four-column bento with faded numerals and a full-width closer
  ("messy"). Build 2 was strict thirds with two pictures side by side in a row
  of their own ("it's not DESIGNED it's plonked without thought"). Both failed
  the same way: reaching for a grid shape instead of designing a composition.

  Build 3 is drawn against workable.com **measured in the browser**, not
  eyeballed from a screenshot. Container 1202px, three 374px columns, 40px gap,
  and a card vocabulary of exactly two shapes:

  | | measured | ratio |
  |---|---|---|
  | thirds | 374 × 340 and 374 × 380 | **1.10 / 0.98** |
  | halves | 581 × 220 | **2.64** |
  | the big picture | 788 × 606, 2 cols × 2 rows | **1.30** |

  **Their cards are square because the ROW HEIGHT IS SET** — the grid declares
  `grid-template-rows: 380px` and the copy sits top-aligned with air beneath.
  Not because the copy fills it. That answers the question of whether to
  inflate body copy to buy height: no. Their body is small against a large
  heading, and inflating ours would fight the type ladder, where 24px is
  already `lead`'s job.

  **The big picture is never in a picture-only row.** It sits beside two
  stacked cards so the eye reads down the text while the picture holds the
  other side. Build 2's two-pictures-in-a-row is what killed the flow.

  Ours now measures: **every card 452 × 400, ratio 1.13** against the
  reference's 1.10, and the big picture at **1.12** against 1.30. The band went
  1894px → 2976px, which is the scroll journey the reference has and build 2
  did not. Card gap corrected 32px → **40px**, our own spec's figure, which
  build 2 also got wrong.

  A fourth pass closed it on a row of three rather than a card-and-picture
  pair, and dropped the third picture with it (Stephen: "dont see the need for
  the last image"). So the band ends with ONE card shape where the reference
  has two — there is no honest place for a letterbox row when eight cuts split
  3 / 2 / 3, and inventing one to show off the second shape would be
  decoration. Noted in the component for whoever adds a ninth cut.

- **The card type was NOT too small, which is worth recording.** Stephen: "what
  font size do workable use in their cards? It's bigger than ours - i like
  theirs." Measured on both sites, the sizes are **identical**: 32px headings
  over 18px body, at 1.1 and 1.6 leading, in 32-40px of padding.

  | | Workable | ours, before |
  |---|---|---|
  | heading size | 32px | 32px |
  | heading weight | **700** | **550** |
  | heading tracking | normal | **-0.035em** |
  | body ink | rgb(15,22,30) | **rgb(74,81,92)** |
  | text column | 310px | 373px |

  So growing the type would have been the wrong fix. The friction cards now
  take weight 700 and full-strength body ink, and **tracking is deliberately
  left alone** — -0.035em runs through every heading on the site, and dropping
  it in one band would make those headings look like a different typeface.
  Contrast moved in the safe direction: body measures 16.32:1 on `card-quiet`
  and 16.86:1 on the amber card.

  **That treatment was applied to `#friction` alone at first, and it was the
  wrong shape of fix.** Stephen: "The font weight in the card headlines in this
  section now feels heavier than everywhere else." Correct — one band at 700
  against six at 550.

  It is now a single definition, `.card-title` in `globals.css`, used alongside
  `.display` on all seven card headings: `#friction`, `#cost`, `#candidates`,
  `#google` (twice), `#how-it-works` and `#security`.

  **600, not 700, and the reason is the typeface.** The reference sets 700, but
  in Proxima Nova at NORMAL tracking. Ours is Inter at -0.035em, and tight
  tracking makes a given weight read denser, so a straight 700 lands heavier
  here than 700 does there. Unlike the ratios elsewhere in this entry that is a
  JUDGEMENT rather than a measurement, and it is a fair thing to argue with —
  one value, one place, easy to move.

  A section heading is deliberately NOT a card title. The ladder already
  separates them by size; separating them by weight too would flatten the
  difference. Verified across the whole page: every heading role now carries
  exactly one weight — hero 550, section heads 550, card titles 600, demo UI
  500 — with no outlier band.

- **`.icon-chip` is now an ink outline with no fill, everywhere.** Stephen:
  "I dont like the icons in blue - they should be ink", then "they should just
  be ink outline and ink icon - no fill."

  It fixes a measured failure on the way. The accent blue is #3c78eb and on the
  chip's own #eef0f5 fill that measured **3.63:1** — every icon chip on the page
  is small type (20px marks, 13px quote monograms), so all of them needed 4.5
  and none had it. Three monograms in `#proof` and `#dashboard` had been sitting
  at 3.63 since they were written. They now measure **16.32:1**.

  **This reverses the reasoning in the old `.icon-chip` note, and the reversal
  holds.** The fill existed so the chip carried its own edge; an INK ring
  carries one far better than a #eef0f5 disc, which measured ΔL* 0.00 against a
  quiet grey card — the same colour, not merely low contrast.

  Two exceptions, both principled rather than ad hoc:
  - **`.bg-07`–`.bg-15`** flip the ring and glyph to white, or a bare chip
    vanishes on a deep ground. Four chips in `#ai-enrichment` sit on `bg-15`
    and are caught by it. This mirrors what the `.chip` system already does at
    those grounds.
  - **`.screen`** keeps the accent: inside the product register an icon chip is
    an affordance, not a marketing mark, and Aurora uses the accent for exactly
    that. `[data-ai]` keeps its gradient, where the accent IS the meaning.

- **Icons, bottom right of every friction card.** The square card shape leaves
  air under the copy by design, and the marks give that air a reason to exist.
  **Not arrows**, which is what the reference uses — its cards are links, ours
  are not, and an arrow pointing nowhere is a promise the page does not keep.
  Each mark draws the thing that goes wrong in that cut.

  This also cleared dead code: `ICONS` and its chip were drawn for the feature
  bento and left in `platform.tsx` with zero call sites when that band was cut.
  They now live in `src/components/ui/icon-chip.tsx` with the eight new marks
  and the drawing rules for a ninth.

- **The band's anchor became the UI card on its own, floating on a light
  ground.** It started as a photograph of a candidate with the progress panel
  composited into it; Stephen replaced it with the panel alone — "it should
  basically float in the middle of the box big enough to have impact and have
  one of our lighter grad bgs." It is the band's whole argument in one object:
  step 14 of 150, an hour and three quarters to go, 9 per cent done.

  **Ground 04, Harbour.** The artwork is a WHITE card and needs something to
  lift off, so a near-white ground would lose it; Harbour's base is #eaf0f8, it
  is the widest spread of the light set, and its amber note answers the card's
  own amber pill. Spectrum (06) is louder but its own note says one per page at
  most, and this band is about loss rather than celebration. **This is the first
  use of any of grounds 01-06** — all six had been sitting unused.

  The panel gets SHALLOWER as the screen narrows, which is the opposite of the
  usual instinct: the card is a 3.73 letterbox, so on a narrow screen it can
  only get so wide and a deep panel just banks empty ground. At 375 a 4/3 panel
  left 97px of air over a 71px card.

  ⚠️ **Its small print does not survive a phone.** At 375 the card renders about
  330px wide, so "Step 14 of 150" reads at roughly 19px but the field list under
  the bar is ~6px. The headline number is the point and it lands; the rest is
  texture there. The fix, if that is not good enough, is a separate taller crop
  for small screens rather than more scaling.

- **Both pieces of friction artwork are off-centre in their own canvases**, in
  different directions, and centring the FILE centres its empty margin.
  - `not-frustrated.png` HORIZONTALLY: left margin 184px (9.9%), right margin
    13px (0.7%), bottom 0. Its content centre sits 4.6% right of the canvas
    centre, so centring it pushed the confirmation card's right edge outside
    the panel and clipped it while 10% of blank canvas sat unused on the left.
  - `application-progress.png` VERTICALLY: the card runs y 108..539 in a 742
    canvas, because the drop shadow falls downwards and the canvas was cut
    around the shadow rather than the card. Its centre is 6.4% above the canvas
    centre, which left 138px of air above the card and 196px below.

  Both are corrected by `contentOffsetXPct` / `contentOffsetYPct`, measured off
  each file's alpha channel and folded into the centring transform — the same
  reasoning as `nudgeXPct` on `event-registration.png`. **Delete each one when
  its file is re-exported with even margins.**

  Two other things the measuring caught:
  - The crop was first written as a width plus a top offset, which produced a
    109px cut at 1512 and a 54px **gap** at 1257 — the panel's height comes
    from the card stack and is fixed at 840 while its width scales, so its
    ratio moves from 1.12 to 0.93 across that range. Pinning `bottom: -13%`
    against the panel's own height makes the cut identical at every width.
  - Below `lg` the panel needed to be SQUARE, not 4/3. At 375 a landscape
    panel clipped 30px off the top of the confirmation card while still cutting
    the phone at the foot.

- **`#cost` rebuilt full width.** Stephen: "Do you think that looks nice in the
  slightest?" It did not. The first build put the ledger in a 736px white box
  inside a 1436 shell, so every row was ~700px of empty space between the item
  and a small "Paid" chip, four identical chips ran down the right, and the
  abandoned line — the band's entire point — was the same size as everything
  above it, differing only in pill colour.

  Now: **no box.** Five lines run the full shell width and sit directly on the
  band. Items rise from 18px body to **24px** (they are the things being
  counted, so they lead their row) and "Paid" drops to 13px muted at the other
  end. The loss breaks the pattern completely — its own panel, its own ground,
  its own scale, and copy instead of a label.

  **The right-hand column continues into the loss panel**, which is what makes
  it read as the fifth line of the same account rather than a box that happens
  to follow one: "Paid" at 13px muted four times, then **"Abandoned" at 24px in
  `--danger`**. The rows carry the panel's own horizontal padding so both
  columns line up exactly — without it they missed by 66px.

  **Ground 05, Orchard, and the choice is measured.** It is the only vivid
  ground whose BODY ink clears AA: 5.29:1, against Harbour's 4.31 and
  Spectrum's 3.72, so it is the only one of the three that can carry a
  paragraph. `--danger` measures **5.74:1** on it; `ink-label` would NOT at
  4.29, which is why the word is not simply the muted label enlarged. A dark
  panel was not available — `#proof` is deliberately the page's only dark
  surface — so the climax comes from scale, ink and warmth instead.

  The standfirst was rewritten too: it used to list "the advertising, the
  campaign, the site, the time your team spent", which is exactly what the
  ledger then itemises. It was spending the band's own content before the
  reader reached it.

  The three cards went **square** with `.card-title`, matching `#friction`.
  They were 1.87 letterboxes — the shape that band had just moved away from,
  so two adjacent bands were disagreeing about what a card is.

- **`#payoff` DELETED, and it was repeating the page.** It asserted "no
  redirect, no account, search and apply happen on your page" — and
  `#candidates`, immediately below it, DEMONSTRATES all of that: step 01 is the
  search, step 02 is *"the form is on the page, not behind a redirect"* with
  chips reading **No ATS redirect** and **No account to create**, step 03 is
  registration. Its two remaining chips, anonymous apply and field-level
  encryption, are both made properly in `#security`.

  So the page said "no redirect, no account" three times: as a problem in
  `#friction`, as a claim in `#payoff`, then as a demonstrated step in
  `#candidates`. The claim was the one with no evidence attached.

  Worth recording the wrong turn: the band was first rebuilt as a hover-driven
  column accordion (sprung, adapted from a reference Stephen supplied) because
  it "felt plonked and weak". That made the repetition WORSE, because the
  accordion was deliberately built to mirror `#friction`'s eight cuts. Stephen
  spotted the real problem — the band had no job of its own — and it was cut
  instead. The accordion is deleted, not parked.

  **Three knock-ons, all handled:**
  - **The map band's bleed moved.** `MapBand` bleeds into whatever follows and
    that section must be `relative` + white, or the artwork paints OVER the next
    band instead of being cut by it. The receiver is `#candidates` now; it has
    been `#problem`, then `#payoff`, now this. Recorded on the component.
  - **"Easy Apply" in the nav and the footer** both pointed at `#payoff` and now
    point at `#candidates`.
  - **The alternation re-solved.** 17 bands running `TWTWTWTTWTWTTWTWT`, with
    two tint pairs (`job-search`/`brand`, `google`/`how-it-works`) and all three
    hard white requirements intact.

- **Three bands cut.** The platform bento — every claim on it was already made
  by the six stages or the AI guardrail, checked line by line first. The
  testimonials wall. The roadmap, entirely.

- **The three quotes split up.** §5 says each proves a different thing and the
  page was running all three as one grid, with Ben Hopwell nine bands from the
  dashboard he describes. Louise and Sammi now sit under the 85%→30% figure;
  Ben sits beside the dashboard. Picked BY NAME, so reordering the approved
  array cannot silently swap them.

- **Google for Jobs shipped, and V2_HANDOVER was wrong about it.** §1 listed it
  under "Roadmap — not yet available". Stephen confirmed it is live with JSON-LD
  on every published job, so §1 was amended and dated, and the band shows our
  own output — the job as a person reads it beside the schema a machine reads —
  rather than mocking up Google's results page, which §6.4 forbids. The copy
  says the job *carries the structured data Google reads*, never that it will
  rank.

- **The brand kit lost its three cards.** They were claims standing next to a
  demonstration. The phone and the slider carry it alone now, and the band is
  197px shorter. The cards were also STRUCTURAL — the phone is `lg:absolute` so
  their height was what cropped it — so the crop now comes from an aspect ratio,
  per ADR-0027.

- **Two writing rules, both Stephen's.** No em dashes in prose, anywhere: they
  read as machine-written. This directly supersedes V2_HANDOVER §10's *"em
  dashes are used freely and are part of the voice"*. And "career site or
  campaign landing page" is relaxed from thirteen uses to three.

- **A jargon sweep.** Out: *surface*, *system of record*, *ingest*,
  *configuration not development*, *normalised*, and *PII* in a marketing chip.
  Kept: EVP, syndicate, workflow, pre-qualification, API in a spec chip — those
  are recruitment's and IT's own words.

- **Two contrast traps caught in review, both invisible to the DOM.** The three
  cards under `#google` were `card-quiet` on the tinted ground: ΔE 0.35, so they
  rendered as floating text with no card at all. And white ink at /80 measures
  **3.97 on bg-09 (Forest)**, which fails AA for small text — Forest has the
  lowest ceiling of the three deep grounds in use. Body ink on the deep friction
  cells went /80 → /90 for the same reason: /80 cleared 4.5 by 0.02 on bg-08,
  which is not a margin. All measured by MODELLING the gradients, never by
  reading `backgroundColor`.

- **Known, pre-existing, not introduced today:** the big faded numerals measure
  **1.73–1.75** against their cards. Identical treatment in `#how-it-works` and
  `#candidates`, both of which predate this work. Needs a decision, not a patch.

## 2026-08-24

- **The brand kit becomes one slider.** Four cards to choose between was a menu;
  a slider is a transformation, and transformation is the claim. Corners run
  square at Northbank to fully rounded at Halden, monotonic, and the example
  bleeds out under `#proof` — `MapBand`'s trick, which is why `#proof` is now
  `relative`. [[decisions-log]] ADR-0030, revised.

  **Every ground had to stay light, and that is arithmetic rather than taste.**
  A continuous slider cannot go from a light theme to a dark one and stay
  readable: ground light→dark against ink dark→light must cross, and at the
  crossing contrast is 1:1. Halden was dark in the first cut and is now graphite
  on pale. A dark theme is still fine in the product — it just cannot be a point
  on a slider, only a discrete switch.

  Colour interpolates in **Oklab**; sRGB sags into a dead grey crossing blue →
  terracotta, and on a slider the midpoint is somewhere people rest. Four stops
  rather than two, so every resting position is a plausible brand.

  Verified across **21 slider positions, 474 checks, zero contrast failures**,
  with the example measuring 992px wide at every one.

- **A new band: the brand kit.** `#brand`, between `#job-search` and `#proof`.
  [[decisions-log]] **ADR-0030**.

  §3 names employer brand consistency as a concern of the primary buyer and the
  page had never answered it. Four invented employers — Northbank Health, Meridian
  Care, Ashgrove Trust, Halden Group — each a set of CSS custom properties on one
  wrapper, plus a corner slider. Picking one restyles colour, type, type scale,
  corners, shadow, spacing and logo at once, while the arrangement does not move.

  The demo is the mechanism rather than a picture of it: nothing inside reads a
  preset, everything reads `var(--b-…)`, which is how the plugin themes a scope.
  The employer's page around the block is schematic and the Aplify block is fully
  drawn, so nobody has to be told which part is ours — on a real site you should
  not be able to tell, and a label would contradict the claim.

  Zero contrast failures across all four presets, 18 checks each. The preview
  measures **1096px wide on every preset**, which is the "layout is fixed" line as
  a measurement. Heights differ by design — type scale and spacing are configurable
  too, so Halden sits 15px shorter than Northbank.

- **Placeholders were failing in every preset and would have shipped.** Left alone,
  `::placeholder` is derived by the UA from the input's `color` at 50% alpha —
  3.06–4.25:1 across the four brands, and invisible to a contrast sweep that walks
  text nodes, because a placeholder is not one. Now set explicitly, with
  `opacity-100` for Firefox.

- **The recruiter dashboard is rebuilt to the job search's rules, and both demos
  lose their browser chrome.** [[decisions-log]] **ADR-0029**.

  It now composes exactly as the job search does: controls on a white card
  straddling the deep panel's top edge (`lg:` only), glass tab pills with the
  count opposite, white row bands separated by air, `.screen` for the product
  register. Two-tier filters matching the shipped product — search, status and a
  More/Fewer toggle, then jobs / categories / roles / sources / a date range.

  **The detail view is a contained slide-over stack** — application → candidate →
  that candidate's timeline — positioned inside the demo's own panel rather than
  fixed to the viewport. It overlays instead of replacing, which removes a real
  defect: opening a record used to collapse the section from 1527px to 1112px and
  yank everything below it up under the cursor. Measured now: **0px**.

  **The §6.7 caption finally renders.** It had sat in `dashboard-data.ts` since the
  surface was built and had never once been on screen — the one demo handling what
  looks like candidate data carried no illustrative disclosure at all. 7.00:1 on the
  deep ground.

  **The three summary tiles are gone.** They were the only part of this surface not
  in the shipped product, and a figure invented for a demo is what §6.1 exists to
  stop.

  Sample people gained telephone numbers on Ofcom's reserved **07700 900xxx** drama
  range — the phone equivalent of `example.com`, so §6.5 holds for the new fields
  too — plus postcodes, job refs, salaries matching `job-data.ts`, screening answers
  and consent stamps.

- **Two AA failures that were already deployed, found by auditing the copy.**

  The job search's **Search button measured 2.54:1** — `bg-accent`, the bright sky
  `#0ea5e9`, under white. That is exactly the failure the deepened pair exists to
  prevent, and `APLIFY-PRODUCT-UI-SPEC.md` says so outright. Both it and the
  dashboard's Export CSV now take `.btn-primary`'s deepened gradient: **4.73:1** and
  **6.69:1**, measured per stop. The inactive tab's count badge went 4.31:1 → 5.49:1.

  Zero failures now across both demos — 159 text nodes, canvas-composited.

- **`--danger` is bound** (`--danger` → `--color-danger`) for the one destructive
  control. `bg-danger` written before the binding would have painted `currentColor`.

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

# Layout and functionality inventory

**Written 2026-08-25, before the playbook restructure.**

The page is being reordered and rewritten against the Brand Playbook v3 and the
Homepage Strategy Rationale v2. Sections that no longer earn a place in the new
argument may be cut. This document is the safety net: it records every layout
pattern and every piece of working functionality on the page *as built*, so that
anything removed can be brought back or reused elsewhere without re-deriving it.

Nothing here is a proposal. It is a description of what exists today, at commit
`ef57695`.

**Read the file comments before reusing anything.** Several of these carry
load-bearing notes about why a value is what it is - the brand kit and the
candidate-journey stack especially. The comments are not decoration.

---

## Part 1 - Section layout patterns

Thirteen distinct compositions. Several are used once and could be reused
elsewhere; the "reuse" note on each says what it is actually good for.

### 1.1 Centred intro, nothing else

`bands.tsx` → `DropOffBand` · `#drop-off`

Eyebrow, two-line headline, standfirst, centred, on `band-white`. No artwork, no
cards. The whole band is one `SectionIntro`.

**Reuse:** any statement band. This is the cheapest possible section and the one
to reach for when a beat in the argument needs air rather than evidence. If the
new flow needs a "what it costs you" band, this is the pattern.

### 1.2 Centred intro plus a chip row

`story.tsx` → `Payoff` · `#payoff`

As 1.1, with a wrapped row of `.chip` pills passed as children to `SectionIntro`.
Five short absolutes read faster as marks than as sentences.

**Reuse:** any band whose supporting detail is a set of short guarantees rather
than prose.

### 1.3 Intro plus a full-width bleeding image

`bands.tsx` → `MapBand` · `#where-it-sits`

Intro, then an image that runs *past the foot of its own band* and is cut by the
white of the section below.

**The mechanism, in three parts - all three are required:**
1. The section drops its bottom padding (`pt-26 pb-0`).
2. The image carries a negative bottom margin (`-mb-10 lg:-mb-16`).
3. **The next section down is `relative`.** In normal painting order a later
   sibling's background paints *before* an earlier sibling's in-flow content, so
   without this the image sits on top of the white instead of under it.

Currently `#problem` (`story.tsx`) carries that `relative` and its comment says
so. If `MapBand` moves or is cut, whichever section follows it needs the
`relative`, and `#problem` no longer does.

**Reuse:** the only "set piece" gesture on the page. Expensive to move, worth it
once. Note `#proof` also carries `relative` for a bleed that **no longer
exists** - the brand kit was rebuilt as a bento on 2026-08-24 and its bleed went
with the old layout. That `relative` is now dead weight and safe to remove.

### 1.4 Two-column comparison table

`story.tsx` → `Story` · `#problem`

A `.wash wash-lg rounded-panel` outer with an `.inset-tile` inside it. Column
heads as eyebrows, then rows on a `divide-y`. Left column is the raw value,
struck through in `text-ink-label`; right column is the cleaned value in full ink
with `.chip` pills under it.

**Reuse:** any before/after that is genuinely tabular. This is the "show, don't
describe" pattern and it works for anything with a bad version and a good
version. The struck-through left column does most of the work.

### 1.5 White mega-panel with a bento inside

`platform.tsx` → `FeatureBento` · `#platform`

A `band-white rounded-panel shadow-group` panel sitting on the tinted page
ground, holding the intro and a `1.15fr / 0.85fr` two-column grid. Left column:
a shot on a deep blob ground (`grain bg-09`) with a `card-quiet` copy card under
it. Right column: three `card-quiet` cards stacked.

**Two constraints that travel with it:**
- The section **must stay on the tinted ground**. The panel is white, so a white
  band leaves it nothing to lift off.
- Cards inside the panel **must be `card-quiet` (#eef0f5), not white**, or they
  vanish into their own container.

**Reuse:** this is the natural home for a feature grid. If "fully customisable"
becomes one cell of a features bento rather than its own band, this is the
component to extend - a fourth item in `featureBento.items`, or a wider grid.

### 1.6 Three-across card grid with a big numeral

`how-it-works.tsx` → `HowItWorks` · `#how-it-works`

A fixed `md:2 / xl:3` grid (never auto-fit - at mid widths auto-fit runs four-up
and widows the last two). Each card: thin numeral at `text-h2 text-ink/25`,
title, one-line sub in accent ink, body, then `.chip` specifics pinned to the
bottom with `mt-auto`.

**Reuse:** any process, any numbered set of six. Reading the numerals down the
grid gives the whole process in about a second.

### 1.7 Scroll-pinned card stack

`platform.tsx` → `Capabilities` + `StepCard` · `#candidates`

The most complex composition on the page. Cards pin one at a time as you scroll,
each rising into place with a tilt, the buried ones reclining and dimming behind
it. Driven by `useStackRise` and `useSprings`, with the feel constants gathered
at the top of the file (`PEEK_PX`, `GAP_VH`, `REVEAL_PX`, `ARRIVE_TILT`,
`BURIED_TILT`, `SCALE_STEP`, `DIM_STEP`, `LIFT_PX`, `BASE_VH`, `NAV_CLEARANCE`,
`FOOT_ROOM`).

Each card is copy on one side, artwork on a deep blob ground on the other -
**never alternating**, because in a stack every card pins in the same place, so
alternation stops being a rhythm and becomes a flicker.

Cards are **white with a lift**, not quiet grey: stacked grey cards on a white
band have nothing between one card and the next and the pile reads as one mass.

Image grounds are sized by `aspect-[...]`, never a rem height (ADR-0027).

**Reuse:** the single most expensive thing on the page to rebuild. If the
candidate-journey band is cut, this pattern should be re-pointed at something
else rather than deleted. It suits any four-step narrative.

### 1.8 Full-bleed single figure on the page's one dark surface

`trust.tsx` → `Proof` · `#proof`

`grain bg-10` (Midnight) inside a `band-white` section. Eyebrow, one enormous
`figure` at `clamp(5rem, 14vw, 11rem)`, a before/after row with a rule between,
attribution at the foot.

**Every faded white here is 80%, not 45%.** Midnight is not flat - where its
three gradient fields stack it lightens to `#3650ab`, and 45% white that measured
4.49:1 on flat navy measures 2.78:1 there. There is exactly one dark surface on
the page and this is it.

**Reuse:** only for the one statistic. §5 permits no second number, so this
composition has exactly one legitimate occupant.

### 1.9 Three-across quote cards

`trust.tsx` → `Testimonials` · `#testimonials`

`wash-soft` cards, quote in the display register at `text-lead`, attribution
under a hairline with an `icon-chip` monogram.

**Must sit on white** - the card is a 10%-alpha gradient and needs white beneath
it to read.

**Reuse:** fixed at three, because §5 permits exactly three quotes.

### 1.10 Four pastel cards

`trust.tsx` → `Security` · `#security`

`sm:2 / xl:4` grid of `pastel-{sky|violet|mint|amber}` cards, heading and body
only.

**Must sit on white.** The four pastels measure ΔE 4.3-11.8 against the tinted
ground and 7.7-10.4 against white - on tint they are close to indistinguishable
from each other and from the page.

**Reuse:** any set of four short reassurances. The pastels are the only place on
the page colour is used to separate peers rather than to signal accent.

### 1.11 Rule-separated two-column list

`trust.tsx` → `Integrations` · `#integrations`

A centred lead paragraph at `max-w-[46rem]`, then a `.tile` panel holding a
two-column list, each row a tick `icon-chip` plus a line, `border-b` between.
The `nth-last-child(2)` selector kills the border on both bottom rows.

**Reuse:** any capability list that would otherwise be bullets. Same information,
somewhere for the eye to rest.

### 1.12 Quiet three-across cards

`trust.tsx` → `Roadmap` · `#roadmap`

`card-quiet` cards, eyebrow plus one line. Deliberately the least designed thing
on the page - it is a promise, not a feature.

**Must sit on white.** `card-quiet` is #eef0f5 and measures **ΔE 0.35** against
the tinted page ground. Not "subtle": mathematically invisible.

**Reuse:** any low-emphasis list of three.

### 1.13 Bento with a live demo in the lead cell

`brand.tsx` → `BrandSection` · `#brand`

Intro, then a three-column bento: one card spanning two columns holding the live
phone, three cards down the right side. The split is the argument in miniature -
one surface shown, two more asserted.

Rebuilt 2026-08-24 from an earlier full-bleed version. **The bleed is gone.** Any
note describing a negative margin here, or explaining why `#proof` is `relative`,
is stale.

**Reuse:** the pattern for "one thing demonstrated, several things claimed". It
is the cheapest way to give a live demo a frame without giving it a whole band.

### 1.14 Hero

`hero.tsx` → `Hero` · `#home`

Two stacked radial gradients behind the nav (one ellipse reads as a visible
disc, two do not), `StackedLines` h1 with a per-line class array so the last line
takes `grad-tip`, standfirst at `max-w-[40rem]`, one large pill CTA, then a
`ScreenCard` at full shell width that **runs off the bottom of the viewport** and
parallaxes on a `SpringTrigger` scrub.

Separate `h1` for mobile (`hero.linesSm`) with its own line breaks, toggled by
`sm:hidden` / `hidden sm:block`.

**The 40rem measure is a documented exception** to `--measure-lead`'s 46rem.
Measured: at every width from 38rem to 46rem the standfirst sets to exactly
three lines, so widening buys no height, and at 46rem the last line is "ATS."
alone at 7% of the widest. **Re-measure if the hero copy changes** - the
exception is only justified while it stays three lines.

---

## Part 2 - Working functionality

Six interactive surfaces. These are the things that would be genuinely expensive
to rebuild, and §11 of the handover is the reason they exist: *the page lets the
reader use the product rather than look at pictures of it.*

### 2.1 Job search

`demos/job-search.tsx` (953 lines) · data in `job-search.ts`, `job-data.ts`

- **Three views of one filtered set** - grid, list, map, switched by a control.
- **Filters** - keyword, town/city with a "use my location" icon inside the
  field, job family, region, a real Search submit, and Clear.
- **Genuine geographic distance.** The 18 sample roles carry real coordinates,
  so a Manchester search returns Liverpool 31, Sheffield 33, Leeds 36. This is
  not faked and it satisfies §6.6.
- **Pagination** - nine to a page, `PER_PAGE` exported.
- **The apply-route switch** - a deployment setting, not product UI. Sits *above*
  the panel on a translucent track, deliberately unlike the filters, because a
  candidate never meets that choice. Flipping it changes every card's button and
  swaps in the "hands off to your ATS" explanation, including the line that names
  the cost of that trade-off.
- **Layout** - the search row is a white card straddling the panel's top edge,
  about 45% below it, `lg:` only. Stacked on a phone the overlap reads as a
  mistake.

**Reuse:** self-contained. Takes a `className`. Could move to any section.

### 2.2 Easy Apply

`demos/easy-apply.tsx` (383 lines)

The full flow, never in an overlay - *an overlay implies somewhere else, and "no
redirect" is the entire claim.*

- **Step 1, pre-qualification** - each company writes its own questions.
- **The gate** - a wrong answer stops the flow with an explanation rather than
  taking someone through a full application that would be turned down.
- **Step 2, the form** - name, email, optional phone, CV upload.
- **Confirmation** - with the line about what would happen next in the product.
- **§6.7 disclosure** - "A demonstration form - nothing you see here is sent,
  stored or read." **This one stays** under the standing captions decision,
  because the form looks submittable.

**Reuse:** currently rendered inside the job search. Could stand alone.

### 2.3 UK map

`demos/job-map.tsx` (170 lines) · data in `uk-map-data.ts`

- **Two-way linking** - clicking a pin scrolls its card into the list and
  highlights it; selecting a card takes the map to that pin at a bounded 2.5x.
- **Glass, not a card**, so it groups with the panel rather than competing.
- **The viewBox is built to the container's shape, not the country's.** The UK is
  portrait; in a landscape box a country-shaped viewBox strands a sliver down the
  middle.

**Reuse:** the geography is real and reusable for anything location-based.

### 2.4 Recruiter dashboard

`demos/dashboard.tsx` (1424 lines) · data in `dashboard-data.ts`

Rebuilt 2026-08-24 (ADR-0029) against screenshots of the shipped product.

- **Two tabs** - applications and registrations.
- **Two-tier filters** matching the product: search, status, a More/Fewer toggle
  and export on the first row; jobs, categories, roles, sources, date-from,
  date-to on the second.
- **CSV export** that honours the active filters and produces a genuine file.
- **A contained slide-over stack** - application → candidate → that candidate's
  timeline, absolutely positioned inside the demo's own panel rather than fixed
  to the viewport. **Opening a record is a 0px height change**, against 415px
  before the rebuild. A demo embedded mid-page must not seize the screen.
- **Status workflow** - submitted, reviewed, shortlisted, accepted, rejected,
  withdrawn.
- **Notes** with a §6.7 disclosure, and the product's own delete/anonymise
  warning copy.

**Known drift:** `dashboard-data.ts` holds an unrendered `ats` block duplicating
the approved Eploy sentence from `site.ts`. Two copies of §5 copy.

### 2.5 AI rewrite

`demos/ai-rewrite.tsx` (235 lines) · data in `ai-rewrite.ts`

- **Reader-triggered before/after** on two real-shaped adverts.
- **Every fact in each "after" is traceable to its "before"** (§6.10). Editing
  one side means checking the other.
- Carries the §6.8 guardrail copy, which is load-bearing and must not be
  reworded: *"Works on adverts, not on people"* and *"It rewrites what's there.
  It doesn't invent responsibilities, benefits or requirements your feed didn't
  contain."*

### 2.6 Brand kit

`demos/brand-kit.tsx` (492 lines) · data in `brand-kit.ts`

The newest and most-iterated surface. **Read its comments before touching it.**

- **One slider, no visible label.** `aria-label` and `aria-valuetext` only -
  they are the sole route a screen reader has to the control and cost the design
  nothing.
- **Four brand stops, everything between them interpolated in Oklab.** sRGB sags
  into dead grey at the midpoint, and on a slider the midpoint is a resting
  position somebody will look at. Four stops rather than two for the same
  reason - two endpoints put a mush of blue and graphite in the middle.
- **The mechanism is the claim.** Every preset is a set of CSS custom properties
  on one wrapper; nothing in the demo reads a preset directly, everything reads
  `var(--b-...)`. That is the plugin's own model, so the demo is not a picture of
  theming, it *is* theming.
- **Every ground is light, and that is arithmetic.** A continuous slider cannot
  travel from a light theme to a dark one and stay readable: ground light→dark
  against ink dark→light must cross, and at the crossing the contrast is 1:1. No
  easing and no colour space avoids it. A dark theme is fine in the *product* -
  it just cannot be a point on a slider, only a discrete switch.
- **The fidelity trick** - the employer's page around the block is schematic, the
  Aplify block is fully drawn, and nothing is labelled, because on a real site
  you should not be able to tell.
- **Verified** across 21 slider positions, 474 checks, zero contrast failures.
  Re-run that sweep if a stop is ever edited: safe endpoints prove nothing about
  t = 0.5.
- **`::placeholder` is set explicitly** to `--b-ink-soft` with `opacity-100`.
  Unstyled it derives from `color` at 50% alpha and failed in all four presets
  (3.06-4.25:1), invisible to any audit that walks text nodes.

**If this band is cut**, the slider mechanism is the part worth keeping. It would
work as a standalone control anywhere the point is "this transforms", and the
Oklab interpolation and the light-only constraint travel with it.

---

## Part 3 - Shared components

| Component | What it does | Notes |
|---|---|---|
| `SectionIntro` | eyebrow → stacked headline → standfirst, centred, optional children | The page's most repeated furniture. Takes `lines` and `linesSm` for separate mobile breaks. |
| `StackedLines` | headline animated line by line via `spring-text-engine` | `lineClassNames` array applies per-line classes - how `grad-tip` lands on the last line only. |
| `Reveal` / `RevealGroup` | scroll-triggered spring entrance | Variants: `up`, `rise`, `fade`. `delay` staggers a grid. |
| `ScreenCard` | a product screen in a frame inside a card | `ground`, `pad`, `chrome`, `ratio`. **Nothing on the page uses `chrome` any more** - both product demos are unframed (ADR-0029). |
| `NavBar` | floating nav, 65px tall, 18px down | The stack's `NAV_CLEARANCE` depends on this. |
| `BrandMark` | the Aplify wordmark | |
| `Cookie` | banner plus a category-by-category preferences modal | **Links to `/privacy-policy`, which 404s.** |

### Hooks

| Hook | Used by |
|---|---|
| `use-stack-rise` | the pinned card stack |
| `use-window-size` | several |
| `use-smooth-scroll` | nav jumps |
| `use-contact-modal` | **orphaned** |
| `use-carousel` | **orphaned** |
| `use-scroll-progress` | **orphaned** - note the vendored `ProgressTrigger` does *not* fire for a `top top` → `bottom bottom` pin, which is why this exists |
| `use-adaptive-grid` | **unmounted deliberately** - re-mounting re-breaks the type scale at every breakpoint (ADR-0028) |

### Orphaned components - kept on purpose

`carousel-dots`, `product-shot`, `section-head`, `pill-button`, `arrow-button`,
`eyebrow`, and `src/lib/scene/*` with the `three` dependency (zero importers,
expected).

**Before reusing any of these:** `bg-brand`, `bg-brand-light`, `bg-paper` and
`text-paper-ink` inside them are **unbound tokens**. Tailwind v4 falls back to
`currentColor`, so they paint ink rather than nothing - `pill-button`'s primary
variant is currently ink-on-ink and invisible. Bind all four first. `--danger` is
the worked example of doing it properly (tier 2 role → tier 3 `--color-danger`).

---

## Part 4 - Ground and band mechanics

- **15 numbered blob grounds** at `/backgrounds`, with measured contrast per
  band. In use: `bg-09` platform lead card, `bg-12/11/13/14` the four journey
  steps, `bg-10` the proof (the page's only dark surface), `bg-08` the job
  search and dashboard panels, `bg-15` the AI rewrite.
- **Grounds are re-hued at constant luminance only.** Eight were widened on
  2026-08-24 by solving each blob's lightness to preserve its original relative
  luminance, so no contrast approval moved. Picking a colour by eye invalidates
  the whole set.
- **Chips take a glass fill automatically inside `bg-07`-`bg-15`.** `.tile`,
  `.card-quiet` and `.inset-tile` reset it. **Any new light surface that can hold
  a chip must be added to that reset list**, or a white pill lands on #eef0f5 at
  1.05:1.
- **Two registers.** `:root` is marketing (big type, generous spacing); `.screen`
  is the product register at Aurora's 11-24px scale with 22/16/12 radii. Anything
  inside a device frame is `.screen`.
- **Band constraints that survive any reorder:**
  - `#roadmap`, `#security`, `#testimonials` **must be on white** (§1.10, 1.9,
    1.12 above give the measured reasons).
  - `#platform` **must be on tint**, because it renders its own white panel.
  - Everything else alternates freely.

---

## Part 5 - What is not reusable

- **The three quotes, the one statistic, the Eploy sentence.** §5 fixes these.
  Three quotes, not four. One number, not two. One named third party.
- **The §6.8 AI guardrail wording.** Load-bearing copy, quoted exactly.
- **`jamie.okafor@email.com`**, baked into the step 03 and step 04 artwork.
  `email.com` is a live domain and §6.5 requires reserved `example.*`. Needs
  re-exporting, not a copy fix - and if those steps are cut, this goes with them.

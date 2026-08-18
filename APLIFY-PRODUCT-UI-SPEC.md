# Aplify product UI — spec for mockups

Hand this to any project that needs to draw an Aplify screen. Every value is
lifted from the shipped token layer, not approximated.

**Context this describes:** the *product* register — what an actual Aplify
screen looks like. It is the same language the admin dashboard (Helion/Aurora)
ships and the same one the marketing site uses inside its device frames, which
is what makes a mockup sit on the site without looking pasted in.

**One caveat before you start.** The WordPress apply flow is *candidate*-facing
and renders on a client's own careers site, so in production it inherits some
of that client's brand. For mockups meant to sit on the Aplify site, use these
values as-is. Just don't take "this is Aplify blue" as a promise that every
install looks like this.

---

## Typeface

**Inter** — one family, nothing else. Variable, weights 100–900 with an optical
size axis.

| Role | Size | Weight |
|---|---|---|
| Chips, table heads | 11px | 550 |
| Small labels | 12px | 400 |
| Controls, buttons, fields | 13px | 500 |
| UI body, table cells | 14px | 400 |
| Card titles | 20px | 500 |
| Screen titles | 24px | 550 |
| Stat figure | 48px | **200** |
| Hero stat figure | 84px | **200** |

Notes that matter:

- **Figures are weight 200 and large.** A big number in semibold reads as a
  heading; at 200 it reads as a quantity. Units step down to ~0.35em and take
  the label grey, so the number carries and the "%" doesn't compete.
- Titles use **550**, not 600 or 700. Tracking −0.01 to −0.02em at 20px+.
- Body copy is never below 13px, and 16px on inputs (below that iOS zooms the
  viewport on focus).

---

## Colour

### Surfaces — depth is tonal, three steps

| Token | Value | Use |
|---|---|---|
| Ground | `#eff1f6` | The page behind everything |
| Group card | `rgba(255,255,255,0.55)` | A container the ground breathes through |
| Tile | `#ffffff` | The card that carries content |
| Quiet card | `#eef0f5` | A card *inside* a white panel, where white would vanish |
| Hairline | `#e6e9f0` | Borders |
| Track | `#e2e6ee` | Empty progress/meter track |

Depth comes from **tone**, then shadow. A shadow between two same-tone
surfaces reads flat no matter how heavy it is.

```
shadow-sm    0 1px 1.5px rgb(16 19 26 / .05), 0 6px 18px  rgb(16 19 26 / .06)
shadow-tile  0 1px 2px   rgb(16 19 26 / .04), 0 10px 28px rgb(16 19 26 / .07)
shadow-lift  0 2px 6px   rgb(16 19 26 / .05), 0 24px 70px rgb(16 19 26 / .12)
```

### Ink

| Token | Value | Use |
|---|---|---|
| Heading | `#0c1220` | Titles |
| UI ink | `#101318` | Primary text, values |
| Body | `#4a515c` | Running copy |
| Label | `#656b72` | Field labels, captions, secondary |
| Accent ink | `#0670a9` | Links and coloured text |

### Accent — the spectrum sweep

```
sky      #0ea5e9   →   violet   #5b4ee0      (115°, decorative fills)
sky-deep #0879b8   →   violet-d #5044d6      (115°, fills carrying WHITE text)
mid-blue #3c78eb                             (focus rings, icon glyphs)
navy     #041324                             (the one dark surface)
cyan     #02dafd                             (wordmark ONLY — never UI)
```

Use the **deepened** pair whenever white text sits on it. The bright pair fails
contrast for white (that's why two exist, not for variety).

### Status — dots mean state

Pill + vivid dot + coloured text. All inks clear 4.5:1 on both white and the
chip ground.

| State | Text | Dot |
|---|---|---|
| Success | `#157e3c` | `#22c55e` |
| Attention / error | `#b91c1c` | `#ef4444` |
| Warning / pending | `#9c5f07` | `#f59e0b` |
| In progress | `#0f766e` | `#14b8a6` |
| Draft / neutral | `#5f6e84` | `#b8c3d1` |
| Closed | `#be123c` | `#f43f5e` |
| Running | `#6d28d9` | `#8b5cf6` |

The draft dot is deliberately *lighter* than its siblings: against the teal dot
it collapses under deuteranopia otherwise.

### Classification — tints, no dot

| Kind | Ground | Text |
|---|---|---|
| Category (violet) | `#efe9fc` | `#6d28d9` |
| Category (sky) | `#e7effc` | `#2b64d8` |
| Identity / neutral | `#eef0f5` | `#656b72` |

**Never put a dot on a classification.** A dot means something is happening; a
dot on every label makes each one read as a status.

### Pastels — card grounds only

`sky #e7f2fd` · `violet #eeebfb` · `mint #e4f4f1` · `amber #fbf3e2`

---

## Radii

```
32px  full-width panels
22px  cards
16px  secondary surfaces, insets
12px  fields (when not a pill)
999px controls, chips, avatars
```

Outer radius always exceeds inner, or a field near a corner bulges out of it.

---

## Component recipes

**Field** — a WHITE PILL. Full 999px radius, no border, 13–16px, placeholder in
label grey. A textarea is a paragraph not a pill, so 18px radius.

**Primary button** — fully rounded pill, the deepened gradient
`linear-gradient(115deg, #0879b8, #5044d6)`, white text, soft blue shadow
`0 6px 16px rgb(60 120 235 / .25)`.

**Secondary button** — white pill, UI ink, `shadow-sm`. No border.

**Chip** — 11px, weight 550, 999px radius, padding `0.5em 1em`, 7px dot with a
7px gap when it carries state.

**Icon chip** — 44px circle, ground `#eef0f5`, glyph `#3c78eb`, plus a 1px
inset hairline `rgb(16 19 26 / .1)` so it stays visible on any ground. Fill the
circle with the accent gradient **only** to mean "a model wrote this".

**Progress / meter** — thin vertical bars, **3px wide, 5px gaps**, spectrum
sweeping left to right over the track. Thin is the point. Never thicken it.

**Table** — header row is one continuous white pill band (round the first and
last cell), 13px, normal case, label grey. Rows separate by **air**, roughly
64px tall, with a 12px gap under the head. **No hairlines between rows.**

**Focus** — a 2px ring in `#3c78eb` with 2px offset. Never an underline: an
underline cannot follow a pill's corner radius.

---

## The rules that actually matter

1. **Surfaces dip into tint; controls and fields are white pills sitting on
   them.** A filter panel is tinted, the inputs on it are white.
2. **Wash + inset is law.** Where a gradient grounds a surface, its content
   sits in an inset ~12px from the edge. White inset for figures, translucent
   for anything holding white fields.
3. **One dark surface per screen, maximum.** Two halves the effect of both.
4. **Colour means state or accent.** Nothing is coloured for decoration.
5. **Motion is rare and subtle.** 160/240/420ms on `cubic-bezier(0.2, 0, 0, 1)`,
   inside `prefers-reduced-motion: no-preference`. Animated shimmer was tried
   and removed — stillness won.

## Traps worth knowing

- **A faded white on a gradient is not safe** just because it was safe on a
  solid colour. Check the gradient's lightest point, not its average.
- **The neutral chip ground `#eef0f5` is within a point of the page ground.**
  A chip placed directly on the ground loses its pill — give it white there.
- **Contrast on a gradient must be checked per stop.** An average passes
  things that fail visibly at one end.

# Aplify V2 — design prompt

**How to use this.** Fill in the blanks. Delete the guidance text as you go, or leave it — it will be
ignored. Then paste this whole file, or hand it over alongside `V2_HANDOVER.md`, as the opening message of
the new project.

**What this file is for.** `V2_HANDOVER.md` settles the product, the argument and the words. This settles
how it looks, moves and is built. Between them there should be nothing left to guess at.

**Two things not up for discussion here**, whatever the design says: §5 of the handover (the approved proof
assets) and §6 (the content rules). If a design idea needs a fourth testimonial or a mocked-up ATS screen,
the design changes, not the rules.

**Every section below has a "left blank →" line.** That is what I will do without an answer. Some of those
defaults are perfectly good — leaving a section empty on purpose is a legitimate answer.

---

## 1. Page structure

One page or several? If several, which sections group onto which page, and what does the top-level nav
become?

The handover's four pillars (clean data / finished applications / your team's workflow / data safety) are the
natural page boundaries. Against splitting: the message spine in §4 is one continuous argument, and it is
strongest when nothing interrupts it. A hybrid — spine on the home page, pillars as their own pages — is
the third option.

> **Your answer:**
>
> **Left blank →** single page, sections in the handover's §8 order, nav jumping within it.

---

## 2. Visual direction

References, and — more useful than the references themselves — **what specifically to take from each**. "Like
X" is unactionable; "X's type scale and its restraint with colour, but not its layout" is buildable.

Also worth stating: what this must *not* look like. Naming the trap is often faster than describing the
target. V1's was "must not read as a SaaS template".

> **References, and what to take from each:**
>
> **Must not look like:**
>
> **Left blank →** I extend V1's direction: dark navy ground, white type, single cyan accent, orthogonal
> geometry derived from the logo.

---

## 3. Motion

How much, and where? Options, roughly in order of cost:

- **None** — transitions only, no scroll-driven anything.
- **Restrained** — reveals on entry, hover states, nothing that runs continuously.
- **Scroll-driven set pieces** — a few sections where scrolling drives something.
- **A continuous scroll-driven scene** — V1's answer, and the most expensive by a wide margin.

If you want set pieces, say which sections earn one. If you want a continuous scene, say what the subject
is.

> **Your answer:**
>
> **Left blank →** restrained. Entry reveals and hover states, nothing continuous.

---

## 4. Sound

Yes or no.

If yes: browsers will not start audio without a user gesture, so the page needs a click-to-enter gate before
anything sounds. That gate is a real conversion cost and it was never measured on V1. If sound is worth it,
it is worth it knowingly.

If yes, also say whether the three testimonial voiceovers are used, and whether they play automatically when
a quote is on screen.

> **Your answer:**
>
> **Left blank →** no ambient sound. The three voiceovers are offered as play-on-demand controls, so the
> recordings are not wasted and no gate is needed.

---

## 5. Typography and colour

A specified system, or derived?

If specified: typefaces (and whether they're licensed and where the files are), the scale, and the palette
with hex values. If derived: from what — the logo, a brand guideline, one of the references above?

V1 ran the whole site on one typeface and one accent colour, which is a defensible constraint rather than a
limitation.

> **Typefaces:**
>
> **Palette:**
>
> **Left blank →** derived from the logo as V1 did: white ink, deep navy ground, the logo's cyan as the sole
> accent, one typeface throughout.

---

## 6. Device priority

Is mobile an equal citizen, or is desktop the primary sell with mobile as a competent fallback?

This decides more than it sounds like. It governs how much of the interactive work in §11 of the handover
survives on a phone, and how ambitious the layout can be — a long fact-list section that sings at 1440px can
become an unreadable column at 375px.

Worth knowing if you have it: the actual desktop/mobile split in your analytics, and whether buyers arrive
on a phone or at a desk.

> **Your answer:**
>
> **Left blank →** equal citizens, designed mobile-first, with interactive demos simplified rather than
> dropped on small screens.

---

## 7. The four demos

The handover's §11 lists what must be demonstrable: job search (three views + the apply-route switch), Easy
Apply end to end, the AI rewrite before/after, and the recruiter dashboard.

Per demo: **fully working as in V1, a lighter interactive sketch, or a static depiction with a caption?**

The trade is straightforward. Working demos are the most persuasive thing on the page and by far the most
build. If budget forces a choice, Easy Apply is the one to keep — "no redirect" is the central claim and a
static picture cannot prove it.

> **Job search:**
> **Easy Apply:**
> **AI rewrite:**
> **Recruiter dashboard:**
>
> **Left blank →** all four fully working, as V1.

---

## 8. Build and hosting

- Stack, or "your call"?
- Where does it deploy?
- Does the copy need to be editable by a non-developer, or can it live in the code?
- Performance budget, if you have one — a target Lighthouse score, a page-weight ceiling, a time-to-
  interactive figure.
- Anything that has to be integrated: analytics, consent management, CRM, a form endpoint.

The last one matters more than it looks: the handover's §12 notes the demo request currently goes nowhere. It
needs a real destination in V2, and whatever that is shouldn't add friction to a four-field form.

> **Stack:**
> **Hosting:**
> **Copy editable by non-developers:**
> **Performance budget:**
> **Must integrate:**
>
> **Left blank →** I'll match V1's stack, deploy to Vercel, keep copy in code with all of it isolated in
> one place per section, and wire the demo form to an endpoint you nominate later.

---

## 9. The footer

Never designed in V1. What goes in it?

Candidates: contact, company registration details, privacy policy and cookie policy, the GDPR self-service
export/deletion form (which is a real product feature and arguably belongs here), social links, a
sitemap-style nav, the Aplify mark.

> **Your answer:**
>
> **Left blank →** compact: logo, contact, legal links, the GDPR request form link, and a nav mirroring the
> main sections.

---

## 10. Anything else

Deadlines, stakeholders who need to see it, a launch event it has to hit, pages or content coming later, an
existing site whose URLs must be preserved, accessibility standard to meet, languages beyond English.

> **Your answer:**

---

## Then start the session with:

> Read `V2_HANDOVER.md` — that's the approved product, messaging and copy, and §5 and §6 are fixed. Then
> read `V2_DESIGN_PROMPT.md`. Ask me anything that would change the build before you start, then plan the
> work before writing code.

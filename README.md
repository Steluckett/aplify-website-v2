# Aplify — V2 site

The Aplify marketing site, V2. Single page, built to the approved product,
messaging and copy in `V2_HANDOVER.md` (§5 proof assets and §6 content rules
are fixed) with design direction from `V2_DESIGN_PROMPT.md`.

## Direction

- **Style**: the Baseline reference pack, followed to the letter — padded
  white frame with inset rounded blocks, giant uppercase display type,
  StackedLines reveals, ghost-text set pieces, numbered rows, intro curtain
  loader, full-screen menu overlay, modal conversion. Onest only, no second
  face.
- **Palette**: Baseline's royal blue `#2563c9` + navy `#0f2f63` on
  white/off-white greys; dark blocks are BLACK (client decision); the brand
  cyan `#02dafd` survives only in the wordmark's dot and the particle head.
- **Hero**: completely black inset block with a deep-blue radial glow behind
  the Evolve pack's three.js particle head (see
  `src/lib/scene/hero-scene.config.ts`; tune live with `?tune` in the URL).
- **Demos**: all four fully working — job search (grid/list/map + apply-route
  switch), Easy Apply end to end, the AI rewrite before/after, and the
  recruiter dashboard (filter/status/timeline/CSV export).

## Stack

Next.js 16 · React 19 · Tailwind v4 · react-spring + spring-text-engine ·
Lenis smooth scroll · three.js (hero only, code-split). Based on the Textura
`next16-claude-starter` — its conventions live in `obsidian/` and still apply.

```bash
npm run dev    # http://localhost:3000
npm run build
```

## Where things live

- Copy, per section, isolated from markup: `src/data/content/*`
- Sections: `src/views/home/sections/*` · hero: `src/views/home/hero/*`
- Design tokens (3-tier): `src/app/globals.css`
- Reference material (not built): `reference/` — Lumora views/components, V1 content

## Outstanding before launch (handover §14)

- Demo form composes an email to `hello@aplify.co.uk` — needs a real endpoint
  (isolated in `src/data/content/closing.ts`).
- Re-confirm the Eploy direct-push claim and the pre-qualification questions.
- Set `NEXT_PUBLIC_SITE_URL` per environment.

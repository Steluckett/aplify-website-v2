# Aplify — full page copy

Every user-facing string on `aplify-website-v2.vercel.app`, in the order it
appears down the page, plus the demo micro-copy and site chrome underneath.

**Generated 2026-08-24 from the content modules.** This is a working document
for editing, not the source of truth — the site reads from the files named
against each section. Mark your changes here and they can be applied back.

**Three rules bind this copy** (V2_HANDOVER §5/§6). They are not stylistic:

1. **Never "career site" alone** — always *"career site or campaign landing
   page"*. Campaign landing pages are separately sold, and the recruitment-ops
   buyer owns that budget. The phrase appears in six places and is not a
   candidate for trimming when a line runs long. (One deliberate exception: the
   Google for Jobs roadmap item, which describes where Google surfaces a job,
   not where Aplify is deployed.)
2. **One statistic, three quotes, one named third party.** Brandon Trust's
   85%→30%; Louise Mitchell, Ben Hopwell, Sammi Yates verbatim; Eploy, text
   only. Nothing outside that list may be presented as fact.
3. **Native ATS integration is SHIPPED, not roadmap.** The roadmap contains
   exactly two items.

---

## Page metadata

`src/lib/site.ts`, `src/app/page.tsx`

| | |
|---|---|
| Site name | Aplify |
| Title | Aplify — The recruitment experience candidates actually finish |
| Description | The recruitment experience candidates actually finish. Aplify powers search, application and event registration directly on your own career site or campaign landing page, so candidates never get handed off to an ATS. |

The title's headline is the approved position (§4) verbatim, and the same
sentence the share card is painted from — changing it here carries through
both.

---

## Navigation

`src/data/content/site.ts` → `nav`

Platform · How it works · Job search · Dashboard · Security

CTA: **Book a demo**

> ⚠️ Known issue: these label features, while the page now argues as *two
> problems*. Four bands (`where it sits`, `problem`, `drop-off`, `payoff`) have
> no nav entry at all.

---

## 1. Hero

`site.ts` → `hero`

**Heading**
> More candidates,
> less friction

*(mobile break: More / candidates, / less friction)*

**Standfirst**
> Search, application and event registration on your own career site or campaign landing page — candidates never get handed off to an ATS.

**Buttons** — Book a demo · See it working

---

## 2. Where it sits

`site.ts` → `siteMap`

**Eyebrow** Where it sits

**Heading**
> Between your ATS
> and your candidates

**Standfirst**
> One side never touches a candidate. The other is everything a candidate ever sees. Both run off the same cleaned data.

---

## 3. The problem — the feed

`site.ts` → `story`

**Eyebrow** The problem

**Heading**
> Your feed arrives
> fragmented

**Standfirst**
> Every time a job changes, somebody re-types it. Publish the feed as it arrives on a career site or campaign landing page and you are choosing between losing candidates and tidying it by hand — on every job, every time.

**The before/after rows** (raw → cleaned)

| Raw | Cleaned |
|---|---|
| NURSE — Bristol, Bristol, BS1 · SOUTH WEST · 24000-26000 | Nurse — Bristol, BS1 · South West · £24,000–£26,000 |
| Support Worker (Days) · Southwest · £24k-£26k | Support Worker (Days) · South West · £24,000–£26,000 |
| HCA - weston super mare · S.W. · Up to £26,000 DOE | Healthcare Assistant — Weston-super-Mare · South West · Up to £26,000 |

---

## 4. The platform

`site.ts` → `featureBento`

**Eyebrow** The platform

**Heading**
> Everything upstream
> of your careers page

**Standfirst**
> Your jobs arrive however your ATS produces them and leave consistent, on-brand and publishable — without anyone opening a spreadsheet.

**Lead card**
- *Feeds cleaned on every import* — Salaries normalised, titles tidied, regions standardised, descriptions rewritten to your tone of voice. No spreadsheets, no manual passes.

**Cards**
- *Pulled from any ATS* — XML, JSON or CSV, from any number of sources, on a schedule or on demand. Mapping a new field is configuration, not development.
- *Sent back out clean* — The tidied feed syndicates onward to job boards and aggregators, so one campaign reaches a national board without a second export.
- *Rewritten, never invented* — The AI rewrites what the advert says and cannot add what it does not say. Salary, location and title come from your data, untouched.

---

## 5. AI enrichment

`site.ts` → `demos.aiEnrichment` (section) · `ai-rewrite.ts` (demo)

**Eyebrow** AI enrichment

**Heading**
> Written for candidates,
> not for the file

**Standfirst**
> ATS descriptions were written to satisfy a process. Aplify rewrites every one to your tone of voice on import.

**Demo labels** — Straight from the ATS · Published by Aplify · Rewrite with Aplify · Show the originals

**Caption**
> Illustrative adverts. Every fact in the rewritten version is traceable to the original — nothing is added.

**The guardrail — load-bearing copy (§6.8), quoted exactly. Do not reword.**

*Works on adverts, not on people*
> Screening, ranking and selection stay entirely with your team — the AI never touches a candidate decision.

> It rewrites what's there. It doesn't invent responsibilities, benefits or requirements your feed didn't contain.

**Capability chips** — Your EVP and tone of voice · Consistent job families · Bulk reclassify and regenerate · Every AI decision editable

**Sample rewrites** — two adverts, before and after. Every fact in each "after"
is traceable to its "before" (§6.10); if you edit one side, check the other.

---

## 6. How it works — six stages

`site.ts` → `howItWorks`

**Eyebrow** How it works

**Heading**
> Six stages, raw feed
> to finished application

**Standfirst**
> From the feed landing in your inbox to a candidate pressing send.

**01 Ingest** — *Pull jobs straight from your ATS*
> XML, JSON or CSV from any number of sources, on a schedule or on demand. Field mapping is configuration, not development.
>
> Multi-format import · Configurable mapping · Authenticated feeds

**02 Clean & enrich** — *Fix what the feed got wrong*
> Salaries normalised, duplicated text stripped from titles, messy regions mapped to a consistent set — then AI rewrites each description to your tone of voice.
>
> Salary and region normalisation · AI rewriting to your EVP · Job family classification

**03 Present** — *Publish it on your own site*
> Full-text search, geo search with a configurable radius, an interactive map and detail pages — all on your career site or campaign landing page.
>
> Keyword and salary filtering · Postcode and map search · One campaign to a national board

**04 Convert** — *Let candidates finish without leaving*
> Applications and event registrations happen on the page. Each company controls which fields appear, with pre-qualification gating anyone ineligible before the full form.
>
> On-page Easy Apply · Customisable fields · Pre-qualification screening

**05 Manage** — *Action and report on everything*
> Recruiters triage through a full status workflow, with source tracking on every submission so paid social, job boards and QR codes compare by channel.
>
> Submitted to accepted · Source tracking · Branded candidate emails

**06 Syndicate** — *Send the clean feed back out*
> Once a feed is clean it is an asset. Aplify tailors it per destination and publishes it as an API-key-protected XML feed.
>
> Custom outbound mapping · XML protected by API key · Errors stripped before they leave

---

## 7. The drop-off

`site.ts` → `dropOff`

**Eyebrow** The drop-off

**Heading**
> They leave
> at the redirect

**Standfirst**
> A redirect to your ATS, an account to create, a form that asks again for everything the CV already says. Every step between the job and the submit button is somewhere to stop — and the people who stop are the ones you never hear from.

> This band carries no statistic on purpose. §5 holds exactly one, it is
> Brandon Trust's, and it must stay paired with the phrase *application
> drop-off rate*. Splitting it so an 85% opened this section would read as an
> industry figure.

---

## 8. The payoff

`site.ts` → `payoff`

**Eyebrow** The payoff

**Heading**
> One application,
> zero redirects

**Standfirst**
> Candidates search, filter and apply without ever leaving your career site or campaign landing page — no redirect, no account, no half-finished forms abandoned somewhere else.

**Chips** — On-page · No ATS redirect · No account · Anonymous apply · Field-level PII encryption

---

## 9. Four steps — the candidate journey

`site.ts` → `capabilities`

**Eyebrow** For your candidates

**Heading**
> Four steps,
> no dead ends

**Standfirst**
> The whole candidate journey happens on your own site, in your own brand — and every step of it is a place people usually drop out.

**01 Find the right job**
> Full-text search across every live role, narrowed by region, salary band and contract type. Candidates who only know the town they can get to use postcode search with a radius, or the map — which is often the only filter that matters when the job is shift work.
>
> Keyword and salary filtering · Postcode search with radius · Interactive map

**02 Apply without leaving**
> The application form is on the page, not behind a redirect. Pre-qualification runs first, so anyone who cannot be offered the role finds out in two questions rather than after twenty minutes of typing — and each company chooses which fields it actually needs.
>
> No ATS redirect · No account to create · Pre-qualification first

**03 Register for events**
> Open days and assessment centres get the same low-friction flow on their own tab, with places tracked and attendance recorded against the candidate afterwards — so an event stops being a spreadsheet that lives on somebody's desktop.
>
> Own tab, same flow · Places tracked · Attendance recorded

**04 Kept informed**
> Every status change sends a branded email in your own voice, so a candidate is never left guessing whether anyone read their application. Silence is the single most common reason people say they would not apply to an employer twice.
>
> Branded templates · Every status change · Your tone of voice

---

## 10. Job search

`site.ts` → `demos.jobSearch` (section) · `job-search.ts` (demo)

**Eyebrow** Job search

**Heading**
> The search your
> candidates would get

**Standfirst**
> Three views of one filtered set — grid, list and map — running the way it would run on your career site or campaign landing page. The switch decides where a candidate goes when they press apply, and it is set per client rather than per candidate — move it and every card below changes with it.

**The apply-route switch**
- **Easy Apply** — They finish on the page they started on
- **Link to your ATS** — They leave, and your workflow is untouched

**When "Link to your ATS" is chosen — *Hands off to your ATS***
> With this route the search, the map, the clean job data and the campaign pages are all still Aplify — but the apply button sends the candidate to the job's page in your ATS, where they apply through the form you already run. Nothing changes about your existing process.

> It costs you candidates. A redirect, and often an account to create, is exactly the friction Easy Apply removes — so this is the middle ground: your workflow untouched, at a measurable price at the last step.

*Demo micro-copy is listed in the appendix.*

---

## 11. Your brand, not ours

`brand-kit.ts`

**Eyebrow** Your brand, not ours

**Heading**
> Part of your page,
> not stuck on it

**Standfirst**
> Every Aplify surface renders inside your own career site or campaign landing page, and every one of them reads the same brand settings. Set them once. Done.

**Card 1 — Set it once**
> Colours and type, corners and shadows, spacing, photography, your logo — the whole visual layer is configuration rather than code. Set it in the plugin and every surface picks it up.

**Card 2 — The apply flow follows**
> Easy Apply takes the same settings — fields, buttons, the consent step, the confirmation — and all of it happens on your page. So does the applications dashboard your team works in. End to end, one brand.

**Card 3 — Built for the phone first**
> Most candidates arrive on a handset, so that is what every surface is designed for before anything else — and the same layout holds together on a tablet and a desktop without a second version to maintain.

> ⚠️ **This section's claim is not yet sourced.** V2_HANDOVER §1 records only
> *"colours, imagery and fonts are set inside the plugin"*, and the product
> spec hedges to *"inherits some of that client's brand"*. The wider list here
> is Stephen's, confirmed 2026-08-24. **Widen the handover before treating this
> copy as approved.**

---

## 12. The proof

`site.ts` → `proof`

**Eyebrow** Application drop-off rate

> **30%**
>
> 85% Before Easy Apply → 30% After Easy Apply
>
> Brandon Trust

> The only hard number on the site. Always paired with *application drop-off
> rate* so it cannot be misread as a completion rate.

---

## 13. Testimonials

`site.ts` → `testimonials`

**Eyebrow** In their words

**Heading**
> What changed for
> the teams using it

**Real, cleared quotes — verbatim. Do not paraphrase, extend or add a fourth.**

> Aplify has helped us significantly reduce application drop-out by making the whole process quicker and more accessible. More candidates are now completing their applications, giving our recruitment team a stronger pool of people to engage with.
>
> — **Louise Mitchell**, Brandon Trust *(proves completion)*

> The Aplify dashboard is incredibly straightforward to use. Our recruitment team can quickly review and manage applications without unnecessary complexity, helping everyone work more efficiently and keep candidates moving through the process.
>
> — **Ben Hopwell**, Cygnet Group *(proves the dashboard is usable)*

> Aplify makes applying for a role feel quick, simple and intuitive. Candidates can complete their application without navigating a long or complicated process, creating a much more positive experience from the very first interaction.
>
> — **Sammi Yates**, HC-One *(proves the candidate experience)*

> Each quote proves a different thing. They are not interchangeable.

---

## 14. Recruiter dashboard

`site.ts` → `demos.dashboard` (section) · `dashboard-data.ts` (demo)

**Eyebrow** For your recruiters

**Heading**
> One place to
> action all of it

**Standfirst (as rendered)**
> Every application and every event registration lands in one place, and moves through a status workflow your team controls.

**Longer variant held in `dashboard-data.ts`, not currently rendered**
> Applications and event registrations arrive in the same dashboard, on separate tabs, and move through a status workflow your team controls — or, with native ATS integration, they bypass it entirely and land in the system you already use.

---

## 15. Integrations

`site.ts` → `integrations`

**Eyebrow** Integrations

**Heading**
> Works with the
> ATS you already have

**Standfirst**
> Nothing you already run gets replaced. Your ATS stays the system of record, and your team keeps the workflow it has.

**Lead — the one named third party. Approved wording, text only, never the logo.**
> Native ATS integration is live today with Eploy. Other systems are added as clients need them — if yours isn't connected yet, that's a conversation we have with you rather than a queue you wait in.

**List**
- Ingests XML, JSON or CSV from any ATS
- Applications pushed straight into your ATS
- Or triaged in the Aplify dashboard
- Or linked out to your existing form
- Outbound XML feeds, protected by API key
- Branded candidate email at every stage

---

## 16. Security & GDPR

`site.ts` → `security`

**Eyebrow** Security & GDPR

**Heading**
> Built for data
> you cannot lose

**Standfirst**
> Candidate data is the most sensitive thing a recruiter holds. It is treated that way at every layer.

- **Field-level PII encryption** — Personal fields are encrypted individually, not just at rest on the disk.
- **Scoped to the company** — Every query is scoped by company; an out-of-scope record does not resolve.
- **Anonymous by default** — Candidates apply without creating an account, so there is no credential to lose.
- **Retention you control** — Retention windows and deletion are configured per company, not assumed.

---

## 17. Roadmap

`site.ts` → `roadmap`

**Eyebrow** Roadmap

**Heading**
> Being built next

**Standfirst**
> Not yet available — listed so you know where the platform is going before you commit.

- **Feed-level reporting** — Reporting per feed and across multiple feeds, so customers running several can compare performance in one view rather than a feed at a time.
- **Google for Jobs** — Structured job data so vacancies surface in Google's dedicated jobs search alongside the rest of the career site.

> **Exactly these two.** Native ATS integration is shipped and belongs in
> §15 — putting it here inverts a positioning decision the handover calls
> deal-closing.

---

## 18. Closing CTA and footer

`site.ts` → `footer`

**Heading**
> Fewer drop-offs,
> starting with your next feed

**Standfirst**
> See your own jobs cleaned, published and applied to — on a demo built from your real feed.

**Button** Book a demo

**Columns**
- **Platform** — Job search · Easy Apply · AI enrichment · Recruiter dashboard
- **How it works** — Ingest · Clean & enrich · Present · Syndicate
- **Company** — Security & GDPR · Integrations · Roadmap · Contact

**Blurb**
> Aplify turns a messy ATS feed into a candidate experience people actually finish.

**Email** hello@aplify.co.uk

---
---

# Appendix A — demo micro-copy

Short interface strings. Worth a pass for tone, but they read as UI rather than
as page copy.

## Job search demo · `job-search.ts`

**Filters** — Job title or keyword · Town or city · Use my location · All families · All regions · Search · Clear
**Views** — Grid · List · Map
**Counts** — {n} jobs found · Showing {from}–{to} of {total} roles · Previous · Next
**Empty state** — No roles match those filters — clear one and the set refills.
**Card actions** — Easy Apply · Find out more

**Pre-qualification** — *Step 1 of 2 — pre-qualification*
> Pre-qualification runs before the form, so nobody fills one in for a role they can't be offered. Each company writes its own questions.

**If gated** — *This role needs a different answer*
> Rather than take you through a full application that would be turned down, the flow stops here. In the product this is where a candidate is pointed at roles they do qualify for.

**The form** — *Step 2 of 2 — your details*
> No account, no password, no returning to an email to finish. Companies choose which fields appear here and in what order.

Fields: Full name · Email address · Phone (optional) · CV upload
CV hint: PDF or Word — multi-file upload is supported in the product

**Required disclosure — the form looks submittable (§6.7)**
> A demonstration form — nothing you see here is sent, stored or read.

**Confirmation** — *That's the whole application*
> Two steps, no redirect, no account — and the candidate never left the page they arrived on. That is the difference the drop-off figures further down this page are measuring.

> In the product, this role would now appear in the recruiter dashboard for triage — or, where native ATS integration is in place, straight in the ATS your team already works in. Nothing was submitted here.

## Dashboard demo · `dashboard-data.ts`

**Tabs** — Applications · Registrations
**Filters** — Search by name... · All statuses · All jobs · All categories · All roles · All sources · Applied from · Applied to · More filters / Fewer filters · Export CSV *(Honours whatever filters are active)* · Clear filters
**Empty** — No applications match those filters.
**Table** — Application · Candidate · Job · Status · Source · Applied · Notes
**Statuses** — Submitted · Reviewed · Shortlisted · Accepted · Rejected · Withdrawn

**Application panel** — Application · Source · Status · Update status · Candidate (Name, Email, Telephone, Postcode) · Job (Title, Ref, Location, Salary) · Additional information · Applied (Terms agreed, Contact consent) · View candidate · Back to list · Close

**Danger zone** — the product's own wording
> Deleting an application permanently anonymises the candidate's personal data. This cannot be undone.

Buttons: Delete application · Confirm delete · Cancel

**Notes** — Add a note... · Add note · No notes yet. · View candidate timeline

**Required disclosure — the notes field looks submittable (§6.7)**
> Sample data. Notes you add here stay in this browser and are gone on refresh.

**Held but NOT rendered** — the section caption, removed 2026-08-24
> A working demonstration — invented people on reserved example.* domains and Ofcom's reserved 07700 900xxx numbers. Nothing here is real candidate data, and nothing you change is saved.

## Brand kit demo · `brand-kit.ts`

The phone shows: Job title or keyword · Manchester · Search · Sorted by
distance · 48 roles · View, and four sample roles (Assistant General Manager,
Support Worker, Healthcare Assistant, Staff Nurse (Nights)).

The slider has no visible label. Its accessible name is "Brand style".

---

# Appendix B — site chrome

## Cookie banner
*This website uses cookies*
> We use cookies to keep the site working, learn how it's used, and improve what we ship next. Accept everything, reject the non-essential, or pick category by category. See our privacy policy.

Buttons: Accept all · Reject all · Manage preferences

> ⚠️ The privacy policy link 404s. Needs the page, a real external URL, or the
> link removing.

## Cookie preferences
- **Strictly necessary** — Required for the site to work — sign-in, security, page navigation. These can't be turned off.
- **Analytics** — Anonymised usage stats so we know which pages help and which fall flat. No personal profile is built.
- **Marketing** — Lets us measure ad performance and re-show content you didn't get to finish reading. Opt out anytime.

---

# Appendix C — sample data

Invented people and organisations appear throughout the demos. Under §6.5 they
must stay invented, on reserved `example.*` domains and Ofcom's reserved
`07700 900xxx` numbers. **Never substitute a real client name** — §5 permits
exactly one logo on this site, Brandon Trust's, beside the one statistic.

- **Candidates** (dashboard): Amara Osei, Tom Bailey, Priya Nair, Jack Whitfield, Sofia Marsh, Daniel Okafor, Ella Byrne, Marcus Reid
- **Registrants**: Nadia Kaur, Ben Cartwright, Grace Adeyemi, Oliver Franks, Holly Dunne
- **Job search sample applicant**: Alex Morgan
- **Employers** (brand kit, not shown on screen): Northbank Health, Meridian Care, Ashgrove Trust, Halden Group
- **UK geography must be real** (§6.6). Every town used is.

> ⚠️ `jamie.okafor@email.com` appears baked into the step 03 and step 04
> artwork. `email.com` is a live domain; §6.5 requires reserved `example.*`.
> The PNGs need re-exporting — it is not fixable in copy.

# Aplify — V2 handover pack

**Purpose.** Everything a fresh V2 build needs about the *product, the argument and the words*, so a new
project can start without reading the V1 codebase. Design and build direction are deliberately absent —
they arrive with the design prompts that follow this document.

**Status of the contents.** The copy quoted here is live on the V1 production site and has been through
client review. Treat it as approved raw material: reusable verbatim, safe to re-cut and re-order, but the
*claims* inside it are fixed unless the client says otherwise. Where a fact came from the client rather
than from the product, it is flagged under **Re-verify before launch**.

---

## 1. What Aplify is

A layer that sits **between a recruiter's ATS and their candidates**.

Recruitment agencies and in-house talent teams already have an ATS. It holds their vacancies and it
handles their hiring process, and neither of those is what Aplify replaces. What the ATS is bad at is the
two ends: the job data it emits is inconsistent, and the application experience it offers candidates is
where they give up. Aplify takes over both ends and hands the ATS back clean data and finished
applications.

It has two halves, and the split is the product's central idea:

**The data side — never touches a candidate.**
- Ingests feeds however the ATS produces them: XML, JSON or CSV, any number of sources.
- Configurable field mapping, authenticated feeds, on-demand re-imports.
- Normalises salaries, job titles and UK regions.
- Rewrites every description to the client's EVP and tone of voice, on import, with AI.
- Sorts every role into a consistent job family, with manual override and bulk reclassify.
- Pushes the cleaned feed back out to job boards — custom outbound mapping per destination, XML
  syndication behind an API key, errors stripped before anything leaves.
- **Google for Jobs structured data (JSON-LD) written on every published job**, carrying title, location,
  salary, contract type and closing date from the already-cleaned data. *Added 2026-08-25 on Stephen's
  confirmation; this was previously recorded under "Roadmap — not yet available" and it is not.* Note the
  claim the site may make: the job **carries the structured data Google reads**. Nobody can promise Google
  will surface a job, and a ranking promise is the one claim on that page a technical buyer could falsify.

**The candidate side — everything a candidate ever sees.**
- Search by keyword, category, region, salary and contract type.
- Postcode or place-name search with a configurable radius, sorted by distance, plus a map view.
- **Easy Apply**: application completed on the page. No redirect, no account to create, anonymous
  submission, custom fields, multi-file upload, pre-qualification screening and rate limiting.
- **Easy Events**: hiring events, open days and recruitment drives get a branded public page and the same
  low-friction registration. Registrations stay on their own dashboard tab, never mixed with applications.
- Branded status emails at every stage — submitted, reviewed, shortlisted, rejected, accepted, withdrawn —
  with the client's own templates, sender name, colours and logo.

Both halves run off the same cleaned data. That sentence does a lot of work in the pitch.

### Where the work lands

- **Recruiter dashboard.** Applications and registrations on separate tabs, a status workflow the client's
  team controls, search and filtering, per-candidate detail with a timeline and notes, source tracking so
  ROI is measurable by channel, and CSV export honouring whatever filters are active.
- **Or native ATS integration.** Applications are pushed straight into the client's ATS as they arrive —
  no export step, no dashboard, no second system for the team to learn. **Live today with Eploy**; other
  systems are added per client.

### Deployment

- **WordPress plugin** — install it and the pages build themselves: apply flow, dashboard pages, search,
  map, job detail, events and GDPR forms. Shortcodes remain available for bespoke pages.

  **What the client can theme, confirmed by Stephen 2026-08-24.** This paragraph used to read *"colours,
  imagery and fonts are set inside the plugin"*, which understated it, and the brand-kit band on the site
  claims the wider list. The full set is **colours, type, type scale, corner radii, shadows, spacing,
  photography and the logo** — applied to the Easy Apply flow **and** the recruiter dashboard. **Layout
  alone is fixed**, meaning arrangement: widths and structure hold, while heights move, because type scale
  and spacing are themselves configurable. Do not let that drift into "nothing changes size", which is
  false and measurable.
- **Or the APIs** — a Jobs API (search, filter, categories, locations, regions, roles) and an Applications
  API (submit, read form structure, update status, export), keys scoped per integration with granular
  permissions, for a headless career site or a partner integration.

### Security & GDPR

This is a genuine differentiator in a sector selling to care providers, the NHS supply chain and charities,
and it is depth worth spending words on.

*How it's protected:* encrypted in transit and at rest; **field-level encryption on every PII field**;
searchable while encrypted via secure exact-match indexing; hosted within the EEA; role-based access with
unique user accounts; documented key rotation, monitoring and patching.

*What candidates control:* self-service export and deletion through a public form; every request confirmed
by a signed email link; confirmation links expire after 48 hours; retention window enforced automatically
in the background; marketing consent timestamped at the point of capture; aggregate reporting survives
anonymisation intact.

The line that lands it: *"Not just HTTPS, and not just encryption at the database level. Each piece of
personal information is encrypted individually — and recruiters can still search it, because the index is
secure rather than plain text."*

### Roadmap — not yet available

> **Amended 2026-08-25, on Stephen's confirmation.** Google for Jobs has SHIPPED and has moved out of this
> list into the capability list above. Only **one** item remains here, and as of the v3 copy deck the site
> carries no roadmap section at all, so nothing on the page depends on this list any more. The original
> wording of both items is preserved below the rule for traceability.

- **Feed-level reporting** — reporting per feed and across multiple feeds, so customers running several can
  compare performance in one view rather than a feed at a time.

---

*Superseded wording, kept so a later reader can see what changed:* Google for Jobs was recorded here as
*"structured job data (JSON-LD) so vacancies surface in Google's dedicated jobs search alongside the rest
of the career site"*, under the heading "not yet available". Stephen confirmed on 2026-08-25 that it is
live and working, with JSON-LD written on every published job. It is now a shipped capability — see the
data side of §1 — and the v3 deck gives it its own band.

---

## 2. The three delivery configurations

**This is the single most important structural fact about the pitch.** Aplify is not one shape, and a
buyer arrives wanting to know which shape they are being sold. There are three, formed by two independent
questions — *how does a candidate apply* × *where does the application land*:

| | Candidate applies | Application lands |
|---|---|---|
| **A** | Easy Apply, on the page | Aplify recruiter dashboard |
| **B** | Easy Apply, on the page | Native ATS integration — no dashboard at all |
| **C** | Link-out: *Find out more* sends them to the job's page in the client's ATS | The client's existing ATS process, untouched |

In configuration C the search, the map, the clean job data and the campaign pages are **still Aplify** —
only the apply button leaves. That has to be said explicitly or the reader assumes C means Aplify does
nothing.

**Do not present these as a pricing table or a feature matrix.** V1 split them across the two sections
where each fork actually bites — the candidate fork where the apply button is, the destination fork where
the work lands — and that worked. Whatever V2 does, the two forks must both be answerable, and the
confirmation at the end of an apply flow is the natural place to name both destinations at once.

**Frame C as range, not as a hedge**, and never lead with it. A buyer with an entrenched ATS arrives asking
whether Aplify forces a second system on their team; *"or skip the dashboard and keep the workflow you
have"* answers that with confidence — but only once they have already seen the dashboard they might not
need. Stating C's cost honestly is what makes it credible: *"It costs you candidates. A redirect, and
often an account to create, is exactly the friction Easy Apply removes — so this is the middle ground:
your workflow untouched, at a measurable price at the last step."*

---

## 3. Who is being sold to

One page currently serves all three. Each arrives with a different first question.

**The talent acquisition lead / head of resourcing.** Owns candidate volume and completion rate. Cares
about drop-off, candidate experience, employer brand consistency. Their question: *will more people finish?*
This is the primary audience and the hero speaks to them.

**The recruitment operations / marketing manager.** Owns the career site, the campaigns and the job board
spend. Cares about how bad the feed looks on their own site, how much manual tidying their team does, and
whether they can measure channel ROI. Their question: *does this stop us editing spreadsheets?*

**The IT / data protection stakeholder.** Rarely the buyer, frequently the blocker. Cares about where data
sits, how it is encrypted, what a subject access request costs them, and whether this is another system to
integrate. Their question: *what does this do to our data, and does my team have to learn it?*

Two things follow. The security depth is not an afterthought section — it unblocks deals. And the "you may
not need the dashboard" message exists specifically for the stakeholder who hears "new platform" as "new
system to run".

---

## 4. Positioning and the message spine

**Position:** the recruitment experience candidates actually finish.

It leads with *completion*, which is the strongest of the three differentiators (the others being AI feed
clean-up and the security/GDPR depth). It states a position rather than a claim about data, and completion
is the one thing every audience above can agree matters.

The argument runs in this order, and the order is the whole message:

1. **Your feed arrives broken.** Fragmented, inconsistent, duplicated locations, three spellings of the
   same region. Publishing it straight to a career site or campaign landing page means either losing
   candidates or cleaning it by hand — every time a job changes.
2. **We clean it on the way in.** Salaries normalised, titles tidied, regions standardised, descriptions
   rewritten to your tone of voice. On every import, without anyone touching a spreadsheet.
3. **Then candidates finish on your own site.** Search, filter and apply with no redirect, no account, no
   half-finished forms abandoned somewhere else.
4. **And here is what that is worth.** Brandon Trust's application drop-off went from 85% to 30%.
5. **Your team keeps working the way it works.** Dashboard, native ATS integration, or link-out — and the
   data is safer than what you have now.

Steps 1–3 are a single continuous claim and should never be separated by anything that breaks the thread.
Step 4 is the only hard number the site has and it should land where it cannot be missed. Step 5 is
objection handling and belongs late.

### Headline copy, approved

> **The recruitment experience candidates actually finish**

Supported by: *"Aplify powers search, application, and event registration directly on your own career site
or campaign landing page, so candidates never get handed off to an ATS."*

Secondary data claim: *"Inconsistent ATS feeds in — clean, on-brand job data out."*

Capability labels used as a strip under the hero: **Feed cleaning · AI enrichment · Easy Apply · Easy Events**

Hero calls to action: *See how it works* (scrolls) and *Book a demo* (converts).

> **Retired:** the diagonal pair "Messy in / Clean out". It only worked in a layout that put one half
> top-left and the other bottom-right, and it was replaced deliberately. Strings may still linger in V1 —
> do not revive it.

---

## 5. Approved proof assets — the complete inventory

Nothing outside this list may be presented as fact. There is no second stat, no fourth quote, no other
named integration.

**The one statistic.** Brandon Trust: application drop-off **85% before Easy Apply → 30% after**. Always
paired with the phrase *application drop-off rate* so it cannot be misread as a completion rate. Brandon
Trust's logo is cleared for use alongside it.

**The three client quotes.** All real, all cleared, all available as recorded voiceovers.

- **Louise Mitchell, Brandon Trust** — *"Aplify has helped us significantly reduce application drop-out by
  making the whole process quicker and more accessible. More candidates are now completing their
  applications, giving our recruitment team a stronger pool of people to engage with."*
- **Ben Hopwell, Cygnet Group** — *"The Aplify dashboard is incredibly straightforward to use. Our
  recruitment team can quickly review and manage applications without unnecessary complexity, helping
  everyone work more efficiently and keep candidates moving through the process."*
- **Sammi Yates, HC-One** — *"Aplify makes applying for a role feel quick, simple and intuitive. Candidates
  can complete their application without navigating a long or complicated process, creating a much more
  positive experience from the very first interaction."*

Note what each quote is *for*: Brandon Trust proves completion, Cygnet proves the dashboard is usable,
HC-One proves the candidate experience. Three different claims — don't use them interchangeably.

**The one named third-party product.** **Eploy**, as the shipped native ATS integration. Text only, never
the logo. Wording that keeps it accurate without over-promising: *"It is live today with Eploy. Other
systems are added as clients need them — if yours isn't connected yet, that's a conversation we have with
you rather than a queue you wait in."*

---

## 6. Content rules — non-negotiable

These were set with the client and several were learned the hard way. They survive into V2 unchanged.

1. **Never invent a metric, a testimonial or a statistic.** If a number is not in §5, it does not exist.
2. **Never say "career site" alone.** Always *"career site or campaign landing page"*. Campaign landing
   pages are a real and separately-sold use case and dropping them narrows the product.
3. **Eploy is the only third-party product named anywhere**, text only.
4. **Never render another company's product.** No mocked ATS screen, ever. Describe the hand-off and stop.
5. **Sample people in any demo are invented** and live on reserved `example.*` domains, so nothing can be
   mistaken for real candidate data.
6. **Any UK geography must be real.** A pin in the wrong county is the error every UK reader spots.
7. **Every demo carries a caption saying what is illustrative**, and any form that looks submittable must
   state plainly that nothing is sent, stored or read.
8. **The AI guardrail is load-bearing copy, not a disclaimer.** *"Works on adverts, not on people."*
   Screening, ranking and selection stay entirely with the client's team; the AI never touches a candidate
   decision. And it rewrites what is there — *"It doesn't invent responsibilities, benefits or requirements
   your feed didn't contain."* Selling to care providers and the NHS supply chain, this is the difference
   between interest and a compliance conversation.
9. **Native ATS integration is shipped, not roadmap.** *(And so is Google for Jobs, as of 2026-08-25 — see
   §1. This rule now has two instances, and both went the same way: a shipped capability recorded as
   forthcoming, which is the damaging direction.)* V1 originally had this under "in active development"
   with copy saying only manual transfer existed — wrong in the damaging direction for a capability that
   closes deals. The roadmap contains exactly the items in §1 — **one, since 2026-08-25**, and the v3 deck
   drops the roadmap section from the site entirely, so nothing on the page depends on it.
10. **Any AI rewrite shown must be traceable fact-for-fact to its source text.** If a before/after is
    displayed, a reader must be able to check every claim in the "after" against the "before".

---

## 7. Messaging hierarchy

**Primary claim (one, everywhere):** candidates finish. *The recruitment experience candidates actually
finish.*

**Four pillars.** Each is a section-level promise, each has a headline already written and proven:

| Pillar | The promise | Proven by |
|---|---|---|
| **Clean data** | Feeds arrive however your ATS produces them and leave consistent, on-brand and publishable — without anyone editing a spreadsheet. | The before/after rewrite, the six-stage pipeline |
| **Finished applications** | Search, apply and register happen entirely on your career site or campaign landing page. Nothing hands off to an ATS. | The 85% → 30% figure, the HC-One quote |
| **Your team's workflow, kept** | Dashboard, native ATS integration, or link-out — you choose where the work lands. | The dashboard itself, the Cygnet quote, Eploy |
| **Data safety as a feature** | Field-level encryption, EEA hosting, candidate self-service — safer than what you have now. | The security detail in §1 |

**Structural claim under all four:** *"One side of Aplify never touches a candidate. The other side is
everything a candidate ever sees. Both run off the same cleaned data."* This is the sentence that makes the
product legible in one read, and it is worth protecting a prominent position for it.

---

## 8. Information architecture

V1 is a single page with a nav that jumps within it. That is a choice V2 may revisit — the content below
would support a multi-page structure, with the pillars in §7 as the obvious page boundaries. What must not
change is the *order of the argument* in §4.

### Section inventory

Each entry: what it is for, and the approved copy it already has. **Eyebrow → headline → standfirst** is
the pattern throughout (see §10).

**1. Hero.** State the position and what the product is. Copy in §4.

**2. The problem.** *The problem* → **"Your feed arrives fragmented and inconsistent"** → *"Publish that
straight to a career site or campaign landing page and you either lose candidates or clean it by hand —
every time a job changes."* Illustrative fragments used: duplicated location (`Nurse — Bristol, Bristol,
BS1`), three spellings of one region (`SOUTH WEST / Southwest / S.W.`).

**3. The solution.** *The solution* → **"Feed cleaned, ready for candidates"** → *"Salaries normalised,
titles tidied, regions standardised, descriptions rewritten to your tone of voice — on every import,
without anyone touching a spreadsheet."*

**4. The payoff.** **"One application, finished on your own site"** → *"Candidates search, filter, and apply
without ever leaving your career site or campaign landing page — no redirect, no account, no half-finished
forms abandoned somewhere else."* Supporting labels: *On-page · No ATS redirect · No account · Anonymous
apply · Field-level PII encryption.*

Sections 2–4 are the message spine and in V1 they run as one continuous stretch before any product detail.

**5. Where it sits.** *Where it sits* → **"Between your ATS and your candidates"** → the structural claim
from §7. Splits into two halves the reader can open:
- *For your data* — **"The engine behind it"**: Ingest from any ATS, in XML, JSON or CSV · Salaries, titles
  and UK regions normalised · Descriptions rewritten to your tone of voice · Every role sorted into a
  consistent job family · Clean feeds pushed back out to job boards.
- *For your candidates* — **"The experience they get"**: Search by keyword, region, salary and contract ·
  Postcode search with an interactive map · Apply on the page, with no account to create · Register for
  hiring events the same way · Branded status emails at every stage.

**6. How it works.** *How it works* → **"Six stages, from raw feed to finished application"**. The six, each
with three supporting facts:

| Stage | Headline | Facts |
|---|---|---|
| Ingest | Pull jobs straight from your ATS | Multi-format import, any number of sources · Configurable field mapping, no code changes · Authenticated feeds and on-demand re-imports |
| Clean & enrich | Fix what the feed got wrong | Salary, title and UK region normalisation · AI rewriting to your EVP and tone of voice · Job family classification, with manual override |
| Present | Publish it on your own site | Keyword, category, region and salary filtering · Postcode search and interactive map view · Scopes from one campaign to a national board |
| Convert | Let candidates finish without leaving | On-page Easy Apply, anonymous submission · Fully customisable fields and file uploads · Pre-qualification screening and rate limiting |
| Manage | Action and report on everything | Status workflow from submitted to accepted · Source tracking, so ROI is measurable by channel · Branded candidate emails you write yourself |
| Syndicate | Send the clean feed back out | Custom outbound mapping per destination · XML syndication protected by API key · Errors stripped before they ever leave |

**7. For your candidates.** *For your candidates* → **"Everything they see, on your own site"** → *"Search,
application and event registration all run on your career site or campaign landing page. A candidate never
gets handed to a system that isn't yours."* Four capabilities, each with a paragraph and three facts:
*Find the right job, three ways* · *Apply without leaving the page* · *The same flow for hiring events* ·
*Kept informed, in your voice*. Full copy for each is in §1's candidate-side list and in the V1 source.

**8. Job search & Easy Apply.** *Job search* → the reader must be able to **use** it. Three views of one
filtered set — grid, list and map. Above them, the **apply-route switch** (*Easy Apply* / *Link to your ATS*)
which rewrites every card's button: *"Set per client, not per candidate. Switch it to see what changes on
every card below — in all three views."* Easy Apply runs pre-qualification → gate → short form →
confirmation. Key copy:
- *"Pre-qualification runs before the form, so nobody fills one in for a role they can't be offered. Each
  company writes its own questions."*
- Gate: *"Rather than take you through a full application that would be turned down, the flow stops here.
  In the product this is where a candidate is pointed at roles they do qualify for."*
- Form: *"No account, no password, no returning to an email to finish. Companies choose which fields appear
  here and in what order."*
- Confirmation: **"That's the whole application"** → *"Two steps, no redirect, no account — and the
  candidate never left the page they arrived on. That is the difference the drop-off figures further down
  this page are measuring."* Then the join to §2's destination fork: the role *"would now appear in the
  recruiter dashboard for triage — or, where native ATS integration is in place, straight in the ATS your
  team already works in. Nothing was submitted here."*
- Link-out route: **"Hands off to your ATS"** → *"With this route the search, the map, the clean job data
  and the campaign pages are all still Aplify — but the apply button sends the candidate to the job's page
  in your ATS, where they apply through the form you already run. Nothing changes about your existing
  process."* Plus the honest cost, quoted in §2.

**9. AI enrichment.** *AI enrichment* → *"ATS descriptions were written to satisfy a process. Aplify
rewrites every one to your tone of voice on import — try it."* A before/after the reader triggers:
*Straight from the ATS* vs *Published by Aplify*, headlined **"Written for candidates, not for the file"**.
Then the guardrail block: **"Works on adverts, not on people"** with the two sentences from §6.9, and four
supporting facts: *Your EVP and tone of voice · Consistent job families · Bulk reclassify and regenerate ·
Every AI decision editable.*

**10. Recruiter dashboard.** *For your recruiters* → **"One place to action all of it"** → *"Applications
and event registrations arrive in the same dashboard, on separate tabs, and move through a status workflow
your team controls — or, with native ATS integration, they bypass it entirely and land in the system you
already use."* The reader must be able to filter it, open a candidate, change a status and export the
result. **After** it, never before: **"Or skip the dashboard and keep the workflow you have"** →
**"Native ATS integration"** → *"Where native integration is in place, applications are pushed straight
into your ATS as they arrive. No export step, no second system for your team to learn — they carry on
working exactly as they do now, on cleaner jobs and with the drop-off already solved upstream."* Then the
Eploy sentence from §5.

**11. Security & GDPR.** *Security & GDPR* → **"Candidate data, encrypted field by field"** → the
"not just HTTPS" line from §1. Two columns: *How it's protected* and *What candidates control*, contents in
§1.

**12. Integrations.** *Integrations* → **"Two ways to put it on your site"** → *"Embed the whole experience
on an existing WordPress career site without writing code, or build your own front end against the API.
Both run off the same cleaned data."* Two halves: *"Install it and the pages build themselves"* and
*"Or build your own front end"*, contents in §1.

**13. Roadmap.** *Roadmap* → **"Being built next"** → *"Not yet available — listed so you know where the
platform is going before you commit to it."* The two items from §1, and nothing else.

**14. Proof.** *Application drop-off rate* → **85% → 30%**, captioned *Before Easy Apply* / *After Easy
Apply*, with the Brandon Trust logo. This is the site's single hardest asset and V1 gives it a full screen
with nothing else on it. Keep that discipline.

**15. Testimonials.** *In their words* → **"The people behind the numbers"** → *"Recruitment leaders using
Aplify on their own career site or campaign landing page, in their own words."* The three quotes from §5.
Recorded voiceovers exist for all three.

**16. Closing CTA.** **"See it against your own feed"** → *"We'll walk you through Aplify using your actual
job data rather than a sandbox — so you can see what your feed looks like cleaned, and what your candidates
would get."* Primary action *Request a demo*; V1 also offers *Read it again* as a secondary.

**17. Footer.** Incomplete in V1. Needs designing from scratch.

### Navigation

Seven items, each with a one-line explainer visible without hovering (a touch device never hovers, and one
list that reads the same everywhere beats two states):

| | Label | Explainer |
|---|---|---|
| 01 | Platform | Ingest from any ATS, normalise it, publish it live |
| 02 | How it works | From your feed to a live application in four steps |
| 03 | Job search & Easy Apply | Grid, list and map — apply without leaving the page |
| 04 | AI enrichment | Adverts rewritten in your tone of voice, in batches |
| 05 | Recruiter dashboard | Applications, registrations and status in one place |
| 06 | Integrations | WordPress plugin, jobs API, native ATS integration |
| 07 | Security | Field-level encryption, EEA hosting, role-based access |

Two corrections to carry into V2:
- **02's explainer says "four steps"; the section has six.** Fix one or the other.
- **This order does not match the page.** The page runs How it works → Platform → … → Security →
  Integrations. Either the nav follows the page or the page follows the nav, but the two disagreeing is a
  bug a reader will feel without being able to name.

---

## 9. The buyer's journey, and the objections in order

The page is one continuous sales conversation. These are the objections as they actually arise, and the
order matters more than the section names:

1. *"What is this?"* → the hero's position, then the two-halves structural claim.
2. *"Is my feed really that bad?"* → show it. The fragmented-feed fragments do more than an adjective.
3. *"Fine, but what do candidates actually get?"* → let them use it. Search it, filter it, apply through it.
4. *"Does the AI make things up?"* → the guardrail, before they ask twice.
5. *"Does my team have to learn a new system?"* → the dashboard, then permission not to use it.
6. *"Where does our candidate data go?"* → security depth, unprompted.
7. *"Can we even install it?"* → the WordPress plugin answers this in one sentence.
8. *"Does it work?"* → 85% → 30%, and three named people saying so.
9. *"What's next / are we buying something half-built?"* → the roadmap, honestly scoped.
10. *"What happens if I ask?"* → a demo against their own feed, not a sandbox.

Note that 3 and 5 are the two moments where the reader must **do** something rather than read something.

---

## 10. Copy hierarchy and house style

**Every section follows the same ladder.** Consistency here is what holds a long page together:

1. **Eyebrow** — two or three words, small, uppercase, wide-tracked, the quietest thing on screen. Names
   the section. *Where it sits · How it works · For your candidates · AI enrichment · For your recruiters ·
   Security & GDPR · Integrations · Roadmap · In their words.*
2. **Headline** — one line, **sentence case**, large, tight tracking. States a position or a promise, never
   a category. *"Between your ATS and your candidates"*, not *"Platform overview"*.
3. **Standfirst** — one or two sentences, ~34rem measure. Explains the headline and earns the detail below.
   Optional but usual.
4. **Body / fact lists** — short single-line facts, hairline-separated, three to five per group. These are
   scannable specifics, not prose. Fragments, no terminal punctuation.
5. **Caption** — smallest type, muted, for anything illustrative. Mandatory on demos (§6.7).

**Voice.**
- Second person, addressed to the recruiter: *your feed, your candidates, your tone of voice, your team*.
- **Plain, declarative, specific.** The product's virtue is that it removes fuss, so the writing shouldn't
  add any. *"Fix what the feed got wrong"* — not *"intelligent data optimisation"*.
- **British English.** UK regions, postcodes, £ salaries.
- **Verbs over nouns** in headlines: *Publish it on your own site*, *Let candidates finish without leaving*.
- **Name the cost of a trade-off** rather than smoothing it. The link-out copy is the model.
- No exclamation marks. No "revolutionary", "seamless", "game-changing", "unlock", "empower". No sentences
  that would survive being said about a different product.
- Numerals for stats and stage numbers; words otherwise.
- Em dashes are used freely and are part of the voice.

**Type-weight convention worth carrying over:** body copy is full-strength, and only the small uppercase
eyebrows are muted. V1 started with grey body copy and it read as tentative.

---

## 11. What must be demonstrable, not described

A product principle rather than a design one, and the thing V1 got most right: **the page lets the reader
use the product rather than look at pictures of it.** Four things were built as working demos, and each
earns its space by answering an objection no screenshot can:

- **The job search** — three views of one filtered set, with the apply-route switch changing every button.
  Proves the search is real and makes the three configurations concrete.
- **Easy Apply, end to end** — pre-qualification, gate, form, confirmation, all in place, never in an
  overlay. *An overlay implies somewhere else, and "no redirect" is the entire claim.* If V2 keeps one
  interactive thing, keep this one.
- **The AI rewrite** — a before/after the reader triggers, on two real-shaped adverts.
- **The recruiter dashboard** — filter, open a candidate, change a status, watch the timeline write itself,
  export the filtered set as a genuine file. Answers "will my team cope with this" directly.

All four are bound by §6: illustrative captions, invented people on `example.*`, real UK geography, nothing
submitted anywhere, and no depiction of anyone else's ATS.

---

## 12. Conversion model

**One conversion, everywhere: book a demo.** No trial, no pricing page, no gated content, no newsletter.

What the demo promises, and the promise is the differentiator: *we run it against your actual job data, not
a sandbox — so you see your own feed cleaned, and what your candidates would get.* Aplify can do this
because ingesting an arbitrary feed is the product. Very few competitors can make the same offer, and V2
should keep it central rather than reducing the CTA to "Contact us".

Fields V1 asks for: name, email, company, current ATS. **Current ATS is the qualifying question** — it
determines which of the three configurations the conversation is about. Keep it.

The demo request is currently unwired (it composes an email). V2 will need a real destination, and whatever
it is should not add friction to a four-field form.

---

## 13. What V1 established, and what is open

**Earned its place — worth keeping in some form:**
- The message spine of §4 as one continuous, uninterrupted stretch before any product detail.
- Working demos over screenshots (§11), especially Easy Apply.
- The 85% → 30% figure given a full screen to itself.
- Naming the cost of the link-out route instead of smoothing it.
- The AI guardrail as prominent copy.
- Security treated as a selling section, not a compliance footnote.
- One CTA, and a demo offer that promises the buyer's own data.
- A single continuous experience rather than a deck of independent panels — however V2 achieves that.

**Deliberately open for V2:**
- Single page vs multiple pages. The pillars in §7 are natural page boundaries if V2 splits.
- All visual and motion direction. V1's answer was a scroll-driven scene with sound; that is one option, not
  a requirement, and it carries real costs (asset weight, a heavy first load, mobile complexity).
- Whether ambient sound belongs at all. V1 gates the page behind a click-to-enter in order to have it,
  which is a real conversion cost that was never measured.
- The footer, which was never built.
- Nav structure — see the two corrections in §8.

---

## 14. Re-verify before launch

Two facts on the site came from the client rather than from the product, and neither has been re-confirmed:

1. **That the Eploy integration is the automated direct push.** Earlier copy said that was still being
   built. This is the claim most likely to be wrong in the most damaging direction.
2. **That the invented pre-qualification questions in the Easy Apply demo are representative** of what
   clients actually ask.

Also outstanding:
- The ambient audio track in V1 is a placeholder and must be licensed or original before any launch that
  keeps sound.
- The demo form has no real destination (§12).
- No third-party integration other than Eploy may be named until the client confirms it.

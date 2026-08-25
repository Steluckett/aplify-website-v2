# Aplify - copy deck v3

**APPLIED TO THE SITE, 2026-08-25.** This deck was written, reviewed, rewritten
and then built. It is now a record of what is live on 3100 rather than a
proposal — but it drifts from `src/data/content/` the moment either changes, and
**the modules are the source of truth**.

Every user-facing string, in the new page order, against the module each one
lives in. Written to the Brand Playbook v3, the Homepage Strategy Rationale v2
and the "What Makes People Stop Scrolling" addendum.

---

## What changed, and why

**The argument is inverted.** The page used to open on the feed problem, which is
the *recruitment operations* buyer's concern. §3 names the talent acquisition
lead as the primary audience and their question is "will more people finish?" So
the page opens on completion, makes Easy Apply the payoff, and uses job data as
what makes Easy Apply perform better rather than as the opening act. This
supersedes V2_HANDOVER §4's ordering.

**Four bands are new:** `#friction`, `#cost`, `#origin` and `#google`.

**`#payoff` was deleted** on 2026-08-25. Section 6 below is kept for the record
but is NOT on the site: it claimed what `#candidates` demonstrates two bands
later, with the same chips, and what `#friction` had already named as problems.

**Three bands are cut:** the platform bento, the testimonials wall, and the
roadmap. All three quotes survive and move to the section each one proves.

**One band is slimmed:** `#brand` drops its three assertion cards.

## Two facts that contradicted V2_HANDOVER — now amended in it

Both are Stephen's, both confirmed in conversation, and **both were written into
V2_HANDOVER §1 on 2026-08-25**, dated and attributed, with the superseded
wording preserved beneath. Recorded here so nobody later reads an old copy of
§1, finds the opposite, and assumes the page invented it.

1. **Google for Jobs is live.** §1 had it under *"Roadmap - not yet available"*.
   Confirmed 2026-08-25 as shipped and working, with JSON-LD on every published
   job. It is now a shipped capability in §1, and band 13 is built on that.
   Note this is the SECOND capability filed as forthcoming when it had shipped,
   after native ATS integration. §6.9 now records the pattern.
2. **The brand kit is configurable well beyond §1's "colours, imagery and
   fonts"** - type, corners, shadows, spacing, photography and logo, in the apply
   flow and the dashboard. Confirmed 2026-08-24.

With the roadmap band gone, §5's *"exactly two roadmap items"* no longer binds
anything on the page. Feed-level reporting is off the site entirely.

## Rules this deck follows

1. **No em dashes in prose.** Single hyphen, comma or full stop. En dashes stay
   in numeric ranges (£24,000–£26,000). Middots (·) are unaffected.
2. **UK English throughout.**
3. **Plain English over software jargon.** Swept the whole deck. Out: *surface*,
   *system of record*, *ingest*, *configuration not development*, *normalised*,
   and *PII* in a marketing chip. Kept: *EVP*, *syndicate*, *workflow*,
   *pre-qualification*, *API* in a spec chip. Those are recruitment's and IT's
   own words, not software marketing.
4. **"Career site or campaign landing page" is relaxed.** It appears where
   deployment is genuinely the point. Down from thirteen uses to three.
5. **§5 and §6 still bind.** One statistic, three quotes, nothing invented, AI
   guardrail wording untouched.
6. **No captions.** The two in-demo disclosures stay.

---
---

# The page

## Metadata

`src/lib/site.ts`, `src/app/page.tsx`

| | |
|---|---|
| Title | Aplify - The recruitment experience candidates actually finish |
| Description | You don't have a traffic problem, you have a completion problem. Aplify puts search, application and event registration on your own career site, so candidates never get handed off to an ATS. |

> **The share card is painted from this description**, so a change here carries
> through to the OG image. The title separator is now a hyphen; say if you'd
> rather a site-name separator was exempt from rule 1.

---

## Navigation

`site.ts` → `nav`

**Why they leave · Easy Apply · Better data · Dashboard · Security**

CTA: **Book a demo**

| Label | Goes to |
|---|---|
| Why they leave | `#friction` |
| Easy Apply | `#payoff` |
| Better data | `#data` |
| Dashboard | `#dashboard` |
| Security | `#security` |

> Fixes the outstanding nav problem. The old labels named features while the page
> argued a case. Seven bands have no nav entry, which is correct: a nav is a
> route through, not a table of contents.

---
---

# Act one - recognition

*Make them feel understood before we sell anything.*

## 1. Hero

`site.ts` → `hero` · `#home`

**Heading**
> You don't have a
> **traffic problem**

*(mobile: You don't / have a traffic / problem)*

**Standfirst**
> You have a completion problem. You've already paid to get people as far as Apply. Everything after that is where you lose them for good.

**Button** Book a demo

> The second line takes the gradient tip, so "traffic problem" is what the eye
> lands on.
>
> **Measured on 3100 at 1512.** 136 characters, the same as the string it
> replaced. It sets to exactly **three lines** at 634 / 614 / 210px inside the
> 640px box, so the hero's documented 40rem exception to `--measure-lead`
> still holds. That exception is only valid while it stays three lines -
> re-measure if this copy changes.

---

## 2. Why they leave

`site.ts` → `friction` **(new)** · `#friction` · white band

**Eyebrow** Where they go

**Heading**
> Nobody has ever thanked you
> for making them create
> **another password**

*(mobile: Nobody has ever / thanked you for making / them create / another password)*

**Standfirst**
> It's never one thing. Somebody has to find the job, still want it after reading it, then get through applying for it. Three places to lose them, and most careers sites manage all three.

**Eight cuts** - numbered cards, four across, no chips

**01 The search**
> They're on your site and can't find the job. Or they find it three times, under three different titles, and can't tell which one is real.

**02 The advert**
> Written to fill a field in your ATS, not to persuade anybody. Duties, essential criteria, a paragraph about your values, and nothing that says why the job is any good.

**03 The redirect**
> They found the job on your site. Now they're on a different domain in somebody else's brand, wondering whether they're still in the right place.

**04 The account**
> Before they can apply they need a username, a password and a confirmation email. For a job they haven't got yet.

**05 The form**
> Twenty-odd fields asking for the dates, the education and the job history that are already on the CV they uploaded two screens ago.

**06 The handset**
> Most people apply on a phone, often on a break. A form built for a desktop is a form they'll finish later, which means never.

**07 The dead end**
> They fill in all of it and find out at the end that they don't have the right to work, the licence or the hours. So does your recruiter.

**08 The silence**
> They press submit and hear nothing at all. That isn't a lost application, it's a lost opinion of you.

> **Widened from six to eight after review.** *The search* and *the advert* are
> new. The six original cuts were all apply-process, which contradicted the
> point: the journey starts before the form. It also means act three answers a
> cut the reader already recognised, exactly the way act two does.
>
> **No numbers.** They implied a ranking these eight do not have. The six
> stages later on ARE a sequence and keep theirs.
>
> **The layout, third build, measured against workable.com.** Two card shapes
> only — thirds are square, halves are letterbox — plus three pictures that
> carry nothing but the picture:
>
> ```
> ┌──────────── the scene ─────────────┐   picture, full width
> │ search   │ advert   │ redirect     │   thirds, square
> │ account  │                         │   the picture takes its
> │ form     │    the sign-up wall     │   height from the stack
> │ handset  │ dead end │ the silence  │   thirds, square
> ```
>
> Every card is the same square-ish shape and there are **two pictures, not one
> per idea**. A third closed the band beside "The silence" and was cut: a
> picture next to every point is how a bento turns back into a list, and
> closing on a complete row lands better than closing on a pair.
>
> The pictures carry no captions, so **adjacency is the only thing labelling
> them**: the wall sits beside *account* and *form*. Reorder those two and the
> picture stops making sense.

---

## 3. What it costs

`site.ts` → `cost` **(new)** · `#cost` · tinted band

**Eyebrow** What it costs

**Heading**
> You already paid
> **for that candidate**

*(mobile: You already / paid for that / candidate)*

**Standfirst**
> Every drop-out was bought and paid for. The advertising, the campaign, the site, the time your team spent getting somebody that far. The last two minutes undid all of it.

**The ledger** - a statement rather than three more cards. Stephen's pick.

> **One candidate, itemised**
>
> | | |
> |---|---|
> | Advertising that put the job in front of them | Paid |
> | The campaign that made them click | Paid |
> | The careers site that held their attention | Paid |
> | Your team's time getting them that far | Paid |
> | **The application** | **Abandoned** |

The last row takes a heavier top rule, the way a total does on a real statement,
and it is the only row in full ink. Everything above it is quiet, because
everything above it went to plan.

**Three cards beneath it**

**You paid for them twice**
> The spend that got somebody to the job is written off the moment they leave, and you spend it again next month getting somebody else to the same form.

**Your employer brand takes the hit**
> Every vacancy is a first impression. If applying feels like admin, that's the impression, and it lasts a lot longer than the campaign did.

**The best ones go first**
> The people who abandon aren't a random sample. Strong candidates have other options and less patience, so they're the ones you lose soonest.

> **No statistics here, deliberately.** §6.1 permits none, and §5's only number is
> Brandon Trust's, which stays paired with *application drop-off rate* in band 10.
> A figure here would read as an industry benchmark.

---

## 4. Why we built it

`site.ts` → `origin` **(new)** · `#origin` · white band, slim

**Eyebrow** Why we built it

**Heading**
> We got tired of
> **the software too**

*(mobile: We got tired / of the / software too)*

**Standfirst**
> Aplify wasn't built by software people trying to understand recruitment. It was built by recruitment people who got tired of the software. We ran the campaigns, hit the numbers, then watched the application form hand it all back.

> Nothing else in this band. It's the hinge: three bands of their pain, then the
> line that says it was ours first, then the answer. The playbook's One Sentence
> verbatim in the middle.

---
---

# Act two - the answer, and the payoff

## 5. Where it sits

`site.ts` → `siteMap` · `#where-it-sits` · tinted, **bleeds into band 6**

**Eyebrow** Where it sits

**Heading**
> Your ATS was never
> **going to do this bit**

*(mobile: Your ATS was / never going / to do this bit)*

**Standfirst**
> One side of Aplify never meets a candidate. The other is everything a candidate ever meets. Both run off the same clean job data, and nothing you already run gets replaced.

**Artwork** unchanged.

> §1's own words: *"What the ATS is bad at is the two ends."* The headline says
> that without insulting the system they're keeping. §7's two-halves sentence,
> which it calls *"the sentence that makes the product legible in one read"*,
> keeps a prominent position in the standfirst.
>
> **Build note:** this band bleeds. The section below must carry `relative` or
> the artwork paints over the white instead of under it. See inventory 1.3.

---

## 6. The payoff

`site.ts` → `payoff` · `#payoff` · white, **must carry `relative`**

**Eyebrow** The last click

**Heading**
> They apply where
> **they found the job**

*(mobile: They apply / where they / found the job)*

**Standfirst**
> No redirect. No account, no password, no coming back to a confirmation email to finish a form they'd already half done. Search, apply and register all happen where the candidate already is.

**Chips** On the page · No ATS redirect · No account · Anonymous apply · Field-level encryption

---

## 7. Four steps

`site.ts` → `capabilities` · `#candidates` · white, pinned card stack

**Eyebrow** For your candidates

**Heading**
> Four steps,
> **no dead ends**

**Standfirst**
> Every one of these is somewhere people usually stop. This is what it looks like when they don't.

**01 Find the right job**
> Search every live role, then narrow it by region, salary or contract. Somebody who only knows which town they can get to can search by postcode and radius, or use the map. For shift work that's often the only filter that matters, because the job has to be reachable at six in the morning.
>
> Keyword and salary filtering · Postcode search with radius · Interactive map

**02 Apply without leaving**
> The form is on the page, not behind a redirect. Pre-qualification runs first, so anyone who can't be offered the role finds out in two questions instead of after twenty minutes of typing. And every field has to earn its place, because each company picks the ones it actually needs.
>
> No ATS redirect · No account to create · Pre-qualification first

**03 Register for events**
> Open days and assessment centres get the same flow on their own tab, with places tracked and attendance recorded against the candidate afterwards. Your open day stops being a spreadsheet on somebody's desktop that only they know how to read.
>
> Own tab, same flow · Places tracked · Attendance recorded

**04 Kept informed**
> Every status change sends a branded email in your own voice, so nobody is left wondering whether a human ever opened it. Silence is the most common reason people give for not applying to an employer twice.
>
> Branded templates · Every status change · Your tone of voice

---

## 8. The job search

`site.ts` → `demos.jobSearch` · `job-search.ts` · `#job-search`

**Eyebrow** See it working

**Heading**
> Go on, apply
> **for something**

*(mobile: Go on, / apply for / something)*

**Standfirst**
> Three views of one filtered set. The switch above decides where somebody goes when they press apply, and it's set once per client rather than per candidate. Move it and every button below changes with it.

**The apply-route switch**
- **Easy Apply** - They finish on the page they started on
- **Link to your ATS** - They leave, and your workflow is untouched

**When "Link to your ATS" is chosen** - *Hands off to your ATS*
> With this route the search, the map, the clean job data and the campaign pages are all still Aplify. The apply button just hands the candidate to the job in your ATS, where they apply through the form you already run. Nothing about your existing process changes.
>
> It also costs you candidates. A redirect, and usually an account to create, is exactly the friction Easy Apply removes. So this is the honest middle ground: your workflow untouched, at a price paid at the last step.

> **This headline goes further than we discussed** - it's an instruction rather
> than a description. §11 says the page should let the reader use the product
> rather than look at pictures of it, and an invitation does that better than a
> label. Say if it's too flippant and I'll fall back to "The search your
> candidates get".

---

## 9. Your brand, not ours

`brand-kit.ts` · `#brand` · **slimmed, three assertion cards removed**

**Eyebrow** Your brand, not ours

**Heading**
> It should look like you,
> **not like us**

*(mobile: It should look / like you, / not like us)*

**Standfirst**
> Colours, type, corners, shadows, spacing, photography, your logo. The apply flow and the dashboard your team works in both read the same settings. Set it once, then drag the slider.

> "Surface" removed, per the jargon rule. The three cards go: they asserted the
> apply flow, the dashboard and mobile-first while sitting next to a working
> demonstration. The first two are now named in the standfirst; mobile-first is
> better proved by the demo being a phone.
>
> ⚠️ Wider configurable list is unsourced until the handover is widened.

---

## 10. What that was worth

`site.ts` → `proof` + two of `testimonials.quotes` · `#proof` · white

**The figure** - unchanged

> **Application drop-off rate**
>
> **30%**
>
> 85% Before Easy Apply → 30% After Easy Apply
>
> Brandon Trust

**Two quotes below it. Verbatim.**

> Aplify has helped us significantly reduce application drop-out by making the whole process quicker and more accessible. More candidates are now completing their applications, giving our recruitment team a stronger pool of people to engage with.
>
> **Louise Mitchell**, Brandon Trust

> Aplify makes applying for a role feel quick, simple and intuitive. Candidates can complete their application without navigating a long or complicated process, creating a much more positive experience from the very first interaction.
>
> **Sammi Yates**, HC-One

> Louise proves completion, Sammi proves the candidate experience. Both are about
> what act two just argued. Ben Hopwell proves the dashboard is usable and moves
> to band 15. §5 is explicit that the three are not interchangeable.

---
---

# Act three - what decides who arrives

## 11. Better data

`site.ts` → `story` · **`#problem` renamed `#data`** · white

**Eyebrow** Better data

**Heading**
> Better jobs start
> **with better data**

**Standfirst**
> Easy Apply converts the people who get there. What decides whether they get there at all is the advert, and most feeds turn up with the same region spelled three different ways. Bad job data doesn't just look untidy, it costs trust.

**The comparison table** - unchanged

| Straight from the ATS | Published by Aplify |
|---|---|
| NURSE — Bristol, Bristol, BS1 · SOUTH WEST · 24000-26000 | Nurse — Bristol, BS1 · South West · £24,000–£26,000 |
| Support Worker (Days) · Southwest · £24k-£26k | Support Worker (Days) · South West · £24,000–£26,000 |
| HCA - weston super mare · S.W. · Up to £26,000 DOE | Healthcare Assistant — Weston-super-Mare · South West · Up to £26,000 |

> The standfirst sets up the table directly underneath: SOUTH WEST, Southwest and
> S.W., one under the other. Setup and payoff with no gap between them.
>
> **The em dashes in this table stay.** They are how job titles actually appear
> in a feed, on both sides. Rule 1 covers our prose, not sample data imitating
> somebody's ATS export.

---

## 12. AI enrichment

`site.ts` → `demos.aiEnrichment` · `ai-rewrite.ts` · `#ai-enrichment` · white

**Eyebrow** AI enrichment

**Heading**
> Nobody ever applied
> **for a bullet point**

*(mobile: Nobody ever / applied for / a bullet point)*

**Standfirst**
> Your ATS was built to store a job, not to sell one, so the description reads like an internal document. Because that's what it is. Aplify rewrites every one in your tone of voice on the way in, and invents nothing.

**Demo labels** Straight from the ATS · Published by Aplify · Rewrite with Aplify · Show the originals

**In-demo disclosure** - stays, it sits with the demo
> Every fact in the rewritten version is traceable to the original. Nothing is added.

**The guardrail - §6.8, load-bearing. Quoted phrases untouched.**

*Works on adverts, not on people*
> Screening, ranking and selection stay entirely with your team. The AI never touches a candidate decision.

> It rewrites what's there. It doesn't invent responsibilities, benefits or requirements your feed didn't contain.

> **One punctuation change, flagged.** The first sentence had an em dash where
> there is now a full stop. §6.8 quotes *"Works on adverts, not on people"* and
> the *"It rewrites what's there"* sentence verbatim. The connecting line is not
> a quoted string, so the change is punctuation only and no word has moved.

**Capability chips** Your EVP and tone of voice · Consistent job families · Bulk reclassify and regenerate · Every AI decision editable

---

## 13. Google for Jobs

`site.ts` → `google` **(new)** · `#google` · tinted

**Eyebrow** Google for Jobs

**Heading**
> Most job hunts don't
> **start on your site**

*(mobile: Most job hunts / don't start / on your site)*

**Standfirst**
> They start on Google. Every job Aplify publishes carries the structured data Google reads, with the salary, the location and the contract type where it expects to find them. No separate feed, and nothing for anyone to remember to switch on.

**The demonstration** - two cards side by side, our own output on both sides.

*What a person reads* (white card): Healthcare Assistant · Northbank Health ·
Weston-super-Mare, South West · Up to £26,000 · Permanent, full time · Posted 3
days ago · Closes 14 March

*What Google reads* (Forest, ground 09): eight lines of JSON-LD, traceable
field-for-field to the card beside it, footed with "Written on publish, from the
record on the left."

**Three supporting lines**
- **On every job, automatically** - Written when the job publishes, on every role, with no per-job step for anyone to forget.
- **The fields Google looks for** - Title, location, salary, contract type and closing date, taken from the data Aplify has already cleaned.
- **The same job, two ways in** - It stays on your own site in your own branding. Google's jobs results are an extra route to it, not a replacement for it.

> **Placed here on purpose.** It is what clean, structured data buys you, so it
> reads as the payoff of the two bands above rather than as a feature.
>
> ⚠️ **The wording is "carries the structured data Google reads", never "gets you
> into Google".** Nobody can promise Google will show a job, and a claim like
> that is the one thing on this page a technical buyer could falsify in a
> minute. Do not let this drift into a ranking promise.
>
> ⚠️ V2_HANDOVER §1 still lists this as roadmap. Confirmed live 2026-08-25.
> **Update §1 before this ships.**

---

## 14. Six stages

`site.ts` → `howItWorks` · `#how-it-works` · tinted

**Eyebrow** How it works

**Heading**
> Six stages.
> **One of them needs you.**

*(mobile: Six stages. / One of them / needs you.)*

**Standfirst**
> Your ATS produces a feed. Aplify does the rest: cleaned, published, applied to and sent back out. The only stage that needs a person is the one where your recruiters decide who to talk to.

**01 Collect** - *Pull jobs straight from your ATS*
> XML, JSON or CSV, from any number of sources, on a schedule or whenever you ask for it. Mapping a new field is a setting, not a project.
>
> Multi-format import · Configurable mapping · Authenticated feeds

**02 Clean** - *Fix what the feed got wrong*
> Salaries written the same way every time, duplicated text stripped out of titles, twelve spellings of a region mapped down to one. Then the AI rewrites each description in your tone of voice.
>
> Salary and region tidied · Rewritten to your EVP · Sorted into job families

**03 Publish** - *Put it on your own site*
> Full-text search, postcode search with a radius you set, an interactive map and a page per job, all on your career site or campaign landing page.
>
> Keyword and salary filtering · Postcode and map search · One campaign to a national board

**04 Apply** - *Let people finish without leaving*
> Applications and event registrations happen on the page. Each company controls which fields appear, and pre-qualification stops anyone ineligible before the full form rather than after it.
>
> On-page Easy Apply · Fields you choose · Pre-qualification first

**05 Manage** - *The stage that needs you*
> Your recruiters triage through a status workflow they control, with source tracking on every submission so paid social, job boards and QR codes can be compared honestly.
>
> Submitted to accepted · Source tracking · Branded candidate emails

**06 Syndicate** - *Send the clean feed back out*
> Once a feed is clean it's an asset. Aplify tailors it per destination and publishes it as an XML feed behind an API key.
>
> Custom outbound mapping · Protected by API key · Errors stripped before they leave

> **Fixed after review.** The old standfirst had a feed "landing in your inbox",
> which is not a thing that happens to anybody. "Ingest" and "configuration, not
> development" are gone with it.
>
> **This band absorbs the cut bento.** Its four claims were: feeds cleaned on
> every import (= 02), pulled from any ATS (= 01), sent back out clean (= 06),
> and rewritten never invented (= band 12's guardrail, said better there).
> Nothing is lost.

---
---

# Act four - improve

## 15. The dashboard

`site.ts` → `demos.dashboard` · `dashboard-data.ts` · `#dashboard`

**Eyebrow** For your recruiters

**Heading**
> One list, not
> **four inboxes**

*(mobile: One list, / not four / inboxes)*

**Standfirst**
> Applications and event registrations arrive in the same place and move through a status workflow your team controls. Or, if you'd rather your recruiters never had to learn another system, native ATS integration sends them straight into the one they already use.

**Ben Hopwell's quote, below the demo. Verbatim.**

> The Aplify dashboard is incredibly straightforward to use. Our recruitment team can quickly review and manage applications without unnecessary complexity, helping everyone work more efficiently and keep candidates moving through the process.
>
> **Ben Hopwell**, Cygnet Group

> The last clause is both the wry beat and §3's *"you may not need the
> dashboard"* message, which the page had been making flatly. This standfirst is
> the longer variant that has been sitting unrendered in `dashboard-data.ts`;
> rendering it here and deleting the duplicate closes the §5 drift risk.
>
> **Build note:** the quote card is `wash-soft`, a 10%-alpha gradient that needs
> white beneath it. This band is currently tinted, so either the band moves to
> white or that single quote gets a different treatment.

---
---

# Act five - reduce the risk

## 16. Integrations

`site.ts` → `integrations` · `#integrations`

**Eyebrow** Integrations

**Heading**
> Keep the ATS.
> **Lose the friction.**

*(mobile: Keep the ATS. / Lose the / friction.)*

**Standfirst**
> Nothing you already run gets replaced and nobody has to work anywhere new. Aplify takes over the two ends your ATS was never much good at, and hands both back clean.

**Lead**
> Reading from your ATS works with any of them, in whatever format it produces. Sending applications back is built per system, and if yours isn't wired up yet, that's a piece of work we do rather than a queue you join.

**List**
- Reads XML, JSON or CSV from any ATS
- Native integration live today with Eploy
- Applications pushed straight into your ATS
- Or triaged in the Aplify dashboard
- Or handed to the form you already run
- Clean feeds sent back out to job boards, behind an API key
- Branded candidate email at every stage

> **The Eploy sentence is gone; Eploy survives as one line in the list.** You
> asked to remove it, and my push-back stands: it is the only concrete, named,
> live integration on the site, and *"works with any ATS"* is what every vendor
> claims. One named real system is what makes the rest credible. Delete the line
> if you'd still rather it went.
>
> **The claim is split on purpose.** §1 says reading a feed works with any ATS,
> any format, but pushing applications back is *"live today with Eploy; other
> systems are added per client"*. Claiming any-ATS flatly in both directions
> would over-promise the return leg, which is the direction §6.9 says V1 got
> wrong once already.

---

## 17. Security & GDPR

`site.ts` → `security` · `#security` · **must be white**

**Eyebrow** Security & GDPR

**Heading**
> Built for data
> **you cannot lose**

**Standfirst**
> Candidate data is the most sensitive thing a recruitment team holds, and it's treated that way at every layer. For most organisations it ends up safer here than where it sits now.

**Four cards**
- **Encrypted field by field** - Every piece of personal information is encrypted on its own, not just the database it sits in. Recruiters can still search it, because the index is secure rather than plain text.
- **Scoped to your company** - Every query is scoped by company. An out-of-scope record doesn't come back empty, it doesn't resolve at all.
- **Anonymous by default** - Candidates apply without creating an account, so there's no password to lose and nothing to leak.
- **Retention you control** - Retention windows and deletion are set per company, and candidates export or delete their own data through a public form.

> **No humour in this band, deliberately.** It is aimed at the IT and data
> protection stakeholder, who §3 calls *"rarely the buyer, frequently the
> blocker"*. A wry line here reads as not taking it seriously, and this section
> unblocks deals.
>
> The first card now carries §1's own line about a secure index rather than plain
> text, which was the best sentence in the handover and was going unused.

---

## 18. Close

`site.ts` → `footer` · `#contact`

**Heading**
> See it run on
> **your own jobs**

*(mobile: See it run / on your / own jobs)*

**Standfirst**
> Not a sandbox and not a slide deck. Book a demo and we'll run Aplify against your actual feed, so you can see your own jobs cleaned, published and applied to.

**Button** Book a demo

**Columns**
- **The problem** - Why they leave · What it costs · Better data
- **The product** - Easy Apply · Job search · AI enrichment · Google for Jobs · Recruiter dashboard
- **Company** - Security & GDPR · Integrations · Contact

**Blurb**
> Built by recruitment people who got tired of the software.

**Email** hello@aplify.co.uk

> §12 fixes one conversion everywhere, and the differentiator is that the demo
> runs on their real feed rather than a sandbox. The footer blurb is the One
> Sentence's second half, so it is the first and last thing anybody reads.

---
---

# Appendix A - demo micro-copy

Interface strings. **Unchanged unless marked.**

## Job search · `job-search.ts`

**Filters** Job title or keyword · Town or city · Use my location · All families · All regions · Search · Clear
**Views** Grid · List · Map
**Counts** {n} jobs found · Showing {from}–{to} of {total} roles · Previous · Next
**Empty state** No roles match those filters. Clear one and the set refills. *(changed)*
**Card actions** Easy Apply · Find out more

**Pre-qualification** - *Step 1 of 2, pre-qualification* *(changed)*
> Pre-qualification runs before the form, so nobody fills one in for a role they can't be offered. Each company writes its own questions.

**If gated** - *This role needs a different answer*
> Rather than take you through a full application that would be turned down, the flow stops here. In the product this is where a candidate is pointed at roles they do qualify for.

**The form** - *Step 2 of 2, your details* *(changed)*
> No account, no password, no returning to an email to finish. Companies choose which fields appear here and in what order.

Fields: Full name · Email address · Phone (optional) · CV upload
CV hint: PDF or Word. Multi-file upload is supported in the product *(changed)*

**§6.7 disclosure - stays. The form looks submittable.**
> A demonstration form. Nothing you see here is sent, stored or read. *(changed)*

**Confirmation** - *That's the whole application*
> Two steps, no redirect, no account, and the candidate never left the page they arrived on. That's the difference the drop-off figure further up this page is measuring. *(changed: "further down" to "further up" - the proof band has moved above this)*

> In the product this application would now appear in the recruiter dashboard for triage, or, where native ATS integration is in place, straight in the ATS your team already works in. Nothing was submitted here.

## Dashboard · `dashboard-data.ts`

**Tabs** Applications · Registrations
**Filters** Search by name... · All statuses · All jobs · All categories · All roles · All sources · Applied from · Applied to · More filters / Fewer filters · Export CSV · Clear filters
**Empty** No applications match those filters.
**Table** Application · Candidate · Job · Status · Source · Applied · Notes
**Statuses** Submitted · Reviewed · Shortlisted · Accepted · Rejected · Withdrawn

**Danger zone** - the product's own wording, unchanged
> Deleting an application permanently anonymises the candidate's personal data. This cannot be undone.

**§6.7 disclosure - stays**
> Sample data. Notes you add here stay in this browser and are gone on refresh.

**Delete** the unrendered `ats` block. It duplicated §5's Eploy sentence.

## Brand kit · `brand-kit.ts`

Phone content unchanged. The slider stays unlabelled; accessible name "Brand style".

---

# Appendix B - site chrome

## Cookie banner

*This website uses cookies*
> We use cookies to keep the site working, learn how it's used and improve what we ship next. Accept everything, reject the non-essential, or pick category by category. See our privacy policy.

Buttons: Accept all · Reject all · Manage preferences

> ⚠️ **The privacy policy link still 404s.** Needs the page, a real external URL,
> or the link removing. Not a copy fix.

## Cookie preferences - unchanged

- **Strictly necessary** - Required for the site to work: sign-in, security, page navigation. These can't be turned off.
- **Analytics** - Anonymised usage stats so we know which pages help and which fall flat. No personal profile is built.
- **Marketing** - Lets us measure ad performance and re-show content you didn't get to finish reading. Opt out anytime.

---

# Appendix C - sample data

Unchanged. §6.5 binds whether or not anything on screen says so.

- **Candidates** (dashboard): Amara Osei, Tom Bailey, Priya Nair, Jack Whitfield, Sofia Marsh, Daniel Okafor, Ella Byrne, Marcus Reid
- **Registrants**: Nadia Kaur, Ben Cartwright, Grace Adeyemi, Oliver Franks, Holly Dunne
- **Job search applicant**: Alex Morgan
- **Employers** (brand kit, unnamed on screen): Northbank Health, Meridian Care, Ashgrove Trust, Halden Group
- **All UK geography is real** (§6.6).

> ⚠️ `jamie.okafor@email.com` is baked into the step 03 and step 04 artwork.
> `email.com` is a live domain and §6.5 requires reserved `example.*`. Those
> steps survive the reorder, so this does not go away. Needs re-exporting.

---
---

# Reference

## Band order and the constraints on it

**As built.** Verified on 3100 at 1512 and 375.

| # | Band | id | Ground |
|---|---|---|---|
| 1 | Hero | `#home` | tint |
| 2 | Why they leave | `#friction` | white |
| 3 | What it costs | `#cost` | tint |
| 4 | Why we built it | `#origin` | white |
| 5 | Where it sits | `#where-it-sits` | tint, **bleeds down** |
| 6 | Four steps | `#candidates` | white, **carries `relative`** |
| 7 | The job search | `#job-search` | tint |
| 9 | Your brand | `#brand` | tint |
| 10 | What that was worth | `#proof` | **white** (quote cards) |
| 11 | Better data | `#data` | tint |
| 12 | AI enrichment | `#ai-enrichment` | white |
| 13 | Google for Jobs | `#google` | tint |
| 14 | Six stages | `#how-it-works` | tint |
| 15 | The dashboard | `#dashboard` | **white** (quote card) |
| 16 | Integrations | `#integrations` | tint |
| 17 | Security & GDPR | `#security` | **white** (pastel cards) |
| 18 | Close | `#contact` | tint |

Three bands are pinned to white and the rest alternate around them:

- **`#security`** — its four pastels measure ΔE 4.3–11.8 on tint against
  7.7–10.4 on white. On the tinted ground they are close to indistinguishable
  from each other and from the page.
- **`#proof`** — two `wash-soft` quote cards, a 10%-alpha gradient that needs
  white beneath it.
- **`#dashboard`** — the third quote card. **This constraint is new.** The band
  was tinted until Ben Hopwell's quote moved into it.

`#platform`'s old must-stay-tinted requirement died with the bento it protected.
One tint pair survives, at 13/14, which is within what the page has always
allowed where constraints force it.

**`#where-it-sits` bleeds into the band below it**, and that only works if the
next section down carries `relative` — in normal painting order a later
sibling's background paints before an earlier sibling's in-flow content, so
without it the artwork sits on top of the white instead of under it. That
`relative` is on `#payoff` now; it used to be on `#problem`, which became
`#data` and moved into act three.

## Playbook lines used, and where

Ten of the twenty truths. Three verbatim as headlines. Past about half the list
the page starts reading as a book of aphorisms rather than as somebody talking.

| Line | Where | How |
|---|---|---|
| Most teams don't have a traffic problem, they have a completion problem | 1 | Headline and standfirst |
| Nobody has ever thanked you for making them create another password | 2 | Verbatim, headline |
| Every vacancy is a first impression of your employer brand | 3 | Adapted |
| Great candidates don't wait around | 3 | Adapted |
| Aplify wasn't built by software people... | 4 | Verbatim, whole standfirst |
| Every form field needs to earn its place | 7, step 02 | Adapted |
| Better jobs start with better data | 11 | Verbatim, headline |
| Bad job data doesn't just look untidy, it costs trust | 11 | Standfirst |
| Your ATS stores jobs. Candidates experience your brand. | 12 | Adapted into the standfirst |
| Keep the ATS. Lose the friction. | 16 | Verbatim, headline |

**Held back:** *"Candidates don't compare ATSs. They compare experiences."* is the
strongest line not used. No natural band in this order, and forcing it would cost
more than it earns. It is the obvious hero for a campaign landing page.

## Where the humour is

Band 2 (cuts 01, 04, 06), band 3 (cards two and three), band 4 (the last clause),
band 8 (the headline, and naming the cost of the link-out), band 12 (the
headline), band 14 (the headline), band 15 (the last clause), and the footer
blurb. Ten beats across eighteen bands, all but three in body copy.

**Band 17 has none on purpose.** Security is aimed at the blocker, not the buyer.

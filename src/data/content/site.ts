/**
 * Copy for the Aurora rebuild.
 *
 * Re-cut from V2_HANDOVER §8 to suit the reference's rhythm: its sections are
 * short and centred, and the handover's are long and left-ranged. The argument
 * is unchanged — the sentences are shorter and the lists have become things
 * you look at rather than read.
 *
 * REWRITTEN 2026-08-25 to the Brand Playbook v3, the Homepage Strategy
 * Rationale v2 and the "What Makes People Stop Scrolling" addendum. See
 * COPY-DECK-V3.md, which is the marked-up source this file was applied from.
 *
 * Three rules bind every string here.
 *
 * 1. NO EM DASHES IN PROSE. Stephen's call: they read as machine-written.
 *    Single hyphen, comma or full stop instead. En dashes survive in numeric
 *    ranges (£24,000–£26,000) because those are typographic rather than a tic,
 *    and the em dashes inside `story.rows` survive because that is sample data
 *    imitating a real ATS export, not our voice.
 *
 * 2. PLAIN ENGLISH OVER SOFTWARE JARGON (playbook, Tone of Voice). Swept out:
 *    "surface", "system of record", "ingest", "configuration, not development",
 *    "normalised", and "PII" in a marketing chip. Kept: EVP, syndicate,
 *    workflow, pre-qualification, and API in a spec chip. Those are
 *    recruitment's and IT's own words, not software marketing.
 *
 * 3. "CAREER SITE OR CAMPAIGN LANDING PAGE" IS NOW RELAXED. §6.2 required the
 *    full phrase every time and this file used to carry it in thirteen places.
 *    Stephen's call, 2026-08-25: "we need to reduce the need to mention careers
 *    site or landing page - that should be obvious - we are going to be problem
 *    solving here and it is less about where it lives but why it should be
 *    used." It now appears where deployment is genuinely the point and nowhere
 *    else. Campaign landing pages are still a separately-sold use case, so do
 *    not delete the remaining three.
 *
 * §5 AND §6 STILL BIND ABSOLUTELY. One statistic, three quotes, nothing
 * invented, and the AI guardrail wording in `ai-rewrite.ts` is untouchable.
 */

/**
 * The nav follows the ARGUMENT, not the feature list.
 *
 * It used to read Platform / How it works / Job search / Dashboard / Security,
 * which named capabilities while the page made a case. A reader could not tell
 * from it what the page was going to say. These five are the spine: the
 * problem, the answer, what feeds the answer, where the work lands, and the
 * objection that blocks deals.
 *
 * Seven bands have no entry and that is correct. A nav is a route through, not
 * a table of contents.
 */
export const nav = {
  items: [
    { label: "Why they leave", href: "#friction" },
    { label: "Easy Apply", href: "#candidates" },
    { label: "Better data", href: "#data" },
    { label: "Dashboard", href: "#dashboard" },
    { label: "Security", href: "#security" },
  ],
  ctaLabel: "Book a demo",
  ctaHref: "#demo",
};

/**
 * The hero states the READER'S problem, not ours.
 *
 * The addendum's first rule: "The biggest mistake SaaS websites make is
 * introducing themselves too quickly. Don't start with Aplify. Start with the
 * reader's reality." The old hero ("More candidates, less friction") led with
 * the product and spent its standfirst on where things render.
 *
 * This one reframes the category before the reader has decided what they are
 * shopping for, which is the addendum's second rule. The playbook truth behind
 * it: "Most recruitment teams don't have a traffic problem. They have a
 * completion problem."
 *
 * The SECOND line takes `grad-tip`, so "traffic problem" is the phrase the eye
 * lands on. Keep the payload on the last line if this is ever re-broken.
 */
export const hero = {
  /** Explicit line breaks — the heading engine sets each line `nowrap`.
      Rewritten 2026-08-29 (Stephen: the hero must reference candidates or
      recruitment) — adapted from playbook truth #24, "Your careers site
      works hard to get candidates to Apply. Don't lose them there." */
  lines: ["You got candidates to Apply.", "Don't lose them there."],
  linesSm: ["You got", "candidates to", "Apply. Don't", "lose them there."],
  /* The standfirst lands the headline: names the exact loss point, in the
     playbook's own phrase ("this is the point candidates quietly
     disappear"). The hero's 40rem measure is a DOCUMENTED EXCEPTION to
     --measure-lead that only holds while this sets to exactly three lines —
     see the note in hero.tsx. Re-measured 2026-08-29 after this rewrite. */
  standfirst:
    "The advert worked. The careers site did its job. Then the form asked them to create an account, and this is the point candidates quietly disappear.",
  cta: { label: "Book a demo", href: "#demo" },
  secondary: { label: "See it working", href: "#job-search" },
  shot: {
    src: "/assets/hero/company-home-screen-hero.png",
    /* Describes what the artwork SHOWS. It carries the hero's argument
       visually, so it is content rather than decoration and needs real
       alt text. */
    alt: "The Aplify dashboard home screen: a jobs and applications summary, a live-now panel, and setup cards.",
  },
};

/**
 * The map. Promoted out of the bento's standfirst, where §7's structural claim
 * — the sentence that makes the product legible in one read — was doing its
 * work as supporting text in the fourth section. It is the second thing on the
 * page now, because a reader who has not been told there are two halves reads
 * the rest as one muddled thing. The headline is §10's own worked example of
 * what a good headline looks like.
 */
export const siteMap = {
  eyebrow: "Where it sits",
  /* V2_HANDOVER §1's own words: "What the ATS is bad at is the two ends." The
     headline says that without insulting the system the client is keeping,
     which matters — the whole pitch is that they keep it. §7's two-halves
     sentence, which the handover calls "the sentence that makes the product
     legible in one read", keeps its prominent position in the standfirst. */
  lines: ["Your ATS was never", "going to do this bit"],
  linesSm: ["Your ATS was", "never going", "to do this bit"],
  standfirst:
    "One side of Aplify never meets a candidate. The other is everything a candidate ever meets. Both run off the same clean job data, and nothing you already run gets replaced.",
  /**
   * The claim, shown rather than asserted: both halves in one frame, with the
   * candidate between them.
   *
   * The artwork carries its own composition — the mapping table on the left is
   * the half that never meets anybody, the phone on the right is the half that
   * is all anybody meets, and the person holding it is the reason the sentence
   * matters. It needs no frame from us: a browser bar around it would be a
   * second frame competing with the one already drawn.
   */
  shot: {
    src: "/assets/platform/aplify-both-sides.png",
    w: 1662,
    h: 918,
    alt: "Aplify's two halves in one frame: on the left, the feed mapping screen showing source fields such as job_id and location_postcode mapped onto Aplify's own fields; on the right, a phone showing a job search for Manchester and the Assistant General Manager role at £34–38k; between them, a candidate looking at her phone.",
  },
} as const;

/**
 * BAND 2 — why they leave. The page's first real argument.
 *
 * Replaces `dropOff`, which stated the problem in one line and showed nothing.
 * The playbook's line is "Recruitment isn't broken because of one big problem.
 * It's death by a thousand cuts", and a single statement band cannot carry an
 * idea about ACCUMULATION. Eight cuts can.
 *
 * WHY EIGHT AND NOT SIX. The first cut had six, all of them post-Apply:
 * redirect, account, form, handset, dead end, silence. Stephen caught it — the
 * journey starts before the form, and Aplify's job-data half was answering
 * friction the page had not admitted to. `search` and `advert` are now first,
 * which means act three later answers a cut the reader already recognised,
 * exactly the way act two does.
 *
 * THERE ARE NO NUMBERS, AND THAT WAS A CORRECTION. The first build numbered
 * these 01-08 like the six stages. Stephen, 2026-08-25: "get rid of the
 * numbers they bring nothing - each bit we are talking about has it's own
 * place and not in an order of importance so the numbers clutter
 * uneccisarily." He is right, and the distinction is worth keeping: the six
 * stages are a SEQUENCE, where 01 genuinely precedes 02. These are eight
 * places a candidate can be lost, and no reader needs to be told they are
 * being counted. `key` exists for React and for the layout map, never for
 * display.
 *
 * `shots` are SEPARATE from `cuts` on purpose. They used to be a property of
 * two of the cuts, which made those two cells carry a heading, a paragraph AND
 * a picture while the others carried two of the three — the thing that made
 * the bento look messy. A picture card now carries only a picture. See
 * `problem.tsx` for the layout that follows from that.
 */
export const friction = {
  eyebrow: "Where they go",
  /* The playbook truth, verbatim, as the headline. Stephen: "the password
     phrase on it's own says so much - so dont be scared of using it in
     headlines where appropriate - it will position us as knowing the
     problems." Three lines, longer than any other section head on the page,
     and deliberately so. */
  lines: [
    "Nobody has ever thanked you",
    "for making them create",
    "another password",
  ],
  linesSm: [
    "Nobody has ever",
    "thanked you for making",
    "them create",
    "another password",
  ],
  standfirst:
    "It's never one thing. Somebody has to find the job, still want it after reading it, then get through applying for it. Three places to lose them, and most careers sites manage all three.",
  cuts: [
    {
      key: "search",
      icon: "duplicates",
      title: "The search",
      body: "They're on your site and can't find the job. Or they find it three times, under three different titles, and can't tell which one is real.",
    },
    {
      key: "advert",
      icon: "bullets",
      title: "The advert",
      body: "Written to fill a field in your ATS, not to persuade anybody. Duties, essential criteria, a paragraph about your values, and nothing that says why the job is any good.",
    },
    {
      key: "redirect",
      icon: "redirect",
      title: "The redirect",
      body: "They found the job on your site. Now they're on a different domain in somebody else's brand, wondering whether they're still in the right place.",
    },
    {
      /* The one tinted card, and the tint is argued rather than decorative:
         this is the cut the SECTION HEADLINE is about. One warm card in a grid
         of grey ones is the reference's move, and tinting the card the heading
         already names ties the two together instead of just adding colour. */
      key: "account",
      icon: "lock",
      title: "The account",
      body: "Before they can apply they need a username, a password and a confirmation email. For a job they haven't got yet.",
      tint: "amber" as const,
    },
    {
      key: "form",
      icon: "longForm",
      title: "The form",
      body: "Twenty-odd fields asking for the dates, the education and the job history that are already on the CV they uploaded two screens ago.",
    },
    {
      key: "handset",
      icon: "handset",
      title: "The handset",
      body: "Most people apply on a phone, often on a break. A form built for a desktop is a form they'll finish later, which means never.",
    },
    {
      key: "deadEnd",
      icon: "deadEnd",
      title: "The dead end",
      body: "They fill in all of it and find out at the end that they don't have the right to work, the licence or the hours. So does your recruiter.",
    },
    {
      /* The best line in the set, and it closes the band. It gets the last row
         with room around it rather than a third of a row. */
      key: "silence",
      icon: "silence",
      title: "The silence",
      body: "They press submit and hear nothing at all. That isn't a lost application, it's a lost opinion of you.",
    },
  ],
  /**
   * TWO picture panels, and they carry NOTHING BUT THE PICTURE.
   *
   * They are keyed rather than ordered, because `problem.tsx` places each one
   * deliberately: `abandoned` anchors the top of the band and `wall` sits
   * beside the two cards that describe it. Adding a third means deciding where
   * it goes, not appending.
   *
   * There was briefly a third, closing the band beside "The silence".
   * Stephen cut it, 2026-08-25: "dont see the need for the last image - just
   * put the last three cards in a row of 3." He is right — the band already
   * makes its point with two, and a picture per idea is how a bento turns back
   * into a list.
   *
   * WHY AN ANCHOR SHOT AT ALL. The band opens on eight cards of analysis, and
   * a reader needs somewhere to land before that. It is also the only place
   * this section gets to be about a PERSON rather than a mechanism — the
   * copy names the friction, the anchor names who it happens to.
   *
   * The two read as a narrative in their own right, which is the test of
   * whether they belong: the scene, then the wall.
   *
   * `ready: false` renders a placeholder at the panel's real size, so the
   * proportions being judged now are the ones the artwork will land into.
   * Drop the file in and flip the flag.
   *
   * Midnight (10) is deliberately absent: the proof band is the page's only
   * Midnight surface and there is exactly one of it.
   */
  shots: {
    /**
     * THE SCENE, at the top of the band.
     *
     * REPLACED 2026-08-25. This was a photograph of a candidate mid-application
     * with the progress panel composited into it; Stephen swapped it for the
     * panel on its own — "it should basically float in the middle of the box
     * big enough to have impact and have one of our lighter grad bgs."
     *
     * It is the band's whole argument in one object: step 14 of 150, an hour
     * and three quarters still to go, 9 per cent done. Nothing on the page
     * needs to say that out loud afterwards.
     *
     * `mode: "float"` — centred on the ground with air around it, NOT cropped.
     * It is the only picture on the page treated that way, and it should stay
     * that way: cropping a single card would just look like a mistake.
     *
     * GROUND 04, HARBOUR, and the choice is argued. The artwork is a WHITE card
     * and needs something to lift off, so a near-white ground would lose it —
     * Harbour's base is #eaf0f8. It is also the widest spread of the light set
     * and carries an amber note that answers the card's own amber pill.
     * Spectrum (06) is louder but its own reference note says one per page at
     * most, and this band is about loss rather than celebration.
     *
     * HORIZONTALLY the canvas is symmetric (155px each side to the card), so
     * there is no X offset. VERTICALLY it is not: the card runs y 108..539 in a
     * 742 canvas, because the drop shadow falls downwards and the canvas was
     * cut around the shadow rather than the card. Its centre therefore sits
     * 47.5px ABOVE the canvas centre, which is -6.4% of the height, and
     * centring the FILE left 138px of air above the card and 196px below.
     * `contentOffsetYPct` corrects it. Re-measure the alpha box if the file
     * is ever re-cut.
     */
    frustrated: {
      src: "/assets/friction/application-progress.png",
      alt: "An application progress panel reading step 14 of 150, 9 per cent complete, with an estimated one hour 46 minutes remaining and personal details, work history, right to work, availability and referees still to go.",
      w: 1921,
      h: 742,
      mode: "float" as const,
      ready: true,
      bg: "04",
      contentOffsetYPct: -6.4,
    },
    /**
     * A transparent PNG that sits OVER the gradient, centred and contained
     * rather than bled, because it arrives with its own composition and its own
     * shadow. `object-contain` inside the panel means no panel ratio can crop
     * it, whatever the row height ends up being.
     *
     * ⚠️ TWO THINGS TO KNOW ABOUT THIS ARTWORK.
     *
     * 1. IT SHOWS THE SOLUTION, NOT THE PROBLEM. Every other element in this
     *    band is something going wrong; this is Aplify's two-step apply flow
     *    working. Stephen placed it here deliberately, as the contrast against
     *    the cards beside it. Worth knowing if the band is ever re-argued: the
     *    addendum's rule is tension BEFORE the solution, and `#candidates`
     *    three bands down is where this flow is otherwise shown working.
     *
     * 2. IT CONTAINS `jamie.okafor@email.com`, BAKED IN. `email.com` is a live
     *    domain and §6.5 requires invented people on reserved `example.*`
     *    domains. This is the same breach already logged against the step 03
     *    and step 04 artwork. It is not fixable in copy — the file needs
     *    re-exporting.
     */
    notFrustrated: {
      src: "/assets/friction/not-frustrated.png",
      alt: "Aplify's apply flow on a phone: a short pre-qualification step asking about right to work, experience and shifts, above a confirmation that the application has been sent.",
      w: 1858,
      h: 1722,
      mode: "crop" as const,
      ready: true,
      bg: "08",
      /**
       * THE ARTWORK IS NOT CENTRED IN ITS OWN CANVAS, so centring the file
       * centres its empty margin too. Measured off the alpha channel:
       *
       *   left margin    184px  (9.9%)
       *   right margin    13px  (0.7%)
       *   top margin      90px  (5.2%)
       *   bottom margin    0px  — content runs to the very edge
       *
       * The content box is 1661x1632 and its centre sits 85px RIGHT of the
       * canvas centre, which is 4.6% of the width. Centred and scaled past the
       * panel, that pushed the confirmation card's right edge outside the
       * panel and clipped it, while 10% of empty canvas sat unused on the
       * left.
       *
       * `contentOffsetXPct` records where the content's centre sits relative
       * to the canvas centre, as a share of the dimension, positive meaning
       * right or down. The view folds it into the centring transform, so the
       * CONTENT ends up centred rather than the file. Same reasoning as
       * `nudgeXPct` on `event-registration.png` further down this module.
       *
       * ⚠️ Delete this the moment the file is re-exported with even margins.
       * The zero bottom margin is correct and should stay — the panel is
       * meant to cut the phone off at its foot.
       */
      contentOffsetXPct: 4.6,
    },
  },
} as const;

/**
 * BAND 3 — what it costs.
 *
 * The strategy doc's step 3: "Show the commercial cost: wasted budget, weaker
 * employer brand and abandoned applications."
 *
 * NO NUMBERS IN THIS BAND, AND THAT IS NOT AN OVERSIGHT. §6.1 permits no
 * invented figure, and §5 holds exactly one real one — Brandon Trust's, which
 * has to stay paired with the phrase "application drop-off rate". A percentage
 * opening this section would be read as an industry benchmark, which is the
 * precise misreading §5 exists to prevent.
 *
 * `ledger` is the itemised treatment: everything that was paid for, then the
 * one line that was not delivered. It carries no figures for the reason above,
 * and it does not need any — the point is the pattern, not the sum.
 */
export const cost = {
  eyebrow: "What it costs",
  lines: ["You already paid", "for that candidate"],
  linesSm: ["You already", "paid for that", "candidate"],
  /* REWRITTEN 2026-08-25. The old standfirst read "...The advertising, the
     campaign, the site, the time your team spent getting somebody that far",
     which is EXACTLY what the ledger below then itemises. It was spending the
     band's own content before the reader got to it. It now sets the ledger up
     instead of pre-empting it. */
  standfirst:
    "Every drop-out was bought and paid for, long before anybody reached the form. Here is what one of them actually costs you.",
  ledger: {
    heading: "One candidate, itemised",
    /**
     * Four lines that went to plan, then the one that did not.
     *
     * NO FIGURES ANYWHERE, and that is not an oversight. §6.1 permits no
     * invented number and §5's only real one is Brandon Trust's, which has to
     * stay paired with "application drop-off rate" and lands in band 10. A
     * receipt with invented pounds on it is the exact shape of thing that rule
     * exists to stop. The pattern is the point, not the sum.
     */
    paid: [
      "Advertising that put the job in front of them",
      "The campaign that made them click",
      "The careers site that held their attention",
      "Your team's time getting them that far",
    ],
    /**
     * The climax, and it needs to be more than two words.
     *
     * This used to be a fifth row with a rose chip on it — the same size as
     * everything above, differing only in colour, which meant the band's whole
     * point arrived as a change of pill. It now breaks the pattern properly:
     * its own panel, its own ground, its own scale.
     */
    loss: {
      title: "The application, abandoned",
      body: "Everything above it was paid for in full. This is the one line that decides whether any of that was worth spending.",
    },
  },
  cards: [
    {
      title: "You paid for them twice",
      body: "The spend that got somebody to the job is written off the moment they leave, and you spend it again next month getting somebody else to the same form.",
    },
    {
      title: "Your employer brand takes the hit",
      body: "Every vacancy is a first impression. If applying feels like admin, that's the impression, and it lasts a lot longer than the campaign did.",
    },
    {
      title: "The best ones go first",
      body: "The people who abandon aren't a random sample. Strong candidates have other options and less patience, so they're the ones you lose soonest.",
    },
  ],
} as const;

/**
 * BAND 4 — why we built it. The hinge.
 *
 * Three bands of the reader's pain, then the line that says it was ours first,
 * then the answer. The addendum wants the reader to feel understood before the
 * product arrives; this is the last beat of that and the strongest credibility
 * line Aplify has. It was not on the site at all before today.
 *
 * The standfirst opens with the playbook's One Sentence VERBATIM. Do not
 * paraphrase it — it is the brand's own definition of itself.
 *
 * Nothing else lives in this band on purpose. It sits on ground 03 (Blush),
 * the only warm ground in the set, whose own reference note says it is "useful
 * to break a run of cool sections". The human moment gets the one warm surface
 * on the page.
 */
export const origin = {
  eyebrow: "Why we built it",
  lines: ["We got tired of", "the software too"],
  linesSm: ["We got tired", "of the", "software too"],
  standfirst:
    "Aplify wasn't built by software people trying to understand recruitment. It was built by recruitment people who got tired of the software. We ran the campaigns, hit the numbers, then watched the application form hand it all back.",
} as const;

export const capabilities = {
  eyebrow: "For your candidates",
  lines: ["Four steps,", "no dead ends"],
  standfirst:
    "Every one of these is somewhere people usually stop. This is what it looks like when they don't.",
  /** Rendered as alternating copy/image rows, so each step gets a shot.
   *  `bg` is the blob ground behind that row's shot. These are the DEEP
   *  card grounds, not the light ones: each row sits inside a grey panel,
   *  and a pale ground inside grey has nothing to push against. Dark
   *  grounds also let a light screenshot read as lit rather than pasted. */
  steps: [
    {
      n: "01",
      bg: "12",
      title: "Find the right job",
      body: "Search every live role, then narrow it by region, salary or contract. Somebody who only knows which town they can get to can search by postcode and radius, or use the map. For shift work that's often the only filter that matters, because the job has to be reachable at six in the morning.",
      points: [
        "Keyword and salary filtering",
        "Postcode search with radius",
        "Interactive map",
      ],
      shot: {
        /* Loose artwork, no browser frame — it is a phone screen, and a
           browser bar around a phone would be a lie about what it is. */
        src: "/assets/steps/search-mobile.png",
        w: 585,
        h: 1069,
        /* A phone is narrow; more than this and it reads as a tablet. */
        widthPct: 60,
        alt: "Job search on a phone: keyword and location fields, a search button, 48 roles sorted by distance, and two job cards with salary and category.",
        fit: "bleed" as const,
      },
    },
    {
      n: "02",
      bg: "11",
      title: "Apply without leaving",
      body: "The form is on the page, not behind a redirect. Pre-qualification runs first, so anyone who can't be offered the role finds out in two questions instead of after twenty minutes of typing. And every field has to earn its place, because each company picks the ones it actually needs.",
      points: [
        "No ATS redirect",
        "No account to create",
        "Pre-qualification first",
      ],
      shot: {
        /* Filename says job-description; the artwork is the apply flow.
           Alt describes what is actually on screen. */
        src: "/assets/steps/job-description.png",
        w: 1382,
        h: 1955,
        /* A full form needs the width to stay legible. */
        widthPct: 80,
        alt: "The Easy Apply flow: the role being applied for, two pre-qualification questions, then a details form with name, email, phone, location, CV upload and a submit button.",
        fit: "bleed" as const,
      },
    },
    {
      n: "03",
      bg: "13",
      title: "Register for events",
      body: "Open days and assessment centres get the same flow on their own tab, with places tracked and attendance recorded against the candidate afterwards. Your open day stops being a spreadsheet on somebody's desktop that only they know how to read.",
      points: ["Own tab, same flow", "Places tracked", "Attendance recorded"],
      shot: {
        src: "/assets/steps/event-registration.png",
        w: 1595,
        h: 852,
        alt: "Registration for the Northbank Careers Open Day on Saturday 12 September 2026 in Manchester: a details form part-filled with a name and email address, and a confirmation card reading “You’re registered” with the place confirmed and added to the calendar.",
        /* Shown whole. At 1.87:1 it is the widest of the four, so the box
           sizes it by width and it sits shorter than step 04 — that is the
           artwork's shape, not a layout fault. */
        widthPct: 96,
        heightPct: 82,
        /* Measured, not eyeballed: the PNG's alpha bounding box sits 2.26%
           left of its own canvas centre (24px margin left, 95px right), so
           centring the file leaves the content looking left-hung. Remove this
           when the artwork is re-exported with even margins. */
        nudgeXPct: 2.26,
        fit: "center" as const,
      },
    },
    {
      n: "04",
      bg: "14",
      title: "Kept informed",
      body: "Every status change sends a branded email in your own voice, so nobody is left wondering whether a human ever opened it. Silence is the most common reason people give for not applying to an employer twice.",
      points: [
        "Branded templates",
        "Every status change",
        "Your tone of voice",
      ],
      shot: {
        src: "/assets/steps/application-received.png",
        alt: "The confirmation screen after applying: a green tick, \u201cApplication received\u201d, a line telling Jamie the application is with the hiring team and a confirmation email is on its way, and buttons to browse more roles or track the application.",
        w: 1662,
        h: 1307,
        /* Landscape, so it does not run off the card the way the two portrait
           shots do — it is centred and shown whole instead. A confirmation is
           a complete moment; cropping it would undercut the point. At 1.27:1
           the box sizes this one by HEIGHT, so widthPct is only a safety cap. */
        widthPct: 96,
        heightPct: 82,
        fit: "center" as const,
      },
    },
  ],
};

export const footer = {
  cta: {
    /* §12 fixes ONE conversion everywhere, and the differentiator is that the
       demo runs on the client's real feed rather than a sandbox. The strategy
       doc's step 10 asks the close to invite people to improve recruitment
       outcomes rather than to book software, so the offer leads. */
    lines: ["See it run on", "your own jobs"],
    linesSm: ["See it run", "on your", "own jobs"],
    standfirst:
      "Not a sandbox and not a slide deck. Book a demo and we'll run Aplify against your actual feed, so you can see your own jobs cleaned, published and applied to.",
    primary: { label: "Book a demo", href: "#demo" },
  },
  /* Columns follow the page's three acts rather than the old feature split.
     The roadmap link is gone with the band. */
  columns: [
    {
      heading: "The problem",
      links: [
        { label: "Why they leave", href: "#friction" },
        { label: "What it costs", href: "#cost" },
        { label: "Better data", href: "#data" },
      ],
    },
    {
      heading: "The product",
      links: [
        { label: "Easy Apply", href: "#candidates" },
        { label: "Job search", href: "#job-search" },
        { label: "AI enrichment", href: "#ai-enrichment" },
        { label: "Google for Jobs", href: "#google" },
        { label: "Recruiter dashboard", href: "#dashboard" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "Security & GDPR", href: "#security" },
        { label: "Integrations", href: "#integrations" },
        { label: "Contact", href: "#demo" },
      ],
    },
  ],
  /* The second half of the playbook's One Sentence, so it is the first and the
     last thing anybody reads on the page. */
  blurb: "Built by recruitment people who got tired of the software.",
  email: "hello@aplify.co.uk",
};

/* --------------------------------------------------------------------------
   The story: what arrives, what we do to it, what it becomes.
   -------------------------------------------------------------------------- */

export const story = {
  eyebrow: "Better data",
  /* The playbook truth verbatim. The standfirst then sets up the table
     directly underneath it: SOUTH WEST, Southwest and S.W., one under the
     other. Setup and payoff with no gap between them. */
  lines: ["Better jobs start", "with better data"],
  linesSm: ["Better jobs", "start with", "better data"],
  standfirst:
    "Easy Apply converts the people who get there. What decides whether they get there at all is the advert, and most feeds turn up with the same region spelled three different ways. Bad job data doesn't just look untidy, it costs trust.",
  /** One region, three spellings. One city, twice in a single field. */
  rows: [
    {
      raw: "NURSE — Bristol, Bristol, BS1",
      clean: "Nurse — Bristol, BS1",
      rawRegion: "SOUTH WEST",
      region: "South West",
      rawSalary: "24000-26000",
      salary: "£24,000–£26,000",
    },
    {
      raw: "Support Worker (Days)",
      clean: "Support Worker (Days)",
      rawRegion: "Southwest",
      region: "South West",
      rawSalary: "£24k-£26k",
      salary: "£24,000–£26,000",
    },
    {
      raw: "HCA - weston super mare",
      clean: "Healthcare Assistant — Weston-super-Mare",
      rawRegion: "S.W.",
      region: "South West",
      rawSalary: "Up to £26,000 DOE",
      salary: "Up to £26,000",
    },
  ],
};

export const howItWorks = {
  eyebrow: "How it works",
  /* The old head was "Six stages, raw feed to finished application" over "From
     the feed landing in your inbox to a candidate pressing send." Stephen:
     "Dont like the heading - boring... A feed landing in your inbox? What does
     that even mean? Who's inbox does the feed land in?" He was right, feeds do
     not land in inboxes.

     The new head is the wry beat AND the actual claim: five of the six stages
     run without anybody. Stage 05 is the one that needs a person, and it says
     so in its own sub, so the headline is checkable rather than a boast. */
  lines: ["Six stages.", "Only one of them needs you."],
  linesSm: ["Six stages.", "Only one of them", "needs you."],
  standfirst:
    "Your ATS produces a feed. Aplify does the rest: cleaned, published, applied to and sent back out. The only stage that needs a person is the one where your recruiters decide who to talk to.",
  stages: [
    {
      n: "01",
      title: "Collect",
      sub: "Pull jobs straight from your ATS",
      body: "XML, JSON or CSV, from any number of sources, on a schedule or whenever you ask for it. Mapping a new field is a setting, not a project.",
      points: [
        "Multi-format import",
        "Configurable mapping",
        "Authenticated feeds",
      ],
    },
    {
      n: "02",
      title: "Clean",
      sub: "Fix what the feed got wrong",
      body: "Salaries written the same way every time, duplicated text stripped out of titles, twelve spellings of a region mapped down to one. Then the AI rewrites each description in your tone of voice.",
      points: [
        "Salary and region tidied",
        "Rewritten to your EVP",
        "Sorted into job families",
      ],
    },
    {
      n: "03",
      title: "Publish",
      sub: "Put it on your own site",
      body: "Full-text search, postcode search with a radius you set, an interactive map and a page per job, all on your career site or campaign landing page.",
      points: [
        "Keyword and salary filtering",
        "Postcode and map search",
        "One campaign to a national board",
      ],
    },
    {
      n: "04",
      title: "Apply",
      sub: "Let people finish without leaving",
      body: "Applications and event registrations happen on the page. Each company controls which fields appear, and pre-qualification stops anyone ineligible before the full form rather than after it.",
      points: [
        "On-page Easy Apply",
        "Fields you choose",
        "Pre-qualification first",
      ],
    },
    {
      n: "05",
      title: "Manage",
      sub: "The stage that needs you",
      /* The second sentence is the ATS option, Stephen's ask (2026-08-29):
         this stage is only Aplify's dashboard when there is no native
         integration. Same claim the dashboard band makes, shortened; the
         integration is SHIPPED (§6.9), so it is stated as fact. */
      body: "Your recruiters triage through a status workflow they control, with source tracking on every submission so paid social, job boards and QR codes can be compared honestly. Or, with native ATS integration, applications land straight in the system your team already uses and this stage never changes hands.",
      points: [
        "Submitted to accepted",
        "Source tracking",
        "Branded candidate emails",
      ],
    },
    {
      n: "06",
      title: "Syndicate",
      sub: "Send the clean feed back out",
      body: "Once a feed is clean it's an asset. Aplify tailors it per destination and publishes it as an XML feed behind an API key.",
      points: [
        "Custom outbound mapping",
        "Protected by API key",
        "Errors stripped before they leave",
      ],
    },
  ],
};

export const demos = {
  jobSearch: {
    eyebrow: "See it working",
    /* An INSTRUCTION rather than a label. §11 says the page should let the
       reader use the product rather than look at pictures of it, and an
       invitation does that better than a description does. Fallback if this
       ever reads as too flippant: "The search your candidates get". */
    lines: ["Go on, apply", "for something"],
    linesSm: ["Go on,", "apply for", "something"],
    standfirst:
      "Three views of one filtered set. The switch above decides where somebody goes when they press apply, and it's set once per client rather than per candidate. Move it and every button below changes with it.",
    shot: {
      url: "yourcompany.co.uk/careers",
      placeholder: "Job search: grid, list and map",
    },
  },
  aiEnrichment: {
    eyebrow: "AI enrichment",
    /* Behind this: the playbook truth "Your ATS stores jobs. Candidates
       experience your brand." The headline is the joke, the standfirst is the
       explanation, so we get both without saying either twice. */
    lines: ["Nobody ever applied", "for a bullet point"],
    linesSm: ["Nobody ever", "applied for", "a bullet point"],
    standfirst:
      "Your ATS was built to store a job, not to sell one, so the description reads like an internal document. Because that's what it is. Aplify rewrites every one in your tone of voice on the way in, and invents nothing.",
    shot: {
      url: "app.aplify.co.uk/jobs",
      placeholder: "Description rewrite: before and after",
    },
  },
  dashboard: {
    eyebrow: "For your recruiters",
    lines: ["One list, not", "four inboxes"],
    linesSm: ["One list,", "not four", "inboxes"],
    /* This is the LONGER variant that had been sitting unrendered in
       dashboard-data.ts since the surface was built. Rendering it here and
       deleting the duplicate closes a §5 drift risk — approved copy existed in
       two files. The last clause is §3's "you may not need the dashboard"
       message, which the page had only ever made flatly. */
    standfirst:
      "Applications and event registrations arrive in the same place and move through a status workflow your team controls. Or, if you'd rather your recruiters never had to learn another system, native ATS integration sends them straight into the one they already use.",
    /* UNUSED since 2026-08-24. The dashboard demo lost its `ScreenCard`, so
       there is no browser bar left to print a URL in. Kept only because the
       AI-rewrite section above still has its own `shot`, and a lone survivor
       is more confusing than a matched pair. Delete both together if that
       section is ever unframed too. */
    shot: {
      url: "app.aplify.co.uk/applications",
      placeholder: "Recruiter dashboard: applications",
    },
  },
};

export const security = {
  eyebrow: "Security & GDPR",
  lines: ["Built for data", "you cannot lose"],
  linesSm: ["Built for", "data you", "cannot lose"],
  standfirst:
    "Candidate data is the most sensitive thing a recruitment team holds, and it's treated that way at every layer. For most organisations it ends up safer here than where it sits now.",
  /* NO HUMOUR IN THIS BAND, DELIBERATELY. §3 calls this reader "rarely the
     buyer, frequently the blocker". A wry line here reads as not taking it
     seriously, and this section unblocks deals. */
  points: [
    {
      title: "Encrypted field by field",
      /* V2_HANDOVER §1 calls this "the line that lands it" and the site had
         never used it. The searchable-while-encrypted part is the bit a
         technical reader does not expect. */
      body: "Every piece of personal information is encrypted on its own, not just the database it sits in. Recruiters can still search it, because the index is secure rather than plain text.",
      ground: "sky" as const,
    },
    {
      title: "Scoped to your company",
      body: "Every query is scoped by company. An out-of-scope record doesn't come back empty, it doesn't resolve at all.",
      ground: "violet" as const,
    },
    {
      title: "Anonymous by default",
      body: "Candidates apply without creating an account, so there's no password to lose and nothing to leak.",
      ground: "mint" as const,
    },
    {
      title: "Retention you control",
      body: "Retention windows and deletion are set per company, and candidates export or delete their own data through a public form.",
      ground: "amber" as const,
    },
  ],
};

export const integrations = {
  eyebrow: "Integrations",
  /* The playbook truth, verbatim. It was briefly on the `siteMap` band and
     moved here, where it is literally true — this is the band about keeping
     the ATS. `siteMap` took "Your ATS was never going to do this bit" instead. */
  lines: ["Keep the ATS.", "Lose the friction."],
  linesSm: ["Keep the ATS.", "Lose the", "friction."],
  standfirst:
    "Nothing you already run gets replaced and nobody has to work anywhere new. Aplify takes over the two ends your ATS was never much good at, and hands both back clean.",
  /**
   * THE CLAIM IS SPLIT ON PURPOSE, AND THE SPLIT IS THE ACCURATE PART.
   *
   * V2_HANDOVER §1: reading a feed works with ANY ATS, in any of XML, JSON or
   * CSV. Pushing applications BACK is "live today with Eploy; other systems
   * are added per client". Claiming any-ATS flatly in both directions
   * over-promises the return leg, which is the direction §6.9 records V1
   * getting wrong once already.
   *
   * The old §5 sentence naming Eploy in full was removed on Stephen's
   * instruction, 2026-08-25, because the band should lead with "any ATS"
   * rather than with one name. Eploy survives as one line in the list below —
   * my push-back, which he left standing: it is the only concrete, named, live
   * integration on the site, and "works with any ATS" is what every vendor
   * claims. One real system is what makes the rest credible.
   */
  lead: "Reading from your ATS works with any of them, in whatever format it produces. Sending applications back is built per system, and if yours isn't wired up yet, that's a piece of work we do rather than a queue you join.",
  items: [
    "Reads XML, JSON or CSV from any ATS",
    "Native integration live today with Eploy",
    "Applications pushed straight into your ATS",
    "Or triaged in the Aplify dashboard",
    "Or handed to the form you already run",
    "Clean feeds sent back out to job boards, behind an API key",
    "Branded candidate email at every stage",
  ],
};

/**
 * BAND 13 — Google for Jobs.
 *
 * NEW 2026-08-25, and it is a STATUS CHANGE as much as a new band. V2_HANDOVER
 * §1 listed Google for Jobs under "Roadmap — not yet available"; Stephen
 * confirmed on 2026-08-25 that it is live and working, with JSON-LD written on
 * every published job. §1 has been amended and the amendment is dated. If a
 * stale note anywhere still calls this forthcoming, it predates that.
 *
 * TWO THINGS THIS COPY MUST NEVER DO.
 *
 * 1. It must never promise that Google will show a job. It says the job
 *    "carries the structured data Google reads". Nobody controls Google's
 *    index, and a ranking promise is the single claim on this page a technical
 *    buyer could falsify in a minute.
 *
 * 2. It must not render Google's interface. §6.4 forbids depicting another
 *    company's product, so the demonstration shows OUR OWN output — the job as
 *    a person reads it beside the structured data a machine reads, both
 *    generated from the same cleaned record.
 *
 * On the jargon rule: showing JSON-LD is evidence, not us talking in jargon.
 * The labels either side of it are deliberately plain ("What a person reads" /
 * "What Google reads") and the human half is the dominant one. Keep the block
 * short — a Head of Talent needs to see THAT it exists and that it is
 * automatic, not to read it.
 *
 * `schema` must stay traceable field-for-field to `job`, the same discipline
 * §6.10 imposes on the AI rewrite. If you edit one side, edit the other.
 */
export const google = {
  eyebrow: "Google for Jobs",
  lines: ["Most job hunts don't", "start on your site"],
  linesSm: ["Most job hunts", "don't start", "on your site"],
  standfirst:
    "They start on Google. Every job Aplify publishes carries the structured data Google reads, with the salary, the location and the contract type where it expects to find them. No separate feed, and nothing for anyone to remember to switch on.",
  humanLabel: "What a person reads",
  machineLabel: "What Google reads",
  /** The candidate-facing half. Real UK geography (§6.6), invented employer. */
  job: {
    title: "Healthcare Assistant",
    org: "Northbank Health",
    location: "Weston-super-Mare, South West",
    salary: "Up to £26,000",
    contract: "Permanent, full time",
    posted: "Posted 3 days ago",
    closes: "Closes 14 March",
  },
  /** Traceable to `job` above, line for line. Kept to ten lines on purpose. */
  schema: [
    '"@type": "JobPosting",',
    '"title": "Healthcare Assistant",',
    '"hiringOrganization": "Northbank Health",',
    '"jobLocation": "Weston-super-Mare, GB",',
    '"baseSalary": { "maxValue": 26000, "currency": "GBP" },',
    '"employmentType": "FULL_TIME",',
    '"datePosted": "2026-03-01",',
    '"validThrough": "2026-03-14"',
  ],
  points: [
    {
      title: "On every job, automatically",
      body: "Written when the job publishes, on every role, with no per-job step for anyone to forget.",
    },
    {
      title: "The fields Google looks for",
      body: "Title, location, salary, contract type and closing date, taken from the data Aplify has already cleaned.",
    },
    {
      title: "The same job, two ways in",
      body: "It stays on your own site in your own branding. Google's jobs results are an extra route to it, not a replacement for it.",
    },
  ],
} as const;

export const proof = {
  eyebrow: "Application drop-off rate",
  before: { value: "85%", label: "Before Easy Apply" },
  after: { value: "30%", label: "After Easy Apply" },
  figure: "30",
  unit: "%",
  client: "Brandon Trust",
};

export const testimonials = {
  eyebrow: "In their words",
  lines: ["What changed for", "the teams using it"],
  linesSm: ["What changed", "for their", "teams"],
  /**
   * REAL, CLEARED QUOTES — verbatim from V2_HANDOVER §5, which states they are
   * "all real, all cleared, all available as recorded voiceovers" and that
   * "nothing outside this list may be presented as fact".
   *
   * Do not paraphrase these, do not write new ones, and do not attribute
   * anything to a named company that did not come from that list. Recordings
   * of all three are in public/testimonial_voiceovers/.
   */
  quotes: [
    {
      quote:
        "Aplify has helped us significantly reduce application drop-out by making the whole process quicker and more accessible. More candidates are now completing their applications, giving our recruitment team a stronger pool of people to engage with.",
      name: "Louise Mitchell",
      org: "Brandon Trust",
    },
    {
      quote:
        "The Aplify dashboard is incredibly straightforward to use. Our recruitment team can quickly review and manage applications without unnecessary complexity, helping everyone work more efficiently and keep candidates moving through the process.",
      name: "Ben Hopwell",
      org: "Cygnet Group",
    },
    {
      quote:
        "Aplify makes applying for a role feel quick, simple and intuitive. Candidates can complete their application without navigating a long or complicated process, creating a much more positive experience from the very first interaction.",
      name: "Sammi Yates",
      org: "HC-One",
    },
  ],
};

/**
 * The three quotes, picked by NAME rather than by index.
 *
 * §5 is explicit that they are not interchangeable: Louise proves completion,
 * Sammi proves the candidate experience, Ben proves the dashboard is usable.
 * The page used to run all three as one grid, which is the weakest possible
 * use of them — a wall of praise reads as a wall of praise, whichever three
 * quotes are in it.
 *
 * They now sit with the thing each one proves. Louise and Sammi go under the
 * 85%→30% figure, which is the same claim; Ben goes beside the dashboard he is
 * actually describing, nine bands from where he used to be.
 *
 * Picked by name so a reorder of the array cannot silently swap them.
 */
const byName = (name: string) => {
  const quote = testimonials.quotes.find((q) => q.name === name);
  if (!quote) throw new Error(`Missing approved quote: ${name}`);
  return quote;
};

/** Under the proof figure. Completion, then the candidate experience. */
export const proofQuotes = [
  byName("Louise Mitchell"),
  byName("Sammi Yates"),
] as const;

/** Beside the recruiter dashboard. */
export const dashboardQuote = byName("Ben Hopwell");

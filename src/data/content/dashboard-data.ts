/**
 * Recruiter dashboard demo — data and copy (handover §8.10).
 *
 * All sample people are invented, on reserved example.* domains (§6.5); jobs
 * reuse the job-search demo's sample set so the page stays one world.
 * Timelines are seeded to match each row's current status. Both halves of the
 * destination pair appear in `SOURCES` deliberately — listing "career site"
 * without "campaign landing page" would misdescribe the offer (§6.2).
 */

export const STATUSES = [
  "Submitted",
  "Reviewed",
  "Shortlisted",
  "Accepted",
  "Rejected",
  "Withdrawn",
] as const;

export type Status = (typeof STATUSES)[number];

export const SOURCES = [
  "Paid social",
  "Job board",
  "QR poster",
  "Career site",
  "Campaign landing page",
];

export interface TimelineEntry {
  /** "status" renders as old → new; the others as plain lines. */
  kind: "submitted" | "status" | "note";
  label: string;
  by: string;
  when: string;
}

/** One answer to one screening question, as the apply form captured it. */
export interface AdditionalAnswer {
  question: string;
  answer: string;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  /** Telephone and postcode are invented alongside the rest of the person. */
  telephone: string;
  postcode: string;
  /** The combined label the table shows: "Title — Place (REF)". */
  job: string;
  /** ...and its parts, which the detail panel lists separately. */
  jobTitle: string;
  jobRef: string;
  jobLocation: string;
  salary: string;
  category: string;
  role: string;
  status: Status;
  source: string;
  /** The full path the application arrived on, as the product records it. */
  sourcePath: string;
  appliedIso: string;
  applied: string;
  /** Screening answers. Real installs configure these per client. */
  additional: AdditionalAnswer[];
  /** Consent stamps — the product records both, and both are shown. */
  termsAgreed: string;
  contactConsent: string;
  timeline: TimelineEntry[];
}

export interface Registration {
  id: string;
  name: string;
  email: string;
  event: string;
  eventDate: string;
  registered: string;
  attended: boolean;
}

export const SEED_APPLICATIONS: Application[] = [
  {
    id: "APP-350795",
    name: "Amara Osei",
    email: "a.osei@example.com",
    telephone: "07700 900142",
    postcode: "BS1 4RN",
    job: "Registered Nurse — Bristol (JR2849)",
    jobTitle: "Registered Nurse",
    jobRef: "JR2849",
    jobLocation: "Bristol, BS1 4RN",
    salary: "£28,500 – £34,000",
    category: "Nursing",
    role: "Registered Nurse",
    status: "Accepted",
    source: "Paid social",
    sourcePath: "direct:/careers/registered-nurse-bristol/",
    appliedIso: "2026-07-30",
    applied: "30 Jul, 14:15",
    additional: [
      { question: "Where would you like to work", answer: "Bristol, UK" },
      { question: "Do you have the right to work in the UK", answer: "Yes" },
      { question: "Are you NMC registered", answer: "Yes — PIN held since 2019" },
      { question: "Do you hold a full, current UK driving licence?", answer: "Yes" },
    ],
    termsAgreed: "30 Jul 2026, 14:15",
    contactConsent: "30 Jul 2026, 14:15",
    timeline: [
      { kind: "status", label: "Shortlisted → Accepted", by: "L. Hart", when: "4 Aug, 09:12" },
      { kind: "status", label: "Reviewed → Shortlisted", by: "L. Hart", when: "2 Aug, 16:40" },
      { kind: "note", label: "Strong interview — references requested.", by: "L. Hart", when: "2 Aug, 16:38" },
      { kind: "status", label: "Submitted → Reviewed", by: "R. Adeyemi", when: "31 Jul, 10:05" },
      { kind: "submitted", label: "Application submitted", by: "Amara Osei", when: "30 Jul, 14:15" },
    ],
  },
  {
    id: "APP-643294",
    name: "Tom Bailey",
    email: "tombailey@example.co.uk",
    telephone: "07700 900218",
    postcode: "PL4 6AB",
    job: "Healthcare Assistant — Plymouth (JR2862)",
    jobTitle: "Healthcare Assistant",
    jobRef: "JR2862",
    jobLocation: "Plymouth, PL4 6AB",
    salary: "£22,000 – £24,500",
    category: "Care & Support",
    role: "Healthcare Assistant",
    status: "Submitted",
    source: "Job board",
    sourcePath: "direct:/careers/healthcare-assistant-plymouth/",
    appliedIso: "2026-07-30",
    applied: "30 Jul, 13:55",
    additional: [
      { question: "Where would you like to work", answer: "Plymouth, UK" },
      { question: "Do you have the right to work in the UK", answer: "Yes" },
      { question: "Do you have previous care experience", answer: "No — happy to complete the Care Certificate" },
      { question: "Do you hold a full, current UK driving licence?", answer: "No" },
    ],
    termsAgreed: "30 Jul 2026, 13:55",
    contactConsent: "30 Jul 2026, 13:55",
    timeline: [
      { kind: "submitted", label: "Application submitted", by: "Tom Bailey", when: "30 Jul, 13:55" },
    ],
  },
  {
    id: "APP-841056",
    name: "Priya Nair",
    email: "priya.nair@example.org",
    telephone: "07700 900377",
    postcode: "LS2 8DT",
    job: "Ward Manager — Leeds (JR2257)",
    jobTitle: "Ward Manager",
    jobRef: "JR2257",
    jobLocation: "Leeds, LS2 8DT",
    salary: "£43,000 – £49,000",
    category: "Leadership",
    role: "Ward Manager",
    status: "Shortlisted",
    source: "Career site",
    sourcePath: "direct:/careers/ward-manager-leeds/",
    appliedIso: "2026-07-29",
    applied: "29 Jul, 14:06",
    additional: [
      { question: "Where would you like to work", answer: "Leeds, UK" },
      { question: "Do you have the right to work in the UK", answer: "Yes" },
      { question: "Years of ward leadership experience", answer: "6" },
      { question: "Do you hold a full, current UK driving licence?", answer: "Yes" },
    ],
    termsAgreed: "29 Jul 2026, 14:06",
    contactConsent: "29 Jul 2026, 14:06",
    timeline: [
      { kind: "status", label: "Reviewed → Shortlisted", by: "R. Adeyemi", when: "1 Aug, 11:22" },
      { kind: "status", label: "Submitted → Reviewed", by: "R. Adeyemi", when: "30 Jul, 09:47" },
      { kind: "submitted", label: "Application submitted", by: "Priya Nair", when: "29 Jul, 14:06" },
    ],
  },
  {
    id: "APP-187447",
    name: "Jack Whitfield",
    email: "jwhitfield@example.net",
    telephone: "07700 900455",
    postcode: "M14 5QX",
    job: "Support Worker — Manchester (JR2726)",
    jobTitle: "Support Worker",
    jobRef: "JR2726",
    jobLocation: "Manchester, M14 5QX",
    salary: "£21,500 – £23,000",
    category: "Care & Support",
    role: "Support Worker",
    status: "Reviewed",
    source: "QR poster",
    sourcePath: "direct:/campaigns/support-worker-north-west/",
    appliedIso: "2026-07-29",
    applied: "29 Jul, 11:31",
    additional: [
      { question: "Where would you like to work", answer: "Manchester, UK" },
      { question: "Do you have the right to work in the UK", answer: "Yes" },
      { question: "Are you able to work shifts including weekends", answer: "Yes" },
      { question: "Do you hold a full, current UK driving licence?", answer: "Yes" },
    ],
    termsAgreed: "29 Jul 2026, 11:31",
    contactConsent: "29 Jul 2026, 11:31",
    timeline: [
      { kind: "status", label: "Submitted → Reviewed", by: "L. Hart", when: "30 Jul, 15:02" },
      { kind: "submitted", label: "Application submitted", by: "Jack Whitfield", when: "29 Jul, 11:31" },
    ],
  },
  {
    id: "APP-676266",
    name: "Sofia Marsh",
    email: "sofia.marsh@example.com",
    telephone: "07700 900506",
    postcode: "B15 2TT",
    job: "Staff Nurse, Nights — Birmingham (JR2311)",
    jobTitle: "Staff Nurse (Nights)",
    jobRef: "JR2311",
    jobLocation: "Birmingham, B15 2TT",
    salary: "£29,000 – £35,000",
    category: "Nursing",
    role: "Staff Nurse",
    status: "Submitted",
    source: "Campaign landing page",
    sourcePath: "direct:/campaigns/nights-nursing-midlands/",
    appliedIso: "2026-07-28",
    applied: "28 Jul, 14:04",
    additional: [
      { question: "Where would you like to work", answer: "Birmingham, UK" },
      { question: "Do you have the right to work in the UK", answer: "Yes" },
      { question: "Are you happy to work permanent nights", answer: "Yes" },
      { question: "Do you hold a full, current UK driving licence?", answer: "No" },
    ],
    termsAgreed: "28 Jul 2026, 14:04",
    contactConsent: "28 Jul 2026, 14:04",
    timeline: [
      { kind: "submitted", label: "Application submitted", by: "Sofia Marsh", when: "28 Jul, 14:04" },
    ],
  },
  {
    id: "APP-580631",
    name: "Daniel Okafor",
    email: "d.okafor@example.co.uk",
    telephone: "07700 900641",
    postcode: "CF10 3AT",
    job: "Physiotherapist — Cardiff (JR2190)",
    jobTitle: "Physiotherapist",
    jobRef: "JR2190",
    jobLocation: "Cardiff, CF10 3AT",
    salary: "£32,000 – £38,000",
    category: "Allied Health",
    role: "Physiotherapist",
    status: "Rejected",
    source: "Job board",
    sourcePath: "direct:/careers/physiotherapist-cardiff/",
    appliedIso: "2026-07-27",
    applied: "27 Jul, 16:51",
    additional: [
      { question: "Where would you like to work", answer: "Cardiff, UK" },
      { question: "Do you have the right to work in the UK", answer: "Yes" },
      { question: "Are you HCPC registered", answer: "Yes" },
      { question: "Do you hold a full, current UK driving licence?", answer: "Yes" },
    ],
    termsAgreed: "27 Jul 2026, 16:51",
    contactConsent: "27 Jul 2026, 16:51",
    timeline: [
      { kind: "status", label: "Reviewed → Rejected", by: "R. Adeyemi", when: "29 Jul, 10:18" },
      { kind: "status", label: "Submitted → Reviewed", by: "R. Adeyemi", when: "28 Jul, 09:30" },
      { kind: "submitted", label: "Application submitted", by: "Daniel Okafor", when: "27 Jul, 16:51" },
    ],
  },
  {
    id: "APP-242491",
    name: "Ella Byrne",
    email: "ellabyrne@example.org",
    telephone: "07700 900733",
    postcode: "BA1 1LZ",
    job: "Occupational Therapist — Bath (JR2078)",
    jobTitle: "Occupational Therapist",
    jobRef: "JR2078",
    jobLocation: "Bath, BA1 1LZ",
    salary: "£31,000 – £37,500",
    category: "Allied Health",
    role: "Occupational Therapist",
    status: "Withdrawn",
    source: "Paid social",
    sourcePath: "direct:/careers/occupational-therapist-bath/",
    appliedIso: "2026-07-27",
    applied: "27 Jul, 09:44",
    additional: [
      { question: "Where would you like to work", answer: "Bath, UK" },
      { question: "Do you have the right to work in the UK", answer: "Yes" },
      { question: "Are you HCPC registered", answer: "Yes" },
      { question: "Do you hold a full, current UK driving licence?", answer: "Yes" },
    ],
    termsAgreed: "27 Jul 2026, 09:44",
    contactConsent: "27 Jul 2026, 09:44",
    timeline: [
      { kind: "status", label: "Reviewed → Withdrawn", by: "Ella Byrne", when: "30 Jul, 08:02" },
      { kind: "status", label: "Submitted → Reviewed", by: "L. Hart", when: "28 Jul, 13:11" },
      { kind: "submitted", label: "Application submitted", by: "Ella Byrne", when: "27 Jul, 09:44" },
    ],
  },
  {
    id: "APP-119008",
    name: "Marcus Reid",
    email: "m.reid@example.net",
    telephone: "07700 900884",
    postcode: "L1 8JQ",
    job: "Senior Support Worker — Liverpool (JR1984)",
    jobTitle: "Senior Support Worker",
    jobRef: "JR1984",
    jobLocation: "Liverpool, L1 8JQ",
    salary: "£24,000 – £26,500",
    category: "Care & Support",
    role: "Senior Support Worker",
    status: "Accepted",
    source: "QR poster",
    sourcePath: "direct:/campaigns/senior-support-worker-liverpool/",
    appliedIso: "2026-07-26",
    applied: "26 Jul, 12:20",
    additional: [
      { question: "Where would you like to work", answer: "Liverpool, UK" },
      { question: "Do you have the right to work in the UK", answer: "Yes" },
      { question: "Years of care experience", answer: "4" },
      { question: "Do you hold a full, current UK driving licence?", answer: "Yes" },
    ],
    termsAgreed: "26 Jul 2026, 12:20",
    contactConsent: "26 Jul 2026, 12:20",
    timeline: [
      { kind: "status", label: "Shortlisted → Accepted", by: "L. Hart", when: "31 Jul, 14:55" },
      { kind: "status", label: "Submitted → Shortlisted", by: "L. Hart", when: "27 Jul, 10:40" },
      { kind: "submitted", label: "Application submitted", by: "Marcus Reid", when: "26 Jul, 12:20" },
    ],
  },
];

export const EVENTS = ["Open Day — Bristol", "Recruitment Evening — Leeds"];

export const SEED_REGISTRATIONS: Registration[] = [
  { id: "REG-813637", name: "Nadia Kaur", email: "nadia.kaur@example.com", event: EVENTS[0], eventDate: "22 Aug, 10:00", registered: "30 Jul, 14:13", attended: false },
  { id: "REG-811718", name: "Ben Cartwright", email: "bencartwright@example.org", event: EVENTS[0], eventDate: "22 Aug, 10:00", registered: "30 Jul, 11:22", attended: false },
  { id: "REG-804552", name: "Grace Adeyemi", email: "g.adeyemi@example.co.uk", event: EVENTS[1], eventDate: "4 Sep, 18:00", registered: "28 Jul, 17:09", attended: false },
  { id: "REG-798104", name: "Oliver Franks", email: "ofranks@example.net", event: EVENTS[1], eventDate: "4 Sep, 18:00", registered: "27 Jul, 08:51", attended: false },
  { id: "REG-771263", name: "Holly Dunne", email: "holly.dunne@example.com", event: EVENTS[0], eventDate: "22 Aug, 10:00", registered: "25 Jul, 19:34", attended: true },
];

/** Section copy — handover §8.10, quoted verbatim where quoted there. */
export const dashboardContent = {
  eyebrow: "For your recruiters",
  headline: "One place to action all of it",
  standfirst:
    "Applications and event registrations arrive in the same dashboard, on separate tabs, and move through a status workflow your team controls — or, with native ATS integration, they bypass it entirely and land in the system you already use.",
  tabs: {
    applications: "Applications",
    registrations: "Registrations",
  },
  filters: {
    searchPlaceholder: "Search by name...",
    searchLabel: "Search applications by candidate name",
    allStatuses: "All statuses",
    allJobs: "All jobs",
    allCategories: "All categories",
    allRoles: "All roles",
    allSources: "All sources",
    dateFrom: "Applied from",
    dateTo: "Applied to",
    more: "More filters",
    fewer: "Fewer filters",
    export: "Export CSV",
    exportHint: "Honours whatever filters are active",
    clear: "Clear filters",
    empty: "No applications match those filters.",
    /** {n} is substituted; the row is an aria-live region. */
    count: "{n} applications",
    countOne: "1 application",
    registrationCount: "{n} registrations",
  },
  detail: {
    /** Section headings in the application panel, in the product's order. */
    applicationHeading: "Application",
    sourceLabel: "Source",
    statusHeading: "Status",
    updateStatus: "Update status",
    candidateHeading: "Candidate",
    nameLabel: "Name",
    emailLabel: "Email",
    telephoneLabel: "Telephone",
    postcodeLabel: "Postcode",
    jobHeading: "Job",
    titleLabel: "Title",
    refLabel: "Ref",
    locationLabel: "Location",
    salaryLabel: "Salary",
    additionalHeading: "Additional information",
    appliedHeading: "Applied",
    termsLabel: "Terms agreed",
    consentLabel: "Contact consent",
    dangerHeading: "Danger zone",
    /** The product's own wording. Deleting anonymises rather than erases. */
    dangerBody:
      "Deleting an application permanently anonymises the candidate's personal data. This cannot be undone.",
    delete: "Delete application",
    deleteConfirm: "Confirm delete",
    deleteCancel: "Cancel",
    viewCandidate: "View candidate",
    timelineHeading: "Timeline",
    viewTimeline: "View candidate timeline",
    statusLabel: "Status",
    backLabel: "Back to list",
    closeLabel: "Close",
    changedBy: "You",
    changedWhen: "Just now",
  },
  notes: {
    heading: "Notes",
    placeholder: "Add a note...",
    add: "Add note",
    empty: "No notes yet.",
    /** The product caps a note at 1000 characters. */
    limit: 1000,
    author: "You",
    when: "Just now",
    /**
     * §6.7, second clause: "any form that looks submittable must state plainly
     * that nothing is sent, stored or read". This textarea looks submittable
     * and has a working Add button, so the line is not optional — it sits with
     * the field it is about rather than under the section, which is the only
     * kind of caption this page keeps.
     */
    disclosure:
      "Sample data. Notes you add here stay in this browser and are gone on refresh.",
  },
  caption:
    "A working demonstration — invented people on reserved example.* domains and Ofcom's reserved 07700 900xxx numbers. Nothing here is real candidate data, and nothing you change is saved.",
  /* NOT RENDERED, and deliberately left rather than quietly deleted.
     
     Every line here is said on the page already, by the #integrations section
     from `site.ts` — including the Eploy sentence, which is VERBATIM APPROVED
     COPY under V2_HANDOVER §5 and now exists in two files. That is a drift
     risk, not a convenience: edit one and the other silently disagrees, and
     the dead one is the more likely to be picked up later and reintroduce a
     stale claim about the single named third-party product.

     CANONICAL SOURCE: `integrations.lead` in `src/data/content/site.ts`.
     Change it there. If this block is ever wanted on this surface, delete it
     here and read from `integrations` instead of copying the string again. */
  ats: {
    kicker: "Or skip the dashboard and keep the workflow you have",
    heading: "Native ATS integration",
    body: "Where native integration is in place, applications are pushed straight into your ATS as they arrive. No export step, no second system for your team to learn — they carry on working exactly as they do now, on cleaner jobs and with the drop-off already solved upstream.",
    eploy:
      "It is live today with Eploy. Other systems are added as clients need them — if yours isn't connected yet, that's a conversation we have with you rather than a queue you wait in.",
  },
};

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

export interface Application {
  id: string;
  name: string;
  email: string;
  job: string;
  category: string;
  role: string;
  status: Status;
  source: string;
  appliedIso: string;
  applied: string;
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
    job: "Registered Nurse — Bristol (JR2849)",
    category: "Nursing",
    role: "Registered Nurse",
    status: "Accepted",
    source: "Paid social",
    appliedIso: "2026-07-30",
    applied: "30 Jul, 14:15",
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
    job: "Healthcare Assistant — Plymouth (JR2862)",
    category: "Care & Support",
    role: "Healthcare Assistant",
    status: "Submitted",
    source: "Job board",
    appliedIso: "2026-07-30",
    applied: "30 Jul, 13:55",
    timeline: [
      { kind: "submitted", label: "Application submitted", by: "Tom Bailey", when: "30 Jul, 13:55" },
    ],
  },
  {
    id: "APP-841056",
    name: "Priya Nair",
    email: "priya.nair@example.org",
    job: "Ward Manager — Leeds (JR2257)",
    category: "Leadership",
    role: "Ward Manager",
    status: "Shortlisted",
    source: "Career site",
    appliedIso: "2026-07-29",
    applied: "29 Jul, 14:06",
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
    job: "Support Worker — Manchester (JR2726)",
    category: "Care & Support",
    role: "Support Worker",
    status: "Reviewed",
    source: "QR poster",
    appliedIso: "2026-07-29",
    applied: "29 Jul, 11:31",
    timeline: [
      { kind: "status", label: "Submitted → Reviewed", by: "L. Hart", when: "30 Jul, 15:02" },
      { kind: "submitted", label: "Application submitted", by: "Jack Whitfield", when: "29 Jul, 11:31" },
    ],
  },
  {
    id: "APP-676266",
    name: "Sofia Marsh",
    email: "sofia.marsh@example.com",
    job: "Staff Nurse, Nights — Birmingham (JR2311)",
    category: "Nursing",
    role: "Staff Nurse",
    status: "Submitted",
    source: "Campaign landing page",
    appliedIso: "2026-07-28",
    applied: "28 Jul, 14:04",
    timeline: [
      { kind: "submitted", label: "Application submitted", by: "Sofia Marsh", when: "28 Jul, 14:04" },
    ],
  },
  {
    id: "APP-580631",
    name: "Daniel Okafor",
    email: "d.okafor@example.co.uk",
    job: "Physiotherapist — Cardiff (JR2190)",
    category: "Allied Health",
    role: "Physiotherapist",
    status: "Rejected",
    source: "Job board",
    appliedIso: "2026-07-27",
    applied: "27 Jul, 16:51",
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
    job: "Occupational Therapist — Bath (JR2078)",
    category: "Allied Health",
    role: "Occupational Therapist",
    status: "Withdrawn",
    source: "Paid social",
    appliedIso: "2026-07-27",
    applied: "27 Jul, 09:44",
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
    job: "Senior Support Worker — Liverpool (JR1984)",
    category: "Care & Support",
    role: "Senior Support Worker",
    status: "Accepted",
    source: "QR poster",
    appliedIso: "2026-07-26",
    applied: "26 Jul, 12:20",
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
    allStatuses: "All statuses",
    allCategories: "All categories",
    export: "Export CSV",
    exportHint: "Honours whatever filters are active",
    empty: "No applications match those filters.",
  },
  detail: {
    timelineHeading: "Timeline",
    statusLabel: "Status",
    backLabel: "Back to list",
    changedBy: "You",
    changedWhen: "Just now",
  },
  caption:
    "A working demonstration — invented people on reserved example.* domains. Nothing here is real candidate data, and nothing you change is stored.",
  ats: {
    kicker: "Or skip the dashboard and keep the workflow you have",
    heading: "Native ATS integration",
    body: "Where native integration is in place, applications are pushed straight into your ATS as they arrive. No export step, no second system for your team to learn — they carry on working exactly as they do now, on cleaner jobs and with the drop-off already solved upstream.",
    eploy:
      "It is live today with Eploy. Other systems are added as clients need them — if yours isn't connected yet, that's a conversation we have with you rather than a queue you wait in.",
  },
};

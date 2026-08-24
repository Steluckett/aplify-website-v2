/**
 * Sample vacancies for the job-search demo, shared by its grid, list and map views.
 *
 * Split out of the section when the map arrived: the map needs the same records the list renders,
 * and two copies of a job list is exactly how a pin ends up on a role the list doesn't show.
 *
 * Illustrative and deliberately generic — no real vacancy, employer or salary. `lat`/`lon` are the
 * genuine coordinates of each city, so the map's geography is right even though the roles are not
 * real; a pin in the wrong county would be the one error every UK reader spots immediately.
 */

export interface Job {
  title: string;
  location: string;
  region: string;
  family: string;
  contract: string;
  salary: string;
  /** Two sentences, as a real advert's opening. Invented; see the file note. */
  summary: string;
  lat: number;
  lon: number;
}

/** Stable identity for a row, used as a React key and to match a card to its pin. */
export const jobKey = (job: Job): string => `${job.title}-${job.location}`;

export const JOBS: Job[] = [
  {
    title: "Registered Nurse",
    location: "Bristol",
    region: "South West",
    family: "Nursing",
    contract: "Full time",
    salary: "£28,500 – £34,000",
    lat: 51.4545,
    lon: -2.5879,
    summary:
      "Deliver nursing care to adults with complex mental health needs on a 20-bed unit. You will lead medication rounds, contribute to care planning and support a team of healthcare assistants.",
  },
  {
    title: "Healthcare Assistant",
    location: "Plymouth",
    region: "South West",
    family: "Care & Support",
    contract: "Full time",
    salary: "£22,000 – £24,500",
    lat: 50.3755,
    lon: -4.1427,
    summary:
      "Support adults with learning disabilities through daily routines, activities and appointments. No previous care experience is required — the full induction and Care Certificate are provided.",
  },
  {
    title: "Ward Manager",
    location: "Leeds",
    region: "Yorkshire",
    family: "Leadership",
    contract: "Full time",
    salary: "£43,000 – £49,000",
    lat: 53.8008,
    lon: -1.5491,
    summary:
      "Take clinical and operational responsibility for a 24-bed rehabilitation ward. You will manage rotas, supervise registered staff and hold quality and safety governance for the unit.",
  },
  {
    title: "Occupational Therapist",
    location: "Bath",
    region: "South West",
    family: "Allied Health",
    contract: "Part time",
    salary: "£31,000 – £37,500",
    lat: 51.3811,
    lon: -2.359,
    summary:
      "Assess and plan therapeutic activity for adults working towards independent living. Three days a week, as part of a multidisciplinary team with psychology and nursing.",
  },
  {
    title: "Support Worker",
    location: "Manchester",
    region: "North West",
    family: "Care & Support",
    contract: "Bank",
    salary: "£21,500 – £23,000",
    lat: 53.4808,
    lon: -2.2426,
    summary:
      "Bank shifts across three services in the city, booked around your availability. You will support residents with personal care, community access and daily living.",
  },
  {
    title: "Staff Nurse (Nights)",
    location: "Birmingham",
    region: "Midlands",
    family: "Nursing",
    contract: "Full time",
    salary: "£29,000 – £35,000",
    lat: 52.4862,
    lon: -1.8904,
    summary:
      "Nights across a rolling rota on an acute admissions ward, with an enhanced rate for unsocial hours. You will hold the shift alongside a second registered nurse.",
  },
  {
    title: "Physiotherapist",
    location: "Cardiff",
    region: "Wales",
    family: "Allied Health",
    contract: "Full time",
    salary: "£32,000 – £38,000",
    lat: 51.4816,
    lon: -3.1791,
    summary:
      "Provide physiotherapy to adults in a neuro-rehabilitation setting, from assessment through to discharge planning. Includes access to a fully equipped on-site gym and hydrotherapy pool.",
  },
  {
    title: "Deputy Ward Manager",
    location: "Bristol",
    region: "South West",
    family: "Leadership",
    contract: "Full time",
    salary: "£37,000 – £42,000",
    lat: 51.4545,
    lon: -2.5879,
    summary:
      "Deputise for the ward manager and lead shifts on a low-secure unit. A step into management with structured supervision and a funded leadership qualification.",
  },
  {
    title: "Senior Support Worker",
    location: "Liverpool",
    region: "North West",
    family: "Care & Support",
    contract: "Full time",
    salary: "£24,000 – £26,500",
    lat: 53.4084,
    lon: -2.9916,
    summary:
      "Lead a small team supporting adults with autism in a supported living service. You will hold key-worker responsibility and mentor newer support workers.",
  },
  {
    title: "Speech & Language Therapist",
    location: "Sheffield",
    region: "Yorkshire",
    family: "Allied Health",
    contract: "Part time",
    salary: "£33,000 – £40,000",
    lat: 53.3811,
    lon: -1.4701,
    summary:
      "Assess communication and swallowing needs across two neighbouring services. Two days a week, with peer supervision and a CPD budget.",
  },
  {
    title: "Registered Mental Health Nurse",
    location: "Nottingham",
    region: "Midlands",
    family: "Nursing",
    contract: "Full time",
    salary: "£28,500 – £34,000",
    lat: 52.9548,
    lon: -1.1581,
    summary:
      "Work with adults in a psychiatric intensive care setting, with a strong focus on de-escalation and least-restrictive practice. Preceptorship available for newly qualified nurses.",
  },
  {
    title: "Clinical Lead",
    location: "Swansea",
    region: "Wales",
    family: "Leadership",
    contract: "Full time",
    salary: "£45,000 – £52,000",
    lat: 51.6214,
    lon: -3.9436,
    summary:
      "Hold clinical governance across two sites and lead a team of registered nurses and therapists. You will chair the local quality forum and report to the regional director.",
  },
  {
    title: "Registered Nurse (Nights)",
    location: "Newcastle upon Tyne",
    region: "North East",
    family: "Nursing",
    contract: "Full time",
    salary: "£29,500 – £35,500",
    lat: 54.9783,
    lon: -1.6178,
    summary:
      "Night shifts on a 16-bed unit for adults with complex needs, on a three-on four-off pattern. Enhanced unsocial-hours rate on top of the base salary.",
  },
  {
    title: "Support Worker",
    location: "Sunderland",
    region: "North East",
    family: "Care & Support",
    contract: "Bank",
    salary: "£21,500 – £23,000",
    lat: 54.9061,
    lon: -1.3813,
    summary:
      "Flexible bank hours supporting adults with learning disabilities in a residential service. Shifts are offered weekly and you choose what you take.",
  },
  {
    title: "Team Leader",
    location: "Southampton",
    region: "South East",
    family: "Leadership",
    contract: "Full time",
    salary: "£34,000 – £39,000",
    lat: 50.9097,
    lon: -1.4044,
    summary:
      "Run the day-to-day of a supported living service and line-manage a team of twelve. You will own rotas, care plans and the relationship with commissioners.",
  },
  {
    title: "Healthcare Assistant",
    location: "Brighton",
    region: "South East",
    family: "Care & Support",
    contract: "Part time",
    salary: "£22,000 – £24,500",
    lat: 50.8225,
    lon: -0.1372,
    summary:
      "Part-time days supporting older adults with dementia in a purpose-built residential home. Sixteen to twenty-four hours a week, worked around school hours if that helps.",
  },
  {
    title: "Registered Manager",
    location: "Glasgow",
    region: "Scotland",
    family: "Leadership",
    contract: "Full time",
    salary: "£46,000 – £53,000",
    lat: 55.8642,
    lon: -4.2518,
    summary:
      "Take registered responsibility for a 32-bed service, including regulatory compliance and budget. You will report to the operations director and lead a management team of four.",
  },
  {
    title: "Occupational Therapist",
    location: "Coventry",
    region: "Midlands",
    family: "Allied Health",
    contract: "Part time",
    salary: "£31,000 – £37,500",
    lat: 52.4068,
    lon: -1.5197,
    summary:
      "Build and run therapeutic programmes for adults in a rehabilitation service. Three days a week, with a dedicated activity space and an OT assistant.",
  },
];

export const FAMILIES = [
  "Nursing",
  "Care & Support",
  "Allied Health",
  "Leadership",
];
export const REGIONS = [
  "South West",
  "South East",
  "Midlands",
  "North West",
  "North East",
  "Yorkshire",
  "Wales",
  "Scotland",
];

/**
 * Pre-qualification, as stage 04 describes it: questions that gate anyone ineligible *before* they
 * reach the full form. One universal, one drawn from the job family — which is also what makes the
 * point that these are configured per company rather than fixed by us.
 *
 * Illustrative requirements, like the rest of the sample data.
 */
export const RIGHT_TO_WORK = "Do you have the right to work in the UK?";

export const FAMILY_PREQUAL: Record<string, string> = {
  Nursing: "Do you hold current NMC registration?",
  "Allied Health": "Do you hold current HCPC registration?",
  Leadership: "Have you managed a clinical team before?",
  "Care & Support": "Do you have at least six months of care experience?",
};

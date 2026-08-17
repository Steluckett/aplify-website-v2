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
  lat: number;
  lon: number;
}

/** Stable identity for a row, used as a React key and to match a card to its pin. */
export const jobKey = (job: Job): string => `${job.title}-${job.location}`;

export const JOBS: Job[] = [
  { title: "Registered Nurse", location: "Bristol", region: "South West", family: "Nursing", contract: "Full time", salary: "£28,500 – £34,000", lat: 51.4545, lon: -2.5879 },
  { title: "Healthcare Assistant", location: "Plymouth", region: "South West", family: "Care & Support", contract: "Full time", salary: "£22,000 – £24,500", lat: 50.3755, lon: -4.1427 },
  { title: "Ward Manager", location: "Leeds", region: "Yorkshire", family: "Leadership", contract: "Full time", salary: "£43,000 – £49,000", lat: 53.8008, lon: -1.5491 },
  { title: "Occupational Therapist", location: "Bath", region: "South West", family: "Allied Health", contract: "Part time", salary: "£31,000 – £37,500", lat: 51.3811, lon: -2.3590 },
  { title: "Support Worker", location: "Manchester", region: "North West", family: "Care & Support", contract: "Bank", salary: "£21,500 – £23,000", lat: 53.4808, lon: -2.2426 },
  { title: "Staff Nurse (Nights)", location: "Birmingham", region: "Midlands", family: "Nursing", contract: "Full time", salary: "£29,000 – £35,000", lat: 52.4862, lon: -1.8904 },
  { title: "Physiotherapist", location: "Cardiff", region: "Wales", family: "Allied Health", contract: "Full time", salary: "£32,000 – £38,000", lat: 51.4816, lon: -3.1791 },
  { title: "Deputy Ward Manager", location: "Bristol", region: "South West", family: "Leadership", contract: "Full time", salary: "£37,000 – £42,000", lat: 51.4545, lon: -2.5879 },
  { title: "Senior Support Worker", location: "Liverpool", region: "North West", family: "Care & Support", contract: "Full time", salary: "£24,000 – £26,500", lat: 53.4084, lon: -2.9916 },
  { title: "Speech & Language Therapist", location: "Sheffield", region: "Yorkshire", family: "Allied Health", contract: "Part time", salary: "£33,000 – £40,000", lat: 53.3811, lon: -1.4701 },
  { title: "Registered Mental Health Nurse", location: "Nottingham", region: "Midlands", family: "Nursing", contract: "Full time", salary: "£28,500 – £34,000", lat: 52.9548, lon: -1.1581 },
  { title: "Clinical Lead", location: "Swansea", region: "Wales", family: "Leadership", contract: "Full time", salary: "£45,000 – £52,000", lat: 51.6214, lon: -3.9436 },
];

export const FAMILIES = ["Nursing", "Care & Support", "Allied Health", "Leadership"];
export const REGIONS = ["South West", "Midlands", "North West", "Yorkshire", "Wales"];

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

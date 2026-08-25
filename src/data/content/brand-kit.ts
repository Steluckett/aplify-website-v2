/**
 * Brand kit demo — the stops the slider travels through, and the copy.
 *
 * WHAT THE SLIDER ACTUALLY CHANGES, and nothing else (Stephen, 2026-08-24):
 * the search button's colour, the job title's colour, the category pill's wash
 * and ink, the border radius of every rounded thing on the screen, and the
 * typeface. The phone's grey screen, its body greys and its neutral pills DO
 * NOT MOVE. That restraint is the point — a demo where everything changes
 * proves nothing, because the reader cannot tell what is themeable from what is
 * merely different. Holding the greys still makes the themed parts legible AS
 * the themeable set.
 *
 * WHY STOPS RATHER THAN PRESETS. The control is one slider, so what matters is
 * the JOURNEY. Each stop is a designed brand at a point on it; everything
 * between is interpolated in Oklab. Two stops alone would put a mush at the
 * midpoint — four means every resting position is a brand somebody could have.
 *
 * `radius` MUST stay monotonic. Square → fully rounded is the headline, and a
 * stop that dipped would read as the control being broken. One value drives
 * every corner on the screen: CSS clamps a radius to half the box, so 34px is
 * a true pill on a 48px field and a 34px corner on a tall card, automatically.
 *
 * §6.5 — the four organisations are INVENTED, and now appear only in
 * `aria-valuetext`; nothing on screen names them. None is a client and none may
 * be swapped for a real name: §5 allows exactly one logo on this site (Brandon
 * Trust, beside the one statistic) and none of these is it.
 *
 * If a stop is edited, RE-MEASURE. The demo interpolates, so safe endpoints
 * prove nothing about t = 0.5; the sweep has to walk the range.
 */

export interface BrandStop {
  /** Position on the slider, 0–1. Must ascend. */
  at: number;
  /** Assistive technology only — never rendered. */
  name: string;
  /**
   * TWO colours per brand, because one is not how brands work. `main` is the
   * loud one — the search button and the location pin. `highlight` is its
   * complement and carries the job title. Each pill takes a TINT of one of
   * them with that same colour at full strength for its wording, so the pair
   * appears four times on the screen and reads as a kit rather than a stripe.
   */
  main: string;
  highlight: string;
  /** Text sitting ON the main colour. */
  mainInk: string;
  /** Corner radius in px, applied to every rounded thing. Monotonic. */
  radius: number;
  font: string;
}

export const BRAND_STOPS: BrandStop[] = [
  {
    at: 0,
    name: "Northbank Health",
    main: "#0b63c4",
    highlight: "#9a5312",
    mainInk: "#ffffff",
    radius: 0,
    font: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  },
  {
    at: 0.34,
    name: "Meridian Care",
    main: "#a8501d",
    highlight: "#15706b",
    mainInk: "#ffffff",
    radius: 12,
    font: 'ui-rounded, "SF Pro Rounded", "Hiragino Maru Gothic ProN", system-ui, sans-serif',
  },
  {
    at: 0.67,
    name: "Ashgrove Trust",
    main: "#2f6b45",
    highlight: "#8c3f6b",
    mainInk: "#ffffff",
    radius: 22,
    font: 'ui-serif, Georgia, "Times New Roman", serif',
  },
  {
    at: 1,
    name: "Halden Group",
    main: "#a8175f",
    highlight: "#414b5a",
    mainInk: "#ffffff",
    radius: 34,
    font: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  },
];

export const brandKit = {
  eyebrow: "Your brand, not ours",
  lines: ["It should look like you,", "not like us"],
  linesSm: ["It should look", "like you,", "not like us"],
  /**
   * REWRITTEN 2026-08-25 with the band, which lost its three cards.
   *
   * The old standfirst spent its length on WHERE things render. Stephen's
   * steer: "we need to reduce the need to mention careers site or landing page
   * - that should be obvious... it is less about where it lives but why it
   * should be used." So it now spends its length on WHAT is configurable, and
   * ends by telling the reader to use the control.
   *
   * "Surface" is gone, here and in the cards, under the plain-English rule.
   * It was the clearest bit of software-speak left on the page.
   *
   * ⚠️ The configurable list is Stephen's, confirmed 2026-08-24, and is wider
   * than V2_HANDOVER §1 used to record. §1 was amended on 2026-08-25 to match,
   * so this copy IS now sourced — but the amendment is attributed to him
   * rather than to a client document, and it is dated. Do not widen it further
   * without asking.
   */
  standfirst:
    "Colours, type, corners, shadows, spacing, photography, your logo. The apply flow and the dashboard your team works in both read the same settings. Set it once, then drag the slider.",

  /** The control's accessible name. Nothing labels it on screen. */
  sliderLabel: "Brand style",

  phone: {
    keywordPlaceholder: "Job title or keyword",
    location: "Manchester",
    search: "Search",
    sortedBy: "Sorted by distance",
    count: "48",
    countUnit: "roles",
    view: "View",
    jobs: [
      {
        title: "Assistant General Manager",
        place: "Manchester",
        distance: "2.4 miles",
        category: "Management",
        contract: "Full time",
        salary: "£34–38k",
      },
      {
        title: "Support Worker",
        place: "Manchester",
        distance: "3.1 miles",
        category: "Care & Support",
        contract: "Full time",
        salary: "£21.5–23k",
      },
      /* The third exists to be CUT. It is what makes the phone read as a list
         that continues past the edge of the card rather than a short one that
         happens to end there. Salary matches `job-data.ts` so the page keeps
         one world. Hidden entirely below `sm` — see the note in the demo. */
      {
        title: "Healthcare Assistant",
        place: "Manchester",
        distance: "5.2 miles",
        category: "Care & Support",
        contract: "Part time",
        salary: "£22–24.5k",
      },
      /* The fourth is the one the crop actually lands in. With three, the list
         ended cleanly a little above the phone's edge and read as STOPPING
         rather than continuing — the whole point of the overhang is that there
         is obviously more below. Bolton is a real town near Manchester (§6.6)
         and the salary matches `job-data.ts`. */
      {
        title: "Staff Nurse (Nights)",
        place: "Bolton",
        distance: "8.7 miles",
        category: "Nursing",
        contract: "Full time",
        salary: "£29–35k",
      },
    ],
  },
};

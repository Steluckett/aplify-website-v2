/**
 * "Where it sits" — handover §8.5. The structural claim is the sentence that
 * makes the product legible in one read (§7) and is quoted verbatim.
 */

export const platformContent = {
  eyebrow: "Where it sits",
  headline: "Between your ATS and your candidates",
  standfirst:
    "One side of Aplify never touches a candidate. The other side is everything a candidate ever sees. Both run off the same cleaned data.",
  halves: [
    {
      id: "data",
      label: "For your data",
      title: "The engine behind it",
      note: "Never touches a candidate",
      facts: [
        "Ingest from any ATS, in XML, JSON or CSV",
        "Salaries, titles and UK regions normalised",
        "Descriptions rewritten to your tone of voice",
        "Every role sorted into a consistent job family",
        "Clean feeds pushed back out to job boards",
      ],
    },
    {
      id: "candidates",
      label: "For your candidates",
      title: "The experience they get",
      note: "Everything a candidate ever sees",
      facts: [
        "Search by keyword, region, salary and contract",
        "Postcode search with an interactive map",
        "Apply on the page, with no account to create",
        "Register for hiring events the same way",
        "Branded status emails at every stage",
      ],
    },
  ],
};

export const howItWorksContent = {
  eyebrow: "How it works",
  headline: "Six stages, from raw feed to finished application",
};

/**
 * §8.7, compressed to a strip.
 *
 * The section's four capabilities each carried a paragraph and three facts —
 * which restated the candidate half of `platformContent` above and described
 * what the job-search demo below proves live. Names and one line each is all
 * the page needs; the detail is in the demo.
 */
export const candidatesContent = {
  eyebrow: "For your candidates",
  headline: "Everything they see, on your own site",
  strip: [
    {
      title: "Find the right job",
      blurb: "Keyword, region, salary and contract — plus postcode search and a map.",
    },
    {
      title: "Apply without leaving",
      blurb: "On-page and anonymous, with pre-qualification before the form.",
    },
    {
      title: "Register for events",
      blurb: "Hiring events get the same low-friction flow, on their own tab.",
    },
    {
      title: "Kept informed",
      blurb: "Branded status emails at every stage, in your own voice.",
    },
  ],
};

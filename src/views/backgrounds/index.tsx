/**
 * Blob background reference.
 *
 * Fifteen numbered grounds built from our own palette, in the manner of the
 * Workable reference: three soft radial fields over a base, finished with
 * film grain. Ask for one by number — "use 04 behind the security section".
 *
 * Every contrast figure printed here was computed at the WORST point of the
 * background, not an average: where all three blobs overlap on a light
 * ground, and where none of them reach on a dark one. An average would say
 * they are all fine, and three of them are not.
 *
 * Server component — nothing here is interactive.
 */

type Band = "soft" | "vivid" | "deep" | "deep-card";

interface Ground {
  id: string;
  name: string;
  band: Band;
  /** The light ground it is derived from, for the deep-card set. */
  parent?: string;
  /** Contrast at the background's worst point. */
  heading: number;
  body: number;
  white: number;
  note: string;
}

const GROUNDS: Ground[] = [
  {
    id: "01",
    name: "Dawn",
    band: "soft",
    heading: 10.64,
    body: 4.56,
    white: 1.06,
    note: "Sky and violet over near-white. The quietest of the set.",
  },
  {
    id: "02",
    name: "Meadow",
    band: "soft",
    heading: 11.49,
    body: 4.92,
    white: 1.05,
    note: "Mint-led. The most neutral, and the safest for long copy.",
  },
  {
    id: "03",
    name: "Blush",
    band: "soft",
    heading: 10.8,
    body: 4.62,
    white: 1.07,
    note: "The only warm ground. Useful to break a run of cool sections.",
  },
  {
    id: "04",
    name: "Harbour",
    band: "vivid",
    heading: 7.35,
    body: 3.15,
    white: 1.15,
    note: "Brand sky and violet at full strength. Made to hold a product shot.",
  },
  {
    id: "05",
    name: "Orchard",
    band: "vivid",
    heading: 8.53,
    body: 3.65,
    white: 1.13,
    note: "Amber, teal and violet. The warmest vivid ground.",
  },
  {
    id: "06",
    name: "Spectrum",
    band: "vivid",
    heading: 5.82,
    body: 2.49,
    white: 1.17,
    note: "The loudest light ground. One per page at most.",
  },
  {
    id: "07",
    name: "Dusk",
    band: "deep",
    heading: 2.89,
    body: 1.24,
    white: 8.41,
    note: "Violet into magenta. The most saturated of the deep set.",
  },
  {
    id: "08",
    name: "Deep",
    band: "deep",
    heading: 3.38,
    body: 1.45,
    white: 10.98,
    note: "Brand blue into violet. The natural partner to the vivid cards.",
  },
  {
    id: "09",
    name: "Forest",
    band: "deep",
    heading: 3.13,
    body: 1.34,
    white: 10.03,
    note: "Teal and indigo. Cooler and calmer than Dusk.",
  },
  {
    id: "10",
    name: "Midnight",
    band: "deep",
    heading: 2.56,
    body: 1.1,
    white: 18.69,
    note: "Brand navy with jewel fields. The page's dark moment, if it takes one.",
  },
  {
    id: "11",
    name: "Meadow deep",
    band: "deep-card",
    parent: "02 Meadow",
    heading: 1.33,
    body: 1.1,
    white: 6.1,
    note: "Mint and sky over deep teal. The coolest and quietest of the five.",
  },
  {
    id: "12",
    name: "Dawn deep",
    band: "deep-card",
    parent: "01 Dawn",
    heading: 1.18,
    body: 1.05,
    white: 7.83,
    note: "Brand sky and violet over navy. The closest to the product's own colour.",
  },
  {
    id: "13",
    name: "Blush deep",
    band: "deep-card",
    parent: "03 Blush",
    heading: 1.21,
    body: 1.07,
    white: 8.11,
    note: "Amber and rose over plum. The only warm ground in the deep set.",
  },
  {
    id: "14",
    name: "Spectrum deep",
    band: "deep-card",
    parent: "06 Spectrum",
    heading: 1.21,
    body: 1.06,
    white: 8.22,
    note: "The loudest of the deep set — sky, violet and rose together.",
  },
  {
    id: "15",
    name: "Orchard deep",
    band: "deep-card",
    parent: "05 Orchard",
    heading: 1.31,
    body: 1.09,
    white: 7.47,
    note: "Amber and teal over bronze. Reads more muted than its light parent where the fields overlap.",
  },
];

const BAND_COPY: Record<Band, { label: string; verdict: string }> = {
  soft: { label: "Soft", verdict: "Text safe — headings and body copy" },
  vivid: { label: "Vivid", verdict: "Cards only — body copy fails on it" },
  deep: { label: "Deep", verdict: "White ink only — pure white, never faded" },
  "deep-card": {
    label: "Deep · card",
    verdict: "Built for card grounds — white ink also clears",
  },
};

const Metric = ({ label, value, pass }: { label: string; value: number; pass: boolean }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-hairline py-2 last:border-b-0">
    <span className="text-xs text-ink-label">{label}</span>
    <span className="text-xs font-medium tabular-nums">
      {value.toFixed(2)}:1{" "}
      <span className={pass ? "text-ink-accent" : "text-ink-label"}>
        {pass ? "pass" : "fail"}
      </span>
    </span>
  </div>
);

const Swatch = ({ g }: { g: Ground }) => {
  const deep = g.band === "deep" || g.band === "deep-card";
  return (
    <section className="tile overflow-hidden rounded-panel">
      {/* The ground itself, shown at a size you can actually judge, with a
          card on it so the cards-only case is visible rather than described. */}
      <div className={`grain bg-${g.id} flex min-h-[19rem] flex-col justify-between p-8`}>
        <div>
          <p
            className={`text-xs font-medium tracking-[0.18em] uppercase ${
              deep ? "text-white/70" : "text-ink-label"
            }`}
          >
            {g.id} · {BAND_COPY[g.band].label}
          </p>
          <p
            className={`display mt-3 text-h3 ${deep ? "text-white" : "text-ink-heading"}`}
          >
            {g.name}
          </p>
          {g.band !== "vivid" ? (
            <p
              className={`mt-4 max-w-[26rem] text-sm leading-[1.6] ${
                deep ? "text-white" : "text-ink-body"
              }`}
            >
              Body copy sits directly on this ground.
            </p>
          ) : null}
        </div>

        <div className="tile mt-8 w-fit rounded-sm px-5 py-4">
          <p className="text-sm font-medium text-ink">A card on the ground</p>
          <p className="mt-1 text-xs text-ink-label">Always safe, on any of the fifteen.</p>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm font-medium">{BAND_COPY[g.band].verdict}</p>
        <p className="mt-2 text-xs leading-[1.6] text-ink-label">{g.note}</p>
        {g.parent ? (
          <p className="mt-2 text-xs text-ink-label">
            Deep counterpart of <span className="text-ink">{g.parent}</span>.
          </p>
        ) : null}
        <div className="mt-4">
          <Metric label="Heading ink" value={g.heading} pass={g.heading >= 4.5} />
          <Metric label="Body ink" value={g.body} pass={g.body >= 4.5} />
          <Metric label="White ink" value={g.white} pass={g.white >= 4.5} />
        </div>
        <p className="mt-4 text-xs text-ink-label">
          Use with <code className="text-ink">.bg-{g.id}</code>, plus{" "}
          <code className="text-ink">.grain</code>.
        </p>
      </div>
    </section>
  );
};

export const BackgroundsView = () => (
  <main className="shell py-26">
    <header className="max-w-[46rem]">
      <p className="eyebrow">Reference</p>
      <h1 className="display lines-tight mt-5 text-h1">Blob grounds</h1>
      <p className="mt-6 text-lead leading-[1.6] text-ink-body">
        Fifteen numbered backgrounds from our own palette. Ask for one by
        number.
        Every figure below is measured at the background&rsquo;s worst point —
        where all three fields overlap on a light ground, and where none of them
        reach on a dark one.
      </p>
      <p className="mt-5 max-w-[38rem] text-sm leading-[1.6] text-ink-label">
        The bands are not about taste, they are about what can sit on them. The
        vivid three are the ones to watch: their headings clear comfortably and
        their body copy does not, which is exactly the trap an averaged
        contrast check would hide.
      </p>
    </header>

    <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
      {GROUNDS.map((g) => (
        <Swatch key={g.id} g={g} />
      ))}
    </div>
  </main>
);

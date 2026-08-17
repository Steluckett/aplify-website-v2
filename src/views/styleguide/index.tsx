/**
 * Aurora — web expression. A living reference: it renders with the real token
 * layer, so it cannot drift from what the site ships. Its sibling is the
 * dashboard's own styleguide at /helion/styleguide; where the two differ, the
 * difference is deliberate and noted in the copy beside it.
 *
 * Server component on purpose — nothing here is interactive.
 */

const STATE_CHIPS = [
  { state: "success", label: "Live" },
  { state: "attention", label: "Failed" },
  { state: "warn", label: "Pending" },
  { state: "teal", label: "Synced" },
  { state: "slate", label: "Draft" },
  { state: "rose", label: "Closed" },
  { state: "violet", label: "Running" },
] as const;

const CHART_HUES = [
  "--raw-color-chart-1",
  "--raw-color-chart-2",
  "--raw-color-chart-3",
  "--raw-color-chart-4",
  "--raw-color-chart-5",
  "--raw-color-chart-6",
];

const BARS = [
  { day: "Mon", value: 87 },
  { day: "Tue", value: 81 },
  { day: "Wed", value: 92, accent: true },
  { day: "Thu", value: 85 },
  { day: "Fri", value: 76 },
];

function Section({
  eyebrow,
  title,
  note,
  children,
}: {
  eyebrow: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="panel mb-12 p-8">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display mt-3 text-h3">{title}</h2>
      {note ? (
        <p className="mt-3 max-w-[62ch] text-body leading-[1.6] text-ink-body">{note}</p>
      ) : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function StyleguideView() {
  return (
    <main className="mx-auto w-full max-w-[76rem] px-8 py-24">
      <header className="mb-12">
        <p className="eyebrow">Design system</p>
        <h1 className="display mt-4 text-h1">
          Aurora, in <span className="grad-tip">daylight</span>
        </h1>
        <p className="mt-5 max-w-[62ch] text-lead leading-[1.6] text-ink-body">
          The same materials as the Helion dashboard, in the marketing register.
          Every value here resolves from <code>src/app/globals.css</code>, so this
          page cannot drift from what ships.
        </p>
      </header>

      {/* --- Type ---------------------------------------------------------- */}
      <Section
        eyebrow="Type"
        title="One face, two registers"
        note="Inter throughout — the same self-hosted files the product ships. Display sizes take weight 550 with tight tracking; the variable optical-size axis supplies the Display cuts automatically, so there is no second family. Running copy sits a step lighter than UI ink, which is what keeps paragraphs from reading heavy beside the figures."
      >
        <div className="space-y-6">
          <p className="display text-display">Display 72</p>
          <p className="display text-h1">Section head 56</p>
          <p className="display text-h2">Heading 40</p>
          <p className="display text-h3">Card title 28</p>
          <p className="text-lead text-ink-body">
            Lead 18 — the standfirst under a section head, always a step lighter
            than the heading it follows.
          </p>
          <p className="max-w-[62ch] text-body leading-[1.6] text-ink-body">
            Body 16. Running copy takes the body ink rather than full UI ink, at
            1.6 leading. Anything longer than about 62 characters a line is
            tiring to read, so the measure is capped rather than left to the
            container.
          </p>
          <p className="text-sm text-ink-label">Small 14, label ink — 5.13:1 on white.</p>
          <p className="eyebrow">Eyebrow 12</p>
        </div>
      </Section>

      {/* --- Depth --------------------------------------------------------- */}
      <Section
        eyebrow="Depth"
        title="Three tonal steps"
        note="Ground, then a translucent group the ground breathes through, then a white tile carrying the visible lift. The tone difference is the depth — a shadow on same-tone surfaces reads flat however heavy it is."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-card border border-hairline p-6">
            <p className="text-sm font-medium">1 · Ground</p>
            <p className="mt-2 text-sm text-ink-label">
              Tinted near-white with three fixed washes.
            </p>
          </div>
          <div className="panel p-6">
            <p className="text-sm font-medium">2 · Group</p>
            <p className="mt-2 text-sm text-ink-label">
              Translucent white, whisper shadow.
            </p>
          </div>
          <div className="tile p-6">
            <p className="text-sm font-medium">3 · Tile</p>
            <p className="mt-2 text-sm text-ink-label">
              Solid white, the visible lift.
            </p>
          </div>
        </div>
      </Section>

      {/* --- Wash + inset -------------------------------------------------- */}
      <Section
        eyebrow="Composition"
        title="Wash + inset is law"
        note="Wherever the spectrum wash grounds a surface, its content sits in an inset 12px from the edge — the wash is a frame, not a field of padding. White inset for figures; glass inset for anything holding white pill fields, because a white inset would swallow them."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="wash rounded-card">
            <div className="px-3 pt-3 pb-4">
              <p className="text-sm font-medium">Live now</p>
            </div>
            <div className="inset-tile p-6">
              <p className="figure text-stat-hero">
                100<span className="figure-unit">%</span>
              </p>
              <div className="tally my-5" style={{ "--fill": "100%" } as React.CSSProperties} />
              <p className="text-sm text-ink-label">41 of 41 jobs live</p>
            </div>
          </div>

          <div className="wash rounded-card">
            <div className="px-3 pt-3 pb-4">
              <p className="text-sm font-medium">Filter</p>
            </div>
            <div className="inset-glass p-6">
              <label className="mb-2 block text-sm text-ink-label" htmlFor="sg-search">
                Keyword
              </label>
              <input id="sg-search" className="field" placeholder="Search jobs" />
              <div className="mt-4 flex gap-3">
                <button className="btn btn-primary" type="button">
                  Apply filters
                </button>
                <button className="btn btn-secondary" type="button">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* --- The dark moment ----------------------------------------------- */}
      <Section
        eyebrow="Contrast"
        title="One dark moment per page"
        note="Brand ink navy, and at most one surface wears it — it is the page's moment of contrast and a second one halves both. White on navy measures 18.69:1."
      >
        <div className="dark-moment p-8">
          <p className="text-sm text-white/60">Jobs and applications</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["41", "Active jobs"],
              ["41", "Total jobs"],
              ["5", "Applications"],
              ["3", "Candidates"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-sm bg-white/5 p-5 ring-1 ring-white/[0.07]"
              >
                <p className="figure text-stat text-white">{value}</p>
                <p className="mt-2 text-sm text-white/60">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* --- Chips --------------------------------------------------------- */}
      <Section
        eyebrow="Chips"
        title="Dots mean state, tints mean classification"
        note="A dot says something is happening. Classification is coloured but silent — a dot on every label makes each one read as a status. Every ink below clears 4.5:1 on the chip ground and on white; four were darkened from the dashboard's values to get there, since this page is public."
      >
        <div className="space-y-6">
          <div>
            <p className="eyebrow mb-3">State — dot + 700-shade ink</p>
            <div className="flex flex-wrap gap-2">
              {STATE_CHIPS.map((c) => (
                <span key={c.state} className="chip" data-state={c.state}>
                  {c.label}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow mb-3">Classification — quiet tint, no dot</p>
            <div className="flex flex-wrap gap-2">
              <span className="chip" data-tint="info">
                Nursing
              </span>
              <span className="chip" data-tint="sky">
                Registered Nurse
              </span>
              <span className="chip">Full time</span>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-3">
              Icon chips — neutral ground, blue glyph
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="icon-chip" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path
                    d="M3 7h18M3 12h18M3 17h12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="icon-chip" data-ai aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path
                    d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <p className="text-sm text-ink-label">
                The sweep-filled circle means a model wrote the content, and
                nothing else. The reference fills these green; the dashboard
                retired that — colour is reserved for state and the accent.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* --- Progress ------------------------------------------------------ */}
      <Section
        eyebrow="Progress"
        title="The tally, everywhere"
        note="Thin 3px bars, 5px gaps, the spectrum sweeping left to right. One look for 'how far along' wherever it appears. Thin is the point — never thicken these for visibility."
      >
        <div className="space-y-6">
          {[28, 62, 100].map((fill) => (
            <div key={fill}>
              <div
                className="tally"
                style={{ "--fill": `${fill}%` } as React.CSSProperties}
              />
              <p className="mt-2 text-sm text-ink-label">{fill}%</p>
            </div>
          ))}
        </div>
      </Section>

      {/* --- Charts -------------------------------------------------------- */}
      <Section
        eyebrow="Charts"
        title="The Vivid six, lit from above"
        note="Assigned in fixed order, never cycled — validated for colourblind separation and 3:1 on both card surfaces. Marks read as lit from above: an emphasised bar is a SINGLE hue blending vertically from a near-white crown into the full hue, never the two-hue brand sweep, which belongs to interactive fills."
      >
        <div className="mb-8 flex flex-wrap gap-3">
          {CHART_HUES.map((token, i) => (
            <div key={token} className="text-center">
              <div
                className="h-12 w-12 rounded-sm"
                style={{ background: `var(${token})` }}
              />
              <p className="mt-2 text-sm text-ink-label">{i + 1}</p>
            </div>
          ))}
        </div>

        <div className="tile max-w-md p-6">
          <p className="text-sm font-medium">Activity</p>
          <p className="figure mt-4 text-stat-hero">
            85<span className="figure-unit">%</span>
          </p>
          <div className="mt-6 flex h-40 items-stretch gap-2">
            {BARS.map((b) => (
              <div
                key={b.day}
                className="flex flex-1 items-end overflow-hidden rounded-[14px] bg-surface-chip"
              >
                <div
                  className="w-full rounded-[14px]"
                  style={{
                    height: `${b.value}%`,
                    background: b.accent
                      ? "linear-gradient(180deg, var(--raw-color-chart-crown) 0%, var(--raw-color-chart-1) 85%)"
                      : "var(--raw-surface-tile)",
                    boxShadow: b.accent
                      ? "none"
                      : "inset 0 0 0 1px var(--raw-color-border)",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            {BARS.map((b) => (
              <p key={b.day} className="flex-1 text-center text-sm text-ink-label">
                {b.day}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* --- Product register ---------------------------------------------- */}
      <Section
        eyebrow="Registers"
        title="Inside a product frame"
        note="The .screen boundary drops type to Aurora's UI scale and radii to 22/16/12. This is what stops a screenshot reading as more page — software has small type, and a mockup set at marketing sizes gives itself away instantly. Both cards below use identical markup; only the register differs."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="tile p-6">
            <p className="mb-1 text-sm text-ink-label">Marketing register</p>
            <p className="display text-h3">Registered Nurse</p>
            <p className="mt-2 text-body text-ink-body">Bristol · South West</p>
            <div className="mt-4 flex gap-2">
              <span className="chip" data-tint="info">
                Nursing
              </span>
              <span className="chip">Full time</span>
            </div>
          </div>

          <div className="screen tile p-6">
            <p className="mb-1 text-ui-xs text-ink-label">Product register</p>
            <p className="text-ui-lg font-medium tracking-[-0.01em]">
              Registered Nurse
            </p>
            <p className="mt-2 text-ui-base text-ink-body">Bristol · South West</p>
            <div className="mt-4 flex gap-2">
              <span className="chip" data-tint="info">
                Nursing
              </span>
              <span className="chip">Full time</span>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}

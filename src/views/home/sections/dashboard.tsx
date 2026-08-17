"use client";

import { useMemo, useState } from "react";

import { Inview } from "@/components/animation/springs/in-view";
import { ProductShot } from "@/components/ui/product-shot";
import { SectionHead } from "@/components/ui/section-head";
import {
  SEED_APPLICATIONS,
  SEED_REGISTRATIONS,
  STATUSES,
  dashboardContent,
  type Application,
  type Status,
} from "@/data/content/dashboard-data";

const CATEGORIES = [...new Set(SEED_APPLICATIONS.map((a) => a.category))];

/** Status pill colouring — functional UI semantics, scoped to the demo. */
const STATUS_STYLE: Record<Status, string> = {
  Submitted: "border-hairline text-ink",
  Reviewed: "border-ink-soft/50 text-ink",
  Shortlisted: "border-brand/50 text-brand",
  Accepted: "border-[#1a7f4e]/50 text-[#1a7f4e]",
  Rejected: "border-[#b3423a]/40 text-[#b3423a]",
  Withdrawn: "border-hairline text-ink-soft",
};

/**
 * The recruiter dashboard, working (§8.10, §11): filter it, open a candidate,
 * change a status and watch the timeline write itself, export the filtered
 * set as a genuine file. Registrations live on their own tab, never mixed
 * with applications. The ATS hand-off block renders AFTER it — the reader
 * gets permission to skip the dashboard only once they have seen it.
 */
export const Dashboard = () => {
  const content = dashboardContent;

  const [tab, setTab] = useState<"applications" | "registrations">("applications");
  const [status, setStatus] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [applications, setApplications] = useState<Application[]>(SEED_APPLICATIONS);
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      applications.filter(
        (application) =>
          (!status || application.status === status) &&
          (!category || application.category === category),
      ),
    [applications, status, category],
  );

  const open = applications.find((application) => application.id === openId) ?? null;

  const changeStatus = (id: string, next: Status) => {
    setApplications((current) =>
      current.map((application) => {
        if (application.id !== id || application.status === next) {
          return application;
        }
        return {
          ...application,
          status: next,
          timeline: [
            {
              kind: "status" as const,
              label: `${application.status} → ${next}`,
              by: content.detail.changedBy,
              when: content.detail.changedWhen,
            },
            ...application.timeline,
          ],
        };
      }),
    );
  };

  /** A genuine file, from the rows the filters left visible. */
  const exportCsv = () => {
    const header = ["ID", "Name", "Email", "Job", "Category", "Status", "Source", "Applied"];
    const rows = filtered.map((a) =>
      [a.id, a.name, a.email, a.job, a.category, a.status, a.source, a.applied]
        .map((field) => `"${field.replaceAll('"', '""')}"`)
        .join(","),
    );
    const blob = new Blob([[header.join(","), ...rows].join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "aplify-applications-sample.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="dashboard"
      aria-labelledby="dashboard-heading"
      className="border-t border-hairline px-6 py-28 sm:px-10 lg:py-36"
    >
      <SectionHead
        eyebrow={content.eyebrow}
        lines={["One place to", "action all of it"]}
        id="dashboard-heading"
        standfirst={content.standfirst}
        volume="piece"
      />

      <Inview
        tag="div"
        mode="once"
        from={{ opacity: 0, filter: "blur(10px)" }}
        to={{ opacity: 1, filter: "blur(0px)" }}
        config={{ tension: 170, friction: 30 }}
        className="mt-16"
      >
        <ProductShot frame="browser" url="app.aplify.co.uk/applications">
        <div className="p-5 sm:p-8">
        {/* Tab bar. */}
        <div
          role="tablist"
          aria-label="Dashboard tabs"
          className="inline-flex w-fit rounded-pill bg-surface-raised p-1"
        >
          {(
            [
              ["applications", `${content.tabs.applications} (${applications.length})`],
              ["registrations", `${content.tabs.registrations} (${SEED_REGISTRATIONS.length})`],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={tab === value}
              onClick={() => {
                setTab(value);
                setOpenId(null);
              }}
              className={`rounded-pill px-5 py-2.5 text-caption font-medium uppercase tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-brand-light ${
                tab === value
                  ? "bg-ink text-canvas"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "applications" && open ? (
          <CandidateDetail
            application={open}
            onBack={() => setOpenId(null)}
            onStatusChange={(next) => changeStatus(open.id, next)}
          />
        ) : tab === "applications" ? (
          <div className="mt-6">
            {/* Filter strip + export. */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                <label className="inline-flex items-center gap-2 rounded-pill bg-surface-raised px-4 py-2 text-body">
                  <span className="text-ink-soft">Status</span>
                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    className="bg-transparent font-medium outline-none"
                  >
                    <option value="">{content.filters.allStatuses}</option>
                    {STATUSES.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="inline-flex items-center gap-2 rounded-pill bg-surface-raised px-4 py-2 text-body">
                  <span className="text-ink-soft">Category</span>
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="bg-transparent font-medium outline-none"
                  >
                    <option value="">{content.filters.allCategories}</option>
                    {CATEGORIES.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden text-caption text-ink-soft sm:inline">
                  {content.filters.exportHint}
                </span>
                <button
                  type="button"
                  onClick={exportCsv}
                  className="rounded-pill bg-ink px-5 py-2.5 text-caption font-medium
                             uppercase tracking-wide text-canvas outline-none
                             hover:bg-brand focus-visible:ring-2
                             focus-visible:ring-brand-light"
                >
                  {content.filters.export} ↓
                </button>
              </div>
            </div>

            {/* The list. */}
            {filtered.length === 0 ? (
              <p className="py-12 text-center text-body text-ink-soft">
                {content.filters.empty}
              </p>
            ) : (
              <div className="mt-5 overflow-x-auto rounded-card bg-surface-raised px-5 sm:px-6">
                <table className="w-full min-w-[52rem] border-collapse text-body">
                  <thead>
                    <tr className="border-b border-hairline text-left text-caption uppercase tracking-[0.14em] text-ink-soft">
                      <th className="py-4 pr-6 font-normal">Candidate</th>
                      <th className="py-4 pr-6 font-normal">Job</th>
                      <th className="py-4 pr-6 font-normal">Source</th>
                      <th className="py-4 pr-6 font-normal">Applied</th>
                      <th className="py-4 font-normal">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((application) => (
                      <tr
                        key={application.id}
                        onClick={() => setOpenId(application.id)}
                        className="cursor-pointer border-b border-hairline last:border-b-0 hover:bg-surface"
                      >
                        <td className="py-4 pr-6">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setOpenId(application.id);
                            }}
                            className="text-left font-medium outline-none focus-visible:text-brand"
                          >
                            {application.name}
                          </button>
                          <p className="text-caption text-ink-soft">{application.email}</p>
                        </td>
                        <td className="py-4 pr-6">{application.job}</td>
                        <td className="py-4 pr-6">{application.source}</td>
                        <td className="py-4 pr-6 whitespace-nowrap">
                          {application.applied}
                        </td>
                        <td className="py-4">
                          <StatusPill status={application.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-card bg-surface-raised px-5 sm:px-6">
            <table className="w-full min-w-[44rem] border-collapse text-body">
              <thead>
                <tr className="border-b border-hairline text-left text-caption uppercase tracking-[0.14em] text-ink-soft">
                  <th className="py-4 pr-6 font-normal">Registrant</th>
                  <th className="py-4 pr-6 font-normal">Event</th>
                  <th className="py-4 pr-6 font-normal">Event date</th>
                  <th className="py-4 pr-6 font-normal">Registered</th>
                  <th className="py-4 font-normal">Attended</th>
                </tr>
              </thead>
              <tbody>
                {SEED_REGISTRATIONS.map((registration) => (
                  <tr
                    key={registration.id}
                    className="border-b border-hairline last:border-b-0"
                  >
                    <td className="py-4 pr-6">
                      <p className="font-medium">{registration.name}</p>
                      <p className="text-caption text-ink-soft">{registration.email}</p>
                    </td>
                    <td className="py-4 pr-6">{registration.event}</td>
                    <td className="py-4 pr-6 whitespace-nowrap">
                      {registration.eventDate}
                    </td>
                    <td className="py-4 pr-6 whitespace-nowrap">
                      {registration.registered}
                    </td>
                    <td className="py-4">{registration.attended ? "Yes" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
        </ProductShot>
      </Inview>

      <p className="mt-5 text-caption text-ink-soft">{content.caption}</p>

      {/* AFTER the dashboard, never before (§8.10): permission to skip it. */}
      <Inview
        tag="aside"
        mode="once"
        aria-labelledby="ats-heading"
        from={{ opacity: 0, filter: "blur(6px)" }}
        to={{ opacity: 1, filter: "blur(0px)" }}
        delayIn={150}
        config={{ tension: 190, friction: 26 }}
        className="mt-24 border-t border-hairline pt-12"
      >
        <p className="eyebrow">{content.ats.kicker}</p>
        <h3 id="ats-heading" className="display mt-4 text-[2.5rem]">
          {content.ats.heading}
        </h3>
        <div className="mt-6 grid max-w-5xl gap-6 lg:grid-cols-2 lg:gap-14">
          <p className="text-body leading-relaxed text-ink-muted">
            {content.ats.body}
          </p>
          <p className="text-body leading-relaxed text-ink-soft">
            {content.ats.eploy}
          </p>
        </div>
      </Inview>
    </section>
  );
};

const StatusPill = ({ status }: { status: Status }) => (
  <span
    className={`inline-flex items-center rounded-pill border px-3 py-1 text-caption font-medium ${STATUS_STYLE[status]}`}
  >
    {status}
  </span>
);

interface CandidateDetailProps {
  application: Application;
  onBack: () => void;
  onStatusChange: (next: Status) => void;
}

/**
 * Per-candidate view, in place of the list: detail, a status control, and the
 * timeline that writes itself when the status changes.
 */
const CandidateDetail = ({
  application,
  onBack,
  onStatusChange,
}: CandidateDetailProps) => {
  const content = dashboardContent;

  return (
    <div className="mt-6 rounded-card bg-surface-raised p-5 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h4 className="text-xl font-medium tracking-tight sm:text-2xl">
            {application.name}
          </h4>
          <p className="mt-1 text-body text-ink-soft">
            {application.email} · {application.id}
          </p>
          <p className="mt-2 text-body">{application.job}</p>
          <p className="mt-1 text-body text-ink-soft">
            Source: {application.source} · Applied {application.applied}
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="rounded-pill bg-surface px-4 py-2 text-caption font-medium
                     uppercase tracking-wide outline-none hover:bg-hairline
                     focus-visible:ring-2 focus-visible:ring-brand-light"
        >
          ← {content.detail.backLabel}
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-hairline pt-6">
        <span className="text-body text-ink-soft">{content.detail.statusLabel}</span>
        <StatusPill status={application.status} />
        <label className="inline-flex items-center gap-2 rounded-pill bg-surface px-4 py-2 text-body">
          <span className="text-ink-soft">Change to</span>
          <select
            value={application.status}
            onChange={(event) => onStatusChange(event.target.value as Status)}
            className="bg-transparent font-medium outline-none"
          >
            {STATUSES.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8">
        <h5 className="text-caption font-medium uppercase tracking-[0.22em] text-ink-soft">
          {content.detail.timelineHeading}
        </h5>
        <ol className="mt-4">
          {application.timeline.map((entry, index) => (
            <li
              key={`${entry.label}-${entry.when}-${index}`}
              className="flex flex-col gap-1 border-t border-hairline py-3.5 text-body
                         sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className={entry.kind === "note" ? "italic" : "font-medium"}>
                {entry.label}
              </span>
              <span className="text-ink-soft">
                {entry.by} · {entry.when}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

import { BookDemoOverlay } from "@/views/site/book-demo";

import { SigClose } from "./close";
import { SigHero } from "./hero";
import { SigNav } from "./nav";
import {
  SigAi,
  SigCost,
  SigDashboard,
  SigData,
  SigGoogle,
  SigIntegrations,
} from "./more";
import { SigDemo, SigFaq, SigImplementation, SigSecurity } from "./panels";
import { SigProof } from "./proof";
import { SigQuotes } from "./quotes";
import { SigSplit } from "./splits";
import { SigStages } from "./stages";
import { SigStatement, SigStats } from "./statement";
import { SigSteps } from "./steps";

/**
 * SIGNALS — the second homepage option (branch `design/signals-steer`).
 *
 * A full reimagining on marketingsignals.com's section patterns, type scale,
 * palette, geometry and motion (see `src/app/signals.css` for what was
 * measured). Aplify's argument and approved copy, their composition. The
 * Aurora page lives on at /classic for comparison.
 *
 * The reference's order, mapped:
 *   hero                  → the completion problem
 *   who we are (fill)     → why we built it
 *   stats                 → four figures, each sourced
 *   services slider       → the four candidate steps
 *   built around search   → where it sits / why they leave
 *   featured work panel   → proof
 *   industries deck       → six stages
 *   (no twin)             → the live job search
 *   what makes us diff.   → implementation
 *   testimonials (pinned) → three quotes + three case results
 *   insights              → security
 *   FAQ panel             → questions, answered in approved copy
 *   close + footer        → the ask
 */
export const SignalsView = () => (
  <div className="signals">
    <SigNav />
    <BookDemoOverlay />
    <main className="w-full overflow-x-clip">
      {/* The original page's five acts, in its order, each band in the
          reference's language. */}
      <SigHero />
      <SigStatement />
      <SigStats />
      <SigSplit />
      <SigCost />
      <SigSteps />
      <SigDemo />
      {/* <SigBrand /> — "It should look like you, not like us" is parked
          (Stephen, 2026-11-04). The band and its demo styles are kept in
          more.tsx / signals.css; restore this line to bring it back. */}
      <SigProof />
      <SigData />
      <SigAi />
      <SigGoogle />
      <SigStages />
      <SigDashboard />
      <SigIntegrations />
      <SigImplementation />
      <SigQuotes />
      <SigSecurity />
      <SigFaq />
    </main>
    <SigClose />
  </div>
);

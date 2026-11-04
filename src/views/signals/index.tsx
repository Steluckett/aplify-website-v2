import { BookDemoOverlay } from "@/views/site/book-demo";

import { SigClose } from "./close";
import { SigHero } from "./hero";
import { SigNav } from "./nav";
import { SigDemo, SigFaq, SigImplementation, SigQuotes, SigSecurity } from "./panels";
import { SigProof } from "./proof";
import { SigFriction, SigSplit } from "./splits";
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
 *   split ×2              → where it sits / why they leave
 *   featured work panel   → proof
 *   industries deck       → six stages
 *   (no twin)             → the live job search
 *   what makes us diff.   → implementation
 *   testimonials wall     → the three quotes
 *   insights              → security
 *   FAQ panel             → questions, answered in approved copy
 *   close + footer        → the ask
 */
export const SignalsView = () => (
  <div className="signals">
    <SigNav />
    <BookDemoOverlay />
    <main className="w-full overflow-x-clip">
      <SigHero />
      <SigStatement />
      <SigStats />
      <SigSteps />
      <SigSplit />
      <SigFriction />
      <SigProof />
      <SigStages />
      <SigDemo />
      <SigImplementation />
      <SigQuotes />
      <SigSecurity />
      <SigFaq />
    </main>
    <SigClose />
  </div>
);

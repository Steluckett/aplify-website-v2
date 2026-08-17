import { HeroSection } from "./hero/hero-section";
import { ContactModal } from "./contact-modal";
import { AiEnrichment } from "./sections/ai-enrichment";
import { Dashboard } from "./sections/dashboard";
import { HowItWorks } from "./sections/how-it-works";
import { JobSearch } from "./sections/job-search";
import { Platform } from "./sections/platform";
import { Proof } from "./sections/proof";
import { Integrations, Roadmap, Security } from "./sections/security";
import { SiteFooter } from "./sections/footer";
import { Spine } from "./sections/spine";
import { Testimonials } from "./sections/testimonials";

/**
 * Home view — handover §8 order throughout.
 *
 * The page is near-black end to end; there is no light ground and no inset
 * frame. The only bright things on it are the product screens, which is what
 * gives the page its ranking: four set pieces and three demos carry the
 * volume, everything else is deliberately quiet.
 */
export const HomeView = () => {
  return (
    <main className="grain relative w-full overflow-x-clip bg-canvas">
      <HeroSection />
      <Spine />
      <Platform />
      <HowItWorks />
      <JobSearch />
      <AiEnrichment />
      <Dashboard />
      <Security />
      <Integrations />
      <Roadmap />
      <Proof />
      <Testimonials />
      <SiteFooter />
      <ContactModal />
    </main>
  );
};

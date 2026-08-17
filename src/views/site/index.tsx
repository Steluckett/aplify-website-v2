import { NavBar } from "@/components/ui/nav-bar";
import { nav } from "@/data/content/site";

import { Hero } from "./hero";
import { Platform } from "./platform";
import { SiteFooter } from "./footer";

/**
 * The Aurora rebuild.
 *
 * Sections land here as they are built. The interactive demos from the
 * previous build (job search, Easy Apply, AI rewrite, recruiter triage) are
 * still in `src/views/home/` and keep working — they are re-skinned into this
 * composition rather than rebuilt, so nothing that already earns its place is
 * thrown away.
 */
export const SiteView = () => (
  <>
    <NavBar items={nav.items} ctaLabel={nav.ctaLabel} ctaHref={nav.ctaHref} />
    <main className="relative w-full overflow-x-clip">
      <Hero />
      <Platform />
      <SiteFooter />
    </main>
  </>
);

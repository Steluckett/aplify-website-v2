import { NavBar } from "@/components/ui/nav-bar";
import { nav } from "@/data/content/site";

import { Product } from "./product";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { Platform } from "./platform";
import { SiteFooter } from "./footer";
import { Payoff, Story } from "./story";
import { Trust } from "./trust";

/**
 * The Aurora rebuild.
 *
 * Section order follows V2_HANDOVER §8. Bands alternate between the tinted
 * ground and full-bleed white so the scroll has rhythm — the reference's hard
 * breaks, and the reason a page this long does not read as one grey column.
 */
export const SiteView = () => (
  <>
    <NavBar items={nav.items} ctaLabel={nav.ctaLabel} ctaHref={nav.ctaHref} />
    <main className="relative w-full overflow-x-clip">
      <Hero />
      <Story />
      <Payoff />
      <Platform />
      <HowItWorks />
      <Product />
      <Trust />
      <SiteFooter />
    </main>
  </>
);

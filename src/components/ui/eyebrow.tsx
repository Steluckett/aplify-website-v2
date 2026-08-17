import type { ReactNode } from "react";

export interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/**
 * Small uppercase section label with a leading brand dot — the quietest thing
 * on screen (handover §10.1). The page is dark end to end and `.screen` flips
 * the ink roles inside product frames, so there is no light/dark variant to
 * pass: the token cascade handles it.
 */
export const Eyebrow = ({ children, className }: EyebrowProps) => (
  <span className={`eyebrow inline-flex items-center gap-2 ${className ?? ""}`}>
    <span className="size-1.5 rounded-pill bg-brand-light" aria-hidden="true" />
    {children}
  </span>
);

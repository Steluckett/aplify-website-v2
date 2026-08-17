// 📖 Docs: obsidian/frontend/components/common.md
"use client";

import type { ReactNode } from "react";

/**
 * Cookie-scoped button primitive.
 *
 * Delegates to the page's own `.btn` recipes rather than carrying its own
 * palette — the previous version painted `bg-ink text-background`, and when
 * the token layer was rebuilt `text-background` stopped existing, leaving a
 * black pill with invisible text. Anything that needs to look like a button
 * should use the button classes, not re-describe them.
 */
export interface CookieButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export const CookieButton = ({
  children,
  onClick,
  variant = "primary",
}: CookieButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`btn ${variant === "primary" ? "btn-primary" : "btn-secondary"}`}
  >
    {children}
  </button>
);

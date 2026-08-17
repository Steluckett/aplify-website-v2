"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

import { Spring } from "@/components/animation/springs/spring";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StackedLines } from "@/components/ui/stacked-lines";
import { useContactModal } from "@/hooks/use-contact-modal";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";
import { ctaContent } from "@/data/content/closing";

const EMPTY = { name: "", email: "", company: "", ats: "" };

/**
 * "Book a demo" dialog — the Baseline contact-modal pattern carrying the
 * handover's four fields (§12): name, email, company, and current ATS — the
 * qualifying question. Submitting composes an email (deliberately isolated to
 * `ctaContent.mailto` until a real endpoint is nominated, §14). Portaled,
 * scroll-locked, spring-animated, blurred backdrop.
 */
export const ContactModal = () => {
  const { isOpen, close } = useContactModal();
  const stop = useScroll((s) => s.stop);
  const start = useScroll((s) => s.start);

  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isOpen) {
      stop();
      const id = setTimeout(() => nameRef.current?.focus(), 120);
      return () => clearTimeout(id);
    }
    start();
    const id = setTimeout(() => {
      setForm(EMPTY);
      setSent(false);
    }, 350);
    return () => clearTimeout(id);
  }, [isOpen, stop, start]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const set =
    (key: keyof typeof EMPTY) => (e: { target: { value: string } }) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Current ATS: ${form.ats}`,
    ].join("\n");
    window.location.href = `mailto:${ctaContent.mailto}?subject=${encodeURIComponent(
      "Demo request — Aplify",
    )}&body=${encodeURIComponent(lines)}`;
    setSent(true);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[90] flex items-end justify-center p-3 sm:items-center sm:p-6 ${
        isOpen ? "" : "pointer-events-none"
      }`}
    >
      <Spring
        tag="div"
        enabled={isOpen}
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ tension: 240, friction: 30 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={close}
      />

      <Spring
        tag="div"
        enabled={isOpen}
        from={{ opacity: 0, y: 28, scale: 0.96 }}
        to={{ opacity: 1, y: 0, scale: 1 }}
        config={{ tension: 240, friction: 26 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="relative max-h-[92svh] w-full overflow-y-auto rounded-card-lg border border-hairline bg-surface p-6 text-ink shadow-2xl shadow-black/60 sm:max-w-lg sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <Eyebrow>{ctaContent.eyebrow}</Eyebrow>
            <StackedLines
              tag="h2"
              id="contact-modal-title"
              lines={["See it against", "your own feed"]}
              className="display mt-4 text-[2.5rem]"
            />
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={close}
            className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-pill border border-hairline outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-brand-light"
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <p className="mt-4 text-body leading-relaxed text-ink-muted">
          {ctaContent.standfirst}
        </p>

        {sent ? (
          <p className="mt-8 rounded-card border border-hairline bg-canvas p-5 text-body leading-relaxed">
            Your email draft is open — send it and we&apos;ll be in touch.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
            <Field
              label={ctaContent.fields.name}
              value={form.name}
              onChange={set("name")}
              inputRef={nameRef}
              required
            />
            <Field
              label={ctaContent.fields.email}
              value={form.email}
              onChange={set("email")}
              type="email"
              required
            />
            <Field
              label={ctaContent.fields.company}
              value={form.company}
              onChange={set("company")}
              required
            />
            <Field
              label={ctaContent.fields.ats}
              value={form.ats}
              onChange={set("ats")}
              hint={ctaContent.fields.atsHint}
            />

            <button
              type="submit"
              className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-pill bg-paper px-7 py-3.5 text-caption font-medium uppercase tracking-[0.12em] text-paper-ink outline-none hover:bg-brand-light hover:text-white focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2"
            >
              {ctaContent.submitLabel}
            </button>
            <p className="text-caption leading-relaxed text-ink-soft">
              {ctaContent.note}
            </p>
          </form>
        )}
      </Spring>
    </div>,
    document.body,
  );
};

const Field = ({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  hint,
  inputRef,
}: {
  label: string;
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  type?: string;
  required?: boolean;
  hint?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) => (
  <label className="block">
    <span className="text-body font-medium">{label}</span>
    <input
      ref={inputRef}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1.5 w-full rounded-card border border-hairline bg-canvas px-4 py-3 text-body outline-none focus-visible:border-brand-light"
    />
    {hint ? (
      <span className="mt-1 block text-caption text-ink-soft">{hint}</span>
    ) : null}
  </label>
);

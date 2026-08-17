"use client";

import { useEffect, useState } from "react";

export interface SceneControlColorProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const HEX = /^#[0-9a-f]{6}$/i;

/** A swatch plus its hex, kept in step with each other. */
export const SceneControlColor = ({
  id,
  label,
  value,
  onChange,
}: SceneControlColorProps) => {
  const inputId = `scene-control-color-${id}`;

  // The text field keeps its own draft: a controlled input that only accepted
  // complete hex would snap back on every keystroke, making it untypable.
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  const commit = (next: string) => {
    setDraft(next);
    if (HEX.test(next.trim())) onChange(next.trim());
  };

  return (
    <div className="grid grid-cols-[4.5rem_1fr_4.25rem] items-center gap-[0.5rem]">
      <label htmlFor={inputId} className="truncate text-ink-muted">
        {label}
      </label>
      <input
        id={inputId}
        type="color"
        value={value}
        onChange={(event) => {
          setDraft(event.target.value);
          onChange(event.target.value);
        }}
        className="h-[1.25rem] w-full cursor-pointer rounded-[0.25rem] border
                   border-rule bg-transparent"
      />
      <input
        type="text"
        aria-label={`${label} hex`}
        value={draft}
        spellCheck={false}
        onChange={(event) => commit(event.target.value)}
        onBlur={() => setDraft(value)}
        className="w-full rounded-[0.25rem] border border-rule bg-transparent
                   px-[0.25rem] py-[0.125rem] text-right uppercase
                   focus-visible:outline-1 focus-visible:outline-accent-middle"
      />
    </div>
  );
};

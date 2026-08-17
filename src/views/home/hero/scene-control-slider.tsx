"use client";

import {
  HERO_SCENE_LIMITS,
  type HeroSceneLimitKey,
} from "@/lib/scene/hero-scene.config";

export interface SceneControlSliderProps {
  path: HeroSceneLimitKey;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

/** One labelled range + number pair, bounded by `HERO_SCENE_LIMITS`. */
export const SceneControlSlider = ({
  path,
  label,
  value,
  onChange,
}: SceneControlSliderProps) => {
  const { min, max, step } = HERO_SCENE_LIMITS[path];
  const inputId = `scene-control-${path.replace(".", "-")}`;

  return (
    <div className="grid grid-cols-[4.5rem_1fr_3.25rem] items-center gap-[0.5rem]">
      <label htmlFor={inputId} className="truncate text-ink-muted">
        {label}
      </label>
      <input
        id={inputId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.valueAsNumber)}
        className="h-[0.25rem] w-full cursor-pointer appearance-none rounded-full
                   bg-rule-strong accent-accent-middle"
      />
      <input
        type="number"
        aria-label={`${label} value`}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => {
          const next = event.target.valueAsNumber;
          if (!Number.isNaN(next)) onChange(next);
        }}
        className="w-full rounded-[0.25rem] border border-rule bg-transparent
                   px-[0.25rem] py-[0.125rem] text-right tabular-nums
                   focus-visible:outline-1 focus-visible:outline-accent-middle"
      />
    </div>
  );
};

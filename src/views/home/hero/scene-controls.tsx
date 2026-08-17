"use client";

import { useState } from "react";

import {
  DEFAULT_HERO_SCENE_CONFIG,
  SCENE_COLOR_TOKENS,
  type ColorSettings,
  type HeroSceneConfig,
  type HeroSceneLimitKey,
} from "@/lib/scene/hero-scene.config";

import { SceneControlColor } from "./scene-control-color";
import { SceneControlSlider } from "./scene-control-slider";

const COLOR_FIELDS: { key: keyof ColorSettings; label: string }[] = [
  { key: "key", label: "Key" },
  { key: "rim", label: "Rim" },
  { key: "fill", label: "Fill" },
];

/**
 * Colours belong in `globals.css` as tokens (hard rule #4), so this group
 * copies **CSS declarations** to paste there — not JSON for the config file.
 */
const colorsAsCss = (colors: ColorSettings) =>
  COLOR_FIELDS.map(
    ({ key }) => `${SCENE_COLOR_TOKENS[key]}: ${colors[key]};`,
  ).join("\n");

type GroupKey = keyof HeroSceneConfig;

interface ControlGroup {
  key: GroupKey;
  label: string;
  /** Boolean field rendered as a checkbox before the sliders, if any. */
  toggle?: string;
  fields: { path: HeroSceneLimitKey; label: string }[];
}

const GROUPS: ControlGroup[] = [
  {
    key: "particles",
    label: "Particles",
    fields: [{ path: "particles.size", label: "Size" }],
  },
  {
    key: "bloom",
    label: "Bloom",
    toggle: "enabled",
    fields: [
      { path: "bloom.strength", label: "Strength" },
      { path: "bloom.radius", label: "Radius" },
      { path: "bloom.threshold", label: "Threshold" },
    ],
  },
  {
    key: "model",
    label: "Model",
    fields: [
      { path: "model.x", label: "X" },
      { path: "model.y", label: "Y" },
      { path: "model.z", label: "Z" },
      { path: "model.scale", label: "Scale" },
      { path: "model.rotationX", label: "Rot X°" },
      { path: "model.rotationY", label: "Rot Y°" },
      { path: "model.rotationZ", label: "Rot Z°" },
    ],
  },
  {
    key: "camera",
    label: "Camera",
    fields: [
      { path: "camera.distance", label: "Distance" },
      { path: "camera.fov", label: "FOV" },
    ],
  },
  {
    key: "scatter",
    label: "Hover scatter",
    toggle: "enabled",
    fields: [
      { path: "scatter.force", label: "Force" },
      { path: "scatter.radius", label: "Area" },
      { path: "scatter.turbulence", label: "Turbulence" },
      { path: "scatter.ease", label: "Ease" },
    ],
  },
  {
    key: "drift",
    label: "Idle drift",
    toggle: "enabled",
    fields: [
      { path: "drift.amount", label: "Amount" },
      { path: "drift.speed", label: "Speed" },
    ],
  },
  {
    key: "depth",
    label: "Depth fade",
    toggle: "enabled",
    fields: [
      { path: "depth.start", label: "Start" },
      { path: "depth.strength", label: "Strength" },
    ],
  },
  {
    key: "parallax",
    label: "Parallax",
    fields: [
      { path: "parallax.yaw", label: "Yaw" },
      { path: "parallax.pitch", label: "Pitch" },
      { path: "parallax.ease", label: "Ease" },
    ],
  },
];

/** `HeroSceneLimitKey` only ever names numeric leaves, so this stays sound. */
const asNumbers = (group: HeroSceneConfig[GroupKey]) =>
  group as unknown as Record<string, number>;

const readValue = (
  config: HeroSceneConfig,
  path: HeroSceneLimitKey,
): number => {
  const [group, field] = path.split(".") as [GroupKey, string];
  return asNumbers(config[group])[field];
};

const writeValue = (
  config: HeroSceneConfig,
  path: HeroSceneLimitKey,
  value: number,
): HeroSceneConfig => {
  const [group, field] = path.split(".") as [GroupKey, string];
  return { ...config, [group]: { ...config[group], [field]: value } };
};

/**
 * `navigator.clipboard` needs a secure context, so it is absent when the dev
 * server is opened over plain http on a LAN address — exactly how you'd check
 * the scene on a phone. Fall back to the legacy selection copy there rather
 * than failing silently.
 */
const copyText = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fall through to the legacy path.
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
};

export interface SceneControlsProps {
  config: HeroSceneConfig;
  onChange: (next: HeroSceneConfig) => void;
}

/**
 * Live tuning panel for the hero scene. Development-only by default — see
 * `hero-visual.tsx` for the gate. Every control writes straight through to the
 * running scene, and each group can be copied as JSON to paste back into
 * `lib/scene/hero-scene.config.ts`.
 */
export const SceneControls = ({ config, onChange }: SceneControlsProps) => {
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState<{ target: string; ok: boolean } | null>(
    null,
  );

  const copy = async (target: string, payload: unknown) => {
    const ok = await copyText(
      typeof payload === "string" ? payload : JSON.stringify(payload, null, 2),
    );
    setCopied({ target, ok });
    window.setTimeout(() => setCopied(null), 1600);
  };

  /** Label for a copy button — a failed copy must not look like a no-op. */
  const copyLabel = (target: string, idle: string) =>
    copied?.target === target ? (copied.ok ? "Copied" : "Failed") : idle;

  return (
    <aside
      aria-label="Scene controls"
      className="absolute top-[5rem] right-[2.5rem] z-10 flex max-h-[calc(100dvh_-_7.5rem)]
                 max-xl:hidden
                 w-[19rem] flex-col rounded-[0.5rem] border border-rule-strong
                 bg-canvas/85 font-mono text-[0.6875rem] text-ink
                 backdrop-blur-md"
    >
      <div className="flex shrink-0 items-center justify-between gap-[0.5rem] border-b border-rule px-[0.75rem] py-[0.5rem]">
        <h2 className="tracking-wide uppercase">Scene</h2>
        <div className="flex items-center gap-[0.375rem]">
          <button
            type="button"
            onClick={() => onChange(DEFAULT_HERO_SCENE_CONFIG)}
            className="rounded-[0.25rem] border border-rule px-[0.375rem] py-[0.125rem]
                       transition-colors duration-[var(--duration-fast)] ease-entrance
                       hover:border-accent-middle"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => copy("all", config)}
            className="rounded-[0.25rem] border border-rule px-[0.375rem] py-[0.125rem]
                       transition-colors duration-[var(--duration-fast)] ease-entrance
                       hover:border-accent-middle"
          >
            {copyLabel("all", "Copy all")}
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="rounded-[0.25rem] border border-rule px-[0.375rem] py-[0.125rem]"
          >
            {open ? "–" : "+"}
          </button>
        </div>
      </div>

      {open && (
        // `min-h-0` is what actually lets a flex child scroll instead of
        // growing past its parent and clipping the last group.
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-[0.75rem] py-[0.625rem]">
          {GROUPS.map((group) => (
            <section key={group.key} className="mb-[0.75rem] last:mb-0">
              <div className="mb-[0.375rem] flex items-center justify-between gap-[0.5rem]">
                <h3 className="text-ink-muted tracking-wide uppercase">
                  {group.label}
                </h3>
                <div className="flex items-center gap-[0.5rem]">
                  {group.toggle && (
                    <label className="flex items-center gap-[0.25rem]">
                      <input
                        type="checkbox"
                        checked={Boolean(
                          (
                            config[group.key] as unknown as Record<
                              string,
                              unknown
                            >
                          )[group.toggle],
                        )}
                        onChange={(event) =>
                          onChange({
                            ...config,
                            [group.key]: {
                              ...config[group.key],
                              [group.toggle as string]: event.target.checked,
                            },
                          })
                        }
                        className="accent-accent-middle"
                      />
                      On
                    </label>
                  )}
                  <button
                    type="button"
                    onClick={() => copy(group.key, config[group.key])}
                    className="text-ink-muted transition-colors
                               duration-[var(--duration-fast)] ease-entrance
                               hover:text-ink"
                  >
                    {copyLabel(group.key, "Copy")}
                  </button>
                </div>
              </div>

              <div className="grid gap-[0.25rem]">
                {group.fields.map((field) => (
                  <SceneControlSlider
                    key={field.path}
                    path={field.path}
                    label={field.label}
                    value={readValue(config, field.path)}
                    onChange={(value) =>
                      onChange(writeValue(config, field.path, value))
                    }
                  />
                ))}
              </div>
            </section>
          ))}

          <section>
            <div className="mb-[0.375rem] flex items-center justify-between gap-[0.5rem]">
              <h3 className="text-ink-muted tracking-wide uppercase">
                Colors
              </h3>
              <button
                type="button"
                onClick={() => copy("colors", colorsAsCss(config.colors))}
                title="Copies CSS custom properties for globals.css"
                className="text-ink-muted transition-colors
                           duration-[var(--duration-fast)] ease-entrance
                           hover:text-ink"
              >
                {copyLabel("colors", "Copy CSS")}
              </button>
            </div>

            <div className="grid gap-[0.25rem]">
              {COLOR_FIELDS.map(({ key, label }) => (
                <SceneControlColor
                  key={key}
                  id={key}
                  label={label}
                  value={config.colors[key]}
                  onChange={(value) =>
                    onChange({
                      ...config,
                      colors: { ...config.colors, [key]: value },
                    })
                  }
                />
              ))}
            </div>
          </section>
        </div>
      )}
    </aside>
  );
};

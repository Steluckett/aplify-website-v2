import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Brand assets for generated images (favicon tile, Open Graph, Twitter).
 *
 * Everything here runs at build time inside `ImageResponse`, which renders with
 * Satori — so the mark travels as an SVG data URI rather than an inline `<svg>`
 * (Satori's own SVG element support is partial, an `<img>` is not) and the
 * fonts are read off disk rather than fetched.
 */

const root = process.cwd();

/** The site's own accent ramp, shared with the CTA and the mark. */
export const ACCENT = {
  start: "#6bfdff",
  middle: "#02dafd",
  end: "#2f6bff",
} as const;

export const CANVAS = "#000000";
export const FOREGROUND = "#ffffff";
export const MUTED = "rgba(255,255,255,0.4)";

/**
 * The mark as a data URI.
 *
 * @param compact - the small-size cut, arms closed. Below roughly 48px the
 *   celled version's gaps stop resolving and it reads as a smudge.
 */
export const markDataUri = async (compact = false): Promise<string> => {
  // Aplify ships one wordmark; the compact cut falls back to the same file.
  void compact;
  const svg = await readFile(join(root, "public", "aplify-light.svg"), "utf8");
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
};

export interface LoadedFont {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500;
  style: "normal";
}

const font = async (file: string, name: string, weight: 400 | 500) => {
  const data = await readFile(join(root, "src/app/fonts", file));
  return {
    name,
    // Satori wants a plain ArrayBuffer, not a Node Buffer view.
    data: data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength,
    ) as ArrayBuffer,
    weight,
    style: "normal" as const,
  };
};

/** The one face the generated images use. */
export const brandFonts = async (): Promise<LoadedFont[]> =>
  Promise.all([font("Onest-Medium.ttf", "Onest", 500)]);

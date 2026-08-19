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

/**
 * The site's accent ramp — sky to violet, the same pair `globals.css` binds to
 * `--accent-start` / `--accent-end`. The card used to carry a cyan ramp left
 * over from the dark-luxury build; these are the live values.
 */
export const ACCENT = {
  start: "#0ea5e9",
  end: "#5b4ee0",
} as const;

/**
 * Share-card palette, read off `globals.css` rather than picked: the page's
 * ground, its heading ink and its running-copy ink. Measured on this ground —
 * heading 16.55:1, body 7.09:1, both AAA.
 */
export const SHARE = {
  ground: "#eff1f6", // --raw-color-ground
  heading: "#0c1220", // --raw-color-heading
  body: "#4a515c", // --raw-color-body
} as const;

/**
 * The home-screen tile's ground. Deliberately still black: an app icon is a
 * tile in a grid of other tiles, not a surface of the site, and the light
 * wordmark needs something to sit on. Nothing else uses this.
 */
export const CANVAS = "#000000";

/**
 * The mark as a data URI.
 *
 * @param compact - the small-size cut, arms closed. Below roughly 48px the
 *   celled version's gaps stop resolving and it reads as a smudge.
 * @param tone - which ground the mark will sit on. `light` is the light-on-dark
 *   wordmark (the app icon's black tile); `dark` is the dark-on-light one the
 *   share card needs.
 */
export const markDataUri = async (
  compact = false,
  tone: "light" | "dark" = "light",
): Promise<string> => {
  // Aplify ships one wordmark; the compact cut falls back to the same file.
  void compact;
  const file = tone === "dark" ? "aplify-dark.svg" : "aplify-light.svg";
  const svg = await readFile(join(root, "public", file), "utf8");
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

/**
 * Inter, in the site's own two cuts.
 *
 * Satori cannot read a variable `woff2`, which is why the card rendered in
 * Onest for so long — `inter-var.woff2` loaded fine for the browser and not at
 * all here. These are static instances cut from that same file with
 * `fontTools.varLib.instancer`, pinned to the axis positions the page uses:
 * display at wght 550 / opsz 32, running copy at wght 400 / opsz 14. Same
 * source file, so no second licence and nothing new to fetch.
 *
 * They are registered as two families rather than two weights because each
 * carries one cut, and matching by family is unambiguous where matching by
 * numeric weight is not.
 */
export const brandFonts = async (): Promise<LoadedFont[]> =>
  Promise.all([
    font("Inter-Display-550.ttf", "Inter Display", 400),
    font("Inter-Text-400.ttf", "Inter Text", 400),
  ]);

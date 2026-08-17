import { ImageResponse } from "next/og";

import { CANVAS, markDataUri } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Home-screen tile. Uses the small-size cut of the mark: at 180px the celled
 * version would read, but iOS also renders this at far smaller sizes in
 * Spotlight and Settings, where the gaps close into a smudge.
 */
export default async function AppleIcon() {
  const mark = await markDataUri(true);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: CANVAS,
        }}
      >
        <img src={mark} width={124} height={124} alt="" />
      </div>
    ),
    size,
  );
}

import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

import { C, GUTTER, LAND, SETTLE, TRACK, fontFamily, vw } from "./tokens";
import { Drift, FillWords, Rise, RiseLine, display } from "./type";

/*
 * Seven scenes, every word from the site's approved copy (src/data/content/
 * site.ts and signals.ts). Scene lengths live in Film.tsx.
 */

const Pad = ({ children, bg, justify = "center" }: { children: React.ReactNode; bg: string; justify?: "center" | "flex-end" | "flex-start" }) => (
  <AbsoluteFill style={{ background: bg, padding: GUTTER, justifyContent: justify, fontFamily }}>{children}</AbsoluteFill>
);

const Label = ({ text, color, delay = 0 }: { text: string; color: string; delay?: number }) => (
  <Rise delay={delay} y={12}>
    <p style={{ fontFamily, fontWeight: 500, fontSize: vw(1.15), color, margin: 0, paddingBottom: vw(0.7), borderBottom: `1px solid ${color === C.black ? C.hair : "rgba(243,240,232,0.2)"}` }}>{text}</p>
  </Rise>
);

/* 1 — the hero, on black. */
export const Hero = ({ frames }: { frames: number }) => (
  <Pad bg={C.black}>
    <Drift frames={frames} from={1} to={1.035}>
      <AbsoluteFill style={{ padding: GUTTER, justifyContent: "center" }}>
        <RiseLine text="Completion-First" size={vw(7.9)} color={C.creme} delay={6} />
        <RiseLine text="Recruitment Technology" size={vw(7.9)} color={C.tint} delay={16} />
        <Rise delay={46} y={24} style={{ marginTop: vw(2.6) }}>
          <p style={{ fontFamily, fontWeight: 500, fontSize: vw(2.5), letterSpacing: TRACK, color: C.creme, margin: 0 }}>
            No Account. No Redirect. <span style={{ color: C.tint }}>Just Apply.</span>
          </p>
        </Rise>
      </AbsoluteFill>
    </Drift>
  </Pad>
);

/* 2 — what it costs: the spends fill in, then the black card lands. */
const SPENDS = ["The advertising", "The job boards", "The paid social", "The campaign", "The careers site", "The employer brand", "The QR posters", "Your team's time", "The EVP", "The SEO", "The creative agency"];

export const Cost = ({ frames }: { frames: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardAt = frames - 78;
  const card = spring({ frame: frame - cardAt, fps, config: SETTLE });
  return (
    <Pad bg={C.creme} justify="flex-start">
      <Label text="What it costs" color={C.black} />
      <div style={{ marginTop: vw(3.2) }}>
        <FillWords parts={SPENDS} sep=" + " from={10} to={cardAt - 8} size={vw(4.5)} color={C.black} accent={C.blue} />
      </div>
      <AbsoluteFill style={{ justifyContent: "flex-end", padding: GUTTER }}>
        <div
          style={{
            background: C.black,
            borderRadius: 30,
            padding: `${vw(3)}px ${vw(3.4)}px`,
            transform: `translateY(${(1 - card) * 120}%)`,
          }}
        >
          <p style={{ fontFamily, fontWeight: 500, fontSize: vw(1.15), color: C.lime, margin: 0 }}>= Abandoned</p>
          <p style={{ ...display(vw(6.2), C.creme), marginTop: vw(1.2) }}>The application, abandoned</p>
        </div>
      </AbsoluteFill>
    </Pad>
  );
};

/* 3 — the friction line, as big as the frame allows. */
export const Friction = ({ frames }: { frames: number }) => (
  <Pad bg={C.creme}>
    <Drift frames={frames} from={1.02} to={1}>
      <AbsoluteFill style={{ padding: GUTTER, justifyContent: "center" }}>
        <RiseLine text="Nobody has ever thanked you" size={vw(6.2)} color={C.black} delay={4} />
        <RiseLine text="for making them create" size={vw(6.2)} color={C.black} delay={14} />
        <RiseLine text="another password" size={vw(6.2)} color={C.blue} delay={24} />
      </AbsoluteFill>
    </Drift>
  </Pad>
);

/* 4 — the answer, phrase by phrase; "Just Apply." lands on lime. */
export const Answer = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pill = spring({ frame: frame - 52, fps, config: LAND });
  return (
    <Pad bg={C.black}>
      <RiseLine text="No Account." size={vw(9.6)} color={C.creme} delay={4} />
      <RiseLine text="No Redirect." size={vw(9.6)} color={C.creme} delay={22} />
      <div style={{ marginTop: vw(1.4), display: "flex" }}>
        <div
          style={{
            background: C.lime,
            borderRadius: 999,
            padding: `${vw(0.6)}px ${vw(2.6)}px ${vw(1.2)}px`,
            transform: `scale(${0.6 + 0.4 * pill})`,
            transformOrigin: "left center",
            opacity: Math.min(1, pill * 1.4),
          }}
        >
          <p style={display(vw(9.6), C.black)}>Just Apply.</p>
        </div>
      </div>
    </Pad>
  );
};

/* 5 — the four steps, as the page's outline cards. */
const STEPS = [
  ["01", "Find the right job", "Keyword, postcode and radius, or the map."],
  ["02", "Apply without leaving", "No ATS redirect. No account to create."],
  ["03", "Register for events", "Own tab, same flow, places tracked."],
  ["04", "Kept informed", "A branded email at every status change."],
];

export const Steps = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Pad bg={C.creme} justify="flex-start">
      <Label text="For your candidates" color={C.black} />
      <div style={{ marginTop: vw(2.4) }}>
        <RiseLine text="Four steps," size={vw(6.4)} color={C.black} delay={4} />
        <RiseLine text="no dead ends" size={vw(6.4)} color={C.blue} delay={12} />
      </div>
      <div style={{ marginTop: vw(3.4), display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: vw(1.1) }}>
        {STEPS.map(([n, title, body], i) => {
          const p = spring({ frame: frame - 34 - i * 9, fps, config: SETTLE });
          return (
            <div
              key={n}
              style={{
                border: `1px solid ${i === 1 ? C.black : C.hair}`,
                background: i === 1 ? C.lime : "transparent",
                borderRadius: 24,
                padding: vw(1.9),
                minHeight: vw(15),
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                opacity: p,
                transform: `translateY(${(1 - p) * 90}px)`,
              }}
            >
              <p style={{ fontFamily, fontWeight: 500, fontSize: vw(1.15), color: C.black, margin: 0 }}>({n})</p>
              <div>
                <p style={{ ...display(vw(2.4), C.black), lineHeight: 1 }}>{title}</p>
                <p style={{ fontFamily, fontWeight: 500, fontSize: vw(1.1), color: C.black, opacity: 0.72, margin: `${vw(0.8)}px 0 0` }}>{body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Pad>
  );
};

/* 6 — the one statistic, as the page's odometer. */
const Odo = ({ to, from, at }: { to: number; from: number; at: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at, fps, config: { damping: 30, stiffness: 60, mass: 1 } });
  const v = Math.round(interpolate(p, [0, 1], [from, to]));
  return <>{v}%</>;
};

export const Proof = () => {
  const frame = useCurrentFrame();
  const strike = interpolate(frame, [40, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Pad bg={C.black}>
      <Label text="Brandon Trust" color={C.creme} />
      <div style={{ marginTop: vw(2.6), display: "flex", alignItems: "flex-end", gap: vw(4) }}>
        <div>
          <p style={{ fontFamily, fontWeight: 500, fontSize: vw(1.3), color: C.dim, margin: 0 }}>Drop-off before</p>
          <p style={{ ...display(vw(13), C.creme), position: "relative" }}>
            85%
            <span style={{ position: "absolute", left: 0, top: "52%", height: vw(0.5), width: `${strike * 100}%`, background: C.lime }} />
          </p>
        </div>
        <div>
          <p style={{ fontFamily, fontWeight: 500, fontSize: vw(1.3), color: C.dim, margin: 0 }}>After Easy Apply</p>
          <p style={display(vw(13), C.lime)}>
            <Odo from={85} to={30} at={50} />
          </p>
        </div>
      </div>
      <Rise delay={96} y={24} style={{ marginTop: vw(2.2) }}>
        <p style={{ fontFamily, fontWeight: 500, fontSize: vw(2.5), letterSpacing: TRACK, color: C.creme, margin: 0 }}>
          55% more applications submitted. <span style={{ color: C.tint }}>Same traffic, same jobs, same team.</span>
        </p>
      </Rise>
    </Pad>
  );
};

/* 7 — the ask. */
export const Close = ({ frames }: { frames: number }) => (
  <Pad bg={C.black}>
    <Drift frames={frames} from={1} to={1.03}>
      <AbsoluteFill style={{ padding: GUTTER, justifyContent: "center" }}>
        <Rise delay={2} y={16}>
          <Img src={staticFile("aplify-light.svg")} style={{ height: vw(2.6), width: "auto" }} />
        </Rise>
        <div style={{ marginTop: vw(3) }}>
          <RiseLine text="See it run on" size={vw(9)} color={C.creme} delay={10} />
          <RiseLine text="your own jobs" size={vw(9)} color={C.tint} delay={20} />
        </div>
        <Rise delay={48} y={24} style={{ marginTop: vw(3), display: "flex", alignItems: "center", gap: vw(2) }}>
          <span style={{ fontFamily, fontWeight: 700, fontSize: vw(1.6), background: C.creme, color: C.black, borderRadius: 999, padding: `${vw(1)}px ${vw(2)}px` }}>Book a demo ↗</span>
          <span style={{ fontFamily, fontWeight: 500, fontSize: vw(1.6), color: C.dim }}>aplify.co.uk</span>
        </Rise>
      </AbsoluteFill>
    </Drift>
  </Pad>
);

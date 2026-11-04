"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSpring } from "@react-spring/web";

/**
 * A spring-driven slide track — the SIGNALS option's stand-in for the
 * reference's Swiper carousels (Swiper animates with CSS transitions, which
 * AGENTS.md rule 1 rules out). The track springs so the active slide's left
 * edge meets the track's left edge; slides keep their natural widths, so the
 * next one peeks in exactly as the reference's do.
 *
 * Manual only. The reference autoplays its services slider; this page does
 * not, on Stephen's standing preference against autoplay (see the six-stages
 * commit, e929459).
 */
export const useTrack = (count: number) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [{ x }, api] = useSpring(() => ({ x: 0, config: { tension: 170, friction: 30 } }));

  const place = useCallback(
    (i: number, immediate = false) => {
      const track = trackRef.current;
      const slide = track?.children[i] as HTMLElement | undefined;
      if (!track || !slide) return;
      // Never travel past the point where the last slide sits flush right.
      const max = Math.max(0, track.scrollWidth - track.clientWidth);
      api.start({ x: -Math.min(slide.offsetLeft, max), immediate });
    },
    [api],
  );

  useEffect(() => {
    place(index);
  }, [index, place]);

  useEffect(() => {
    const onResize = () => place(index, true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, place]);

  const go = useCallback((i: number) => setIndex(Math.min(count - 1, Math.max(0, i))), [count]);

  return {
    trackRef,
    index,
    go,
    next: () => go(index + 1),
    prev: () => go(index - 1),
    x,
  };
};

"use client";

import { useEffect, useRef, useState } from "react";

import { Inview } from "@/components/animation/springs/in-view";
import { SectionHead } from "@/components/ui/section-head";
import { testimonialsContent, type Testimonial } from "@/data/content/closing";

/**
 * Testimonials (§8.15) — the three approved quotes from §5, no more.
 *
 * Set as pull quotes in the display face rather than boxed cards: on a dark
 * page a bordered card grid reads as filler, where three quotes at size read
 * as people. Each carries its recorded voiceover as a play-on-demand control
 * (no ambient sound, no click-to-enter gate); only one plays at a time.
 */
export const Testimonials = () => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="border-t border-hairline px-6 py-28 sm:px-10 lg:py-32"
    >
      <SectionHead
        eyebrow={testimonialsContent.eyebrow}
        lines={["The people", "behind the numbers"]}
        id="testimonials-heading"
        standfirst={testimonialsContent.standfirst}
      />

      <ul className="mt-16 grid gap-x-14 gap-y-14 lg:grid-cols-3">
        {testimonialsContent.items.map((testimonial, index) => (
          <QuoteBlock
            key={testimonial.name}
            testimonial={testimonial}
            index={index}
            playing={playingIndex === index}
            onPlayChange={(playing) =>
              setPlayingIndex((current) =>
                playing ? index : current === index ? null : current,
              )
            }
          />
        ))}
      </ul>
    </section>
  );
};

interface QuoteBlockProps {
  testimonial: Testimonial;
  index: number;
  playing: boolean;
  onPlayChange: (playing: boolean) => void;
}

const QuoteBlock = ({
  testimonial,
  index,
  playing,
  onPlayChange,
}: QuoteBlockProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Pause when another quote takes over.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      void audio.play();
    } else {
      audio.pause();
    }
  }, [playing]);

  return (
    <li className="contents">
      <Inview
        tag="figure"
        mode="once"
        from={{ opacity: 0, filter: "blur(8px)" }}
        to={{ opacity: 1, filter: "blur(0px)" }}
        delayIn={index * 130}
        config={{ tension: 180, friction: 30 }}
        className="flex h-full flex-col border-t border-hairline pt-8"
      >
        <blockquote className="flex-1 text-[1.4rem] leading-[1.35] tracking-tight text-ink">
          <span aria-hidden className="display text-brand-light">
            “
          </span>
          {testimonial.quote}
        </blockquote>

        <figcaption className="mt-8 flex items-center justify-between gap-4">
          <span>
            <span className="block text-body font-medium">
              {testimonial.name}
            </span>
            <span className="block text-body text-ink-soft">
              {testimonial.company}
            </span>
          </span>
          <button
            type="button"
            onClick={() => onPlayChange(!playing)}
            aria-label={
              playing
                ? `${testimonialsContent.pauseLabel} — ${testimonial.name}`
                : `${testimonialsContent.playLabel} — ${testimonial.name}`
            }
            className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-pill
                       border border-hairline-strong text-ink outline-none
                       transition-colors hover:border-brand-light hover:text-brand-light
                       focus-visible:ring-2 focus-visible:ring-brand-light"
          >
            <span aria-hidden className="text-caption leading-none">
              {playing ? "❚❚" : "▶"}
            </span>
          </button>
        </figcaption>

        <audio
          ref={audioRef}
          src={testimonial.audioSrc}
          preload="none"
          onEnded={() => onPlayChange(false)}
        />
      </Inview>
    </li>
  );
};

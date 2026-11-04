"use client";

import Image from "next/image";

import { sigQuotes } from "@/data/content/signals";

import { DemoPill, LinkPill } from "./primitives";

/**
 * The reference's testimonial wall, pin and all.
 *
 * The centred heading is `sticky` at the nav's height (80px, 123 at xl) and
 * holds while the cards — scattered across a 12-column grid at staggered
 * offsets — scroll up OVER it. A creme gradient rising from the foot of the
 * block softens the heading as the cards cross. Theirs is GSAP-free here too:
 * the pin is plain `position: sticky`.
 *
 * Six cards to scroll past, as theirs has: the three approved quotes
 * interleaved with the three case results, in the reference's palette
 * (lime, lilac, black, creme-200).
 */
const PLACES = [
  "lg:col-start-1",
  "lg:col-start-6",
  "lg:col-start-9 lg:mt-12.5",
  "lg:col-start-3 lg:mt-32.5",
  "lg:col-start-7 lg:mt-5",
  "lg:col-start-10 lg:mt-24",
];
const GROUNDS = [
  "bg-sig-lime text-sig-black",
  "bg-sig-lilac text-sig-black",
  "sig-dark",
  "bg-sig-creme-200 text-sig-black",
  "bg-sig-lime text-sig-black",
  "bg-sig-lilac text-sig-black",
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("");

const Logo = ({ org }: { org: string }) => {
  const logo = sigQuotes.logos[org];
  if (!logo) return null;
  return (
    <span className="ml-auto flex h-8 flex-none items-center rounded-full bg-sig-white px-3">
      <Image
        src={logo.src}
        alt=""
        width={Math.round(16 * logo.ratio)}
        height={16}
        className="h-4 w-auto"
      />
    </span>
  );
};

export const SigQuotes = () => {
  const cards = sigQuotes.quotes.flatMap((q, i) => {
    const r = sigQuotes.results[i];
    return [
      { kind: "quote" as const, key: q.name, q },
      ...(r ? [{ kind: "result" as const, key: r.id, r }] : []),
    ];
  });

  return (
    <section id="quotes" className="sig-section">
      <div className="sig-wrap">
        <div className="relative">
          <div className="top-20 lg:sticky xl:top-[7.6875rem]">
            <h2 className="sig-display mx-auto max-w-[78rem] text-center text-sig-4xl md:text-sig-7xl lg:text-sig-9xl xl:text-sig-10xl">
              {sigQuotes.lines[0]}{" "}
              <span className="block text-sig-accent">
                {sigQuotes.lines[1]}
              </span>
            </h2>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-sig-creme-100 to-transparent lg:block"
          />

          <ul className="relative mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-25 lg:grid-flow-row-dense lg:grid-cols-12 lg:items-start">
            {cards.map((card, i) => (
              <li
                key={card.key}
                className={`${GROUNDS[i]} ${PLACES[i]} flex flex-col rounded-sig-panel p-7.5 lg:col-span-4 lg:p-10`}
              >
                {card.kind === "quote" ? (
                  <figure>
                    <figcaption className="flex items-center gap-5">
                      <span
                        aria-hidden
                        className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-current/10 text-sig-sm font-semibold"
                      >
                        {initials(card.q.name)}
                      </span>
                      <span>
                        <span className="block text-sig-base font-medium tracking-sig-tight">
                          {card.q.name}
                        </span>
                        <span className="block text-sig-sm opacity-75">
                          {card.q.org}
                        </span>
                      </span>
                      <Logo org={card.q.org} />
                    </figcaption>
                    <blockquote className="mt-14.5 text-sig-xl leading-sig-133 font-medium tracking-sig-tighter">
                      &ldquo;{card.q.quote}&rdquo;
                    </blockquote>
                  </figure>
                ) : (
                  <div>
                    <p className="flex items-center gap-5 text-sig-base font-medium tracking-sig-tight">
                      {card.r.name}
                      <Logo org={card.r.name} />
                    </p>
                    <p className="sig-display mt-14.5 text-sig-9xl">
                      {card.r.hero}
                    </p>
                    <p className="mt-3 text-sig-xl leading-sig-12 font-medium tracking-sig-tighter">
                      {card.r.heroLabel}
                    </p>
                    <p className="mt-3 text-sig-sm opacity-75">
                      {card.r.dropLine}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          <LinkPill label="See the case studies" href="#proof" />
          <DemoPill label="Book a demo" tone="lilac" />
        </div>
      </div>
    </section>
  );
};

"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

import { PlusIcon } from "./primitives";

export interface AccordionItem {
  title: string;
  body: string;
}

const Row = ({
  item,
  open,
  onToggle,
  titleClass,
}: {
  item: AccordionItem;
  open: boolean;
  onToggle: () => void;
  titleClass: string;
}) => {
  const id = useId();
  const inner = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);
  useLayoutEffect(() => {
    if (inner.current) setH(inner.current.offsetHeight);
  }, [item.body]);
  const style = useSpring({
    height: open ? h : 0,
    opacity: open ? 1 : 0,
    config: { tension: 210, friction: 28 },
  });

  return (
    <li className="border-b border-sig-hair">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className={`flex w-full items-center justify-between gap-6 py-5 text-left ${titleClass}`}
        >
          {item.title}
          <span className="sig-round">
            <PlusIcon open={open} />
          </span>
        </button>
      </h3>
      <animated.div
        id={id}
        role="region"
        style={style}
        className="overflow-hidden"
      >
        <div ref={inner} className="max-w-[36rem] pb-6 text-sig-base">
          {item.body}
        </div>
      </animated.div>
    </li>
  );
};

/**
 * The reference's accordion: hairline rows, a round plus that turns to a
 * minus, the answer springing open beneath. One row open at a time.
 */
export const SigAccordion = ({
  items,
  titleClass = "text-sig-base font-medium",
  firstOpen = false,
}: {
  items: AccordionItem[];
  titleClass?: string;
  firstOpen?: boolean;
}) => {
  const [open, setOpen] = useState<number | null>(firstOpen ? 0 : null);
  return (
    <ul className="border-t border-sig-hair">
      {items.map((item, i) => (
        <Row
          key={item.title}
          item={item}
          open={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
          titleClass={titleClass}
        />
      ))}
    </ul>
  );
};

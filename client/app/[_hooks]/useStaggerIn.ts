"use client";
import { useEffect, useRef } from "react";
import { animate, utils } from "animejs";

export function useStaggerIn<T extends HTMLElement>(
  deps: unknown[],
  opts?: { from?: number; delay?: number; duration?: number },
) {
  const ref = useRef<T>(null);
  const { from = 24, delay = 60, duration = 500 } = opts ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = Array.from(el.children);
    utils.set(children, { opacity: 0, translateY: `${from}px` });
    animate(children, {
      opacity: [0, 1],
      translateY: [`${from}px`, "0px"],
      delay: utils.stagger(delay),
      duration,
      easing: "easeOutCubic",
    });
  }, deps);

  return ref;
}

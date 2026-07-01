"use client";
import { useEffect, useRef } from "react";
import { animate, utils } from "animejs";

export function useFadeInOnScroll<T extends HTMLElement>(
  opts?: { translateY?: number; threshold?: number; duration?: number },
) {
  const ref = useRef<T>(null);
  const { translateY = 24, threshold = 0.15, duration = 600 } = opts ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    utils.set(el, { opacity: 0, translateY: `${translateY}px` });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(el, {
            opacity: [0, 1],
            translateY: [`${translateY}px`, "0px"],
            duration,
            easing: "easeOutCubic",
          });
          observer.unobserve(el);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

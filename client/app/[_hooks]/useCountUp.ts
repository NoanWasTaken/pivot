"use client";
import { useEffect, useRef } from "react";
import { animate } from "animejs";

export function useCountUp(target: number, decimals: number, active: boolean) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    ref.current.textContent = (0).toFixed(decimals) + "%";
    const obj = { v: 0 };
    animate(obj, {
      v: target,
      duration: 800,
      easing: "easeOutCubic",
      update: () => {
        if (ref.current) ref.current.textContent = obj.v.toFixed(decimals) + "%";
      },
    });
  }, [target, decimals, active]);

  return ref;
}

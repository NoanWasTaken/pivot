"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { animate, utils } from "animejs";

export default function AnimatedNavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleEnter = () => {
    if (!linkRef.current || isActive) return;
    const line = linkRef.current.querySelector("span");
    if (!line) return;
    utils.set(line, { opacity: 0 });
    animate(line, {
      opacity: [0, 1],
      duration: 300,
      easing: "easeOutCubic",
    });
  };

  const handleLeave = () => {
    if (!linkRef.current || isActive) return;
    const line = linkRef.current.querySelector("span");
    if (!line) return;
    animate(line, {
      opacity: [1, 0],
      duration: 250,
      easing: "easeOutCubic",
    });
  };

  return (
    <Link
      ref={linkRef}
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative pb-0.5 text-sm font-medium ${
        isActive ? "text-ink" : "text-muted"
      }`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-0.5 w-full bg-ink ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />
    </Link>
  );
}

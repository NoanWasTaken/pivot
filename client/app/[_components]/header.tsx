import React from "react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  current: "check" | "why";
};

export default function Header({ current }: Props) {
  return (
    <header className="mb-10">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-tight text-ink transition hover:text-celadon"
        >
          <Image src="/icon.svg" alt="PIVOT" width={32} height={32} />
          PIVOT
          <span className="text-sm font-normal leading-none text-muted">
            - your games on Linux
          </span>
        </Link>
        <nav className="flex gap-6">
          <Link
            href="/"
            className={`border-b-2 pb-0.5 text-sm font-medium transition ${
              current === "why"
                ? "border-ink text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            why ?
          </Link>
          <Link
            href="/check"
            className={`border-b-2 pb-0.5 text-sm font-medium transition ${
              current === "check"
                ? "border-ink text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            check
          </Link>
        </nav>
      </div>
    </header>
  );
}

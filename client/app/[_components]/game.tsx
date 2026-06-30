"use client";
import React from "react";
import Image from "next/image";

export type GameData = {
  appid: number;
  name: string;
  header_image: string;
  tier: string | null;
  isNative: boolean | null;
};

const badgeStyles: Record<string, string> = {
  native: "bg-celadon text-ink",
  platinum: "bg-celadon text-ink",
  gold: "bg-gold text-ink",
  silver: "bg-silver text-ink",
  bronze: "bg-bronze text-alice",
  borked: "bg-red-500 text-white",
};

function TierBadge({ tier, isNative }: { tier: string | null; isNative: boolean | null }) {
  if (isNative) {
    return (
      <span className={`px-2 py-0.5 text-xs font-semibold ${badgeStyles.native}`}>
        Native
      </span>
    );
  }

  const cls = tier
    ? badgeStyles[tier] ?? "bg-muted text-alice"
    : "bg-muted text-alice";

  return (
    <span className={`px-2 py-0.5 text-xs font-semibold ${cls}`}>
      {tier ? tier.charAt(0).toUpperCase() + tier.slice(1) : "Unknown"}
    </span>
  );
}

export default function Game({ game }: { game: GameData }) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <a
      href={`https://www.protondb.com/app/${game.appid}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block border-2 border-muted bg-white transition hover:-translate-y-0.5 hover:border-celadon hover:shadow-md"
    >
      <div className="relative aspect-[460/215] bg-alice">
        {imgError ? (
          <div className="flex h-full items-center justify-center bg-muted/20">
            <span className="text-3xl font-bold tracking-tight text-muted">
              {game.name.charAt(0).toUpperCase()}
            </span>
          </div>
        ) : (
          <Image
            src={game.header_image}
            alt={game.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="space-y-1.5 border-t-2 border-muted p-3">
        <h3 className="truncate text-sm font-semibold text-ink">
          {game.name}
        </h3>
        <div className="flex items-center gap-2">
          <TierBadge tier={game.tier} isNative={game.isNative} />
        </div>
      </div>
    </a>
  );
}

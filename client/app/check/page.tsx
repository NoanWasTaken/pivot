"use client";

import React from "react";
import Game, { type GameData } from "../[_components]/game";
import Header from "../[_components]/header";
const api_url = process.env.NEXT_PUBLIC_SERVER_URL;

const TIERS = [
  "native",
  "platinum",
  "gold",
  "silver",
  "bronze",
  "borked",
] as const;
type Tier = (typeof TIERS)[number];

export default function Check() {
  const [steamId, setSteamId] = React.useState("");
  const [games, setGames] = React.useState<GameData[]>([]);
  const [loader, setLoader] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTiers, setActiveTiers] = React.useState<Set<Tier>>(new Set());
  const [error, setError] = React.useState("");

  const gamesCount = games.length;
  let playableGamesPercentage = 0;
  let unplayableGames = 0;
  if (gamesCount > 0) {
    for (let i = 0; i < gamesCount; i++) {
      if (games[i].tier === "borked") {
        unplayableGames += 1;
      }
    }
    playableGamesPercentage =
      (100 * (gamesCount - unplayableGames)) / gamesCount;
  }

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const tierKey = game.isNative ? "native" : (game.tier ?? "unknown");
    const matchesTier =
      activeTiers.size === 0 || activeTiers.has(tierKey as Tier);
    return matchesSearch && matchesTier;
  });

  const toggleTier = (tier: Tier) => {
    setActiveTiers((prev) => {
      const next = new Set(prev);
      if (next.has(tier)) {
        next.delete(tier);
      } else {
        next.add(tier);
      }
      return next;
    });
  };

  const getSteamGames = async (steamId: string) => {
    if (!steamId.trim()) return;
    setLoader(true);
    setError("");
    setSearchQuery("");
    setActiveTiers(new Set());
    try {
      const response = await fetch(
        `${api_url}/api/v1/getSteamGames?steamId=${steamId}`,
      );
      const responseData = await response.json();
      if (responseData.error) {
        setError(responseData.error);
        setGames([]);
        return;
      }
      setGames(responseData);
    } catch {
      setError("Network error. Is the server running?");
    } finally {
      setLoader(false);
    }
  };

  const hasContent = games.length > 0 || loader || error;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col px-4 py-8">
      <Header current="check" />

      <div
        className={`flex flex-1 flex-col ${
          hasContent ? "mt-0" : "items-center justify-center"
        }`}
      >
        <div className="w-full">
          <div className="mx-auto mb-2 flex max-w-md gap-2">
            <input
              type="text"
              placeholder="Steam ID or username (if set)"
              value={steamId}
              onChange={(e) => setSteamId(e.target.value)}
              className="flex-1 border border-muted bg-white px-4 py-2 text-sm text-ink outline-none transition focus:border-celadon focus:ring-2 focus:ring-celadon"
            />
            <button
              type="button"
              onClick={() => getSteamGames(steamId)}
              disabled={loader}
              className="border-2 border-pine bg-celadon px-5 py-2 text-sm font-medium text-ink transition hover:bg-pine hover:text-alice active:scale-95 disabled:opacity-50"
            >
              {loader ? "Loading..." : "Search"}
            </button>
          </div>
          <div className="mx-auto flex max-w-md justify-between">
            <a
              href="https://store.steampowered.com/account/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted underline underline-offset-2 hover:text-celadon"
            >
              Get my Steam ID
            </a>
            <a
              href="https://help.steampowered.com/en/faqs/view/2816-BE67-5B69-0FEC"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted underline underline-offset-2 hover:text-celadon"
            >
              Where is my Steam ID?
            </a>
          </div>

          {error && (
            <div className="mx-auto mt-6 max-w-md border-2 border-red-500 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          {loader && (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin border-4 border-muted border-t-celadon" />
            </div>
          )}
        </div>

        {games.length > 0 && (
          <div className="mt-8 w-full">
            <section className="mb-8 text-center">
              <h2 className="text-lg font-medium text-muted">
                Linux compatibility
              </h2>
              <p
                className={`mt-1 text-5xl font-bold tracking-tight tabular-nums ${
                  playableGamesPercentage < 60
                    ? "text-red-500"
                    : playableGamesPercentage < 80
                      ? "text-orange-500"
                      : "text-celadon"
                }`}
              >
                {playableGamesPercentage.toFixed(1)}%
              </p>
              <p className="mt-1 text-sm text-muted">
                of {gamesCount} game{gamesCount !== 1 ? "s" : ""} are playable
                on Linux
              </p>
            </section>

            <div className="mb-6 space-y-4">
              <div className="mx-auto max-w-md">
                <input
                  type="text"
                  placeholder="Search your games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-muted bg-white px-4 py-2 text-sm text-ink outline-none transition focus:border-celadon focus:ring-2 focus:ring-celadon"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTiers(new Set())}
                  className={`px-3 py-1 text-xs font-semibold border-2 transition ${
                    activeTiers.size === 0
                      ? "border-ink bg-ink text-alice"
                      : "border-muted bg-white text-ink hover:border-ink"
                  }`}
                >
                  All
                </button>
                {TIERS.map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => toggleTier(tier)}
                    className={`px-3 py-1 text-xs font-semibold border-2 transition ${
                      activeTiers.has(tier)
                        ? "border-ink bg-ink text-alice"
                        : "border-muted bg-white text-ink hover:border-ink"
                    }`}
                  >
                    {tier.charAt(0).toUpperCase() + tier.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <p className="mb-4 text-center text-xs text-muted">
              Showing {filteredGames.length} of {gamesCount} game
              {gamesCount !== 1 ? "s" : ""}
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredGames.map((game) => (
                <Game key={game.appid} game={game} />
              ))}
            </div>

            {filteredGames.length === 0 && (
              <p className="py-16 text-center text-sm text-muted">
                No games match your filters.
              </p>
            )}
          </div>
        )}
      </div>

      <footer className="mt-auto border-t-2 border-muted/30 py-6 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">
          Based on{" "}
          <a
            href="https://steamcommunity.com/dev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-celadon"
          >
            Steam Web API
          </a>{" "}
          and{" "}
          <a
            href="https://www.protondb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-celadon"
          >
            ProtonDB
          </a>
        </p>
      </footer>
    </div>
  );
}

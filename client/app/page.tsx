"use client";

import React from "react";
import Game, { type GameData } from "./[_components]/game";
const api_url = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Home() {
  const [steamId, setSteamId] = React.useState("");
  const [games, setGames] = React.useState<GameData[]>([]);
  const [loader, setLoader] = React.useState(false);
  const gamesCount = games.length;
  let playableGamesPercentage = 0;
  let unplayableGames = 0;
  console.log(gamesCount);
  console.log(gamesCount > 0);
  if (gamesCount > 0) {
    for (let i = 0; i < gamesCount; i++) {
      if (games[i].tier === "borked") {
        unplayableGames += 1;
      }
    }
    playableGamesPercentage =
      (100 * (gamesCount - unplayableGames)) / gamesCount;
  }

  const getSteamGames = async (steamId: string) => {
    setLoader(true);
    console.log(steamId);
    try {
      const response = await fetch(
        `${api_url}/api/v1/getSteamGames?steamId=${steamId}`,
      );
      const responseData = await response.json();
      setGames(responseData);
      console.log(games);
    } catch (error) {
      console.error("Error fetching Steam games:", error);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <h1>your steam games</h1>
      <p>76561199000092723</p>

      {loader && (
        <div
          role="status"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        >
          <svg
            aria-hidden="true"
            className="inline w-16 h-16 text-neutral-tertiary animate-spin fill-success"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      <input
        type="text"
        placeholder="Enter your Steam ID"
        value={steamId}
        onChange={(e) => setSteamId(e.target.value)}
      ></input>
      <button type="button" onClick={() => getSteamGames(steamId)}>
        GET GAMES
      </button>

      {games.length > 0 && (
        <div className="results-container flex flex-col items-center justify-center ">
          <h2 className="text-2xl font-bold text-center">Results</h2>
          <h2
            className={`text-xl font-semibold ${
              playableGamesPercentage < 60
                ? "text-red-500"
                : playableGamesPercentage < 80
                  ? "text-orange-500"
                  : "text-green-500"
            }`}
          >
            {playableGamesPercentage.toFixed(1)} %
          </h2>
          <h3 className="text-lg font-medium">
            of your games are playable on Linux !
          </h3>
        </div>
      )}

      <div className="games-container">
        {games.map((game) => (
          <Game key={game.appid} game={game} />
        ))}
      </div>
    </div>
  );
}

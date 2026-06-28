import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
app.use("/*", cors());

export default {
  port: 3001,
  fetch: app.fetch,
};

const api_key = process.env.STEAM_API_KEY;

app.get("/api/v1/getSteamGames", async (c) => {
  const steam_id = c.req.query("steamId");
  const request = new Request(
    `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${api_key}&steamid=${steam_id}&format=json&include_appInfo=true&include_played_free_games=true`,
  );
  const response = JSON.parse(await fetch(request).then((res) => res.text()));

  if (!response.response?.games) {
    return c.json([]);
  }

  const games = response.response.games;

  const data = await Promise.all(
    games.map(async (game: any) => {
      const [playabilityRes, appDetailsRes] = await Promise.allSettled([
        fetch(
          `https://www.protondb.com/api/v1/reports/summaries/${game.appid}.json`,
        ),
        fetch(
          `https://store.steampowered.com/api/appdetails?appids=${game.appid}`,
        ),
      ]);

      let tier: string | null = null;
      if (playabilityRes.status === "fulfilled" && playabilityRes.value.ok) {
        const body = await playabilityRes.value.json();
        tier = body.tier ?? null;
      }
      let isNative: boolean | null = null;
      if (appDetailsRes.status === "fulfilled" && appDetailsRes.value.ok) {
        const body = await appDetailsRes.value.json();
        isNative = body[game.appid]?.data?.platforms?.linux ?? null;
      }

      return {
        appid: game.appid,
        name: game.name,
        header_image: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`,
        tier,
        isNative,
      };
    }),
  );

  return c.json(data);
});

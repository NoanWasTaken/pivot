import { Hono } from "hono";
import { cors } from "hono/cors";

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";

const app = new Hono();
app.use(
  "/*",
  cors({
    origin: allowedOrigin.split(",").map((o) => o.trim()),
  }),
);

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 60_000;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) {
    return false;
  }
  entry.count++;
  return true;
}

export default {
  port: 3001,
  fetch: app.fetch,
};

const api_key = process.env.STEAM_API_KEY;

async function resolveSteamId(input: string): Promise<string> {
  if (/^\d{17}$/.test(input)) {
    return input;
  }
  const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${api_key}&vanityurl=${encodeURIComponent(input)}`;
  const res = await fetch(url).then((r) => r.json() as any);
  if (res.response?.success === 1 && res.response?.steamid) {
    return res.response.steamid;
  } else if (res.response?.success === 1 && res.response?.steamid === null) {
    throw new Error("Could not resolve Steam ID from the provided input.");
  }
  throw new Error("Could not resolve Steam ID from the provided input.");
}

app.get("/api/v1/getSteamGames", async (c) => {
  const ip = c.req.header("x-forwarded-for") ?? "unknown";
  if (!rateLimit(ip)) {
    return c.json(
      { error: "Too many requests. Please wait a minute and try again." },
      429,
    );
  }

  const input = c.req.query("steamId") ?? "";
  let steam_id: string;
  try {
    steam_id = await resolveSteamId(input);
  } catch {
    return c.json({ error: "Invalid Steam ID or vanity URL." }, 400);
  }
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

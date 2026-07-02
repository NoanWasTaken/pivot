import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";

const app = new Hono();
app.use(
  "/*",
  cors({
    origin: allowedOrigin.split(",").map((o) => o.trim()),
  }),
);
app.use("/*", secureHeaders());

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
  idleTimeout: 60,
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
  const t0 = Date.now();

  let steam_id: string;
  try {
    steam_id = await resolveSteamId(input);
  } catch {
    return c.json({ error: "Invalid Steam ID or vanity URL." }, 400);
  }
  const steamRes = await fetch(
    `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${api_key}&steamid=${steam_id}&format=json&include_appInfo=true&include_played_free_games=true`,
  );
  const steamText = await steamRes.text();
  let steamJson: any;
  try {
    steamJson = JSON.parse(steamText);
  } catch {
    return c.json(
      {
        error: "Steam API returned an invalid response",
        body: steamText.slice(0, 200),
      },
      502,
    );
  }

  if (!steamJson.response?.games) {
    return c.json([]);
  }

  const games = steamJson.response.games;
  const data: any[] = [];
  const BATCH_SIZE = 20;

  for (let i = 0; i < games.length; i += BATCH_SIZE) {
    const batch = games.slice(i, i + BATCH_SIZE);

    const protondbResults = await Promise.all(
      batch.map(async (game: any) => {
        const t = Date.now();
        const res = await fetch(
          `https://www.protondb.com/api/v1/reports/summaries/${game.appid}.json`,
        );
        const elapsed = Date.now() - t;
        if (!res.ok) {
          console.log(`protondb ${res.status} ${game.appid} ${game.name} ${elapsed}ms`);
          return null;
        }
        try {
          const body = await res.json();
          console.log(`protondb 200 ${game.appid} ${game.name} ${elapsed}ms tier=${body.tier ?? "none"}`);
          return body.tier ?? null;
        } catch {
          console.log(`protondb parse_error ${game.appid} ${game.name} ${elapsed}ms`);
          return null;
        }
      }),
    );

    const appdetailsResults = await Promise.all(
      batch.map(async (game: any) => {
        const t = Date.now();
        const res = await fetch(
          `https://www.protondb.com/proxy/steam/api/appdetails/?appids=${game.appid}`,
        );
        const elapsed = Date.now() - t;
        if (!res.ok) {
          console.log(`appdetails ${res.status} ${game.appid} ${game.name} ${elapsed}ms`);
          return { appid: game.appid, isNative: null };
        }
        try {
          const body = await res.json();
          const isNative = body[game.appid]?.data?.platforms?.linux ?? null;
          console.log(`appdetails 200 ${game.appid} ${game.name} ${elapsed}ms native=${isNative}`);
          return { appid: game.appid, isNative };
        } catch {
          console.log(`appdetails parse_error ${game.appid} ${game.name} ${elapsed}ms`);
          return { appid: game.appid, isNative: null };
        }
      }),
    );

    const nativeMap: Record<number, boolean | null> = {};
    for (const r of appdetailsResults) {
      nativeMap[r.appid] = r.isNative;
    }

    for (let j = 0; j < batch.length; j++) {
      const game = batch[j];
      data.push({
        appid: game.appid,
        name: game.name,
        header_image: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`,
        tier: protondbResults[j],
        isNative: nativeMap[game.appid],
      });
    }
  }

  const total = Date.now() - t0;
  console.log(
    `[${games.length} games] total=${total}ms batches=${Math.ceil(games.length / BATCH_SIZE)} batchSize=${BATCH_SIZE}`,
  );
  return c.json(data);
});

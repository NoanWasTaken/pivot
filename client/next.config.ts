import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://media.steampowered.com/**"),
      new URL("https://shared.akamai.steamstatic.com/**"),
    ],
  },
};

export default nextConfig;

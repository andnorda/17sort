import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ hostname: "cards.scryfall.io" }] },
  redirects: async () => [
    {
      source: "/",
      destination: "/dft",
      permanent: false,
    },
  ],
};

export default nextConfig;

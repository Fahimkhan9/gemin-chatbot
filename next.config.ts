import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {},
  serverExternalPackages: ["pdf-parse"],
  typescript: {
    ignoreBuildErrors: true,
  },

  eslint:{
      ignoreDuringBuilds: true,
    }
};

export default nextConfig;

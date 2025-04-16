import type { NextConfig } from 'next';
import { config } from 'dotenv';

config({
  path: '.env.local',
});

const nextConfig: NextConfig = process.env.NEXTAUTH_URL ? {
  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
      },
    ],
  },
  // Add configuration for Auth.js trusted hosts
  serverRuntimeConfig: {
    auth: {
      trustHost: true,
    },
  },
} : {
  experimental: {
    ppr: true,
  },
  pageExtensions:  ["page.tsx", "page.ts", "ts"],
  //reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
      },
    ],
  },
  // Add configuration for Auth.js trusted hosts
  serverRuntimeConfig: {
    auth: {
      trustHost: true,
    },
  },
}

export default nextConfig;

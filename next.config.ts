import type { NextConfig } from "next";
import { config } from "dotenv";

config({
  path: ".env.local",
});

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  // FIXME: Next.js has a bug which does not resolve not-found.page.tsx correctly
  // Instead, use `not-found.ts` as a workaround
  // "ts" is required to resolve `not-found.ts`
  // https://github.com/vercel/next.js/issues/65447
  // Standard Next.js page extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'page.tsx', 'page.ts'],
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
};

export default nextConfig;

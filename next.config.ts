import type { NextConfig } from 'next';
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'page.tsx', 'page.ts'],
  //reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
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

import type { NextConfig } from 'next';
import { config } from 'dotenv';

config({
  path: '.env.local',
});
   
let pageExtensions = process.env.NEXT_PUBLIC_APP_NODE_ENV === 'development' ? ['page.tsx', 'page.ts', 'ts']: ['js', 'jsx', 'ts', 'tsx', 'page.tsx', 'page.ts']

console.log(`[DEBUG] pageExtensions: ${pageExtensions}`)
console.log(`[DEBUG] NEXT_PUBLIC_APP_NODE_ENV: ${process.env.NEXT_PUBLIC_APP_NODE_ENV}`)


const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  pageExtensions: pageExtensions,
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

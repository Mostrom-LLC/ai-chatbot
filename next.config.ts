import type { NextConfig } from 'next';

import { config }  from 'dotenv';

config({ path: '.env.local' });

  // FIXME: Next.js has a bug which does not resolve not-found.page.tsx correctly
        // Instead, use `not-found.ts` as a workaround
        // "ts" is required to resolve `not-found.ts`
// https://github.com/vercel/next.js/issues/65447
        
let pageExtensions = process.env.NEXT_PUBLIC_APP_NODE_ENV === 'production' ? ['js', 'jsx', 'ts', 'tsx', 'page.tsx', 'page.ts']:['page.tsx', 'page.ts', 'ts'];
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

export const dynamic = "force-dynamic";

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-dvh w-screen items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-4xl font-bold">404</h2>
        <p className="mt-4 text-lg">This page could not be found.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
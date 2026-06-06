"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="glass w-full max-w-md rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>

        <p className="mt-2 text-sm text-white/60">Try again or go back home.</p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-bold hover:bg-purple-700"
          >
            Retry
          </button>

          <Link
            href="/"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

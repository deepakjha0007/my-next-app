import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="glass w-full max-w-md rounded-2xl p-8 text-center">
        <h1 className="text-7xl font-bold text-purple-500">404</h1>

        <h2 className="mt-4 text-2xl font-semibold">Page not found</h2>

        <p className="mt-2 text-sm text-white/60">
          This route doesn&apos;t exist in Game Zone.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold hover:bg-purple-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

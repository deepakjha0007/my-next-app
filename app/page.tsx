"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Gamepad2 } from "lucide-react";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.push("/home");
    }, 1800);

    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6 animate-float-up">
        {/* Icon */}
        <div className="relative">
          <div className="absolute inset-0 blur-2xl gradient-hero opacity-60 rounded-full" />

          <div className="relative h-24 w-24 rounded-3xl gradient-hero flex items-center justify-center animate-pulse-glow">
            <Gamepad2 className="h-12 w-12 text-primary-foreground" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight">
            <span className="neon-text-purple">GAME</span>{" "}
            <span className="neon-text-orange">ZONE</span>
          </h1>

          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Free Fire Tournaments
          </p>
        </div>

        {/* Loader dots */}
        <div className="mt-4 flex gap-1.5">
          <span
            className="h-2 w-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "0ms" }}
          />

          <span
            className="h-2 w-2 rounded-full bg-accent animate-bounce"
            style={{ animationDelay: "150ms" }}
          />

          <span
            className="h-2 w-2 rounded-full"
            style={{
              background: "var(--neon-green)",
              animationDelay: "300ms",
              animation: "bounce 1s infinite",
            }}
          />
        </div>
      </div>
    </main>
  );
}

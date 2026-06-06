"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Coins,
  Trophy,
  Clock,
  Users,
  Crosshair,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

import { useApp } from "@/context/AppContext";

export default function TournamentDetails() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const { tournaments, joined, joinTournament } = useApp();

  const t = tournaments.find((x) => x.id === id);

  if (!t) {
    return (
      <div className="px-4 pt-10 text-center space-y-4">
        <p>Tournament not found.</p>

        <Link href="/tournaments" className="underline text-primary">
          Back to list
        </Link>
      </div>
    );
  }

  const isJoined = joined.includes(t.id);

  const pct = Math.round((t.slotsFilled / t.slotsTotal) * 100);

  const handleJoin = () => {
    const res = joinTournament(t.id);

    if (res.ok) {
      toast.success(res.message, {
        description: "Good luck, soldier 🎮",
      });

      router.push("/my-tournaments");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_100%)]" />

        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=70')] bg-cover bg-center opacity-25 mix-blend-overlay" />

        <div className="relative h-full px-4 pt-4 flex flex-col">
          <Link
            href="/tournaments"
            className="tap-scale h-9 w-9 rounded-full glass flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="mt-auto pb-2 text-primary-foreground">
            <p className="text-[11px] uppercase tracking-widest opacity-90">
              {t.mode} • {t.map}
            </p>

            <h1 className="text-2xl font-black mt-1">{t.title}</h1>

            <span className="mt-2 inline-block text-[10px] uppercase font-bold px-2 py-1 rounded-full backdrop-blur bg-background/30">
              {t.status === "live" && (
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-destructive mr-1 animate-pulse" />
              )}
              {t.status}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="px-4 -mt-6 relative space-y-5">
        {/* Stats */}
        <div className="glass rounded-2xl p-4 grid grid-cols-3 gap-3 text-center">
          <Stat
            icon={<Coins className="neon-text-orange" />}
            label="Entry"
            value={`₹${t.entryFee}`}
          />

          <Stat
            icon={<Trophy className="neon-text-green" />}
            label="Prize"
            value={`₹${t.prizePool.toLocaleString()}`}
          />

          <Stat
            icon={<Crosshair className="neon-text-purple" />}
            label="Per Kill"
            value={`₹${t.perKill}`}
          />
        </div>

        {/* Timing */}
        <div className="glass rounded-2xl p-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 neon-text-purple" />
            <span>Starts at</span>
          </div>

          <span className="font-bold text-sm">
            {new Date(t.startTime).toLocaleString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "short",
            })}
          </span>
        </div>

        {/* Slots */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4" /> Slots
            </span>

            <span className="text-muted-foreground">
              {t.slotsFilled}/{t.slotsTotal}
            </span>
          </div>

          <div className="h-2 w-full rounded-full bg-surface overflow-hidden">
            <div
              className="h-full gradient-hero"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="mt-4 grid grid-cols-8 gap-1.5">
            {Array.from({ length: t.slotsTotal }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-md text-[9px] flex items-center justify-center font-bold ${
                  i < t.slotsFilled
                    ? "gradient-primary text-primary-foreground"
                    : "bg-surface text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Rules */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-bold mb-3 inline-flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 neon-text-orange" /> Rules
          </h3>

          <ul className="space-y-2 text-sm text-muted-foreground">
            {t.rules.map((r, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-24 inset-x-0 z-30 px-4">
        <div className="mx-auto max-w-md">
          <button
            disabled={isJoined || t.status === "completed"}
            onClick={handleJoin}
            className={`w-full tap-scale rounded-2xl py-4 font-bold text-sm shadow-neon-purple ${
              isJoined || t.status === "completed"
                ? "bg-muted text-muted-foreground"
                : "gradient-primary text-primary-foreground animate-pulse-glow"
            }`}
          >
            {isJoined
              ? "Already Joined"
              : t.status === "completed"
                ? "Tournament Ended"
                : `Join Match — ₹${t.entryFee}`}
          </button>
        </div>
      </div>
    </>
  );
}

/* ---------- Stat Component ---------- */

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex justify-center h-5 w-5 mx-auto [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </div>

      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
        {label}
      </p>

      <p className="font-bold text-sm">{value}</p>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Wallet, Plus, Flame, Zap } from "lucide-react";

import { useApp } from "@/context/AppContext";
import TopBar from "@/components/TopBar";
import TournamentCard from "@/components/TournamentCard";
import { CardSkeleton } from "@/components/Skeleton";

export default function HomePage() {
  const { user, tournaments } = useApp();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  if (!user) return null; // safety check

  const featured = tournaments.filter((t) => t.featured);
  const live = tournaments.filter((t) => t.status === "live");
  const upcoming = tournaments.filter((t) => t.status === "upcoming");

  return (
    <>
      <TopBar title="Game Zone" />

      <div className="px-4 pt-4 space-y-6">
        {/* Greeting */}
        <section className="flex items-center gap-3 animate-float-up">
          <img
            src={user.avatar}
            alt={user.username}
            className="h-12 w-12 rounded-2xl glass p-1"
          />

          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Welcome back</p>
            <p className="font-bold truncate">{user.username}</p>
          </div>

          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-accent/20 text-accent border border-accent/30">
            LVL {user.level}
          </span>
        </section>

        {/* Wallet */}
        <section className="glass rounded-2xl p-5 relative overflow-hidden animate-float-up">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full gradient-hero opacity-30 blur-2xl" />

          <div className="flex items-start justify-between relative">
            <div>
              <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                <Wallet className="h-3.5 w-3.5" /> Wallet balance
              </p>

              <p className="text-3xl font-black mt-1">
                ₹{user.wallet.toLocaleString()}
              </p>
            </div>

            <Link
              href="/wallet"
              className="tap-scale rounded-xl gradient-primary text-primary-foreground px-3 py-2 text-xs font-bold inline-flex items-center gap-1 shadow-neon-purple"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </Link>
          </div>
        </section>

        {/* Featured */}
        <section className="animate-float-up">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-bold inline-flex items-center gap-1.5">
              <Flame className="h-4 w-4 neon-text-orange" /> Featured
            </h2>

            <Link href="/tournaments" className="text-xs text-muted-foreground">
              See all
            </Link>
          </div>

          <div className="-mx-4 px-4 flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {featured.map((t) => (
              <Link
                key={t.id}
                href={`/tournaments/${t.id}`}
                className="snap-start shrink-0 w-[78%] tap-scale relative overflow-hidden rounded-2xl p-5 gradient-hero text-primary-foreground shadow-neon-purple"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />

                <p className="text-[10px] uppercase tracking-widest opacity-80 relative">
                  {t.mode} • {t.map}
                </p>

                <h3 className="text-lg font-black mt-1 relative">{t.title}</h3>

                <div className="mt-4 flex items-end justify-between relative">
                  <div>
                    <p className="text-[10px] uppercase opacity-80">
                      Prize Pool
                    </p>
                    <p className="text-2xl font-black">
                      ₹{t.prizePool.toLocaleString()}
                    </p>
                  </div>

                  <span className="text-[11px] font-bold bg-background/25 backdrop-blur px-2.5 py-1.5 rounded-lg">
                    Entry ₹{t.entryFee}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Live */}
        {live.length > 0 && (
          <section>
            <h2 className="text-sm font-bold mb-3 px-1 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
              Live now
            </h2>

            <div className="space-y-3">
              {loading ? (
                <CardSkeleton />
              ) : (
                live.map((t) => <TournamentCard key={t.id} t={t} />)
              )}
            </div>
          </section>
        )}

        {/* Upcoming */}
        <section>
          <h2 className="text-sm font-bold mb-3 px-1 inline-flex items-center gap-1.5">
            <Zap className="h-4 w-4 neon-text-green" /> Upcoming
          </h2>

          <div className="space-y-3">
            {loading ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              upcoming.map((t) => <TournamentCard key={t.id} t={t} />)
            )}
          </div>
        </section>

        {/* My tournaments */}
        <Link
          href="/my-tournaments"
          className="block glass rounded-2xl p-4 text-center text-sm tap-scale"
        >
          View{" "}
          <span className="neon-text-purple font-bold">My TournamentS</span>
        </Link>
      </div>
    </>
  );
}

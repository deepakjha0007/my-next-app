"use client";

import Link from "next/link";

import TopBar from "@/components/TopBar";
import TournamentCard from "@/components/TournamentCard";
import { useApp } from "@/context/AppContext";

export default function MyTournaments() {
  const { tournaments, joined } = useApp();

  const list = tournaments.filter((t) => joined.includes(t.id));

  return (
    <>
      <TopBar title="My Tournaments" />

      <div className="px-4 pt-4 space-y-3">
        {list.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              You havent joined any tournaments yet.
            </p>

            <Link
              href="/tournaments"
              className="inline-block rounded-xl gradient-primary text-primary-foreground px-4 py-2 text-sm font-bold"
            >
              Browse Tournaments
            </Link>
          </div>
        ) : (
          list.map((t) => <TournamentCard key={t.id} t={t} />)
        )}
      </div>
    </>
  );
}

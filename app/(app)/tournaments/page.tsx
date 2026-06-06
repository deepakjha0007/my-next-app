"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import TournamentCard from "@/components/TournamentCard";
import { useApp } from "@/context/AppContext";

const filters = ["all", "live", "upcoming", "completed"] as const;

type Filter = (typeof filters)[number];

export default function TournamentsPage() {
  const { tournaments } = useApp();

  const [filter, setFilter] = useState<Filter>("all");

  const list =
    filter === "all"
      ? tournaments
      : tournaments.filter((t) => t.status === filter);

  return (
    <>
      <TopBar title="Tournaments" />

      <div className="px-4 pt-4 space-y-4">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`tap-scale px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                filter === f
                  ? "gradient-primary text-primary-foreground shadow-neon-purple"
                  : "glass text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-3">
          {list.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-12">
              No tournaments here.
            </p>
          ) : (
            list.map((t) => <TournamentCard key={t.id} t={t} />)
          )}
        </div>
      </div>
    </>
  );
}

import Link from "next/link";
import { Users, Clock, Trophy, Coins } from "lucide-react";
import type { Tournament } from "@/services/mockData";

function timeLabel(iso: string) {
  const diff = Math.round((new Date(iso).getTime() - Date.now()) / 60000);
  if (diff < -60) return `${Math.round(diff / -60)}h ago`;
  if (diff < 0) return `${-diff}m ago`;
  if (diff < 60) return `in ${diff}m`;
  return `in ${Math.round(diff / 60)}h`;
}

const statusStyles: Record<string, string> = {
  live: "bg-destructive/20 text-destructive border-destructive/30",
  upcoming: "bg-primary/15 text-primary border-primary/30",
  completed: "bg-muted text-muted-foreground border-border",
};

export default function TournamentCard({ t }: { t: Tournament }) {
  const pct = Math.round((t.slotsFilled / t.slotsTotal) * 100);
  return (
    <Link
      href={`/tournaments/${t.id}`}
      className="block animate-float-up tap-scale glass rounded-2xl p-4 space-y-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground uppercase tracking-wider">
            <span>{t.mode}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground" />
            <span>{t.map}</span>
          </div>
          <h3 className="mt-1 text-base font-bold leading-tight truncate">
            {t.title}
          </h3>
        </div>
        <span
          className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${statusStyles[t.status]}`}
        >
          {t.status === "live" && (
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-destructive mr-1 animate-pulse" />
          )}
          {t.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="rounded-xl bg-surface/60 p-2 text-center">
          <Coins className="h-3.5 w-3.5 mx-auto neon-text-orange" />
          <div className="mt-1 text-muted-foreground">Entry</div>
          <div className="font-bold">₹{t.entryFee}</div>
        </div>
        <div className="rounded-xl bg-surface/60 p-2 text-center">
          <Trophy className="h-3.5 w-3.5 mx-auto neon-text-green" />
          <div className="mt-1 text-muted-foreground">Prize</div>
          <div className="font-bold">₹{t.prizePool.toLocaleString()}</div>
        </div>
        <div className="rounded-xl bg-surface/60 p-2 text-center">
          <Clock className="h-3.5 w-3.5 mx-auto neon-text-purple" />
          <div className="mt-1 text-muted-foreground">Starts</div>
          <div className="font-bold">{timeLabel(t.startTime)}</div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
          <span className="inline-flex items-center gap-1">
            <Users className="h-3 w-3" /> {t.slotsFilled}/{t.slotsTotal} slots
          </span>
          <span>{pct}% full</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-surface overflow-hidden">
          <div className="h-full gradient-hero" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </Link>
  );
}

"use client";

import { toast } from "sonner";
import {
  LogOut,
  Trophy,
  Target,
  Coins,
  ChevronRight,
  ListChecks,
  Bell,
  Wallet as WalletIcon,
} from "lucide-react";

import Link from "next/link";

import TopBar from "@/components/TopBar";
import { useApp } from "@/context/AppContext";

export default function ProfilePage() {
  const { user } = useApp();

  const winRate = Math.round(
    (user.wins / Math.max(user.matchesPlayed, 1)) * 100,
  );

  return (
    <>
      <TopBar title="Profile" />

      <div className="px-4 pt-4 space-y-5">
        {/* Profile header */}
        <section className="glass rounded-2xl p-5 flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 blur-xl gradient-hero opacity-50 rounded-full" />

            <img
              src={user.avatar}
              alt={user.username}
              className="relative h-16 w-16 rounded-2xl glass p-1"
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-black text-lg truncate">{user.username}</p>
            <p className="text-xs text-muted-foreground">FF ID: {user.ffId}</p>

            <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
              Level {user.level}
            </span>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-3">
          <StatCard
            icon={<Target className="neon-text-purple" />}
            value={user.matchesPlayed}
            label="Matches"
          />

          <StatCard
            icon={<Trophy className="neon-text-green" />}
            value={user.wins}
            label="Wins"
          />

          <StatCard
            icon={<Coins className="neon-text-orange" />}
            value={`₹${user.earnings.toLocaleString()}`}
            label="Earnings"
          />
        </section>

        {/* Win rate */}
        <section className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Win rate</span>
            <span className="font-bold neon-text-green">{winRate}%</span>
          </div>

          <div className="h-2 rounded-full bg-surface overflow-hidden">
            <div
              className="h-full"
              style={{
                width: `${winRate}%`,
                background: "var(--neon-green)",
              }}
            />
          </div>
        </section>

        {/* Menu */}
        <section className="glass rounded-2xl divide-y divide-border overflow-hidden">
          <MenuLink
            href="/my-tournaments"
            icon={<ListChecks className="h-4 w-4" />}
            label="My Tournaments"
          />

          <MenuLink
            href="/wallet"
            icon={<WalletIcon className="h-4 w-4" />}
            label="Wallet"
          />

          <MenuLink
            href="/notifications"
            icon={<Bell className="h-4 w-4" />}
            label="Notifications"
          />
        </section>

        {/* Logout */}
        <button
          onClick={() => toast("Logged out (demo)")}
          className="w-full tap-scale glass rounded-2xl p-4 text-sm font-bold text-destructive inline-flex items-center justify-center gap-2"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </>
  );
}

/* ---------- Components ---------- */

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="glass rounded-2xl p-3 text-center">
      <div className="mx-auto h-6 w-6 flex items-center justify-center">
        {icon}
      </div>

      <p className="mt-1 text-base font-black">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function MenuLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link href={href} className="flex items-center gap-3 p-4 tap-scale">
      <span className="h-9 w-9 rounded-xl bg-surface flex items-center justify-center text-primary">
        {icon}
      </span>

      <span className="flex-1 text-sm font-medium">{label}</span>

      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  );
}

"use client";

import { useEffect } from "react";
import { Bell, Megaphone, Trophy, Wallet } from "lucide-react";

import TopBar from "@/components/TopBar";
import { useApp } from "@/context/AppContext";

const iconFor = {
  tournament: <Trophy className="h-4 w-4 neon-text-green" />,
  admin: <Megaphone className="h-4 w-4 neon-text-orange" />,
  wallet: <Wallet className="h-4 w-4 neon-text-purple" />,
} as const;

export default function NotificationsPage() {
  const { notifications, markAllRead } = useApp();

  useEffect(() => {
    const t = setTimeout(() => {
      markAllRead();
    }, 800);

    return () => clearTimeout(t);
  }, [markAllRead]);

  return (
    <>
      <TopBar title="Notifications" />

      <div className="px-4 pt-4 space-y-2">
        {notifications.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center">
            <Bell className="mx-auto h-8 w-8 text-muted-foreground" />

            <p className="mt-2 text-sm text-muted-foreground">
              No notifications yet
            </p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`glass rounded-2xl p-4 flex gap-3 ${
                !n.read ? "border-primary/40" : ""
              }`}
            >
              <div className="h-10 w-10 rounded-xl bg-surface flex items-center justify-center shrink-0">
                {iconFor[n.type]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold truncate">{n.title}</p>

                  {!n.read && (
                    <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                  )}
                </div>

                <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>

                <p className="text-[10px] text-muted-foreground mt-1">
                  {new Date(n.date).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

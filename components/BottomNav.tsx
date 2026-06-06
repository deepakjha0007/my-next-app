"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, Wallet, User } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/tournaments", label: "Tournaments", icon: Trophy },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-md px-3 pb-3">
        <div className="glass rounded-2xl flex items-center justify-around px-2 py-2">
          {items.map(({ to, label, icon: Icon }) => {
            const active =
              pathname === to || (to !== "/home" && pathname.startsWith(to));
            return (
              <Link
                key={to}
                href={to}
                className="flex-1 tap-scale flex flex-col items-center gap-1 py-2 rounded-xl"
              >
                <div
                  className={`flex items-center justify-center h-9 w-9 rounded-xl transition-all ${
                    active
                      ? "gradient-primary shadow-neon-purple"
                      : "bg-transparent"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${active ? "text-primary-foreground" : "text-muted-foreground"}`}
                  />
                </div>
                <span
                  className={`text-[10px] font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

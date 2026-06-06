import Link from "next/link";
import { Bell } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function TopBar({ title }: { title: string }) {
  const { notifications } = useApp();
  const unread = notifications.filter((n) => !n.read).length;
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="mx-auto max-w-md px-4 h-14 flex items-center justify-between">
        <h1 className="text-base font-bold tracking-wide">{title}</h1>
        <Link
          href="/notifications"
          className="relative tap-scale h-9 w-9 rounded-full glass flex items-center justify-center"
        >
          <Bell className="h-4 w-4" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full text-[10px] font-bold bg-accent text-accent-foreground flex items-center justify-center">
              {unread}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

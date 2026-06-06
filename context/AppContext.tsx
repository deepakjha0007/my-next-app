"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import {
  mockUser,
  mockTournaments,
  mockTransactions,
  mockNotifications,
} from "../services/mockData";

import type {
  Tournament,
  Transaction,
  Notification,
  User,
} from "../services/mockData";

type AppState = {
  user: User;
  tournaments: Tournament[];
  joined: string[];
  transactions: Transaction[];
  notifications: Notification[];
  joinTournament: (id: string) => { ok: boolean; message: string };
  addFunds: (amount: number) => void;
  withdrawFunds: (amount: number) => { ok: boolean; message: string };
  markAllRead: () => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(mockUser);
  const [tournaments] = useState<Tournament[]>(mockTournaments);
  const [joined, setJoined] = useState<string[]>(["t2"]);
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  const joinTournament = (id: string) => {
    const t = tournaments.find((x) => x.id === id);
    if (!t) return { ok: false, message: "Tournament not found" };
    if (joined.includes(id)) return { ok: false, message: "Already joined" };
    if (user.wallet < t.entryFee)
      return { ok: false, message: "Insufficient wallet balance" };
    setUser({ ...user, wallet: user.wallet - t.entryFee });
    setJoined([...joined, id]);
    setTransactions([
      {
        id: `tx-${Date.now()}`,
        type: "debit",
        amount: t.entryFee,
        label: `Entry: ${t.title}`,
        date: new Date().toISOString(),
      },
      ...transactions,
    ]);
    return { ok: true, message: `Joined ${t.title}` };
  };

  const addFunds = (amount: number) => {
    setUser({ ...user, wallet: user.wallet + amount });
    setTransactions([
      {
        id: `tx-${Date.now()}`,
        type: "credit",
        amount,
        label: "Wallet top-up",
        date: new Date().toISOString(),
      },
      ...transactions,
    ]);
  };

  const withdrawFunds = (amount: number) => {
    if (amount > user.wallet)
      return { ok: false, message: "Insufficient balance" };
    setUser({ ...user, wallet: user.wallet - amount });
    setTransactions([
      {
        id: `tx-${Date.now()}`,
        type: "debit",
        amount,
        label: "Withdraw request",
        date: new Date().toISOString(),
      },
      ...transactions,
    ]);
    return { ok: true, message: "Withdraw request submitted" };
  };

  const markAllRead = () =>
    setNotifications(notifications.map((n) => ({ ...n, read: true })));

  return (
    <AppContext.Provider
      value={{
        user,
        tournaments,
        joined,
        transactions,
        notifications,
        joinTournament,
        addFunds,
        withdrawFunds,
        markAllRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

"use client";

import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Plus, Wallet } from "lucide-react";
import { toast } from "sonner";

import TopBar from "@/components/TopBar";
import { useApp } from "@/context/AppContext";

export default function WalletPage() {
  const { user, transactions, addFunds, withdrawFunds } = useApp();

  const [amount, setAmount] = useState("");

  const handle = (type: "add" | "withdraw") => {
    const n = parseInt(amount, 10);

    if (!n || n <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    if (type === "add") {
      addFunds(n);
      toast.success(`₹${n} added to wallet`);
      setAmount("");
    } else {
      const res = withdrawFunds(n);

      res.ok ? toast.success(res.message) : toast.error(res.message);

      if (res.ok) setAmount("");
    }
  };

  return (
    <>
      <TopBar title="Wallet" />

      <div className="px-4 pt-4 space-y-5">
        {/* Balance */}
        <section className="glass rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full gradient-hero opacity-30 blur-3xl" />

          <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5 relative">
            <Wallet className="h-3.5 w-3.5" /> Total balance
          </p>

          <p className="text-4xl font-black mt-1 relative">
            ₹{user.wallet.toLocaleString()}
          </p>

          <p className="text-xs text-muted-foreground mt-1 relative">
            Game Zone wallet • Ready to play
          </p>
        </section>

        {/* Input */}
        <section className="glass rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 rounded-xl bg-surface px-3 py-3">
            <span className="text-muted-foreground">₹</span>

            <input
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter amount"
              className="flex-1 bg-transparent outline-none text-base font-semibold"
            />
          </div>

          {/* Quick buttons */}
          <div className="flex gap-2">
            {[100, 250, 500, 1000].map((q) => (
              <button
                key={q}
                onClick={() => setAmount(String(q))}
                className="flex-1 tap-scale text-xs font-bold py-2 rounded-lg bg-surface-elevated text-muted-foreground"
              >
                ₹{q}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handle("add")}
              className="tap-scale rounded-xl gradient-primary text-primary-foreground py-3 text-sm font-bold inline-flex items-center justify-center gap-1.5 shadow-neon-purple"
            >
              <Plus className="h-4 w-4" /> Add Funds
            </button>

            <button
              onClick={() => handle("withdraw")}
              className="tap-scale rounded-xl gradient-accent text-accent-foreground py-3 text-sm font-bold inline-flex items-center justify-center gap-1.5 shadow-neon-orange"
            >
              <ArrowUpRight className="h-4 w-4" /> Withdraw
            </button>
          </div>
        </section>

        {/* History */}
        <section>
          <h2 className="text-sm font-bold mb-3 px-1">Transaction history</h2>

          <div className="space-y-2">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="glass rounded-xl p-3 flex items-center gap-3"
              >
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                    tx.type === "credit"
                      ? "bg-[color:var(--neon-green)]/15 text-[color:var(--neon-green)]"
                      : "bg-destructive/15 text-destructive"
                  }`}
                >
                  {tx.type === "credit" ? (
                    <ArrowDownLeft className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{tx.label}</p>

                  <p className="text-[11px] text-muted-foreground">
                    {new Date(tx.date).toLocaleString()}
                  </p>
                </div>

                <p
                  className={`text-sm font-bold ${
                    tx.type === "credit"
                      ? "text-[color:var(--neon-green)]"
                      : "text-destructive"
                  }`}
                >
                  {tx.type === "credit" ? "+" : "-"}₹{tx.amount}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

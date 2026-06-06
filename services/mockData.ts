export type Tournament = {
  id: string;
  title: string;
  mode: "Solo" | "Duo" | "Squad";
  map: string;
  entryFee: number;
  prizePool: number;
  perKill: number;
  startTime: string;
  status: "live" | "upcoming" | "completed";
  slotsTotal: number;
  slotsFilled: number;
  featured?: boolean;
  rules: string[];
};

export type Transaction = {
  id: string;
  type: "credit" | "debit";
  amount: number;
  label: string;
  date: string;
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  type: "tournament" | "admin" | "wallet";
  date: string;
  read: boolean;
};

export type User = {
  id: string;
  username: string;
  ffId: string;
  level: number;
  wallet: number;
  matchesPlayed: number;
  wins: number;
  earnings: number;
  avatar: string;
};

export const mockUser: User = {
  id: "u1",
  username: "NIDHI JHA",
  ffId: "284619372",
  level: 62,
  wallet: 1250,
  matchesPlayed: 184,
  wins: 47,
  earnings: 8420,
  avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=GhostReaper",
};

const inMins = (m: number) => new Date(Date.now() + m * 60000).toISOString();

export const mockTournaments: Tournament[] = [
  {
    id: "t1",
    title: "Booyah Royale",
    mode: "Squad",
    map: "Bermuda",
    entryFee: 50,
    prizePool: 5000,
    perKill: 20,
    startTime: inMins(45),
    status: "upcoming",
    slotsTotal: 48,
    slotsFilled: 31,
    featured: true,
    rules: ["No emulators", "No teaming", "Screenshot final result", "Voice chat optional"],
  },
  {
    id: "t2",
    title: "Sniper Showdown",
    mode: "Solo",
    map: "Purgatory",
    entryFee: 20,
    prizePool: 1500,
    perKill: 15,
    startTime: inMins(-10),
    status: "live",
    slotsTotal: 50,
    slotsFilled: 50,
    rules: ["Snipers only", "Drop at Mill", "No vehicles"],
  },
  {
    id: "t3",
    title: "Duo Clash Cup",
    mode: "Duo",
    map: "Kalahari",
    entryFee: 30,
    prizePool: 2500,
    perKill: 18,
    startTime: inMins(120),
    status: "upcoming",
    slotsTotal: 30,
    slotsFilled: 12,
    featured: true,
    rules: ["Duo only", "No bushcamping last zone"],
  },
  {
    id: "t4",
    title: "Pro League Night",
    mode: "Squad",
    map: "Bermuda",
    entryFee: 100,
    prizePool: 12000,
    perKill: 30,
    startTime: inMins(240),
    status: "upcoming",
    slotsTotal: 64,
    slotsFilled: 18,
    featured: true,
    rules: ["Pro players only", "Discord required"],
  },
  {
    id: "t5",
    title: "Rookie Rumble",
    mode: "Solo",
    map: "Bermuda",
    entryFee: 10,
    prizePool: 800,
    perKill: 10,
    startTime: inMins(-180),
    status: "completed",
    slotsTotal: 48,
    slotsFilled: 48,
    rules: ["Beginners welcome"],
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: "x1",
    type: "credit",
    amount: 500,
    label: "Tournament reward: Rookie Rumble",
    date: inMins(-200),
  },
  {
    id: "x2",
    type: "debit",
    amount: 20,
    label: "Entry: Sniper Showdown",
    date: inMins(-30),
  },
  {
    id: "x3",
    type: "credit",
    amount: 1000,
    label: "Wallet top-up",
    date: inMins(-1440),
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Match starting soon",
    body: "Sniper Showdown begins in 10 minutes. Get ready!",
    type: "tournament",
    date: inMins(-5),
    read: false,
  },
  {
    id: "n2",
    title: "New tournament added",
    body: "Pro League Night — 12,000 ₹ prize pool. Register now!",
    type: "admin",
    date: inMins(-60),
    read: false,
  },
  {
    id: "n3",
    title: "Wallet credited",
    body: "₹500 added from Rookie Rumble winnings.",
    type: "wallet",
    date: inMins(-200),
    read: true,
  },
  {
    id: "n4",
    title: "Maintenance notice",
    body: "Scheduled maintenance at 3 AM IST tonight.",
    type: "admin",
    date: inMins(-720),
    read: true,
  },
];

// app/(app)/layout.tsx

import BottomNav from "@/components/BottomNav";
import { AppProvider } from "@/context/AppContext";
import Providers from "@/app/provider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <Providers>
        <div className="min-h-screen mx-auto max-w-md pb-28">
          {children}
          <BottomNav />
        </div>
      </Providers>
    </AppProvider>
  );
}

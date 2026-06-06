import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AppProvider } from "@/context/AppContext";
import Providers from "@/app/provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Game Zone",
  description: "Game Zone App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white flex justify-center">
        <div className="w-full max-w-md min-h-screen bg-background">
          <AppProvider>
            <Providers>{children}</Providers>
          </AppProvider>
        </div>
      </body>
    </html>
  );
}

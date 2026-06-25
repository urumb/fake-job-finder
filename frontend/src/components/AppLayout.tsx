"use client";

import { ReactNode } from "react";
import { Navigation } from "./Navigation";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <Navigation />
      <main className="pt-16 min-h-screen">
        {children}
      </main>
    </div>
  );
}

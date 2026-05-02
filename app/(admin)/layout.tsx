"use client";

import { AdminLayoutProps } from "@/components/shared/Dashboard Sidebar/config/types";
import Navbar from "@/components/shared/Dashboard Sidebar/partials/Navbar";
import Sidebar from "@/components/shared/Dashboard Sidebar/partials/Sidebar";


export default function AdminLayout({
  children,
  activePath = "/calendar",
}: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen" style={{ background: "#ede8e8" }}>
      {/* Sidebar */}
      <Sidebar activePath={activePath} />

      {/* Main */}
      <div className="flex flex-col flex-1 min-h-screen">
        <Navbar />

        <main
          className="flex-1 overflow-y-auto"
          style={{ background: "#f9f6f6" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
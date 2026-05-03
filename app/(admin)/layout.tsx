"use client";

import Navbar from "@/components/shared/dashboard-sidebar/partials/Navbar";
import Sidebar from "@/components/shared/dashboard-sidebar/partials/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-primary-50">
      <Sidebar activePath="" />

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
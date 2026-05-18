"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation"; // ✅ important
import Link from "next/link";
import Image from "next/image";
import {
  LayoutGrid,
  Calendar,
  Table,
  Flower2,
  Users,
  Star,
  User,
  PlusCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LogOut,
  Mail,
  BarChart,
  FileText,
} from "lucide-react";

import { navSections } from "../config/constant";
import { NavSection, SidebarProps } from "../config/types";
import { useAuth, signOut } from "@/lib/auth";

const IconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  grid: LayoutGrid,
  calendar: Calendar,
  table: Table,
  flower: Flower2,
  users: Users,
  star: Star,
  user: User,
  "plus-circle": PlusCircle,
  settings: Settings,
  mail: Mail,
  chart: BarChart,
  "file-text": FileText,
};

export default function Sidebar({ }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname(); // ✅ current URL
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = () => {
    signOut();
    router.replace("/admin/login");
  };

  const initials = user?.name
    ? user.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "—";

  return (
    <aside
      className="flex flex-col flex-shrink-0 border-r relative transition-all duration-300 ease-in-out"
      style={{
        width: collapsed ? 80 : 240,
        background: "#fce8e8",
        borderColor: "#f0dede",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-10 z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-gray-400 hover:text-pink-500 shadow-sm transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo */}
      <div
        className="flex flex-col items-center justify-center border-b transition-all duration-300"
        style={{
          borderColor: "#f0dede",
          padding: collapsed ? "20px 10px" : "24px 16px",
          minHeight: "140px",
        }}
      >
        <div
          className="flex items-center justify-center rounded-full border shadow-sm transition-all duration-300"
          style={{
            width: collapsed ? 55 : 120,
            height: collapsed ? 55 : 120,
            borderColor: "#f0dede",
          }}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={collapsed ? 50 : 100}
            height={collapsed ? 50 : 100}
            className="object-contain"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navSections.map((section: NavSection) => (
          <div key={section.label} className="mb-4">
            <div className="space-y-1 px-3">
              {section.items.map((item) => {
                const IconComponent = IconMap[item.icon];

                // ✅ FIXED ACTIVE LOGIC
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${isActive
                        ? "bg-primary text-white shadow-md"
                        : "text-gray hover:bg-primary-100"
                      }`}
                  >
                    <IconComponent size={20} />

                    {!collapsed && (
                      <span className="text-[13px] font-medium flex-1 truncate">
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t p-3 space-y-2" style={{ borderColor: "#f0dede" }}>
        {!collapsed && (
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-primary hover:bg-primary-100 transition-colors text-[12px] font-semibold"
          >
            <ExternalLink size={16} />
            <span>Visit Website</span>
          </Link>
        )}

        <div
          className={`flex items-center gap-3 p-2 rounded-xl transition-all ${collapsed ? "justify-center" : "bg-white/40 border border-[#f0dede]"
            }`}
        >
          <div
            className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-sm"
            style={{ background: "linear-gradient(135deg, #e85d7e, #f4a0b5)" }}
          >
            {initials}
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-bold text-gray-800 truncate">
                {user?.name ?? "Signed out"}
              </p>
              <p className="text-[10px] text-gray-500 truncate">
                {user?.email ?? "—"}
              </p>
            </div>
          )}

          {!collapsed && user && (
            <button
              onClick={handleLogout}
              title="Sign out"
              className="p-1.5 rounded-lg text-gray-400 hover:text-pink-600 hover:bg-pink-50 transition-colors flex-shrink-0"
            >
              <LogOut size={14} />
            </button>
          )}
        </div>

        {collapsed && user && (
          <button
            onClick={handleLogout}
            title="Sign out"
            className="w-full mt-2 flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-pink-600 hover:bg-pink-50 transition-colors"
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );
}
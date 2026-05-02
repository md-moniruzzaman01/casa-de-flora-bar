"use client";

import { useState } from "react";
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
  ExternalLink 
} from "lucide-react";
import { navSections } from "../config/constant";
import { NavSection, SidebarProps } from "../config/types";

// Maps the string 'icon' from your constant.ts to the actual Lucide component
const IconMap: Record<string, any> = {
  "grid": LayoutGrid,
  "calendar": Calendar,
  "table": Table,
  "flower": Flower2,
  "users": Users,
  "star": Star,
  "user": User,
  "plus-circle": PlusCircle,
  "settings": Settings,
};

export default function Sidebar({ activePath }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

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

      {/* Logo Section */}
      <div
        className="flex flex-col items-center justify-center border-b transition-all duration-300"
        style={{ 
            borderColor: "#f0dede", 
            padding: collapsed ? "20px 10px" : "24px 16px",
            minHeight: "140px" 
        }}
      >
        <div
          className="flex items-center justify-center rounded-full  border shadow-sm transition-all duration-300"
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

        {!collapsed && (
          <div className="mt-3 text-center animate-in fade-in duration-500">
            <p className="text-sm " style={{ fontFamily: "Georgia, serif" }}>
              Casa de
            </p>
            <p className="uppercase text-[10px] tracking-[0.2em] text-gray font-bold">
              Flora Bar
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        {navSections.map((section: NavSection) => (
          <div key={section.label} className="mb-4">
            {!collapsed && (
              <p className="px-6 mb-2 uppercase text-[10px] font-bold tracking-widest text-gray-400">
                {section.label}
              </p>
            )}

            <div className="space-y-1 px-3">
              {section.items.map((item) => {
                const isActive = activePath === item.href;
                const IconComponent = IconMap[item.icon];
                
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    title={collapsed ? item.label : ""}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                      isActive 
                        ? "bg-primary text-white shadow-md" 
                        : "text-gray hover:bg-primary-100 hover:text-priamry"
                    }`}
                    style={{ justifyContent: collapsed ? "center" : "flex-start" }}
                  >
                    <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                      {IconComponent ? (
                        <IconComponent size={20} strokeWidth={isActive ? 2.5 : 2} />
                      ) : (
                        <span className="text-xs font-bold">{item.label.charAt(0)}</span>
                      )}
                    </div>
                    
                    {!collapsed && (
                      <span className="text-[13px] font-medium flex-1 truncate">
                        {item.label}
                      </span>
                    )}

                    {item.badge && !collapsed && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isActive ? "bg-white/20 text-white" : "bg-gray-800 text-white"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer / User Section */}
      <div className="border-t p-3 space-y-2" style={{ borderColor: "#f0dede" }}>
        {!collapsed && (
          <a
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-primary hover:bg-primary-100 transition-colors text-[12px] font-semibold"
          >
            <ExternalLink size={16} />
            <span>Visit Website</span>
          </a>
        )}

        <div
          className={`flex items-center gap-3 p-2 rounded-xl transition-all ${
            collapsed ? "justify-center" : "bg-white/40 border border-[#f0dede]"
          }`}
        >
          <div
            className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-sm"
            style={{ background: "linear-gradient(135deg, #e85d7e, #f4a0b5)" }}
          >
            RP
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="text-[12px] font-bold text-gray-800 truncate">Russel Petter</p>
              <p className="text-[10px] text-gray-500 truncate">petter@portal.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
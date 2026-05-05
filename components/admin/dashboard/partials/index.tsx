"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ReservationFilter } from "../config/types";
import { overviewItems, reservations, STATUS_DOT, STATUS_STYLES } from "../config/constant";
import OverviewRow from "./OverviewRow";
import MiniCalendar from "./MiniCalendar";
import StatCard from "./StatCard";





// ── Main Page ──────────────────────────────────────────────────────────────
export default function DashboardContent() {
  const [filter, setFilter] = useState<ReservationFilter>("All");
  const pageRef = useRef<HTMLDivElement>(null);

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stat cards stagger in
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
      );
      // Overview rows
      gsap.fromTo(
        ".overview-row",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.45, stagger: 0.08, delay: 0.3, ease: "power2.out" }
      );
      // Calendar + table
      gsap.fromTo(
        ".fade-up",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.2, ease: "power2.out" }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const filters: ReservationFilter[] = ["All", "Table", "Bouquet", "Large Group", "Event"];
  const filtered =
    filter === "All"
      ? reservations
      : reservations.filter((r) => r.bookingFor === filter);

  return (
    <div ref={pageRef} className="flex-1 overflow-y-auto bg-white">


      {/* ── Content ── */}
      <div className="px-8 py-6 space-y-8">

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { title: "Today's reservations", value: 24, badge: 4, badgeUp: true, sub: "vs yesterday" },
            { title: "Total guests today",   value: 47, badge: 12, badgeUp: true, sub: "vs yesterday" },
            { title: "Pending approval",     value: 24, badge: 1, badgeUp: false, sub: "1 new pending" },
            { title: "This week revenue",    value: 24, badge: 4, badgeUp: true,  sub: "vs yesterday" },
          ].map((s) => (
            <div key={s.title} className="stat-card">
              <StatCard {...s} />
            </div>
          ))}
        </div>

        {/* Productive Overview + Calendar */}
        <div className="grid grid-cols-[1fr_300px] gap-6 ">
          {/* Overview */}
          <div className="fade-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">Productive Overview</h2>
              <button className="text-sm font-medium text-[#e8336d] hover:underline">Full Calendar</button>
            </div>
            <div className="space-y-3">
              {overviewItems.map((item) => (
                <div key={item.label} className="overview-row">
                  <OverviewRow item={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Mini Calendar */}
          <div className="fade-up mt-9">
            <MiniCalendar />
          </div>
        </div>

        {/* All Reservations Table */}
        <div className="fade-up">
          <h2 className="text-base font-bold text-gray-900 mb-4">All reservations — today</h2>

          {/* Filter tabs */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors
                    ${filter === f
                      ? "bg-gray-900 text-white"
                      : "bg-transparent text-gray-600 border border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Download
            </button>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Guest", "Booking for", "Date", "Time", "Guests", "Status", ""].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap"
                    >
                      {h && (
                        <span className="flex items-center gap-1">
                          {h}
                          {h !== "" && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-40">
                              <path d="M5 2v6M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    {/* Guest */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#e8336d] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                          {r.avatar}
                        </div>
                        <span className="font-medium text-gray-800">{r.guest}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">{r.bookingFor}</td>
                    <td className="px-5 py-3.5 text-gray-600">{r.date}</td>
                    <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">{r.time}</td>
                    <td className="px-5 py-3.5 text-gray-600">{r.guests} Guests</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${STATUS_STYLES[r.status]}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[r.status]}`} />
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">···</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
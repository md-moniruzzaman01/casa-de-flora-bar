"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { RefreshCw } from "lucide-react";
import { ReservationFilter, OverviewItem } from "../config/types";
import { STATUS_DOT, STATUS_STYLES } from "../config/constant";
import OverviewRow from "./OverviewRow";
import MiniCalendar from "./MiniCalendar";
import StatCard from "./StatCard";
import { api } from "@/lib/api";
import {
  type BackendTableBooking,
  type BackendEventBooking,
  type ReservationRow,
  tableBookingToRow,
  eventBookingToRow,
  initials,
} from "@/lib/admin-mappers";

interface PaginatedBookings<T> {
  bookings: T[];
  total: number;
}

const isToday = (iso: string) => {
  const today = new Date();
  const d = new Date(iso);
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth()    === today.getMonth() &&
    d.getDate()     === today.getDate()
  );
};

const isThisWeek = (iso: string) => {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - start.getDay()); // Sunday
  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  const d = new Date(iso);
  return d >= start && d < end;
};

// ── Main Page ──────────────────────────────────────────────────────────────
export default function DashboardContent() {
  const [filter, setFilter] = useState<ReservationFilter>("All");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const pageRef = useRef<HTMLDivElement>(null);

  const [tables, setTables] = useState<BackendTableBooking[]>([]);
  const [events, setEvents] = useState<BackendEventBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      api.get<PaginatedBookings<BackendTableBooking>>('/api/table-bookings?limit=200'),
      api.get<PaginatedBookings<BackendEventBooking>>('/api/event-bookings?limit=200'),
    ])
      .then(([t, e]) => {
        if (cancelled) return;
        setTables(t.bookings ?? []);
        setEvents(e.bookings ?? []);
      })
      .catch((e: { message?: string }) => {
        if (!cancelled) setError(e.message ?? 'Failed to load dashboard');
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".stat-card",     { opacity: 0, y: 24 },  { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" });
      gsap.fromTo(".overview-row", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.08, delay: 0.3, ease: "power2.out" });
      gsap.fromTo(".fade-up",      { opacity: 0, y: 20 },  { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.2, ease: "power2.out" });
    }, pageRef);
    return () => ctx.revert();
  }, [loading]);

  // ── Derived rows / counts ────────────────────────────────────────────────
  const rows = useMemo<ReservationRow[]>(() => {
    const tableRows  = tables.map((t) => tableBookingToRow(t, 'Table'));
    const bouquetRows = tables
      .filter((t) => t.bouquetBookings.length > 0)
      .map((t) => ({ ...tableBookingToRow(t, 'Bouquet'), bookingFor: 'Bouquet' as const }));
    const eventRows  = events.map(eventBookingToRow);
    const groupRows  = tableRows
      .filter((r) => r.guests >= 8)
      .map((r) => ({ ...r, bookingFor: 'Large Group' }));
    return [...tableRows, ...bouquetRows, ...eventRows, ...groupRows];
  }, [tables, events]);

  const counts = useMemo(() => {
    const stat = (pred: (b: { date: string }) => boolean) => ({
      tableToday:    tables.filter((b) => isToday(b.date) && pred(b)).length,
      tableWeek:     tables.filter((b) => isThisWeek(b.date) && pred(b)).length,
    });
    void stat;

    const tableToday   = tables.filter((b) => isToday(b.date)).length;
    const tableWeek    = tables.filter((b) => isThisWeek(b.date)).length;
    const bouquetToday = tables.filter((b) => isToday(b.date) && b.bouquetBookings.length > 0).length;
    const bouquetWeek  = tables.filter((b) => isThisWeek(b.date) && b.bouquetBookings.length > 0).length;
    const groupToday   = tables.filter((b) => isToday(b.date) && b.guests >= 8).length;
    const groupWeek    = tables.filter((b) => isThisWeek(b.date) && b.guests >= 8).length;
    const eventToday   = events.filter((b) => isToday(b.date)).length;
    const eventWeek    = events.filter((b) => isThisWeek(b.date)).length;

    return {
      reservationsToday: tableToday + eventToday,
      guestsToday:
        tables.filter((b) => isToday(b.date)).reduce((s, b) => s + b.guests, 0) +
        events.filter((b) => isToday(b.date)).reduce((s, b) => s + b.guests, 0),
      pendingApproval:
        tables.filter((b) => b.status === 'PENDING').length +
        events.filter((b) => b.status === 'PENDING').length,
      bouquetWeek,
      tableToday,    tableWeek,
      bouquetToday,
      groupToday,    groupWeek,
      eventToday,    eventWeek,
    };
  }, [tables, events]);

  const overviewItems: OverviewItem[] = [
    { label: 'Table Reservations',       today: counts.tableToday,   week: counts.tableWeek   },
    { label: 'Bouquet Reservations',     today: counts.bouquetToday, week: counts.bouquetWeek },
    { label: 'Large Group Reservations', today: counts.groupToday,   week: counts.groupWeek   },
    { label: 'Event Reservations',       today: counts.eventToday,   week: counts.eventWeek   },
  ];

  const filters: ReservationFilter[] = ["All", "Table", "Bouquet", "Large Group", "Event"];
  const selectedDateRows = rows.filter((r) => {
    const d = new Date(r.dateValue);
    // Adjust for timezone differences so we compare the right local date
    // r.dateValue is YYYY-MM-DD
    const localD = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
    return (
      localD.getFullYear() === selectedDate.getFullYear() &&
      localD.getMonth() === selectedDate.getMonth() &&
      localD.getDate() === selectedDate.getDate()
    );
  });
  const filtered = filter === "All"
    ? selectedDateRows
    : selectedDateRows.filter((r) => r.bookingFor.startsWith(filter));

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white min-h-screen">
        <RefreshCw className="w-5 h-5 text-gray-300 animate-spin" />
      </div>
    );
  }

  return (
    <div ref={pageRef} className="flex-1 overflow-y-auto bg-white">
      <div className="px-8 py-6 space-y-8">

        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { title: "Today's reservations", value: counts.reservationsToday, badge: counts.tableWeek,    badgeUp: true,  sub: "this week" },
            { title: "Total guests today",   value: counts.guestsToday,       badge: counts.eventWeek,    badgeUp: true,  sub: "events this week" },
            { title: "Pending approval",     value: counts.pendingApproval,   badge: counts.pendingApproval, badgeUp: false, sub: "needs review" },
            { title: "This week reservations", value: counts.tableWeek + counts.eventWeek, badge: counts.bouquetWeek, badgeUp: true,  sub: "bouquets this week" },
          ].map((s) => (
            <div key={s.title} className="stat-card">
              <StatCard {...s} />
            </div>
          ))}
        </div>

        {/* Productive Overview + Calendar */}
        <div className="grid grid-cols-[1fr_300px] gap-6 ">
          <div className="fade-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">Productive Overview</h2>
              <button className="text-sm font-medium text-[#e8336d] hover:underline">Full Calendar</button>
            </div>
            <div className="space-y-3">
              {overviewItems.map((item) => {
                const filterMap: Record<string, ReservationFilter> = {
                  'Table Reservations': 'Table',
                  'Bouquet Reservations': 'Bouquet',
                  'Large Group Reservations': 'Large Group',
                  'Event Reservations': 'Event',
                };
                const mappedFilter = filterMap[item.label] || 'All';

                return (
                  <div 
                    key={item.label} 
                    className="overview-row cursor-pointer"
                    onClick={() => setFilter(mappedFilter)}
                  >
                    <OverviewRow item={item} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="fade-up mt-9">
            <MiniCalendar 
              selectedDate={selectedDate} 
              onSelectDate={setSelectedDate} 
              bookingDates={rows.map(r => r.dateValue)} 
            />
          </div>
        </div>

        {/* All Reservations Table */}
        <div className="fade-up">
          <h2 className="text-base font-bold text-gray-900 mb-4">
            All reservations — {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </h2>

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
          </div>

          <div className="rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Guest", "Booking for", "Date", "Time", "Guests", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((r) => {
                  const statusLabel =
                    r.status === 'Confirmed' ? 'Confirm'
                    : r.status === 'Pending'   ? 'Pending'
                    : 'In review';
                  const styleKey: keyof typeof STATUS_STYLES = statusLabel as keyof typeof STATUS_STYLES;
                  return (
                    <tr key={`${r.source}-${r.id}`} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#e8336d] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                            {initials(r.guest)}
                          </div>
                          <span className="font-medium text-gray-800">{r.guest}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">{r.bookingFor}</td>
                      <td className="px-5 py-3.5 text-gray-600">{r.date}</td>
                      <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">{r.time}</td>
                      <td className="px-5 py-3.5 text-gray-600">{r.guests} Guests</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${STATUS_STYLES[styleKey]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[styleKey]}`} />
                          {statusLabel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-sm text-gray-400">
                      No reservations for this date.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

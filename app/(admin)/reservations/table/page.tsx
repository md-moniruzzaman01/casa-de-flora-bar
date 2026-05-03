"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Plus, ArrowUpRight, MoreHorizontal,
  ChevronUp, ChevronDown, Search, SlidersHorizontal,
  ChevronLeft, ChevronRight, X, Check,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type Status = "Pending" | "Confirmed" | "In review" | "Cancelled";
type SortKey = "guest" | "bookingFor" | "date" | "time" | "guests" | "status";
type SortDir = "asc" | "desc";
type FilterTab = "All" | "Confirmed" | "Pending" | "Cancelled";

interface Reservation {
  id: number;
  guest: string;
  bookingFor: string;
  date: string;
  dateTs: number;
  time: string;
  guests: number;
  status: Status;
}

interface FilterState {
  bookingFor: string[];
  guestCount: string;
  dateRange: string;
}

// ── Mock data (30 rows) ───────────────────────────────────────────────────────

const BOOKING_TYPES = [
  "Make your Bouquet", "Large Group Dinner",
  "Events Hall", "Private Suite", "Garden Terrace",
];
const STATUSES: Status[] = ["Pending", "Confirmed", "In review", "Cancelled"];
const GUEST_NAMES = [
  "Russel Petter", "Maria Chen", "James Okafor", "Sophie Laurent",
  "Ahmed Hassan", "Priya Nair", "Lucas Müller", "Yuki Tanaka",
  "Isabella Rossi", "Carlos Mendez",
];

const RESERVATIONS: Reservation[] = Array.from({ length: 30 }, (_, i) => {
  const guest   = GUEST_NAMES[i % GUEST_NAMES.length];
  const day     = (i % 28) + 1;
  const mo      = i < 15 ? 2 : 3;
  const moLabel = i < 15 ? "Mar" : "Apr";
  return {
    id:        i + 1,
    guest,
    bookingFor: BOOKING_TYPES[i % BOOKING_TYPES.length],
    date:      `${moLabel} ${day}, 2026`,
    dateTs:    new Date(2026, mo, day).getTime(),
    time:      i % 3 === 0 ? "10:00 AM - 11:30 AM" : i % 3 === 1 ? "1:00 PM - 2:30 PM" : "6:00 PM - 7:30 PM",
    guests:    [2, 4, 6, 8, 10, 12][i % 6],
    status:    STATUSES[i % STATUSES.length],
  };
});

// ── Constants ─────────────────────────────────────────────────────────────────

const PAGE_SIZE_OPTIONS = [5, 10, 20];
const FILTER_TABS: FilterTab[] = ["All", "Confirmed", "Pending", "Cancelled"];

const STATUS_STYLES: Record<Status, { dot: string; bg: string; text: string }> = {
  Pending:     { dot: "bg-yellow-400",  bg: "bg-yellow-50",  text: "text-yellow-700"  },
  Confirmed:   { dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
  "In review": { dot: "bg-purple-500",  bg: "bg-purple-50",  text: "text-purple-700"  },
  Cancelled:   { dot: "bg-red-400",     bg: "bg-red-50",     text: "text-red-700"     },
};

const GUEST_COUNT_OPTIONS = [
  { label: "Any size",   value: "any" },
  { label: "1–4 guests", value: "1-4" },
  { label: "5–8 guests", value: "5-8" },
  { label: "9+ guests",  value: "9+"  },
];

const DATE_RANGE_OPTIONS = [
  { label: "Any date",   value: "any"        },
  { label: "Today",      value: "today"      },
  { label: "This week",  value: "this-week"  },
  { label: "This month", value: "this-month" },
];

const EMPTY_FILTERS: FilterState = { bookingFor: [], guestCount: "any", dateRange: "any" };

// ── Small helpers ─────────────────────────────────────────────────────────────

function initials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Status }) {
  const s = STATUS_STYLES[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
      {status}
    </span>
  );
}

function StatCard({ label, value, sub, badge }: {
  label: string; value: string | number; sub: string; badge?: string;
}) {
  return (
    <div className="bg-pink-50 rounded-2xl p-5 flex flex-col gap-2 min-w-0">
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <div className="flex items-end gap-2">
        <span className="text-4xl font-semibold text-gray-900 leading-none">{value}</span>
        {badge && (
          <span className="mb-0.5 inline-flex items-center gap-1 bg-white border border-gray-200 text-gray-600 text-[11px] font-medium px-2 py-0.5 rounded-md">
            <ArrowUpRight size={11} className="text-emerald-500" />
            {badge}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-400">{sub}</p>
    </div>
  );
}

function ColHeader({ label, sortKey, currentKey, dir, onSort }: {
  label: string; sortKey: SortKey; currentKey: SortKey; dir: SortDir; onSort: (k: SortKey) => void;
}) {
  const active = currentKey === sortKey;
  return (
    <th
      onClick={() => onSort(sortKey)}
      className="text-left px-5 py-3.5 font-medium text-gray-500 text-xs cursor-pointer select-none group/th whitespace-nowrap"
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <span className="inline-flex flex-col opacity-30 group-hover/th:opacity-70 transition-opacity">
          <ChevronUp   size={10} className={`-mb-0.5 ${active && dir === "asc"  ? "opacity-100 text-pink-500" : ""}`} />
          <ChevronDown size={10} className={          active && dir === "desc" ? "opacity-100 text-pink-500" : ""}    />
        </span>
      </span>
    </th>
  );
}

// ── Filter dropdown ───────────────────────────────────────────────────────────

function FilterDropdown({ onApply, onReset, activeCount }: {
  onApply: (f: FilterState) => void;
  onReset: () => void;
  activeCount: number;
}) {
  const [open, setOpen]   = useState(false);
  const [local, setLocal] = useState<FilterState>(EMPTY_FILTERS);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function toggleBooking(val: string) {
    setLocal(f => ({
      ...f,
      bookingFor: f.bookingFor.includes(val)
        ? f.bookingFor.filter(v => v !== val)
        : [...f.bookingFor, val],
    }));
  }

  function apply() { onApply(local); setOpen(false); }

  function reset() {
    setLocal(EMPTY_FILTERS);
    onReset();
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm transition-colors ${
          activeCount > 0
            ? "border-pink-300 bg-pink-50 text-pink-700"
            : "border-gray-200 text-gray-600 hover:bg-gray-50"
        }`}
      >
        <SlidersHorizontal size={14} />
        Filters
        {activeCount > 0 && (
          <span className="w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] flex items-center justify-center font-semibold">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">Filter by</span>
            <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Reset all
            </button>
          </div>

          <div className="p-4 space-y-5 max-h-80 overflow-y-auto">
            {/* Booking type */}
            <div>
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">Booking type</p>
              <div className="space-y-1.5">
                {BOOKING_TYPES.map(b => (
                  <label key={b} className="flex items-center gap-2.5 cursor-pointer group/check">
                    <div
                      onClick={() => toggleBooking(b)}
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors flex-shrink-0 ${
                        local.bookingFor.includes(b)
                          ? "bg-pink-500 border-pink-500"
                          : "border-gray-300 group-hover/check:border-pink-300"
                      }`}
                    >
                      {local.bookingFor.includes(b) && <Check size={10} className="text-white" />}
                    </div>
                    <span className="text-sm text-gray-600">{b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Group size */}
            <div>
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">Group size</p>
              <div className="flex flex-wrap gap-2">
                {GUEST_COUNT_OPTIONS.map(o => (
                  <button
                    key={o.value}
                    onClick={() => setLocal(f => ({ ...f, guestCount: o.value }))}
                    className={`px-3 py-1 rounded-lg text-xs border transition-colors ${
                      local.guestCount === o.value
                        ? "bg-pink-500 border-pink-500 text-white"
                        : "border-gray-200 text-gray-600 hover:border-pink-200"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date range */}
            <div>
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">Date range</p>
              <div className="flex flex-wrap gap-2">
                {DATE_RANGE_OPTIONS.map(o => (
                  <button
                    key={o.value}
                    onClick={() => setLocal(f => ({ ...f, dateRange: o.value }))}
                    className={`px-3 py-1 rounded-lg text-xs border transition-colors ${
                      local.dateRange === o.value
                        ? "bg-pink-500 border-pink-500 text-white"
                        : "border-gray-200 text-gray-600 hover:border-pink-200"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="px-4 py-3 border-t border-gray-100 flex gap-2">
            <button
              onClick={() => setOpen(false)}
              className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={apply}
              className="flex-1 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function TableReservations() {
  const [activeTab,   setActiveTab]   = useState<FilterTab>("All");
  const [search,      setSearch]      = useState("");
  const [sortKey,     setSortKey]     = useState<SortKey>("date");
  const [sortDir,     setSortDir]     = useState<SortDir>("asc");
  const [page,        setPage]        = useState(1);
  const [pageSize,    setPageSize]    = useState(10);
  const [filters,     setFilters]     = useState<FilterState>(EMPTY_FILTERS);
  const [filterCount, setFilterCount] = useState(0);

  function resetPage() { setPage(1); }

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    resetPage();
  }

  function handleTabChange(tab: FilterTab) { setActiveTab(tab); resetPage(); }
  function handleSearch(val: string)        { setSearch(val);   resetPage(); }

  function applyFilters(f: FilterState) {
    setFilters(f);
    let c = 0;
    if (f.bookingFor.length) c++;
    if (f.guestCount !== "any") c++;
    if (f.dateRange  !== "any") c++;
    setFilterCount(c);
    resetPage();
  }

  function resetFilters() {
    setFilters(EMPTY_FILTERS);
    setFilterCount(0);
    resetPage();
  }

  function removeBookingFilter(b: string) {
    applyFilters({ ...filters, bookingFor: filters.bookingFor.filter(v => v !== b) });
  }

  // ── Data pipeline ──────────────────────────────────────────────────────────

  const processed = useMemo(() => {
    let rows = [...RESERVATIONS];

    // Tab
    if (activeTab !== "All") {
      if (activeTab === "Confirmed") rows = rows.filter(r => r.status === "Confirmed" || r.status === "In review");
      else rows = rows.filter(r => r.status === activeTab);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(r =>
        r.guest.toLowerCase().includes(q) ||
        r.bookingFor.toLowerCase().includes(q) ||
        r.date.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
      );
    }

    // Booking type filter
    if (filters.bookingFor.length) {
      rows = rows.filter(r => filters.bookingFor.includes(r.bookingFor));
    }

    // Guest count filter
    if (filters.guestCount !== "any") {
      rows = rows.filter(r => {
        if (filters.guestCount === "1-4") return r.guests <= 4;
        if (filters.guestCount === "5-8") return r.guests >= 5 && r.guests <= 8;
        if (filters.guestCount === "9+")  return r.guests >= 9;
        return true;
      });
    }

    // Sort
    rows.sort((a, b) => {
      const av = sortKey === "date" ? a.dateTs : (a[sortKey as keyof Reservation] as string | number);
      const bv = sortKey === "date" ? b.dateTs : (b[sortKey as keyof Reservation] as string | number);
      if (av < bv) return sortDir === "asc" ? -1 :  1;
      if (av > bv) return sortDir === "asc" ?  1 : -1;
      return 0;
    });

    return rows;
  }, [activeTab, search, filters, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(processed.length / pageSize));
  const paginated  = processed.slice((page - 1) * pageSize, page * pageSize);

  const pageNumbers = useMemo<(number | "…")[]>(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const nums: (number | "…")[] = [1];
    if (page > 3) nums.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) nums.push(i);
    if (page < totalPages - 2) nums.push("…");
    nums.push(totalPages);
    return nums;
  }, [page, totalPages]);

  const hasActiveFilters = !!search || filterCount > 0;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white">


      {/* ── Content ── */}
      <main className="flex-1 px-8 py-7 flex flex-col gap-7">

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Today"          value={24} sub="vs yesterday"   badge="1↑" />
          <StatCard label="This Week"      value={11} sub="Seats avf 2,8"             />
          <StatCard label="Pending"        value={10} sub="needs approval"            />
          <StatCard label="Avg group size" value={24} sub="per booking"               />
        </div>

        {/* Table section */}
        <div className="flex flex-col gap-4">

          <h2 className="text-lg font-semibold text-gray-900">
            Table reservations — <span className="font-normal text-gray-500">today</span>
          </h2>

          {/* Controls */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {FILTER_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search + Filter + Add */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={e => handleSearch(e.target.value)}
                  placeholder="Search guest, booking…"
                  className="pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-pink-300 focus:border-pink-300 w-52 transition-all placeholder:text-gray-400"
                />
                {search && (
                  <button
                    onClick={() => handleSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              <FilterDropdown
                onApply={applyFilters}
                onReset={resetFilters}
                activeCount={filterCount}
              />

              <button className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 items-center">
              {search && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                  Search: &ldquo;{search}&rdquo;
                  <button onClick={() => handleSearch("")} className="text-gray-400 hover:text-gray-600">
                    <X size={11} />
                  </button>
                </span>
              )}
              {filters.bookingFor.map(b => (
                <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 border border-pink-100 rounded-full text-xs text-pink-700">
                  {b}
                  <button onClick={() => removeBookingFilter(b)} className="text-pink-400 hover:text-pink-600">
                    <X size={11} />
                  </button>
                </span>
              ))}
              {filters.guestCount !== "any" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 border border-pink-100 rounded-full text-xs text-pink-700">
                  {GUEST_COUNT_OPTIONS.find(o => o.value === filters.guestCount)?.label}
                  <button onClick={() => applyFilters({ ...filters, guestCount: "any" })} className="text-pink-400 hover:text-pink-600">
                    <X size={11} />
                  </button>
                </span>
              )}
              {filters.dateRange !== "any" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 border border-pink-100 rounded-full text-xs text-pink-700">
                  {DATE_RANGE_OPTIONS.find(o => o.value === filters.dateRange)?.label}
                  <button onClick={() => applyFilters({ ...filters, dateRange: "any" })} className="text-pink-400 hover:text-pink-600">
                    <X size={11} />
                  </button>
                </span>
              )}
              <button
                onClick={() => { resetFilters(); handleSearch(""); }}
                className="text-xs text-gray-400 hover:text-gray-600 underline ml-1 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Table */}
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-pink-50 border-b border-gray-100">
                  <ColHeader label="Guest"       sortKey="guest"      currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <ColHeader label="Booking for" sortKey="bookingFor" currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <ColHeader label="Date"        sortKey="date"       currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <ColHeader label="Time"        sortKey="time"       currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <ColHeader label="Guests"      sortKey="guests"     currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <ColHeader label="Status"      sortKey="status"     currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <th className="px-5 py-3.5 w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.map((r, idx) => (
                  <tr
                    key={r.id}
                    className={`group transition-colors hover:bg-pink-50/40 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/20"}`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center text-[11px] font-semibold text-pink-700 flex-shrink-0">
                          {initials(r.guest)}
                        </div>
                        <span className="text-gray-800 font-medium text-sm">{r.guest}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 text-sm">{r.bookingFor}</td>
                    <td className="px-5 py-3.5 text-gray-600 text-sm whitespace-nowrap">{r.date}</td>
                    <td className="px-5 py-3.5 text-gray-600 text-sm whitespace-nowrap">{r.time}</td>
                    <td className="px-5 py-3.5 text-gray-600 text-sm">{r.guests} Guests</td>
                    <td className="px-5 py-3.5"><StatusBadge status={r.status} /></td>
                    <td className="px-5 py-3.5">
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-gray-100 text-gray-400">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {paginated.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-sm text-gray-400">No reservations match your filters.</p>
                <button
                  onClick={() => { resetFilters(); handleSearch(""); setActiveTab("All"); }}
                  className="mt-2 text-xs text-pink-500 underline hover:text-pink-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* ── Pagination ── */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-1">

            {/* Result info + rows per page */}
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>
                {processed.length === 0
                  ? "No results"
                  : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, processed.length)} of ${processed.length}`}
              </span>
              <span className="text-gray-200 select-none">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs">Rows:</span>
                <select
                  value={pageSize}
                  onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1 outline-none focus:ring-1 focus:ring-pink-200 bg-white text-gray-600 cursor-pointer"
                >
                  {PAGE_SIZE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            {/* Page buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={14} />
              </button>

              {pageNumbers.map((n, i) =>
                n === "…" ? (
                  <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-gray-300 text-sm select-none">
                    …
                  </span>
                ) : (
                  <button
                    key={n}
                    onClick={() => setPage(n as number)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      page === n
                        ? "bg-gray-900 text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {n}
                  </button>
                )
              )}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
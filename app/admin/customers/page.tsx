"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Search, MoreHorizontal, ArrowUpRight,
  ChevronLeft, ChevronRight, ChevronUp, ChevronDown, X, RefreshCw,
} from "lucide-react";
import { api } from "@/lib/api";

// ── Types ─────────────────────────────────────────────────────────────────────

type CustomerTag = "VIP" | "Returning" | "New";
type FilterTab   = "All" | "VIP" | "Returning" | "New";
type SortKey     = "name" | "email" | "bookings" | "lastVisit" | "tag";
type SortDir     = "asc" | "desc";

interface Customer {
  id:          string;
  name:        string;
  email:       string;
  phone:       string;
  bookings:    number;
  lastVisit:   string;
  lastVisitTs: number;
  tag:         CustomerTag;
  isBlocked:   boolean;
}

interface BackendCustomer {
  id:        string;
  name:      string;
  email:     string;
  phone:     string;
  isBlocked: boolean;
  createdAt: string;
  _count?: {
    tableBookings: number;
    eventBookings: number;
    inquiries:     number;
  };
}

// VIP at 8+ visits, Returning at 2+, New for first-timers.
function tagFor(bookings: number): CustomerTag {
  if (bookings >= 8) return "VIP";
  if (bookings >= 2) return "Returning";
  return "New";
}

const MONTH_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatJoinedDate(iso: string): string {
  const d = new Date(iso);
  return `${MONTH_ABBR[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function backendToRow(c: BackendCustomer): Customer {
  const bookings = (c._count?.tableBookings ?? 0) + (c._count?.eventBookings ?? 0);
  return {
    id:          c.id,
    name:        c.name,
    email:       c.email,
    phone:       c.phone,
    bookings,
    lastVisit:   formatJoinedDate(c.createdAt),
    lastVisitTs: new Date(c.createdAt).getTime(),
    tag:         tagFor(bookings),
    isBlocked:   c.isBlocked,
  };
}

// ── Constants ─────────────────────────────────────────────────────────────────

const FILTER_TABS: FilterTab[] = ["All", "VIP", "Returning", "New"];
const PAGE_SIZE_OPTIONS         = [5, 10, 20];

const TAG_STYLES: Record<CustomerTag, string> = {
  VIP:       "bg-amber-50  text-amber-700  border border-amber-200",
  Returning: "bg-blue-50   text-blue-700   border border-blue-200",
  New:       "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

const AVATAR_COLORS = [
  "bg-pink-200   text-pink-800",
  "bg-purple-200 text-purple-800",
  "bg-blue-200   text-blue-800",
  "bg-amber-200  text-amber-800",
  "bg-emerald-200 text-emerald-800",
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function initials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function avatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

// ── Sub-components ────────────────────────────────────────────────────────────

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

// ... (existing imports)
import Link from "next/link";

// ... (types)

export default function CustomerList() {
  const [data,      setData]      = useState<Customer[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [search,    setSearch]    = useState("");
  const [sortKey,   setSortKey]   = useState<SortKey>("lastVisit");
  const [sortDir,   setSortDir]   = useState<SortDir>("desc");
  const [page,      setPage]      = useState(1);
  const [pageSize,  setPageSize]  = useState(10);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    api
      .get<{ customers: BackendCustomer[] }>("/api/customers?limit=500")
      .then((res) => setData((res.customers ?? []).map(backendToRow)))
      .catch((e: { message?: string }) =>
        setError(e.message ?? "Failed to load customers"),
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  }

  const processed = useMemo(() => {
    let rows = [...data];

    if (activeTab !== "All") rows = rows.filter(r => r.tag === activeTab);

    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.includes(q)
      );
    }

    rows.sort((a, b) => {
      let av: string | number;
      let bv: string | number;
      if (sortKey === "lastVisit") { av = a.lastVisitTs; bv = b.lastVisitTs; }
      else if (sortKey === "bookings") { av = a.bookings; bv = b.bookings; }
      else { av = a[sortKey] as string; bv = b[sortKey] as string; }
      if (av < bv) return sortDir === "asc" ? -1 :  1;
      if (av > bv) return sortDir === "asc" ?  1 : -1;
      return 0;
    });

    return rows;
  }, [data, activeTab, search, sortKey, sortDir]);

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

  const stats = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    const total       = data.length;
    const returning   = data.filter(r => r.tag === "Returning").length;
    const vip         = data.filter(r => r.tag === "VIP").length;
    const newThisMonth = data.filter(r => r.lastVisitTs >= monthStart).length;
    const retention   = total > 0 ? Math.round(((returning + vip) / total) * 100) : 0;

    return { total, returning, vip, newThisMonth, retention };
  }, [data]);

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen">
      <main className="flex-1 px-8 py-7 flex flex-col gap-7">
        
        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchData} className="text-red-700 underline">Retry</button>
          </div>
        )}

        {loading && data.length === 0 ? (
          <div className="py-20 flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-gray-300 animate-spin" />
          </div>
        ) : null}

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total customers"  value={stats.total}        sub="all time"                  />
          <StatCard label="Returning guests" value={stats.returning}    sub={`${stats.retention}% retention rate`} />
          <StatCard label="New this month"   value={stats.newThisMonth} sub="joined since month start"  />
          <StatCard label="VIP members"      value={stats.vip}          sub="8+ visits"                 />
        </div>

        {/* Table section */}
        <div className="flex flex-col gap-4">

          <h2 className="text-lg font-semibold text-gray-900">All Customers</h2>

          {/* Controls */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1.5 flex-wrap">
              {FILTER_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setPage(1); }}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search name, email, phone…"
                className="pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-pink-300 focus:border-pink-300 w-56 transition-all placeholder:text-gray-400"
              />
              {search && (
                <button
                  onClick={() => { setSearch(""); setPage(1); }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-pink-50 border-b border-gray-100">
                  <ColHeader label="Name"       sortKey="name"      currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <ColHeader label="Email"      sortKey="email"     currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <th className="text-left px-5 py-3.5 font-medium text-gray-500 text-xs whitespace-nowrap">Phone</th>
                  <ColHeader label="Bookings"   sortKey="bookings"  currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <ColHeader label="Joined"     sortKey="lastVisit" currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <ColHeader label="Type"       sortKey="tag"       currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <th className="px-5 py-3.5 w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.map((c, idx) => (
                  <tr
                    key={c.id}
                    onClick={() => window.location.href = `/admin/customers/${c.id}`}
                    className={`group transition-colors cursor-pointer ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/20"} ${c.isBlocked ? "opacity-70 grayscale-[0.5] hover:bg-red-50/30" : "hover:bg-pink-50/60"}`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0 ${avatarColor(c.name)}`}>
                          {initials(c.name)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-800 font-medium flex items-center gap-2">
                            {c.name}
                            {c.isBlocked && (
                              <span className="bg-red-100 text-red-600 text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">
                                Blocked
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500">{c.email}</td>
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{c.phone}</td>
                    <td className="px-5 py-3.5 text-gray-600">{c.bookings} visits</td>
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{c.lastVisit}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${TAG_STYLES[c.tag]}`}>
                        {c.tag}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-pink-600 hover:bg-pink-50 transition-all opacity-0 group-hover:opacity-100">
                        <ArrowUpRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {paginated.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-sm text-gray-400">No customers match your search.</p>
                <button
                  onClick={() => { setSearch(""); setActiveTab("All"); }}
                  className="mt-2 text-xs text-pink-500 underline hover:text-pink-700 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-1">

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
                  <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-gray-300 text-sm select-none">…</span>
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

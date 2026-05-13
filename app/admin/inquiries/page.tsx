"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Search, MoreHorizontal, Mail,
  ChevronLeft, ChevronRight, ChevronUp, ChevronDown, X, RefreshCw, Eye, Trash2
} from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

// ── Types ─────────────────────────────────────────────────────────────────────

type InquiryStatus = "NEW" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
type FilterTab = "All" | InquiryStatus;
type SortKey = "name" | "subject" | "createdAt" | "status";
type SortDir = "asc" | "desc";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  createdAtTs: number;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const FILTER_TABS: { label: string; value: FilterTab }[] = [
  { label: "All Inquiries", value: "All" },
  { label: "New", value: "NEW" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Resolved", value: "RESOLVED" },
  { label: "Closed", value: "CLOSED" },
];

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const STATUS_STYLES: Record<InquiryStatus, string> = {
  NEW: "bg-blue-50 text-blue-700 border border-blue-200",
  IN_PROGRESS: "bg-amber-50 text-amber-700 border border-amber-200",
  RESOLVED: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  CLOSED: "bg-gray-50 text-gray-700 border border-gray-200",
};

const AVATAR_COLORS = [
  "bg-pink-200 text-pink-800",
  "bg-purple-200 text-purple-800",
  "bg-blue-200 text-blue-800",
  "bg-amber-200 text-amber-800",
  "bg-emerald-200 text-emerald-800",
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function initials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function avatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${MONTH_ABBR[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

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
          <ChevronUp size={10} className={`-mb-0.5 ${active && dir === "asc" ? "opacity-100 text-pink-500" : ""}`} />
          <ChevronDown size={10} className={active && dir === "desc" ? "opacity-100 text-pink-500" : ""} />
        </span>
      </span>
    </th>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function InquiryList() {
  const [data, setData] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // Construct query params
    const params = new URLSearchParams({
      page: page.toString(),
      limit: pageSize.toString(),
    });
    if (activeTab !== "All") params.append("status", activeTab);

    api
      .get<{ inquiries: Inquiry[], total: number }>(`/api/inquiries?${params.toString()}`)
      .then((res) => {
        setData((res.inquiries ?? []).map(i => ({
          ...i,
          createdAtTs: new Date(i.createdAt).getTime()
        })));
        setTotal(res.total || 0);
      })
      .catch((e: { message?: string }) =>
        setError(e.message ?? "Failed to load inquiries"),
      )
      .finally(() => setLoading(false));
  }, [page, pageSize, activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  }

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Are you sure you want to delete inquiry from "${name}"?`)) return;

    try {
      await api.delete(`/api/inquiries/${id}`);
      fetchData(); // Reload
    } catch (e: any) {
      alert(e.message || "Failed to delete inquiry");
    }
  };

  const processed = useMemo(() => {
    // Note: Backend handles status and pagination, but search is done here for simplicity
    // in this specific view, though we could add search to backend too.
    let rows = [...data];

    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.subject.toLowerCase().includes(q)
      );
    }

    rows.sort((a, b) => {
      let av: string | number;
      let bv: string | number;
      if (sortKey === "createdAt") { av = a.createdAtTs; bv = b.createdAtTs; }
      else { av = a[sortKey] as any; bv = b[sortKey] as any; }

      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return rows;
  }, [data, search, sortKey, sortDir]);

  const totalPages = Math.ceil(total / pageSize) || 1;

  const pageNumbers = useMemo<(number | "…")[]>(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const nums: (number | "…")[] = [1];
    if (page > 3) nums.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) nums.push(i);
    if (page < totalPages - 2) nums.push("…");
    nums.push(totalPages);
    return nums;
  }, [page, totalPages]);

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen">
      <main className="flex-1 px-8 py-7 flex flex-col gap-7">

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Customer Inquiries</h1>
          <p className="text-sm text-gray-500 mt-1">Review and manage general contact form submissions</p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchData} className="text-red-700 underline">Retry</button>
          </div>
        )}

        {/* Table section */}
        <div className="flex flex-col gap-4">

          {/* Controls */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1.5 flex-wrap">
              {FILTER_TABS.map(tab => (
                <button
                  key={tab.value}
                  onClick={() => { setActiveTab(tab.value); setPage(1); }}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.value ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search name, email, subject…"
                className="pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-pink-300 focus:border-pink-300 w-64 transition-all placeholder:text-gray-400"
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
                  <ColHeader label="Customer" sortKey="name" currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <ColHeader label="Subject" sortKey="subject" currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <ColHeader label="Status" sortKey="status" currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <ColHeader label="Date" sortKey="createdAt" currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <th className="px-5 py-3.5 w-24" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading && data.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center">
                      <RefreshCw className="w-5 h-5 text-gray-300 animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : processed.map((i, idx) => (
                  <tr
                    key={i.id}
                    className={`group transition-colors hover:bg-pink-50/40 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/20"}`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0 ${avatarColor(i.name)}`}>
                          {initials(i.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-gray-800 font-medium truncate">{i.name}</p>
                          <p className="text-[11px] text-gray-400 truncate">{i.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">
                      <p className="font-medium truncate max-w-[200px]">{i.subject}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[200px]">{i.message}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLES[i.status]}`}>
                        {i.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{formatDate(i.createdAt)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/inquiries/${i.id}`}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(i.id, i.name)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete Inquiry"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {processed.length === 0 && !loading && (
              <div className="py-16 text-center">
                <p className="text-sm text-gray-400">No inquiries found.</p>
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
                {total === 0
                  ? "No results"
                  : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)} of ${total}`}
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
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${page === n
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

"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Search, MoreHorizontal, UserPlus,
  ChevronLeft, ChevronRight, ChevronUp, ChevronDown, X, RefreshCw, Trash2, Edit2
} from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";

// ── Types ─────────────────────────────────────────────────────────────────────

type UserRole = "SUPER_ADMIN" | "ADMIN";
type UserStatus = "Active" | "Disabled";
type FilterTab = "All" | "SUPER_ADMIN" | "ADMIN";
type SortKey = "name" | "email" | "role" | "createdAt" | "isActive";
type SortDir = "asc" | "desc";

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  createdAtTs: number;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const FILTER_TABS: { label: string; value: FilterTab }[] = [
  { label: "All Users", value: "All" },
  { label: "Super Admins", value: "SUPER_ADMIN" },
  { label: "Admins", value: "ADMIN" },
];

const PAGE_SIZE_OPTIONS = [5, 10, 20];

const ROLE_STYLES: Record<UserRole, string> = {
  SUPER_ADMIN: "bg-purple-50 text-purple-700 border border-purple-200",
  ADMIN: "bg-blue-50 text-blue-700 border border-blue-200",
};

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Disabled: "bg-gray-50 text-gray-700 border border-gray-200",
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

export default function UserList() {
  const { user: currentUser } = useAuth();
  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";

  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    api
      .get<{ data: User[] }>("/api/users")
      .then((res) => {
        setData((res.data ?? []).map(u => ({
          ...u,
          createdAtTs: new Date(u.createdAt).getTime()
        })));
      })
      .catch((e: { message?: string }) =>
        setError(e.message ?? "Failed to load users"),
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

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Are you sure you want to delete user "${name}"?`)) return;

    try {
      await api.delete(`/api/users/${id}`);
      setData(prev => prev.filter(u => u.id !== id));
    } catch (e: any) {
      alert(e.message || "Failed to delete user");
    }
  };

  const processed = useMemo(() => {
    let rows = [...data];

    if (activeTab !== "All") rows = rows.filter(r => r.role === activeTab);

    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q)
      );
    }

    rows.sort((a, b) => {
      let av: string | number | boolean;
      let bv: string | number | boolean;
      if (sortKey === "createdAt") { av = a.createdAtTs; bv = b.createdAtTs; }
      else { av = a[sortKey] as any; bv = b[sortKey] as any; }

      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return rows;
  }, [data, activeTab, search, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(processed.length / pageSize));
  const paginated = processed.slice((page - 1) * pageSize, page * pageSize);

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

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage admin and staff accounts</p>
          </div>
          <Link
            href="/admin/users/create"
            className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all shadow-sm"
          >
            <UserPlus size={16} />
            Create User
          </Link>
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
                placeholder="Search name, email…"
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
                  <ColHeader label="User" sortKey="name" currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <ColHeader label="Email" sortKey="email" currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <ColHeader label="Role" sortKey="role" currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <ColHeader label="Status" sortKey="isActive" currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <ColHeader label="Joined" sortKey="createdAt" currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                  <th className="px-5 py-3.5 w-24" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading && data.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <RefreshCw className="w-5 h-5 text-gray-300 animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : paginated.map((u, idx) => (
                  <tr
                    key={u.id}
                    className={`group transition-colors hover:bg-pink-50/40 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/20"}`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0 ${avatarColor(u.name)}`}>
                          {initials(u.name)}
                        </div>
                        <span className="text-gray-800 font-medium">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500">{u.email}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${ROLE_STYLES[u.role]}`}>
                        {u.role.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${u.isActive ? STATUS_STYLES.Active : STATUS_STYLES.Disabled}`}>
                        {u.isActive ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{formatDate(u.createdAt)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/users/${u.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Edit User"
                        >
                          <Edit2 size={14} />
                        </Link>
                        {isSuperAdmin && currentUser?.id !== u.id && (
                          <button
                            onClick={() => handleDelete(u.id, u.name)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete User"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {paginated.length === 0 && !loading && (
              <div className="py-16 text-center">
                <p className="text-sm text-gray-400">No users match your criteria.</p>
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

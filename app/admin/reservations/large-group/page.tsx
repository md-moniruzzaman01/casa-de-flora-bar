"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  ArrowUpRight, MoreHorizontal, Save,
  ChevronUp, ChevronDown, Search,
  ChevronLeft, ChevronRight, X, RefreshCw,
} from "lucide-react";
import { api } from "@/lib/api";
import {
  isoDateOnly,
  formatTimeRangeBetween,
  type BackendEventBooking,
} from "@/lib/admin-mappers";

// ── Types ─────────────────────────────────────────────────────────────────────

type Status    = "Pending" | "Confirm";
type Package   = "All Inclusive" | "Brunch Sip & Clip";
type FilterTab = "All" | "Pending" | "Confirm";
type SortKey   = "host" | "date" | "guests" | "package" | "status";
type SortDir   = "asc" | "desc";

interface GroupEvent {
  id:            string;
  host:          string;
  email:         string;
  phone:         string;
  date:          string;
  dateValue:     string;
  dateTs:        number;
  time:          string;
  guests:        number;
  package:       Package;
  occasion:      string;
  internalNotes: string;
  status:        Status;
}

// ── Static data ───────────────────────────────────────────────────────────────

const GROUP_TIMES = [
  "10:00 AM – 12:00 PM",
  "12:00 PM – 2:00 PM",
  "1:00 PM – 3:00 PM",
  "3:00 PM – 5:00 PM",
  "6:00 PM – 8:00 PM",
  "7:00 PM – 9:00 PM",
];

const PACKAGES: Package[] = ["All Inclusive", "Brunch Sip & Clip"];
const STATUSES: Status[]  = ["Pending", "Confirm"];

const OCCASIONS = [
  "Birthday Dinner",
  "Bridal Shower",
  "Anniversary Dinner",
  "Corporate Event",
  "Baby Shower",
  "Graduation Party",
  "Bachelorette Party",
  "Engagement Celebration",
];

// Static seed data has been replaced by a live fetch from /api/event-bookings.
// (See useEffect inside LargeGroupReservations below.)

const STATUS_FROM_BACKEND_LG = (s: BackendEventBooking['status']): Status =>
  s === 'CONFIRMED' || s === 'COMPLETED' ? 'Confirm' : 'Pending';

const STATUS_TO_BACKEND_LG: Record<Status, BackendEventBooking['status']> = {
  Pending: 'PENDING',
  Confirm: 'CONFIRMED',
};

const eventBookingToGroupEvent = (b: BackendEventBooking): GroupEvent => {
  const dv = isoDateOnly(b.date);
  return {
    id:            b.id,
    host:          b.name,
    email:         b.email,
    phone:         b.phone,
    date:          formatDisplayDate(dv),
    dateValue:     dv,
    dateTs:        new Date(dv).getTime(),
    time:          formatTimeRangeBetween(b.startTime, b.endTime),
    guests:        b.guests,
    package:       b.cateringRequired ? 'All Inclusive' : 'Brunch Sip & Clip',
    occasion:      b.eventType.charAt(0) + b.eventType.slice(1).toLowerCase(),
    internalNotes: b.specialRequests ?? '',
    status:        STATUS_FROM_BACKEND_LG(b.status),
  };
};

// ── Constants ─────────────────────────────────────────────────────────────────

const PAGE_SIZE_OPTIONS = [5, 10, 20];
const FILTER_TABS: FilterTab[] = ["All", "Pending", "Confirm"];

const STATUS_STYLES: Record<Status, { dot: string; bg: string; text: string }> = {
  Pending: { dot: "bg-yellow-400",  bg: "bg-yellow-50",  text: "text-yellow-700"  },
  Confirm: { dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
};

const STATUS_BTN: Record<Status, { active: string; inactive: string }> = {
  Pending: { active: "bg-yellow-400  text-white border-yellow-400",  inactive: "text-yellow-700  border-yellow-200  hover:bg-yellow-50"  },
  Confirm: { active: "bg-emerald-500 text-white border-emerald-500", inactive: "text-emerald-700 border-emerald-200 hover:bg-emerald-50" },
};

const PKG_STYLES: Record<Package, string> = {
  "All Inclusive":     "bg-purple-50 text-purple-700 border border-purple-200",
  "Brunch Sip & Clip": "bg-blue-50   text-blue-700   border border-blue-200",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function initials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function formatDisplayDate(dv: string): string {
  if (!dv) return "";
  const [y, m, d] = dv.split("-").map(Number);
  const mo = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${mo[m - 1]} ${d}, ${y}`;
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

// ── ActionMenu ────────────────────────────────────────────────────────────────

function ActionMenu({ onEdit, onDelete, onStatusChange }: {
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (s: Status) => void;
}) {
  const [open,       setOpen]       = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function h(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false); setStatusOpen(false);
      }
    }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 transition-colors"
      >
        <MoreHorizontal size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-lg z-40 py-1 overflow-hidden">
          <button
            onClick={() => { onEdit(); setOpen(false); }}
            className="w-full px-3.5 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Edit event
          </button>

          <div
            className="relative"
            onMouseEnter={() => setStatusOpen(true)}
            onMouseLeave={() => setStatusOpen(false)}
          >
            <button className="w-full px-3.5 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between">
              Change status
              <ChevronRight size={12} className="text-gray-400" />
            </button>
            {statusOpen && (
              <div className="absolute right-full top-0 mr-1 w-32 bg-white border border-gray-100 rounded-xl shadow-lg z-50 py-1 overflow-hidden">
                {STATUSES.map(s => (
                  <button
                    key={s}
                    onClick={() => { onStatusChange(s); setOpen(false); setStatusOpen(false); }}
                    className="w-full px-3.5 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATUS_STYLES[s].dot}`} />
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 my-1" />
          <button
            onClick={() => { onDelete(); setOpen(false); }}
            className="w-full px-3.5 py-2 text-left text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ── EditDrawer ────────────────────────────────────────────────────────────────

function EditDrawer({ event, onClose, onSave }: {
  event:   GroupEvent;
  onClose: () => void;
  onSave:  (e: GroupEvent) => void;
}) {
  const [form,  setForm]  = useState<GroupEvent>({ ...event });
  const [saved, setSaved] = useState(false);

  function set<K extends keyof GroupEvent>(key: K, value: GroupEvent[K]) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function handleDateChange(dv: string) {
    const [y, m, d] = dv.split("-").map(Number);
    setForm(f => ({
      ...f,
      dateValue: dv,
      date:      formatDisplayDate(dv),
      dateTs:    new Date(y, m - 1, d).getTime(),
    }));
  }

  function handleSave() {
    onSave(form);
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 800);
  }

  const inp = "w-full border border-gray-200 px-3.5 py-2.5 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-pink-300 focus:border-pink-300 transition-all";

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/25 backdrop-blur-[2px]" onClick={onClose} />

      <aside
        className="w-[440px] bg-white h-full shadow-2xl flex flex-col overflow-hidden"
        style={{ animation: "drawerIn 0.22s ease-out" }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Edit Large Group Event</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">#{event.id} · {event.host}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          <section>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Host Information</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Full Name</label>
                <input value={form.host} onChange={e => set("host", e.target.value)} className={inp} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={e => set("email", e.target.value)} className={inp} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">Phone</label>
                  <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} className={inp} />
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-100" />

          <section>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Event Details</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">Date</label>
                  <input type="date" value={form.dateValue} onChange={e => handleDateChange(e.target.value)} className={inp} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">No. of Guests</label>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={form.guests}
                    onChange={e => set("guests", Number(e.target.value))}
                    className={inp}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Time Slot</label>
                <select value={form.time} onChange={e => set("time", e.target.value)} className={`${inp} cursor-pointer`}>
                  {GROUP_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Package</label>
                <select value={form.package} onChange={e => set("package", e.target.value as Package)} className={`${inp} cursor-pointer`}>
                  {PACKAGES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Occasion / Event Type</label>
                <select value={form.occasion} onChange={e => set("occasion", e.target.value)} className={`${inp} cursor-pointer`}>
                  {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-100" />

          <section>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Reservation Status</p>
            <div className="grid grid-cols-2 gap-2">
              {STATUSES.map(s => (
                <button
                  key={s}
                  onClick={() => set("status", s)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    form.status === s ? STATUS_BTN[s].active : STATUS_BTN[s].inactive
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_STYLES[s].dot}`} />
                  {s}
                </button>
              ))}
            </div>
          </section>

          <div className="border-t border-gray-100" />

          <section>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Internal Notes</p>
            <textarea
              value={form.internalNotes}
              onChange={e => set("internalNotes", e.target.value)}
              rows={3}
              placeholder="Setup requirements, special arrangements, staff reminders…"
              className={`${inp} resize-none`}
            />
          </section>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all ${
              saved ? "bg-emerald-500 text-white" : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            <Save size={14} />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </aside>

      <style jsx global>{`
        @keyframes drawerIn {
          from { transform: translateX(100%); opacity: 0.4; }
          to   { transform: translateX(0);    opacity: 1;   }
        }
      `}</style>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function LargeGroupPage() {
  const [data,      setData]      = useState<GroupEvent[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [search,    setSearch]    = useState("");
  const [sortKey,   setSortKey]   = useState<SortKey>("date");
  const [sortDir,   setSortDir]   = useState<SortDir>("asc");
  const [page,      setPage]      = useState(1);
  const [pageSize,  setPageSize]  = useState(10);
  const [editing,   setEditing]   = useState<GroupEvent | null>(null);

  function resetPage() { setPage(1); }

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    resetPage();
  }

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    api
      .get<{ bookings: BackendEventBooking[] }>('/api/event-bookings?limit=200')
      .then((res) =>
        setData((res.bookings ?? []).map(eventBookingToGroupEvent)),
      )
      .catch((e: { message?: string }) =>
        setError(e.message ?? 'Failed to load events'),
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let cancelled = false;
    api
      .get<{ bookings: BackendEventBooking[] }>('/api/event-bookings?limit=200')
      .then((res) => {
        if (!cancelled) setData((res.bookings ?? []).map(eventBookingToGroupEvent));
      })
      .catch((e: { message?: string }) => {
        if (!cancelled) setError(e.message ?? 'Failed to load events');
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  async function handleSave(updated: GroupEvent) {
    const previous = data.find((e) => e.id === updated.id);
    setData(d => d.map(e => e.id === updated.id ? updated : e));
    setEditing(null);
    if (previous && previous.status !== updated.status) {
      try {
        await api.patch(`/api/event-bookings/${updated.id}/status`, {
          status: STATUS_TO_BACKEND_LG[updated.status],
        });
      } catch (e) {
        const err = e as { message?: string };
        setError(err.message ?? 'Failed to update status');
        if (previous) setData(d => d.map(e => e.id === updated.id ? previous : e));
      }
    }
  }

  async function handleStatusChange(id: string, status: Status) {
    const previous = data.find((e) => e.id === id);
    setData(d => d.map(e => e.id === id ? { ...e, status } : e));
    try {
      await api.patch(`/api/event-bookings/${id}/status`, {
        status: STATUS_TO_BACKEND_LG[status],
      });
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ?? 'Failed to update status');
      if (previous) setData(d => d.map(e => e.id === id ? previous : e));
    }
  }

  async function handleDelete(id: string) {
    const previous = data;
    setData(d => d.filter(e => e.id !== id));
    resetPage();
    try {
      await api.delete(`/api/event-bookings/${id}`);
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ?? 'Failed to delete event');
      setData(previous);
    }
  }

  const processed = useMemo(() => {
    let rows = [...data];

    if (activeTab !== "All") rows = rows.filter(r => r.status === activeTab);

    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(r =>
        r.host.toLowerCase().includes(q)     ||
        r.email.toLowerCase().includes(q)    ||
        r.occasion.toLowerCase().includes(q) ||
        r.package.toLowerCase().includes(q)  ||
        r.date.toLowerCase().includes(q)
      );
    }

    rows.sort((a, b) => {
      const av = sortKey === "date" ? a.dateTs : (a[sortKey as keyof GroupEvent] as string | number);
      const bv = sortKey === "date" ? b.dateTs : (b[sortKey as keyof GroupEvent] as string | number);
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

  return (
    <>
      {editing && (
        <EditDrawer
          event={editing}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}

      <div className="flex-1 flex flex-col min-h-screen bg-white">
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
            <StatCard label="Total events"  value={data.length}                                     sub="all bookings"                 />
            <StatCard label="Total guests"  value={data.reduce((s, e) => s + e.guests, 0)}          sub="across all events"            />
            <StatCard label="Pending"       value={data.filter(e => e.status === "Pending").length} sub="awaiting confirm"             />
            <StatCard label="Confirmed"     value={data.filter(e => e.status === "Confirm").length} sub="ready to host"                />
          </div>

          {/* Table section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-gray-900">All Large Group Events</h2>

            {/* Controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                {FILTER_TABS.map(tab => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); resetPage(); }}
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
                  onChange={e => { setSearch(e.target.value); resetPage(); }}
                  placeholder="Search host, occasion, package…"
                  className="pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-pink-300 focus:border-pink-300 w-64 transition-all placeholder:text-gray-400"
                />
                {search && (
                  <button
                    onClick={() => { setSearch(""); resetPage(); }}
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
                    <ColHeader label="Host"    sortKey="host"    currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                    <ColHeader label="Date"    sortKey="date"    currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                    <th className="text-left px-5 py-3.5 font-medium text-gray-500 text-xs whitespace-nowrap">Time</th>
                    <ColHeader label="Guests"  sortKey="guests"  currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                    <ColHeader label="Package" sortKey="package" currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                    <th className="text-left px-5 py-3.5 font-medium text-gray-500 text-xs whitespace-nowrap">Occasion</th>
                    <ColHeader label="Status"  sortKey="status"  currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                    <th className="px-4 py-3.5 w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginated.map((r, idx) => (
                    <tr
                      key={r.id}
                      onClick={() => setEditing(r)}
                      className={`group transition-colors hover:bg-pink-50/40 cursor-pointer ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/20"}`}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-[11px] font-semibold text-pink-700 flex-shrink-0">
                            {initials(r.host)}
                          </div>
                          <div className="min-w-0">
                            <span className="text-gray-800 font-medium text-sm block truncate">{r.host}</span>
                            <span className="text-gray-400 text-[11px] block truncate">{r.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600 text-sm whitespace-nowrap">{r.date}</td>
                      <td className="px-5 py-3.5 text-gray-600 text-sm whitespace-nowrap">{r.time}</td>
                      <td className="px-5 py-3.5 text-gray-600 text-sm">{r.guests} guests</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${PKG_STYLES[r.package]}`}>
                          {r.package}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 text-sm">{r.occasion}</td>
                      <td className="px-5 py-3.5"><StatusBadge status={r.status} /></td>
                      <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ActionMenu
                            onEdit={() => setEditing(r)}
                            onDelete={() => handleDelete(r.id)}
                            onStatusChange={s => handleStatusChange(r.id, s)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {paginated.length === 0 && (
                <div className="py-14 text-center">
                  <p className="text-sm text-gray-400">No events match your search.</p>
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
                        page === n ? "bg-gray-900 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
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
    </>
  );
}

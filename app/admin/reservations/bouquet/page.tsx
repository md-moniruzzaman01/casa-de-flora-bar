"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  Plus, ArrowUpRight, MoreHorizontal, Save,
  ChevronUp, ChevronDown, Search, SlidersHorizontal,
  ChevronLeft, ChevronRight, X, Check, RefreshCw,
} from "lucide-react";
import { api } from "@/lib/api";
import {
  STATUS_TO_BACKEND,
  tableBookingToRow,
  type AdminStatus,
  type BackendTableBooking,
} from "@/lib/admin-mappers";

// ── Types ─────────────────────────────────────────────────────────────────────

type Status    = AdminStatus;
type FilterTab = "All" | "Confirmed" | "Pending" | "Cancelled";
type SortKey   = "guest" | "bookingFor" | "date" | "time" | "guests" | "status";
type SortDir   = "asc" | "desc";

interface Reservation {
  id:         string;
  guest:      string;
  email:      string;
  phone:      string;
  bookingFor: string;
  date:       string;
  dateValue:  string;
  dateTs:     number;
  time:       string;
  guests:     number;
  status:     Status;
  notes:      string;
}

interface SessionCapacity {
  label:  string;
  filled: number;
  total:  number;
}

interface FilterState {
  sessions:   string[];
  guestCount: string;
  dateRange:  string;
}

// ── Static data ───────────────────────────────────────────────────────────────

const SESSION_CAPACITY: SessionCapacity[] = [
  { label: "10:00 AM session", filled: 5,  total: 30 },
  { label: "1:00 PM session",  filled: 6,  total: 30 },
  { label: "4:00 PM session",  filled: 15, total: 30 },
  { label: "6:00 PM session",  filled: 24, total: 30 },
  { label: "8:00 PM session",  filled: 24, total: 30 },
];

const SESSION_TIMES = [
  "10:00 AM – 11:30 AM",
  "1:00 PM – 2:30 PM",
  "4:00 PM – 5:30 PM",
  "6:00 PM – 7:30 PM",
  "8:00 PM – 9:30 PM",
];

const STATUSES: Status[] = ["Pending", "Confirmed", "In review", "Cancelled"];

// Static seed data has been replaced by a live fetch — see useEffect inside
// BouquetReservations below. Only table bookings with at least one bouquet
// add-on are shown.

// ── Constants ─────────────────────────────────────────────────────────────────

const PAGE_SIZE_OPTIONS = [5, 10, 20];
const FILTER_TABS: FilterTab[] = ["All", "Confirmed", "Pending", "Cancelled"];
const EMPTY_FILTERS: FilterState = { sessions: [], guestCount: "any", dateRange: "any" };

const STATUS_STYLES: Record<Status, { dot: string; bg: string; text: string }> = {
  Pending:     { dot: "bg-yellow-400",  bg: "bg-yellow-50",  text: "text-yellow-700"  },
  Confirmed:   { dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
  "In review": { dot: "bg-purple-500",  bg: "bg-purple-50",  text: "text-purple-700"  },
  Cancelled:   { dot: "bg-red-400",     bg: "bg-red-50",     text: "text-red-700"     },
};

const STATUS_BTN: Record<Status, { active: string; inactive: string }> = {
  Pending:     { active: "bg-yellow-400  text-white border-yellow-400",  inactive: "text-yellow-700  border-yellow-200  hover:bg-yellow-50"  },
  Confirmed:   { active: "bg-emerald-500 text-white border-emerald-500", inactive: "text-emerald-700 border-emerald-200 hover:bg-emerald-50" },
  "In review": { active: "bg-purple-500  text-white border-purple-500",  inactive: "text-purple-700  border-purple-200  hover:bg-purple-50"  },
  Cancelled:   { active: "bg-red-400     text-white border-red-400",     inactive: "text-red-600     border-red-200     hover:bg-red-50"     },
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

function capacityColor(pct: number) {
  if (pct >= 80) return { bar: "bg-red-400",    text: "text-red-500"    };
  if (pct >= 50) return { bar: "bg-amber-400",  text: "text-amber-500"  };
  return               { bar: "bg-emerald-400", text: "text-emerald-600" };
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

function SessionCapacityCard({ session }: { session: SessionCapacity }) {
  const pct = Math.round((session.filled / session.total) * 100);
  const { bar, text } = capacityColor(pct);
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 border-b border-pink-100 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800">{session.label}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <div className="flex-1 h-1.5 bg-pink-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${bar}`} style={{ width: `${pct}%` }} />
          </div>
          <span className="text-[11px] text-gray-400 whitespace-nowrap flex-shrink-0">
            {session.filled} / {session.total}
          </span>
        </div>
      </div>
      <span className={`text-2xl font-semibold flex-shrink-0 ${text}`}>{pct}%</span>
    </div>
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
            Edit reservation
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
              <div className="absolute right-full top-0 mr-1 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-50 py-1 overflow-hidden">
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

// ── FilterDropdown ────────────────────────────────────────────────────────────

function FilterDropdown({ onApply, onReset, activeCount }: {
  onApply: (f: FilterState) => void; onReset: () => void; activeCount: number;
}) {
  const [open,  setOpen]  = useState(false);
  const [local, setLocal] = useState<FilterState>(EMPTY_FILTERS);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function h(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  function toggleSession(val: string) {
    setLocal(f => ({
      ...f,
      sessions: f.sessions.includes(val)
        ? f.sessions.filter(v => v !== val)
        : [...f.sessions, val],
    }));
  }

  function apply() { onApply(local); setOpen(false); }
  function reset()  { setLocal(EMPTY_FILTERS); onReset(); setOpen(false); }

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
        <div className="absolute right-0 top-full mt-2 w-68 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">Filter by</span>
            <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Reset all</button>
          </div>

          <div className="p-4 space-y-5 max-h-80 overflow-y-auto">
            <div>
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">Session time</p>
              <div className="space-y-1.5">
                {SESSION_TIMES.map(s => (
                  <label key={s} className="flex items-center gap-2.5 cursor-pointer group/chk">
                    <div
                      onClick={() => toggleSession(s)}
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors flex-shrink-0 ${
                        local.sessions.includes(s) ? "bg-pink-500 border-pink-500" : "border-gray-300 group-hover/chk:border-pink-300"
                      }`}
                    >
                      {local.sessions.includes(s) && <Check size={10} className="text-white" />}
                    </div>
                    <span className="text-sm text-gray-600">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">Group size</p>
              <div className="flex flex-wrap gap-2">
                {GUEST_COUNT_OPTIONS.map(o => (
                  <button
                    key={o.value}
                    onClick={() => setLocal(f => ({ ...f, guestCount: o.value }))}
                    className={`px-3 py-1 rounded-lg text-xs border transition-colors ${
                      local.guestCount === o.value ? "bg-pink-500 border-pink-500 text-white" : "border-gray-200 text-gray-600 hover:border-pink-200"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">Date range</p>
              <div className="flex flex-wrap gap-2">
                {DATE_RANGE_OPTIONS.map(o => (
                  <button
                    key={o.value}
                    onClick={() => setLocal(f => ({ ...f, dateRange: o.value }))}
                    className={`px-3 py-1 rounded-lg text-xs border transition-colors ${
                      local.dateRange === o.value ? "bg-pink-500 border-pink-500 text-white" : "border-gray-200 text-gray-600 hover:border-pink-200"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="px-4 py-3 border-t border-gray-100 flex gap-2">
            <button onClick={() => setOpen(false)} className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
            <button onClick={apply} className="flex-1 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── EditDrawer ────────────────────────────────────────────────────────────────

function EditDrawer({ reservation, onClose, onSave }: {
  reservation: Reservation;
  onClose: () => void;
  onSave: (r: Reservation) => void;
}) {
  const [form,  setForm]  = useState<Reservation>({ ...reservation });
  const [saved, setSaved] = useState(false);

  function set<K extends keyof Reservation>(key: K, value: Reservation[K]) {
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
            <h2 className="text-base font-semibold text-gray-900">Edit Bouquet Session</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">#{reservation.id} · {reservation.guest}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          <section>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Guest Information</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Full Name</label>
                <input value={form.guest} onChange={e => set("guest", e.target.value)} className={inp} />
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Session Details</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">Date</label>
                  <input type="date" value={form.dateValue} onChange={e => handleDateChange(e.target.value)} className={inp} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">No. of Guests</label>
                  <select value={form.guests} onChange={e => set("guests", Number(e.target.value))} className={`${inp} cursor-pointer`}>
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Session Time</label>
                <select value={form.time} onChange={e => set("time", e.target.value)} className={`${inp} cursor-pointer`}>
                  {SESSION_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
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
              value={form.notes}
              onChange={e => set("notes", e.target.value)}
              rows={3}
              placeholder="Allergy notes, special arrangements, staff reminders…"
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

export default function MakeYourBouquet() {
  const [data,        setData]        = useState<Reservation[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);
  const [activeTab,   setActiveTab]   = useState<FilterTab>("All");
  const [search,      setSearch]      = useState("");
  const [sortKey,     setSortKey]     = useState<SortKey>("date");
  const [sortDir,     setSortDir]     = useState<SortDir>("asc");
  const [page,        setPage]        = useState(1);
  const [pageSize,    setPageSize]    = useState(10);
  const [filters,     setFilters]     = useState<FilterState>(EMPTY_FILTERS);
  const [filterCount, setFilterCount] = useState(0);
  const [editing,     setEditing]     = useState<Reservation | null>(null);

  function resetPage() { setPage(1); }

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    resetPage();
  }

  function handleTabChange(tab: FilterTab) { setActiveTab(tab); resetPage(); }
  function handleSearch(val: string)       { setSearch(val);    resetPage(); }

  function applyFilters(f: FilterState) {
    setFilters(f);
    let c = 0;
    if (f.sessions.length)      c++;
    if (f.guestCount !== "any") c++;
    if (f.dateRange  !== "any") c++;
    setFilterCount(c);
    resetPage();
  }

  function resetFilters() { setFilters(EMPTY_FILTERS); setFilterCount(0); resetPage(); }

  const mapRows = (bookings: BackendTableBooking[]): Reservation[] =>
    bookings
      .filter((b) => b.bouquetBookings.length > 0)
      .map((b) => ({
        ...(tableBookingToRow(b, 'Make your Bouquet') as Reservation),
        bookingFor: 'Make your Bouquet',
      }));

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    api
      .get<{ bookings: BackendTableBooking[] }>('/api/table-bookings?limit=200')
      .then((res) => setData(mapRows(res.bookings ?? [])))
      .catch((e: { message?: string }) =>
        setError(e.message ?? 'Failed to load bouquet reservations'),
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let cancelled = false;
    api
      .get<{ bookings: BackendTableBooking[] }>('/api/table-bookings?limit=200')
      .then((res) => { if (!cancelled) setData(mapRows(res.bookings ?? [])); })
      .catch((e: { message?: string }) => {
        if (!cancelled) setError(e.message ?? 'Failed to load bouquet reservations');
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  async function handleSave(updated: Reservation) {
    const previous = data.find((r) => r.id === updated.id);
    setData(d => d.map(r => r.id === updated.id ? updated : r));
    setEditing(null);
    if (previous && previous.status !== updated.status) {
      try {
        await api.patch(`/api/table-bookings/${updated.id}/status`, {
          status: STATUS_TO_BACKEND[updated.status],
        });
      } catch (e) {
        const err = e as { message?: string };
        setError(err.message ?? 'Failed to update status');
        if (previous) setData(d => d.map(r => r.id === updated.id ? previous : r));
      }
    }
  }

  async function handleStatusChange(id: string, status: Status) {
    const previous = data.find((r) => r.id === id);
    setData(d => d.map(r => r.id === id ? { ...r, status } : r));
    try {
      await api.patch(`/api/table-bookings/${id}/status`, {
        status: STATUS_TO_BACKEND[status],
      });
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ?? 'Failed to update status');
      if (previous) setData(d => d.map(r => r.id === id ? previous : r));
    }
  }

  async function handleDelete(id: string) {
    const previous = data;
    setData(d => d.filter(r => r.id !== id));
    resetPage();
    try {
      await api.delete(`/api/table-bookings/${id}`);
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ?? 'Failed to delete reservation');
      setData(previous);
    }
  }

  const processed = useMemo(() => {
    let rows = [...data];

    if (activeTab !== "All") {
      if (activeTab === "Confirmed") rows = rows.filter(r => r.status === "Confirmed" || r.status === "In review");
      else rows = rows.filter(r => r.status === activeTab);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(r =>
        r.guest.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.date.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q) ||
        r.time.toLowerCase().includes(q)
      );
    }

    if (filters.sessions.length)  rows = rows.filter(r => filters.sessions.includes(r.time));

    if (filters.guestCount !== "any") {
      rows = rows.filter(r => {
        if (filters.guestCount === "1-4") return r.guests <= 4;
        if (filters.guestCount === "5-8") return r.guests >= 5 && r.guests <= 8;
        if (filters.guestCount === "9+")  return r.guests >= 9;
        return true;
      });
    }

    rows.sort((a, b) => {
      const av = sortKey === "date" ? a.dateTs : (a[sortKey as keyof Reservation] as string | number);
      const bv = sortKey === "date" ? b.dateTs : (b[sortKey as keyof Reservation] as string | number);
      if (av < bv) return sortDir === "asc" ? -1 :  1;
      if (av > bv) return sortDir === "asc" ?  1 : -1;
      return 0;
    });

    return rows;
  }, [data, activeTab, search, filters, sortKey, sortDir]);

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
    <>
      {editing && (
        <EditDrawer
          reservation={editing}
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
            <StatCard label="Bookings"           value={data.length}                                  sub="with bouquet add-ons" />
            <StatCard label="Total guests"       value={data.reduce((s, r) => s + r.guests, 0)}       sub="across all bookings"  />
            <StatCard label="Pending"            value={data.filter(r => r.status === "Pending").length} sub="awaiting confirm"  />
            <StatCard label="Confirmed"          value={data.filter(r => r.status === "Confirmed").length} sub="ready to prep"   />
          </div>

          <div className="flex gap-6 items-start">

            {/* ── Session table ── */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Sessions today</h2>

              {/* Controls */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      value={search}
                      onChange={e => handleSearch(e.target.value)}
                      placeholder="Search guest, session…"
                      className="pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-pink-300 focus:border-pink-300 w-48 transition-all placeholder:text-gray-400"
                    />
                    {search && (
                      <button onClick={() => handleSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
                        <X size={13} />
                      </button>
                    )}
                  </div>

                  <FilterDropdown onApply={applyFilters} onReset={resetFilters} activeCount={filterCount} />

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
                      &ldquo;{search}&rdquo;
                      <button onClick={() => handleSearch("")} className="text-gray-400 hover:text-gray-600"><X size={11} /></button>
                    </span>
                  )}
                  {filters.sessions.map(s => (
                    <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 border border-pink-100 rounded-full text-xs text-pink-700">
                      {s}
                      <button onClick={() => applyFilters({ ...filters, sessions: filters.sessions.filter(v => v !== s) })} className="text-pink-400 hover:text-pink-600">
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                  <button onClick={() => { resetFilters(); handleSearch(""); }} className="text-xs text-gray-400 hover:text-gray-600 underline ml-1 transition-colors">
                    Clear all
                  </button>
                </div>
              )}

              {/* Table */}
              <div className="rounded-2xl border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-pink-50 border-b border-gray-100">
                      <ColHeader label="Guest"      sortKey="guest"   currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                      <ColHeader label="Date"       sortKey="date"    currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                      <ColHeader label="Time"       sortKey="time"    currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                      <ColHeader label="Guests"     sortKey="guests"  currentKey={sortKey} dir={sortDir} onSort={handleSort} />
                      <ColHeader label="Status"     sortKey="status"  currentKey={sortKey} dir={sortDir} onSort={handleSort} />
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
                              {initials(r.guest)}
                            </div>
                            <div className="min-w-0">
                              <span className="text-gray-800 font-medium text-sm block truncate">{r.guest}</span>
                              <span className="text-gray-400 text-[11px] block truncate">{r.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-gray-600 text-sm whitespace-nowrap">{r.date}</td>
                        <td className="px-5 py-3.5 text-gray-600 text-sm whitespace-nowrap">{r.time}</td>
                        <td className="px-5 py-3.5 text-gray-600 text-sm">{r.guests} Guests</td>
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
                    <p className="text-sm text-gray-400">No sessions match your filters.</p>
                    <button onClick={() => { resetFilters(); handleSearch(""); setActiveTab("All"); }} className="mt-2 text-xs text-pink-500 underline hover:text-pink-700 transition-colors">
                      Clear all filters
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

            {/* ── Session capacity sidebar ── */}
            <aside className="w-72 flex-shrink-0 sticky top-6">
              <div className="bg-pink-50 rounded-2xl p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-2">Session capacity</h3>
                {SESSION_CAPACITY.map(s => (
                  <SessionCapacityCard key={s.label} session={s} />
                ))}
              </div>
            </aside>

          </div>
        </main>
      </div>
    </>
  );
}

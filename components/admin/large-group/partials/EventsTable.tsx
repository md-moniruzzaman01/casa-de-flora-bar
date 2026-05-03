"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Plus, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { EventStatus, GroupEvent } from "@/components/admin/large-group/config/types";
import StatusBadge from "./StatusBadge";
import Pagination from "@/components/shared/Pagination";

interface EventsTableProps {
  title: string;
  events: GroupEvent[];
  itemsPerPage?: number;
}

type SortKey = keyof GroupEvent;
type SortDir = "asc" | "desc";

const PACKAGES = ["All", "All Inclusive", "Brunch Sip & Clip"];
const STATUSES: ("All" | EventStatus)[] = ["All", "Pending", "Confirm"];

function ThBtn({ label, sortId, sortKey, onSort }: {
  label: string;
  sortId: SortKey;
  sortKey: SortKey;
  onSort: (id: SortKey) => void;
}) {
  return (
    <button
      onClick={() => onSort(sortId)}
      className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-800 uppercase tracking-wide"
    >
      {label}
      <ArrowUpDown className={`w-3 h-3 ${sortKey === sortId ? "text-rose-500" : "text-gray-300"}`} />
    </button>
  );
}

export default function EventsTable({ title, events, itemsPerPage = 5 }: EventsTableProps) {
  const [search, setSearch] = useState("");
  const [packageFilter, setPackageFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"All" | EventStatus>("All");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [showFilters, setShowFilters] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered = useMemo(() => {
    let data = [...events];

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (e) =>
          e.host.toLowerCase().includes(q) ||
          e.package.toLowerCase().includes(q) ||
          e.note.toLowerCase().includes(q)
      );
    }
    if (packageFilter !== "All") data = data.filter((e) => e.package === packageFilter);
    if (statusFilter !== "All") data = data.filter((e) => e.status === statusFilter);

    data.sort((a, b) => {
      const av = String(a[sortKey]);
      const bv = String(b[sortKey]);
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });

    return data;
  }, [events, search, packageFilter, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paged = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleSearchChange = (v: string) => { setSearch(v); setPage(1); };
  const handlePackage = (v: string) => { setPackageFilter(v); setPage(1); };
  const handleStatus = (v: "All" | EventStatus) => { setStatusFilter(v); setPage(1); };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800 text-base">{title}</h2>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg w-44 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition"
            />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition
              ${showFilters ? "bg-rose-50 border-rose-300 text-rose-600" : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"}`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filter
          </button>

          {/* Add */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition">
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>

      {/* Filter bar */}
      {showFilters && (
        <div className="flex items-center gap-4 px-5 py-3 bg-rose-50/50 border-b border-rose-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">Package:</span>
            <div className="flex gap-1">
              {PACKAGES.map((p) => (
                <button
                  key={p}
                  onClick={() => handlePackage(p)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition
                    ${packageFilter === p ? "bg-rose-500 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="w-px h-5 bg-gray-200" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">Status:</span>
            <div className="flex gap-1">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatus(s)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition
                    ${statusFilter === s ? "bg-rose-500 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          {(packageFilter !== "All" || statusFilter !== "All" || search) && (
            <button
              onClick={() => { handlePackage("All"); handleStatus("All"); handleSearchChange(""); }}
              className="ml-auto text-xs text-rose-500 hover:underline font-medium"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-rose-50/60">
              <th className="px-5 py-3 text-left"><ThBtn label="Group / Host" sortId="host" sortKey={sortKey} onSort={handleSort} /></th>
              <th className="px-4 py-3 text-left"><ThBtn label="Date" sortId="date" sortKey={sortKey} onSort={handleSort} /></th>
              <th className="px-4 py-3 text-left"><ThBtn label="Time" sortId="time" sortKey={sortKey} onSort={handleSort} /></th>
              <th className="px-4 py-3 text-left"><ThBtn label="Guests" sortId="guests" sortKey={sortKey} onSort={handleSort} /></th>
              <th className="px-4 py-3 text-left"><ThBtn label="Package" sortId="package" sortKey={sortKey} onSort={handleSort} /></th>
              <th className="px-4 py-3 text-left"><ThBtn label="Note" sortId="note" sortKey={sortKey} onSort={handleSort} /></th>
              <th className="px-4 py-3 text-left"><ThBtn label="Status" sortId="status" sortKey={sortKey} onSort={handleSort} /></th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-sm text-gray-400">
                  No events found. Try adjusting your filters.
                </td>
              </tr>
            ) : (
              paged.map((event) => (
                <tr key={event.id} className="hover:bg-rose-50/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-rose-200 text-rose-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {event.avatar}
                      </div>
                      <span className="font-medium text-gray-800 text-sm">{event.host}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600 text-sm">{event.date}</td>
                  <td className="px-4 py-3.5 text-gray-600 text-sm whitespace-nowrap">{event.time}</td>
                  <td className="px-4 py-3.5 text-gray-700 text-sm">{event.guests} Guests</td>
                  <td className="px-4 py-3.5 text-gray-700 text-sm">{event.package}</td>
                  <td className="px-4 py-3.5 text-gray-600 text-sm">{event.note}</td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={event.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <button className="p-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-600 transition">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filtered.length > itemsPerPage && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={filtered.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
}

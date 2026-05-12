"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { api } from "@/lib/api";
import {
  type BackendTableBooking,
  type BackendEventBooking,
  formatTimeRange,
  formatTimeRangeBetween,
  initials as nameInitials,
  isoDateOnly,
} from "@/lib/admin-mappers";
import { Reservation, ReservationStatus, SelectedDate } from "@/components/admin/calendar/config/types";
import MiniCalendar from "@/components/admin/calendar/partials/MiniCalendar";
import StatsPanel from "@/components/admin/calendar/partials/StatsPanel";
import { formatDayName, formatSelectedDate } from "@/components/admin/calendar/config/utils";
import ReservationTable from "@/components/admin/calendar/partials/ReservationTable";

const AVATAR_PALETTE: Array<{ bg: string; text: string }> = [
  { bg: "#C8E6C9", text: "#1B5E20" },
  { bg: "#BBDEFB", text: "#0D47A1" },
  { bg: "#F8BBD0", text: "#880E4F" },
  { bg: "#FFF9C4", text: "#F57F17" },
  { bg: "#E1BEE7", text: "#4A148C" },
  { bg: "#B2EBF2", text: "#006064" },
  { bg: "#FFE0B2", text: "#E65100" },
  { bg: "#DCEDC8", text: "#33691E" },
];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash + name.charCodeAt(i)) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[hash];
}

function mapBackendStatus(s: BackendTableBooking["status"]): ReservationStatus | null {
  if (s === "CANCELLED") return null;
  if (s === "PENDING")   return "Pending";
  return "Confirm"; // CONFIRMED + COMPLETED
}

function tableToReservation(b: BackendTableBooking): Reservation | null {
  const status = mapBackendStatus(b.status);
  if (!status) return null;
  const palette = avatarColor(b.name);
  return {
    id:         b.id,
    name:       b.name,
    initials:   nameInitials(b.name),
    avatarBg:   palette.bg,
    avatarText: palette.text,
    time:       formatTimeRange(b.timeSlot, 90),
    bookingFor: b.bouquetBookings.length > 0 ? "Bouquet" : "Table",
    guests:     b.guests,
    status,
    dateValue:  isoDateOnly(b.date),
  };
}

function eventToReservation(b: BackendEventBooking): Reservation | null {
  const status = mapBackendStatus(b.status);
  if (!status) return null;
  const palette = avatarColor(b.name);
  const eventTypeLabel = b.eventType.charAt(0) + b.eventType.slice(1).toLowerCase();
  return {
    id:         b.id,
    name:       b.name,
    initials:   nameInitials(b.name),
    avatarBg:   palette.bg,
    avatarText: palette.text,
    time:       formatTimeRangeBetween(b.startTime, b.endTime),
    bookingFor: eventTypeLabel,
    guests:     b.guests,
    status,
    dateValue:  isoDateOnly(b.date),
  };
}

function isoForSelected(d: SelectedDate): string {
  return `${d.year}-${String(d.month + 1).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
}

export default function CalendarDashboard() {
  const today = useMemo(() => new Date(), []);
  const [currentYear,  setCurrentYear]  = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    year:  today.getFullYear(),
    month: today.getMonth(),
    day:   today.getDate(),
  });

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState<string | null>(null);

  const fetchAll = useCallback(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      api.get<{ bookings: BackendTableBooking[] }>("/api/table-bookings?limit=200"),
      api.get<{ bookings: BackendEventBooking[] }>("/api/event-bookings?limit=200"),
    ])
      .then(([t, e]) => {
        const tableRows = (t.bookings ?? []).map(tableToReservation).filter((r): r is Reservation => r !== null);
        const eventRows = (e.bookings ?? []).map(eventToReservation).filter((r): r is Reservation => r !== null);
        setReservations([...tableRows, ...eventRows]);
      })
      .catch((err: { message?: string }) =>
        setError(err.message ?? "Failed to load reservations"),
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      api.get<{ bookings: BackendTableBooking[] }>("/api/table-bookings?limit=200"),
      api.get<{ bookings: BackendEventBooking[] }>("/api/event-bookings?limit=200"),
    ])
      .then(([t, e]) => {
        if (cancelled) return;
        const tableRows = (t.bookings ?? []).map(tableToReservation).filter((r): r is Reservation => r !== null);
        const eventRows = (e.bookings ?? []).map(eventToReservation).filter((r): r is Reservation => r !== null);
        setReservations([...tableRows, ...eventRows]);
      })
      .catch((err: { message?: string }) => {
        if (!cancelled) setError(err.message ?? "Failed to load reservations");
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const handleMonthChange = (year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  const selectedIso = isoForSelected(selectedDate);

  const dayReservations = useMemo(
    () =>
      reservations
        .filter((r) => r.dateValue === selectedIso)
        .sort((a, b) => a.time.localeCompare(b.time)),
    [reservations, selectedIso],
  );

  const eventDays = useMemo(() => {
    const monthPrefix = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`;
    const days = new Set<number>();
    for (const r of reservations) {
      if (r.dateValue.startsWith(monthPrefix)) {
        days.add(Number(r.dateValue.slice(8, 10)));
      }
    }
    return [...days];
  }, [reservations, currentYear, currentMonth]);

  const stats = useMemo(() => {
    const confirmed   = dayReservations.filter((r) => r.status === "Confirm").length;
    const pending     = dayReservations.filter((r) => r.status === "Pending").length;
    const totalGuests = dayReservations.reduce((sum, r) => sum + r.guests, 0);
    return { confirmed, pending, totalGuests };
  }, [dayReservations]);

  return (
    <div className="min-h-screen bg-primary-50 font-sans ">

      <div className="flex" style={{ minHeight: "calc(100vh - 61px)" }}>

        {/* Left panel */}
        <aside className="w-72 flex-shrink-0 bg-primary-50 border-r border-primary-200 p-6">
          <MiniCalendar
            currentYear={currentYear}
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            eventDays={eventDays}
            onMonthChange={handleMonthChange}
            onDateSelect={setSelectedDate}
          />
          <StatsPanel
            confirmed={stats.confirmed}
            pending={stats.pending}
            totalGuests={stats.totalGuests}
          />
        </aside>

        {/* Right panel */}
        <main className="flex-1 p-8 bg-white">
          {error && (
            <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center justify-between">
              <span>{error}</span>
              <button onClick={fetchAll} className="text-red-700 underline">Retry</button>
            </div>
          )}

          {/* Date heading */}
          <div className="flex items-baseline gap-3 mb-6">
            <h2 className="font-serif text-2xl font-normal">
              {formatSelectedDate(selectedDate)}
            </h2>
            <span className="text-[13px] text-stone-400">
              {formatDayName(selectedDate)}
            </span>
            <span
              className="ml-auto text-[11px] font-semibold px-3 py-1 rounded-full text-green-50"
              style={{ backgroundColor: "#2D5016" }}
            >
              {dayReservations.length} reservations
            </span>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-primary-200 p-2 overflow-hidden">
            {loading && reservations.length === 0 ? (
              <div className="py-16 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-stone-300 animate-spin" />
              </div>
            ) : dayReservations.length === 0 ? (
              <div className="py-16 text-center text-sm text-stone-400">
                No reservations on this day.
              </div>
            ) : (
              <ReservationTable reservations={dayReservations} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

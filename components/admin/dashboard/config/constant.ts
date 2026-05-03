import { OverviewItem, Reservation, ReservationStatus } from "./types";

// ── Static Data ────────────────────────────────────────────────────────────
export const overviewItems: OverviewItem[] = [
  { label: "Table Reservations", today: 3, week: 11 },
  { label: "Bouquet Reservations", today: 2, week: 8 },
  { label: "Large Group Reservations", today: 1, week: 5 },
  { label: "Event Reservations", today: 1, week: 4 },
];

export const reservations: Reservation[] = [
  { id: 1, guest: "Russel Petter", avatar: "R", bookingFor: "Bouquet", date: "Mar 2, 2026", time: "10:00 AM – 11:30 AM", guests: 6, status: "Pending" },
  { id: 2, guest: "Russel Petter", avatar: "R", bookingFor: "Bouquet", date: "Mar 2, 2026", time: "10:00 AM – 11:30 AM", guests: 6, status: "Confirm" },
  { id: 3, guest: "Russel Petter", avatar: "R", bookingFor: "Table",   date: "Mar 2, 2026", time: "10:00 AM – 11:30 AM", guests: 6, status: "In review" },
  { id: 4, guest: "Russel Petter", avatar: "R", bookingFor: "Table",   date: "Mar 2, 2026", time: "10:00 AM – 11:30 AM", guests: 6, status: "Confirm" },
  { id: 5, guest: "Russel Petter", avatar: "R", bookingFor: "Table",   date: "Mar 2, 2026", time: "10:00 AM – 11:30 AM", guests: 6, status: "Confirm" },
];

// ── Helpers ────────────────────────────────────────────────────────────────
export const STATUS_STYLES: Record<ReservationStatus, string> = {
  Pending:   "bg-yellow-100 text-yellow-700 border border-yellow-300",
  Confirm:   "bg-emerald-100 text-emerald-700 border border-emerald-300",
  "In review": "bg-purple-100 text-purple-700 border border-purple-300",
};

export const STATUS_DOT: Record<ReservationStatus, string> = {
  Pending:   "bg-yellow-500",
  Confirm:   "bg-emerald-500",
  "In review": "bg-purple-500",
};

export const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// highlighted dates in the design
export const HIGHLIGHTED_DATES = new Set([9, 11, 13, 14, 15, 17, 19, 20]);
export const RANGE_DATES = new Set([14, 15, 16, 17, 18, 19, 20]);
// ── Types ──────────────────────────────────────────────────────────────────
export type ReservationStatus = "Pending" | "Confirm" | "In review";
export type ReservationFilter = "All" | "Table" | "Bouquet" | "Large Group" | "Event";

export interface Reservation {
  id: number;
  guest: string;
  avatar: string;
  bookingFor: string;
  date: string;
  time: string;
  guests: number;
  status: ReservationStatus;
}

export interface OverviewItem {
  label: string;
  today: number;
  week: number;
}


export interface StatCardProps {
  title: string;
  value: number;
  badge: number;
  badgeUp: boolean;
  sub: string;
}
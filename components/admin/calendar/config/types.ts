export type ReservationStatus = "Pending" | "Confirm";

export type Reservation = {
  id: number;
  name: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  time: string;
  bookingFor: string;
  guests: number;
  status: ReservationStatus;
};

export type SelectedDate = {
  year: number;
  month: number; // 0-indexed
  day: number;
};
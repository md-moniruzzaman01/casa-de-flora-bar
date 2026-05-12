export type ReservationStatus = "Pending" | "Confirm";

export type Reservation = {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  time: string;
  bookingFor: string;
  guests: number;
  status: ReservationStatus;
  dateValue: string; // "YYYY-MM-DD" for filtering
};

export type SelectedDate = {
  year: number;
  month: number; // 0-indexed
  day: number;
};
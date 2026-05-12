// Shared mappers between the backend Prisma shapes and the row format the
// admin reservation tables consume.

export type BackendBookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED';

export type AdminStatus = 'Pending' | 'Confirmed' | 'In review' | 'Cancelled';

export const STATUS_FROM_BACKEND: Record<BackendBookingStatus, AdminStatus> = {
  PENDING:   'Pending',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Confirmed',
  CANCELLED: 'Cancelled',
};

export const STATUS_TO_BACKEND: Record<AdminStatus, BackendBookingStatus> = {
  Pending:     'PENDING',
  Confirmed:   'CONFIRMED',
  'In review': 'PENDING',
  Cancelled:   'CANCELLED',
};

const MONTHS = [
  'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',
];

export function formatDisplayDate(iso: string): string {
  const d = new Date(iso);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export function isoDateOnly(iso: string): string {
  return iso.slice(0, 10);
}

// "10:00" + 90 minutes → "10:00 AM – 11:30 AM"
export function formatTimeRange(start: string, durationMin = 90): string {
  const end = addMinutes(start, durationMin);
  return `${to12h(start)} – ${to12h(end)}`;
}

export function formatTimeRangeBetween(start: string, end: string): string {
  return `${to12h(start)} – ${to12h(end)}`;
}

function to12h(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${period}`;
}

function addMinutes(hhmm: string, minutes: number): string {
  const [h, m] = hhmm.split(':').map(Number);
  const total = h * 60 + m + minutes;
  const hh = Math.floor((total / 60) % 24);
  const mm = total % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

// ── Backend payload shapes (lean, only what the admin UI consumes) ──────────

export interface BackendCustomerSummary {
  id: string;
  name: string;
  email: string;
}

export interface BackendBouquet {
  id: string;
  bouquetType: string;
  quantity: number;
  occasion: string | null;
  cardMessage: string | null;
  specialRequests: string | null;
}

export interface BackendTableBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string; // ISO datetime
  timeSlot: string; // "HH:mm"
  specialRequests: string | null;
  status: BackendBookingStatus;
  createdAt: string;
  customer: BackendCustomerSummary | null;
  bouquetBookings: BackendBouquet[];
}

export interface BackendEventBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  guests: number;
  date: string;
  startTime: string;
  endTime: string;
  cateringRequired: boolean;
  specialRequests: string | null;
  status: BackendBookingStatus;
  createdAt: string;
  customer: BackendCustomerSummary | null;
}

// ── Reservation row (matches the table-page UI shape, but with string ids) ──

export interface ReservationRow {
  id: string;
  guest: string;
  email: string;
  phone: string;
  bookingFor: string;
  date: string;       // "Mar 2, 2026"
  dateValue: string;  // "2026-03-02"
  dateTs: number;
  time: string;       // "10:00 AM – 11:30 AM"
  timeSlot: string;   // raw "HH:mm" for editing
  guests: number;
  status: AdminStatus;
  notes: string;
  source: 'table' | 'bouquet' | 'event';
  bouquetCount?: number;
}

export const tableBookingToRow = (
  b: BackendTableBooking,
  bookingFor = 'Table',
): ReservationRow => {
  const dateValue = isoDateOnly(b.date);
  return {
    id: b.id,
    guest: b.name,
    email: b.email,
    phone: b.phone,
    bookingFor:
      b.bouquetBookings.length > 0 ? `Table + ${b.bouquetBookings.length} Bouquet` : bookingFor,
    date: formatDisplayDate(b.date),
    dateValue,
    dateTs: new Date(dateValue).getTime(),
    time: formatTimeRange(b.timeSlot, 90),
    timeSlot: b.timeSlot,
    guests: b.guests,
    status: STATUS_FROM_BACKEND[b.status],
    notes: b.specialRequests ?? '',
    source: 'table',
    bouquetCount: b.bouquetBookings.length,
  };
};

export const eventBookingToRow = (b: BackendEventBooking): ReservationRow => {
  const dateValue = isoDateOnly(b.date);
  const eventTypeLabel =
    b.eventType.charAt(0) + b.eventType.slice(1).toLowerCase();
  return {
    id: b.id,
    guest: b.name,
    email: b.email,
    phone: b.phone,
    bookingFor: eventTypeLabel,
    date: formatDisplayDate(b.date),
    dateValue,
    dateTs: new Date(dateValue).getTime(),
    time: formatTimeRangeBetween(b.startTime, b.endTime),
    timeSlot: b.startTime,
    guests: b.guests,
    status: STATUS_FROM_BACKEND[b.status],
    notes: b.specialRequests ?? '',
    source: 'event',
  };
};

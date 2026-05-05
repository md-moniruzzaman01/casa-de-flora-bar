export interface Slot {
  from: string;
  to: string;
  seats: number;
  level: SlotLevel;
}
export type SlotLevel = "many" | "few" | "last";

export interface SelectedDate {
  year: number;
  month: number;
  day: number;
}

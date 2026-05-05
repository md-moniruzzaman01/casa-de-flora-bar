export interface Slot {
  from: string;
  to: string;
  seats: number;
  level: SlotLevel;
}
export type SlotLevel = "many" | "few" | "last";
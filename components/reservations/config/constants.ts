import { SlotLevel } from "./types";

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
export const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

export function getDateKey(year: number, month: number, day: number) {
  return `${year}-${month + 1}-${day}`;
}

export const badgeStyles: Record<SlotLevel, string> = {
  many: "bg-primary-100 text-primary",
  few:  "bg-amber-50 text-amber-700",
  last: "bg-rose-50 text-rose-700",
};
export const badgeLabels: Record<SlotLevel, string> = {
  many: "Open",
  few:  "Filling up",
  last: "Last few",
};

export const QUICK_OPTIONS = [
  { label: "Today",        value: "today"   },
  { label: "Tomorrow",     value: "tomorrow" },
  { label: "This weekend", value: "weekend" },
  { label: "Next 7 days",  value: "next7"   },
];

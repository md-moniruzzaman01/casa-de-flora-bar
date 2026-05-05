
import { DAY_NAMES_LONG, MONTHS } from "./constant";
import { SelectedDate } from "./types";

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function getPrevMonthDays(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function formatSelectedDate(sel: SelectedDate): string {
  return `${MONTHS[sel.month]} ${sel.day}, ${sel.year}`;
}

export function formatDayName(sel: SelectedDate): string {
  return DAY_NAMES_LONG[new Date(sel.year, sel.month, sel.day).getDay()];
}

export function prevMonth(year: number, month: number): { year: number; month: number } {
  if (month === 0) return { year: year - 1, month: 11 };
  return { year, month: month - 1 };
}

export function nextMonth(year: number, month: number): { year: number; month: number } {
  if (month === 11) return { year: year + 1, month: 0 };
  return { year, month: month + 1 };
}
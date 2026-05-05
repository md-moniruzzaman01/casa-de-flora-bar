import { Slot, SlotLevel } from "./types";

export const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];
export const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];




export const ALL_SLOTS: Slot[] = [
    { from: "10:00 AM", to: "11:30 AM", seats: 30, level: "many" },
    { from: "11:30 AM", to: "1:00 PM", seats: 22, level: "many" },
    { from: "1:00 PM", to: "2:30 PM", seats: 14, level: "few" },
    { from: "5:00 PM", to: "6:30 PM", seats: 30, level: "many" },
    { from: "6:30 PM", to: "8:00 PM", seats: 8, level: "few" },
    { from: "8:00 PM", to: "9:30 PM", seats: 3, level: "last" },
    { from: "9:30 PM", to: "11:00 PM", seats: 18, level: "many" },
];

export function buildAvailMap(year: number, month: number): Record<string, Slot[]> {
    const map: Record<string, Slot[]> = {};
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
        if (d % 3 === 0) continue;
        const key = `${year}-${month + 1}-${d}`;
        const count = (d % 3) + 2;
        map[key] = ALL_SLOTS.slice(0, count);
    }
    return map;
}

export function getDateKey(year: number, month: number, day: number) {
    return `${year}-${month + 1}-${day}`;
}

export const badgeStyles: Record<SlotLevel, string> = {
    many: "bg-green-50 text-green-800",
    few: "bg-amber-50 text-amber-800",
    last: "bg-red-50 text-red-800",
};
export const badgeLabels: Record<SlotLevel, string> = {
    many: "Available",
    few: "Filling up",
    last: "Last seats",
};

export const QUICK_OPTIONS = [
    { label: "Today", value: "today" },
    { label: "Tomorrow", value: "tomorrow" },
    { label: "This weekend", value: "weekend" },
    { label: "Next 7 days", value: "next7" },
];

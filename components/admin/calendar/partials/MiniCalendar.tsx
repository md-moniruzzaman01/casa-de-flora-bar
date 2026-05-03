"use client";


import { ChevronLeft, ChevronRight } from "lucide-react";
import { SelectedDate } from "../config/types";
import { getDaysInMonth, getFirstDayOfMonth, getPrevMonthDays, nextMonth, prevMonth } from "../config/utils";
import { DAY_NAMES_SHORT, EVENT_DAYS, MONTHS } from "../config/constant";

type Props = {
  currentYear: number;
  currentMonth: number;
  selectedDate: SelectedDate;
  onMonthChange: (year: number, month: number) => void;
  onDateSelect: (date: SelectedDate) => void;
};

export default function MiniCalendar({
  currentYear,
  currentMonth,
  selectedDate,
  onMonthChange,
  onDateSelect,
}: Props) {
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const prevDays = getPrevMonthDays(currentYear, currentMonth);

  const totalCells = firstDay + daysInMonth;
  const trailingDays = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

  const handlePrev = () => {
    const { year, month } = prevMonth(currentYear, currentMonth);
    onMonthChange(year, month);
  };

  const handleNext = () => {
    const { year, month } = nextMonth(currentYear, currentMonth);
    onMonthChange(year, month);
  };

  const isSelected = (day: number) =>
    selectedDate.year === currentYear &&
    selectedDate.month === currentMonth &&
    selectedDate.day === day;

  return (
    <div className="w-full">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={handlePrev}
          className="w-7 h-7 flex items-center justify-center rounded border border-stone-200 text-stone-400 hover:bg-white hover:text-stone-700 transition-colors"
        >
          <ChevronLeft size={14} />
        </button>
        <span className="font-serif text-[15px] font-medium text-stone-800">
          {MONTHS[currentMonth]} {currentYear}
        </span>
        <button
          onClick={handleNext}
          className="w-7 h-7 flex items-center justify-center rounded border border-stone-200 text-stone-400 hover:bg-white hover:text-stone-700 transition-colors"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {/* Day names */}
        {DAY_NAMES_SHORT.map((d) => (
          <div
            key={d}
            className="text-[10px] font-medium tracking-wider uppercase text-stone-400 text-center pb-2"
          >
            {d}
          </div>
        ))}

        {/* Leading days from prev month */}
        {Array.from({ length: firstDay }, (_, i) => (
          <div
            key={`prev-${i}`}
            className="h-9 flex items-center justify-center text-[12px] text-stone-300"
          >
            {prevDays - firstDay + i + 1}
          </div>
        ))}

        {/* Current month days */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const selected = isSelected(day);
          const hasEvent = EVENT_DAYS.includes(day) && !selected;

          return (
            <div key={`day-${day}`} className="flex items-center justify-center">
              <button
                onClick={() =>
                  onDateSelect({ year: currentYear, month: currentMonth, day })
                }
                className={[
                  "relative w-9 h-9 flex items-center justify-center rounded-full text-[12px] font-medium transition-all",
                  selected
                    ? "bg-forest-700 text-green-50 shadow"
                    : "text-stone-700 hover:bg-white",
                ].join(" ")}
                style={selected ? { backgroundColor: "#2D5016" } : undefined}
              >
                {day}
                {hasEvent && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-500" />
                )}
              </button>
            </div>
          );
        })}

        {/* Trailing days from next month */}
        {Array.from({ length: trailingDays }, (_, i) => (
          <div
            key={`next-${i}`}
            className="h-9 flex items-center justify-center text-[12px] text-stone-300"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
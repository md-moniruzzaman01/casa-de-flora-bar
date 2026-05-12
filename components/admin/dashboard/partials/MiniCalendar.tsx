"use client"
import { useState, useMemo, useEffect } from "react";
import { DAYS_OF_WEEK } from "../config/constant";

interface MiniCalendarProps {
  selectedDate?: Date;
  onSelectDate?: (date: Date) => void;
  bookingDates?: string[]; // Array of 'YYYY-MM-DD' strings
}

export default function MiniCalendar({
  selectedDate,
  onSelectDate,
  bookingDates = [],
}: MiniCalendarProps) {
    const today = new Date();
    // Use the selected date's year/month if provided, otherwise today
    const initialYear = selectedDate ? selectedDate.getFullYear() : today.getFullYear();
    const initialMonth = selectedDate ? selectedDate.getMonth() : today.getMonth();
    
    const [current, setCurrent] = useState({ year: initialYear, month: initialMonth });

    // Sync month view if selectedDate changes from outside
    useEffect(() => {
      if (selectedDate) {
        setCurrent({
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth()
        });
      }
    }, [selectedDate]);

    const monthName = new Date(current.year, current.month).toLocaleString("default", {
        month: "long",
    });

    const firstDay = new Date(current.year, current.month, 1).getDay();
    const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();

    const cells: (number | null)[] = [
        ...Array(firstDay).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    // pad to full weeks
    while (cells.length % 7 !== 0) cells.push(null);

    const prev = () =>
        setCurrent((c) => {
            const d = new Date(c.year, c.month - 1);
            return { year: d.getFullYear(), month: d.getMonth() };
        });
    const next = () =>
        setCurrent((c) => {
            const d = new Date(c.year, c.month + 1);
            return { year: d.getFullYear(), month: d.getMonth() };
        });

    // Compute highlighted dates based on API booking dates
    const highlightedDates = useMemo(() => {
      const dates = new Set<number>();
      bookingDates.forEach(dateStr => {
        const d = new Date(dateStr);
        // Adjust for timezone to get the correct local date
        const localD = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
        
        if (localD.getFullYear() === current.year && localD.getMonth() === current.month) {
            dates.add(localD.getDate());
        }
      });
      return dates;
    }, [bookingDates, current.year, current.month]);

    return (
        <div className="bg-[#fdf0f3] rounded-2xl p-5 select-none">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={prev}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-pink-100 transition-colors text-gray-500"
                >
                    ‹
                </button>
                <span className="text-sm font-semibold text-gray-800">
                    {monthName}, {current.year}
                </span>
                <button
                    onClick={next}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-pink-100 transition-colors text-gray-500"
                >
                    ›
                </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 mb-1">
                {DAYS_OF_WEEK.map((d) => (
                    <div key={d} className="text-center text-[11px] font-medium text-gray-400 pb-1">
                        {d}
                    </div>
                ))}
            </div>

            {/* Date grid */}
            <div className="grid grid-cols-7">
                {cells.map((day, i) => {
                    if (!day) return <div key={i} />;
                    const isHighlighted = highlightedDates.has(day);
                    const isSelected = selectedDate && 
                      selectedDate.getFullYear() === current.year &&
                      selectedDate.getMonth() === current.month &&
                      selectedDate.getDate() === day;
                      
                    const isToday = today.getFullYear() === current.year && 
                      today.getMonth() === current.month && 
                      today.getDate() === day;

                    return (
                        <div key={i} className="relative flex items-center justify-center h-9">
                            <button
                                onClick={() => {
                                  if (onSelectDate) {
                                    onSelectDate(new Date(current.year, current.month, day));
                                  }
                                }}
                                className={`relative z-10 w-8 h-8 rounded-full text-[13px] font-medium transition-colors
                                    ${isSelected 
                                        ? "bg-gray-900 text-white" 
                                        : isHighlighted
                                            ? "bg-[#e8336d] text-white"
                                            : isToday
                                              ? "text-[#e8336d] border border-[#e8336d]"
                                              : "text-gray-700 hover:bg-pink-100"
                                    }`}
                            >
                                {day}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

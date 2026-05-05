"use client"
import { useState } from "react";
import { DAYS_OF_WEEK, HIGHLIGHTED_DATES, RANGE_DATES } from "../config/constant";





export default function MiniCalendar() {
    const [current, setCurrent] = useState({ year: 2026, month: 4 }); // May = 4

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
                    const isHighlighted = HIGHLIGHTED_DATES.has(day);
                    const isRange = RANGE_DATES.has(day);
                    const isEdge = day === 14 || day === 20;

                    return (
                        <div key={i} className="relative flex items-center justify-center h-9">
                            {/* range background strip */}
                            {isRange && !isEdge && (
                                <div className="absolute inset-y-1 inset-x-0 bg-pink-100" />
                            )}
                            {isEdge && (
                                <div
                                    className={`absolute inset-y-1 ${day === 14 ? "left-1/2 right-0" : "left-0 right-1/2"} bg-pink-100`}
                                />
                            )}
                            <button
                                className={`relative z-10 w-8 h-8 rounded-full text-[13px] font-medium transition-colors
                  ${isHighlighted
                                        ? "bg-[#e8336d] text-white"
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

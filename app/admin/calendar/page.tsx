"use client";

import { useState } from "react";
import { SelectedDate } from "@/components/admin/calendar/config/types";
import MiniCalendar from "@/components/admin/calendar/partials/MiniCalendar";
import StatsPanel from "@/components/admin/calendar/partials/StatsPanel";
import { formatDayName, formatSelectedDate } from "@/components/admin/calendar/config/utils";
import { RESERVATIONS } from "@/components/admin/calendar/config/constant";
import ReservationTable from "@/components/admin/calendar/partials/ReservationTable";



export default function CalendarDashboard() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(4); // May (0-indexed)
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    year: 2026,
    month: 4,
    day: 2,
  });

  const handleMonthChange = (year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  return (
    <div className="min-h-screen bg-primary-50 font-sans ">


      {/* Body */}
      <div className="flex" style={{ minHeight: "calc(100vh - 61px)" }}>

        {/* Left panel */}
        <aside className="w-72 flex-shrink-0 bg-primary-50 border-r border-primary-200 p-6">
          <MiniCalendar
            currentYear={currentYear}
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onMonthChange={handleMonthChange}
            onDateSelect={setSelectedDate}
          />
          <StatsPanel />
        </aside>

        {/* Right panel */}
        <main className="flex-1 p-8 bg-white">
          {/* Date heading */}
          <div className="flex items-baseline gap-3 mb-6">
            <h2 className="font-serif text-2xl font-normal">
              {formatSelectedDate(selectedDate)}
            </h2>
            <span className="text-[13px] text-stone-400">
              {formatDayName(selectedDate)}
            </span>
            <span
              className="ml-auto text-[11px] font-semibold px-3 py-1 rounded-full text-green-50"
              style={{ backgroundColor: "#2D5016" }}
            >
              {RESERVATIONS.length} reservations
            </span>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-primary-200 p-2 overflow-hidden">
            <ReservationTable reservations={RESERVATIONS} />
          </div>
        </main>
      </div>
    </div>
  );
}
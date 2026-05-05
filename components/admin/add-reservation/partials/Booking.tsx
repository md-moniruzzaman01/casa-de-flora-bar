"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Slot } from "../config/types";
import TimeSlotCard from "./Timeslot";
import { buildAvailMap, DAY_NAMES, getDateKey, MONTHS, QUICK_OPTIONS, WEEKDAYS } from "../config/constant";




export default function Booking() {
  const today = useMemo(() => new Date(), []);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<{ year: number; month: number; day: number } | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [activeQuick, setActiveQuick] = useState<string | null>(null);

  const availMap = useMemo(() => buildAvailMap(viewYear, viewMonth), [viewYear, viewMonth]);

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const todayKey = getDateKey(today.getFullYear(), today.getMonth(), today.getDate());
  const selectedKey = selectedDate
    ? getDateKey(selectedDate.year, selectedDate.month, selectedDate.day)
    : null;

  function shiftMonth(delta: number) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m > 11) { m = 0; y++; }
    if (m < 0) { m = 11; y--; }
    setViewMonth(m);
    setViewYear(y);
  }

  function selectDay(year: number, month: number, day: number) {
    setSelectedDate({ year, month, day });
    setSelectedSlot(null);
    setActiveQuick(null);
  }

  function handleQuick(value: string) {
    setActiveQuick(value);
    const d = new Date();
    if (value === "today") {
      selectDay(d.getFullYear(), d.getMonth(), d.getDate());
    } else if (value === "tomorrow") {
      d.setDate(d.getDate() + 1);
      setViewYear(d.getFullYear()); setViewMonth(d.getMonth());
      selectDay(d.getFullYear(), d.getMonth(), d.getDate());
    } else if (value === "weekend") {
      const diff = d.getDay() === 0 ? 6 : 6 - d.getDay();
      d.setDate(d.getDate() + diff);
      setViewYear(d.getFullYear()); setViewMonth(d.getMonth());
      selectDay(d.getFullYear(), d.getMonth(), d.getDate());
    } else if (value === "next7") {
      d.setDate(d.getDate() + 1);
      setViewYear(d.getFullYear()); setViewMonth(d.getMonth());
      selectDay(d.getFullYear(), d.getMonth(), d.getDate());
    }
  }

  function clearSelection() {
    setSelectedDate(null);
    setSelectedSlot(null);
    setActiveQuick(null);
  }

  const slotsForDay = selectedKey ? (availMap[selectedKey] ?? []) : [];
  const morningSlots = slotsForDay.filter(s => s.from.includes("AM"));
  const afternoonSlots = slotsForDay.filter(s => !s.from.includes("AM"));

  const selectedDayLabel = selectedDate
    ? `${DAY_NAMES[new Date(selectedDate.year, selectedDate.month, selectedDate.day).getDay()]}, ${MONTHS[selectedDate.month]} ${selectedDate.day}`
    : null;

  return (
    <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">

      {/* ── Calendar ── */}
      <div>
        {/* Month nav */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-serif text-lg font-normal tracking-tight text-gray-900">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => shiftMonth(-1)}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => shiftMonth(1)}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-1">
          {WEEKDAYS.map(wd => (
            <div key={wd} className="text-center text-[11px] font-medium text-gray-400 py-1 tracking-wide">
              {wd}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-[3px]">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const key = getDateKey(viewYear, viewMonth, day);
            const cellDate = new Date(viewYear, viewMonth, day);
            const isPast = cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const isToday = key === todayKey;
            const isSelected = key === selectedKey;
            const hasAvail = !isPast && !!availMap[key];

            return (
              <div
                key={day}
                onClick={() => !isPast && selectDay(viewYear, viewMonth, day)}
                className={[
                  "relative h-9 flex items-center justify-center text-[13px] rounded-lg transition-colors select-none",
                  isPast
                    ? "text-gray-300 cursor-default"
                    : isSelected
                      ? "bg-pink-500 text-white font-medium cursor-pointer"
                      : isToday
                        ? "text-pink-600 font-medium cursor-pointer hover:bg-pink-50"
                        : "text-gray-800 cursor-pointer hover:bg-gray-50",
                ].join(" ")}
              >
                {day}
                {/* availability dot */}
                {hasAvail && !isSelected && (
                  <span className="absolute top-[5px] right-[6px] w-[4px] h-[4px] rounded-full bg-green-500" />
                )}
                {/* today indicator */}
                {isToday && !isSelected && (
                  <span className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-pink-400" />
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3">
          <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Slots available
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <span className="w-2 h-2 rounded-full bg-pink-500 inline-block" /> Selected
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <span className="w-2 h-2 rounded-full bg-pink-300 inline-block" /> Today
          </span>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-gray-100" />

      {/* ── Quick select ── */}
      <div>
        <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-2">
          Quick select
        </p>
        <div className="flex flex-wrap gap-2">
          {QUICK_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleQuick(opt.value)}
              className={[
                "text-xs px-3 py-1.5 rounded-full border transition-colors",
                activeQuick === opt.value
                  ? "bg-pink-50 border-pink-300 text-pink-800"
                  : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50",
              ].join(" ")}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Time slots ── */}
      {selectedDate && (
        <>
          <div className="border-t border-gray-100" />
          <div className="space-y-4">
            <h3 className="text-base font-medium text-gray-900">{selectedDayLabel}</h3>

            {slotsForDay.length === 0 && (
              <p className="text-sm text-gray-400">No slots available for this date.</p>
            )}

            {morningSlots.length > 0 && (
              <div>
                <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-2">Morning</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {morningSlots.map(slot => (
                    <TimeSlotCard
                      key={slot.from}
                      slot={slot}
                      selected={selectedSlot?.from === slot.from}
                      onSelect={() => setSelectedSlot(slot)}
                    />
                  ))}
                </div>
              </div>
            )}

            {afternoonSlots.length > 0 && (
              <div>
                <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-2">
                  Afternoon &amp; evening
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {afternoonSlots.map(slot => (
                    <TimeSlotCard
                      key={slot.from}
                      slot={slot}
                      selected={selectedSlot?.from === slot.from}
                      onSelect={() => setSelectedSlot(slot)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Summary bar ── */}
      {selectedDate && (
        <div className="flex items-center justify-between bg-pink-50 border border-pink-100 rounded-xl px-4 py-3">
          <div>
            <p className="text-[13px] font-medium text-pink-900">
              {selectedDayLabel}
              {selectedSlot && ` · ${selectedSlot.from} – ${selectedSlot.to}`}
            </p>
            <p className="text-[11px] text-pink-600 mt-0.5">
              {selectedSlot
                ? `${selectedSlot.seats} seats available`
                : "Choose a time slot above"}
            </p>
          </div>
          <button
            onClick={clearSelection}
            className="text-[11px] text-pink-500 underline hover:text-pink-700 transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </section>
  );
}


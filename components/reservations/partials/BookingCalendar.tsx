"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import { Slot, SlotLevel, SelectedDate } from "../config/types";
import TimeSlotCard from "./TimeSlotCard";
import {
  DAY_NAMES,
  getDateKey,
  MONTHS,
  QUICK_OPTIONS,
  WEEKDAYS,
  badgeStyles,
  badgeLabels,
} from "../config/constants";
import { useFormConfig, toWeekday } from "@/lib/formConfig";
import { apiFetch } from "@/lib/api";

interface Props {
  selectedDate: SelectedDate | null;
  selectedSlot: Slot | null;
  onDateSelect: (date: SelectedDate) => void;
  onSlotSelect: (slot: Slot) => void;
  onClearSelection: () => void;
}

function StepLabel({ step, label }: { step: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-serif text-primary text-sm tabular-nums">{step}</span>
      <span className="text-[10px] uppercase tracking-[0.28em] text-gray-500">{label}</span>
    </div>
  );
}

export default function BookingCalendar({
  selectedDate,
  selectedSlot,
  onDateSelect,
  onSlotSelect,
  onClearSelection,
}: Props) {
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [activeQuick, setActiveQuick] = useState<string | null>(null);

  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const { config } = useFormConfig();

  // Check if a calendar cell should show the availability dot
  const isOpenDay = (year: number, month: number, day: number): boolean => {
    if (!config) return false;
    const date = new Date(year, month, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (date < todayStart) return false;
    const maxDate = new Date(todayStart);
    maxDate.setDate(todayStart.getDate() + config.bookingWindowDays);
    if (date > maxDate) return false;
    return config.openDays.includes(toWeekday(year, month, day));
  };

  // Fetch real availability when a date is selected
  useEffect(() => {
    if (!selectedDate) { setSlots([]); return; }
    if (!config) return;

    setSlotsLoading(true);
    const iso = `${selectedDate.year}-${String(selectedDate.month + 1).padStart(2, "0")}-${String(selectedDate.day).padStart(2, "0")}`;
    const weekday = toWeekday(selectedDate.year, selectedDate.month, selectedDate.day);
    const totalPossible = config.slotsByDay[weekday]?.length ?? 0;

    apiFetch<{ data: { from: string; to: string }[] }>(`/api/availability?type=table&date=${iso}`)
      .then((r) => {
        const available = r.data.length;
        const level = (i: number): SlotLevel =>
          available === 1 ? "last"
          : available <= 2 || i >= available - 1 ? "few"
          : available < totalPossible ? "few"
          : "many";

        setSlots(
          r.data.map((s, i) => ({
            from: s.from,
            to: s.to,
            seats: config.maxPartySize,
            level: level(i),
          })),
        );
      })
      .catch(() => setSlots([]))
      .finally(() => setSlotsLoading(false));
  }, [selectedDate, config]);

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
    if (m < 0)  { m = 11; y--; }
    setViewMonth(m);
    setViewYear(y);
  }

  function selectDay(year: number, month: number, day: number) {
    onDateSelect({ year, month, day });
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

  const brunchSlots    = slots.filter((s) => s.from.includes("AM") || s.from.startsWith("12"));
  const afternoonSlots = slots.filter((s) => !s.from.includes("AM") && !s.from.startsWith("12") && parseInt(s.from) < 5);
  const eveningSlots   = slots.filter((s) => !s.from.includes("AM") && parseInt(s.from) >= 5);

  const selectedDayLabel = selectedDate
    ? `${DAY_NAMES[new Date(selectedDate.year, selectedDate.month, selectedDate.day).getDay()]}, ${MONTHS[selectedDate.month]} ${selectedDate.day}`
    : null;

  return (
    <section className="bg-white p-6 sm:p-8 rounded-3xl border border-primary-100 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)] space-y-7">
      {/* Calendar header */}
      <div className="flex items-end justify-between">
        <div>
          <StepLabel step="01" label="Pick a date" />
          <p className="font-serif text-2xl sm:text-3xl text-black mt-2 leading-none">
            {MONTHS[viewMonth]}{" "}
            <span className="text-primary tabular-nums">{viewYear}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => shiftMonth(-1)} aria-label="Previous month"
            className="w-9 h-9 rounded-full border border-primary-100 text-gray-500 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
            <ChevronLeft size={15} />
          </button>
          <button type="button" onClick={() => shiftMonth(1)} aria-label="Next month"
            className="w-9 h-9 rounded-full border border-primary-100 text-gray-500 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div>
        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map((wd) => (
            <div key={wd} className="text-center text-[10px] uppercase tracking-[0.22em] text-gray-400 py-1">
              {wd}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const key = getDateKey(viewYear, viewMonth, day);
            const cellDate = new Date(viewYear, viewMonth, day);
            const isPast = cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const isToday = key === todayKey;
            const isSelected = key === selectedKey;
            const hasAvail = !isPast && isOpenDay(viewYear, viewMonth, day);

            return (
              <button
                key={day}
                type="button"
                onClick={() => !isPast && hasAvail && selectDay(viewYear, viewMonth, day)}
                disabled={isPast || !hasAvail}
                className={[
                  "relative h-10 sm:h-11 flex items-center justify-center text-sm rounded-xl select-none transition-all",
                  isPast || !hasAvail
                    ? "text-gray-300 cursor-not-allowed"
                    : isSelected
                      ? "bg-primary text-white font-medium shadow-sm"
                      : isToday
                        ? "text-primary font-medium hover:bg-primary-100"
                        : "text-gray-800 hover:bg-primary-100/60",
                ].join(" ")}
              >
                <span className="tabular-nums">{day}</span>
                {hasAvail && !isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-primary" />
                )}
                {isToday && !isSelected && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary/40" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend + quick select */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
        <div className="flex items-center gap-4 text-[11px] text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" /> Selected
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleQuick(opt.value)}
              className={[
                "text-[11px] px-3 py-1.5 rounded-full border transition-colors",
                activeQuick === opt.value
                  ? "bg-primary border-primary text-white"
                  : "border-primary-100 text-gray-600 hover:border-primary/50 hover:text-black",
              ].join(" ")}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className="border-t border-primary-100 pt-7 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <StepLabel step="02" label="Pick a time" />
              <h3 className="font-serif text-2xl text-black mt-2 leading-none">{selectedDayLabel}</h3>
            </div>
            <button
              type="button"
              onClick={onClearSelection}
              className="text-[11px] uppercase tracking-[0.22em] text-gray-500 hover:text-primary inline-flex items-center gap-1 transition-colors"
            >
              <X size={13} /> Clear
            </button>
          </div>

          {slotsLoading ? (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Loader2 size={14} className="animate-spin" />
              <span>Checking availability…</span>
            </div>
          ) : slots.length === 0 ? (
            <p className="text-sm text-gray-500 italic">
              No slots available for this date — try another day.
            </p>
          ) : (
            <>
              {brunchSlots.length > 0 && (
                <SlotGroup label="Brunch">
                  {brunchSlots.map((slot) => (
                    <TimeSlotCard key={slot.from} slot={slot}
                      selected={selectedSlot?.from === slot.from}
                      onSelect={() => onSlotSelect(slot)} />
                  ))}
                </SlotGroup>
              )}
              {afternoonSlots.length > 0 && (
                <SlotGroup label="Afternoon">
                  {afternoonSlots.map((slot) => (
                    <TimeSlotCard key={slot.from} slot={slot}
                      selected={selectedSlot?.from === slot.from}
                      onSelect={() => onSlotSelect(slot)} />
                  ))}
                </SlotGroup>
              )}
              {eveningSlots.length > 0 && (
                <SlotGroup label="Evening">
                  {eveningSlots.map((slot) => (
                    <TimeSlotCard key={slot.from} slot={slot}
                      selected={selectedSlot?.from === slot.from}
                      onSelect={() => onSlotSelect(slot)} />
                  ))}
                </SlotGroup>
              )}
            </>
          )}
        </div>
      )}

      {/* Sticky summary bar */}
      {selectedDate && (
        <div className="flex items-center justify-between bg-primary-100 border border-primary/30 rounded-2xl px-5 py-4">
          <div>
            <p className="text-sm font-medium text-black">
              {selectedDayLabel}
              {selectedSlot && ` · ${selectedSlot.from} – ${selectedSlot.to}`}
            </p>
            <p className="text-[11px] text-gray-700 mt-0.5">
              {selectedSlot
                ? `${selectedSlot.seats} seats available — fill in your details →`
                : "Select a time slot above"}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function SlotGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.28em] text-primary mb-3">{label}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">{children}</div>
    </div>
  );
}

// Re-export so tree-shaking doesn't warn about unused imports in this file
export { badgeStyles, badgeLabels };

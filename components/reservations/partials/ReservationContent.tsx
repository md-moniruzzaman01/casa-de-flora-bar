"use client";

import { useState } from "react";
import { Slot, SelectedDate } from "../config/types";
import BookingCalendar from "./BookingCalendar";
import GuestForm from "./GuestForm";

export default function ReservationContent() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  function handleDateSelect(date: SelectedDate) {
    setSelectedDate(date);
    setSelectedSlot(null);
  }

  function handleClear() {
    setSelectedDate(null);
    setSelectedSlot(null);
  }

  return (
    <section
      id="booking"
      className="bg-primary-50/40 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 scroll-mt-24"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-primary mb-3">
            Live Availability
          </p>
          <h2 className="font-serif uppercase leading-[0.95] tracking-tight text-[#222] text-[32px] sm:text-[44px] md:text-[56px]">
            Pick a date · pick a time
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-2">
            <BookingCalendar
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onDateSelect={handleDateSelect}
              onSlotSelect={setSelectedSlot}
              onClearSelection={handleClear}
            />
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <GuestForm
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onClearSelection={handleClear}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

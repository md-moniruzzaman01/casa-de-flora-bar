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
    <section className="bg-gray-50 py-12 px-4 md:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BookingCalendar
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onDateSelect={handleDateSelect}
              onSlotSelect={setSelectedSlot}
              onClearSelection={handleClear}
            />
          </div>

          <div className="lg:col-span-1">
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

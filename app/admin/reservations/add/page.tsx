"use client";

import { useState } from "react";
import Form from "@/components/admin/add-reservation/partials/Form";
import Booking from "@/components/admin/add-reservation/partials/Booking";
import Header from "@/components/admin/add-reservation/partials/Header";
import type { Slot } from "@/components/admin/add-reservation/config/types";

export default function ReservationPage() {
  const [selectedDate, setSelectedDate] = useState<{ year: number; month: number; day: number } | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  function clearSelection() {
    setSelectedDate(null);
    setSelectedSlot(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-serif">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: calendar + time slots */}
        <div className="lg:col-span-2 space-y-6">
          <Header />
          <Booking
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onDateChange={(d) => { setSelectedDate(d); setSelectedSlot(null); }}
            onSlotChange={setSelectedSlot}
          />
        </div>

        {/* Right: guest form */}
        <Form
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          onClearSelection={clearSelection}
        />
      </div>
    </div>
  );
}

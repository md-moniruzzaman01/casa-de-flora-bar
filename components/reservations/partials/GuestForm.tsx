"use client";

import { useForm } from "react-hook-form";
import { X, CalendarDays, Clock } from "lucide-react";
import { DAY_NAMES, MONTHS } from "../config/constants";
import { Slot, SelectedDate } from "../config/types";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  guests: string;
  message: string;
  terms: boolean;
}

interface Props {
  selectedDate: SelectedDate | null;
  selectedSlot: Slot | null;
  onClearSelection: () => void;
}

export default function GuestForm({ selectedDate, selectedSlot, onClearSelection }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({ defaultValues: { guests: "2" } });

  const onSubmit = (_data: FormValues) => {
    reset();
  };

  const dateLabel = selectedDate
    ? `${DAY_NAMES[new Date(selectedDate.year, selectedDate.month, selectedDate.day).getDay()]}, ${MONTHS[selectedDate.month]} ${selectedDate.day}, ${selectedDate.year}`
    : null;

  return (
    <aside className="bg-white rounded-3xl border border-[#FDE8E9] shadow-sm h-fit overflow-hidden">
      {/* Card header */}
      <div className="bg-[#FDF1F5] px-6 pt-8 pb-5 border-b border-[#FDE8E9]">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-2">
          Book Your Seat
        </p>
        <h2 className="font-serif text-2xl font-normal text-gray-900 leading-snug">
          Guest Details
        </h2>
        <p className="font-sans text-xs text-gray-500 mt-1">
          1 hr 30 min · Dine-in
        </p>
      </div>

      <div className="px-6 py-6">
        {/* Selected booking summary */}
        {selectedDate ? (
          <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 mb-6 relative">
            <button
              type="button"
              onClick={onClearSelection}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={14} />
            </button>
            <div className="flex items-start gap-3">
              <CalendarDays size={15} className="text-pink-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-800">{dateLabel}</p>
                {selectedSlot ? (
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1 font-sans">
                    <Clock size={11} />
                    {selectedSlot.from} – {selectedSlot.to} · {selectedSlot.seats} seats left
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 mt-0.5 font-sans">No time slot selected yet</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6 text-center">
            <CalendarDays size={20} className="text-gray-300 mx-auto mb-1" />
            <p className="text-xs text-gray-400 font-sans">Select a date and time slot first</p>
          </div>
        )}

        {/* Success state */}
        {isSubmitSuccessful && (
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-4 text-center">
            <p className="text-sm font-medium text-green-800 font-sans">Reservation submitted!</p>
            <p className="text-xs text-green-600 mt-0.5 font-sans">We&apos;ll confirm your booking via email shortly.</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="font-sans text-xs text-gray-600 block mb-1.5">
              Full Name <span className="text-pink-400">*</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Your full name"
              className={[
                "w-full bg-[#FCF9F9] border px-3.5 py-3 rounded-xl text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#D6768B] transition-colors font-sans",
                errors.name ? "border-red-300" : "border-[#FDE8E9]",
              ].join(" ")}
            />
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-sans text-xs text-gray-600 block mb-1.5">
                Email <span className="text-pink-400">*</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email"
                className={[
                  "w-full bg-[#FCF9F9] border px-3.5 py-3 rounded-xl text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#D6768B] transition-colors font-sans",
                  errors.email ? "border-red-300" : "border-[#FDE8E9]",
                ].join(" ")}
              />
            </div>
            <div>
              <label className="font-sans text-xs text-gray-600 block mb-1.5">Phone</label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="Phone"
                className="w-full bg-[#FCF9F9] border border-[#FDE8E9] px-3.5 py-3 rounded-xl text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#D6768B] transition-colors font-sans"
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="font-sans text-xs text-gray-600 block mb-1.5">Number of Guests</label>
            <div className="relative">
              <select
                {...register("guests")}
                className="w-full bg-[#FCF9F9] border border-[#FDE8E9] px-3.5 py-3 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-[#D6768B] transition-colors appearance-none cursor-pointer font-sans"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <option key={n} value={String(n)}>
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="font-sans text-xs text-gray-600 block mb-1.5">
              Special Requests <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              {...register("message")}
              rows={3}
              placeholder="Allergies, celebrations, seating preferences..."
              className="w-full bg-[#FCF9F9] border border-[#FDE8E9] px-3.5 py-3 rounded-xl text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#D6768B] transition-colors resize-none font-sans"
            />
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              {...register("terms", { required: true })}
              type="checkbox"
              className="mt-0.5 accent-black"
            />
            <span className="font-sans text-[11px] text-gray-500 leading-relaxed">
              By checking, you agree to our{" "}
              <span className="underline text-gray-700">Terms of Service</span>{" "}
              &amp;{" "}
              <span className="underline text-gray-700">Privacy Policy</span>
            </span>
          </label>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl font-sans text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-gray-800 active:scale-[0.98] transition-all mt-2"
          >
            Confirm Reservation
          </button>
        </form>
      </div>
    </aside>
  );
}

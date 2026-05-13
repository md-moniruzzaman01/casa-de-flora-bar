"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, CalendarDays, Clock, Loader2, Check, AlertCircle } from "lucide-react";
import type { Slot } from "../config/types";
import { DAY_NAMES, MONTHS } from "../config/constant";
import { api, type ApiError } from "@/lib/api";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  guests: string;
  message: string;
  terms: boolean;
}

interface Props {
  selectedDate: { year: number; month: number; day: number } | null;
  selectedSlot: Slot | null;
  onClearSelection: () => void;
}

function to24h(time12: string): string {
  const [time, period] = time12.trim().split(/\s+/);
  const [hStr, mStr] = time.split(":");
  let hour = parseInt(hStr, 10);
  const minute = parseInt(mStr, 10);
  if (period?.toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (period?.toUpperCase() === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function dateToIso(d: { year: number; month: number; day: number }): string {
  return `${d.year}-${String(d.month + 1).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
}

function isApiError(e: unknown): e is ApiError {
  return typeof e === "object" && e !== null && "status" in e && "message" in e;
}

const inp =
  "w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-1 focus:ring-pink-300 text-sm placeholder:text-gray-400 transition-colors";

export default function Form({ selectedDate, selectedSlot, onClearSelection }: Props) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({
    defaultValues: { guests: "2" },
    mode: "onBlur",
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    if (!selectedDate || !selectedSlot) {
      setSubmitError("Please select a date and time slot.");
      return;
    }
    try {
      await api.post("/api/table-bookings", {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        guests: parseInt(data.guests, 10),
        date: dateToIso(selectedDate),
        timeSlot: to24h(selectedSlot.from),
        ...(data.message?.trim() ? { specialRequests: data.message.trim() } : {}),
      });
      reset({ guests: "2" } as FormValues);
      onClearSelection();
    } catch (err) {
      if (isApiError(err)) {
        setSubmitError(err.errors?.[0]?.message ?? err.message);
      } else if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    }
  };

  const dateLabel = selectedDate
    ? `${DAY_NAMES[new Date(selectedDate.year, selectedDate.month, selectedDate.day).getDay()]}, ${MONTHS[selectedDate.month]} ${selectedDate.day}, ${selectedDate.year}`
    : null;

  return (
    <aside className="animate-card bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
      <div className="mb-6">
        <h2 className="text-lg font-medium">Regular Reservations</h2>
        <p className="text-sm text-gray-500">1 hour 30 minutes</p>
      </div>

      {/* Booking summary */}
      {selectedDate ? (
        <div className="bg-pink-50 border border-pink-100 p-4 rounded-lg relative mb-6">
          <button
            type="button"
            onClick={onClearSelection}
            aria-label="Clear selection"
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
          <div className="flex items-start gap-2">
            <CalendarDays size={15} className="text-pink-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-700">{dateLabel}</p>
              {selectedSlot ? (
                <p className="text-sm mt-1 flex items-center gap-1.5">
                  <Clock size={11} className="text-pink-500" />
                  {selectedSlot.from} – {selectedSlot.to} · {selectedSlot.seats} seats
                </p>
              ) : (
                <p className="text-xs italic text-gray-500 mt-1">Pick a time slot →</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-lg p-4 mb-6 text-center">
          <CalendarDays size={18} className="text-gray-300 mx-auto mb-1.5" />
          <p className="text-xs text-gray-400">Select a date and time slot first.</p>
        </div>
      )}

      {/* Success */}
      {isSubmitSuccessful ? (
        <div className="text-center py-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-3">
            <Check size={22} />
          </div>
          <h3 className="text-base font-medium text-gray-900 mb-1">Reservation added!</h3>
          <p className="text-sm text-gray-500">A confirmation has been sent to the guest.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Name */}
          <div>
            <label className="text-sm text-gray-600 block mb-1">Name (required)</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className={inp}
              placeholder="Full name"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Email (required)</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
                })}
                type="email"
                className={inp}
                placeholder="Email"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Phone (required)</label>
              <input
                {...register("phone", { required: "Phone is required" })}
                type="tel"
                className={inp}
                placeholder="Phone"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="text-sm text-gray-600 block mb-1">Number of Guests</label>
            <select {...register("guests")} className={`${inp} cursor-pointer bg-white`}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={String(n)}>
                  {n} {n === 1 ? "Person" : "Persons"}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="text-sm text-gray-600 block mb-1">Message (Optional)</label>
            <textarea
              {...register("message")}
              className={`${inp} h-24 resize-none`}
              placeholder="Special requests, allergies, occasions…"
            />
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 cursor-pointer mt-4">
            <input
              {...register("terms", { required: "Please accept the terms to continue" })}
              type="checkbox"
              className="mt-1 accent-black"
            />
            <span className="text-xs text-gray-600 leading-tight">
              By checking, you accept{" "}
              <span className="underline">Terms of Service</span> &amp;{" "}
              <span className="underline">Privacy Policy</span>
            </span>
          </label>
          {errors.terms && (
            <p className="mt-1 text-xs text-red-500">{errors.terms.message}</p>
          )}

          {submitError && (
            <div
              role="alert"
              className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded p-3"
            >
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !selectedSlot}
            className="w-full bg-black text-white py-4 mt-2 uppercase tracking-widest font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Saving…</span>
              </>
            ) : !selectedSlot ? (
              "Pick a time first"
            ) : (
              "Submit"
            )}
          </button>
        </form>
      )}
    </aside>
  );
}

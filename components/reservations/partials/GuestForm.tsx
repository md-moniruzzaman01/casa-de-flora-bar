"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  X,
  CalendarDays,
  Clock,
  Loader2,
  Check,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { DAY_NAMES, MONTHS } from "../config/constants";
import { Slot, SelectedDate } from "../config/types";
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
  selectedDate: SelectedDate | null;
  selectedSlot: Slot | null;
  onClearSelection: () => void;
}

// "10:00 AM" → "10:00", "1:00 PM" → "13:00", "12:00 AM" → "00:00"
function to24h(time12: string): string {
  const [time, period] = time12.trim().split(/\s+/);
  const [hStr, mStr] = time.split(":");
  let hour = parseInt(hStr, 10);
  const minute = parseInt(mStr, 10);
  if (period?.toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (period?.toUpperCase() === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function dateToIso(d: SelectedDate): string {
  return `${d.year}-${String(d.month + 1).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
}

function isApiError(e: unknown): e is ApiError {
  return typeof e === "object" && e !== null && "status" in e && "message" in e;
}

const inputBase =
  "w-full bg-white border border-primary-100 rounded-xl px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors";

function StepLabel({ step, label }: { step: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-serif text-primary text-sm tabular-nums">
        {step}
      </span>
      <span className="text-[10px] uppercase tracking-[0.28em] text-gray-500">
        {label}
      </span>
    </div>
  );
}

export default function GuestForm({
  selectedDate,
  selectedSlot,
  onClearSelection,
}: Props) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

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
      const res = await api.post<{ data: unknown; checkoutUrl: string | null }>(
        "/api/table-bookings",
        {
          name:    data.name.trim(),
          email:   data.email.trim(),
          phone:   data.phone.trim(),
          guests:  parseInt(data.guests, 10),
          date:    dateToIso(selectedDate),
          timeSlot: to24h(selectedSlot.from),
          ...(data.message?.trim() ? { specialRequests: data.message.trim() } : {}),
        },
      );
      setCheckoutUrl(res.checkoutUrl);
      reset({ guests: "2" } as FormValues);
      console.log("reserve",res)
    } catch (err) {
       console.log("reserve error",err)
      if (isApiError(err)) {
        const fieldMsg = err.errors?.[0]?.message;
        setSubmitError(fieldMsg ?? err.message);
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
    <aside className="bg-white rounded-3xl border border-primary-100 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)] h-fit overflow-hidden">
      {/* Card header */}
      <div className="bg-primary-100 px-7 pt-8 pb-5 border-b border-primary/15 relative overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/15"
        />
        <p className="text-[10px] uppercase tracking-[0.32em] text-primary mb-2 relative">
          Step 03 · Your details
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl text-black leading-snug relative">
          Confirm your seat
        </h2>
        <p className="text-xs text-gray-700 mt-2 relative">
          1 hr 30 min · Dine-in · Free cancellation up to 24 h
        </p>
      </div>

      <div className="px-7 py-7">
        {/* Selected booking summary */}
        {selectedDate ? (
          <div className="bg-primary-50/60 border border-primary-100 rounded-2xl p-4 mb-6 relative">
            <button
              type="button"
              onClick={onClearSelection}
              aria-label="Clear selection"
              className="absolute top-3 right-3 text-gray-400 hover:text-primary transition-colors"
            >
              <X size={14} />
            </button>
            <div className="flex items-start gap-3">
              <CalendarDays size={15} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-black">{dateLabel}</p>
                {selectedSlot ? (
                  <p className="text-xs text-gray-600 mt-1 flex items-center gap-1.5">
                    <Clock size={11} className="text-primary" />
                    {selectedSlot.from} – {selectedSlot.to} ·{" "}
                    {selectedSlot.seats} seats left
                  </p>
                ) : (
                  <p className="text-xs italic text-gray-500 mt-1">
                    Pick a time slot to continue →
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-primary-50/40 border border-dashed border-primary-100 rounded-2xl p-5 mb-6 text-center">
            <CalendarDays size={20} className="text-primary/60 mx-auto mb-2" />
            <p className="text-xs text-gray-500">
              Select a date and time slot first to begin.
            </p>
          </div>
        )}

        {/* Success + payment step */}
        {isSubmitSuccessful ? (
          <PaymentStep checkoutUrl={checkoutUrl} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <StepLabel step="" label="" />

            {/* Name */}
            <Field label="Full name" error={errors.name?.message}>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Your full name"
                className={inputBase}
              />
            </Field>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Email" error={errors.email?.message}>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  type="email"
                  placeholder="you@email.com"
                  className={inputBase}
                />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <input
                  {...register("phone", { required: "Phone is required" })}
                  type="tel"
                  placeholder="+1 (000) 000-0000"
                  className={inputBase}
                />
              </Field>
            </div>

            {/* Guests */}
            <Field label="Number of guests">
              <div className="relative">
                <select
                  {...register("guests")}
                  className={`${inputBase} appearance-none cursor-pointer pr-10`}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={String(n)}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 4l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </Field>

            {/* Message */}
            <Field
              label="Special requests"
              hint="Allergies, celebrations, seating preferences"
            >
              <textarea
                {...register("message")}
                rows={3}
                placeholder="Optional"
                className={`${inputBase} resize-none`}
              />
            </Field>

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer pt-1">
              <input
                {...register("terms", {
                  required: "Please accept the terms to continue",
                })}
                type="checkbox"
                className="mt-0.5 accent-primary"
              />
              <span className="text-[11px] text-gray-600 leading-relaxed">
                By checking, you agree to our{" "}
                <span className="underline text-gray-800">Terms of Service</span>{" "}
                &amp;{" "}
                <span className="underline text-gray-800">Privacy Policy</span>
              </span>
            </label>
            {errors.terms && (
              <p className="text-[11px] text-red-600 -mt-2">
                {errors.terms.message}
              </p>
            )}

            {submitError && (
              <div
                role="alert"
                className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl p-3"
              >
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !selectedSlot}
              className="w-full bg-black text-white py-4 rounded-xl text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Confirming…</span>
                </>
              ) : !selectedSlot ? (
                "Pick a time first"
              ) : (
                "Confirm Reservation"
              )}
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.22em] text-gray-600 mb-1.5">
        {label}{" "}
        {hint && (
          <span className="normal-case tracking-normal text-gray-400 text-[10px] ml-1">
            ({hint})
          </span>
        )}
      </label>
      {children}
      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </div>
  );
}

function PaymentStep({ checkoutUrl }: { checkoutUrl: string | null }) {
  useEffect(() => {
    if (checkoutUrl) {
      const t = setTimeout(() => { window.location.href = checkoutUrl; }, 2000);
      return () => clearTimeout(t);
    }
  }, [checkoutUrl]);

  return (
    <div className="py-4">
      {/* Step 1 */}
      <div className="flex items-start gap-3 mb-5">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
            <Check size={14} />
          </div>
          <div className="w-px flex-1 bg-primary-100 my-1.5" style={{ minHeight: 24 }} />
        </div>
        <div className="pt-1.5 pb-4">
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary mb-0.5">Step 1 · Done</p>
          <p className="text-sm font-medium text-black">Reservation received</p>
          <p className="text-xs text-gray-500 mt-0.5">A confirmation email is on its way.</p>
        </div>
      </div>

      {/* Step 2 */}
      <div className="flex items-start gap-3 mb-7">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold ${
          checkoutUrl ? "border-2 border-primary text-primary" : "bg-primary-100 text-primary"
        }`}>
          {checkoutUrl ? "2" : <Loader2 size={13} className="animate-spin" />}
        </div>
        <div className="pt-1.5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary mb-0.5">Step 2 · Required</p>
          <p className="text-sm font-medium text-black">
            {checkoutUrl ? "Redirecting to payment…" : "Preparing your checkout…"}
          </p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Your table is held. Pay the advance deposit to fully confirm.
          </p>
        </div>
      </div>

      {checkoutUrl ? (
        <a
          href={checkoutUrl}
          className="flex items-center justify-center gap-2 w-full bg-black text-white py-4 rounded-xl text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-primary transition-all"
        >
          <ExternalLink size={14} />
          Pay Deposit Now
        </a>
      ) : (
        <div className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-500 py-4 rounded-xl text-[11px] uppercase tracking-[0.18em]">
          <Loader2 size={14} className="animate-spin" />
          Setting up payment…
        </div>
      )}
      <p className="text-center text-[10px] text-gray-400 mt-3">Secure checkout via Square</p>
    </div>
  );
}

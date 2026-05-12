"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { useFormConfig, toWeekday } from "@/lib/formConfig";
import { api, type ApiError } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

type FormValues = {
  fullName: string;
  phone: string;
  email: string;
  guests: string;
  date: string;
  timeSlot: string;
  bouquetType: string;
  quantity: string;
  cardMessage: string;
  specialRequests: string;
  terms: boolean;
};

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

function Field({ label, error, children, className = "" }: FieldProps) {
  return (
    <div className={`group relative ${className}`}>
      <label className="block text-[9px] tracking-[0.28em] uppercase text-[#d4607e] mb-2 font-light">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-[10px] tracking-wide text-[#d4607e] opacity-80">{error}</p>
      )}
    </div>
  );
}

const inputBase =
  "w-full bg-transparent border-0 border-b border-[#f2b8c6] pb-3 pt-1 text-[13px] font-light text-[#0e0b0b] placeholder:text-[#c9a0ac] focus:outline-none focus:border-[#d4607e] transition-colors duration-300";

// "10:00 AM" → "10:00", "1:00 PM" → "13:00"
function to24h(time12: string): string {
  const [time, period] = time12.trim().split(/\s+/);
  const [hStr, mStr] = time.split(":");
  let hour = parseInt(hStr, 10);
  const minute = parseInt(mStr, 10);
  if (period?.toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (period?.toUpperCase() === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function formatLabel(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function isApiError(e: unknown): e is ApiError {
  return typeof e === "object" && e !== null && "status" in e && "message" in e;
}

// Minimum selectable date: today in YYYY-MM-DD
function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function BouquetReservationForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { config } = useFormConfig();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({ mode: "onBlur", defaultValues: { guests: "1", quantity: "1" } });

  const selectedDate = watch("date");

  // Derive available slots for the selected date's weekday
  const slotsForDate = (() => {
    if (!config || !selectedDate) return config?.slotsByDay[Object.keys(config.slotsByDay)[0]] ?? [];
    const [y, mo, d] = selectedDate.split("-").map(Number);
    const weekday = toWeekday(y, mo - 1, d);
    return config.slotsByDay[weekday] ?? [];
  })();

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, { x: -60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      if (formRef.current) {
        gsap.fromTo(formRef.current.querySelectorAll(".form-field"), { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    try {
      await api.post("/api/table-bookings", {
        name: data.fullName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        guests: parseInt(data.guests, 10),
        date: data.date,
        timeSlot: to24h(data.timeSlot),
        ...(data.specialRequests?.trim() ? { specialRequests: data.specialRequests.trim() } : {}),
        bouquets: [{
          bouquetType: data.bouquetType,
          quantity: parseInt(data.quantity, 10),
          ...(data.cardMessage?.trim() ? { cardMessage: data.cardMessage.trim() } : {}),
        }],
      });
      reset({ guests: "1", quantity: "1" });
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

  const maxGuests = config?.maxPartySize ?? 12;

  return (
    <section ref={sectionRef} id="reservation" className="w-full px-6 py-24 md:px-16 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-start">

        {/* Left Panel */}
        <div ref={leftRef} className="lg:sticky lg:top-32">
          <p className="text-[9px] tracking-[0.4em] uppercase text-primary mb-4 font-light">Reserve With Us</p>
          <h2 className="text-6xl mb-8 font-display">
            Bouquet<br />
            <em className="text-primary">Reservation</em>
          </h2>
          <p className="text-[12px] leading-[1.9] mb-10 max-w-xs font-light tracking-wide">
            Fill in your details and we&apos;ll confirm your table. Flower tickets must be purchased at least{" "}
            <strong className="font-normal text-primary">
              {config ? `${config.cancelNoticeHours} hours` : "24 hours"} in advance
            </strong>{" "}
            and are non-refundable.
          </p>
          <div className="mt-14 w-px h-24 bg-[#f2b8c6] ml-1 hidden lg:block" />
        </div>

        {/* Form */}
        {isSubmitSuccessful ? (
          <SuccessState />
        ) : (
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8" noValidate>

            <Field label="First & Last Name *" error={errors.fullName?.message} className="form-field">
              <input {...register("fullName", { required: "Name is required" })}
                placeholder="Your full name" className={inputBase} />
            </Field>

            <Field label="Phone" error={errors.phone?.message} className="form-field">
              <input {...register("phone")} type="tel" placeholder="+1 (000) 000-0000" className={inputBase} />
            </Field>

            <Field label="Email *" error={errors.email?.message} className="form-field">
              <input {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
              })} type="email" placeholder="your@email.com" className={inputBase} />
            </Field>

            <Field label="Guests" className="form-field">
              <select {...register("guests")} className={`${inputBase} cursor-pointer appearance-none`}>
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={String(n)}>{n} {n === 1 ? "Person" : "People"}</option>
                ))}
              </select>
            </Field>

            <Field label="Preferred Date *" error={errors.date?.message} className="form-field">
              <input {...register("date", { required: "Date is required" })}
                type="date" min={todayIso()} className={inputBase} />
            </Field>

            <Field label="Preferred Time *" error={errors.timeSlot?.message} className="form-field">
              <select {...register("timeSlot", { required: "Please select a time" })}
                className={`${inputBase} cursor-pointer appearance-none`}
                defaultValue="">
                <option value="" disabled>
                  {slotsForDate.length === 0 ? "Closed this day" : "Select a time"}
                </option>
                {slotsForDate.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </Field>

            <Field label="Bouquet Type" className="form-field">
              <select {...register("bouquetType")} className={`${inputBase} cursor-pointer appearance-none`}>
                {(config?.bouquetTypes ?? ["CUSTOM"]).map((t) => (
                  <option key={t} value={t}>{formatLabel(t)}</option>
                ))}
              </select>
            </Field>

            <Field label="Quantity" className="form-field">
              <select {...register("quantity")} className={`${inputBase} cursor-pointer appearance-none`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={String(n)}>{n}</option>
                ))}
              </select>
            </Field>

            <Field label="Card Message" className="form-field">
              <input {...register("cardMessage")} placeholder="Optional gift message" className={inputBase} />
            </Field>

            <Field label="Special Requests" className="form-field">
              <input {...register("specialRequests")}
                placeholder="Allergies, occasion details…" className={inputBase} />
            </Field>

            {/* Terms */}
            <div className="form-field sm:col-span-2 flex items-start gap-3 mt-1">
              <input {...register("terms", { required: "You must accept the terms" })}
                type="checkbox" id="bouquet-terms"
                className="mt-0.5 shrink-0 accent-[#d4607e] w-3.5 h-3.5 cursor-pointer" />
              <label htmlFor="bouquet-terms" className="text-[11px] leading-[1.7] text-[#5a3f3f] cursor-pointer">
                By checking, you agree to our{" "}
                <a href="/terms" className="text-[#d4607e] hover:text-[#8b2a44] transition-colors">Terms of Service</a>
                {" "}&{" "}
                <a href="/privacy" className="text-[#d4607e] hover:text-[#8b2a44] transition-colors">Privacy Policy</a>.
              </label>
            </div>
            {errors.terms && (
              <p className="text-[10px] text-[#d4607e] -mt-6 sm:col-span-2">{errors.terms.message}</p>
            )}

            {submitError && (
              <div role="alert"
                className="sm:col-span-2 flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl p-3">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="form-field sm:col-span-2 mt-4">
              <SubmitButton isSubmitting={isSubmitting} />
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <button ref={btnRef} type="submit" disabled={isSubmitting}
      onMouseEnter={() => gsap.to(btnRef.current, { backgroundColor: "#8b2a44", duration: 0.3 })}
      onMouseLeave={() => gsap.to(btnRef.current, { backgroundColor: "#0e0b0b", duration: 0.3 })}
      className="w-full sm:w-auto bg-[#0e0b0b] text-[#fdf8f5] px-12 py-5 text-[10px] tracking-[0.3em] uppercase font-light disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-4">
      {isSubmitting ? (
        <><Loader2 size={14} className="animate-spin" /> Submitting…</>
      ) : (
        <>Submit Reservation <span className="text-base leading-none">→</span></>
      )}
    </button>
  );
}

function SuccessState() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
  }, []);
  return (
    <div ref={ref} className="flex flex-col justify-center py-24 lg:py-0 lg:min-h-150">
      <div className="w-px h-16 bg-[#f2b8c6] mb-10" />
      <div className="w-14 h-14 rounded-full bg-[#d4607e] text-white flex items-center justify-center mb-6">
        <Check size={26} />
      </div>
      <p className="text-[9px] tracking-[0.4em] uppercase text-[#d4607e] mb-4 font-light">Confirmed</p>
      <h3 className="font-serif text-[clamp(32px,4vw,50px)] font-light leading-tight text-[#0e0b0b] mb-6">
        Your bouquet is<br /><em className="italic text-[#d4607e]">reserved.</em>
      </h3>
      <p className="text-[12px] leading-[1.9] text-[#5a3f3f] max-w-sm font-light tracking-wide">
        We&apos;ll be in touch shortly to confirm the details. Don&apos;t forget — flower tickets must be purchased in advance.
      </p>
    </div>
  );
}

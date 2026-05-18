"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Minus,
  Plus,
  Sparkles,
  Flower2,
  Utensils,
  Camera,
  Music,
  ShieldCheck,
  Check,
  ExternalLink,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useContent } from "@/lib/ContentProvider";
import { api, type ApiError } from "@/lib/api";

function to24h(time12: string): string {
  const [time, period] = time12.trim().split(/\s+/);
  const [hStr, mStr] = time.split(":");
  let hour = parseInt(hStr, 10);
  const minute = parseInt(mStr, 10);
  if (period?.toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (period?.toUpperCase() === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function addHours(hhmm: string, hours: number): string {
  const [h, m] = hhmm.split(":").map(Number);
  const totalMin = h * 60 + m + Math.round(hours * 60);
  const newH = Math.floor(totalMin / 60) % 24;
  const newM = totalMin % 60;
  return `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}`;
}

function isApiError(e: unknown): e is ApiError {
  return typeof e === "object" && e !== null && "status" in e && "message" in e;
}

const includedIcons = [Flower2, Sparkles, Utensils, Camera, Music];

const SPOTS_LOW_THRESHOLD = 5;

type FormValues = {
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

export default function BookingSection() {
  const { about, pricing, sessions } = useContent().summerEvents;
  const sessionList = sessions ?? [];

  const [activeSession, setActiveSession] = useState(0);
  const [activeTime, setActiveTime] = useState(
    pricing.booking.times[1] ?? pricing.booking.times[0],
  );
  const [guests, setGuests] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({ mode: "onBlur" });

  const pricePerPerson = parseInt(pricing.price.replace("$", ""));
  const subtotal = pricePerPerson * guests;
  const serviceFee = 0;
  const total = subtotal + serviceFee;

  const session = sessionList[activeSession];
  const claimed = session ? session.capacity - session.spots : 0;
  const fillPercent = session
    ? Math.round((claimed / session.capacity) * 100)
    : 0;

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    try {
      const startTime = to24h(activeTime);
      const res = await api.post<{ data: unknown; checkoutUrl: string | null }>("/api/event-bookings", {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        eventType: "ENRICHMENT",
        guests,
        date: session?.isoDate ?? "",
        startTime,
        endTime: addHours(startTime, 3.5),
        cateringRequired: true,
        ...(data.notes?.trim() ? { specialRequests: data.notes.trim() } : {}),
      });
      setCheckoutUrl(res.checkoutUrl);
      reset();
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

  return (
    <section
      id="booking"
      className="bg-white px-6 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-24 md:py-28 lg:py-32"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
        {/* ── LEFT: About + Included + Host note ── */}
        <div className="flex-1 w-full space-y-12 sm:space-y-14">
          {/* About */}
          <div id="about" className="max-w-xl">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-primary mb-3 sm:mb-4">
              The Experience
            </p>
            <h2 className="font-serif leading-[1.05] tracking-tight text-black">
              <span className="block text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px]">
                {about.title}
              </span>
              <span className="block italic font-light text-primary text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px] -mt-1">
                {about.titleHighlight}
              </span>
            </h2>

            <div className="h-[1px] w-16 bg-primary mt-5 sm:mt-6 mb-6 sm:mb-7" />

            <p className="text-gray-700 text-base sm:text-lg font-light leading-relaxed">
              {about.description}
            </p>
          </div>

          {/* What's Included */}
          <div>
            <div className="flex items-baseline justify-between mb-6 sm:mb-8">
              <h3 className="font-serif italic text-2xl sm:text-3xl text-black">
                {about.whatsIncluded.title}
              </h3>
              <span className="text-[10px] uppercase tracking-[0.28em] text-gray-500">
                {about.whatsIncluded.items.length} elements
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {about.whatsIncluded.items.map((item, idx) => {
                const Icon = includedIcons[idx % includedIcons.length];
                return (
                  <div
                    key={item.title}
                    className="flex gap-4 p-4 sm:p-5 rounded-2xl border border-primary-100 bg-white hover:border-primary/40 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary-100 flex items-center justify-center text-primary">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-black text-sm sm:text-base leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-gray-600 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-3 text-xs sm:text-sm text-gray-600">
              <ShieldCheck size={16} className="text-primary shrink-0" />
              <span>
                Small intimate group · personal attention from the host
              </span>
            </div>
          </div>

          {/* Note from the host */}
          <aside className="relative bg-primary-50/60 border border-primary-100 rounded-3xl p-6 sm:p-8 overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10"
            />
            <div className="relative flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                <Image
                  src="/about/owner.jpg"
                  alt="Maritza, founder of Casa de Flora Bar"
                  fill
                  className="object-cover object-top"
                  sizes="80px"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.32em] text-primary mb-2">
                  A note from the host
                </p>
                <blockquote className="font-serif italic text-base sm:text-lg text-[#222] leading-snug mb-3">
                  &ldquo;I built this evening for the friends I wish I&apos;d
                  had on my hardest weeks. Bring yours — we&apos;ll handle the
                  rest.&rdquo;
                </blockquote>
                <Link
                  href="/about"
                  className="text-[11px] uppercase tracking-[0.24em] text-primary hover:text-black transition-colors"
                >
                  Read Maritza&apos;s story →
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* ── RIGHT: Booking card ── */}
        <div className="w-full lg:w-[460px] xl:w-[500px] lg:sticky lg:top-10 flex-shrink-0">
          <div className="rounded-[28px] border border-primary-100 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)] overflow-hidden bg-white">
            {/* Price header */}
            <div className="bg-primary-100 px-7 sm:px-8 py-7 sm:py-9 relative overflow-hidden">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-serif text-black tabular-nums">
                  {pricing.price}
                </span>
                <span className="text-gray-700 text-sm sm:text-base">
                  / {pricing.unit}
                </span>
              </div>
              <p className="text-gray-700 mt-1 text-sm">{pricing.subtext}</p>
              <span
                aria-hidden="true"
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/15"
              />
            </div>

            {isSubmitSuccessful ? (
              <SuccessState session={session} time={activeTime} guests={guests} checkoutUrl={checkoutUrl} />
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 sm:p-8 space-y-7"
                noValidate
              >
                {/* Sessions */}
                <Group label={pricing.booking.calendarLabel} step="01">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {sessionList.map((s, i) => {
                      const isActive = activeSession === i;
                      const isLow = s.spots <= SPOTS_LOW_THRESHOLD;
                      return (
                        <button
                          key={s.date}
                          type="button"
                          onClick={() => setActiveSession(i)}
                          className={`relative rounded-xl py-3 px-2 text-center transition-all border ${
                            isActive
                              ? "bg-primary border-primary text-white shadow-sm"
                              : "bg-white border-primary-100 hover:border-primary/40"
                          }`}
                        >
                          <p
                            className={`text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-bold ${
                              isActive ? "text-white/85" : "text-primary"
                            }`}
                          >
                            {s.date}
                          </p>
                          <p
                            className={`text-xs sm:text-sm font-semibold mt-0.5 ${
                              isActive ? "text-white" : "text-gray-700"
                            }`}
                          >
                            {s.day}
                          </p>
                          <p
                            className={`text-[9px] mt-1.5 tracking-wide ${
                              isActive
                                ? "text-white/85"
                                : isLow
                                  ? "text-primary"
                                  : "text-gray-500"
                            }`}
                          >
                            {s.spots} {isLow ? "spots left" : "spots"}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Spots-claimed progress bar */}
                  {session && (
                    <div className="mt-4">
                      <div className="flex justify-between text-[10px] uppercase tracking-[0.22em] text-gray-500 mb-1.5">
                        <span>
                          {claimed} of {session.capacity} claimed
                        </span>
                        <span className="text-primary tabular-nums">
                          {fillPercent}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-primary-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${fillPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </Group>

                {/* Times */}
                <Group label={pricing.booking.timeLabel} step="02">
                  <div className="flex flex-wrap gap-2">
                    {pricing.booking.times.map((time) => {
                      const isActive = activeTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setActiveTime(time)}
                          className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all border ${
                            isActive
                              ? "bg-primary border-primary text-white"
                              : "border-primary-100 text-gray-600 hover:border-primary/50"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </Group>

                {/* Guests */}
                <Group label={pricing.booking.guestLabel} step="03">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">
                      Up to 6 per booking
                    </span>
                    <div className="flex items-center border border-primary-100 rounded-full overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        aria-label="Decrease guests"
                        disabled={guests <= 1}
                        className="p-2.5 sm:p-3 hover:bg-primary-50 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 sm:px-5 py-1 text-sm font-semibold text-black min-w-[36px] sm:min-w-[40px] text-center tabular-nums">
                        {guests}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuests(Math.min(6, guests + 1))}
                        aria-label="Increase guests"
                        disabled={guests >= 6}
                        className="p-2.5 sm:p-3 hover:bg-primary-50 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </Group>

                {/* Your details */}
                <Group label="Your details" step="04">
                  <div className="space-y-4">
                    <Field
                      label="Full name"
                      error={errors.name?.message}
                    >
                      <input
                        {...register("name", {
                          required: "Name is required",
                        })}
                        type="text"
                        placeholder="Your full name"
                        className={inputBase}
                      />
                    </Field>

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
                        {...register("phone", {
                          required: "Phone is required",
                        })}
                        type="tel"
                        placeholder="+1 (000) 000-0000"
                        className={inputBase}
                      />
                    </Field>

                    <Field label="Dietary or special requests (optional)">
                      <textarea
                        {...register("notes")}
                        rows={3}
                        placeholder="Allergies, accessibility, occasion details…"
                        className={`${inputBase} resize-none`}
                      />
                    </Field>
                  </div>
                </Group>

                {/* Summary */}
                <div className="space-y-3 pt-5 border-t border-primary-100/60">
                  <div className="flex justify-between text-gray-600 text-xs sm:text-sm">
                    <span>
                      {pricing.price} × {guests} Guest
                      {guests > 1 ? "s" : ""}
                    </span>
                    <span className="font-semibold text-black tabular-nums">
                      ${subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-xs sm:text-sm">
                    <span>{pricing.booking.summary.serviceFeeLabel}</span>
                    <span className="font-semibold text-black tabular-nums">
                      ${serviceFee}
                    </span>
                  </div>
                  <div className="flex justify-between text-black pt-4 border-t border-primary-100 font-serif text-lg sm:text-xl">
                    <span>{pricing.booking.summary.totalLabel}</span>
                    <span className="tabular-nums">${total}</span>
                  </div>
                </div>

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
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-4 sm:py-5 text-xs sm:text-sm uppercase tracking-widest border border-black hover:bg-primary hover:border-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Securing your seat…</span>
                    </>
                  ) : (
                    pricing.booking.buttonText
                  )}
                </button>

                <p className="text-[10px] sm:text-[11px] text-center text-gray-500 uppercase tracking-widest leading-relaxed">
                  $50 deposit secures your seat
                  <br />
                  Free reschedule up to 48h before
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Subcomponents ────────────────────────────────────────────────────────────

const inputBase =
  "w-full bg-white border border-primary-100 rounded-xl px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors";

function Group({
  label,
  step,
  children,
}: {
  label: string;
  step: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-serif text-primary text-sm tabular-nums">
          {step}
        </span>
        <span className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-[0.2em]">
          {label}
        </span>
        <span className="flex-1 border-b border-dotted border-primary-100 translate-y-[-3px]" />
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.22em] text-gray-600 mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-[11px] text-red-600">{error}</p>
      )}
    </div>
  );
}

function SuccessState({
  session,
  time,
  guests,
  checkoutUrl,
}: {
  session?: { date: string; day: string };
  time?: string;
  guests: number;
  checkoutUrl: string | null;
}) {
  useEffect(() => {
    if (checkoutUrl) {
      const t = setTimeout(() => { window.location.href = checkoutUrl; }, 2000);
      return () => clearTimeout(t);
    }
  }, [checkoutUrl]);

  return (
    <div className="p-8 sm:p-10">
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
          {session && time && (
            <p className="text-xs text-gray-500 mt-0.5">
              {session.day}, {session.date} at {time} · {guests} {guests > 1 ? "guests" : "guest"}
            </p>
          )}
        </div>
      </div>

      {/* Step 2 */}
      <div className="flex items-start gap-3 mb-6">
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
            A $150 deposit secures your spot. Pay now to confirm.
          </p>
        </div>
      </div>

      {checkoutUrl ? (
        <a
          href={checkoutUrl}
          className="flex items-center justify-center gap-2 w-full bg-black text-white py-4 text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-primary transition-all"
        >
          <ExternalLink size={14} />
          Pay $150 Deposit Now
        </a>
      ) : (
        <div className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-500 py-4 text-[11px] uppercase tracking-[0.18em]">
          <Loader2 size={14} className="animate-spin" />
          Setting up payment…
        </div>
      )}
      <p className="text-center text-[10px] text-gray-400 mt-3">Secure checkout via Square</p>
    </div>
  );
}

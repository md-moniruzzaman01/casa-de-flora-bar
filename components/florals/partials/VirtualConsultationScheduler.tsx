"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Loader2, AlertCircle, Video, CalendarDays, Clock3 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { api, type ApiError } from '@/lib/api';

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const WEEKDAYS_LONG  = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const WEEKDAYS_SHORT = ["Su","Mo","Tu","We","Th","Fr","Sa"];

const SLOTS = {
  Morning:   ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM"],
  Afternoon: ["12:00 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM"],
  Evening:   ["3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM"],
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

interface SelectedDate { year: number; month: number; day: number; }
interface BookingForm  { name: string; email: string; phone: string; message: string; }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isApiError(e: unknown): e is ApiError {
  return typeof e === "object" && e !== null && "status" in e && "message" in e;
}

function formatDateLabel(d: SelectedDate) {
  const dow = WEEKDAYS_LONG[new Date(d.year, d.month, d.day).getDay()];
  return `${dow}, ${MONTHS[d.month]} ${d.day}`;
}

// ─── Shared tokens (match header strip) ───────────────────────────────────────

const BORDER  = "border-[#EDD8DC]";
const BG_WARM = "bg-[#FFFBFA]";
const TAG_CLS = "text-[9px] tracking-[0.16em] uppercase font-sans text-gray-500 border border-[#EDD8DC] bg-white px-3 py-1.5";
const BACK_BTN = "group flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-sans text-gray-400 hover:text-[#1a1a1a] transition-colors duration-200";

// ─── Step indicator ───────────────────────────────────────────────────────────

const STEPS = ["Date", "Time", "Details"] as const;

function StepBar({ current }: { current: 0 | 1 | 2 }) {
  return (
    <div className="flex items-center mb-8 md:mb-10">
      {STEPS.map((label, i) => (
        <React.Fragment key={label}>
          <div className="flex items-center gap-2">
            <span className={[
              "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-sans transition-colors duration-300",
              i < current   ? "bg-[#1a1a1a] text-white" :
              i === current ? "bg-[#1a1a1a] text-white" :
                              "bg-white border border-[#EDD8DC] text-gray-400",
            ].join(" ")}>
              {i < current ? <Check size={10} strokeWidth={3} /> : i + 1}
            </span>
            <span className={[
              "text-[11px] uppercase tracking-[0.16em] font-sans transition-colors duration-300 hidden sm:block",
              i <= current ? "text-[#1a1a1a]" : "text-gray-400",
            ].join(" ")}>
              {label}
            </span>
          </div>
          {i < 2 && (
            <div className={[
              "flex-1 h-px mx-3 transition-colors duration-500",
              i < current ? "bg-[#1a1a1a]/20" : "bg-[#EDD8DC]",
            ].join(" ")} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Time slot group ──────────────────────────────────────────────────────────

function SlotGroup({ label, slots, selected, onSelect }: {
  label: string;
  slots: readonly string[];
  selected: string | null;
  onSelect: (t: string) => void;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[9px] uppercase tracking-[0.28em] text-primary font-sans">{label}</span>
        <div className={`flex-1 h-px ${BORDER.replace('border-','bg-')}`} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {slots.map((t) => {
          const isSelected = selected === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => onSelect(t)}
              className={[
                "py-3 px-2 text-center border transition-all duration-200",
                isSelected
                  ? "bg-[#1a1a1a] border-[#1a1a1a]"
                  : `border-[#EDD8DC] ${BG_WARM} hover:border-primary/50 hover:bg-white`,
              ].join(" ")}
            >
              <p className={[
                "font-serif text-sm leading-none",
                isSelected ? "text-white" : "text-[#1a1a1a]",
              ].join(" ")}>{t}</p>
              <p className={[
                "text-[9px] tracking-wide font-sans mt-1",
                isSelected ? "text-white/60" : "text-gray-400",
              ].join(" ")}>30 min</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const VirtualConsultationScheduler: React.FC = () => {
  const today = new Date();
  const [viewYear,     setViewYear]    = useState(today.getFullYear());
  const [viewMonth,    setViewMonth]   = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitError,  setSubmitError]  = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<BookingForm>();

  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const isSelectable = (year: number, month: number, day: number) => {
    const d     = new Date(year, month, day);
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d >= start && d.getDay() !== 0;
  };

  const isPast = (year: number, month: number, day: number) =>
    new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  function shiftMonth(delta: number) {
    let m = viewMonth + delta, y = viewYear;
    if (m > 11) { m = 0; y++; }
    if (m < 0)  { m = 11; y--; }
    setViewMonth(m); setViewYear(y);
    setSelectedDate(null); setSelectedTime(null);
  }

  const onSubmit = async (data: BookingForm) => {
    if (!selectedDate || !selectedTime) return;
    setSubmitError(null);
    try {
      await api.post('/api/inquiries', {
        name:    data.name.trim(),
        email:   data.email.trim(),
        phone:   data.phone?.trim() || undefined,
        subject: 'Virtual Consultation',
        message: [
          `Consultation Type: Virtual (Zoom)`,
          `Requested: ${formatDateLabel(selectedDate)} at ${selectedTime}`,
          data.message.trim() || '',
        ].filter(Boolean).join('\n'),
      });
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

  const currentStep: 0 | 1 | 2 = selectedTime ? 2 : selectedDate ? 1 : 0;

  // ── Success ────────────────────────────────────────────────────────────────
  if (isSubmitSuccessful) {
    return (
      <div className={`min-h-[420px] flex flex-col items-center justify-center text-center px-8 py-20 ${BG_WARM} border ${BORDER}`}>
        <div className="relative mb-8">
          <div className={`w-20 h-20 rounded-full border ${BORDER} bg-white shadow-sm flex items-center justify-center`}>
            <Check size={30} strokeWidth={1.5} className="text-[#1a1a1a]" />
          </div>
          <div className={`absolute -top-1 -right-1 w-6 h-6 bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#FFFBFA]`}>
            <Check size={10} strokeWidth={3} className="text-white" />
          </div>
        </div>

        <p className="text-[10px] tracking-[0.24em] uppercase text-primary font-sans mb-3">Booking Confirmed</p>
        <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-6 leading-snug">
          You&apos;re on<br />the calendar
        </h3>

        {/* Slot summary card — matches header strip card style */}
        <div className={`w-full max-w-sm bg-white border ${BORDER} px-6 py-5 mb-6 flex items-start gap-4 text-left`}>
          <div className={`relative flex-shrink-0`}>
            <div className={`w-12 h-12 rounded-full border ${BORDER} bg-white shadow-sm flex items-center justify-center`}>
              <Video size={17} strokeWidth={1.4} className="text-primary" />
            </div>
            <div className={`absolute -top-1 -right-1 w-5 h-5 bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-white`}>
              <Check size={9} strokeWidth={3} className="text-white" />
            </div>
          </div>
          <div>
            <p className="font-serif text-lg text-[#1a1a1a] leading-none mb-1">
              {selectedDate && formatDateLabel(selectedDate)}
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-primary font-sans mb-3">
              {selectedTime} · 30 min
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Virtual', 'Via Zoom', 'Free'].map((tag) => (
                <span key={tag} className={TAG_CLS}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-400 font-sans max-w-xs leading-relaxed">
          We&apos;ll send a Zoom link to your email within 24 hours.
        </p>
        <button
          onClick={() => { reset(); setSelectedDate(null); setSelectedTime(null); }}
          className={`mt-8 ${BACK_BTN}`}
        >
          <span className="group-hover:-translate-x-0.5 transition-transform duration-200 inline-block">←</span>
          Book another slot
        </button>
      </div>
    );
  }

  const fieldCls = "w-full border-0 border-b border-[#EDD8DC] bg-transparent py-3 text-sm font-sans text-[#1a1a1a] placeholder:text-gray-300 focus:outline-none focus:border-[#1a1a1a] transition-colors duration-200";

  return (
    <div>
      <StepBar current={currentStep} />

      <div className={`grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] border ${BORDER}`}>

        {/* ── LEFT: Calendar ─────────────────────────────────────────────── */}
        <div className={`p-7 md:p-10 border-b lg:border-b-0 lg:border-r ${BORDER} ${BG_WARM}`}>

          {/* Month / nav */}
          <div className="flex items-start justify-between mb-7">
            <div>
              <p className="font-serif text-3xl text-[#1a1a1a] leading-none">
                {MONTHS[viewMonth]}
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-primary font-sans mt-1.5 tabular-nums">
                {viewYear}
              </p>
            </div>
            <div className="flex gap-2 mt-1">
              <button
                type="button" onClick={() => shiftMonth(-1)} aria-label="Previous month"
                className={`w-9 h-9 flex items-center justify-center border ${BORDER} bg-white shadow-sm text-gray-400 hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-all duration-200`}
              >
                <ChevronLeft size={15} />
              </button>
              <button
                type="button" onClick={() => shiftMonth(1)} aria-label="Next month"
                className={`w-9 h-9 flex items-center justify-center border ${BORDER} bg-white shadow-sm text-gray-400 hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-all duration-200`}
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-2">
            {WEEKDAYS_SHORT.map((wd) => (
              <div key={wd} className={[
                "text-center text-[10px] tracking-widest py-1.5 font-sans",
                wd === "Su" ? "text-gray-200" : "text-gray-400",
              ].join(" ")}>
                {wd}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day      = i + 1;
              const selectable = isSelectable(viewYear, viewMonth, day);
              const past     = isPast(viewYear, viewMonth, day);
              const isSunday = new Date(viewYear, viewMonth, day).getDay() === 0;
              const isSelected =
                selectedDate?.year  === viewYear &&
                selectedDate?.month === viewMonth &&
                selectedDate?.day   === day;
              const isToday =
                today.getFullYear() === viewYear &&
                today.getMonth()    === viewMonth &&
                today.getDate()     === day;

              return (
                <div key={day} className="flex items-center justify-center py-0.5">
                  <button
                    type="button"
                    disabled={!selectable}
                    onClick={() => { setSelectedDate({ year: viewYear, month: viewMonth, day }); setSelectedTime(null); }}
                    className={[
                      "w-9 h-9 flex items-center justify-center text-sm transition-all duration-200 relative font-sans",
                      past || isSunday
                        ? "text-gray-200 cursor-not-allowed"
                        : isSelected
                          ? "bg-[#1a1a1a] text-white rounded-full font-medium"
                          : isToday
                            ? "text-primary font-semibold hover:bg-primary/10 rounded-full"
                            : "text-gray-700 hover:bg-[#EDD8DC]/50 rounded-full",
                    ].join(" ")}
                  >
                    {day}
                    {isToday && !isSelected && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className={`mt-6 pt-5 border-t ${BORDER} flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-gray-400 font-sans`}>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#1a1a1a]" /> Selected
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-primary/30" /> Today
            </span>
            <span>Mon – Sat · 30-min sessions</span>
          </div>
        </div>

        {/* ── RIGHT: Time slots → Form ────────────────────────────────────── */}
        <div className="p-7 md:p-10 bg-white">

          {/* Empty state */}
          {!selectedDate && (
            <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center gap-5">
              <div className="relative">
                <div className={`w-16 h-16 rounded-full border ${BORDER} bg-white shadow-sm flex items-center justify-center`}>
                  <CalendarDays size={24} strokeWidth={1.2} className="text-primary/60" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border ${BORDER} shadow-sm flex items-center justify-center`}>
                  <Clock3 size={13} strokeWidth={1.4} className="text-primary/50" />
                </div>
              </div>
              <p className="font-serif text-xl text-gray-300 leading-snug">
                Choose a date to see<br />available time slots
              </p>
              <p className="text-[10px] tracking-[0.18em] uppercase text-gray-300 font-sans">
                Mon – Sat &nbsp;·&nbsp; 30-min Zoom sessions
              </p>
            </div>
          )}

          {/* Step 2: Time slots */}
          {selectedDate && !selectedTime && (
            <div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[10px] tracking-[0.24em] uppercase text-primary font-sans mb-1.5">
                    Available Times
                  </p>
                  <h3 className="font-serif text-2xl text-[#1a1a1a] leading-snug">
                    {formatDateLabel(selectedDate)}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDate(null)}
                  className={`${BACK_BTN} mt-1`}
                >
                  <span className="group-hover:-translate-x-0.5 transition-transform duration-200 inline-block">←</span>
                  Back
                </button>
              </div>

              {(Object.entries(SLOTS) as [string, readonly string[]][]).map(([group, times]) => (
                <SlotGroup key={group} label={group} slots={times} selected={selectedTime} onSelect={setSelectedTime} />
              ))}
            </div>
          )}

          {/* Step 3: Contact form */}
          {selectedDate && selectedTime && (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

              {/* Slot card — matches header strip style exactly */}
              <div className={`${BG_WARM} border ${BORDER} p-5 mb-8 flex items-start gap-5`}>
                <div className="relative flex-shrink-0 mt-0.5">
                  <div className={`w-14 h-14 rounded-full border ${BORDER} bg-white shadow-sm flex items-center justify-center`}>
                    <Video size={20} strokeWidth={1.4} className="text-primary" />
                  </div>
                  <div className={`absolute -top-1 -right-1 w-6 h-6 bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#FFFBFA]`}>
                    <Check size={10} strokeWidth={3} className="text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-xl text-[#1a1a1a] leading-none mb-1.5">
                    {formatDateLabel(selectedDate)}
                  </p>
                  <p className="text-[10px] tracking-[0.24em] uppercase text-primary font-sans mb-4">
                    {selectedTime} &nbsp;·&nbsp; Via Zoom
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['30 min', 'Virtual', 'Free'].map((tag) => (
                      <span key={tag} className={TAG_CLS}>{tag}</span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedTime(null)}
                    className={BACK_BTN}
                  >
                    <span className="group-hover:-translate-x-0.5 transition-transform duration-200 inline-block">←</span>
                    Change time
                  </button>
                </div>
              </div>

              {/* Fields */}
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-gray-500 font-sans mb-2">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text" placeholder="Your full name"
                    className={fieldCls}
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-red-500 font-sans">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-gray-500 font-sans mb-2">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                    })}
                    type="email" placeholder="you@example.com"
                    className={fieldCls}
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-red-500 font-sans">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-gray-500 font-sans mb-2">
                    Phone
                  </label>
                  <input
                    {...register('phone')}
                    type="tel" placeholder="+1 (000) 000-0000"
                    className={fieldCls}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-gray-500 font-sans mb-2">
                    Tell us about your vision
                  </label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="Wedding date, floral style, colour palette, budget range…"
                    className={`${fieldCls} resize-none`}
                  />
                </div>
              </div>

              {submitError && (
                <div className={`mt-5 flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 p-4`} role="alert">
                  <AlertCircle size={15} className="mt-0.5 shrink-0" />
                  <span className="font-sans">{submitError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 w-full bg-[#1a1a1a] text-white py-4 font-sans text-[11px] tracking-[0.18em] uppercase hover:bg-[#2c2420] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
              >
                {isSubmitting
                  ? <><Loader2 size={15} className="animate-spin" /> Confirming…</>
                  : 'Confirm Consultation'
                }
              </button>

              <p className="text-center text-[10px] text-gray-400 font-sans mt-4 tracking-wide">
                Free · No commitment required
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualConsultationScheduler;

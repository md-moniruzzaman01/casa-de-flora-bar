"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { CELEBRATE_CONTENT } from "../config/constant";
import { useFormConfig } from "@/lib/formConfig";
import { api, type ApiError } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

type FormValues = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  guests: string;
  date: string;
  startTime: string;
  endTime: string;
  cateringRequired: boolean;
  howHeard: string;
  specialRequests: string;
};

function isApiError(e: unknown): e is ApiError {
  return typeof e === "object" && e !== null && "status" in e && "message" in e;
}

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatLabel(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const inputCls =
  "w-full p-3 bg-[#FCF9F9] border border-[#FDE8E9] rounded-md focus:outline-none focus:border-[#D6768B] transition-colors";

const EVENT_TIME_OPTIONS = [
  "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM",
  "7:00 PM", "8:00 PM", "9:00 PM",
];

export default function EventInquiryForm() {
  const container = useRef<HTMLDivElement>(null);
  const { formSection } = CELEBRATE_CONTENT;
  const [selectedPackage, setSelectedPackage] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { config } = useFormConfig();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({ mode: "onBlur" });

  useGSAP(() => {
    gsap.from(".form-container", {
      scrollTrigger: { trigger: container.current, start: "top 80%" },
      y: 50, opacity: 0, duration: 1, ease: "power3.out",
    });
  }, { scope: container });

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    try {
      const notes = [
        selectedPackage ? `Package: ${selectedPackage}` : "",
        data.howHeard ? `How heard: ${data.howHeard}` : "",
        data.specialRequests ? data.specialRequests.trim() : "",
      ].filter(Boolean).join(" | ");

      await api.post("/api/event-bookings", {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        eventType: data.eventType,
        guests: parseInt(data.guests, 10),
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        cateringRequired: data.cateringRequired ?? false,
        ...(notes ? { specialRequests: notes } : {}),
      });
      reset();
      setSelectedPackage("");
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

  const packages = config?.eventServicePackages ?? [
    "Rental Only", "All Inclusive", "Brunch Sip & Clip", "Private Sip & Clip", "Intimate Wedding",
  ];
  const eventTypes = config?.eventTypes ?? ["WEDDING", "BIRTHDAY", "CORPORATE", "SEMINAR", "ANNIVERSARY", "OTHER"];

  return (
    <section ref={container} className="py-20 px-6 md:px-12 lg:px-24 bg-[#FDE8E9]/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-[#1a1a1a] mb-12">
          {formSection.title}
        </h2>

        <div className="form-container bg-white rounded-[30px] p-8 md:p-12 shadow-sm border border-[#FDE8E9]">
          {isSubmitSuccessful ? (
            <div className="text-center py-12">
              <div className="mx-auto w-14 h-14 rounded-full bg-[#D6768B] text-white flex items-center justify-center mb-4">
                <Check size={26} />
              </div>
              <h3 className="font-serif text-2xl text-[#1a1a1a] mb-2">Inquiry received!</h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
                Our team will reach out shortly to confirm your event details.
              </p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-gray-500">— Casa de Flora team</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>

              {/* Name */}
              <div>
                <label className="block text-sm font-serif mb-2">Name *</label>
                <input {...register("name", { required: "Name is required" })}
                  type="text" placeholder="Your name" className={inputCls} />
                {errors.name && <p className="text-xs text-[#D6768B] mt-1">{errors.name.message}</p>}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-serif mb-2">Email *</label>
                  <input {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                  })} type="email" placeholder="Email" className={inputCls} />
                  {errors.email && <p className="text-xs text-[#D6768B] mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-serif mb-2">Phone *</label>
                  <input {...register("phone", { required: "Phone is required" })}
                    type="tel" placeholder="Phone" className={inputCls} />
                  {errors.phone && <p className="text-xs text-[#D6768B] mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              {/* Service Package */}
              <div>
                <label className="block text-sm font-serif mb-3">
                  What service package are you interested in?
                </label>
                <div className="flex flex-wrap gap-3">
                  {packages.map((pkg) => (
                    <button key={pkg} type="button" onClick={() => setSelectedPackage(pkg)}
                      className={`px-4 py-2 text-xs border rounded-sm transition-all ${
                        selectedPackage === pkg
                          ? "bg-[#D6768B] border-[#D6768B] text-white"
                          : "bg-[#FDE8E9] border-[#FDE8E9] text-[#1a1a1a] hover:bg-[#D6768B] hover:text-white"
                      }`}>
                      {pkg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-serif mb-2">Preferred Date *</label>
                  <input {...register("date", { required: "Date is required" })}
                    type="date" min={todayIso()} className={inputCls} />
                  {errors.date && <p className="text-xs text-[#D6768B] mt-1">{errors.date.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-serif mb-2">Start Time *</label>
                    <select {...register("startTime", { required: "Required" })} className={`${inputCls} cursor-pointer appearance-none`} defaultValue="">
                      <option value="" disabled>Start</option>
                      {EVENT_TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.startTime && <p className="text-xs text-[#D6768B] mt-1">{errors.startTime.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-serif mb-2">End Time *</label>
                    <select {...register("endTime", { required: "Required" })} className={`${inputCls} cursor-pointer appearance-none`} defaultValue="">
                      <option value="" disabled>End</option>
                      {EVENT_TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.endTime && <p className="text-xs text-[#D6768B] mt-1">{errors.endTime.message}</p>}
                  </div>
                </div>
              </div>

              {/* Guests & Event Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-serif mb-2">Number of Guests *</label>
                  <input {...register("guests", {
                    required: "Required",
                    min: { value: 2, message: "At least 2 guests" },
                  })} type="number" min={2} placeholder="e.g. 20" className={inputCls} />
                  {errors.guests && <p className="text-xs text-[#D6768B] mt-1">{errors.guests.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-serif mb-2">Type of Event *</label>
                  <select {...register("eventType", { required: "Please select an event type" })}
                    className={`${inputCls} cursor-pointer appearance-none`} defaultValue="">
                    <option value="" disabled>Select event type</option>
                    {eventTypes.map((t) => (
                      <option key={t} value={t}>{formatLabel(t)}</option>
                    ))}
                  </select>
                  {errors.eventType && <p className="text-xs text-[#D6768B] mt-1">{errors.eventType.message}</p>}
                </div>
              </div>

              {/* Catering */}
              <div className="flex items-center gap-3">
                <input {...register("cateringRequired")} type="checkbox" id="catering"
                  className="w-4 h-4 accent-[#D6768B] cursor-pointer" />
                <label htmlFor="catering" className="text-sm font-serif cursor-pointer">
                  Catering required
                </label>
              </div>

              {/* How did you hear */}
              <div>
                <label className="block text-sm font-serif mb-2">How did you hear about us?</label>
                <textarea {...register("howHeard")} placeholder="Instagram, friend referral, Google…"
                  rows={2} className={`${inputCls} resize-none`} />
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-sm font-serif mb-2">Anything else we should know?</label>
                <textarea {...register("specialRequests")}
                  placeholder="Special requests, dietary needs, vision for your event…"
                  rows={3} className={`${inputCls} resize-none`} />
              </div>

              {submitError && (
                <div role="alert"
                  className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl p-3">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="flex justify-center pt-6">
                <button type="submit" disabled={isSubmitting}
                  className="bg-black text-white px-20 py-4 text-xs tracking-[0.3em] uppercase hover:bg-gray-800 transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center gap-3">
                  {isSubmitting ? (
                    <><Loader2 size={14} className="animate-spin" /> Sending…</>
                  ) : formSection.buttonText}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Loader2, AlertCircle, Mail, MapPin, Phone } from "lucide-react";
import { VANUE_CONTENT } from "../config/constant";
import { api, type ApiError } from "@/lib/api";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  start_time: string;
  guests: string;
  message: string;
};

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

const BookingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { headline_line_1, headline_line_2, description, contact, event_types } =
    VANUE_CONTENT.booking_section;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    try {
      await api.post("/api/event-bookings", {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() ?? "",
        eventType: data.event_type,
        guests: parseInt(data.guests, 10) || 0,
        date: data.event_date,
        startTime: data.start_time,
        endTime: addHours(data.start_time, 4),
        cateringRequired: false,
        ...(data.message?.trim() ? { specialRequests: data.message.trim() } : {}),
      });
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".bk-rise", { yPercent: 110 });
      gsap.set(".bk-fade", { y: 32, opacity: 0 });
      gsap.set(".bk-form-row", { y: 24, opacity: 0 });

      gsap.to(".bk-rise", {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      gsap.to(".bk-fade", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      gsap.to(".bk-form-row", {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: ".bk-form", start: "top 78%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const inputBase =
    "w-full border border-pink-100 bg-pink-50/20 p-4 outline-none text-black placeholder:text-gray-400 font-serif text-[15px] focus:border-primary transition-colors duration-300";
  const selectBase =
    "w-full border border-pink-100 bg-pink-50/20 p-4 outline-none text-black font-serif text-[15px] focus:border-primary transition-colors duration-300 appearance-none cursor-pointer pr-10";
  const textareaBase =
    "w-full border border-pink-100 bg-pink-50/20 p-4 outline-none text-black placeholder:text-gray-400 font-serif text-[15px] leading-[1.7] focus:border-primary transition-colors resize-none";
  const labelBase = "block text-sm text-gray-700 mb-2";
  const errorBase = "mt-1.5 text-sm text-primary";

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section header */}
        <div className="bk-fade text-center mb-12 md:mb-16">
          <h2 className="font-serif text-[clamp(28px,6vw,56px)] tracking-widest uppercase mb-3">
            <span className="block overflow-hidden">
              <span className="bk-rise block">{headline_line_1}</span>
            </span>
            <span className="block overflow-hidden">
              <span className="bk-rise block italic text-primary normal-case tracking-normal">
                {headline_line_2}.
              </span>
            </span>
          </h2>
          <p className="text-lg md:text-xl tracking-wide uppercase italic text-gray-600 font-serif">
            Host your next memorable event at Casa De Flora Bar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
          {/* LEFT — Info + contact */}
          <div className="lg:col-span-4 space-y-8">
            <p className="bk-fade text-lg leading-relaxed text-gray-700 font-serif">
              {description}
            </p>

            <ul className="bk-fade flex flex-col gap-5">
              {[
                {
                  Icon: Phone,
                  small: "By Telephone",
                  value: contact.phone,
                  href: `tel:${contact.phone.replace(/\D/g, "")}`,
                },
                {
                  Icon: Mail,
                  small: "By Email",
                  value: contact.email,
                  href: `mailto:${contact.email}`,
                },
                {
                  Icon: MapPin,
                  small: "In Person",
                  value: contact.address,
                  href: null as string | null,
                },
              ].map(({ Icon, small, value, href }) => (
                <li key={small} className="group flex items-start gap-4">
                  <span className="mt-0.5 flex items-center justify-center w-9 h-9 rounded-full border border-pink-100 bg-pink-50/30 group-hover:border-primary group-hover:bg-primary/10 transition-colors shrink-0">
                    <Icon className="w-3.5 h-3.5 text-primary" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-sm text-gray-500 mb-0.5">{small}</p>
                    {href ? (
                      <a
                        href={href}
                        className="font-serif text-base text-black hover:text-primary transition-colors break-all"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-serif text-base text-black">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="bk-fade bg-black text-white px-10 py-4 uppercase tracking-tighter hover:bg-gray-900 transition-colors font-serif"
            >
              Reserve your Seat
            </button>
          </div>

          {/* RIGHT — Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bk-form lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            noValidate
          >
            {isSubmitSuccessful ? (
              <div className="md:col-span-2 flex flex-col items-center justify-center py-20 text-center border border-pink-100 bg-pink-50/20 px-6">
                <span className="block w-12 h-px bg-primary mx-auto mb-7" />
                <p className="font-serif italic text-[32px] text-black mb-3">Merci.</p>
                <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
                  Your enquiry has reached us. We&apos;ll respond personally within
                  twenty-four hours.
                </p>
              </div>
            ) : (
              <>
                <div className="bk-form-row md:col-span-2 space-y-2">
                  <label className={labelBase}>Name (required)</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Your full name"
                    className={inputBase}
                  />
                  {errors.name && <p className={errorBase}>{errors.name.message}</p>}
                </div>

                <div className="bk-form-row space-y-2">
                  <label className={labelBase}>Email (required)</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
                    })}
                    type="email"
                    placeholder="jane@example.com"
                    className={inputBase}
                  />
                  {errors.email && <p className={errorBase}>{errors.email.message}</p>}
                </div>

                <div className="bk-form-row space-y-2">
                  <label className={labelBase}>Phone</label>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="+1 (000) 000-0000"
                    className={inputBase}
                  />
                </div>

                <div className="bk-form-row relative space-y-2">
                  <label className={labelBase}>Event Type (required)</label>
                  <select
                    {...register("event_type", {
                      required: "Please select an event type",
                    })}
                    className={selectBase}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select type…
                    </option>
                    {event_types.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-4 bottom-4 w-4 h-4 text-gray-400"
                    strokeWidth={1.6}
                  />
                  {errors.event_type && (
                    <p className={errorBase}>{errors.event_type.message}</p>
                  )}
                </div>

                <div className="bk-form-row space-y-2">
                  <label className={labelBase}>Event Date</label>
                  <input
                    {...register("event_date", { required: "Date is required" })}
                    type="date"
                    className={inputBase}
                  />
                  {errors.event_date && (
                    <p className={errorBase}>{errors.event_date.message}</p>
                  )}
                </div>

                <div className="bk-form-row space-y-2">
                  <label className={labelBase}>Start Time (required)</label>
                  <input
                    {...register("start_time", { required: "Start time is required" })}
                    type="time"
                    className={inputBase}
                  />
                  {errors.start_time && (
                    <p className={errorBase}>{errors.start_time.message}</p>
                  )}
                </div>

                <div className="bk-form-row space-y-2">
                  <label className={labelBase}>Expected Guests</label>
                  <input
                    {...register("guests")}
                    type="number"
                    placeholder="e.g. 80"
                    min={1}
                    max={150}
                    className={inputBase}
                  />
                </div>

                <div className="bk-form-row md:col-span-2 space-y-2">
                  <label className={labelBase}>Message (required)</label>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    rows={5}
                    placeholder="Tell us what kind of event you're planning…"
                    className={textareaBase}
                  />
                  {errors.message && (
                    <p className={errorBase}>{errors.message.message}</p>
                  )}
                </div>

                {submitError && (
                  <div
                    className="md:col-span-2 flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 p-3"
                    role="alert"
                  >
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="bk-form-row md:col-span-2 flex justify-center mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white w-full md:w-1/2 py-4 uppercase tracking-widest hover:scale-105 transition-transform font-serif disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending…</span>
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;

"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone } from "lucide-react";
import { VANUE_CONTENT } from "../config/constant";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  guests: string;
  message: string;
};

const BookingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { label, headline_line_1, headline_line_2, description, contact, event_types } =
    VANUE_CONTENT.booking_section;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log("Booking enquiry:", data);
    reset();
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".bk-left-item", {
        x: -40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".bk-left", start: "top 78%", once: true },
      });

      gsap.from(".bk-form", {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".bk-form", start: "top 78%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const inputBase =
    "w-full bg-white/5 border border-white/12 text-white placeholder:text-white/30 font-sans text-[13px] px-4 py-3.5 outline-none focus:border-primary/70 focus:bg-white/8 transition-colors duration-200";
  const labelBase =
    "block font-sans text-[9px] tracking-[0.38em] uppercase text-white/45 mb-2";
  const errorBase = "mt-1.5 font-sans text-[10px] text-primary/80";

  return (
    <section
      ref={sectionRef}
      className="bg-[#120c07] py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[72px]">
        <div className="grid grid-cols-1 lg:grid-cols-[42fr_58fr] gap-14 lg:gap-20 items-start">

          {/* ── LEFT — info panel ─────────────────────────── */}
          <div className="bk-left flex flex-col">

            <div className="bk-left-item flex items-center gap-3 mb-8">
              <span className="block w-5 h-px bg-primary" />
              <span className="font-sans text-[10px] tracking-[0.44em] uppercase text-primary">
                {label}
              </span>
            </div>

            <h2 className="bk-left-item font-serif text-[40px] sm:text-[50px] md:text-[58px] leading-[1.04] tracking-tight text-white mb-6">
              {headline_line_1}
              <br />
              <span className="italic text-primary">{headline_line_2}</span>
            </h2>

            <p className="bk-left-item font-sans text-[14px] leading-[1.9] text-white/48 max-w-[380px] mb-12">
              {description}
            </p>

            <div className="bk-left-item w-full h-px bg-white/8 mb-10" />

            <ul className="bk-left-item flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <span className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-full border border-white/12 shrink-0">
                  <Phone className="w-3.5 h-3.5 text-primary" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-sans text-[9px] tracking-[0.38em] uppercase text-white/35 mb-1">
                    Call us
                  </p>
                  <a
                    href={`tel:${contact.phone.replace(/\D/g, "")}`}
                    className="font-serif text-[17px] text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-full border border-white/12 shrink-0">
                  <Mail className="w-3.5 h-3.5 text-primary" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-sans text-[9px] tracking-[0.38em] uppercase text-white/35 mb-1">
                    Email us
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-serif text-[17px] text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-full border border-white/12 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-primary" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-sans text-[9px] tracking-[0.38em] uppercase text-white/35 mb-1">
                    Location
                  </p>
                  <p className="font-serif text-[17px] text-white/80">
                    {contact.address}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* ── RIGHT — inquiry form ─────────────────────── */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bk-form flex flex-col gap-5 bg-white/[0.035] border border-white/8 p-8 md:p-10"
          >
            {isSubmitSuccessful ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="block w-10 h-px bg-primary mx-auto mb-6" />
                <p className="font-serif italic text-[22px] text-white mb-3">
                  Thank you!
                </p>
                <p className="font-sans text-[13px] text-white/45 max-w-[280px] leading-[1.8]">
                  We&apos;ve received your enquiry and will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <>
                {/* Row 1 — name + email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelBase}>Full Name</label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      placeholder="Jane Smith"
                      className={inputBase}
                    />
                    {errors.name && (
                      <p className={errorBase}>{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelBase}>Email Address</label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
                      })}
                      type="email"
                      placeholder="jane@example.com"
                      className={inputBase}
                    />
                    {errors.email && (
                      <p className={errorBase}>{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Row 2 — phone + event type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelBase}>Phone Number</label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="+1 (000) 000-0000"
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label className={labelBase}>Event Type</label>
                    <select
                      {...register("event_type", { required: "Please select an event type" })}
                      className={`${inputBase} appearance-none cursor-pointer`}
                      defaultValue=""
                    >
                      <option value="" disabled>Select type…</option>
                      {event_types.map((t) => (
                        <option key={t} value={t} className="bg-[#1a1008] text-white">
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.event_type && (
                      <p className={errorBase}>{errors.event_type.message}</p>
                    )}
                  </div>
                </div>

                {/* Row 3 — date + guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelBase}>Event Date</label>
                    <input
                      {...register("event_date")}
                      type="date"
                      className={`${inputBase} [color-scheme:dark]`}
                    />
                  </div>
                  <div>
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
                </div>

                {/* Row 4 — message */}
                <div>
                  <label className={labelBase}>Tell us about your event</label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Share your vision, theme, or any questions…"
                    className={`${inputBase} resize-none`}
                  />
                </div>

                <div className="w-full h-px bg-white/8" />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white font-display text-[12px] tracking-[0.12em] py-4 hover:bg-primary/85 disabled:opacity-60 transition-colors duration-200 cursor-pointer"
                >
                  {isSubmitting ? "Sending…" : "Send Enquiry"}
                </button>

                <p className="font-sans text-[10px] text-white/25 text-center leading-[1.7]">
                  We respond within 24 hours · No spam, ever
                </p>
              </>
            )}
          </form>

        </div>
      </div>
    </section>
  );
};

export default BookingSection;

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
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

      gsap.to(".bk-bg-img", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const inputBase =
    "w-full bg-transparent border-0 border-b border-white/15  font-serif text-[16px] py-3 outline-none focus:border-primary transition-colors duration-300";
  const textareaBase =
    "w-full bg-white/[0.025] border border-white/12  font-serif text-[15px] leading-[1.7] p-4 outline-none focus:border-primary/70 focus:bg-white/[0.04] transition-colors resize-none";
  const labelBase =
    "block font-sans text-[9px] tracking-[0.4em] uppercase  mb-2";
  const errorBase = "mt-2 font-sans text-[10px] text-primary/85";

  return (
    <section
      ref={sectionRef}
      className="relative   py-20 md:py-32 overflow-hidden"
    >



      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT — Editorial */}
          <div className="lg:col-span-5">
            <div className="bk-fade flex items-center gap-3 mb-7">
              <span className="block w-7 h-px bg-primary" />
              <span className="font-sans text-[10px] tracking-[0.46em] uppercase text-primary">
                {label}
              </span>
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase ">
                · Ch. 04 / Fin
              </span>
            </div>

            <h2 className="font-serif text-[clamp(40px,5vw,72px)] leading-[1.02] tracking-[-0.01em] mb-8">
              <span className="block overflow-hidden">
                <span className="bk-rise block">{headline_line_1}</span>
              </span>
              <span className="block overflow-hidden">
                <span className="bk-rise block italic text-primary">
                  {headline_line_2}.
                </span>
              </span>
            </h2>

            <p className="bk-fade font-serif italic text-[17px] leading-[1.8]  mb-12 max-w-[440px]">
              {description}
            </p>

            <div className="bk-fade w-20 h-px bg-primary/55 mb-10" />

            <ul className="bk-fade flex flex-col gap-7 mb-12">
              {[
                {
                  Icon: Phone,
                  small: "By Telephone",
                  value: contact.phone,
                  href: `tel:${contact.phone.replace(/\D/g, "")}`,
                },
                {
                  Icon: Mail,
                  small: "By Letter",
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
                <li key={small} className="group flex items-start gap-5">
                  <span className="mt-1 flex items-center justify-center w-9 h-9 rounded-full border border-white/15 group-hover:border-primary group-hover:bg-primary/10 transition-colors shrink-0">
                    <Icon className="w-3.5 h-3.5 text-primary" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.4em] uppercase  mb-1.5">
                      {small}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="font-serif text-[18px]  hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-serif text-[18px] ">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <p className="bk-fade font-sans text-[10px] tracking-[0.32em] uppercase ">
              Tours by appointment · Tuesday – Saturday
            </p>
          </div>

          {/* RIGHT — Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bk-form lg:col-span-7 lg:pl-4"
          >
            {isSubmitSuccessful ? (
              <div className="flex flex-col items-center justify-center py-24 text-center border border-white/10 px-6">
                <span className="block w-12 h-px bg-primary mx-auto mb-8" />
                <p className="font-display italic text-[34px]  mb-4">
                  Merci.
                </p>
                <p className="font-sans text-[13px]  max-w-[320px] leading-[1.85]">
                  Your enquiry has reached us. We&apos;ll respond personally within
                  twenty-four hours.
                </p>
              </div>
            ) : (
              <>
                <div className="bk-fade flex items-center justify-between mb-12 pb-5 border-b border-white/10">
                  <span className="font-sans text-[10px] tracking-[0.4em] uppercase ">
                    Enquiry Form
                  </span>
                  <span className="font-display italic text-[15px] ">
                    Reservation No. 04
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-9">
                  <div className="bk-form-row">
                    <label className={labelBase}>Full Name</label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      placeholder="Jane Smith"
                      className={inputBase}
                    />
                    {errors.name && <p className={errorBase}>{errors.name.message}</p>}
                  </div>

                  <div className="bk-form-row">
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
                    {errors.email && <p className={errorBase}>{errors.email.message}</p>}
                  </div>

                  <div className="bk-form-row">
                    <label className={labelBase}>Phone Number</label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="+1 (000) 000-0000"
                      className={inputBase}
                    />
                  </div>

                  <div className="bk-form-row relative">
                    <label className={labelBase}>Event Type</label>
                    <select
                      {...register("event_type", {
                        required: "Please select an event type",
                      })}
                      className={`${inputBase} appearance-none cursor-pointer pr-8`}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select type…
                      </option>
                      {event_types.map((t) => (
                        <option key={t} value={t} className="bg-[#0e0805] ">
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-2 bottom-3.5 w-4 h-4 "
                      strokeWidth={1.6}
                    />
                    {errors.event_type && (
                      <p className={errorBase}>{errors.event_type.message}</p>
                    )}
                  </div>

                  <div className="bk-form-row">
                    <label className={labelBase}>Event Date</label>
                    <input
                      {...register("event_date")}
                      type="date"
                      className={`${inputBase} [color-scheme:dark]`}
                    />
                  </div>

                  <div className="bk-form-row">
                    <label className={labelBase}>Expected Guests</label>
                    <input
                      {...register("guests")}
                      type="number"
                      placeholder="80"
                      min={1}
                      max={150}
                      className={inputBase}
                    />
                  </div>

                  <div className="bk-form-row md:col-span-2">
                    <label className={labelBase}>Tell us about your event</label>
                    <textarea
                      {...register("message")}
                      rows={3}
                      placeholder="Share your vision, theme, or any questions…"
                      className={textareaBase}
                    />
                  </div>
                </div>

                <div className="bk-form-row mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <p className="font-sans text-[10px] tracking-[0.32em] uppercase ">
                    No spam · 24-hour reply
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center gap-4 bg-primary  px-10 py-4 font-sans text-[11px] tracking-[0.28em] uppercase overflow-hidden disabled:opacity-60 cursor-pointer"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? "Sending…" : "Send Enquiry"}
                    </span>
                    <span className="relative z-10 block w-5 h-px  transition-all duration-300 group-hover:w-9" />
                    <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
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

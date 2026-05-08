"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Loader2, AlertCircle, Mail, Phone, MessageCircle } from "lucide-react";
import { CATERING_CONTENT } from "../config/constant";
import { siteConfig, whatsappLink } from "@/lib/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type FormValues = {
  name: string;
  email: string;
  phone: string;
  date: string;
  eventType: string;
  serviceType: string;
  headcount: string;
  notes?: string;
};

export default function InquiryForm() {
  const { inquiry } = CATERING_CONTENT;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({ mode: "onBlur" });

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".inq-head > *",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".inq-form > *",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: ".inq-form", start: "top 85%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    try {
      // Simulated submit — swap for `api.post('/event-bookings', …)` once the
      // catering inquiry endpoint is ready.
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Catering inquiry:", data);
      reset();
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="inquiry"
      className="bg-white px-6 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-24 md:py-28 lg:py-32"
    >
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left intro */}
        <div className="inq-head lg:col-span-5 lg:sticky lg:top-24">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-primary mb-3 sm:mb-4">
            {inquiry.eyebrow}
          </p>
          <h2 className="font-serif leading-[1.05] tracking-tight text-black">
            <span className="block text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px]">
              {inquiry.title}
            </span>
          </h2>
          <div className="h-[1px] w-16 bg-primary mt-5 sm:mt-6 mb-6" />
          <p className="text-gray-700 text-base leading-relaxed max-w-md">
            {inquiry.description}
          </p>

          {/* Contact alts */}
          <div className="mt-10 p-6 rounded-2xl border border-primary-100 bg-primary-50/40">
            <p className="text-[10px] uppercase tracking-[0.32em] text-primary mb-3">
              Or skip the form
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"
                >
                  <span className="w-9 h-9 rounded-full bg-white border border-primary-100 flex items-center justify-center text-primary">
                    <Mail size={15} />
                  </span>
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"
                >
                  <span className="w-9 h-9 rounded-full bg-white border border-primary-100 flex items-center justify-center text-primary">
                    <Phone size={15} />
                  </span>
                  <span>{siteConfig.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <Link
                  href={whatsappLink(
                    "Hi Casa de Flora! I'd like to inquire about catering for an event.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"
                >
                  <span className="w-9 h-9 rounded-full bg-white border border-primary-100 flex items-center justify-center text-primary">
                    <MessageCircle size={15} />
                  </span>
                  <span>Chat on WhatsApp</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Form / success */}
        <div className="lg:col-span-7 w-full">
          {isSubmitSuccessful ? (
            <SuccessState />
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="inq-form bg-white border border-primary-100 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)] space-y-5"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <Field label="Full name" error={errors.name?.message}>
                  <input
                    {...register("name", { required: "Name is required" })}
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
                    {...register("phone", { required: "Phone is required" })}
                    type="tel"
                    placeholder="+1 (000) 000-0000"
                    className={inputBase}
                  />
                </Field>

                <Field label="Event date" error={errors.date?.message}>
                  <input
                    {...register("date", { required: "Date is required" })}
                    type="date"
                    className={inputBase}
                  />
                </Field>

                <Field label="Event type" error={errors.eventType?.message}>
                  <select
                    {...register("eventType", {
                      required: "Pick an event type",
                    })}
                    defaultValue=""
                    className={`${inputBase} cursor-pointer`}
                  >
                    <option value="" disabled>
                      Select…
                    </option>
                    {inquiry.eventTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Service style" error={errors.serviceType?.message}>
                  <select
                    {...register("serviceType", {
                      required: "Pick a service style",
                    })}
                    defaultValue=""
                    className={`${inputBase} cursor-pointer`}
                  >
                    <option value="" disabled>
                      Select…
                    </option>
                    {inquiry.serviceTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Approx. headcount"
                  error={errors.headcount?.message}
                  className="sm:col-span-2"
                >
                  <div className="flex flex-wrap gap-2">
                    {inquiry.headcountBuckets.map((bucket) => (
                      <label
                        key={bucket}
                        className="cursor-pointer"
                      >
                        <input
                          {...register("headcount", {
                            required: "Pick a headcount range",
                          })}
                          type="radio"
                          value={bucket}
                          className="peer sr-only"
                        />
                        <span className="block px-4 py-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] rounded-full border border-primary-100 text-gray-600 hover:border-primary/50 peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white transition-all">
                          {bucket}
                        </span>
                      </label>
                    ))}
                  </div>
                </Field>

                <Field label="Tell us about your event (optional)" className="sm:col-span-2">
                  <textarea
                    {...register("notes")}
                    rows={4}
                    placeholder="Vibe, favorite dishes, dietary needs, venue, time of day…"
                    className={`${inputBase} resize-none`}
                  />
                </Field>
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
                className="w-full sm:w-auto bg-black text-white px-10 py-3.5 text-xs uppercase tracking-widest border border-black hover:bg-primary hover:border-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending…</span>
                  </>
                ) : (
                  inquiry.submitLabel
                )}
              </button>

              <p className="text-[11px] text-gray-500">
                By submitting this form you agree to be contacted by the Casa de
                Flora events team.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Subcomponents ────────────────────────────────────────────────────────────

const inputBase =
  "w-full bg-white border border-primary-100 rounded-xl px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors";

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="block text-[10px] uppercase tracking-[0.22em] text-gray-600 mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </div>
  );
}

function SuccessState() {
  const { inquiry } = CATERING_CONTENT;
  return (
    <div className="bg-white border border-primary-100 rounded-3xl p-10 sm:p-12 text-center shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)]">
      <div className="mx-auto w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mb-5">
        <Check size={26} />
      </div>
      <h3 className="font-serif text-2xl sm:text-3xl text-black mb-3">
        {inquiry.successHeading}
      </h3>
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
        {inquiry.successBody}
      </p>
      <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-gray-500">
        — The Casa de Flora team
      </p>
    </div>
  );
}

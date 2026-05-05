"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Types ──────────────────────────────────────────────────────────────────
type FormValues = {
    fullName: string;
    phone: string;
    email: string;
    guests: string;
    date: string;
    time: string;
    bouquetType: string;
    cardMessage: string;
    specialRequests: string;
    terms: boolean;
};

// ── Sub-components ─────────────────────────────────────────────────────────

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
                <p className="mt-1.5 text-[10px] tracking-wide text-[#d4607e] opacity-80">
                    {error}
                </p>
            )}
        </div>
    );
}

const inputBase =
    "w-full bg-transparent border-0 border-b border-[#f2b8c6] pb-3 pt-1 text-[13px] font-light text-[#0e0b0b] placeholder:text-[#c9a0ac] focus:outline-none focus:border-[#d4607e] transition-colors duration-300 font-[family-name:var(--font-josefin)]";

// ── Main Component ─────────────────────────────────────────────────────────

export default function BouquetReservationForm() {
    const sectionRef = useRef<HTMLElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        reset,
    } = useForm<FormValues>({ mode: "onBlur" });

    // ── GSAP entrance ────────────────────────────────────────────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Left panel: slide in from left
            gsap.fromTo(
                leftRef.current,
                { x: -60, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                }
            );

            // Form fields: stagger up
            if (formRef.current) {
                const fields = formRef.current.querySelectorAll(".form-field");
                gsap.fromTo(
                    fields,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        stagger: 0.06,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 70%",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // ── Submit ───────────────────────────────────────────────────────────────
    const onSubmit = async (data: FormValues) => {
        // Replace with your actual API call
        await new Promise((r) => setTimeout(r, 1200));
        console.log("Reservation submitted:", data);
        reset();
    };

    return (
        <section
            ref={sectionRef}
            id="reservation"
            className="w-full  px-6 py-24 md:px-16 lg:px-20 lg:py-32"
        >
            <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-start">

                {/* ── Left Panel ── */}
                <div ref={leftRef} className="lg:sticky lg:top-32">
                    <p className="text-[9px] tracking-[0.4em] uppercase text-primary mb-4 font-light">
                        Reserve With Us
                    </p>

                    <h2
                        className=" text-6xl mb-8 font-display"
                    >
                        Bouquet<br />
                        <em className=" text-primary">Reservation</em>
                    </h2>

                    <p className="text-[12px] leading-[1.9]  mb-10 max-w-xs font-light tracking-wide">
                        Fill in your details and we'll confirm your table. Flower tickets
                        must be purchased at least{" "}
                        <strong className="font-normal text-primary">
                            24 hours in advance
                        </strong>{" "}
                        and are non-refundable.
                    </p>

                    

                    {/* Decorative line */}
                    <div className="mt-14 w-px h-24 bg-[#f2b8c6] ml-1 hidden lg:block" />
                </div>

                {/* ── Form ── */}
                {isSubmitSuccessful ? (
                    <SuccessState />
                ) : (
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8"
                        noValidate
                    >
                        {/* Name */}
                        <Field
                            label="First & Last Name *"
                            error={errors.fullName?.message}
                            className="form-field"
                        >
                            <input
                                {...register("fullName", { required: "Name is required" })}
                                placeholder="Your full name"
                                className={inputBase}
                            />
                        </Field>

                        {/* Phone */}
                        <Field
                            label="Phone"
                            error={errors.phone?.message}
                            className="form-field"
                        >
                            <input
                                {...register("phone")}
                                type="tel"
                                placeholder="+1 (000) 000-0000"
                                className={inputBase}
                            />
                        </Field>

                        {/* Email */}
                        <Field
                            label="Email *"
                            error={errors.email?.message}
                            className="form-field"
                        >
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email",
                                    },
                                })}
                                type="email"
                                placeholder="your@email.com"
                                className={inputBase}
                            />
                        </Field>

                        {/* Guests */}
                        <Field
                            label="Guests"
                            error={errors.guests?.message}
                            className="form-field"
                        >
                            <select
                                {...register("guests")}
                                className={`${inputBase} cursor-pointer appearance-none`}
                                defaultValue="1 Person"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                    <option key={n}>
                                        {n} {n === 1 ? "Person" : "People"}
                                    </option>
                                ))}
                            </select>
                        </Field>

                        {/* Date */}
                        <Field
                            label="Preferred Date *"
                            error={errors.date?.message}
                            className="form-field"
                        >
                            <input
                                {...register("date", { required: "Date is required" })}
                                type="date"
                                className={inputBase}
                            />
                        </Field>

                        {/* Time */}
                        <Field
                            label="Preferred Time"
                            error={errors.time?.message}
                            className="form-field"
                        >
                            <select
                                {...register("time")}
                                className={`${inputBase} cursor-pointer appearance-none`}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Select a time
                                </option>
                                <option>Morning (10am – 12pm)</option>
                                <option>Afternoon (12pm – 4pm)</option>
                                <option>Evening (4pm – 7pm)</option>
                            </select>
                        </Field>

                        {/* Bouquet Type */}
                        <Field
                            label="Bouquet Type"
                            error={errors.bouquetType?.message}
                            className="form-field"
                        >
                            <select
                                {...register("bouquetType")}
                                className={`${inputBase} cursor-pointer appearance-none`}
                                defaultValue="Small"
                            >
                                <option>Small</option>
                                <option>Medium</option>
                                <option>Large</option>
                            </select>
                        </Field>

                        {/* Card Message */}
                        <Field
                            label="Card Message"
                            error={errors.cardMessage?.message}
                            className="form-field"
                        >
                            <input
                                {...register("cardMessage")}
                                placeholder="Optional gift message"
                                className={inputBase}
                            />
                        </Field>

                        {/* Special Requests — full width */}
                        <Field
                            label="Special Requests"
                            error={errors.specialRequests?.message}
                            className="form-field sm:col-span-2"
                        >
                            <textarea
                                {...register("specialRequests")}
                                placeholder="Allergies, occasion details, accessibility needs..."
                                rows={3}
                                className={`${inputBase} resize-none`}
                            />
                        </Field>

                        {/* Terms — full width */}
                        <div className="form-field sm:col-span-2 flex items-start gap-3 mt-1">
                            <input
                                {...register("terms", {
                                    required: "You must accept the terms",
                                })}
                                type="checkbox"
                                id="terms"
                                className="mt-0.5 flex-shrink-0 accent-[#d4607e] w-3.5 h-3.5 cursor-pointer"
                            />
                            <label
                                htmlFor="terms"
                                className="text-[11px] leading-[1.7] text-[#5a3f3f] cursor-pointer"
                            >
                                By checking, you agree to our{" "}
                                <a
                                    href="/terms"
                                    className="text-[#d4607e] hover:text-[#8b2a44] transition-colors"
                                >
                                    Terms of Service
                                </a>{" "}
                                &{" "}
                                <a
                                    href="/privacy"
                                    className="text-[#d4607e] hover:text-[#8b2a44] transition-colors"
                                >
                                    Privacy Policy
                                </a>
                                .
                            </label>
                            {errors.terms && (
                                <p className="text-[10px] text-[#d4607e] mt-1">
                                    {errors.terms.message}
                                </p>
                            )}
                        </div>

                        {/* Submit — full width */}
                        <div className="form-field sm:col-span-2 mt-4">
                            <SubmitButton isSubmitting={isSubmitting} />
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}

// ── Submit Button ──────────────────────────────────────────────────────────

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleMouseEnter = () => {
        gsap.to(btnRef.current, {
            backgroundColor: "#8b2a44",
            duration: 0.3,
            ease: "power2.out",
        });
    };
    const handleMouseLeave = () => {
        gsap.to(btnRef.current, {
            backgroundColor: "#0e0b0b",
            duration: 0.3,
            ease: "power2.out",
        });
    };

    return (
        <button
            ref={btnRef}
            type="submit"
            disabled={isSubmitting}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-full sm:w-auto bg-[#0e0b0b] text-[#fdf8f5] px-12 py-5 text-[10px] tracking-[0.3em] uppercase font-light disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center gap-4"
        >
            {isSubmitting ? (
                <>
                    <span className="inline-block w-3.5 h-3.5 border border-[#fdf8f5] border-t-transparent rounded-full animate-spin" />
                    Submitting…
                </>
            ) : (
                <>
                    Submit Reservation
                    <span className="text-base leading-none">→</span>
                </>
            )}
        </button>
    );
}

// ── Success State ──────────────────────────────────────────────────────────

function SuccessState() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(
            ref.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
    }, []);

    return (
        <div
            ref={ref}
            className="flex flex-col justify-center py-24 lg:py-0 lg:min-h-[600px]"
        >
            <div className="w-px h-16 bg-[#f2b8c6] mb-10" />
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#d4607e] mb-4 font-light">
                Confirmed
            </p>
            <h3
                className="font-serif text-[clamp(32px,4vw,50px)] font-light leading-tight text-[#0e0b0b] mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
                Your table is<br />
                <em className="italic text-[#d4607e]">reserved.</em>
            </h3>
            <p className="text-[12px] leading-[1.9] text-[#5a3f3f] max-w-sm font-light tracking-wide">
                We'll be in touch shortly to confirm the details. Don't forget — flower
                tickets must be purchased at least 24 hours in advance.
            </p>
        </div>
    );
}
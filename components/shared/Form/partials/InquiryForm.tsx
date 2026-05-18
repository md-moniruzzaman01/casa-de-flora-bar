"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { api, type ApiError } from "@/lib/api";
import { FormData } from "../config/types";
import { useContent } from "@/lib/ContentProvider";




function isApiError(e: unknown): e is ApiError {
  return typeof e === "object" && e !== null && "status" in e && "message" in e;
}

const InquiryForm = () => {
  const Inquiry_Form_Data = useContent().inquiryForm;
  const containerRef = useRef(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormData>();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-item", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      await api.post("/api/inquiries", {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() || undefined,
        subject: data.subject,
        message: data.message.trim(),
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

  const inputCls =
    "w-full border border-pink-100 bg-pink-50/20 p-4 outline-none focus:border-pink-300 transition-colors duration-300 font-serif text-[15px] placeholder:text-gray-400";
  const labelCls = "text-sm tracking-wide";
  const errorCls = "mt-1 text-sm text-red-600";

  return (
    <section
      ref={containerRef}
      className="max-w-7xl mx-auto px-6 py-11 md:py-20 my-20 md:my-40 font-serif"
      id="inquiry"
    >
      <div className="text-center mb-16">
        <h1 className="animate-item text-5xl md:text-6xl tracking-widest uppercase mb-4">
          {Inquiry_Form_Data.title}
        </h1>
        <p className="animate-item text-xl tracking-wide uppercase italic">
          {Inquiry_Form_Data.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side */}
        <div className="lg:col-span-4 space-y-6">
          <p className="animate-item text-lg leading-relaxed text-gray-700">
            {Inquiry_Form_Data.sidebar.text}
          </p>
          <ul className="animate-item space-y-3 text-sm text-gray-600">
            {Inquiry_Form_Data.sidebar.points.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-pink-300 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
        {isSubmitSuccessful ? (
          <div className="lg:col-span-8 flex flex-col items-center justify-center py-20 text-center border border-pink-100 bg-pink-50/20 px-6">
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-5">
              <Check size={24} />
            </div>
            <p className="font-serif italic text-3xl text-black mb-3">
              {Inquiry_Form_Data.successMessage.title}
            </p>
            <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
              {Inquiry_Form_Data.successMessage.body}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            noValidate
          >
            {/* Name */}
            <div className="animate-item space-y-2">
              <label className={labelCls}>Your Name (required)</label>
              <input
                {...register("name", { required: "Name is required" })}
                className={inputCls}
                placeholder={Inquiry_Form_Data.placeholders.name}
              />
              {errors.name && <p className={errorCls}>{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="animate-item space-y-2">
              <label className={labelCls}>Email Address (required)</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address",
                  },
                })}
                type="email"
                className={inputCls}
                placeholder={Inquiry_Form_Data.placeholders.email}
              />
              {errors.email && <p className={errorCls}>{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div className="animate-item space-y-2">
              <label className={labelCls}>Phone Number</label>
              <input
                {...register("phone")}
                type="tel"
                className={inputCls}
                placeholder={Inquiry_Form_Data.placeholders.phone}
              />
            </div>

            {/* Subject */}
            <div className="animate-item space-y-2">
              <label className={labelCls}>Subject (required)</label>
              <div className="relative">
                <select
                  {...register("subject", { required: "Please select a subject" })}
                  className={`${inputCls} cursor-pointer appearance-none`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {Inquiry_Form_Data.placeholders.subject}
                  </option>
                  {Inquiry_Form_Data.subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              {errors.subject && (
                <p className={errorCls}>{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="animate-item md:col-span-2 space-y-2">
              <label className={labelCls}>Your Message (required)</label>
              <textarea
                {...register("message", { required: "Please include a message" })}
                rows={6}
                className={`${inputCls} resize-none`}
                placeholder={Inquiry_Form_Data.placeholders.message}
              />
              {errors.message && (
                <p className={errorCls}>{errors.message.message}</p>
              )}
            </div>

            {/* Error banner */}
            {submitError && (
              <div
                className="md:col-span-2 flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 p-3"
                role="alert"
              >
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Submit */}
            <div className="animate-item md:col-span-2 flex justify-center mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white w-full md:w-1/2 py-4 uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending…</span>
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default InquiryForm;
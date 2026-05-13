"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Check, AlertCircle } from "lucide-react";
import { api, type ApiError } from "@/lib/api";
import { WEDDING_FLORALS_CONTENT } from '../config/constant';

interface EventRentalFormData {
  name: string;
  email: string;
  phone: string;
  selectedSpace: string;
  eventType: string;
  guests: string;
  date: string;
  startTime: string;
  endTime: string;
  cateringRequired: boolean;
  specialRequests: string;
  message: string;
}

const VALID_EVENT_TYPES = [
  'WEDDING',
  'BIRTHDAY',
  'CORPORATE',
  'SEMINAR',
  'ANNIVERSARY',
  'OTHER',
];

function isApiError(e: unknown): e is ApiError {
  return typeof e === "object" && e !== null && "status" in e && "message" in e;
}

const EventRentalSection = () => {
  const { event_rental_section: content } = WEDDING_FLORALS_CONTENT;
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<EventRentalFormData>({
    defaultValues: {
      cateringRequired: false,
      eventType: 'OTHER',
    }
  });

  const onSubmit = async (data: EventRentalFormData) => {
    setSubmitError(null);
    try {
      await api.post("/api/event-bookings", {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        selectedSpace: data.selectedSpace,
        eventType: data.eventType,
        guests: parseInt(data.guests, 10),
        date: data.date,
        startTime: data.startTime.trim(),
        endTime: data.endTime.trim(),
        cateringRequired: data.cateringRequired,
        specialRequests: `${data.specialRequests.trim()}\n\nAdditional Message: ${data.message.trim()}`.trim(),
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

  const inputCls = "w-full bg-[#FFFBFA] border border-[#FDE2E4] px-4 py-4 focus:outline-none focus:border-pink-200 transition-colors placeholder:text-gray-400 text-base";
  const labelCls = "font-serif text-sm text-gray-700";
  const errorCls = "mt-1 text-xs text-red-500 font-serif";

  return (
    <section id="eventbook" className="bg-white py-12 px-6 md:py-24 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20">
          <h1 className="font-serif text-[#1A1A1A] text-5xl md:text-8xl tracking-tight mb-4 uppercase">
            {content.title}
          </h1>
          <p className="font-serif text-[#1A1A1A] text-lg md:text-2xl tracking-[0.1em] uppercase">
            {content.subtitle}
          </p>
        </div>

        <div>
          {isSubmitSuccessful ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-[#FFFBFA] border border-[#FDE2E4] px-6">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-6">
                <Check size={32} />
              </div>
              <h3 className="font-serif text-3xl text-black mb-4 uppercase tracking-wide">Request Received</h3>
              <p className="text-gray-600 max-w-md leading-relaxed font-serif">
                Thank you for your interest in hosting an event at Casa De Flora Bar. 
                Our team will review your request and get back to you within 24-48 hours.
              </p>
              <button 
                onClick={() => reset()}
                className="mt-8 text-sm uppercase tracking-widest border-b border-black pb-1 hover:text-pink-400 hover:border-pink-400 transition-colors"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              
              {/* Name */}
              <div className="md:col-span-2 space-y-2">
                <label className={labelCls}>{content.form_labels.name}</label>
                <input 
                  {...register("name", { required: "Name is required" })}
                  type="text" 
                  placeholder="Full Name"
                  className={inputCls}
                />
                {errors.name && <p className={errorCls}>{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className={labelCls}>{content.form_labels.email}</label>
                <input 
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email address"
                    }
                  })}
                  type="email" 
                  placeholder="Email"
                  className={inputCls}
                />
                {errors.email && <p className={errorCls}>{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className={labelCls}>{content.form_labels.phone} (required)</label>
                <input 
                  {...register("phone", { required: "Phone number is required" })}
                  type="tel" 
                  placeholder="Phone"
                  className={inputCls}
                />
                {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
              </div>

              {/* Event Type */}
              <div className="space-y-2 relative">
                <label className={labelCls}>Event Type (required)</label>
                <div className="relative">
                  <select 
                    {...register("eventType", { required: "Please select an event type" })}
                    defaultValue="OTHER"
                    className={`${inputCls} appearance-none cursor-pointer`}
                  >
                    {VALID_EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.eventType && <p className={errorCls}>{errors.eventType.message}</p>}
              </div>

              {/* Selected Space */}
              <div className="space-y-2 relative">
                <label className={labelCls}>{content.form_labels.event_type} (required)</label>
                <div className="relative">
                  <select 
                    {...register("selectedSpace", { required: "Please select a space" })}
                    defaultValue="" 
                    className={`${inputCls} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>Select Your Space</option>
                    {content.event_options.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.selectedSpace && <p className={errorCls}>{errors.selectedSpace.message}</p>}
              </div>

              {/* Guest Count */}
              <div className="space-y-2">
                <label className={labelCls}>{content.form_labels.guests}</label>
                <input 
                  {...register("guests", { 
                    required: "Guest count is required",
                    min: { value: 2, message: "Minimum 2 guests" }
                  })}
                  type="number" 
                  placeholder="e.g. 40"
                  className={inputCls}
                />
                {errors.guests && <p className={errorCls}>{errors.guests.message}</p>}
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className={labelCls}>{content.form_labels.date}</label>
                <input 
                  {...register("date", { required: "Date is required" })}
                  type="date"
                  className={`${inputCls} text-gray-600`}
                />
                {errors.date && <p className={errorCls}>{errors.date.message}</p>}
              </div>

              {/* Start Time */}
              <div className="space-y-2">
                <label className={labelCls}>Start Time (required)</label>
                <input 
                  {...register("startTime", { required: "Start time is required" })}
                  type="text" 
                  placeholder="e.g. 7:00 PM"
                  className={inputCls}
                />
                {errors.startTime && <p className={errorCls}>{errors.startTime.message}</p>}
              </div>

              {/* End Time */}
              <div className="space-y-2">
                <label className={labelCls}>End Time (required)</label>
                <input 
                  {...register("endTime", { required: "End time is required" })}
                  type="text" 
                  placeholder="e.g. 11:00 PM"
                  className={inputCls}
                />
                {errors.endTime && <p className={errorCls}>{errors.endTime.message}</p>}
              </div>

              {/* Catering Toggle */}
              <div className="md:col-span-2 flex items-center space-x-3 py-2">
                <input 
                  {...register("cateringRequired")}
                  type="checkbox" 
                  id="catering"
                  className="w-5 h-5 accent-black border-[#FDE2E4] rounded focus:ring-0 cursor-pointer"
                />
                <label htmlFor="catering" className="font-serif text-sm text-gray-700 cursor-pointer select-none">
                  {content.form_labels.catering}
                </label>
              </div>

              {/* Special Requests */}
              <div className="md:col-span-2 space-y-2">
                <label className={labelCls}>{content.form_labels.special_requests}</label>
                <textarea 
                  {...register("specialRequests")}
                  rows={4}
                  placeholder="Any specific vision..."
                  className={`${inputCls} resize-none`}
                ></textarea>
              </div>

              {/* Message */}
              <div className="md:col-span-2 space-y-2">
                <label className={labelCls}>{content.form_labels.message}</label>
                <textarea 
                  {...register("message", { required: "Please include a message" })}
                  rows={4}
                  placeholder="Tell us more about your event..."
                  className={`${inputCls} resize-none`}
                ></textarea>
                {errors.message && <p className={errorCls}>{errors.message.message}</p>}
              </div>

              {/* Error banner */}
              {submitError && (
                <div className="md:col-span-2 flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 p-4" role="alert">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="md:col-span-2 pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-1/2 lg:w-1/3 mx-auto flex items-center justify-center gap-3 bg-black text-white py-4 font-serif text-lg tracking-wider hover:bg-neutral-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    content.form_labels.submit
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventRentalSection;
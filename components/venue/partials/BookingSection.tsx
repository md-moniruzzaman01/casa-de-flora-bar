"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Loader2, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import { FormValues } from "../config/types";

const SERVICE_OPTIONS = [
  "Venue Rental Only",
  "All-Inclusive Brunch or Dinner",
  "Private Brunch Sip & Clip",
  "Grand Bloom Wedding Packages",
];

const SPACE_OPTIONS = [
  "Garden Room - Up to 40 Guests",
  "Main Hall - Up to 100 Guests",
  "Full Venue - Up to 150 Guests",
];

const TIME_SLOTS = [
  "11am - 3pm",
  "12pm - 4pm",
  "6pm - 10pm",
  "7pm - 11pm"
];

const BookingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>(["Venue Rental Only"]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      services: ["Venue Rental Only"],
      selected_space: "Garden Room - Up to 40 Guests"
    }
  });

  // GSAP Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".bk-form-row", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggleService = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    setSelectedServices(updated);
    setValue("services", updated);
  };

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);

    // Sync cateringRequired based on service selection
    const cateringNeeded = selectedServices.some(s =>
      s.includes("Brunch") || s.includes("Dinner") || s.includes("Packages")
    );

    // Parse time slots (e.g., "11am - 3pm")
    const [start, end] = data.time_slot.split(" - ");

    // Map user-provided event type to backend enum
    const rawType = (data.event_type || "").toUpperCase();
    const validTypes = ["WEDDING", "BIRTHDAY", "CORPORATE", "SEMINAR", "ANNIVERSARY"];
    const eventType = validTypes.includes(rawType) ? rawType : "OTHER";

    try {
      await api.post("/api/event-bookings", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        selectedSpace: data.selected_space,
        eventType,
        // Strip non-numeric chars from guest string (e.g., "8 Person" -> 8)
        guests: parseInt(data.guests.toString().replace(/\D/g, ""), 10) || 0,
        date: new Date(data.event_date).toISOString(),
        startTime: start || "",
        endTime: end || "",
        cateringRequired: cateringNeeded,
        specialRequests: (data.message || "") + (eventType === "OTHER" ? ` (Event Type: ${data.event_type})` : ""),
        bookingType: "VENUE", // As per your model default
      });
      reset();
      setSelectedServices(["Venue Rental Only"]);
    } catch (err) {
      setSubmitError("Something went wrong. Please check your inputs and try again.");
    }
  };

  const inputBase = "w-full border border-pink-100 bg-pink-50/20 p-4 outline-none text-black placeholder:text-gray-400 font-serif text-[15px] focus:border-pink-400 transition-colors";
  const labelBase = "block text-sm text-gray-700 mb-1 font-serif";

  return (
    <section ref={sectionRef} className=" py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 md:p-12 ">
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-10 text-gray-800">
          Please fill-up for Rental
        </h2>

        {isSubmitSuccessful ? (
          <div className="text-center py-12">
            <h3 className="font-serif text-2xl text-pink-600 mb-2">Thank You!</h3>
            <p className="text-gray-600">Your rental request has been submitted successfully.</p>
            <button onClick={() => window.location.reload()} className="mt-6 text-sm underline uppercase tracking-widest">Send another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div className="bk-form-row">
              <label className={labelBase}>Name</label>
              <input {...register("name", { required: "Name is required" })} placeholder="Name" className={inputBase} />
              {errors.name && <span className="text-xs text-red-400">{errors.name.message}</span>}
            </div>

            {/* Email & Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bk-form-row">
                <label className={labelBase}>Email</label>
                <input {...register("email", { required: "Email is required" })} placeholder="Email" className={inputBase} />
              </div>
              <div className="bk-form-row">
                <label className={labelBase}>Phone</label>
                <input {...register("phone")} placeholder="Phone" className={inputBase} />
              </div>
            </div>

            {/* Services Chips */}
            <div className="bk-form-row">
              <label className={labelBase}>What services are you interested in? (required)</label>
              <div className="flex flex-wrap gap-3 mt-2">
                {SERVICE_OPTIONS.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`px-4 py-2 text-sm font-serif transition-colors border ${selectedServices.includes(service)
                        ? "bg-[#D23669] text-white border-[#D23669]"
                        : "bg-pink-100/40 text-gray-700 border-transparent hover:bg-pink-100"
                      }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Space */}
            <div className="bk-form-row relative">
              <label className={labelBase}>Select Your Space</label>
              <select {...register("selected_space")} className={`${inputBase} appearance-none`}>
                {SPACE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronDown className="absolute right-4 bottom-4 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bk-form-row">
                <label className={labelBase}>Preferred Date (required)</label>
                <input type="date" {...register("event_date", { required: true })} className={inputBase} />
              </div>
              <div className="bk-form-row relative">
                <label className={labelBase}>Time</label>
                <select {...register("time_slot")} className={`${inputBase} appearance-none`}>
                  <option value="">Select a slot...</option>
                  {TIME_SLOTS.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                </select>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">In Eastern Time</p>
                <ChevronDown className="absolute right-4 bottom-7 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Guests & Event Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bk-form-row">
                <label className={labelBase}>Number of Guest</label>
                <input type="text" {...register("guests")} placeholder="e.g. 8 Person" className={inputBase} />
              </div>
              <div className="bk-form-row">
                <label className={labelBase}>Type of event</label>
                <input {...register("event_type")} placeholder="e.g. Birthday, Bridal Shower..." className={inputBase} />
              </div>
            </div>

            {/* Message */}
            <div className="bk-form-row">
              <label className={labelBase}>Message (required)</label>
              <textarea
                {...register("message", { required: "Please provide some details" })}
                rows={5}
                placeholder="Special requests, dietary needs, vision for your event..."
                className={inputBase}
              />
            </div>

            {submitError && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 border border-red-100">
                <AlertCircle size={16} />
                {submitError}
              </div>
            )}

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-20 py-4 uppercase tracking-[0.2em] font-serif hover:bg-gray-800 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default BookingSection;
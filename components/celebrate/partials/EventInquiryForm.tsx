"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CELEBRATE_CONTENT } from "../config/constant";

gsap.registerPlugin(ScrollTrigger);

const EventInquiryForm = () => {
  const container = useRef<HTMLDivElement>(null);
  const { formSection } = CELEBRATE_CONTENT;
  const [selectedService, setSelectedService] = useState("");

  const services = [
    "Rental Only",
    "All Inclusive",
    "Brunch Sip & Clip",
    "Private Sip & Clip",
    "Intimate Wedding",
  ];

  useGSAP(() => {
    gsap.from(".form-container", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-20 px-6 md:px-12 lg:px-24 bg-[#FDE8E9]/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-[#1a1a1a] mb-12">
          {formSection.title}
        </h2>

        <div className="form-container bg-white rounded-[30px] p-8 md:p-12 shadow-sm border border-[#FDE8E9]">
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-serif mb-2">Name</label>
              <input 
                type="text" 
                placeholder="Name"
                className="w-full p-3 bg-[#FCF9F9] border border-[#FDE8E9] rounded-md focus:outline-none focus:border-[#D6768B] transition-colors"
              />
            </div>

            {/* Email & Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-serif mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="Email"
                  className="w-full p-3 bg-[#FCF9F9] border border-[#FDE8E9] rounded-md focus:outline-none focus:border-[#D6768B]"
                />
              </div>
              <div>
                <label className="block text-sm font-serif mb-2">Phone</label>
                <input 
                  type="tel" 
                  placeholder="Phone"
                  className="w-full p-3 bg-[#FCF9F9] border border-[#FDE8E9] rounded-md focus:outline-none focus:border-[#D6768B]"
                />
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-sm font-serif mb-3">
                What services are you interested in? (required)
              </label>
              <div className="flex flex-wrap gap-3">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className={`px-4 py-2 text-xs border rounded-sm transition-all ${
                      selectedService === service
                        ? "bg-[#D6768B] border-[#D6768B] text-white"
                        : "bg-[#FDE8E9] border-[#FDE8E9] text-[#1a1a1a] hover:bg-[#D6768B] hover:text-white"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-serif mb-2">Preferred Date (required)</label>
                <input type="date" className="w-full p-3 bg-[#FCF9F9] border border-[#FDE8E9] rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-serif mb-2">Time</label>
                <p className="text-[10px] text-gray-500 mb-1">Options: 11am - 3pm/12pm - 4pm/6pm - 10/7pm - 11pm</p>
                <input type="text" placeholder="-- : -- -- : --" className="w-full p-3 bg-[#FCF9F9] border border-[#FDE8E9] rounded-md" />
              </div>
            </div>

            {/* Source / Referral */}
            <div>
              <label className="block text-sm font-serif mb-2">How did you hear about us?</label>
              <textarea 
                placeholder="Tell us what kind of event..."
                rows={3}
                className="w-full p-3 bg-[#FCF9F9] border border-[#FDE8E9] rounded-md resize-none"
              ></textarea>
            </div>

            {/* Guest Count & Event Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-serif mb-2">Number of Guest</label>
                <input type="text" placeholder="8 Person" className="w-full p-3 bg-[#FCF9F9] border border-[#FDE8E9] rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-serif mb-2">Type of event</label>
                <input type="text" placeholder="e.g. Birthday, Bridal Shower..." className="w-full p-3 bg-[#FCF9F9] border border-[#FDE8E9] rounded-md" />
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <label className="block text-sm font-serif mb-2">Anything else we should know?</label>
              <textarea 
                placeholder="Special requests, dietary needs, vision for your event..."
                rows={3}
                className="w-full p-3 bg-[#FCF9F9] border border-[#FDE8E9] rounded-md resize-none"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="flex justify-center pt-6">
              <button className="bg-black text-white px-20 py-4 text-xs tracking-[0.3em] uppercase hover:bg-gray-800 transition-all shadow-lg active:scale-95">
                {formSection.buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EventInquiryForm;
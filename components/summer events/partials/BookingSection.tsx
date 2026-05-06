"use client";

import React, { useState } from "react";
import { Minus, Plus, ChevronRight } from "lucide-react";
import { SUMMER_EVENTS_CONTENT } from "../config/constant";

export default function BookingSection() {
  const [guests, setGuests] = useState(1);
  const pricePerPerson = parseInt(
    SUMMER_EVENTS_CONTENT.pricing.price.replace("$", ""),
  );

  const { about, pricing } = SUMMER_EVENTS_CONTENT;

  return (
    <section
      id="booking"
      className="bg-white px-6 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-20">

        {/* ── LEFT: About + What's Included ── */}
        <div className="flex-1 w-full space-y-10 sm:space-y-12">

          {/* About */}
          <div id="about" className="max-w-xl">
            <h2 className="font-serif leading-[1.05] tracking-tight text-black">
              <span className="block text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px]">
                {about.title}
              </span>
              <span className="block italic font-light text-primary text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px] -mt-1">
                {about.titleHighlight}
              </span>
            </h2>

            <div className="h-[1px] w-16 bg-[#E8A0B5] mt-5 sm:mt-6 mb-6 sm:mb-7" />

            <p className="text-gray-700 text-base sm:text-lg font-light leading-relaxed">
              {about.description}
            </p>
          </div>

          {/* What's Included card */}
          <div className="rounded-[24px] sm:rounded-[32px] bg-primary-100/60 p-6 sm:p-8 md:p-10 lg:p-12 border border-primary-200/60">
            <h3 className="font-serif italic text-2xl sm:text-3xl text-black mb-6 sm:mb-8 pb-4 sm:pb-5 border-b border-primary-200/70">
              {about.whatsIncluded.title}
            </h3>

            <div className="space-y-5 sm:space-y-6">
              {about.whatsIncluded.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 sm:gap-5 items-start group">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-primary-300 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1 bg-white">
                    <div className="w-1.5 h-1.5 bg-primary-300 rounded-full group-hover:bg-primary transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-medium text-black text-sm sm:text-base">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Booking card ── */}
        <div className="w-full lg:w-[420px] xl:w-[460px] lg:sticky lg:top-10 flex-shrink-0">
          <div className="rounded-[24px] sm:rounded-[32px] border border-primary-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden bg-white">

            {/* Price header */}
            <div className="bg-primary-100 px-6 sm:px-8 md:px-10 py-7 sm:py-8 md:py-10">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-serif text-black">
                  {pricing.price}
                </span>
                <span className="text-gray-600 text-sm sm:text-base">
                  {pricing.unit}
                </span>
              </div>
              <p className="text-gray-700 mt-1 text-sm sm:text-base">
                {pricing.subtext}
              </p>
            </div>

            <div className="p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">

              {/* Date / Time / Guests */}
              <div className="border border-primary-100 rounded-[18px] sm:rounded-[20px] p-5 sm:p-6 space-y-6 sm:space-y-7">

                {/* Dates */}
                <div>
                  <label className="text-[10px] sm:text-[11px] font-semibold text-gray-500 block mb-3 uppercase tracking-[0.18em]">
                    {pricing.booking.calendarLabel}
                  </label>
                  <div className="flex gap-2 sm:gap-3 items-center">
                    <button className="flex-1 bg-primary-100 border border-primary-200 py-2.5 sm:py-3 rounded-xl text-center ring-2 ring-primary-100 ring-offset-1">
                      <p className="text-[9px] sm:text-[10px] font-bold uppercase text-primary tracking-wider">
                        July 06
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-black">
                        Monday
                      </p>
                    </button>
                    <button className="flex-1 border border-primary-100 py-2.5 sm:py-3 rounded-xl text-center hover:bg-primary-50 transition-colors">
                      <p className="text-[9px] sm:text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                        July 13
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-600">
                        Monday
                      </p>
                    </button>
                    <ChevronRight className="text-primary-300" size={20} />
                  </div>
                </div>

                {/* Times */}
                <div>
                  <label className="text-[10px] sm:text-[11px] font-semibold text-gray-500 block mb-3 uppercase tracking-[0.18em]">
                    {pricing.booking.timeLabel}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {pricing.booking.times.map((time, i) => (
                      <button
                        key={i}
                        className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all ${
                          time === "6:00 PM"
                            ? "bg-primary-100 border border-primary-200 text-primary"
                            : "border border-primary-100 text-gray-600 hover:border-primary-300"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guests counter */}
                <div className="flex justify-between items-center pt-1">
                  <span className="text-xs sm:text-sm font-semibold text-black">
                    {pricing.booking.guestLabel}
                  </span>
                  <div className="flex items-center border border-primary-100 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="p-2.5 sm:p-3 hover:bg-primary-50 text-gray-400 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 sm:px-5 py-1 text-sm font-semibold text-black min-w-[36px] sm:min-w-[40px] text-center">
                      {guests}
                    </span>
                    <button
                      onClick={() => setGuests(guests + 1)}
                      className="p-2.5 sm:p-3 hover:bg-primary-50 text-gray-400 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-primary-100/60">
                <div className="flex justify-between text-gray-600 text-xs sm:text-sm">
                  <span>
                    {pricing.price} × {guests} Guest{guests > 1 ? "s" : ""}
                  </span>
                  <span className="font-semibold text-black">
                    ${pricePerPerson * guests}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 text-xs sm:text-sm">
                  <span>{pricing.booking.summary.serviceFeeLabel}</span>
                  <span className="font-semibold text-black">
                    {pricing.booking.summary.serviceFeeValue}
                  </span>
                </div>
                <div className="flex justify-between text-black pt-4 sm:pt-5 border-t border-primary-100 font-serif text-lg sm:text-xl">
                  <span>{pricing.booking.summary.totalLabel}</span>
                  <span>${pricePerPerson * guests}</span>
                </div>
              </div>

              {/* Submit — same button style as home */}
              <button className="w-full bg-black text-white py-4 sm:py-5 text-xs sm:text-sm uppercase tracking-widest border border-black hover:bg-transparent hover:text-black transition-all duration-300">
                {pricing.booking.buttonText}
              </button>

              <p className="text-[10px] sm:text-[11px] text-center text-gray-500 uppercase tracking-widest leading-relaxed">
                Non-refundable · reschedule available
                <br />
                Instant confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

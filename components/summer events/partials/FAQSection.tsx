"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import { SUMMER_EVENTS_CONTENT } from "../config/constant";

export default function FAQSection() {
  const { title, titleHighlight, description, questions } =
    SUMMER_EVENTS_CONTENT.faq;

  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggle = (index: number) => {
    const isOpening = activeIndex !== index;
    const next = isOpening ? index : null;

    // Close currently open panel
    if (activeIndex !== null && contentRefs.current[activeIndex]) {
      gsap.to(contentRefs.current[activeIndex], {
        height: 0,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    // Open new panel
    if (isOpening && contentRefs.current[index]) {
      gsap.fromTo(
        contentRefs.current[index],
        { height: 0 },
        { height: "auto", duration: 0.35, ease: "power2.out", overwrite: "auto" },
      );
    }

    setActiveIndex(next);
  };

  return (
    <section className="bg-white px-6 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-28 lg:py-32 select-none">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-20 items-start">

        {/* ── Left intro ── */}
        <div className="lg:w-[40%] w-full">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-primary mb-3 sm:mb-4">
            FAQ
          </p>

          <h2 className="font-serif leading-[1.05] tracking-tight text-black">
            <span className="block text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px]">
              {title}
            </span>
            <span className="block italic font-light text-primary text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] -mt-1">
              {titleHighlight}
            </span>
          </h2>

          <div className="h-[1px] w-16 bg-[#E8A0B5] mt-5 sm:mt-6 mb-5 sm:mb-6" />

          <p className="text-gray-700 text-base sm:text-lg font-light leading-relaxed max-w-md">
            {description}
          </p>
        </div>

        {/* ── Right accordion ── */}
        <div className="lg:w-[60%] w-full space-y-3">
          {questions.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl sm:rounded-2xl transition-colors duration-300 overflow-hidden border ${
                  isOpen
                    ? "border-transparent bg-primary-100"
                    : "border-primary-100/70 bg-white hover:border-primary-200"
                }`}
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                >
                  <span className="text-sm sm:text-base md:text-lg font-medium text-black pr-4">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-gray-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <div
                  ref={(el) => { contentRefs.current[index] = el; }}
                  className="overflow-hidden"
                  style={{ height: index === 0 ? "auto" : 0 }}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-700 text-sm sm:text-base leading-relaxed max-w-[95%]">
                    {item.a || "Details for this question will be updated soon."}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

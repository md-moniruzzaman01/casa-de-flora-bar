"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";

// Using your exact data structure, updated with the content shown in your Figma screenshot
const SUMMER_EVENTS_CONTENT = {
  faq: {
    title: "Everything You",
    titleHighlight: "Need to Know",
    description: "An intimate evening filled with flowers, creativity, and connection. Guests enjoyed guided bouquet design, curated dining, and a warm, beautifully styled atmosphere.",
    questions: [
      {
        q: "Can I customize my event?",
        a: "Yes, we offer customizable experiences including décor, menu, and floral arrangements to match your vision."
      },
      { 
        q: "What group sizes do you accommodate?", 
        a: "We accommodate various group sizes, typically ranging from intimate gatherings of 10 to larger events of 50+ guests." 
      },
      { 
        q: "What's included in the event experience?", 
        a: "Our experience includes guided floral design, curated dining, and a beautifully styled atmosphere tailored to your theme." 
      },
      { 
        q: "Do you provide flowers and décor?", 
        a: "Yes! All floral materials, vessels, tools, and curated thematic tablescapes are fully provided and handled by our team." 
      },
      { 
        q: "How far in advance should I book?", 
        a: "We recommend booking at least 4 to 6 weeks in advance to secure your preferred date and allow ample time for custom planning." 
      },
      { 
        q: "How do I get started?", 
        a: "Simply fill out our inquiry form or send us an email, and our event coordinator will get back to you within 24 hours to schedule a consultation." 
      }
    ]
  }
};

export default function FAQSection() {
  const { title, titleHighlight, description, questions } = SUMMER_EVENTS_CONTENT.faq;
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // Default first open like Figma
  
  // Refs to target the answer container wrappers for GSAP height animations
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggle = (index: number) => {
    const isOpening = activeIndex !== index;
    const nextActiveIndex = isOpening ? index : null;

    // 1. If there is an currently open panel, animate it closed
    if (activeIndex !== null && contentRefs.current[activeIndex]) {
      gsap.to(contentRefs.current[activeIndex], {
        height: 0,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });
    }

    // 2. If we are opening a new panel, animate its height to auto
    if (isOpening && contentRefs.current[index]) {
      gsap.fromTo(
        contentRefs.current[index],
        { height: 0 },
        {
          height: "auto",
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto"
        }
      );
    }

    setActiveIndex(nextActiveIndex);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start select-none">
      {/* Left Content Column */}
      <div className="lg:w-[40%] w-full">
        <h2 className="text-[44px] md:text-[52px] leading-[1.1] font-serif font-normal text-[#1A1A1A] tracking-tight">
          {title} <br />
          <span className="text-[#E8A5C2] italic font-normal">{titleHighlight}</span>
        </h2>
        <p className="text-[#4A4A4A] text-base md:text-lg leading-relaxed mt-6 max-w-[460px]">
          {description}
        </p>
      </div>

      {/* Right Accordion Column */}
      <div className="lg:w-[60%] w-full space-y-[14px]">
        {questions.map((item, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                isOpen ? "border-transparent bg-[#FCE4EC]" : "border-gray-200 bg-white"
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => handleToggle(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-base md:text-lg font-medium text-[#1A1A1A] pr-4">
                  {item.q}
                </span>
                
                {/* Custom Chevron SVG */}
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <svg
                    className={`w-4 h-4 text-[#555555] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Accordion Body Wrapper (Controlled by GSAP) */}
              <div
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                className="overflow-hidden"
                style={{ 
                  // Ensure the default active index starts fully open, others closed
                  height: index === 0 ? "auto" : 0 
                }}
              >
                <div className="px-6 pb-6 text-[#4A4A4A] text-sm md:text-base leading-relaxed max-w-[90%]">
                  {item.a || "Details for this event feature will be updated soon."}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
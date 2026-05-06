"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SUMMER_EVENTS_CONTENT } from "../config/constant";
import WaveDividerUp from "@/components/shared/WaveDivider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EventFlowSection() {
  const { flow } = SUMMER_EVENTS_CONTENT;
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".flow-head > *", {
        y: 30, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".flow-image", {
        scale: 0.94, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(".flow-step", {
        y: 28, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full">
      <WaveDividerUp />

      <div className="bg-primary-200 px-6 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-28 lg:py-32">
        <div className="max-w-[1440px] mx-auto">

          {/* ── Header — uppercase serif, like home sections ── */}
          <div className="flow-head text-center mb-12 sm:mb-16 lg:mb-20 max-w-3xl mx-auto">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-primary mb-3 sm:mb-4">
              The Evening
            </p>
            <h2 className="font-serif uppercase leading-[0.95] tracking-tight text-[#222] text-[36px] sm:text-[48px] md:text-[64px] lg:text-[78px]">
              {flow.title}
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-20">

            {/* Image */}
            <div className="flow-image w-full lg:w-1/2">
              <div className="relative aspect-[4/3] rounded-[20px] sm:rounded-[28px] overflow-hidden shadow-sm">
                <Image
                  src={flow.img}
                  alt="Event atmosphere"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Steps */}
            <ol className="w-full lg:w-1/2 space-y-7 sm:space-y-9 md:space-y-10">
              {flow.steps.map((step) => (
                <li key={step.id} className="flow-step flex items-start gap-4 sm:gap-5 group">
                  {/* Step number — mirrors the home stat numerals */}
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center text-black font-serif text-base sm:text-lg shadow-sm border border-primary-100">
                    {step.id}
                  </div>

                  <div className="space-y-1 sm:space-y-1.5">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-black leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

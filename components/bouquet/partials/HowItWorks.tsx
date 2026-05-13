"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BOUQUET_CONTENT } from "../config/constant";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const container = useRef<HTMLDivElement>(null);
  const { howItWorks } = BOUQUET_CONTENT;

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    tl.from(".section-header", { y: 20, opacity: 0, duration: 0.8 })
      .from(".step-card", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.4");
  }, { scope: container });

  return (
    <section ref={container} className="px-2 py-12 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto bg-primary-100/80 rounded-[40px] p-2 md:p-20 text-center">

        {/* Section Header */}
        <div className="section-header mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a]">
            {howItWorks.heading}
          </h2>
          <p className="text-[#4a4a4a] text-sm md:text-base uppercase tracking-widest">
            {howItWorks.subheading}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-8">
          {howItWorks.steps.map((step, index) => (
            <div
              key={index}
              className="step-card bg-white rounded-3xl p-2 md:p-10 flex flex-col items-center shadow-sm"
            >
              <span className="text-2xl md:text-4xl font-serif text-[#1a1a1a] mb-2.5 md:mb-6">
                {step.number}
              </span>


              <div className="relative w-20 md:w-34 h-16 md:h-34 mb-2 md:mb-10 transition-transform duration-500 group-hover:scale-110">
                <Image
                  src={`/bouquet/${step.icon}`}
                  alt={step.title}
                  fill
                  className="object-contain"
                />
              </div>

              <h3 className="text-base md:text-xl font-serif mb-2.5 md:mb-4">
                {step.title}
              </h3>
              <p className="text-gray text-xs  md:text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

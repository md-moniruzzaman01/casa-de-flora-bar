"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BOUQUET_CONTENT } from "../config/constant";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
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
    <section ref={container} className="px-6 py-12 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto bg-[#FDE8E9] rounded-[40px] p-12 md:p-20 text-center">

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorks.steps.map((step, index) => (
            <div
              key={index}
              className="step-card bg-white rounded-3xl p-10 flex flex-col items-center shadow-sm"
            >
              <span className="text-4xl font-serif text-[#1a1a1a] mb-6">
                {step.number}
              </span>

              {/* Optional: Add an icon component here if you have SVG/Image assets */}
              {/* <div className="w-24 h-24 bg-[#FFF5F6] rounded-full mb-8 flex items-center justify-center">
                <span className="text-2xl">🌸</span>
              </div> */}


              <div className="relative w-20 md:w-34 h-16 md:h-34 mb-2 md:mb-10 transition-transform duration-500 group-hover:scale-110">
                <Image
                  src={`/bouquet/${step.icon}`}
                  alt={step.title}
                  fill
                  className="object-contain"
                />
              </div>

              <h3 className="text-xl font-serif  mb-4">
                {step.title}
              </h3>
              <p className="text-[#666666] text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
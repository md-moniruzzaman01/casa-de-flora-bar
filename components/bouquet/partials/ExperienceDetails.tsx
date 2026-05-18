"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useContent } from "@/lib/ContentProvider";

export default function ExperienceDetails() {
  const container = useRef<HTMLDivElement>(null);
  const { details } = useContent().bouquet;

  useGSAP(() => {
    gsap.from(".detail-card", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      stagger: 0.3,
      duration: 1,
      ease: "power2.out",
    });
  }, { scope: container });

  // The radial gradient from the top-left of the card as seen in image_da019b.png
  const cardGradient = {
    background: "radial-gradient(circle at 20% 20%, #FDE7EF 0%, #FFFFFF 100%)",
  };

  return (
    <section ref={container} className="py-16 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Experience Details Table */}
        <div 
          className="detail-card rounded-[35px] p-8 md:p-12 border border-[#FCE7EB] shadow-sm"
          style={cardGradient}
        >
          <h3 className="text-3xl font-serif italic mb-8 border-b border-[#FCE7EB] pb-4 text-[#1A1A1A]">
            {details.experienceDetails.title}
          </h3>
          <div className="space-y-5">
            {details.experienceDetails.rows.map((row, index) => (
              <div key={index} className="flex justify-between items-center border-b border-[#FCE7EB]/50 py-2 text-sm md:text-base">
                <span className="text-[#4A4A4A]">{row.label}</span>
                <span className="font-medium text-[#1A1A1A]">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Perfect For List */}
        <div 
          className="detail-card rounded-[35px] p-8 md:p-12 border border-[#FCE7EB] shadow-sm"
          style={cardGradient}
        >
          <h3 className="text-3xl font-serif italic mb-8 border-b border-[#FCE7EB] pb-4 text-[#1A1A1A]">
            {details.perfectFor.title}
          </h3>
          <ul className="space-y-5">
            {details.perfectFor.list.map((item, index) => (
              <li key={index} className="flex justify-between items-center border-b border-[#FCE7EB]/50 py-2 text-sm md:text-base">
                <span className="text-[#4A4A4A]">{item}</span>
                {/* Small heart from the Figma file */}
                <span className="text-[#F8B4C2] text-xs">♥</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};
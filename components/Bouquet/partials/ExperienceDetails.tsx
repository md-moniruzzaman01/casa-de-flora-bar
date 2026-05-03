"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BOUQUET_CONTENT } from "../config/constant";


export default function ExperienceDetails() {
  const container = useRef<HTMLDivElement>(null);
  const { details } = BOUQUET_CONTENT;

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

  return (
    <section ref={container} className="py-16 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Experience Details Table */}
        <div className="detail-card bg-[#FDE8E9] rounded-[30px] p-8 md:p-12">
          <h3 className="text-2xl font-serif italic mb-8 border-b border-[#D6768B]/20 pb-4">
            {details.experienceDetails.title}
          </h3>
          <div className="space-y-4">
            {details.experienceDetails.rows.map((row, index) => (
              <div key={index} className="flex justify-between items-center border-b border-[#D6768B]/10 py-2 text-sm md:text-base">
                <span className="text-[#4a4a4a]">{row.label}</span>
                <span className="font-medium text-[#1a1a1a]">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Perfect For List */}
        <div className="detail-card bg-[#FDE8E9] rounded-[30px] p-8 md:p-12">
          <h3 className="text-2xl font-serif italic mb-8 border-b border-[#D6768B]/20 pb-4">
            {details.perfectFor.title}
          </h3>
          <ul className="space-y-4">
            {details.perfectFor.list.map((item, index) => (
              <li key={index} className="flex justify-between items-center border-b border-[#D6768B]/10 py-2 text-sm md:text-base">
                <span className="text-[#4a4a4a]">{item}</span>
                <span className="text-[#D6768B] text-xs">♥</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};


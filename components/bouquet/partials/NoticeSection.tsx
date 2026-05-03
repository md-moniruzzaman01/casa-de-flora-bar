"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BOUQUET_CONTENT } from "../config/constant";


  export default function NoticeSection() {
  const container = useRef<HTMLDivElement>(null);
  const { notice } = BOUQUET_CONTENT;

  useGSAP(() => {
    gsap.from(".notice-box", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 90%",
      },
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
    });
  }, { scope: container });

  return (
    <section ref={container} className="pb-24 px-6 md:px-12 lg:px-24 bg-white flex flex-col items-center">
      {/* Notice Box */}
      <div className="notice-box max-w-5xl w-full border border-[#FDE8E9] rounded-[25px] p-8 md:p-10 mb-12 text-center md:text-left">
        <p className="text-[#4a4a4a] text-sm md:text-base leading-relaxed italic">
          <strong className="text-[#1a1a1a] not-italic mr-1">Important to know:</strong> 
          {notice.text}
        </p>
      </div>

      {/* Final CTA Button */}
      <button className="bg-black text-white px-12 py-4 text-sm tracking-widest uppercase hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
        {notice.ctaButton}
      </button>
    </section>
  );
};


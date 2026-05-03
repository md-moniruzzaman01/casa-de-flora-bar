"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BOUQUET_CONTENT } from "../config/constant";



  export default function QuoteSection() {
  const container = useRef<HTMLDivElement>(null);
  const { quote } = BOUQUET_CONTENT

  useGSAP(() => {
    gsap.from(".quote-content > *", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });
  }, { scope: container });

  return (
    <section ref={container} className="bg-white my-20 py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start quote-content">
        {/* Main Highlighted Quote */}
        <div className="border-l-2 border-[#D6768B] pl-8">
          <h2 className="text-2xl md:text-3xl font-serif leading-relaxed text-[#1a1a1a]">
            &quot;{quote.text}&quot;
          </h2>
        </div>

        {/* Supporting Description */}
        <div className="space-y-6 text-[#4a4a4a] text-sm md:text-base leading-loose">
          <p>{quote.secondaryText}</p>
        </div>
      </div>
    </section>
  );
};


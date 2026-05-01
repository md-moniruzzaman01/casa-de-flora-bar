"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CELEBRATE_CONTENT } from "../config/constant";


gsap.registerPlugin(ScrollTrigger);

const ExperiencePackages = () => {
  const container = useRef<HTMLDivElement>(null);
  const { experienceHeader, packages } = CELEBRATE_CONTENT;

  // Convert packages object to array for easier mapping
  const packageList = Object.values(packages);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
    });

    tl.from(".header-anim", {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
    }).from(
      ".package-card",
      {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.4"
    );
  }, { scope: container });

  return (
    <section ref={container} className="py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="header-anim text-4xl md:text-5xl font-serif text-[#1a1a1a]">
            {experienceHeader.title}
          </h2>
          <p className="header-anim text-[#4a4a4a] text-sm uppercase tracking-[0.2em]">
            {experienceHeader.subtitle}
          </p>
          <div className="header-anim flex justify-center mt-2">
            <div className="w-1 h-1 rounded-full bg-[#D6768B] mx-1"></div>
            <div className="w-1 h-1 rounded-full bg-[#D6768B] mx-1"></div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packageList.map((pkg, index) => (
            <div
              key={index}
              className={`package-card relative flex flex-col p-8 md:p-10 rounded-[30px] border transition-transform duration-500 hover:shadow-xl ${
                pkg.isDark 
                  ? "bg-[#1a1a1a] text-white border-transparent" 
                  : "bg-[#FDE8E9] text-[#1a1a1a] border-[#FDE8E9]"
              }`}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif">{pkg.title}</h3>
                  <p className={`italic font-serif text-xl ${pkg.isDark ? "text-[#D6768B]" : "text-[#D6768B]"}`}>
                    {pkg.tagline}
                  </p>
                </div>
                <div className={`px-4 py-1.5 rounded-full border text-xs tracking-widest uppercase ${
                  pkg.isDark 
                    ? "bg-[#D6768B] border-[#D6768B] text-white" 
                    : "border-black/20 text-[#1a1a1a]"
                }`}>
                  {pkg.price}
                </div>
              </div>

              {/* Description */}
              <p className={`text-sm leading-relaxed mb-8 ${pkg.isDark ? "text-gray-300" : "text-[#4a4a4a]"}`}>
                {pkg.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-10 flex-grow">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start text-sm">
                    <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D6768B] shrink-0" />
                    <span className={pkg.isDark ? "text-gray-300" : "text-[#4a4a4a]"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <button className={`w-full py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 border ${
                pkg.isDark 
                  ? "bg-white text-black hover:bg-gray-200" 
                  : "bg-transparent border-black/10 text-black hover:bg-black hover:text-white"
              }`}>
                {pkg.ctaText}
              </button>
            </div>
          ))}
        </div>

        {/* Global CTA */}
        <div className="mt-20 flex justify-center">
          <button className="bg-black text-white px-12 py-4 text-xs tracking-[0.3em] uppercase hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg">
            Reserve your table
          </button>
        </div>

      </div>
    </section>
  );
};

export default ExperiencePackages;
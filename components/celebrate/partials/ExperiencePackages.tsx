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
    <section
      ref={container}
      className="py-20 px-6 md:px-12 lg:px-24 bg-white"
    >
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <h2 className="header-anim font-serif text-5xl md:text-[52px] font-normal text-[#1a1a1a] tracking-tight">
            {experienceHeader.title}
          </h2>
          <p className="header-anim text-[#4a4a4a] text-[11px] uppercase tracking-[0.2em]">
            {experienceHeader.subtitle}
          </p>
          <div className="header-anim flex justify-center gap-1.5 pt-1">
            <div className="w-[5px] h-[5px] rounded-full bg-[#D6768B]" />
            <div className="w-[5px] h-[5px] rounded-full bg-[#D6768B]" />
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packageList.map((pkg, index) => {
            const isDark = pkg.featured;

            return (
              <div
                key={index}
                className="package-card flex flex-col rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.07)]"
              >
                {/* ── Card Header ── */}
                <div
                  className={`px-7 pt-7 pb-6 ${isDark ? "bg-[#1a1a1a]" : ""}`}
                  style={
                    !isDark
                      ? {
                          background:
                            "linear-gradient(to bottom, #F0D5DB 0%, #FAF0F2 100%)",
                        }
                      : undefined
                  }
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h3
                        className={`font-serif text-[30px] font-normal leading-tight ${
                          isDark ? "text-white" : "text-[#1a1a1a]"
                        }`}
                      >
                        {pkg.title}
                      </h3>
                      <p className="font-serif italic text-[28px] text-[#D6768B] leading-snug mt-0.5">
                        {pkg.tagline}
                      </p>
                    </div>

                    {/* Badge — Most Popular (dark card) or Price pill (light card) */}
                    {isDark ? (
                      <span className="mt-1 shrink-0 bg-[#D6768B] text-white text-[11px] font-medium tracking-wide rounded-full px-4 py-1.5">
                        Most Popular
                      </span>
                    ) : (
                      <span className="mt-1 shrink-0 rounded-full px-4 py-1.5 text-[12.5px] font-serif border border-black/25 text-[#1a1a1a] whitespace-nowrap bg-white/60">
                        {pkg.price}
                      </span>
                    )}
                  </div>
                </div>

                {/* ── Card Body ── */}
                <div
                  className="px-7 pt-6 pb-8 flex flex-col flex-grow"
                  style={
                    isDark
                      ? { background: "#ffffff" }
                      : {
                          background:
                            "linear-gradient(to bottom, #ffffff 30%, #FAF0F2 100%)",
                        }
                  }
                >
                  <p className="font-serif text-[16px] leading-[1.75] text-[#1a1a1a] mb-5">
                    {pkg.description}
                  </p>

                  <ul className="space-y-2.5 mb-8 flex-grow">
                    {pkg.features.map((feature: string, fIndex: number) => (
                      <li
                        key={fIndex}
                        className="flex items-start gap-2.5 font-serif text-[15px] text-[#1a1a1a] leading-snug"
                      >
                        <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-[#1a1a1a] shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex justify-center">
                    <button
                      className={`px-10 py-3 text-[10.5px] tracking-[0.22em] uppercase font-medium transition-all duration-200 border ${
                        isDark
                          ? "bg-[#1a1a1a] text-white border-[#1a1a1a] hover:bg-[#333]"
                          : "bg-white/80 text-[#1a1a1a] border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
                      }`}
                    >
                      {pkg.ctaText}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global CTA */}
        <div className="mt-12 flex justify-center">
          <button className="bg-[#1a1a1a] text-white px-10 py-4 text-[10.5px] tracking-[0.3em] uppercase font-medium hover:bg-[#333] transition-all duration-200 hover:scale-[1.03] active:scale-95">
            Reserve your table
          </button>
        </div>

      </div>
    </section>
  );
};

export default ExperiencePackages;
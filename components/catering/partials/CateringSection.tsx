"use client";

import React from "react";
import { CATERING_CONTENT } from "../config/constant";


export default function CateringSection() {
  const brunch = CATERING_CONTENT.brunch;

  return (
    <section className="relative bg-[#FDFAF8] py-28 px-8 md:px-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_10%_0%,_rgba(237,128,168,0.08)_0%,transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-16 flex flex-col gap-6">
          <div className="inline-flex">
            <div className="border border-[#ED80A8]/40 rounded-full px-5 py-2.5">
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#a85b74]">
                {brunch.eyebrow}
              </span>
            </div>
          </div>

          <div className="w-12 h-px bg-[#ED80A8]/50" />

          <h2 className="font-serif text-[clamp(36px,5vw,72px)] leading-[1.05] tracking-[-0.01em] text-[#1a1014]">
            {brunch.heading.title}{" "}
            <span className="italic font-light text-[#c4637a]">
              {brunch.heading.accent}
            </span>
          </h2>

          <p className="max-w-[50ch] text-[#2c2420]/60 text-lg font-normal leading-[1.8] font-sans">
            {brunch.description}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#F5BDD0] rounded-[2rem] overflow-hidden shadow-[0_4px_40px_rgba(237,128,168,0.12)] selection:bg-[#e8a0b0]/30">

          {/* Card Header */}
          <div className="px-10 py-10 flex justify-between items-start border-b border-[#FDE7EF]">
            <div>
              <h3 className="font-serif text-4xl text-[#1a1014] tracking-tight">
                <span className="text-[#ED80A8]/50 mr-3">
                  {brunch.id}
                </span>

                {brunch.package.title}
              </h3>

              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#2c2420]/50 mt-2 ml-12">
                {brunch.package.minGuests}
              </p>
            </div>
          </div>

          {/* Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-8">
            {brunch.package.sections.map((section, idx) => (
              <div
                key={idx}
                className="bg-[#FDFAF8] border border-[#F8E3E2] rounded-xl flex flex-col"
              >
                <div className="bg-[#FDE7EF]/60 text-[#a85b74] text-[10px] font-bold tracking-[0.15em] uppercase py-3 px-4 border-b border-[#F8E3E2] rounded-t-xl">
                  {section.label}
                </div>

                <div className="p-6 flex-grow">
                  <h4 className="font-serif italic text-lg text-[#1a1014] mb-5 border-b border-[#F8E3E2] pb-2">
                    {section.subtitle}
                  </h4>

                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-[13px] text-[#2c2420]/80 flex items-start gap-2"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ED80A8] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="px-10 py-8 text-center border-t border-[#FDE7EF]">
            <p className="text-[11px] md:text-[12px] text-[#2c2420]/50 italic font-medium leading-relaxed max-w-4xl mx-auto">
              {brunch.package.footerNote}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
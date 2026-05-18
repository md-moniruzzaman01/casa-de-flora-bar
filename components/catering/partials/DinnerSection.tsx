"use client";

import React from "react";
import { useContent } from "@/lib/ContentProvider";

export default function DinnerSection() {
  const dinner = useContent().catering.dinner;
  return (
    <section className="relative bg-[#FDFAF8] py-28 px-8 md:px-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_80%_0%,_rgba(237,128,168,0.08)_0%,transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 flex flex-col gap-6">
          <div className="inline-flex">
            <div className="border border-[#ED80A8]/40 rounded-full px-5 py-2.5">
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#a85b74]">
                {dinner.header.eyebrow}
              </span>
            </div>
          </div>

          <div className="w-12 h-px bg-[#ED80A8]/50" />

          <h2 className="font-serif text-[clamp(36px,5vw,72px)] leading-[1.05] text-[#1a1014]">
            {dinner.header.heading.title}{" "}
            <span className="italic font-light text-[#c4637a]">
              {dinner.header.heading.accent}
            </span>
          </h2>

          <p className="max-w-[50ch] text-[#2c2420]/60 text-lg leading-[1.8]">
            {dinner.header.description}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#F5BDD0] rounded-[2rem] overflow-hidden shadow-[0_4px_40px_rgba(237,128,168,0.12)]">

          {/* Card Header */}
          <div className="px-10 py-10 flex justify-between items-start border-b border-[#FDE7EF]">
            <div>
              <h3 className="font-serif text-3xl md:text-4xl text-[#1a1014]">
                <span className="text-[#ED80A8]/50 mr-3">{dinner.id}</span>
                {dinner.package.title}
              </h3>

              <p className="text-[12px] text-[#2c2420]/50 mt-2 ml-12">
                {dinner.package.minGuests}
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-8">
            {dinner.package.sections.map((section, idx) => (
              <div
                key={idx}
                className="bg-[#FDFAF8] border border-[#F8E3E2] rounded-xl"
              >
                <div className="bg-[#FDE7EF]/60 text-[#a85b74] text-[10px] font-bold uppercase px-4 py-3 border-b">
                  {section.label}
                </div>

                <div className="p-6">
                  <h4 className="font-serif italic text-lg mb-5 border-b pb-2">
                    {section.subtitle}
                  </h4>

                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex gap-2 text-[13px]">
                        <span className="w-1.5 h-1.5 mt-1.5 bg-[#ED80A8] rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Addons */}
          <div className="py-8 text-center border-t border-[#FDE7EF] mx-8">
            <p className="text-[13px] italic text-[#2c2420]/60">
              {dinner.package.addonText}
            </p>
          </div>

          {/* Meta */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-8 pb-8">
            {dinner.package.metaDetails.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FDE7EF]/50 border border-[#F5BDD0] rounded-xl p-6 text-center"
              >
                <h5 className="text-[10px] uppercase font-bold text-[#a85b74] mb-2">
                  {item.label}
                </h5>
                <p className="text-[12px] text-[#2c2420]/80">
                  {item.value}
                </p>
              </div>
            ))}
          </div> */}

        </div>
      </div>
    </section>
  );
}
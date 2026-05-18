"use client";

import React from "react";
import { useContent } from "@/lib/ContentProvider";

export default function CocktailSection() {
  const cocktail = useContent().catering.cocktails;
  return (
    <section className="relative bg-white py-28 px-8 md:px-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_90%_100%,_rgba(237,128,168,0.07)_0%,transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-16 flex flex-col gap-6">
          <div className="inline-flex">
            <div className="border border-[#ED80A8]/40 rounded-full px-5 py-2.5">
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#a85b74]">
                {cocktail.header.eyebrow}
              </span>
            </div>
          </div>

          <div className="w-12 h-px bg-[#ED80A8]/50" />

          <h2 className="font-serif text-[clamp(36px,5vw,72px)] leading-[1.05] tracking-[-0.01em] text-[#1a1014]">
            {cocktail.header.heading.title}{" "}
            <span className="italic font-light text-[#c4637a]">
              {cocktail.header.heading.accent}
            </span>
          </h2>

          <p className="max-w-[50ch] text-[#2c2420]/60 text-lg font-normal leading-[1.8] font-sans">
            {cocktail.header.description}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#F5BDD0] rounded-[2rem] overflow-hidden shadow-[0_4px_40px_rgba(237,128,168,0.12)] selection:bg-[#e8a0b0]/30">

          {/* Header */}
          <div className="bg-gradient-to-br from-[#a85b74] to-[#ED80A8] px-10 py-10 flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4 flex-wrap">
                <h3 className="font-serif text-3xl md:text-4xl text-white tracking-tight">
                  <span className="text-white/40 mr-3">
                    {cocktail.id}
                  </span>

                  {cocktail.package.title}
                </h3>

                <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/30">
                  {cocktail.package.badge}
                </span>
              </div>

              <p className="text-[12px] font-medium tracking-wide text-white/70 ml-12">
                {cocktail.package.minGuests}
              </p>
            </div>

            <div className="text-right">
              <div className="font-serif text-4xl md:text-5xl text-white leading-none tracking-tighter">
                {cocktail.package.priceRange}
              </div>

              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/60 mt-2">
                {cocktail.package.priceLabel}
              </p>
            </div>
          </div>

          {/* Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-8">
            {cocktail.package.tiers.map((tier, idx) => (
              <div
                key={idx}
                className="bg-[#FDFAF8] border border-[#F8E3E2] rounded-xl flex flex-col"
              >
                <div className="bg-[#FDE7EF]/60 text-[#a85b74] text-[10px] font-bold tracking-[0.12em] uppercase py-3 px-4 border-b border-[#F8E3E2] rounded-t-xl leading-relaxed">
                  {tier.label}
                  <br />
                  {tier.price}
                </div>

                <div className="p-6 flex-grow">
                  <h4 className="font-serif text-xl text-[#1a1014] mb-5 border-b border-[#F8E3E2] pb-2">
                    {tier.subtitle}
                  </h4>

                  <ul className="space-y-3">
                    {tier.items.map((item, i) => (
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

          {/* Service Info */}
          {/* <div className="py-8 text-center border-t border-[#FDE7EF] mx-8">
            <p className="text-[13px] font-medium text-[#2c2420]/70 tracking-wide">
              {cocktail.package.serviceInfo}
            </p>
          </div> */}

          {/* Meta */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-8 pb-8">
            {cocktail.package.metaDetails.map((detail, idx) => (
              <div
                key={idx}
                className="bg-[#FDE7EF]/50 border border-[#F5BDD0] rounded-xl py-6 px-4 text-center"
              >
                <h5 className="text-[10px] font-bold tracking-[0.2em] text-[#a85b74] uppercase mb-2">
                  {detail.label}
                </h5>

                <p className="text-[12px] font-medium text-[#2c2420]/80 leading-relaxed max-w-[20ch] mx-auto">
                  {detail.value}
                </p>
              </div>
            ))}
          </div> */}

          {/* Footer */}
          <div className="px-10 py-8 text-center border-t border-[#FDE7EF]">
            <p className="text-[11px] md:text-[12px] text-[#2c2420]/50 italic font-medium leading-relaxed max-w-4xl mx-auto">
              {cocktail.package.footerNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
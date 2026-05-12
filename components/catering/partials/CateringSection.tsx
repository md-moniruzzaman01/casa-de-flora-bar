"use client";

import React from "react";

const BRUNCH_DATA = {
  id: "01",
  title: "Casa Brunch Catering",
  minGuests: "min 15 guests",
  price: "$38",
  priceLabel: "per person",
  sections: [
    {
      label: "CHOOSE 2 — SIGNATURE BRUNCH OPTIONS",
      subtitle: "Signature brunch options",
      items: ["Chicken & Waffles", "Shrimp & Grits", "French Toast", "Rasta Pasta"],
    },
    {
      label: "CHOOSE 1 — BREAKFAST PROTEIN",
      subtitle: "Breakfast Meat",
      items: ["Turkey Sausage", "Beef Sausage", "Turkey Bacon", "Beef Bacon"],
    },
    {
      label: "INCLUDED WITH ALL PACKAGES",
      subtitle: "Always Included",
      items: ["Scrambled Eggs Breakfast Potatoes", "Biscuits"],
    },
  ],
  addonText: "Additional option +$8/person · Fruit display +$4/person",
  metaDetails: [
    { label: "MINIMUM", value: "15 guests to book" },
    { label: "SETUP", value: "Chafing dishes & utensils included" },
    { label: "PRICING", value: "$38/person pickup. Delivery +$75–$150" },
    { label: "DEPOSIT", value: "50% at booking, balance 5 days before" },
  ],
  footerNote:
    "Pair the Brunch package with our Cocktail Hour tier for a full morning experience. Great for baby showers, bridal brunches, and birthday celebrations.",
};

export default function CateringSection() {
  return (
    <section className="relative bg-[#FDFAF8] py-28 px-8 md:px-16 overflow-hidden">
      {/* Soft radial blush */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_10%_0%,_rgba(237,128,168,0.08)_0%,transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-16 flex flex-col gap-6">
          <div className="inline-flex">
            <div className="border border-[#ED80A8]/40 rounded-full px-5 py-2.5">
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#a85b74]">
                Package 01 — Brunch
              </span>
            </div>
          </div>
          <div className="w-12 h-px bg-[#ED80A8]/50" />
          <h2 className="font-serif text-[clamp(36px,5vw,72px)] leading-[1.05] tracking-[-0.01em] text-[#1a1014]">
            Morning{" "}
            <span className="italic font-light text-[#c4637a]">Elegance</span>
          </h2>
          <p className="max-w-[50ch] text-[#2c2420]/60 text-lg font-normal leading-[1.8] font-sans">
            A curated brunch experience with seasonal selections — perfect for
            intimate gatherings and celebratory mornings.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#F5BDD0] rounded-[2rem] overflow-hidden shadow-[0_4px_40px_rgba(237,128,168,0.12)] selection:bg-[#e8a0b0]/30">

          {/* Card Header */}
          <div className="px-10 py-10 flex justify-between items-start border-b border-[#FDE7EF]">
            <div>
              <h3 className="font-serif text-4xl text-[#1a1014] tracking-tight">
                <span className="text-[#ED80A8]/50 mr-3">{BRUNCH_DATA.id}</span>
                {BRUNCH_DATA.title}
              </h3>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#2c2420]/50 mt-2 ml-12">
                {BRUNCH_DATA.minGuests}
              </p>
            </div>
            <div className="text-right">
              <div className="font-serif text-5xl text-[#1a1014] leading-none tracking-tighter">
                {BRUNCH_DATA.price}
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#2c2420]/40 mt-2">
                {BRUNCH_DATA.priceLabel}
              </p>
            </div>
          </div>

          {/* Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-8">
            {BRUNCH_DATA.sections.map((section, idx) => (
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

          {/* Addons */}
          <div className="py-8 text-center border-t border-[#FDE7EF] mx-8">
            <p className="text-[13px] font-medium text-[#2c2420]/60 italic tracking-wide">
              {BRUNCH_DATA.addonText}
            </p>
          </div>

          {/* Meta Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-8 pb-8">
            {BRUNCH_DATA.metaDetails.map((detail, idx) => (
              <div
                key={idx}
                className="bg-[#FDE7EF]/50 border border-[#F5BDD0] rounded-xl py-6 px-4 text-center"
              >
                <h5 className="text-[10px] font-bold tracking-[0.2em] text-[#a85b74] uppercase mb-2">
                  {detail.label}
                </h5>
                <p className="text-[12px] font-medium text-[#2c2420]/80 leading-relaxed max-w-[15ch] mx-auto">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="px-10 py-8 text-center border-t border-[#FDE7EF]">
            <p className="text-[11px] md:text-[12px] text-[#2c2420]/50 italic font-medium leading-relaxed max-w-4xl mx-auto">
              {BRUNCH_DATA.footerNote}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

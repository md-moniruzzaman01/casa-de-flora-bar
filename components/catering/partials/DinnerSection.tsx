"use client";

import React from "react";

const DINNER_DATA = {
  id: "03",
  title: "Casa Dinner Catering",
  minGuests: "Minimum 20 guests · Full buffet style",
  price: "$48",
  priceLabel: "per person",
  sections: [
    {
      label: "CHOOSE 2 — MAIN ENTREES",
      subtitle: "Proteins",
      items: [
        "Curry Chicken Turkey",
        "Wings (braised) Barbecue",
        "Chicken Fried Fish –",
        "Whiting Rasta Pasta",
        "Meatballs (beef or turkey)",
      ],
    },
    {
      label: "CHOOSE 3 — SIDES",
      subtitle: "Side Dishes",
      items: [
        "Mac and Cheese",
        "Mashed Potatoes",
        "Cabbage",
        "Yellow Rice",
        "Collard Greens",
        "Candied Yams",
      ],
    },
    {
      label: "INCLUDED WITH ALL DINNER PACKAGES",
      subtitle: "Always Included",
      items: [
        "Caesar Salad or Spring Salad",
        "Dinner rolls / bread",
        "Serving ware & chafing dishes",
        "Plates, napkins & utensils",
      ],
    },
  ],
  addonText:
    "Add-ons: Third entree +$10/person · Dessert station (Kakes by Kesh) +$8/person · Linen & decor upgrade +$5/person",
  metaDetails: [
    { label: "MINIMUM", value: "20 guests to book" },
    { label: "STYLE", value: "Buffet setup included" },
    { label: "PICKUP", value: "$48/person. Delivery +$75–$200" },
    { label: "DEPOSIT", value: "50% at booking, balance 5 days out" },
  ],
};

export default function DinnerSection() {
  return (
    <section className="relative bg-[#FDFAF8] py-28 px-8 md:px-16 overflow-hidden">
      {/* Soft radial blush */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_80%_0%,_rgba(237,128,168,0.08)_0%,transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-16 flex flex-col gap-6">
          <div className="inline-flex">
            <div className="border border-[#ED80A8]/40 rounded-full px-5 py-2.5">
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#a85b74]">
                Package 03 — Dinner
              </span>
            </div>
          </div>
          <div className="w-12 h-px bg-[#ED80A8]/50" />
          <h2 className="font-serif text-[clamp(36px,5vw,72px)] leading-[1.05] tracking-[-0.01em] text-[#1a1014]">
            An Evening{" "}
            <span className="italic font-light text-[#c4637a]">
              Worth Remembering
            </span>
          </h2>
          <p className="max-w-[50ch] text-[#2c2420]/60 text-lg font-normal leading-[1.8] font-sans">
            Full-service dinner buffet for celebrations that demand something
            truly special.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#F5BDD0] rounded-[2rem] overflow-hidden shadow-[0_4px_40px_rgba(237,128,168,0.12)] selection:bg-[#e8a0b0]/30">

          {/* Card Header */}
          <div className="px-10 py-10 flex justify-between items-start border-b border-[#FDE7EF]">
            <div>
              <h3 className="font-serif text-3xl md:text-4xl text-[#1a1014] tracking-tight">
                <span className="text-[#ED80A8]/50 mr-3">{DINNER_DATA.id}</span>
                {DINNER_DATA.title}
              </h3>
              <p className="text-[12px] font-medium tracking-wide text-[#2c2420]/50 mt-2 ml-12">
                {DINNER_DATA.minGuests}
              </p>
            </div>
            <div className="text-right">
              <div className="font-serif text-5xl text-[#1a1014] leading-none tracking-tighter">
                {DINNER_DATA.price}
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#2c2420]/40 mt-2">
                {DINNER_DATA.priceLabel}
              </p>
            </div>
          </div>

          {/* Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-8">
            {DINNER_DATA.sections.map((section, idx) => (
              <div
                key={idx}
                className="bg-[#FDFAF8] border border-[#F8E3E2] rounded-xl flex flex-col"
              >
                <div className="bg-[#FDE7EF]/60 text-[#a85b74] text-[10px] font-bold tracking-[0.15em] uppercase py-4 px-4 border-b border-[#F8E3E2] rounded-t-xl">
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
              {DINNER_DATA.addonText}
            </p>
          </div>

          {/* Meta Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-8 pb-8">
            {DINNER_DATA.metaDetails.map((detail, idx) => (
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
          </div>
        </div>

      </div>
    </section>
  );
}

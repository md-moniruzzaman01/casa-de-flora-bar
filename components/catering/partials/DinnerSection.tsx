"use client";

import React from 'react';

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
        "Meatballs (beef or turkey)"
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
        "Candied Yams"
      ],
    },
    {
      label: "INCLUDED WITH ALL DINNER PACKAGES",
      subtitle: "Always Included",
      items: [
        "Caesar Salad or Spring Salad",
        "Dinner rolls / bread",
        "Serving ware & chafing dishes",
        "Plates, napkins & utensils"
      ],
    },
  ],
  addonText: "Add-ons: Third entree +$10/person · Dessert station (Kakes by Kesh) +$8/person · Linen & decor upgrade +$5/person",
  metaDetails: [
    { label: "MINIMUM", value: "20 guests to book" },
    { label: "STYLE", value: "Buffet setup included" },
    { label: "PICKUP", value: "$48/person. Delivery +$75–$200" },
    { label: "DEPOSIT", value: "50% at booking, balance 5 days out" },
  ],
};

const DinnerCard = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 selection:bg-[#e8a0b0]/30">
      <div className="bg-[#fdf6f0] border border-[#f9e4e8] rounded-[2rem] overflow-hidden shadow-sm">
        
        {/* --- HEADER --- */}
        <div className="px-10 py-10 flex justify-between items-start">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1a1014] tracking-tight">
              <span className="opacity-40 mr-3">{DINNER_DATA.id}</span>
              {DINNER_DATA.title}
            </h2>
            <p className="text-[12px] font-medium tracking-wide text-[#1a1014]/60 mt-2 ml-14">
              {DINNER_DATA.minGuests}
            </p>
          </div>
          <div className="text-right">
            <div className="font-serif text-5xl text-[#1a1014] leading-none tracking-tighter">
              {DINNER_DATA.price}
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1a1014]/50 mt-2">
              {DINNER_DATA.priceLabel}
            </p>
          </div>
        </div>

        {/* --- SELECTION GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-8">
          {DINNER_DATA.sections.map((section, idx) => (
            <div key={idx} className="bg-white border border-[#f9e4e8] rounded-sm flex flex-col">
              <div className="bg-[#f9e4e8]/60 text-[#1a1014] text-[10px] font-bold tracking-[0.15em] uppercase py-4 px-4 border-b border-[#f9e4e8]">
                {section.label}
              </div>
              <div className="p-6 flex-grow">
                <h4 className="font-serif italic text-lg text-[#1a1014] mb-5 border-b border-[#f9e4e8] pb-2">
                  {section.subtitle}
                </h4>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-[13px] text-[#1a1014]/80 flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#c4637a] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* --- ADDONS --- */}
        <div className="py-12 text-center px-6">
          <p className="text-[13px] font-medium text-[#1a1014]/70 italic tracking-wide">
            {DINNER_DATA.addonText}
          </p>
        </div>

        {/* --- META DETAILS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-8 pb-12">
          {DINNER_DATA.metaDetails.map((detail, idx) => (
            <div key={idx} className="bg-[#f9e4e8]/40 border border-[#f9e4e8] rounded-sm py-6 px-4 text-center">
              <h5 className="text-[10px] font-bold tracking-[0.2em] text-[#1a1014]/50 uppercase mb-2">
                {detail.label}
              </h5>
              <p className="text-[12px] font-medium text-[#1a1014]/80 leading-relaxed max-w-[20ch] mx-auto">
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DinnerCard;
"use client";

import React from 'react';

// Types for our data structure
interface MenuSection {
  label: string;
  subtitle: string;
  items: string[];
}

interface MetaDetail {
  label: string;
  value: string;
}

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
  footerNote: "Pair the Brunch package with our Cocktail Hour tier for a full morning experience. Great for baby showers, bridal brunches, and birthday celebrations."
};

const CateringCard = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 selection:bg-[#e8a0b0]/30">
      <div className="bg-[#fdf6f0] border border-[#f9e4e8] rounded-[2rem] overflow-hidden shadow-sm">
        
        {/* --- CARD HEADER --- */}
        <div className="px-10 py-10 flex justify-between items-start">
          <div>
            <h2 className="font-serif text-4xl text-[#1a1014] tracking-tight">
              <span className="opacity-40 mr-3">{BRUNCH_DATA.id}</span>
              {BRUNCH_DATA.title}
            </h2>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1a1014]/60 mt-2 ml-14">
              {BRUNCH_DATA.minGuests}
            </p>
          </div>
          <div className="text-right">
            <div className="font-serif text-5xl text-[#1a1014] leading-none tracking-tighter">
              {BRUNCH_DATA.price}
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1a1014]/50 mt-2">
              {BRUNCH_DATA.priceLabel}
            </p>
          </div>
        </div>

        {/* --- SELECTION GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-8">
          {BRUNCH_DATA.sections.map((section, idx) => (
            <div key={idx} className="bg-white border border-[#f9e4e8] rounded-sm flex flex-col">
              <div className="bg-[#f9e4e8]/60 text-[#1a1014] text-[10px] font-bold tracking-[0.15em] uppercase py-3 px-4 border-b border-[#f9e4e8]">
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
        <div className="py-12 text-center">
          <p className="text-[13px] font-medium text-[#1a1014]/70 italic tracking-wide">
            {BRUNCH_DATA.addonText}
          </p>
        </div>

        {/* --- META DETAILS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-8">
          {BRUNCH_DATA.metaDetails.map((detail, idx) => (
            <div key={idx} className="bg-[#f9e4e8]/40 border border-[#f9e4e8] rounded-sm py-6 px-4 text-center">
              <h5 className="text-[10px] font-bold tracking-[0.2em] text-[#1a1014]/50 uppercase mb-2">
                {detail.label}
              </h5>
              <p className="text-[12px] font-medium text-[#1a1014]/80 leading-relaxed max-w-[15ch] mx-auto">
                {detail.value}
              </p>
            </div>
          ))}
        </div>

        {/* --- FOOTER NOTE --- */}
        <div className="px-10 py-10 text-center">
          <p className="text-[11px] md:text-[12px] text-[#1a1014]/60 italic font-medium leading-relaxed max-w-4xl mx-auto">
            {BRUNCH_DATA.footerNote}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CateringCard;
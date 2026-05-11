"use client";

import React from 'react';

const COCKTAIL_DATA = {
  id: "02",
  title: "Casa Cocktail Hour & Finger Food",
  badge: "Most Popular",
  minGuests: "Minimum 20 guests · Choose your tier below",
  priceRange: "$28–$42",
  priceLabel: "per person",
  tiers: [
    {
      label: "CHOOSE ANY 4 ITEMS —",
      price: "$28/PERSON",
      subtitle: "Classic",
      items: [
        "Deviled Eggs Honey",
        "Barbecue Meatballs Mini",
        "Cup Pasta Salad Mini",
        "Cup Rasta Pasta Lemon",
        "Pepper Chicken Bites",
        "Mac & Cheese Balls",
        "Caesar Salad Cups"
      ],
    },
    {
      label: "CHOOSE ANY 6 ITEMS —",
      price: "$36/PERSON",
      subtitle: "Signature",
      items: [
        "All Classic options, plus:",
        "Shrimp & Grits Cups",
        "Burger Bites w/ toppings",
        "Hawaiian Shrimp Skewers",
        "Teriyaki Chicken Skewer"
      ],
    },
    {
      label: "CHOOSE ANY 8 ITEMS —",
      price: "$42/PERSON",
      subtitle: "Premium",
      items: [
        "All Signature options, plus:",
        "Smoked Salmon Cucumber Bites",
        "Custom seasonal option",
        "Dessert bites (from Kakes by Kesh)"
      ],
    },
  ],
  serviceInfo: "Each item: ~4–5 pieces per person · Service time: 1.5–2 hours · Beautiful platters with labels included",
  metaDetails: [
    { label: "MINIMUM", value: "20 guests to book" },
    { label: "BEST FOR", value: "Cocktail hours, showers, mixers" },
    { label: "COMBINE", value: "Pair with dinner for full events" },
    { label: "DELIVERY", value: "Available +$75–$150 by distance" },
  ],
  footerNote: "Pair the Brunch package with our Cocktail Hour tier for a full morning experience. Great for baby showers, bridal brunches, and birthday celebrations."
};

const CocktailCard = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 selection:bg-[#e8a0b0]/30">
      <div className="bg-[#fdf6f0] border border-[#f9e4e8] rounded-[2rem] overflow-hidden shadow-sm">
        
        {/* --- DARK HEADER --- */}
        <div className="bg-[#1a1014] px-10 py-10 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <h2 className="font-serif text-3xl md:text-4xl text-white tracking-tight">
                <span className="opacity-40 mr-3">{COCKTAIL_DATA.id}</span>
                {COCKTAIL_DATA.title}
              </h2>
              {/* Most Popular Badge */}
              <span className="bg-[#e8a0b0] text-[#1a1014] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                {COCKTAIL_DATA.badge}
              </span>
            </div>
            <p className="text-[12px] font-medium tracking-wide text-white/60">
              {COCKTAIL_DATA.minGuests}
            </p>
          </div>
          <div className="text-right">
            <div className="font-serif text-4xl md:text-5xl text-white leading-none tracking-tighter">
              {COCKTAIL_DATA.priceRange}
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 mt-2">
              {COCKTAIL_DATA.priceLabel}
            </p>
          </div>
        </div>

        {/* --- TIERED GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-8 mt-8">
          {COCKTAIL_DATA.tiers.map((tier, idx) => (
            <div key={idx} className="bg-white border border-[#f9e4e8] rounded-sm flex flex-col">
              <div className="bg-[#f9e4e8]/60 text-[#1a1014] text-[10px] font-bold tracking-[0.12em] uppercase py-3 px-4 border-b border-[#f9e4e8] leading-relaxed">
                {tier.label}<br />{tier.price}
              </div>
              <div className="p-6 flex-grow">
                <h4 className="font-serif text-xl text-[#1a1014] mb-5 border-b border-[#f9e4e8] pb-2">
                  {tier.subtitle}
                </h4>
                <ul className="space-y-3">
                  {tier.items.map((item, i) => (
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

        {/* --- SERVICE INFO --- */}
        <div className="py-10 text-center px-6">
          <p className="text-[13px] font-medium text-[#1a1014]/80 tracking-wide">
            {COCKTAIL_DATA.serviceInfo}
          </p>
        </div>

        {/* --- META DETAILS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-8">
          {COCKTAIL_DATA.metaDetails.map((detail, idx) => (
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

        {/* --- FOOTER NOTE --- */}
        <div className="px-10 py-10 text-center">
          <p className="text-[11px] md:text-[12px] text-[#1a1014]/60 italic font-medium leading-relaxed max-w-4xl mx-auto">
            {COCKTAIL_DATA.footerNote}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CocktailCard;
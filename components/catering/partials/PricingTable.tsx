"use client";

import React from 'react';

const PRICING_DATA = [
  { package: "Brunch Catering", perPerson: "$38", guests25: "$950", guests50: "$1,900" },
  { package: "Finger Food — Classic", perPerson: "$28", guests25: "$700", guests50: "$1400" },
  { package: "Finger Food — Signature", perPerson: "$36", guests25: "$900", guests18: "$1,800" }, // Note: kept '18' if intended or use 50
  { package: "Finger Food — Premium", perPerson: "$42", guests25: "$1,050", guests50: "$2,00" },
  { package: "Dinner Catering", perPerson: "$48", guests25: "$1,200", guests50: "$2,400" },
  { package: "Cocktail + Dinner (Signature + Dinner)", perPerson: "$78", guests25: "$1,950", guests50: "$3,900" },
];

const PricingTable = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 selection:bg-[#e8a0b0]/30 font-sans">
      <div className="bg-[#fdf6f0] border border-[#f9e4e8] rounded-[2rem] overflow-hidden p-6 md:p-12 shadow-sm">
        
        {/* Section Title */}
        <h2 className="text-center font-serif text-3xl md:text-4xl text-[#1a1014] mb-10">
          Pricing at a Glance
        </h2>

        {/* Inner Table Container */}
        <div className="bg-white border border-[#f9e4e8] rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9e4e8]/50 text-[#1a1014]/60 text-[11px] font-bold uppercase tracking-[0.2em]">
                <th className="py-5 px-8">Package</th>
                <th className="py-5 px-4 text-center">Per Person</th>
                <th className="py-5 px-4 text-center">25 Guests</th>
                <th className="py-5 px-4 text-center">50 Guests</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f9e4e8]/50">
              {PRICING_DATA.map((row, idx) => (
                <tr 
                  key={idx} 
                  className="transition-colors hover:bg-[#fdf6f0]/50 group"
                >
                  {/* Package Name - Serif font used here to match image */}
                  <td className="py-5 px-8 font-serif text-[17px] text-[#1a1014]">
                    {row.package}
                  </td>
                  
                  {/* Per Person */}
                  <td className="py-5 px-4 text-center font-serif text-[17px] text-[#1a1014]/70">
                    {row.perPerson}
                  </td>
                  
                  {/* 25 Guests */}
                  <td className="py-5 px-4 text-center font-serif text-[17px] text-[#1a1014]/70">
                    {row.guests25}
                  </td>
                  
                  {/* 50 Guests */}
                  <td className="py-5 px-4 text-center font-serif text-[17px] text-[#1a1014]/70">
                    {row.guests50}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default PricingTable;
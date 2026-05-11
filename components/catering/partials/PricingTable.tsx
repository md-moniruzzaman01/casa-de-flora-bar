"use client";

import React from "react";

const PRICING_DATA = [
  { package: "Brunch Catering", perPerson: "$38", guests25: "$950", guests50: "$1,900" },
  { package: "Finger Food — Classic", perPerson: "$28", guests25: "$700", guests50: "$1,400" },
  { package: "Finger Food — Signature", perPerson: "$36", guests25: "$900", guests50: "$1,800" },
  { package: "Finger Food — Premium", perPerson: "$42", guests25: "$1,050", guests50: "$2,100" },
  { package: "Dinner Catering", perPerson: "$48", guests25: "$1,200", guests50: "$2,400" },
  { package: "Cocktail + Dinner (Signature + Dinner)", perPerson: "$78", guests25: "$1,950", guests50: "$3,900" },
];

const PricingTable = () => {
  return (
    <section className="relative bg-white py-28 px-8 md:px-16 overflow-hidden">
      {/* Soft radial blush — centred bottom */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_100%,_rgba(237,128,168,0.08)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-16 flex flex-col gap-6">
          <div className="inline-flex">
            <div className="border border-[#ED80A8]/40 rounded-full px-5 py-2.5">
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#a85b74]">
                Transparent Pricing
              </span>
            </div>
          </div>
          <div className="w-12 h-px bg-[#ED80A8]/50" />
          <h2 className="font-serif text-[clamp(36px,5vw,72px)] leading-[1.05] tracking-[-0.01em] text-[#1a1014]">
            Packages at a{" "}
            <span className="italic font-light text-[#c4637a]">Glance</span>
          </h2>
          <p className="max-w-[50ch] text-[#2c2420]/60 text-lg font-normal leading-[1.8] font-sans">
            No surprises — just clear, honest pricing for every occasion and
            guest count.
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-white border border-[#F5BDD0] rounded-[2rem] overflow-hidden shadow-[0_4px_40px_rgba(237,128,168,0.12)] selection:bg-[#e8a0b0]/30 mb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FDE7EF]/60 text-[#a85b74] text-[11px] font-bold uppercase tracking-[0.2em]">
                  <th className="py-5 px-8 rounded-tl-[2rem]">Package</th>
                  <th className="py-5 px-4 text-center">Per Person</th>
                  <th className="py-5 px-4 text-center">25 Guests</th>
                  <th className="py-5 px-4 text-center rounded-tr-[2rem]">50 Guests</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FDE7EF]">
                {PRICING_DATA.map((row, idx) => (
                  <tr
                    key={idx}
                    className="transition-colors hover:bg-[#FDFAF8] group"
                  >
                    <td className="py-5 px-8 font-serif text-[17px] text-[#1a1014]">
                      {row.package}
                    </td>
                    <td className="py-5 px-4 text-center font-serif text-[17px] text-[#2c2420]/60">
                      {row.perPerson}
                    </td>
                    <td className="py-5 px-4 text-center font-serif text-[17px] text-[#2c2420]/60">
                      {row.guests25}
                    </td>
                    <td className="py-5 px-4 text-center font-serif text-[17px] text-[#2c2420]/60">
                      {row.guests50}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table footer note */}
          <div className="px-8 py-6 text-center border-t border-[#FDE7EF]">
            <p className="text-[12px] text-[#2c2420]/40 italic font-medium">
              All prices are per person. Delivery fees vary by distance. 50%
              deposit required at booking.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="text-[#2c2420]/50 text-base font-sans tracking-wide">
            Ready to bring your event to life?
          </p>
          <a
            href="#"
            className="bg-[#a85b74] text-white text-[12px] font-bold tracking-[0.2em] uppercase px-12 py-5 rounded-full hover:bg-[#1a1014] transition-all duration-300"
          >
            Request a Quote
          </a>
        </div>

      </div>
    </section>
  );
};

export default PricingTable;

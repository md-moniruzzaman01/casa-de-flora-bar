"use client";

import { useContent } from "@/lib/ContentProvider";

export default function StatsBand() {
  const stats = useContent().catering.brunch.stats;

  return (
    <section className="bg-[#1a1014] text-white py-24 px-[6vw] border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`flex flex-col px-4 md:px-8 py-4 ${
              idx !== 0 ? "md:border-l border-white/10" : ""
            }`}
          >
            <div className="flex items-baseline gap-1 mb-4">
              <span className="font-serif text-4xl md:text-7xl text-[#e8a0b0] font-light leading-none tracking-tighter">
                {stat.num}
              </span>

              {stat.unit && (
                <span className="text-white/40 text-lg font-serif italic">
                  {stat.unit}
                </span>
              )}
            </div>

            <h4 className="text-[11px] font-bold tracking-[0.25em] text-white/50 mb-4 uppercase">
              {stat.label}
            </h4>

            <p className="text-[15px] leading-relaxed text-white/80 font-normal">
              {stat.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
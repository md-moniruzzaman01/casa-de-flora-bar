"use client";

const stats = [
  {
    num: "200",
    unit: "+",
    label: "EVENTS CATERED",
    detail: "From bridal brunches to wedding receptions, across NJ and beyond.",
  },
  {
    num: "3",
    unit: "",
    label: "SIGNATURE PACKAGES",
    detail: "Brunch, cocktail hour, and full dinner — each fully customizable.",
  },
  {
    num: "15",
    unit: "",
    label: "MINIMUM GUESTS",
    detail: "Brunch and cocktail packages begin at fifteen guests.",
  },
  {
    num: "48",
    unit: "hr",
    label: "BOOKING RESPONSE",
    detail: "Most inquiries confirmed within forty-eight hours.",
  },
];

export default function StatsBand() {
  return (
    <section className="bg-[#1a1014] text-white py-24 px-[6vw] border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-0">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`flex flex-col px-8 py-4 ${
              idx !== 0 ? "md:border-l border-white/10" : ""
            }`}
          >
            <div className="flex items-baseline gap-1 mb-4">
              <span className="font-serif text-7xl text-[#e8a0b0] font-light leading-none tracking-tighter">
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

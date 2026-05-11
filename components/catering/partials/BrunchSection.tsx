"use client";

const stats = [
  {
    num: "4,200",
    unit: "sq ft",
    label: "TOTAL FOOTPRINT",
    detail: "Across three connected rooms and one garden terrace.",
  },
  {
    num: "120",
    unit: "",
    label: "MAXIMUM CAPACITY",
    detail: "Cocktail reception. Seated dinner accommodates ninety.",
  },
  {
    num: "22",
    unit: "ft",
    label: "CATHEDRAL CEILINGS",
    detail: "In the Grand Hall, with restored beams and skylights.",
  },
  {
    num: "365",
    unit: "",
    label: "DAYS A YEAR",
    detail: "Our florists arrange new seasonal stems daily.",
  },
];

export default function StatsBand() {
  return (
    <section className="bg-[#2D2424] text-white py-24 px-[6vw]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-0">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`flex flex-col px-8 py-4 ${
              idx !== 0 ? "md:border-l border-white/10" : ""
            }`}
          >
            {/* Number and Unit */}
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

            {/* Label */}
            <h4 className="text-[11px] font-bold tracking-[0.25em] text-white/50 mb-4 uppercase">
              {stat.label}
            </h4>

            {/* Detail */}
            <p className="text-[15px] leading-relaxed text-white/80 font-normal">
              {stat.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
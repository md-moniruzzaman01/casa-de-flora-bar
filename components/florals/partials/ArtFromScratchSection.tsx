"use client";

import Image from "next/image";

const services = [
  {
    id: "01",
    title: "Ceremony Design",
    description:
      "Arches, altars, aisle arrangements and ceremony backdrops — all custom built",
    // Replace with your actual image paths
    image: "/images/ceremony-design.png",
    alt: "Ceremony Design illustration",
  },
  {
    id: "02",
    title: "Reception Florals",
    description:
      "Estate tables, sweetheart tables, centrepieces and full venue transformations",
    image: "/images/reception-florals.png",
    alt: "Reception Florals illustration",
  },
  {
    id: "03",
    title: "Bridal Bouquets",
    description:
      "Bespoke bridal and bridesmaid bouquets crafted to complement your wedding palette",
    image: "/images/bridal-bouquets.png",
    alt: "Bridal Bouquets illustration",
  },
];

export default function ArtFromScratchSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Replace src with your actual background image */}
        <img
          src="/florals/art-bg.jpg"
          alt="Wedding hall background"
          className="w-full h-full object-cover object-center"
        />
        {/* Top fade overlay */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
        {/* Subtle dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 pt-16 pb-20">
        {/* Heading */}
        <h2
          className="text-white text-5xl md:text-6xl lg:text-7xl text-center mb-5 leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontStyle: "italic", fontWeight: 400 }}
        >
          art from scratch
        </h2>

        {/* Subheading */}
        <p
          className="text-white/90 text-center text-sm md:text-base max-w-xl mb-14 leading-relaxed"
          style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
        >
          Every arrangement we create is one-of-a-kind — designed from the ground up to bring
          your vision to life with floral artistry.
        </p>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-5 w-full max-w-6xl justify-center items-stretch">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex-1 flex flex-col items-center rounded-2xl px-6 pt-8 pb-10 text-center"
              style={{
                background: "rgba(255,255,255,0.28)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.45)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                minWidth: 0,
              }}
            >
              {/* Number */}
              <span
                className="text-4xl md:text-5xl text-gray-800 mb-5 leading-none select-none"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 300 }}
              >
                {service.id}
              </span>

              {/* Illustration */}
              <div className="w-full max-w-[220px] aspect-[4/3] bg-white rounded-xl overflow-hidden flex items-center justify-center mb-6 mx-auto">
                {/* Using next/image — swap src for your real illustration */}
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-full object-contain p-3"
                  onError={(e) => {
                    // Fallback placeholder if image missing
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='165' viewBox='0 0 220 165'%3E%3Crect width='220' height='165' fill='%23f5f0eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='13' fill='%23c9b99a' font-family='Georgia,serif'%3E" +
                      encodeURIComponent(service.alt) +
                      "%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>

              {/* Title */}
              <h3
                className="text-gray-900 text-xl md:text-2xl mb-3"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 400 }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="text-gray-700 text-sm leading-relaxed max-w-[240px]"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
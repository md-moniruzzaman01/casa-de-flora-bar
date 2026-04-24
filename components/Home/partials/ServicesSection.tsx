"use client";

import Image from "next/image";

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const services: ServiceCard[] = [
  {
    id: 1,
    title: "Floral Café",
    description:
      "Enjoy handcrafted coffee, signature drinks, desserts, and a cozy floral atmosphere made for everyday moments.",
    imageSrc: "/images/floral-cafe.png",
    imageAlt: "Floral café coffee cup",
  },
  {
    id: 2,
    title: "Weekend Brunch",
    description:
      "Gather with friends for indulgent weekend brunch and beautiful conversations.",
    imageSrc: "/images/weekend-brunch.png",
    imageAlt: "Croissant on plate",
  },
  {
    id: 3,
    title: "Bouquet Bar",
    description: "Design your own bouquet while enjoying your favorite drink.",
    imageSrc: "/images/bouquet-bar.png",
    imageAlt: "Flowers bouquet",
  },
  {
    id: 4,
    title: "Private Events",
    description:
      "Celebrate special moments in a dreamy floral environment.",
    imageSrc: "/images/private-events.png",
    imageAlt: "Event setup",
  },
];

export default function FloralServicesSection() {
  return (
    <section className="relative py-24 px-4 sm:px-10 lg:px-16 bg-[#fff7f6] overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-10 h-96 w-96 bg-[#f8cfc7] blur-3xl opacity-30 rounded-full" />
        <div className="absolute -right-24 bottom-10 h-96 w-96 bg-[#f7ddd7] blur-3xl opacity-30 rounded-full" />
      </div>

      {/* heading */}
      <div className="relative text-center mb-16">
        <p className="text-xs uppercase tracking-[0.35em] text-[#c09888]">
          What We Offer
        </p>
        <h2
          className="mt-2 text-4xl sm:text-5xl text-[#5a3830]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Our Services
        </h2>
      </div>

      {/* cards */}
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {services.map((service) => (
          <ScallopCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}

function ScallopCard({ service }: { service: ServiceCard }) {
  const scallopSize = 26;

  return (
    <div
      className="relative cursor-pointer transition-transform duration-300 hover:-translate-y-3"
      style={{
        filter: "drop-shadow(0 18px 30px rgba(160,100,90,0.18))",
      }}
    >
      <div
        className="relative bg-[#f9e2e2]"
        style={{
          width: "100%",
          minHeight: 360,
          padding: "42px 26px",
          borderRadius: "18px",

          maskImage: `
            radial-gradient(circle ${scallopSize}px at top, transparent 98%, black 100%),
            radial-gradient(circle ${scallopSize}px at bottom, transparent 98%, black 100%)
          `,
          WebkitMaskImage: `
            radial-gradient(circle ${scallopSize}px at top, transparent 98%, black 100%),
            radial-gradient(circle ${scallopSize}px at bottom, transparent 98%, black 100%)
          `,

          maskSize: "calc(100% / 4) 100%, calc(100% / 4) 100%",
          WebkitMaskSize: "calc(100% / 4) 100%, calc(100% / 4) 100%",
          maskRepeat: "repeat-x",
          WebkitMaskRepeat: "repeat-x",
        }}
      >
        <div className="flex h-full flex-col items-center justify-center text-center">
          <h3
            className="text-2xl mb-6 text-black"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {service.title}
          </h3>

          <div className="relative mb-6 h-28 w-28">
            <Image
              src={service.imageSrc}
              alt={service.imageAlt}
              fill
              className="object-contain"
            />
          </div>

          <p
            className="text-sm leading-relaxed text-[#6b4a44] max-w-[200px]"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaveDividerUp from "@/components/shared/WaveDivider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MenuItem {
  src:    string;
  name:   string;
  price?: string;
}

interface MenuSectionProps {
  category: string;
  index:    number;
  items:    MenuItem[];
}

export default function MenuSection({ category, index, items }: MenuSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Alternate the panel between cream/white and the brand pink so sections
  // get the same visual rhythm as Home → Services → MakeBouquet.
  const isPink = index % 2 === 0;
  const bg = isPink ? "bg-primary-200" : "bg-white";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".menu-section-head > *", {
        y: 30, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from(".menu-card", {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.07, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full">
      {/* Wave divider only when entering a pink panel — matches Home page behavior */}
      {isPink && <WaveDividerUp />}

      <div className={`${bg} px-6 py-20 md:px-16 md:py-28`}>
        <div className="max-w-[1440px] mx-auto">

          {/* ── Header — uppercase serif, like the home sections ── */}
          <div className="menu-section-head flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12 mb-12 md:mb-16">
            <div>
              <p className="text-[11px] md:text-xs uppercase tracking-[0.32em] text-primary mb-3 md:mb-4">
                Section · {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="font-serif uppercase leading-[0.95] tracking-tight text-[#222] text-4xl md:text-6xl lg:text-[78px] max-w-3xl">
                {category}
              </h2>
            </div>

            {/* item count chip */}
            <div className="flex items-center gap-3 md:pb-3">
              <span className="font-serif text-3xl md:text-5xl text-black leading-none">
                {String(items.length).padStart(2, "0")}
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-gray-600 max-w-[140px] leading-relaxed">
                Items on offer
              </span>
            </div>
          </div>

          {/* ── Cards grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-12">
            {items.map((item) => (
              <article key={item.name} className="menu-card group flex flex-col">
                {/* Photo */}
                <div className="relative aspect-[4/5] overflow-hidden bg-white shadow-sm">
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* dark gradient like MakeBouquet's overlay images */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  {/* price tag sits on the image, top-right */}
                  {item.price && (
                    <span className="absolute top-3 right-3 bg-white text-black px-3 py-1 text-[11px] font-medium tracking-[0.12em] uppercase">
                      {item.price}
                    </span>
                  )}
                </div>

                {/* Caption */}
                <div className="pt-5">
                  <h3 className="font-serif text-xl md:text-2xl text-[#222] leading-snug uppercase tracking-tight">
                    {item.name}
                  </h3>
                  <div className="mt-3 h-[1px] w-10 bg-primary transition-all duration-500 group-hover:w-20" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

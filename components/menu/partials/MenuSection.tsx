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
  src: string;
  name: string;
  price?: string;
  description?: string;
  tags?: string[];
}

interface MenuSectionProps {
  category: string;
  index: number;
  items: MenuItem[];
  id: string;
}

export default function MenuSection({
  category,
  index,
  items,
  id,
}: MenuSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Alternate the panel between cream/white and the brand pink so sections
  // get the same visual rhythm as Home → Services → MakeBouquet.
  const isPink = index % 2 === 0;
  const bg = isPink ? "bg-primary-200" : "bg-white";

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".menu-section-head > *", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from(".menu-card", {
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-menu-section={id}
      className="relative w-full scroll-mt-32"
    >
      {/* Wave divider only when entering a pink panel — matches Home page behavior */}
      {isPink && <WaveDividerUp />}

      <div className={`${bg} px-6 py-20 md:px-16 md:py-28`}>
        <div className="max-w-[1440px] mx-auto">
          {/* ── Header ── */}
          <header className="menu-section-head mb-14 md:mb-20">
            <div className="flex items-baseline gap-4 mb-4 md:mb-6">
              <span className="font-serif text-2xl md:text-3xl text-primary tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-primary/30" />
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-gray-600">
                {items.length} {items.length === 1 ? "Item" : "Items"}
              </span>
            </div>

            <h2 className="font-serif uppercase leading-[0.95] tracking-tight text-[#222] text-4xl md:text-6xl lg:text-[78px] max-w-3xl">
              {category}
            </h2>
          </header>

          {/* ── Editorial menu cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-14 md:gap-y-16">
            {items.map((item) => (
              <article
                key={item.name}
                className="menu-card group flex flex-col"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] overflow-hidden bg-white shadow-sm">
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-0" />
                </div>

                {/* Editorial caption — name · dotted leader · price */}
                <div className="pt-6">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-serif text-lg md:text-xl text-[#222] leading-snug tracking-tight">
                      {item.name}
                    </h3>
                    <span
                      className="flex-1 border-b border-dotted border-primary/40 translate-y-[-4px]"
                      aria-hidden="true"
                    />
                    {item.price && (
                      <span className="font-serif text-base md:text-lg text-primary tabular-nums whitespace-nowrap">
                        {item.price}
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p className="mt-2 text-[13px] text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="text-[9px] uppercase tracking-[0.22em] text-gray-700 border border-primary/40 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

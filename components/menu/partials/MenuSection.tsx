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

  // Matches the soft pink from your "Services" section
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
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full scroll-mt-32"
    >
      {isPink && <WaveDividerUp />}

      <div className={`${bg} px-6 py-20 md:px-16 md:py-28`}>
        <div className="max-w-[1200px] mx-auto">
          {/* ── Header ── */}
          <header className="menu-section-head mb-16 text-center">
            <span className="text-primary font-serif italic text-lg mb-2 block">
              Section {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="font-serif text-gray text-4xl md:text-6xl capitalize tracking-tight mb-4">
              {category}
            </h2>
            <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />
          </header>

          {/* ── Scalloped Menu Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {items.map((item) => (
              <article
                key={item.name}
                className="menu-card group flex flex-col items-center text-center"
              >
                {/* Photo with Scalloped Effect (using mask-image or clip-path) */}
                <div className="relative w-full aspect-square mb-8">
                  <div className="absolute inset-0 bg-primary/10 rounded-[40px] rotate-3 transition-transform group-hover:rotate-6" />
                  <div 
                    className="relative w-full h-full overflow-hidden transition-transform duration-500 group-hover:-translate-y-2"
                    style={{ 
                        // This approximates the wavy border-radius seen in your "Services" section
                        borderRadius: "60% 40% 70% 30% / 40% 50% 60% 70%",
                        border: "8px solid white"
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col items-center">
                  <h3 className="font-serif text-2xl text-[#333] mb-1">
                    {item.name}
                  </h3>
                  
                  {item.price && (
                    <span className="text-primary font-medium text-lg mb-3">
                      {item.price}
                    </span>
                  )}

                  {item.description && (
                    <p className="text-[14px] text-gray-500 leading-relaxed italic mb-4">
                      {item.description}
                    </p>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-widest text-[#B5838D] bg-white border border-[#B5838D]/20 px-3 py-1 rounded-full shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
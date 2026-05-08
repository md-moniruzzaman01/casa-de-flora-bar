"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Package, Utensils, ChefHat, Wine, Check } from "lucide-react";
import { CATERING_CONTENT } from "../config/constant";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  package: Package,
  utensils: Utensils,
  "chef-hat": ChefHat,
  wine: Wine,
};

export default function ServicesGrid() {
  const { services } = CATERING_CONTENT;
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".srv-head > *",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".srv-card",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-white px-6 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-24 md:py-28 lg:py-32"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="srv-head text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-primary mb-3 sm:mb-4">
            {services.eyebrow}
          </p>
          <h2 className="font-serif uppercase leading-[0.95] tracking-tight text-[#222] text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px]">
            {services.title}
          </h2>
          <p className="mt-6 text-gray-700 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {services.description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.items.map((tier) => {
            const Icon = ICONS[tier.icon] ?? Package;
            return (
              <article
                key={tier.id}
                className="srv-card group relative bg-white border border-primary-100 rounded-3xl p-7 sm:p-8 flex flex-col hover:border-primary/40 hover:shadow-[0_24px_50px_-25px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary flex items-center justify-center mb-6">
                  <Icon size={20} />
                </div>

                {/* Title + price */}
                <h3 className="font-serif text-2xl text-black leading-tight mb-1">
                  {tier.title}
                </h3>
                <p className="text-[11px] uppercase tracking-[0.22em] text-primary mb-4">
                  {tier.startsAt}
                </p>

                <p className="text-sm text-gray-700 leading-relaxed mb-6">
                  {tier.description}
                </p>

                {/* Includes */}
                <ul className="space-y-2 mt-auto pt-4 border-t border-primary-100/70">
                  {tier.includes.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2 text-[13px] text-gray-700 leading-snug"
                    >
                      <Check
                        size={14}
                        className="text-primary mt-0.5 shrink-0"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

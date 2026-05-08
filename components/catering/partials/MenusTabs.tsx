"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATERING_CONTENT } from "../config/constant";
import WaveDividerUp from "@/components/shared/WaveDivider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TAB_PHOTOS: Record<string, string> = {
  brunch: "/menu/Pink waffles.jpg",
  cocktail: "/menu/SMORES.jpg",
  plated: "/menu/Chicken & waffles.jpg",
  family: "/menu/Macaroni & Cheese.jpg",
};

export default function MenusTabs() {
  const { menus } = CATERING_CONTENT;
  const [activeId, setActiveId] = useState<string>(menus.tabs[0].id);
  const sectionRef = useRef<HTMLElement | null>(null);
  const itemsRef = useRef<HTMLUListElement | null>(null);

  const active = menus.tabs.find((t) => t.id === activeId) ?? menus.tabs[0];

  // Header entrance
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".menus-head > *",
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Crossfade items when tab changes
  useEffect(() => {
    if (!itemsRef.current) return;
    gsap.fromTo(
      itemsRef.current.querySelectorAll(".menu-row"),
      { y: 14, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.04,
        ease: "power2.out",
      },
    );
  }, [activeId]);

  return (
    <section ref={sectionRef} id="menus" className="relative w-full">
      <WaveDividerUp />

      <div className="bg-primary-200 px-6 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-24 md:py-28 lg:py-32">
        <div className="max-w-[1240px] mx-auto">
          {/* Header */}
          <div className="menus-head text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-primary mb-3 sm:mb-4">
              {menus.eyebrow}
            </p>
            <h2 className="font-serif uppercase leading-[0.95] tracking-tight text-[#222] text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px]">
              {menus.title}
            </h2>
            <p className="mt-6 text-gray-700 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              {menus.description}
            </p>
          </div>

          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Sample menus"
            className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-12"
          >
            {menus.tabs.map((tab) => {
              const isActive = activeId === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActiveId(tab.id)}
                  className={`px-5 py-2.5 text-[11px] sm:text-xs uppercase tracking-[0.22em] rounded-full border transition-all duration-300 ${
                    isActive
                      ? "bg-primary border-primary text-white shadow-sm"
                      : "bg-white border-primary/20 text-gray-700 hover:border-primary hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Photo */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden border-[8px] border-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]">
                <Image
                  src={TAB_PHOTOS[active.id] ?? TAB_PHOTOS.brunch}
                  alt={`${active.label} menu sample`}
                  fill
                  key={active.id}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <p className="mt-4 pl-2 text-[10px] uppercase tracking-[0.3em] text-gray-600">
                — {active.label} · sample plate
              </p>
            </div>

            {/* Items list */}
            <div className="lg:col-span-7">
              <p className="text-[11px] uppercase tracking-[0.28em] text-primary mb-2">
                {active.accent}
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl text-black mb-8">
                {active.label} menu
              </h3>

              <ul ref={itemsRef} className="divide-y divide-primary/15">
                {active.items.map((item) => (
                  <li key={item.name} className="menu-row py-4 flex items-baseline gap-4">
                    <h4 className="font-serif text-lg sm:text-xl text-[#222]">
                      {item.name}
                    </h4>
                    <span
                      aria-hidden="true"
                      className="flex-1 border-b border-dotted border-primary/30 translate-y-[-4px]"
                    />
                    <span className="text-[12px] sm:text-[13px] italic text-gray-600 max-w-[55%] text-right">
                      {"note" in item && item.note ? item.note : ""}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs italic text-gray-600 leading-relaxed">
                Menus are samples. Final pricing depends on guest count, season
                and dietary requirements — share the details and we&apos;ll
                tailor it to you.
              </p>

              <Link
                href="#inquiry"
                className="inline-block mt-6 bg-black text-white px-8 py-3 text-[12px] uppercase tracking-[0.2em] hover:bg-primary transition-colors"
              >
                Build my menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

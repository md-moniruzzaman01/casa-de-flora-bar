"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Star, MapPin } from "lucide-react";
import { SUMMER_EVENTS_CONTENT } from "../config/constant";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ReactNode> = {
  users:    <Users    size={16} className="text-primary" />,
  star:     <Star     size={16} className="text-primary" />,
  "map-pin": <MapPin  size={16} className="text-primary" />,
};

export default function Hero() {
  const { hero } = SUMMER_EVENTS_CONTENT;

  const ref     = useRef<HTMLElement | null>(null);
  const imgRef  = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle parallax on the photo, mirroring the home hero video
      gsap.to(imgRef.current, {
        y: 80,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        textRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      );

      gsap.from(".hero-line", {
        y: 36,
        opacity: 0,
        stagger: 0.13,
        duration: 0.9,
        ease: "power3.out",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full bg-primary-50 overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* ── IMAGE — top on mobile, left 45% on desktop ── */}
        <div className="relative w-full lg:w-[45%] h-[55vh] sm:h-[60vh] lg:h-screen overflow-hidden">
          <div ref={imgRef} className="absolute inset-0">
            <Image
              src={hero.image}
              alt={hero.titleSub}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>

          {/* slight darkening so the badge stays legible */}
          <div className="absolute inset-0 bg-black/25" />

          {/* corner badge — same shape as the home hero */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex flex-col items-center justify-center">
              <span className="text-[8px] sm:text-[9px] uppercase tracking-widest opacity-70">
                Summer
              </span>
              <span className="text-base sm:text-lg font-serif italic">2026</span>
              <span className="text-[7px] sm:text-[8px] uppercase tracking-widest opacity-60">
                Edition
              </span>
            </div>
          </div>
        </div>

        {/* ── CONTENT — bottom on mobile, right 55% on desktop ── */}
        <div className="w-full lg:w-[55%] flex items-center justify-start px-6 sm:px-10 md:px-16 lg:px-20 py-14 sm:py-20 lg:py-0">
          <div ref={textRef} className="max-w-2xl w-full">

            {/* Badge + duration */}
            <div className="hero-line flex flex-wrap items-center gap-3 mb-5 sm:mb-6">
              <span className="bg-primary-200 text-black px-3 py-1 rounded-full uppercase tracking-[0.18em] text-[10px] font-medium">
                {hero.badge}
              </span>
              <span className="text-[11px] sm:text-xs text-gray-600 tracking-wide">
                {hero.duration}
              </span>
            </div>

            {/* Headline — mobile-first scale ramp matching home */}
            <h1 className="font-serif leading-[1.05] text-black mb-6 sm:mb-8">
              <span className="hero-line block text-[36px] sm:text-[52px] md:text-[64px] lg:text-[72px] xl:text-[88px]">
                {hero.titleMain}
              </span>
              <span className="hero-line block italic font-light text-primary text-[32px] sm:text-[44px] md:text-[54px] lg:text-[60px] xl:text-[72px]">
                {hero.titleSub}
              </span>
            </h1>

            {/* Pink separator — same token as home */}
            <div className="hero-line h-[1px] w-16 bg-[#E8A0B5] mb-6 sm:mb-8" />

            <p className="hero-line text-gray-700 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-xl mb-8 sm:mb-10">
              {hero.description}
            </p>

            {/* Stats — flex-wrap, slightly tighter than before */}
            <ul className="hero-line flex flex-wrap gap-x-5 gap-y-3 mb-10 sm:mb-12">
              {hero.stats.map((stat, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-xs sm:text-sm text-gray-700"
                >
                  {iconMap[stat.icon]}
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>

            {/* CTAs — identical button styling to home hero */}
            <div className="hero-line flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <Link
                href="#booking"
                className="bg-black text-white text-center px-8 sm:px-10 py-3 text-sm md:text-base uppercase tracking-widest border border-black hover:bg-transparent hover:text-black transition-all duration-300"
              >
                {hero.buttons.primary}
              </Link>
              <Link
                href="#about"
                className="border border-gray-300 text-black text-center px-8 sm:px-10 py-3 text-sm md:text-base uppercase tracking-widest hover:border-black transition-all duration-300"
              >
                {hero.buttons.secondary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

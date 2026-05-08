"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATERING_CONTENT } from "../config/constant";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClosingCTA() {
  const { closing } = CATERING_CONTENT;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cls-content > *",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/menu/Chicken & waffles.jpg"
          alt=""
          fill
          className="object-cover blur-md scale-110"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />

      <div className="relative max-w-[1240px] mx-auto px-6 sm:px-10 py-20 sm:py-24 lg:py-32 text-center">
        <div className="cls-content max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.32em] text-primary-200 mb-4">
            {closing.eyebrow}
          </p>
          <h2 className="font-serif leading-[0.96] tracking-tight">
            <span className="block text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px]">
              {closing.title}
            </span>
            <span className="block italic font-light text-primary-200 text-[36px] sm:text-[48px] md:text-[64px] lg:text-[78px]">
              {closing.titleAccent}
            </span>
          </h2>
          <p className="mt-7 text-white/80 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            {closing.description}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={closing.primary.href}
              className="bg-primary text-white text-center px-10 py-3 text-sm md:text-base uppercase tracking-widest border border-primary hover:bg-transparent hover:border-white transition-all duration-300"
            >
              {closing.primary.label}
            </Link>
            <Link
              href={closing.secondary.href}
              className="border border-white/40 text-white text-center px-10 py-3 text-sm md:text-base uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              {closing.secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

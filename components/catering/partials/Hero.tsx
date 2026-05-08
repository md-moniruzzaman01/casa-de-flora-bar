"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATERING_CONTENT } from "../config/constant";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const { hero } = CATERING_CONTENT;

  const ref = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: 110,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      const tl = gsap.timeline();
      tl.fromTo(
        ".cat-eyebrow",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      )
        .fromTo(
          ".cat-line",
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .fromTo(
          ".cat-rule",
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          ".cat-body",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".cat-cta",
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .fromTo(
          ".cat-stat",
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2",
        );

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 },
        );
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <Image
            src={hero.image}
            alt="Casa de Flora catering"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Top utility row */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-8 lg:pt-10 flex items-center justify-between text-white/80">
        <p className="cat-eyebrow text-[10px] md:text-[11px] uppercase tracking-[0.34em]">
          {hero.eyebrow}
        </p>
        <span className="hidden md:inline text-[10px] uppercase tracking-[0.28em]">
          {hero.badge}
        </span>
      </div>

      {/* Main */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-10 lg:pt-16 pb-20 lg:pb-28 min-h-[88vh] items-center">
        {/* Copy */}
        <div ref={textRef} className="lg:col-span-7 max-w-2xl text-white">
          <h1 className="font-serif leading-[0.96] tracking-tight mb-7">
            <span className="cat-line block text-[44px] sm:text-[60px] md:text-[78px] lg:text-[92px] xl:text-[108px]">
              {hero.title}
            </span>
            <span className="cat-line block italic font-light text-primary text-[36px] sm:text-[50px] md:text-[64px] lg:text-[74px] xl:text-[86px]">
              {hero.titleAccent}
            </span>
          </h1>

          <div className="cat-rule h-[1px] w-20 bg-primary mb-7 origin-left" />

          <p className="cat-body text-white/85 text-base md:text-[17px] leading-relaxed max-w-xl mb-9">
            {hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12">
            <Link
              href={hero.primary.href}
              className="cat-cta bg-primary text-white text-center px-10 py-3 text-sm md:text-base uppercase tracking-widest border border-primary hover:bg-transparent hover:border-white transition-all duration-300"
            >
              {hero.primary.label}
            </Link>
            <Link
              href={hero.secondary.href}
              className="cat-cta border border-white/40 text-white text-center px-10 py-3 text-sm md:text-base uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              {hero.secondary.label}
            </Link>
          </div>

          {/* Stats row */}
          <ul className="grid grid-cols-3 gap-4 max-w-md">
            {hero.stats.map((s) => (
              <li
                key={s.label}
                className="cat-stat border-l border-white/20 pl-4"
              >
                <p className="font-serif text-2xl sm:text-3xl text-white tabular-nums leading-none">
                  {s.value}
                </p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/65 mt-2">
                  {s.label}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick quote card */}
        <div
          ref={cardRef}
          className="lg:col-span-5 lg:justify-self-end w-full max-w-sm"
        >
          <div className="bg-white text-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]">
            <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.32em]">
                {hero.quickQuote.heading}
              </span>
              <span className="font-serif italic text-base">No charge</span>
            </div>

            <div className="px-6 py-7 space-y-4">
              <p className="font-serif text-2xl text-black leading-snug">
                Most quotes back within{" "}
                <span className="italic text-primary">24 hours.</span>
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {hero.quickQuote.subheading}. Share your date and headcount —
                the team handles the rest.
              </p>

              <ul className="space-y-2 text-sm">
                {[
                  "Tailored menu proposal",
                  "Transparent line-item pricing",
                  "Free venue walkthrough",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#inquiry"
                className="block bg-black text-white text-center py-3 text-[12px] uppercase tracking-[0.18em] hover:bg-primary transition-colors"
              >
                {hero.quickQuote.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

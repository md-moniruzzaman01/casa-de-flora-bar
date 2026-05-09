"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { VANUE_CONTENT } from "../config/constant";

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const {
    tag,
    headline_part_1,
    headline_part_2,
    headline_part_3,
    sub_headline,
    buttons,
    stats,
    location,
  } = VANUE_CONTENT.hero_section;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Initial states
      gsap.set(".h-text-item", { y: 40, opacity: 0 });
      gsap.set(".h-rule", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".gallery-img", { y: 80, opacity: 0, scale: 1.08 });
      gsap.set(".h-stat", { y: 18, opacity: 0 });

      tl.to(".h-text-item", {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.1,
      })
        .to(".h-rule", { scaleX: 1, duration: 1, ease: "power2.inOut" }, "-=0.7")
        .to(".h-stat", { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, "-=0.6")
        .to(
          ".gallery-img",
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F9F1F1] pt-20 md:pt-24 pb-8 md:pb-10 overflow-hidden"
    >
      {/* Decorative blur blooms */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[460px] h-[460px] rounded-full bg-primary-100 blur-3xl opacity-40" />
      <div className="pointer-events-none absolute top-1/4 -right-40 w-[380px] h-[380px] rounded-full bg-primary-200 blur-3xl opacity-30" />

      {/* ── Upper Content: Text & CTA ──────────────────────── */}
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-end mb-14 md:mb-16">

        {/* Left — eyebrow + headline */}
        <div>
          {/* Location pill */}
          <div className="h-text-item inline-flex items-center gap-2.5 mb-7 md:mb-8 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-primary/15">
            <span className="block w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="font-sans text-[9.5px] md:text-[10px] tracking-[0.32em] uppercase font-medium text-[#5a4a42]">
              {location}
            </span>
            <span className="block w-px h-3 bg-[#d9c8be]" />
            <span className="font-sans text-[9.5px] md:text-[10px] tracking-[0.32em] uppercase text-primary">
              {tag}
            </span>
          </div>

          {/* Headline */}
          <h1 className="h-text-item font-serif text-[clamp(40px,6.4vw,88px)] leading-[1.05] tracking-tight text-[#1a1008]">
            {headline_part_1}
            <br />
            <span className="italic text-primary font-normal">
              {headline_part_2} {headline_part_3}
            </span>
          </h1>

          {/* Decorative rule */}
          <div className="h-rule mt-7 md:mt-9 w-20 h-px bg-[#1a1008]/25" />
        </div>

        {/* Right — description + stats + CTAs */}
        <div className="lg:pl-6 xl:pl-12 pb-1">
          <p className="h-text-item font-serif italic text-[#5a4a42] text-[16px] md:text-[18px] leading-[1.7] mb-8 md:mb-9 max-w-md">
            {sub_headline}
          </p>

          {/* Stats inline */}
          <div className="flex items-center gap-0 mb-9 md:mb-10 max-w-fit">
            <div className="h-stat pr-5 md:pr-6">
              <p className="font-serif text-[28px] md:text-[36px] leading-none text-[#1a1008] mb-1.5 tabular-nums">
                {stats.capacity}
              </p>
              <p className="font-sans text-[8px] tracking-[0.36em] uppercase text-[#7a6358]">
                Max Guests
              </p>
            </div>
            <div className="h-stat w-px h-10 md:h-12 bg-[#d9c8be]" />
            <div className="h-stat px-5 md:px-6">
              <p className="font-serif text-[28px] md:text-[36px] leading-none text-[#1a1008] mb-1.5 tabular-nums">
                {stats.floor_space}
              </p>
              <p className="font-sans text-[8px] tracking-[0.36em] uppercase text-[#7a6358]">
                Sq Ft
              </p>
            </div>
            <div className="h-stat w-px h-10 md:h-12 bg-[#d9c8be]" />
            <div className="h-stat pl-5 md:pl-6">
              <p className="font-serif text-[28px] md:text-[36px] leading-none text-[#1a1008] mb-1.5 tabular-nums">
                {stats.event_types}
              </p>
              <p className="font-sans text-[8px] tracking-[0.36em] uppercase text-[#7a6358]">
                Event Types
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="h-text-item flex flex-wrap items-center gap-3 md:gap-4">
            <a
              href={buttons[0].link}
              className="group inline-flex items-center gap-3 bg-[#1a1008] text-white px-8 md:px-9 py-3.5 md:py-4 font-display text-[11px] md:text-[12px] tracking-[0.2em] uppercase hover:bg-primary transition-colors duration-300"
            >
              <span>{buttons[0].label}</span>
              <span className="block w-5 h-px bg-white/55 transition-all duration-300 group-hover:w-7 group-hover:bg-white" />
            </a>
            <a
              href={buttons[1].link}
              className="group inline-flex items-center gap-3 border border-[#1a1008]/25 text-[#1a1008] px-8 md:px-9 py-3.5 md:py-4 font-display text-[11px] md:text-[12px] tracking-[0.2em] uppercase hover:bg-[#1a1008] hover:text-white transition-colors duration-300"
            >
              <span>{buttons[1].label}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Lower Content: Visual Gallery ────────────────────── */}
      <div className="relative flex gap-3 md:gap-4 px-3 md:px-4 h-[420px] md:h-[560px]">
        {/* Left — img-01.jpg */}
        <div className="gallery-img relative flex-[0.8] rounded-tr-[40px] overflow-hidden">
          <Image
            src="/vanue/img-01.jpg"
            alt="Casa de Flora Bar venue interior"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 28vw, 25vw"
          />
          <div className="absolute inset-0 bg-[#1a1008]/8" />
        </div>

        {/* Center — Grand stage (priority load) */}
        <div className="gallery-img relative flex-[1.4] overflow-hidden">
          <Image
            src="/vanue/grand stage-01.jpg"
            alt="Casa de Flora Bar grand stage"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 44vw, 50vw"
          />
          {/* Subtle bottom caption */}
          <div className="absolute bottom-5 left-6 z-10">
            <span className="font-sans text-[8.5px] tracking-[0.42em] uppercase text-white/55">
              The Grand Stage
            </span>
          </div>
        </div>

        {/* Right — dinner.jpg */}
        <div className="gallery-img relative flex-[0.8] rounded-tl-[40px] overflow-hidden">
          <Image
            src="/vanue/dinner.jpg"
            alt="Casa de Flora Bar dinner setup"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 28vw, 25vw"
          />
          <div className="absolute inset-0 bg-[#1a1008]/8" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

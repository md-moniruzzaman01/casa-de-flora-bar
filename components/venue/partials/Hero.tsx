"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ChefHat, Flower2, Music, Sparkles, Users, Wine } from "lucide-react";
import { VANUE_CONTENT } from "../config/constant";
import { WaveDividerDown } from "@/components/shared/WaveDivider";

const HOSTED_EVENTS = [
  "Weddings",
  "Corporate",
  "Birthdays",
  "Pop-Ups",
  "Galas",
  "Showers",
];

const AMENITIES = [
  { Icon: Flower2, label: "Floral installations" },
  { Icon: Wine, label: "Private bar service" },
  { Icon: ChefHat, label: "In-house catering" },
  { Icon: Sparkles, label: "Bridal & dressing suite" },
  { Icon: Music, label: "AV & lighting" },
  { Icon: Users, label: "Dedicated coordinator" },
];

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const {
    headline_part_1,
    headline_part_2,
    headline_part_3,
    sub_headline,
    buttons,
    stats,
  } = VANUE_CONTENT.hero_section;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      gsap.set(".hero-line", { yPercent: 110 });
      gsap.set(".hero-fade-body", { y: 24, opacity: 0 });
      gsap.set(".hero-frame", { clipPath: "inset(100% 0 0 0)" });
      gsap.set(".hero-stat-num", { y: 30, opacity: 0 });
      gsap.set(".hero-chip", { y: 18, opacity: 0 });
      gsap.set(".hero-amenity", { y: 18, opacity: 0 });

      tl.to(".hero-line", { yPercent: 0, duration: 1.2, stagger: 0.07 })
        .to(".hero-fade-body", { y: 0, opacity: 1, duration: 0.85, stagger: 0.08 }, "-=0.7")
        .to(".hero-chip", { y: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: "power3.out" }, "-=0.7")
        .to(".hero-stat-num", { y: 0, opacity: 1, duration: 0.85, stagger: 0.1 }, "-=0.55")
        .to(
          ".hero-frame",
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.5,
            stagger: 0.14,
            ease: "power3.inOut",
          },
          "-=1.1"
        )
        .to(".hero-amenity", { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out" }, "-=0.6");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-primary-150 text-gray overflow-hidden"
    >
      {/* Vertical rail (desktop only) */}
      <div
        aria-hidden
        className="hidden xl:block pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-5">
          <span className="block w-px h-16 bg-gray/20" />
          <span className="font-sans text-[9.5px] tracking-[0.6em] uppercase text-gray/55 [writing-mode:vertical-rl] rotate-180">
            Est. Bloomfield · A Floral Affair
          </span>
          <span className="block w-px h-16 bg-gray/20" />
        </div>
      </div>

      {/* Editorial split */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pt-10 sm:pt-14 md:pt-16 pb-10 sm:pb-12 md:pb-14 grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
        {/* Left content */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="overflow-hidden mb-4 sm:mb-5 md:mb-7">
            <span className="hero-line block font-sans text-[10px] md:text-[11px] tracking-[0.46em] uppercase text-primary">
              Private Event Venue · For Hire
            </span>
          </div>

          <h1 className="font-serif text-[clamp(36px,6vw,104px)] leading-[1.05] tracking-[-0.02em] text-black">
            <span className="block overflow-hidden">
              <span className="hero-line block">{headline_part_1}</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block italic font-normal text-primary">
                {headline_part_2}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">
                {headline_part_3}
                <span className="text-primary">.</span>
              </span>
            </span>
          </h1>

          <p className="hero-fade-body font-serif italic text-[15px] md:text-[18px] leading-[1.7] text-gray/75 mt-6 md:mt-9 mb-6 md:mb-8 max-w-[600px]">
            {sub_headline}
          </p>

          {/* Event-type chips */}
          <div className="flex flex-wrap items-center gap-2 mb-8 md:mb-10">
            <span className="hero-chip font-sans text-[9px] tracking-[0.42em] uppercase text-gray/55 mr-1">
              Hosting
            </span>
            {HOSTED_EVENTS.map((t) => (
              <span
                key={t}
                className="hero-chip font-serif text-[12.5px] text-gray/85 px-3 sm:px-3.5 py-1.5 border border-gray/20 rounded-full hover:border-primary hover:text-primary transition-colors cursor-default"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTAs + stats */}
          <div className="flex flex-col xl:flex-row xl:items-end gap-8 xl:gap-10">
            <div className="hero-fade-body flex flex-wrap items-center gap-3 md:gap-4">
              <a
                href={buttons[0].link}
                className="group relative inline-flex items-center gap-3 bg-black text-white px-7 md:px-8 py-3.5 md:py-4 font-sans text-[10.5px] md:text-[11px] tracking-[0.24em] uppercase overflow-hidden border border-black hover:border-primary transition-colors"
              >
                <span className="relative z-10">Book a Tour</span>
                <span className="relative z-10 block w-5 h-px bg-white transition-all duration-500 group-hover:w-9" />
                <span className="absolute inset-0 bg-primary scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-5 xl:flex-1 max-w-[420px]">
              {[
                { num: stats.capacity, label: "Max Guests" },
                { num: stats.floor_space, label: "Sq Ft" },
                { num: stats.event_types, label: "Formats" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="overflow-hidden">
                    <p className="hero-stat-num font-serif text-[clamp(24px,2.8vw,38px)] leading-none text-black tabular-nums">
                      {s.num}
                    </p>
                  </div>
                  <div className="mt-2 h-px w-full bg-primary/30" />
                  <p className="mt-2 font-sans text-[8.5px] md:text-[9px] tracking-[0.36em] uppercase text-gray/55">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right featured image */}
        <div className="lg:col-span-5 order-1 lg:order-2">
          <figure className="hero-frame relative w-full h-[360px] sm:h-[440px] md:h-[540px] lg:h-[620px] overflow-hidden group">
            <Image
              src="/venue/img-01.jpg"
              alt="Casa de Flora Bar — private event venue grand stage"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/15" />

            {/* Capacity badge */}
            <div className="absolute top-4 sm:top-5 md:top-6 right-4 sm:right-5 md:right-6 inline-flex items-center gap-2 font-sans text-[9px] tracking-[0.36em] uppercase text-white bg-black/55 backdrop-blur-sm px-3 py-1.5">
              <Users className="w-3 h-3 text-primary" strokeWidth={1.6} />
              Up to {stats.capacity} guests
            </div>

            {/* Bottom caption */}
            <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-7 lg:p-8 flex items-end justify-between gap-5">
              <div>
                <p className="font-sans text-[8.5px] tracking-[0.42em] uppercase text-white/70 mb-1.5">
                  The Showpiece
                </p>
                <p className="font-serif italic text-[20px] sm:text-[22px] md:text-[28px] lg:text-[34px] text-white leading-[1.05]">
                  The Grand Stage
                </p>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Amenities strip — what's included with each rental */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pb-12 md:pb-16">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-7">
          <span className="block w-7 h-px bg-primary" />
          <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.42em] uppercase text-primary whitespace-nowrap">
            Each Rental Includes
          </span>
          <span className="block flex-1 h-px bg-gray/15" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-5">
          {AMENITIES.map(({ Icon, label }) => (
            <div key={label} className="hero-amenity flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/70 border border-primary/15 shrink-0">
                <Icon className="w-4 h-4 text-primary" strokeWidth={1.4} />
              </span>
              <span className="font-sans text-[11.5px] sm:text-[12px] leading-snug text-gray">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <WaveDividerDown/>
    </section>
  );
};

export default HeroSection;

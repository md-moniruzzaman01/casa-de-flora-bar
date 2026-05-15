"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChefHat, Flower2, Music, Sparkles, Users, Wine } from "lucide-react";
import { VANUE_CONTENT } from "../config/constant";
import Link from "next/link";

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
  // { Icon: Wine, label: "Private bar service" },
  // { Icon: ChefHat, label: "In-house catering" },
  // { Icon: Sparkles, label: "Bridal & dressing suite" },
  // { Icon: Music, label: "AV & lighting" },
  { Icon: Users, label: "Dedicated coordinator" },
];

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const {
    headline_part_1,
    headline_part_2,
    headline_part_3,
    sub_headline,

  } = VANUE_CONTENT.hero_section;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      gsap.set(".hero-line", { yPercent: 110 });
      gsap.set(".hero-fade-body", { y: 24, opacity: 0 });
      gsap.set(".hero-stat-num", { y: 30, opacity: 0 });
      gsap.set(".hero-chip", { y: 18, opacity: 0 });
      gsap.set(".hero-amenity", { y: 18, opacity: 0 });

      tl.to(".hero-line", { yPercent: 0, duration: 1.2, stagger: 0.07 })
        .to(".hero-fade-body", { y: 0, opacity: 1, duration: 0.85, stagger: 0.08 }, "-=0.7")
        .to(".hero-chip", { y: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: "power3.out" }, "-=0.7")
        .to(".hero-stat-num", { y: 0, opacity: 1, duration: 0.85, stagger: 0.1 }, "-=0.55")
        .to(".hero-amenity", { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out" }, "-=0.6");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1014] to-[#2d1a25]" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_70%_20%,_rgba(232,160,176,0.2)_0%,transparent_50%)]" />
      </div>

      {/* Hero photo with mask */}
      <div
        className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 opacity-60 z-10"
        style={{
          backgroundImage: "url('/venue/img-01.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "linear-gradient(to left, black 30%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to left, black 30%, transparent 100%)",
        }}
      />

      {/* Film grain overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-20 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27200%27><filter id=%27n%27><feTurbulence baseFrequency=%270.85%27 /></filter><rect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 /></svg>')]" />

      {/* Main content */}
{/* Main content */}
      <div className="relative z-30 flex-1 flex flex-col justify-center md:justify-end px-6 md:px-16 pt-24 pb-12 md:pb-16">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 md:gap-8">

          {/* Eyebrow tag */}
          <div className="overflow-hidden">
            <div className="hero-line border border-white/20 rounded-full px-4 py-2 inline-flex">
              <span className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase text-white">
                Private Event Venue · For Hire
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-5xl md:text-8xl leading-[1.1] md:leading-[1.05] tracking-tight text-white">
            <span className="block overflow-hidden">
              <span className="hero-line block">{headline_part_1}</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block italic font-light text-[#f0cfd8]">
                {headline_part_2}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">{headline_part_3}</span>
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="hero-fade-body max-w-[45ch] text-white/80 text-base md:text-xl font-normal leading-relaxed md:leading-[1.8] font-sans">
            {sub_headline}
          </p>

          {/* Event type chips - Scrollable on mobile */}
          <div className="flex flex-wrap items-center gap-2">
            {HOSTED_EVENTS.map((t) => (
              <span
                key={t}
                className="hero-chip font-serif text-[11px] md:text-[12.5px] text-white/70 px-3 md:px-4 py-1.5 border border-white/20 rounded-full hover:border-[#ED80A8] transition-colors"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTAs + stats */}
          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16 pt-4">
            {/* Primary Button */}
            <div className="hero-fade-body w-full md:w-auto">
              <Link
                href={VANUE_CONTENT.booking_section.buttons.link}
                className="w-full md:w-auto bg-[#a85b74] text-white text-[12px] font-bold tracking-[0.2em] uppercase px-10 py-5 md:py-4 hover:bg-white hover:text-[#1a1014] transition-all inline-block text-center"
              >
                {VANUE_CONTENT.booking_section.buttons.label}
              </Link>
              
            </div>

            {/* Stats - 3 columns */}
            {/* <div className="grid grid-cols-3 gap-4 md:gap-10 w-full max-w-md">
              {[
                { num: stats.capacity, label: "Guests" },
                { num: stats.floor_space, label: "Sq Ft" },
                { num: stats.event_types, label: "Types" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="overflow-hidden">
                    <p className="hero-stat-num font-serif text-2xl md:text-4xl leading-none text-white tabular-nums">
                      {s.num}
                    </p>
                  </div>
                  <div className="mt-2 h-px w-full bg-[#ED80A8]/30" />
                  <p className="mt-1.5 font-sans text-[8px] md:text-[9px] tracking-[0.2em] md:tracking-[0.36em] uppercase text-white/40">
                    {s.label}
                  </p>
                </div>
              ))}
            </div> */}
          </div>

        </div>
      </div>

      {/* Amenities strip */}
      {/* <div className="relative z-30 border-t border-white/5 bg-[#1a1014] backdrop-blur-sm px-8 md:px-16 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-7 h-px bg-white/70" />
            <span className="font-sans text-[10px] tracking-[0.42em] uppercase text-white/80 whitespace-nowrap">
              Each Rental Includes
            </span>
            <span className="block flex-1 h-px bg-white/10" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-4">
            {AMENITIES.map(({ Icon, label }) => (
              <div key={label} className="hero-amenity flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-[#ED80A8]/20 shrink-0">
                  <Icon className="w-4 h-4 text-white" strokeWidth={1.4} />
                </span>
                <span className="font-sans text-[12px] leading-snug text-white/90">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Scroll indicator */}
      <div className="absolute right-10 z-30 hidden md:flex flex-col items-center gap-4" style={{ bottom: "calc(6rem + 1px)" }}>
        <span className="[writing-mode:vertical-rl] text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">
          Scroll to discover
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent animate-pulse origin-top" />
      </div>
    </section>
  );
};

export default HeroSection;

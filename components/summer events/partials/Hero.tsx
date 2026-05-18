"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Star, MapPin, Calendar } from "lucide-react";
import { useContent } from "@/lib/ContentProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ReactNode> = {
  users: <Users size={14} />,
  star: <Star size={14} />,
  "map-pin": <MapPin size={14} />,
};

const SCENES = [
  { src: "/summer events/image-02.jpg", caption: "Floral Workshop" },
  { src: "/summer events/image-03.jpg", caption: "Dinner Service" },
  { src: "/summer events/image-04.jpg", caption: "Styled Tables" },
  { src: "/summer events/image-05.jpg", caption: "Take-Home Bouquets" },
];

export default function Hero() {
  const SUMMER_EVENTS_CONTENT = useContent().summerEvents;
  const { hero } = SUMMER_EVENTS_CONTENT;

  const ref = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const passRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Background photo parallax
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: 120,
          scale: 1.1,
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

      // Text entrance — staggered, locked initial state
      const tl = gsap.timeline();
      tl.fromTo(
        ".se-eyebrow",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      )
        .fromTo(
          ".se-badge",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3",
        )
        .fromTo(
          ".se-line",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .fromTo(
          ".se-rule",
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          ".se-body",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".se-meta",
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .fromTo(
          ".se-cta",
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.3",
        );

      if (passRef.current) {
        gsap.fromTo(
          passRef.current,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.4,
          },
        );
      }

      if (stripRef.current) {
        gsap.fromTo(
          ".se-scene",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stripRef.current,
              start: "top 90%",
              once: true,
            },
          },
        );
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-black">
      {/* ── Full-bleed parallax background ── */}
      <div className="absolute inset-0">
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <Image
            src={hero.image}
            alt={hero.titleSub}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* Tonal overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* ── Top utility row ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-8 lg:pt-10 flex items-center justify-between text-white/80">
        <p className="se-eyebrow text-[10px] md:text-[11px] uppercase tracking-[0.34em]">
          Casa de Flora · Summer 2026 Edition
        </p>
        <span className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.28em]">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Limited spots
        </span>
      </div>

      {/* ── Main content grid ── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-12 lg:pt-20 pb-32 lg:pb-44 min-h-[88vh] items-center">
        {/* COPY */}
        <div ref={textRef} className="lg:col-span-7 max-w-2xl text-white">
          <div className="se-badge inline-flex items-center gap-2 mb-7">
            <span className="bg-primary text-white px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.24em]">
              {hero.badge}
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/70">
              {hero.duration.split("|")[0].trim()}
            </span>
          </div>

          <h1 className="font-serif leading-[0.96] tracking-tight mb-7">
            <span className="se-line block text-[44px] sm:text-[60px] md:text-[78px] lg:text-[92px] xl:text-[108px]">
              {hero.titleMain}
            </span>
            <span className="se-line block italic font-light text-primary text-[36px] sm:text-[50px] md:text-[64px] lg:text-[74px] xl:text-[86px]">
              {hero.titleSub}
            </span>
          </h1>

          <div className="se-rule h-[1px] w-20 bg-primary mb-7 origin-left" />

          <p className="se-body text-white/85 text-base md:text-[17px] leading-relaxed max-w-xl mb-8">
            {hero.description}
          </p>

          {/* Date row */}
          <div className="se-meta flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs">
              <Calendar size={14} className="text-primary" />
              <span className="tracking-wide">{hero.duration}</span>
            </span>
          </div>

          {/* Stats */}
          <ul className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
            {hero.stats.map((stat) => (
              <li
                key={stat.label}
                className="se-meta flex items-center gap-2 text-sm text-white/90"
              >
                <span className="text-primary">{iconMap[stat.icon]}</span>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="#booking"
              className="se-cta bg-primary text-white text-center px-10 py-3 text-sm md:text-base uppercase tracking-widest border border-primary hover:bg-transparent hover:border-white transition-all duration-300"
            >
              {hero.buttons.primary}
            </Link>
            <Link
              href="#about"
              className="se-cta border border-white/40 text-white text-center px-10 py-3 text-sm md:text-base uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              {hero.buttons.secondary}
            </Link>
          </div>
        </div>

        {/* EVENT PASS CARD */}
        <div
          ref={passRef}
          className="lg:col-span-5 lg:justify-self-end w-full max-w-sm"
        >
          <div className="relative bg-white text-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] overflow-hidden">
            {/* Top stub band */}
            <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.32em]">
                Event Pass
              </span>
              <span className="font-serif italic text-lg">No. 26</span>
            </div>

            {/* Perforation */}
            <div className="relative h-3 bg-white">
              <div
                aria-hidden="true"
                className="absolute inset-x-4 top-1/2 -translate-y-1/2 border-t border-dashed border-primary/40"
              />
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black" />
              <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black" />
            </div>

            <div className="px-6 pt-2 pb-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-1">
                Per person
              </p>
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-serif text-5xl text-black tabular-nums">
                  {SUMMER_EVENTS_CONTENT.pricing.price}
                </span>
                <span className="text-[11px] uppercase tracking-[0.24em] text-gray-600">
                  {SUMMER_EVENTS_CONTENT.pricing.subtext}
                </span>
              </div>

              <div className="space-y-2 mb-6 text-sm">
                {SUMMER_EVENTS_CONTENT.about.whatsIncluded.items
                  .slice(0, 3)
                  .map((it) => (
                    <div
                      key={it.title}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="leading-snug">{it.title}</span>
                    </div>
                  ))}
              </div>

              <Link
                href="#booking"
                className="block bg-black text-white text-center py-3 text-[12px] uppercase tracking-[0.18em] hover:bg-primary transition-colors"
              >
                {SUMMER_EVENTS_CONTENT.pricing.booking.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scenes strip ── */}
      <div
        ref={stripRef}
        className="absolute z-10 left-0 right-0 bottom-0 px-6 md:px-12 lg:px-16 pb-6"
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between mb-3 text-white/70">
            <span className="text-[10px] uppercase tracking-[0.32em]">
              Scenes from the experience
            </span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.28em]">
              4 of {SCENES.length + 1}
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {SCENES.map((scene) => (
              <figure
                key={scene.src}
                className="se-scene group shrink-0 w-[160px] sm:w-[200px] md:w-[230px]"
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image
                    src={scene.src}
                    alt={scene.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 230px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <figcaption className="pt-2 text-[10px] uppercase tracking-[0.28em] text-white/80">
                  {scene.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

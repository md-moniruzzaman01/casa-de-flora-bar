"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { menuItems } from "../config/constant";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const FEATURE_IMG = "/menu/Chicken & waffles.jpg";
const ACCENT_TOP = "/menu/Pink waffles.jpg";
const ACCENT_BOTTOM = "/menu/SMORES.jpg";

export default function MenuHero() {
  const ref = useRef<HTMLElement | null>(null);
  const featureRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  // Build quick-link chips from the live menu data so this never drifts.
  const quickLinks = menuItems.map((cat) => ({
    label: cat.category,
    id: `menu-${slugify(cat.category)}`,
  }));

  useEffect(() => {
    if (!ref.current || !featureRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax: feature photo drifts down + scales slightly as you scroll.
      gsap.to(featureRef.current, {
        y: 100,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Counter-parallax on accent photos for depth.
      if (topRef.current) {
        gsap.to(topRef.current, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      if (bottomRef.current) {
        gsap.to(bottomRef.current, {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Text entrance — fromTo so the initial state is locked in before paint.
      const tl = gsap.timeline();
      tl.fromTo(
        ".menu-hero-eyebrow",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      )
        .fromTo(
          ".menu-hero-line",
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
          ".menu-hero-rule",
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          ".menu-hero-body",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".menu-hero-chip",
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .fromTo(
          ".menu-hero-cta",
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

      // Photos enter with a soft scale-in.
      gsap.fromTo(
        [featureRef.current, topRef.current, bottomRef.current].filter(Boolean),
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-primary-50"
    >
      {/* Soft floral wash backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 18% 10%, rgba(237,128,168,0.18), transparent 55%), radial-gradient(ellipse at 90% 90%, rgba(237,128,168,0.12), transparent 60%)",
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-20 lg:pt-24 lg:pb-28 min-h-[88vh] items-center">
        {/* ── PHOTO COLLAGE ── Explicit inset-based sizing so next/image fill can measure heights reliably. */}
        <div className="relative order-2 lg:order-1 lg:col-span-6 h-[520px] sm:h-[600px] lg:h-[640px]">
          {/* Feature photo — fills most of the collage */}
          <div
            ref={featureRef}
            className="absolute left-0 top-[6%] bottom-[6%] w-[72%] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]"
          >
            <Image
              src={FEATURE_IMG}
              alt="Casa de Flora signature plate"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 72vw, 38vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Floating badge over feature */}
            <div className="absolute top-5 left-5 sm:top-7 sm:left-7 z-10">
              <div className="px-4 py-3 bg-white/15 backdrop-blur-md border border-white/20 text-white">
                <p className="text-[8.5px] uppercase tracking-[0.32em] opacity-80">
                  Brunch
                </p>
                <p className="font-serif italic text-base sm:text-lg leading-none mt-1">
                  Sat &amp; Sun
                </p>
              </div>
            </div>
          </div>

          {/* Top-right accent photo */}
          <div
            ref={topRef}
            className="absolute right-0 top-0 w-[36%] sm:w-[32%] h-[44%] overflow-hidden border-[6px] border-white shadow-[0_18px_50px_-15px_rgba(0,0,0,0.35)] rotate-[3deg]"
          >
            <Image
              src={ACCENT_TOP}
              alt="Pink waffles"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 36vw, 18vw"
            />
          </div>

          {/* Bottom-right accent photo */}
          <div
            ref={bottomRef}
            className="absolute right-4 sm:right-8 bottom-0 w-[34%] sm:w-[30%] h-[36%] overflow-hidden border-[6px] border-white shadow-[0_18px_50px_-15px_rgba(0,0,0,0.35)] -rotate-[4deg]"
          >
            <Image
              src={ACCENT_BOTTOM}
              alt="Smores craffle"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 34vw, 18vw"
            />
          </div>

          {/* Decorative count chip */}
          <div className="hidden sm:flex absolute right-2 top-[46%] flex-col items-center bg-white border border-primary/30 px-4 py-3 shadow-md rotate-[-6deg] z-10">
            <span className="font-serif text-2xl text-primary leading-none tabular-nums">
              {String(quickLinks.length).padStart(2, "0")}
            </span>
            <span className="text-[8.5px] uppercase tracking-[0.28em] text-gray-600 mt-1">
              Sections
            </span>
          </div>
        </div>

        {/* ── COPY ── */}
        <div ref={textRef} className="order-1 lg:order-2 lg:col-span-6 max-w-xl">
          <p className="menu-hero-eyebrow text-[10px] md:text-[11px] uppercase tracking-[0.34em] text-primary mb-5">
            Casa de Flora · The Menu
          </p>

          <h1 className="font-serif leading-[0.96] tracking-tight text-black mb-7">
            <span className="menu-hero-line block text-[42px] sm:text-[60px] md:text-[76px] lg:text-[88px] xl:text-[100px]">
              A bloom on
            </span>
            <span className="menu-hero-line block text-[42px] sm:text-[60px] md:text-[76px] lg:text-[88px] xl:text-[100px]">
              every plate.
            </span>
          </h1>

          <div className="menu-hero-rule h-[1px] w-20 bg-primary mb-7 origin-left" />

          <p className="menu-hero-body text-gray-700 text-base md:text-[17px] leading-relaxed max-w-lg mb-8">
            Slow brunches, signature craffles, and weekend plates worth lingering
            over. Everything is made fresh, in-house, and served alongside fresh
            blooms.
          </p>

          {/* Quick-jump chips */}
          <div className="flex flex-wrap gap-2 mb-10">
            {quickLinks.map((q) => (
              <Link
                key={q.id}
                href={`#${q.id}`}
                className="menu-hero-chip text-[10px] md:text-[11px] uppercase tracking-[0.22em] px-4 py-2 rounded-full border border-primary/30 text-gray-700 bg-white/60 backdrop-blur-sm hover:border-primary hover:text-black hover:bg-white transition-colors"
              >
                {q.label}
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/reservations"
              className="menu-hero-cta bg-black text-white text-center px-10 py-3 text-sm md:text-base uppercase tracking-widest border border-black hover:bg-transparent hover:text-black transition-all duration-300"
            >
              Reserve a Table
            </Link>
            <Link
              href="/bouquet"
              className="menu-hero-cta border border-black/40 text-black text-center px-10 py-3 text-sm md:text-base uppercase tracking-widest hover:border-black hover:bg-white/40 transition-all duration-300"
            >
              Make a Bouquet
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-gray-500"
      >
        <span>Scroll the menu</span>
        <span className="block w-px h-10 bg-primary/40 animate-pulse" />
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Clock,
  Users,
  ShieldCheck,
  Star,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURE_IMAGE = "/reservation 1.jpg";

const QUICK_DATES = [
  { id: "today", label: "Today" },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "weekend", label: "This Weekend" },
] as const;

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [quickDate, setQuickDate] = useState<(typeof QUICK_DATES)[number]["id"]>("today");
  const [guestCount, setGuestCount] = useState<number>(2);

  useEffect(() => {
    if (!ref.current || !textRef.current) return;
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
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
      }

      const tl = gsap.timeline();
      tl.fromTo(
        ".rsv-eyebrow",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      )
        .fromTo(
          ".rsv-line",
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
          ".rsv-rule",
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          ".rsv-body",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".rsv-meta",
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.07,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .fromTo(
          ".rsv-cta",
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2",
        );

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.3,
          },
        );
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  const quickBookHref = `#booking?date=${quickDate}&guests=${guestCount}`;

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-black text-white"
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <Image
            src={FEATURE_IMAGE}
            alt="Casa de Flora dining room"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />
      </div>

      {/* Top utility row */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-8 lg:pt-10 flex items-center justify-between text-white/85">
        <p className="rsv-eyebrow text-[10px] md:text-[11px] uppercase tracking-[0.34em]">
          Casa de Flora · Reservations
        </p>
        <span className="rsv-meta hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.28em]">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Live availability below
        </span>
      </div>

      {/* Main grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-12 lg:pt-16 pb-20 lg:pb-24 min-h-[88vh] items-center">
        {/* Copy column */}
        <div ref={textRef} className="lg:col-span-7 max-w-2xl">
          {/* Social proof line */}
          <div className="rsv-meta inline-flex items-center gap-3 mb-6 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="flex items-center gap-0.5 text-primary">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={11} className="fill-current" />
              ))}
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/85">
              4.9 · Loved by 200+ guests
            </span>
          </div>

          <h1 className="font-serif leading-[0.96] tracking-tight mb-7">
            <span className="rsv-line block text-[44px] sm:text-[60px] md:text-[78px] lg:text-[88px] xl:text-[100px]">
              Reserve your
            </span>
            <span className="rsv-line block italic font-light text-primary text-[40px] sm:text-[54px] md:text-[68px] lg:text-[78px] xl:text-[88px]">
              evening with us.
            </span>
          </h1>

          <div className="rsv-rule h-[1px] w-20 bg-primary mb-7 origin-left" />

          <p className="rsv-body text-white/85 text-base md:text-[17px] leading-relaxed max-w-xl mb-8">
            Pick a date, share your details, and we&apos;ll set the table. Most
            reservations are confirmed instantly — for parties of 7 or more, a
            host follows up within the hour.
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-3 mb-9">
            <li className="rsv-meta flex items-center gap-2 text-sm text-white/90">
              <Clock size={14} className="text-primary" />
              <span>1 hr 30 min seating</span>
            </li>
            <li className="rsv-meta flex items-center gap-2 text-sm text-white/90">
              <Users size={14} className="text-primary" />
              <span>Up to 8 guests</span>
            </li>
            <li className="rsv-meta flex items-center gap-2 text-sm text-white/90">
              <ShieldCheck size={14} className="text-primary" />
              <span>Free cancel · 24 h</span>
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="#booking"
              className="rsv-cta bg-primary text-white text-center px-10 py-3 text-sm md:text-base uppercase tracking-widest border border-primary hover:bg-transparent hover:border-white transition-all duration-300"
            >
              Book a Table
            </Link>
            <Link
              href="/celebrate"
              className="rsv-cta border border-white/40 text-white text-center px-10 py-3 text-sm md:text-base uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Larger Party? Celebrate
            </Link>
          </div>
        </div>

        {/* Quick Book pass card */}
        <div
          ref={cardRef}
          className="lg:col-span-5 lg:justify-self-end w-full max-w-sm"
        >
          <div className="bg-white text-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]">
            {/* Top stub band */}
            <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.32em] inline-flex items-center gap-2">
                <CalendarDays size={13} />
                Quick Book
              </span>
              <span className="font-serif italic text-base">No fee</span>
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

            <div className="px-6 pb-6 pt-2 space-y-5">
              {/* Dates */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-gray-500 mb-2.5">
                  When
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {QUICK_DATES.map((d) => {
                    const isActive = quickDate === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setQuickDate(d.id)}
                        className={`rounded-xl py-2.5 text-[11px] font-semibold tracking-wide transition-all border ${
                          isActive
                            ? "bg-primary border-primary text-white shadow-sm"
                            : "bg-white border-primary-100 text-gray-700 hover:border-primary/50"
                        }`}
                      >
                        {d.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guests */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-gray-500 mb-2.5">
                  Guests
                </p>
                <div className="grid grid-cols-8 gap-1.5">
                  {GUEST_OPTIONS.map((n) => {
                    const isActive = guestCount === n;
                    return (
                      <button
                        key={n}
                        type="button"
                        aria-label={`${n} ${n === 1 ? "guest" : "guests"}`}
                        onClick={() => setGuestCount(n)}
                        className={`aspect-square rounded-lg text-xs font-semibold tabular-nums transition-all border ${
                          isActive
                            ? "bg-primary border-primary text-white shadow-sm"
                            : "bg-white border-primary-100 text-gray-700 hover:border-primary/50"
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <Link
                href={quickBookHref}
                className="group flex items-center justify-between bg-black text-white px-5 py-3.5 text-[12px] uppercase tracking-[0.18em] hover:bg-primary transition-colors"
              >
                <span>Find a Table</span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <p className="text-[10px] text-center text-gray-500 uppercase tracking-[0.22em]">
                Most tables confirmed instantly
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

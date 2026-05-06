"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MenuHero() {
  const ref     = useRef<HTMLElement | null>(null);
  const imgRef  = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax-y zoom on the food image
      gsap.to(imgRef.current, {
        y: 100,
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

      gsap.from(".menu-hero-line", {
        y: 36, opacity: 0, stagger: 0.13, duration: 0.9, ease: "power3.out",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen bg-primary-50 overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* ── LEFT IMAGE ── */}
        <div className="relative w-full lg:w-[45%] h-[55vh] lg:h-screen overflow-hidden">
          <div ref={imgRef} className="absolute inset-0">
            <Image
              src="/menu/Chicken & waffles.jpg"
              alt="Casa De Flora signature plate"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>

          {/* darkening overlay so the corner badge stays legible */}
          <div className="absolute inset-0 bg-black/30" />

          {/* corner badge — matches the home hero badge */}
          <div className="absolute top-8 left-8 z-10">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex flex-col items-center justify-center">
              <span className="text-[9px] uppercase tracking-widest opacity-70">Brunch</span>
              <span className="text-lg font-serif italic">All Day</span>
              <span className="text-[8px] uppercase tracking-widest opacity-60">Sat & Sun</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT CONTENT ── */}
        <div className="w-full lg:w-[55%] flex items-center justify-start px-8 md:px-16 lg:px-24 py-20 lg:py-0">
          <div ref={textRef} className="max-w-2xl">

            {/* Headline — same scale ramp as home hero */}
            <h1 className="font-serif leading-[1.05] text-black mb-8">
              <span className="menu-hero-line block text-[48px] md:text-[72px] lg:text-[80px] xl:text-[100px]">
                Our
              </span>
              <span className="menu-hero-line block text-[48px] md:text-[72px] lg:text-[80px] xl:text-[100px] text-primary">
                Menu
              </span>
            </h1>

            {/* Pink separator — same token as home */}
            <div className="h-[1px] w-16 bg-[#E8A0B5] mb-8" />

            <p className="text-gray-700 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-12">
              Slow brunches, signature craffles, and weekend plates worth lingering
              over. Everything is made fresh, in-house, and served alongside
              fresh blooms.
            </p>

            {/* CTAs — identical button styling to home hero */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link
                href="/reservations"
                className="bg-black text-white px-10 py-3 text-sm md:text-base uppercase tracking-widest border border-black hover:bg-transparent hover:text-black transition-all duration-300"
              >
                Book a Table
              </Link>
              <Link
                href="/bouquet"
                className="border border-gray-300 text-black px-10 py-3 text-sm md:text-base uppercase tracking-widest hover:border-black transition-all duration-300"
              >
                Make a Bouquet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

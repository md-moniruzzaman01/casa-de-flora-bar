"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaveDividerUp from "@/components/shared/WaveDivider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MenuOutro() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".menu-outro > *", {
        y: 30, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full">
      <WaveDividerUp />
      <div className="bg-primary-200 px-6 py-24 md:px-16 md:py-32">
        <div className="max-w-[1100px] mx-auto text-center menu-outro space-y-8">

          <p className="text-[11px] md:text-xs uppercase tracking-[0.32em] text-primary">
            The Table Awaits
          </p>

          <h2 className="font-serif uppercase leading-[0.95] tracking-tight text-[#222] text-5xl md:text-7xl lg:text-[88px]">
            Reserve a seat —<br />
            <span className="text-primary">stay for the bloom.</span>
          </h2>

          <p className="text-gray-700 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto">
            Brunch is best slow. Book ahead so we can plate it the way it&apos;s
            meant to be: warm, generous, and never rushed.
          </p>

          {/* CTAs — same buttons as the home hero */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <Link
              href="/reservations"
              className="bg-black text-white px-10 py-3 text-sm md:text-base uppercase tracking-widest border border-black hover:bg-transparent hover:text-black transition-all duration-300"
            >
              Reserve a Table
            </Link>
            <Link
              href="/celebrate"
              className="border border-black/40 text-black px-10 py-3 text-sm md:text-base uppercase tracking-widest hover:border-black hover:bg-white/30 transition-all duration-300"
            >
              Celebrate With Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

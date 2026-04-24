"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { HOME_CONTENT } from "../config/constant";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const { hero } = HOME_CONTENT;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ===============================
      // VIDEO PARALLAX
      // ===============================
      gsap.to(videoRef.current, {
        y: 120,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // ===============================
      // TEXT PINS (Luxury feel)
      // ===============================
      gsap.fromTo(
        textRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        }
      );

      // ===============================
      // TITLE STAGGER
      // ===============================
      gsap.from(".hero-line", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* ================= LEFT VIDEO ================= */}
        <div className="relative h-[60vh] lg:h-screen overflow-hidden">

          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover scale-110"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* badge */}
          <div className="absolute top-8 left-8 z-10">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex flex-col items-center justify-center">
              <span className="text-[9px] uppercase tracking-widest opacity-70">
                Since
              </span>
              <span className="text-lg font-serif italic">2024</span>
              <span className="text-[8px] uppercase tracking-widest opacity-60">
                Est.
              </span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="flex items-center bg-[#FDFAF8] px-6 lg:px-20 py-16">

          <div ref={textRef} className="max-w-xl">

            {/* TAG */}
            <p className="text-[10px] tracking-[0.3em] uppercase text-pink-700 mb-6">
              {hero.tag}
            </p>

            {/* TITLE */}
            <h1 className="font-serif text-[44px] lg:text-[64px] leading-[1.1]">
              {hero.title.map((line, i) => (
                <span key={i} className="block hero-line">
                  {line}
                </span>
              ))}
            </h1>

            {/* divider */}
            <div className="h-[1px] w-14 bg-[#C4A882] my-6" />

            {/* DESCRIPTION */}
            <p className="text-[15px] leading-[1.8] text-gray-600 mb-10">
              {hero.description}
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={hero.primaryCTA.href}
                className="bg-black text-white px-8 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-pink-600 transition"
              >
                {hero.primaryCTA.label}
              </Link>

              <Link
                href={hero.secondaryCTA.href}
                className="border-b border-[#C4A882] text-[10px] uppercase tracking-[0.3em] pb-1 hover:text-pink-600"
              >
                {hero.secondaryCTA.label}
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
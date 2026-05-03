"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { HOME_CONTENT } from "../config/constant";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);

  const { hero } = HOME_CONTENT;

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  // ▶️ Toggle play/pause
  const handleVideoToggle = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section ref={ref} className="relative min-h-screen bg-primary-50 overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* ================= LEFT VIDEO ================= */}
        <div className="relative w-full lg:w-[45%] h-[50vh] lg:h-screen overflow-hidden">

          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover scale-100"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/CASA DE FLORA BAR.mp4" type="video/mp4" />
          </video>

          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* ▶️ PLAY / PAUSE BUTTON */}
          <button
            onClick={handleVideoToggle}
            className="absolute bottom-6 right-6 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition"
          >
            {isPlaying ? (
              // Pause icon
              <div className="flex gap-[2px]">
                <span className="w-[3px] h-4 bg-white"></span>
                <span className="w-[3px] h-4 bg-white"></span>
              </div>
            ) : (
              // Play icon
              <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
            )}
          </button>

          {/* badge */}
          <div className="absolute top-8 left-8 z-10">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex flex-col items-center justify-center">
              <span className="text-[9px] uppercase tracking-widest opacity-70">
                Since
              </span>
              <span className="text-lg font-serif italic">2020</span>
              <span className="text-[8px] uppercase tracking-widest opacity-60">
                Est.
              </span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="w-full lg:w-[55%] flex items-center justify-start px-8 md:px-16 lg:px-24 py-20 lg:py-0">
          <div ref={textRef} className="max-w-2xl">

            {/* Main Heading - Responsive Sizes */}
            <h1 className="font-serif leading-[1.05] text-black mb-8">
              {/* Mobile: 48px | Tablet: 72px | Desktop: 90px | Large Desktop: 110px */}
              {hero.title.map((line, i) => (
                <span
                  key={i}
                  className={`block text-[48px] md:text-[72px] lg:text-[80px] xl:text-[100px] ${line === "Beautiful" ? "text-primary" : ""}`}
                >
                  {line}
                </span>
              ))}
            </h1>

            {/* Separator Line */}
            <div className="h-[1px] w-16 bg-[#E8A0B5] mb-8" />

            {/* Description */}
            <p className="text-gray-700 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-12">
              {hero.description}
            </p>

            {/* Buttons - Matching the sleek design */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link
                href={hero.primaryCTA.href}
                className="bg-black text-white px-10 py-3 text-sm md:text-base uppercase tracking-widest border border-black hover:bg-transparent hover:text-black transition-all duration-300"
              >
                {hero.primaryCTA.label}
              </Link>

              <Link
                href={hero.secondaryCTA.href}
                className="border border-gray-300 text-black px-10 py-3 text-sm md:text-base uppercase tracking-widest hover:border-black transition-all duration-300"
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
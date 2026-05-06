"use client";

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Users, Star, MapPin } from 'lucide-react';
import { SUMMER_EVENTS_CONTENT } from '../config/constant';


const iconMap: Record<string, React.ReactNode> = {
  "users": <Users size={18} className="text-gray-500" />,
  "star": <Star size={18} className="text-gray-500" />,
  "map-pin": <MapPin size={18} className="text-gray-500" />,
};

const HeroSection = () => {
  const { hero } = SUMMER_EVENTS_CONTENT;
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      // Animate Image
      tl.fromTo(imageRef.current, 
        { x: -50, opacity: 0 }, 
        { x: 0, opacity: 1 }
      );

      // Animate Text Content staggered
      if (contentRef.current) {
        tl.fromTo(Array.from(contentRef.current.children), 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.15 },
          "-=0.5"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen w-full bg-primary-150 flex items-center justify-center p-6 md:p-12"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Image */}
        <div ref={imageRef} className="relative aspect-square w-full overflow-hidden rounded-[40px] shadow-xl">
          <Image
            src={hero.image}
            alt={hero.titleSub}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Content */}
        <div ref={contentRef} className="flex flex-col space-y-6 text-[#1A1A1A]">
          {/* Badge & Date */}
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <span className="bg-[#EBD6D6] px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
              {hero.badge}
            </span>
            <span className="text-gray-600">{hero.duration}</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-serif leading-tight">
            {hero.titleMain} <br />
            <span className="italic text-[#F48FB1] font-light">{hero.titleSub}</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-700 max-w-md leading-relaxed">
            {hero.description}
          </p>

          {/* Features */}
          <ul className="space-y-3 pt-2">
            {hero.stats.map((stat, index) => (
              <li key={index} className="flex items-center gap-3 text-sm">
                {iconMap[stat.icon]}
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-6">
            <button className="bg-black text-white px-10 py-4 font-medium transition-transform active:scale-95">
              {hero.buttons.primary}
            </button>
            <button className="border border-gray-400 px-10 py-4 font-medium hover:bg-white/50 transition-all active:scale-95">
              {hero.buttons.secondary}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
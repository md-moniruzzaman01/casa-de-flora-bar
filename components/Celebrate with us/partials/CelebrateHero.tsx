"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CELEBRATE_CONTENT } from "../config/constant";

const CelebrateHero = () => {
  const container = useRef<HTMLDivElement>(null);
  const { hero } = CELEBRATE_CONTENT;

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

    tl.from(".hero-title", {
      y: 40,
      opacity: 0,
    })
    .from(".hero-subtitle", {
      y: 20,
      opacity: 0,
    }, "-=0.8");
  }, { scope: container });

  return (
    <section 
      ref={container}
      className="w-full bg-[#FDE8E9] py-24 md:py-32 flex flex-col items-center justify-center text-center px-6"
    >
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-serif text-[#1a1a1a] tracking-tight uppercase">
          {hero.title}
        </h1>
        
        <p className="hero-subtitle text-[#4a4a4a] text-sm md:text-base lg:text-lg italic font-serif">
          {hero.subtitle}
        </p>
      </div>
    </section>
  );
};

export default CelebrateHero;
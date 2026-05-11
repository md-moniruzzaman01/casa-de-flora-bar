"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const HeroSection = () => {


  return (
   <section className="relative h-screen min-h-[720px] flex items-end px-8 md:px-16 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1014] to-[#2d1a25]" />
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_70%_20%,_rgba(232,160,176,0.2)_0%,transparent_50%)]" />
        </div>

        {/* Hero Photo with Mask */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 opacity-60 z-10"
          style={{
            backgroundImage: "url('/venue/grand stage-02.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: 'linear-gradient(to left, black 30%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, black 30%, transparent 100%)'
          }}
        />

        {/* Film Grain Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-20 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27200%27><filter id=%27n%27><feTurbulence baseFrequency=%270.85%27 /></filter><rect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 /></svg>')]"></div>

        {/* Hero Content */}
  <div className="relative z-30 w-full max-w-7xl mx-auto flex flex-col items-start gap-10">
          
          {/* Tag: Specific outline pill styling */}
          <div className="border border-white/20 rounded-full px-5 py-2.5">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white">
              Catering & Events
            </span>
          </div>

          {/* Title: Mixed serif styles. Beautiful typography match */}
          <h1 className="font-serif text-[clamp(48px,8vw,110px)] leading-[1.05] tracking-[-0.01em] text-white">
            Food as{" "}
            {/* The core 'Beautiful' italic style */}
            <span className="italic font-light text-[#f0cfd8]">Beautiful</span>{" "}
            as the<br /> Flowers
          </h1>

          {/* Paragraph: Exact text, spacing, and weight match */}
          <p className="max-w-[50ch] text-white/90 text-xl font-normal leading-[1.8] font-sans">
            From intimate brunches to full wedding receptions — our catering brings
            the same care and elegance as every bloom we arrange.
          </p>

          {/* Buttons Group */}
          <div className="flex items-center gap-6 pt-2">
            {/* Primary Button: Exact berry-mauve background color */}
            <a 
              href="#"
              className="bg-[#a85b74] text-white text-[12px] font-bold tracking-[0.2em] uppercase px-12 py-5 rounded-full hover:bg-white hover:text-[#1a1014] transition-all"
            >
              Request a Quote
            </a>
            
            {/* Secondary Button: Original design ghost button style, updated text */}
            <a 
              href="#" 
              className="text-white text-[12px] font-semibold tracking-[0.2em] uppercase px-12 py-5 rounded-full border border-white/30 hover:bg-white/10 transition-all"
            >
              View Menu
            </a>
          </div>

        </div>

        {/* Vertical Scroll Indicator */}
        <div className="absolute bottom-10 right-10 z-30 hidden md:flex flex-col items-center gap-4">
          <span className="[writing-mode:vertical-rl] text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">
            Scroll to discover
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent animate-pulse origin-top" />
        </div>
      </section>
  );
};

const MetaItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-2">
    <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">{label}</h4>
    <p className="font-serif text-xl md:text-2xl text-white">{value}</p>
  </div>
);

export default HeroSection;
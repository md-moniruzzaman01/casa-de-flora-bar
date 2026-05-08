"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATERING_CONTENT } from "../config/constant";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProcessSteps() {
  const { process, trust } = CATERING_CONTENT;
  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proc-head > *",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );

      gsap.fromTo(
        ".proc-step",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".proc-grid", start: "top 80%" },
        },
      );

      if (railRef.current) {
        gsap.fromTo(
          railRef.current,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".proc-grid",
              start: "top 80%",
              end: "bottom 50%",
              scrub: 1,
            },
          },
        );
      }

      gsap.fromTo(
        ".trust-stat",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".trust-bar", start: "top 90%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="bg-white px-6 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-24 md:py-28 lg:py-32"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="proc-head text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-primary mb-3 sm:mb-4">
            {process.eyebrow}
          </p>
          <h2 className="font-serif uppercase leading-[0.95] tracking-tight text-[#222] text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px]">
            {process.title}
          </h2>
        </div>

        {/* Timeline grid */}
        <div className="proc-grid relative">
          {/* Horizontal rail (desktop) */}
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-primary/30">
            <div
              ref={railRef}
              className="absolute inset-0 w-full bg-primary origin-left"
            />
          </div>

          <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-6">
            {process.steps.map((step) => (
              <li key={step.id} className="proc-step relative pt-0 lg:pt-20">
                {/* Marker dot (desktop) */}
                <span
                  aria-hidden="true"
                  className="hidden lg:flex absolute top-3 left-0 w-9 h-9 rounded-full bg-white border border-primary text-primary items-center justify-center font-serif text-sm shadow-[0_6px_18px_-4px_rgba(237,128,168,0.45)]"
                >
                  {String(step.id).padStart(2, "0")}
                </span>

                <div className="bg-white border border-primary-100 rounded-2xl p-6 sm:p-7 hover:border-primary/40 hover:shadow-[0_24px_50px_-25px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-baseline justify-between gap-3 mb-4">
                    <span className="font-serif text-2xl sm:text-3xl text-primary leading-none tabular-nums lg:hidden">
                      {String(step.id).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.28em] text-gray-500">
                      {step.time}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#222] leading-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Trust bar */}
        <div className="trust-bar mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 border-t border-primary-100 pt-10 sm:pt-12">
          {trust.items.map((stat) => (
            <div key={stat.label} className="trust-stat text-center sm:text-left">
              <p className="font-serif text-3xl sm:text-4xl text-primary tabular-nums leading-none">
                {stat.value}
              </p>
              <p className="text-[10px] uppercase tracking-[0.28em] text-gray-600 mt-3">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

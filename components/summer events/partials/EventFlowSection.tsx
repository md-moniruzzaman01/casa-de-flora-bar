"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wine, Flower2, UtensilsCrossed, Camera, Clock } from "lucide-react";
import { useContent } from "@/lib/ContentProvider";
import WaveDividerUp from "@/components/shared/WaveDivider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  wine: Wine,
  flower: Flower2,
  plate: UtensilsCrossed,
  camera: Camera,
};

export default function EventFlowSection() {
  const { flow } = useContent().summerEvents;
  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".flow-head > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );

      gsap.fromTo(
        ".flow-step",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );

      gsap.fromTo(
        ".flow-polaroid",
        { y: 30, opacity: 0, rotate: 0 },
        {
          y: 0,
          opacity: 1,
          rotate: (i: number, el: Element) =>
            parseFloat((el as HTMLElement).dataset.rotate ?? "0"),
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".flow-polaroids", start: "top 85%" },
        },
      );

      gsap.fromTo(
        ".flow-closing",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".flow-closing", start: "top 90%" },
        },
      );

      // Animate the vertical rail growing as the section scrolls into view
      if (railRef.current) {
        gsap.fromTo(
          railRef.current,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 1,
            },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full">
      <WaveDividerUp />

      <div className="bg-primary-200 px-6 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-24 md:py-28 lg:py-32">
        <div className="max-w-[1240px] mx-auto">
          {/* Header */}
          <div className="flow-head text-center mb-16 sm:mb-20 lg:mb-24 max-w-3xl mx-auto">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-primary mb-3 sm:mb-4">
              The Evening · Schedule
            </p>
            <h2 className="font-serif uppercase leading-[0.95] tracking-tight text-[#222] text-[36px] sm:text-[48px] md:text-[64px] lg:text-[78px]">
              {flow.title}
            </h2>
            <p className="mt-6 text-gray-700 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              From welcome drink to take-home bouquet — every minute is
              choreographed so you can simply show up and enjoy.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* ── Polaroid stack on left (desktop only) ── */}
            <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 self-start">
              <div className="flow-polaroids relative h-[420px] xl:h-[460px]">
                {flow.polaroids?.map((src, i) => {
                  const positions = [
                    { left: "0%", top: "0%", rotate: -8, z: 10 },
                    { left: "30%", top: "10%", rotate: 4, z: 20 },
                    { left: "8%", top: "44%", rotate: -3, z: 30 },
                    { left: "38%", top: "52%", rotate: 7, z: 40 },
                  ];
                  const pos = positions[i] ?? positions[0];
                  return (
                    <div
                      key={src}
                      data-rotate={pos.rotate}
                      style={{
                        left: pos.left,
                        top: pos.top,
                        zIndex: pos.z,
                        transform: `rotate(${pos.rotate}deg)`,
                      }}
                      className="flow-polaroid absolute w-[210px] xl:w-[230px] bg-white p-2.5 pb-8 shadow-[0_18px_50px_-15px_rgba(0,0,0,0.35)]"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-primary-100">
                        <Image
                          src={src}
                          alt={`Scene ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="230px"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-6 pl-2 text-[10px] uppercase tracking-[0.3em] text-gray-600">
                — From the last edition
              </p>
            </aside>

            {/* ── Timeline on right ── */}
            <div className="relative lg:col-span-8">
              {/* Vertical rail */}
              <div className="absolute top-2 bottom-2 left-7 lg:left-9 w-px bg-primary/30 z-0">
                <div
                  ref={railRef}
                  className="absolute inset-0 w-full bg-primary origin-top"
                />
              </div>

              <ol className="relative z-10 space-y-10 sm:space-y-12">
                {flow.steps.map((step) => {
                  const Icon = ICONS[step.icon] ?? Flower2;
                  return (
                    <li
                      key={step.id}
                      className="flow-step relative pl-20 lg:pl-24"
                    >
                      {/* Marker — icon inside circle */}
                      <span
                        aria-hidden="true"
                        className="absolute left-7 lg:left-9 top-2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border border-primary flex items-center justify-center text-primary shadow-[0_6px_18px_-4px_rgba(237,128,168,0.45)]"
                      >
                        <Icon size={18} />
                      </span>

                      {/* Connector hairline from rail to card */}
                      <span
                        aria-hidden="true"
                        className="hidden sm:block absolute left-[3.25rem] lg:left-[4rem] top-[1.4rem] w-6 lg:w-8 h-px bg-primary/40"
                      />

                      {/* Card */}
                      <div className="bg-white border border-primary-100 hover:border-primary/40 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-25px_rgba(0,0,0,0.18)]">
                        {/* Time + duration row */}
                        <div className="flex items-baseline justify-between gap-4 mb-4">
                          <div className="flex items-baseline gap-3">
                            <span className="font-serif italic text-2xl sm:text-3xl text-primary leading-none tabular-nums">
                              {step.time}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.28em] text-gray-400">
                              Step {String(step.id).padStart(2, "0")}
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gray-600 px-3 py-1 rounded-full border border-primary-100 bg-primary-50/60 whitespace-nowrap">
                            <Clock size={11} className="text-primary" />
                            {step.duration}
                          </span>
                        </div>

                        <h3 className="font-serif text-xl sm:text-2xl md:text-[28px] text-[#222] leading-tight mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              {/* Closing note */}
              <p className="flow-closing relative z-10 mt-10 sm:mt-12 pl-20 lg:pl-24 text-[12px] sm:text-sm italic text-gray-600 leading-relaxed max-w-xl">
                {flow.closing}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

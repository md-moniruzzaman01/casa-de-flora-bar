"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VANUE_CONTENT } from "../config/constant";
import WaveDividerUp from "@/components/shared/WaveDivider";

const PackagesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { headline_line_1, headline_line_2, packages } =
    VANUE_CONTENT.packages_section;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".pkg-rise", { yPercent: 110 });
      gsap.set(".pkg-fade", { y: 24, opacity: 0 });
      gsap.set(".pkg-card", { y: 80, opacity: 0 });

      gsap.to(".pkg-rise", {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pkg-head", start: "top 80%", once: true },
      });

      gsap.to(".pkg-fade", {
        y: 0,
        opacity: 1,
        duration: 0.95,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pkg-head", start: "top 80%", once: true },
      });

      gsap.to(".pkg-card", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pkg-grid", start: "top 82%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative  overflow-hidden"
    >
      <div className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-16 ">
        <div className="max-w-[1440px] mx-auto">
          {/* Heading */}
          <div className="pkg-head mb-12 md:mb-20 lg:mb-24">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
              <h2 className="text-[clamp(40px,6vw,84px)] font-serif  uppercase leading-[0.95] tracking-tight">
                <span className="block overflow-hidden">
                  <span className="pkg-rise block">{headline_line_1}</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="pkg-rise block italic text-primary normal-case font-normal">
                    {headline_line_2}
                  </span>
                </span>
              </h2>
              <div className="md:max-w-sm md:pb-2">
                <div className="pkg-fade h-px w-16 bg-primary/50 mb-4" />
                <p className="pkg-fade text-[15px] text-gray-800 leading-relaxed">
                  Four curated formats — each tailored to the rhythm of your gathering. All include floral styling, full bar service, and a dedicated coordinator.
                </p>
              </div>
            </div>
          </div>

          {/* Cards — staggered offset on desktop */}
          <div className="pkg-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
            {packages.map((pkg, i) => (
              <article
                key={pkg.id}
                className={`pkg-card group relative flex flex-col bg-primary-150 p-2 rounded-2xl ${i % 2 === 1 ? "lg:mt-14" : ""
                  }`}
              >
                <div className="relative overflow-hidden mb-5 ">
                  <div className="relative aspect-4/4 overflow-hidden rounded-t-2xl ">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
                     
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-primary/0 group-hover:ring-primary/45 transition-all duration-500" />
                  </div>



                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-black font-sans text-[9px] tracking-[0.32em] uppercase px-3 py-1.5">
                    <span className="block w-1 h-1 rounded-full bg-primary" />
                    {pkg.tag}
                  </span>
                </div>

                <div className="px-4">
                  <h3 className="font-serif text-[22px] md:text-[26px] leading-[1.15] tracking-tight text-black mb-3 transition-colors duration-300 group-hover:text-primary">
                    {pkg.title}
                  </h3>
                  <p className="font-sans text-[13px] leading-[1.85] text-gray-700  flex-1">
                    {pkg.description}
                  </p>
                </div>

              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;

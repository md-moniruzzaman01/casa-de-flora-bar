"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VANUE_CONTENT } from "../config/constant";

const PackagesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { label, headline_line_1, headline_line_2, packages } =
    VANUE_CONTENT.packages_section;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Section heading
      gsap.from(".pkg-heading", {
        y: 36,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pkg-heading",
          start: "top 82%",
          once: true,
        },
      });

      // Cards — stagger in from bottom
      gsap.from(".pkg-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pkg-grid",
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#faf6f2] py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[72px]">

        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-18">
          <div className="pkg-heading flex items-center gap-3 mb-6">
            <span className="block w-5 h-px bg-primary" />
            <span className="font-sans text-[10px] tracking-[0.44em] uppercase text-primary">
              {label}
            </span>
            <span className="block w-5 h-px bg-primary" />
          </div>
          <h2 className="pkg-heading font-serif text-[38px] sm:text-[48px] md:text-[58px] leading-[1.05] tracking-tight text-[#1a1008]">
            {headline_line_1}{" "}
            <span className="italic text-primary">{headline_line_2}</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="pkg-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className="pkg-card group flex flex-col bg-white overflow-hidden shadow-[0_2px_20px_rgba(26,16,8,0.06)] hover:shadow-[0_16px_48px_rgba(26,16,8,0.14)] transition-shadow duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Tag badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-white/90 backdrop-blur-sm font-sans text-[9px] tracking-[0.32em] uppercase text-primary px-3 py-1.5">
                    {pkg.tag}
                  </span>
                </div>
                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 md:p-7">
                <h3 className="font-serif text-[22px] md:text-[24px] leading-[1.2] tracking-tight text-[#1a1008] mb-3">
                  {pkg.title}
                </h3>
                <p className="font-sans text-[13px] leading-[1.8] text-[#5a4a42] flex-1">
                  {pkg.description}
                </p>
                <div className="mt-6 pt-5 border-t border-[#ede4dd]">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.32em] uppercase text-primary hover:gap-3 transition-all duration-200"
                  >
                    Enquire now
                    <span className="block w-5 h-px bg-primary transition-all duration-200 group-hover:w-7" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PackagesSection;

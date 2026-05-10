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
  const { label, headline_line_1, headline_line_2, packages } =
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

      // Drifting ghost word
      gsap.to(".pkg-bg-word", {
        xPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative  bg-white py-20 md:py-32 overflow-hidden"
    >

      <WaveDividerUp />
      <div className="relative py-20 md:py-32 px-6 md:px-12 lg:px-16 bg-primary-200">
        <div className="">
          {/* Heading */}
          <div className="pkg-head mb-16 md:mb-24 grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">

              <h2 className="font-serif text-[clamp(40px,5.6vw,80px)] leading-[1.02] tracking-[-0.01em]">
                <span className="block overflow-hidden">
                  <span className="pkg-rise block">{headline_line_1}</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="pkg-rise block italic text-primary">
                    {headline_line_2}.
                  </span>
                </span>
              </h2>
            </div>
            <p className="pkg-fade lg:col-span-4 lg:col-start-9 font-serif italic text-[16px] md:text-[17px] leading-[1.85] text-[#5a4a42] max-w-md">
              Four curated formats — each tailored to the rhythm of your gathering. All include floral styling, full bar service, and a dedicated coordinator.
            </p>
          </div>

          {/* Cards — staggered offset */}
          <div className="pkg-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
            {packages.map((pkg, i) => (
              <article
                key={pkg.id}
                className={`pkg-card group relative flex flex-col ${i % 2 === 1 ? "lg:mt-14" : ""
                  }`}
              >
                <div className="relative overflow-hidden mb-7">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1008]/5">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1008]/55 via-transparent to-transparent" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-primary/0 group-hover:ring-primary/45 transition-all duration-500" />
                  </div>

                  <span className="absolute top-4 left-4 font-serif italic text-[20px] text-white/95 tracking-tight">
                    0{i + 1}{" "}
                    <span className="text-white/55 not-italic font-sans text-[11px] tracking-[0.2em]">
                      / {String(packages.length).padStart(2, "0")}
                    </span>
                  </span>

                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-[#1a1008] font-sans text-[9px] tracking-[0.32em] uppercase px-3 py-1.5">
                    <span className="block w-1 h-1 rounded-full bg-primary" />
                    {pkg.tag}
                  </span>
                </div>

                <h3 className="font-serif text-[24px] md:text-[26px] leading-[1.15] tracking-tight text-[#1a1008] mb-3 transition-colors duration-300 group-hover:text-primary">
                  {pkg.title}
                </h3>
                <p className="font-sans text-[13px] leading-[1.85] text-[#5a4a42] mb-6 flex-1">
                  {pkg.description}
                </p>
                <div className="pt-5 border-t border-[#1a1008]/12">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.36em] uppercase text-[#1a1008] group-hover:text-primary transition-colors"
                  >
                    Enquire
                    <span className="block w-6 h-px bg-current transition-all duration-300 group-hover:w-12" />
                  </Link>
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

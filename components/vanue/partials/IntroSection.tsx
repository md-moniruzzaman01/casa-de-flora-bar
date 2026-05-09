"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VANUE_CONTENT } from "../config/constant";

const IntroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { label, headline_line_1, headline_line_2, body, features, cta, images } =
    VANUE_CONTENT.intro_section;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Text column — staggered fade up
      gsap.from(".intro-text-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".intro-text-col",
          start: "top 80%",
          once: true,
        },
      });

      // Feature list items — stagger in from left
      gsap.from(".intro-feature", {
        x: -20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".intro-features",
          start: "top 82%",
          once: true,
        },
      });

      // Main image — reveal with clip-path from bottom
      gsap.from(".intro-img-main", {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".intro-img-main",
          start: "top 85%",
          once: true,
        },
      });

      // Secondary images — stagger reveal
      gsap.from(".intro-img-sec", {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.1,
        stagger: 0.18,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".intro-img-sec",
          start: "top 85%",
          once: true,
        },
      });

      // Subtle parallax on main image
      gsap.to(".intro-img-main img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".intro-img-main",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white text-[#1a1008] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-[45fr_55fr]">

          {/* ── LEFT — text column ──────────────────────── */}
          <div className="intro-text-col flex items-center order-2 lg:order-none py-16 md:py-20 lg:py-0 px-6 md:px-12 lg:pl-[72px] lg:pr-12">
            <div className="flex flex-col items-start w-full max-w-[500px] mx-auto lg:mx-0">

              {/* Label */}
              <div className="intro-text-item flex items-center gap-3 mb-8">
                <span className="block w-5 h-px bg-primary" />
                <span className="font-sans text-[10px] tracking-[0.44em] uppercase text-primary">
                  {label}
                </span>
              </div>

              {/* Headline */}
              <h2 className="intro-text-item font-serif text-[38px] sm:text-[46px] md:text-[54px] lg:text-[58px] leading-[1.06] tracking-tight mb-8">
                {headline_line_1}
                <br />
                <span className="italic text-primary">{headline_line_2}</span>
              </h2>

              {/* Body */}
              <div className="intro-text-item font-serif text-[15px] md:text-[16px] leading-[1.9] space-y-5 text-[#3a2e28] mb-10">
                {body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Divider */}
              <div className="intro-text-item w-full h-px bg-[#ede4dd] mb-8" />

              {/* Feature list */}
              <ul className="intro-features w-full grid grid-cols-2 gap-x-6 gap-y-3.5 mb-12">
                {features.map((feat) => (
                  <li
                    key={feat}
                    className="intro-feature flex items-center gap-2.5"
                  >
                    <span className="block w-1 h-1 rounded-full bg-primary shrink-0" />
                    <span className="font-sans text-[12px] md:text-[13px] tracking-wide text-[#4a3a32]">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={cta.link}
                className="intro-text-item inline-flex items-center gap-3 bg-[#1a1008] text-white px-8 py-4 font-sans text-[11px] tracking-[0.2em] uppercase hover:bg-[#2e1e14] transition-colors duration-200"
              >
                {cta.label}
                <span className="block w-5 h-px bg-white/60" />
              </Link>
            </div>
          </div>

          {/* ── RIGHT — image collage ────────────────────── */}
          <div className="order-1 lg:order-none flex flex-col md:grid md:grid-cols-[58fr_42fr] md:items-stretch min-h-[520px] lg:min-h-0">

            {/* Main image */}
            <div className="intro-img-main relative overflow-hidden">
              <div className="relative aspect-[3/4] md:aspect-auto md:h-full w-full overflow-hidden">
                <Image
                  src={images.main}
                  alt="Casa de Flora Bar venue interior"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 58vw, 35vw"
                />
              </div>
            </div>

            {/* Secondary images — stacked */}
            <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2">
              <div className="intro-img-sec relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
                <Image
                  src={images.secondary_1}
                  alt="Casa de Flora Bar dinner setup"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 42vw, 25vw"
                />
              </div>
              <div className="intro-img-sec relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden border-t border-white md:border-t-2">
                <Image
                  src={images.secondary_2}
                  alt="Casa de Flora Bar table setting"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 42vw, 25vw"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IntroSection;

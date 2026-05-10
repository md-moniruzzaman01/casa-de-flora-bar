"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaveDividerUp from "@/components/shared/WaveDivider";

const GrandBloomSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".gb-fade", { y: 24, opacity: 0 });
      gsap.set(".gb-img", { y: 40, opacity: 0 });

      gsap.to(".gb-fade", {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });

      gsap.to(".gb-img", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className=" overflow-hidden bg-primary-200">
 
        <div className="px-6 py-16 md:px-16 md:py-24 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Image mosaic side — left on desktop, below heading on mobile */}
            <div className="grid grid-cols-2 gap-3 h-[420px] sm:h-[500px] md:h-[640px] order-2 lg:order-1">
              {/* Tall left image — spans 2 rows */}
              <div className="gb-img relative h-full row-span-2 overflow-hidden rounded-sm">
                <Image
                  src="/venue/grand stage-01.jpg"
                  alt="Grand Bloom event space"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[1100ms] ease-out"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Top right image */}
              <div className="gb-img relative h-full overflow-hidden rounded-sm">
                <Image
                  src="/venue/grand stage-02.jpg"
                  alt="Luxury table setting"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[1100ms] ease-out"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Bottom right image */}
              <div className="gb-img relative h-full overflow-hidden rounded-sm">
                <Image
                  src="/venue/grand stage-03.jpg"
                  alt="Wedding ceremony setup"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[1100ms] ease-out"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>

            {/* Text side — right on desktop, first on mobile */}
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="gb-fade text-[clamp(40px,6vw,84px)] font-serif text-[#222] uppercase leading-[0.95] tracking-tight">
                The Grand Bloom
                <span className="block text-primary mt-2 normal-case italic font-normal text-[clamp(22px,3vw,42px)]">
                  Up to 100 Guests
                </span>
              </h2>

              <div className="gb-fade h-px w-16 bg-primary/50" />

              <div className="gb-fade space-y-3 max-w-lg">
                <p className="text-[15px] text-gray-800 leading-relaxed">
                  Our newest and most spectacular space — modern, upscale, and absolutely stunning. Designed for grand celebrations, wedding receptions, milestone events, and corporate gatherings.
                </p>
                <p className="text-[15px] text-gray-800 leading-relaxed">
                  The Grand Bloom also offers full wedding packages including use of our Garden Room for ceremony space or cocktail hour for up to 80 guests, a bridal suite, and a groom suite.
                </p>
              </div>

              <ul className="gb-fade grid grid-cols-2 gap-x-4 gap-y-2 max-w-md">
                {[
                  "Floral ceiling",
                  "Stage & lighting",
                  "Bridal suite",
                  "Groom suite",
                  "Full bar service",
                  "Coordinator on site",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="gb-fade flex flex-wrap gap-4 pt-2">
                <a
                  href="/venue#query"
                  className="bg-black text-white px-10 py-4 text-[12px] font-medium tracking-[0.1em] hover:bg-gray-900 transition-all"
                >
                  Book This Space
                </a>
                <a
                  href="/venue#packages"
                  className="border border-black/40 text-black px-10 py-4 text-[12px] font-medium tracking-[0.1em] hover:bg-white/30 transition-all"
                >
                  View Packages
                </a>
              </div>
            </div>

          </div>
        </div>
    </section>
  );
};

export default GrandBloomSection;

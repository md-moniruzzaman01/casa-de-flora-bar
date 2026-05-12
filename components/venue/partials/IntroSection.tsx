"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaveDividerUp from "@/components/shared/WaveDivider";
import { VANUE_CONTENT } from "../config/constant";

const GardenRoomSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { garden_room_section: content } = VANUE_CONTENT;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".gr-fade", { y: 24, opacity: 0 });
      gsap.set(".gr-img", { y: 40, opacity: 0 });

      gsap.to(".gr-fade", {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });

      gsap.to(".gr-img", {
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
<section ref={sectionRef} className="bg-white overflow-hidden">
      <WaveDividerUp />
      <div className="bg-primary-200">
        <div className="px-6 py-16 md:px-16 md:py-24 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            
            {/* Image mosaic side */}
            <div className="grid grid-cols-2 gap-3 h-[380px] sm:h-[500px] md:h-[600px] lg:order-2">
              {/* Tall left image — spans 2 rows */}
              <div className="gr-img relative h-full row-span-2 overflow-hidden rounded-sm">
                <Image
                  src={content.images.tall_left}
                  alt={`${content.label} setup`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[1100ms] ease-out"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Top right image */}
              <div className="gr-img relative h-full overflow-hidden rounded-sm">
                <Image
                  src={content.images.top_right}
                  alt="Floral detail"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[1100ms] ease-out"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Bottom right image */}
              <div className="gr-img relative h-full overflow-hidden rounded-sm">
                <Image
                  src={content.images.bottom_right}
                  alt="Decor detail"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[1100ms] ease-out"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>

            {/* Text side */}
            <div className="space-y-6 lg:order-1">
              <h2 className="gr-fade text-[clamp(40px,6vw,84px)] font-serif text-[#222] uppercase leading-[0.95] tracking-tight">
                {content.label}
                <span className="block text-primary mt-2 normal-case italic font-normal text-[clamp(22px,3vw,42px)]">
                  {content.capacity_tag}
                </span>
              </h2>

              <div className="gr-fade h-px w-16 bg-primary/50" />

              <p className="gr-fade text-[15px] text-gray-800 leading-relaxed max-w-md">
                {content.description}
              </p>

              <ul className="gr-fade grid grid-cols-2 gap-x-4 gap-y-2 max-w-md">
                {content.features.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default GardenRoomSection;

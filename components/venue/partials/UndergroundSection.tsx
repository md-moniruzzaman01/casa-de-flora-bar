"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WaveDividerDown } from "@/components/shared/WaveDivider";

const UndergroundSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.set(".ug-fade", { y: 24, opacity: 0 });
            gsap.set(".ug-img", { y: 40, opacity: 0 });

            gsap.to(".ug-fade", {
                y: 0,
                opacity: 1,
                duration: 0.9,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
            });

            gsap.to(".ug-img", {
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
            <div className=" bg-primary-200">
                <div className="px-6 py-16 md:px-16 md:py-24 max-w-[1440px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

                        {/* Text side */}
                        <div className="space-y-6">
                            <h2 className="ug-fade text-[clamp(40px,6vw,84px)] font-serif text-[#222] uppercase leading-[0.95] tracking-tight">
                                The Underground
                                <span className="block text-primary mt-2 normal-case italic font-normal text-[clamp(22px,3vw,42px)]">
                                    Up to 100 Guests
                                </span>
                            </h2>

                            <div className="ug-fade h-px w-16 bg-primary/50" />

                            <p className="ug-fade text-[15px] text-gray-800 leading-relaxed max-w-md">
                                An intimate, moody space with a speakeasy-inspired vibe — sophisticated, chic, and full of character. Ideal for evening birthday celebrations, cocktail receptions, girls&apos; nights out, and intimate private gatherings.
                            </p>

                            <ul className="ug-fade grid grid-cols-2 gap-x-4 gap-y-2 max-w-md">
                                {[
                                    "Speakeasy ambience",
                                    "Cocktail bar",
                                    "Mood lighting",
                                    "Live DJ ready",
                                    "Private entrance",
                                    "Full bar service",
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

                            <div className="ug-fade flex flex-wrap gap-4 pt-2">
                                <a
                                    href="/venue#query"
                                    className="bg-black text-white px-10 py-4 text-[12px] font-medium tracking-[0.1em] hover:bg-gray-900 transition-all"
                                >
                                    Book This Space
                                </a>
                                <a
                                    href="/venue#packages"
                                    className="border border-black/40 text-black px-10 py-4 text-[12px] font-medium tracking-[0.1em] hover:bg-black/5 transition-all"
                                >
                                    View Packages
                                </a>
                            </div>
                        </div>

                        {/* Image mosaic side */}
                        <div className="grid grid-cols-2 gap-3 h-[420px] sm:h-[500px] md:h-[600px]">
                            {/* Tall left image — spans 2 rows */}
                            <div className="ug-img relative h-full row-span-2 overflow-hidden rounded-sm">
                                <Image
                                    src="/venue/grand stage-04.jpg"
                                    alt="Speakeasy aisle"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-[1100ms] ease-out"
                                    sizes="(max-width: 1024px) 50vw, 25vw"
                                />
                            </div>

                            {/* Top right image */}
                            <div className="ug-img relative h-full overflow-hidden rounded-sm">
                                <Image
                                    src="/venue/grand stage-05.jpg"
                                    alt="Underground seating area"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-[1100ms] ease-out"
                                    sizes="(max-width: 1024px) 50vw, 25vw"
                                />
                            </div>

                            {/* Bottom right image */}
                            <div className="ug-img relative h-full overflow-hidden rounded-sm">
                                <Image
                                    src="/venue/grand stage-06.jpg"
                                    alt="Underground group celebration"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-[1100ms] ease-out"
                                    sizes="(max-width: 1024px) 50vw, 25vw"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            <WaveDividerDown/>
            </div>
        </section>
    );
};

export default UndergroundSection;

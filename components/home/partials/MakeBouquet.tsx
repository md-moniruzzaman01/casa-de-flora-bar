"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HOME_CONTENT } from "../config/constant";
import WaveDividerUp from "@/components/shared/WaveDivider";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function MakeBouquet() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const leftContainerRef = useRef<HTMLDivElement>(null);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Entrance Fade for text
            gsap.from(".content-fade", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
            });

            // 2. THE SCROLL ANIMATION (Preserved)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: leftContainerRef.current,
                    start: "top 85%",
                    end: "top 15%",
                    scrub: 1.5,
                },
            });

            tl.from(".polaroid-item", {
                x: 0,
                y: 0,
                rotation: 0,
                stagger: 0.02,
                ease: "none",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleImageClick = (src: string) => {
        setSelectedImg(src);
        gsap.fromTo(".popup-overlay",
            { opacity: 0, backdropFilter: "blur(0px)" },
            { opacity: 1, backdropFilter: "blur(12px)", duration: 0.4 }
        );
        gsap.fromTo(".popup-img",
            { scale: 0.4, opacity: 0, y: 100 },
            { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }
        );
    };

    const closePopup = () => {
        gsap.to(".popup-overlay", {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => setSelectedImg(null),
        });
    };

    return (
        <section ref={sectionRef} className="w-full bg-white overflow-hidden relative">
            <WaveDividerUp />
            <div className="bg-primary-200">

                {/* POPUP MODAL (Preserved) */}
                {selectedImg && (
                    <div
                        className="popup-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 cursor-zoom-out"
                        onClick={closePopup}
                    >
                        <div className="absolute top-10 right-10 z-[110] cursor-pointer group">
                            <div className="relative w-10 h-10 flex items-center justify-center">
                                <span className="absolute block w-8 h-[2px] bg-white rotate-45"></span>
                                <span className="absolute block w-8 h-[2px] bg-white -rotate-45"></span>
                            </div>
                        </div>
                        <img
                            src={selectedImg}
                            className="popup-img max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm"
                            alt="Full view"
                        />
                    </div>
                )}

                <div className="px-6 py-12 md:px-16 md:py-24 max-w-[1440px] mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8 content-fade">
                        <h1 className="text-5xl md:text-[84px] font-serif text-[#222] uppercase leading-[0.9] tracking-tight max-w-3xl">
                            {HOME_CONTENT.bouquetSection.title}
                        </h1>
                        <div className="max-w-[420px] pt-4">
                            <p className="text-sm md:text-[15px] text-gray-800 leading-relaxed font-normal mb-8">
                                {HOME_CONTENT.bouquetSection.description}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="bg-black text-white px-10 py-4 text-[12px] font-medium tracking-[0.1em] hover:bg-gray-900 transition-all">
                                    {HOME_CONTENT.bouquetSection.ctaPrimary}
                                </button>
                                <button className="border border-black/40 text-black px-10 py-4 text-[12px] font-medium tracking-[0.1em] hover:bg-white/30 transition-all">
                                    {HOME_CONTENT.bouquetSection.ctaSecondary}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                        {/* Left Side: Polaroid spread */}
                        <div
                            ref={leftContainerRef}
                            className="bg-white rounded-[1.5rem] p-10 relative overflow-hidden flex flex-col justify-between min-h-[550px] shadow-sm"
                            style={{
                                backgroundImage: 'radial-gradient(#dcdcdc 1.2px, transparent 1.2px)',
                                backgroundSize: '32px 32px'
                            }}
                        >
                            <div className="relative flex-1 flex justify-center items-center">
                                {HOME_CONTENT.bouquetSection.polaroids.slice(0, 5).map((src, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleImageClick(src)}
                                        className={`polaroid-item absolute bg-white p-2 pb-10 shadow-xl border border-gray-100 rounded-sm cursor-zoom-in
                                        ${idx === 0 ? "-rotate-12 -translate-x-24 md:-translate-x-32 -translate-y-16 md:-translate-y-24" : ""}
                                        ${idx === 1 ? "-rotate-6 -translate-x-1.5 md:-translate-x-12 -translate-y-20 md:-translate-y-" : ""}
                                        ${idx === 2 ? "rotate-6 translate-x-20 md:translate-x-28 -translate-y-10 md:-translate-y-12" : ""}
                                        ${idx === 3 ? "rotate-12 translate-x-12 md:translate-x-32 translate-y-20 md:translate-y-28" : ""}
                                        ${idx === 4 ? "-rotate-5 -translate-x-11 md:-translate-x-8 translate-y-20 md:translate-y-36" : ""}  
                    
                    
                    `}
                                        style={{ zIndex: 10 + idx }}
                                    >
                                        <div className="w-24 h-24 md:w-44 md:h-44 overflow-hidden bg-gray-100">
                                            <img src={src} alt="flower" className="object-cover w-full h-full" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="relative z-20 content-fade">
                                <h2 className="text-7xl md:text-[110px] font-serif text-black leading-none tracking-tighter">
                                    {HOME_CONTENT.bouquetSection.stats}
                                    <span className="text-4xl md:text-6xl align-top ml-1">+</span>
                                </h2>
                                <p className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-gray-600 mt-4 max-w-[220px] leading-relaxed">
                                    {HOME_CONTENT.bouquetSection.statsSubtext}
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Exact Grid Layout from Figma */}
                        <div className="relative rounded-[1.5rem] overflow-hidden min-h-[550px] group/container">
                            <div className="grid grid-cols-4 grid-rows-4 h-full gap-[3px]">
                                {/* Row 1 & 2 */}
                                <div className="col-span-1 row-span-2 overflow-hidden bg-gray-200">
                                    <img src={HOME_CONTENT.bouquetSection.gridImages[0]} alt="" className="object-cover w-full h-full" onClick={() => handleImageClick(HOME_CONTENT.bouquetSection.gridImages[0])} />
                                </div>
                                <div className="col-span-2 row-span-2 overflow-hidden bg-gray-200">
                                    <img src={HOME_CONTENT.bouquetSection.gridImages[1]} alt="" className="object-cover w-full h-full" onClick={() => handleImageClick(HOME_CONTENT.bouquetSection.gridImages[1])} />
                                </div>
                                <div className="col-span-1 row-span-2 overflow-hidden bg-gray-200">
                                    <img src={HOME_CONTENT.bouquetSection.gridImages[2]} alt="" className="object-cover w-full h-full" onClick={() => handleImageClick(HOME_CONTENT.bouquetSection.gridImages[2])} />
                                </div>
                                {/* Row 3 & 4 */}
                                <div className="col-span-2 row-span-2 overflow-hidden bg-gray-200">
                                    <img src={HOME_CONTENT.bouquetSection.gridImages[3]} alt="" className="object-cover w-full h-full" onClick={() => handleImageClick(HOME_CONTENT.bouquetSection.gridImages[3])} />
                                </div>
                                <div className="col-span-1 row-span-2 overflow-hidden bg-gray-200">
                                    <img src={HOME_CONTENT.bouquetSection.gridImages[4]} alt="" className="object-cover w-full h-full" onClick={() => handleImageClick(HOME_CONTENT.bouquetSection.gridImages[4])} />
                                </div>
                                <div className="col-span-1 row-span-2 overflow-hidden bg-gray-200">
                                    <img src={HOME_CONTENT.bouquetSection.gridImages[5]} alt="" className="object-cover w-full h-full" onClick={() => handleImageClick(HOME_CONTENT.bouquetSection.gridImages[5])} />
                                </div>
                            </div>

                            {/* Overlay Text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end p-10 pointer-events-none">
                                <p className="text-white text-2xl md:text-[28px] font-serif leading-tight max-w-sm">
                                    Enjoy a calm, creative floral experience where you can design your own bouquet while we take care of every detail.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
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
                ease: "power2.out"
            });

            // 2. THE SCROLL ANIMATION (Closed -> Open)
            // We set the initial state to 0,0,0 (Stacked) and animate TO the spread
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: leftContainerRef.current,
                    start: "top 85%", 
                    end: "top 15%",
                    scrub: 1.5, // High scrub for "smooth/buttery" feeling
                },
            });

            // TARGETS: The CSS classes provide the "Final Spread" destination
            // The .from() forces them to start perfectly centered and stacked
            tl.from(".polaroid-item", {
                x: 0,
                y: 0,
                rotation: 0,
                stagger: 0.02,
                ease: "none"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // 3. POPUP ANIMATION (High Precision)
    const handleImageClick = (src: string) => {
        setSelectedImg(src);
        // Animate overlay and image separately for that "Apple-style" zoom
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
            onComplete: () => setSelectedImg(null) 
        });
    };

    return (
        <section ref={sectionRef} className="w-full bg-white overflow-hidden relative">
            <WaveDividerUp />
            
            {/* SMOOTH POPUP MODAL */}
            {selectedImg && (
                <div 
                    className="popup-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-10 cursor-zoom-out"
                    onClick={closePopup}
                >
                    {/* Close Icon (Fixed Top Right) */}
                    <div className="absolute top-10 right-10 z-[110] cursor-pointer group">
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            <span className="absolute block w-8 h-[2px] bg-white rotate-45 group-hover:scale-110 transition-transform"></span>
                            <span className="absolute block w-8 h-[2px] bg-white -rotate-45 group-hover:scale-110 transition-transform"></span>
                        </div>
                    </div>
                    
                    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                        <img 
                            src={selectedImg} 
                            alt="Full view" 
                            className="popup-img max-w-full max-h-full object-contain shadow-[0_30px_60px_rgba(0,0,0,0.5)] rounded-sm pointer-events-auto"
                            onClick={(e) => { e.stopPropagation(); closePopup(); }}
                        />
                    </div>
                </div>
            )}

            <div className="bg-primary-200 px-4 py-8 md:px-12 md:py-16">
                {/* Header */}
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start mb-10 md:mb-16 gap-6 content-fade">
                    <h1 className="text-4xl md:text-7xl font-serif text-black max-w-2xl leading-[1.1]">
                        {HOME_CONTENT.bouquetSection.title}
                    </h1>
                    <div className="max-w-sm space-y-6">
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed font-light">
                            {HOME_CONTENT.bouquetSection.description}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button className="bg-black text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-gray-900 transition-colors">
                                {HOME_CONTENT.bouquetSection.ctaPrimary}
                            </button>
                            <button className="border border-black/20 px-11 py-3 text-sm uppercase tracking-widest hover:bg-white/50 transition-colors">
                                {HOME_CONTENT.bouquetSection.ctaSecondary}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                    
                    {/* Left Side: Stacking to Spreading Animation */}
                    <div 
                        ref={leftContainerRef}
                        className="bg-white rounded-[2rem] p-8 md:p-14 relative overflow-hidden flex flex-col justify-between min-h-[500px] md:min-h-[650px] shadow-sm"
                        style={{ 
                            backgroundImage: 'radial-gradient(#e2e2e2 1.5px, transparent 1.5px)', 
                            backgroundSize: '40px 40px' 
                        }}
                    >
                        <div className="relative flex-1 flex justify-center items-center">
                            {HOME_CONTENT.bouquetSection.polaroids.slice(0, 5).map((src, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleImageClick(src)}
                                    className={`polaroid-item absolute bg-white p-2 pb-8 md:p-3 md:pb-12 shadow-[0_15px_45px_rgba(0,0,0,0.1)] border border-gray-50 rounded-sm cursor-zoom-in group
                                        ${idx === 0 ? "-rotate-12 -translate-x-24 md:-translate-x-44 -translate-y-16 md:-translate-y-32" : ""}
                                        ${idx === 1 ? "-rotate-6 -translate-x-1.5 md:-translate-x-12 -translate-y-20 md:-translate-y-40" : ""}
                                        ${idx === 2 ? "rotate-6 translate-x-24 md:translate-x-44 -translate-y-10 md:-translate-y-16" : ""}
                                        ${idx === 3 ? "rotate-12 translate-x-26 md:translate-x-52 translate-y-24 md:translate-y-32" : ""}
                                        ${idx === 4 ? "-rotate-5 -translate-x-11 md:-translate-x-8 translate-y-20 md:translate-y-48" : ""}                           `}
                                    style={{ zIndex: 50 - idx }}
                                >
                                    <div className="relative w-28 h-28 md:w-48 md:h-48 overflow-hidden rounded-[2px]">
                                        <img src={src} alt="flower" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="relative z-10 content-fade">
                            <h2 className="text-5xl md:text-9xl font-serif text-black flex items-start leading-none tracking-tighter">
                                {HOME_CONTENT.bouquetSection.stats}
                                <span className="text-3xl md:text-5xl mt-2 md:mt-4 ml-1 font-sans">+</span>
                            </h2>
                            <p className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-gray-400 mt-6 max-w-[200px] font-bold">
                                {HOME_CONTENT.bouquetSection.statsSubtext}
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Grid */}
                    <div className="relative rounded-[2.5rem] overflow-hidden min-h-[500px] md:h-full bg-[#111]">
                        <div className="grid grid-cols-6 grid-rows-6 h-full gap-[3px]">
                            {[
                                { span: "col-span-3 row-span-3", img: HOME_CONTENT.bouquetSection.gridImages[0] },
                                { span: "col-span-3 row-span-2", img: HOME_CONTENT.bouquetSection.gridImages[1] },
                                { span: "col-span-1 row-span-1", img: HOME_CONTENT.bouquetSection.gridImages[2] },
                                { span: "col-span-2 row-span-1", img: HOME_CONTENT.bouquetSection.gridImages[3] },
                                { span: "col-span-2 row-span-3", img: HOME_CONTENT.bouquetSection.gridImages[4] },
                                { span: "col-span-3 row-span-3", img: HOME_CONTENT.bouquetSection.gridImages[5] },
                                { span: "col-span-1 row-span-3", img: HOME_CONTENT.bouquetSection.gridImages[6] },
                            ].map((item, i) => (
                                <div 
                                    key={i} 
                                    className={`${item.span} relative overflow-hidden cursor-zoom-in group`}
                                    onClick={() => handleImageClick(item.img)}
                                >
                                    <img src={item.img} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100" alt="gallery" />
                                </div>
                            ))}
                        </div>
                        <div className="absolute inset-0 flex items-end p-8 md:p-14 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none">
                            <p className="text-white text-xl md:text-3xl font-serif italic leading-tight max-w-sm">
                                {HOME_CONTENT.bouquetSection.footerNote}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
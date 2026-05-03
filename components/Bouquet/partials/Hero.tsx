"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BOUQUET_CONTENT } from "../config/constant";
import Link from "next/link";


const Hero = () => {
    const container = useRef<HTMLDivElement>(null);
    const { hero } = BOUQUET_CONTENT;

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

        tl.from(".hero-text-content > *", {
            y: 30,
            opacity: 0,
            stagger: 0.2,
        })
            .from(".hero-image", {
                scale: 0.9,
                opacity: 0,
            }, "-=0.5");
    }, { scope: container });

    return (
        <section
            ref={container}
            className="relative w-full min-h-[80vh] bg-primary-100 flex items-center"
        >
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <div className="hero-text-content space-y-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight">
                        <span className="block text-black">MAKE YOUR</span>
                        <span className="block text-primary">OWN BOUQUET</span>
                    </h1>

                    <p className="text-gray text-sm md:text-base  max-w-lg">
                        {hero.description}
                    </p>
                    <Link href={hero.link}>

                        <button className="bg-black text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors duration-300">
                            {hero.buttonText}
                        </button>
                    </Link>
                </div>

                {/* Right Image */}
                <div className="hero-image relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                        src={`/${hero.image}`}
                        alt="Make your own bouquet workshop"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

            </div>
        </section>
    );
};

export default Hero;
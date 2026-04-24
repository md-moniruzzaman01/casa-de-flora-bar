"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Floral Café',
    description: 'Enjoy handcrafted coffee, signature drinks, desserts, and a cozy floral atmosphere.',
    iconName: 'coffee.png',
  },
  {
    title: 'Weekend Brunch',
    description: 'Gather with friends for indulgent weekend brunch, curated dishes, and beautiful conversations.',
    iconName: 'brunch.png',
  },
  {
    title: 'Bouquet Bar',
    description: 'Choose fresh blooms and design a bouquet while sipping your favorite drink.',
    iconName: 'bouquet.png',
  },
  {
    title: 'Private Events',
    description: 'Celebrate birthdays, bridal showers, reunions, and intimate gatherings.',
    iconName: 'events.png',
  },
];

const ServiceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 1024;
      if (!isDesktop) return;

      // 1. Initial State: Set the staircase positions
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.set(card, { y: index * 60 });
        }
      });

      // 2. The Reposition Effect: 
      // When the section hits the center, move all cards to y: 0
      gsap.to(cardsRef.current, {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Starts moving as soon as section enters
          end: "center center", // Reaches a perfect row when section is centered
          scrub: 1,            // Smoothly follows the scroll
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 md:px-4 bg-white overflow-hidden">
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 items-start"
      >
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => { cardsRef.current[index] = el; }}
            style={{
              maskImage: 'url("/card.svg")',
              WebkitMaskImage: 'url("/card.svg")',
              maskSize: '100% 100%',
              WebkitMaskSize: '100% 100%',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              background: '#F8E3E2',
              boxShadow: '0 10px 30px rgba(210,140,160,0.1)',
            }}
            className="p-1 md:p-10 min-h-60 md:min-h-screen flex flex-col items-center text-center justify-center cursor-pointer group transition-shadow duration-300 hover:shadow-2xl"
          >
            <h3 className="text-xl md:text-2xl mb-2 md:mb-8 text-black font-serif uppercase tracking-tight">
              {service.title}
            </h3>

            <div className="relative w-20 md:w-34 h-20 md:h-34 mb-2 md:mb-10 transition-transform duration-500 group-hover:scale-110">
              <Image
                src={`/services icon/${service.iconName}`}
                alt={service.title}
                fill
                className="object-contain"
              />
            </div>

            <p className="text-black text-xs md:text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
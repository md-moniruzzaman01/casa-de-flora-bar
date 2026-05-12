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
    const mql = window.matchMedia("(min-width: 1024px)");
    let ctx: gsap.Context | null = null;

    const setup = () => {
      ctx?.revert();
      if (!mql.matches) {
        // Mobile: ensure cards have no leftover transform if user resized down
        cardsRef.current.forEach((card) => card && gsap.set(card, { y: 0 }));
        return;
      }
      ctx = gsap.context(() => {
        cardsRef.current.forEach((card, index) => {
          if (card) gsap.set(card, { y: index * 60 });
        });

        gsap.to(cardsRef.current, {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 2,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);
    };

    setup();
    mql.addEventListener("change", setup);
    return () => {
      mql.removeEventListener("change", setup);
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="px-4 py-20 md:px-4 bg-white overflow-hidden">
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
            className="p-2 md:p-10 min-h-60 md:min-h-screen flex flex-col items-center text-center justify-center cursor-pointer group transition-shadow duration-300 hover:shadow-2xl"
          >
            <h3 className="text-base md:text-2xl mb-2 md:mb-8 text-black font-serif uppercase tracking-tight">
              {service.title}
            </h3>

            <div className="relative w-20 md:w-34 h-16 md:h-34 mb-2 md:mb-10 transition-transform duration-500 group-hover:scale-110">
              <Image
                src={`/services/${service.iconName}`}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 80px, 136px"
                className="object-contain"
              />
            </div>

            <p className="text-black text-[11px] md:text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
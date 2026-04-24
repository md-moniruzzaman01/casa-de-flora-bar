"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Floral Café',
    description:
      'Enjoy handcrafted coffee, signature drinks, desserts, and a cozy floral atmosphere made for everyday moments.',
    icon: '☕',
  },
  {
    title: 'Weekend Brunch',
    description:
      'Gather with friends for indulgent weekend brunch, curated dishes, and beautiful conversations.',
    icon: '🥐',
  },
  {
    title: 'Bouquet Bar',
    description:
      'Choose fresh blooms and design a bouquet while sipping your favorite drink.',
    icon: '💐',
  },
  {
    title: 'Private Events',
    description:
      'Celebrate birthdays, bridal showers, reunions, and intimate gatherings in a dreamy setting.',
    icon: '🎈',
  },
];

const ServiceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading fade-down ────────────────────────────────────────
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: -40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // ── Cards drop from above, staggered ────────────────────────
      // Set all cards invisible & above before the trigger fires
      gsap.set(cardsRef.current, { opacity: 0, y: -120 });

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 75%',          // fires when grid top hits 75% of viewport
        toggleActions: 'play none none reverse',
        onEnter: () => {
          gsap.to(cardsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,          // each card drops 150ms after the previous
          });
        },
        onLeaveBack: () => {
          gsap.to(cardsRef.current, {
            opacity: 0,
            y: -120,
            duration: 0.5,
            ease: 'power2.in',
            stagger: { each: 0.1, from: 'end' },
          });
        },
      });

      // ── Icons pop in after cards land ───────────────────────────
      gsap.set(iconsRef.current, { scale: 0, opacity: 0 });

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          gsap.to(iconsRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            stagger: 0.15,
            delay: 0.3,             // starts after first card begins dropping
          });
        },
        onLeaveBack: () => {
          gsap.to(iconsRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
          });
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Hover handlers ───────────────────────────────────────────────
  const handleMouseEnter = (i: number) => {
    const card = cardsRef.current[i];
    const icon = iconsRef.current[i];
    if (card) gsap.to(card, { scale: 1.06, boxShadow: '0 24px 56px rgba(210,140,160,0.28)', duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
    if (icon) gsap.to(icon, { scale: 1.25, rotate: 8, duration: 0.35, ease: 'back.out(2)', overwrite: 'auto' });
  };

  const handleMouseLeave = (i: number) => {
    const card = cardsRef.current[i];
    const icon = iconsRef.current[i];
    if (card) gsap.to(card, { scale: 1, boxShadow: '0 8px 28px rgba(210,140,160,0.12)', duration: 0.4, ease: 'power2.inOut', overwrite: 'auto' });
    if (icon) gsap.to(icon, { scale: 1, rotate: 0, duration: 0.4, ease: 'power2.inOut', overwrite: 'auto' });
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4"
      style={{ background: 'linear-gradient(160deg, #fff5f7 0%, #fce8ed 100%)' }}
    >
      {/* Section heading */}
      <div ref={headingRef} className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#c47a8a] mb-3 font-medium">
          What We Offer
        </p>
        <h2
          className="text-4xl md:text-5xl text-[#3d2b30] mb-4"
          style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 400 }}
        >
          Our Services
        </h2>
        <div className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-[#d4899a] to-transparent" />
      </div>

      {/* Cards grid */}
      <div ref={gridRef} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => { cardsRef.current[index] = el; }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            style={{
              maskImage: 'url("/card.svg")',
              WebkitMaskImage: 'url("/card.svg")',
              maskSize: '100% 100%',
              WebkitMaskSize: '100% 100%',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              background: 'linear-gradient(145deg, #fdf0f3 0%, #f9e0e7 100%)',
              boxShadow: '0 8px 28px rgba(210,140,160,0.12)',
              willChange: 'transform',
            }}
            className="p-8 min-h-[400px] flex flex-col items-center text-center justify-center cursor-pointer"
          >
            {/* Icon */}
            <div
              ref={(el) => { iconsRef.current[index] = el; }}
              className="text-5xl mb-6 select-none"
              style={{ display: 'inline-block' }}
            >
              {service.icon}
            </div>

            {/* Decorative dot row */}
            <div className="flex gap-1 mb-5">
              {[...Array(3)].map((_, d) => (
                <span
                  key={d}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#d4899a', opacity: 0.4 + d * 0.2 }}
                />
              ))}
            </div>

            <h3
              className="text-2xl text-[#4A2B33] mb-4 leading-snug"
              style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 500 }}
            >
              {service.title}
            </h3>

            <p className="text-sm text-[#7a5560] leading-relaxed font-light">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
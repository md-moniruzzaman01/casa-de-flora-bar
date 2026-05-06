"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const col1Images = [
  { src: "/summer events/image-01.jpg", alt: "Guest with bouquet", aspect: "aspect-[4/3]" },
  { src: "/summer events/image-02.jpg", alt: "Floral ambiance", aspect: "aspect-[16/9]" },
  { src: "/summer events/image-03.jpg", alt: "Dinner setup", aspect: "aspect-[4/3]" },
  { src: "/summer events/image-04.jpg", alt: "Event decor", aspect: "aspect-[16/9]" },
];

const col2Images = [
  { src: "/summer events/image-02.jpg", alt: "Inside the venue", aspect: "aspect-[16/9]" },
  { src: "/summer events/image-05.jpg", alt: "Guest dining", aspect: "aspect-[4/3]" },
  { src: "/summer events/image-03.jpg", alt: "Guest dining", aspect: "aspect-[4/3]" },
  { src: "/summer events/image-01.jpg", alt: "Guest dining", aspect: "aspect-[4/3]" },
  { src: "/summer events/image-04.jpg", alt: "Instagram moment spot", aspect: "aspect-[16/9]" },
  { src: "/summer events/image-05.jpg", alt: "Elegant tablescape", aspect: "aspect-[4/3]" },
];

const col3Images = [
  { src: "/summer events/image-03.jpg", alt: "Overhead view", aspect: "aspect-[4/3]" },
  { src: "/summer events/image-02.jpg", alt: "Happy couple", aspect: "aspect-[16/9]" },
  { src: "/summer events/image-01.jpg", alt: "Take home gift bags", aspect: "aspect-[4/3]" },
  { src: "/summer events/image-04.jpg", alt: "Event highlights", aspect: "aspect-[16/9]" },
];

type ImageItem = { src: string; alt: string; aspect: string };

interface InfiniteColumnProps {
  images: ImageItem[];
  direction?: "up" | "down";
  speed?: number;
  className?: string;
  colHeight?: number;
}

const InfiniteColumn: React.FC<InfiniteColumnProps> = ({
  images,
  direction = "up",
  speed = 40,
  className = "",
  colHeight = 400,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animId: number;
    animId = requestAnimationFrame(() => {
      animId = requestAnimationFrame(() => {
        const halfH = track.scrollHeight / 2;

        // For "down" direction: start at -halfH so images fill immediately
        if (direction === "down") {
          posRef.current = -halfH;
        }

        let last = performance.now();

        const tick = (now: number) => {
          const delta = Math.min((now - last) / 1000, 0.05);
          last = now;

          if (direction === "up") {
            posRef.current -= speed * delta;
            if (posRef.current <= -halfH) posRef.current += halfH;
          } else {
            posRef.current += speed * delta;
            if (posRef.current >= 0) posRef.current -= halfH;
          }

          track.style.transform = `translateY(${posRef.current}px)`;
          rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
      });
    });

    return () => {
      cancelAnimationFrame(animId!);
      cancelAnimationFrame(rafRef.current);
    };
  }, [direction, speed]);

  const doubled = [...images, ...images];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ height: `${colHeight}px` }}
    >
      {/* Top white fade */}
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: "60px",
          background: "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
        }}
      />
      {/* Bottom white fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: "60px",
          background: "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
        }}
      />

      <div ref={trackRef} className="flex flex-col gap-2 will-change-transform">
        {doubled.map((img, i) => (
          <div
            key={i}
            className={`relative w-full ${img.aspect} overflow-hidden rounded-xl flex-shrink-0 group shadow-sm`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Responsive wrapper — reads window width and passes correct height
const ResponsiveGallery: React.FC = () => {
  const [colHeight, setColHeight] = React.useState(320);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setColHeight(280);        // small mobile
      else if (w < 640) setColHeight(320);   // mobile
      else if (w < 1024) setColHeight(480);  // tablet
      else setColHeight(680);                // desktop
    };
    update();
    setMounted(true);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!mounted) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const isTablet = typeof window !== "undefined" && window.innerWidth < 1024;

  return (
    // Mobile: 2 columns | Tablet: 2 columns | Desktop: 3 columns
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
      {/* Column 1 — scrolls UP */}
      <InfiniteColumn
        images={col1Images}
        direction="up"
        speed={isMobile ? 22 : 35}
        colHeight={colHeight}
      />

      {/* Column 2 — scrolls DOWN */}
      <InfiniteColumn
        images={col2Images}
        direction="down"
        speed={isMobile ? 18 : 15}
        colHeight={colHeight}
        className="mt-[-20px] sm:mt-[-30px] lg:mt-[-40px]"
      />

      {/* Column 3 — scrolls UP, hidden on mobile (shown from tablet up) */}
      <InfiniteColumn
        images={col3Images}
        direction="up"
        speed={isMobile ? 20 : 30}
        colHeight={colHeight}
        className="hidden lg:block"
      />
    </div>
  );
};

const EventGallery = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
          Capturing the
        </h2>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-pink-400 -mt-1">
          magic
        </h2>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <ResponsiveGallery />
      </div>
    </section>
  );
};

export default EventGallery;
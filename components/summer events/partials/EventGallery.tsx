"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { InfiniteColumnProps } from "../config/types";
import { SUMMER_EVENTS_CONTENT } from "../config/constant";


// const col1Images: ImageItem[] = [
//   { src: "/summer events/image-01.jpg", alt: "Guest with bouquet",   aspect: "aspect-[4/3]"  },
//   { src: "/summer events/image-02.jpg", alt: "Floral ambiance",      aspect: "aspect-[16/9]" },
//   { src: "/summer events/image-03.jpg", alt: "Dinner setup",         aspect: "aspect-[4/3]"  },
//   { src: "/summer events/image-04.jpg", alt: "Event decor",          aspect: "aspect-[16/9]" },
// ];

// const col2Images: ImageItem[] = [
//   { src: "/summer events/image-02.jpg", alt: "Inside the venue",     aspect: "aspect-[16/9]" },
//   { src: "/summer events/image-05.jpg", alt: "Guest dining",         aspect: "aspect-[4/3]"  },
//   { src: "/summer events/image-03.jpg", alt: "Tablescape",           aspect: "aspect-[4/3]"  },
//   { src: "/summer events/image-01.jpg", alt: "Bouquet workshop",     aspect: "aspect-[4/3]"  },
//   { src: "/summer events/image-04.jpg", alt: "Photo moment",         aspect: "aspect-[16/9]" },
//   { src: "/summer events/image-05.jpg", alt: "Elegant tablescape",   aspect: "aspect-[4/3]"  },
// ];

// const col3Images: ImageItem[] = [
//   { src: "/summer events/image-03.jpg", alt: "Overhead view",   aspect: "aspect-[4/3]"  },
//   { src: "/summer events/image-02.jpg", alt: "Friends laughing", aspect: "aspect-[16/9]" },
//   { src: "/summer events/image-01.jpg", alt: "Take-home gift",   aspect: "aspect-[4/3]"  },
//   { src: "/summer events/image-04.jpg", alt: "Event highlights", aspect: "aspect-[16/9]" },
// ];



function InfiniteColumn({
  images, direction = "up", speed = 35, className = "", height,
}: InfiniteColumnProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);
  const posRef   = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const seed = requestAnimationFrame(() => {
      const halfH = track.scrollHeight / 2;
      if (direction === "down") posRef.current = -halfH;

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

    return () => {
      cancelAnimationFrame(seed);
      cancelAnimationFrame(rafRef.current);
    };
  }, [direction, speed]);

  const doubled = [...images, ...images];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    >
      {/* white fade top + bottom */}
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none h-12 sm:h-16"
        style={{ background: "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.8) 50%, transparent 100%)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none h-12 sm:h-16"
        style={{ background: "linear-gradient(to top, #fff 0%, rgba(255,255,255,0.8) 50%, transparent 100%)" }}
      />

      <div ref={trackRef} className="flex flex-col gap-2 sm:gap-3 will-change-transform">
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
}

function ResponsiveGallery() {
  const [height,   setHeight]   = useState(280);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if      (w < 480)  setHeight(280);
      else if (w < 640)  setHeight(340);
      else if (w < 1024) setHeight(500);
      else               setHeight(680);
      setIsMobile(w < 640);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
      <InfiniteColumn
        images={SUMMER_EVENTS_CONTENT.gallery.column1}
        direction="up"
        speed={isMobile ? 22 : 35}
        height={height}
      />
      <InfiniteColumn
        images={SUMMER_EVENTS_CONTENT.gallery.column2}
        direction="down"
        speed={isMobile ? 18 : 15}
        height={height}
        className="mt-[-20px] sm:mt-[-30px] lg:mt-[-40px]"
      />
      <InfiniteColumn
        images={SUMMER_EVENTS_CONTENT.gallery.column1}
        direction="up"
        speed={isMobile ? 20 : 30}
        height={height}
        className="hidden lg:block"
      />
    </div>
  );
}

export default function EventGallery() {
  return (
    <section className="bg-white py-16 sm:py-20 md:py-28 lg:py-32">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14 md:mb-16 px-6">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-primary mb-3 sm:mb-4">
          The Album
        </p>
        <h2 className="font-serif leading-[1.05] tracking-tight text-black">
          <span className="block text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px]">
            Capturing the
          </span>
          <span className="block italic font-light text-primary text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] -mt-1">
            magic
          </span>
        </h2>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <ResponsiveGallery />
      </div>
    </section>
  );
}
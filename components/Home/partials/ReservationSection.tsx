"use client";

import { WaveDividerDown } from "@/components/shared/WaveDivider";
import React, { useEffect, useRef } from "react";

// --- Types ---
interface ReservationDetail {
  label: string;
  value: string;
}

interface ReservationData {
  images: string[];
  description: string[];
  details: ReservationDetail[];
  footer: string;
}

export const reservationData: ReservationData = {
  images: [
    "/reservation 1.jpg",
    "/reservation 2.jpg",
    "/reservation 3.jpg",
    "/reservation 4.jpg",
  ],
  description: [
    "At Casa de Flora Bar, the vibes are always on point—think cozy yet chic, lively yet relaxing. It's the perfect spot to celebrate life's moments, big or small. Whether you're gathering with your girlfriends for a brunch meet-up, catching up on life over lattes, or enjoying a sweet coffee date in our Instagrammable setting, every visit feels like an experience worth sharing.",
    "Planning a celebration or a gathering for a large group? Casa de Flora Bar is the perfect setting for your next brunch event! For parties of 7 or more (not to exceed 12), we offer a special family-style brunch experience that's perfect for birthdays, reunions, or just spending quality time with loved ones.",
  ],
  details: [
    { label: "Fixed Menu", value: "$50 per person — Chicken & Waffles, Shrimp & Grits, Rasta Pasta, Breakfast Potatoes, Eggs, Turkey Bacon, Sausage, Croissants and Mocktails." },
    { label: "Seating Time", value: "2 hours maximum." },
    { label: "Deposit Required", value: "A non-refundable $150 deposit is required to secure your reservation, applied toward your final bill." },
    { label: "Punctuality", value: "Please arrive on time — seating times cannot be extended for late arrivals." },
  ],
  footer: "Let us help you make your gathering unforgettable with great food, beautiful ambiance, and warm hospitality.",
};

export default function LuxuryReservation() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    let ctx: any;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const isMobile = window.innerWidth < 768;

      ctx = gsap.context(() => {
        const imgs = imgRefs.current.filter(Boolean);
        const card = cardRef.current;
        const title = titleRef.current;

        if (isMobile) {
          // --- MOBILE: Text/Card first, then Images ---
          gsap.set(imgs, { opacity: 0, y: 20 });
          gsap.set(title, { opacity: 0, y: 20 });
          gsap.set(card, { opacity: 0, y: 30 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });

          tl.to(title, { opacity: 1, y: 0, duration: 0.6 })
            .to(card, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
            .to(imgs, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, "-=0.2");

        } else {
          // --- DESKTOP: Text/Card focus, then Image "Burst" ---
          const corners = [
            { x: "-38vw", y: "-26vh", r: -1 },
            { x: "38vw", y: "-26vh", r: 1 },
            { x: "-38vw", y: "24vh", r: 1 },
            { x: "38vw", y: "24vh", r: -1 },
          ];

          // 1. Initial State: Images are hidden in a tight stack in the center
          gsap.set(imgs, {
            position: "absolute", left: "50%", top: "50%",
            xPercent: -50, yPercent: -50,
            width: 220, height: 285,
            opacity: 0, scale: 0.5, // Start smaller
            x: 0, y: 0
          });

          // 2. Initial State: Text and Card
          gsap.set(card, { opacity: 0, y: 60, scale: 0.9 });
          gsap.set(title, { opacity: 0, y: 40, letterSpacing: "0.22em" });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=300%", // Increased for smoother sequence
              scrub: 1.2,
              pin: true,
            },
          });

          // STEP 1: Bring in the Title and Card first
          tl.to(title, { opacity: 1, y: 0, letterSpacing: "0.07em", duration: 1 })
            .to(card, { opacity: 1, y: 0, scale: 1, duration: 1 }, "-=0.5")
            
          // STEP 2: Reveal the image stack behind the card
            .to(imgs, { opacity: 1, scale: 0.8, duration: 0.8, stagger: 0.1 }, "-=0.2")

          // STEP 3: The "Burst" - Images fly to their positions
          tl.addLabel("burst");
          imgs.forEach((el, i) => {
            tl.to(el, {
              x: corners[i]?.x || 0,
              y: corners[i]?.y || 0,
              rotation: corners[i]?.r || 0,
              scale: 1,
              duration: 2.5,
              ease: "expo.out",
            }, "burst");
          });
        }
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);
  return (
    <section 
      ref={sectionRef} 
      className="relative flex flex-col items-center overflow-hidden min-h-screen bg-primary-200 font-serif z-10"
    >
      {/* Desktop View: Canvas for dispersing images */}
      <div ref={canvasRef} className="hidden md:block absolute inset-0 pointer-events-none">
        {reservationData.images.map((src, i) => (
          <div
            key={`desk-${i}`}
            ref={(el) => { if (window.innerWidth >= 768) imgRefs.current[i] = el; }}
            className="absolute border-[10px] border-white shadow-[0_14px_44px_rgba(0,0,0,0.13)] overflow-hidden"
          >
            <img src={src} alt="" className="w-full h-full object-cover block" />
          </div>
        ))}
      </div>

      {/* Mobile View: Horizontal Photo Strip */}
      <div 
        ref={collageRef} 
        className="flex md:hidden gap-2 px-4 pt-7 w-full overflow-x-auto scrollbar-hide"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        {reservationData.images.map((src, i) => (
          <div
            key={`mob-${i}`}
            ref={(el) => { if (window.innerWidth < 768) imgRefs.current[i] = el; }}
            className="shrink-0 border-[7px] border-white shadow-lg overflow-hidden rounded-sm"
            style={{ 
              width: i === 0 ? "160px" : "130px", 
              height: i === 0 ? "200px" : "170px",
              transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)`
            }}
          >
            <img src={src} alt="" className="w-full h-full object-cover block" />
          </div>
        ))}
      </div>

      {/* Center Content */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-[720px] px-4 mt-7 md:mt-11">
        <h1
          ref={titleRef}
          className="text-[clamp(32px,8vw,72px)] font-normal text-center text-black mb-[clamp(20px,5vw,40px)] leading-[1.08] uppercase px-2"
        >
          Large Group <br /> Reservations
        </h1>

        <div ref={cardRef} className="w-full bg-white relative mb-12 shadow-[0_20px_70px_rgba(0,0,0,0.07)]">
          {/* Wave SVG */}
          <div className="absolute top-11 left-0 w-full -translate-y-[98%] leading-[0] pointer-events-none">
         <svg width="100%" height="56" viewBox="0 0 692 56" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3_1715)">
              <path d="M634.008 -63C666.045 -63 692.016 -36.3503 692.016 -3.47656C692.016 29.3971 666.045 56.0469 634.008 56.0469C620.861 56.0468 608.736 51.5574 599.008 43.9932C589.279 51.5574 577.155 56.0469 564.008 56.0469C549.473 56.0468 536.187 50.5599 526.008 41.4961C515.829 50.5599 502.543 56.0469 488.008 56.0469C471.998 56.0468 457.504 49.391 447.008 38.6299C436.512 49.391 422.017 56.0469 406.008 56.0469C390.992 56.0468 377.309 50.1911 367.008 40.585C356.707 50.191 343.024 56.0469 328.008 56.0469C308.119 56.0468 290.569 45.7749 280.118 30.1201C269.668 45.7749 252.117 56.0469 232.229 56.0469C213.722 56.0468 197.239 47.1533 186.618 33.3047C175.997 47.1533 159.515 56.0469 141.008 56.0469C124.743 56.0468 110.041 49.1769 99.5078 38.1113C88.9746 49.1769 74.2731 56.0469 58.0078 56.0469C25.971 56.0468 9.84607e-05 29.3971 0 -3.47656C0 -36.3503 25.971 -62.9999 58.0078 -63C74.2727 -63 88.9747 -56.1315 99.5078 -45.0664C110.041 -56.1315 124.743 -63 141.008 -63C159.514 -63 175.997 -54.1072 186.618 -40.2588C197.239 -54.1072 213.722 -63 232.229 -63C252.117 -63 269.668 -52.7288 280.118 -37.0742C290.569 -52.7288 308.119 -62.9999 328.008 -63C343.023 -63 356.707 -57.1456 367.008 -47.54C377.309 -57.1457 390.992 -63 406.008 -63C422.017 -63 436.512 -56.3456 447.008 -45.585C457.504 -56.3456 471.999 -63 488.008 -63C502.543 -63 515.829 -57.5145 526.008 -48.4512C536.187 -57.5146 549.473 -63 564.008 -63C577.155 -63 589.279 -58.5113 599.008 -50.9473C608.736 -58.5114 620.861 -63 634.008 -63Z" fill="#ED80A8"/>
            </g>
            <defs>
              <clipPath id="clip0_3_1715">
                <rect width="692" height="56" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          </div>

          <div className="p-[clamp(28px,6vw,44px)_clamp(20px,6vw,56px)_clamp(28px,6vw,40px)] font-sans">
            {reservationData.description.map((p, i) => (
              <p key={i} className="font-serif italic text-[clamp(13px,3.5vw,14.5px)] mt-5 text-gray leading-[1.78] mb-3 last:mb-5">
                {p}
              </p>
            ))}

            <div className="h-px bg-gray-100 my-4" />

            <p className="text-[clamp(12px,3vw,13px)] font-semibold text-gray-900 mb-3 tracking-wide">
              Group Reservation Details:
            </p>

            <ul className="list-none p-0 mb-5 space-y-3">
              {reservationData.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-[clamp(12.5px,3.2vw,13.5px)] text-gray-600 leading-[1.65]">
                  <span className="w-[7px] h-[7px] rounded-full bg-[#ED80A8] shrink-0 mt-[6px]" />
                  <span>
                    <strong className="text-gray-900 font-semibold">{d.label}:</strong> {d.value}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-[clamp(12.5px,3.2vw,13.5px)] text-gray-600 leading-[1.65] mb-4">
              {reservationData.footer}
            </p>

            <div className="flex justify-center">
              <button
                className="bg-black text-white py-4 w-full max-w-[320px] text-[clamp(12px,3.5vw,13px)] tracking-[0.1em] transition-colors hover:bg-[#ED80A8] active:scale-95 min-h-[52px] uppercase font-sans"
              >
                Reserve your table
              </button>
            </div>
          </div>
        </div>
      </div>


      <WaveDividerDown/>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
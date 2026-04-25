
"use client";

import { GroupReservationContent } from "../config/types";





import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";


export const reservationData: GroupReservationContent = {
  title: "LARGE GROUP RESERVATIONS",
  description: [
    "At Casa de Flora Bar, the vibes are always on point—think cozy yet chic, lively yet relaxing.",
    "Planning a celebration or a gathering for a large group? Casa de Flora Bar is the perfect setting for your next brunch event! For parties of 7 or more (not to exceed 12), we offer a special family-style brunch experience."
  ],
  details: [
    { label: "Fixed Menu", value: "$50 per person, including a delicious family-style brunch - Chicken & Waffles, Shrimp & Grits, Rasta Pasta, Breakfast Potatoes, Eggs, Turkey Bacon, Sausage, Croissants and Mocktails." },
    { label: "Seating Time", value: "2 hours maximum." },
    { label: "Deposit Required", value: "A non-refundable deposit of $150 is required to secure your reservation. The deposit amount will be applied toward your final bill." },
    { label: "Punctuality", value: "Please arrive on time to enjoy the full experience—seating times cannot be extended for late arrivals." }
  ],
  footerNote: "Let us help you make your gathering unforgettable with great food, beautiful ambiance, and warm hospitality.",
  importantNote: "MAKE SURE TO RESERVE YOUR TABLE FIRST. TICKETS FOR FLOWERS MUST BE PURCHASED 24 HOURS IN ADVANCE. THIS DOES NOT INCLUDE FLOWERS.",
  images: ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"]
};


const ReservationCard = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-item", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen bg-[#FADCE4] py-16 px-4 flex flex-col items-center relative overflow-hidden"
    >
      {/* Background Decorative Images - Positioned like the Figma Layout */}
      <div className="hidden xl:block absolute top-20 left-10 w-60 h-80 animate-item shadow-xl border-[10px] border-white -rotate-3">
        <img src={reservationData.images[0]} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="hidden xl:block absolute top-20 right-10 w-60 h-80 animate-item shadow-xl border-[10px] border-white rotate-3">
        <img src={reservationData.images[1]} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="hidden xl:block absolute bottom-20 left-10 w-60 h-80 animate-item shadow-xl border-[10px] border-white rotate-2">
        <img src={reservationData.images[2]} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="hidden xl:block absolute bottom-20 right-10 w-60 h-80 animate-item shadow-xl border-[10px] border-white -rotate-2">
        <img src={reservationData.images[3]} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Main Header */}
      <h1 className="text-4xl md:text-[54px] font-serif text-[#2D2D2D] mt-8 mb-16 tracking-[0.2em] text-center leading-tight animate-item">
        LARGE GROUP <br className="md:hidden" /> RESERVATIONS
      </h1>

      {/* The Styled Card */}
      <div className="relative max-w-[692px] w-full animate-item mt-10">
        
        {/* Scalloped SVG Top - Using your exact SVG paths */}
        <div className="absolute -top-[55px] left-0 w-full z-20">
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

        {/* Card Body */}
        <div className="bg-[#FFFCF9] shadow-2xl pt-16 pb-12 px-8 md:px-16 text-center">
          <div className="space-y-5 text-[15px] leading-relaxed text-[#4A4A4A] font-light italic">
            {reservationData.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10 text-left">
            <h3 className="font-semibold text-gray-900 mb-4 text-base tracking-wide">Group Reservation Details:</h3>
            <ul className="space-y-4">
              {reservationData.details.map((detail, i) => (
                <li key={i} className="text-[14px] text-[#4A4A4A] flex items-start gap-3">
                  <span className="text-pink-400 mt-1 shrink-0">•</span>
                  <span className="leading-snug">
                    <strong className="text-gray-900 font-medium">{detail.label}:</strong> {detail.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10 text-[15px] text-[#4A4A4A] italic">
            {reservationData.footerNote}
          </p>

          {/* Warning Section */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#888] font-medium leading-loose">
              {reservationData.importantNote}
            </p>
          </div>

          {/* Button */}
          <button className="mt-10 bg-black text-white px-14 py-4 uppercase text-xs tracking-[0.4em] font-bold hover:bg-[#ED80A8] transition-all duration-500 shadow-lg active:scale-95">
            Reserve your table
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReservationCard;
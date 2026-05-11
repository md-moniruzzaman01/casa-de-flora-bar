"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-meta",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1 }
      )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 60, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.2 },
          "-=0.5"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.6"
        )
        .fromTo(
          ".hero-ornament",
          { opacity: 0, scale: 0.85, rotation: -10 },
          { opacity: 0.55, scale: 1, rotation: 0, duration: 1.4 },
          "-=1"
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center px-[6vw] pt-16 pb-24 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top left, rgba(252,228,228,0.4) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(245,237,226,0.6) 0%, transparent 60%)",
      }}
    >
      {/* Text content */}
      <div className="relative z-10 max-w-3xl">
        {/* Meta line */}
        <div className="hero-meta flex items-center gap-6 mb-12 opacity-0">
          <span
            className="block h-px w-15 bg-espresso-soft"
            style={{ width: 60, height: 1, background: "#4a3a32" }}
          />
          <span
            className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-espresso-soft"
            style={{ fontFamily: "Inter, sans-serif", color: "#4a3a32", letterSpacing: "0.3em" }}
          >
            Casa · Catering Menu
          </span>
          <span style={{ color: "#4a3a32" }}>·</span>
          <span
            className="font-sans text-[0.65rem] tracking-[0.3em] uppercase"
            style={{ fontFamily: "Inter, sans-serif", color: "#4a3a32" }}
          >
            Est. Care
          </span>
        </div>

        {/* Main title */}
        <h1
          className="hero-title opacity-0"
          style={{
            fontFamily: "Italiana, serif",
            fontSize: "clamp(4rem, 12vw, 11rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            color: "#1a1410",
          }}
        >
          A table
          <br />
          set{" "}
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#d4a5a5",
              padding: "0 0.1em",
            }}
          >
            &amp;
          </span>{" "}
          shared
        </h1>

        {/* Subtext */}
        <p
          className="hero-sub opacity-0 mt-10 max-w-[38ch] leading-relaxed"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "1.35rem",
            color: "#4a3a32",
          }}
        >
          Brunch, cocktail hour, and dinner — composed with the same attention
          we bring to every bouquet, every event, every guest.
        </p>
      </div>

      {/* Floral ornament */}
      <svg
        className="hero-ornament opacity-0 absolute top-1/2 right-[6vw] -translate-y-1/2 pointer-events-none hidden lg:block"
        style={{ width: 280, height: 280 }}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="98" stroke="#d4a5a5" strokeWidth="0.5" />
        <circle
          cx="100"
          cy="100"
          r="78"
          stroke="#d4a5a5"
          strokeWidth="0.5"
          strokeDasharray="2 4"
        />
        <g transform="translate(100 100)">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={deg}
              d="M0 -50 Q15 -30 0 0 Q-15 -30 0 -50 Z"
              fill="#f5c9c9"
              fillOpacity="0.6"
              transform={`rotate(${deg})`}
            />
          ))}
          <circle r="8" fill="#b8935a" />
        </g>
      </svg>

      {/* Scroll indicator */}
      <div
        className="hero-scroll opacity-0 absolute bottom-8 left-[6vw] flex items-center gap-4"
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#4a3a32",
        }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background: "#d4a5a5",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
        <span>Three Packages Below</span>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }
      `}</style>
    </section>
  );
}

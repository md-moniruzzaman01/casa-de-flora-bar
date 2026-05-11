"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PricingRow } from "../config/types";


gsap.registerPlugin(ScrollTrigger);

const rows: PricingRow[] = [
  { pkg: "Brunch Catering", perPerson: "$38", guests25: "$950", guests50: "$1,900" },
  { pkg: "Finger Food — Classic", perPerson: "$28", guests25: "$700", guests50: "$1,400" },
  {
    pkg: "Finger Food — Signature",
    perPerson: "$36",
    guests25: "$900",
    guests50: "$1,800",
    featured: true,
  },
  { pkg: "Finger Food — Premium", perPerson: "$42", guests25: "$1,050", guests50: "$2,100" },
  { pkg: "Dinner Catering", perPerson: "$48", guests25: "$1,200", guests50: "$2,400" },
  {
    pkg: "Cocktail + Dinner (Signature + Dinner)",
    perPerson: "$78",
    guests25: "$1,950",
    guests50: "$3,900",
  },
];

export default function PricingTable() {
  const sectionRef = useRef<HTMLElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const table = tableRef.current;
    if (!el || !table) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".pricing-header-inner > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        }
      );

      // Row stagger
      gsap.fromTo(
        ".pricing-data-row",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: table, start: "top 85%" },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-28 px-[6vw]"
      style={{
        background:
          "linear-gradient(180deg, #faf6f1 0%, #f5ede2 100%)",
      }}
    >
      {/* Header */}
      <div className="pricing-header-inner flex flex-col items-center text-center mb-20">
        <div
          className="flex items-center gap-4 mb-6"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#4a3a32",
          }}
        >
          <span
            className="block h-px"
            style={{ width: 40, background: "#d4a5a5" }}
          />
          Pricing Summary
          <span
            className="block h-px"
            style={{ width: 40, background: "#d4a5a5" }}
          />
        </div>
        <h2
          style={{
            fontFamily: "Italiana, serif",
            fontSize: "clamp(3rem, 6vw, 5rem)",
            color: "#1a1410",
            lineHeight: 1,
          }}
        >
          Pricing{" "}
          <em
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#d4a5a5",
            }}
          >
            at a Glance
          </em>
        </h2>
      </div>

      {/* Table */}
      <div
        ref={tableRef}
        className="max-w-5xl mx-auto"
        style={{ borderTop: "1px solid rgba(42,31,26,0.25)" }}
      >
        {/* Head row */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            padding: "1rem",
            borderBottom: "1px solid rgba(42,31,26,0.25)",
          }}
        >
          {["Package", "Per Person", "25 Guests", "50 Guests"].map((h) => (
            <div
              key={h}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#4a3a32",
                textAlign: h !== "Package" ? "center" : "left",
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {rows.map((row, i) => (
          <div
            key={i}
            className="pricing-data-row grid group transition-colors duration-300"
            style={{
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              padding: "1.75rem 1rem",
              borderBottom: "1px solid rgba(42,31,26,0.12)",
              background: row.featured
                ? "linear-gradient(90deg, rgba(252,228,228,0.5), rgba(252,228,228,0.2))"
                : "transparent",
              opacity: 0,
              position: "relative",
            }}
            onMouseEnter={(e) => {
              if (!row.featured)
                (e.currentTarget as HTMLDivElement).style.background =
                  "rgba(252,228,228,0.3)";
            }}
            onMouseLeave={(e) => {
              if (!row.featured)
                (e.currentTarget as HTMLDivElement).style.background =
                  "transparent";
            }}
          >
            {/* Package name */}
            <div
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.3rem",
                color: "#1a1410",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              {row.pkg}
              {row.featured && (
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.75rem",
                    background: "#1a1410",
                    color: "#faf6f1",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    borderRadius: 100,
                  }}
                >
                  Most Popular
                </span>
              )}
            </div>

            {/* Figures */}
            {[row.perPerson, row.guests25, row.guests50].map((fig, j) => (
              <div
                key={j}
                style={{
                  fontFamily: "Italiana, serif",
                  fontSize: "1.5rem",
                  color: "#2a1f1a",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {fig}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

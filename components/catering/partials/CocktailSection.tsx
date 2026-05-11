"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SectionHeader from "./SectionHeader";
import ChoiceGrid from "./ChoiceGrid";
import AddonStrip, { Sep } from "./AddonStrip";
import DetailRow from "./DetailRow";
import CloserNote from "./CloserNote";
import { ChoiceColumn, DetailItem } from "../config/types";


gsap.registerPlugin(ScrollTrigger);

const choices: ChoiceColumn[] = [
  {
    label: "Tier One · Classic",
    title: "Choose Any 4 Items",
    tierPrice: "$28",
    isNote: false,
    items: [
      "Deviled Eggs Honey",
      "Barbecue Meatballs Mini",
      "Cup Pasta Salad Mini",
      "Cup Rasta Pasta Lemon",
      "Pepper Chicken Bites",
      "Mac & Cheese Balls",
      "Caesar Salad Cups",
    ],
  },
  {
    label: "Tier Two · Signature",
    title: "Choose Any 6 Items",
    tierPrice: "$36",
    isNote: true,
    items: [
      "All Classic options, plus:",
      "Shrimp & Grits Cups",
      "Burger Bites with toppings",
      "Hawaiian Shrimp Skewers",
      "Teriyaki Chicken Skewer",
    ],
  },
  {
    label: "Tier Three · Premium",
    title: "Choose Any 8 Items",
    tierPrice: "$42",
    isNote: true,
    items: [
      "All Signature options, plus:",
      "Smoked Salmon Cucumber Bites",
      "Custom seasonal option",
      "Dessert bites by Kakes by Kesh",
    ],
  },
];

const details: DetailItem[] = [
  { label: "Minimum", text: "20 guests to book" },
  { label: "Best For", text: "Cocktail hours, showers, mixers" },
  { label: "Combine", text: "Pair with dinner for full events" },
  { label: "Delivery", text: "Available +$75–$150 by distance" },
];

export default function CocktailSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Dramatic reveal for the dark section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-[6vw] py-28 overflow-hidden"
      style={{
        background: "#1a1410",
        color: "#faf6f1",
      }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(212,165,165,0.15) 0%, transparent 50%)",
        }}
      />

      <div  className="relative z-10">
        <SectionHeader
          number="02"
          eyebrow="Casa Catering · Package Two"
          title="Cocktail Hour"
          titleItalic="& Finger Food"
          price="$28–$42"
          priceLabel="per person · minimum 20 guests"
          badge="Most Popular"
          dark
        />

        <ChoiceGrid columns={choices} dark />

        <AddonStrip dark>
          Each item ~4–5 pieces per person
          <Sep dark /> Service time 1.5–2 hours
          <Sep dark /> Beautiful platters with labels included
        </AddonStrip>

        <DetailRow items={details} dark />

        <CloserNote dark>
          Pair the Brunch package with our Cocktail Hour tier for a full morning
          experience. Great for baby showers, bridal brunches, and birthday
          celebrations.
        </CloserNote>
      </div>
    </section>
  );
}

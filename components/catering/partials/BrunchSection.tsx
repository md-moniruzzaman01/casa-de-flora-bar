"use client";

import { useRef } from "react";
import SectionHeader from "./SectionHeader";
import ChoiceGrid from "./ChoiceGrid";
import AddonStrip, { Sep } from "./AddonStrip";
import DetailRow from "./DetailRow";
import CloserNote from "./CloserNote";
import { ChoiceColumn, DetailItem } from "../config/types";


const choices: ChoiceColumn[] = [
  {
    label: "Choose Two",
    title: "Signature Brunch",
    items: ["Chicken & Waffles", "Shrimp & Grits", "French Toast", "Rasta Pasta"],
  },
  {
    label: "Choose One",
    title: "Breakfast Protein",
    items: ["Turkey Sausage", "Beef Sausage", "Turkey Bacon", "Beef Bacon"],
  },
  {
    label: "Always Included",
    title: "With Every Package",
    items: ["Scrambled Eggs & Breakfast Potatoes", "Biscuits"],
  },
];

const details: DetailItem[] = [
  { label: "Minimum", text: "15 guests to book" },
  { label: "Setup", text: "Chafing dishes &amp; utensils included" },
  { label: "Pricing", text: "$38/person pickup<br/>Delivery +$75–$150" },
  { label: "Deposit", text: "50% at booking<br/>Balance 5 days before" },
];

export default function BrunchSection() {


  return (
    <section

      className="px-[6vw] py-28"
      style={{ opacity: 0 }}
    >
      <SectionHeader
        number="01"
        eyebrow="Casa Catering · Package One"
        title="Casa"
        titleItalic="Brunch Catering"
        price="$38"
        priceLabel="per person · min 15 guests"
      />

      <div >
        <ChoiceGrid columns={choices} />
      </div>

      <AddonStrip>
        Additional option <em>+$8/person</em>
        <Sep /> Fruit display <em>+$4/person</em>
      </AddonStrip>

      <DetailRow items={details} />

      <CloserNote>
        Pair the Brunch package with our Cocktail Hour tier for a full morning
        experience. Ideal for baby showers, bridal brunches, and birthday
        celebrations.
      </CloserNote>
    </section>
  );
}

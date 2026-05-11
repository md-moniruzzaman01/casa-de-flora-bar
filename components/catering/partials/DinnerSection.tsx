"use client";

import SectionHeader from "./SectionHeader";
import ChoiceGrid from "./ChoiceGrid";
import AddonStrip, { Sep } from "./AddonStrip";
import DetailRow from "./DetailRow";
import { ChoiceColumn, DetailItem } from "../config/types";


const choices: ChoiceColumn[] = [
  {
    label: "Choose Two",
    title: "Main Entrées",
    items: [
      "Curry Chicken Turkey",
      "Wings (braised) Barbecue",
      "Chicken Fried Fish",
      "Whiting Rasta Pasta",
      "Meatballs (beef or turkey)",
    ],
  },
  {
    label: "Choose Three",
    title: "Sides",
    items: [
      "Mac and Cheese",
      "Mashed Potatoes",
      "Cabbage",
      "Yellow Rice",
      "Collard Greens",
      "Candied Yams",
    ],
  },
  {
    label: "Always Included",
    title: "With Every Dinner",
    items: [
      "Caesar Salad or Spring Salad",
      "Dinner rolls / bread",
      "Serving ware & chafing dishes",
      "Plates, napkins & utensils",
    ],
  },
];

const details: DetailItem[] = [
  { label: "Minimum", text: "20 guests to book" },
  { label: "Style", text: "Buffet setup included" },
  { label: "Pickup", text: "$48/person<br/>Delivery +$75–$200" },
  { label: "Deposit", text: "50% at booking<br/>Balance 5 days out" },
];

export default function DinnerSection() {

  return (
    <section

      className="px-[6vw] py-28"
      style={{ opacity: 0 }}
    >
      <SectionHeader
        number="03"
        eyebrow="Casa Catering · Package Three"
        title="Casa"
        titleItalic="Dinner Catering"
        price="$48"
        priceLabel="per person · minimum 20 guests · full buffet"
      />

      <ChoiceGrid columns={choices} />

      <AddonStrip>
        Add-ons: Third entrée <em>+$10/person</em>
        <Sep /> Dessert station by Kakes by Kesh <em>+$8/person</em>
        <Sep /> Linen &amp; décor upgrade <em>+$5/person</em>
      </AddonStrip>

      <DetailRow items={details} />
    </section>
  );
}

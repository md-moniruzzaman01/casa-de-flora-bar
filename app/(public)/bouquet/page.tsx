import type { Metadata } from "next";
import BouquetBookingForm from "@/components/bouquet/partials/BouquetBookingForm";
import ExperienceDetails from "@/components/bouquet/partials/ExperienceDetails";
import Hero from "@/components/bouquet/partials/Hero";
import HowItWorks from "@/components/bouquet/partials/HowItWorks";
import QuoteSection from "@/components/bouquet/partials/QuoteSection";

export const metadata: Metadata = {
  title: "Sip & Clip Bouquet Bar — Build Your Own Bouquet",
  description:
    "Design your own bouquet at Casa de Flora's Sip & Clip Bouquet Bar in Bloomfield, NJ. Sip a craft drink while you create — perfect for date nights, parties and gifts.",
  keywords: [
    "bouquet bar Bloomfield",
    "build your own bouquet NJ",
    "sip and clip",
    "DIY flowers",
    "flower workshop New Jersey",
  ],
  alternates: { canonical: "/bouquet" },
  openGraph: {
    title: "Sip & Clip Bouquet Bar at Casa de Flora",
    description: "Build-your-own bouquet experience in Bloomfield, NJ.",
    url: "/bouquet",
  },
};

export default function BouquetPage() {
    return (
        <div>
            <Hero />
            <QuoteSection />
            <HowItWorks />
            <ExperienceDetails />
            <BouquetBookingForm />
        </div>
    );
}

import type { Metadata } from "next";
import HeroSection from "@/components/catering/partials/HeroSection";
import BrunchSection from "@/components/catering/partials/BrunchSection";
import CocktailSection from "@/components/catering/partials/CocktailSection";
import DinnerSection from "@/components/catering/partials/DinnerSection";
import PricingTable from "@/components/catering/partials/PricingTable";
import CateringSection from "@/components/catering/partials/CateringSection";

export const metadata: Metadata = {
  title: "Catering — On-Site & Off-Site Service",
  description:
    "Casa de Flora Bar offers full-service catering for weddings, corporate events and private gatherings in Bloomfield, NJ and the surrounding area.",
  keywords: [
    "catering Bloomfield NJ",
    "wedding catering New Jersey",
    "corporate catering NJ",
    "event catering",
    "drop-off catering NJ",
    "plated dinner catering",
    "mobile bar service",
  ],
  alternates: { canonical: "/catering" },
  openGraph: {
    title: "Catering by Casa de Flora Bar",
    description: "Full-service catering for events in NJ.",
    url: "/catering",
  },
};

export default function CateringPage() {
  return (
    <>
      <HeroSection />
      <BrunchSection />
      <CateringSection/>
      <CocktailSection />
      <DinnerSection />
      <PricingTable />
  
    </>
  );
}

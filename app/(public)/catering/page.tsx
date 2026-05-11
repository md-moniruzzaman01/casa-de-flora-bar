import type { Metadata } from "next";
import Hero from "@/components/catering/partials/Hero";
import ServicesGrid from "@/components/catering/partials/ServicesGrid";
import MenusTabs from "@/components/catering/partials/MenusTabs";
import ProcessSteps from "@/components/catering/partials/ProcessSteps";
import InquiryForm from "@/components/catering/partials/InquiryForm";
import ClosingCTA from "@/components/catering/partials/ClosingCTA";
import HeroSection from "@/components/catering/partials/HeroSection";
import BrunchSection from "@/components/catering/partials/BrunchSection";
import SectionDivider from "@/components/catering/partials/SectionDivider";
import CocktailSection from "@/components/catering/partials/CocktailSection";
import DinnerSection from "@/components/catering/partials/DinnerSection";
import PricingTable from "@/components/catering/partials/PricingTable";

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
          <HeroSection/>
      <BrunchSection />
      <SectionDivider />
      <CocktailSection />
      <SectionDivider />
      <DinnerSection />
      <PricingTable/>
      {/* <Hero />
      <ServicesGrid />
      <MenusTabs />
      <ProcessSteps />
      <InquiryForm />
      <ClosingCTA /> */}
    </>
  );
}

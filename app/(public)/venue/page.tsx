import HeroSection from "@/components/venue/partials/Hero";
import IntroSection from "@/components/venue/partials/IntroSection";
import BookingSection from "@/components/venue/partials/BookingSection";
import PackagesSection from "@/components/venue/partials/PackagesSection";
import type { Metadata } from "next";
import GrandBloomSection from "@/components/venue/partials/GrandBloomSection";
import UndergroundSection from "@/components/venue/partials/UndergroundSection";

export const metadata: Metadata = {
  title: "Venue Rental — Private Event Space in Bloomfield, NJ",
  description:
    "Rent the Casa de Flora Bar venue for private parties, corporate events, weddings and pop-ups. A floral-inspired space in the heart of Bloomfield, NJ.",
  keywords: [
    "venue rental Bloomfield NJ",
    "private event space NJ",
    "wedding venue New Jersey",
    "corporate event venue",
    "pop-up space Bloomfield",
  ],
  alternates: { canonical: "/venue" },
  openGraph: {
    title: "Rent the Casa de Flora Venue",
    description: "Private event space rental in Bloomfield, NJ.",
    url: "/venue",
  },
};

export default function VanuePage() {
  return (
    <div>
      <HeroSection />
      <PackagesSection />
      <IntroSection />
      <GrandBloomSection/>
      <UndergroundSection/>
      <BookingSection />
    </div>
  );
}

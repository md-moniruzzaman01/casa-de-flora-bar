import ArtFromScratchSection from "@/components/florals/partials/ArtFromScratchSection";
import BrandLogosSection from "@/components/florals/partials/BrandLogosSection";
import ConsultationSection from "@/components/florals/partials/ConsultationSection";
import HeroSection from "@/components/florals/partials/Hero";
import IntroFairytaleSection from "@/components/florals/partials/IntroFairytaleSection";
import TestimonialsSection from "@/components/florals/partials/TestimonialsSection";
import WeddingGallery from "@/components/florals/partials/WeddingGallery";
import WeddingGallerySection from "@/components/florals/partials/WeddingGallerySection";
import WeddingVideoSection from "@/components/florals/partials/WeddingVideoSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Florals — Wedding & Event Floral Design",
  description:
    "Custom floral arrangements for weddings, events and special moments by Casa de Flora Bar in Bloomfield, NJ. Designed by founder Maritza, with over a decade of bridal floral experience.",
  keywords: [
    "wedding florist NJ",
    "event florals Bloomfield",
    "bridal flowers New Jersey",
    "floral design",
  ],
  alternates: { canonical: "/florals" },
  openGraph: {
    title: "Florals by Casa de Flora Bar",
    description: "Wedding and event floral design in Bloomfield, NJ.",
    url: "/florals",
  },
};

export default function FloralsPage() {
    return (
        <div className="">
           <HeroSection/>
           <BrandLogosSection/>
           <IntroFairytaleSection/>
           <WeddingVideoSection/>
           <ArtFromScratchSection/>
           <WeddingGallery/>
           {/* <WeddingGallerySection/> */}
           <TestimonialsSection/>
           <ConsultationSection/>
        </div>
    );
}

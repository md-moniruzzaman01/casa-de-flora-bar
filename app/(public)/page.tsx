import type { Metadata } from "next";
import InquiryForm from "@/components/shared/Form/partials/InquiryForm";
import Hero from "@/components/home/partials/Hero";
import MakeBouquet from "@/components/home/partials/MakeBouquet";
import ReservationSection from "@/components/home/partials/ReservationSection";
import ServicesSection from "@/components/home/partials/ServicesSection";

export const metadata: Metadata = {
  title: "Cafe, Bouquet Bar & Event Space in Bloomfield, NJ",
  description:
    "Casa de Flora Bar — a floral-inspired cafe and event venue in Bloomfield, NJ. Reserve a table, host private events, or design your own bouquet at the home of the Sip & Clip.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Casa de Flora Bar — Cafe, Bouquet Bar & Event Space",
    description:
      "Floral-inspired cafe, bouquet bar and private event space in Bloomfield, NJ.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <MakeBouquet />
      <ReservationSection />
      <InquiryForm/>
    </>
  );
}

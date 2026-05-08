import type { Metadata } from "next";
import BookingSection from "@/components/summer events/partials/BookingSection";
import EventFlowSection from "@/components/summer events/partials/EventFlowSection";
import EventGallery from "@/components/summer events/partials/EventGallery";
import FAQSection from "@/components/summer events/partials/FAQSection";
import HeroSection from "@/components/summer events/partials/Hero";

export const metadata: Metadata = {
  title: "Summer Events — Outdoor Sip & Clip & Patio Parties",
  description:
    "Casa de Flora Bar's summer events lineup — outdoor Sip & Clip experiences, patio parties and seasonal pop-ups in Bloomfield, NJ. Reserve your spot.",
  keywords: [
    "summer events Bloomfield NJ",
    "patio party",
    "outdoor sip and clip",
    "seasonal events NJ",
  ],
  alternates: { canonical: "/summer-events" },
  openGraph: {
    title: "Summer Events at Casa de Flora Bar",
    description: "Outdoor patio parties and Sip & Clip experiences.",
    url: "/summer-events",
  },
};

export default function SummerEventsPage() {
    return (
        <div>
            <HeroSection/>
            <BookingSection/>
            <EventFlowSection/>
            <EventGallery/>
            <FAQSection/>
        </div>
    );
}
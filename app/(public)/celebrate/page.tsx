import type { Metadata } from "next";
import CelebrateHero from "@/components/celebrate/partials/CelebrateHero";
import EventInquiryForm from "@/components/celebrate/partials/EventInquiryForm";
import ExperiencePackages from "@/components/celebrate/partials/ExperiencePackages";

export const metadata: Metadata = {
  title: "Celebrate — Birthdays, Showers & Private Parties",
  description:
    "Celebrate birthdays, bridal showers and private parties at Casa de Flora Bar in Bloomfield, NJ. View packages and request a date — let us bring your celebration to life.",
  keywords: [
    "private party venue NJ",
    "birthday venue Bloomfield",
    "bridal shower venue",
    "celebration packages",
  ],
  alternates: { canonical: "/celebrate" },
  openGraph: {
    title: "Celebrate at Casa de Flora Bar",
    description: "Private celebration packages and event inquiries.",
    url: "/celebrate",
  },
};

export default function CelebratePage() {
    return (
        <>
            <CelebrateHero />
            <ExperiencePackages />
            <EventInquiryForm />
        </>
    );
}

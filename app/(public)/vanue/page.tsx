import type { Metadata } from "next";

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
  alternates: { canonical: "/vanue" },
  openGraph: {
    title: "Rent the Casa de Flora Venue",
    description: "Private event space rental in Bloomfield, NJ.",
    url: "/vanue",
  },
};

export default function VanuePage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-6xl">Vanue page</p>
        </div>
    );
}

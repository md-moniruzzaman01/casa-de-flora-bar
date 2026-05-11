import { Metadata } from "next";
import ReservationContent from "@/components/reservations/partials/ReservationContent";
import PoliciesAndFaq from "@/components/reservations/partials/PoliciesAndFaq";

export const metadata: Metadata = {
  title: "Reserve a Table",
  description:
    "Book your table at Casa de Flora Bar in Bloomfield, NJ. Choose your date and time slot online — we'll handle the rest.",
  keywords: [
    "table reservation Bloomfield NJ",
    "book table Casa de Flora",
    "cafe reservation NJ",
  ],
  alternates: { canonical: "/reservations" },
  openGraph: {
    title: "Reserve a Table at Casa de Flora Bar",
    description: "Book online for our floral cafe in Bloomfield, NJ.",
    url: "/reservations",
  },
};

export default function ReservationsPage() {
  return (
    <>
      <ReservationContent />
      <PoliciesAndFaq />
    </>
  );
}

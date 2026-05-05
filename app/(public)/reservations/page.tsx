import { Metadata } from "next";
import Hero from "@/components/reservations/partials/Hero";
import ReservationContent from "@/components/reservations/partials/ReservationContent";

export const metadata: Metadata = {
  title: "Reserve a Table | Casa de Flora Bar",
  description:
    "Book your table at Casa de Flora Bar. Choose your date, time slot, and let us set the perfect experience for your visit.",
};

export default function ReservationsPage() {
  return (
    <>
      <Hero />
      <ReservationContent />
    </>
  );
}

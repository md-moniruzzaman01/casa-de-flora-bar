import EventRentalForm from "@/components/Home/partials/EventRentalForm";
import Hero from "@/components/Home/partials/Hero";
import MakeBouquet from "@/components/Home/partials/MakeBouquet";
import ReservationSection from "@/components/Home/partials/ReservationSection";
import ServicesSection from "@/components/Home/partials/ServicesSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <MakeBouquet />
      <ReservationSection />
      <EventRentalForm/>
    </>
  );
}

import EventRentalForm from "@/components/home/partials/EventRentalForm";
import Hero from "@/components/home/partials/Hero";
import MakeBouquet from "@/components/home/partials/MakeBouquet";
import ReservationSection from "@/components/home/partials/ReservationSection";
import ServicesSection from "@/components/home/partials/ServicesSection";

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

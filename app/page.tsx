import Hero from "@/components/Home/partials/Hero";
import ServicesSection from "@/components/Home/partials/ServicesSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Hero/>
    <ServicesSection/>

    <div className="min-h-screen"></div>
    </>
  );
}

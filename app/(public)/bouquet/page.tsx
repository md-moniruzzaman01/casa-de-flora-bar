import BouquetBookingForm from "@/components/bouquet/partials/BouquetBookingForm";
import ExperienceDetails from "@/components/bouquet/partials/ExperienceDetails";
import Hero from "@/components/bouquet/partials/Hero";
import HowItWorks from "@/components/bouquet/partials/HowItWorks";
import QuoteSection from "@/components/bouquet/partials/QuoteSection";

export default function BouquetPage() {
    return (
        <div>
            <Hero />
            <QuoteSection />
            <HowItWorks />
            <ExperienceDetails />
            <BouquetBookingForm />
        </div>
    );
}

import ExperienceDetails from "@/components/Bouquet/partials/ExperienceDetails";
import Hero from "@/components/Bouquet/partials/Hero";
import HowItWorks from "@/components/Bouquet/partials/HowItWorks";
import NoticeSection from "@/components/Bouquet/partials/NoticeSection";
import QuoteSection from "@/components/Bouquet/partials/QuoteSection";



export default function BouquetPage() {
    return (
        <>
            <Hero />
            <QuoteSection />
            <HowItWorks />
            <ExperienceDetails />
            <NoticeSection />
        </>
    );
}

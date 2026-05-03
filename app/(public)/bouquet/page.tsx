import ExperienceDetails from "@/components/bouquet/partials/ExperienceDetails";
import Hero from "@/components/bouquet/partials/Hero";
import HowItWorks from "@/components/bouquet/partials/HowItWorks";
import NoticeSection from "@/components/bouquet/partials/NoticeSection";
import QuoteSection from "@/components/bouquet/partials/QuoteSection";



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

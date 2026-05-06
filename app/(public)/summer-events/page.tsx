import BookingSection from "@/components/summer events/partials/BookingSection";
import EventFlowSection from "@/components/summer events/partials/EventFlowSection";
import EventGallery from "@/components/summer events/partials/EventGallery";
import FAQSection from "@/components/summer events/partials/FAQSection";
import HeroSection from "@/components/summer events/partials/Hero";

export default function SummerEventsPage() {
    return (
        <div>
            <HeroSection/>
            <BookingSection/>
            <EventFlowSection/>
            <EventGallery/>
            <FAQSection/>
        </div>
    );
}
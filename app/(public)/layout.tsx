import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import SmoothScroll from "@/components/shared/SmoothScroll";
import EventPopup from "@/components/shared/EventPopup";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollToTop from "@/components/shared/ScrollToTop";
import LocalBusinessJsonLd from "@/components/shared/LocalBusinessJsonLd";
import { ContentProvider } from "@/lib/ContentProvider";
import { getContent } from "@/lib/content";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const content = getContent();
  return (
    <ContentProvider initialContent={content}>
      <EventPopup />
      <LocalBusinessJsonLd />
      <Navbar />
      <main className="flex-1">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </ContentProvider>
  );
}

import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import SmoothScroll from "@/components/shared/SmoothScroll";
import EventPopup from "@/components/shared/EventPopup";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import LocalBusinessJsonLd from "@/components/shared/LocalBusinessJsonLd";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Promo banner / popup. The banner renders inline above the navbar so
          it pushes the page down instead of overlaying the sticky header.
          The popup variant stays fixed full-screen and is unaffected by DOM order. */}
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
    </>
  );
}

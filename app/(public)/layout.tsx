import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import SmoothScroll from "@/components/shared/SmoothScroll";
import EventPopup from "@/components/shared/EventPopup";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <EventPopup />
      <main className="flex-1">
        <SmoothScroll>{children}</SmoothScroll>
      </main>
      <Footer />
    </>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/shared/SmoothScroll";

import {
  Playfair_Display,
  Tenor_Sans,
  EB_Garamond,
} from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

/* =========================
   FONTS
========================= */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const tenor = Tenor_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-tenor",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
});

/* =========================
   METADATA
========================= */
export const metadata: Metadata = {
  title: "CASA DE FLORA BAR",
  description: "Modern floral-inspired experience",
};

/* =========================
   ROOT LAYOUT
========================= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${tenor.variable} ${garamond.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white text-black">
        <Navbar />
        <main className="flex-1">
          <SmoothScroll>{children}</SmoothScroll>
        </main>
        <Footer/>
      </body>
    </html>
  );
}
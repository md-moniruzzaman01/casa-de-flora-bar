import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Tenor_Sans, EB_Garamond } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const tenor = Tenor_Sans({ subsets: ["latin"], weight: "400", variable: "--font-tenor" });
const garamond = EB_Garamond({ subsets: ["latin"], variable: "--font-garamond" });




export const metadata: Metadata = {
  title: "CASA DE FLORA BAR",
  description: "Modern floral-inspired experience",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${tenor.variable} ${garamond.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-white text-black font-sans">
        {children}
      </body>
    </html>
  );
}
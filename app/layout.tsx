import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Playfair_Display, Tenor_Sans, EB_Garamond } from "next/font/google";
import { siteConfig } from "@/lib/site";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const tenor = Tenor_Sans({ subsets: ["latin"], weight: "400", variable: "--font-tenor" });
const garamond = EB_Garamond({ subsets: ["latin"], variable: "--font-garamond" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Cafe, Bouquet Bar & Event Space in Bloomfield, NJ`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Restaurant",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Cafe, Bouquet Bar & Event Space`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ED80A8",
  width: "device-width",
  initialScale: 1,
};

import AnalyticsTracker from "@/components/shared/AnalyticsTracker";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${tenor.variable} ${garamond.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-white text-black font-sans">
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
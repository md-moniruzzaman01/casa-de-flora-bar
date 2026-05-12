import { siteConfig } from "@/lib/site";

export default function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "EventVenue", "CafeOrCoffeeShop"],
    "@id": `${siteConfig.url}#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    logo: `${siteConfig.url}/logo.png`,
    priceRange: "$$",
    servesCuisine: ["American", "Cafe", "Cocktails"],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHours: siteConfig.hours,
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "Reservations",
        email: siteConfig.email,
        areaServed: "US",
        availableLanguage: ["English", "Spanish"],
      },
    ],
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`,
    )}`,
    makesOffer: [
      { "@type": "Offer", name: "Table Reservations", url: `${siteConfig.url}/reservations` },
      { "@type": "Offer", name: "Private Event Space Rental", url: `${siteConfig.url}/vanue` },
      { "@type": "Offer", name: "Catering", url: `${siteConfig.url}/catering` },
      { "@type": "Offer", name: "Custom Bouquets", url: `${siteConfig.url}/bouquet` },
      { "@type": "Offer", name: "Florals", url: `${siteConfig.url}/florals` },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

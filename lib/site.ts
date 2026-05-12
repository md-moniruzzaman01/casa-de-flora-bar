// Public env vars are exposed at build time; falling back to sensible defaults
// keeps the site valid in local development without an .env file.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://casadeflorabar.com";

export const siteConfig = {
  name: "Casa de Flora Bar",
  shortName: "Casa de Flora",
  url: SITE_URL,
  description:
    "Casa de Flora Bar is a floral-inspired cafe and event space in Bloomfield, NJ. Reserve a table, host private events, and order custom bouquets — home of the Sip & Clip experience.",
  tagline: "Home of the Sip & Clip",
  locale: "en_US",
  email: "events@casadeflorabar.com",
  phone: "+19736958381",
  phoneDisplay: "973-695-8381",
  whatsapp: "19736958381",
  address: {
    street: "75 Washington Street",
    city: "Bloomfield",
    region: "NJ",
    postalCode: "07003",
    country: "US",
  },
  geo: {
    latitude: 40.8068,
    longitude: -74.1854,
  },
  hours: [
    "Mo-Th 11:00-22:00",
    "Fr-Sa 11:00-23:30",
    "Su 11:00-21:00",
  ],
  social: {
    instagram: "https://www.instagram.com/casadeflorabar",
    facebook: "https://www.facebook.com/casadeflorabar",
  },
  ogImage: "/logo.png",
  keywords: [
    "Casa de Flora Bar",
    "cafe Bloomfield NJ",
    "event space rental",
    "private events Bloomfield",
    "bouquet bar",
    "sip and clip",
    "wedding venue New Jersey",
    "floral cafe",
    "birthday venue",
    "bridal shower venue",
  ],
} as const;

export const whatsappLink = (message?: string) => {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

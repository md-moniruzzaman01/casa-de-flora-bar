// /components/Navbar/config/constants.ts


import { NavbarConfig } from "./types";

export const NAVBAR_CONFIG: NavbarConfig = {
  logo: "/logo.png",

  navItems: [
    { label: "Home", href: "/" },

    {
      label: "Services ▼",
      children: [
        { label: "Floral Café", href: "/services/floral-cafe" },
        { label: "Weekend Brunch", href: "/services/brunch" },
        { label: "Bouquet Bar", href: "/services/bouquet" },
        { label: "Private Events", href: "/services/private-events" },
      ],
    },

    { label: "Menu", href: "/menu" },
    { label: "About", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Experiences", href: "/experience" },
  ],

  cta: {
    label: "Reserve",
    href: "/reserve",
  },
};
// /components/Navbar/config/constants.ts


import { NavbarConfig } from "./types";

export const NAVBAR_CONFIG: NavbarConfig = {
  logo: "/logo.png",

  navItems: [
    { label: "Home", href: "/" },

    { label: "Wedding Florals", href: "/florals" },
    { label: "Venue Rental", href: "/venue" },
    { label: "Catering", href: "/catering" },
    { label: "Menu", href: "/menu" },
    { label: "Summer Events", href: "/summer-events" },
    { label: "About Us", href: "/about" },
  ],

  cta: {
    label: "Reserve",
    href: "/reservations",
  },
};
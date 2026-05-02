// /components/Navbar/config/constants.ts


import { NavbarConfig } from "./types";

export const NAVBAR_CONFIG: NavbarConfig = {
  logo: "/logo.png",

  navItems: [
    { label: "Home", href: "/" },

    {
      label: "Services ▼",
      children: [
        { label: "Wedding Florals", href: "/wedding-florals" },
        { label: "Catering", href: "/catering" },
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
// constant.ts

import { NavSection } from "./types";

export const navSections: NavSection[] = [
    {
        label: "Main Menu",
        items: [
            { icon: "grid", label: "Dashboard", href: "/dashboard" },
            { icon: "calendar", label: "Calendar", href: "/calendar" },
        ],
    },
    {
        label: "Reservations",
        items: [
            { icon: "table", label: "Table Reservations", href: "/reservations/table", badge: 6 },
            { icon: "flower", label: "Make Your Bouquet", href: "/reservations/bouquet", badge: 5 },
            { icon: "users", label: "Large Group", href: "/reservations/large-group", badge: 2 },
            { icon: "star", label: "Events", href: "/events" },
        ],
    },
    {
        label: "Manage",
        items: [
            { icon: "user", label: "Customers", href: "/customers" },
            { icon: "plus-circle", label: "Create Event", href: "/events/create" },
            { icon: "settings", label: "Settings", href: "/settings" },
        ],
    },
];
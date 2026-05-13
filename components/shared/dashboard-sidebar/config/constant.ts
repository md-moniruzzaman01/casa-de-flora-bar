// constant.ts

import { NavSection } from "./types";

export const navSections: NavSection[] = [
    {
        label: "Main Menu",
        items: [
            { icon: "grid", label: "Dashboard", href: "/admin/dashboard" },
            { icon: "chart", label: "Analytics", href: "/admin/analytics" },
            { icon: "calendar", label: "Calendar", href: "/admin/calendar" },
        ],
    },
    {
        label: "Reservations",
        items: [
            { icon: "table", label: "Table Reservations", href: "/admin/reservations/table" },
            { icon: "flower", label: "Make Your Bouquet", href: "/admin/reservations/bouquet" },
            { icon: "users", label: "Large Group", href: "/admin/reservations/large-group" },
            { icon: "star", label: "Events", href: "/admin/events" },
        ],
    },
    {
        label: "Manage",
        items: [
            { icon: "user", label: "Customers", href: "/admin/customers" },
            { icon: "users", label: "Users", href: "/admin/users" },
            { icon: "mail", label: "Inquiries", href: "/admin/inquiries" },
            { icon: "plus-circle", label: "Create Event", href: "/admin/events/create" },
            { icon: "settings", label: "Settings", href: "/admin/settings" },
        ],
    },
];
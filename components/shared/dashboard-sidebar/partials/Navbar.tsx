"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard":               "Dashboard",
  "/calendar":                "Calendar",
  "/reservations/table":      "Table Reservations",
  "/reservations/bouquet":    "Make Your Bouquet",
  "/reservations/large-group":"Large Group",
  "/reservations/add":        "New Reservation",
  "/events/create":           "Create Promotion",
  "/events":                  "Events & Promotions",
  "/customers":               "Customers",
  "/settings":                "Settings",
};

export default function Navbar() {
  const pathname = usePathname();
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const title =
    Object.entries(PAGE_TITLES)
      .sort((a, b) => b[0].length - a[0].length)
      .find(([key]) => pathname === key || pathname.startsWith(key + "/"))?.[1] ?? "Admin";

  return (
    <header
      className="flex items-center justify-between px-7 py-4 bg-white border-b"
      style={{ borderColor: "#eee" }}
    >
      <div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 20 }}>{title}</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          {formattedDate} · Bloomfield, NJ
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/admin/events/create">
          <button
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-50 transition-colors"
            style={{ borderColor: "#eee" }}
          >
            + Create Event
          </button>
        </Link>

        <Link href="/admin/reservations/add">
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 transition-colors">
            + New Reservation
          </button>
        </Link>
      </div>
    </header>
  );
}

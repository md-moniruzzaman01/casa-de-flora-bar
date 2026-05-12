import type { Metadata } from "next";
import MenuPage from "@/components/menu/partials/MenuNav";

export const metadata: Metadata = {
  title: "Menu — Coffee, Cocktails & Cafe Bites",
  description:
    "Browse the Casa de Flora Bar menu — signature cocktails, espresso drinks, brunch favourites and pastries served in our floral-inspired cafe in Bloomfield, NJ.",
  keywords: ["Casa de Flora menu", "Bloomfield cafe menu", "cocktails", "brunch Bloomfield NJ"],
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Casa de Flora Bar Menu",
    description: "Signature cocktails, coffee and cafe bites in Bloomfield, NJ.",
    url: "/menu",
  },
};

export default function Menu() {
  return (
    <>
      <MenuPage />
    </>
  );
}

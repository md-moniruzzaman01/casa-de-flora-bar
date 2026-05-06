"use client";

import { useMemo, useState } from "react";
import { menuItems } from "../config/constant";
import MenuHero from "./MenuHero";
import MenuFilters from "./MenuFilters";
import MenuSection from "./MenuSection";
import MenuOutro from "./MenuOutro";

export default function MenuPage() {
  const [active, setActive] = useState<string>("All");

  const filterOptions = useMemo(
    () => ["All", ...menuItems.map((c) => c.category)],
    [],
  );

  const visible = useMemo(
    () =>
      active === "All"
        ? menuItems
        : menuItems.filter((c) => c.category === active),
    [active],
  );

  return (
    <div className="w-full bg-white">
      <MenuHero />
      <MenuFilters
        options={filterOptions}
        active={active}
        onSelect={setActive}
      />

      {visible.map((cat, i) => (
        <MenuSection
          key={cat.category}
          category={cat.category}
          index={i}
          items={cat.items}
        />
      ))}

      {visible.length === 0 && (
        <div className="py-32 text-center">
          <p className="font-serif italic text-gray/50 text-2xl">
            Nothing on the menu under this section yet.
          </p>
        </div>
      )}

      <MenuOutro />
    </div>
  );
}

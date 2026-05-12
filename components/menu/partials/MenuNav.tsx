"use client";

import { useMemo } from "react";
import { menuItems } from "../config/constant";
import MenuHero from "./MenuHero";
import MenuFilters from "./MenuFilters";
import MenuSection from "./MenuSection";
import MenuOutro from "./MenuOutro";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function MenuPage() {
  const sections = useMemo(
    () =>
      menuItems.map((cat) => ({
        ...cat,
        id: `menu-${slugify(cat.category)}`,
      })),
    [],
  );

  const filterOptions = useMemo(
    () =>
      sections.map((cat) => ({
        label: cat.category,
        id: cat.id,
      })),
    [sections],
  );

  const totalItems = useMemo(
    () => sections.reduce((sum, c) => sum + c.items.length, 0),
    [sections],
  );

  return (
    <div className="w-full bg-white">
      <MenuHero />

      {/* ── Intro band ── */}
      <section className="bg-white border-b border-primary-100 ">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-primary mb-3">
                The Casa de Flora Menu
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#222] leading-[1.05] tracking-tight">
                Made fresh, in-house —
                <br />
                <span className="italic text-primary">served with flowers.</span>
              </h2>
            </div>
            <div className="md:col-span-5 md:pl-6">
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                A rotating selection of brunch plates, craffles, and signature
                bites. Prices are per serving and may change with the season —
                the team is always happy to accommodate dietary requests.
              </p>
              <div className="mt-6 flex items-center gap-6 text-[10px] uppercase tracking-[0.28em] text-gray-500">
                <span>
                  <span className="font-serif text-base text-primary tabular-nums mr-2">
                    {String(sections.length).padStart(2, "0")}
                  </span>
                  Sections
                </span>
                <span className="h-3 w-px bg-primary/30" />
                <span>
                  <span className="font-serif text-base text-primary tabular-nums mr-2">
                    {String(totalItems).padStart(2, "0")}
                  </span>
                  Dishes
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      <MenuFilters options={filterOptions} />

      {sections.map((cat, i) => (
        <MenuSection
          key={cat.id}
          id={cat.id}
          category={cat.category}
          index={i}
          items={cat.items}
        />
      ))}

    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { NAVBAR_CONFIG } from "../config/constants";

export default function Navbar() {
  const { logo, navItems, cta } = NAVBAR_CONFIG;

  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);

  const services = navItems.find((i) => i.label === "Services");

  /* =========================
     SCROLL EFFECT (GLASS + SHRINK)
  ========================= */
  useEffect(() => {
    const el = navRef.current;

    const onScroll = () => {
      if (!el) return;

      if (window.scrollY > 40) {
        el.classList.add("py-2", "bg-white/80", "backdrop-blur-xl", "shadow-sm");
        el.classList.remove("py-0");
      } else {
        el.classList.remove("py-2", "bg-white/80", "backdrop-blur-xl", "shadow-sm");
        el.classList.add("py-0");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* =========================
     GSAP DROPDOWN (DESKTOP)
  ========================= */
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const openDropdown = (key: string) => {
    const el = dropdownRefs.current[key];
    if (!el) return;

    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.25,
      ease: "power2.out",
      pointerEvents: "auto",
    });
  };

  const closeDropdown = (key: string) => {
    const el = dropdownRefs.current[key];
    if (!el) return;

    gsap.to(el, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: "power2.in",
      pointerEvents: "none",
    });
  };

  return (
    <>
      <header
        ref={navRef}
        className="sticky top-0 z-50 bg-white border-b border-primary-200/40 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 h-[76px] grid grid-cols-3 items-center transition-all">

          {/* LEFT NAV */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.slice(0, 3).map((item) => {
              const isActive = pathname === item.href;

              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => openDropdown(item.label)}
                    onMouseLeave={() => closeDropdown(item.label)}
                  >
                    <button className="relative text-[10.5px] tracking-[0.24em] uppercase group">
                      {item.label}
                      <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
                    </button>

                    {/* GSAP dropdown */}
                    <div
                      ref={(el) => {
                        dropdownRefs.current[item.label] = el;
                      }}
                      className="absolute left-0 top-full mt-4 w-56 bg-white/90 backdrop-blur-xl border border-primary-200/40 shadow-lg rounded-xl opacity-0 -translate-y-2 pointer-events-none"
                    >
                      <div className="py-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-5 py-2 text-sm hover:bg-primary-100/40 transition"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href || "#"}
                  className={`relative text-[10.5px] tracking-[0.24em] uppercase group ${
                    isActive ? "text-primary" : "text-black"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-[1px] bg-primary transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CENTER LOGO */}
          <div className="flex flex-col items-center text-center">
            <Link
              href="/"
              className="font-serif text-[24px] tracking-[0.08em] uppercase"
            >
              {logo}
            </Link>

            <div className="w-full h-[0.5px] bg-primary-300 my-[6px]" />

            <span className="text-[8px] tracking-[0.36em] uppercase text-primary">
              Floral Café & Event Space
            </span>
          </div>

          {/* RIGHT NAV */}
          <div className="flex justify-end items-center gap-6">

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-10">
              {navItems.slice(3).map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.label}
                    href={item.href || "#"}
                    className={`relative text-[10.5px] uppercase tracking-[0.24em] ${
                      isActive ? "text-primary" : "text-black"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 -bottom-1 h-[1px] bg-primary transition-all ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* CTA */}
            {cta && (
              <Link
                href={cta.href}
                className="px-6 py-3 text-[10px] tracking-[0.26em] uppercase bg-black text-white hover:bg-primary transition"
              >
                {cta.label}
              </Link>
            )}

            {/* MOBILE */}
            <button
              className="md:hidden flex flex-col gap-[4px]"
              onClick={() => setMobileOpen(true)}
            >
              <span className="w-5 h-[1px] bg-black" />
              <span className="w-5 h-[1px] bg-black" />
              <span className="w-5 h-[1px] bg-black" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================
          MOBILE DRAWER (SMOOTH)
      ========================= */}
      <div
        className={`fixed inset-0 z-[999] ${
          mobileOpen ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white p-6 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button onClick={() => setMobileOpen(false)} className="mb-8">
            Close ✕
          </button>

          <div className="flex flex-col gap-6">

            {navItems.map((item) => {
              const isServices = item.label === "Services";

              if (isServices) {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() =>
                        setMobileServicesOpen(!mobileServicesOpen)
                      }
                      className="text-[11px] uppercase tracking-[0.2em]"
                    >
                      Services
                    </button>

                    <div
                      className={`pl-4 mt-3 flex flex-col gap-3 overflow-hidden transition-all ${
                        mobileServicesOpen
                          ? "max-h-60 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {services?.children?.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm text-gray-600"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href || "#"}
                  onClick={() => setMobileOpen(false)}
                  className="text-[11px] uppercase tracking-[0.2em]"
                >
                  {item.label}
                </Link>
              );
            })}

            {cta && (
              <Link
                href={cta.href}
                onClick={() => setMobileOpen(false)}
                className="mt-6 px-5 py-3 bg-black text-white text-center uppercase text-[11px]"
              >
                {cta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
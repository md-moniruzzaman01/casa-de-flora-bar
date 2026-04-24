"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { NAVBAR_CONFIG } from "../config/constants";
import Image from "next/image";

export default function Navbar() {
  const { logo, navItems, cta } = NAVBAR_CONFIG;
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const services = navItems.find((i) => i.label === "Services");

  /* =========================
      SCROLL EFFECT LOGIC
  ========================= */
  useEffect(() => {
    const onScroll = () => {
      // If we scroll more than 20px, trigger the shrink
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* =========================
      GSAP DROPDOWN (DESKTOP)
  ========================= */
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
        className={`sticky top-0 z-50 bg-white border-b border-primary-200/40 transition-all duration-500 ease-in-out ${isScrolled
            ? "py-0 bg-white/90 backdrop-blur-xl shadow-md"
            : "py-2 bg-white"
          }`}
      >
        <div
          className={`max-w-7xl mx-auto pr-4 grid grid-cols-2 lg:grid-cols-3 items-center transition-all duration-500 ease-in-out ${isScrolled ? "h-20" : "h-25"
            }`}
        >
          {/* LEFT NAV */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.slice(0, 3).map((item) => {
              const isActive = pathname === item.href;

              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="relative flex items-center h-full"
                    onMouseEnter={() => openDropdown(item.label)}
                    onMouseLeave={() => closeDropdown(item.label)}
                  >
                    <button className="relative text-[10.5px] tracking-[0.24em] uppercase group">
                      {item.label}
                      <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
                    </button>

                    <div
                      ref={(el) => { dropdownRefs.current[item.label] = el; }}
                      className="absolute left-0 top-[100%] pt-4 w-56 opacity-0 -translate-y-2 pointer-events-none"
                    >
                      <div className="bg-white border border-primary-200/40 shadow-lg rounded-xl py-3 backdrop-blur-xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-5 py-2 text-sm hover:bg-primary-100/40 transition-colors"
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
                  className={`relative text-[10.5px] tracking-[0.24em] uppercase group ${isActive ? "text-primary" : "text-black"
                    }`}
                >
                  {item.label}

                  <span
                    className={`absolute left-0 -bottom-1 h-[1px] bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CENTER LOGO - Shrinks slightly on scroll */}
          <div className="flex flex-col items-start md:items-center text-center">
            <Link
              href="/"
              className={`relative block transition-all duration-500 ease-in-out ${isScrolled ? "w-20 h-16" : "w-24 h-20"
                }`}
            >
              <Image
                src={logo}
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* RIGHT NAV */}
          <div className="flex justify-end items-center gap-4 md:gap-10 flex-1">
            <nav className="hidden md:flex items-center gap-10">
              {navItems.slice(3).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href || "#"}
                    className={`relative text-[10.5px] uppercase tracking-[0.24em] group ${isActive ? "text-primary" : "text-black"
                      }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 -bottom-1 h-[1px] bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {cta && (
              <Link
                href={cta.href}
                className={`transition-all duration-500 uppercase tracking-[0.26em] bg-black text-white hover:bg-primary whitespace-nowrap ${isScrolled ? "px-4 py-2 text-[9px]" : "px-6 py-3 text-[10px]"
                  }`}
              >
                {cta.label}
              </Link>
            )}

            {/* MOBILE TOGGLE */}
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

      {/* MOBILE DRAWER (SMOOTH) */}
      <div className={`fixed inset-0 z-[999] ${mobileOpen ? "visible" : "invisible"}`}>
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white p-6 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <button onClick={() => setMobileOpen(false)} className="mb-8">Close ✕</button>
          <div className="flex flex-col gap-6">
            {navItems.map((item) => {
              const isServices = item.label === "Services";
              if (isServices) {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="text-[11px] uppercase tracking-[0.2em]"
                    >
                      Services
                    </button>
                    <div className={`pl-4 mt-3 flex flex-col gap-3 overflow-hidden transition-all ${mobileServicesOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
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
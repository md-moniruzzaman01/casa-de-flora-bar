"use client";

import { useEffect, useRef, useState } from "react";

interface MenuFilterOption {
  label: string;
  id: string;
}

interface MenuFiltersProps {
  options: MenuFilterOption[];
}

export default function MenuFilters({ options }: MenuFiltersProps) {
  const [active, setActive] = useState<string>(options[0]?.id ?? "");
  const railRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Sync the active pill with whichever section is in view.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sections = options
      .map((opt) => document.getElementById(opt.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      {
        // Bias the trigger zone toward the upper-middle of the viewport so
        // the active pill flips as a section header enters reading position.
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [options]);

  // Keep the active pill scrolled into view inside its horizontal rail.
  useEffect(() => {
    const btn = buttonRefs.current.get(active);
    if (!btn || !railRef.current) return;
    btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const handleClick = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    setActive(id);
    // The global SmoothScroll click handler will pick this up via Lenis,
    // but we also dispatch a manual scroll as a fallback for native scroll.
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Menu sections"
      className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-y border-primary-100"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="flex items-center gap-6 py-4">
          <span className="hidden md:inline text-[10px] uppercase tracking-[0.32em] text-gray-500 shrink-0">
            Menu
          </span>

          <div
            ref={railRef}
            className="flex items-center gap-2 overflow-x-auto py-1 -mx-2 px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {options.map((opt) => {
              const isActive = active === opt.id;
              return (
                <button
                  key={opt.id}
                  ref={(el) => {
                    if (el) buttonRefs.current.set(opt.id, el);
                    else buttonRefs.current.delete(opt.id);
                  }}
                  onClick={() => handleClick(opt.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`
                    flex-shrink-0 px-4 md:px-5 py-2 text-[10.5px] md:text-[11px]
                    uppercase tracking-[0.22em] whitespace-nowrap rounded-full
                    transition-all duration-300 border
                    ${
                      isActive
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-white text-gray-600 border-primary/20 hover:border-primary hover:text-black"
                    }
                  `}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        nav div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
}

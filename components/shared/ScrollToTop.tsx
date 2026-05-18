"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      className={[
        "fixed bottom-24 right-4 sm:right-6 z-[999]",
        "w-11 h-11 flex items-center justify-center",
        "bg-white border border-[#EDD8DC] shadow-sm",
        "text-[#1a1a1a] hover:border-[#1a1a1a]/30 hover:shadow-md",
        "transition-all duration-300",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none",
      ].join(" ")}
    >
      <ChevronUp size={17} strokeWidth={1.5} />
    </button>
  );
}

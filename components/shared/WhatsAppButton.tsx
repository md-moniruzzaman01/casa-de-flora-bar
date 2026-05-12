"use client";

import { useEffect, useState } from "react";
import { siteConfig, whatsappLink } from "@/lib/site";

const DEFAULT_MESSAGE =
  "Hi Casa de Flora Bar! I'd like to know more about your reservations and events.";
const TOOLTIP_DISMISS_KEY = "cdf-wa-tooltip-dismissed";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => setReducedMotion(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(TOOLTIP_DISMISS_KEY) === "1") return;
    const open = setTimeout(() => setTooltipOpen(true), 2500);
    const close = setTimeout(() => setTooltipOpen(false), 12000);
    return () => {
      clearTimeout(open);
      clearTimeout(close);
    };
  }, []);

  const dismissTooltip = () => {
    setTooltipOpen(false);
    try {
      sessionStorage.setItem(TOOLTIP_DISMISS_KEY, "1");
    } catch {
      // sessionStorage can throw in private mode — fail silently.
    }
  };

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-6 right-4 sm:right-6 z-[1000] flex items-end gap-2 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      {tooltipOpen && (
        <div
          role="status"
          className="hidden sm:flex items-center gap-2 bg-white shadow-lg border border-primary-200 rounded-full pl-4 pr-2 py-2 mb-1"
        >
          <span className="text-sm text-gray font-medium">
            Chat with us on WhatsApp
          </span>
          <button
            type="button"
            aria-label="Dismiss tooltip"
            onClick={dismissTooltip}
            className="w-6 h-6 rounded-full hover:bg-primary-100 text-gray text-xs"
          >
            ✕
          </button>
        </div>
      )}

      <a
        href={whatsappLink(DEFAULT_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl ring-4 ring-white/60 hover:scale-110 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
      >
        {!reducedMotion && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping"
          />
        )}
        <svg
          viewBox="0 0 32 32"
          className="relative w-7 h-7 fill-white"
          aria-hidden="true"
        >
          <path d="M19.11 17.27c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.18-1.34-.81-.72-1.35-1.6-1.51-1.87-.16-.27-.02-.41.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.61-1.47-.83-2.01-.22-.53-.45-.46-.61-.46-.16-.01-.34-.01-.52-.01-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27 0 1.34.97 2.63 1.11 2.81.13.18 1.91 2.92 4.63 4.09.65.28 1.16.45 1.55.58.65.21 1.24.18 1.71.11.52-.08 1.6-.66 1.83-1.29.23-.63.23-1.17.16-1.29-.07-.13-.25-.2-.52-.34zM16.02 5.33c-5.89 0-10.67 4.78-10.67 10.66 0 1.88.49 3.71 1.43 5.32L5 27l5.86-1.54a10.62 10.62 0 0 0 5.16 1.32h.01c5.88 0 10.66-4.78 10.66-10.67 0-2.85-1.11-5.53-3.12-7.55a10.6 10.6 0 0 0-7.55-3.13zm0 19.55h-.01a8.86 8.86 0 0 1-4.51-1.24l-.32-.19-3.48.91.93-3.39-.21-.35a8.86 8.86 0 0 1-1.36-4.71c0-4.9 3.99-8.88 8.89-8.88 2.37 0 4.6.93 6.28 2.6a8.83 8.83 0 0 1 2.6 6.29c0 4.89-3.99 8.88-8.81 8.88z" />
        </svg>
      </a>
    </div>
  );
}

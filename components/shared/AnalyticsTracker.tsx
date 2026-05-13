"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { api } from "@/lib/api";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Skip tracking for admin pages or development
    if (pathname.startsWith("/admin")) return;

    const track = async () => {
      try {
        await api.post("/api/analytics/track", {
          path: pathname,
          referrer: document.referrer || null,
        });
      } catch (e) {
        // Silent fail for analytics
        console.warn("Analytics tracking failed", e);
      }
    };

    track();
  }, [pathname]);

  return null;
}

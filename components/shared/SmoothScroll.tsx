"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia(REDUCED_MOTION_QUERY).matches;

    // Respect user motion preference — fall back to native scroll.
    if (prefersReducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    gsap.ticker.add(tickerFn);
    // Default lag smoothing keeps animations stable when the tab is
    // backgrounded or the main thread blocks. Disabling it (`lagSmoothing(0)`)
    // is what previously caused the "page sticks while scrolling" symptom.

    // Smooth-scroll hash anchors through Lenis so they don't fight the
    // native scroll. e.g. <Link href="#booking">.
    const onAnchorClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#" || hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!(target instanceof HTMLElement)) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    };
    document.addEventListener("click", onAnchorClick);

    // Refresh ScrollTrigger after images/fonts load so trigger positions
    // are accurate. Without this, late-loading images shift content and
    // animations fire at the wrong scroll position.
    const refresh = () => ScrollTrigger.refresh();
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(refresh);
    });
    window.addEventListener("load", refresh);
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("load", refresh);
      document.removeEventListener("click", onAnchorClick);
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(tickerFn);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);

  // On client-side route changes Next.js keeps the layout (and Lenis)
  // mounted, but ScrollTrigger needs to recompute trigger positions for
  // the freshly rendered page.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}

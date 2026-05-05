"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    // Keep a reference to the ticker function so we can remove it
    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Remove the ticker BEFORE destroying lenis
      gsap.ticker.remove(tickerFn);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { WEDDING_FLORALS_CONTENT } from "../config/constant";
import WeddingGalleryChapter from "./WeddingGalleryChapter";

const BEHIND_THE_SCENES_ID = "art-from-scratch";
const BEHIND_THE_SCENES_INITIAL_COUNT = 8;

const buildSrc = (folder: string, file: string) =>
  `${folder.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(file)}`;

type FlatImage = {
  collectionId: string;
  collectionTitle: string;
  src: string;
  alt: string;
};

const WeddingGallery: React.FC = () => {
  const { label, headline_part_1, headline_part_2, subheadline, collections } =
    WEDDING_FLORALS_CONTENT.wedding_gallery;

  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Flattened image list — lightbox navigates seamlessly across all collections
  const allImages: FlatImage[] = useMemo(
    () =>
      collections.flatMap((c) =>
        c.images.map((file, i) => ({
          collectionId: c.id,
          collectionTitle: c.title,
          src: buildSrc(c.folder, file),
          alt: `${c.title} — wedding florals photograph ${i + 1}`,
        }))
      ),
    [collections]
  );

  const collectionStartIndex = useMemo(() => {
    const map: Record<string, number> = {};
    let cursor = 0;
    for (const c of collections) {
      map[c.id] = cursor;
      cursor += c.images.length;
    }
    return map;
  }, [collections]);

  const close = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % allImages.length));
  }, [allImages.length]);
  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + allImages.length) % allImages.length
    );
  }, [allImages.length]);

  // Lightbox: keyboard nav + body scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, close, next, prev]);

  useEffect(() => {
    // Notify ScrollTrigger/Lenis when the gallery height changes (e.g. as lazy images load)
    let resizeObserver: ResizeObserver | null = null;
    let timeoutId: NodeJS.Timeout;
    
    if (sectionRef.current) {
      resizeObserver = new ResizeObserver(() => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
            ScrollTrigger.refresh();
          });
        }, 150);
      });
      resizeObserver.observe(sectionRef.current);
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-primary-50 py-20 md:py-28 overflow-hidden"
    >
      {/* Decorative blooms (parallax) */}
      <div className="bloom-decor pointer-events-none absolute -top-32 -left-32 w-[460px] h-[460px] rounded-full bg-primary-100 blur-3xl opacity-60" />
      <div className="bloom-decor pointer-events-none absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-primary-200 blur-3xl opacity-50" />
      <div className="bloom-decor pointer-events-none absolute -bottom-40 left-1/4 w-[480px] h-[480px] rounded-full bg-primary-100 blur-3xl opacity-50" />

      <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[72px]">
        {/* Section heading */}
        <div className="gallery-reveal flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="font-sans text-[11px] md:text-[12px] tracking-[0.34em] uppercase text-primary mb-5">
            {label}
          </span>
          <h2 className="font-serif text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px] leading-[0.95] tracking-tight text-[#1a1008]">
            <span>{headline_part_1} </span>
            <span className="italic text-primary">{headline_part_2}</span>
          </h2>
          <p className="mt-6 max-w-xl font-serif text-[15px] md:text-[16px] leading-[1.85] text-[#4a3a32]">
            {subheadline}
          </p>
          <div className="mt-8 flex items-center gap-3">
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#a08778]">
              {allImages.length} photographs · {collections.length} chapters
            </span>
          </div>
        </div>

        {/* Each collection rendered as a child chapter component */}
        <div className="space-y-14 md:space-y-20">
          {collections.map((c, idx) => (
            <WeddingGalleryChapter
              key={c.id}
              collection={c}
              index={idx}
              startIndex={collectionStartIndex[c.id]}
              onTileClick={setLightboxIndex}
              initialVisibleCount={
                c.id === BEHIND_THE_SCENES_ID
                  ? BEHIND_THE_SCENES_INITIAL_COUNT
                  : undefined
              }
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/92 backdrop-blur-sm animate-[wgFadeIn_220ms_ease-out]"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close gallery"
          >
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-10 inline-flex h-11 w-11 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.4} />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-10 inline-flex h-11 w-11 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.4} />
          </button>

          {/* Image */}
          <div
            className="relative mx-4 md:mx-16 max-h-[88vh] max-w-[88vw] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={lightboxIndex}
              src={allImages[lightboxIndex].src}
              alt={allImages[lightboxIndex].alt}
              className="max-h-[88vh] max-w-full w-auto h-auto object-contain shadow-2xl animate-[wgFadeIn_300ms_ease-out]"
            />
          </div>

          {/* Caption + counter */}
          <div className="absolute bottom-5 md:bottom-8 left-0 right-0 flex justify-center pointer-events-none">
            <div className="px-4 py-2 rounded-full bg-black/50 text-white/90 font-serif text-[13px] tracking-wide flex items-center gap-3">
              <span className="italic">
                {allImages[lightboxIndex].collectionTitle}
              </span>
              <span className="opacity-50">·</span>
              <span className="font-sans text-[11px] tracking-[0.22em]">
                {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                {String(allImages.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes wgFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default WeddingGallery;
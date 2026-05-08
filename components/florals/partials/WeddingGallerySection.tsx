"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_FLORALS_CONTENT } from "../config/constant";

const buildSrc = (folder: string, file: string) =>
  `${folder.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(file)}`;

type FlatImage = {
  collectionId: string;
  collectionTitle: string;
  src: string;
  alt: string;
};

const WeddingGallerySection: React.FC = () => {
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

  // GSAP scroll-triggered reveals
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Section + chapter heading reveals
      gsap.utils.toArray<HTMLElement>(".gallery-reveal").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // Image tile batched reveal (stagger groups of tiles as they enter viewport)
      gsap.set(".gallery-tile", { y: 50, opacity: 0 });
      ScrollTrigger.batch(".gallery-tile", {
        onEnter: (elements) =>
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: { each: 0.06, from: "start" },
            ease: "power2.out",
            overwrite: true,
          }),
        start: "top 92%",
      });

      // Subtle parallax drift on decorative blooms
      gsap.utils.toArray<HTMLElement>(".bloom-decor").forEach((el, i) => {
        gsap.to(el, {
          yPercent: i % 2 === 0 ? 14 : -10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      ctx.revert();
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

        {/* Each collection rendered in full */}
        <div className="space-y-14 md:space-y-20">
          {collections.map((c, idx) => (
            <article key={c.id} className="relative">
              {/* Chapter header */}
              <div className="gallery-reveal flex flex-col items-center text-center mb-7 md:mb-9">
                <div className="flex items-center gap-4 mb-5">
                  <span className="block h-px w-10 md:w-16 bg-primary/40" />
                  <span className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-primary">
                    Chapter {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="block h-px w-10 md:w-16 bg-primary/40" />
                </div>
                <h3 className="font-serif italic text-[36px] sm:text-[48px] md:text-[64px] lg:text-[76px] leading-[1] tracking-tight text-[#1a1008]">
                  {c.title}
                </h3>
                <p className="mt-3 font-sans text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-[#7a6358]">
                  {c.subtitle}
                </p>
                <span className="mt-3 font-serif italic text-[13px] md:text-[14px] text-[#a08778]">
                  {c.images.length} photographs
                </span>
              </div>

              {/* Masonry grid — every image */}
              <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 [column-fill:balance]">
                {c.images.map((file, i) => {
                  const flatIndex = collectionStartIndex[c.id] + i;
                  return (
                    <button
                      key={`${c.id}-${file}`}
                      type="button"
                      onClick={() => setLightboxIndex(flatIndex)}
                      className="gallery-tile group relative mb-3 md:mb-4 block w-full break-inside-avoid overflow-hidden rounded-[14px] bg-primary-100 cursor-zoom-in shadow-[0_2px_18px_rgba(26,16,8,0.06)] hover:shadow-[0_18px_44px_rgba(26,16,8,0.18)] transition-shadow duration-500"
                      aria-label={`Open photo ${i + 1} of ${c.images.length} from ${c.title}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={buildSrc(c.folder, file)}
                        alt={`${c.title} — wedding florals photograph ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="block w-full h-auto object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
                      />
                      {/* Hover veil */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {/* Hover caption */}
                      <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        <span className="font-serif italic text-white text-[13px] md:text-[14px] drop-shadow">
                          {c.title}
                        </span>
                        <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-white/80">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      {/* Inner ring on hover */}
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/40 transition-all duration-500" />
                    </button>
                  );
                })}
              </div>
            </article>
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

export default WeddingGallerySection;

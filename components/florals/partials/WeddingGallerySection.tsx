"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_FLORALS_CONTENT } from "../config/constant";

const buildSrc = (folder: string, file: string) =>
  `${folder.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(file)}`;

type Collection = (typeof WEDDING_FLORALS_CONTENT.wedding_gallery.collections)[number];

const WeddingGallerySection: React.FC = () => {
  const { label, headline_part_1, headline_part_2, subheadline, collections } =
    WEDDING_FLORALS_CONTENT.wedding_gallery;

  const sectionRef = useRef<HTMLElement>(null);
  const [openCollection, setOpenCollection] = useState<Collection | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const totalPhotos = useMemo(
    () => collections.reduce((sum, c) => sum + c.images.length, 0),
    [collections]
  );

  const openStory = useCallback((collection: Collection) => {
    setOpenCollection(collection);
    setLightboxIndex(null);
  }, []);

  const openPhoto = useCallback((collection: Collection, index: number) => {
    setOpenCollection(collection);
    setLightboxIndex(index);
  }, []);

  const closeStory = useCallback(() => {
    setLightboxIndex(null);
    setOpenCollection(null);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const next = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || !openCollection) return i;
      return (i + 1) % openCollection.images.length;
    });
  }, [openCollection]);

  const prev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || !openCollection) return i;
      return (i - 1 + openCollection.images.length) % openCollection.images.length;
    });
  }, [openCollection]);

  // Body scroll lock while story viewer is open
  useEffect(() => {
    if (!openCollection) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [openCollection]);

  // Keyboard nav
  useEffect(() => {
    if (!openCollection) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) closeLightbox();
        else closeStory();
        return;
      }
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openCollection, lightboxIndex, closeStory, closeLightbox, next, prev]);

  // Heading + spread reveals
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gallery-reveal").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, sectionRef);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-primary-50 overflow-hidden py-20 md:py-28 lg:py-32"
    >
      {/* Decorative pink blooms */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[460px] h-[460px] rounded-full bg-primary-100 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute top-[28%] -right-40 w-[520px] h-[520px] rounded-full bg-primary-200 blur-3xl opacity-50" />
      <div className="pointer-events-none absolute bottom-[-15%] left-[10%] w-[420px] h-[420px] rounded-full bg-primary-100 blur-3xl opacity-40" />

      <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[72px]">
        {/* Section heading */}
        <div className="gallery-reveal flex flex-col items-center text-center mb-20 md:mb-28">
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
            <span className="block h-px w-10 bg-primary/40" />
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#a08778]">
              {totalPhotos} photographs · {collections.length} chapters
            </span>
            <span className="block h-px w-10 bg-primary/40" />
          </div>
        </div>

        {/* ─── Editorial chapter spreads ─── */}
        <div className="space-y-24 md:space-y-36 lg:space-y-44">
          {collections.map((collection, idx) => {
            const isReverse = idx % 2 === 1;
            // Pick spaced-out images so previews feel like a curated triptych,
            // not just the first three.
            const total = collection.images.length;
            const previewIndices = [
              0,
              Math.min(Math.floor(total / 3), total - 1),
              Math.min(Math.floor((total * 2) / 3), total - 1),
            ];
            const [tallIdx, topIdx, botIdx] = previewIndices;
            const tall = collection.images[tallIdx];
            const top = collection.images[topIdx];
            const bot = collection.images[botIdx];

            return (
              <article
                key={collection.id}
                className="gallery-reveal grid md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-center"
              >
                {/* Text column */}
                <div
                  className={[
                    "md:col-span-5",
                    isReverse ? "md:order-2 md:pl-4 lg:pl-10" : "md:pr-4 lg:pr-10",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="block h-px w-10 bg-primary/50" />
                    <span className="font-sans text-[11px] md:text-[12px] tracking-[0.4em] uppercase text-primary">
                      Chapter {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-[#a08778] mb-5">
                    {collection.subtitle}
                  </p>

                  <h3 className="font-serif text-[40px] sm:text-[52px] md:text-[60px] lg:text-[72px] leading-[0.98] tracking-tight text-[#1a1008]">
                    <span className="italic">{collection.title}</span>
                  </h3>

                  <p className="mt-7 max-w-md font-serif text-[14px] md:text-[15px] leading-[1.85] text-[#4a3a32]">
                    A {collection.subtitle.toLowerCase()} captured across{" "}
                    <span className="text-primary">{collection.images.length} photographs</span>{" "}
                    — every petal, every detail, made by hand.
                  </p>

                  <button
                    type="button"
                    onClick={() => openStory(collection)}
                    className="mt-9 inline-flex items-center gap-4 group cursor-pointer"
                    aria-label={`Open ${collection.title} — ${collection.images.length} photos`}
                  >
                    <span className="inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#1a1008] text-white group-hover:bg-primary transition-colors duration-300">
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.6} />
                    </span>
                    <span className="font-sans text-[11px] md:text-[12px] tracking-[0.32em] uppercase text-[#1a1008] group-hover:text-primary transition-colors duration-300">
                      Open the full story
                    </span>
                  </button>
                </div>

                {/* Triptych column */}
                <div className={["md:col-span-7", isReverse ? "md:order-1" : ""].join(" ")}>
                  <div
                    className={[
                      "flex gap-3 md:gap-4 lg:gap-5",
                      isReverse ? "flex-row-reverse" : "",
                    ].join(" ")}
                  >
                    {/* Tall hero image */}
                    <button
                      type="button"
                      onClick={() => openPhoto(collection, tallIdx)}
                      className="group relative block w-1/2 aspect-[3/4] overflow-hidden rounded-[14px] bg-primary-100 cursor-zoom-in shadow-[0_15px_45px_rgba(26,16,8,0.14)] hover:shadow-[0_30px_60px_rgba(26,16,8,0.28)] transition-shadow duration-500"
                      aria-label={`Open ${collection.title} photograph ${tallIdx + 1}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={buildSrc(collection.folder, tall)}
                        alt={`${collection.title} — preview ${tallIdx + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1300ms] ease-out group-hover:scale-[1.05]"
                      />
                      {/* Soft veil at bottom for caption legibility */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                      {/* Photo count badge — only on the tall hero */}
                      <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-sm">
                        <span className="font-sans text-[10px] tracking-[0.32em] uppercase text-[#1a1008]">
                          {collection.images.length} photos
                        </span>
                      </div>
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/40 transition-all duration-500" />
                    </button>

                    {/* Two stacked smaller images */}
                    <div className="flex w-1/2 flex-col gap-3 md:gap-4 lg:gap-5">
                      <button
                        type="button"
                        onClick={() => openPhoto(collection, topIdx)}
                        className="group relative block flex-1 overflow-hidden rounded-[14px] bg-primary-100 cursor-zoom-in shadow-[0_12px_36px_rgba(26,16,8,0.12)] hover:shadow-[0_22px_45px_rgba(26,16,8,0.22)] transition-shadow duration-500"
                        aria-label={`Open ${collection.title} photograph ${topIdx + 1}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={buildSrc(collection.folder, top)}
                          alt={`${collection.title} — preview ${topIdx + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1300ms] ease-out group-hover:scale-[1.05]"
                        />
                        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/40 transition-all duration-500" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openPhoto(collection, botIdx)}
                        className="group relative block flex-1 overflow-hidden rounded-[14px] bg-primary-100 cursor-zoom-in shadow-[0_12px_36px_rgba(26,16,8,0.12)] hover:shadow-[0_22px_45px_rgba(26,16,8,0.22)] transition-shadow duration-500"
                        aria-label={`Open ${collection.title} photograph ${botIdx + 1}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={buildSrc(collection.folder, bot)}
                          alt={`${collection.title} — preview ${botIdx + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1300ms] ease-out group-hover:scale-[1.05]"
                        />
                        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/40 transition-all duration-500" />
                      </button>
                    </div>
                  </div>

                  {/* Triptych caption row */}
                  <div
                    className={[
                      "mt-5 flex items-center gap-3 px-1",
                      isReverse ? "justify-end" : "",
                    ].join(" ")}
                  >
                    <span className="block h-px w-10 bg-primary/40" />
                    <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#a08778]">
                      a glimpse · tap any photo
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Closing bar */}
        <div className="gallery-reveal flex flex-col items-center mt-28 md:mt-36 text-center">
          <span className="block h-px w-16 bg-primary/40 mb-5" />
          <p className="font-serif italic text-[24px] md:text-[34px] text-[#1a1008] max-w-2xl">
            Every petal placed by hand. Every story, made to last.
          </p>
          <span className="block h-px w-16 bg-primary/40 mt-5" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────
       *  Story Viewer — full-screen overlay per chapter
       * ───────────────────────────────────────────── */}
      {openCollection && (
        <div
          className="fixed inset-0 z-[80] bg-[#fdf9f7] overflow-y-auto animate-[wgFadeIn_280ms_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-label={`${openCollection.title} — photo gallery`}
          data-lenis-prevent
        >
          {/* Sticky header */}
          <div className="sticky top-0 z-10 bg-[#fdf9f7]/85 backdrop-blur-md border-b border-[#1a1008]/10">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[72px] py-4 md:py-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-5 min-w-0">
                <span className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-primary whitespace-nowrap">
                  Chapter{" "}
                  {String(
                    collections.findIndex((c) => c.id === openCollection.id) + 1
                  ).padStart(2, "0")}
                </span>
                <span className="hidden sm:block h-px w-8 bg-primary/40" />
                <h3 className="font-serif italic text-[18px] md:text-[24px] text-[#1a1008] truncate">
                  {openCollection.title}
                </h3>
                <span className="hidden md:inline font-sans text-[10px] tracking-[0.32em] uppercase text-[#a08778] whitespace-nowrap">
                  {openCollection.images.length} photos
                </span>
              </div>
              <button
                type="button"
                onClick={closeStory}
                aria-label="Close gallery"
                className="inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-[#1a1008]/5 text-[#1a1008] hover:bg-[#1a1008]/15 transition-colors cursor-pointer flex-shrink-0"
              >
                <X className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>
          </div>

          {/* Story title block */}
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[72px] pt-12 md:pt-20 pb-10 md:pb-14 text-center">
            <p className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-primary mb-4">
              {openCollection.subtitle}
            </p>
            <h2 className="font-serif italic text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px] leading-[0.95] tracking-tight text-[#1a1008]">
              {openCollection.title}
            </h2>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="block h-px w-10 bg-primary/40" />
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#a08778]">
                {openCollection.images.length} photographs
              </span>
              <span className="block h-px w-10 bg-primary/40" />
            </div>
          </div>

          {/* Masonry — CSS columns for editorial rhythm */}
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[72px] pb-20 md:pb-28">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 [column-fill:_balance]">
              {openCollection.images.map((file, i) => (
                <button
                  key={file}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="group block w-full mb-4 md:mb-6 break-inside-avoid relative overflow-hidden rounded-[14px] bg-primary-100 cursor-zoom-in shadow-[0_8px_24px_rgba(26,16,8,0.08)] hover:shadow-[0_20px_40px_rgba(26,16,8,0.18)] transition-shadow duration-500"
                  aria-label={`Open photo ${i + 1} of ${openCollection.images.length}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={buildSrc(openCollection.folder, file)}
                    alt={`${openCollection.title} — photograph ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="block w-full h-auto object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-white/95">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(openCollection.images.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#1a1008]/0 group-hover:ring-[#1a1008]/15 transition-all duration-500" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────
       *  Lightbox — single-photo viewer
       * ───────────────────────────────────────────── */}
      {openCollection && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/92 backdrop-blur-sm animate-[wgFadeIn_220ms_ease-out]"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          data-lenis-prevent
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close photo"
          >
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>

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

          <div
            className="relative mx-4 md:mx-16 max-h-[88vh] max-w-[88vw] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={lightboxIndex}
              src={buildSrc(openCollection.folder, openCollection.images[lightboxIndex])}
              alt={`${openCollection.title} — photograph ${lightboxIndex + 1}`}
              className="max-h-[88vh] max-w-full w-auto h-auto object-contain shadow-2xl animate-[wgFadeIn_300ms_ease-out]"
            />
          </div>

          <div className="absolute bottom-5 md:bottom-8 left-0 right-0 flex justify-center pointer-events-none">
            <div className="px-4 py-2 rounded-full bg-black/55 text-white/95 font-serif text-[13px] tracking-wide flex items-center gap-3">
              <span className="italic">{openCollection.title}</span>
              <span className="opacity-50">·</span>
              <span className="font-sans text-[11px] tracking-[0.22em]">
                {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                {String(openCollection.images.length).padStart(2, "0")}
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

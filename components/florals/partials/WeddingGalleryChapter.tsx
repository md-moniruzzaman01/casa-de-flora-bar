"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const buildSrc = (folder: string, file: string) =>
  `${folder.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(file)}`;

type Collection = {
  id: string;
  title: string;
  subtitle: string;
  folder: string;
  images: string[];
};

interface WeddingGalleryChapterProps {
  collection: Collection;
  index: number;
  startIndex: number;
  onTileClick: (flatIndex: number) => void;
  initialVisibleCount?: number;
}

const WeddingGalleryChapter: React.FC<WeddingGalleryChapterProps> = ({
  collection: c,
  index,
  startIndex,
  onTileClick,
  initialVisibleCount,
}) => {
  const [expanded, setExpanded] = useState(false);

  const isCollapsible =
    typeof initialVisibleCount === "number" &&
    c.images.length > initialVisibleCount;

  const visibleImages =
    isCollapsible && !expanded
      ? c.images.slice(0, initialVisibleCount)
      : c.images;

  return (
    <article className="relative">
      {/* Chapter header */}
      <div className="gallery-reveal flex flex-col items-center text-center mb-7 md:mb-9">
        <div className="flex items-center gap-4 mb-5">
          <span className="block h-px w-10 md:w-16 bg-primary/40" />
          <span className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-primary">
            Chapter {String(index + 1).padStart(2, "0")}
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

      {/* Masonry grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 [column-fill:balance]">
        {visibleImages.map((file, i) => {
          const flatIndex = startIndex + i;
          return (
            <button
              key={`${c.id}-${file}`}
              type="button"
              onClick={() => onTileClick(flatIndex)}
              className="gallery-tile group relative mb-3 md:mb-4 block w-full min-h-[120px] break-inside-avoid overflow-hidden rounded-[14px] bg-primary-100 cursor-zoom-in shadow-[0_2px_18px_rgba(26,16,8,0.06)] hover:shadow-[0_18px_44px_rgba(26,16,8,0.18)] transition-shadow duration-500"
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

      {/* Show more / Show less */}
      {isCollapsible && (
        <div className="mt-8 md:mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-white/60 px-6 py-3 font-sans text-[11px] md:text-[12px] tracking-[0.32em] uppercase text-primary backdrop-blur-sm hover:bg-primary hover:text-white hover:border-primary transition-colors duration-300 cursor-pointer"
          >
            <span>
              {expanded
                ? "Show less"
                : `Show all ${c.images.length} photographs`}
            </span>
            {expanded ? (
              <ChevronUp
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                strokeWidth={1.6}
              />
            ) : (
              <ChevronDown
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                strokeWidth={1.6}
              />
            )}
          </button>
        </div>
      )}
    </article>
  );
};

export default WeddingGalleryChapter;

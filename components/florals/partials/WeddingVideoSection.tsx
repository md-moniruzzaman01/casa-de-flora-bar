'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

const VIDEO_SRC = '/florals/Fairytale Nigerian & Belize Wedding in Brooklyn.mp4';

const WeddingVideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      video.currentTime = 30;
      video.play().catch(() => {
        /* autoplay can be blocked — user can still press play */
      });
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onVolumeChange = () => setIsMuted(video.muted);

    video.addEventListener('loadedmetadata', handleLoaded);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('volumechange', onVolumeChange);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('volumechange', onVolumeChange);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
  };

  return (
    <section className="relative bg-white overflow-hidden py-20 md:py-28 lg:py-32">
      {/* Decorative pink blooms — match the gallery section's atmosphere */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[460px] h-[460px] rounded-full bg-primary-100 blur-3xl opacity-50" />
      <div className="pointer-events-none absolute -bottom-32 -right-40 w-[520px] h-[520px] rounded-full bg-primary-200 blur-3xl opacity-40" />

      <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[72px]">
        {/* Section heading — editorial style, mirrors WeddingGallerySection */}


        {/* Cinematic video card with corner-frame accents */}
        <div className="relative  mx-auto">
          {/* Corner brackets — pulls in the design system's corner-frame motif */}
          <span className="hidden md:block absolute -top-3 -left-3 h-10 w-10 border-t border-l border-primary/60" />
          <span className="hidden md:block absolute -top-3 -right-3 h-10 w-10 border-t border-r border-primary/60" />
          <span className="hidden md:block absolute -bottom-3 -left-3 h-10 w-10 border-b border-l border-primary/60" />
          <span className="hidden md:block absolute -bottom-3 -right-3 h-10 w-10 border-b border-r border-primary/60" />

          <div className="relative aspect-[16/9] overflow-hidden rounded-[18px] bg-black shadow-[0_30px_80px_rgba(26,16,8,0.18)]">
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Cinematic gradient veil for legibility */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/20" />

            {/* Top-left chapter label */}
            <div className="absolute top-5 left-5 md:top-7 md:left-7 flex items-center gap-3 z-10">
              <span className="block h-px w-8 bg-white/70" />
              <span className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-white/85">
                Chapter · Brooklyn
              </span>
            </div>

            {/* Bottom-left caption */}
            <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 max-w-[70%] z-10">
              <p className="font-serif italic text-white/95 text-[18px] md:text-[24px] leading-snug drop-shadow-md">
                Nigerian &amp; Belizean love, bloomed through florals.
              </p>
            </div>

            {/* Bottom-right controls */}
            <div className="absolute bottom-5 right-5 md:bottom-8 md:right-8 flex items-center gap-2.5 z-10">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                className="inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md hover:bg-white/30 transition-all cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" strokeWidth={1.6} />
                ) : (
                  <Play className="h-4 w-4 ml-0.5" strokeWidth={1.6} />
                )}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                className="inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md hover:bg-white/30 transition-all cursor-pointer"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" strokeWidth={1.6} />
                ) : (
                  <Volume2 className="h-4 w-4" strokeWidth={1.6} />
                )}
              </button>
            </div>
          </div>

          {/* Credits / CTA row beneath the card */}
          <div className="mt-10 md:mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between px-1">
            <div className="flex items-start gap-4">
              <span className="block h-px w-10 mt-3 bg-primary/40 flex-shrink-0" />
              <div>
                <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#a08778]">
                  Featured Wedding
                </p>
                <p className="mt-2 font-serif italic text-[20px] md:text-[24px] text-[#1a1008]">
                  Fairytale in Brooklyn
                </p>
              </div>
            </div>

            <a
              href="/florals#gallery"
              className="group inline-flex items-center gap-3 self-start md:self-end font-sans text-[11px] tracking-[0.32em] uppercase text-[#1a1008] hover:text-primary transition-colors"
            >
              <span>Watch the highlights</span>
              <span className="block h-px w-10 bg-current transition-all group-hover:w-16" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingVideoSection;

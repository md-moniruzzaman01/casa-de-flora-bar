"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { X } from 'lucide-react';
import type { SpecialEvent } from '@/components/admin/events/config/types';

export default function EventPopup() {
  const [event,   setEvent]   = useState<SpecialEvent | null>(null);
  const [visible, setVisible] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const bannerRef  = useRef<HTMLDivElement>(null);

  // Fetch the first currently active event
  useEffect(() => {
    fetch('/api/events', { cache: 'no-store' })
      .then((r) => r.json())
      .then(({ events = [] }: { events: SpecialEvent[] }) => {
        const now = new Date();
        const active = events.find((e) => {
          if (!e.isActive) return false;
          const start = new Date(e.startDate);
          const end   = new Date(e.endDate + 'T23:59:59');
          if (now < start || now > end) return false;
          return !sessionStorage.getItem(`promo-dismissed-${e.id}`);
        });
        if (active) setEvent(active);
      })
      .catch(() => {});
  }, []);

  // Delay appearance slightly so page has time to render
  useEffect(() => {
    if (!event) return;
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, [event]);

  // GSAP entrance
  useEffect(() => {
    if (!visible || !event) return;

    if (event.template === 'popup' && overlayRef.current && cardRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'none' });
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.4)', delay: 0.1 },
      );
    }

    if (event.template === 'banner' && bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { y: -64, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      );
    }
  }, [visible, event]);

  const dismiss = () => {
    if (!event) return;
    sessionStorage.setItem(`promo-dismissed-${event.id}`, '1');

    if (event.template === 'popup' && cardRef.current && overlayRef.current) {
      gsap.to(cardRef.current,    { y: 20, opacity: 0, scale: 0.95, duration: 0.25 });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.1, onComplete: () => setVisible(false) });
    } else if (event.template === 'banner' && bannerRef.current) {
      gsap.to(bannerRef.current,  { y: -64, opacity: 0, duration: 0.4, onComplete: () => setVisible(false) });
    } else {
      setVisible(false);
    }
  };

  if (!event || !visible) return null;

  const { bgColor, accentColor, textColor } = event;

  // ── Banner ──────────────────────────────────────────────────────────
  if (event.template === 'banner') {
    return (
      <div
        ref={bannerRef}
        className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between px-4 md:px-8 py-2.5 gap-4 text-sm shadow-md"
        style={{ background: bgColor, color: textColor }}
      >
        {event.discount && (
          <span
            className="flex-shrink-0 text-[11px] font-black px-2.5 py-1 rounded-full"
            style={{ background: accentColor, color: '#fff' }}
          >
            {event.discount}
          </span>
        )}
        <p className="flex-1 font-semibold text-center truncate text-sm">
          {event.title}
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href={event.ctaLink}
            onClick={dismiss}
            className="text-[11px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-opacity hover:opacity-80"
            style={{ background: accentColor, color: '#fff' }}
          >
            {event.ctaText}
          </Link>
          <button
            onClick={dismiss}
            className="opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ── Popup ────────────────────────────────────────────────────────────
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div
        ref={cardRef}
        className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: bgColor, color: textColor }}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
          style={{ background: textColor + '15', color: textColor }}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 md:p-10">
          {/* Discount badge */}
          {event.discount && (
            <div className="mb-6">
              <span
                className="inline-block text-sm font-black px-4 py-2 rounded-full tracking-wide"
                style={{ background: accentColor, color: '#fff' }}
              >
                {event.discount}
              </span>
            </div>
          )}

          {/* Copy */}
          <div className="mb-7 space-y-2">
            {event.subtitle && (
              <p className="text-xs uppercase tracking-widest opacity-60 font-medium">
                {event.subtitle}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl font-serif leading-tight">
              {event.title}
            </h2>
            <p className="text-sm leading-relaxed opacity-70">
              {event.description}
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={event.ctaLink}
              onClick={dismiss}
              className="flex-1 text-center py-3.5 rounded-xl text-sm font-bold tracking-wide transition-opacity hover:opacity-90"
              style={{ background: accentColor, color: '#fff' }}
            >
              {event.ctaText}
            </Link>
            <button
              onClick={dismiss}
              className="flex-1 sm:flex-none sm:px-6 py-3.5 rounded-xl text-sm font-medium transition-colors"
              style={{ background: textColor + '10', color: textColor }}
            >
              Maybe later
            </button>
          </div>
        </div>

        {/* Decorative circles */}
        <div
          className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-20 pointer-events-none"
          style={{ background: accentColor }}
        />
        <div
          className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full opacity-10 pointer-events-none"
          style={{ background: accentColor }}
        />
      </div>
    </div>
  );
}

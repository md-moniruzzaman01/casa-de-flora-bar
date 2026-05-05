"use client";

import type { EventFormData } from '../config/types';

export default function EventPreview({ data }: { data: Partial<EventFormData> }) {
  const {
    template    = 'popup',
    bgColor     = '#FDE8E9',
    accentColor = '#ED80A8',
    textColor   = '#1a1a1a',
    discount,
    title,
    subtitle,
    description,
    ctaText,
  } = data;

  if (template === 'banner') {
    return (
      <div
        className="w-full rounded-xl overflow-hidden shadow-sm"
        style={{ background: bgColor, color: textColor }}
      >
        <div className="flex items-center gap-3 px-4 py-3 text-sm">
          {discount && (
            <span
              className="flex-shrink-0 text-[11px] font-black px-2.5 py-1 rounded-full"
              style={{ background: accentColor, color: '#fff' }}
            >
              {discount}
            </span>
          )}
          <span className="flex-1 font-semibold text-sm truncate">
            {title || 'Your banner title here'}
          </span>
          {ctaText && (
            <span
              className="flex-shrink-0 text-[11px] font-bold px-3 py-1.5 rounded-lg"
              style={{ background: accentColor, color: '#fff' }}
            >
              {ctaText}
            </span>
          )}
          <span className="opacity-40 text-sm">✕</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-2xl overflow-hidden shadow-lg relative"
      style={{ background: bgColor, color: textColor }}
    >
      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          {discount ? (
            <span
              className="text-xs font-black px-3 py-1 rounded-full"
              style={{ background: accentColor, color: '#fff' }}
            >
              {discount}
            </span>
          ) : <span />}
          <span className="opacity-30 text-sm cursor-pointer">✕</span>
        </div>

        <div className="mb-5 space-y-1.5">
          {subtitle && (
            <p className="text-[10px] uppercase tracking-widest opacity-50 font-medium">
              {subtitle}
            </p>
          )}
          <h3 className="text-xl font-serif leading-tight">
            {title || 'Your event title here'}
          </h3>
          {description && (
            <p className="text-xs leading-relaxed opacity-60 line-clamp-3">
              {description}
            </p>
          )}
        </div>

        {ctaText && (
          <button
            className="w-full py-2.5 rounded-xl text-xs font-bold tracking-wide"
            style={{ background: accentColor, color: '#fff' }}
          >
            {ctaText}
          </button>
        )}
      </div>

      {/* Decorative circles */}
      <div
        className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full opacity-20 pointer-events-none"
        style={{ background: accentColor }}
      />
      <div
        className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10 pointer-events-none"
        style={{ background: accentColor }}
      />
    </div>
  );
}

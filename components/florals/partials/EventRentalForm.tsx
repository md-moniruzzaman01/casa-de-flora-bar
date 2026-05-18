"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, Video, Check } from 'lucide-react';
import InquiryForm from '@/components/shared/Form/partials/InquiryForm';
import VirtualConsultationScheduler from './VirtualConsultationScheduler';

type ConsultType = 'in-person' | 'virtual' | '';

const TYPE_OPTIONS = [
  {
    id:   'in-person' as const,
    Icon: MapPin,
    title: 'In-Person Meeting',
    sub:   'Our Bloomfield, NJ studio',
    body:  'Meet Maritza face-to-face. See live floral samples and walk through your vision in our studio.',
    tags:  ['Studio visit', '30–60 min', 'Free'],
  },
  {
    id:   'virtual' as const,
    Icon: Video,
    title: 'Virtual Consultation',
    sub:   'Via Zoom — anywhere, anytime',
    body:  "Pick a date and time that works for you. We'll send a Zoom link directly to your inbox.",
    tags:  ['Via Zoom', '30 min', 'Free'],
  },
] as const;

function PickTypePrompt({ onSelect }: { onSelect: (t: ConsultType) => void }) {
  return (
    <section className="bg-white">

      {/* ── Header — warm cream, matches confirmation strips ────────────── */}
      <div className="bg-[#FFFBFA] border-b border-[#EDD8DC] text-center px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <span className="inline-block text-[10px] tracking-[0.24em] uppercase text-primary font-sans mb-5">
          Book a Consultation
        </span>
        <h2 className="font-serif text-5xl md:text-7xl text-[#1a1a1a] leading-[1.04] mb-7">
          How would you<br />like to meet?
        </h2>
        <div className="flex items-center justify-center gap-4 mb-7">
          <div className="w-16 h-px bg-[#EDD8DC]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#EDD8DC]" />
          <div className="w-1 h-1 rounded-full bg-[#EDD8DC]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#EDD8DC]" />
          <div className="w-16 h-px bg-[#EDD8DC]" />
        </div>
        <p className="text-[13px] text-gray-400 font-sans leading-relaxed max-w-xs mx-auto tracking-wide">
          Both options are free and personal —<br className="hidden sm:block" /> choose whatever feels right for you.
        </p>
      </div>

      {/* ── Full-width split panels — cream bg, hover to white ──────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#EDD8DC]">
        {TYPE_OPTIONS.map(({ id, Icon, title, sub, body, tags }, idx) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={[
              'group relative text-left px-10 py-16 md:px-14 md:py-20',
              'bg-[#FFFBFA] hover:bg-white transition-colors duration-300',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#EDD8DC]',
              idx === 0 ? 'border-b md:border-b-0 md:border-r border-[#EDD8DC]' : '',
            ].join(' ')}
          >
            {/* Decorative number — matches border token */}
            <span
              aria-hidden="true"
              className="absolute top-8 right-8 md:top-10 md:right-10 font-serif leading-none text-[#EDD8DC] select-none pointer-events-none"
              style={{ fontSize: 'clamp(80px, 9vw, 120px)' }}
            >
              0{idx + 1}
            </span>

            {/* Icon ring — shadow-sm matches header strip */}
            <div className="relative z-10 w-14 h-14 rounded-full border border-[#EDD8DC] bg-white shadow-sm flex items-center justify-center mb-8 group-hover:border-[#1a1a1a]/20 transition-colors duration-300">
              <Icon size={20} strokeWidth={1.4} className="text-primary" />
            </div>

            {/* Title */}
            <p className="relative z-10 font-serif text-4xl md:text-[2.6rem] text-[#1a1a1a] leading-[1.08] mb-2">
              {title}
            </p>

            {/* Sub */}
            <p className="relative z-10 text-[10px] tracking-[0.24em] uppercase text-primary font-sans mb-5">
              {sub}
            </p>

            {/* Description */}
            <p className="relative z-10 text-sm text-gray-400 font-sans leading-relaxed max-w-xs mb-6">
              {body}
            </p>

            {/* Info tags — same pill style as header strips & slot card */}
            <div className="relative z-10 flex flex-wrap gap-2 mb-10">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] tracking-[0.16em] uppercase font-sans text-gray-500 border border-[#EDD8DC] bg-white px-3 py-1.5 group-hover:border-[#1a1a1a]/15 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA row */}
            <div className="relative z-10 flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.2em] font-sans text-[#1a1a1a] group-hover:text-primary transition-colors duration-300">
                Select
              </span>
              <span className="text-[#1a1a1a] group-hover:text-primary group-hover:translate-x-1.5 transition-all duration-300 inline-block text-sm">
                →
              </span>
            </div>
          </button>
        ))}
      </div>

    </section>
  );
}

const EventRentalSection = () => {
  const [consultType, setConsultType] = useState<ConsultType>('');

  useEffect(() => {
    const handler = (e: Event) => {
      const type = (e as CustomEvent<string>).detail;
      if (type === 'in-person' || type === 'virtual') {
        setConsultType(type);
      }
    };
    window.addEventListener('setConsultType', handler);
    return () => window.removeEventListener('setConsultType', handler);
  }, []);

  return (
    <div id="eventbook">
      {consultType === '' && (
        <PickTypePrompt onSelect={setConsultType} />
      )}

      {consultType === 'in-person' && (
        <div>
          {/* ── Selection confirmation header ─────────────────────────── */}
          <div className="bg-[#FFFBFA] border-b border-[#EDD8DC]">
            <div className="px-6 py-8 md:py-10 md:px-12 lg:px-24 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">

                {/* Left: icon + details */}
                <div className="flex items-start gap-5">
                  {/* Icon with check badge */}
                  <div className="relative flex-shrink-0 mt-0.5">
                    <div className="w-14 h-14 rounded-full border border-[#EDD8DC] bg-white flex items-center justify-center shadow-sm">
                      <MapPin size={20} strokeWidth={1.4} className="text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#FFFBFA]">
                      <Check size={10} strokeWidth={3} className="text-white" />
                    </div>
                  </div>

                  <div>
                    <p className="font-serif text-2xl md:text-3xl text-[#1a1a1a] leading-none mb-2">
                      In-Person Meeting
                    </p>
                    <p className="text-[10px] tracking-[0.24em] uppercase text-primary font-sans mb-4">
                      Bloomfield, NJ &nbsp;·&nbsp; Our Studio
                    </p>
                    {/* Info tags */}
                    <div className="flex flex-wrap gap-2">
                      {['Free consultation', 'Studio visit', '30–60 min'].map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] tracking-[0.16em] uppercase font-sans text-gray-500 border border-[#EDD8DC] bg-white px-3 py-1.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: change button */}
                <button
                  onClick={() => setConsultType('')}
                  className="group flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-sans text-gray-400 hover:text-[#1a1a1a] transition-colors duration-200 flex-shrink-0 sm:mt-1 self-start"
                >
                  <span className="group-hover:-translate-x-0.5 transition-transform duration-200 inline-block">
                    ←
                  </span>
                  Change format
                </button>

              </div>
            </div>
          </div>

          <InquiryForm />
        </div>
      )}

      {consultType === 'virtual' && (
        <div>
          {/* ── Selection confirmation header ─────────────────────────── */}
          <div className="bg-[#FFFBFA] border-b border-[#EDD8DC]">
            <div className="px-6 py-8 md:py-10 md:px-12 lg:px-24 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">

                {/* Left: icon + details */}
                <div className="flex items-start gap-5">
                  {/* Icon with check badge */}
                  <div className="relative flex-shrink-0 mt-0.5">
                    <div className="w-14 h-14 rounded-full border border-[#EDD8DC] bg-white flex items-center justify-center shadow-sm">
                      <Video size={20} strokeWidth={1.4} className="text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#FFFBFA]">
                      <Check size={10} strokeWidth={3} className="text-white" />
                    </div>
                  </div>

                  <div>
                    <p className="font-serif text-2xl md:text-3xl text-[#1a1a1a] leading-none mb-2">
                      Virtual Consultation
                    </p>
                    <p className="text-[10px] tracking-[0.24em] uppercase text-primary font-sans mb-4">
                      Via Zoom &nbsp;·&nbsp; Anywhere, anytime
                    </p>
                    {/* Info tags */}
                    <div className="flex flex-wrap gap-2">
                      {['Free consultation', 'Via Zoom', '30 min'].map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] tracking-[0.16em] uppercase font-sans text-gray-500 border border-[#EDD8DC] bg-white px-3 py-1.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: change button */}
                <button
                  onClick={() => setConsultType('')}
                  className="group flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-sans text-gray-400 hover:text-[#1a1a1a] transition-colors duration-200 flex-shrink-0 sm:mt-1 self-start"
                >
                  <span className="group-hover:-translate-x-0.5 transition-transform duration-200 inline-block">
                    ←
                  </span>
                  Change format
                </button>

              </div>
            </div>
          </div>

          {/* ── Scheduler ─────────────────────────────────────────────── */}
          <section className="bg-white py-12 px-6 md:py-20 md:px-12 lg:px-24">
            <div className="max-w-5xl mx-auto">
              <VirtualConsultationScheduler />
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default EventRentalSection;

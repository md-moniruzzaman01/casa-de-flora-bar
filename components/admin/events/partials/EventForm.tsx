"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import type { EventFormData } from '../config/types';
import {
  DEFAULT_FORM_VALUES,
  PRESETS,
  COLOR_PRESETS,
  TYPE_OPTIONS,
  TEMPLATE_OPTIONS,
  LINK_OPTIONS,
} from '../config/constant';
import EventPreview from './EventPreview';

interface EventFormProps {
  defaultValues?: EventFormData;
  eventId?: string;
}

export default function EventForm({ defaultValues = DEFAULT_FORM_VALUES, eventId }: EventFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const isEditing = !!eventId;

  const { register, handleSubmit, watch, setValue } = useForm<EventFormData>({ defaultValues });

  const formValues   = watch();
  const bgColor      = watch('bgColor');
  const accentColor  = watch('accentColor');
  const textColor    = watch('textColor');

  const onSubmit = async (data: EventFormData) => {
    setSaving(true);
    try {
      const url    = isEditing ? `/api/events/${eventId}` : '/api/events';
      const method = isEditing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push('/events');
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    (Object.entries(preset.data) as [keyof EventFormData, EventFormData[keyof EventFormData]][])
      .forEach(([k, v]) => setValue(k, v));
  };

  const applyColorPreset = (cp: typeof COLOR_PRESETS[0]) => {
    setValue('bgColor', cp.bg);
    setValue('accentColor', cp.accent);
    setValue('textColor', cp.text);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8">

      {/* ── Form ── */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Presets */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
            Quick Presets
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => applyPreset(p)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Template picker */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
            Display Template
          </p>
          <div className="grid grid-cols-2 gap-3">
            {TEMPLATE_OPTIONS.map((t) => (
              <label
                key={t.value}
                className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${
                  formValues.template === t.value
                    ? 'border-rose-400 bg-rose-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  {...register('template')}
                  value={t.value}
                  className="sr-only"
                />
                <p className="font-semibold text-sm text-gray-800">{t.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.desc}</p>
              </label>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Content</p>

          {/* Type */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Event Type</label>
            <div className="flex flex-wrap gap-2">
              {TYPE_OPTIONS.map((t) => (
                <label
                  key={t.value}
                  className="cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all"
                  style={
                    formValues.type === t.value
                      ? { background: t.bg, color: t.color, borderColor: t.color }
                      : { background: '#fff', color: '#9ca3af', borderColor: '#e5e7eb' }
                  }
                >
                  <input
                    type="radio"
                    {...register('type')}
                    value={t.value}
                    className="sr-only"
                  />
                  {t.label}
                </label>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Title <span className="text-rose-400">*</span>
            </label>
            <input
              {...register('title', { required: true })}
              placeholder="e.g. Valentine's Day Special 💐"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle</label>
            <input
              {...register('subtitle')}
              placeholder="e.g. Love is in the air"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Description <span className="text-rose-400">*</span>
            </label>
            <textarea
              {...register('description', { required: true })}
              rows={3}
              placeholder="Short description shown to visitors..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 resize-none"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Discount Badge{' '}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              {...register('discount')}
              placeholder="e.g.  20% OFF  ·  BOGO  ·  FREE SHIPPING"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Call to Action
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Button Text <span className="text-rose-400">*</span>
              </label>
              <input
                {...register('ctaText', { required: true })}
                placeholder="e.g. Book Now"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Link To
              </label>
              <select
                {...register('ctaLink')}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 bg-white"
              >
                {LINK_OPTIONS.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Schedule</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Start Date <span className="text-rose-400">*</span>
              </label>
              <input
                type="date"
                {...register('startDate', { required: true })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                End Date <span className="text-rose-400">*</span>
              </label>
              <input
                type="date"
                {...register('endDate', { required: true })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200"
              />
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Style</p>

          <div>
            <p className="text-xs font-medium text-gray-600 mb-2">Color Presets</p>
            <div className="flex flex-wrap gap-2">
              {COLOR_PRESETS.map((cp) => (
                <button
                  key={cp.name}
                  type="button"
                  onClick={() => applyColorPreset(cp)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 hover:border-rose-300 transition-colors"
                >
                  <span className="w-3 h-3 rounded-full" style={{ background: cp.bg, border: '1px solid #e5e7eb' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: cp.accent }} />
                  {cp.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Background color */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Background</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor || '#FDE8E9'}
                  onChange={(e) => setValue('bgColor', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-gray-200 p-0.5 bg-white"
                />
                <input
                  {...register('bgColor')}
                  className="flex-1 px-2 py-1.5 text-[11px] border border-gray-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-rose-200"
                />
              </div>
            </div>
            {/* Accent color */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Accent</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accentColor || '#ED80A8'}
                  onChange={(e) => setValue('accentColor', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-gray-200 p-0.5 bg-white"
                />
                <input
                  {...register('accentColor')}
                  className="flex-1 px-2 py-1.5 text-[11px] border border-gray-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-rose-200"
                />
              </div>
            </div>
            {/* Text color */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Text</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={textColor || '#1a1a1a'}
                  onChange={(e) => setValue('textColor', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-gray-200 p-0.5 bg-white"
                />
                <input
                  {...register('textColor')}
                  className="flex-1 px-2 py-1.5 text-[11px] border border-gray-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-rose-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Active + Save */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative">
              <input
                type="checkbox"
                {...register('isActive')}
                className="sr-only peer"
              />
              <div className="w-10 h-6 rounded-full bg-gray-200 peer-checked:bg-rose-400 transition-colors duration-200" />
              <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-4" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Active — show on website
            </span>
          </label>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 text-sm font-semibold text-white rounded-xl transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: '#ED80A8' }}
            >
              {saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Event'}
            </button>
          </div>
        </div>
      </form>

      {/* ── Live Preview ── */}
      <div className="xl:sticky xl:top-6 self-start space-y-3">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          Live Preview
        </p>
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
          <EventPreview data={formValues} />
        </div>
        <p className="text-[11px] text-gray-400 text-center">
          Preview updates as you type
        </p>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from 'react';
import { apiFetch } from './api';

export interface FormConfig {
  maxPartySize: number;
  sessionDurationMin: number;
  bookingWindowDays: number;
  cancelNoticeHours: number;
  openDays: string[];                    // e.g. ["THURSDAY","FRIDAY","SATURDAY","SUNDAY"]
  slotsByDay: Record<string, string[]>;  // e.g. { SATURDAY: ["10:00 AM","11:30 AM",...] }
  bouquetTypes: string[];                // e.g. ["ROSE","MIXED",...]
  eventTypes: string[];                  // e.g. ["WEDDING","BIRTHDAY",...]
  eventServicePackages: string[];        // e.g. ["Rental Only","All Inclusive",...]
}

const JS_WEEKDAY = [
  'SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY',
];

export const toWeekday = (year: number, month: number, day: number): string =>
  JS_WEEKDAY[new Date(year, month, day).getDay()];

// Module-level cache so all components share one fetch
let _cache: FormConfig | null = null;
let _inflight: Promise<FormConfig> | null = null;

async function load(): Promise<FormConfig> {
  if (_cache) return _cache;
  if (!_inflight) {
    _inflight = apiFetch<{ data: FormConfig }>('/api/form-config')
      .then((r) => { _cache = r.data; return r.data; })
      .finally(() => { _inflight = null; });
  }
  return _inflight;
}

export function useFormConfig() {
  const [config, setConfig] = useState<FormConfig | null>(_cache);
  const [loading, setLoading] = useState(!_cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (_cache) { setConfig(_cache); setLoading(false); return; }
    load()
      .then((c) => { setConfig(c); setLoading(false); })
      .catch((e: { message?: string }) => {
        setError(e.message ?? 'Failed to load config');
        setLoading(false);
      });
  }, []);

  return { config, loading, error };
}

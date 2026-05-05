"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import EventForm from '@/components/admin/events/partials/EventForm';
import type { SpecialEvent, EventFormData } from '@/components/admin/events/config/types';
import { RefreshCw } from 'lucide-react';

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const [event,   setEvent]   = useState<SpecialEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    fetch('/api/events', { cache: 'no-store' })
      .then((r) => r.json())
      .then(({ events }: { events: SpecialEvent[] }) => {
        const found = events.find((e) => e.id === id) ?? null;
        setEvent(found);
        if (!found) setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <RefreshCw className="w-5 h-5 text-gray-300 animate-spin" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Promotion not found.</p>
      </div>
    );
  }

  const defaultValues: EventFormData = {
    title:       event.title,
    subtitle:    event.subtitle,
    description: event.description,
    discount:    event.discount,
    ctaText:     event.ctaText,
    ctaLink:     event.ctaLink,
    type:        event.type,
    template:    event.template,
    bgColor:     event.bgColor,
    accentColor: event.accentColor,
    textColor:   event.textColor,
    startDate:   event.startDate,
    endDate:     event.endDate,
    isActive:    event.isActive,
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="px-8 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Edit Promotion</h1>
          <p className="text-sm text-gray-500 mt-1">Update your promotion details and schedule.</p>
        </div>
        <EventForm defaultValues={defaultValues} eventId={id} />
      </div>
    </div>
  );
}

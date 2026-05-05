"use client";

import Link from 'next/link';
import { Plus } from 'lucide-react';
import EventsList from '@/components/admin/events/partials/EventsList';

export default function EventsPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="px-8 py-6 space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Special Events & Promotions</h1>
            <p className="text-sm text-gray-500 mt-1">
              Create holiday deals, flash sales, and announcements — they appear as popups or
              banners on your homepage automatically.
            </p>
          </div>
          <Link
            href="/events/create"
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition-opacity flex-shrink-0"
            style={{ background: '#ED80A8' }}
          >
            <Plus className="w-4 h-4" />
            New Promotion
          </Link>
        </div>

        {/* How-it-works callout */}
        <div className="bg-rose-50 border border-rose-100 rounded-2xl px-5 py-4 flex items-start gap-3">
          <span className="text-xl flex-shrink-0">💡</span>
          <p className="text-sm text-gray-600">
            <strong className="text-gray-800">How it works:</strong> Set a start &amp; end date,
            pick a template (popup or banner), and toggle{' '}
            <em>Active</em> on. Visitors see the promotion on the homepage within the date window —
            once per session.
          </p>
        </div>

        {/* Promotions list */}
        <EventsList />
      </div>
    </div>
  );
}

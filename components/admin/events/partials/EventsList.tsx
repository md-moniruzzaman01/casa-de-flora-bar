"use client";

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, ToggleLeft, ToggleRight, Plus, RefreshCw } from 'lucide-react';
import type { SpecialEvent, EventStatus } from '../config/types';
import { getEventStatus, TYPE_OPTIONS } from '../config/constant';

const STATUS_STYLES: Record<EventStatus, { bg: string; color: string; dot: string; label: string }> = {
  active:    { bg: '#D1FAE5', color: '#059669', dot: '#10b981', label: 'Active' },
  scheduled: { bg: '#DBEAFE', color: '#2563EB', dot: '#3b82f6', label: 'Scheduled' },
  expired:   { bg: '#F3F4F6', color: '#6B7280', dot: '#9ca3af', label: 'Expired' },
  draft:     { bg: '#FEF3C7', color: '#D97706', dot: '#f59e0b', label: 'Draft' },
};

const FILTER_TABS: (EventStatus | 'all')[] = ['all', 'active', 'scheduled', 'expired', 'draft'];

export default function EventsList() {
  const [events,  setEvents]  = useState<SpecialEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState<EventStatus | 'all'>('all');

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/events', { cache: 'no-store' });
      const { events: data } = await res.json() as { events: SpecialEvent[] };
      setEvents(data ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const toggleActive = async (event: SpecialEvent) => {
    await fetch(`/api/events/${event.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...event, isActive: !event.isActive }),
    });
    fetchEvents();
  };

  const deleteEvent = async (id: string) => {
    if (!confirm('Delete this promotion? This cannot be undone.')) return;
    await fetch(`/api/events/${id}`, { method: 'DELETE' });
    fetchEvents();
  };

  const filtered = filter === 'all'
    ? events
    : events.filter((e) => getEventStatus(e) === filter);

  const counts = {
    all:       events.length,
    active:    events.filter((e) => getEventStatus(e) === 'active').length,
    scheduled: events.filter((e) => getEventStatus(e) === 'scheduled').length,
    expired:   events.filter((e) => getEventStatus(e) === 'expired').length,
    draft:     events.filter((e) => getEventStatus(e) === 'draft').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-5 h-5 text-gray-300 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex items-center gap-2">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
              filter === tab
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab} {counts[tab] > 0 && <span className="opacity-60">({counts[tab]})</span>}
          </button>
        ))}
        <button
          onClick={fetchEvents}
          className="ml-auto p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-400 text-sm mb-4">
            {filter === 'all'
              ? 'No promotions yet. Create your first one!'
              : `No ${filter} promotions.`}
          </p>
          {filter === 'all' && (
            <Link
              href="/events/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition-opacity"
              style={{ background: '#ED80A8' }}
            >
              <Plus className="w-4 h-4" />
              Create Promotion
            </Link>
          )}
        </div>
      )}

      {/* Table */}
      {filtered.length > 0 && (
        <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Promotion', 'Type', 'Template', 'Schedule', 'Status', 'Active', ''].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((event) => {
                const status     = getEventStatus(event);
                const ss         = STATUS_STYLES[status];
                const typeOption = TYPE_OPTIONS.find((t) => t.value === event.type);

                return (
                  <tr key={event.id} className="hover:bg-gray-50/50 transition-colors group">
                    {/* Promotion */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex-shrink-0 border-2"
                          style={{ background: event.bgColor, borderColor: event.accentColor + '60' }}
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate max-w-52">
                            {event.title}
                          </p>
                          {event.discount && (
                            <span
                              className="text-[11px] font-bold px-1.5 py-0.5 rounded-md"
                              style={{ background: event.accentColor + '20', color: event.accentColor }}
                            >
                              {event.discount}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-5 py-4">
                      <span
                        className="text-[11px] font-semibold px-2 py-1 rounded-md"
                        style={{ background: typeOption?.bg ?? '#f3f4f6', color: typeOption?.color ?? '#6b7280' }}
                      >
                        {typeOption?.label ?? event.type}
                      </span>
                    </td>

                    {/* Template */}
                    <td className="px-5 py-4 text-xs text-gray-500 capitalize">{event.template}</td>

                    {/* Schedule */}
                    <td className="px-5 py-4">
                      <p className="text-xs text-gray-600">{event.startDate}</p>
                      <p className="text-xs text-gray-400">→ {event.endDate}</p>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                        style={{ background: ss.bg, color: ss.color }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: ss.dot }} />
                        {ss.label}
                      </span>
                    </td>

                    {/* Toggle */}
                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleActive(event)}
                        className="transition-transform hover:scale-110"
                        title={event.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {event.isActive
                          ? <ToggleRight className="w-6 h-6 text-rose-400" />
                          : <ToggleLeft  className="w-6 h-6 text-gray-300" />}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/events/${event.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'special-events.json');

function readEvents(): ({ id: string } & Record<string, unknown>)[] {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return (JSON.parse(raw) as { events: ({ id: string } & Record<string, unknown>)[] }).events ?? [];
}

function writeEvents(events: object[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ events }, null, 2));
}

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json() as Record<string, unknown>;
    const events = readEvents();
    const idx = events.findIndex((e) => e.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    events[idx] = { ...events[idx], ...body, updatedAt: new Date().toISOString() };
    writeEvents(events);
    return NextResponse.json({ event: events[idx] });
  } catch {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const events = readEvents();
    writeEvents(events.filter((e) => e.id !== id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}

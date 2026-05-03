import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const DATA_FILE = path.join(process.cwd(), 'data', 'special-events.json');

function readEvents(): object[] {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify({ events: [] }, null, 2));
  }
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return (JSON.parse(raw) as { events: object[] }).events ?? [];
}

function writeEvents(events: object[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ events }, null, 2));
}

export async function GET() {
  try {
    return NextResponse.json({ events: readEvents() });
  } catch {
    return NextResponse.json({ error: 'Failed to read events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as object;
    const events = readEvents();
    const now = new Date().toISOString();
    const newEvent = { ...body, id: randomUUID(), createdAt: now, updatedAt: now };
    events.push(newEvent);
    writeEvents(events);
    return NextResponse.json({ event: newEvent }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

"use client";

import React, { useState } from "react";
import { Save } from "lucide-react";

// ── Types & Constants ─────────────────────────────────────────────────────────

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"] as const;

interface DayHours {
  open:   string;
  close:  string;
  closed: boolean;
}

const DEFAULT_HOURS: Record<string, DayHours> = {
  Monday:    { open: "10:00", close: "22:00", closed: false },
  Tuesday:   { open: "10:00", close: "22:00", closed: false },
  Wednesday: { open: "10:00", close: "22:00", closed: false },
  Thursday:  { open: "10:00", close: "22:00", closed: false },
  Friday:    { open: "10:00", close: "23:00", closed: false },
  Saturday:  { open: "09:00", close: "23:00", closed: false },
  Sunday:    { open: "09:00", close: "21:00", closed: false },
};

// ── Toggle ────────────────────────────────────────────────────────────────────

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      className={`w-9 h-5 rounded-full flex items-center px-0.5 cursor-pointer flex-shrink-0 transition-colors ${on ? "bg-pink-400" : "bg-gray-200"}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-4" : ""}`} />
    </div>
  );
}

// ── Text input ────────────────────────────────────────────────────────────────

function Field({
  label, value, onChange, type = "text", suffix, rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  suffix?: string;
  rows?: number;
}) {
  const base =
    "w-full border border-gray-200 px-3.5 py-2.5 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-pink-300 focus:border-pink-300 transition-all";

  return (
    <div>
      <label className="text-xs text-gray-600 block mb-1.5">{label}</label>
      <div className="relative">
        {rows ? (
          <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            rows={rows}
            className={`${base} resize-none`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            className={base}
          />
        )}
        {suffix && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────

function Section({ title, sub, children }: {
  title: string; sub: string; children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
      </div>
      {children}
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function SettingPage() {
  // ── Restaurant info ────────────────────────────────────────────────────────
  const [resName,  setResName]  = useState("Casa de Flora Bar");
  const [address,  setAddress]  = useState("Bloomfield, NJ 07003");
  const [phone,    setPhone]    = useState("+1 (973) 555-0100");
  const [email,    setEmail]    = useState("hello@casadeflora.com");
  const [bio,      setBio]      = useState("A cozy floral-themed bar & brunch spot in the heart of Bloomfield, NJ.");

  // ── Hours ──────────────────────────────────────────────────────────────────
  const [hours, setHours] = useState<Record<string, DayHours>>(DEFAULT_HOURS);

  function updateHours(day: string, field: keyof DayHours, value: string | boolean) {
    setHours(h => ({ ...h, [day]: { ...h[day], [field]: value } }));
  }

  // ── Reservation settings ───────────────────────────────────────────────────
  const [maxParty,      setMaxParty]      = useState("12");
  const [bookingWindow, setBookingWindow] = useState("30");
  const [sessionDur,    setSessionDur]    = useState("90");
  const [cancelNotice,  setCancelNotice]  = useState("24");

  // ── Notifications ──────────────────────────────────────────────────────────
  const [notifs, setNotifs] = useState({
    newBooking:    true,
    cancellation:  true,
    reminder:      false,
    weeklyReport:  true,
  });

  function toggleNotif(key: keyof typeof notifs) {
    setNotifs(n => ({ ...n, [key]: !n[key] }));
  }

  // ── Save ───────────────────────────────────────────────────────────────────
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  return (
    <div className="flex-1 bg-white min-h-screen">
      <main className="max-w-3xl mx-auto px-8 py-7 flex flex-col gap-8">

        {/* ── Restaurant Info ── */}
        <Section title="Restaurant Info" sub="Basic details shown on the public website">
          <div className="space-y-4">
            <Field label="Restaurant Name" value={resName}  onChange={setResName} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Phone"         value={phone}    onChange={setPhone} type="tel" />
              <Field label="Email"         value={email}    onChange={setEmail} type="email" />
            </div>
            <Field label="Address"         value={address}  onChange={setAddress} />
            <Field label="Short Bio"       value={bio}      onChange={setBio} rows={3} />
          </div>
        </Section>

        <div className="border-t border-gray-100" />

        {/* ── Operating Hours ── */}
        <Section title="Operating Hours" sub="Set open/close times for each day of the week">
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            {DAYS.map((day, i) => (
              <div
                key={day}
                className={`flex items-center gap-4 px-5 py-3 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}
              >
                <span className="text-sm font-medium text-gray-700 w-24 flex-shrink-0">{day}</span>

                {hours[day].closed ? (
                  <span className="flex-1 text-xs text-gray-400 italic">Closed</span>
                ) : (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="time"
                      value={hours[day].open}
                      onChange={e => updateHours(day, "open", e.target.value)}
                      className="border border-gray-200 px-2.5 py-1.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-pink-300"
                    />
                    <span className="text-gray-400 text-xs">to</span>
                    <input
                      type="time"
                      value={hours[day].close}
                      onChange={e => updateHours(day, "close", e.target.value)}
                      className="border border-gray-200 px-2.5 py-1.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-pink-300"
                    />
                  </div>
                )}

                <label className="flex items-center gap-2 cursor-pointer flex-shrink-0 ml-auto">
                  <Toggle
                    on={!hours[day].closed}
                    onToggle={() => updateHours(day, "closed", !hours[day].closed)}
                  />
                  <span className="text-xs text-gray-500 w-9">
                    {hours[day].closed ? "Closed" : "Open"}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </Section>

        <div className="border-t border-gray-100" />

        {/* ── Reservation Settings ── */}
        <Section title="Reservation Settings" sub="Controls that govern how bookings work">
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Max party size"
              value={maxParty}
              onChange={setMaxParty}
              type="number"
              suffix="guests"
            />
            <Field
              label="Booking window"
              value={bookingWindow}
              onChange={setBookingWindow}
              type="number"
              suffix="days ahead"
            />
            <Field
              label="Session duration"
              value={sessionDur}
              onChange={setSessionDur}
              type="number"
              suffix="minutes"
            />
            <Field
              label="Cancellation notice"
              value={cancelNotice}
              onChange={setCancelNotice}
              type="number"
              suffix="hours"
            />
          </div>
        </Section>

        <div className="border-t border-gray-100" />

        {/* ── Notifications ── */}
        <Section title="Notification Settings" sub="Choose which email alerts you receive">
          <div className="space-y-1">
            {(
              [
                { key: "newBooking",   label: "New reservation",   sub: "Email each time a new booking is submitted" },
                { key: "cancellation", label: "Cancellation alert", sub: "Alert when a guest cancels their reservation" },
                { key: "reminder",     label: "Upcoming reminder",  sub: "Daily digest of tomorrow's reservations" },
                { key: "weeklyReport", label: "Weekly report",      sub: "Summary of bookings & revenue every Monday" },
              ] as const
            ).map(({ key, label, sub }) => (
              <div
                key={key}
                className="flex items-center justify-between py-3.5 border-b border-gray-50 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                </div>
                <Toggle on={notifs[key]} onToggle={() => toggleNotif(key)} />
              </div>
            ))}
          </div>
        </Section>

        {/* ── Save button ── */}
        <div className="flex justify-end pb-6">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
              saved
                ? "bg-emerald-500 text-white"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            <Save size={14} />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>

      </main>
    </div>
  );
}

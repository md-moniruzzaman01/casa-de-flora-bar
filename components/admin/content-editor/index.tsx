"use client";

import { useState, useCallback } from "react";
import { Save, ChevronDown, ChevronRight, Plus, Trash2, FileText } from "lucide-react";
import { updateSection } from "@/lib/actions/content-actions";
import type { SiteContent } from "@/lib/content";

// ── Helpers ───────────────────────────────────────────────────────────────────

function humanize(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());
}

function getItemPreview(item: unknown, index: number): string {
  if (item && typeof item === "object") {
    const obj = item as Record<string, unknown>;
    const val =
      obj.title ?? obj.label ?? obj.name ?? obj.category ?? obj.q ?? obj.tag ?? obj.heading;
    if (val && typeof val === "string") return val;
  }
  return `Item ${index + 1}`;
}

// ── Primitive field editors ───────────────────────────────────────────────────

const INPUT_CLS =
  "w-full border border-gray-200 px-3.5 py-2.5 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-pink-300 focus:border-pink-300 transition-all";

function StringField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const long = value.length > 80;
  return (
    <div className="mb-3">
      <label className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wide font-medium">
        {humanize(label)}
      </label>
      {long ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={`${INPUT_CLS} resize-y`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={INPUT_CLS}
        />
      )}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mb-3">
      <label className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wide font-medium">
        {humanize(label)}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={INPUT_CLS}
      />
    </div>
  );
}

// ── String array editor ───────────────────────────────────────────────────────

function StringArrayField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div className="mb-3">
      <label className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wide font-medium">
        {humanize(label)}
      </label>
      <div className="space-y-1.5">
        {value.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const next = [...value];
                next[i] = e.target.value;
                onChange(next);
              }}
              className={INPUT_CLS}
            />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, ""])}
          className="flex items-center gap-1.5 text-xs text-pink-400 hover:text-pink-600 transition-colors mt-1"
        >
          <Plus size={12} /> Add item
        </button>
      </div>
    </div>
  );
}

// ── Object array editor (accordion) ──────────────────────────────────────────

function ObjectArrayField({
  label,
  value,
  onChange,
  depth,
}: {
  label: string;
  value: Record<string, unknown>[];
  onChange: (v: Record<string, unknown>[]) => void;
  depth: number;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs text-gray-500 uppercase tracking-wide font-medium">
          {humanize(label)}
        </label>
        <button
          type="button"
          onClick={() => {
            const last = value[value.length - 1];
            const blank = last
              ? Object.fromEntries(
                  Object.entries(last).map(([k, v]) => [
                    k,
                    Array.isArray(v) ? [] : typeof v === "number" ? 0 : "",
                  ]),
                )
              : {};
            const next = [...value, blank];
            onChange(next);
            setOpenIdx(next.length - 1);
          }}
          className="flex items-center gap-1 text-xs text-pink-400 hover:text-pink-600 transition-colors"
        >
          <Plus size={12} /> Add
        </button>
      </div>

      <div className="space-y-1.5 border border-gray-100 rounded-xl overflow-hidden">
        {value.map((item, i) => (
          <div key={i} className="border-b border-gray-100 last:border-0">
            <div
              className="flex items-center justify-between px-3.5 py-2.5 bg-gray-50/60 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <span className="text-sm text-gray-700 truncate max-w-[80%]">
                {getItemPreview(item, i)}
              </span>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(value.filter((_, j) => j !== i));
                    if (openIdx === i) setOpenIdx(null);
                  }}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
                {openIdx === i ? (
                  <ChevronDown size={14} className="text-gray-400" />
                ) : (
                  <ChevronRight size={14} className="text-gray-400" />
                )}
              </div>
            </div>

            {openIdx === i && (
              <div className="px-4 py-3 bg-white">
                {Object.entries(item).map(([k, v]) => (
                  <FieldRenderer
                    key={k}
                    label={k}
                    value={v as FieldValue}
                    onChange={(newV) => {
                      const next = [...value];
                      next[i] = { ...item, [k]: newV };
                      onChange(next);
                    }}
                    depth={depth + 1}
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {value.length === 0 && (
          <div className="px-4 py-6 text-center text-xs text-gray-400">
            No items yet. Click Add to create one.
          </div>
        )}
      </div>
    </div>
  );
}

// ── Recursive field renderer ──────────────────────────────────────────────────

type FieldValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | FieldValue[]
  | { [key: string]: FieldValue };

function FieldRenderer({
  label,
  value,
  onChange,
  depth = 0,
}: {
  label: string;
  value: FieldValue;
  onChange: (v: FieldValue) => void;
  depth?: number;
}) {
  const [collapsed, setCollapsed] = useState(depth > 1);

  if (value === null || value === undefined) return null;

  if (typeof value === "string") {
    return <StringField label={label} value={value} onChange={onChange as (v: string) => void} />;
  }

  if (typeof value === "number") {
    return <NumberField label={label} value={value} onChange={onChange as (v: number) => void} />;
  }

  if (typeof value === "boolean") return null;

  if (Array.isArray(value)) {
    if (value.length === 0 || value.every((i) => typeof i === "string")) {
      return (
        <StringArrayField
          label={label}
          value={value as string[]}
          onChange={onChange as (v: string[]) => void}
        />
      );
    }
    return (
      <ObjectArrayField
        label={label}
        value={value as Record<string, unknown>[]}
        onChange={onChange as (v: Record<string, unknown>[]) => void}
        depth={depth}
      />
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, FieldValue>);
    const borderColor = depth === 0 ? "border-pink-100" : "border-gray-100";

    return (
      <div className={`mb-4 border-l-2 ${borderColor} pl-3`}>
        {label && (
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="flex items-center gap-1.5 mb-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            {collapsed ? (
              <ChevronRight size={14} className="text-gray-400" />
            ) : (
              <ChevronDown size={14} className="text-gray-400" />
            )}
            {humanize(label)}
          </button>
        )}
        {!collapsed &&
          entries.map(([k, v]) => (
            <FieldRenderer
              key={k}
              label={k}
              value={v}
              onChange={(newV) =>
                onChange({ ...(value as Record<string, FieldValue>), [k]: newV })
              }
              depth={depth + 1}
            />
          ))}
      </div>
    );
  }

  return null;
}

// ── Section nav ───────────────────────────────────────────────────────────────

const SECTIONS = [
  { key: "home", label: "Home Page" },
  { key: "navbar", label: "Navigation" },
  { key: "footer", label: "Footer" },
  { key: "menu", label: "Menu" },
  { key: "bouquet", label: "Bouquet" },
  { key: "florals", label: "Wedding Florals" },
  { key: "venue", label: "Venue Rental" },
  { key: "catering", label: "Catering" },
  { key: "summerEvents", label: "Summer Events" },
  { key: "inquiryForm", label: "Contact Form" },
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

// ── Main editor ───────────────────────────────────────────────────────────────

export default function ContentEditor({
  initialContent,
}: {
  initialContent: SiteContent;
}) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [activeKey, setActiveKey] = useState<SectionKey>("home");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const updateField = useCallback(
    (newSectionData: FieldValue) => {
      setContent((c) => ({ ...c, [activeKey]: newSectionData }));
      setHasChanges(true);
      setSaved(false);
    },
    [activeKey],
  );

  const handleSectionChange = (key: SectionKey) => {
    setActiveKey(key);
    setSaved(false);
    setError(null);
  };

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await updateSection(activeKey, content[activeKey]);
      setSaved(true);
      setHasChanges(false);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError((e as Error).message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  const activeSection = content[activeKey];
  const activeMeta = SECTIONS.find((s) => s.key === activeKey)!;

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* ── Left nav ── */}
      <aside className="w-52 flex-shrink-0 border-r border-gray-100 bg-white overflow-y-auto">
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-pink-400" />
            <span className="text-sm font-semibold text-gray-900">Content</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">Edit page text & data</p>
        </div>

        <nav className="py-2">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => handleSectionChange(s.key)}
              className={`w-full text-left px-5 py-2.5 text-sm transition-colors ${
                activeKey === s.key
                  ? "bg-pink-50 text-pink-600 font-medium border-r-2 border-pink-400"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-white flex-shrink-0">
          <div>
            <h1 className="text-base font-semibold text-gray-900">{activeMeta.label}</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {hasChanges ? "Unsaved changes" : "All changes saved"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {error && (
              <span className="text-xs text-red-500">{error}</span>
            )}
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-40 ${
                saved
                  ? "bg-emerald-500 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              <Save size={13} />
              {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Fields */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <FieldRenderer
            label=""
            value={activeSection as FieldValue}
            onChange={updateField}
            depth={0}
          />
        </div>
      </div>
    </div>
  );
}

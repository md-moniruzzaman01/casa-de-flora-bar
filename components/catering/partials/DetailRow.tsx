"use client";

import { DetailItem } from "@/lib/types";

interface DetailRowProps {
  items: DetailItem[];
  dark?: boolean;
}

export default function DetailRow({ items, dark = false }: DetailRowProps) {
  const borderColor = dark ? "rgba(250,246,241,0.15)" : "var(--line)";
  const labelColor = dark ? "#d4b485" : "#d4a5a5";
  const textColor = dark ? "rgba(250,246,241,0.78)" : "#2a1f1a";

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="py-9 px-6 text-center"
          style={{
            borderRight: i < items.length - 1 ? `1px solid ${borderColor}` : "none",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase" as const,
              color: labelColor,
              marginBottom: "0.75rem",
            }}
          >
            {item.label}
          </p>
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1rem",
              color: textColor,
              lineHeight: 1.4,
            }}
            dangerouslySetInnerHTML={{ __html: item.text }}
          />
        </div>
      ))}
    </div>
  );
}

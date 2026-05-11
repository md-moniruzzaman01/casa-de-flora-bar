"use client";

import { ChoiceColumn } from "../config/types";



interface ChoiceGridProps {
  columns: ChoiceColumn[];
  dark?: boolean;
}

export default function ChoiceGrid({ columns, dark = false }: ChoiceGridProps) {
  const borderColor = dark ? "rgba(250,246,241,0.15)" : "var(--line)";
  const accentColor = dark ? "#d4b485" : "#d4a5a5";
  const labelColor = dark ? "#d4b485" : "#d4a5a5";
  const headingColor = dark ? "#faf6f1" : "#1a1410";
  const itemColor = dark ? "rgba(250,246,241,0.78)" : "#4a3a32";

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: "repeat(3, 1fr)",
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      {columns.map((col, i) => (
        <div
          key={i}
          className="relative px-10 py-12"
          style={{
            borderRight: i < columns.length - 1 ? `1px solid ${borderColor}` : "none",
          }}
        >
          {/* Choice label */}
          <span
            style={{
              display: "block",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase" as const,
              color: labelColor,
              marginBottom: "0.5rem",
            }}
          >
            {col.label}
          </span>

          {/* Column title */}
          <h3
            className="relative mb-8 pb-4"
            style={{
              fontFamily: "Italiana, serif",
              fontSize: "1.75rem",
              color: headingColor,
              borderBottom: `1px solid ${borderColor}`,
            }}
          >
            {col.title}
            {/* Accent underline */}
            <span
              className="absolute bottom-[-1px] left-0 block"
              style={{ width: 30, height: 1, background: accentColor }}
            />
          </h3>

          {/* Tier price */}
          {col.tierPrice && (
            <div
              className="mb-6"
              style={{
                fontFamily: "Italiana, serif",
                fontSize: "2.5rem",
                color: headingColor,
                lineHeight: 1,
              }}
            >
              {col.tierPrice}
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.85rem",
                  color: itemColor,
                  letterSpacing: "0.1em",
                }}
              >
                {" "}
                /person
              </span>
            </div>
          )}

          {/* Items */}
          <ul className="flex flex-col gap-[0.65rem]">
            {col.items.map((item, j) => (
              <li
                key={j}
                className="relative pl-6"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.1rem",
                  color: j === 0 && col.isNote ? headingColor : itemColor,
                  fontStyle: j === 0 && col.isNote ? "italic" : "normal",
                  lineHeight: 1.4,
                }}
              >
                <span
                  className="absolute left-0"
                  style={{
                    top: "0.7em",
                    width: 8,
                    height: 1,
                    background: accentColor,
                    display: "block",
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Responsive override */}
      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

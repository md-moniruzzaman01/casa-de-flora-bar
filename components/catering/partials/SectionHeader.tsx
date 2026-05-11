"use client";

interface SectionHeaderProps {
  number: string;
  eyebrow: string;
  title: string;
  titleItalic: string;
  price: string;
  priceLabel: string;
  badge?: string;
  dark?: boolean;
}

export default function SectionHeader({
  number,
  eyebrow,
  title,
  titleItalic,
  price,
  priceLabel,
  badge,
  dark = false,
}: SectionHeaderProps) {
  const dimText = dark ? "rgba(250,246,241,0.6)" : "#4a3a32";
  const accentColor = dark ? "#d4b485" : "#d4a5a5";
  const headingColor = dark ? "#faf6f1" : "#1a1410";
  const borderColor = dark ? "rgba(250,246,241,0.15)" : "var(--line)";

  return (
    <header
      className="grid items-end gap-8 md:gap-12 mb-20 pb-8"
      style={{
        gridTemplateColumns: "auto 1fr auto",
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      {/* Number */}
      <div
        style={{
          fontFamily: "Italiana, serif",
          fontSize: "6rem",
          lineHeight: 1,
          color: accentColor,
          fontWeight: 400,
        }}
      >
        {number}
      </div>

      {/* Title block */}
      <div className="pb-2">
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: dimText,
            marginBottom: "0.75rem",
          }}
        >
          {eyebrow}
        </p>
        <h2
          style={{
            fontFamily: "Italiana, serif",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            lineHeight: 1,
            color: headingColor,
            fontWeight: 400,
          }}
        >
          {title}{" "}
          <em
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              fontWeight: 300,
              color: accentColor,
            }}
          >
            {titleItalic}
          </em>
        </h2>
      </div>

      {/* Price block */}
      <div className="pb-2 text-right">
        {badge && (
          <span
            className="inline-block mb-3 px-3 py-1 rounded-full"
            style={{
              background: dark ? "#d4b485" : "#1a1410",
              color: dark ? "#1a1410" : "#faf6f1",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
            }}
          >
            {badge}
          </span>
        )}
        <div
          style={{
            fontFamily: "Italiana, serif",
            fontSize: "3.5rem",
            lineHeight: 1,
            color: headingColor,
          }}
        >
          {price}
        </div>
        <span
          style={{
            display: "block",
            marginTop: "0.5rem",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: dimText,
          }}
        >
          {priceLabel}
        </span>
      </div>
    </header>
  );
}

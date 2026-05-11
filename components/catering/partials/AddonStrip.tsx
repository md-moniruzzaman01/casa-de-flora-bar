"use client";

interface AddonStripProps {
  children: React.ReactNode;
  dark?: boolean;
}

export default function AddonStrip({ children, dark = false }: AddonStripProps) {
  const borderColor = dark ? "rgba(250,246,241,0.15)" : "var(--line)";
  const textColor = dark ? "rgba(250,246,241,0.7)" : "#4a3a32";
  const bgGradient = dark
    ? "linear-gradient(to bottom, transparent, rgba(212,165,165,0.05))"
    : "linear-gradient(to bottom, transparent, rgba(252,228,228,0.25))";

  return (
    <div
      className="text-center py-10 px-4"
      style={{
        fontFamily: "Cormorant Garamond, serif",
        fontStyle: "italic",
        fontSize: "1.15rem",
        color: textColor,
        borderBottom: `1px solid ${borderColor}`,
        background: bgGradient,
      }}
    >
      {children}
    </div>
  );
}

export function Sep({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className="mx-3"
      style={{ color: dark ? "#d4b485" : "#d4a5a5" }}
    >
      ·
    </span>
  );
}

"use client";

interface CloserNoteProps {
  children: React.ReactNode;
  dark?: boolean;
}

export default function CloserNote({ children, dark = false }: CloserNoteProps) {
  const textColor = dark ? "rgba(250,246,241,0.75)" : "#4a3a32";
  const accentColor = dark ? "#d4b485" : "#d4a5a5";

  return (
    <div className="flex flex-col items-center text-center pt-12 pb-0 max-w-2xl mx-auto">
      <span
        style={{ color: accentColor, fontSize: "1rem", marginBottom: "1rem", display: "block" }}
      >
        ✦
      </span>
      <p
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontStyle: "italic",
          fontSize: "1.2rem",
          color: textColor,
          lineHeight: 1.6,
        }}
      >
        {children}
      </p>
    </div>
  );
}

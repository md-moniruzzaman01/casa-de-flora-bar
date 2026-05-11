"use client";

export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-8 py-16 px-[6vw]">
      <span
        className="flex-1 max-w-[200px] h-px"
        style={{ background: "var(--line-strong, rgba(42,31,26,0.25))" }}
      />
      <span
        style={{
          fontFamily: "Italiana, serif",
          color: "#d4a5a5",
          fontSize: "1.5rem",
          letterSpacing: "0.5em",
        }}
      >
        ✦ ✦ ✦
      </span>
      <span
        className="flex-1 max-w-[200px] h-px"
        style={{ background: "var(--line-strong, rgba(42,31,26,0.25))" }}
      />
    </div>
  );
}

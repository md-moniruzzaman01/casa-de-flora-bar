type StatItem = {
  label: string;
  value: string;
  dotColor: string;
};

const stats: StatItem[] = [
  { label: "Confirmed", value: "24 today", dotColor: "#7AB648" },
  { label: "Pending",   value: "8 today",  dotColor: "#F0C040" },
  { label: "Total guests", value: "192",   dotColor: "#2D5016" },
];

export default function StatsPanel() {
  return (
    <div className="mt-6 flex flex-col gap-2">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex items-center justify-between px-3 py-2.5 bg-white rounded-lg border border-stone-100"
        >
          <div className="flex items-center gap-2 text-[12px] text-stone-500">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: s.dotColor }}
            />
            {s.label}
          </div>
          <span className="text-[13px] font-medium text-stone-800">{s.value}</span>
        </div>
      ))}
    </div>
  );
}
import { StatCardProps } from "../config/types";

export default function StatCard({ title, value, badge, badgeUp, sub }: StatCardProps) {
  return (
    <div className="bg-[#fdf0f3] rounded-2xl p-5 flex flex-col gap-3">
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-4xl font-bold text-gray-900">{value}</p>
      <div className="flex items-center gap-2">
        <span
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md
            ${badgeUp ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}
        >
          <span>{badge}</span>
          <span>{badgeUp ? "↗" : "↘"}</span>
        </span>
        <span className="text-xs text-gray-400">{sub}</span>
      </div>
    </div>
  );
}
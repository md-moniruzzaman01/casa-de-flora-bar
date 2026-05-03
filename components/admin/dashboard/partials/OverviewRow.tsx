import { OverviewItem } from "../config/types";

export default function OverviewRow({ item }: { item: OverviewItem }) {
  return (
    <div className="flex items-center gap-4 bg-[#fdf0f3] rounded-xl px-5 py-4 cursor-pointer hover:bg-pink-100 transition-colors group">
      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-400 shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 10h18M3 14h18M10 5v14M14 5v14M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800">{item.label}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {item.today} today &nbsp;•&nbsp; {item.week} this week
        </p>
      </div>
      <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
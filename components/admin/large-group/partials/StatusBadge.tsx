import { EventStatus } from "../config/types";

export default function StatusBadge({ status }: { status: EventStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold
        ${status === "Pending"
          ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
          : "bg-teal-50 text-teal-700 border border-teal-200"
        }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${status === "Pending" ? "bg-yellow-400" : "bg-teal-400"}`} />
      {status}
    </span>
  );
}

import { Reservation } from "../config/types";
import StatusBadge from "./StatusBadge";
import { MoreHorizontal } from "lucide-react";

type Props = { reservations: Reservation[] };

export default function ReservationTable({ reservations }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            {["Guest", "Time", "Booking for", "Guests", "Status", ""].map((h) => (
              <th
                key={h}
                className="pb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-stone-400 border-b border-stone-100 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr
              key={r.id}
              className="group border-b border-stone-50 hover:bg-stone-50 transition-colors"
            >
              {/* Guest */}
              <td className="px-3 py-3.5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
                    style={{ backgroundColor: r.avatarBg, color: r.avatarText }}
                  >
                    {r.initials}
                  </div>
                  <span className="text-[13px] font-medium text-stone-800 whitespace-nowrap">
                    {r.name}
                  </span>
                </div>
              </td>

              {/* Time */}
              <td className="px-3 py-3.5 text-[13px] text-stone-500 whitespace-nowrap">
                {r.time}
              </td>

              {/* Booking for */}
              <td className="px-3 py-3.5 text-[13px] text-stone-500">
                {r.bookingFor}
              </td>

              {/* Guests */}
              <td className="px-3 py-3.5 text-[13px] text-stone-500">
                {r.guests}
              </td>

              {/* Status */}
              <td className="px-3 py-3.5">
                <StatusBadge status={r.status} />
              </td>

              {/* Actions */}
              <td className="px-3 py-3.5 text-right">
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-stone-400 hover:text-stone-700 p-1 rounded">
                  <MoreHorizontal size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
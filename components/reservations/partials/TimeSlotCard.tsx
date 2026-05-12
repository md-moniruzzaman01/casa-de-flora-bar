import { badgeLabels, badgeStyles } from "../config/constants";
import { Slot } from "../config/types";

export default function TimeSlotCard({
  slot,
  selected,
  onSelect,
}: {
  slot: Slot;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={[
        "text-left p-3 sm:p-3.5 rounded-2xl border transition-all",
        selected
          ? "bg-primary border-primary shadow-sm"
          : "bg-white border-primary-100 hover:border-primary/50 hover:shadow-sm",
      ].join(" ")}
    >
      <p
        className={[
          "font-serif text-base sm:text-lg leading-none tabular-nums",
          selected ? "text-white" : "text-black",
        ].join(" ")}
      >
        {slot.from}
      </p>
      <p
        className={[
          "text-[10px] uppercase tracking-[0.18em] mt-1",
          selected ? "text-white/85" : "text-gray-500",
        ].join(" ")}
      >
        — {slot.to}
      </p>

      <div className="flex items-center justify-between mt-3">
        <span
          className={[
            "text-[10px]",
            selected ? "text-white/85" : "text-gray-500",
          ].join(" ")}
        >
          {slot.seats} seats
        </span>
        {!selected && (
          <span
            className={`text-[9px] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full ${badgeStyles[slot.level]}`}
          >
            {badgeLabels[slot.level]}
          </span>
        )}
      </div>
    </button>
  );
}

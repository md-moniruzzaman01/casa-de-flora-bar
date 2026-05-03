import { badgeLabels, badgeStyles } from "../config/constant";
import { Slot } from "../config/types";

function TimeSlotCard({
  slot,
  selected,
  onSelect,
}: {
  slot: Slot;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={[
        "p-3 rounded-xl border cursor-pointer transition-all",
        selected
          ? "bg-pink-500 border-pink-500"
          : "bg-white border-gray-200 hover:border-pink-300",
      ].join(" ")}
    >
      <p className={`text-[12px] font-medium leading-snug ${selected ? "text-white" : "text-gray-800"}`}>
        {slot.from}<br />– {slot.to}
      </p>
      <p className={`text-[11px] mt-1 ${selected ? "text-pink-100" : "text-gray-400"}`}>
        {slot.seats} seats left
      </p>
      {!selected && (
        <span className={`mt-1.5 inline-block text-[9px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full ${badgeStyles[slot.level]}`}>
          {badgeLabels[slot.level]}
        </span>
      )}
    </div>
  );
}

export default TimeSlotCard;
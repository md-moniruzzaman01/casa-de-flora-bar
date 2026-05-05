import { ReservationStatus } from "../config/types";


type Props = { status: ReservationStatus };

const config: Record<ReservationStatus, { bg: string; text: string; dot: string }> = {
  Pending: { bg: "bg-amber-50",  text: "text-amber-800", dot: "bg-amber-700" },
  Confirm: { bg: "bg-green-50",  text: "text-green-800", dot: "bg-green-700" },
};

export default function StatusBadge({ status }: Props) {
  const { bg, text, dot } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${bg} ${text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}
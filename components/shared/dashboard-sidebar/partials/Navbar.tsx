import Link from "next/link";

export default function Navbar() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header
      className="flex items-center justify-between px-7 py-4 bg-white border-b"
      style={{ borderColor: "#eee" }}
    >
      <div>
        <Link href="/reservations/calendar">
          <h1
            className="cursor-pointer hover:opacity-80"
            style={{ fontFamily: "Georgia, serif", fontSize: 20 }}
          >
            Reservations
          </h1>
        </Link>

        <p className="text-xs text-gray-400 mt-0.5">
          {formattedDate} · Bloomfield, NJ
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/events/add">
          <button
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-50"
            style={{ borderColor: "#eee" }}
          >
            + Create Event
          </button>
        </Link>

        <Link href="/reservations/add">
          <button
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg text-white bg-black"

          >
            + New Reservation
          </button>
        </Link>
      </div>
    </header>
  );
}
// components/Navbar.tsx

export default function Navbar() {
  return (
    <header
      className="flex items-center justify-between px-7 py-4 bg-white border-b"
      style={{ borderColor: "#eee" }}
    >
      <div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 20 }}>
          Reservations
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Saturday, May 2, 2026 · Bloomfield, NJ
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-50"
          style={{ borderColor: "#eee" }}
        >
          + Create Event
        </button>

        <button
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg text-white"
          style={{ background: "#1a1a1a" }}
        >
          + New Reservation
        </button>
      </div>
    </header>
  );
}
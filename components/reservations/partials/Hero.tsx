import { WaveDividerDown } from "@/components/shared/WaveDivider";

export default function Hero() {
  return (
    <section className="relative bg-primary-200 pt-36 pb-4 overflow-hidden">
      {/* Gold corner ornament */}
      <div
        className="pointer-events-none absolute inset-6 md:inset-10"
        style={{
          border: "1px solid rgba(201,169,110,0.25)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#c9a96e] mb-5">
          Casa de Flora Bar
        </p>

        <h1 className="font-serif text-[clamp(40px,8vw,82px)] font-normal leading-[1.06] text-gray mb-6">
          Reserve<br />Your Table
        </h1>

        <div className="flex items-center justify-center gap-3 mb-7">
          <div className="w-14 h-px bg-[#c9a96e]" />
          <span className="text-[#c9a96e] text-base leading-none">✦</span>
          <div className="w-14 h-px bg-[#c9a96e]" />
        </div>

        <p className="font-serif italic text-[clamp(13px,3.5vw,15px)] text-gray-600 leading-[1.85] max-w-md mx-auto">
          Choose your preferred date and time, share your details, and let us
          set the perfect table for your evening.
        </p>

        <div className="mt-8 flex items-center justify-center gap-6 text-[11px] font-sans text-gray-500 tracking-wide">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ED80A8] inline-block" />
            1 hr 30 min sessions
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ED80A8] inline-block" />
            Up to 8 guests
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ED80A8] inline-block" />
            Free cancellation
          </span>
        </div>
      </div>

      <WaveDividerDown />
    </section>
  );
}

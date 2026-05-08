"use client";

import Image from "next/image";
import Link from "next/link";

export default function ClosingCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/reservation 3.jpg"
          alt=""
          fill
          className="object-cover blur-md scale-110"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />

      <div className="relative max-w-[1240px] mx-auto px-6 sm:px-10 py-20 sm:py-24 lg:py-28 text-center">
        <p className="text-[11px] uppercase tracking-[0.32em] text-primary-200 mb-4">
          Hosting more than 8?
        </p>
        <h2 className="font-serif leading-[0.96] tracking-tight">
          <span className="block text-[40px] sm:text-[56px] md:text-[68px] lg:text-[80px]">
            Let&apos;s make it
          </span>
          <span className="block italic font-light text-primary-200 text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px]">
            an event.
          </span>
        </h2>
        <p className="mt-7 text-white/80 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Birthdays, bridal showers, corporate evenings — explore our private
          event packages or have us cater off-site.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/celebrate"
            className="bg-primary text-white text-center px-10 py-3 text-sm md:text-base uppercase tracking-widest border border-primary hover:bg-transparent hover:border-white transition-all duration-300"
          >
            Celebrate Packages
          </Link>
          <Link
            href="/catering"
            className="border border-white/40 text-white text-center px-10 py-3 text-sm md:text-base uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            Catering Inquiry
          </Link>
        </div>
      </div>
    </section>
  );
}

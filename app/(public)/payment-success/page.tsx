"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const bookingId = params.get("booking");

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#FFFBFA]">
      <div className="max-w-md w-full text-center">

        <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={40} className="text-emerald-500" />
        </div>

        <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-sans mb-4">
          Payment Received
        </p>

        <h1 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] leading-tight mb-6">
          You&apos;re all set!
        </h1>

        <p className="text-sm text-gray-500 font-sans leading-relaxed mb-4">
          Your advance deposit was received and your booking is confirmed.
          {bookingId && (
            <> Your reference number is <strong className="text-[#1a1a1a]">#{bookingId}</strong>.</>
          )}
        </p>

        <p className="text-sm text-gray-500 font-sans leading-relaxed mb-10">
          A confirmation email with all the details is on its way. We can&apos;t wait to see you at Casa de Flora!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-block px-8 py-3.5 bg-[#1a1a1a] text-white text-[11px] tracking-[0.2em] uppercase font-sans hover:bg-[#333] transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/reservations"
            className="inline-block px-8 py-3.5 border border-[#EDD8DC] text-[#1a1a1a] text-[11px] tracking-[0.2em] uppercase font-sans hover:bg-white transition-colors"
          >
            Make Another
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}

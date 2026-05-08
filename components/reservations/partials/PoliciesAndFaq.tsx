"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import {
  ChevronDown,
  Clock,
  Users,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const POLICIES = [
  {
    icon: Clock,
    title: "Seating window",
    body: "Tables are held for 15 minutes past the reservation time. Larger parties (7+) are confirmed manually.",
  },
  {
    icon: Users,
    title: "Group bookings",
    body: "Parties of 7–12 follow our family-style brunch menu ($50 / person · $150 deposit toward the bill).",
  },
  {
    icon: ShieldCheck,
    title: "Cancellations",
    body: "Free cancellation or reschedule up to 24 hours before. After that, the deposit is non-refundable.",
  },
  {
    icon: Sparkles,
    title: "Celebrations",
    body: "Bringing a cake, flowers or special occasion? Mention it in the form and we'll set the table.",
  },
];

const FAQS = [
  {
    q: "Do you offer outdoor seating?",
    a: "Yes — our patio opens seasonally (May through September). Note your preference in special requests and we'll do our best.",
  },
  {
    q: "Is the menu fixed for large groups?",
    a: "Parties of 7+ enjoy our curated family-style brunch ($50 per guest). Smaller parties order à la carte from the full menu.",
  },
  {
    q: "Are kids welcome?",
    a: "Absolutely. We have a kids' menu and high chairs on request. Pets are not permitted in the dining room — but the patio is dog-friendly.",
  },
  {
    q: "What if I'm running late?",
    a: "We hold the table for 15 minutes. After that we may release it to a waiting guest, but reach out and we'll do our best to fit you in.",
  },
  {
    q: "Can I book the entire space?",
    a: "Yes — visit our Celebrate page for buyout and private event packages.",
  },
];

export default function PoliciesAndFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggle = (index: number) => {
    const isOpening = openIndex !== index;
    const next = isOpening ? index : null;

    if (openIndex !== null && contentRefs.current[openIndex]) {
      gsap.to(contentRefs.current[openIndex], {
        height: 0,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (isOpening && contentRefs.current[index]) {
      gsap.fromTo(
        contentRefs.current[index],
        { height: 0 },
        {
          height: "auto",
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }

    setOpenIndex(next);
  };

  return (
    <section className="bg-white px-6 sm:px-8 md:px-12 lg:px-16 pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Policies */}
        <div className="lg:col-span-5">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-primary mb-3">
            Good to know
          </p>
          <h2 className="font-serif leading-[1.05] tracking-tight text-black text-[32px] sm:text-[40px] md:text-[48px]">
            The fine
            <br />
            <span className="italic text-primary">print, kindly.</span>
          </h2>
          <div className="h-[1px] w-16 bg-primary mt-5 mb-7" />

          <ul className="space-y-4">
            {POLICIES.map((p) => {
              const Icon = p.icon;
              return (
                <li
                  key={p.title}
                  className="flex gap-4 p-5 rounded-2xl border border-primary-100 bg-white hover:border-primary/40 hover:shadow-sm transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary flex items-center justify-center shrink-0">
                    <Icon size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium text-black text-sm leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-[13px] text-gray-600 mt-1 leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* FAQ accordion */}
        <div className="lg:col-span-7">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-primary mb-3">
            FAQ · Reservations
          </p>
          <h2 className="font-serif leading-[1.05] tracking-tight text-black text-[32px] sm:text-[40px] md:text-[48px]">
            Questions, answered
            <br />
            <span className="italic text-primary">before you ask.</span>
          </h2>
          <div className="h-[1px] w-16 bg-primary mt-5 mb-7" />

          <div className="space-y-3">
            {FAQS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.q}
                  className={`rounded-2xl overflow-hidden border transition-colors duration-300 ${
                    isOpen
                      ? "border-primary/40 bg-primary-100"
                      : "border-primary-100/70 bg-white hover:border-primary-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-medium text-black pr-4">
                      <span className="font-serif text-primary tabular-nums mr-3">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`flex-shrink-0 text-gray-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                  <div
                    ref={(el) => {
                      contentRefs.current[index] = el;
                    }}
                    className="overflow-hidden"
                    style={{ height: index === 0 ? "auto" : 0 }}
                  >
                    <div className="px-5 pb-5 pl-12 sm:pl-14 text-gray-700 text-sm leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

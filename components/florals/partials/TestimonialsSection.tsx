import React from "react";
import Image from "next/image";
import { WEDDING_FLORALS_CONTENT } from "../config/constant";
import ScallopBorder from "@/components/shared/ScallopBorder";


const TestimonialsSection: React.FC = () => {
  const { testimonials } = WEDDING_FLORALS_CONTENT;
  const testimonial = testimonials[0];

  return (
    <section className="bg-white py-10 md:py-14 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[72px]">
        {/* ── Section heading ── */}
        <h2 className="font-serif italic text-[48px] md:text-[64px] lg:text-[76px] text-[#E87D8A] text-center leading-none tracking-tight mb-8 md:mb-10">
          Testimonials
        </h2>

        {/* ── Scallop card — same component as brand logos ── */}
        <ScallopBorder id="testimonials">
          <div className="grid grid-cols-1 md:grid-cols-[45fr_55fr] gap-0 items-start px-8 md:px-12 lg:px-16 py-10 md:py-14 lg:py-16">
            {/* Photo */}
            <div className="flex justify-center md:justify-start mb-8 md:mb-0 md:pr-10 lg:pr-14">
              <div className="relative w-full max-w-[460px] md:max-w-none aspect-[4/5] overflow-hidden">
                <Image
                  src="/florals/image-03.jpg"
                  alt={testimonial.author}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 90vw, 45vw"
                />
              </div>
            </div>

            {/* Quote + author */}
            <div className="flex flex-col justify-center gap-5 md:gap-6">
              <div className="font-serif text-[15px] md:text-[16px] leading-[1.85] text-[#1a1008] space-y-5">
                {testimonial.quote.split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <p className="font-serif text-[15px] md:text-[16px] text-[#1a1008] mt-2">
                – {testimonial.author}
              </p>
            </div>
          </div>
        </ScallopBorder>
      </div>
    </section>
  );
};

export default TestimonialsSection;
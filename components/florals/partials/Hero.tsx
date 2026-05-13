import React from 'react';
import Image from 'next/image';
import { WEDDING_FLORALS_CONTENT } from '../config/constant';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <>

      <section className="relative w-full overflow-hidden h-[85vh] md:h-screen min-h-150" >

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/florals/image-01.webp"
            alt="Luxury Floral Wedding Design"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Bottom fade to white */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            height: '45%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0.93) 72%, #ffffff 100%)',
          }}
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end px-4 pb-0 md:px-14 md:pb-12 lg:px-[52px] lg:pb-10">
          {/* Two-column bottom row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-7 lg:gap-10 xl:gap-16">


            <div>
              <div className='flex'>
                <p
                  className="mb-1 md:mb-2.5 text-xs bg-primary/40 py-1 px-4 rounded-2xl "
                >
                  {WEDDING_FLORALS_CONTENT.hero_section.tag}
                </p>
              </div>

              <h1
                className=" leading-[1.02] font-serif  text-4xl md:text-6xl lg:text-7xl mb-2"
              >
                <span className=" block mb-1">
                  {WEDDING_FLORALS_CONTENT.hero_section.headline_part_1}
                </span>

                {/* Second Part: Normal weight */}
                <span className="block">
                  {WEDDING_FLORALS_CONTENT.hero_section.headline_part_2}
                </span>

              </h1>
            </div>

            {/* Right: description + buttons */}
            <div className="flex flex-col items-start gap-6">
              <p className="leading-[1.55] max-w-100 font-sans text-[#1A1A1A]">
                {WEDDING_FLORALS_CONTENT.hero_section.sub_headline}
              </p>

              <div className="flex flex-row gap-3 items-center">
                {/* Book An Event - Next.js Link */}
                <Link
                  href={WEDDING_FLORALS_CONTENT.hero_section.buttons[0].link}
                  className="bg-[#111] text-white hover:bg-[#333] transition-colors duration-200  font-display text-base font-medium tracking-[0.04em] px-7 md:px-11 py-3.25  whitespace-nowrap cursor-pointer uppercase inline-block text-center"
                >
                  {WEDDING_FLORALS_CONTENT.hero_section.buttons[0].label}
                </Link>

                {/* Inquire Now - Next.js Link */}
                <Link
                  href={WEDDING_FLORALS_CONTENT.hero_section.buttons[1].link}
                  className="bg-[#f0dcd8] text-[#1a1008] hover:bg-[#e8cac4] transition-colors duration-200  font-display text-base font-medium tracking-[0.04em] px-7 md:px-11 py-3.25  whitespace-nowrap cursor-pointer uppercase inline-block text-center"
                >
                  {WEDDING_FLORALS_CONTENT.hero_section.buttons[1].label}
                </Link>
              </div>
            </div>

          </div>
        </div>




      </section>
    </>
  );
};

export default HeroSection;
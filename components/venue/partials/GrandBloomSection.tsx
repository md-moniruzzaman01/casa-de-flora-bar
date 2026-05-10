import React from 'react';
import Image from 'next/image';

const GrandBloomSection = () => {
  return (
    <section className="bg-primary-100 min-h-screen flex items-center px-6 py-12 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Side: Image Mosaic */}
        <div className="grid grid-cols-2 gap-4 h-[500px] md:h-[650px] order-2 lg:order-1">
          {/* Main Tall Image (Left side of the grid) */}
          <div className="relative h-full row-span-2">
            <Image
              src="/venue/grand stage-01.jpg" 
              alt="Grand Bloom Event Space"
              fill
              className="object-cover rounded-sm"
              priority
            />
          </div>

          {/* Top Right Image */}
          <div className="relative h-full">
            <Image
              src="/venue/grand stage-02.jpg"
              alt="Luxury Table Setting"
              fill
              className="object-cover rounded-sm"
            />
          </div>

          {/* Bottom Right Image */}
          <div className="relative h-full">
            <Image
              src="/venue/grand stage-03.jpg"
              alt="Wedding Ceremony"
              fill
              className="object-cover rounded-sm"
            />
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="space-y-6 order-1 lg:order-2">
          <h2 className="text-4xl md:text-6xl font-serif text-gray-900 uppercase tracking-tight leading-tight">
            The Grand Bloom —
            <span className="block text-[#D17A8C] mt-2 normal-case italic font-medium">
              Up to 100 Guests
            </span>
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed max-w-lg text-lg font-light">
            <p>
              Our newest and most spectacular space — modern, upscale, and absolutely
              stunning. Designed for grand celebrations, wedding receptions, milestone
              events, and corporate gatherings.
            </p>
            <p>
              The Grand Bloom also offers full wedding packages including use of our 
              Garden Room for ceremony space or Cocktail Hour for up to 80 guests, 
              a bridal suite, and a groom suite.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GrandBloomSection;
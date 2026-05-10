import React from 'react';
import Image from 'next/image';

const UndergroundSection = () => {
  return (
    <section className="bg-[#FFF5F7] min-h-screen flex items-center px-6 py-12 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-serif text-gray-900 uppercase tracking-wide">
            The Underground —
            <span className="block text-[#D17A8C] mt-2 normal-case italic">
              Up to 100 Guests
            </span>
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-md text-lg font-light italic">
            An intimate, moody space with a speakeasy-inspired vibe — sophisticated, 
            chic, and full of character. Ideal for evening birthday celebrations, 
            cocktail receptions, girls' nights out, and intimate private gatherings.
          </p>
        </div>

        {/* Right Side: Image Mosaic */}
        <div className="grid grid-cols-2 gap-4 h-[500px] md:h-[600px]">
          {/* Main Tall Image (The Aisle) */}
          <div className="relative h-full row-span-2">
            <Image
              src="/venue/grand stage-04.jpg" 
              alt="Speakeasy Wedding Aisle"
              fill
              className="object-cover rounded-sm"
            />
          </div>

          {/* Top Right Image (Chandelier) */}
          <div className="relative h-full">
            <Image
              src="/venue/grand stage-05.jpg"
              alt="Underground Seating Area"
              fill
              className="object-cover rounded-sm"
            />
          </div>

          {/* Bottom Right Image (Group Photo) */}
          <div className="relative h-full">
            <Image
              src="/venue/grand stage-06.jpg"
              alt="Underground Group Celebration"
              fill
              className="object-cover rounded-sm"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default UndergroundSection;
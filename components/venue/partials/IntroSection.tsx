import React from 'react';
import Image from 'next/image';

const GardenRoomSection = () => {
  return (
    <section className=" min-h-screen flex items-center px-6 py-12 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-serif text-gray-900 uppercase tracking-wide">
            The Garden Room —
            <span className="block text-[#D17A8C] mt-2 normal-case italic">
              Up to 40 Guests
            </span>
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-md text-lg font-light">
            Our signature intimate space, beautifully adorned with floral accents and an
            elegant, celebratory atmosphere. Perfect for bridal showers, baby showers,
            birthday celebrations, tea parties, and private gatherings.
          </p>
        </div>

        {/* Right Side: Image Mosaic */}
        <div className="grid grid-cols-2 gap-4 h-[500px] md:h-[600px]">
          {/* Main Tall Image */}
          <div className="relative h-full row-span-2">
            <Image
              src="/venue/table-img-01.jpg" 
              alt="Garden Room Dining"
              fill
              className="object-cover rounded-sm"
            />
          </div>

          {/* Top Right Image */}
          <div className="relative h-full">
            <Image
              src="/venue/table-img-02.jpg"
              alt="Table Setting"
              fill
              className="object-cover rounded-sm"
            />
          </div>

          {/* Bottom Right Image */}
          <div className="relative h-full">
            <Image
              src="/venue/table-img-03.jpg"
              alt="Floral Decor"
              fill
              className="object-cover rounded-sm"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default GardenRoomSection;
import React from 'react';

const ConsultationSection = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">


        {/* CTA Card */}
        <div className="bg-[#FDE7E9] rounded-[20px] py-16 px-8 md:py-24 md:px-12 flex flex-col items-center text-center">
          
          {/* Badge/Small Text */}
          <span className="text-[#E18F99] text-xs md:text-sm border border-[#E18F99]/30 rounded-full px-4 py-1 mb-6 tracking-wide">
            Let's Create Something Extraordinary
          </span>

          {/* Main Heading */}
          <h3 className="font-serif text-[#E18F99] text-4xl md:text-6xl italic leading-tight mb-8 max-w-3xl">
            Your dream wedding <br className="hidden md:block" /> starts with a conversation
          </h3>

          {/* Description */}
          <p className="text-[#555] text-base md:text-lg font-light max-w-xl mb-12 leading-relaxed">
            Schedule time with our floral designer and let's bring your 
            vision to life — jaw-dropping art, from scratch.
          </p>

          {/* Button */}
          <button className="bg-black text-white text-sm uppercase tracking-widest px-10 py-4 transition-all hover:bg-neutral-800 active:scale-95">
            Book Your Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;
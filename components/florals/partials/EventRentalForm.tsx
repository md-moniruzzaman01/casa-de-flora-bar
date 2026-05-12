import React from 'react';
import { WEDDING_FLORALS_CONTENT } from '../config/constant';


const EventRentalSection = () => {
  const { event_rental_section: content } = WEDDING_FLORALS_CONTENT;

  return (
    <section id="eventbook" className="bg-white py-12 px-6 md:py-24 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20">
          <h1 className="font-serif text-[#1A1A1A] text-5xl md:text-8xl tracking-tight mb-4 uppercase">
            {content.title}
          </h1>
          <p className="font-serif text-[#1A1A1A] text-lg md:text-2xl tracking-[0.1em] uppercase">
            {content.subtitle}
          </p>
        </div>

        <div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            
            {/* Name */}
            <div className="md:col-span-2 space-y-2">
              <label className="font-serif text-sm text-gray-700">{content.form_labels.name}</label>
              <input 
                type="text" 
                placeholder="Name"
                className="w-full bg-[#FFFBFA] border border-[#FDE2E4] px-4 py-4 focus:outline-none focus:border-pink-200 transition-colors placeholder:text-gray-400 text-base"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="font-serif text-sm text-gray-700">{content.form_labels.email}</label>
              <input 
                type="email" 
                placeholder="Email"
                className="w-full bg-[#FFFBFA] border border-[#FDE2E4] px-4 py-4 focus:outline-none focus:border-pink-200 transition-colors placeholder:text-gray-400 text-base"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="font-serif text-sm text-gray-700">{content.form_labels.phone}</label>
              <input 
                type="tel" 
                placeholder="Phone"
                className="w-full bg-[#FFFBFA] border border-[#FDE2E4] px-4 py-4 focus:outline-none focus:border-pink-200 transition-colors placeholder:text-gray-400 text-base"
              />
            </div>

            {/* Type of Event Dropdown */}
            <div className="space-y-2 relative">
              <label className="font-serif text-sm text-gray-700">{content.form_labels.event_type}</label>
              <div className="relative">
                <select defaultValue="" className="w-full bg-[#FFFBFA] border border-[#FDE2E4] px-4 py-4 focus:outline-none focus:border-pink-200 transition-colors text-gray-700 text-base appearance-none cursor-pointer">
                  <option value="" disabled>Select Your Space</option>
                  {content.event_options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Guest Count */}
            <div className="space-y-2">
              <label className="font-serif text-sm text-gray-700">{content.form_labels.guests}</label>
              <input 
                type="text" 
                placeholder="8 Person"
                className="w-full bg-[#FFFBFA] border border-[#FDE2E4] px-4 py-4 focus:outline-none focus:border-pink-200 transition-colors placeholder:text-gray-400 text-base"
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="font-serif text-sm text-gray-700">{content.form_labels.date}</label>
              <input 
                type="date"
                className="w-full bg-[#FFFBFA] border border-[#FDE2E4] px-4 py-4 focus:outline-none focus:border-pink-200 transition-colors text-gray-600 text-base"
              />
            </div>

            {/* Time */}
            <div className="space-y-2">
              <label className="font-serif text-sm text-gray-700">{content.form_labels.time}</label>
              <div className="space-y-1">
                <input 
                  type="text" 
                  placeholder="8:00 PM to 10:00 PM"
                  className="w-full bg-[#FFFBFA] border border-[#FDE2E4] px-4 py-4 focus:outline-none focus:border-pink-200 transition-colors placeholder:text-gray-400 text-base"
                />
                <p className="text-[11px] text-gray-400 italic font-serif">{content.time_note}</p>
              </div>
            </div>

            {/* Catering Toggle */}
            <div className="md:col-span-2 flex items-center space-x-3 py-2">
              <input 
                type="checkbox" 
                id="catering"
                className="w-5 h-5 accent-black border-[#FDE2E4] rounded focus:ring-0 cursor-pointer"
              />
              <label htmlFor="catering" className="font-serif text-sm text-gray-700 cursor-pointer select-none">
                {content.form_labels.catering}
              </label>
            </div>

            {/* Special Requests */}
            <div className="md:col-span-2 space-y-2">
              <label className="font-serif text-sm text-gray-700">{content.form_labels.special_requests}</label>
              <textarea 
                rows={4}
                placeholder="Any specific vision..."
                className="w-full bg-[#FFFBFA] border border-[#FDE2E4] px-4 py-4 focus:outline-none focus:border-pink-200 transition-colors placeholder:text-gray-400 text-base resize-none"
              ></textarea>
            </div>

            {/* Message */}
            <div className="md:col-span-2 space-y-2">
              <label className="font-serif text-sm text-gray-700">{content.form_labels.message}</label>
              <textarea 
                rows={4}
                placeholder="Tell us more about your event..."
                className="w-full bg-[#FFFBFA] border border-[#FDE2E4] px-4 py-4 focus:outline-none focus:border-pink-200 transition-colors placeholder:text-gray-400 text-base resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-4">
              <button 
                type="submit"
                className="w-full md:w-1/2 lg:w-1/3 mx-auto block bg-black text-white py-4 font-serif text-lg tracking-wider hover:bg-neutral-800 transition-all active:scale-95"
              >
                {content.form_labels.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EventRentalSection;
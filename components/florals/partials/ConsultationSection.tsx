import React from 'react';

const ConsultationSection = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-primary font-serif italic text-lg mb-4 block">
            Let's Create Something Extraordinary
          </span>
          <h2 className="font-serif text-[#1A1A1A] text-4xl md:text-6xl leading-tight mb-6">
            Please fill-up for Consultation
          </h2>
          <div className="h-px w-24 bg-primary/20 mx-auto" />
        </div>

        {/* Form Card */}
        <div className="bg-[#FDF2F4] rounded-[32px] p-8 md:p-16 shadow-sm border border-primary/5">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Name - Full Width */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[13px] uppercase tracking-wider text-gray-600 font-medium ml-1">Name</label>
              <input 
                type="text" 
                placeholder="Name"
                className="w-full bg-white/80 border border-primary/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-gray-300"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[13px] uppercase tracking-wider text-gray-600 font-medium ml-1">Email</label>
              <input 
                type="email" 
                placeholder="Email"
                className="w-full bg-white/80 border border-primary/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-gray-300"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[13px] uppercase tracking-wider text-gray-600 font-medium ml-1">Phone</label>
              <input 
                type="tel" 
                placeholder="Phone"
                className="w-full bg-white/80 border border-primary/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-gray-300"
              />
            </div>

            {/* Select Space - Full Width */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[13px] uppercase tracking-wider text-gray-600 font-medium ml-1">Select Your Space</label>
              <select className="w-full bg-white/80 border border-primary/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all text-gray-500 appearance-none">
                <option>Garden Room - Up to 40 Guests</option>
                <option>Main Ballroom - Up to 150 Guests</option>
                <option>Full Venue Rental</option>
              </select>
            </div>

            {/* Preferred Date */}
            <div className="space-y-2">
              <label className="text-[13px] uppercase tracking-wider text-gray-600 font-medium ml-1">Preferred Date (required)</label>
              <input 
                type="date" 
                className="w-full bg-white/80 border border-primary/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all text-gray-400"
              />
            </div>

            {/* Time */}
            <div className="space-y-2">
              <label className="text-[13px] uppercase tracking-wider text-gray-600 font-medium ml-1">Time</label>
              <div className="space-y-1">
                 <p className="text-[10px] text-gray-400 italic">Options: 11am - 3pm / 12pm - 4pm / 6pm - 10pm / 7pm - 11pm</p>
                 <input 
                  type="text" 
                  placeholder="e.g. 12pm - 4pm"
                  className="w-full bg-white/80 border border-primary/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-gray-300"
                />
                <p className="text-[10px] text-gray-400 italic">In Eastern Time</p>
              </div>
            </div>

            {/* Number of Guest */}
            <div className="space-y-2">
              <label className="text-[13px] uppercase tracking-wider text-gray-600 font-medium ml-1">Number of Guest</label>
              <input 
                type="text" 
                placeholder="40 Person"
                className="w-full bg-white/80 border border-primary/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-gray-300"
              />
            </div>

            {/* Type of Event */}
            <div className="space-y-2">
              <label className="text-[13px] uppercase tracking-wider text-gray-600 font-medium ml-1">Type of Event</label>
              <input 
                type="text" 
                placeholder="e.g. Wedding, Bridal Shower..."
                className="w-full bg-white/80 border border-primary/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-gray-300"
              />
            </div>

            {/* Message - Full Width */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[13px] uppercase tracking-wider text-gray-600 font-medium ml-1">Message (required)</label>
              <textarea 
                rows={4}
                placeholder="Special requests, dietary needs, vision for your event..."
                className="w-full bg-white/80 border border-primary/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-gray-300 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-6">
              <button 
                type="submit"
                className="w-full md:w-auto min-w-[240px] block mx-auto bg-black text-white py-5 px-12 uppercase tracking-[0.2em] text-sm font-medium transition-all hover:bg-neutral-800 hover:tracking-[0.3em] active:scale-95 shadow-xl"
              >
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;
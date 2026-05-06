"use client"

import React, { useState } from 'react';
import { Minus, Plus, ChevronRight } from 'lucide-react';
import { SUMMER_EVENTS_CONTENT } from '../config/constant';

const BookingSection = () => {
    // Defaulting to 1 guest as per the pricing summary in the content object
    const [guests, setGuests] = useState(1);
    
    // Extracting numeric value from the "$150" string for calculations
    const pricePerPerson = parseInt(SUMMER_EVENTS_CONTENT.pricing.price.replace('$', ''));

    return (
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 bg-white flex flex-col md:flex-row items-start justify-center gap-16 lg:gap-24 font-sans">
            
            {/* Left Column: About & What's Included */}
            <div className="flex-1 w-full space-y-12">
                <div className="max-w-xl">
                    <h2 className="text-5xl md:text-6xl font-serif leading-tight text-slate-900">
                        {SUMMER_EVENTS_CONTENT.about.title}
                    </h2>
                    <h2 className="text-5xl md:text-6xl font-serif italic text-pink-400 -mt-2">
                        {SUMMER_EVENTS_CONTENT.about.titleHighlight}
                    </h2>
                    <p className="mt-8 text-slate-600 text-lg leading-relaxed">
                        {SUMMER_EVENTS_CONTENT.about.description}
                    </p>
                </div>

                {/* What's Included Card - Matching Figma Frame 2147258062.jpg */}
                <div className="rounded-[40px] bg-gradient-to-br from-[#FDF2F4] via-[#FDF2F4] to-white p-10 md:p-12 border border-pink-100/50 shadow-sm">
                    <h3 className="text-2xl font-serif italic text-slate-800 mb-8 pb-4 border-b border-pink-200/60">
                        {SUMMER_EVENTS_CONTENT.about.whatsIncluded.title}
                    </h3>
                    
                    <div className="space-y-7">
                        {SUMMER_EVENTS_CONTENT.about.whatsIncluded.items.map((item, index) => (
                            <div key={index} className="flex gap-5 items-start group">
                                <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center flex-shrink-0 mt-1 bg-white">
                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full group-hover:bg-pink-400 transition-colors" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 text-base">{item.title}</h4>
                                    <p className="text-sm text-slate-500 mt-0.5">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Booking Card */}
            <div className="w-full md:w-[460px] md:sticky md:top-10">
                <div className="rounded-[40px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden bg-white">
                    
                    {/* Header */}
                    <div className="bg-[#FDF2F4] p-10">
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-slate-900">{SUMMER_EVENTS_CONTENT.pricing.price}</span>
                            <span className="text-slate-500 font-medium">{SUMMER_EVENTS_CONTENT.pricing.unit}</span>
                        </div>
                        <p className="text-slate-600 mt-1 font-medium">{SUMMER_EVENTS_CONTENT.pricing.subtext}</p>
                    </div>

                    <div className="p-10 space-y-8">
                        {/* Interactive Selection Area */}
                        <div className="border border-slate-100 rounded-[24px] p-6 space-y-8">
                            <div>
                                <label className="text-[11px] font-bold text-slate-400 block mb-4 uppercase tracking-[0.1em]">
                                    {SUMMER_EVENTS_CONTENT.pricing.booking.calendarLabel}
                                </label>
                                <div className="flex gap-3 items-center">
                                    <button className="flex-1 bg-pink-50 border border-pink-200 py-3 rounded-xl text-center ring-2 ring-pink-100 ring-offset-1">
                                        <p className="text-[10px] font-bold uppercase text-pink-500 tracking-wider">July 06</p>
                                        <p className="text-sm font-bold text-slate-800">Monday</p>
                                    </button>
                                    <button className="flex-1 border border-slate-100 py-3 rounded-xl text-center hover:bg-slate-50 transition-colors">
                                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">July 13</p>
                                        <p className="text-sm font-bold text-slate-600">Monday</p>
                                    </button>
                                    <ChevronRight className="text-slate-300" size={24} />
                                </div>
                            </div>

                            <div>
                                <label className="text-[11px] font-bold text-slate-400 block mb-4 uppercase tracking-[0.1em]">
                                    {SUMMER_EVENTS_CONTENT.pricing.booking.timeLabel}
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {SUMMER_EVENTS_CONTENT.pricing.booking.times.map((time, i) => (
                                        <button 
                                            key={i} 
                                            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                                                time === "6:00 PM" 
                                                    ? 'bg-pink-100 border border-pink-200 text-pink-700' 
                                                    : 'border border-slate-100 text-slate-600 hover:border-slate-300'
                                            }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <span className="text-sm font-bold text-slate-700">{SUMMER_EVENTS_CONTENT.pricing.booking.guestLabel}</span>
                                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="p-3 hover:bg-slate-50 text-slate-400 transition-colors">
                                        <Minus size={18} />
                                    </button>
                                    <span className="px-5 py-1 text-sm font-bold text-slate-800 min-w-[40px] text-center">{guests}</span>
                                    <button onClick={() => setGuests(guests + 1)} className="p-3 hover:bg-slate-50 text-slate-400 transition-colors">
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Summary Section */}
                        <div className="space-y-4 pt-4 border-t border-slate-50">
                            <div className="flex justify-between text-slate-600 text-sm">
                                <span>{SUMMER_EVENTS_CONTENT.pricing.price} × {guests} Guest{guests > 1 ? 's' : ''}</span>
                                <span className="font-bold text-slate-900">${pricePerPerson * guests}</span>
                            </div>
                            <div className="flex justify-between text-slate-600 text-sm">
                                <span>{SUMMER_EVENTS_CONTENT.pricing.booking.summary.serviceFeeLabel}</span>
                                <span className="font-bold text-slate-900">{SUMMER_EVENTS_CONTENT.pricing.booking.summary.serviceFeeValue}</span>
                            </div>
                            <div className="flex justify-between text-slate-900 pt-5 border-t border-slate-100 font-bold text-xl">
                                <span>{SUMMER_EVENTS_CONTENT.pricing.booking.summary.totalLabel}</span>
                                <span>${pricePerPerson * guests}</span>
                            </div>
                        </div>

                        <button className="w-full bg-black text-white py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-[13px] hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-black/5">
                            {SUMMER_EVENTS_CONTENT.pricing.booking.buttonText}
                        </button>

                        <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest leading-relaxed">
                            Non-refundable • reschedule available <br /> instant confirmation
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingSection;
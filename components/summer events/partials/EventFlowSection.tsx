"use client";

import React from 'react';
import Image from 'next/image';
import { SUMMER_EVENTS_CONTENT } from '../config/constant';

const EventFlowSection = () => {
  const { flow } = SUMMER_EVENTS_CONTENT;

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto rounded-[40px] bg-[#FDF2F4] p-8 md:p-16 lg:p-20">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-serif text-center text-slate-900 mb-12 md:mb-16">
          {flow.title}
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Container */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-sm">
              <Image
                src={flow.img} // Replace with your actual path from the flow section if added to constant
                alt="Event atmosphere"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Steps List */}
          <div className="w-full lg:w-1/2 space-y-10 md:space-y-12">
            {flow.steps.map((step) => (
              <div key={step.id} className="flex items-start gap-6 group">
                {/* Step Number Circle */}
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-slate-900 font-medium text-lg shadow-sm border border-pink-100">
                  {step.id}
                </div>

                {/* Step Text Content */}
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-serif text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventFlowSection;
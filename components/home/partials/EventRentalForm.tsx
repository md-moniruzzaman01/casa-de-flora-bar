// components/EventRentalForm.tsx
"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { gsap } from 'gsap';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  eventDate: string;
  time: string;
  message: string;
  guests: string;
}

const EventRentalForm = () => {
  const containerRef = useRef(null);
  const { register, handleSubmit } = useForm<FormData>();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the header and form elements
      gsap.from(".animate-item", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <section ref={containerRef} className="max-w-7xl mx-auto px-6 py-11 md:py-20 my-20 md:my-40 font-serif">
      <div className="text-center mb-16">
        <h1 className="animate-item text-5xl md:text-6xl tracking-widest uppercase mb-4">Event Rental</h1>
        <p className="animate-item text-xl tracking-wide uppercase italic">
          Host your next memorable event <br /> at Casa De Flora Bar
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side */}
        <div className="lg:col-span-4 space-y-8">
          <p className="animate-item text-lg leading-relaxed text-gray-700">
            Fill out the form on your right, and our team will get in touch 
            with you shortly to share our event packages and confirm 
            available dates for your celebration.
          </p>
          <button className="animate-item bg-black text-white px-10 py-4 uppercase tracking-tighter hover:bg-gray-900 transition-colors">
            Reserve your Seat
          </button>
        </div>

        {/* Right Side - Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="animate-item md:col-span-2 space-y-2">
            <label className="text-sm">Name (required)</label>
            <input {...register("name")} className="w-full border border-pink-100 bg-pink-50/20 p-4 outline-none focus:border-pink-300" placeholder="Name" />
          </div>

          <div className="animate-item space-y-2">
            <label className="text-sm">Email (required)</label>
            <input {...register("email")} className="w-full border border-pink-100 bg-pink-50/20 p-4 outline-none" placeholder="Email" />
          </div>

          <div className="animate-item space-y-2">
            <label className="text-sm">Phone</label>
            <input {...register("phone")} className="w-full border border-pink-100 bg-pink-50/20 p-4 outline-none" placeholder="Phone" />
          </div>

          {/* ... Add other fields following the same pattern ... */}

          <div className="animate-item md:col-span-2 space-y-2">
            <label className="text-sm">Message (required)</label>
            <textarea {...register("message")} rows={5} className="w-full border border-pink-100 bg-pink-50/20 p-4 outline-none" placeholder="Tell us What kind of event..." />
          </div>

          <div className="animate-item md:col-span-2 flex justify-center mt-6">
            <button type="submit" className="bg-black text-white w-full md:w-1/2 py-4 uppercase tracking-widest hover:scale-105 transition-transform">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EventRentalForm;
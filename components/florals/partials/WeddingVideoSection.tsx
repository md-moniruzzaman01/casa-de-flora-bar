'use client'; // Required for accessing DOM via ref

import React, { useRef, useEffect } from 'react';

// To keep it simple, I've used the same serif font as your design 
// for the main headline. Ensure you have a similar serif font 
// available (like Playfair Display or Cormorant Garamond).
const WeddingVideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Wait for the video to be ready and loaded to a point 
    // where it can jump to the 30-second mark.
    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        // Set start time to 30 seconds
        videoRef.current.currentTime = 30;
        // Attempt to auto-play after setting the time.
        // Modern browsers usually allow it when 'muted' is set.
        videoRef.current.play().catch(error => {
          console.error("Auto-play was prevented:", error);
        });
      }
    };

    const videoNode = videoRef.current;
    if (videoNode) {
      videoNode.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    // Cleanup: remove the event listener
    return () => {
      if (videoNode) {
        videoNode.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <section className="relative w-full h-[80vh] overflow-hidden  mt-24 mb-16 px-6 lg:px-12 xl:px-24">
      {/* Container to handle the overall layout - similar to your figma cards */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-[#E18F99]/10">
        
        {/* Background Video */}
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover z-0"
        >
          <source 
            src="/florals/Fairytale Nigerian & Belize Wedding in Brooklyn.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>

        {/* --- Content Overlay (Redesign for Beauty) --- */}
        {/* We'll use a softer, light overlay and central text like your cards */}
        
        {/* Light Overlay to help text legibility */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-10" />

        {/* Content Container (z-index ensures it's above everything) */}
        <div className="relative z-20 flex h-full items-center justify-center text-center px-6">
          <div className="max-w-4xl space-y-8 bg-white/80 p-12 md:p-16 rounded-3xl shadow-lg border border-white/50 backdrop-blur-md">
            
            {/* Themed Accent Line (pink like your titles) */}
            <div className="w-20 h-0.5  mx-auto" />

            <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-[#2D2D2D] tracking-tight">
              A Moment in Time, Forever Captured
            </h2>

            <p className="text-xl font-light text-[#555] max-w-2xl mx-auto italic">
              From Brooklyn with Love: A glance into the fairytale celebration of two cultures uniting.
            </p>

            <button className="mt-10 bg-[#E18F99] text-white px-10 py-3.5 text-sm uppercase tracking-widest rounded-full transition-all hover:bg-[#D07E88] shadow-md hover:shadow-lg hover:-translate-y-0.5">
              Watch The Highlights
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingVideoSection;
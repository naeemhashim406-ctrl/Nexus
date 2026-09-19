import React, { useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '../config/content';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = SITE_CONFIG.testimonials;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Drag handling
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Carousel Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0F6FD] border border-[#1F4FA3]/15 shadow-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F4FA3]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1F4FA3]">
                Client Endorsements
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#0B1F4D] tracking-tight">
              Stories of Seamless Border Crossings
            </h2>
          </div>

          {/* Prev/Next Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="p-3 rounded-full border border-[#0B1F4D]/15 text-[#0B1F4D] hover:bg-[#0B1F4D] hover:text-white transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="p-3 rounded-full border border-[#0B1F4D]/15 text-[#0B1F4D] hover:bg-[#0B1F4D] hover:text-white transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((rev) => (
              <div key={rev.id} className="w-full flex-shrink-0 px-2 sm:px-4">
                <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#F4F8FD] to-[#FFFFFF] border border-[#0B1F4D]/8 shadow-[0_10px_35px_rgba(11,31,77,0.04)] relative">
                  <Quote className="absolute top-6 right-8 w-16 h-16 text-[#1F4FA3]/8 pointer-events-none" />

                  {/* Rating Stars & Destination */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-[#1F4FA3]">
                      <MapPin className="w-3 h-3 text-[#5BB8F5]" />
                      <span>{rev.destination}</span>
                    </div>
                  </div>

                  {/* Quote Text */}
                  <p className="font-serif text-lg sm:text-2xl font-light text-[#0B1F4D] italic leading-relaxed mb-8">
                    "{rev.quote}"
                  </p>

                  {/* Author Meta */}
                  <div className="flex items-center justify-between border-t border-slate-200/70 pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0B1F4D] to-[#1F4FA3] text-white flex items-center justify-center font-serif text-lg font-medium shadow-md">
                        {rev.avatarInitials}
                      </div>

                      <div>
                        <h4 className="font-serif text-lg font-medium text-[#0B1F4D]">{rev.author}</h4>
                        <p className="text-xs text-[#5B6B85]">{rev.role}</p>
                      </div>
                    </div>

                    <div className="text-right hidden sm:block">
                      <span className="text-xs font-medium text-[#1F4FA3] block">{rev.service}</span>
                      <span className="text-[11px] text-[#5B6B85]">{rev.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Indicator Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to review ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-8 bg-[#1F4FA3]' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

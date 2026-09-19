import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import { ThreeGlobe } from './ThreeGlobe';
import { SITE_CONFIG } from '../config/content';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center overflow-hidden bg-gradient-to-b from-[#EBF3FC]/70 via-[#F4F8FD] to-[#FFFFFF]"
    >
      {/* Subtle background ambient mesh */}
      <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-bl from-[#5BB8F5]/10 via-[#1F4FA3]/5 to-transparent rounded-bl-full pointer-events-none blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#7CD0FF]/10 rounded-full pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Super-title badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#1F4FA3]/15 shadow-[0_2px_10px_rgba(11,31,77,0.04)] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#1F4FA3]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1F4FA3]">
                Global Study &amp; Travel Visa Advisory
              </span>
              <span className="text-[#5B6B85] text-xs">|</span>
              <span className="text-[11px] font-medium text-[#5B6B85]">2025/2026 Intakes Open</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-light text-[#0B1F4D] tracking-tight leading-[1.08] mb-6">
              Your Journey. <br />
              <span className="italic font-normal bg-gradient-to-r from-[#0B1F4D] via-[#1F4FA3] to-[#2F7BE5] bg-clip-text text-transparent">
                Our Priority.
              </span>
            </h1>

            {/* Subline */}
            <p className="text-base sm:text-lg text-[#5B6B85] font-light leading-relaxed max-w-xl mb-8">
              Premier study visa consultation, global university admissions, official overseas work permits, tourist visas, and verified airfare holds. Based at Civic Center Gujranwala, we bridge the distance to world borders with zero margin for error.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                id="hero-book-consultation-btn"
                onClick={() => scrollTo('#contact')}
                className="group px-7 py-4 rounded-full bg-gradient-to-r from-[#0B1F4D] via-[#122B66] to-[#1F4FA3] text-white text-xs sm:text-sm uppercase tracking-[0.18em] font-medium shadow-[0_8px_25px_rgba(11,31,77,0.22)] hover:shadow-[0_12px_30px_rgba(31,79,163,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-services-btn"
                onClick={() => scrollTo('#services')}
                className="px-7 py-4 rounded-full bg-white/80 hover:bg-white text-[#0B1F4D] border border-[#0B1F4D]/15 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2.5"
              >
                <Compass className="w-4 h-4 text-[#1F4FA3]" />
                <span>Explore Services</span>
              </button>
            </div>

            {/* Quick credibility bullet tags */}
            <div className="pt-6 border-t border-[#0B1F4D]/8 w-full flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-[#5B6B85]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1F4FA3]" />
                <span>98.6% Verified Approval Protocol</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5BB8F5]" />
                <span>Embassy-Compliant Vouchers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F4FA3]" />
                <span>Direct Support: <strong className="text-[#0B1F4D] font-mono">{SITE_CONFIG.contact.phoneFormatted}</strong></span>
              </div>
            </div>
          </div>

          {/* Right 3D Interactive Globe Container */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Subtle glow backplate */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#1F4FA3]/20 via-[#5BB8F5]/25 to-transparent blur-3xl -z-10" />

            <div className="w-full max-w-[480px] aspect-square relative flex items-center justify-center">
              <ThreeGlobe
                size="hero"
                interactive={true}
                autoRotateSpeed={0.0025}
                className="w-full h-full"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Downward scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#5B6B85] font-medium">Scroll</span>
        <button
          onClick={() => scrollTo('#trust-strip')}
          aria-label="Scroll down to trust strip"
          className="p-1 text-[#1F4FA3] animate-bounce"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

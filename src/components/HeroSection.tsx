import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass, ShieldCheck, ChevronDown, Moon, GraduationCap } from 'lucide-react';
import { ThreeGlobe } from './ThreeGlobe';
import { SITE_CONFIG } from '../config/content';
import { EASE_LUXURY } from './ScrollReveal';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] pt-24 pb-10 md:pt-28 md:pb-14 flex items-center overflow-hidden bg-gradient-to-b from-[#EBF3FC]/70 via-[#F4F8FD] to-[#FFFFFF]"
    >
      {/* Subtle background ambient mesh */}
      <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-bl from-[#5BB8F5]/10 via-[#1F4FA3]/5 to-transparent rounded-bl-full pointer-events-none blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#7CD0FF]/10 rounded-full pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content with Staggered Cascading Reveals */}
          <div className="lg:col-span-7 flex flex-col items-start z-10 w-full min-w-0">
            {/* Super-title badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_LUXURY, delay: 0.1 }}
              className="inline-flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/90 border border-[#1F4FA3]/15 shadow-[0_2px_10px_rgba(11,31,77,0.04)] mb-6 max-w-full"
            >
              <span className="w-2 h-2 rounded-full bg-[#1F4FA3] flex-shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider sm:tracking-[0.2em] text-[#1F4FA3] whitespace-nowrap">
                Study, Travel &amp; Hajj/Umrah Advisory
              </span>
              <span className="text-[#5B6B85] text-xs hidden xs:inline">|</span>
              <button
                type="button"
                id="hero-intake-badge-btn"
                onClick={() => window.dispatchEvent(new CustomEvent('open-study-abroad-modal'))}
                className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#1F4FA3] hover:text-[#0B1F4D] transition-colors cursor-pointer group"
                title="View 2027-2028 Study Abroad Admissions Intake"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#1F4FA3] group-hover:scale-110 transition-transform" />
                <span className="underline decoration-[#5BB8F5] underline-offset-2">Intake 2027–2028 Open</span>
              </button>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_LUXURY, delay: 0.2 }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-light text-[#0B1F4D] tracking-tight leading-[1.12] sm:leading-[1.08] mb-6 break-words"
            >
              Your Journey. <br />
              <span className="italic font-normal bg-gradient-to-r from-[#0B1F4D] via-[#1F4FA3] to-[#2F7BE5] bg-clip-text text-transparent">
                Our Priority.
              </span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE_LUXURY, delay: 0.3 }}
              className="text-sm sm:text-base lg:text-lg text-[#5B6B85] font-light leading-relaxed max-w-xl mb-8 break-words"
            >
              Premier study visa consultation, global admissions, official work permits, tourist visas, and authorized Hajj &amp; Umrah pilgrimage packages. Based at Civic Center Gujranwala, we bridge the distance to world borders and sacred sanctuaries with zero margin for error.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_LUXURY, delay: 0.48 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 w-full sm:w-auto mb-10"
            >
              <button
                id="hero-book-consultation-btn"
                onClick={() => scrollTo('#contact')}
                className="group px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#0B1F4D] via-[#122B66] to-[#1F4FA3] text-white text-xs sm:text-sm uppercase tracking-wider sm:tracking-[0.18em] font-medium shadow-[0_8px_25px_rgba(11,31,77,0.22)] hover:shadow-[0_12px_30px_rgba(31,79,163,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5"
              >
                <span className="text-center">Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </button>

              <button
                id="hero-hajj-umrah-btn"
                onClick={() => scrollTo('#hajj-umrah')}
                className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-full bg-white/95 hover:bg-white text-[#0B1F4D] border border-[#1F4FA3]/25 text-xs sm:text-sm uppercase tracking-wider sm:tracking-[0.18em] font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Moon className="w-4 h-4 text-[#1F4FA3] fill-[#1F4FA3]/20 flex-shrink-0" />
                <span>Hajj &amp; Umrah</span>
              </button>

              <button
                id="hero-explore-services-btn"
                onClick={() => scrollTo('#services')}
                className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-full bg-white/60 hover:bg-white text-[#5B6B85] hover:text-[#0B1F4D] border border-[#0B1F4D]/10 text-xs sm:text-sm uppercase tracking-wider sm:tracking-[0.18em] font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#1F4FA3] flex-shrink-0" />
                <span>Services</span>
              </button>
            </motion.div>

            {/* Quick credibility bullet tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_LUXURY, delay: 0.6 }}
              className="pt-6 border-t border-[#0B1F4D]/8 w-full flex flex-wrap items-center gap-y-2.5 gap-x-4 sm:gap-x-6 text-xs text-[#5B6B85]"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1F4FA3] flex-shrink-0" />
                <span>98.6% Verified Approval Protocol</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5BB8F5] flex-shrink-0" />
                <span>Embassy-Compliant Vouchers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F4FA3] flex-shrink-0" />
                <span className="break-all sm:break-normal">Direct Support: <strong className="text-[#0B1F4D] font-mono">{SITE_CONFIG.contact.phoneFormatted}</strong></span>
              </div>
            </motion.div>
          </div>

          {/* Right 3D Interactive Globe Container with Silky Scale Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: EASE_LUXURY, delay: 0.25 }}
            className="lg:col-span-5 relative flex items-center justify-center w-full min-w-0"
          >
            <div className="w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] lg:max-w-[460px] aspect-square relative flex items-center justify-center mx-auto">
              <ThreeGlobe
                size="hero"
                interactive={true}
                autoRotateSpeed={0.0025}
                className="w-full h-full"
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Downward scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#5B6B85] font-medium">Scroll</span>
        <button
          onClick={() => scrollTo('#trust-strip')}
          aria-label="Scroll down to trust strip"
          className="p-1 text-[#1F4FA3] animate-bounce"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </motion.div>
    </section>
  );
};


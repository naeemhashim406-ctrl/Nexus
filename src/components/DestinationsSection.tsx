import React, { useState } from 'react';
import { ArrowRight, Clock, Check, Sparkles, MapPin, Globe, Shield, Calendar } from 'lucide-react';
import { SITE_CONFIG, DestinationItem } from '../config/content';
import { ScrollReveal, StaggerContainer, StaggerItem, InteractiveCard } from './ScrollReveal';

export const DestinationsSection: React.FC = () => {
  const [selectedDest, setSelectedDest] = useState<DestinationItem>(SITE_CONFIG.destinations[0]);

  const handleSelect = (dest: DestinationItem) => {
    setSelectedDest(dest);
  };

  const scrollToContact = (destName: string) => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="destinations" className="py-12 md:py-16 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Tight, Focused Spacing */}
        <ScrollReveal variant="fadeUp" className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0F6FD] border border-[#1F4FA3]/15 shadow-sm mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F4FA3]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1F4FA3]">
              Global Destinations
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#0B1F4D] tracking-tight mb-3">
            Popular Travel &amp; Visa Corridors
          </h2>

          <p className="text-sm sm:text-base text-[#5B6B85] font-light leading-relaxed">
            Select any destination corridor to review consular guidelines, average visa turnaround, and application requirements.
          </p>
        </ScrollReveal>

        {/* Responsive Layout: Selected Corridor Spotlight + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Active Featured Corridor Spotlight Card (Fast, Zero-lag hardware accelerated) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-center w-full min-w-0">
            <div className="w-full rounded-2xl bg-gradient-to-br from-[#0B1F4D] via-[#122B66] to-[#1F4FA3] text-white p-5 sm:p-6 shadow-[0_12px_35px_rgba(11,31,77,0.12)] border border-[#5BB8F5]/20">
              
              {/* Header Badge & Flag */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-3xl sm:text-4xl flex-shrink-0" role="img" aria-label={selectedDest.name}>
                    {selectedDest.flag}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl sm:text-2xl font-light text-white truncate">
                      {selectedDest.name}
                    </h3>
                    <span className="text-xs text-[#5BB8F5] uppercase tracking-wider font-medium block truncate">
                      {selectedDest.popularFor}
                    </span>
                  </div>
                </div>

                <span className="text-xs px-2.5 py-1 rounded-full bg-[#5BB8F5]/20 text-[#7CD0FF] border border-[#5BB8F5]/30 font-medium whitespace-nowrap flex-shrink-0">
                  {selectedDest.featuredRate}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-200/90 font-light leading-relaxed mb-4">
                {selectedDest.description}
              </p>

              {/* Quick Spec Matrix */}
              <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 mb-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Visa Category</span>
                  <span className="text-slate-100 font-medium line-clamp-1">{selectedDest.visaType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Timeline</span>
                  <span className="text-slate-100 font-medium">{selectedDest.processingTime}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Advisory Level</span>
                  <span className="text-[#5BB8F5] font-medium flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Embassy Vetted
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Next Intake</span>
                  <span className="text-slate-100 font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#7CD0FF]" /> Open 2027/28
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                id="destination-apply-btn"
                onClick={() => scrollToContact(selectedDest.name)}
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#5BB8F5] to-[#2F7BE5] hover:from-[#7CD0FF] hover:to-[#5BB8F5] text-[#0B1F4D] text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-md cursor-pointer"
              >
                <span>Apply for {selectedDest.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Destination List (8 Countries) in Clean, Responsive Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {SITE_CONFIG.destinations.map((dest) => {
              const isSelected = selectedDest.id === dest.id;

              return (
                <div
                  key={dest.id}
                  id={`dest-item-${dest.id}`}
                  onClick={() => handleSelect(dest)}
                  className={`cursor-pointer p-3.5 sm:p-4 rounded-xl border transition-all duration-200 text-left flex flex-col justify-between min-w-0 ${
                    isSelected
                      ? 'bg-[#F0F6FE] border-[#1F4FA3] shadow-md ring-2 ring-[#5BB8F5]/30'
                      : 'bg-[#FBFDFF] hover:bg-white border-[#0B1F4D]/8 hover:border-[#1F4FA3]/30 hover:shadow-sm'
                  }`}
                >
                  <div>
                    {/* Flag & Header */}
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xl flex-shrink-0" role="img" aria-label={dest.name}>
                          {dest.flag}
                        </span>
                        <h4 className="font-serif text-base font-medium text-[#0B1F4D] truncate">
                          {dest.name}
                        </h4>
                      </div>

                      {isSelected ? (
                        <span className="w-5 h-5 rounded-full bg-[#1F4FA3] text-white flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">{dest.featuredRate}</span>
                      )}
                    </div>

                    {/* Visa type */}
                    <p className="text-[11px] font-medium text-[#1F4FA3] mb-1 truncate">
                      {dest.visaType}
                    </p>

                    <p className="text-xs text-[#5B6B85] font-light leading-relaxed line-clamp-2 mb-2">
                      {dest.description}
                    </p>
                  </div>

                  {/* Footer stats */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#5B6B85]">
                    <span className="flex items-center gap-1 min-w-0">
                      <Clock className="w-3 h-3 text-[#1F4FA3] flex-shrink-0" />
                      <span className="truncate">{dest.processingTime}</span>
                    </span>
                    <span className="text-[10px] text-[#1F4FA3] font-medium underline underline-offset-2">
                      {isSelected ? 'Selected' : 'View Details'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};


import React, { useState } from 'react';
import { ArrowRight, Clock, Check, Sparkles, MapPin } from 'lucide-react';
import { ThreeGlobe } from './ThreeGlobe';
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
    <section id="destinations" className="py-20 md:py-28 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Smooth Reveal */}
        <ScrollReveal variant="fadeUp" className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0F6FD] border border-[#1F4FA3]/15 shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F4FA3]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1F4FA3]">
              Global Destinations
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#0B1F4D] tracking-tight mb-4">
            Popular Travel &amp; Visa Corridors
          </h2>

          <p className="text-sm sm:text-base text-[#5B6B85] font-light leading-relaxed">
            Select any destination to orient our interactive 3D consular globe directly to its coordinates and review visa protocols.
          </p>
        </ScrollReveal>

        {/* Responsive Grid: Interactive 3D Globe + Destination Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Sticky 3D Globe on Desktop with Silky Reveal */}
          <ScrollReveal
            variant="fadeScale"
            className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-center w-full min-w-0"
          >
            <div className="w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[420px] aspect-square relative flex items-center justify-center bg-gradient-to-b from-[#F0F6FD]/90 to-[#FFFFFF] rounded-3xl p-2 sm:p-4 border border-[#0B1F4D]/8 shadow-[0_10px_35px_rgba(11,31,77,0.04)] overflow-visible">
              <ThreeGlobe
                selectedLocation={{
                  lat: selectedDest.lat,
                  lng: selectedDest.lng,
                  name: selectedDest.name,
                }}
                interactive={true}
                size="destination"
                autoRotateSpeed={0.001}
                className="w-full h-full"
              />
            </div>

            {/* Selected Country Active Card Spotlight */}
            <div className="mt-6 w-full max-w-[420px] p-5 rounded-2xl bg-[#0B1F4D] text-white shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl" role="img" aria-label={selectedDest.name}>
                    {selectedDest.flag}
                  </span>
                  <div>
                    <h4 className="font-serif text-lg font-light leading-tight">{selectedDest.name}</h4>
                    <span className="text-[10px] uppercase tracking-wider text-[#5BB8F5]">
                      {selectedDest.popularFor}
                    </span>
                  </div>
                </div>

                <span className="text-xs px-2.5 py-1 rounded-full bg-[#5BB8F5]/20 text-[#7CD0FF] border border-[#5BB8F5]/30">
                  {selectedDest.featuredRate}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs py-3 border-y border-white/10 my-3">
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Visa Category</span>
                  <span className="font-medium text-slate-100 line-clamp-2 break-words">{selectedDest.visaType}</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Timeline</span>
                  <span className="font-medium text-slate-100 break-words">{selectedDest.processingTime}</span>
                </div>
              </div>

              <button
                onClick={() => scrollToContact(selectedDest.name)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#1F4FA3] to-[#5BB8F5] text-white text-xs uppercase tracking-wider sm:tracking-widest font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
              >
                <span>Apply for {selectedDest.name}</span>
                <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
              </button>
            </div>
          </ScrollReveal>

          {/* Destination List (8 Countries) with Staggered Interactive Cards */}
          <StaggerContainer
            staggerDelay={0.08}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {SITE_CONFIG.destinations.map((dest) => {
              const isSelected = selectedDest.id === dest.id;

              return (
                <StaggerItem key={dest.id} className="h-full">
                  <InteractiveCard
                    id={`dest-item-${dest.id}`}
                    onClick={() => handleSelect(dest)}
                    tiltAngle={2.5}
                    className={`h-full cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between min-w-0 ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#F0F6FE] to-white border-[#1F4FA3] shadow-md ring-2 ring-[#5BB8F5]/30'
                        : 'bg-[#FBFDFF] hover:bg-white border-[#0B1F4D]/8 hover:border-[#1F4FA3]/30 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      {/* Flag & Header */}
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                          <span className="text-2xl flex-shrink-0" role="img" aria-label={dest.name}>
                            {dest.flag}
                          </span>
                          <h3 className="font-serif text-lg font-medium text-[#0B1F4D] group-hover:text-[#1F4FA3] transition-colors truncate">
                            {dest.name}
                          </h3>
                        </div>

                        {isSelected ? (
                          <span className="w-6 h-6 rounded-full bg-[#1F4FA3] text-white flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <MapPin className="w-4 h-4 text-slate-300 group-hover:text-[#5BB8F5] transition-colors flex-shrink-0" />
                        )}
                      </div>

                      {/* Visa type badge */}
                      <p className="text-xs font-medium text-[#1F4FA3] mb-2 flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5BB8F5] flex-shrink-0 mt-1" />
                        <span className="break-words min-w-0">{dest.visaType}</span>
                      </p>

                      {/* Short Description */}
                      <p className="text-xs text-[#5B6B85] font-light leading-relaxed mb-4 break-words">
                        {dest.description}
                      </p>
                    </div>

                    {/* Footer stats */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] text-[#5B6B85]">
                      <span className="flex items-center gap-1 min-w-0">
                        <Clock className="w-3 h-3 text-[#1F4FA3] flex-shrink-0" />
                        <span className="truncate">{dest.processingTime}</span>
                      </span>
                      <span className="font-medium text-[#0B1F4D] group-hover:text-[#1F4FA3] transition-colors whitespace-nowrap flex-shrink-0">
                        {dest.featuredRate}
                      </span>
                    </div>
                  </InteractiveCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

        </div>
      </div>
    </section>
  );
};


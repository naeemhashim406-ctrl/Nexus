import React from 'react';
import { ArrowRight, CheckCircle, FileText, Send, Plane } from 'lucide-react';
import { SITE_CONFIG } from '../config/content';
import { ScrollReveal, StaggerContainer, StaggerItem, InteractiveCard } from './ScrollReveal';

const stepIcons = [FileText, CheckCircle, Send, Plane];

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#F4F8FD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Smooth Reveal */}
        <ScrollReveal variant="fadeUp" className="max-w-2xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1F4FA3]/15 shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F4FA3]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1F4FA3]">
              Proven Process
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#0B1F4D] tracking-tight mb-4 break-words">
            How We Secure Your Visa &amp; Travel
          </h2>

          <p className="text-sm sm:text-base text-[#5B6B85] font-light leading-relaxed break-words">
            A transparent 4-stage roadmap eliminating guesswork, administrative delay, and embassy scrutiny bottlenecks.
          </p>
        </ScrollReveal>

        {/* 4 Steps Timeline Grid with Staggered Cascading Reveal */}
        <div className="relative">
          {/* Horizontal connecting hairline line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 -translate-y-12 left-12 right-12 h-[2px] bg-gradient-to-r from-[#0B1F4D]/15 via-[#1F4FA3]/40 to-[#5BB8F5] -z-0" />

          <StaggerContainer
            staggerDelay={0.12}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10"
          >
            {SITE_CONFIG.steps.map((item, idx) => {
              const Icon = stepIcons[idx % stepIcons.length];

              return (
                <StaggerItem key={item.step} className="h-full">
                  <InteractiveCard
                    id={`step-${item.step}`}
                    tiltAngle={3}
                    className="h-full bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-[#0B1F4D]/8 shadow-[0_4px_20px_rgba(11,31,77,0.03)] hover:shadow-[0_16px_35px_rgba(31,79,163,0.12)] transition-all duration-300 flex flex-col justify-between min-w-0"
                  >
                    <div>
                      {/* Step badge & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-serif text-3xl font-normal text-[#1F4FA3]/30 group-hover:text-[#1F4FA3] transition-colors">
                          {item.step}
                        </span>

                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#F0F6FD] text-[#1F4FA3] group-hover:bg-[#1F4FA3] group-hover:text-white transition-colors duration-300 flex items-center justify-center shadow-inner flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Timeline pill */}
                      <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#5BB8F5]/15 text-[#1F4FA3] mb-3">
                        {item.duration}
                      </span>

                      {/* Step Title */}
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-[#0B1F4D] mb-2 leading-snug break-words">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[#5B6B85] font-light leading-relaxed mb-4 break-words">
                        {item.desc}
                      </p>
                    </div>

                    {/* Detail sub-point */}
                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-[11px] text-[#0B1F4D]/75 italic break-words">
                        💡 {item.detail}
                      </p>
                    </div>
                  </InteractiveCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Bottom CTA strip */}
        <ScrollReveal variant="fadeUp" delay={0.2} className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-[#0B1F4D] hover:bg-[#1F4FA3] text-white text-xs uppercase tracking-wider sm:tracking-widest font-medium shadow-md transition-all max-w-full text-center"
          >
            <span>Initiate Step 01 Today</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </ScrollReveal>

      </div>
    </section>
  );
};

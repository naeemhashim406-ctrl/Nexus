import React from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { ThreeCrystalN } from './ThreeCrystalN';
import { SITE_CONFIG } from '../config/content';
import { ScrollReveal, StaggerContainer, StaggerItem, InteractiveCard } from './ScrollReveal';

export const WhyChooseSection: React.FC = () => {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-[#07132F] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1F4FA3]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#5BB8F5]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Silky Reveal */}
        <ScrollReveal variant="fadeUp" className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#5BB8F5]/30 mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#5BB8F5]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7CD0FF]">
              The NEXUS Advantage
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-white mb-4 break-words">
            Why Discerning Travelers Choose NEXUS
          </h2>

          <p className="text-sm sm:text-base text-[#8DBCE2] font-light leading-relaxed break-words">
            Consular laws and visa regulations evolve continually. We combine legal diligence with a global logistics network to ensure your passport returns approved.
          </p>
        </ScrollReveal>

        {/* Grid: 3D "N" Crystal + 4 Strengths */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: 3D Faceted "N" Crystal with Scale Reveal */}
          <ScrollReveal
            variant="fadeScale"
            className="lg:col-span-5 flex flex-col items-center w-full min-w-0"
          >
            <div className="w-full max-w-[280px] xs:max-w-[340px] sm:max-w-[400px] aspect-square relative flex items-center justify-center mx-auto">
              <ThreeCrystalN className="w-full h-full" />
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-[#5BB8F5] font-semibold">
                NEXUS Faceted Signature
              </p>
              <p className="text-[11px] text-slate-400 font-light mt-1">
                Precision • Compliance • Discretion
              </p>
            </div>
          </ScrollReveal>

          {/* Right: 4 Key Strengths Cards with Staggered Cascading Reveal & Interactive Spotlight */}
          <StaggerContainer
            staggerDelay={0.1}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
          >
            {SITE_CONFIG.strengths.map((item) => (
              <StaggerItem key={item.number} className="h-full">
                <InteractiveCard
                  tiltAngle={3}
                  className="h-full p-5 sm:p-6 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#5BB8F5]/40 backdrop-blur-md transition-all duration-300 flex flex-col justify-between min-w-0"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#5BB8F5] font-semibold">
                        Pillar {item.number}
                      </span>
                      <ShieldCheck className="w-4 h-4 text-[#5BB8F5]/60 group-hover:text-[#5BB8F5] transition-colors flex-shrink-0" />
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-medium text-white mb-2 leading-snug group-hover:text-[#7CD0FF] transition-colors break-words">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#8DBCE2] font-light leading-relaxed mb-4 break-words">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-1.5">
                    {item.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                        <span className="w-1 h-1 rounded-full bg-[#5BB8F5] flex-shrink-0 mt-1.5" />
                        <span className="break-words min-w-0">{pt}</span>
                      </div>
                    ))}
                  </div>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>

      </div>
    </section>
  );
};

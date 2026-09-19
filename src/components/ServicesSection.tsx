import React, { useState } from 'react';
import {
  FileCheck,
  Briefcase,
  Plane,
  Building2,
  Compass,
  ShieldCheck,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  X,
} from 'lucide-react';
import { SITE_CONFIG, ServiceItem } from '../config/content';
import { ScrollReveal, StaggerContainer, StaggerItem, InteractiveCard } from './ScrollReveal';

const iconMap: Record<string, React.ElementType> = {
  FileCheck,
  Briefcase,
  Plane,
  Building2,
  Compass,
  ShieldCheck,
  GraduationCap,
};

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const scrollToContact = (serviceTitle?: string) => {
    setSelectedService(null);
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-[#F4F8FD] relative overflow-hidden">
      {/* Background soft gradients */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-[#5BB8F5]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 rounded-full bg-[#1F4FA3]/8 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Silky Reveal */}
        <ScrollReveal variant="fadeUp" className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1F4FA3]/15 shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F4FA3]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1F4FA3]">
              Consular &amp; Travel Portfolio
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#0B1F4D] tracking-tight mb-4">
            Specialized Visa &amp; Travel Services
          </h2>

          <p className="text-sm sm:text-base text-[#5B6B85] font-light leading-relaxed">
            Every submission is handled with legal diligence. From premier student admissions and study permits to tourist visas, overseas employment, and complete global itineraries.
          </p>
        </ScrollReveal>

        {/* Specialized Services Grid with Staggered Entrance & Interactive Hover Spotlight */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {SITE_CONFIG.services.map((service) => {
            const Icon = iconMap[service.icon] || FileCheck;

            return (
              <StaggerItem key={service.id} className="h-full">
                <InteractiveCard
                  id={`service-card-${service.id}`}
                  tiltAngle={3}
                  className="h-full bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-[#0B1F4D]/8 shadow-[0_4px_25px_rgba(11,31,77,0.03)] hover:shadow-[0_16px_40px_rgba(31,79,163,0.12)] hover:border-[#5BB8F5]/40 transition-all duration-300 flex flex-col justify-between min-w-0"
                >
                  {/* Top Bar: Icon + Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#F0F6FD] group-hover:bg-[#1F4FA3] text-[#1F4FA3] group-hover:text-white transition-colors duration-300 flex items-center justify-center shadow-inner flex-shrink-0">
                        <Icon className="w-6 h-6 stroke-[1.5]" />
                      </div>

                      {service.badge && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#5BB8F5]/15 text-[#1F4FA3] border border-[#5BB8F5]/30 whitespace-nowrap">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl sm:text-2xl font-light text-[#0B1F4D] mb-3 group-hover:text-[#1F4FA3] transition-colors break-words">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#5B6B85] font-light leading-relaxed mb-6 break-words">
                      {service.shortDesc}
                    </p>

                    {/* Key Features Bullet Points */}
                    <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#0B1F4D]/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5BB8F5] flex-shrink-0 mt-0.5" />
                          <span className="break-words min-w-0">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-xs font-semibold tracking-wider text-[#1F4FA3] group-hover:text-[#0B1F4D] flex items-center gap-1.5 transition-colors"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </button>

                    <button
                      onClick={() => scrollToContact(service.title)}
                      className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full text-[#5B6B85] hover:text-[#0B1F4D] hover:bg-slate-100 transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </InteractiveCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0B1F4D]/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 shadow-2xl border border-white/60 relative my-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#5B6B85] hover:text-[#0B1F4D] hover:bg-slate-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5BB8F5]/15 text-[#1F4FA3] text-[11px] font-semibold uppercase tracking-wider mb-4">
              NEXUS Service Scope
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#0B1F4D] mb-3">
              {selectedService.title}
            </h3>

            <p className="text-sm text-[#5B6B85] leading-relaxed mb-6">
              {selectedService.fullDesc}
            </p>

            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#0B1F4D] mb-3">
              Included Deliverables &amp; Support:
            </h4>
            <div className="space-y-2.5 mb-8">
              {selectedService.features.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[#F8FAFD] border border-[#0B1F4D]/5">
                  <CheckCircle2 className="w-4 h-4 text-[#1F4FA3] mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-[#0B1F4D] font-light">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollToContact(selectedService.title)}
                className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#0B1F4D] to-[#1F4FA3] text-white text-xs uppercase tracking-widest font-medium text-center shadow-lg hover:shadow-xl transition-all"
              >
                Inquire For This Service
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="py-3 px-5 rounded-xl border border-slate-200 text-xs uppercase tracking-widest font-medium text-[#5B6B85] hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

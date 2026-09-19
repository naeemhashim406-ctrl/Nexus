import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE_CONFIG } from '../config/content';
import { ScrollReveal, StaggerContainer, StaggerItem, EASE_LUXURY } from './ScrollReveal';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(SITE_CONFIG.faqs[0].id);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F8FAFD] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Silky Reveal */}
        <ScrollReveal variant="fadeUp" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1F4FA3]/15 shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F4FA3]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1F4FA3]">
              Consular Clarity
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#0B1F4D] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-[#5B6B85] font-light leading-relaxed">
            Direct answers to immigration guidelines, financial audits, embassy turnaround timelines, and procedural requirements.
          </p>
        </ScrollReveal>

        {/* 6 Questions Accordion with Staggered Entrance */}
        <StaggerContainer staggerDelay={0.07} className="space-y-4">
          {SITE_CONFIG.faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <StaggerItem key={faq.id}>
                <div
                  id={`faq-item-${faq.id}`}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#1F4FA3]/30 shadow-md ring-1 ring-[#5BB8F5]/20'
                      : 'bg-white/80 hover:bg-white border-[#0B1F4D]/8 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 transition-colors min-w-0"
                  >
                    <span className="font-serif text-base sm:text-xl font-medium text-[#0B1F4D] break-words">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-[#1F4FA3] text-white rotate-180'
                          : 'bg-[#F0F6FD] text-[#1F4FA3]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE_LUXURY }}
                        className="overflow-hidden border-t border-slate-100"
                      >
                        <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-3 text-xs sm:text-base text-[#5B6B85] font-light leading-relaxed break-words">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Still have questions helper box with Subtle Reveal */}
        <ScrollReveal variant="fadeUp" delay={0.2} className="mt-12">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#EBF3FC] border border-[#1F4FA3]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
            <div className="min-w-0">
              <h4 className="font-serif text-base sm:text-lg font-medium text-[#0B1F4D] break-words">
                Have a specific consular circumstance?
              </h4>
              <p className="text-xs text-[#5B6B85] mt-0.5 break-words">
                Chat directly with our senior visa officers on WhatsApp for rapid clarification.
              </p>
            </div>

            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                'Hello NEXUS, I have a specific visa query regarding my travel.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#0B1F4D] hover:bg-[#1F4FA3] text-white text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors shadow-sm flex items-center justify-center gap-2 flex-shrink-0"
            >
              <MessageSquare className="w-4 h-4 text-[#5BB8F5]" />
              <span>Ask On WhatsApp</span>
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '../config/content';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(SITE_CONFIG.faqs[0].id);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F8FAFD] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
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
        </div>

        {/* 6 Questions Accordion */}
        <div className="space-y-4">
          {SITE_CONFIG.faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#1F4FA3]/30 shadow-md ring-1 ring-[#5BB8F5]/20'
                    : 'bg-white/80 hover:bg-white border-[#0B1F4D]/8'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 transition-colors"
                >
                  <span className="font-serif text-lg sm:text-xl font-medium text-[#0B1F4D]">
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

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#5B6B85] font-light leading-relaxed border-t border-slate-100 animate-fade-in"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions helper box */}
        <div className="mt-12 p-6 rounded-2xl bg-[#EBF3FC] border border-[#1F4FA3]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-serif text-lg font-medium text-[#0B1F4D]">
              Have a specific consular circumstance?
            </h4>
            <p className="text-xs text-[#5B6B85] mt-0.5">
              Chat directly with our senior visa officers on WhatsApp for rapid clarification.
            </p>
          </div>

          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
              'Hello NEXUS, I have a specific visa query regarding my travel.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#0B1F4D] hover:bg-[#1F4FA3] text-white text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors shadow-sm flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#5BB8F5]" />
            <span>Ask On WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  X,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Calendar,
  Award,
  Globe2,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/content';

// Generated illustration asset path
import studyAbroadBanner from '../assets/images/study_abroad_banner_1789907755637.jpg';

interface StudyAbroadModalProps {
  /** Optional manual trigger control */
  isOpen?: boolean;
  onClose?: () => void;
  /** Whether the initial loading/preloader phase has completed */
  isAppLoaded?: boolean;
}

const STORAGE_DISMISS_KEY = 'nexus_study_abroad_2027_dismissed_v2';

export const StudyAbroadModal: React.FC<StudyAbroadModalProps> = ({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  isAppLoaded = true,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Determine effective open state
  const isControlled = typeof externalIsOpen === 'boolean';
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;

  useEffect(() => {
    // Clean up any stale legacy sessionStorage flags that might have blocked the popup
    try {
      sessionStorage.removeItem('nexus_study_abroad_2027_dismissed');
    } catch {
      // ignore
    }

    // Only auto-trigger if not controlled externally
    if (isControlled) return;

    // Listen for manual trigger events from elsewhere in the app (e.g. Hero badge or navigation)
    const handleCustomOpen = () => {
      setInternalIsOpen(true);
    };
    window.addEventListener('open-study-abroad-modal', handleCustomOpen);

    // If app is still in initial preloader state, wait for it to complete
    if (!isAppLoaded) {
      return () => window.removeEventListener('open-study-abroad-modal', handleCustomOpen);
    }

    // Check if customer explicitly opted out via "Don't show again" checkbox
    try {
      const explicitlyDismissed = localStorage.getItem(STORAGE_DISMISS_KEY);
      if (explicitlyDismissed === 'true') {
        return () => window.removeEventListener('open-study-abroad-modal', handleCustomOpen);
      }
    } catch {
      // Ignore storage errors
    }

    // Display popup promptly after site reveals (400ms entrance)
    const timer = setTimeout(() => {
      setInternalIsOpen(true);
    }, 400);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-study-abroad-modal', handleCustomOpen);
    };
  }, [isControlled, isAppLoaded]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dontShowAgain]);

  const handleDismiss = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem(STORAGE_DISMISS_KEY, 'true');
      } catch {
        // ignore
      }
    }

    if (externalOnClose) {
      externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleApplyNow = () => {
    handleDismiss();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });

      // Automatically select Study Visa in form dropdown
      setTimeout(() => {
        const visaSelect = document.getElementById('visaType') as HTMLSelectElement | null;
        if (visaSelect) {
          visaSelect.value = 'Student / Study Visa (UK, Canada, Australia, USA, Europe)';
          visaSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const messageInput = document.getElementById('message') as HTMLTextAreaElement | null;
        if (messageInput && !messageInput.value) {
          messageInput.value = 'Interested in applying for the 2027–2028 Study Abroad Intake (Admissions & Visa Consultation).';
          messageInput.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }, 400);
    }
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      'Assalam-o-Alaikum NEXUS Team, I saw the 2027–2028 Study Abroad Intake announcement. I would like to assess my university admission & visa options.'
    );
    window.open(`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Floating trigger badge if customer cancelled or closed it, allowing them to reopen anytime */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => {
            if (externalOnClose && !isControlled) setInternalIsOpen(true);
            else setInternalIsOpen(true);
          }}
          className="fixed bottom-5 sm:bottom-6 left-3 sm:left-6 z-40 max-w-[calc(100vw-5rem)] xs:max-w-none px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#0B1F4D]/95 hover:bg-[#1F4FA3] active:scale-95 text-white border border-[#5BB8F5]/30 shadow-xl backdrop-blur-md flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-semibold tracking-wide transition-all group hover:scale-105"
          id="study-abroad-floating-badge"
          aria-label="Open 2027-2028 Study Abroad Intake Information"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
          <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5BB8F5] flex-shrink-0" />
          <span className="truncate">Intake 2027–2028 Open</span>
          <span className="hidden xs:inline-block text-[10px] px-2 py-0.5 rounded-full bg-[#5BB8F5]/20 text-[#7CD0FF] group-hover:bg-white/20 flex-shrink-0">
            Apply Now
          </span>
        </motion.button>
      )}

      {/* Modal Popup with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto overscroll-contain">
            {/* Backdrop with luxury blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleDismiss}
              className="fixed inset-0 bg-[#060E20]/80 backdrop-blur-sm sm:backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] bg-white rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(11,31,77,0.35)] border border-[#0B1F4D]/15 flex flex-col z-10 my-auto overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="study-abroad-modal-title"
            >
              {/* Close Button ("X" cancellation) - High Z-index, responsive sizing & tap target */}
              <button
                onClick={handleDismiss}
                id="close-study-abroad-modal-btn"
                aria-label="Close study abroad popup"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-40 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 active:scale-95 text-white backdrop-blur-md border border-white/20 transition-all duration-200 shadow-lg min-w-[36px] min-h-[36px] flex items-center justify-center"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Scrollable Container so that small phones and landscape modes never get clipped */}
              <div className="overflow-y-auto overscroll-contain flex-1 custom-scrollbar">
                {/* Top Banner Graphic Header */}
                <div className="relative h-40 sm:h-52 md:h-56 w-full overflow-hidden bg-gradient-to-r from-[#0B1F4D] via-[#122B66] to-[#1F4FA3] flex-shrink-0">
                  <img
                    src={studyAbroadBanner}
                    alt="Study Abroad 2027-2028 World Admissions"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center opacity-75 transform hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient overlays for readability and luxury vibe */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F4D] via-[#0B1F4D]/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F4D]/90 via-transparent to-[#0B1F4D]/60" />

                  {/* Overlaid Banner Badges */}
                  <div className="absolute top-3 left-3 sm:top-5 sm:left-6 right-14 sm:right-auto flex flex-wrap items-center gap-1.5 sm:gap-2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
                      Intake 2027 – 2028 Open
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-medium border border-white/20">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      <span>Scholarships up to 50%</span>
                    </span>
                  </div>

                  {/* Overlaid Headline & Subtitle */}
                  <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-6 right-3 sm:right-6 z-10 text-white">
                    <div className="flex items-center gap-1.5 text-[#5BB8F5] text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-0.5 sm:mb-1">
                      <Globe2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Global University Admissions Desk</span>
                    </div>
                    <h3
                      id="study-abroad-modal-title"
                      className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-white leading-tight"
                    >
                      Your Global Education Begins Now.
                    </h3>
                    <p className="text-[11px] sm:text-xs md:text-sm text-slate-200 font-light mt-0.5 sm:mt-1 hidden xs:block">
                      Applications are officially open for 2027 &amp; 2028 entry cycles.
                    </p>
                  </div>
                </div>

                {/* Modal Body Content */}
                <div className="p-4 sm:p-6 md:p-7 space-y-4 sm:space-y-5">
                  {/* Destination Country Badges Grid */}
                  <div>
                    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 text-[11px] sm:text-xs font-semibold text-[#0B1F4D] uppercase tracking-wider mb-2">
                      <span>Key Study Destinations (2027–2028)</span>
                      <span className="inline-block self-start xs:self-auto text-[10px] sm:text-[11px] font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Offers in 2–4 Weeks
                      </span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
                      <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#F4F8FD] border border-[#0B1F4D]/8 hover:border-[#1F4FA3]/30 transition-colors">
                        <div className="text-base sm:text-lg mb-0.5">🇬🇧 UK</div>
                        <div className="text-[11px] sm:text-xs font-semibold text-[#0B1F4D] truncate">Russell Group</div>
                        <div className="text-[9px] sm:text-[10px] text-[#5B6B85] leading-snug">2-Yr PSW • Low/No IELTS</div>
                      </div>

                      <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#F4F8FD] border border-[#0B1F4D]/8 hover:border-[#1F4FA3]/30 transition-colors">
                        <div className="text-base sm:text-lg mb-0.5">🇨🇦 Canada</div>
                        <div className="text-[11px] sm:text-xs font-semibold text-[#0B1F4D] truncate">Colleges &amp; Uni</div>
                        <div className="text-[9px] sm:text-[10px] text-[#5B6B85] leading-snug">SDS Stream • Co-op Work</div>
                      </div>

                      <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#F4F8FD] border border-[#0B1F4D]/8 hover:border-[#1F4FA3]/30 transition-colors">
                        <div className="text-base sm:text-lg mb-0.5">🇦🇺 Australia</div>
                        <div className="text-[11px] sm:text-xs font-semibold text-[#0B1F4D] truncate">Go8 &amp; Regional</div>
                        <div className="text-[9px] sm:text-[10px] text-[#5B6B85] leading-snug">Regional Visa • High Grants</div>
                      </div>

                      <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#F4F8FD] border border-[#0B1F4D]/8 hover:border-[#1F4FA3]/30 transition-colors">
                        <div className="text-base sm:text-lg mb-0.5">🇪🇺 Europe / USA</div>
                        <div className="text-[11px] sm:text-xs font-semibold text-[#0B1F4D] truncate">Schengen &amp; STEM</div>
                        <div className="text-[9px] sm:text-[10px] text-[#5B6B85] leading-snug">Low Tuition • OPT Visa</div>
                      </div>
                    </div>
                  </div>

                  {/* Guarantees & Features */}
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#F8FAFD] to-[#EDF4FC] border border-[#0B1F4D]/10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 text-[11px] sm:text-xs text-[#0B1F4D]">
                      <div className="flex items-start sm:items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                        <span className="font-medium">Free Initial Academic Assessment</span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                        <span className="font-medium">Up to 50% Merit Scholarships</span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                        <span className="font-medium">CAS / I-20 &amp; Bank Statement Guidance</span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                        <span className="font-medium">Interview Prep at Gujranwala Office</span>
                      </div>
                    </div>
                  </div>

                  {/* Call to Actions */}
                  <div className="space-y-2.5 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      <button
                        id="study-abroad-modal-apply-btn"
                        onClick={handleApplyNow}
                        className="w-full py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0B1F4D] via-[#122B66] to-[#1F4FA3] hover:from-[#1F4FA3] hover:to-[#0B1F4D] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-[0_8px_20px_rgba(11,31,77,0.25)] hover:shadow-lg transition-all flex items-center justify-center gap-2 group min-h-[44px]"
                      >
                        <span>Apply For 2027–2028</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        id="study-abroad-modal-whatsapp-btn"
                        onClick={handleWhatsAppInquiry}
                        className="w-full py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 min-h-[44px]"
                      >
                        <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Inquire via WhatsApp</span>
                      </button>
                    </div>

                    {/* Customer Dismissal & "Don't show again" option */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-[#0B1F4D]/8 text-xs text-[#5B6B85]">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dontShowAgain}
                          onChange={(e) => setDontShowAgain(e.target.checked)}
                          className="rounded border-[#0B1F4D]/20 text-[#1F4FA3] focus:ring-[#1F4FA3] w-3.5 h-3.5"
                        />
                        <span className="text-[10px] sm:text-[11px]">Don&apos;t show again in this session</span>
                      </label>

                      <button
                        onClick={handleDismiss}
                        className="text-[10px] sm:text-[11px] text-[#5B6B85] hover:text-[#0B1F4D] underline decoration-slate-300 underline-offset-2 transition-colors py-1 px-2"
                      >
                        Remind me later / Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

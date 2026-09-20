import React, { useState } from 'react';
import {
  Moon,
  CheckCircle2,
  Building2,
  Train,
  Plane,
  Car,
  ShieldCheck,
  Compass,
  ArrowRight,
  MessageCircle,
  Clock,
  Sparkles,
  MapPin,
  HeartHandshake,
} from 'lucide-react';
import { SITE_CONFIG, HajjUmrahPackageItem } from '../config/content';
import { ScrollReveal, StaggerContainer, StaggerItem, InteractiveCard } from './ScrollReveal';

export const HajjUmrahSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'umrah-vip' | 'umrah-economy' | 'hajj'>('all');

  const packages = SITE_CONFIG.hajjUmrahPackages || [];

  const filteredPackages =
    activeFilter === 'all'
      ? packages
      : packages.filter((pkg) => pkg.category === activeFilter);

  const scrollToContact = (packageName?: string) => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // If destination or visa type field exists, pre-select
      const destSelect = document.getElementById('destination') as HTMLSelectElement | null;
      if (destSelect) {
        destSelect.value = 'Saudi Arabia (Makkah & Madinah / Umrah & Hajj)';
        destSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }
      const visaSelect = document.getElementById('visaType') as HTMLSelectElement | null;
      if (visaSelect) {
        visaSelect.value = 'Hajj & Umrah Pilgrimage (VIP Executive / Family Package)';
        visaSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  const openWhatsAppPackage = (pkg: HajjUmrahPackageItem) => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum NEXUS Team, I am interested in inquiring about the "${pkg.name}" (${pkg.duration}) for my family. Please share current dates, pricing, and hotel options.`
    );
    window.open(`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="hajj-umrah"
      className="py-20 md:py-28 bg-gradient-to-b from-[#FFFFFF] via-[#F4F8FD] to-[#EBF3FC]/60 relative overflow-hidden"
    >
      {/* Subtle ambient light shapes */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#D4AF37]/10 via-[#1F4FA3]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#5BB8F5]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal variant="fadeDown" delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4FA3]/10 border border-[#1F4FA3]/20 text-[#1F4FA3] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              <Moon className="w-3.5 h-3.5 text-[#1F4FA3] fill-[#1F4FA3]/30" />
              <span>Sacred Pilgrimage Services • Nusuk Authorized</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.12}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#0B1F4D] tracking-tight mb-4">
              Hajj &amp; Umrah Solutions. <br className="hidden sm:inline" />
              <span className="italic font-normal bg-gradient-to-r from-[#0B1F4D] via-[#1F4FA3] to-[#2F7BE5] bg-clip-text text-transparent">
                A Journey of Sacred Peace.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-[#5B6B85] text-sm sm:text-base lg:text-lg font-light leading-relaxed">
              Performing Hajj or Umrah is the pilgrimage of a lifetime. NEXUS delivers end-to-end
              assurance with official Nusuk platform electronic visas, verified hotels directly
              facing or within walking distance of the two Holy Harams, high-speed Haramain bullet train
              tickets, and personalized 24/7 mutawwif assistance.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Core Pillars of Pilgrimage Service */}
        <StaggerContainer
          staggerDelay={0.09}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
        >
          <StaggerItem>
            <div className="p-5 rounded-2xl bg-white border border-[#0B1F4D]/8 shadow-[0_4px_20px_rgba(11,31,77,0.03)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#5BB8F5]/15 flex items-center justify-center text-[#1F4FA3] flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0B1F4D] mb-1">Nusuk Official E-Visa</h3>
                <p className="text-xs text-[#5B6B85] leading-relaxed">
                  Direct clearance through Saudi Ministry of Hajj &amp; Umrah with instant medical coverage.
                </p>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-5 rounded-2xl bg-white border border-[#0B1F4D]/8 shadow-[0_4px_20px_rgba(11,31,77,0.03)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#5BB8F5]/15 flex items-center justify-center text-[#1F4FA3] flex-shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0B1F4D] mb-1">Haram Frontage Hotels</h3>
                <p className="text-xs text-[#5B6B85] leading-relaxed">
                  Clock Tower 5-star suites and verified family stays 0 to 400m from the prayer courtyards.
                </p>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-5 rounded-2xl bg-white border border-[#0B1F4D]/8 shadow-[0_4px_20px_rgba(11,31,77,0.03)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#5BB8F5]/15 flex items-center justify-center text-[#1F4FA3] flex-shrink-0">
                <Train className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0B1F4D] mb-1">Haramain Bullet Train</h3>
                <p className="text-xs text-[#5B6B85] leading-relaxed">
                  Fast 300 km/h high-speed rail reservations between Makkah, Jeddah, and Madinah.
                </p>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-5 rounded-2xl bg-white border border-[#0B1F4D]/8 shadow-[0_4px_20px_rgba(11,31,77,0.03)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#5BB8F5]/15 flex items-center justify-center text-[#1F4FA3] flex-shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0B1F4D] mb-1">Guided Sacred Ziyarats</h3>
                <p className="text-xs text-[#5B6B85] leading-relaxed">
                  Comprehensive historical tours to Cave of Hira, Thawr, Masjid Quba, and Mount Uhud.
                </p>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Package Filter Pills */}
        <ScrollReveal variant="fadeUp" delay={0.2} className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full bg-white border border-[#0B1F4D]/10 shadow-sm">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-[#0B1F4D] to-[#1F4FA3] text-white shadow-sm'
                  : 'text-[#5B6B85] hover:text-[#0B1F4D]'
              }`}
            >
              All Packages
            </button>
            <button
              onClick={() => setActiveFilter('umrah-vip')}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                activeFilter === 'umrah-vip'
                  ? 'bg-gradient-to-r from-[#0B1F4D] to-[#1F4FA3] text-white shadow-sm'
                  : 'text-[#5B6B85] hover:text-[#0B1F4D]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>5-Star VIP Umrah</span>
            </button>
            <button
              onClick={() => setActiveFilter('umrah-economy')}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                activeFilter === 'umrah-economy'
                  ? 'bg-gradient-to-r from-[#0B1F4D] to-[#1F4FA3] text-white shadow-sm'
                  : 'text-[#5B6B85] hover:text-[#0B1F4D]'
              }`}
            >
              Family &amp; Economy
            </button>
            <button
              onClick={() => setActiveFilter('hajj')}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                activeFilter === 'hajj'
                  ? 'bg-gradient-to-r from-[#0B1F4D] to-[#1F4FA3] text-white shadow-sm'
                  : 'text-[#5B6B85] hover:text-[#0B1F4D]'
              }`}
            >
              Hajj 1446/1447 Quota
            </button>
          </div>
        </ScrollReveal>

        {/* Package Cards Grid with 3D Spotlight Tilt */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          {filteredPackages.map((pkg, idx) => (
            <ScrollReveal
              key={pkg.id}
              variant="fadeUp"
              delay={0.1 + idx * 0.08}
              className="h-full flex"
            >
              <InteractiveCard
                tiltAngle={5}
                enableSpotlight={true}
                className="w-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-[#0B1F4D]/10 shadow-[0_8px_30px_rgba(11,31,77,0.04)] hover:shadow-[0_16px_40px_rgba(11,31,77,0.08)] hover:border-[#1F4FA3]/30 transition-all duration-300 relative overflow-hidden"
              >
                {/* Decorative header badge */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-[#1F4FA3]/10 text-[#1F4FA3] border border-[#1F4FA3]/20">
                    <Moon className="w-3 h-3 fill-[#1F4FA3]/30" />
                    {pkg.badge}
                  </span>
                  <span className="text-xs font-medium text-[#5B6B85] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#1F4FA3]" />
                    {pkg.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl font-light text-[#0B1F4D] mb-3">
                  {pkg.name}
                </h3>

                {/* Hotel & Location Proximity */}
                <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-[#0B1F4D]/6 space-y-3 mb-6">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-[#0B1F4D] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#1F4FA3]" />
                        Makkah Al-Mukarramah
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                        {pkg.makkahDistance}
                      </span>
                    </div>
                    <p className="text-xs text-[#5B6B85] font-medium pl-5">{pkg.makkahHotel}</p>
                  </div>

                  <div className="pt-2 border-t border-[#0B1F4D]/6">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-[#0B1F4D] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#1F4FA3]" />
                        Madinah Al-Munawwarah
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-medium">
                        {pkg.madinahDistance}
                      </span>
                    </div>
                    <p className="text-xs text-[#5B6B85] font-medium pl-5">{pkg.madinahHotel}</p>
                  </div>
                </div>

                {/* Transport & Flights Info */}
                <div className="grid grid-cols-2 gap-3 text-xs mb-6 py-3 border-y border-[#0B1F4D]/8">
                  <div className="flex items-start gap-2">
                    <Car className="w-4 h-4 text-[#1F4FA3] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] uppercase text-[#5B6B85] font-semibold">Transfers</span>
                      <span className="text-[#0B1F4D] font-medium leading-tight block">{pkg.transport}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Plane className="w-4 h-4 text-[#1F4FA3] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] uppercase text-[#5B6B85] font-semibold">Flights</span>
                      <span className="text-[#0B1F4D] font-medium leading-tight block">{pkg.flight}</span>
                    </div>
                  </div>
                </div>

                {/* Key Features List */}
                <div className="space-y-2.5 mb-6 flex-grow">
                  <span className="block text-[11px] uppercase tracking-wider font-semibold text-[#0B1F4D] mb-2">
                    Package Inclusions
                  </span>
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-[#5B6B85] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#1F4FA3] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Recommended For & Pricing Note */}
                <div className="mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-[#0B1F4D]">
                  <span className="font-semibold block text-[11px] uppercase tracking-wider text-amber-900 mb-0.5">
                    Recommended For
                  </span>
                  <p className="text-[#5B6B85] leading-relaxed">{pkg.recommendedFor}</p>
                  {pkg.priceNote && (
                    <p className="text-[11px] font-medium text-[#1F4FA3] mt-2 pt-2 border-t border-amber-500/15">
                      ★ {pkg.priceNote}
                    </p>
                  )}
                </div>

                {/* Action CTA Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={() => openWhatsAppPackage(pkg)}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:opacity-95 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Inquire via WhatsApp</span>
                  </button>

                  <button
                    onClick={() => scrollToContact(pkg.name)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F4F8FD] text-[#0B1F4D] border border-[#0B1F4D]/15 text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Request Custom Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#1F4FA3]" />
                  </button>
                </div>
              </InteractiveCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Sacred Ziyarat Highlights Banner */}
        <ScrollReveal variant="fadeUp" delay={0.3}>
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0B1F4D] via-[#122B66] to-[#1F4FA3] text-white relative overflow-hidden shadow-xl mb-12">
            {/* Background geometric accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#5BB8F5]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#7CD0FF] text-[11px] font-semibold uppercase tracking-wider mb-3">
                  <Compass className="w-3.5 h-3.5 text-[#5BB8F5]" />
                  <span>Historical &amp; Sacred Sights</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mb-3">
                  Comprehensive Scholar-Led Ziyarat Tours
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  Every package includes organized visits to the sanctified locations where Islam took root. Accompanied by experienced scholars providing deep historical contexts and proper manners of visitation.
                </p>
                <div className="flex items-center gap-3 text-xs text-[#7CD0FF]">
                  <HeartHandshake className="w-4 h-4 text-[#5BB8F5] flex-shrink-0" />
                  <span>Personal mutawwif support for elderly and first-time pilgrims</span>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Makkah Ziyarat Sites */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="flex items-center gap-2 text-[#5BB8F5] text-xs font-semibold uppercase tracking-wider mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Makkah Al-Mukarramah Ziyarat</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-200">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5BB8F5] mt-1.5 flex-shrink-0" />
                      <span><strong>Jabal al-Noor &amp; Cave of Hira</strong> (First Revelation)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5BB8F5] mt-1.5 flex-shrink-0" />
                      <span><strong>Cave of Thawr</strong> (Sanctuary of Hijrah)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5BB8F5] mt-1.5 flex-shrink-0" />
                      <span><strong>Mina, Arafat &amp; Muzdalifah</strong> (Holy Mashair Grounds)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5BB8F5] mt-1.5 flex-shrink-0" />
                      <span><strong>Jabal ar-Rahmah</strong> (Mount of Mercy)</span>
                    </li>
                  </ul>
                </div>

                {/* Madinah Ziyarat Sites */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="flex items-center gap-2 text-[#7CD0FF] text-xs font-semibold uppercase tracking-wider mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Madinah Al-Munawwarah Ziyarat</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-200">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7CD0FF] mt-1.5 flex-shrink-0" />
                      <span><strong>Masjid Quba</strong> (First Mosque of Islam, Reward of Umrah)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7CD0FF] mt-1.5 flex-shrink-0" />
                      <span><strong>Mount Uhud &amp; Martyrs’ Cemetery</strong> (Ghazwa-e-Uhud)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7CD0FF] mt-1.5 flex-shrink-0" />
                      <span><strong>Masjid al-Qiblatayn</strong> (The Mosque of Two Qiblas)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7CD0FF] mt-1.5 flex-shrink-0" />
                      <span><strong>The Seven Mosques (Saba Masajid)</strong> (Battle of the Trench)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Gujranwala Physical Office Assurance Strip */}
        <ScrollReveal variant="fadeUp" delay={0.35}>
          <div className="p-6 rounded-2xl bg-white border border-[#0B1F4D]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1F4FA3]/10 flex items-center justify-center text-[#1F4FA3] flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#0B1F4D]">
                  Visit NEXUS Gujranwala Office for Physical Pilgrimage Consultation
                </h4>
                <p className="text-xs text-[#5B6B85]">
                  Civic Center, Office No. 56, Main GT Road, Gujranwala • Pre-Hajj Seminars, Biometrics &amp; Ihram Sessions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="px-5 py-2.5 rounded-full bg-[#1F4FA3] hover:bg-[#0B1F4D] text-white text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Call {SITE_CONFIG.contact.phoneFormatted}
              </a>
              <button
                onClick={() => scrollToContact()}
                className="px-5 py-2.5 rounded-full border border-[#0B1F4D]/20 text-[#0B1F4D] hover:bg-slate-50 text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Book In-Person Visit
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

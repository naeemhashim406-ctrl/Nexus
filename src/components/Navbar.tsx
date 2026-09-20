import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SITE_CONFIG } from '../config/content';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-[#0B1F4D]/8 py-3.5 shadow-[0_4px_30px_rgba(11,31,77,0.04)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 relative">
          {/* Logo with smooth home scroll - High z-index & flex-shrink-0 so it never goes under navigation */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            aria-label="NEXUS Home"
            className="flex items-center flex-shrink-0 relative z-20 min-w-max"
          >
            <BrandLogo size="md" variant="light" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 flex-nowrap min-w-0 text-center relative z-10">
            {SITE_CONFIG.navigation.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-2 xl:px-2.5 py-1.5 text-[11px] xl:text-xs uppercase tracking-wider font-medium transition-colors duration-200 whitespace-nowrap text-center inline-flex items-center justify-center ${
                    isActive
                      ? 'text-[#1F4FA3] font-semibold'
                      : 'text-[#5B6B85] hover:text-[#0B1F4D]'
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1.5 right-1.5 xl:left-2.5 xl:right-2.5 h-[2px] bg-gradient-to-r from-[#1F4FA3] to-[#5BB8F5] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Direct Call Button - Kept exclusively */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              id="navbar-call-btn"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[#1F4FA3] hover:text-white bg-[#5BB8F5]/10 hover:bg-[#1F4FA3] border border-[#1F4FA3]/20 transition-all duration-200 shadow-xs text-xs font-semibold flex-shrink-0 group"
              title={`Call official direct line: ${SITE_CONFIG.contact.phoneFormatted}`}
              aria-label={`Call official direct line: ${SITE_CONFIG.contact.phoneFormatted}`}
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0 group-hover:rotate-12 transition-transform" />
              <span className="tracking-wide">{SITE_CONFIG.contact.phoneFormatted}</span>
            </a>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="p-2 rounded-full text-[#0B1F4D] bg-[#5BB8F5]/15"
              aria-label="Call NEXUS Support"
            >
              <Phone className="w-4 h-4 text-[#1F4FA3]" />
            </a>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#0B1F4D] hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white/98 backdrop-blur-2xl border-b border-[#0B1F4D]/10 ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-4">
          <nav className="flex flex-col gap-1">
            {SITE_CONFIG.navigation.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium tracking-wider uppercase transition-colors ${
                    isActive
                      ? 'bg-[#5BB8F5]/15 text-[#1F4FA3] font-semibold'
                      : 'text-[#0B1F4D]/80 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <div className="text-xs text-[#5B6B85]">
              <span className="block font-medium text-[#0B1F4D]">Direct Inquiries:</span>
              <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-[#1F4FA3] hover:underline">
                {SITE_CONFIG.contact.email}
              </a>
              <span className="block mt-0.5 font-mono">{SITE_CONFIG.contact.phoneFormatted}</span>
            </div>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0B1F4D] to-[#1F4FA3] text-white text-center text-xs uppercase tracking-widest font-semibold shadow-md"
            >
              Book Free Consultation
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

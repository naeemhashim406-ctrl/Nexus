import React from 'react';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SITE_CONFIG } from '../config/content';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050D20] text-white border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Background soft ambient gradient */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-[#1F4FA3]/15 blur-[120px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start min-w-0">
            <BrandLogo size="lg" variant="dark" className="mb-6 max-w-full" />

            <p className="text-xs sm:text-sm text-[#8DBCE2] font-light leading-relaxed mb-6 max-w-sm break-words">
              {SITE_CONFIG.brand.description}
            </p>

            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#5BB8F5] flex-shrink-0 mt-0.5" />
              <span className="break-words">Registered Consular &amp; Travel Solutions Partner</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 min-w-0">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5BB8F5] mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {SITE_CONFIG.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className="text-xs text-slate-300 hover:text-white transition-colors block truncate"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Portfolio */}
          <div className="lg:col-span-3 min-w-0">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5BB8F5] mb-5">
              Services Portfolio
            </h4>
            <ul className="space-y-2.5">
              {SITE_CONFIG.services.map((serv) => (
                <li key={serv.id}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo('#services');
                    }}
                    className="text-xs text-slate-300 hover:text-white transition-colors block truncate"
                    title={serv.title}
                  >
                    {serv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Direct Contact */}
          <div className="lg:col-span-3 min-w-0">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5BB8F5] mb-5">
              Inquiries &amp; Support
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Email</span>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-white hover:text-[#5BB8F5] transition-colors break-all font-medium"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Contact &amp; WhatsApp</span>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="text-white hover:text-[#5BB8F5] transition-colors font-mono font-medium"
                >
                  {SITE_CONFIG.contact.phoneFormatted}
                </a>
                <span className="block text-[11px] text-[#8DBCE2] font-mono">
                  {SITE_CONFIG.contact.phoneInternational}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Hours</span>
                <p className="text-slate-300">{SITE_CONFIG.contact.workingHours}</p>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Location</span>
                <p className="text-slate-300 break-words">{SITE_CONFIG.contact.address}</p>
                <p className="text-slate-400 text-[11px]">{SITE_CONFIG.contact.cityCountry}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <p className="break-words">
            © {currentYear} {SITE_CONFIG.brand.name} Global Travel &amp; Visa Solutions. All rights reserved.
          </p>

          <p className="italic text-[#8DBCE2]">
            {SITE_CONFIG.brand.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};

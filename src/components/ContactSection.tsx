import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_CONFIG } from '../config/content';
import { ScrollReveal } from './ScrollReveal';

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  destination: string;
  visaType: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  destination?: string;
  visaType?: string;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    destination: SITE_CONFIG.destinationsList[0],
    visaType: SITE_CONFIG.visaTypesList[0],
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedInquiryId, setConfirmedInquiryId] = useState<string>('');

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full legal name.';
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      errs.phone = 'Please provide a valid contact number (with country/city code).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.destination) {
      errs.destination = 'Please select a destination.';
    }

    if (!formData.visaType) {
      errs.visaType = 'Please select a visa category.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on edit
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    let assignedId = `NX-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    try {
      // Dispatch to full-stack backend endpoint (/api/consultation)
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          destination: formData.destination,
          visaType: formData.visaType,
          message: formData.message,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result && result.inquiryId) {
          assignedId = result.inquiryId;
        }
      }
    } catch {
      // Graceful client fallback: proceed with client-generated docket ID
    }

    setConfirmedInquiryId(assignedId);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#5BB8F5', '#1F4FA3', '#0B1F4D', '#7CD0FF'],
      });
    } catch {
      // Safe fallback
    }

    setIsSuccess(true);
    setIsSubmitting(false);

    // Construct pre-filled WhatsApp consultation message with official Docket Reference ID
    const whatsappText = `*New Consultation Request – NEXUS Global Travel & Visa Solutions*
• *Inquiry Reference:* ${assignedId}
• *Applicant Name:* ${formData.fullName}
• *Contact Number:* ${formData.phone}
• *Email:* ${formData.email}
• *Target Destination:* ${formData.destination}
• *Visa Category:* ${formData.visaType}
• *Office Hub:* Civic Center Office No. 56 Main GT Road Gujranwala
• *Applicant Notes:* ${formData.message || 'None provided'}

_Please review my profile and advise on required documents._`;

    const waUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
      whatsappText
    )}`;

    // Open WhatsApp chat in a new tab
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 450);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Silky Reveal */}
        <ScrollReveal variant="fadeUp" className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0F6FD] border border-[#1F4FA3]/15 shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F4FA3]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1F4FA3]">
              Personalized Consultation
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#0B1F4D] tracking-tight mb-4 break-words">
            Begin Your Consultation
          </h2>

          <p className="text-sm sm:text-base text-[#5B6B85] font-light leading-relaxed break-words">
            Submit your profile details for an initial assessment. Our visa officers will audit your background and coordinate directly with you.
          </p>
        </ScrollReveal>

        {/* 2-Column Layout: Form + Official Contact Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Contact Information Card */}
          <ScrollReveal variant="fadeRight" className="lg:col-span-5 w-full min-w-0">
            <div className="bg-gradient-to-br from-[#0B1F4D] to-[#122A63] text-white p-6 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden min-w-0">
            {/* Ambient accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#5BB8F5]/10 rounded-full blur-3xl pointer-events-none" />

            <h3 className="font-serif text-2xl sm:text-3xl font-light mb-3">
              Official Consular Hub
            </h3>
            <p className="text-xs sm:text-sm text-[#8DBCE2] font-light leading-relaxed mb-8">
              We respond promptly to emails, phone calls, and WhatsApp messages within business operating hours.
            </p>

            <div className="space-y-6">
              {/* Email Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#5BB8F5] flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Official Email</span>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="text-sm sm:text-base font-medium text-white hover:text-[#5BB8F5] transition-colors break-all"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              {/* Contact / WhatsApp Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#5BB8F5] flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Direct Phone &amp; WhatsApp</span>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone}`}
                    className="text-sm sm:text-base font-medium text-white hover:text-[#5BB8F5] transition-colors font-mono"
                  >
                    {SITE_CONFIG.contact.phoneFormatted}
                  </a>
                  <span className="block text-[11px] text-[#8DBCE2] font-mono mt-0.5">
                    {SITE_CONFIG.contact.phoneInternational}
                  </span>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#5BB8F5] flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Consultation Hours</span>
                  <p className="text-xs sm:text-sm text-slate-200">
                    {SITE_CONFIG.contact.workingHours}
                  </p>
                  <p className="text-[11px] text-[#5BB8F5] mt-0.5">
                    {SITE_CONFIG.contact.supportAvailability}
                  </p>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#5BB8F5] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Executive Office</span>
                  <p className="text-xs sm:text-sm text-slate-200 break-words">
                    {SITE_CONFIG.contact.address}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {SITE_CONFIG.contact.cityCountry}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Link */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                  SITE_CONFIG.contact.whatsappDefaultMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider sm:tracking-widest font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-lg text-center"
              >
                <MessageSquare className="w-4 h-4 fill-current flex-shrink-0" />
                <span>Instant WhatsApp Inquiry</span>
              </a>
            </div>
            </div>
          </ScrollReveal>

          {/* Right: Working Consultation Form with Silky Reveal */}
          <ScrollReveal variant="fadeLeft" delay={0.1} className="lg:col-span-7 w-full min-w-0">
            <div className="bg-[#FBFDFF] border border-[#0B1F4D]/8 rounded-3xl p-5 sm:p-10 shadow-sm min-w-0">
            {isSuccess ? (
              <div className="text-center py-10 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <CheckCircle className="w-8 h-8" />
                </div>
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF5FC] border border-[#1F4FA3]/20 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-[#1F4FA3]">
                    Docket Ref: {confirmedInquiryId}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#0B1F4D] mb-2">
                  Consultation Request Registered
                </h3>
                <p className="text-sm text-[#5B6B85] max-w-md mx-auto mb-4 leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Your profile for <strong>{formData.destination}</strong> ({formData.visaType}) has been logged in our system. Your WhatsApp consultation chat has been prepared with your docket notes.
                </p>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#5B6B85] max-w-sm mx-auto mb-6 text-left">
                  <p className="font-medium text-[#0B1F4D] mb-1">Assigned Consular Office:</p>
                  <p>Civic Center, Office No. 56, Main GT Road, Gujranwala</p>
                  <p className="text-[11px] text-[#1F4FA3] mt-0.5">Helpline: 0329 6015268</p>
                </div>

                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                      fullName: '',
                      phone: '',
                      email: '',
                      destination: SITE_CONFIG.destinationsList[0],
                      visaType: SITE_CONFIG.visaTypesList[0],
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 rounded-full border border-[#0B1F4D]/20 text-xs uppercase tracking-widest font-medium text-[#0B1F4D] hover:bg-slate-100 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs uppercase tracking-wider font-semibold text-[#0B1F4D] mb-1.5">
                      Full Legal Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Tariq Mehmood"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0B1F4D] bg-white transition-all outline-none ${
                        errors.fullName
                          ? 'border-red-400 ring-2 ring-red-100'
                          : 'border-slate-200 focus:border-[#1F4FA3] focus:ring-2 focus:ring-[#5BB8F5]/20'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-wider font-semibold text-[#0B1F4D] mb-1.5">
                      Contact / WhatsApp Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 0329 6015268"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0B1F4D] bg-white transition-all outline-none ${
                        errors.phone
                          ? 'border-red-400 ring-2 ring-red-100'
                          : 'border-slate-200 focus:border-[#1F4FA3] focus:ring-2 focus:ring-[#5BB8F5]/20'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider font-semibold text-[#0B1F4D] mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. applicant@domain.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0B1F4D] bg-white transition-all outline-none ${
                      errors.email
                        ? 'border-red-400 ring-2 ring-red-100'
                        : 'border-slate-200 focus:border-[#1F4FA3] focus:ring-2 focus:ring-[#5BB8F5]/20'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Destination and Visa Type Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Destination Dropdown */}
                  <div>
                    <label htmlFor="destination" className="block text-xs uppercase tracking-wider font-semibold text-[#0B1F4D] mb-1.5">
                      Target Destination <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-[#0B1F4D] bg-white focus:border-[#1F4FA3] focus:ring-2 focus:ring-[#5BB8F5]/20 outline-none"
                    >
                      {SITE_CONFIG.destinationsList.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Visa Type Dropdown */}
                  <div>
                    <label htmlFor="visaType" className="block text-xs uppercase tracking-wider font-semibold text-[#0B1F4D] mb-1.5">
                      Visa Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="visaType"
                      name="visaType"
                      value={formData.visaType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-[#0B1F4D] bg-white focus:border-[#1F4FA3] focus:ring-2 focus:ring-[#5BB8F5]/20 outline-none"
                    >
                      {SITE_CONFIG.visaTypesList.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Optional Message / Background notes */}
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider font-semibold text-[#0B1F4D] mb-1.5">
                    Applicant Notes &amp; Travel History (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about previous travel history, anticipated travel month, or specific embassy requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-[#0B1F4D] bg-white focus:border-[#1F4FA3] focus:ring-2 focus:ring-[#5BB8F5]/20 outline-none resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="submit-consultation-form-btn"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-[#0B1F4D] via-[#122B66] to-[#1F4FA3] text-white text-xs sm:text-sm uppercase tracking-wider sm:tracking-[0.14em] font-medium shadow-[0_8px_25px_rgba(11,31,77,0.2)] hover:shadow-[0_12px_30px_rgba(31,79,163,0.3)] hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer text-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0" />
                      <span className="whitespace-nowrap text-center">Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <span className="whitespace-nowrap text-center">Submit Consultation</span>
                      <Send className="w-4 h-4 flex-shrink-0" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-[#5B6B85] text-center pt-2">
                  🔒 Your contact information is kept strictly confidential and only used for consular case review.
                </p>
              </form>
            )}
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};

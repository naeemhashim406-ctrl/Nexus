import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { ScrollProgress } from './components/ScrollProgress';
import { FloatingActions } from './components/FloatingActions';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { ServicesSection } from './components/ServicesSection';
import { HajjUmrahSection } from './components/HajjUmrahSection';
import { DestinationsSection } from './components/DestinationsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StudyAbroadModal } from './components/StudyAbroadModal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  // Section Observer for Active Navigation Highlighting
  useEffect(() => {
    const sections = [
      'hero',
      'services',
      'hajj-umrah',
      'destinations',
      'how-it-works',
      'why-us',
      'testimonials',
      'faq',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -50% 0px',
        threshold: 0.1,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-[#F8FAFD] text-[#0B1F4D] relative selection:bg-[#5BB8F5]/30">
      {/* Animated drawing Preloader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Thin scroll progress bar */}
      <ScrollProgress />

      {/* Sticky frosted glass Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Single-Page Sections in exact specified sequence */}
      <main id="main-content">
        {/* 1. Hero Section with 3D Dotted Interactive Globe */}
        <HeroSection />

        {/* 2. Trust Strip with 4 Animated Stat Counters */}
        <TrustStrip />

        {/* 3. Services: Elegant Cards with Line Icons */}
        <ServicesSection />

        {/* 4. Hajj & Umrah Pilgrimage Packages & Ziyarat */}
        <HajjUmrahSection />

        {/* 5. Destinations: Popular Travel & Visa Corridors */}
        <DestinationsSection />

        {/* 6. How It Works: 4-Stage Process Timeline */}
        <HowItWorksSection />

        {/* 7. Why Choose NEXUS: 4 Key Strengths + 3D Faceted "N" Crystal */}
        <WhyChooseSection />

        {/* 8. Testimonials: Interactive / Draggable Slider */}
        <TestimonialsSection />

        {/* 9. FAQ: Questions Accordion */}
        <FaqSection />

        {/* 10. Contact / Free Consultation Form with Validation & WhatsApp */}
        <ContactSection />
      </main>

      {/* 10. Footer with Brand Logo, Links, & Dynamic Year */}
      <Footer />

      {/* Floating WhatsApp and Back-to-Top Actions */}
      <FloatingActions />

      {/* Study Abroad 2027-2028 Intake Modal Popup (Can be cancelled by customer) */}
      <StudyAbroadModal isAppLoaded={!isLoading} />
    </div>
  );
}

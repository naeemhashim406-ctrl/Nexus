import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/Preloader';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { FloatingActions } from './components/FloatingActions';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { ServicesSection } from './components/ServicesSection';
import { DestinationsSection } from './components/DestinationsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let lenis: Lenis | null = null;
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    } catch {
      // Fallback silently to browser native smooth scroll
    }

    return () => {
      lenis?.destroy();
    };
  }, []);

  // Section Observer for Active Navigation Highlighting
  useEffect(() => {
    const sections = [
      'hero',
      'services',
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

      {/* Desktop custom cursor follower */}
      <CustomCursor />

      {/* Sticky frosted glass Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Single-Page Sections in exact specified sequence */}
      <main id="main-content">
        {/* 1. Hero Section with 3D Dotted Interactive Globe */}
        <HeroSection />

        {/* 2. Trust Strip with 4 Animated Stat Counters */}
        <TrustStrip />

        {/* 3. Services: 6 Elegant Cards with Line Icons */}
        <ServicesSection />

        {/* 4. Destinations: Sticky 3D Globe with 8 Countries */}
        <DestinationsSection />

        {/* 5. How It Works: 4-Stage Process Timeline */}
        <HowItWorksSection />

        {/* 6. Why Choose NEXUS: 4 Key Strengths + 3D Faceted "N" Crystal */}
        <WhyChooseSection />

        {/* 7. Testimonials: Interactive / Draggable Slider */}
        <TestimonialsSection />

        {/* 8. FAQ: 6 Questions Accordion */}
        <FaqSection />

        {/* 9. Contact / Free Consultation Form with Validation & WhatsApp */}
        <ContactSection />
      </main>

      {/* 10. Footer with Brand Logo, Links, & Dynamic Year */}
      <Footer />

      {/* Floating WhatsApp and Back-to-Top Actions */}
      <FloatingActions />
    </div>
  );
}

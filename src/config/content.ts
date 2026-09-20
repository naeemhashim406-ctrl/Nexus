/**
 * =======================================================================
 * NEXUS – Global Travel & Visa Solutions
 * Master Content & Configuration File
 * =======================================================================
 * Non-developer friendly: All editable text, contact details, services,
 * destinations, statistics, testimonials, and FAQs are located here.
 */

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  icon: string;
  badge?: string;
}

export interface DestinationItem {
  id: string;
  name: string;
  flag: string;
  visaType: string;
  processingTime: string;
  popularFor: string;
  description: string;
  lat: number;
  lng: number;
  featuredRate: string;
}

export interface StatItem {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  sublabel: string;
}

export interface StepItem {
  step: string;
  title: string;
  duration: string;
  desc: string;
  detail: string;
}

export interface StrengthItem {
  number: string;
  title: string;
  desc: string;
  points: string[];
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  destination: string;
  service: string;
  rating: number;
  quote: string;
  date: string;
  avatarInitials: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'visa' | 'booking' | 'process';
}

export interface HajjUmrahPackageItem {
  id: string;
  name: string;
  category: 'umrah-vip' | 'umrah-economy' | 'hajj';
  duration: string;
  badge: string;
  makkahHotel: string;
  makkahDistance: string;
  madinahHotel: string;
  madinahDistance: string;
  transport: string;
  flight: string;
  features: string[];
  recommendedFor: string;
  priceNote?: string;
}

export const SITE_CONFIG = {
  // -------------------------------------------------------------
  // BRAND IDENTITY
  // -------------------------------------------------------------
  brand: {
    name: 'NEXUS',
    tagline: 'Your Journey • Our Priority',
    subline: 'GLOBAL TRAVEL & VISA SOLUTIONS',
    established: 2014,
    description:
      'Premier study visa consultancy, university admissions, overseas employment facilitation, tourist visas, Hajj & Umrah pilgrimage packages, and bespoke global travel solutions tailored to students, travelers, pilgrims, and professionals worldwide.',
  },

  // -------------------------------------------------------------
  // USER'S CONTACT INFORMATION
  // -------------------------------------------------------------
  contact: {
    // Primary official email
    email: 'nexussupport11@gmail.com',

    // Primary contact phone number
    phone: '03296015268',
    phoneFormatted: '0329 6015268',
    phoneInternational: '+92 329 6015268',

    // WhatsApp clean number for api links (no spaces or plus)
    whatsappNumber: '923296015268',
    whatsappDefaultMessage:
      'Hello NEXUS Team, I would like to book a consultation for study visa, visit visa, Hajj & Umrah pilgrimage, or travel solutions.',

    // Physical office location
    address: 'Civic Center, Office No. 56, Main GT Road',
    cityCountry: 'Gujranwala, Punjab, Pakistan',

    // Working schedule
    workingHours: 'Monday – Saturday: 9:00 AM – 7:00 PM (PKT)',
    supportAvailability: '24/7 Priority Emergency Traveler & Student Helpline',
  },

  // -------------------------------------------------------------
  // NAVIGATION LINKS
  // -------------------------------------------------------------
  navigation: [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Hajj & Umrah', href: '#hajj-umrah' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why NEXUS', href: '#why-us' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ],

  // -------------------------------------------------------------
  // TRUST STRIP / STATS COUNTERS
  // -------------------------------------------------------------
  stats: [
    {
      value: 12500,
      suffix: '+',
      label: 'Visas Processed',
      sublabel: 'Over 12k successful submissions',
    },
    {
      value: 45,
      suffix: '+',
      label: 'Countries Covered',
      sublabel: 'Global consular embassy network',
    },
    {
      value: 98.6,
      suffix: '%',
      label: 'Success Rate',
      sublabel: 'Pre-screened verification protocol',
    },
    {
      value: 10,
      suffix: '+',
      label: 'Years of Experience',
      sublabel: 'Decade of trusted industry expertise',
    },
  ] as StatItem[],

  // -------------------------------------------------------------
  // CORE SERVICES (INCLUDING STUDY VISAS & HAJJ / UMRAH)
  // -------------------------------------------------------------
  services: [
    {
      id: 'hajj-umrah',
      title: 'Hajj & Umrah Pilgrimage Packages',
      shortDesc: 'Official Nusuk electronic Umrah visas, 5-star & economy hotels near Haram, high-speed Haramain bullet train, and VIP transport.',
      fullDesc:
        'Perform your sacred journey with absolute peace of mind. We provide authenticated electronic Umrah visas, verified 5-star Clock Tower and walkable family hotel bookings in Makkah and Madinah, direct Saudia / PIA flights, high-speed Haramain bullet train tickets, private luxury GMC transfers, and learned scholarly Ziyarat tours.',
      features: [
        'Ministry of Hajj & Umrah Nusuk Visa Issuance',
        'Clock Tower (Fairmont/Swissôtel) & Haram Frontage Stays',
        'Direct Flight Reservations & VIP Private / Group Transfers',
      ],
      icon: 'Moon',
      badge: 'Spiritual Journey',
    },
    {
      id: 'study-visas',
      title: 'Study Visas & Global Admissions',
      shortDesc: 'Comprehensive university placement, offer letters, CAS/I-20 procurement, and student visa interview coaching.',
      fullDesc:
        'Guiding ambitious students into leading universities across the UK, Canada, Australia, USA, and Europe. We provide end-to-end guidance from course selection and statement of purpose (SOP) drafting to 28-day bank statement audits and embassy mock interviews.',
      features: [
        'University Admission Offer Letter & CAS / I-20',
        '28-Day Financial Audit & Sponsorship Compliance',
        'Professional SOP Drafting & Mock Consular Interview Prep',
      ],
      icon: 'GraduationCap',
      badge: 'High Acceptance',
    },
    {
      id: 'visa-consultation',
      title: 'Visit & Tourist Visa Consultation',
      shortDesc: 'Comprehensive tourist, business, and transit visa facilitation with rigorous consular dossier reviews.',
      fullDesc:
        'From biometric scheduling to embassy interview coaching, we handle end-to-end visa paperwork with zero margin for clerical rejection.',
      features: ['Detailed Document Pre-Audit', 'Embassy Appointment Booking', 'Custom SOP & Cover Letter Drafting'],
      icon: 'FileCheck',
      badge: 'Most In-Demand',
    },
    {
      id: 'work-permits',
      title: 'Work Permits & Overseas Employment',
      shortDesc: 'Government-compliant employment visas, skilled migration dossiers, and foreign contract verifications.',
      fullDesc:
        'Assisting professionals and executives securing authenticated permits for the Gulf, Europe, UK, and East Asia.',
      features: ['Ministry of Labor Attestation', 'Credential Evaluation', 'Contract & Sponsor Validation'],
      icon: 'Briefcase',
      badge: 'Corporate & Skilled',
    },
    {
      id: 'flight-ticketing',
      title: 'International Flight Ticketing',
      shortDesc: 'Flexible itinerary reservations, corporate airfare discounts, and genuine refundable ticket holds for visa applications.',
      fullDesc:
        'Direct global distribution system (GDS) ticketing guaranteeing confirmed PNRs, priority seat holds, and hassle-free date changes.',
      features: ['Visa Proof PNR Itineraries', 'Student Baggage Allowances', '24/7 Flight Monitoring & Rescheduling'],
      icon: 'Plane',
    },
    {
      id: 'hotel-reservations',
      title: 'Verified Hotel & Student Housing',
      shortDesc: 'Embassy-accepted confirmed hotel vouchers, university dorm booking assistance, and boutique stays worldwide.',
      fullDesc:
        'Legitimate booking confirmations with free cancellation options crafted specifically for immigration scrutiny and comfortable stays.',
      features: ['Embassy Compliant Confirmations', 'Flexible Free-Cancellation', 'Negotiated Student & Corporate Rates'],
      icon: 'Building2',
    },
    {
      id: 'holiday-packages',
      title: 'Holiday & Tour Packages',
      shortDesc: 'Curated international itineraries combining flights, stays, visa stamps, private transfers, and guided excursions.',
      fullDesc:
        'Tailor-made vacation plans for families, honeymooners, and solo travelers across Turkey, UAE, Europe, and Southeast Asia.',
      features: ['Custom Day-Wise Itineraries', 'English Speaking Local Guides', 'All-Inclusive Transparent Pricing'],
      icon: 'Compass',
      badge: 'Customized',
    },
    {
      id: 'travel-insurance',
      title: 'Travel Insurance & Degree Attestation',
      shortDesc: 'Schengen & worldwide compliant coverage up to $100k+, HEC/IBCC degree attestations, and certified translations.',
      fullDesc:
        'Complete peace of mind with embassy-mandated medical insurance policies delivered instantly to your inbox alongside notarized academic document packs.',
      features: ['Schengen €30,000+ Medical Cover', 'HEC, MOFA & Apostille Attestation', 'Multi-Language Official Translation'],
      icon: 'ShieldCheck',
    },
  ] as ServiceItem[],

  // -------------------------------------------------------------
  // FEATURED DESTINATIONS (With Lat/Lng for 3D Globe Targeting)
  // -------------------------------------------------------------
  destinations: [
    {
      id: 'saudi-arabia',
      name: 'Saudi Arabia (Hajj & Umrah)',
      flag: '🇸🇦',
      visaType: 'Umrah eVisa, Hajj Nusuk Permit & Tourist eVisa',
      processingTime: '24 – 48 Hours (eVisa) / Seasonal Quota',
      popularFor: 'Makkah Al-Mukarramah, Madinah Al-Munawwarah, Ziyarat Sacred Sites',
      description: 'Sacred spiritual pilgrimage and premier Arabian gateway. Approved electronic Umrah visas, confirmed luxury stays facing Masjid al-Haram, Haramain high-speed train, and guided ziyarat tours.',
      lat: 21.4225,
      lng: 39.8262,
      featuredRate: '100% Authorized',
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      flag: '🇬🇧',
      visaType: 'Study Visa (CAS / Tier 4), Visitor & Skilled Worker',
      processingTime: '3 – 4 Weeks (Priority 5 Days)',
      popularFor: 'London, Manchester, Top Russell Group Universities',
      description: 'Premier destination for higher education and tourism. End-to-end support for CAS issuance, 28-day financial evidence, and Graduate Route post-study work permits.',
      lat: 55.3781,
      lng: -3.4360,
      featuredRate: '98.5% Approval',
    },
    {
      id: 'canada',
      name: 'Canada',
      flag: '🇨🇦',
      visaType: 'Study Permit (SDS / Non-SDS), TRV & Work',
      processingTime: '4 – 8 Weeks',
      popularFor: 'Toronto, Vancouver, Designated Learning Institutions (DLI)',
      description: 'Comprehensive study permit filings with GIC account guidance, provincial attestation letters (PAL), PGWP eligibility, and family visit visas.',
      lat: 56.1304,
      lng: -106.3468,
      featuredRate: '97.1% Approval',
    },
    {
      id: 'australia',
      name: 'Australia',
      flag: '🇦🇺',
      visaType: 'Student Visa (Subclass 500) & Subclass 600 Visitor',
      processingTime: '3 – 5 Weeks',
      popularFor: 'Sydney, Melbourne, Group of Eight Universities',
      description: 'Genuine Student (GS) criteria compliance, university admissions, OSHC health cover, and streamlined ImmiAccount digital filings.',
      lat: -25.2744,
      lng: 133.7751,
      featuredRate: '98.2% Approval',
    },
    {
      id: 'usa',
      name: 'United States',
      flag: '🇺🇸',
      visaType: 'F-1 Student Visa & B1/B2 Visitor',
      processingTime: 'Interview Slot Based',
      popularFor: 'Ivy League, New York, STEM Degree Programs',
      description: 'I-20 procurement, DS-160 precision filing, SEVIS payment assistance, and mock consular interview prep addressing ties to home country.',
      lat: 37.0902,
      lng: -95.7129,
      featuredRate: '95.4% Approval',
    },
    {
      id: 'schengen',
      name: 'Schengen / Europe',
      flag: '🇪🇺',
      visaType: 'Student National (Type D) & Uniform Visit (Type C)',
      processingTime: '15 – 25 Calendar Days',
      popularFor: 'Germany, France, Italy, English-Taught Degrees',
      description: 'One visa granting access to 29 European countries. We assist with Blocked Accounts (Sperrkonto), uni-assist admissions, and VFS appointments.',
      lat: 48.8566,
      lng: 2.3522,
      featuredRate: '98.0% Approval',
    },
    {
      id: 'uae',
      name: 'United Arab Emirates',
      flag: '🇦🇪',
      visaType: '30/60 Days Tourist & Golden Visa',
      processingTime: '24 – 48 Hours',
      popularFor: 'Dubai, Abu Dhabi, Business & Leisure',
      description: 'Quick electronic entry with express approval channels for families, shopping, and commercial ventures.',
      lat: 24.4539,
      lng: 54.3773,
      featuredRate: '99.4% Approval',
    },
    {
      id: 'turkey',
      name: 'Turkey',
      flag: '🇹🇷',
      visaType: 'eVisa & Sticker Tourist / Student Visa',
      processingTime: '3 – 7 Working Days',
      popularFor: 'Istanbul, Ankara, Turkish University Scholarships',
      description: 'Stunning cultural gateway connecting Europe and Asia. Hassle-free eVisa processing for valid visa holders and student admissions.',
      lat: 38.9637,
      lng: 35.2433,
      featuredRate: '98.8% Approval',
    },
    {
      id: 'malaysia',
      name: 'Malaysia',
      flag: '🇲🇾',
      visaType: 'eVisa & Student EMGS Visa',
      processingTime: '48 – 72 Hours',
      popularFor: 'Kuala Lumpur, EMGS Student Approvals, Tropical Stays',
      description: 'Fast-track electronic stamping for vacationers, transit travelers, and students enrolling in affordable world-ranked universities.',
      lat: 4.2105,
      lng: 101.9758,
      featuredRate: '99.7% Approval',
    },
  ] as DestinationItem[],

  // -------------------------------------------------------------
  // HOW IT WORKS - 4 PRECISE STEPS
  // -------------------------------------------------------------
  steps: [
    {
      step: '01',
      title: 'Free Profile & Route Consultation',
      duration: 'Day 1',
      desc: 'Our visa officers review your travel history, financial ties, and target destination to map the optimal application pathway.',
      detail: 'Identify potential flags early and calculate exact consular requirements.',
    },
    {
      step: '02',
      title: 'Document Preparation & Legal Audit',
      duration: 'Days 2 – 4',
      desc: 'We curate your bank statements, employment letters, tax documents, genuine hotel holds, and flight itineraries into an audit-ready dossier.',
      detail: 'Includes professional cover letter crafting and certified translations.',
    },
    {
      step: '03',
      title: 'Embassy Submission & Follow-Up',
      duration: 'Days 5 – 15',
      desc: 'We lock your biometric or interview slot at VFS/GSS/TLScontact and monitor case movements in real-time through consular portals.',
      detail: 'Receive live updates via WhatsApp and email at every milestone.',
    },
    {
      step: '04',
      title: 'Visa Approved & Safe Departure',
      duration: 'Final Stage',
      desc: 'Your stamped passport or eVisa is delivered securely. We then finalize your flight tickets, hotel vouchers, and pre-departure briefings.',
      detail: 'Enjoy smooth immigration clearance with complete emergency support.',
    },
  ] as StepItem[],

  // -------------------------------------------------------------
  // WHY CHOOSE NEXUS (4 CORE PILLARS)
  // -------------------------------------------------------------
  strengths: [
    {
      number: '01',
      title: '98.6% Proven Approval Rate',
      desc: 'Our multi-layer dossier verification guarantees that applications are submitted only when all embassy criteria are fully satisfied.',
      points: ['Pre-submission legal cross-check', 'Zero clerical mistakes', 'Genuine travel purpose proof'],
    },
    {
      number: '02',
      title: 'Dedicated Case Officers',
      desc: 'You are assigned an experienced personal consultant who handles your case directly from the initial call until your plane lands.',
      points: ['Direct WhatsApp access', 'No automated call centers', 'Personalized interview preparation'],
    },
    {
      number: '03',
      title: 'Transparent Pricing & Clear Milestones',
      desc: 'No hidden consular surprises. We outline every embassy fee, service charge, and timeline in writing before starting work.',
      points: ['Itemized fee breakdown', 'Refundable service clauses', 'Official government receipt copies'],
    },
    {
      number: '04',
      title: 'Complete 360° Travel Ecosystem',
      desc: 'Beyond visas, we are an accredited travel partner providing verified airfare holds, luxury lodging, and mandatory travel insurance.',
      points: ['GDS air ticketing access', 'Schengen-compliant health policies', 'Urgent date change support'],
    },
  ] as StrengthItem[],

  // -------------------------------------------------------------
  // CLIENT REVIEWS & TESTIMONIALS
  // -------------------------------------------------------------
  testimonials: [
    {
      id: 't-umrah',
      author: 'Haji Muhammad Younas & Family',
      role: 'Executive Umrah Pilgrims',
      destination: 'Saudi Arabia (Makkah & Madinah)',
      service: 'VIP 14-Day Customized Umrah Package',
      rating: 5,
      quote:
        'NEXUS arranged a truly peaceful, spiritually uplifting pilgrimage for my elderly parents and me. Our rooms at the Fairmont Clock Tower in Makkah and Dar Al Taqwa in Madinah were mere steps from the Harams. Private GMC transport and scholar-led Ziyarats were flawless.',
      date: 'Rajab 1446 / 2025',
      avatarInitials: 'MY',
    },
    {
      id: 't1',
      author: 'Tariq Mehmood',
      role: 'Managing Director, Tech Ventures',
      destination: 'United Kingdom',
      service: 'UK 5-Year Standard Visitor Visa',
      rating: 5,
      quote:
        'NEXUS handled my UK multi-entry visitor application with surgical precision. My financial paperwork was intricate, but their team structured my cover letter so clearly that the visa was stamped without a single delay.',
      date: 'August 2024',
      avatarInitials: 'TM',
    },
    {
      id: 't2',
      author: 'Ayesha & Bilal Khan',
      role: 'Honeymoon Travelers',
      destination: 'Schengen (France & Switzerland)',
      service: 'Schengen Visa & Custom Tour Package',
      rating: 5,
      quote:
        'Getting a European tourist visa for first-time travelers felt daunting. NEXUS took care of our VFS appointments, flights, verified hotel bookings, and travel insurance. We had our visas in just 14 days!',
      date: 'October 2024',
      avatarInitials: 'AK',
    },
    {
      id: 't3',
      author: 'Farhan Qureshi',
      role: 'Civil Engineer',
      destination: 'United Arab Emirates',
      service: 'UAE Employment Permit & Legal Attestation',
      rating: 5,
      quote:
        'From degree attestation with MOFA to quick UAE work permit approval, the communication on WhatsApp was instantaneous. Truly professional service from start to finish.',
      date: 'December 2024',
      avatarInitials: 'FQ',
    },
    {
      id: 't4',
      author: 'Dr. Sarah Siddiqui',
      role: 'Medical Researcher',
      destination: 'Canada',
      service: 'Conference TRV & Flight Itinerary',
      rating: 5,
      quote:
        'I needed to attend an oncology symposium in Vancouver on tight notice. The team at NEXUS fast-tracked my bio appointment and provided genuine airfare holds. Highly recommended!',
      date: 'January 2025',
      avatarInitials: 'SS',
    },
    {
      id: 't5',
      author: 'Hamza Nadeem',
      role: 'MSc Data Science Candidate',
      destination: 'United Kingdom (University of Leeds)',
      service: 'UK Student Visa & CAS Processing',
      rating: 5,
      quote:
        'NEXUS secured my CAS letter and study visa within 3 weeks with zero embassy friction. Their guidance on the 28-day bank statement compliance and SOP drafting was spot-on. Truly the premier study visa consultancy in Gujranwala!',
      date: 'February 2025',
      avatarInitials: 'HN',
    },
  ] as TestimonialItem[],

  // -------------------------------------------------------------
  // FREQUENTLY ASKED QUESTIONS
  // -------------------------------------------------------------
  faqs: [
    {
      id: 'faq-hajj-umrah',
      question: 'What Hajj & Umrah packages and visa services does NEXUS provide?',
      answer:
        'NEXUS is an authorized agency providing full-scope Hajj & Umrah services: instant Nusuk electronic Umrah visas, customized 5-Star VIP (Clock Tower front row) and budget-friendly family packages (300-500m walking distance to Haram), confirmed direct flights from Lahore/Sialkot/Islamabad, high-speed Haramain bullet train tickets, private GMC/bus transfers (Jeddah-Makkah-Madinah), and knowledgeable scholar-guided Ziyarat tours to historic sacred sites.',
      category: 'visa',
    },
    {
      id: 'faq-study',
      question: 'What are the requirements for applying for a Study Visa (UK, Canada, Australia, USA, Europe)?',
      answer:
        'Our study abroad counselors handle your entire pathway: selecting eligible universities, obtaining official offer letters and CAS/I-20 approvals, preparing high-impact Statements of Purpose (SOP), guiding English proficiency waivers where available, and conducting audits of 28-day financial sponsorship bank accounts. We also prepare you with mock consular interview sessions to ensure confident visa approval.',
      category: 'visa',
    },
    {
      id: 'faq-1',
      question: 'How early should I apply for my travel, visit, or study visa?',
      answer:
        'For study visas, we recommend beginning 4 to 6 months prior to the academic intake (September/October or January/February) to accommodate university offer deadlines and CAS issuance. For visit visas, 6 to 12 weeks before travel is ideal. Embassies accept submissions up to 3 to 6 months in advance.',
      category: 'visa',
    },
    {
      id: 'faq-2',
      question: 'What are the essential financial documents needed for tourist and study visas?',
      answer:
        'Embassies require authentic bank statements showing sufficient funds for tuition and living expenses (for students) or travel duration (for visitors), alongside tax returns, employment/business registrations, and source of funds documentation. We verify that balances and holding periods strictly comply with UKVI, IRCC, or Australian DOHA standards.',
      category: 'visa',
    },
    {
      id: 'faq-3',
      question: 'Can you provide flight and hotel reservations without purchasing non-refundable tickets?',
      answer:
        'Yes, absolutely. We issue genuine, embassy-verifiable GDS flight reservations with active PNR codes and flexible hotel or university student housing confirmations. This safeguards your funds until your visa is officially stamped in your passport.',
      category: 'booking',
    },
    {
      id: 'faq-4',
      question: 'What happens if my visa application has had a prior refusal?',
      answer:
        'While our 98.6% approval protocol minimizes refusal risks, our legal specialists frequently take on prior-refusal cases. We perform a refusal root-cause audit, address the specific concerns cited in the embassy refusal letter, fortify financial ties and intent proof, and draft a comprehensive appeal or re-application docket.',
      category: 'process',
    },
    {
      id: 'faq-5',
      question: 'Do you offer degree attestations, IBCC/HEC verification, and document translation?',
      answer:
        'Yes. We provide certified translations recognized by all consulates, along with IBCC, HEC, Chamber of Commerce, Ministry of Foreign Affairs (MOFA), and Apostille legalization support required for student admissions and foreign employment permits.',
      category: 'process',
    },
    {
      id: 'faq-6',
      question: 'Where is the NEXUS office located and how do I start?',
      answer:
        'Our main office is located at Civic Center, Office No. 56, Main GT Road, Gujranwala, Punjab, Pakistan. You can visit us in person or connect immediately on WhatsApp at 0329 6015268 or via email at nexussupport11@gmail.com for a free profile assessment.',
      category: 'process',
    },
  ] as FaqItem[],

  // -------------------------------------------------------------
  // VISA TYPES DROPDOWN OPTIONS
  // -------------------------------------------------------------
  visaTypesList: [
    'Hajj & Umrah Pilgrimage (VIP Executive / Family Package)',
    'Saudi Tourist & Umrah eVisa',
    'Student / Study Visa (UK, Canada, Australia, USA, Europe)',
    'Tourist / Visit Visa',
    'Business / Conference Visa',
    'Work Permit / Overseas Employment',
    'Family Reunion / Spouse Visa',
    'Flight & Hotel / Student Accommodation Hold',
    'Degree Attestation (HEC/MOFA) & Insurance',
  ],

  // -------------------------------------------------------------
  // DESTINATIONS DROPDOWN OPTIONS
  // -------------------------------------------------------------
  destinationsList: [
    'Saudi Arabia (Makkah & Madinah / Umrah & Hajj)',
    'United Arab Emirates (Dubai)',
    'Turkey (eVisa / Sticker)',
    'United Kingdom (UK)',
    'Canada (Visitor / Work)',
    'Schengen Area (Europe)',
    'United States (USA)',
    'Australia',
    'Malaysia',
    'Other Worldwide Destination',
  ],

  // -------------------------------------------------------------
  // HAJJ & UMRAH PILGRIMAGE PACKAGES (CUSTOM & CURATED)
  // -------------------------------------------------------------
  hajjUmrahPackages: [
    {
      id: 'pkg-vip-umrah',
      name: 'Executive 5-Star Umrah',
      category: 'umrah-vip',
      duration: '10 – 14 Days (Customizable)',
      badge: '5-Star Clock Tower VIP',
      makkahHotel: 'Fairmont Makkah Clock Royal Tower / Swissôtel Al Maqam',
      makkahDistance: '0 Meters (Direct Haram Courtyard Entrance)',
      madinahHotel: 'The Oberoi Madinah / Dar Al Taqwa Hotel',
      madinahDistance: 'Facing Bab Al Salam (Northern Courtyard)',
      transport: 'Private GMC Yukon / VIP Mercedes Luxury Chauffeur',
      flight: 'Saudia / PIA Business or Economy Direct Flights',
      features: [
        'Instant Nusuk Electronic Visa Issuance with Comprehensive Medical Cover',
        'Haramain High-Speed Bullet Train Business Class Seats (Makkah ⇄ Madinah)',
        'Exclusive Private Scholar-Led Ziyarat Tours (Ghar-e-Hira, Jabal-e-Noor, Quba)',
        'Dedicated 24/7 Ground Concierge, Porterage & Luggage Handling Service',
        'Complimentary Deluxe Umrah Kit, Travel Bag & 5L Zamzam Water Assistance',
      ],
      recommendedFor: 'Families, seniors, and executives desiring maximum convenience and instant Haram access.',
      priceNote: 'Tailor-made customized dates for individual & family suites',
    },
    {
      id: 'pkg-family-umrah',
      name: 'Economy & Family Comfort Umrah',
      category: 'umrah-economy',
      duration: '15 – 21 Days',
      badge: 'Best Family Value',
      makkahHotel: 'Al Shohada Hotel / Le Méridien Towers Makkah',
      makkahDistance: '350 – 500 Meters (or 24/7 Continuous AC Shuttle)',
      madinahHotel: 'Pullman Zamzam Madinah / Grand Plaza Badr Al Maqam',
      madinahDistance: '200 – 300 Meters to Prophet’s Mosque Courtyard',
      transport: 'Modern Air-Conditioned Luxury Coasters / Buses',
      flight: 'Confirmed Direct Flights via Lahore, Sialkot, or Islamabad',
      features: [
        '100% Guaranteed Umrah Visa Processing & Electronic Ministry Approval',
        'Flexible Room Sharing: Double, Triple, and Quad Family Rooms',
        'Complete Guided Ziyarat Tours in Makkah & Madinah (Mount Uhud, Masjid Quba)',
        'Experienced Group Leader (Mutawwif) Accompanying From Gujranwala / Lahore',
        'Pre-Departure Guidance & 24/7 Helpline in Saudi Arabia',
      ],
      recommendedFor: 'Budget-conscious families and groups seeking quality hotels within walking distance.',
      priceNote: 'Available bi-weekly throughout the year and Ramadan',
    },
    {
      id: 'pkg-hajj-guidance',
      name: 'Hajj 1446/1447 Assistance & Maktab Allocation',
      category: 'hajj',
      duration: '28 – 35 Days (Shifting & Non-Shifting Options)',
      badge: 'Official Hajj Guidance',
      makkahHotel: 'Aziziyah Standard Building + Clock Tower 5-Star Hotel Options',
      makkahDistance: 'Designated VIP European Tents in Mina & Arafat',
      madinahHotel: 'Central Markaziyah 4/5-Star Stays',
      madinahDistance: 'Walking distance to Masjid an-Nabawi',
      transport: 'Mashair Holy Train & Dedicated Hajj Luxury Coaches',
      flight: 'Official Hajj Scheduled Direct Flights (Saudia / PIA)',
      features: [
        'Complete Nusuk Masar Platform Registration & E-Wallet Funding Guidance',
        'Air-Conditioned Mina European Tents with Sofa Beds & 3-Time Buffet Catering',
        'Qurbani (Dam-e-Shukr) Coordination via Official Saudi Government Channels',
        'Pre-Hajj Practical Training Seminars & Ihram Workshops at NEXUS Gujranwala',
        'Dedicated Medical Team, Senior Scholars, and Urdu/Punjabi Speaking Guides',
      ],
      recommendedFor: 'Pilgrims intending to fulfill the obligation of Hajj with legal certainty and comfort.',
      priceNote: 'Registration open for upcoming Ministry of Religious Affairs & Nusuk quota',
    },
  ] as HajjUmrahPackageItem[],
};

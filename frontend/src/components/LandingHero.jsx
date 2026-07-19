import React, { useState } from 'react';
import { 
  Shield, Heart, Car, Plane, Home, Users, Briefcase, TrendingUp, 
  Sparkles, CheckCircle2, Zap, CreditCard, Headphones, Plus, Minus, ArrowRight 
} from 'lucide-react';
export const LandingHero = ({ setView, setSelectedCategory }) => {
  // States for FAQs
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // States for Interactive Premium Estimator
  const [estType, setEstType] = useState('health');
  const [estAge, setEstAge] = useState(30);
  const [estIncome, setEstIncome] = useState(500000);
  const [estTobacco, setEstTobacco] = useState('no');
  const [calculatedPremium, setCalculatedPremium] = useState(null);
  const [isEstimating, setIsEstimating] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setView('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateEstimate = (e) => {
    e.preventDefault();
    setIsEstimating(true);
    setTimeout(() => {
      let base = 299;
      switch (estType) {
        case 'health': base = 499; break;
        case 'motor': base = 399; break;
        case 'life': base = 599; break;
        case 'travel': base = 199; break;
        case 'home': base = 299; break;
        case 'family': base = 699; break;
        case 'business': base = 899; break;
        case 'investment': base = 999; break;
      }
      // Add age factor
      const ageFactor = Math.max(0, (estAge - 18) * 12);
      // Add income factor (subtle adjustment)
      const incomeFactor = Math.min(250, (estIncome / 100000) * 15);
      // Tobacco factor
      const multiplier = estTobacco === 'yes' ? 1.45 : 1.0;

      const finalVal = Math.round((base + ageFactor + incomeFactor) * multiplier);
      setCalculatedPremium(finalVal);
      setIsEstimating(false);
    }, 600);
  };

  const exploreSolutions = [
    { id: 'health', title: 'Health Insurance', icon: Heart },
    { id: 'motor', title: 'Motor Insurance', icon: Car },
    { id: 'life', title: 'Life Insurance', icon: Shield },
    { id: 'travel', title: 'Travel Insurance', icon: Plane },
    { id: 'home', title: 'Home Insurance', icon: Home },
    { id: 'health', title: 'Family Insurance', icon: Users, label: 'family' },
    { id: 'business', title: 'Business Insurance', icon: Briefcase },
    { id: 'life', title: 'Investment Plans', icon: TrendingUp, label: 'investment' }
  ];

  const featuredPlans = [
    {
      title: 'Silver',
      price: '₹499',
      features: [
        'Health Coverage up to ₹5 Lakhs',
        'Cashless Hospitalization',
        '24/7 Customer Support',
        'Free Annual Health Checkup'
      ],
      isPopular: false
    },
    {
      title: 'Gold',
      price: '₹999',
      features: [
        'Health Coverage up to ₹10 Lakhs',
        'Zero Waiting Period',
        'Cashless Claims',
        'Family Coverage',
        'Tax Benefits'
      ],
      isPopular: true
    },
    {
      title: 'Platinum',
      price: '₹1499',
      features: [
        'Unlimited Coverage',
        'Global Medical Support',
        'Premium Hospitals',
        'Dedicated Advisor',
        'Priority Claim Settlement'
      ],
      isPopular: false
    }
  ];

  const faqs = [
    {
      q: "What types of insurance does TrustLine offer?",
      a: "TrustLine offers a comprehensive portfolio of insurance solutions, including Health, Motor, Life, Travel, Home, Family, Business, and Investment Plans tailored to your specific safety and budgeting requirements."
    },
    {
      q: "How can I purchase an insurance policy?",
      a: "You can compare estimated premium rates on our platform, select the plan that fits your family's needs, click 'Buy Now' to proceed with payment details, and instantly receive your secure digital policy ledger."
    },
    {
      q: "How do I file an insurance claim?",
      a: "Filing a claim is simple. Navigate to the 'Claims' tab from the menu, select your active policy, upload the necessary hospital invoices or vehicle reports, and our team will process it with rapid automated settlement tracking."
    },
    {
      q: "Can I renew my policy online?",
      a: "Absolutely. Log into your dashboard as a Demo Customer, view your active policies in your record ledger, and click 'Renew Policy' to securely extend your coverage using card or UPI payments."
    },
    {
      q: "Are online payments secure?",
      a: "Yes. All digital transactions are protected with state-of-the-art 256-bit encryption protocols. We align strictly with corporate banking guidelines to secure your premium payments."
    }
  ];

  return (
    <div id="landing-hero-container" className="bg-[#f8fafc] text-slate-800 font-sans min-h-screen">
      
      {/* SECTION 1 & 2: HERO & STATS SECTION (Clean off-white backdrop) */}
      <section id="hero-section" className="relative pt-16 pb-24 md:pt-24 md:pb-36 bg-[#f8fafc] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-6 space-y-7 text-left">
              <span className="inline-block px-3.5 py-1 bg-[#f5efe2] text-[#cca33a] rounded-full text-xs font-bold uppercase tracking-wider">
                Trusted Insurance Partner
              </span>
              
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0b1e36] leading-[1.1]">
                Protect What <br />
                <span className="text-[#e2b33e]">Matters Most.</span>
              </h1>
              
              <p className="text-[15px] sm:text-[16px] text-slate-500 leading-relaxed max-w-lg">
                Compare insurance plans, calculate premiums, purchase policies, and manage claims from one secure platform.
              </p>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3.5 pt-2">
                <button
                  id="hero-compare-nav-btn"
                  onClick={() => {
                    setView('compare');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-4 text-sm font-bold tracking-wide bg-[#0b1e36] hover:bg-[#132d4e] text-white rounded-xl transition-all duration-200 cursor-pointer shadow-md shadow-slate-950/10 flex items-center space-x-2"
                >
                  <span>Compare Plans</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </button>
                
                <button
                  id="hero-estimate-nav-btn"
                  onClick={() => {
                    const el = document.getElementById('estimate-premium-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-7 py-4 text-sm font-bold tracking-wide bg-[#e2b33e] hover:bg-[#cca33a] text-slate-900 rounded-xl transition-all duration-200 cursor-pointer shadow-md shadow-amber-500/10"
                >
                  Get Quote
                </button>
              </div>

              {/* Three Horizontal Floating Badges */}
              <div className="grid grid-cols-3 gap-3 pt-6 max-w-md">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center sm:space-x-3 text-center sm:text-left">
                  <div className="h-9 w-9 bg-[#f5efe2] text-[#cca33a] rounded-full flex items-center justify-center mb-2 sm:mb-0">
                    <Users className="h-4.5 w-4.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-[#0b1e36] leading-none">10K+</p>
                    <p className="text-[10px] text-slate-400 font-bold tracking-tight mt-0.5">Customers</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center sm:space-x-3 text-center sm:text-left">
                  <div className="h-9 w-9 bg-[#f5efe2] text-[#cca33a] rounded-full flex items-center justify-center mb-2 sm:mb-0">
                    <Headphones className="h-4.5 w-4.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-[#0b1e36] leading-none">24/7</p>
                    <p className="text-[10px] text-slate-400 font-bold tracking-tight mt-0.5">Support</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center sm:space-x-3 text-center sm:text-left">
                  <div className="h-9 w-9 bg-[#f5efe2] text-[#cca33a] rounded-full flex items-center justify-center mb-2 sm:mb-0">
                    <CheckCircle2 className="h-4.5 w-4.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-[#0b1e36] leading-none">Fast</p>
                    <p className="text-[10px] text-slate-400 font-bold tracking-tight mt-0.5">Claims</p>
                  </div>
                </div>
              </div>

            </div>
            
            {/* Right Column Illustration (Exactly matching screenshot 2 vector art style) */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <svg viewBox="0 0 550 480" className="w-full max-w-[480px] h-auto drop-shadow-xl">
                {/* Mint Green backdrop blob */}
                <circle cx="360" cy="240" r="150" fill="#e8f5e9" opacity="0.9" />
                
                {/* Background clouds outlines */}
                <path d="M430,130 C430,110 445,95 465,95 C475,95 484,100 489,109 C494,105 500,103 506,103 C519,103 529,114 529,127 C529,129 528,131 528,133" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M400,140 L530,140" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                
                <path d="M120,130 C120,115 132,103 147,103 C156,103 164,107 169,115 C173,110 179,108 186,108 C198,108 207,117 207,129 L207,130" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M100,135 L220,135" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />

                {/* Insurance Clipboard */}
                <g transform="translate(190, 160)">
                  {/* Clipboard shadow & body */}
                  <rect x="0" y="0" width="105" height="135" rx="8" fill="#ffffff" stroke="#0b1e36" strokeWidth="3" />
                  {/* Clipboard Header Clip */}
                  <rect x="30" y="-12" width="45" height="18" rx="4" fill="#94a3b8" stroke="#0b1e36" strokeWidth="3" />
                  {/* Clinic Green Plus Icon */}
                  <circle cx="75" cy="25" r="11" fill="#e8f5e9" />
                  <path d="M75,19 L75,31 M69,25 L81,25" stroke="#2e7d32" strokeWidth="3" strokeLinecap="round" />
                  {/* Checklist Rows */}
                  <rect x="15" y="32" width="8" height="8" fill="none" stroke="#0b1e36" strokeWidth="1.8" />
                  <line x1="30" y1="36" x2="60" y2="36" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                  
                  <rect x="15" y="52" width="8" height="8" fill="none" stroke="#0b1e36" strokeWidth="1.8" />
                  <line x1="30" y1="56" x2="60" y2="56" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                  
                  <rect x="15" y="72" width="8" height="8" fill="none" stroke="#0b1e36" strokeWidth="1.8" />
                  <line x1="30" y1="76" x2="60" y2="76" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                  
                  <rect x="15" y="92" width="8" height="8" fill="none" stroke="#0b1e36" strokeWidth="1.8" />
                  <line x1="30" y1="96" x2="60" y2="96" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                </g>

                {/* Floating Green Dollar Bills */}
                <g transform="translate(305, 110)">
                  {/* Bill 1 */}
                  <rect x="0" y="0" width="55" height="85" rx="4" fill="#a5d6a7" stroke="#0b1e36" strokeWidth="2" transform="rotate(30)" />
                  {/* Bill 2 */}
                  <rect x="25" y="-15" width="55" height="85" rx="4" fill="#c8e6c9" stroke="#0b1e36" strokeWidth="2" transform="rotate(15)" />
                  {/* Bill 3 */}
                  <rect x="45" y="-20" width="55" height="85" rx="4" fill="#e8f5e9" stroke="#0b1e36" strokeWidth="2" transform="rotate(45)" />
                </g>

                {/* Large Silver Dollar Coin */}
                <g transform="translate(320, 200)">
                  <circle cx="45" cy="45" r="35" fill="#ffffff" stroke="#0b1e36" strokeWidth="3" />
                  <circle cx="45" cy="45" r="28" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="45" y="56" fontFamily="sans-serif" fontSize="34" fontWeight="bold" fill="#0b1e36" textAnchor="middle">₹</text>
                </g>

                {/* Suburban House */}
                <g transform="translate(245, 235)">
                  {/* House Body */}
                  <rect x="10" y="50" width="135" height="80" fill="#ffffff" stroke="#0b1e36" strokeWidth="3" />
                  {/* Garage attachment left */}
                  <rect x="-45" y="70" width="55" height="60" fill="#ffffff" stroke="#0b1e36" strokeWidth="3" />
                  {/* Garage Door */}
                  <rect x="-35" y="85" width="35" height="45" fill="#94a3b8" stroke="#0b1e36" strokeWidth="2" />
                  <line x1="-35" y1="95" x2="0" y2="95" stroke="#0b1e36" strokeWidth="1.5" />
                  <line x1="-35" y1="105" x2="0" y2="105" stroke="#0b1e36" strokeWidth="1.5" />
                  <line x1="-35" y1="115" x2="0" y2="115" stroke="#0b1e36" strokeWidth="1.5" />
                  
                  {/* Triangular roofs */}
                  <polygon points="10,50 78,-5 145,50" fill="#475569" stroke="#0b1e36" strokeWidth="3" />
                  <polygon points="-48,70 -18,40 12,70" fill="#475569" stroke="#0b1e36" strokeWidth="3" />
                  
                  {/* Small triangular roof accent */}
                  <polygon points="65,45 105,5 145,45" fill="#ffffff" stroke="#0b1e36" strokeWidth="3" />
                  
                  {/* House Main Door */}
                  <rect x="85" y="80" width="25" height="50" fill="#ffffff" stroke="#0b1e36" strokeWidth="2" />
                  <circle cx="91" cy="105" r="2" fill="#0b1e36" />
                  
                  {/* Windows */}
                  <rect x="25" y="65" width="15" height="15" fill="#ffffff" stroke="#0b1e36" strokeWidth="2" />
                  <line x1="32.5" y1="65" x2="32.5" y2="80" stroke="#0b1e36" strokeWidth="1.5" />
                  <line x1="25" y1="72.5" x2="40" y2="72.5" stroke="#0b1e36" strokeWidth="1.5" />

                  <rect x="48" y="65" width="15" height="15" fill="#ffffff" stroke="#0b1e36" strokeWidth="2" />
                  <line x1="55.5" y1="65" x2="55.5" y2="80" stroke="#0b1e36" strokeWidth="1.5" />
                  <line x1="48" y1="72.5" x2="63" y2="72.5" stroke="#0b1e36" strokeWidth="1.5" />

                  <rect x="110" y="65" width="12" height="12" fill="#ffffff" stroke="#0b1e36" strokeWidth="2" />
                  <line x1="116" y1="65" x2="116" y2="77" stroke="#0b1e36" strokeWidth="1" />
                  <line x1="110" y1="71" x2="122" y2="71" stroke="#0b1e36" strokeWidth="1" />

                  <rect x="25" y="90" width="15" height="15" fill="#ffffff" stroke="#0b1e36" strokeWidth="2" />
                  <line x1="32.5" y1="90" x2="32.5" y2="105" stroke="#0b1e36" strokeWidth="1.5" />
                  <line x1="25" y1="97.5" x2="40" y2="97.5" stroke="#0b1e36" strokeWidth="1.5" />
                </g>

                {/* Compact Green Passenger Car */}
                <g transform="translate(160, 315)">
                  {/* Wheels */}
                  <circle cx="20" cy="40" r="14" fill="#334155" stroke="#0b1e36" strokeWidth="3" />
                  <circle cx="20" cy="40" r="6" fill="#ffffff" />
                  
                  <circle cx="85" cy="40" r="14" fill="#334155" stroke="#0b1e36" strokeWidth="3" />
                  <circle cx="85" cy="40" r="6" fill="#ffffff" />
                  
                  {/* Car body */}
                  <path d="M-15,30 L0,15 L25,12 L50,0 L85,0 L110,20 L115,35 L105,40 L-10,40 Z" fill="#66bb6a" stroke="#0b1e36" strokeWidth="3" />
                  
                  {/* Car Glass Window */}
                  <path d="M25,15 L45,5 L78,5 L95,18 Z" fill="#ffffff" stroke="#0b1e36" strokeWidth="2" />
                  <line x1="55" y1="5" x2="55" y2="21" stroke="#0b1e36" strokeWidth="2" />
                  
                  {/* Front wheel arch outline and headlight */}
                  <circle cx="20" cy="40" r="14" fill="none" stroke="#0b1e36" strokeWidth="3" />
                  <circle cx="85" cy="40" r="14" fill="none" stroke="#0b1e36" strokeWidth="3" />
                  
                  <rect x="105" y="24" width="8" height="6" rx="2" fill="#fff59d" stroke="#0b1e36" strokeWidth="1.5" />
                </g>

                {/* Ground outlines/plants detail */}
                <line x1="50" y1="365" x2="500" y2="365" stroke="#0b1e36" strokeWidth="3" strokeLinecap="round" />
                
                <path d="M60,355 Q63,345 66,355 Q70,342 74,355 Q78,348 81,355" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" />
                <path d="M470,355 Q473,345 476,355 Q480,342 484,355 Q488,348 491,355" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

          </div>
        </div>
      </section>

      {/* STATS BANNER OVERLAY CARD (Screenshot 1 & 2 transition elements) */}
      <section id="stats-banner-container" className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-slate-900/10 border border-slate-100/80 text-center space-y-9">
          
          <p className="text-[17px] sm:text-[21px] text-[#0b1e36] font-bold leading-relaxed max-w-3xl mx-auto">
            "Join thousands of happy customers who trust TrustLine Insurance for secure, affordable, and reliable insurance solutions."
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5">
            <button
              onClick={() => {
                setView('compare');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-black uppercase tracking-wider bg-[#0b1e36] hover:bg-[#132d4e] text-white rounded-xl transition-all duration-200 shadow-md shadow-slate-950/10 cursor-pointer"
            >
              Get Started
            </button>
            <button
              onClick={() => {
                const footer = document.getElementById('trustline-footer');
                footer?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-black uppercase tracking-wider bg-[#e2b33e] hover:bg-[#cca33a] text-slate-900 rounded-xl transition-all duration-200 shadow-md shadow-amber-500/5 cursor-pointer"
            >
              Contact Us
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-100 max-w-4xl mx-auto">
            <div>
              <p className="text-4xl md:text-5xl font-black text-[#e2b33e]">10K+</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-[#e2b33e]">99%</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Claim Success</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-[#e2b33e]">24/7</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Expert Support</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: EXPLORE INSURANCE SOLUTIONS (Screenshot 3 - Grid of 8) */}
      <section id="explore-solutions-section" className="py-24 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-3xl sm:text-[2.6rem] font-black tracking-tight text-[#0b1e36]">
            Explore Insurance Solutions
          </h2>
          <p className="mt-3.5 text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Choose the right insurance plan to protect yourself, your family, and your valuable assets.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {exploreSolutions.map((sol, index) => {
              const SolIcon = sol.icon;
              return (
                <div
                  key={index}
                  onClick={() => handleCategoryClick(sol.id)}
                  className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100/80 hover:border-slate-200/50 transition-all duration-300 flex flex-col items-center text-center cursor-pointer relative top-0 hover:-top-1.5"
                >
                  <div className="h-16 w-16 bg-[#0b1e36] text-white rounded-full flex items-center justify-center shadow-lg shadow-slate-900/10 mb-6 transition-transform duration-300 group-hover:scale-105">
                    <SolIcon className="h-6.5 w-6.5" />
                  </div>

                  <h3 className="text-[17px] font-black text-[#0b1e36] mb-3 group-hover:text-[#e2b33e] transition-colors">
                    {sol.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed mb-6">
                    Secure coverage with affordable premiums and quick claim assistance.
                  </p>

                  <span className="text-xs font-bold text-[#e2b33e] hover:text-[#cca33a] flex items-center gap-1 transition-colors mt-auto">
                    Learn More <span className="text-[14px]">→</span>
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE TRUSTLINE? (Screenshot 4 - Row of 4) */}
      <section id="why-trustline-section" className="py-24 bg-[#f8fafc] text-center border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-3xl sm:text-[2.6rem] font-black tracking-tight text-[#0b1e36]">
            Why Choose TrustLine?
          </h2>
          <p className="mt-3.5 text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Experience secure, transparent, and hassle-free insurance services designed to protect what matters most.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            
            {/* 1. Secure Policies */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-350 flex flex-col items-center">
              <div className="h-14 w-14 bg-[#0b1e36] text-white rounded-full flex items-center justify-center shadow-md shadow-slate-900/10 mb-6">
                <Shield className="h-5.5 w-5.5" />
              </div>
              <h3 className="text-base font-black text-[#0b1e36] mb-3">Secure Policies</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Your insurance information is protected with enterprise-grade security.
              </p>
            </div>

            {/* 2. Instant Claim Tracking */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-350 flex flex-col items-center">
              <div className="h-14 w-14 bg-[#0b1e36] text-white rounded-full flex items-center justify-center shadow-md shadow-slate-900/10 mb-6">
                <Zap className="h-5.5 w-5.5" />
              </div>
              <h3 className="text-base font-black text-[#0b1e36] mb-3">Instant Claim Tracking</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Track your insurance claims anytime with real-time status updates.
              </p>
            </div>

            {/* 3. Easy Online Payments */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-350 flex flex-col items-center">
              <div className="h-14 w-14 bg-[#0b1e36] text-white rounded-full flex items-center justify-center shadow-md shadow-slate-900/10 mb-6">
                <CreditCard className="h-5.5 w-5.5" />
              </div>
              <h3 className="text-base font-black text-[#0b1e36] mb-3">Easy Online Payments</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Pay premiums securely using UPI, cards, net banking, or wallets.
              </p>
            </div>

            {/* 4. 24/7 Support */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-350 flex flex-col items-center">
              <div className="h-14 w-14 bg-[#0b1e36] text-white rounded-full flex items-center justify-center shadow-md shadow-slate-900/10 mb-6">
                <Headphones className="h-5.5 w-5.5" />
              </div>
              <h3 className="text-base font-black text-[#0b1e36] mb-3">24/7 Expert Support</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Our insurance experts are available around the clock to assist you.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: ESTIMATE YOUR INSURANCE PREMIUM (Screenshot 5 - Double Column Form & Display) */}
      <section id="estimate-premium-section" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-3xl sm:text-[2.6rem] font-black tracking-tight text-[#0b1e36]">
            Estimate Your Insurance Premium
          </h2>
          <p className="mt-3.5 text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Calculate your estimated insurance premium in seconds.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-14 max-w-4xl mx-auto text-left">
            
            {/* Left Column: Form Card */}
            <form onSubmit={calculateEstimate} className="lg:col-span-7 bg-[#f8fafc] border border-slate-100 rounded-[2rem] p-7 sm:p-9 space-y-5 shadow-sm">
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Insurance Type</label>
                <select
                  value={estType}
                  onChange={(e) => setEstType(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#e2b33e]/30 focus:border-[#e2b33e] transition-colors"
                >
                  <option value="health">Health Insurance</option>
                  <option value="motor">Motor Insurance</option>
                  <option value="life">Life Insurance</option>
                  <option value="travel">Travel Insurance</option>
                  <option value="home">Home Insurance</option>
                  <option value="family">Family Insurance</option>
                  <option value="business">Business Insurance</option>
                  <option value="investment">Investment Plans</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Age</label>
                <input
                  type="number"
                  min="18"
                  max="100"
                  value={estAge}
                  onChange={(e) => setEstAge(parseInt(e.target.value) || 18)}
                  placeholder="Enter Age"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#e2b33e]/30 focus:border-[#e2b33e] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Annual Income (₹)</label>
                <input
                  type="number"
                  min="50000"
                  step="50000"
                  value={estIncome}
                  onChange={(e) => setEstIncome(parseInt(e.target.value) || 50000)}
                  placeholder="Enter Annual Income"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#e2b33e]/30 focus:border-[#e2b33e] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Tobacco User or Smoker?</label>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 text-sm text-slate-600 font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="smoker-est"
                      value="yes"
                      checked={estTobacco === 'yes'}
                      onChange={() => setEstTobacco('yes')}
                      className="h-4 w-4 text-[#e2b33e] focus:ring-[#e2b33e]"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-600 font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="smoker-est"
                      value="no"
                      checked={estTobacco === 'no'}
                      onChange={() => setEstTobacco('no')}
                      className="h-4 w-4 text-[#e2b33e] focus:ring-[#e2b33e]"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isEstimating}
                className="w-full py-4 bg-[#0b1e36] hover:bg-[#132d4e] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-200 cursor-pointer shadow-md mt-2 flex items-center justify-center space-x-2"
              >
                {isEstimating ? (
                  <span>Estimating Rate...</span>
                ) : (
                  <span>Calculate Premium</span>
                )}
              </button>

            </form>

            {/* Right Column: Display Card (Deep Navy) */}
            <div className="lg:col-span-5 bg-[#0b1e36] text-white rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full blur-2xl"></div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-bold tracking-wide">Estimated Premium</h3>
                
                {calculatedPremium !== null ? (
                  <div className="space-y-1">
                    <p className="text-5xl font-black text-[#e2b33e]">₹{calculatedPremium}</p>
                    <p className="text-xs text-slate-300 font-semibold">/ month</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-5xl font-black text-[#e2b33e]/60">--</p>
                    <p className="text-xs text-slate-400 font-semibold">Enter variables to estimate cost</p>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-10 border-t border-white/10 mt-6">
                <div className="flex items-center space-x-3 text-xs font-semibold text-slate-200">
                  <span className="text-[#e2b33e] font-black text-sm">✓</span>
                  <span>Tax Benefits Available</span>
                </div>
                <div className="flex items-center space-x-3 text-xs font-semibold text-slate-200">
                  <span className="text-[#e2b33e] font-black text-sm">✓</span>
                  <span>Cashless Claims</span>
                </div>
                <div className="flex items-center space-x-3 text-xs font-semibold text-slate-200">
                  <span className="text-[#e2b33e] font-black text-sm">✓</span>
                  <span>24/7 Expert Support</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: FEATURED PLANS (Screenshot 6 - Row of 3) */}
      <section id="featured-plans-section" className="py-24 bg-[#f8fafc] text-center border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-3xl sm:text-[2.6rem] font-black tracking-tight text-[#0b1e36]">
            Featured Insurance Plans
          </h2>
          <p className="mt-3.5 text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Choose a policy that matches your lifestyle and budget.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 max-w-5xl mx-auto text-left items-stretch">
            {featuredPlans.map((plan, index) => {
              return (
                <div
                  key={index}
                  className={`bg-white rounded-[2rem] p-9 flex flex-col justify-between shadow-sm relative transition-all duration-300 ${
                    plan.isPopular 
                      ? 'border-2 border-[#e2b33e] md:-translate-y-3.5 shadow-xl shadow-slate-900/5' 
                      : 'border border-slate-100 hover:border-slate-200'
                  }`}
                >
                  {plan.isPopular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-black tracking-wider uppercase bg-[#e2b33e] text-slate-900 rounded-full shadow-sm">
                      Most Popular
                    </span>
                  )}

                  <div className="space-y-6">
                    <div className="text-center pb-6 border-b border-slate-100">
                      <h3 className="text-xl font-bold text-[#0b1e36]">{plan.title}</h3>
                      <p className="text-4xl font-extrabold text-[#e2b33e] mt-4">{plan.price}<span className="text-sm text-slate-400 font-semibold tracking-normal">/month</span></p>
                    </div>

                    <ul className="space-y-3.5">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center space-x-2.5 text-xs font-semibold text-slate-500">
                          <span className="text-emerald-500 font-black text-[14px]">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setView('compare');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full py-3.5 mt-9 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-200 cursor-pointer text-center ${
                      plan.isPopular
                        ? 'bg-[#e2b33e] hover:bg-[#cca33a] text-slate-900'
                        : 'bg-[#0b1e36] hover:bg-[#132d4e] text-white'
                    }`}
                  >
                    Buy Now
                  </button>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 7: SIMPLE CLAIM PROCESS (Screenshot 7 - Steps 1-4) */}
      <section id="claim-process-section" className="py-24 bg-white text-center border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-3xl sm:text-[2.6rem] font-black tracking-tight text-[#0b1e36]">
            Simple Claim Process
          </h2>
          <p className="mt-3.5 text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Experience a fast, transparent, and hassle-free claim settlement journey.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14 max-w-5xl mx-auto">
            
            {/* Step 1 */}
            <div className="bg-[#f8fafc] rounded-3xl p-8 border border-slate-100/50 flex flex-col items-center">
              <div className="h-14 w-14 bg-[#0b1e36] text-white rounded-full flex items-center justify-center font-black text-lg mb-6 shadow-md shadow-slate-900/10">
                1
              </div>
              <h3 className="text-[17px] font-black text-[#0b1e36] mb-3">Submit Claim</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Start your insurance claim online in just a few minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#f8fafc] rounded-3xl p-8 border border-slate-100/50 flex flex-col items-center">
              <div className="h-14 w-14 bg-[#0b1e36] text-white rounded-full flex items-center justify-center font-black text-lg mb-6 shadow-md shadow-slate-900/10">
                2
              </div>
              <h3 className="text-[17px] font-black text-[#0b1e36] mb-3">Upload Documents</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Upload required documents securely through the portal.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#f8fafc] rounded-3xl p-8 border border-slate-100/50 flex flex-col items-center">
              <div className="h-14 w-14 bg-[#0b1e36] text-white rounded-full flex items-center justify-center font-black text-lg mb-6 shadow-md shadow-slate-900/10">
                3
              </div>
              <h3 className="text-[17px] font-black text-[#0b1e36] mb-3">Verification</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Our team verifies your documents and policy details.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#f8fafc] rounded-3xl p-8 border border-slate-100/50 flex flex-col items-center">
              <div className="h-14 w-14 bg-[#0b1e36] text-white rounded-full flex items-center justify-center font-black text-lg mb-6 shadow-md shadow-slate-900/10">
                4
              </div>
              <h3 className="text-[17px] font-black text-[#0b1e36] mb-3">Claim Settlement</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Receive your approved claim quickly and securely.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8: WHAT OUR CUSTOMERS SAY (Screenshot 8 - Testimonials) */}
      <section id="testimonials-section" className="py-24 bg-[#f8fafc] text-center border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-3xl sm:text-[2.6rem] font-black tracking-tight text-[#0b1e36]">
            What Our Customers Say
          </h2>
          <p className="mt-3.5 text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Thousands of customers trust TrustLine Insurance to protect what matters most.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 max-w-5xl mx-auto text-left">
            
            {/* Review 1 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[#e2b33e] text-5xl font-serif leading-none block h-6">“</span>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 pt-2">
                  TrustLine made purchasing health insurance simple and hassle-free. The claim process was quick and transparent.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-50">
                <p className="text-base font-black text-[#0b1e36]">Rahul Sharma</p>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Chennai</p>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[#e2b33e] text-5xl font-serif leading-none block h-6">“</span>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 pt-2">
                  The premium calculator helped me choose the perfect plan. Customer support was excellent from start to finish.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-50">
                <p className="text-base font-black text-[#0b1e36]">Priya Nair</p>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Bangalore</p>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[#e2b33e] text-5xl font-serif leading-none block h-6">“</span>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 pt-2">
                  I renewed my motor insurance within minutes. The website is clean, fast, and easy to use.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-50">
                <p className="text-base font-black text-[#0b1e36]">Arjun Kumar</p>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Coimbatore</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 9: FREQUENTLY ASKED QUESTIONS (Screenshot 9 - Accordion) */}
      <section id="faq-section" className="py-24 bg-white text-center border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-3xl sm:text-[2.6rem] font-black tracking-tight text-[#0b1e36]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3.5 text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-14">
            Find quick answers to common insurance-related questions.
          </p>

          <div className="space-y-4 text-left max-w-3xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#f8fafc] border border-slate-100 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="text-[15px] sm:text-base font-black text-[#0b1e36] pr-4">
                      {faq.q}
                    </span>
                    <span className="text-[#e2b33e] font-black flex-shrink-0">
                      {isOpen ? (
                        <Minus className="h-5 w-5 stroke-[3]" />
                      ) : (
                        <Plus className="h-5 w-5 stroke-[3]" />
                      )}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-slate-500 leading-relaxed border-t border-slate-100/50 pt-4 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};

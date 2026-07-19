export const INSURANCE_PLANS = [
  // Health Plans
  {
    id: 'health_saver',
    type: 'health',
    name: 'SecureCare Basic',
    provider: 'TrustLine Prime',
    monthlyPremium: 45,
    coverageAmount: 150000,
    policyTerm: '1 Year (Renewable)',
    claimRatio: 96.4,
    benefits: ['Cashless claims at 4,000+ hospitals', 'No room rent limit on standard ICU', 'Pre & post-hospitalization cover (30 days)', 'Free annual health checkup'],
    coPay: '20% Co-pay on special treatments',
    cashlessHospitals: 4200,
    description: 'Affordable standard medical coverage for individuals under 35 seeking entry-level security.',
  },
  {
    id: 'health_premium',
    type: 'health',
    name: 'SecureCare Elite Gold',
    provider: 'TrustLine Premium',
    monthlyPremium: 95,
    coverageAmount: 500000,
    policyTerm: '1 Year (Renewable)',
    claimRatio: 98.9,
    benefits: ['Cashless claims at 9,500+ premium hospitals', 'Zero co-pay globally', 'Pre & post-hospitalization cover (90 days)', 'Maternity & newborn protection (up to ₹5,000)', 'Organ donor cost reimbursement', 'Air ambulance cover'],
    coPay: '0% Co-pay (Fully covered)',
    cashlessHospitals: 9800,
    popular: true,
    description: 'Comprehensive, elite health protection for your complete family with premium global care and zero compromises.',
  },
  {
    id: 'health_pro',
    type: 'health',
    name: 'SecureCare Family Shield',
    provider: 'TrustLine Premium',
    monthlyPremium: 140,
    coverageAmount: 1000000,
    policyTerm: '1 Year (Renewable)',
    claimRatio: 99.1,
    benefits: ['Floater plan for up to 4 family members', 'Infinite restoration of coverage amount', 'Critical illness rider included (₹50,000 cash benefit)', 'Ayush alternative treatment coverage'],
    coPay: '0% Co-pay',
    cashlessHospitals: 9800,
    description: 'Designed specifically for families, offering extensive common pool coverage, critical illness riders, and premium hospital network access.',
  },

  // Life Plans
  {
    id: 'life_term_basic',
    type: 'life',
    name: 'Term Shield Classic',
    provider: 'TrustLine Life',
    monthlyPremium: 25,
    coverageAmount: 250000,
    policyTerm: '20 Years',
    claimRatio: 97.2,
    benefits: ['Guaranteed ₹1,000,000 payout', 'Tax-free death benefits', 'Optional accidental death rider', 'Premium waiver on critical disability'],
    description: 'Pure risk term insurance protection designed to secure your family\'s basic financial milestones with zero fluff.',
  },
  {
    id: 'life_term_max',
    type: 'life',
    name: 'Term Shield Elite',
    provider: 'TrustLine Life',
    monthlyPremium: 55,
    coverageAmount: 1000000,
    policyTerm: '30 Years',
    claimRatio: 99.4,
    benefits: ['Guaranteed ₹1,000,000 payout', 'Accelerated death benefit for terminal illness', 'Accidental death benefit rider (₹250,000 extra)', 'Return of premium option at end of term'],
    popular: true,
    description: 'Top-tier high-value financial shield designed to guard your estate, cover mortgages, and secure a luxurious legacy for your dependents.',
  },

  // Motor Plans
  {
    id: 'motor_third_party',
    type: 'motor',
    name: 'AutoGuard Standard Liability',
    provider: 'TrustLine Auto',
    monthlyPremium: 15,
    coverageAmount: 50000,
    policyTerm: '1 Year',
    claimRatio: 95.8,
    benefits: ['Mandatory third-party injury coverage', 'Third-party property damage coverage up to ₹50,000', 'Basic towing service (₹100 limit)', 'Quick digital claims'],
    garageNetwork: 850,
    description: 'Sufficient basic liability plan to satisfy mandatory state highway requirements and standard legal compliance.',
  },
  {
    id: 'motor_comprehensive',
    type: 'motor',
    name: 'AutoGuard Comprehensive Platinum',
    provider: 'TrustLine Auto',
    monthlyPremium: 38,
    coverageAmount: 120000,
    policyTerm: '1 Year',
    claimRatio: 98.2,
    benefits: ['Own-damage & crash repair coverage', 'Zero depreciation rider (full plastic/metal payout)', 'Engine & gearbox protect cover', 'Roadside assistance 24/7 with taxi refund', 'Personal accident cover (₹15,000)'],
    garageNetwork: 3200,
    popular: true,
    description: 'Elite, full-spectrum protection covering collision, theft, natural disasters, and key replacements with cashless repair at 3,200+ garages.',
  },

  // Travel Plans
  {
    id: 'travel_global',
    type: 'travel',
    name: 'VoyageSecure Global',
    provider: 'TrustLine Travel',
    monthlyPremium: 12,
    coverageAmount: 150000,
    policyTerm: 'Single Trip (Up to 90 days)',
    claimRatio: 97.5,
    benefits: ['Emergency medical hospitalization cover up to ₹150,000', 'Trip cancellation and flight delay cover (₹1,000)', 'Baggage loss and delay coverage (₹500)', 'Emergency passport duplicate costs'],
    description: 'Perfect travel companion offering high-limit medical emergency payouts and luggage indemnity for hassle-free global wandering.',
  },

  // Home Plans
  {
    id: 'home_safety',
    type: 'home',
    name: 'HomeHaven Comprehensive Shield',
    provider: 'TrustLine Property',
    monthlyPremium: 30,
    coverageAmount: 350000,
    policyTerm: '5 Years',
    claimRatio: 96.9,
    benefits: ['Structure protection from fire, earthquake, and flood', 'Burglar theft cover for household jewelry/appliances', 'Alternative rent expenses cover (up to 6 months)', 'Public liability cover for visitor accidents'],
    description: 'Reassuring property guard securing structural rebuild expenses and interior home belongings from environmental or criminal hazards.',
  },

  // Business Plans
  {
    id: 'business_shield',
    type: 'business',
    name: 'BizGuard Enterprise Pro',
    provider: 'TrustLine Commercial',
    monthlyPremium: 180,
    coverageAmount: 2000000,
    policyTerm: '1 Year',
    claimRatio: 99.2,
    benefits: ['General commercial liability protection', 'Professional indemnity (Errors & Omissions)', 'Business interruption coverage (income support)', 'Cybersecurity ransomware breach response fund'],
    description: 'Vital risk transfer framework designed for modern SMEs and technology startups to absorb operational, legal, and digital liabilities.',
  }
];

export const DEMO_USER = {
  id: 'usr_customer',
  name: 'Client Partner',
  email: 'client@trustline.com',
  role: 'user',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  phone: '+91 98765 43210',
  age: 30,
  location: 'Mumbai, India',
  income: '₹12,00,000'
};

export const DEMO_ADMIN = {
  id: 'usr_admin',
  name: 'Sarah Jenkins',
  email: 'admin@trustline.com',
  role: 'admin',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

export const INITIAL_POLICIES = [];

export const INITIAL_CLAIMS = [];

export const INITIAL_PAYMENTS = [];

import React, { useState } from 'react';
import { 
  Sparkles, Shield, Compass, Heart, Car, Plane, Home, Briefcase, 
  HelpCircle, ArrowRight, CheckCircle2, TrendingUp, AlertTriangle
} from 'lucide-react';
export const PremiumCalculator = () => {
  // Input states
  const [insuranceType, setInsuranceType] = useState('health');
  const [age, setAge] = useState(30);
  const [coverage, setCoverage] = useState(250000);
  const [duration, setDuration] = useState(10);
  const [annualIncome, setAnnualIncome] = useState(75000);
  const [tobaccoUser, setTobaccoUser] = useState(false);
  const [preExistingConditions, setPreExistingConditions] = useState(false);
  const [customCondition, setCustomCondition] = useState('');
  
  // Underwriting advisor states
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [underwriterReport, setUnderwriterReport] = useState(null);
  const [connectionError, setConnectionError] = useState(null);

  // Core formula-based estimation that runs reactively
  const computePremium = () => {
    let baseRate = 0;
    
    switch (insuranceType) {
      case 'health':
        baseRate = 0.0018; // 0.18% of sum insured per year
        break;
      case 'life':
        baseRate = 0.0009; // 0.09% of sum insured per year
        break;
      case 'motor':
        baseRate = 0.0035; // 0.35% of vehicle value per year
        break;
      case 'travel':
        baseRate = 0.0006;
        break;
      case 'home':
        baseRate = 0.0012;
        break;
      case 'business':
        baseRate = 0.0055;
        break;
    }

    // Adjust based on age
    let ageMultiplier = 1.0;
    if (age < 25) ageMultiplier = 0.85;
    else if (age > 50) ageMultiplier = 1.65;
    else if (age > 35) ageMultiplier = 1.25;

    // Adjust based on smoker / risk habits
    let tobaccoMultiplier = tobaccoUser ? 1.45 : 1.0;
    let illnessMultiplier = preExistingConditions ? 1.30 : 1.0;

    const estimatedAnnual = coverage * baseRate * ageMultiplier * tobaccoMultiplier * illnessMultiplier;
    return Math.max(12, Math.round(estimatedAnnual / 12)); // Minimum ₹12/month
  };

  const estimatedMonthly = computePremium();
  const estimatedAnnual = estimatedMonthly * 12;

  // Retrieve expert coverage advisory from server-side underwriter endpoint
  const fetchUnderwriterInsights = async () => {
    setLoadingInsights(true);
    setUnderwriterReport(null);
    setConnectionError(null);

    try {
      const response = await fetch('/api/expert/advisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: age,
          location: 'Mumbai, India (HQ Default)',
          occupation: annualIncome > 120000 ? 'Executive' : 'Professional Practitioner',
          annualIncome: `₹${annualIncome.toLocaleString()}`,
          dependencies: '2 (Default Demo)',
          healthStatus: preExistingConditions ? 'Has existing medical records' : 'Excellent physical condition',
          categoriesOfInterest: [insuranceType],
          existingConditions: preExistingConditions ? (customCondition || 'Minor historical factors') : 'None',
          smoker: tobaccoUser,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setUnderwriterReport(data.recommendation);
      } else {
        setConnectionError(data.error || 'The underwriter engine was temporarily unavailable.');
      }
    } catch (err) {
      setConnectionError('Failed to establish connection to TrustLine Server.');
    } finally {
      setLoadingInsights(false);
    }
  };

  const insuranceTypeLabels = [
    { id: 'health', label: 'Health Care', icon: Heart },
    { id: 'life', label: 'Term Life', icon: Shield },
    { id: 'motor', label: 'Auto / Car', icon: Car },
    { id: 'travel', label: 'Voyage / Travel', icon: Plane },
    { id: 'home', label: 'Home Haven', icon: Home },
    { id: 'business', label: 'Biz Shield', icon: Briefcase },
  ];

  return (
    <div id="calculator-container" className="py-12 bg-[#f8fafc] min-h-screen text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-[#cca33a] uppercase bg-[#f5efe2] px-3 py-1 rounded-full">Interactive Underwriting</span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0b1e36] mt-3">
            Premium Calculator
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Slide variables to view instant reactive premium costs, then connect directly with our underwriter assistant to receive deep cost mitigation guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Sliders and Parameters Panel (Left - 7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#0b1e36] border-b border-slate-100 pb-4">Adjust Coverage Variables</h2>
            
            {/* 1. Category selector */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">Policy Protection Class</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {insuranceTypeLabels.map((lbl) => {
                  const Icon = lbl.icon;
                  const isSelected = insuranceType === lbl.id;
                  return (
                    <button
                      id={`calc-tab-${lbl.id}`}
                      key={lbl.id}
                      onClick={() => setInsuranceType(lbl.id)}
                      className={`flex items-center space-x-2 p-3.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        isSelected 
                          ? 'bg-[#0b1e36] text-white border-[#0b1e36]' 
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-[#0b1e36] hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                      <span>{lbl.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              
              {/* Age Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500 uppercase tracking-wider font-bold">Age of Insured</span>
                  <span className="text-[#0b1e36] font-black">{age} Years</span>
                </div>
                <input 
                  id="calc-age-slider"
                  type="range" 
                  min="18" 
                  max="80" 
                  value={age} 
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  className="w-full accent-[#cca33a] h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Annual Income */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500 uppercase tracking-wider font-bold">Annual Income</span>
                  <span className="text-[#0b1e36] font-black">₹{annualIncome.toLocaleString('en-IN')}</span>
                </div>
                <input 
                  id="calc-income-slider"
                  type="range" 
                  min="20000" 
                  max="300000" 
                  step="5000"
                  value={annualIncome} 
                  onChange={(e) => setAnnualIncome(parseInt(e.target.value))}
                  className="w-full accent-[#cca33a] h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Coverage Sum Slider */}
              <div className="space-y-2 sm:col-span-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500 uppercase tracking-wider font-bold">Requested Sum Insured (Coverage Cap)</span>
                  <span className="text-[#cca33a] font-extrabold text-sm">₹{coverage.toLocaleString('en-IN')}</span>
                </div>
                <input 
                  id="calc-coverage-slider"
                  type="range" 
                  min="20000" 
                  max="2000000" 
                  step="10000"
                  value={coverage} 
                  onChange={(e) => setCoverage(parseInt(e.target.value))}
                  className="w-full accent-[#cca33a] h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-[10px] text-slate-400 leading-none">Min limit ₹20K • Max limit ₹2.0M</p>
              </div>
            </div>

            {/* Toggle Switches (Risk Parameters) */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Smoker Toggle */}
              <label id="tobacco-toggle-label" className="flex items-center space-x-3.5 bg-slate-50 border border-slate-200 p-4 rounded-xl cursor-pointer hover:border-slate-300 transition-all">
                <input 
                  id="calc-tobacco-checkbox"
                  type="checkbox" 
                  checked={tobaccoUser} 
                  onChange={(e) => setTobaccoUser(e.target.checked)}
                  className="rounded bg-white border-slate-300 text-[#0b1e36] focus:ring-[#0b1e36]/20 h-5 w-5"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Tobacco / Nicotine User</span>
                  <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">Increases health & life risk rating (+45%)</span>
                </div>
              </label>

              {/* Pre-existing Toggle */}
              <label id="health-toggle-label" className="flex items-center space-x-3.5 bg-slate-50 border border-slate-200 p-4 rounded-xl cursor-pointer hover:border-slate-300 transition-all">
                <input 
                  id="calc-health-checkbox"
                  type="checkbox" 
                  checked={preExistingConditions} 
                  onChange={(e) => setPreExistingConditions(e.target.checked)}
                  className="rounded bg-white border-slate-300 text-[#0b1e36] focus:ring-[#0b1e36]/20 h-5 w-5"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Pre-existing Medical History</span>
                  <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">Cardiac, respiratory or diabetes records (+30%)</span>
                </div>
              </label>
            </div>

            {preExistingConditions && (
              <div id="preexisting-input-block" className="p-4 bg-[#f5efe2] border border-amber-200 rounded-xl space-y-2">
                <label className="text-[10px] font-mono text-[#cca33a] uppercase tracking-widest block font-bold">Detail Medical Background (Optional)</label>
                <input 
                  id="calc-condition-input"
                  type="text"
                  placeholder="e.g. Controlled high blood pressure, asthma inhaler, minor sports knee surgery"
                  value={customCondition}
                  onChange={(e) => setCustomCondition(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b1e36]"
                />
              </div>
            )}

            {/* Expert Advisor Trigger Button */}
            <div className="pt-4 border-t border-slate-100">
              <button
                id="calc-ai-trigger-btn"
                onClick={fetchUnderwriterInsights}
                disabled={loadingInsights}
                className="w-full py-4 px-6 bg-[#0b1e36] hover:bg-[#132d4e] text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all duration-200 flex items-center justify-center space-x-2.5 cursor-pointer shadow-md shadow-slate-900/10"
              >
                <Sparkles className="h-5 w-5 text-amber-300 animate-pulse" />
                <span>{loadingInsights ? 'Generating Advisory Report...' : 'Get Personal Risk Advisory'}</span>
              </button>
            </div>
          </div>

          {/* Premium Quote Summary & AI Feedback Panel (Right - 5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Live Estimation Card */}
            <div id="live-estimation-box" className="bg-[#0b1e36] border border-slate-950 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden text-white shadow-xl">
              {/* Golden accent border */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[#e2b33e]"></div>

              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Instant Interactive Estimate</span>
              <h3 className="text-xl font-bold text-white mt-1">Calculated Protection Quote</h3>

              <div className="my-8">
                <span className="text-slate-400 text-xs uppercase font-mono block">Estimated Monthly Premium</span>
                <p className="text-6xl font-black text-[#e2b33e] tracking-tight mt-2">
                  ₹{estimatedMonthly}
                  <span className="text-lg text-slate-300 font-medium">/mo</span>
                </p>
                <span className="text-[11px] text-slate-400 font-mono block mt-2">Estimated Annual Premium: ₹{estimatedAnnual.toLocaleString('en-IN')} / year</span>
              </div>

              <div className="space-y-3.5 bg-slate-950/40 p-4.5 rounded-2xl text-left text-xs border border-white/5">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                  <span className="text-slate-200">Sum Insured Payout Guarantees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                  <span className="text-slate-200">Cashless claims processing globally</span>
                </div>
                {tobaccoUser && (
                  <div className="flex items-start space-x-2 text-rose-300">
                    <AlertTriangle className="h-4.5 w-4.5 text-rose-300 flex-shrink-0 mt-0.5 animate-bounce" />
                    <span>Tobacco adjustment applied to basic premium (+45%)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Real-time Advisory Response Panel */}
            {(loadingInsights || underwriterReport || connectionError) && (
              <div id="ai-underwriter-panel" className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
                {/* Visual Sparkle Glow */}
                <div className="absolute top-0 right-0 h-32 w-32 bg-[#e2b33e]/5 blur-3xl rounded-full"></div>

                <div className="flex items-center space-x-2 mb-4 border-b border-slate-100 pb-3">
                  <Sparkles className="h-5 w-5 text-[#cca33a]" />
                  <h3 className="text-sm font-extrabold uppercase font-mono tracking-widest text-[#cca33a]">Underwriting Insights</h3>
                </div>

                {loadingInsights && (
                  <div id="ai-loading-skeleton" className="space-y-4 py-6">
                    <div className="flex items-center space-x-3 text-xs text-[#cca33a] font-semibold animate-pulse">
                      <Compass className="h-5 w-5 text-[#cca33a] animate-spin" />
                      <span>Consulting medical actuarial tables...</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-100 rounded w-full animate-pulse"></div>
                      <div className="h-3 bg-slate-100 rounded w-5/6 animate-pulse"></div>
                      <div className="h-3 bg-slate-100 rounded w-4/5 animate-pulse"></div>
                      <div className="h-3 bg-slate-100 rounded w-2/3 animate-pulse"></div>
                    </div>
                  </div>
                )}

                {connectionError && (
                  <div id="ai-error-block" className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs space-y-2">
                    <p className="font-bold">Underwriting Connection Failure</p>
                    <p className="text-slate-500">{connectionError}</p>
                    <button 
                      onClick={fetchUnderwriterInsights}
                      className="text-[#cca33a] underline font-mono text-[11px]"
                    >
                      Retry Connection
                    </button>
                  </div>
                )}

                {underwriterReport && (
                  <div id="ai-report-content" className="prose max-w-none text-xs text-slate-600 leading-relaxed whitespace-pre-line space-y-3">
                    {underwriterReport}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

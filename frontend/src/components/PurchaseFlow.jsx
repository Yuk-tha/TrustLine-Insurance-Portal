import React, { useState } from 'react';
import { 
  Shield, CheckCircle2, User, HelpCircle, 
  CreditCard, ArrowRight, ArrowLeft, Download, Eye, Sparkles
} from 'lucide-react';
export const PurchaseFlow = ({
  selectedPlan,
  onPolicyPurchased,
  setView,
}) => {
  const [step, setStep] = useState(1);
  
  // Step 1: Personal Details
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  // Step 2: Risk Declarations
  const [smoker, setSmoker] = useState(false);
  const [highRiskHobby, setHighRiskHobby] = useState(false);
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryRelation, setBeneficiaryRelation] = useState('');

  // Step 3: Payment
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Completed Policy placeholder
  const [finalPolicy, setFinalPolicy] = useState(null);

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmitPurchase = (e) => {
    e.preventDefault();
    
    // Auto generate policy number
    const randNum = Math.floor(100000 + Math.random() * 900000);
    const policyCode = `TL-${selectedPlan.type.substring(0, 2).toUpperCase()}-${randNum}`;
    
    const startDate = new Date().toISOString().split('T')[0];
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const endDate = nextYear.toISOString().split('T')[0];

    const newPolicy = {
      id: `pol_${randNum}`,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      type: selectedPlan.type,
      premium: selectedPlan.monthlyPremium,
      coverageAmount: selectedPlan.coverageAmount,
      startDate: startDate,
      endDate: endDate,
      status: 'active',
      policyNumber: policyCode
    };

    setFinalPolicy(newPolicy);
    onPolicyPurchased(newPolicy);
    setStep(4);
  };

  const formatMoney = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div id="purchase-flow-container" className="py-12 bg-[#f8fafc] min-h-screen text-slate-800 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-10 max-w-lg mx-auto">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div 
                id={`step-indicator-${s}`}
                className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s 
                    ? 'bg-[#0b1e36] text-white ring-4 ring-[#0b1e36]/10' 
                    : step > s 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-white border border-slate-200 text-slate-400'
                }`}
              >
                {step > s ? '✓' : s}
              </div>
              {s < 4 && (
                <div className={`h-0.5 w-12 sm:w-20 mx-2 ${step > s ? 'bg-emerald-500' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Selected Plan Banner Info */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4.5 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm">
          <div>
            <span className="text-[10px] font-mono text-[#cca33a] uppercase tracking-widest font-bold">{selectedPlan.provider}</span>
            <h2 className="text-md font-bold text-[#0b1e36] mt-0.5">{selectedPlan.name}</h2>
          </div>
          <div className="mt-3 sm:mt-0 text-left sm:text-right border-t sm:border-t-0 sm:border-l border-slate-150 pt-3 sm:pt-0 sm:pl-6">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Selected Cover Limit</span>
            <p className="text-md font-extrabold text-[#0b1e36]">{formatMoney(selectedPlan.coverageAmount)}</p>
            <p className="text-xs text-[#cca33a] font-bold mt-0.5">{formatMoney(selectedPlan.monthlyPremium)} / mo</p>
          </div>
        </div>

        {/* Step Cards */}
        <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-sm">
          
          {/* STEP 1: Personal Profile Details */}
          {step === 1 && (
            <div id="purchase-step-1" className="space-y-6">
              <h3 className="text-lg font-bold text-[#0b1e36] flex items-center space-x-2 border-b border-slate-100 pb-3">
                <User className="h-5 w-5 text-[#cca33a]" />
                <span>1. Personal & Contact Parameters</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Full Legal Name</label>
                  <input 
                    id="field-fullName"
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Date of Birth</label>
                  <input 
                    id="field-dob"
                    type="date" 
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Mobile Number</label>
                  <input 
                    id="field-phone"
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Street Address</label>
                  <input 
                    id="field-address"
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">City</label>
                  <input 
                    id="field-city"
                    type="text" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">ZIP / Postal Code</label>
                  <input 
                    id="field-zip"
                    type="text" 
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  id="step1-next-btn"
                  onClick={handleNext}
                  className="px-6 py-3 bg-[#e2b33e] hover:bg-[#cca33a] text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition flex items-center space-x-1 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Risk Declarations & Beneficiaries */}
          {step === 2 && (
            <div id="purchase-step-2" className="space-y-6">
              <h3 className="text-lg font-bold text-[#0b1e36] flex items-center space-x-2 border-b border-slate-100 pb-3">
                <Shield className="h-5 w-5 text-[#cca33a]" />
                <span>2. Risk Underwriting Declarations</span>
              </h3>

              <div className="space-y-4">
                <label className="flex items-start space-x-3 bg-slate-50 p-4 rounded-xl cursor-pointer hover:border-slate-200 border border-slate-100 transition-all">
                  <input 
                    id="field-smoker"
                    type="checkbox" 
                    checked={smoker}
                    onChange={(e) => setSmoker(e.target.checked)}
                    className="rounded bg-white border-slate-300 text-[#0b1e36] focus:ring-[#0b1e36]/20 h-5 w-5 mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Do you smoke, vape, or consume tobacco/nicotine products regularly?</span>
                    <span className="text-[10px] text-slate-500 block leading-tight mt-1">Required to calibrate standard premium loadings.</span>
                  </div>
                </label>

                <label className="flex items-start space-x-3 bg-slate-50 p-4 rounded-xl cursor-pointer hover:border-slate-200 border border-slate-100 transition-all">
                  <input 
                    id="field-hobby"
                    type="checkbox" 
                    checked={highRiskHobby}
                    onChange={(e) => setHighRiskHobby(e.target.checked)}
                    className="rounded bg-white border-slate-300 text-[#0b1e36] focus:ring-[#0b1e36]/20 h-5 w-5 mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Do you participate in aviation, off-road racing, scuba diving, or extreme sports?</span>
                    <span className="text-[10px] text-slate-500 block leading-tight mt-1">Requires compliance assessment check during review.</span>
                  </div>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Primary Nominated Beneficiary</label>
                  <input 
                    id="field-beneficiary"
                    type="text" 
                    value={beneficiaryName}
                    onChange={(e) => setBeneficiaryName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Relationship to Insured</label>
                  <input 
                    id="field-relation"
                    type="text" 
                    value={beneficiaryRelation}
                    onChange={(e) => setBeneficiaryRelation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  id="step2-back-btn"
                  onClick={handleBack}
                  className="px-5 py-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center space-x-1 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  id="step2-next-btn"
                  onClick={handleNext}
                  className="px-6 py-3 bg-[#e2b33e] hover:bg-[#cca33a] text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition flex items-center space-x-1 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Checkout form */}
          {step === 3 && (
            <form onSubmit={handleSubmitPurchase} id="purchase-step-3" className="space-y-6">
              <h3 className="text-lg font-bold text-[#0b1e36] flex items-center space-x-2 border-b border-slate-100 pb-3">
                <CreditCard className="h-5 w-5 text-[#cca33a]" />
                <span>3. Secure Payment Gateway</span>
              </h3>

              <div className="bg-slate-50 p-5 border border-slate-100 rounded-2xl grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-bold">Immediate Payout Summary</span>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">First Monthly Premium Due</span>
                    <span className="font-extrabold text-[#cca33a]">{formatMoney(selectedPlan.monthlyPremium)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs mt-1">
                    <span className="text-slate-600 font-medium">Underwriting Stamp Fee</span>
                    <span className="text-emerald-600 font-bold">Waived (₹0.00)</span>
                  </div>
                  <div className="border-t border-slate-150 mt-3 pt-3 flex justify-between items-center text-sm">
                    <span className="font-bold text-[#0b1e36]">Total Charge (INR)</span>
                    <span className="font-black text-[#0b1e36] text-lg">{formatMoney(selectedPlan.monthlyPremium)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Credit / Debit Card Number</label>
                  <input 
                    id="field-card"
                    type="text" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Expiry (MM/YY)</label>
                    <input 
                      id="field-expiry"
                      type="text" 
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Secure CVV Code</label>
                    <input 
                      id="field-cvv"
                      type="password" 
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  id="step3-back-btn"
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center space-x-1 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  id="step3-submit-btn"
                  type="submit"
                  className="px-8 py-3 bg-[#0b1e36] hover:bg-[#132d4e] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition flex items-center space-x-1.5 cursor-pointer shadow-md"
                >
                  <Shield className="h-4 w-4 text-blue-400" />
                  <span>Bind Cover & Pay</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success Completion */}
          {step === 4 && finalPolicy && (
            <div id="purchase-step-4" className="text-center space-y-6 py-6">
              <div className="mx-auto h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-200 shadow-sm">
                <CheckCircle2 className="h-10 w-10 stroke-[2]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600">Coverage Bound Successfully</span>
                <h3 className="text-2xl font-black text-[#0b1e36]">TrustLine Policy Issued</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Your electronic ledger certificate and insurance policy documents have been prepared. The coverage is now active.
                </p>
              </div>

              {/* Policy receipt summary card */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-left max-w-md mx-auto space-y-3 font-mono text-xs text-slate-700 shadow-inner">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-400 font-bold">POLICY ID:</span>
                  <span className="text-[#0b1e36] font-bold">{finalPolicy.policyNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">INSURED:</span>
                  <span className="text-slate-700 font-semibold">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">PRODUCT NAME:</span>
                  <span className="text-slate-700 font-semibold">{finalPolicy.planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">COVER LIMIT:</span>
                  <span className="text-[#0b1e36] font-bold">{formatMoney(finalPolicy.coverageAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">MONTHLY COST:</span>
                  <span className="text-[#cca33a] font-bold">{formatMoney(finalPolicy.premium)} / mo</span>
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-3">
                <button
                  id="completion-dashboard-btn"
                  onClick={() => setView('customer-dashboard')}
                  className="w-full sm:w-auto px-6 py-3 bg-[#0b1e36] hover:bg-[#132d4e] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
                >
                  <Eye className="h-4.5 w-4.5" />
                  <span>Go to Customer Area</span>
                </button>
                <button
                  id="completion-pdf-btn"
                  onClick={() => alert(`Policy ${finalPolicy.policyNumber} Document Pack is compiled.\nDownloading is simulated securely.`)}
                  className="w-full sm:w-auto px-6 py-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Download className="h-4.5 w-4.5" />
                  <span>Download Ledger PDF</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

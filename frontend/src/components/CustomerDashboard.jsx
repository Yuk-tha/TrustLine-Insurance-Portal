import React, { useState } from 'react';
import { 
  Shield, Heart, Car, Plane, Home, Briefcase, 
  Clock, CheckCircle, AlertTriangle, FileText, 
  Download, Plus, Sparkles, Send, Upload, Eye, RefreshCw
} from 'lucide-react';
export const CustomerDashboard = ({
  userSession,
  updateSessionProfile,
  policies,
  claims,
  addClaim,
  payments,
}) => {
  const [activeTab, setActiveTab] = useState('policies');

  // Profile Settings Form states
  const [profileName, setProfileName] = useState(userSession.name || '');
  const [profileEmail, setProfileEmail] = useState(userSession.email || '');
  const [profilePhone, setProfilePhone] = useState(userSession.phone || '+91 98765 43210');
  const [profileAge, setProfileAge] = useState(userSession.age || 30);
  const [profileLocation, setProfileLocation] = useState(userSession.location || 'Mumbai, India');
  const [profileIncome, setProfileIncome] = useState(userSession.income || '₹12,00,000');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState(false);

  // Claim Filing Form states
  const [isFilingClaim, setIsFilingClaim] = useState(false);
  const [claimPolicyId, setClaimPolicyId] = useState(policies[0]?.id || '');
  const [claimAmount, setClaimAmount] = useState(1500);
  const [claimReason, setClaimReason] = useState('Routine checkup & diagnostic screening');
  const [claimDesc, setClaimDesc] = useState('Experienced severe knee soreness after a weekend run. Visited Mercy Medical Center.');
  
  // Claim pre-validation states
  const [loadingValidatorCheck, setLoadingValidatorCheck] = useState(false);
  const [validatorCheckResult, setValidatorCheckResult] = useState(null);

  // Active tracked claim for timeline rendering
  const [trackedClaimId, setTrackedClaimId] = useState(claims[0]?.id || '');

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateSessionProfile({
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
      age: Number(profileAge),
      location: profileLocation,
      income: profileIncome
    });
    setProfileSuccessMsg(true);
    setTimeout(() => setProfileSuccessMsg(false), 3000);
  };

  const handleRunValidatorCheck = async () => {
    if (!claimPolicyId) return;
    const selectedPolicy = policies.find(p => p.id === claimPolicyId);
    if (!selectedPolicy) return;

    setLoadingValidatorCheck(true);
    setValidatorCheckResult(null);

    try {
      const res = await fetch('/api/claims/pre-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claimReason,
          policyType: selectedPolicy.type,
          claimAmount,
          description: claimDesc,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setValidatorCheckResult(data.analysis);
      } else {
        setValidatorCheckResult('Failed to run standard checklist parameter queries.');
      }
    } catch (err) {
      setValidatorCheckResult('Failed to establish server pre-validation check connection.');
    } finally {
      setLoadingValidatorCheck(false);
    }
  };

  const handleFormSubmitClaim = (e) => {
    e.preventDefault();
    const selectedPolicy = policies.find(p => p.id === claimPolicyId);
    if (!selectedPolicy) return;

    const claimNum = Math.floor(1000 + Math.random() * 9000);
    const newClaim = {
      id: `clm_${claimNum}`,
      policyId: selectedPolicy.id,
      policyNumber: selectedPolicy.policyNumber,
      policyName: selectedPolicy.planName,
      type: selectedPolicy.type,
      claimAmount: claimAmount,
      reason: claimReason,
      dateFiled: new Date().toISOString().split('T')[0],
      status: 'pending',
      documents: ['uploaded_receipt_1.pdf'],
      timeline: [
        { 
          status: 'Claim Filed', 
          description: 'Digital claims application lodged securely with parameters.', 
          date: new Date().toISOString().split('T')[0] 
        }
      ]
    };

    addClaim(newClaim);
    setTrackedClaimId(newClaim.id);
    setIsFilingClaim(false);
    setAiCheckResult(null);
  };

  const selectedTrackedClaim = claims.find(c => c.id === trackedClaimId);

  const getPolicyIcon = (type) => {
    switch (type) {
      case 'health': return Heart;
      case 'life': return Shield;
      case 'motor': return Car;
      case 'travel': return Plane;
      case 'home': return Home;
      case 'business': return Briefcase;
    }
  };

  const formatMoney = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div id="customer-dashboard-container" className="py-12 bg-[#f8fafc] min-h-screen text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Brief Welcome Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border border-slate-100 rounded-3xl p-6 mb-10 shadow-sm">
          <div className="flex items-center space-x-4">
            <img 
              id="dashboard-user-avatar"
              src={userSession.avatarUrl} 
              alt={userSession.name} 
              className="h-16 w-16 rounded-2xl object-cover ring-2 ring-[#e2b33e]"
            />
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#cca33a] uppercase font-bold">Secure Client Portal</span>
              <h1 className="text-xl sm:text-2xl font-black text-[#0b1e36] mt-0.5">Welcome Back, {userSession.name}</h1>
              <p className="text-xs text-slate-500 mt-1">{userSession.email} • {profilePhone} • {profileLocation}</p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-3 text-xs">
            <button
              id="dashboard-new-claim-btn"
              onClick={() => {
                setIsFilingClaim(true);
                setActiveTab('claims');
              }}
              className="px-4.5 py-3 bg-[#e2b33e] hover:bg-[#cca33a] text-slate-950 font-extrabold uppercase tracking-wider rounded-xl transition flex items-center space-x-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="h-4.5 w-4.5 stroke-[2.5]" />
              <span>Lodge a Claim</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div id="dashboard-tabs" className="flex border-b border-slate-150 mb-8 space-x-1 overflow-x-auto">
          {['policies', 'claims', 'payments', 'profile'].map((tab) => (
            <button
              id={`dash-tab-${tab}`}
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === tab 
                  ? 'border-[#cca33a] text-[#cca33a] font-extrabold' 
                  : 'border-transparent text-slate-500 hover:text-[#0b1e36]'
              }`}
            >
              {tab === 'policies' && 'Active Policies'}
              {tab === 'claims' && 'Claims Tracking'}
              {tab === 'payments' && 'Premium Receipts'}
              {tab === 'profile' && 'Member Profile'}
            </button>
          ))}
        </div>

        {/* 1. POLICIES SUB-VIEW */}
        {activeTab === 'policies' && (
          <div id="policies-sub-view" className="space-y-6">
            <h2 className="text-lg font-bold text-[#0b1e36] border-b border-slate-100 pb-3">Your Insured Portfolios</h2>
            {policies.length === 0 ? (
              <div className="p-8 text-center bg-white border border-slate-100 rounded-2xl shadow-sm">
                <p className="text-xs text-slate-500">You do not have any active insurance covers bound in this account.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {policies.map((pol) => {
                  const PolicyIcon = getPolicyIcon(pol.type);
                  return (
                    <div 
                      id={`dash-policy-${pol.id}`}
                      key={pol.id} 
                      className={`p-6 bg-white border rounded-3xl flex flex-col justify-between transition shadow-sm hover:shadow-md ${
                        pol.status === 'expiring' 
                          ? 'border-rose-200' 
                          : 'border-slate-100'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2.5 bg-slate-50 border border-slate-150 text-[#cca33a] rounded-xl">
                              <PolicyIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold">Policy: {pol.policyNumber}</span>
                              <h3 className="text-md font-bold text-[#0b1e36] leading-tight mt-0.5">{pol.planName}</h3>
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase rounded ${
                            pol.status === 'expiring' 
                              ? 'bg-rose-50 text-rose-700 font-bold border border-rose-100' 
                              : 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-100'
                          }`}>
                            {pol.status === 'expiring' ? 'Expiring Soon' : 'Cover Active'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 my-6 bg-slate-50 p-3.5 border border-slate-100 rounded-xl text-xs font-mono">
                          <div>
                            <span className="text-[9px] text-slate-400 uppercase font-bold">Sum Insured Payout Cap</span>
                            <p className="text-sm font-bold text-slate-800 mt-0.5">{formatMoney(pol.coverageAmount)}</p>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 uppercase font-bold">Monthly Charge</span>
                            <p className="text-sm font-bold text-[#cca33a] mt-0.5">{formatMoney(pol.premium)} / mo</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[11px] pt-4 border-t border-slate-100">
                        <span className="text-slate-500">Term: {pol.startDate} to {pol.endDate}</span>
                        <div className="flex gap-2">
                          <button
                            id={`policy-file-claim-${pol.id}`}
                            onClick={() => {
                              setClaimPolicyId(pol.id);
                              setIsFilingClaim(true);
                              setActiveTab('claims');
                            }}
                            className="px-3 py-1.5 bg-[#0b1e36] hover:bg-[#132d4e] text-white rounded-lg text-[10px] font-mono uppercase tracking-wider font-bold"
                          >
                            Claim
                          </button>
                          {pol.status === 'expiring' && (
                            <button
                              id={`policy-renew-${pol.id}`}
                              onClick={() => alert(`Policy ${pol.policyNumber} Renewal Scheduled`)}
                              className="px-2.5 py-1.5 bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 rounded-lg text-[10px] font-mono uppercase tracking-wider font-bold"
                            >
                              Renew Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 2. CLAIMS TRACKING & REGISTRY SUB-VIEW */}
        {activeTab === 'claims' && (
          <div id="claims-sub-view" className="space-y-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#0b1e36]">Claims Tracking Matrix</h2>
              <button
                id="file-new-claim-toggle-btn"
                onClick={() => setIsFilingClaim(!isFilingClaim)}
                className="px-3.5 py-2 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-[#0b1e36] rounded-lg text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
              >
                <span>{isFilingClaim ? 'View My Claims' : 'Lodge New Claim'}</span>
              </button>
            </div>

            {isFilingClaim ? (
              /* Claim filing interactive wizard with Gemini Pre-Check capability */
              <div id="claim-submission-form-block" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Form fields (7 cols) */}
                <form onSubmit={handleFormSubmitClaim} className="lg:col-span-7 bg-white border border-slate-150 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm">
                  <h3 className="text-md font-bold text-[#0b1e36]">Underwriting Loss Event Details</h3>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Associate Active Policy Cover</label>
                    <select
                      id="claim-policy-select"
                      value={claimPolicyId}
                      onChange={(e) => setClaimPolicyId(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                    >
                      {policies.map(p => (
                        <option key={p.id} value={p.id}>{p.planName} ({p.policyNumber})</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Estimated Claim Amount Requested</label>
                      <input 
                        id="claim-amount-input"
                        type="number" 
                        value={claimAmount}
                        onChange={(e) => setClaimAmount(Number(e.target.value))}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Incurred Event Reason</label>
                      <input 
                        id="claim-reason-input"
                        type="text" 
                        value={claimReason}
                        onChange={(e) => setClaimReason(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Detailed Occurrence Timeline Description</label>
                    <textarea 
                      id="claim-description-textarea"
                      rows={3}
                      value={claimDesc}
                      onChange={(e) => setClaimDesc(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                    />
                  </div>

                  {/* Document upload simulator */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Event Receipts / Proof of Occurrence</span>
                    <div className="border border-dashed border-slate-200 bg-slate-50 rounded-xl p-5 text-center cursor-pointer hover:border-slate-300 transition">
                      <Upload className="h-6 w-6 text-slate-400 mx-auto mb-2" />
                      <p className="text-[11px] font-bold text-slate-600">Drag receipts, invoices, or police briefs here</p>
                      <p className="text-[9px] text-slate-400 mt-1">Accepted: PDF, JPG, PNG (Max 5MB)</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <button
                      id="claims-run-precheck-btn"
                      type="button"
                      onClick={handleRunValidatorCheck}
                      disabled={loadingValidatorCheck}
                      className="w-full sm:w-auto px-4 py-3 bg-[#0b1e36] text-white hover:bg-[#132d4e] font-extrabold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-1.5 cursor-pointer shadow"
                    >
                      <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
                      <span>{loadingValidatorCheck ? 'Evaluating Coverage limits...' : 'Claim Pre-Check'}</span>
                    </button>

                    <button
                      id="claims-submit-form-btn"
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 bg-[#e2b33e] hover:bg-[#cca33a] text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-1 cursor-pointer shadow-sm"
                    >
                      <Send className="h-4 w-4" />
                      <span>Submit Claim Event</span>
                    </button>
                  </div>
                </form>

                {/* Claims Pre-Check results sidebar */}
                <div className="lg:col-span-5 space-y-6">
                  {(loadingValidatorCheck || validatorCheckResult) && (
                    <div id="claims-ai-insight-panel" className="bg-white border border-slate-150 p-6 rounded-3xl relative overflow-hidden shadow-sm">
                      <div className="flex items-center space-x-2 mb-4 border-b border-slate-100 pb-2">
                        <Sparkles className="h-4.5 w-4.5 text-[#cca33a]" />
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#cca33a]">Claims Pre-Validator Analysis</span>
                      </div>

                      {loadingValidatorCheck && (
                        <div className="space-y-4 py-4 animate-pulse text-xs text-slate-500">
                          <div className="flex items-center space-x-2 text-[#cca33a] font-bold">
                            <RefreshCw className="h-4.5 w-4.5 animate-spin" />
                            <span>Comparing incident tags against standard underwriting rules...</span>
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 bg-slate-100 rounded w-full"></div>
                            <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                            <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                          </div>
                        </div>
                      )}

                      {validatorCheckResult && (
                        <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line space-y-3 prose">
                          {validatorCheckResult}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-5 bg-white border border-slate-100 rounded-2xl space-y-3.5 text-xs shadow-sm">
                    <h4 className="font-bold text-[#0b1e36]">How Claims Auditing Works</h4>
                    <p className="text-slate-500 leading-relaxed">
                      Every lodged claim is compared digitally against the associated sum insured bounds. Standard claims process and settle cash benefits straight to hospital/garage networks securely.
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              /* Claims Registry List & Detailed Timeline Interactive Tracker */
              <div id="claims-registry-block" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Registry Rows (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-sm font-bold text-[#0b1e36] uppercase font-mono tracking-widest">Active Claim Records</h3>
                  
                  {claims.length === 0 ? (
                    <div className="p-8 text-center bg-white border border-slate-100 rounded-2xl text-xs text-slate-500 shadow-sm">
                      You have no historical claim logs filed.
                    </div>
                  ) : (
                    claims.map((clm) => (
                      <div
                        id={`claim-row-${clm.id}`}
                        key={clm.id}
                        onClick={() => setTrackedClaimId(clm.id)}
                        className={`p-5 bg-white border rounded-3xl cursor-pointer transition flex justify-between items-center shadow-sm ${
                          clm.id === trackedClaimId 
                            ? 'border-[#e2b33e] bg-slate-50/50' 
                            : 'border-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-slate-400 uppercase">CLAIM ID: {clm.id}</span>
                          <h4 className="text-sm font-bold text-[#0b1e36] leading-snug">{clm.reason}</h4>
                          <p className="text-xs text-slate-500">{clm.policyName} ({clm.policyNumber})</p>
                        </div>

                        <div className="text-right pl-4">
                          <p className="text-md font-extrabold text-[#0b1e36]">{formatMoney(clm.claimAmount)}</p>
                          <span className={`inline-block px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase rounded mt-1.5 ${
                            clm.status === 'approved' || clm.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-100'
                              : clm.status === 'rejected'
                                ? 'bg-rose-50 text-rose-700 font-bold border border-rose-100'
                                : 'bg-amber-50 text-amber-700 font-bold border border-amber-100'
                          }`}>
                            {clm.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Detailed Claim Tracking Timeline UI (Requirement 8) (5 cols) */}
                <div className="lg:col-span-5 bg-white border border-slate-150 p-6 rounded-3xl space-y-6 shadow-sm">
                  <h3 className="text-sm font-bold text-[#0b1e36] uppercase font-mono tracking-widest border-b border-slate-100 pb-3 flex items-center space-x-2">
                    <Clock className="h-4.5 w-4.5 text-[#cca33a]" />
                    <span>Real-time Claim Tracker</span>
                  </h3>

                  {selectedTrackedClaim ? (
                    <div id="timeline-tracker-details" className="space-y-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-mono text-slate-400 uppercase">Filing Date: {selectedTrackedClaim.dateFiled}</p>
                        <h4 className="text-md font-bold text-[#0b1e36]">{selectedTrackedClaim.reason}</h4>
                        <p className="text-xs text-[#cca33a] font-bold font-mono">Amount Bound: {formatMoney(selectedTrackedClaim.claimAmount)}</p>
                      </div>

                      {/* Timeline Graphic UI */}
                      <div className="relative pl-6 space-y-6 border-l border-slate-150 ml-2">
                        {/* 4 Standard Stages: Filed -> Assigned -> Audited -> Settled */}
                        {[
                          { title: 'Claim Filed', desc: 'Securely lodged with proof documents in the TrustLine vault.' },
                          { title: 'Under Review', desc: 'Undergoing risk analysis, actuarial matching, and pre-assessment check.' },
                          { title: 'Approved', desc: 'Approved according to cover guidelines. Scheduled payout.' },
                          { title: 'Dispatched / Settled', desc: 'Electronic bank transfer or direct medical network settlement executed.' }
                        ].map((stage, sIdx) => {
                          const isClaimApproved = selectedTrackedClaim.status === 'approved' || selectedTrackedClaim.status === 'completed';
                          const isUnderReview = selectedTrackedClaim.status === 'under-review' || isClaimApproved;
                          
                          let stageStatus = 'future';
                          if (sIdx === 0) stageStatus = 'past';
                          else if (sIdx === 1) stageStatus = isUnderReview ? (isClaimApproved ? 'past' : 'current') : 'future';
                          else if (sIdx === 2) stageStatus = isClaimApproved ? 'current' : 'future';
                          else if (sIdx === 3) stageStatus = selectedTrackedClaim.status === 'completed' ? 'current' : 'future';

                          return (
                            <div key={sIdx} className="relative">
                              {/* Glowing Dot indicator */}
                              <div className={`absolute -left-[31px] top-0.5 h-4.5 w-4.5 rounded-full border-2 flex items-center justify-center transition-all ${
                                stageStatus === 'past'
                                  ? 'bg-emerald-500 border-emerald-500 text-white text-[9px]'
                                  : stageStatus === 'current'
                                    ? 'bg-[#e2b33e] border-[#e2b33e] text-slate-950 text-[9px] font-bold animate-pulse'
                                    : 'bg-white border-slate-200 text-slate-400'
                              }`}>
                                {stageStatus === 'past' ? '✓' : ''}
                              </div>
                              <div>
                                <h4 className={`text-xs font-bold leading-none ${stageStatus !== 'future' ? 'text-[#0b1e36]' : 'text-slate-400'}`}>
                                  {stage.title}
                                </h4>
                                <p className="text-[11px] text-slate-500 mt-1 leading-normal">{stage.desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Display files list */}
                      <div className="pt-4 border-t border-slate-100 space-y-2">
                        <span className="text-[9px] font-mono text-slate-400 uppercase block font-bold">Attached Evidences</span>
                        {selectedTrackedClaim.documents.map((doc, dIdx) => (
                          <div key={dIdx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-[11px] border border-slate-150">
                            <span className="text-slate-600 truncate max-w-[200px]">{doc}</span>
                            <button 
                              onClick={() => alert(`Reviewing document: ${doc}`)}
                              className="text-[#cca33a] hover:underline font-mono text-[10px]"
                            >
                              Open file
                            </button>
                          </div>
                        ))}
                      </div>

                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 text-center py-8">Select a claim on the left to review its detailed underwriting timeline tracker.</p>
                  )}
                </div>

              </div>
            )}
          </div>
        )}

        {/* 3. PREMIUM PAYMENTS HISTORY SUB-VIEW */}
        {activeTab === 'payments' && (
          <div id="payments-sub-view" className="space-y-6">
            <h2 className="text-lg font-bold text-[#0b1e36] border-b border-slate-100 pb-3">Premium Billing Ledger</h2>
            
            <div className="bg-white border border-slate-150 rounded-3xl overflow-hidden shadow-sm">
              <table id="payments-history-table" className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-150 bg-slate-50 text-xs font-mono text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Billing Date</th>
                    <th className="py-4 px-6">Associated Plan</th>
                    <th className="py-4 px-6">Billing Code</th>
                    <th className="py-4 px-6">Amount Charged</th>
                    <th className="py-4 px-6">Gateway Method</th>
                    <th className="py-4 px-6">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
                  {payments.map((rec) => (
                    <tr id={`receipt-row-${rec.id}`} key={rec.id} className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-6 font-mono">{rec.date}</td>
                      <td className="py-4 px-6 font-bold text-[#0b1e36]">{rec.planName}</td>
                      <td className="py-4 px-6 font-mono text-slate-500">{rec.policyNumber}</td>
                      <td className="py-4 px-6 font-black text-slate-800">{formatMoney(rec.amount)}</td>
                      <td className="py-4 px-6 font-mono text-slate-500">{rec.method}</td>
                      <td className="py-4 px-6">
                        <button
                          id={`download-receipt-${rec.id}`}
                          onClick={() => alert(`Compiling receipt ${rec.id}.\nSecure digital download triggered successfully.`)}
                          className="p-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-[#0b1e36] rounded-lg transition"
                          title="Download Receipt"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. MEMBER PROFILE SETTINGS SUB-VIEW */}
        {activeTab === 'profile' && (
          <div id="profile-sub-view" className="space-y-6 max-w-2xl">
            <h2 className="text-lg font-bold text-[#0b1e36] border-b border-slate-100 pb-3">Personal Underwriting Profile</h2>
            
            <form onSubmit={handleUpdateProfile} className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              {profileSuccessMsg && (
                <div id="profile-success-alert" className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold">
                  Profile updated successfully. Actuarial ratings auto-calibrated.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Full Legal Name</label>
                  <input 
                    id="profile-field-name"
                    type="text" 
                    value={profileName} 
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Primary Contact Email</label>
                  <input 
                    id="profile-field-email"
                    type="email" 
                    value={profileEmail} 
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Mobile Contact Number</label>
                  <input 
                    id="profile-field-phone"
                    type="text" 
                    value={profilePhone} 
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Age of Insured</label>
                  <input 
                    id="profile-field-age"
                    type="number" 
                    value={profileAge} 
                    onChange={(e) => setProfileAge(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Primary Location HQ</label>
                  <input 
                    id="profile-field-location"
                    type="text" 
                    value={profileLocation} 
                    onChange={(e) => setProfileLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Reported Income Range</label>
                  <input 
                    id="profile-field-income"
                    type="text" 
                    value={profileIncome} 
                    onChange={(e) => setProfileIncome(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#0b1e36] focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  id="profile-submit-btn"
                  type="submit"
                  className="px-6 py-3 bg-[#e2b33e] hover:bg-[#cca33a] text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-sm"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

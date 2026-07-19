
import React, { useState } from 'react';
import { 
  Shield, TrendingUp, Users, DollarSign, FileText, 
  CheckCircle, AlertTriangle, XCircle, Search, ArrowRight,
  TrendingDown, Compass, Award, Briefcase, RefreshCw
} from 'lucide-react';
export const AdminDashboard = ({
  policies,
  claims,
  approveClaim,
  rejectClaim,
  onModifyPolicy,
}) => {
  const [activeTab, setActiveTab] = useState('claims');
  const [searchTerm, setSearchTerm] = useState('');

  // Local state for policy modification modal/form
  const [editingPolicyId, setEditingPolicyId] = useState(null);
  const [modCoverageAmount, setModCoverageAmount] = useState(0);
  const [modPremium, setModPremium] = useState(0);

  // Filter claims or policies based on search terms
  const filteredClaims = claims.filter(c => 
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPolicies = policies.filter(p => 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Standard analytic calculations
  const totalPremiumUnderwritten = policies.reduce((sum, p) => sum + (p.premium * 12), 0) + 1240000;
  const activeCount = policies.length + 8420;
  const claimsDispatchedSum = claims.filter(c => c.status === 'approved').reduce((sum, c) => sum + c.claimAmount, 0) + 482900;

  const handleStartModifyPolicy = (pol) => {
    setEditingPolicyId(pol.id);
    setModCoverageAmount(pol.coverageAmount);
    setModPremium(pol.premium);
  };

  const handleSavePolicyMod = (id) => {
    onModifyPolicy(id, {
      coverageAmount: modCoverageAmount,
      premium: modPremium,
    });
    setEditingPolicyId(null);
  };

  const formatMoney = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  // Pre-calculated categorical allocation for responsive visual SVG distribution bars
  const categories = [
    { name: 'Health Care', percentage: 42, color: 'bg-rose-400' },
    { name: 'Life Security', percentage: 28, color: 'bg-amber-400' },
    { name: 'Motor Guard', percentage: 15, color: 'bg-cyan-400' },
    { name: 'Voyage / Travel', percentage: 8, color: 'bg-purple-400' },
    { name: 'Property Safety', percentage: 7, color: 'bg-emerald-400' }
  ];

  return (
    <div id="admin-dashboard-container" className="py-12 bg-[#f8fafc] min-h-screen text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-6 mb-10">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#cca33a] uppercase">Executive Control Center</span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0b1e36] mt-1">Admin Portal & Analytics</h1>
            <p className="text-xs text-slate-500 mt-1">Process premium claims, audit policy ledgers, and view structural allocations.</p>
          </div>

          <div className="mt-4 md:mt-0 flex bg-white border border-slate-150 p-1.5 rounded-xl text-xs font-mono shadow-sm">
            <button
              id="admin-tab-claims-btn"
              onClick={() => {
                setActiveTab('claims');
                setSearchTerm('');
              }}
              className={`px-4 py-2 rounded-lg transition-all font-bold ${
                activeTab === 'claims' ? 'bg-[#e2b33e] text-slate-950 font-extrabold shadow-sm' : 'text-slate-500 hover:text-[#0b1e36]'
              }`}
            >
              Claims Queue
            </button>
            <button
              id="admin-tab-policies-btn"
              onClick={() => {
                setActiveTab('policies');
                setSearchTerm('');
              }}
              className={`px-4 py-2 rounded-lg transition-all font-bold ${
                activeTab === 'policies' ? 'bg-[#e2b33e] text-slate-950 font-extrabold shadow-sm' : 'text-slate-500 hover:text-[#0b1e36]'
              }`}
            >
              Policy Ledgers
            </button>
            <button
              id="admin-tab-analytics-btn"
              onClick={() => {
                setActiveTab('analytics');
                setSearchTerm('');
              }}
              className={`px-4 py-2 rounded-lg transition-all font-bold ${
                activeTab === 'analytics' ? 'bg-[#e2b33e] text-slate-950 font-extrabold shadow-sm' : 'text-slate-500 hover:text-[#0b1e36]'
              }`}
            >
              Allocation Charts
            </button>
          </div>
        </div>

        {/* 1. KEY ANALYTICS ROW (Requirement 9 Component) */}
        <div id="analytics-overview-row" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Underwritten Premium ARR</span>
              <div className="p-2 bg-amber-50 text-[#cca33a] border border-amber-100 rounded-lg">
                <DollarSign className="h-4.5 w-4.5" />
              </div>
            </div>
            <p className="text-2xl font-black text-[#0b1e36] mt-4">{formatMoney(totalPremiumUnderwritten)}</p>
            <span className="text-[10px] font-mono text-emerald-600 flex items-center mt-2 font-bold">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              <span>+18.4% Year-over-Year</span>
            </span>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Active Core Contracts</span>
              <div className="p-2 bg-cyan-50 text-cyan-700 border border-cyan-100 rounded-lg">
                <Users className="h-4.5 w-4.5" />
              </div>
            </div>
            <p className="text-2xl font-black text-[#0b1e36] mt-4">{activeCount.toLocaleString()}</p>
            <span className="text-[10px] font-mono text-emerald-600 flex items-center mt-2 font-bold">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              <span>+4,209 New client bounds</span>
            </span>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Dispatched Claims Cash</span>
              <div className="p-2 bg-rose-50 text-rose-700 border border-rose-100 rounded-lg">
                <FileText className="h-4.5 w-4.5" />
              </div>
            </div>
            <p className="text-2xl font-black text-[#0b1e36] mt-4">{formatMoney(claimsDispatchedSum)}</p>
            <span className="text-[10px] font-mono text-rose-600 flex items-center mt-2 font-bold">
              <TrendingDown className="h-3.5 w-3.5 mr-1" />
              <span>52.4% Loss ratio index</span>
            </span>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Actuarial Rating Limit</span>
              <div className="p-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg">
                <Shield className="h-4.5 w-4.5" />
              </div>
            </div>
            <p className="text-2xl font-black text-[#0b1e36] mt-4">99.4%</p>
            <span className="text-[10px] font-mono text-emerald-600 flex items-center mt-2 font-bold">
              <CheckCircle className="h-3.5 w-3.5 mr-1" />
              <span>AA+ Capital adequacy scale</span>
            </span>
          </div>

        </div>

        {/* Search bar inside admin dashboard */}
        {activeTab !== 'analytics' && (
          <div className="relative mb-6 max-w-md">
            <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-400" />
            <input 
              id="admin-search-input"
              type="text" 
              placeholder={`Search by policy code, client, or reason...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-150 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b1e36] shadow-sm"
            />
          </div>
        )}

        {/* 2. CLAIMS REVIEW QUEUE SUB-TAB */}
        {activeTab === 'claims' && (
          <div id="admin-claims-queue" className="space-y-6">
            <h3 className="text-sm font-bold text-[#0b1e36] uppercase font-mono tracking-widest border-b border-slate-100 pb-3">Claims Requiring Action</h3>
            
            {filteredClaims.length === 0 ? (
              <div className="p-12 text-center bg-white border border-slate-100 rounded-3xl text-xs text-slate-500 shadow-sm">
                No claims match your current queries.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredClaims.map((clm) => (
                  <div 
                    id={`admin-claim-${clm.id}`}
                    key={clm.id} 
                    className="p-6 bg-white border border-slate-100 rounded-3xl flex flex-col lg:flex-row justify-between gap-6 shadow-sm"
                  >
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center space-x-2">
                        <span className="text-[9px] font-mono text-slate-400 font-bold">CLAIM ID: {clm.id}</span>
                        <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                        <span className="text-[9px] font-mono text-[#cca33a] uppercase tracking-wider font-bold">{clm.policyName} ({clm.policyNumber})</span>
                      </div>
                      <h4 className="text-md font-bold text-[#0b1e36] leading-snug">{clm.reason}</h4>
                      <p className="text-xs text-slate-500 font-bold">Filed on: <span className="font-mono">{clm.dateFiled}</span></p>
                    </div>

                    <div className="flex items-center justify-between lg:justify-end gap-6 pl-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0">
                      <div className="text-left lg:text-right space-y-1">
                        <span className="text-[9px] font-mono text-slate-400 uppercase block font-bold">Underwriting Value</span>
                        <p className="text-lg font-black text-[#0b1e36]">{formatMoney(clm.claimAmount)}</p>
                        <span className={`inline-block px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase rounded ${
                          clm.status === 'approved' || clm.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-100'
                            : clm.status === 'rejected'
                              ? 'bg-rose-50 text-rose-700 font-bold border border-rose-100'
                              : 'bg-amber-50 text-amber-700 font-bold border border-amber-100'
                        }`}>
                          {clm.status}
                        </span>
                      </div>

                      {clm.status === 'under-review' || clm.status === 'pending' ? (
                        <div className="flex gap-2.5">
                          <button
                            id={`admin-approve-${clm.id}`}
                            onClick={() => approveClaim(clm.id)}
                            className="px-4.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] font-mono uppercase tracking-wider rounded-xl cursor-pointer shadow-sm transition"
                          >
                            Approve
                          </button>
                          <button
                            id={`admin-reject-${clm.id}`}
                            onClick={() => rejectClaim(clm.id)}
                            className="px-4.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-extrabold text-[10px] font-mono uppercase tracking-wider rounded-xl cursor-pointer transition"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <div className="text-slate-400 text-[11px] font-bold font-mono">
                          ✓ Audited by Admin
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. POLICY MANAGEMENT LEDGERS SUB-TAB */}
        {activeTab === 'policies' && (
          <div id="admin-policy-ledgers" className="space-y-6">
            <h3 className="text-sm font-bold text-[#0b1e36] uppercase font-mono tracking-widest border-b border-slate-100 pb-3">Active Underwriting Contracts</h3>

            {filteredPolicies.length === 0 ? (
              <div className="p-12 text-center bg-white border border-slate-100 rounded-3xl text-xs text-slate-500 shadow-sm">
                No active policies match your search.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPolicies.map((pol) => (
                  <div 
                    id={`admin-pol-row-${pol.id}`}
                    key={pol.id} 
                    className="p-5 bg-white border border-slate-100 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono text-slate-400 font-bold">POLICY: {pol.policyNumber}</span>
                        <span className="h-1 w-1 bg-slate-200 rounded-full"></span>
                        <span className="text-[10px] font-mono text-[#cca33a] uppercase tracking-wider font-bold">{pol.type} portfolio</span>
                      </div>
                      <h4 className="text-md font-bold text-[#0b1e36] mt-1">{pol.planName}</h4>
                      <p className="text-xs text-slate-500 font-mono mt-1 font-bold">Term bounds: {pol.startDate} to {pol.endDate}</p>
                    </div>

                    <div className="flex items-center space-x-6 text-right w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 uppercase block font-bold">Sum Insured Limit</span>
                        {editingPolicyId === pol.id ? (
                          <input 
                            id={`mod-cov-input-${pol.id}`}
                            type="number"
                            value={modCoverageAmount}
                            onChange={(e) => setModCoverageAmount(Number(e.target.value))}
                            className="bg-slate-50 border border-slate-200 text-xs text-slate-800 font-bold px-2 py-1 rounded w-28 mt-1 text-right focus:outline-none focus:border-[#0b1e36]"
                          />
                        ) : (
                          <p className="text-sm font-bold text-slate-800 mt-0.5">{formatMoney(pol.coverageAmount)}</p>
                        )}
                      </div>

                      <div>
                        <span className="text-[9px] font-mono text-slate-400 uppercase block font-bold">Monthly Charge</span>
                        {editingPolicyId === pol.id ? (
                          <input 
                            id={`mod-prem-input-${pol.id}`}
                            type="number"
                            value={modPremium}
                            onChange={(e) => setModPremium(Number(e.target.value))}
                            className="bg-slate-50 border border-slate-200 text-xs text-slate-800 font-bold px-2 py-1 rounded w-20 mt-1 text-right focus:outline-none focus:border-[#0b1e36]"
                          />
                        ) : (
                          <p className="text-sm font-bold text-[#cca33a] mt-0.5">{formatMoney(pol.premium)}/mo</p>
                        )}
                      </div>

                      <div>
                        {editingPolicyId === pol.id ? (
                          <button
                            id={`save-mod-btn-${pol.id}`}
                            onClick={() => handleSavePolicyMod(pol.id)}
                            className="px-3 py-1.5 bg-[#0b1e36] hover:bg-[#132d4e] text-white font-extrabold text-[10px] font-mono uppercase tracking-wider rounded-lg shadow-sm cursor-pointer"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            id={`edit-pol-btn-${pol.id}`}
                            onClick={() => handleStartModifyPolicy(pol)}
                            className="px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-[#0b1e36] rounded-lg text-[10px] font-mono uppercase tracking-wider font-bold cursor-pointer"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. ANALYTIC CHARTS ALLOCATION SUB-TAB (Requirement 9 Component) */}
        {activeTab === 'analytics' && (
          <div id="admin-analytics-charts" className="space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <h3 className="text-md font-bold text-[#0b1e36]">Underwritten Portfolio Asset Allocation</h3>
                <p className="text-xs text-slate-500 mt-1">Allocation index of underwritten values across premium classes (Health, Life, Motor, Travel, Property).</p>
              </div>

              {/* Visual SVG Distribution bar graphs */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                {categories.map((cat, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-700 font-bold">{cat.name}</span>
                      <span className="text-[#cca33a] font-mono font-bold">{cat.percentage}% allocation</span>
                    </div>
                    {/* Progress tracking bars */}
                    <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          cat.color === 'bg-rose-400' ? 'bg-rose-500' :
                          cat.color === 'bg-amber-400' ? 'bg-[#cca33a]' :
                          cat.color === 'bg-cyan-400' ? 'bg-cyan-500' :
                          cat.color === 'bg-purple-400' ? 'bg-purple-500' :
                          'bg-emerald-500'
                        }`} 
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Auxiliary stat metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-xs">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                  <span className="text-slate-400 font-mono font-bold">Underwriting Cap</span>
                  <p className="text-md font-bold text-[#0b1e36]">₹1,00,00,000 P.A.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                  <span className="text-slate-400 font-mono font-bold">Standard Solvency Index</span>
                  <p className="text-md font-bold text-emerald-600">2.41% (Excellent)</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                  <span className="text-slate-400 font-mono font-bold">Risk Retention Score</span>
                  <p className="text-md font-bold text-cyan-600">92.4% Secure</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

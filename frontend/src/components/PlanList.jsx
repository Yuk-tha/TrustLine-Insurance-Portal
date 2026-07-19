import React, { useState } from 'react';
import { INSURANCE_PLANS } from '../data';
import { 
  Heart, Shield, Car, Plane, Home, Briefcase, 
  Check, X, Sparkles, ShoppingCart, HelpCircle, ArrowRight
} from 'lucide-react';
export const PlanList = ({
  setView,
  selectedCategory,
  setSelectedCategory,
  onSelectPlanToBuy,
}) => {
  const [comparePlanIds, setComparePlanIds] = useState([]);

  const filterTabs = [
    { id: 'all', label: 'All Plans', icon: Sparkles },
    { id: 'health', label: 'Health Care', icon: Heart },
    { id: 'life', label: 'Term Life', icon: Shield },
    { id: 'motor', label: 'Auto / Motor', icon: Car },
    { id: 'travel', label: 'Voyage / Travel', icon: Plane },
    { id: 'home', label: 'Home Haven', icon: Home },
    { id: 'business', label: 'Biz Shield', icon: Briefcase },
  ];

  const currentPlans = selectedCategory === 'all'
    ? INSURANCE_PLANS
    : INSURANCE_PLANS.filter((plan) => plan.type === selectedCategory);

  const toggleCompare = (planId) => {
    if (comparePlanIds.includes(planId)) {
      setComparePlanIds(comparePlanIds.filter(id => id !== planId));
    } else {
      if (comparePlanIds.length >= 3) {
        // limit comparison to 3 plans
        return;
      }
      setComparePlanIds([...comparePlanIds, planId]);
    }
  };

  const handleBuyClick = (plan) => {
    onSelectPlanToBuy(plan);
    setView('purchase');
  };

  // Render a visual tag badge for key metric indicators
  const formatMoney = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div id="plan-comparison-container" className="py-12 bg-[#f8fafc] min-h-screen text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold tracking-widest text-[#cca33a] uppercase bg-[#f5efe2] px-3 py-1 rounded-full">Underwriting Inventory</span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0b1e36] mt-3">
            Compare Insurance Portfolios
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Compare premium tiers, coverage parameters, settlement track records, and auxiliary riders. Select up to 3 plans for multi-column structural comparison.
          </p>
        </div>

        {/* 1. Category Switch Tabs */}
        <div id="category-tabs" className="flex flex-wrap justify-center gap-2 mb-10 bg-white p-2 border border-slate-100 rounded-2xl max-w-4xl mx-auto shadow-sm">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCategory === tab.id;
            return (
              <button
                id={`tab-btn-${tab.id}`}
                key={tab.id}
                onClick={() => {
                  setSelectedCategory(tab.id);
                  setComparePlanIds([]); // clear comparison when tab changes
                }}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-[#0b1e36] text-white shadow-md shadow-slate-900/10' 
                    : 'text-slate-500 hover:text-[#0b1e36] hover:bg-slate-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 2. Main Plans Deck */}
        <div id="plans-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPlans.map((plan) => {
            const isComparing = comparePlanIds.includes(plan.id);
            return (
              <div
                id={`plan-card-${plan.id}`}
                key={plan.id}
                className={`relative bg-white border rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 shadow-sm ${
                  plan.popular 
                    ? 'border-[#e2b33e] shadow-md shadow-amber-500/5' 
                    : 'border-slate-100 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-6 bg-gradient-to-r from-[#0b1e36] to-[#132d4e] text-white text-[10px] font-mono font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow border border-[#e2b33e]/25">
                    ★ Premium Standard
                  </span>
                )}

                <div>
                  {/* Provider & Name */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-mono text-[#cca33a] uppercase tracking-widest block font-bold">{plan.provider}</span>
                      <h3 className="text-xl font-bold text-[#0b1e36] mt-0.5">{plan.name}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-6">{plan.description}</p>

                  {/* Highlighting Premium Costs */}
                  <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 mb-6 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Monthly Premium</span>
                      <p className="text-2xl font-black text-[#cca33a] mt-1">
                        {formatMoney(plan.monthlyPremium)}
                        <span className="text-xs font-medium text-slate-500">/mo</span>
                      </p>
                    </div>
                    <div className="border-l border-slate-200 pl-4">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Max Cover Limit</span>
                      <p className="text-lg font-extrabold text-[#0b1e36] mt-1.5">{formatMoney(plan.coverageAmount)}</p>
                    </div>
                  </div>

                  {/* Auxiliary features / details */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Benefits & Core Features</span>
                    {plan.benefits.map((ben, index) => (
                      <div id={`plan-${plan.id}-benefit-${index}`} key={index} className="flex items-start space-x-2 text-xs">
                        <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 leading-relaxed">{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-3 pt-6 border-t border-slate-100">
                  <button
                    id={`purchase-btn-${plan.id}`}
                    onClick={() => handleBuyClick(plan)}
                    className="w-full py-3 px-4 bg-[#e2b33e] hover:bg-[#cca33a] text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
                  >
                    <ShoppingCart className="h-4.5 w-4.5" />
                    <span>Purchase Cover</span>
                  </button>

                  <button
                    id={`compare-toggle-${plan.id}`}
                    onClick={() => toggleCompare(plan.id)}
                    className={`w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 border cursor-pointer ${
                      isComparing 
                        ? 'bg-[#0b1e36]/5 text-[#0b1e36] border-[#0b1e36]/25' 
                        : 'bg-transparent text-slate-500 border-slate-200 hover:text-[#0b1e36] hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {isComparing ? 'Remove from Compare' : 'Select for Compare'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Detailed Comparative Dashboard (Requirement 5 Component) */}
        {comparePlanIds.length > 0 && (
          <div id="compare-matrix-section" className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-6 mb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-[#cca33a]" />
                  <h3 className="text-lg font-bold text-[#0b1e36]">Side-by-Side Comparative Matrix</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">Evaluate specific underwriting features, deductibles, co-pays, and cash benefits.</p>
              </div>
              <button
                id="clear-comparison-btn"
                onClick={() => setComparePlanIds([])}
                className="mt-4 md:mt-0 px-4 py-2 text-xs font-bold text-slate-500 hover:text-[#0b1e36] border border-slate-200 hover:border-slate-300 rounded-xl transition-all"
              >
                Clear Matrix
              </button>
            </div>

            <div className="overflow-x-auto">
              <table id="comparison-table" className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-150 text-xs font-mono text-slate-400 uppercase tracking-wider">
                    <th className="py-4 pr-4 min-w-[180px]">Feature Parameter</th>
                    {comparePlanIds.map((id) => {
                      const plan = INSURANCE_PLANS.find(p => p.id === id);
                      return (
                        <th key={plan.id} className="py-4 px-4 min-w-[200px]">
                          <span className="text-[9px] text-[#cca33a] block font-bold">{plan.provider}</span>
                          <span className="text-sm font-bold text-[#0b1e36] block mt-0.5">{plan.name}</span>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
                  {/* Term */}
                  <tr>
                    <td className="py-4 pr-4 font-mono text-slate-400 uppercase">Policy Term</td>
                    {comparePlanIds.map((id) => {
                      const plan = INSURANCE_PLANS.find(p => p.id === id);
                      return <td key={plan.id} className="py-4 px-4 font-bold text-slate-800">{plan.policyTerm}</td>;
                    })}
                  </tr>
                  {/* Premium */}
                  <tr>
                    <td className="py-4 pr-4 font-mono text-slate-400 uppercase">Monthly Premium</td>
                    {comparePlanIds.map((id) => {
                      const plan = INSURANCE_PLANS.find(p => p.id === id);
                      return (
                        <td key={plan.id} className="py-4 px-4">
                          <span className="text-md font-black text-[#cca33a]">{formatMoney(plan.monthlyPremium)}</span>
                          <span className="text-[10px] text-slate-400"> / month</span>
                        </td>
                      );
                    })}
                  </tr>
                  {/* Coverage */}
                  <tr>
                    <td className="py-4 pr-4 font-mono text-slate-400 uppercase">Sum Insured Limit</td>
                    {comparePlanIds.map((id) => {
                      const plan = INSURANCE_PLANS.find(p => p.id === id);
                      return <td key={plan.id} className="py-4 px-4 font-extrabold text-slate-800">{formatMoney(plan.coverageAmount)}</td>;
                    })}
                  </tr>
                  {/* Settlement Ratio */}
                  <tr>
                    <td className="py-4 pr-4 font-mono text-slate-400 uppercase">Claim Settlement Ratio</td>
                    {comparePlanIds.map((id) => {
                      const plan = INSURANCE_PLANS.find(p => p.id === id);
                      return (
                        <td key={plan.id} className="py-4 px-4">
                          <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md font-mono text-[11px] font-bold">
                            {plan.claimRatio}%
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                  {/* Special parameters based on types */}
                  <tr>
                    <td className="py-4 pr-4 font-mono text-slate-400 uppercase">Deductible / Co-pay</td>
                    {comparePlanIds.map((id) => {
                      const plan = INSURANCE_PLANS.find(p => p.id === id);
                      return <td key={plan.id} className="py-4 px-4 text-slate-800">{plan.coPay || 'Standard parameters apply'}</td>;
                    })}
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-mono text-slate-400 uppercase">Network Scale</td>
                    {comparePlanIds.map((id) => {
                      const plan = INSURANCE_PLANS.find(p => p.id === id);
                      return (
                        <td key={plan.id} className="py-4 px-4 text-slate-800">
                          {plan.cashlessHospitals ? `${plan.cashlessHospitals} Cashless Hospitals` : 
                           plan.garageNetwork ? `${plan.garageNetwork} Garages` : 'Standard network'}
                        </td>
                      );
                    })}
                  </tr>
                  {/* Action row */}
                  <tr className="border-t border-slate-150">
                    <td className="py-6 pr-4"></td>
                    {comparePlanIds.map((id) => {
                      const plan = INSURANCE_PLANS.find(p => p.id === id);
                      return (
                        <td key={plan.id} className="py-6 px-4">
                          <button
                            id={`matrix-buy-${plan.id}`}
                            onClick={() => handleBuyClick(plan)}
                            className="w-full py-2.5 px-3 bg-[#0b1e36] hover:bg-[#132d4e] text-white font-bold text-[11px] uppercase tracking-wider rounded-lg transition-all flex items-center justify-center space-x-1"
                          >
                            <span>Buy Cover</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { DEMO_USER, DEMO_ADMIN, INITIAL_POLICIES, INITIAL_CLAIMS, INITIAL_PAYMENTS, INSURANCE_PLANS } from './data';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingHero } from './components/LandingHero';
import { PlanList } from './components/PlanList';
import { PremiumCalculator } from './components/PremiumCalculator';
import { PurchaseFlow } from './components/PurchaseFlow';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlanToBuy, setSelectedPlanToBuy] = useState(INSURANCE_PLANS[1]); // Default to gold health plan
  
  // App states
  const [userSession, setUserSession] = useState(null); // Start logged out as guest
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [payments, setPayments] = useState([]);

  // Sync state from URL query parameters on initial mount and back/forward navigation
  useEffect(() => {
    const handleUrlSync = () => {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view');
      const categoryParam = params.get('category');

      if (viewParam && ['home', 'calculator', 'compare', 'purchase', 'customer-dashboard', 'admin-dashboard'].includes(viewParam)) {
        setCurrentView(viewParam);
      }
      if (categoryParam && ['all', 'health', 'life', 'motor', 'travel', 'home', 'business'].includes(categoryParam)) {
        setSelectedCategory(categoryParam);
      }
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    return () => window.removeEventListener('popstate', handleUrlSync);
  }, []);

  // Sync state to URL query parameters when currentView or selectedCategory changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prevView = params.get('view');
    const prevCategory = params.get('category');

    if (prevView !== currentView || prevCategory !== selectedCategory) {
      params.set('view', currentView);
      params.set('category', selectedCategory);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState(null, '', newUrl);
    }
  }, [currentView, selectedCategory]);

  // Load from local storage or bootstrap with initial mock lists
  useEffect(() => {
    const cachedPolicies = localStorage.getItem('trustline_policies');
    const cachedClaims = localStorage.getItem('trustline_claims');
    const cachedPayments = localStorage.getItem('trustline_payments');
    const cachedUser = localStorage.getItem('trustline_user');

    if (cachedPolicies) {
      setPolicies(JSON.parse(cachedPolicies));
    } else {
      setPolicies(INITIAL_POLICIES);
    }

    if (cachedClaims) {
      setClaims(JSON.parse(cachedClaims));
    } else {
      setClaims(INITIAL_CLAIMS);
    }

    if (cachedPayments) {
      setPayments(JSON.parse(cachedPayments));
    } else {
      setPayments(INITIAL_PAYMENTS);
    }

    if (cachedUser) {
      setUserSession(JSON.parse(cachedUser));
    } else {
      setUserSession(null);
    }
  }, []);

  // Auto-switch sessions based on the current view to bypass login requirements entirely
  useEffect(() => {
    if (currentView === 'customer-dashboard') {
      if (!userSession || userSession.role !== 'customer') {
        setUserSession(DEMO_USER);
      }
    } else if (currentView === 'admin-dashboard') {
      if (!userSession || userSession.role !== 'admin') {
        setUserSession(DEMO_ADMIN);
      }
    }
  }, [currentView, userSession]);

  // Save changes to local storage when state changes
  const savePolicies = (updated) => {
    setPolicies(updated);
    localStorage.setItem('trustline_policies', JSON.stringify(updated));
  };

  const saveClaims = (updated) => {
    setClaims(updated);
    localStorage.setItem('trustline_claims', JSON.stringify(updated));
  };

  const savePayments = (updated) => {
    setPayments(updated);
    localStorage.setItem('trustline_payments', JSON.stringify(updated));
  };

  const saveUserSession = (updated) => {
    setUserSession(updated);
    if (updated) {
      localStorage.setItem('trustline_user', JSON.stringify(updated));
    } else {
      localStorage.removeItem('trustline_user');
    }
  };

  // Demo actions
  const loginAsUser = () => {
    saveUserSession(DEMO_USER);
    setCurrentView('customer-dashboard');
  };

  const loginAsAdmin = () => {
    saveUserSession(DEMO_ADMIN);
    setCurrentView('admin-dashboard');
  };

  const logout = () => {
    saveUserSession(null);
    setCurrentView('home');
  };

  // State transaction: Purchase Cover completion
  const handlePolicyPurchased = (newPolicy) => {
    const updatedPolicies = [newPolicy, ...policies];
    savePolicies(updatedPolicies);

    // Also auto log corresponding premium payment receipt!
    const newReceipt = {
      id: `rcp_${Math.floor(1000 + Math.random() * 9000)}`,
      policyNumber: newPolicy.policyNumber,
      planName: newPolicy.planName,
      amount: newPolicy.premium,
      date: newPolicy.startDate,
      status: 'paid',
      method: 'Visa Ending in 4210'
    };
    savePayments([newReceipt, ...payments]);
  };

  // State transaction: File a new Claim
  const handleAddClaim = (newClaim) => {
    const updatedClaims = [newClaim, ...claims];
    saveClaims(updatedClaims);
  };

  // State transaction: Admin approves claim
  const handleApproveClaim = (claimId) => {
    const updated = claims.map((clm) => {
      if (clm.id === claimId) {
        return {
          ...clm,
          status: 'approved',
          timeline: [
            ...clm.timeline,
            {
              status: 'Approved',
              description: 'Claim evaluated and approved by Admin. Premium disbursement scheduled.',
              date: new Date().toISOString().split('T')[0]
            }
          ]
        };
      }
      return clm;
    });
    saveClaims(updated);
  };

  // State transaction: Admin rejects claim
  const handleRejectClaim = (claimId) => {
    const updated = claims.map((clm) => {
      if (clm.id === claimId) {
        return {
          ...clm,
          status: 'rejected',
          timeline: [
            ...clm.timeline,
            {
              status: 'Rejected',
              description: 'Claim rejected by Admin under clause exclusions of current sum insured parameters.',
              date: new Date().toISOString().split('T')[0]
            }
          ]
        };
      }
      return clm;
    });
    saveClaims(updated);
  };

  // State transaction: Admin modifies policy limits
  const handleModifyPolicy = (policyId, updates) => {
    const updated = policies.map((pol) => {
      if (pol.id === policyId) {
        return { ...pol, ...updates };
      }
      return pol;
    });
    savePolicies(updated);
  };

  // State transaction: Update profile info
  const handleUpdateProfile = (updates) => {
    if (userSession) {
      const updated = { ...userSession, ...updates };
      saveUserSession(updated);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans">
      
      {/* Dynamic Header */}
      <Header
        currentView={currentView}
        setView={setCurrentView}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        userSession={userSession}
        logout={logout}
        loginAsUser={loginAsUser}
        loginAsAdmin={loginAsAdmin}
      />

      {/* Main Viewport */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <LandingHero 
            setView={setCurrentView} 
            setSelectedCategory={setSelectedCategory} 
          />
        )}

        {currentView === 'calculator' && (
          <PremiumCalculator />
        )}

        {currentView === 'compare' && (
          <PlanList
            setView={setCurrentView}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectPlanToBuy={setSelectedPlanToBuy}
          />
        )}

        {currentView === 'purchase' && (
          <PurchaseFlow
            selectedPlan={selectedPlanToBuy}
            onPolicyPurchased={handlePolicyPurchased}
            setView={setCurrentView}
          />
        )}

        {currentView === 'customer-dashboard' && (
          <CustomerDashboard
            userSession={userSession || DEMO_USER}
            updateSessionProfile={handleUpdateProfile}
            policies={policies}
            claims={claims}
            addClaim={handleAddClaim}
            payments={payments}
          />
        )}

        {currentView === 'admin-dashboard' && (
          <AdminDashboard
            policies={policies}
            claims={claims}
            approveClaim={handleApproveClaim}
            rejectClaim={handleRejectClaim}
            onModifyPolicy={handleModifyPolicy}
          />
        )}
      </main>

      {/* Footer Directory */}
      <Footer setView={setCurrentView} setSelectedCategory={setSelectedCategory} />

    </div>
  );
}

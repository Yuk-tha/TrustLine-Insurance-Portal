import React, { useState } from 'react';
import { Shield, ChevronDown, LogOut, Menu, X, User, Briefcase, Heart, Car, Plane, Home } from 'lucide-react';
export const Header = ({
  currentView,
  setView,
  selectedCategory,
  setSelectedCategory,
  userSession,
  logout,
  loginAsUser,
  loginAsAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [insuranceDropdownOpen, setInsuranceDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  const insuranceCategories = [
    { type: 'health', label: 'Health Security', icon: Heart },
    { type: 'life', label: 'Life & Family', icon: Shield },
    { type: 'motor', label: 'Motor Guard', icon: Car },
    { type: 'travel', label: 'Voyage / Travel', icon: Plane },
    { type: 'home', label: 'Property & Home', icon: Home },
    { type: 'business', label: 'Enterprise Shield', icon: Briefcase },
  ];

  const handleInsuranceSelect = (type) => {
    setInsuranceDropdownOpen(false);
    setMobileMenuOpen(false);
    setSelectedCategory(type);
    setView('compare');
  };

  const toggleInsuranceDropdown = () => {
    setInsuranceDropdownOpen(!insuranceDropdownOpen);
    setLoginDropdownOpen(false);
  };

  const toggleLoginDropdown = () => {
    setLoginDropdownOpen(!loginDropdownOpen);
    setInsuranceDropdownOpen(false);
  };

  return (
    <header id="trustline-header" className="sticky top-0 z-50 w-full bg-white border-b border-slate-150 text-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo - trustline matching the image */}
        <div 
          id="brand-logo-container" 
          className="flex items-center space-x-3.5 cursor-pointer group select-none"
          onClick={() => {
            setView('home');
            setMobileMenuOpen(false);
          }}
        >
          {/* Circular logo container with light blue shield */}
          <div className="h-11 w-11 bg-[#0b1e36] rounded-full flex items-center justify-center shadow-md shadow-slate-900/10 transition-transform duration-300 group-hover:scale-105">
            <Shield className="h-5.5 w-5.5 text-blue-400 fill-blue-400/20 stroke-[2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-black tracking-tight text-xl text-[#0b1e36]">
              TrustLine
            </span>
            <span className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase leading-none mt-0.5">
              INSURANCE
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links (Exactly matching the image navbar content) */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-7">
          <button 
            id="nav-home"
            onClick={() => {
              setView('home');
              setInsuranceDropdownOpen(false);
              setLoginDropdownOpen(false);
            }}
            className={`text-[15px] font-semibold transition-all duration-150 cursor-pointer ${
              currentView === 'home' 
                ? 'text-[#0b1e36] font-extrabold' 
                : 'text-slate-600 hover:text-[#0b1e36]'
            }`}
          >
            Home
          </button>

          {/* Insurance Menu item with Dropdown Arrow */}
          <div className="relative">
            <button 
              id="nav-insurance"
              onClick={toggleInsuranceDropdown}
              onMouseEnter={() => setInsuranceDropdownOpen(true)}
              className="text-[15px] font-semibold text-slate-600 hover:text-[#0b1e36] transition-all duration-150 flex items-center space-x-1 cursor-pointer"
            >
              <span>Insurance</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${insuranceDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Insurance Dropdown menu */}
            {insuranceDropdownOpen && (
              <div 
                id="insurance-dropdown"
                onMouseLeave={() => setInsuranceDropdownOpen(false)}
                className="absolute left-0 mt-2.5 w-60 bg-white border border-slate-100 rounded-2xl shadow-xl py-2.5 animate-fadeIn z-50"
              >
                {insuranceCategories.map((cat) => {
                  const CatIcon = cat.icon;
                  return (
                    <button
                      key={cat.type}
                      onClick={() => handleInsuranceSelect(cat.type)}
                      className="w-full text-left px-5 py-3 hover:bg-slate-50 flex items-center space-x-3 transition-colors duration-150"
                    >
                      <div className="p-1.5 bg-slate-50 rounded-lg text-[#0b1e36]">
                        <CatIcon className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button 
            id="nav-compare"
            onClick={() => {
              setSelectedCategory('all');
              setView('compare');
              setInsuranceDropdownOpen(false);
            }}
            className={`text-[15px] font-semibold transition-all duration-150 cursor-pointer ${
              currentView === 'compare' 
                ? 'text-[#0b1e36] font-extrabold' 
                : 'text-slate-600 hover:text-[#0b1e36]'
            }`}
          >
            Compare Plans
          </button>

          <button 
            id="nav-about"
            onClick={() => {
              setView('home');
              setTimeout(() => {
                const element = document.getElementById('why-trustline-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
              setInsuranceDropdownOpen(false);
            }}
            className="text-[15px] font-semibold text-slate-600 hover:text-[#0b1e36] transition-all duration-150 cursor-pointer"
          >
            About
          </button>

          <button 
            id="nav-contact"
            onClick={() => {
              const element = document.getElementById('trustline-footer');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
              setInsuranceDropdownOpen(false);
            }}
            className="text-[15px] font-semibold text-slate-600 hover:text-[#0b1e36] transition-all duration-150 cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Action Buttons on the Right (Exactly matching the image buttons layout) */}
        <div id="right-actions" className="hidden md:flex items-center space-x-3">
          <button
            id="nav-static-login-btn"
            onClick={() => {}}
            className="px-6.5 py-3 text-sm font-bold tracking-wide text-white bg-[#0b1e36] hover:bg-[#132d4e] rounded-full transition-all duration-200 cursor-pointer shadow-md shadow-slate-950/10"
          >
            Login
          </button>
          {/* Get Quote (triggers calculator) */}
          <button
            id="nav-get-quote-btn"
            onClick={() => setView('calculator')}
            className="px-6.5 py-3 text-sm font-bold tracking-wide text-white bg-[#0b1e36] hover:bg-[#132d4e] rounded-full transition-all duration-200 cursor-pointer shadow-md shadow-slate-950/10"
          >
            Get Quote
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-[#0b1e36] hover:bg-slate-50 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div id="mobile-nav-panel" className="md:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-3 animate-fadeIn">
          <button
            onClick={() => {
              setView('home');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Home
          </button>
          
          <div className="space-y-1.5 pl-3 border-l-2 border-slate-100">
            <span className="block text-[11px] font-mono tracking-wider text-slate-400 uppercase px-3">Insurance Portfolio</span>
            {insuranceCategories.map((cat) => (
              <button
                key={cat.type}
                onClick={() => handleInsuranceSelect(cat.type)}
                className="block w-full text-left py-1.5 px-3 text-xs font-semibold text-slate-600 hover:text-[#0b1e36]"
              >
                {cat.label}
              </button>
            ))}
          </div>

           <button
            onClick={() => {
              setSelectedCategory('all');
              setView('compare');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Compare Plans
          </button>

          <button
            onClick={() => {
              setView('home');
              setMobileMenuOpen(false);
              setTimeout(() => {
                document.getElementById('why-trustline-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }}
            className="block w-full text-left py-2 px-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            About
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setTimeout(() => {
                document.getElementById('trustline-footer')?.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }}
            className="block w-full text-left py-2 px-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Contact
          </button>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setView('calculator');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#0b1e36] hover:bg-[#132d4e] rounded-full"
            >
              Get Quote
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#0b1e36] hover:bg-[#132d4e] rounded-full"
            >
              Login
            </button>
          </div>
        </div>
      )}

    </header>
  );
};

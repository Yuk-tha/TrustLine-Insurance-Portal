import React from 'react';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = ({ setView, setSelectedCategory }) => {
  const handleProductClick = (cat) => {
    if (setSelectedCategory) {
      setSelectedCategory(cat);
    }
    setView('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="trustline-footer" className="bg-[#0b1e36] text-slate-300 font-sans border-t border-slate-800">
      
      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Column 1: Logo & Mission Statement */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-[#e2b33e] rounded-lg">
              <Shield className="h-5 w-5 text-slate-900" />
            </div>
            <span className="font-black text-xl text-white">Trust<span className="text-[#e2b33e]">Line</span></span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            TrustLine Insurance helps individuals and businesses compare, purchase, renew and manage insurance policies through a secure digital platform.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-sm font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-xs font-semibold text-slate-400">
            <li>
              <button
                onClick={() => {
                  setView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#e2b33e] transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  if (setSelectedCategory) {
                    setSelectedCategory('all');
                  }
                  setView('compare');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#e2b33e] transition-colors cursor-pointer"
              >
                Insurance Plans
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setView('customer-dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#e2b33e] transition-colors cursor-pointer"
              >
                Claims
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  const faqSection = document.getElementById('faq-section');
                  faqSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-[#e2b33e] transition-colors cursor-pointer"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  const footerSection = document.getElementById('trustline-footer');
                  footerSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-[#e2b33e] transition-colors cursor-pointer"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Insurance Categories */}
        <div>
          <h3 className="text-sm font-bold text-white mb-4">Insurance</h3>
          <ul className="space-y-3 text-xs font-semibold text-slate-400">
            <li>
              <button onClick={() => handleProductClick('health')} className="hover:text-[#e2b33e] transition-colors cursor-pointer">
                Health Insurance
              </button>
            </li>
            <li>
              <button onClick={() => handleProductClick('life')} className="hover:text-[#e2b33e] transition-colors cursor-pointer">
                Life Insurance
              </button>
            </li>
            <li>
              <button onClick={() => handleProductClick('motor')} className="hover:text-[#e2b33e] transition-colors cursor-pointer">
                Motor Insurance
              </button>
            </li>
            <li>
              <button onClick={() => handleProductClick('travel')} className="hover:text-[#e2b33e] transition-colors cursor-pointer">
                Travel Insurance
              </button>
            </li>
            <li>
              <button onClick={() => handleProductClick('home')} className="hover:text-[#e2b33e] transition-colors cursor-pointer">
                Home Insurance
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact details with proper icons */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white">Contact</h3>
          <ul className="space-y-3.5 text-xs font-semibold text-slate-400">
            <li className="flex items-center space-x-2.5">
              <Mail className="h-4.5 w-4.5 text-[#e2b33e] flex-shrink-0" />
              <span className="text-slate-300">support@trustline.com</span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Phone className="h-4.5 w-4.5 text-[#e2b33e] flex-shrink-0" />
              <span className="text-slate-300">+91 98765 43210</span>
            </li>
            <li className="flex items-center space-x-2.5">
              <MapPin className="h-4.5 w-4.5 text-[#e2b33e] flex-shrink-0" />
              <span className="text-slate-300">Coimbatore, Tamil Nadu</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Underwriting Copyright Block */}
      <div className="bg-[#081729] py-6 border-t border-slate-800 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <p>© 2026 TrustLine Insurance. All underwriting and processing services are secure and protected.</p>
          <div className="flex space-x-4 text-[11px]">
            <a href="#privacy" className="hover:underline">Privacy Charter</a>
            <span>•</span>
            <a href="#terms" className="hover:underline">Terms of Use</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

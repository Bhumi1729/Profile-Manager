import React, { useState, useEffect } from 'react';
import { useAdmin } from "../context-api/admincontext";
import { User, ShieldCheck, ChevronRight } from 'lucide-react';

const Header = () => {
  const { isAdmin, toggleAdminMode } = useAdmin();
  const [scrolled, setScrolled] = useState(false);
  
  // Detect scroll for header transformation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-2 bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'py-4 bg-gradient-to-r from-gray-900 to-black'
    } text-white px-6 flex justify-between items-center border-b border-gray-700`}>
      <div className="flex items-center space-x-3">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
          <div className="relative h-10 w-10 bg-black rounded-full flex items-center justify-center">
            <User className="text-cyan-300" size={20} />
          </div>
        </div>
        <div>
          <div className="font-bold tracking-wide text-2xl">
            <span className="text-white">Pro</span>
            <span className="text-cyan-400">File</span>
            <span className="text-blue-400">Manager</span>
          </div>
          <div className="text-xs text-gray-300 -mt-1">Advanced Profile Management</div>
        </div>
      </div>
      
      {/* Admin toggle button */}
      <button
        onClick={toggleAdminMode}
        className={`relative overflow-hidden px-4 py-2 rounded-md font-medium transition-all duration-300 ${
          isAdmin 
            ? "bg-gradient-to-r from-red-700 to-red-500 hover:shadow-red-900/30 hover:shadow-lg" 
            : "bg-gradient-to-r from-cyan-700 to-blue-600 hover:shadow-cyan-900/30 hover:shadow-lg"
        } group`}
      >
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="transition-transform duration-300 group-hover:scale-110" />
          <span>{isAdmin ? "Exit Admin Mode" : "Enter Admin Mode"}</span>
          <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </button>
    </header>
  );
};

export default Header;
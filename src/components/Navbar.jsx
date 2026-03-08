import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Shield,
  Menu,
  Search,
  Zap,
  Activity,
  Snowflake,
  Hammer,
  X,
  ChevronRight,
  Command,
  Phone // <--- Added this back to fix the crash
} from "lucide-react";

const categoryIcons = {
  "Electrical Services": <Zap className="text-yellow-500" size={14} />,
  "Industrial Automation": <Activity className="text-blue-500" size={14} />,
  Refrigeration: <Snowflake className="text-cyan-500" size={14} />,
  "Handyman Services": <Hammer className="text-orange-500" size={14} />,
};

export default function Navbar({ onNavigate, activePage }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  // Stop background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Divisions", id: "divisions" },
    { label: "Tech Specs", id: "tech-specs" },
    { label: "Audits", id: "audit-service" },
    { label: "About Us", id: "about" },
  ];

  // Desktop Search Shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearching(true);
      }
      if (e.key === "Escape") {
        setIsSearching(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Search Logic
  useEffect(() => {
    const searchServices = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .or(`service_name.ilike.%${query}%,keywords.cs.{${query.toLowerCase()}}`)
        .limit(5);

      if (!error) setResults(data || []);
    };
    const delay = setTimeout(searchServices, 300);
    return () => clearTimeout(delay);
  }, [query]);

  const handleSelect = (service) => {
    if (service.category === 'Industrial Automation') onNavigate('tech-specs');
    else if (service.category === 'Handyman Services') onNavigate('audit-service');
    else onNavigate('divisions');
    
    setIsSearching(false);
    setMobileMenuOpen(false);
    setQuery("");
  };

  return (
    <>
      <nav className="sticky top-0 z-[110] bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { onNavigate("home"); setMobileMenuOpen(false); }}>
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <Shield size={18} fill="currentColor" />
            </div>
            <h1 className="text-base md:text-lg font-black text-slate-900 italic uppercase tracking-tighter">
              MREWA<span className="text-blue-600">TECHNICAL</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-6">
            <div className="flex gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                    activePage === item.id ? "text-blue-600 bg-blue-50/50" : "text-slate-400 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop Search */}
            <div className="relative" ref={searchRef}>
              <button 
                onClick={() => setIsSearching(!isSearching)}
                className={`flex items-center gap-3 pl-4 pr-2 py-2 rounded-xl border transition-all ${
                  isSearching ? "border-blue-600 ring-4 ring-blue-50" : "border-slate-200 bg-slate-50/50"
                }`}
              >
                <Search size={16} className={isSearching ? "text-blue-600" : "text-slate-400"} />
                <span className="text-[10px] font-bold text-slate-400 pr-8">Search...</span>
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-400">
                  <Command size={10} /> <span className="text-[9px]">K</span>
                </div>
              </button>

              {isSearching && (
                <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-4 border-b border-slate-50 bg-slate-50/30">
                    <input
                      autoFocus
                      type="text"
                      placeholder="MODEL OR SERVICE..."
                      className="w-full bg-transparent text-xs font-bold uppercase outline-none"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                  <div className="max-h-80 overflow-y-auto p-2">
                    {results.map((s) => (
                      <button key={s.id} onClick={() => handleSelect(s)} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 group transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:text-blue-600">
                            {categoryIcons[s.category] || <Activity size={14} />}
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] font-black uppercase tracking-tight">{s.service_name}</p>
                            <p className="text-[8px] font-bold text-slate-400 uppercase">{s.category}</p>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-600" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a href="tel:+642109123080" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 shadow-lg shadow-slate-200 transition-all">
              Support
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="xl:hidden p-2.5 text-slate-900 rounded-xl bg-slate-50 border border-slate-100"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* MOBILE FULLSCREEN MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-white">
          <div className="p-6 h-full flex flex-col">
            
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-1 rounded text-white"><Shield size={16} /></div>
                <h2 className="text-xs font-black uppercase tracking-widest">Navigation</h2>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="p-3 bg-slate-900 text-white rounded-full shadow-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Integrated Mobile Search */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="SEARCH EQUIPMENT..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-blue-600"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* Search Results or Nav Links */}
            <div className="flex-1 overflow-y-auto">
              {query.length > 1 ? (
                <div className="space-y-3">
                  {results.map((s) => (
                    <button key={s.id} onClick={() => handleSelect(s)} className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-xl text-blue-600">{categoryIcons[s.category] || <Zap size={16} />}</div>
                        <div className="text-left">
                          <p className="text-[10px] font-black uppercase">{s.service_name}</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase">{s.category}</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-300" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <button 
                      key={item.id} 
                      onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }} 
                      className={`w-full flex items-center justify-between p-6 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                        activePage === item.id ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-600"
                      }`}
                    >
                      {item.label} <ChevronRight size={18} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-auto pt-6">
              <a href="tel:+642109123080" className="w-full bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-xs tracking-widest shadow-xl">
                <Phone size={18} /> Call Engineering
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
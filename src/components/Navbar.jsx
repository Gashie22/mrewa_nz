import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Phone,
  Shield,
  Menu,
  Search,
  Zap,
  Activity,
  Snowflake,
  Hammer,
  ArrowRight,
  X,
  ChevronRight,
  MessageSquare,
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

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Divisions", id: "divisions" },
    { label: "Tech Specs", id: "tech-specs" },
    { label: "Audits", id: "audit-service" },
    { label: "About Us", id: "about" },
  ];

  const navigateAndClose = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setIsSearching(false);
  };

  useEffect(() => {
    const searchServices = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .or(
          `service_name.ilike.%${query}%,keywords.cs.{${query.toLowerCase()}}`,
        )
        .limit(5);

      if (!error) setResults(data || []);
    };

    const delay = setTimeout(searchServices, 300);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <>
      {/* --- MAIN TOP NAV --- */}
      <nav className="sticky top-0 z-[110] bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - Always visible */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigateAndClose("home")}
          >
            <div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-lg shadow-blue-100 group-hover:bg-slate-900 transition-colors">
              <Shield size={18} fill="currentColor" />
            </div>
            <h1 className="text-base md:text-lg font-black text-slate-900 tracking-tighter italic uppercase">
              MREWA<span className="text-blue-600">TECHNICAL</span>
            </h1>
          </div>

          {/* Desktop Search & Nav (Hidden on Mobile) */}
          <div className="hidden xl:flex items-center gap-8">
            <div className="flex gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                    activePage === item.id
                      ? "text-blue-600"
                      : "text-slate-400 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <a
              href="tel:+642109123080"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all"
            >
              Support
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-900 rounded-xl bg-slate-50 border border-slate-100 active:scale-95 transition-all"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE ACTION BAR (BOTTOM) --- 
          Only visible on small screens to provide easy thumb access */}
      <div className="fixed bottom-0 left-0 right-0 z-[120] md:hidden bg-white border-t border-slate-100 p-3 flex justify-around items-center shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => navigateAndClose("home")}
          className={`flex flex-col items-center gap-1 ${activePage === "home" ? "text-blue-600" : "text-slate-400"}`}
        >
          <Zap size={20} />
          <span className="text-[8px] font-black uppercase tracking-tighter">
            Home
          </span>
        </button>
        <button
          onClick={() => setIsSearching(true)}
          className="flex flex-col items-center gap-1 text-slate-400"
        >
          <Search size={20} />
          <span className="text-[8px] font-black uppercase tracking-tighter">
            Search
          </span>
        </button>
        <div className="relative -top-6">
          <a
            href="tel:+642109123080"
            className="bg-blue-600 text-white p-4 rounded-full shadow-2xl shadow-blue-300 block"
          >
            <Phone size={24} />
          </a>
        </div>
        <button
          onClick={() => navigateAndClose("tech-specs")}
          className={`flex flex-col items-center gap-1 ${activePage === "tech-specs" ? "text-blue-600" : "text-slate-400"}`}
        >
          <Activity size={20} />
          <span className="text-[8px] font-black uppercase tracking-tighter">
            Specs
          </span>
        </button>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 text-slate-400"
        >
          <Menu size={20} />
          <span className="text-[8px] font-black uppercase tracking-tighter">
            More
          </span>
        </button>
      </div>

      {/* --- FULL SCREEN OVERLAY (SEARCH & NAV) --- */}
      {(mobileMenuOpen || isSearching) && (
        <div className="fixed inset-0 z-[150] bg-white animate-in slide-in-from-bottom duration-300">
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xs font-black uppercase tracking-widest text-blue-600">
                {isSearching ? "Search Services" : "Technical Menu"}
              </h2>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSearching(false);
                }}
                className="p-2 bg-slate-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Integrated Search Input */}
            <div className="relative mb-8">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                autoFocus={isSearching}
                type="text"
                placeholder="TYPE TO SEARCH..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-blue-600 outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* Results or Nav Items */}
            <div className="flex-1 overflow-y-auto pb-20">
              {query.length > 1 ? (
                <div className="space-y-3">
                  {results.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleSelect(s)}
                      className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-xl text-blue-600">
                          {categoryIcons[s.category] || <Zap size={16} />}
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] font-black uppercase">
                            {s.service_name}
                          </p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                            {s.category}
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-300" />
                    </button>
                  ))}
                  {results.length === 0 && (
                    <p className="text-center text-[10px] font-bold text-slate-400 uppercase py-10">
                      No hardware matches found
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigateAndClose(item.id)}
                      className={`w-full flex items-center justify-between p-6 rounded-3xl text-sm font-black uppercase tracking-widest transition-all ${
                        activePage === item.id
                          ? "bg-blue-600 text-white shadow-xl shadow-blue-100"
                          : "bg-slate-50 text-slate-600"
                      }`}
                    >
                      {item.label}
                      <ChevronRight size={18} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

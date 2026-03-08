import React from "react";
import Typewriter from "../components/Typewriter";
import {
  ShieldCheck,
  Zap,
  Anchor,
  HardHat,
  ChevronRight,
  ArrowUpRight,
  Activity,
  Cpu
} from "lucide-react";

export default function Home({ onExplore }) {
  return (
    <div className="animate-in fade-in duration-1000 bg-white">
      {/* --- HERO SECTION: ENHANCED VISIBILITY --- */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* The Industrial Factory Image - Opacity increased to 65% */}
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070" 
          alt="High-Tech Assembly Plant" 
          className="absolute inset-0 w-full h-full object-cover opacity-65 mix-blend-luminosity scale-100"
        />
        
        {/* Refined overlays for balance between image detail and text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-transparent to-white" />
        <div className="absolute inset-0 bg-slate-900/20" /> {/* Subtle darkening wash */}

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-400/40 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-2xl backdrop-blur-md">
            <Cpu size={14} className="animate-pulse text-blue-400" /> Precision Engineering Solutions
          </div>

          <h1 className="text-6xl md:text-8xl xl:text-9xl font-black text-white tracking-tighter leading-[0.8] mb-8 italic uppercase drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
            ONE POINT OF <br />
            <span className="text-blue-500">
              <Typewriter text="CONTACT." speed={100} />
            </span>
          </h1>

          <div className="text-lg md:text-2xl text-white max-w-2xl mx-auto leading-relaxed mb-12 min-h-[80px] font-bold drop-shadow-md">
            <Typewriter
              text="Integrated engineering across Industrial, Commercial, and Marine sectors throughout New Zealand and the Pacific."
              speed={30}
              delay={1500}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => onExplore("divisions")}
              className="group bg-blue-600 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white hover:text-slate-900 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
            >
              Explore Our Divisions
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onExplore("about")}
              className="bg-white/10 text-white border-2 border-white/40 backdrop-blur-md px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              Our Story
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
           <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest animate-pulse">Scroll</span>
           <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
        </div>
      </section>

      {/* --- CORE PILLARS SECTION --- */}
      <section className="py-32 bg-white px-6 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {/* Industrial Strength */}
          <div className="group space-y-6 p-10 rounded-[3rem] bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-100 group-hover:rotate-6 transition-all">
              <Zap size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase">Industrial Strength</h3>
            <p className="text-slate-500 leading-relaxed text-sm font-medium">
              Advanced PLC programming and 24/7 plant maintenance designed to eliminate critical downtime.
            </p>
            <button onClick={() => onExplore("tech-specs")} className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-all">
              View Tech Specs <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Marine & Pacific */}
          <div className="group space-y-6 p-10 rounded-[3rem] bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200 group-hover:rotate-6 transition-all">
              <Anchor size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase">Marine & Pacific</h3>
            <p className="text-slate-500 leading-relaxed text-sm font-medium">
              Logistics and Reefer services across Pacific ports, providing cold-chain reliability.
            </p>
            <button onClick={() => onExplore("divisions")} className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-all">
              Service Map <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Facility Care */}
          <div className="group space-y-6 p-10 rounded-[3rem] bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-100 group-hover:rotate-6 transition-all">
              <HardHat size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase">Facility Care</h3>
            <p className="text-slate-500 leading-relaxed text-sm font-medium">
              Comprehensive property audits and technical handyman services for Auckland's commercial assets.
            </p>
            <button onClick={() => onExplore("audit-service")} className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-all">
              Audit Services <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* --- PARTNERSHIP CALLOUT --- */}
      <section className="pb-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          
          <Activity className="mx-auto text-blue-500 mb-8 animate-pulse" size={64} />
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter italic uppercase leading-tight">
            Partnership You'll <br /><span className="text-blue-500">Value.</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl mx-auto font-medium leading-relaxed">
            Reliability. Precision. Excellence. Trust MREWA Technical for your most critical infrastructure.
          </p>
          <button
            onClick={() => onExplore("divisions")}
            className="bg-white text-slate-900 px-16 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
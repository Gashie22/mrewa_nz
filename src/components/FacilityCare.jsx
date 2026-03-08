import React from 'react';
import { ClipboardCheck, Drill, Building2, Ruler, ShieldAlert, ArrowRight } from 'lucide-react';

export default function FacilityCare({ onAuditClick }) {
  const specializedTools = ["Thermal Imaging", "Load Profiling", "Acoustic Leak Detection"];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Branding & Info */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">
            <Building2 size={14} /> Commercial & Domestic
          </div>
          
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">
            Precision <span className="text-blue-600">Facility</span> Care.
          </h2>
          
          <p className="text-lg text-slate-500 leading-relaxed">
            Beyond standard maintenance, we provide **Technical Handyman Support**. Whether it's a full commercial fit-out in Auckland or a comprehensive safety audit, we treat every facility with engineering-grade precision.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-slate-700 flex items-center gap-3">
              <Drill className="text-blue-600" size={20} /> Commercial Fit-outs
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-slate-700 flex items-center gap-3">
              <ShieldAlert className="text-blue-600" size={20} /> Safety Compliance
            </div>
          </div>

          <button 
            onClick={onAuditClick}
            className="group flex items-center gap-4 bg-blue-600 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-100"
          >
            Launch Property Audit <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Right Side: The "Technical Checklist" Visual */}
        <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ClipboardCheck size={120} />
          </div>
          
          <h3 className="text-xl font-black italic mb-6 text-blue-400">AUDIT CAPABILITIES</h3>
          <ul className="space-y-5">
            {[
              "Electrical Safety & Earth Testing",
              "HVAC Efficiency & Filter Audits",
              "Lighting Grid Optimization (LED)",
              "Structural Fixture Integrity",
              "Preventative Maintenance Schedules"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-medium border-b border-slate-800 pb-4 last:border-0">
                <span className="text-blue-500 mt-1"><Ruler size={16} /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
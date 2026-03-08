import React from 'react';
import { ShieldCheck, FileText, ClipboardCheck, HardHat, Scale, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AuditServicePage() {
  return (
    <div className="animate-in fade-in duration-1000 bg-white min-h-screen">
      {/* --- HERO IMAGE SECTION --- */}
      <section className="relative h-[60vh] w-full overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070" 
          alt="Technical Site Inspection"
          className="w-full h-full object-cover object-center opacity-70 scale-105 hover:scale-100 transition-transform duration-[3000ms]"
        />
        {/* Deep gradient for professional text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-slate-900/40 to-transparent" />
        
        <div className="absolute bottom-32 left-0 w-full px-6">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-4 shadow-xl">
              Field Operations
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter italic uppercase leading-[0.8] drop-shadow-2xl">
              Audit <br />
              <span className="text-blue-500">Excellence.</span>
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto py-12 px-6 -mt-20 relative z-10">
        {/* Overview Card */}
        <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic mb-6">
                Technical Property <span className="text-blue-600">Diagnostics</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
                MREWA Technical provides independent, high-level audits for commercial assets across Auckland. Our mission is to provide facility managers with a "Source of Truth" regarding their electrical and mechanical health.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Asset Lifecycle Data', 'Risk Mitigation', 'Energy Efficiency', 'Safety Compliance'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[10px] font-black text-slate-900 uppercase tracking-widest bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 size={14} className="text-blue-600" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
               <div className="relative z-10">
                 <Scale className="text-blue-500 mb-6" size={40} />
                 <h4 className="text-xl font-bold mb-4 uppercase italic">NZ Standards Adherence</h4>
                 <p className="text-slate-400 text-sm leading-relaxed mb-6">
                   All MREWA audits are structured around <strong>AS/NZS 3000:2018</strong> and local council building requirements. We ensure your insurance remains valid and your liability is managed.
                 </p>
                 <div className="w-12 h-1 bg-blue-600" />
               </div>
               <div className="absolute -bottom-10 -right-10 opacity-10">
                 <ShieldCheck size={200} />
               </div>
            </div>
          </div>
        </div>

        {/* Audit Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="group p-8 rounded-[2rem] border-2 border-slate-50 hover:border-blue-100 transition-all">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <FileText size={28} />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase italic mb-3">Live Reporting</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Real-time digital documentation with photographic evidence of every non-compliance found during the inspection.
            </p>
          </div>
          
          <div className="group p-8 rounded-[2rem] border-2 border-slate-50 hover:border-blue-100 transition-all">
            <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-all">
              <ClipboardCheck size={28} />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase italic mb-3">Master Checklist</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Comprehensive switchboard, HVAC, and refrigeration checks to identify hidden wear-and-tear before failure.
            </p>
          </div>

          <div className="group p-8 rounded-[2rem] border-2 border-slate-50 hover:border-blue-100 transition-all">
            <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-900 transition-all shadow-lg shadow-blue-200">
              <HardHat size={28} />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase italic mb-3">Expert Review</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Final sign-off by a master engineer, providing you with professional recommendations for immediate or future action.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-blue-600 rounded-[4rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
          <h3 className="text-4xl md:text-5xl font-black mb-8 italic uppercase tracking-tighter">Ready for Inspection?</h3>
          <p className="mb-10 text-blue-100 text-lg max-w-xl mx-auto font-medium">
            Join the property groups in Auckland and the Pacific who trust Ronold and the MREWA team for precision technical auditing.
          </p>
          <a 
            href={`https://wa.me/${import.meta.env.VITE_MREWA_WHATSAPP}?text=${encodeURIComponent("I'd like to book a Technical Property Audit.")}`}
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-12 py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl active:scale-95"
          >
            Book Your Audit <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
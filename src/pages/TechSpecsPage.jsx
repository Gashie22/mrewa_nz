import React from 'react';
import { Cpu, Zap, Activity, ShieldCheck, ChevronRight, Settings, Database } from 'lucide-react';

const technicalCategories = [
  {
    title: "Automation & Control",
    icon: <Cpu className="text-blue-600" />,
    description: "End-to-end PLC and SCADA integration for manufacturing.",
    specs: [
      { label: "PLCs", value: "Allen-Bradley (Studio 5000), Siemens (TIA Portal), Omron" },
      { label: "HMI/SCADA", value: "Ignition, Wonderware, FactoryTalk View" },
      { label: "Networks", value: "EtherNet/IP, Modbus TCP, Profinet, DH+" }
    ]
  },
  {
    title: "Power & Distribution",
    icon: <Zap className="text-blue-600" />,
    description: "Industrial power systems and motor control.",
    specs: [
      { label: "Drives (VSD)", value: "PowerFlex, ABB ACS Series, Danfoss VLT" },
      { label: "Compliance", value: "AS/NZS 3000:2018 (Wiring Rules)" },
      { label: "Switchgear", value: "Custom Control Panel Design & Build" }
    ]
  }
];

export default function TechSpecsPage() {
  return (
    <div className="animate-in slide-in-from-right duration-700 bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto py-20 px-6">
        
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content Area */}
          <div className="flex-1">
            <header className="mb-16 border-l-8 border-blue-600 pl-8">
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">
                Technical <br />
                <span className="text-blue-600">Specifications</span>
              </h1>
              <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">
                Industrial Engineering Standards & Hardware Stack
              </p>
            </header>

            <div className="grid grid-cols-1 gap-8 mb-20">
              {technicalCategories.map((cat) => (
                <div key={cat.title} className="group bg-slate-50 rounded-[3rem] p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="p-4 bg-white rounded-2xl shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                      {React.cloneElement(cat.icon, { size: 32, className: "group-hover:text-white transition-colors" })}
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">{cat.title}</h3>
                      <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest mt-1">Verified Hardware Stack</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-500 mb-10 text-lg leading-relaxed font-medium max-w-xl">{cat.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-200 pt-10">
                    {cat.specs.map((s) => (
                      <div key={s.label}>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">
                          {s.label}
                        </span>
                        <span className="text-slate-900 font-bold text-sm leading-tight block">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Image / Technical Panel */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-8">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[3/4] bg-slate-900">
                {/* --- YOUR SPECIFIC IMAGE LINK APPLIED HERE --- */}
                <img 
                  src="https://images.unsplash.com/photo-1563968743333-044cef800494?q=80&w=1658&auto=format&fit=crop" 
                  alt="High-Tech Infrastructure"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="text-blue-400 animate-spin-slow" size={16} />
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">System Integrity</span>
                  </div>
                  <p className="text-white font-bold text-xl leading-tight italic">Precision Built for NZ Pacific Operations.</p>
                </div>
              </div>

              {/* Compliance Badges Area */}
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Certification Framework</h5>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-blue-600" size={18} />
                    <span className="text-xs font-bold text-slate-800 uppercase">AS/NZS 3000:2018 Certified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Database className="text-blue-600" size={18} />
                    <span className="text-xs font-bold text-slate-800 uppercase">SiteSafe Gold Standard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 24/7 Support Banner */}
        <div className="mt-20 bg-slate-900 rounded-[4rem] p-12 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="relative z-10 flex items-center gap-8">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center animate-pulse shadow-lg shadow-blue-500/20">
              <Activity size={40} />
            </div>
            <div>
              <h4 className="text-3xl font-black italic uppercase tracking-tighter">Zero Downtime Mission</h4>
              <p className="text-slate-400 font-medium max-w-md">Immediate remote diagnostics and 24/7 on-site emergency intervention for critical failures.</p>
            </div>
          </div>
          <button className="relative z-10 bg-white text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
            Contact Engineering
          </button>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Cpu, Zap, Snowflake, Hammer, ArrowRight } from 'lucide-react';

const divisions = [
  { 
    title: "Industrial Automation", 
    icon: <Cpu size={24} />, 
    color: "bg-blue-600",
    features: ["PLC & SCADA Design", "VSD Integration", "Robotic Systems"],
    desc: "Optimizing manufacturing through precision control logic."
  },
  { 
    title: "Electrical Services", 
    icon: <Zap size={24} />, 
    color: "bg-yellow-500",
    features: ["Industrial Maintenance", "Switchboard Upgrades", "Compliance Testing"],
    desc: "Powering infrastructure with safety-first engineering."
  },
  { 
    title: "Refrigeration & HVAC", 
    icon: <Snowflake size={24} />, 
    color: "bg-cyan-500",
    features: ["Marine Reefer Units", "Cold Storage", "Heat Pump Installs"],
    desc: "Specialist cooling solutions for NZ & the Pacific."
  },
  { 
    title: "General Maintenance", 
    icon: <Hammer size={24} />, 
    color: "bg-slate-600",
    features: ["Property Audits", "Facility Fit-outs", "Preventive Care"],
    desc: "Maintaining the integrity of your physical assets."
  }
];

export default function Divisions() {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-left border-l-4 border-blue-600 pl-6">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
            Specialist <span className="text-blue-600">Divisions</span>
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Expertise across the full technical spectrum.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {divisions.map((div) => (
            <div 
              key={div.title} 
              className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`${div.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-inherit/20`}>
                {div.icon}
              </div>
              
              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight leading-tight">
                {div.title}
              </h3>
              
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                {div.desc}
              </p>

              <ul className="space-y-3 mb-8">
                {div.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    {f}
                  </li>
                ))}
              </ul>

              <button className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                Explore Services <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { Settings, Cpu, ShieldCheck, Drill, Zap, ThermometerSnowflake } from 'lucide-react';

const specs = [
  {
    category: "Automation & Control",
    icon: <Cpu className="text-blue-600" />,
    items: [
      { label: "PLC Systems", value: "Allen-Bradley, Siemens S7, Omron" },
      { label: "HMI/SCADA", value: "Ignition, Wonderware, FactoryTalk" },
      { label: "VSD Tuning", value: "ABB, Danfoss, Schneider Electric" },
      { label: "Protocols", value: "EtherNet/IP, Modbus TCP, Profinet" }
    ]
  },
  {
    category: "Electrical Standards",
    icon: <Zap className="text-yellow-500" />,
    items: [
      { label: "Compliance", value: "AS/NZS 3000:2018 Standards" },
      { label: "Switchgear", value: "Type-Tested Assemblies (TTA)" },
      { label: "Protection", value: "Arc Flash Mitigation & Coordination" },
      { label: "Testing", value: "Thermal Imaging & Load Profiling" }
    ]
  },
  {
    category: "Refrigeration Specs",
    icon: <ThermometerSnowflake className="text-cyan-500" />,
    items: [
      { label: "Reefer Units", value: "Carrier, Thermo King, Daikin" },
      { label: "Monitoring", value: "Remote Telemetry & Data Logging" },
      { label: "Coolants", value: "F-Gas Compliant / Low GWP Options" },
      { label: "Marine", value: "IP67 Rated Corrosion Resistance" }
    ]
  }
];

export default function TechSpecs() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-12 w-2 bg-blue-600 rounded-full" />
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Technical <span className="text-blue-600">Specifications</span></h2>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Industrial Standards & Hardware Competency</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {specs.map((spec) => (
            <div key={spec.category} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-blue-200 transition-all group">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  {spec.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">{spec.category}</h3>
              </div>

              <div className="space-y-6">
                {spec.items.map((item) => (
                  <div key={item.label} className="border-b border-slate-200 pb-3 last:border-0">
                    <span className="block text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{item.label}</span>
                    <span className="text-slate-700 font-bold text-sm leading-tight">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Badge Row */}
        <div className="mt-16 flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex items-center gap-2 font-black text-slate-900 italic tracking-tighter"><ShieldCheck /> NZ CERTIFIED</div>
           <div className="flex items-center gap-2 font-black text-slate-900 italic tracking-tighter"><Settings /> AS/NZS 3000</div>
           <div className="flex items-center gap-2 font-black text-slate-900 italic tracking-tighter"><Drill /> SITE SAFE GOLD</div>
        </div>
      </div>
    </section>
  );
}
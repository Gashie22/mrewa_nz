import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const highlights = ["Industrial Automation", "Marine Refrigeration", "Electrical Safety"];

  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">
          Experience You Can <span className="text-blue-600 underline decoration-blue-100">Trust</span>.
        </h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          From complex SCADA systems in Auckland to deep-sea reefer maintenance in the Pacific—we keep your critical systems running.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {highlights.map((item) => (
            <div key={item} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm text-sm font-bold text-slate-700">
              <CheckCircle2 size={16} className="text-blue-500" /> {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
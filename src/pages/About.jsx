import React from 'react';
import { Award, Users, Globe, BookOpen, ShieldCheck, HeartHandshake } from 'lucide-react';

const stats = [
  { label: 'Years Experience', value: '25+', icon: <Award className="text-blue-600" /> },
  { label: 'Regions Served', value: 'NZ & Pacific', icon: <Globe className="text-blue-600" /> },
  { label: 'Technical Specialists', value: 'Multi-Disciplinary', icon: <Users className="text-blue-600" /> },
];

const values = [
  { 
    title: "Plain Speaking", 
    desc: "We don't hide behind jargon. We explain technical issues clearly so you can make informed decisions.",
    icon: <BookOpen size={24} />
  },
  { 
    title: "Experience You Can Trust", 
    desc: "With over two decades in the field, we’ve seen it all—from industrial breakdowns to complex system installs.",
    icon: <ShieldCheck size={24} />
  },
  { 
    title: "Partnership You’ll Value", 
    desc: "We don't just fix problems; we build long-term relationships to ensure your systems remain efficient.",
    icon: <HeartHandshake size={24} />
  }
];

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section with Unsplash Background */}
      <section className="relative py-32 px-6 overflow-hidden bg-slate-900">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=2070" 
            alt="Technical Analysis"
            className="w-full h-full object-cover opacity-40"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest mb-6">
            Establishing Standards
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-8 italic uppercase leading-[0.9]">
            OUR <span className="text-blue-500">STORY.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl">
            Founded by Ronold Chidyausiku, MREWA Technical Services was built on a simple premise: 
            <span className="text-white font-bold block mt-2">Provide world-class engineering with a personal, local touch.</span>
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-slate-100 relative z-20 bg-white shadow-xl -mt-10 max-w-5xl mx-auto rounded-3xl">
        <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="p-4">
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* The Founder's Vision */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="h-1 w-20 bg-blue-600" />
          <h2 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">
            The MREWA Approach
          </h2>
          <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
            <p>
              MREWA provides a <strong>"One Point of Contact"</strong> service for Industrial Automation, Electrical, and Refrigeration. We understand that in industrial environments, downtime isn't just an inconvenience—it's a cost.
            </p>
            <p>
              Our team is mobile and responsive, serving metropolitan Auckland and the wider Pacific region. Whether it's a high-pressure manufacturing environment or a residential electrical safety check, we apply the same level of precision and care.
            </p>
          </div>
        </div>
        
        {/* Quote Block with subtle tech texture */}
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <ShieldCheck size={120} />
          </div>
          <p className="relative z-10 text-xl italic font-medium leading-relaxed text-slate-300">
            "Our mission is to bridge the gap between complex engineering and practical, reliable solutions for every client we serve."
          </p>
          <div className="relative z-10 mt-8">
            <p className="font-black uppercase tracking-widest text-blue-500">Ronold Chidyausiku</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Founder & Lead Engineer</p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-slate-50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl font-black text-slate-900 mb-16 uppercase tracking-tighter italic leading-none">
            Built on <span className="text-blue-600">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="group bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-blue-200 transition-all duration-500">
                <div className="w-14 h-14 bg-slate-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                  {v.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight italic">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
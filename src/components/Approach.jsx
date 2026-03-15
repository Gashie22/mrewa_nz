import React from 'react';
import { Target, ShieldCheck, Zap, Users, Award, Clock } from 'lucide-react';

const Approach = () => {
  const steps = [
    {
      title: "Consultation",
      desc: "Understanding your specific technical requirements and operational challenges.",
      icon: <Users size={24} />
    },
    {
      title: "Design & Planning",
      desc: "Engineering custom solutions with precision and future scalability in mind.",
      icon: <Target size={24} />
    },
    {
      title: "Execution",
      desc: "Professional installation and commissioning with minimal downtime.",
      icon: <Zap size={24} />
    }
  ];

  const highlights = [
    { title: "99% Reliability", desc: "Proven track record in industrial uptime.", icon: <ShieldCheck size={20} /> },
    { title: "Certified Experts", desc: "Qualified engineers for specialized systems.", icon: <Award size={20} /> },
    { title: "24/7 Support", desc: "Dedicated emergency technical assistance.", icon: <Clock size={20} /> }
  ];

  return (
    <>
      {/* Approach Section */}
      <section id="approach" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#55b3c5] font-bold tracking-[4px] uppercase text-sm">Our Methodology</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f3d4a] mt-4 italic uppercase">The MREWA Approach</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-[#a8e6cf] to-[#55b3c5] mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative p-8 rounded-[20px] bg-[#f7fbfc] border border-slate-100 group hover:shadow-xl transition-all">
                <div className="text-[#55b3c5] mb-6 transform group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-[#0f3d4a] text-xl font-bold mb-3 uppercase italic">{step.title}</h3>
                <p className="text-[#3d6670] leading-relaxed text-sm font-medium">{step.desc}</p>
                {index < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-[#a8e6cf] z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-24 bg-[#0f3d4a] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#a8e6cf]/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#a8e6cf] font-bold tracking-[4px] uppercase text-sm">Value Proposition</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-8 italic uppercase">Why Choose MREWA?</h2>
              <p className="text-white/70 text-lg mb-10 leading-relaxed font-medium">
                We don't just fix problems; we engineer long-term stability. Our reputation is built on 
                technical excellence and an unwavering commitment to safety across New Zealand and the Pacific.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 bg-[#a8e6cf]/10 rounded-lg text-[#a8e6cf]">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wide">{item.title}</h4>
                      <p className="text-white/50 text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-[20px] overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
                  alt="Quality Assurance" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f3d4a] via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-[#a8e6cf] to-[#55b3c5] p-8 rounded-[20px] shadow-xl hidden md:block">
                <p className="text-[#0f3d4a] font-black text-3xl italic">15+</p>
                <p className="text-[#0f3d4a] font-bold text-xs uppercase tracking-widest">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Approach;
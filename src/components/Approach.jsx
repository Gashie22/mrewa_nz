import React from 'react';
import { 
  Search, 
  MessageSquare, 
  ShieldCheck, 
  UserPlus, 
  Briefcase, 
  Award, 
  Shield, 
  FileText 
} from 'lucide-react';

const Approach = () => {
  const steps = [
    {
      title: "01. We Solve Problems, Not Just Fix Things",
      desc: "When you call us, we don't just look at the faulty equipment. We consider the context—your operating hours, your staff capabilities, your budget constraints, and your long-term goals. We deliver solutions that work for your whole business.",
      icon: <Search size={24} />
    },
    {
      title: "02. We Communicate Clearly",
      desc: "Having sat on your side of the table, we know how frustrating technical jargon can be. We explain things plainly, present options transparently, and ensure you feel confident in every decision.",
      icon: <MessageSquare size={24} />
    },
    {
      title: "03. We Deliver Reliability",
      desc: "We've experienced the cost of unreliability firsthand. That's why we're obsessive about quality workmanship, using the best materials, and building systems that stand the test of time.",
      icon: <ShieldCheck size={24} />
    },
    {
      title: "04. We're a True Partner",
      desc: "We're not just contractors; we're an extension of your team. We take pride in your success and work tirelessly to ensure your facilities support your business objectives, not hinder them.",
      icon: <UserPlus size={24} />
    }
  ];

  const highlights = [
    { 
      title: "One Point of Contact", 
      desc: "We manage everything from complex industrial automation to simple handyman tasks—simplifying your life and your contractor management.", 
      icon: <Briefcase size={20} /> 
    },
    { 
      title: "25+ Years' Experience", 
      desc: "Deep expertise across FMCG, hospitality, construction, and facilities management mean we understand your world.", 
      icon: <Award size={20} /> 
    },
    { 
      title: "Fully Licensed & Insured", 
      desc: "All work complies with NZ standards and regulations, giving you complete peace of mind.", 
      icon: <Shield size={20} /> 
    },
    { 
      title: "Comprehensive SLAs", 
      desc: "We employ comprehensive Service Level Agreements, enhancing customer satisfaction, quality, and compliance.", 
      icon: <FileText size={20} /> 
    }
  ];

  return (
    <>
      {/* Our Approach Section */}
      <section id="approach" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#55b3c5] font-bold tracking-[4px] uppercase text-sm">How We Work</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f3d4a] mt-4 italic uppercase">Our Approach</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-[#a8e6cf] to-[#55b3c5] mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative p-8 rounded-[20px] bg-[#f7fbfc] border border-slate-100 group hover:shadow-xl transition-all">
                <div className="text-[#55b3c5] mb-6 transform group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-[#0f3d4a] text-lg font-bold mb-3 uppercase italic leading-tight">{step.title}</h3>
                <p className="text-[#3d6670] leading-relaxed text-sm font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-24 bg-[#0f3d4a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#a8e6cf]/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#a8e6cf] font-bold tracking-[4px] uppercase text-sm">Our Difference</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-8 italic uppercase">Why Choose MREWA Technical Services?</h2>
              
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
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80" 
                  alt="Technical Excellence" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f3d4a] via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-[#a8e6cf] to-[#55b3c5] p-8 rounded-[20px] shadow-xl hidden md:block">
                <p className="text-[#0f3d4a] font-black text-3xl italic">25+</p>
                <p className="text-[#0f3d4a] font-bold text-xs uppercase tracking-widest">Years Combined Leadership</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Approach;
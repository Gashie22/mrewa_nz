import React from 'react';
import { Factory, Building2, Home, Zap } from 'lucide-react';

const industries = [
  {
    title: "Industrial",
    description: "Factories, manufacturing plants, and processing units requiring heavy-duty power and automation.",
    icon: <Factory className="text-white" size={28} />,
  },
  {
    title: "Commercial",
    description: "Shopping malls, office complexes, and retail outlets focusing on efficiency and safety.",
    icon: <Building2 className="text-white" size={28} />,
  },
  {
    title: "Residential",
    description: "Private homes and housing estates looking for reliable electrical and HVAC maintenance.",
    icon: <Home className="text-white" size={28} />,
  },
  {
    title: "Energy & Utilities",
    description: "Substations, solar farms, and water treatment plants requiring specialized technical care.",
    icon: <Zap className="text-white" size={28} />,
  }
];

const About = () => {
  return (
    // ID changed to "who-we-are" to match Navbar links
    <section id="who-we-are" className="py-24 bg-[#f7fbfc]">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[#55b3c5] font-bold tracking-[4px] uppercase text-sm">Who We Are</span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f3d4a] mt-4 mb-6 italic uppercase">
            Engineering Excellence
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#a8e6cf] to-[#55b3c5] mx-auto mb-8 rounded-full" />
          <p className="text-[#3d6670] text-lg leading-relaxed font-medium">
            At <strong>MREWA Technical Services</strong>, we bridge the gap between complex 
            engineering challenges and practical, reliable solutions. Operating across 
            New Zealand and the Pacific, we provide precision-driven expertise in electrical, 
            automation, and climate control systems.
          </p>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((item, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-[20px] shadow-sm border border-slate-100 hover:border-[#a8e6cf] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon Circle */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#a8e6cf] to-[#55b3c5] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                {item.icon}
              </div>
              
              <h4 className="text-[#0f3d4a] font-bold text-xl mb-3 italic uppercase">{item.title}</h4>
              <p className="text-[#3d6670] text-sm leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Vision/Mission/Values sections with matching IDs */}
        <div className="mt-24 grid md:grid-cols-2 gap-12">
          {/* Vision Section */}
          <div id="vision-mission" className="bg-white p-10 rounded-[20px] shadow-lg border-t-4 border-[#55b3c5]">
            <h3 className="text-2xl font-black text-[#0f3d4a] mb-4 italic uppercase">Our Vision</h3>
            <p className="text-[#3d6670] font-medium leading-relaxed">
              To be the premier multi-disciplinary technical service provider across the Pacific, 
              recognized for our unwavering commitment to quality, precision, and the 
              seamless integration of innovative engineering solutions.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white p-10 rounded-[20px] shadow-lg border-t-4 border-[#55b3c5]">
            <h3 className="text-2xl font-black text-[#0f3d4a] mb-4 italic uppercase">Our Mission</h3>
            <p className="text-[#3d6670] font-medium leading-relaxed">
              We empower industries by delivering world-class technical expertise in electrical, 
              automation, and mechanical systems, ensuring operational reliability while 
              maintaining the highest standards of safety and integrity.
            </p>
          </div>
        </div>

        {/* Values Section added to match Navbar ID */}
        <div id="values" className="mt-12 bg-[#0f3d4a] p-12 rounded-[20px] text-center">
          <h3 className="text-white text-3xl font-black italic uppercase mb-8">Core Values</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {['Quality', 'Precision', 'Integrity', 'Reliability', 'Innovation', 'Safety'].map((value) => (
              <div key={value} className="text-[#a8e6cf] font-bold uppercase tracking-[3px] text-sm">
                • {value}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
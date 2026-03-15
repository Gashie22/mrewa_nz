import React from 'react';
import { Factory, ConciergeBell, HardHat, Building2 } from 'lucide-react';

const industries = [
  {
    title: "FMCG",
    description: "We learned the critical importance of cold chain integrity, the precision required for high-speed production lines, and the non-negotiable need for reliability in environments where every minute of downtime costs money.",
    icon: <Factory className="text-white" size={28} />,
  },
  {
    title: "Hospitality",
    description: "We mastered the art of delivering seamless service under pressure. A comfortable environment—perfectly controlled climate, fully functional kitchens, welcoming spaces—is the backbone of guest satisfaction and repeat business.",
    icon: <ConciergeBell className="text-white" size={28} />,
  },
  {
    title: "Construction",
    description: "We developed a keen eye for quality workmanship, project management discipline, and the ability to coordinate complex trades to deliver results on time and on budget. We speak the language of builders, architects, and project managers fluently.",
    icon: <HardHat className="text-white" size={28} />,
  },
  {
    title: "Facilities Management",
    description: "We built systems and processes to keep large portfolios running smoothly. We understand preventative maintenance, lifecycle costing, and the importance of having a reliable partner who can handle everything from emergency repairs to planned upgrades.",
    icon: <Building2 className="text-white" size={28} />,
  }
];

const About = () => {
  return (
    <section id="who-we-are" className="py-24 bg-[#f7fbfc]">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="text-[#55b3c5] font-bold tracking-[4px] uppercase text-sm">About Us</span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f3d4a] mt-4 mb-2 italic uppercase">
            Who We Are
          </h2>
          <p className="text-[#55b3c5] font-bold mb-6">Experience You Can Trust. Partnership You'll Value.</p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#a8e6cf] to-[#55b3c5] mx-auto mb-8 rounded-full" />
          
          <div className="text-[#3d6670] text-lg leading-relaxed font-medium space-y-6 text-left md:text-center">
            <p>
              Maintenance Refrigeration Electrical Works and Automation <strong>(MREWA)</strong> Technical Services was founded on a simple but powerful insight: <em>true expertise comes from seeing challenges from every angle</em>. With over <strong>25 years of combined leadership experience</strong> across FMCG, hospitality, construction, and facilities management, our founders bring a rare and invaluable perspective to every project we undertake.
            </p>
            <p>
              We don't just see electrical circuits or refrigeration systems—we see the businesses they support. We understand that when a freezer or heat pump fails in a busy restaurant, it's not just a technical fault; it's lost revenue, disappointed customers, and stressed staff. When construction delays impact a facilities rollout, we know the pressure it places on project timelines and bottom lines. This deep, cross-sector understanding shapes everything we do.
            </p>
          </div>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((item, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-[20px] shadow-sm border border-slate-100 hover:border-[#a8e6cf] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
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

        {/* Vision & Mission */}
        <div id="vision-mission" className="mt-24 grid md:grid-cols-2 gap-12">
          {/* Vision Section */}
          <div className="bg-white p-10 rounded-[20px] shadow-lg border-t-4 border-[#55b3c5]">
            <h3 className="text-2xl font-black text-[#0f3d4a] mb-4 italic uppercase">Our Vision</h3>
            <div className="text-[#3d6670] font-medium leading-relaxed space-y-4">
              <p>
                To be the most trusted integrated technical services partner in New Zealand—recognised for excellence, reliability, and a genuine understanding of what keeps businesses and homes running seamlessly.
              </p>
              <p>
                We aspire to build a legacy where clients don't just call us when something breaks; they partner with us from the beginning because they value our insight, our integrity, and our commitment to their long-term success.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-white p-10 rounded-[20px] shadow-lg border-t-4 border-[#55b3c5]">
            <h3 className="text-2xl font-black text-[#0f3d4a] mb-4 italic uppercase">Our Mission</h3>
            <p className="text-[#3d6670] font-medium leading-relaxed">
              Our mission is to provide integrated and sustainable electrical, automation, refrigeration, air conditioning, and handyman solutions that exceed expectations—by combining decades of cross-industry experience with technical expertise, clear communication, and a relentless focus on quality and safety.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div id="values" className="mt-12 bg-[#0f3d4a] p-12 rounded-[20px]">
          <div className="text-center mb-10">
            <span className="text-[#55b3c5] font-bold tracking-[4px] uppercase text-sm">What Drives Us</span>
            <h3 className="text-white text-3xl font-black italic uppercase mt-2">Our Values</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Integrity', desc: 'We do what we say, communicate honestly, and stand behind our work—always.' },
              { title: 'Safety', desc: 'We protect our people, our clients, and the community through uncompromising safety standards.' },
              { title: 'Innovation', desc: 'We continuously seek better ways to help our clients improve efficiency, reduce costs, and embrace new technology.' },
              { title: 'Excellence', desc: 'We are obsessive about quality workmanship, using the best materials, and building systems that stand the test of time.' }
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="text-[#a8e6cf] font-bold uppercase tracking-[3px] text-sm mb-2">
                  {value.title}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
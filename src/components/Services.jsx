import React, { useState } from 'react';
import { Zap, Cpu, Snowflake, Wrench, CheckCircle2 } from 'lucide-react';

const serviceData = {
  electrical: {
    title: "Electrical",
    icon: <Zap size={20} />,
    description: "Comprehensive electrical engineering solutions, from high-voltage industrial installations to precision domestic wiring.",
    sections: [
      {
        label: "Industrial & Plant",
        items: ["Motor Control Centers (MCC)", "VSD & Soft Starter Installations", "Power Distribution Boards", "Cable Racking & Industrial Wiring"]
      },
      {
        label: "Commercial & Domestic",
        items: ["Energy Efficient Lighting", "Backup Power & UPS Systems", "General Maintenance", "Security Systems Wiring"]
      }
    ]
  },
  automation: {
    title: "Automation",
    icon: <Cpu size={20} />,
    description: "Advanced industrial automation and process control systems designed to optimize production and reduce downtime.",
    sections: [
      {
        label: "Control Systems",
        items: ["PLC Programming & Fault Finding", "SCADA & HMI Development", "Process Instrumentation", "Control Panel Design"]
      }
    ]
  },
  refrigeration: {
    title: "Refrigeration & AC",
    icon: <Snowflake size={20} />,
    description: "Specialized HVAC-R solutions including cold room commissioning and industrial chiller maintenance.",
    sections: [
      {
        label: "Cooling Solutions",
        items: ["Cold Room Installations", "Industrial Chiller Maintenance", "Air Conditioning Systems", "Refrigerant Gas Recovery"]
      }
    ]
  },
  handyman: {
    title: "Handyman",
    icon: <Wrench size={20} />,
    description: "Diverse technical support for comprehensive facility management and mechanical repairs.",
    sections: [
      {
        label: "Mechanical & Structural",
        items: ["Steel Fabrication", "General Plumbing", "Pump Repairs", "On-site Technical Support"]
      }
    ]
  }
};

const Services = () => {
  const [activeTab, setActiveTab] = useState('electrical');

  return (
    <section id="services" className="py-24 bg-[#f7fbfc]"> {/* Matches --off-white from styles.css */}
      <div className="container mx-auto px-6">
        
        {/* Header matched to index.html */}
        <div className="text-center mb-16">
          <span className="text-[#55b3c5] font-bold tracking-[4px] uppercase text-sm">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0f3d4a] mt-4 italic uppercase">Our Services</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#a8e6cf] via-[#7ec8c8] to-[#55b3c5] mx-auto mt-4 rounded-full" />
        </div>

        {/* Tab Selection matched to .tab-btn in styles.css */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.entries(serviceData).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all duration-300 ${
                activeTab === key 
                ? 'bg-gradient-to-r from-[#a8e6cf] to-[#55b3c5] text-white shadow-lg scale-105' 
                : 'bg-white text-[#7a9ea8] hover:bg-[#a8e6cf]/10 border border-slate-100 hover:border-[#a8e6cf]'
              }`}
            >
              {value.icon}
              {value.title}
            </button>
          ))}
        </div>

        {/* Content Display matched to .service-content-area in styles.css */}
        <div className="bg-white rounded-[20px] p-8 md:p-12 border border-slate-100 shadow-xl animate-in">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left: Summary */}
            <div className="lg:w-1/3">
              <div className="bg-[#f7fbfc] p-6 rounded-2xl shadow-sm inline-block mb-6 text-[#55b3c5]">
                {React.cloneElement(serviceData[activeTab].icon, { size: 40 })}
              </div>
              <h3 className="text-3xl font-black text-[#0f3d4a] mb-4 italic uppercase">{serviceData[activeTab].title}</h3>
              <p className="text-[#3d6670] leading-relaxed mb-6 font-medium">
                {serviceData[activeTab].description}
              </p>
              <div className="flex items-center gap-2 text-[#2a8a9e] font-bold text-sm bg-[#a8e6cf]/20 px-4 py-2 rounded-full w-fit">
                <CheckCircle2 size={16} /> Technical Excellence Guaranteed
              </div>
            </div>

            {/* Right: Detailed List matched to .service-list in styles.css */}
            <div className="lg:w-2/3 grid sm:grid-cols-2 gap-8">
              {serviceData[activeTab].sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="text-lg font-bold text-[#1a5f6f] border-l-4 border-[#a8e6cf] pl-3 uppercase tracking-wider">
                    {section.label}
                  </h4>
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#1e3a42] text-sm font-medium">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-[#55b3c5] rounded-full shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
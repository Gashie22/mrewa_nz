import React, { useState } from 'react';
import { Zap, Cpu, Snowflake, Wrench, CheckCircle2 } from 'lucide-react';

const serviceData = {
  electrical: {
    title: "Electrical",
    icon: <Zap size={20} />,
    compliance: "All work meets NZ Electrical Safety Regulations, AS/NZS 3000, and EWRB standards.",
    description: "Our comprehensive electrical services cover everything from residential upgrades to heavy industrial maintenance, ensuring all work meets strict NZ safety regulations.",
    sections: [
      {
        label: "Residential Installations",
        items: ["Installing switches, sockets, and light fixtures", "Rewiring and upgrading older houses", "Electrical panel upgrades and replacements", "EV charger installations", "Safety inspections & pre-purchase checks", "Heat pump installations"]
      },
      {
        label: "Maintenance & Repairs",
        items: ["Fault finding and troubleshooting", "Emergency electrical repairs and callouts", "Power point and outlet repairs"]
      },
      {
        label: "Commercial Fit-Outs",
        items: ["New electrical installations for fit-outs", "Lighting design for offices and retail", "Commercial switchboard servicing", "Power point and outlet installations"]
      },
      {
        label: "Industrial",
        items: ["Standby shift work coverage", "Motor control centres (MCCs)", "Reactive and preventive maintenance", "SCADA system design", "Variable speed drives (VSDs)", "Instrumentation"]
      },
      {
        label: "Infrastructure",
        items: ["Streetlighting", "Solar & grid connect", "Water & wastewater treatment infrastructure", "EV charging infrastructure", "Power distribution & fuse box upgrades"]
      },
      {
        label: "Safety & Compliance",
        items: ["Electrical safety inspections", "Testing and certification", "BWOF & Caravan Warrant of Fitness", "Testing and tagging"]
      }
    ]
  },
  automation: {
    title: "Automation",
    icon: <Cpu size={20} />,
    description: "End-to-end automation solutions—from initial consulting and system design through to installation, programming, and ongoing maintenance.",
    sections: [
      {
        label: "Home Automation",
        items: ["HVAC & BMS Integration", "Smart switch and lighting control", "Smart locks, cameras, and sensors", "Refrigeration monitoring with alerting", "Whole-home smart technology retrofit"]
      },
      {
        label: "Control System Engineering",
        items: ["PLC Programming (pumps, motors, conveyors)", "SCADA Systems & real-time dashboards", "DCS Solutions for food and dairy", "Trend tracking and alarm response"]
      },
      {
        label: "Consulting & Strategy",
        items: ["Process Audits & Assessments", "ROI-Driven Roadmaps", "Scalable technology strategies"]
      },
      {
        label: "Robotics & Mechatronics",
        items: ["Robotic Work Cells (welding, handling)", "Collaborative Robots (Cobots)", "Quality inspection automation"]
      },
      {
        label: "IIoT & Lifecycle",
        items: ["Smart Sensors & data capture", "Predictive Maintenance analysis", "IT/OT Convergence", "Staff training and optimization"]
      }
    ]
  },
  refrigeration: {
    title: "Refrigeration & AC",
    icon: <Snowflake size={20} />,
    compliance: "NZ Building Code G4 | MPI accreditation (in process) | RMP compliance",
    description: "Specialist HVAC-R solutions ranging from custom design and engineering to industrial blast freezing and 24/7 breakdown response.",
    sections: [
      {
        label: "Design & Installation",
        items: ["Custom HVAC&R system design", "PS1-PS4 documentation", "Commercial HVAC (VRF, split systems)", "Industrial coolstores & blast freezers", "Residential heat pumps"]
      },
      {
        label: "Specialist Services",
        items: ["Blast freezing & Chill down", "Cold storage solutions", "Refrigerated container services (reefers)", "CO₂ natural refrigerant systems", "Commercial display cabinets"]
      },
      {
        label: "Maintenance & Air",
        items: ["24/7 breakdown response", "Preventative programmes", "Duct cleaning and sanitisation", "Mechanical ventilation design", "Air quality improvements"]
      },
      {
        label: "Controls & Energy",
        items: ["BMS integration", "Energy-efficient retrofits", "Remote monitoring", "Performance optimisation"]
      }
    ]
  },
  handyman: {
    title: "Handyman",
    icon: <Wrench size={20} />,
    description: "Your go-to solution for everyday fixes and property improvements, bridging the gap between complex technical projects and regular upkeep.",
    sections: [
      {
        label: "Property Maintenance",
        items: ["General repairs", "Carpentry", "Plumbing basics", "Ongoing upkeep for homes & businesses"]
      },
      {
        label: "Fixtures & Fittings",
        items: ["Furniture assembly", "Shelving & curtain rails", "Picture hanging", "Minor joinery"]
      },
      {
        label: "Preventive Care",
        items: ["Regular property audits", "Roof, gutter & perimeter checks", "Electrical and furniture fittings", "Preventing minor issues becoming major"]
      }
    ]
  }
};

const Services = () => {
  const [activeTab, setActiveTab] = useState('electrical');

  return (
    <section id="services" className="py-24 bg-[#f7fbfc]">
      <div className="container mx-auto px-6">
        
        {/* Header matched to index.html */}
        <div className="text-center mb-16">
          <span className="text-[#55b3c5] font-bold tracking-[4px] uppercase text-sm">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0f3d4a] mt-4 italic uppercase">Our Comprehensive Services</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#a8e6cf] via-[#7ec8c8] to-[#55b3c5] mx-auto mt-4 rounded-full" />
        </div>

        {/* Tab Selection */}
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

        {/* Content Display */}
        <div className="bg-white rounded-[20px] p-8 md:p-12 border border-slate-100 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column: Summary & Compliance */}
            <div className="lg:w-1/3">
              <div className="bg-[#f7fbfc] p-6 rounded-2xl shadow-sm inline-block mb-6 text-[#55b3c5]">
                {React.cloneElement(serviceData[activeTab].icon, { size: 40 })}
              </div>
              <h3 className="text-3xl font-black text-[#0f3d4a] mb-4 italic uppercase">{serviceData[activeTab].title} Services</h3>
              
              {serviceData[activeTab].compliance && (
                <div className="mb-6 p-4 bg-[#a8e6cf]/10 border border-[#a8e6cf]/30 rounded-xl">
                  <div className="flex items-center gap-2 text-[#2a8a9e] font-bold text-xs uppercase tracking-wider mb-2">
                    <CheckCircle2 size={14} /> Compliance & Standards
                  </div>
                  <p className="text-[#3d6670] text-xs font-bold leading-relaxed">
                    {serviceData[activeTab].compliance}
                  </p>
                </div>
              )}

              <p className="text-[#3d6670] leading-relaxed mb-6 font-medium">
                {serviceData[activeTab].description}
              </p>
            </div>

            {/* Right Column: Detailed Grid */}
            <div className="lg:w-2/3 grid sm:grid-cols-2 gap-x-8 gap-y-10">
              {serviceData[activeTab].sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="text-sm font-black text-[#1a5f6f] border-l-4 border-[#a8e6cf] pl-3 uppercase tracking-widest">
                    {section.label}
                  </h4>
                  <ul className="space-y-2.5">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#1e3a42] text-sm font-medium leading-snug">
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
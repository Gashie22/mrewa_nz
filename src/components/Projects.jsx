import React from 'react';
import { ExternalLink, MapPin } from 'lucide-react';

const projects = [
  {
    title: "Industrial MCC Installation",
    location: "Auckland, New Zealand",
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1558467523-46113f1fef72?auto=format&fit=crop&q=80",
    details: "Full design and commissioning of Motor Control Centers for a high-capacity manufacturing facility."
  },
  {
    title: "PLC System Migration",
    location: "Christchurch, NZ",
    category: "Automation",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
    details: "Modernizing legacy control systems to high-speed Siemens infrastructure for optimized production."
  },
  {
    title: "Cold Room Commissioning",
    location: "Pacific Region",
    category: "Refrigeration",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80",
    details: "Turnkey cooling solutions and climate control for regional pharmaceutical storage."
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-[#f7fbfc]"> {/* Matches --off-white */}
      <div className="container mx-auto px-6">
        
        {/* Section Header matches the style of index.html */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[#55b3c5] font-bold tracking-[4px] uppercase text-sm">Our Work</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f3d4a] mt-4 italic uppercase">Recent Projects</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-[#a8e6cf] to-[#55b3c5] mt-6 rounded-full" />
          </div>
          <button className="hidden md:flex items-center gap-2 text-[#1a5f6f] font-extrabold hover:text-[#55b3c5] transition-colors group uppercase text-sm tracking-wider">
            Explore Portfolio <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-[20px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Badge Overlay */}
                <div className="absolute top-5 left-5">
                  <span className="bg-gradient-to-r from-[#a8e6cf] to-[#55b3c5] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content matched to original typography */}
              <div className="p-8">
                <div className="flex items-center gap-2 text-[#2a8a9e] font-bold text-xs mb-4 uppercase tracking-tighter">
                  <MapPin size={14} className="text-[#a8e6cf]" /> {project.location}
                </div>
                <h3 className="text-xl font-black text-[#0f3d4a] mb-3 group-hover:text-[#55b3c5] transition-colors uppercase italic">
                  {project.title}
                </h3>
                <p className="text-[#3d6670] text-sm leading-relaxed mb-6 font-medium">
                  {project.details}
                </p>
                {/* Animated Accent Line */}
                <div className="h-1 w-12 bg-[#a8e6cf] group-hover:w-full transition-all duration-500 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 md:hidden">
          <button className="w-full bg-white border-2 border-[#a8e6cf] text-[#1a5f6f] py-4 rounded-xl font-black uppercase text-sm tracking-widest shadow-sm">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
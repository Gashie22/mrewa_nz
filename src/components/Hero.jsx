import React from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';
// Import your local banner image
import bannerImg from '../assets/banner.png';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* 1. Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bannerImg} 
          alt="Technical Services Background" 
          className="w-full h-full object-cover"
        />
        {/* Adjusted Opacity: Lighter at top for BG text, darker at bottom for button contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f3d4a]/30 via-[#0f3d4a]/50 to-[#0f3d4a]/80" />
      </div>

      {/* 2. Hero Content */}
      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center pt-[45vh]">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Action Buttons: Lowered vertical position */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <a 
              href="#services" 
              className="w-full sm:w-auto bg-white text-[#1a5f6f] px-10 py-4 rounded-full font-extrabold flex items-center justify-center gap-2 hover:bg-[#a8e6cf] hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl"
            >
              Our Services <ChevronRight size={20} />
            </a>
            
            {/* Pulsing "Get a Quote" Button */}
            <a 
              href="#contact" 
              className="relative w-full sm:w-auto bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-extrabold flex items-center justify-center gap-2 hover:bg-white hover:text-[#1a5f6f] transition-all transform hover:-translate-y-1 group"
            >
              {/* Pulse Ring Effect */}
              <span className="absolute inset-0 rounded-full bg-white/20 animate-ping group-hover:hidden"></span>
              
              <span className="relative flex items-center gap-2">
                Get a Quote
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce text-white/50">
        <a href="#who-we-are">
          <ArrowDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
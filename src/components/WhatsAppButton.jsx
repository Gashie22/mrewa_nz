import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = "642109123080"; // Removed spaces and '+' for the URL
  const message = "Hello MREWA Technical Services, I would like to inquire about your services.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[2000] group flex items-center justify-center"
      aria-label="Contact on WhatsApp"
    >
      {/* Tooltip hint that appears on hover */}
      <span className="absolute right-16 bg-white text-navy px-4 py-2 rounded-lg shadow-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-slate-100 whitespace-nowrap">
        Chat with us!
      </span>

      {/* The actual button */}
      <div className="relative">
        {/* Pulse animation effect */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20" />
        
        <div className="relative bg-[#25D366] text-white p-4 rounded-full shadow-brand-md transition-transform duration-300 group-hover:scale-110 group-active:scale-95 flex items-center justify-center">
          <MessageCircle size={28} fill="currentColor" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
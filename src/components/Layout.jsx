import React, { useState } from 'react';
import { MessageCircle, Phone, X, Send, ChevronRight, Activity } from 'lucide-react';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const whatsappNumber = import.meta.env.VITE_MREWA_WHATSAPP || "64210000000";

  const handleRequestCall = (e) => {
    e.preventDefault();
    // Logic for handling the call request (e.g., Supabase/Email) would go here
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsOpen(false);
    }, 3000);
  };

  return (
    <div className="relative min-h-screen font-sans">
      <main>{children}</main>

      {/* --- FLOATING CONTACT HUB --- */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
        
        {/* ACTION MENU (Slide out) */}
        {isOpen && (
          <div className="animate-in slide-in-from-bottom-10 fade-in duration-300 mb-6 w-[350px] max-w-[90vw]">
            <div className="bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden">
              {/* Header */}
              <div className="bg-slate-900 p-8 text-white relative">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="text-blue-500" size={20} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Engineering Support</span>
                </div>
                <h4 className="text-2xl font-black italic uppercase">How can we <br />help?</h4>
              </div>

              {/* Form / Content */}
              <div className="p-8">
                {formSubmitted ? (
                  <div className="text-center py-10 animate-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send size={24} />
                    </div>
                    <h5 className="font-black uppercase italic text-slate-900">Request Sent</h5>
                    <p className="text-sm text-slate-500">Ronold will call you shortly.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* WhatsApp Quick Link */}
                    <a 
                      href={`https://wa.me/${whatsappNumber}`}
                      className="flex items-center justify-between p-4 rounded-2xl bg-green-50 border border-green-100 group hover:bg-green-600 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <MessageCircle size={24} className="text-green-600 group-hover:text-white" />
                        <div>
                          <p className="text-xs font-black text-green-700 group-hover:text-white uppercase">Instant Chat</p>
                          <p className="text-[10px] font-bold text-green-600/70 group-hover:text-white/80">Typical reply: 5 mins</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-green-400 group-hover:text-white" />
                    </a>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
                      <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-300 bg-white px-2">Or Request a Callback</div>
                    </div>

                    {/* Call Request Form */}
                    <form onSubmit={handleRequestCall} className="space-y-3">
                      <input 
                        required
                        type="text" 
                        placeholder="Your Name"
                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                      <input 
                        required
                        type="tel" 
                        placeholder="Phone Number (e.g. +64...)"
                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                      <button 
                        type="submit"
                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
                      >
                        Request Call Now
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MAIN TOGGLE BUTTON */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`group relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-500 active:scale-90 ${
            isOpen ? 'bg-slate-900 text-white rotate-90' : 'bg-blue-600 text-white'
          }`}
        >
          {/* Radar Ring (Only shown when closed) */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20" />
          )}
          
          {isOpen ? <X size={28} /> : <Phone size={28} />}
          
          {/* Hover Label */}
          {!isOpen && (
            <span className="absolute right-20 bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Contact Engineering
            </span>
          )}
        </button>
      </div>
    </div>
  );
} 
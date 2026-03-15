import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Linkedin, Instagram, Loader2, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [isSending, setIsSending] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'electrical',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    // Business Endpoint for info@mrewatechnicalservices.com
    const FORMSPREE_URL = "https://formspree.io/f/mreylowk";

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          // Custom subject line for your inbox organization
          _subject: `MREWA BUSINESS INQUIRY: ${formData.service.toUpperCase()} - ${formData.name}`
        })
      });

      if (response.ok) {
        console.log('%c[Formspree Success]', 'color: #a8e6cf; font-weight: bold;', 'Inquiry sent to Business Email');
        setFormSubmitted(true);
        setFormData({ name: '', email: '', phone: '', service: 'electrical', message: '' });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Submission failed');
      }
      
    } catch (err) {
      console.error('%c[Form Error]', 'color: #ff4d4d; font-weight: bold;', err.message);
      alert('We encountered an issue sending your request. Please contact us via WhatsApp for a faster response.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-[#0f3d4a] overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#a8e6cf]/10 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#55b3c5]/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Side: Business Info */}
          <div className="text-white">
            <span className="text-[#a8e6cf] font-bold tracking-[4px] uppercase text-sm">Connect With Us</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-8 italic uppercase text-white">Get a Quote</h2>
            <p className="text-white/80 text-lg mb-12 max-w-md font-medium">
              Ready to start your next technical project? Contact us today for professional engineering solutions.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-[#a8e6cf]/20 transition-colors">
                  <Phone className="text-[#a8e6cf]" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg uppercase tracking-wider">Call Us</h4>
                  <a href="tel:+642109123080" className="text-white/70 hover:text-white transition-colors">+64 21 091 23080</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-[#a8e6cf]/20 transition-colors">
                  <Mail className="text-[#a8e6cf]" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg uppercase tracking-wider">Email Us</h4>
                  <a href="mailto:info@mrewatechnicalservices.com" className="text-white/70 hover:text-white transition-colors">info@mrewatechnicalservices.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white rounded-[20px] p-8 md:p-12 shadow-2xl min-h-[550px] flex flex-col justify-center">
            {formSubmitted ? (
              <div className="text-center animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-black uppercase italic text-[#0f3d4a] mb-4">Inquiry Received</h3>
                <p className="text-slate-500 font-medium mb-8">
                  Your message has been delivered to our engineering team. We will get back to you within 24 hours.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="text-[#55b3c5] font-black uppercase tracking-widest text-[10px] hover:underline"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[#0f3d4a] font-black uppercase text-xs tracking-widest">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Name"
                      className="w-full px-4 py-3 rounded-lg bg-[#f7fbfc] border border-slate-200 focus:border-[#55b3c5] outline-none transition-all font-medium text-[#0f3d4a]"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#0f3d4a] font-black uppercase text-xs tracking-widest">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#f7fbfc] border border-slate-200 focus:border-[#55b3c5] outline-none transition-all font-medium text-[#0f3d4a]"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[#0f3d4a] font-black uppercase text-xs tracking-widest">Phone</label>
                    <input 
                      type="tel" 
                      placeholder="+64..."
                      className="w-full px-4 py-3 rounded-lg bg-[#f7fbfc] border border-slate-200 focus:border-[#55b3c5] outline-none transition-all font-medium text-[#0f3d4a]"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#0f3d4a] font-black uppercase text-xs tracking-widest">Service</label>
                    <select 
                      className="w-full px-4 py-3 rounded-lg bg-[#f7fbfc] border border-slate-200 focus:border-[#55b3c5] outline-none transition-all font-medium text-[#0f3d4a]"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      <option value="electrical">Electrical Engineering</option>
                      <option value="automation">Industrial Automation</option>
                      <option value="refrigeration">Refrigeration & AC</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[#0f3d4a] font-black uppercase text-xs tracking-widest">Project Details</label>
                  <textarea 
                    required
                    rows="4"
                    placeholder="Describe your requirements..."
                    className="w-full px-4 py-3 rounded-lg bg-[#f7fbfc] border border-slate-200 focus:border-[#55b3c5] outline-none transition-all resize-none font-medium text-[#0f3d4a]"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-gradient-to-r from-[#a8e6cf] to-[#55b3c5] text-[#0f3d4a] py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-lg transform hover:-translate-y-1 transition-all disabled:opacity-70 disabled:transform-none"
                >
                  {isSending ? <Loader2 className="animate-spin" size={20} /> : (
                    <>Send Request <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
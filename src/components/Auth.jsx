import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: window.location.origin,
          }
        });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Success! Please check your email for the confirmation link.' });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fbfc] flex items-start sm:items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 pb-8">
      <div className="w-full max-w-md">
        {/* Back to Home Link - Mobile Optimized */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#3d6670] hover:text-[#0f3d4a] transition-colors mb-6 sm:mb-8 font-bold text-xs sm:text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="flex-shrink-0" /> 
          <span>Back to Website</span>
        </Link>

        {/* Main Card - Mobile Optimized */}
        <div className="bg-white rounded-2xl sm:rounded-[30px] shadow-xl sm:shadow-2xl p-6 sm:p-10 border border-slate-100 relative overflow-hidden">
          {/* Decorative Top Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-[#a8e6cf] to-[#55b3c5]" />

          {/* Header - Responsive Typography */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f3d4a] uppercase italic tracking-tight">
              {isSignUp ? 'Create Account' : 'Client Portal'}
            </h2>
            <p className="text-[#3d6670] text-xs sm:text-sm mt-1 sm:mt-2 font-medium">
              {isSignUp ? 'Join MREWA Technical Services' : 'Manage your service requests'}
            </p>
          </div>

          {/* Message Alert - Mobile Friendly */}
          {message.text && (
            <div className={`mb-6 p-3 sm:p-4 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider text-center ${
              message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
            }`}>
              {message.text}
            </div>
          )}

          {/* Form - Optimized Touch Targets */}
          <form onSubmit={handleAuth} className="space-y-4 sm:space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[2px] text-[#0f3d4a] ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-3 sm:top-3.5 text-[#7ec8c8]" size={16} />
                <input 
                  type="email" 
                  required
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#f7fbfc] border border-slate-200 focus:border-[#55b3c5] focus:ring-2 focus:ring-[#55b3c5]/10 outline-none transition-all text-sm sm:text-base font-medium text-[#0f3d4a]"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[2px] text-[#0f3d4a] ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-3 sm:top-3.5 text-[#7ec8c8]" size={16} />
                <input 
                  type="password" 
                  required
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#f7fbfc] border border-slate-200 focus:border-[#55b3c5] focus:ring-2 focus:ring-[#55b3c5]/10 outline-none transition-all text-sm sm:text-base font-medium text-[#0f3d4a]"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                />
              </div>
            </div>

            {/* Submit Button - Larger Touch Target */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#0f3d4a] text-white py-4 sm:py-4 rounded-xl sm:rounded-2xl font-black uppercase tracking-[2px] sm:tracking-[3px] text-xs sm:text-xs hover:bg-[#1a5f6f] shadow-lg shadow-[#0f3d4a]/20 active:scale-95 sm:hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 disabled:opacity-70 min-h-[52px] sm:min-h-0"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Processing...</span>
                </>
              ) : (
                isSignUp ? 'Register Now' : 'Sign In'
              )}
            </button>
          </form>

          {/* Footer - Mobile Optimized */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-100 text-center">
            <p className="text-[#3d6670] text-xs sm:text-xs font-medium">
              {isSignUp ? 'Already have a portal account?' : "Need technical support tracking?"}
            </p>
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="mt-2 sm:mt-2 text-[#55b3c5] text-xs sm:text-xs font-black uppercase tracking-widest hover:text-[#0f3d4a] transition-colors py-2 px-4 -mx-4"
            >
              {isSignUp ? 'Switch to Login' : 'Create an Account'}
            </button>
          </div>

          {/* Help Text for Mobile */}
          <div className="mt-4 text-center">
            <p className="text-[10px] text-[#3d6670]/60">
              Secure portal for MREWA clients
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
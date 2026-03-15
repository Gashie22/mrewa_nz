import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';

// Layout Components
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';

// Section Components
import Hero from './components/Hero';
import About from './components/About';
import Approach from './components/Approach';
import Services from './components/Services';
import Contact from './components/Contact';

// Page Components
import Auth from './components/Auth';
import Dashboard from './components/Dashboard'; // Note: check if you put this in /pages or /components

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Marketing Site Layout (Navbar + Footer included)
  const LandingPage = () => (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Approach />
        <Services />
        <Contact />
        <WhatsAppButton />
      </main>
      <footer className="bg-[#0f3d4a] py-12 border-t border-white/5 text-center">
        <p className="text-white/40 text-[10px] uppercase font-bold tracking-[2px]">
          © {new Date().getFullYear()} MREWA Technical Services. All Rights Reserved.
        </p>
      </footer>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Marketing Site */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Page (Minimal - No global Navbar) */}
        <Route 
          path="/login" 
          element={!session ? <Auth /> : <Navigate to="/dashboard" />} 
        />

        {/* The Unified Dashboard (Standalone Layout) */}
        <Route 
          path="/dashboard" 
          element={
            session ? (
              <Dashboard session={session} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
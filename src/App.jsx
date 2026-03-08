import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TechSpecsPage from "./pages/TechSpecsPage";
// Assuming these pages exist based on your previous prompts:
import AuditService from "./pages/AuditServicePage";
import Divisions from "./pages/DivisionsPage";
import About from "./pages/About";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Smooth scroll to top when changing pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onExplore={setCurrentPage} />;
      
      case "tech-specs":
        return <TechSpecsPage />;

      case "audit-service":
        return <AuditService />;
      
      case "divisions":
        return <Divisions />;

      case "about":
        return <About />;
      

      default:
        return <Home onExplore={setCurrentPage} />;
    }
  };

  return (
    <Layout>
      {/* --- NAVIGATION --- */}
      <Navbar 
        activePage={currentPage} 
        onNavigate={setCurrentPage} 
      />

      {/* --- DYNAMIC PAGE CONTENT --- */}
      <div className="pt-16"> {/* Padding to account for fixed Navbar */}
        {renderPage()}
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">
              MREWA <span className="text-blue-600">Technical</span>
            </h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
              Engineering Excellence Across the Pacific
            </p>
          </div>
          
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <button onClick={() => setCurrentPage('home')} className="hover:text-blue-600 transition-colors">Home</button>
            <button onClick={() => setCurrentPage('tech-specs')} className="hover:text-blue-600 transition-colors">Tech Specs</button>
            <a href="#privacy" className="hover:text-blue-600 transition-colors">Privacy</a>
          </div>

          <p className="text-slate-400 text-[10px] font-medium">
            © 2026 MREWA Technical Services. All Rights Reserved.
          </p>
        </div>
      </footer>
    </Layout>
  );
}
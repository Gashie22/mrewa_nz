import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { LogOut, Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  
  const [session, setSession] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Who We Are', id: 'who-we-are' },
    { name: 'Vision & Mission', id: 'vision-mission' },
    { name: 'Values', id: 'values' },
    { name: 'Approach', id: 'approach' },
    { name: 'Services', id: 'services' },
    { name: 'Why Us', id: 'why-choose-us' }
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Close mobile menu when window is resized to desktop size
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      subscription.unsubscribe();
    };
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const scrollToSection = (e, id, name) => {
    if (!isHomePage) {
      navigate('/');
      // Small delay to allow navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
      }, 100);
      return;
    }
    
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setActiveItem(name);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
      isScrolled ? 'py-2 shadow-lg' : 'py-3 shadow-md'
    } bg-gradient-to-r from-[#a8e6cf] via-[#7ec8c8] to-[#55b3c5]`}> 
      
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Area - Mobile Optimized */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
          onClick={(e) => scrollToSection(e, 'hero', '')}
        >
          <img 
            src={logoImg} 
            alt="MREWA Logo" 
            className="h-8 sm:h-[42px] w-auto object-contain" 
          />
          <div className="flex flex-col leading-tight">
            <span className="text-white text-xl sm:text-[1.6rem] font-black tracking-[1px] sm:tracking-[2px] uppercase">
              MREWA
            </span>
            <span className="text-white/85 text-[0.6rem] sm:text-[0.7rem] font-medium tracking-[2px] sm:tracking-[3px] uppercase">
              Technical Services
            </span>
          </div>
        </Link>

        {/* Mobile Menu Button - Visible on mobile/tablet */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu - Hidden on mobile/tablet */}
        <div className="hidden xl:flex items-center gap-2">
          {isHomePage && navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id, link.name)}
              className={`px-3.5 py-2 rounded-lg text-[0.9rem] font-medium transition-all duration-300 ${
                activeItem === link.name ? 'bg-white/20 text-white' : 'text-white/90 hover:text-white hover:bg-white/15'
              }`}
            >
              {link.name}
            </a>
          ))}
          
          {/* AUTH LOGIC BUTTONS - Desktop */}
          {session ? (
            <div className="flex items-center gap-3 ml-4">
              <Link 
                to="/dashboard"
                className="bg-white text-[#1a5f6f] px-6 py-2 rounded-full font-bold text-[0.9rem] shadow-sm hover:scale-105 transition-transform uppercase tracking-wider"
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-[#0f3d4a] text-white p-2.5 rounded-full shadow-sm hover:bg-red-500 hover:scale-105 transition-all flex items-center justify-center"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className="ml-4 bg-white text-[#1a5f6f] px-6 py-2 rounded-full font-bold text-[0.9rem] shadow-sm hover:scale-105 transition-transform uppercase tracking-wider"
            >
              Client Portal
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu - Slide Down Panel */}
      <div 
        className={`xl:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-[#a8e6cf] via-[#7ec8c8] to-[#55b3c5] shadow-lg transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
          
          {/* Mobile Navigation Links */}
          {isHomePage && navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id, link.name)}
              className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                activeItem === link.name ? 'bg-white/20 text-white' : 'text-white/90 hover:text-white hover:bg-white/15'
              }`}
            >
              {link.name}
            </a>
          ))}
          
          {/* Mobile Auth Section - Separator for visual clarity */}
          <div className="border-t border-white/20 my-2"></div>
          
          {/* Mobile Auth Buttons */}
          {session ? (
            <div className="flex flex-col gap-2">
              <Link 
                to="/dashboard"
                className="bg-white text-[#1a5f6f] px-4 py-3 rounded-lg font-bold text-base shadow-sm hover:scale-[1.02] transition-transform uppercase tracking-wider text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-[#0f3d4a] text-white px-4 py-3 rounded-lg font-bold text-base shadow-sm hover:bg-red-500 transition-all flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className="bg-white text-[#1a5f6f] px-4 py-3 rounded-lg font-bold text-base shadow-sm hover:scale-[1.02] transition-transform uppercase tracking-wider text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Client Portal
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState, useEffect } from "react";
import { Sun, Moon, Download } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { profile } from "../data";

export default function Navigation() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll position for header blur
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for Active Section Tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all top-level sections
    const sections = ['home', 'about', 'capabilities', 'projects', 'process', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: "Work", path: "#projects", id: "projects" },
    { name: "About", path: "#about", id: "about" },
    { name: "Capabilities", path: "#capabilities", id: "capabilities" },
    { name: "Process", path: "#process", id: "process" },
    { name: "Contact", path: "#contact", id: "contact" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // Let native smooth scrolling handle anchor links
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "py-3 lg:py-4" : "py-5 lg:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className={`glass-crystal rounded-full border border-glass-border-bright px-4 lg:px-6 py-2.5 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.12)]" : "shadow-md"
        }`}>
          
          {/* Logo / Brand */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary flex items-center justify-center shadow-[0_0_15px_var(--glow-cyan)] group-hover:scale-105 transition-transform">
              <span className="text-white font-display font-bold text-sm">D</span>
            </div>
            <span className={`text-sm font-semibold font-display tracking-wide transition-colors ${
              activeSection === 'home' ? "text-accent-primary drop-shadow-[0_0_5px_var(--glow-cyan)]" : "text-text-primary"
            }`}>
              DAWOOD<span className="font-editorial italic font-normal text-text-secondary ml-1">Hayat</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 glass-mist rounded-full p-1 border border-glass-border shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-500 cursor-pointer ${
                    isActive 
                      ? "text-text-primary font-bold shadow-[0_0_15px_var(--glow-cyan)]" 
                      : "text-text-secondary hover:text-text-primary hover:bg-text-primary/5"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-text-primary/10 border border-glass-border-bright rounded-full mix-blend-overlay"></div>
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Actions: CV & Theme */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle Orb */}
            <button
              onClick={toggleTheme}
              className="relative w-14 h-7 rounded-full glass-mist border border-glass-border flex items-center p-1 cursor-pointer group shadow-inner"
              aria-label="Toggle Theme"
            >
              <div 
                className={`absolute w-5 h-5 rounded-full bg-text-primary shadow-[0_0_10px_var(--glow-cyan)] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isDarkMode ? "translate-x-7" : "translate-x-0"
                }`}
              >
                {isDarkMode ? (
                  <Moon className="w-3 h-3 text-bg-base" />
                ) : (
                  <Sun className="w-3 h-3 text-bg-base" />
                )}
              </div>
            </button>
            
            <div className="w-[1px] h-4 bg-glass-border"></div>
            
            <a 
              href={profile.resumePath}
              download="Dawood-Hayat-Resume.pdf"
              aria-label="Download Dawood Hayat's resume PDF"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-pill px-4 py-2 rounded-full flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-text-primary hover:bg-text-primary/5 hover:text-accent-primary hover:shadow-[0_0_15px_var(--glow-cyan)] transition-all cursor-pointer group"
            >
              CV/RESUME
              <Download className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:text-accent-primary transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
}

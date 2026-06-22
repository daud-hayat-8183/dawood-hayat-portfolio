import React, { useState, useEffect } from "react";
import { House, CircleUserRound, Sparkles, FolderKanban, MessageCircle, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function BottomNav() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
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
    const sections = ["home", "about", "capabilities", "projects", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // Native smooth scroll handles anchor movement.
  };

  const navItems = [
    { name: "Home", path: "#home", id: "home", icon: <House className="w-5 h-5" /> },
    { name: "About", path: "#about", id: "about", icon: <CircleUserRound className="w-5 h-5" /> },
    { name: "Capabilities", path: "#capabilities", id: "capabilities", icon: <Sparkles className="w-5 h-5" /> },
    { name: "Projects", path: "#projects", id: "projects", icon: <FolderKanban className="w-5 h-5" /> },
    { name: "Contact", path: "#contact", id: "contact", icon: <MessageCircle className="w-5 h-5" /> }
  ];

  return (
    <div 
      className="fixed z-[60] lg:hidden left-0 w-full"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto w-full max-w-[400px] px-2">
        <nav className="glass-crystal rounded-full border border-glass-border-bright px-2 sm:px-3 py-2 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                title={`Go to ${item.name}`}
                aria-label={`Go to ${item.name}`}
                className={`relative w-10 sm:w-11 h-10 sm:h-11 flex items-center justify-center rounded-full transition-all duration-300 ${
                  isActive 
                    ? "text-accent-primary shadow-[inset_0_0_15px_var(--glow-cyan)] bg-text-primary/10" 
                    : "text-text-secondary hover:text-text-primary hover:bg-text-primary/5"
                }`}
              >
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-accent-primary animate-pulse" />
                )}
                {/* Wrap icon in a div that pushes it slightly up when active, making room for the dot */}
                <div className={`transition-transform duration-300 ${isActive ? "-translate-y-1" : ""}`}>
                  {item.icon}
                </div>
              </a>
            );
          })}

          <div className="w-[1px] h-8 bg-glass-border mx-1"></div>

          <button
            onClick={toggleTheme}
            title="Toggle theme"
            aria-label="Toggle theme"
            className="relative w-10 sm:w-11 h-10 sm:h-11 flex items-center justify-center rounded-full transition-all duration-300 text-text-secondary hover:text-text-primary hover:bg-text-primary/5 cursor-pointer"
          >
            <div className="transition-transform duration-500">
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
          </button>
        </nav>
      </div>
    </div>
  );
}

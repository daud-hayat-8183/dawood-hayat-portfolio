import React, { useState, useEffect } from "react";
import { ChevronRight, MessageSquare, Layers, Terminal } from "lucide-react";
import { projectsData, processSteps } from "../data";
import { useTheme } from "../context/ThemeContext";
import lightPortrait from "../assets/hero/pic-light-mode.png";
import darkPortrait from "../assets/hero/pic-dark-mode.png";

export default function Home() {
  const { isDarkMode } = useTheme();
  const [currentPktTime, setCurrentPktTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: "Asia/Karachi",
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit",
        hour12: false
      };
      setCurrentPktTime(d.toLocaleTimeString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const featuredProjects = projectsData.slice(0, 3);

  const getProjectAura = (categoryId: string) => {
    if (categoryId === "financial-health-risk-return-analysis") return "hover:shadow-[0_20px_60px_var(--glow-teal)] hover:border-accent-teal/30";
    if (categoryId === "imdb-movie-success-predictor") return "hover:shadow-[0_20px_60px_var(--glow-blue)] hover:border-accent-blue/30";
    if (categoryId === "solar-system-explorer") return "hover:shadow-[0_20px_60px_var(--glow-indigo)] hover:border-accent-indigo/30";
    return "hover:shadow-[0_20px_60px_var(--glow-cyan)] hover:border-accent-cyan/30";
  };

  const getProjectBgGlow = (categoryId: string) => {
    if (categoryId === "financial-health-risk-return-analysis") return "group-hover:bg-accent-teal/5";
    if (categoryId === "imdb-movie-success-predictor") return "group-hover:bg-accent-blue/5";
    if (categoryId === "solar-system-explorer") return "group-hover:bg-accent-indigo/5";
    return "group-hover:bg-accent-cyan/5";
  };

  return (
    <section id="home" className="animate-fade-in scroll-mt-24">
      {/* SECTION 1: HERO CONTAINER */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-8 pt-32 pb-16 lg:pt-40 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-4 items-center overflow-hidden">
        {/* Left Grid Section */}
        <div className="lg:col-span-5 text-left z-20 flex flex-col gap-6 animate-fade-in-up mt-8 lg:mt-0">
          <div className="inline-flex items-center gap-2 glass-pill px-3.5 py-1.5 rounded-full w-fit shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-semibold tracking-wider text-text-secondary uppercase">
              Open to internships & data opportunity
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-text-primary leading-[1.1] tracking-tight">
            Turning business data <br />
            <span className="font-editorial italic font-normal text-text-secondary">into decisions</span> & ideas <br />
            into <span className="font-editorial italic font-normal text-accent-secondary bg-accent-secondary/10 px-1 rounded-sm">interactive products.</span>
          </h1>

          <p className="text-sm md:text-base text-text-secondary font-sans leading-relaxed max-w-lg">
            I'm a <strong className="font-medium text-text-primary">Business Data Analyst & Digital Product Builder</strong> based in Islamabad. I analyze business & financial questions with statistical modeling, design high-integrity database systems, and build usable web applications that solve real-world problems.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a href="#projects" className="relative overflow-hidden bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-full py-3.5 px-6 text-xs font-semibold font-mono tracking-wider flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_var(--glow-cyan)] cursor-pointer group">
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>
              <span className="relative z-10 flex items-center gap-2">EXPLORE WORK PRODUCTS <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></span>
            </a>
            <a href="#contact" className="glass-pill text-text-primary rounded-full py-3.5 px-6 text-xs font-semibold font-mono tracking-wider flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_var(--glow-blue)] cursor-pointer hover:bg-text-primary/5 group">
              <span className="relative z-10 flex items-center gap-2">CHAT SECURELY <MessageSquare className="w-3.5 h-3.5 text-accent-primary group-hover:scale-110 transition-transform" /></span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-text-muted/20 mt-2">
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block">Core Approach</span>
              <span className="text-xs font-semibold text-text-primary font-sans mt-0.5 block">Analytics Driven</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block">Execution</span>
              <span className="text-xs font-semibold text-text-primary font-sans mt-0.5 block">SQL to React</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block">Focus</span>
              <span className="text-xs font-semibold text-text-primary font-sans mt-0.5 block">FinTech Growth</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block">Clock state</span>
              <span className="text-[10px] font-mono text-text-secondary mt-0.5 block truncate">
                {currentPktTime ? currentPktTime + " PKT" : "--:--:-- PKT"}
              </span>
            </div>
          </div>
        </div>

        {/* Central & Right Section (Hero Portrait Area Redesign) */}
        <div className="lg:col-span-7 relative flex justify-center items-center h-[500px] sm:h-[600px] lg:h-[700px] z-10 group/portrait-area">
          
          {/* Luminous Background Blooms */}
          <div className="absolute w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] rounded-full bg-accent-cyan/10 blur-[80px] -z-20 animate-pulse-slow group-hover/portrait-area:bg-accent-cyan/20 transition-colors duration-1000"></div>
          <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-accent-indigo/10 blur-[60px] translate-x-10 translate-y-10 -z-20 animate-aurora-drift group-hover/portrait-area:bg-accent-indigo/20 transition-colors duration-1000"></div>

          {/* Floral Liquid-Glass Rings */}
          <div className="absolute w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] rounded-full border-[1.5px] border-glass-border opacity-20 scale-[1.05] animate-orbit-1 -z-10 group-hover/portrait-area:scale-[1.1] transition-transform duration-1000"></div>
          <div className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full border border-glass-border opacity-30 scale-[1.15] animate-orbit-2 -z-10 rotate-12 group-hover/portrait-area:scale-[1.2] transition-transform duration-1000"></div>
          <div className="absolute w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] rounded-full glass-mist opacity-10 scale-[1.0] animate-orbit-3 -z-10 -rotate-12 group-hover/portrait-area:opacity-25 transition-opacity duration-1000"></div>
          <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full border border-accent-cyan/20 opacity-30 animate-pulse-slow -z-10 group-hover/portrait-area:border-accent-cyan/40 transition-colors duration-1000"></div>

          {/* Portrait Image — Rounded, Soft-Blended */}
          <div className="relative w-[300px] sm:w-[400px] lg:w-[480px] h-[450px] sm:h-[550px] lg:h-[650px] z-10 flex items-end justify-center group-hover/portrait-area:scale-[1.03] transition-transform duration-1000 pointer-events-none mt-10">
            
            {/* soft outer glow layer */}
            <div className="absolute inset-0 rounded-[42px] bg-accent-blue/20 blur-[50px] scale-[0.9] -z-10 transition-colors duration-700" />
            
            {/* liquid-glass border / halo layer */}
            <div className="absolute inset-[-2px] rounded-[44px] border-[1.5px] border-glass-border opacity-50 -z-10" />

            {/* portrait image container with rounded corners */}
            <div className="absolute inset-0 rounded-[42px] overflow-hidden bg-bg-deep/30" style={{ transform: 'translateZ(0)' }}>
              <img 
                className={`absolute top-0 left-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out portrait-mask ${isDarkMode ? "opacity-0" : "opacity-100"}`}
                src={lightPortrait} 
                alt="Dawood Hayat — Business Data Analyst, Light Mode portrait"
              />
              <img 
                className={`absolute top-0 left-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out portrait-mask ${isDarkMode ? "opacity-100" : "opacity-0"}`}
                src={darkPortrait} 
                alt="Dawood Hayat — Business Data Analyst, Dark Mode portrait"
              />
            </div>

            {/* soft foreground liquid-wave overlay */}
            <div className="absolute inset-0 rounded-[42px] pointer-events-none shadow-[inset_0_-60px_80px_-20px_var(--bg-base),inset_0_0_20px_rgba(255,255,255,0.05)] border border-glass-border-bright/30 mix-blend-overlay" />
          </div>

          {/* Orbiting Keyword Pills */}
          <div className="absolute top-[8%] right-[5%] sm:right-[10%] lg:right-[15%] glass-pill px-4 py-2 rounded-full flex items-center gap-2 animate-orbit-1 shadow-[0_0_15px_var(--glow-cyan)] z-20 cursor-default hover:scale-110 hover:shadow-[0_0_25px_var(--glow-cyan)] hover:[animation-play-state:paused] transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_var(--glow-cyan)]"></span>
            <span className="font-mono text-[10px] sm:text-xs font-bold text-text-primary">Python</span>
          </div>

          <div className="absolute bottom-[18%] left-[2%] sm:left-[5%] lg:left-[8%] glass-pill px-4 py-2 rounded-full flex items-center gap-2 animate-orbit-2 shadow-[0_0_15px_var(--glow-blue)] z-20 cursor-default hover:scale-110 hover:shadow-[0_0_25px_var(--glow-blue)] hover:[animation-play-state:paused] transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_8px_var(--glow-blue)]"></span>
            <span className="font-mono text-[10px] sm:text-xs font-bold text-text-primary">Oracle SQL</span>
          </div>

          <div className="absolute top-[32%] left-[0%] lg:-left-[5%] glass-pill px-4 py-2 rounded-full flex items-center gap-2 animate-orbit-3 shadow-[0_0_15px_var(--glow-indigo)] z-20 cursor-default hover:scale-110 hover:shadow-[0_0_25px_var(--glow-indigo)] hover:[animation-play-state:paused] transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-accent-indigo shadow-[0_0_8px_var(--glow-indigo)]"></span>
            <span className="font-mono text-[10px] sm:text-xs font-bold text-text-primary whitespace-nowrap">Financial Analysis</span>
          </div>

          <div className="absolute top-[52%] right-[0%] lg:-right-[5%] glass-pill px-4 py-2 rounded-full flex items-center gap-2 animate-orbit-1 shadow-[0_0_15px_var(--glow-teal)] z-20 cursor-default hover:scale-110 hover:shadow-[0_0_25px_var(--glow-teal)] hover:[animation-play-state:paused] transition-all duration-300" style={{ animationDelay: '-5s' }}>
            <span className="w-2 h-2 rounded-full bg-accent-teal shadow-[0_0_8px_var(--glow-teal)]"></span>
            <span className="font-mono text-[10px] sm:text-xs font-bold text-text-primary whitespace-nowrap">Predictive Modelling</span>
          </div>

          <div className="hidden sm:flex absolute bottom-[5%] right-[10%] sm:right-[15%] lg:right-[18%] glass-pill px-4 py-2 rounded-full items-center gap-2 animate-orbit-2 shadow-[0_0_15px_var(--glow-cyan)] z-20 cursor-default hover:scale-110 hover:shadow-[0_0_25px_var(--glow-cyan)] hover:[animation-play-state:paused] transition-all duration-300" style={{ animationDelay: '-8s' }}>
            <span className="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_var(--glow-cyan)]"></span>
            <span className="font-mono text-[10px] sm:text-xs font-bold text-text-primary">FinTech</span>
          </div>

          <div className="hidden sm:flex absolute top-[5%] left-[15%] sm:left-[20%] glass-pill px-3 py-1.5 rounded-full items-center gap-2 animate-orbit-3 shadow-[0_0_10px_var(--glow-indigo)] z-20 cursor-default hover:scale-110 hover:shadow-[0_0_20px_var(--glow-indigo)] hover:[animation-play-state:paused] transition-all duration-300 opacity-80" style={{ animationDelay: '-12s' }}>
            <span className="font-mono text-[9px] sm:text-[10px] font-bold text-text-secondary">Data Analytics</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTRO PRINCIPLE STATEMENT */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-8 py-16 text-center overflow-hidden">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">My Baseline Motto</span>
          <h2 className="text-3xl md:text-4xl font-semibold font-display text-text-primary leading-tight">
            I work where <span className="font-editorial italic font-normal text-accent-primary">business questions,</span> data, and digital products intersect.
          </h2>
          <div className="w-12 h-[1px] bg-text-muted/30 my-2" />
          <p className="text-sm md:text-base text-text-secondary leading-normal max-w-xl">
            Clean computation is useless if it is not grounded in realistic business context. I specialize in bridging academic statistics with live, interactive layouts.
          </p>
        </div>
      </section>

    </section>
  );
}

import React from "react";
import { TrendingUp, Database, Code, CheckCircle } from "lucide-react";
import { capabilityCategories } from "../data";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Capabilities() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section id="capabilities" ref={sectionRef} className="scroll-reveal scroll-mt-24 max-w-7xl mx-auto px-6 md:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block mb-1">Professional Scope</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary leading-tight">
            Capabilities
          </h2>
        </div>
        <div className="glass-panel p-6 rounded-[32px] max-w-md border border-glass-border relative group overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-[0_15px_40px_var(--glow-cyan)]">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[32px] shadow-[inset_0_0_30px_var(--glow-cyan)]" />
          
          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent-cyan" />
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest font-bold">Verified Practical Scope</span>
            </div>
            
            <p className="text-sm text-text-primary font-sans leading-relaxed">
              Curated skills backed directly by delivered academic projects, open-source repositories, financial-analysis work, predictive modelling, and deployed web experiences.
            </p>
            
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="px-2 py-1 rounded-md bg-text-primary/5 border border-glass-border text-[9px] font-mono text-text-secondary uppercase tracking-wide">Project-backed</span>
              <span className="px-2 py-1 rounded-md bg-text-primary/5 border border-glass-border text-[9px] font-mono text-text-secondary uppercase tracking-wide">Repository-based</span>
              <span className="px-2 py-1 rounded-md bg-text-primary/5 border border-glass-border text-[9px] font-mono text-text-secondary uppercase tracking-wide">Applied learning</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {capabilityCategories.map((cat, idx) => {
          const accentColor = idx % 4 === 0 ? "accent-cyan" : idx % 4 === 1 ? "accent-blue" : idx % 4 === 2 ? "accent-teal" : "accent-indigo";
          const glowColor = idx % 4 === 0 ? "var(--glow-cyan)" : idx % 4 === 1 ? "var(--glow-blue)" : idx % 4 === 2 ? "var(--glow-teal)" : "var(--glow-indigo)";

          return (
            <div 
              key={idx} 
              className={`glass-panel p-8 rounded-[32px] hover:-translate-y-3 transition-all duration-500 relative group overflow-hidden scroll-reveal-delay-${idx + 1}`}
            >
              {/* Dynamic hover glow based on category */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[32px]"
                style={{ boxShadow: `inset 0 0 40px ${glowColor}, 0 0 30px ${glowColor}` }}
              />
              
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${accentColor}/10 rounded-full blur-[40px] -z-10 group-hover:bg-${accentColor}/20 transition-colors duration-700`} />
              
              <div className={`w-12 h-12 rounded-full glass-pill flex items-center justify-center mb-6 text-${accentColor} group-hover:scale-110 transition-transform duration-300 shadow-xs relative z-10`}>
                {cat.icon === "analytics" && <TrendingUp className="w-5 h-5 drop-shadow-[0_0_8px_currentColor]" />}
                {cat.icon === "attach_money" && <div className="text-lg font-bold font-mono drop-shadow-[0_0_8px_currentColor]">$</div>}
                {cat.icon === "database" && <Database className="w-5 h-5 drop-shadow-[0_0_8px_currentColor]" />}
                {cat.icon === "code" && <Code className="w-5 h-5 drop-shadow-[0_0_8px_currentColor]" />}
              </div>

              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-text-primary mb-6 border-b border-text-muted/20 pb-2 relative z-10">
                {cat.title}
              </h3>

              <ul className="space-y-4 relative z-10">
                {cat.items.map((item, idy) => (
                  <li key={idy} className="flex items-start gap-3 text-sm text-text-secondary font-sans leading-tight">
                    <span className={`relative w-1.5 h-1.5 rounded-full bg-${accentColor} shrink-0 mt-1.5`}>
                      <span className={`absolute inset-0 rounded-full bg-${accentColor} animate-ping opacity-50`}></span>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

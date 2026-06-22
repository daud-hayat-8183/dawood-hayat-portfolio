import React from "react";
import { processSteps } from "../data";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Process() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section id="process" ref={sectionRef} className="scroll-reveal scroll-mt-24 py-16 relative max-w-7xl mx-auto px-6 md:px-8">
      <div className="text-center mb-10">
        <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block mb-1">Methodology</span>
        <h2 className="text-3xl md:text-4xl font-semibold font-display text-text-primary leading-tight">
          How I Work
        </h2>
        <div className="w-12 h-[1px] bg-text-muted/30 mx-auto mt-2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {processSteps.map((p, idx) => (
          <div key={idx} className={`glass-panel p-4.5 rounded-2xl relative group hover:-translate-y-2 hover:shadow-[0_0_25px_var(--glow-blue)] transition-all duration-400 scroll-reveal-delay-${idx + 1}`}>
            <span className="text-accent-primary font-mono text-lg font-bold block mb-2 drop-shadow-[0_0_5px_var(--glow-cyan)]">{p.step}</span>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary mb-1">{p.label}</h4>
            <p className="text-[11px] text-text-muted leading-normal font-sans">{p.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

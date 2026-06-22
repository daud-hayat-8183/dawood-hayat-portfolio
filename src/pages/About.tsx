import React from "react";
import { Award, Database, Layers, Code, Brain } from "lucide-react";
import { profile } from "../data";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function About() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section id="about" ref={sectionRef} className="scroll-reveal scroll-mt-24 max-w-7xl mx-auto px-6 md:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="glass-panel p-8 md:p-12 rounded-[36px] grid grid-cols-1 lg:grid-cols-12 gap-10 items-start overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-[80px] -z-10 transition-colors duration-1000 group-hover:bg-accent-indigo/10" />

        <div className="lg:col-span-4 flex flex-col justify-between h-full gap-4">
          <div>
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block mb-1">Introduction</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary">
              Curious about how data becomes <span className="font-editorial italic font-normal text-accent-cyan drop-shadow-[0_0_8px_var(--glow-cyan)]">useful.</span>
            </h2>
          </div>
          
          <div className="glass-pill p-4 rounded-2xl flex items-center gap-3 relative overflow-hidden group/award hover:shadow-[0_0_15px_var(--glow-cyan)] transition-shadow">
            <div className="absolute inset-0 bg-accent-cyan/5 opacity-0 group-hover/award:opacity-100 transition-opacity"></div>
            <Award className="w-8 h-8 text-accent-cyan shrink-0 drop-shadow-[0_0_8px_var(--glow-cyan)] relative z-10" />
            <div className="text-left relative z-10">
              <span className="block text-[8px] font-mono text-text-muted uppercase tracking-wider">Institution</span>
              <span className="text-xs font-semibold text-text-primary">{profile.university}</span>
              <span className="block text-[10px] text-text-secondary">Business Data Analytics</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
          <p className="text-base md:text-lg text-text-primary leading-relaxed">
            I am interested in the practical side of data: the moment when a dataset, a financial model, a database, or a prediction becomes useful for a decision.
          </p>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed">
            That interest has taken me from Python analysis and Oracle SQL to financial modelling, business systems, predictive modelling, and interactive web development. I am especially motivated by work that connects business understanding with analytical thinking and thoughtful digital execution.
          </p>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed">
            My long-term direction is where Business Analytics, Data Science, and FinTech meet.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-text-muted/20 mt-2">
            <div className="flex gap-3 group/skill cursor-default">
              <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan shrink-0 group-hover/skill:shadow-[0_0_15px_var(--glow-cyan)] transition-shadow">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary font-sans">Structured Datasets</h4>
                <p className="text-[11px] text-text-muted leading-normal mt-0.5">Crafting queries & logical relational architectures that store business records efficiently.</p>
              </div>
            </div>

            <div className="flex gap-3 group/skill cursor-default">
              <div className="w-8 h-8 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue shrink-0 group-hover/skill:shadow-[0_0_15px_var(--glow-blue)] transition-shadow">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary font-sans">Financial Valuation</h4>
                <p className="text-[11px] text-text-muted leading-normal mt-0.5">Evaluating operating margin paths, solvency metrics, and stock return volatility risk formulas.</p>
              </div>
            </div>

            <div className="flex gap-3 group/skill cursor-default">
              <div className="w-8 h-8 rounded-lg bg-accent-teal/10 border border-accent-teal/20 flex items-center justify-center text-accent-teal shrink-0 group-hover/skill:shadow-[0_0_15px_var(--glow-teal)] transition-shadow">
                <Code className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary font-sans">Full-Stack Prototyping</h4>
                <p className="text-[11px] text-text-muted leading-normal mt-0.5">Coordinating React frontends with Express API relays and Gemini intelligence layers.</p>
              </div>
            </div>

            <div className="flex gap-3 group/skill cursor-default">
              <div className="w-8 h-8 rounded-lg bg-accent-indigo/10 border border-accent-indigo/20 flex items-center justify-center text-accent-indigo shrink-0 group-hover/skill:shadow-[0_0_15px_var(--glow-indigo)] transition-shadow">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary font-sans">Predictive Pipelines</h4>
                <p className="text-[11px] text-text-muted leading-normal mt-0.5">Applying classification heuristics and logistic regressions to score prospective hit ratios.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

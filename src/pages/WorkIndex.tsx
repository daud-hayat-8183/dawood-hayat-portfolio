import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "../data";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface WorkIndexProps {
  onSelectProject: (id: string) => void;
}

export default function WorkIndex({ onSelectProject }: WorkIndexProps) {
  const sectionRef = useScrollReveal<HTMLElement>();
  const [activeFilter, setActiveFilter] = useState("All");

  const allCategories = ["All", "Financial Analytics", "Data Science", "Interactive Web Product"];
  
  const filteredProjects = activeFilter === "All"
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter || p.tags.includes(activeFilter));

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
    <section id="projects" ref={sectionRef} className="scroll-reveal scroll-mt-24 max-w-7xl mx-auto px-6 md:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6">
        <div>
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block mb-1">Selected Portfolios</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary leading-tight">
            Selected Work
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mt-2 max-w-lg">
            Projects built around analysis, systems, and useful experiences.
          </p>
        </div>

        {/* Dynamic Category Filters */}
        <div className="flex flex-wrap gap-1.5">
          {allCategories.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeFilter === filter
                  ? "bg-text-primary text-bg-base shadow-[0_0_15px_var(--glow-cyan)] scale-105"
                  : "glass-pill text-text-secondary hover:text-text-primary hover:bg-text-primary/5 hover:scale-105"
              }`}
            >
              {filter === "All" ? "All Work" : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <div 
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelectProject(project.id); }}
            className={`glass-panel rounded-[32px] overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-3 transition-all duration-500 h-full scroll-reveal-delay-${idx + 1} ${getProjectAura(project.id)}`}
          >
            <div className={`h-48 p-4 border-b border-glass-border relative transition-colors duration-500 bg-text-primary/5 ${getProjectBgGlow(project.id)}`}>
              <div className="w-full h-full glass-mist rounded-2xl overflow-hidden relative shadow-inner flex items-center justify-center transition-all duration-500 border border-glass-border">
                <div className="absolute top-0 left-0 w-full h-6 bg-bg-base/50 backdrop-blur-md flex items-center px-3 gap-1 border-b border-glass-border z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-[8px] font-mono text-text-muted ml-2">localhost:3000?project={project.id}</span>
                </div>
                <img 
                  className="w-full h-full object-cover pt-6 group-hover:scale-[1.06] transition-transform duration-700"
                  src={project.imageUrl || ''} 
                  alt={project.title}
                  loading="lazy"
                />
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow justify-between relative z-10">
              <div>
                <span className="text-[9px] font-mono font-semibold uppercase text-text-muted tracking-widest block mb-1">
                  {project.category}
                </span>
                <h3 className="text-base font-semibold text-text-primary font-display leading-snug group-hover:text-accent-cyan transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-text-muted leading-normal mt-2.5 max-w-sm">
                  {project.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-text-muted/20 flex flex-wrap justify-between items-center gap-2">
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((t, tidx) => (
                    <span key={tidx} className="px-2 py-0.5 glass-pill text-[9px] font-mono rounded-md text-text-secondary uppercase">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-mono font-medium text-accent-cyan inline-flex items-center gap-0.5 group-hover:translate-x-1 transition-transform drop-shadow-[0_0_5px_var(--glow-cyan)]">
                  Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
         <span className="text-xs text-text-muted font-sans italic">More work is being documented.</span>
      </div>
    </section>
  );
}

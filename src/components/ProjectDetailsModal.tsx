import React, { useState, useEffect, useRef } from "react";
import { Project } from "../data";
import { X, Sparkles, Database, Code, BookOpen, CheckCircle, Github, ExternalLink } from "lucide-react";
import { FinancialRatioSimulator, IMDBCalculatorSimulator, CosmosExplorerWidget } from "./InteractiveSimulators";

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<"narrative" | "playground">("narrative");
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap and Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    
    // Prevent background scrolling
    document.body.style.overflow = "hidden";
    
    // Auto-focus modal for accessibility
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  // Dynamically set modal theme glow based on project
  const getProjectAccent = () => {
    if (project.id === "financial-health-risk-return-analysis") return { color: "text-accent-teal", bg: "bg-accent-teal", glow: "var(--glow-teal)" };
    if (project.id === "imdb-movie-success-predictor") return { color: "text-accent-blue", bg: "bg-accent-blue", glow: "var(--glow-blue)" };
    if (project.id === "solar-system-explorer") return { color: "text-accent-indigo", bg: "bg-accent-indigo", glow: "var(--glow-indigo)" };
    return { color: "text-accent-cyan", bg: "bg-accent-cyan", glow: "var(--glow-cyan)" };
  };

  const accent = getProjectAccent();

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6 bg-bg-deep/80 backdrop-blur-xl animate-fade-in overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl glass-crystal border border-glass-border-bright p-6 md:p-8 animate-scale-up outline-none"
        style={{ boxShadow: `inset 0 1px 0 var(--glass-inner-light), 0 30px 80px var(--shadow-depth), 0 0 60px ${accent.glow}` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 glass-pill hover:bg-text-primary/5 rounded-full text-text-primary hover:text-red-500 transition-all shadow-sm cursor-pointer hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] z-50"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Header */}
        <div className="mb-6 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <span className={`text-xs font-mono font-medium tracking-widest ${accent.color} uppercase ${accent.bg}/10 border border-glass-border px-3 py-1 rounded-full inline-block drop-shadow-[0_0_5px_currentColor]`}>
              {project.category}
            </span>
            <div className="flex gap-2">
              {(project.githubUrl || project.id === 'imdb-movie-success-predictor') && (
                <a 
                  href={project.githubUrl || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-pill p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-text-primary/10 transition-colors shadow-sm"
                  aria-label="View Source on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {(project.demoUrl || project.link || project.id === 'solar-system-explorer') && (
                <a 
                  href={project.demoUrl || project.link || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-pill p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-text-primary/10 transition-colors shadow-sm"
                  aria-label="View Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
          <h3 id="modal-title" className="text-2xl md:text-3xl font-bold font-display text-text-primary leading-tight">
            {project.title}
          </h3>
          <p className="text-sm md:text-base text-text-secondary mt-2 max-w-2xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Metrics Grid */}
        {project.metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-4 glass-mist rounded-2xl relative z-10">
            {project.metrics.map((metric, i) => (
              <div key={i} className="text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block">
                  {metric.label}
                </span>
                <span className={`text-sm font-semibold text-text-primary font-sans block mt-0.5`}>
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab System Selector */}
        <div className="flex border-b border-text-muted/20 mb-6 gap-2 relative z-10">
          <button
            onClick={() => setActiveTab("narrative")}
            className={`pb-3 text-xs uppercase font-mono tracking-wider font-semibold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "narrative"
                ? `border-accent-cyan text-text-primary drop-shadow-[0_0_5px_var(--glow-cyan)]`
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Case Narrative
          </button>
          <button
            onClick={() => setActiveTab("playground")}
            className={`pb-3 text-xs uppercase font-mono tracking-wider font-semibold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "playground"
                ? `border-accent-blue text-text-primary drop-shadow-[0_0_5px_var(--glow-blue)]`
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Live Simulator
          </button>
        </div>

        {/* TAB 1: CASE STUDY NARRATIVE */}
        {activeTab === "narrative" && (
          <div className="space-y-6 text-sm text-text-secondary leading-relaxed font-sans animate-fade-in relative z-10">
            {/* Ground Question */}
            <div className="glass-panel p-5 rounded-2xl">
              <div className={`flex items-center gap-2 ${accent.color} font-semibold uppercase font-mono text-xs tracking-wider mb-2 drop-shadow-[0_0_5px_currentColor]`}>
                <Sparkles className="w-4 h-4 shrink-0" />
                The Business / Analytical Question
              </div>
              <p className="text-text-primary font-medium text-base">
                "{project.fullNarrative.question}"
              </p>
            </div>

            {/* Side-by-side challenges & methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-mist p-5 rounded-2xl">
                <h5 className="font-semibold text-text-primary flex items-center gap-2 text-xs uppercase font-mono tracking-widest mb-2">
                  <Database className="w-4 h-4 text-text-muted" />
                  Messy Data Challenge
                </h5>
                <p className="text-xs text-text-secondary">
                  {project.fullNarrative.challenge}
                </p>
              </div>

              <div className="glass-mist p-5 rounded-2xl">
                <h5 className="font-semibold text-text-primary flex items-center gap-2 text-xs uppercase font-mono tracking-widest mb-2">
                  <Code className="w-4 h-4 text-text-muted" />
                  Analytical Methodology
                </h5>
                <p className="text-xs text-text-secondary">
                  {project.fullNarrative.method}
                </p>
              </div>
            </div>

            {/* The Solution */}
            <div>
              <h4 className="text-xs uppercase font-mono tracking-wider text-text-muted font-bold mb-2">
                The Delivered Solution
              </h4>
              <p className={`p-4 ${accent.bg}/5 text-text-primary border border-glass-border rounded-2xl shadow-inner`}>
                {project.fullNarrative.solution}
              </p>
            </div>

            {/* Key Learnings */}
            <div>
              <h4 className="text-xs uppercase font-mono tracking-wider text-text-muted font-bold mb-3">
                Professional Takeaways & Learnings
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.fullNarrative.learnings.map((learning, i) => (
                  <li 
                    key={i} 
                    className="p-3 glass-mist rounded-xl flex items-start gap-2 text-xs text-text-secondary hover:-translate-y-1 transition-transform"
                  >
                    <CheckCircle className={`w-4 h-4 ${accent.color} shrink-0 mt-0.5 drop-shadow-[0_0_3px_currentColor]`} />
                    <span>{learning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: PLAYGROUND SIMULATORS */}
        {activeTab === "playground" && (
          <div className="animate-fade-in relative z-10">
            <p className="text-xs text-text-secondary mb-3 bg-accent-blue/10 border border-glass-border p-3 rounded-lg flex items-center gap-2 leading-relaxed shadow-inner">
              <Sparkles className="w-4 h-4 text-accent-blue shrink-0 drop-shadow-[0_0_5px_var(--glow-blue)]" />
              <span>
                <strong>Recruiter Quick Test:</strong> Play with this simulated model environment to see how Dawood maps operational criteria into clear digital layouts.
              </span>
            </p>

            {project.id === "financial-health-risk-return-analysis" && <FinancialRatioSimulator />}
            {project.id === "imdb-movie-success-predictor" && <IMDBCalculatorSimulator />}
            {project.id === "solar-system-explorer" && <CosmosExplorerWidget />}
          </div>
        )}

        {/* Quick Footer Action Row */}
        <div className="flex items-center justify-between border-t border-text-muted/20 pt-5 mt-6 relative z-10">
          <span className="text-[10px] font-mono text-text-muted">
            Dawood Hayat Case Document
          </span>
          <button
            onClick={onClose}
            className="text-xs font-mono text-text-primary bg-text-primary/10 hover:bg-text-primary/20 hover:shadow-[0_0_10px_var(--glow-cyan)] px-4 py-2 rounded-xl cursor-pointer transition-all"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
}

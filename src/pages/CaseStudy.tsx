import React, { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projectsData, Project } from "../data";

export default function CaseStudy({ id }: { id: string }) {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const found = projectsData.find(p => p.id === id);
    if (found) setProject(found);
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold">Project Not Found</h2>
          <a href="#/work" className="text-teal-700 hover:underline mt-4 inline-block">Return to Work</a>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-6 md:px-8 pt-32 pb-16 lg:pt-40 lg:pb-24">
      <a href="#/work" className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-500 hover:text-teal-700 transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> BACK TO WORK
      </a>

      <div className="mb-12">
        <span className="text-[10px] font-mono font-semibold uppercase text-slate-400 tracking-widest block mb-2">
          {project.category}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold font-display text-ink-950 leading-tight mb-4">
          {project.title}
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {project.tags.map((t, idx) => (
            <span key={idx} className="px-3 py-1 bg-white/60 text-[10px] font-mono rounded-md text-slate-600 border border-slate-200 uppercase tracking-wider">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-slate-200/50 rounded-[32px] overflow-hidden relative shadow-xs border border-black/5 flex items-center justify-center mb-16">
        <img 
          src={project.imageUrl || ''} 
          alt={project.imageAlt} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-8 space-y-12">
          <section>
            <h2 className="text-xl font-display font-bold text-ink-950 mb-4 border-b border-slate-200 pb-2">The Question</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{project.fullNarrative.question}</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-ink-950 mb-4 border-b border-slate-200 pb-2">The Challenge</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{project.fullNarrative.challenge}</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-ink-950 mb-4 border-b border-slate-200 pb-2">The Method</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{project.fullNarrative.method}</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-ink-950 mb-4 border-b border-slate-200 pb-2">The Solution</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{project.fullNarrative.solution}</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-ink-950 mb-4 border-b border-slate-200 pb-2">What I Learned</h2>
            <ul className="space-y-3">
              {project.fullNarrative.learnings.map((learning, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                  <span>{learning}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="md:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 mb-4">Project Metrics</h3>
            <ul className="space-y-4">
              {project.metrics?.map((m, i) => (
                <li key={i}>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">{m.label}</span>
                  <span className="text-sm font-semibold text-ink-950">{m.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-3">
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Repository link pending final assets."); }} className="flex items-center gap-3 text-xs font-mono font-medium text-slate-700 hover:text-teal-700 transition-colors p-2 hover:bg-white/50 rounded-lg">
              <Github className="w-4 h-4" /> View Repository
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Live demo link pending final deployment."); }} className="flex items-center gap-3 text-xs font-mono font-medium text-slate-700 hover:text-blue-700 transition-colors p-2 hover:bg-white/50 rounded-lg">
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

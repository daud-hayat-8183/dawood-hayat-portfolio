import React from "react";
import { Github, Linkedin } from "lucide-react";
import { profile } from "../data";

export default function Footer() {
  return (
    <footer className="w-full mt-12 rounded-t-[40px] border-t border-glass-border glass-panel relative overflow-hidden group">
      {/* Subtle ambient footer glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-32 bg-accent-cyan/5 blur-[80px] -z-10 group-hover:bg-accent-cyan/10 transition-colors duration-1000"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-editorial italic text-lg text-text-primary">{profile.displayName}</span>
          <span className="text-[10px] font-mono text-text-muted">
            © {new Date().getFullYear()} Dawood Hayat. Built with intention.
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-xs font-mono items-center">
          <a href="#projects" className="text-text-muted hover:text-accent-cyan tracking-wide transition-colors hover:drop-shadow-[0_0_5px_var(--glow-cyan)]">Work</a>
          <a href="#about" className="text-text-muted hover:text-accent-cyan tracking-wide transition-colors hover:drop-shadow-[0_0_5px_var(--glow-cyan)]">About</a>
          <a href="#capabilities" className="text-text-muted hover:text-accent-cyan tracking-wide transition-colors hover:drop-shadow-[0_0_5px_var(--glow-cyan)]">Capabilities</a>
          <a href="#contact" className="text-text-muted hover:text-accent-cyan tracking-wide transition-colors hover:drop-shadow-[0_0_5px_var(--glow-cyan)]">Contact</a>
          <div className="w-[1px] h-3 bg-glass-border hidden md:block" />
          {profile.githubUrl && (
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="text-text-muted hover:text-accent-cyan transition-colors">
              <Github className="w-4 h-4" />
            </a>
          )}
          {profile.linkedinUrl && (
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="text-text-muted hover:text-accent-cyan transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

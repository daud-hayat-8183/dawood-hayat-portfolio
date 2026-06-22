import React from "react";
import { MessageSquare, MapPin, Mail, Clock } from "lucide-react";
import ContactForm from "../components/ContactForm";
import { profile } from "../data";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Contact() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section id="contact" ref={sectionRef} className="scroll-reveal scroll-mt-24 max-w-7xl mx-auto px-6 md:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24 relative">
      <div className="absolute top-40 left-0 w-96 h-96 bg-accent-cyan/5 blur-[100px] -z-10 rounded-full animate-glow-breathe"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div className="lg:col-span-5 text-left space-y-6">
          <div>
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block mb-1">Contact</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary leading-tight">
              Let's turn a question into something <span className="font-editorial italic font-normal text-accent-cyan drop-shadow-[0_0_8px_var(--glow-cyan)]">useful.</span>
            </h2>
          </div>
          
          <p className="text-sm text-text-secondary leading-relaxed max-w-md font-sans">
            Whether you want to discuss an internship, a data project, a business problem, a financial-analysis idea, or a digital product, I would be glad to hear from you.
          </p>

          <div className="space-y-4 pt-4 border-t border-text-muted/20 max-w-md">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-accent-cyan shrink-0 drop-shadow-[0_0_5px_var(--glow-cyan)]" />
              <span className="text-xs text-text-secondary font-mono">{profile.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-accent-cyan shrink-0 drop-shadow-[0_0_5px_var(--glow-cyan)]" />
              <span className="text-xs text-text-secondary font-mono truncate">{profile.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-accent-cyan shrink-0 drop-shadow-[0_0_5px_var(--glow-cyan)]" />
              <span className="text-xs text-text-secondary font-mono">Available for Remote / Hybrid positions</span>
            </div>
          </div>

          <div className="pt-6 space-y-4">
            {/* WhatsApp Card */}
            <div className="glass-panel p-5 rounded-2xl border border-glass-border shadow-xs hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-green-500/10 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1">Message on WhatsApp</h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-3">For quick project discussions and opportunities.</p>
                  <a 
                    href="https://wa.me/923295129250?text=Hi%20Dawood%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%20or%20opportunity%20with%20you."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-accent-cyan hover:underline uppercase"
                  >
                    Open WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="glass-panel p-5 rounded-2xl border border-glass-border shadow-xs hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1">Email Me</h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-3">For detailed inquiries, collaboration, or project discussions.</p>
                  <a 
                    href="mailto:daudhayat51@gmail.com?subject=Portfolio%20Inquiry%20%E2%80%94%20Dawood%20Hayat&body=Hi%20Dawood%2C%0D%0A%0D%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%3A%0D%0A%0D%0A%5BWrite%20your%20message%20here%5D"
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-accent-cyan hover:underline uppercase"
                  >
                    Compose Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "collaboration",
    budgetRange: "N/A",
    message: "",
    botcheck: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message. Please try again.');
      }

      setFormSubmitted(true);
      setFormData(prev => ({ ...prev, email: "", message: "", botcheck: "" }));
    } catch (error: any) {
      setFormError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = "w-full text-xs p-3 rounded-xl glass-input font-sans transition-all duration-300";

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden group">
      {/* Subtle background glow for depth */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/5 blur-[50px] -z-10 group-hover:bg-accent-cyan/10 transition-colors duration-700 pointer-events-none"></div>

      <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary mb-5">
        Write a message
      </h3>

      {formSubmitted ? (
        <div className="glass-mist border border-accent-cyan/30 p-6 rounded-2xl text-center flex flex-col items-center gap-3 animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-accent-cyan/5 pointer-events-none"></div>
          <CheckCircle className="w-8 h-8 text-accent-cyan drop-shadow-[0_0_10px_var(--glow-cyan)]" />
          <h4 className="text-sm font-bold text-text-primary font-sans">Message sent — thank you.</h4>
          <p className="text-xs text-text-secondary leading-normal max-w-xs">
            I will reply as soon as I can.
          </p>
          <button 
            onClick={() => setFormSubmitted(false)}
            className="mt-2 text-[10px] uppercase font-mono tracking-widest text-accent-cyan hover:underline relative z-10 cursor-pointer"
          >
            Submit Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {formError && (
            <div className="p-3 mb-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-mono">
              {formError}
            </div>
          )}
          
          <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="botcheck">Don't fill this out if you're human:</label>
            <input 
              type="text" 
              id="botcheck" 
              name="botcheck" 
              value={formData.botcheck} 
              onChange={(e) => setFormData(prev => ({ ...prev, botcheck: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="contact-name" className="block text-[10px] font-mono uppercase tracking-widest text-text-muted mb-1.5">Your Name</label>
            <input 
              id="contact-name"
              type="text" 
              required
              maxLength={80}
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your name" 
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-[10px] font-mono uppercase tracking-widest text-text-muted mb-1.5">Your Email</label>
            <input 
              id="contact-email"
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="you@example.com" 
              className={inputClasses}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="contact-type" className="block text-[10px] font-mono uppercase tracking-widest text-text-muted mb-1.5">Project Type</label>
              <select
                id="contact-type"
                value={formData.projectType}
                onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                className={`${inputClasses} cursor-pointer`}
              >
                <option value="internship">Internship Role</option>
                <option value="collaboration">Collaboration Idea</option>
                <option value="data-modeling">Data Project</option>
                <option value="web-product">Web Product</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact-budget" className="block text-[10px] font-mono uppercase tracking-widest text-text-muted mb-1.5">Budget Range</label>
              <select
                id="contact-budget"
                value={formData.budgetRange}
                onChange={(e) => setFormData(prev => ({ ...prev, budgetRange: e.target.value }))}
                className={`${inputClasses} cursor-pointer`}
              >
                <option value="N/A">N/A (Job Posting)</option>
                <option value="$1k - $3k">$1,000 - $3,000</option>
                <option value="$3k+">$3,000+</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-[10px] font-mono uppercase tracking-widest text-text-muted mb-1.5">Your Message</label>
            <textarea 
              id="contact-message"
              rows={4} 
              required
              minLength={10}
              maxLength={2000}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Hi Dawood, let's explore..." 
              className={`${inputClasses} resize-none`}
            />
          </div>

          {/* Privacy Notice */}
          <div className="flex items-start gap-2 pt-1">
            <input type="checkbox" required className="mt-0.5 accent-accent-cyan" id="consent" />
            <label htmlFor="consent" className="text-[10px] text-text-muted leading-tight cursor-pointer">
              I agree to the privacy notice. My details are used only to respond to this inquiry.
            </label>
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="glass-btn-primary w-full py-3.5 px-4 text-xs font-bold font-mono tracking-wider flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span className="relative z-10">{submitting ? "Sending..." : "SEND MESSAGE"}</span>
          </button>
        </form>
      )}
    </div>
  );
}

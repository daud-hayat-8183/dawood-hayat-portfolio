import React, { useEffect, useState } from "react";

export default function StartupReveal() {
  const [stage, setStage] = useState<"initial" | "line" | "expand" | "done">("initial");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPrefersReducedMotion(isReduced);

    if (isReduced) {
      // Fast, simple fade for accessibility
      const t = setTimeout(() => setStage("expand"), 100);
      const t2 = setTimeout(() => setStage("done"), 400);
      return () => { clearTimeout(t); clearTimeout(t2); };
    }

    // Cinematic CRT startup sequence
    const t1 = setTimeout(() => setStage("line"), 200);
    const t2 = setTimeout(() => setStage("expand"), 500);
    const t3 = setTimeout(() => setStage("done"), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (stage === "done") return null;

  if (prefersReducedMotion) {
    return (
      <div 
        className={`fixed inset-0 z-[100] bg-bg-deep transition-opacity duration-300 ease-in-out pointer-events-none ${stage === 'expand' ? 'opacity-0' : 'opacity-100'}`}
      />
    );
  }

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center pointer-events-none overflow-hidden transition-all duration-700 ease-in-out ${stage === "expand" ? "opacity-0 backdrop-blur-none" : "opacity-100 backdrop-blur-md"} bg-bg-deep`}
    >
      {/* CRT Glowing Line */}
      <div 
        className={`relative bg-text-primary rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          stage === "initial" ? "w-0 h-[2px] opacity-0" :
          stage === "line" ? "w-[60vw] md:w-[40vw] h-[2px] opacity-100 shadow-[0_0_30px_5px_var(--glow-cyan)]" :
          "w-[120vw] h-[120vh] opacity-0 shadow-[0_0_100px_50px_var(--glow-blue)]"
        }`}
      />
      
      {/* Scanline / Grain Texture Overlay */}
      <div className={`absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay transition-opacity duration-500 ${stage === "expand" ? "opacity-0" : ""}`} 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
}

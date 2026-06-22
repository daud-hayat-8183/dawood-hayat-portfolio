import React from "react";

/**
 * Decorative floating glass droplets placed at section boundaries.
 * Pure CSS animation, no JS runtime cost. Hidden on mobile via CSS class.
 */
export default function WaterDroplets() {
  return (
    <div className="pointer-events-none" aria-hidden="true">
      {/* Hero → About boundary */}
      <div className="water-droplet water-droplet--xl hidden md:block animate-droplet-float-1" style={{ position: "fixed", top: "18%", left: "8%", opacity: 0.22 }} />
      <div className="water-droplet water-droplet--md hidden md:block animate-droplet-float-2" style={{ position: "fixed", top: "25%", right: "6%", opacity: 0.18 }} />
      <div className="water-droplet water-droplet--sm hidden md:block animate-droplet-float-3" style={{ position: "fixed", top: "42%", left: "4%", opacity: 0.15 }} />

      {/* Mid-page accent */}
      <div className="water-droplet water-droplet--lg hidden md:block animate-droplet-float-2" style={{ position: "fixed", top: "55%", right: "5%", opacity: 0.20, animationDelay: "-8s" }} />
      <div className="water-droplet water-droplet--sm hidden md:block animate-droplet-float-1" style={{ position: "fixed", top: "65%", left: "12%", opacity: 0.16, animationDelay: "-12s" }} />

      {/* Footer area */}
      <div className="water-droplet water-droplet--md hidden md:block animate-droplet-float-3" style={{ position: "fixed", bottom: "10%", right: "10%", opacity: 0.18, animationDelay: "-5s" }} />
      <div className="water-droplet water-droplet--sm hidden md:block animate-droplet-float-1" style={{ position: "fixed", bottom: "15%", left: "6%", opacity: 0.14, animationDelay: "-15s" }} />
    </div>
  );
}

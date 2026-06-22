import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WorkIndex from "./pages/WorkIndex";
import About from "./pages/About";
import Capabilities from "./pages/Capabilities";
import Contact from "./pages/Contact";
import Process from "./components/Process";
import ProjectDetailsModal from "./components/ProjectDetailsModal";
import WaterDroplets from "./components/WaterDroplets";
import StartupReveal from "./components/StartupReveal";
import { projectsData } from "./data";

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Handle URL query parameter ?project=... to open modal directly
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const projectId = params.get("project");
      if (projectId) {
        setSelectedProjectId(projectId);
      } else {
        setSelectedProjectId(null);
      }
    };

    // Run on mount
    handleUrlChange();

    // Listen for history changes if we use pushState
    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  const openProjectModal = (id: string) => {
    const newUrl = window.location.pathname + "?project=" + id + window.location.hash;
    window.history.pushState({ path: newUrl }, "", newUrl);
    setSelectedProjectId(id);
  };

  const closeProjectModal = () => {
    const newUrl = window.location.pathname + window.location.hash;
    window.history.pushState({ path: newUrl }, "", newUrl);
    setSelectedProjectId(null);
  };

  const selectedProject = selectedProjectId 
    ? projectsData.find(p => p.id === selectedProjectId) 
    : null;

  return (
    <div id="portfolio-root" className="relative text-text-primary min-h-screen selection:bg-accent-primary/20 selection:text-text-primary flex flex-col">
      {/* ── Living Ambient Background Layers ── */}
      <div className="aurora-bg" />
      <div className="aurora-caustic-layer" />
      <div className="aurora-noise-layer" />

      {/* ── Startup CRT Animation ── */}
      <StartupReveal />

      {/* ── Decorative Water Droplets ── */}
      <WaterDroplets />

      {/* ── Global Navigation ── */}
      <Navigation />

      {/* ── Single Page Composed Layout ── */}
      <main className="flex-grow">
        <Home />

        <div className="section-wave my-4" />
        <About />

        <div className="section-wave my-4" />
        <Capabilities />

        <div className="section-wave my-4" />
        <WorkIndex onSelectProject={openProjectModal} />

        <div className="section-wave my-4" />
        <Process />

        <div className="section-wave my-4" />
        <Contact />
      </main>

      {/* ── Global Footer ── */}
      <Footer />

      {/* ── Modal Overlay System ── */}
      {selectedProject && (
        <ProjectDetailsModal 
          project={selectedProject} 
          onClose={closeProjectModal} 
        />
      )}
    </div>
  );
}

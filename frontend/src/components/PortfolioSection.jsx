import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../services/api";

const PortfolioSection = () => {
  const Projects = [
    {
      id: 1,
      number: "01",
      title: "Blockchain-Based Medical Records System (EmersBlock)",
      description: "A blockchain-based system for secure and efficient medical record management. This is my final year project at KsTU. I'm currently working on it.",
      icon: "fas fa-hospital"
    },
    {
      id: 2,
      number: "02",
      title: "School Management System",
      description: "A comprehensive platform for managing school operations, including student enrollment, attendance, and grading. It is for basic school management.",
      icon: "fas fa-briefcase"
    },
    {
      id: 3,
      number: "03",
      title: "SaaS Cybersecurity Platform (CyberRest)",
      description: "A SaaS platform for cybersecurity solutions, including threat detection, vulnerability assessment, and incident response.",
      icon: "fas fa-shield-alt"
    }
  ];

  const [selectedProject, setSelectedProject] = useState(null);

  const { data: apiProjects, isLoading: loading, error: queryError, refetch: fetchProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await getProjects();
      return response.data;
    }
  });

  const projects = Array.isArray(apiProjects) ? apiProjects : (apiProjects?.results || Projects);
  const error = queryError ? queryError.message : null;

  const handleViewProject = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <section id="portfolio" className="terminal-section" style={{ borderTop: "1px solid var(--term-border)" }}>
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-header-cmd">
            <span style={{ color: "var(--term-cyan)" }}>$</span>
            <span style={{ color: "var(--term-white)" }}> ls -la </span>
            <span style={{ color: "var(--term-green)" }}>~/projects/</span>
          </div>
          <div className="flex justify-center mt-8">
            <i className="fas fa-spinner fa-spin" style={{ color: "var(--term-green)", fontSize: "1.5rem" }}></i>
            <span style={{ color: "var(--term-gray)", marginLeft: "12px", fontSize: "0.85rem" }}>Loading directory listing...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className="terminal-section" style={{ borderTop: "1px solid var(--term-border)" }}>
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-header-cmd">
            <span style={{ color: "var(--term-cyan)" }}>$</span>
            <span style={{ color: "var(--term-white)" }}> ls -la </span>
            <span style={{ color: "var(--term-green)" }}>~/projects/</span>
          </div>
          <div
            style={{
              padding: "16px",
              background: "rgba(255, 51, 51, 0.05)",
              border: "1px solid rgba(255, 51, 51, 0.2)",
              borderRadius: "4px",
              marginTop: "16px",
            }}
          >
            <p style={{ color: "var(--term-red)", fontSize: "0.85rem" }}>
              <i className="fas fa-exclamation-triangle" style={{ marginRight: "8px" }}></i>
              Error: {error}
            </p>
            <button
              onClick={fetchProjects}
              className="terminal-btn"
              style={{ marginTop: "12px", borderColor: "var(--term-red-dim)", color: "var(--term-red)" }}
            >
              <span>&gt;</span> retry --force
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="terminal-section" style={{ borderTop: "1px solid var(--term-border)" }}>
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="section-header-cmd">
          <span style={{ color: "var(--term-cyan)" }}>haadi@cloud</span>
          <span style={{ color: "var(--term-white)" }}>:</span>
          <span style={{ color: "var(--term-amber)" }}>~</span>
          <span style={{ color: "var(--term-white)" }}>$ </span>
          <span style={{ color: "var(--term-white)" }}>ls </span>
          <span style={{ color: "var(--term-amber)" }}>-la </span>
          <span style={{ color: "var(--term-green)" }}>~/projects/</span>
        </div>

        <div className="text-center mb-8">
          <p style={{ color: "var(--term-gray)", fontSize: "0.8rem" }}>
            total {projects.length} — showcasing impactful work
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center" style={{ color: "var(--term-gray)", fontSize: "0.85rem" }}>
            <i className="fas fa-folder-open" style={{ marginRight: "8px" }}></i>
            Directory empty. Add projects through the admin panel.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className="terminal-window"
                style={{ cursor: "pointer" }}
                onClick={() => handleViewProject(project)}
              >
                <div className="terminal-titlebar" style={{ padding: "8px 12px" }}>
                  <div className="terminal-dots" style={{ gap: "4px" }}>
                    <span className="terminal-dot red" style={{ width: "8px", height: "8px" }}></span>
                    <span className="terminal-dot yellow" style={{ width: "8px", height: "8px" }}></span>
                    <span className="terminal-dot green" style={{ width: "8px", height: "8px" }}></span>
                  </div>
                  <span className="terminal-title" style={{ fontSize: "0.65rem" }}>
                    project_{project.number || String(idx + 1).padStart(2, '0')}/
                  </span>
                </div>
                <div className="terminal-body" style={{ padding: "16px 20px" }}>
                  {/* Directory listing style */}
                  <div style={{ fontSize: "0.7rem", color: "var(--term-gray)", marginBottom: "12px", fontFamily: "var(--term-font)" }}>
                    drwxr-xr-x  {project.number || String(idx + 1).padStart(2, '0')}  haadi  devops
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4" style={{ padding: "20px 0" }}>
                    <i
                      className={`${project.icon || 'fas fa-code'}`}
                      style={{
                        fontSize: "2.5rem",
                        color: "var(--term-green)",
                        textShadow: "0 0 15px rgba(0, 255, 65, 0.3)",
                      }}
                    ></i>
                  </div>

                  <h3 className="glow-green" style={{ color: "var(--term-green)", fontSize: "0.95rem", fontWeight: "600", marginBottom: "8px" }}>
                    {project.title}
                  </h3>

                  <p style={{ color: "var(--term-gray)", fontSize: "0.8rem", lineHeight: "1.6", marginBottom: "16px" }}>
                    {project.description}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewProject(project);
                    }}
                    className="terminal-btn cyan"
                    style={{ width: "100%", justifyContent: "center", fontSize: "0.75rem", padding: "8px 16px" }}
                  >
                    <span>&gt;</span> cat README.md
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="terminal-modal-overlay" onClick={closeModal}>
          <div
            className="terminal-window"
            style={{ maxWidth: "640px", width: "100%", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="terminal-titlebar">
              <div className="terminal-dots">
                <span className="terminal-dot red" onClick={closeModal} style={{ cursor: "pointer" }}></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
              </div>
              <span className="terminal-title">cat README.md — {selectedProject.title}</span>
            </div>
            <div className="terminal-body" style={{ overflowY: "auto", maxHeight: "70vh" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--term-gray)", marginBottom: "12px" }}>
                <span style={{ color: "var(--term-cyan)" }}>$</span> cat README.md
              </div>

              <div className="flex justify-center mb-6" style={{ padding: "24px", background: "rgba(0, 255, 65, 0.02)", borderRadius: "4px" }}>
                <i
                  className={`${selectedProject.icon || 'fas fa-code'}`}
                  style={{ fontSize: "4rem", color: "var(--term-green)", textShadow: "0 0 20px rgba(0, 255, 65, 0.3)" }}
                ></i>
              </div>

              <h2 className="glow-green" style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--term-green)", marginBottom: "12px" }}>
                # {selectedProject.title}
              </h2>

              <p style={{ color: "var(--term-white)", fontSize: "0.85rem", lineHeight: "1.7", marginBottom: "20px" }}>
                {selectedProject.description}
              </p>

              <div style={{ borderTop: "1px solid var(--term-border)", paddingTop: "16px", display: "flex", gap: "12px", justifyContent: "flex-end", flexWrap: "wrap" }}>
                <button
                  onClick={closeModal}
                  className="terminal-btn"
                  style={{ fontSize: "0.75rem", padding: "8px 16px", borderColor: "var(--term-gray-dim)", color: "var(--term-gray)" }}
                >
                  <span>&gt;</span> close
                </button>
                <a
                  href="https://github.com/mustaphahaadi/"
                  className="terminal-btn cyan"
                  style={{ fontSize: "0.75rem", padding: "8px 16px" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github"></i>
                  <span>git clone</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;

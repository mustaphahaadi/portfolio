import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../services/api";

const PortfolioSection = () => {
  const Projects = [
    {
      id: 1,
      number: "01",
      title: "AlphaAsk: AI-Powered Student Academic Support Platform",
      description: "Engineered serverless backend on AWS API Gateway, Lambda, and DynamoDB with a resilient multi-provider AI fallback chain (Groq → Gemini → Bedrock). Shipped 12 functional API routes documented with OpenAPI specs, maintained 19 automated tests (Pytest/Vitest), and resolved 12 real engineering challenges.",
      icon: "fas fa-robot",
      github_url: "https://github.com/Azubi-Team-Alpha/AlphaAsk",
      live_url: null,
    },
    {
      id: 2,
      number: "02",
      title: "AlphaPass: Serverless Event Ticketing & Governance Platform",
      description: "Directed 6-person team building peer-to-peer ticket resale on AWS Lambda, API Gateway, and DynamoDB. Orchestrated Terraform infrastructure modules across serverless stack, drove 47-test automated suite, and enforced staggered peer reviews for production reliability.",
      icon: "fas fa-ticket-alt",
      github_url: "https://github.com/Azubi-Team-Alpha/event-ticketing--alphapass",
      live_url: null,
    },
    {
      id: 3,
      number: "03",
      title: "AlphaPay: End-to-End Cloud Solution Design & Deployment",
      description: "Led 6-person team architecting web app infrastructure across EC2, Application Load Balancer (ALB), CloudFront, and Route 53. Steered CI/CD pipeline automation for build, test, and deployment, launching live site for Azubi Africa showcase.",
      icon: "fas fa-cloud-upload-alt",
      github_url: "https://github.com/Azubi-Team-Alpha/end-to-end-cloud-solution-design--alphapay",
      live_url: null,
    },
    {
      id: 4,
      number: "04",
      title: "FastAPI CI/CD Pipeline on AWS EC2",
      description: "Containerised FastAPI application with GitHub Actions automating test, build, push to Docker Hub, and SSH deployment to AWS EC2. Configured Nginx reverse proxy, SSL/TLS termination, systemd, and automated rollback hooks.",
      icon: "fas fa-infinity",
      github_url: "https://github.com/mustaphahaadi/fastapi-cicd",
      live_url: null,
    },
    {
      id: 5,
      number: "05",
      title: "Anomaly Detection System — Multi-Container Docker Setup",
      description: "Designed and deployed a multi-container Docker environment consisting of an Nginx reverse proxy, Nextcloud instance, and a custom Python anomaly detection daemon — demonstrating real-world container orchestration.",
      icon: "fab fa-docker",
      github_url: "https://github.com/mustaphahaadi/",
      live_url: null,
    },
    {
      id: 6,
      number: "06",
      title: "RAG Application — DigitalOcean Gradient AI Hackathon",
      description: "Built and deployed a Retrieval-Augmented Generation application to the DigitalOcean Gradient AI Hackathon as part of the blackbox24 collaborative team.",
      icon: "fas fa-brain",
      github_url: "https://github.com/mustaphahaadi/",
      live_url: null,
    },
  ];

  const [selectedProject, setSelectedProject] = useState(null);

  const { data: apiProjects, isLoading: loading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await getProjects();
      return response.data;
    }
  });

  // When the API fails, apiProjects is undefined — fall back to the hardcoded Projects list.
  const projects = Array.isArray(apiProjects)
    ? apiProjects
    : (apiProjects?.results ?? Projects);

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

  // No full-page error — we always render the fallback projects.

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
                {selectedProject.live_url && (
                  <a
                    href={selectedProject.live_url}
                    className="terminal-btn amber"
                    style={{ fontSize: "0.75rem", padding: "8px 16px" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    <span>open --live</span>
                  </a>
                )}
                <a
                  href={selectedProject.github_url || "https://github.com/mustaphahaadi/"}
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

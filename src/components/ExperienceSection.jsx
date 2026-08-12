import { useQuery } from "@tanstack/react-query";
import { getExperiences } from "../services/api";

const defaultExperiences = [
  {
    company: "Azubi Africa / Kumasi (Hybrid)",
    position: "AWS Cloud & AI Intern",
    year: "May 2026 – Present",
    description:
      "Provisioned EC2, S3, Lambda, and CloudFormation across 4+ team projects in agile sprints. Architected serverless workflows and end-to-end cloud infrastructure using IaC (CloudFormation, Terraform) while optimizing resource strategies to eliminate unnecessary cloud spend.",
    icon: "fab fa-aws",
  },
  {
    company: "ReStartDigital / Kumasi",
    position: "Technical Trainer",
    year: "Dec 2025 – Present",
    description:
      "Designed two parallel professional tracks (Linux for Cybersecurity and AI for Web Development). Delivered hands-on curricula to 40+ working professionals with 90%+ satisfaction scores; built lab guides and reference materials from scratch.",
    icon: "fas fa-chalkboard-teacher",
  },
  {
    company: "ReStartDigital / Kumasi",
    position: "DevOps Engineer",
    year: "Aug 2024 – Apr 2026",
    description:
      "Operated as sole DevOps engineer owning cloud infrastructure and release pipelines. Slashed deployment steps from 12 to 2 per release via GitHub Actions (80% rollout time cut); administered 4+ Linux servers with Nginx, SSL/TLS, and systemd sustaining 99%+ uptime.",
    icon: "fas fa-server",
  },
  {
    company: "IRID, KsTU / Kumasi",
    position: "Technical Support Lead",
    year: "Nov 2025 – Present",
    description:
      "Led technical support activities by troubleshooting complex systems, resolving user incidents, and maintaining smooth day-to-day technology operations within the research institute.",
    icon: "fas fa-headset",
  },
  {
    company: "Esoko",
    position: "Quality Assurance Officer",
    year: "Mar 2025 – May 2026",
    description:
      "Executed quality assurance testing, verified release builds, and enforced quality control standards across software platforms and enterprise tools.",
    icon: "fas fa-tasks",
  },
  {
    company: "Ghana Skills Development Fund",
    position: "Technical Support Lead - SHS Waste Management Quiz 2025",
    year: "Jun 2025 – Aug 2025",
    description:
      "Managed technical setup and infrastructure support for the quiz event to ensure seamless participation and minimal system disruptions across KsTU and Prempeh Assembly hall venues.",
    icon: "fas fa-tools",
  },
  {
    company: "GI-KACE / Kumasi",
    position: "Assistant Instructor",
    year: "Oct 2024 – Dec 2024",
    description:
      "Supported technical training sessions at Ghana-India Kofi Annan Centre of Excellence in ICT, guiding learners through practical hands-on lab exercises and software concepts.",
    icon: "fas fa-laptop-code",
  },
];

const ExperienceSection = () => {
  const { data: apiData } = useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const response = await getExperiences();
      return response.data;
    }
  });

  const experiencesArray = Array.isArray(apiData) ? apiData : apiData?.results;
  const experiences = experiencesArray?.length > 0 ? experiencesArray : defaultExperiences;

  return (
    <section
      id="experience"
      className="terminal-section"
      style={{ borderTop: "1px solid var(--term-border)" }}
    >
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="section-header-cmd">
          <span style={{ color: "var(--term-cyan)" }}>haadi@cloud</span>
          <span style={{ color: "var(--term-white)" }}>:</span>
          <span style={{ color: "var(--term-amber)" }}>~</span>
          <span style={{ color: "var(--term-white)" }}>$ </span>
          <span style={{ color: "var(--term-white)" }}>history </span>
          <span style={{ color: "var(--term-amber)" }}>| </span>
          <span style={{ color: "var(--term-white)" }}>grep </span>
          <span style={{ color: "var(--term-green)" }}>career</span>
        </div>

        <div className="text-center mb-8">
          <p style={{ color: "var(--term-gray)", fontSize: "0.8rem" }}>
            Career milestones and key contributions
          </p>
        </div>

        {/* Experience as bash history */}
        <div className="terminal-window">
          <div className="terminal-titlebar">
            <div className="terminal-dots">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
            </div>
            <span className="terminal-title">history — career log</span>
          </div>
          <div className="terminal-body" style={{ padding: "16px 0" }}>
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="log-entry"
                style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px", marginLeft: "8px", marginRight: "8px" }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Line number & icon */}
                  <div className="flex items-center gap-3 md:w-48 flex-shrink-0">
                    <span style={{ color: "var(--term-gray-dim)", fontSize: "0.75rem", fontFamily: "var(--term-font)", minWidth: "32px" }}>
                      {String(1000 + index + 1)}
                    </span>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0, 255, 65, 0.06)",
                        borderRadius: "6px",
                        border: "1px solid var(--term-green-dark)",
                        flexShrink: 0,
                      }}
                    >
                      <i className={`${exp.icon}`} style={{ color: "var(--term-green)", fontSize: "0.85rem" }}></i>
                    </div>
                    <div className="md:hidden">
                      <span style={{ color: "var(--term-amber)", fontSize: "0.75rem", fontWeight: "500" }}>{exp.year}</span>
                    </div>
                  </div>

                  {/* Year (desktop) */}
                  <div className="hidden md:block md:w-40 flex-shrink-0">
                    <span style={{ color: "var(--term-amber)", fontSize: "0.8rem", fontWeight: "500" }}>{exp.year}</span>
                    <div style={{ color: "var(--term-gray)", fontSize: "0.7rem", marginTop: "2px" }}>{exp.company}</div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="md:hidden" style={{ color: "var(--term-gray)", fontSize: "0.7rem", marginBottom: "4px" }}>{exp.company}</div>
                    <h3 className="glow-green" style={{ color: "var(--term-green)", fontSize: "0.95rem", fontWeight: "600", marginBottom: "6px" }}>
                      {exp.position}
                    </h3>
                    <p style={{ color: "var(--term-white)", fontSize: "0.8rem", lineHeight: "1.6" }}>
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

import { useQuery } from "@tanstack/react-query";
import { getExperiences } from "../services/api";

const defaultExperiences = [
  {
    company: "ReStart Digital / Kumasi",
    position: "Co-Founder & CEO",
    year: "2024-Present",
    description:
      "A startup building innovative software solutions, making technical decisions, and driving innovation in software solutions",
    icon: "fas fa-users-cog",
  },
  {
    company: "Khoders World - KsTU / Campus Club",
    position: "Former President & Tutor",
    year: "2022-Present",
    description:
      "Mentoring beginner programmers, making technical decisions, and driving innovation in software solutions.",
    icon: "fas fa-laptop-code",
  },
  {
    company: "IRID, KsTU",
    position: "Research Associate",
    year: "May - Oct, 2025",
    description:
      "Led front-end development for multiple projects, implemented modern JavaScript frameworks, and optimized web performance.",
    icon: "fas fa-chart-line",
  },
  {
    company: "Code Masters / London",
    position: "Full Stack Developer",
    year: "2019-2020",
    description:
      "Designed and developed full-stack applications, implemented REST APIs, and managed database systems.",
    icon: "fas fa-layer-group",
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

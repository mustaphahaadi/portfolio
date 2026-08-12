import { useQuery } from "@tanstack/react-query";
import { getTools } from "../services/api";

const defaultTools = [
  { name: "Docker", icon: "fab fa-docker", version: "24.0.7", status: "expert" },
  { name: "Kubernetes", icon: "fas fa-dharmachakra", version: "1.29", status: "proficient" },
  { name: "AWS", icon: "fab fa-aws", version: "cli-2.x", status: "expert" },
  { name: "Terraform", icon: "fas fa-cubes", version: "1.7.x", status: "proficient" },
  { name: "Linux", icon: "fab fa-linux", version: "6.x", status: "expert" },
  { name: "Git", icon: "fab fa-git-alt", version: "2.43", status: "expert" },
  { name: "Python", icon: "fab fa-python", version: "3.12", status: "expert" },
  { name: "JavaScript", icon: "fab fa-js", version: "ES2024", status: "proficient" },
  { name: "React", icon: "fab fa-react", version: "18.x", status: "proficient" },
  { name: "GitHub Actions", icon: "fab fa-github", version: "v4", status: "proficient" },
  { name: "Jenkins", icon: "fas fa-cogs", version: "2.4x", status: "proficient" },
  { name: "Node.js", icon: "fab fa-node", version: "20.x", status: "proficient" },
];

const ToolsSection = () => {
  const { data: apiData } = useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      const response = await getTools();
      return response.data;
    }
  });

  const toolsArray = Array.isArray(apiData) ? apiData : apiData?.results;
  const tools = toolsArray?.length > 0 ? toolsArray : defaultTools;

  return (
    <section className="terminal-section" style={{ borderTop: "1px solid var(--term-border)" }}>
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="section-header-cmd">
          <span style={{ color: "var(--term-cyan)" }}>haadi@cloud</span>
          <span style={{ color: "var(--term-white)" }}>:</span>
          <span style={{ color: "var(--term-amber)" }}>~</span>
          <span style={{ color: "var(--term-white)" }}>$ </span>
          <span style={{ color: "var(--term-white)" }}>dpkg </span>
          <span style={{ color: "var(--term-amber)" }}>--list </span>
          <span style={{ color: "var(--term-amber)" }}>| </span>
          <span style={{ color: "var(--term-white)" }}>grep </span>
          <span style={{ color: "var(--term-green)" }}>installed</span>
        </div>

        <div className="text-center mb-8">
          <p style={{ color: "var(--term-gray)", fontSize: "0.8rem" }}>
            Tools and technologies in the arsenal
          </p>
        </div>

        {/* Tools as Package List */}
        <div className="terminal-window">
          <div className="terminal-titlebar">
            <div className="terminal-dots">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
            </div>
            <span className="terminal-title">package-manager — installed packages</span>
          </div>
          <div className="terminal-body" style={{ padding: "0", overflowX: "auto" }}>
            {/* Desktop: Table View */}
            <div className="hidden md:block">
              <table className="pkg-table">
                <thead>
                  <tr>
                    <th style={{ width: "30px" }}></th>
                    <th>Package</th>
                    <th>Version</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tools.map((tool, index) => (
                    <tr key={index}>
                      <td>
                        <span className="pkg-status"></span>
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <i className={tool.icon} style={{ color: "var(--term-green)", fontSize: "1rem", width: "20px", textAlign: "center" }}></i>
                          <span style={{ color: "var(--term-green)", fontWeight: "500" }}>{tool.name}</span>
                        </div>
                      </td>
                      <td style={{ color: "var(--term-amber)", fontSize: "0.75rem" }}>
                        {tool.version || "latest"}
                      </td>
                      <td>
                        <span
                          className="log-level info"
                          style={{ fontSize: "0.6rem", textTransform: "uppercase" }}
                        >
                          {tool.status || "installed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: Card Grid */}
            <div className="md:hidden grid grid-cols-2 gap-3 p-4">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "16px 8px",
                    background: "rgba(0, 255, 65, 0.02)",
                    border: "1px solid var(--term-border)",
                    borderRadius: "6px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <i className={tool.icon} style={{ color: "var(--term-green)", fontSize: "1.5rem", marginBottom: "8px", textShadow: "0 0 8px rgba(0, 255, 65, 0.3)" }}></i>
                  <span style={{ color: "var(--term-green)", fontSize: "0.75rem", fontWeight: "500", textAlign: "center" }}>{tool.name}</span>
                  <span style={{ color: "var(--term-gray)", fontSize: "0.6rem", marginTop: "2px" }}>{tool.version || "latest"}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ padding: "10px 16px", borderTop: "1px solid var(--term-border)", fontSize: "0.7rem", color: "var(--term-gray)" }}>
              {tools.length} packages installed — 0 upgradable
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;

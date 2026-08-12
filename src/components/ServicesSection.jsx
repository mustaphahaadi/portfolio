import { useQuery } from "@tanstack/react-query";
import { getServices } from "../services/api";

const defaultServices = [
  {
    icon: "fas fa-cloud",
    title: "Cloud Infrastructure",
    description:
      "Designing and managing cloud infrastructure on AWS and GCP. Implementing IaC with Terraform and CloudFormation for reproducible, scalable environments.",
  },
  {
    icon: "fab fa-docker",
    title: "Container Orchestration",
    description:
      "Building and orchestrating containerized applications with Docker and Kubernetes. Implementing service meshes, auto-scaling, and zero-downtime deployments.",
  },
  {
    icon: "fas fa-code-branch",
    title: "CI/CD Pipeline Engineering",
    description:
      "Architecting end-to-end CI/CD pipelines with Jenkins, GitHub Actions, and GitLab CI. Automating testing, building, and deployment workflows for rapid delivery.",
  },
];

const ServicesSection = () => {
  const { data: apiData } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await getServices();
      return response.data;
    }
  });

  const servicesArray = Array.isArray(apiData) ? apiData : apiData?.results;
  const services = servicesArray?.length > 0 ? servicesArray : defaultServices;

  return (
    <section className="terminal-section" style={{ borderTop: "1px solid var(--term-border)" }}>
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="section-header-cmd">
          <span style={{ color: "var(--term-cyan)" }}>haadi@cloud</span>
          <span style={{ color: "var(--term-white)" }}>:</span>
          <span style={{ color: "var(--term-amber)" }}>~</span>
          <span style={{ color: "var(--term-white)" }}>$ </span>
          <span style={{ color: "var(--term-white)" }}>cat </span>
          <span style={{ color: "var(--term-green)" }}>services.conf</span>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="terminal-window"
              style={{ cursor: "default" }}
            >
              <div className="terminal-titlebar" style={{ padding: "8px 12px" }}>
                <div className="terminal-dots" style={{ gap: "4px" }}>
                  <span className="terminal-dot red" style={{ width: "8px", height: "8px" }}></span>
                  <span className="terminal-dot yellow" style={{ width: "8px", height: "8px" }}></span>
                  <span className="terminal-dot green" style={{ width: "8px", height: "8px" }}></span>
                </div>
                <span className="terminal-title" style={{ fontSize: "0.65rem" }}>
                  service_{index + 1}.conf
                </span>
              </div>
              <div className="terminal-body" style={{ padding: "16px 20px" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0, 255, 65, 0.06)",
                      borderRadius: "6px",
                      border: "1px solid var(--term-green-dark)",
                    }}
                  >
                    <i className={`${service.icon}`} style={{ color: "var(--term-green)", fontSize: "1rem" }}></i>
                  </div>
                  <span style={{ color: "var(--term-amber)", fontSize: "0.7rem", fontWeight: "600" }}>
                    [SERVICE_{String(index + 1).padStart(2, '0')}]
                  </span>
                </div>

                <h4 className="glow-green" style={{ color: "var(--term-green)", fontSize: "0.95rem", fontWeight: "600", marginBottom: "10px" }}>
                  {service.title}
                </h4>

                <p style={{ color: "var(--term-gray)", fontSize: "0.8rem", lineHeight: "1.6" }}>
                  {service.description}
                </p>

                <div style={{ marginTop: "12px", fontSize: "0.7rem", color: "var(--term-green-dark)" }}>
                  <span style={{ color: "var(--term-green-dim)" }}>status:</span> <span style={{ color: "#28c840" }}>● active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

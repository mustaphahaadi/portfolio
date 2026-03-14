import { useQuery } from "@tanstack/react-query";
import { getCertifications } from "../services/api";

const defaultCertifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    organization: "Amazon Web Services",
    issue_date: "Jun 2023",
    expiration_date: "Jun 2026",
    credential_id: "AWS-12345678",
    credential_url: "https://aws.amazon.com/certification/",
    icon: "fab fa-aws",
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    organization: "Linux Foundation",
    issue_date: "Sep 2024",
    expiration_date: "Sep 2027",
    credential_id: "LF-98765432",
    credential_url: "https://training.linuxfoundation.org/",
    icon: "fas fa-dharmachakra",
  },
];

const CertificationsSection = () => {
  const { data: apiData } = useQuery({
    queryKey: ['certifications'],
    queryFn: async () => {
      const response = await getCertifications();
      return response.data;
    }
  });

  const certsArray = Array.isArray(apiData) ? apiData : apiData?.results;
  const certifications = certsArray?.length > 0 ? certsArray : defaultCertifications;

  return (
    <section
      id="certifications"
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
          <span style={{ color: "var(--term-white)" }}>sudo </span>
          <span style={{ color: "var(--term-white)" }}>cat </span>
          <span style={{ color: "var(--term-green)" }}>/etc/security/certs</span>
        </div>

        <div className="text-center mb-8">
          <p style={{ color: "var(--term-gray)", fontSize: "0.8rem" }}>
            Professional Certifications & Badges
          </p>
        </div>

        {/* Certifications Entries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <div key={index} className="terminal-window">
              <div className="terminal-titlebar" style={{ padding: "8px 12px" }}>
                <div className="terminal-dots" style={{ gap: "4px" }}>
                  <span className="terminal-dot red" style={{ width: "8px", height: "8px" }}></span>
                  <span className="terminal-dot yellow" style={{ width: "8px", height: "8px" }}></span>
                  <span className="terminal-dot green" style={{ width: "8px", height: "8px" }}></span>
                </div>
                <span className="terminal-title" style={{ fontSize: "0.65rem" }}>
                  cert_{index + 1}.pem
                </span>
              </div>
              <div className="terminal-body" style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
                        flexShrink: 0,
                      }}
                    >
                      <i className={`${cert.icon || 'fas fa-certificate'}`} style={{ color: "var(--term-green)", fontSize: "1rem" }}></i>
                    </div>
                    <div>
                      <h3 className="glow-green" style={{ color: "var(--term-green)", fontSize: "0.95rem", fontWeight: "600", marginBottom: "2px", lineHeight: "1.3" }}>
                        {cert.name}
                      </h3>
                      <div style={{ color: "var(--term-gray)", fontSize: "0.8rem", fontWeight: "500" }}>
                        {cert.organization}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ 
                  margin: "16px 0", 
                  padding: "12px", 
                  background: "rgba(0, 0, 0, 0.2)", 
                  border: "1px dashed var(--term-border)",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  color: "var(--term-gray)"
                }}>
                  <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ color: "var(--term-cyan)" }}>Issued:</span>
                    <span style={{ color: "var(--term-white)" }}>{cert.issue_date || "N/A"}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ color: "var(--term-cyan)" }}>Expires:</span>
                    <span style={{ color: "var(--term-white)" }}>{cert.expiration_date || "No expiration"}</span>
                  </div>
                  {cert.credential_id && (
                    <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: "8px" }}>
                      <span style={{ color: "var(--term-cyan)" }}>Credential ID:</span>
                      <span style={{ color: "var(--term-white)" }}>{cert.credential_id}</span>
                    </div>
                  )}
                </div>

                {cert.credential_url && (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="terminal-btn cyan"
                      style={{ fontSize: "0.7rem", padding: "6px 12px" }}
                    >
                      <span>verify_cert</span>
                      <i className="fas fa-external-link-alt" style={{ marginLeft: "6px" }}></i>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;

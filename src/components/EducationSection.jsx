import { useQuery } from "@tanstack/react-query";
import { getEducation } from "../services/api";

const defaultEducationItems = [
  {
    year: "2021 – 2025",
    institution: "Kumasi Technical University",
    description:
      "Bachelor's degree in Computer Technology with a focus on software engineering and web development.",
    location: "Kumasi, Ghana",
  },
  {
    year: "2017 – 2020",
    institution: "Ghanaian-German Snr High",
    description:
      "A pure general science with biology, chemistry, physics and elective maths.",
    location: "Tepa, Ghana",
  },
  {
    year: "– 2017",
    institution: "Tuffour Red Sox Int.",
    description: "Nursery & Basic Education",
    location: "Bawku, Ghana",
  },
];

const EducationSection = () => {
  const { data: apiData } = useQuery({
    queryKey: ['education'],
    queryFn: async () => {
      const response = await getEducation();
      return response.data;
    }
  });

  const educationArray = Array.isArray(apiData) ? apiData : apiData?.results;
  const educationItems = educationArray?.length > 0 ? educationArray : defaultEducationItems;

  return (
    <section
      id="education"
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
          <span style={{ color: "var(--term-white)" }}>cat </span>
          <span style={{ color: "var(--term-green)" }}>/etc/education.log</span>
        </div>

        <div className="text-center mb-8">
          <p style={{ color: "var(--term-gray)", fontSize: "0.8rem" }}>
            Academic journey and professional certifications
          </p>
        </div>

        {/* Education Entries as Log Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationItems.map((item, index) => (
            <div key={index} className="terminal-window">
              <div className="terminal-titlebar" style={{ padding: "8px 12px" }}>
                <div className="terminal-dots" style={{ gap: "4px" }}>
                  <span className="terminal-dot red" style={{ width: "8px", height: "8px" }}></span>
                  <span className="terminal-dot yellow" style={{ width: "8px", height: "8px" }}></span>
                  <span className="terminal-dot green" style={{ width: "8px", height: "8px" }}></span>
                </div>
                <span className="terminal-title" style={{ fontSize: "0.65rem" }}>
                  education_{index + 1}.log
                </span>
              </div>
              <div className="terminal-body" style={{ padding: "16px 20px" }}>
                {/* Log timestamp */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "6px" }}>
                  <span className="log-level info" style={{ fontSize: "0.65rem" }}>
                    <i className="fas fa-graduation-cap" style={{ marginRight: "4px" }}></i>
                    EDUCATION
                  </span>
                  <span style={{ color: "var(--term-amber)", fontSize: "0.7rem", fontWeight: "500" }}>
                    {item.year}
                  </span>
                </div>

                <h3 className="glow-green" style={{ color: "var(--term-green)", fontSize: "1rem", fontWeight: "600", marginBottom: "8px" }}>
                  {item.institution}
                </h3>

                <p style={{ color: "var(--term-white)", fontSize: "0.8rem", lineHeight: "1.6", marginBottom: "12px" }}>
                  {item.description}
                </p>

                <div style={{ borderTop: "1px solid var(--term-border)", paddingTop: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <i className="fas fa-map-marker-alt" style={{ color: "var(--term-cyan)", fontSize: "0.65rem" }}></i>
                  <span style={{ color: "var(--term-gray)", fontSize: "0.75rem" }}>
                    # host: {item.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

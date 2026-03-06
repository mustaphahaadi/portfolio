import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "../services/api";

const defaultTestimonials = [
  {
    text: "Haadi is one of the very best young guys that worked with me at IRID. He doesn't talk much but always ready to learn",
    name: "Prof. Smart A. Sarpong",
    position: "Director, IRID-KsTU",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    text: "Haadi is a cool guy. Though he is not technically good than me. But the rare thing about him is that he is always ready to learn and improve himself. He is a great team player and always brings positive energy to the team.",
    name: "Hope Nelson Decardi",
    position: "Co-Founder ReStartDigital",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    text: "Haadi is a dedicated and hardworking individual. He always strives to deliver the best results and is not afraid to take on challenges.",
    name: "Madam Diana Owusu",
    position: "Register, IRID-KsTU",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const TestimonialSection = () => {
  const { data: apiData } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await getTestimonials();
      return response.data;
    }
  });

  const testimonialsArray = Array.isArray(apiData) ? apiData : apiData?.results;
  const testimonials = testimonialsArray?.length > 0 ? testimonialsArray : defaultTestimonials;

  return (
    <section
      id="testimonials"
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
          <span style={{ color: "var(--term-green)" }}>/var/log/testimonials.log</span>
        </div>

        <div className="text-center mb-8">
          <p style={{ color: "var(--term-gray)", fontSize: "0.8rem" }}>
            Testimonials from colleagues and clients
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id || index} className="terminal-window">
              <div className="terminal-titlebar" style={{ padding: "8px 12px" }}>
                <div className="terminal-dots" style={{ gap: "4px" }}>
                  <span className="terminal-dot red" style={{ width: "8px", height: "8px" }}></span>
                  <span className="terminal-dot yellow" style={{ width: "8px", height: "8px" }}></span>
                  <span className="terminal-dot green" style={{ width: "8px", height: "8px" }}></span>
                </div>
                <span className="terminal-title" style={{ fontSize: "0.65rem" }}>
                  testimonial_{index + 1}.log
                </span>
              </div>
              <div className="terminal-body" style={{ padding: "16px 20px" }}>
                {/* Log level badge */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span className="log-level info" style={{ fontSize: "0.65rem" }}>
                    <i className="fas fa-comment-dots" style={{ marginRight: "4px" }}></i>
                    INFO
                  </span>
                  <span style={{ color: "var(--term-gray-dim)", fontSize: "0.65rem" }}>
                    PID: {String(2000 + index + 1)}
                  </span>
                </div>

                {/* Quote */}
                <div
                  style={{
                    padding: "12px",
                    background: "rgba(0, 212, 255, 0.03)",
                    borderLeft: "2px solid var(--term-cyan-dim)",
                    borderRadius: "0 4px 4px 0",
                    marginBottom: "16px",
                  }}
                >
                  <p style={{ color: "var(--term-white)", fontSize: "0.8rem", lineHeight: "1.7", fontStyle: "italic" }}>
                    &quot;{testimonial.text}&quot;
                  </p>
                </div>

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img
                    src={testimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=0d1117&color=00ff41&size=72`}
                    alt={testimonial.name}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "1px solid var(--term-green-dark)",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <span style={{ color: "var(--term-green)", fontSize: "0.8rem", fontWeight: "600", display: "block" }}>
                      {testimonial.name}
                    </span>
                    <span style={{ color: "var(--term-gray)", fontSize: "0.7rem" }}>
                      {testimonial.position}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

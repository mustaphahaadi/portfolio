import { useState } from "react";
import { submitContact } from "../services/api";
import { toast } from "react-hot-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContact(formData);
      toast.success("> Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(`> Error: ${error.message}. Retry.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
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
          <span style={{ color: "var(--term-white)" }}>ssh </span>
          <span style={{ color: "var(--term-green)" }}>haadi@contact</span>
        </div>

        <div className="text-center mb-8">
          <p style={{ color: "var(--term-gray)", fontSize: "0.8rem" }}>
            Establishing secure connection... <span style={{ color: "#28c840" }}>Connected.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Form */}
          <div className="terminal-window">
            <div className="terminal-titlebar">
              <div className="terminal-dots">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
              </div>
              <span className="terminal-title">compose-message — bash</span>
            </div>
            <div className="terminal-body">
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="name"
                    style={{ display: "block", color: "var(--term-amber)", fontSize: "0.75rem", marginBottom: "6px", fontFamily: "var(--term-font)" }}
                  >
                    # your_name
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="terminal-input"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="email"
                    style={{ display: "block", color: "var(--term-amber)", fontSize: "0.75rem", marginBottom: "6px", fontFamily: "var(--term-font)" }}
                  >
                    # email_address
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="terminal-input"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="message"
                    style={{ display: "block", color: "var(--term-amber)", fontSize: "0.75rem", marginBottom: "6px", fontFamily: "var(--term-font)" }}
                  >
                    # message_body
                  </label>
                  <div className="input-wrapper textarea">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="terminal-input"
                      style={{ resize: "vertical", paddingTop: "10px" }}
                      placeholder="Hi, I'd like to discuss..."
                      required
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="terminal-btn"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    opacity: isSubmitting ? 0.6 : 1,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  <span style={{ color: "var(--term-cyan)" }}>&gt;</span>
                  <span>{isSubmitting ? 'sending...' : 'send_message --priority high'}</span>
                  {!isSubmitting && <i className="fas fa-paper-plane" style={{ fontSize: "0.7rem" }}></i>}
                  {isSubmitting && <i className="fas fa-spinner fa-spin" style={{ fontSize: "0.7rem" }}></i>}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="terminal-window">
            <div className="terminal-titlebar">
              <div className="terminal-dots">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
              </div>
              <span className="terminal-title">env — contact variables</span>
            </div>
            <div className="terminal-body">
              <div style={{ fontSize: "0.75rem", color: "var(--term-gray)", marginBottom: "16px" }}>
                <span style={{ color: "var(--term-cyan)" }}>$</span> printenv | grep CONTACT
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Location */}
                <div className="log-entry" style={{ marginBottom: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <i className="fas fa-map-marker-alt" style={{ color: "var(--term-cyan)", fontSize: "0.85rem", width: "16px", textAlign: "center" }}></i>
                    <span style={{ color: "var(--term-amber)", fontSize: "0.75rem", fontWeight: "600" }}>LOCATION</span>
                  </div>
                  <div style={{ paddingLeft: "26px" }}>
                    <span style={{ color: "var(--term-green)", fontSize: "0.85rem" }}>Kumasi, Ghana</span>
                    <div style={{ color: "var(--term-gray)", fontSize: "0.7rem", marginTop: "2px" }}>
                      # Open to remote work worldwide
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="log-entry" style={{ marginBottom: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <i className="fas fa-envelope" style={{ color: "var(--term-cyan)", fontSize: "0.85rem", width: "16px", textAlign: "center" }}></i>
                    <span style={{ color: "var(--term-amber)", fontSize: "0.75rem", fontWeight: "600" }}>EMAIL</span>
                  </div>
                  <div style={{ paddingLeft: "26px" }}>
                    <a href="mailto:mustaphahaadi04@gmail.com" style={{ color: "var(--term-green)", fontSize: "0.85rem" }}>
                      mustaphahaadi04@gmail.com
                    </a>
                    <div style={{ color: "var(--term-gray)", fontSize: "0.7rem", marginTop: "2px" }}>
                      # Typically responds within 24 hours
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="log-entry" style={{ marginBottom: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <i className="fas fa-phone-alt" style={{ color: "var(--term-cyan)", fontSize: "0.85rem", width: "16px", textAlign: "center" }}></i>
                    <span style={{ color: "var(--term-amber)", fontSize: "0.75rem", fontWeight: "600" }}>PHONE</span>
                  </div>
                  <div style={{ paddingLeft: "26px" }}>
                    <span style={{ color: "var(--term-green)", fontSize: "0.85rem" }}>+233 (0) 548-367-637</span>
                    <div style={{ color: "var(--term-gray)", fontSize: "0.7rem", marginTop: "2px" }}>
                      # Available Mon-Fri, 9am-5pm GMT
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div className="log-entry" style={{ marginBottom: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <i className="fas fa-calendar-alt" style={{ color: "var(--term-cyan)", fontSize: "0.85rem", width: "16px", textAlign: "center" }}></i>
                    <span style={{ color: "var(--term-amber)", fontSize: "0.75rem", fontWeight: "600" }}>SCHEDULE</span>
                  </div>
                  <div style={{ paddingLeft: "26px" }}>
                    <a href="#" className="terminal-btn cyan" style={{ padding: "4px 12px", fontSize: "0.7rem" }}>
                      <i className="fas fa-video" style={{ fontSize: "0.6rem" }}></i>
                      <span>book_call --schedule</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
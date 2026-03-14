import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/api";

const defaultSocialLinks = [
  { href: "https://www.github.com/mustaphahaadi", icon: "fab fa-github", label: "github", pid: "3001" },
  { href: "https://www.linkedin.com/mustaphahaadi", icon: "fab fa-linkedin-in", label: "linkedin", pid: "3002" },
  { href: "https://www.x.com/RealCodeo", icon: "fab fa-x-twitter", label: "x/twitter", pid: "3003" },
];

const Footer = () => {
  const { data: profileResponse } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await getProfile();
      return res.data;
    }
  });

  // Build social links from profile API data, fallback to defaults
  const socialLinks = profileResponse
    ? [
        profileResponse.github_link && { href: profileResponse.github_link, icon: "fab fa-github", label: "github", pid: "3001" },
        profileResponse.linkedin_link && { href: profileResponse.linkedin_link, icon: "fab fa-linkedin-in", label: "linkedin", pid: "3002" },
        profileResponse.twitter_link && { href: profileResponse.twitter_link, icon: "fab fa-x-twitter", label: "x/twitter", pid: "3003" },
      ].filter(Boolean)
    : defaultSocialLinks;

  // If profile exists but no social links are set, use defaults
  const links = socialLinks.length > 0 ? socialLinks : defaultSocialLinks;

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0d1117 0%, #080b10 100%)",
        borderTop: "1px solid var(--term-border)",
        fontFamily: "var(--term-font)",
      }}
    >
      {/* Social Links */}
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6" style={{ paddingTop: "32px", paddingBottom: "16px" }}>
        <div className="text-center mb-6">
          <span style={{ color: "var(--term-gray)", fontSize: "0.75rem" }}>
            <span style={{ color: "var(--term-cyan)" }}>$</span> ps aux | grep social
          </span>
        </div>

        <div className="flex justify-center gap-3 flex-wrap mb-6">
          {links.map((link) => (
            <a
              key={link.pid}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                background: "rgba(0, 255, 65, 0.03)",
                border: "1px solid var(--term-border)",
                borderRadius: "4px",
                color: "var(--term-gray)",
                fontSize: "0.75rem",
                transition: "all 0.3s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--term-green-dim)";
                e.currentTarget.style.color = "var(--term-green)";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 255, 65, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--term-border)";
                e.currentTarget.style.color = "var(--term-gray)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={{ color: "var(--term-gray-dim)", fontSize: "0.65rem" }}>[{link.pid}]</span>
              <i className={link.icon} style={{ fontSize: "0.85rem" }}></i>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-3">
              <span className="pkg-status"></span>
              <span>haadi@cloud — session active</span>
            </div>
            <div className="flex items-center gap-4">
              <span>©{new Date().getFullYear()} Mustapha Haadi</span>
              <span style={{ color: "var(--term-green)" }}>Process exited with code 0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

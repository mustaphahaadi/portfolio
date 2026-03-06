import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/api";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { data: profileResponse } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await getProfile();
      return res.data;
    }
  });

  const resumeUrl = profileResponse?.resume || "#";

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "#hero", label: "about", icon: "fas fa-user" },
    { href: "#experience", label: "experience", icon: "fas fa-briefcase" },
    { href: "#portfolio", label: "projects", icon: "fas fa-code" },
    { href: "#testimonials", label: "testimonials", icon: "fas fa-quote-left" },
    { href: "#contact", label: "contact", icon: "fas fa-envelope" },
  ];

  return (
    <nav className="nav-terminal">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Terminal Prompt Logo */}
          <div className="flex items-center gap-2" style={{ fontFamily: "var(--term-font)", fontSize: "0.8rem" }}>
            <div className="terminal-dots hidden sm:flex">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
            </div>
            <span className="hidden sm:inline" style={{ marginLeft: "8px" }}>
              <span className="prompt-user">haadi</span>
              <span className="prompt-at">@</span>
              <span className="prompt-host">cloud</span>
              <span className="prompt-at">:</span>
              <span className="prompt-path">~/portfolio</span>
              <span className="prompt-dollar">$</span>
              <span className="cursor-blink" style={{ marginLeft: "4px" }}></span>
            </span>
            <span className="sm:hidden" style={{ color: "var(--term-green)", fontSize: "0.75rem" }}>
              <i className="fas fa-terminal" style={{ marginRight: "6px" }}></i>
              haadi@cloud
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="nav-link"
              >
                <i className={`${link.icon}`} style={{ marginRight: "4px", fontSize: "0.65rem" }}></i>
                {link.label}
              </a>
            ))}
          </div>

          {/* CV Button + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-btn hidden sm:inline-flex"
              style={{ padding: "5px 14px", fontSize: "0.75rem" }}
            >
              <i className="fas fa-download"></i>
              <span>resume.pdf</span>
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded"
              style={{
                color: "var(--term-green)",
                background: "transparent",
                border: "1px solid var(--term-border)",
                fontFamily: "var(--term-font)",
                fontSize: "0.8rem",
              }}
            >
              {isMenuOpen ? (
                <i className="fas fa-times"></i>
              ) : (
                <i className="fas fa-bars"></i>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden pb-4"
            style={{
              borderTop: "1px solid var(--term-border)",
              marginTop: "4px",
              paddingTop: "8px",
            }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="nav-link block"
                  style={{ fontSize: "0.8rem" }}
                >
                  <span style={{ color: "var(--term-green-dim)", marginRight: "8px" }}>&gt;</span>
                  <i className={link.icon} style={{ marginRight: "6px", fontSize: "0.65rem", color: "var(--term-amber)" }}></i>
                  {link.label}
                </a>
              ))}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-btn sm:hidden"
                style={{ padding: "6px 14px", fontSize: "0.75rem", marginTop: "8px", justifyContent: "center" }}
              >
                <i className="fas fa-download"></i>
                <span>resume.pdf</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

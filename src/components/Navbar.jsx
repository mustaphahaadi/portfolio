import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/api";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const isOnBlogPage = location.pathname.startsWith("/blog");

  const { data: profileResponse } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await getProfile();
      return res.data;
    }
  });

  const cvUrl = profileResponse?.resume || profileResponse?.cv_url || "";

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleCvClick = (e) => {
    if (!cvUrl || cvUrl === "#") {
      e.preventDefault();
      toast.error("> CV link is being updated. Upload a PDF link to the 'resume' column in Supabase!", {
        duration: 4000,
      });
    }
  };

  const navLinks = [
    { href: "#hero", label: "about", icon: "fas fa-user", section: true },
    { href: "#experience", label: "experience", icon: "fas fa-briefcase", section: true },
    { href: "#portfolio", label: "projects", icon: "fas fa-code", section: true },
    { href: "#certifications", label: "certifications", icon: "fas fa-certificate", section: true },
    { href: "#testimonials", label: "testimonials", icon: "fas fa-quote-left", section: true },
    { href: "#contact", label: "contact", icon: "fas fa-envelope", section: true },
  ];

  const renderNavLink = (link, extraStyle = {}) => {
    if (link.section) {
      const href = isOnBlogPage ? `/${link.href}` : link.href;
      return (
        <a key={link.href} href={href} onClick={handleLinkClick} className="nav-link" style={extraStyle}>
          <i className={`${link.icon}`} style={{ marginRight: "4px", fontSize: "0.65rem" }}></i>
          {link.label}
        </a>
      );
    }
    return null;
  };


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
            {navLinks.map((link) => renderNavLink(link))}
            <Link
              to="/blog"
              onClick={handleLinkClick}
              className="nav-link"
              style={isOnBlogPage ? { color: "var(--term-amber)", borderColor: "var(--term-amber-dim)" } : {}}
            >
              <i className="fas fa-rss" style={{ marginRight: "4px", fontSize: "0.65rem" }}></i>
              blog
            </Link>
          </div>

          {/* CV Button + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={cvUrl || "#"}
              onClick={handleCvClick}
              target={cvUrl && cvUrl !== "#" ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="terminal-btn hidden sm:inline-flex"
              style={{ padding: "5px 14px", fontSize: "0.75rem" }}
            >
              <i className="fas fa-file-download"></i>
              <span>my_cv.pdf</span>
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
              {navLinks.map((link) => renderNavLink(link, { fontSize: "0.8rem" }))}
              <Link
                to="/blog"
                onClick={handleLinkClick}
                className="nav-link block"
                style={isOnBlogPage
                  ? { fontSize: "0.8rem", color: "var(--term-amber)" }
                  : { fontSize: "0.8rem" }}
              >
                <span style={{ color: "var(--term-green-dim)", marginRight: "8px" }}>&gt;</span>
                <i className="fas fa-rss" style={{ marginRight: "6px", fontSize: "0.65rem", color: "var(--term-amber)" }}></i>
                blog
              </Link>
              <a
                href={cvUrl || "#"}
                onClick={handleCvClick}
                target={cvUrl && cvUrl !== "#" ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="terminal-btn sm:hidden"
                style={{ padding: "6px 14px", fontSize: "0.75rem", marginTop: "8px", justifyContent: "center" }}
              >
                <i className="fas fa-file-download"></i>
                <span>my_cv.pdf</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

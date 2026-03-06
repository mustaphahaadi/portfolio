import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/api";

const ASCII_ART = `
  ██╗  ██╗ █████╗  █████╗ ██████╗ ██╗
  ██║  ██║██╔══██╗██╔══██╗██╔══██╗██║
  ███████║███████║███████║██║  ██║██║
  ██╔══██║██╔══██║██╔══██║██║  ██║██║
  ██║  ██║██║  ██║██║  ██║██████╔╝██║
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝
`;

const HeroSection = () => {
  const { data: profileResponse, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await getProfile();
      return res.data;
    }
  });

  const profile = profileResponse || {
    name: "Mustapha Haadi Bugnaba",
    roles: ["DevOps Engineer", "Cloud Architect", "Infrastructure Specialist"],
    bio: "I architect and automate cloud infrastructure, build robust CI/CD pipelines, and orchestrate containers at scale. Passionate about reliability, scalability, and the art of keeping systems running smoothly. AWS, Docker, Kubernetes, Terraform — I speak fluent infrastructure.",
    profile_picture: null,
  };

  const [typedText, setTypedText] = useState("");
  const roles = profile.roles && profile.roles.length > 0 ? profile.roles : ["DevOps Engineer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowBoot(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    let currentRole = roles[roleIndex];

    const typeText = () => {
      if (currentIndex <= currentRole.length) {
        setTypedText(currentRole.slice(0, currentIndex));
        currentIndex++;
        setTimeout(typeText, 80);
      } else {
        setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
          currentIndex = 0;
        }, 2500);
      }
    };

    typeText();
  }, [roleIndex]);

  const handleClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  const bootLines = [
    { text: "BIOS v3.14 — System POST complete", color: "var(--term-gray)" },
    { text: "Loading kernel modules...", color: "var(--term-gray)" },
    { text: "[  OK  ] Mounted /dev/portfolio", color: "var(--term-green)" },
    { text: "[  OK  ] Started DevOps Engine v2.0", color: "var(--term-green)" },
    { text: "[  OK  ] Network interface eth0 up", color: "var(--term-green)" },
    { text: `Welcome, ${profile.name}`, color: "var(--term-amber)" },
  ];

  return (
    <section
      id="hero"
      className="terminal-section"
      style={{ paddingTop: "5rem" }}
    >
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="terminal-window boot-flicker">
          <div className="terminal-titlebar">
            <div className="terminal-dots">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
            </div>
            <span className="terminal-title">haadi@cloud:~ — bash — 120×40</span>
          </div>
          <div className="terminal-body" style={{ minHeight: "400px" }}>
            {/* Boot Sequence */}
            {showBoot ? (
              <div>
                {bootLines.map((line, i) => (
                  <div
                    key={i}
                    className="fade-in-up"
                    style={{
                      animationDelay: `${i * 0.25}s`,
                      fontSize: "0.8rem",
                      marginBottom: "4px",
                      color: line.color,
                      fontFamily: "var(--term-font)",
                    }}
                  >
                    {line.text}
                  </div>
                ))}
              </div>
            ) : (
              <div className="fade-in-up">
                {/* ASCII Art Name */}
                <div className="ascii-art mb-6 text-center overflow-x-auto">
                  <pre>{ASCII_ART}</pre>
                </div>

                {/* Profile Picture */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    {isLoading ? (
                      <div
                        className="rounded-full"
                        style={{
                          width: "100px",
                          height: "100px",
                          border: "2px solid var(--term-green-dark)",
                          background: "var(--term-bg-card)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i className="fas fa-spinner fa-spin" style={{ color: "var(--term-green)", fontSize: "1.5rem" }}></i>
                      </div>
                    ) : (
                      <img
                        src={profile.profile_picture || "https://placehold.co/400x400/0a0a0a/00ff41?text=%3E_"}
                        alt={profile.name}
                        className="rounded-full object-cover"
                        style={{
                          width: "100px",
                          height: "100px",
                          border: "2px solid var(--term-green-dim)",
                          boxShadow: "0 0 15px rgba(0, 255, 65, 0.2)",
                        }}
                      />
                    )}
                    <div
                      className="absolute"
                      style={{
                        bottom: "-2px",
                        right: "-2px",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: "#28c840",
                        border: "2px solid var(--term-bg-card)",
                        boxShadow: "0 0 6px rgba(40, 200, 64, 0.5)",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Name */}
                <div className="text-center mb-2" style={{ fontSize: "0.8rem", color: "var(--term-gray)" }}>
                  <span style={{ color: "var(--term-cyan)" }}>$</span> whoami
                </div>
                <h2 className="text-center mb-6 glow-green" style={{ fontSize: "1.1rem", color: "var(--term-green)", fontWeight: "600" }}>
                  {profile.name}
                </h2>

                {/* Typing Role */}
                <div className="text-center mb-6">
                  <span style={{ color: "var(--term-cyan)", fontSize: "0.85rem" }}>$ </span>
                  <span style={{ color: "var(--term-gray)", fontSize: "0.85rem" }}>echo $ROLE → </span>
                  <span className="glow-amber" style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--term-amber)" }}>
                    {typedText}
                  </span>
                  <span className="cursor-blink"></span>
                </div>

                {/* Bio */}
                <div
                  className="mx-auto mb-8"
                  style={{
                    maxWidth: "700px",
                    padding: "16px",
                    background: "rgba(0, 255, 65, 0.02)",
                    borderLeft: "3px solid var(--term-green-dark)",
                    borderRadius: "0 4px 4px 0",
                  }}
                >
                  <div style={{ color: "var(--term-gray)", fontSize: "0.75rem", marginBottom: "6px" }}>
                    <span style={{ color: "var(--term-cyan)" }}>$</span> cat about.txt
                  </div>
                  <p style={{ color: "var(--term-white)", fontSize: "0.85rem", lineHeight: "1.7" }}>
                    {profile.bio}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#contact"
                    onClick={handleClick}
                    className="terminal-btn"
                    style={{ justifyContent: "center" }}
                  >
                    <span style={{ color: "var(--term-cyan)" }}>&gt;</span>
                    <span>hire_me --now</span>
                    <i className="fas fa-arrow-right" style={{ fontSize: "0.7rem" }}></i>
                  </a>
                  <a
                    href="#portfolio"
                    className="terminal-btn amber"
                    style={{ justifyContent: "center" }}
                  >
                    <span style={{ color: "var(--term-amber)" }}>&gt;</span>
                    <span>ls projects/</span>
                    <i className="fas fa-folder-open" style={{ fontSize: "0.7rem" }}></i>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

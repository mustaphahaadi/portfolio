import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import EducationSection from "./components/EducationSection";
import ExperienceSection from "./components/ExperienceSection";
import ToolsSection from "./components/ToolsSection";
import CertificationsSection from "./components/CertificationsSection";
import TestimonialSection from "./components/TestimonialSection";
import Footer from "./components/Footer";
import ContactSection from "./components/ContactSection";
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="terminal-screen">
      {/* CRT Scanline Overlay */}
      <div className="crt-overlay"></div>

      <Navbar />
      <HeroSection />
      <ExperienceSection />
      <PortfolioSection />
      <ToolsSection />
      <EducationSection />
      <CertificationsSection />
      <ServicesSection />
      <TestimonialSection />
      <ContactSection />
      <Footer />
      <Analytics />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0d1117',
            color: '#00ff41',
            border: '1px solid #1e3a1e',
            fontFamily: "'Fira Code', monospace",
            fontSize: '0.85rem',
          },
        }}
      />
    </div>
  );
};

export default App;
